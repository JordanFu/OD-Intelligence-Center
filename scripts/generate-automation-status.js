const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const dataDir = path.join(root, 'data');
const workflowPath = path.join(root, '.github', 'workflows', 'ai-org-reports-fallback.yml');
const statusPath = path.join(dataDir, 'automation-status.json');

function readJson(relativePath) {
  const filePath = path.join(root, relativePath);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function readText(relativePath) {
  const filePath = path.join(root, relativePath);
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
}

function statusRank(status) {
  if (status === 'fail') return 3;
  if (status === 'warn') return 2;
  if (status === 'pass') return 1;
  return 2;
}

function worstStatus(statuses) {
  if (statuses.some((status) => statusRank(status) === 3)) return 'fail';
  if (statuses.some((status) => statusRank(status) === 2)) return 'warn';
  return 'pass';
}

function requiredWorkflowCommands() {
  return [
    'node scripts/audit-info-library.js',
    'node scripts/generate-topic-project-status.js',
    'node scripts/lint-knowledge-base.js',
    'node scripts/check-public-links.js',
    'node scripts/generate-automation-status.js',
    'node scripts/generate-system-health.js',
  ];
}

function classifyWorkflow(workflowText) {
  const missingCommands = requiredWorkflowCommands()
    .filter((command) => !workflowText.includes(command));
  const hasFallbackName = /fallback/i.test(workflowText);
  const hasSchedules = (workflowText.match(/cron:/g) || []).length;
  const commitsData = /git add[\s\S]*\bdata\b/.test(workflowText);
  const commitsOperations = /git add[\s\S]*\boperations\b/.test(workflowText);
  const commitsNewScripts = workflowText.includes('scripts/generate-automation-status.js')
    && workflowText.includes('scripts/generate-system-health.js');
  const warnings = [];
  const criticalIssues = [];

  if (missingCommands.length > 0) criticalIssues.push(`workflow 缺少命令：${missingCommands.join('；')}`);
  if (!hasFallbackName) warnings.push('workflow 名称未显式标注 fallback');
  if (hasSchedules < 1) criticalIssues.push('workflow 缺少定时 cron');
  if (!commitsData) warnings.push('workflow git add 未覆盖 data/');
  if (!commitsOperations) warnings.push('workflow git add 未覆盖 operations/');
  if (!commitsNewScripts) warnings.push('workflow git add 未覆盖新增自动化聚合脚本');

  return {
    status: criticalIssues.length > 0 ? 'fail' : warnings.length > 0 ? 'warn' : 'pass',
    role: 'fallback-only',
    schedules: hasSchedules,
    requiredCommands: requiredWorkflowCommands(),
    missingCommands,
    commitCoverage: {
      data: commitsData,
      operations: commitsOperations,
      newStatusScripts: commitsNewScripts,
    },
    warnings,
    criticalIssues,
  };
}

function linkStatusFrom(manifest) {
  const brokenCount = manifest?.links?.brokenCount ?? manifest?.brokenLinks?.length ?? 0;
  if (brokenCount > 0) return 'fail';
  return manifest?.links?.qualityStatus || manifest?.qualityStatus || 'unknown';
}

function knowledgeLintStatus(knowledge) {
  if (!knowledge) return 'unknown';
  if ((knowledge.privatePathLeaks || []).length > 0) return 'fail';
  if ((knowledge.missingSummaryFiles || []).length > 0) return 'fail';
  if ((knowledge.criticalIssues || []).length > 0) return 'fail';
  if ((knowledge.duplicateNumbers || []).length > 0) return 'warn';
  return 'pass';
}

function main() {
  const info = readJson('data/info-feed-status.json');
  const topics = readJson('data/topic-projects-status.json');
  const knowledge = readJson('data/knowledge-status.json');
  const workflowText = readText('.github/workflows/ai-org-reports-fallback.yml');
  const workflow = classifyWorkflow(workflowText);

  const infoStatus = info?.qualityStatus || 'unknown';
  const topicStatus = topics?.qualityStatus || 'unknown';
  const knowledgeStatus = knowledgeLintStatus(knowledge);
  const linkStatus = worstStatus([linkStatusFrom(info), linkStatusFrom(topics), linkStatusFrom(knowledge)]);
  const localFormalStatus = topics?.todayStatus === 'formal'
    ? 'confirmed-formal'
    : topics?.todayStatus === 'scheduled'
      ? 'scheduled'
      : 'manual-check-required';

  const criticalIssues = [
    ...(workflow.criticalIssues || []),
    ...(linkStatus === 'fail' ? ['一方链接或公开扫描桥接存在 fail'] : []),
    ...(topics?.todayStatus === 'formal' && topics?.dates?.find((entry) => entry.date === topics.today)?.isFallback
      ? ['专题状态冲突：fallback 被标成 formal']
      : []),
  ];
  const warnings = [
    ...(workflow.warnings || []),
    ...(infoStatus === 'warn' ? ['信息库质量为 warn'] : []),
    ...(topicStatus === 'warn' ? ['专题研究状态为 warn'] : []),
    ...(knowledgeStatus === 'warn' ? ['知识库 lint 状态为 warn'] : []),
    ...(localFormalStatus === 'manual-check-required' ? ['本地正式任务无法确认已完成，需要人工补跑或等待正式自动化'] : []),
    ...(Array.isArray(topics?.pendingRerunDates) && topics.pendingRerunDates.length > 0
      ? [`专题待正式重跑 ${topics.pendingRerunDates.length} 天`]
      : []),
  ];

  const status = {
    generatedAt: new Date().toISOString(),
    module: 'automation',
    qualityStatus: criticalIssues.length > 0 ? 'fail' : warnings.length > 0 ? 'warn' : 'pass',
    chains: {
      infoFeed: {
        qualityStatus: infoStatus,
        latestDate: info?.latestDate || null,
        latestCardCount: info?.latestCardCount ?? null,
        newFactCount: info?.newFactCount ?? null,
      },
      topicProjects: {
        qualityStatus: topicStatus,
        today: topics?.today || null,
        todayStatus: topics?.todayStatus || 'unknown',
        latestFormalDate: topics?.latestFormalDate || null,
        pendingRerunDates: topics?.pendingRerunDates || [],
      },
      knowledgeLint: {
        qualityStatus: knowledgeStatus,
        latestCatalogDate: knowledge?.latestCatalogDate || null,
        reportCount: knowledge?.counts?.reports ?? null,
        privatePathLeakCount: knowledge?.privatePathLeaks?.length ?? null,
      },
      linkCheck: {
        qualityStatus: linkStatus,
        brokenCount: Math.max(
          info?.links?.brokenCount || 0,
          topics?.links?.brokenCount || 0,
          knowledge?.links?.brokenCount || 0,
        ),
        checkedAt: info?.links?.checkedAt || topics?.links?.checkedAt || knowledge?.links?.checkedAt || null,
      },
      githubActionsFallback: workflow,
      localFormalTask: {
        status: localFormalStatus,
        evidence: '仅根据 topic-projects manifest 判断；无法从云端伪造本地正式运行完成。',
      },
    },
    warnings,
    criticalIssues,
    operatingRule: 'GitHub Actions 只能兜底、审计和记录状态；正式研究完成只能由 formal 条件确认。',
  };

  fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(statusPath, JSON.stringify(status, null, 2) + '\n');
  console.log(`Automation status generated: ${status.qualityStatus}; local formal task ${localFormalStatus}.`);

  if (status.qualityStatus === 'fail') {
    process.exitCode = 1;
  }
}

main();
