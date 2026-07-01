const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const operationsDir = path.join(root, 'operations');
const systemHealthPath = path.join(operationsDir, 'system-health-latest.md');

function readJson(relativePath) {
  const filePath = path.join(root, relativePath);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function statusIcon(status) {
  if (status === 'pass') return '✅ pass';
  if (status === 'fail') return '❌ fail';
  if (status === 'warn') return '⚠️ warn';
  return '⚠️ unknown';
}

function worstStatus(statuses) {
  if (statuses.includes('fail')) return 'fail';
  if (statuses.includes('warn') || statuses.includes('unknown')) return 'warn';
  return 'pass';
}

function list(values, limit = 12) {
  if (!Array.isArray(values) || values.length === 0) return '无';
  const head = values.slice(0, limit).join('、');
  return values.length > limit ? `${head} 等 ${values.length} 项` : head;
}

function renderHealth({ info, topics, knowledge, automation }) {
  const linkStatuses = [
    info?.links?.qualityStatus,
    topics?.links?.qualityStatus,
    knowledge?.links?.qualityStatus,
    automation?.chains?.linkCheck?.qualityStatus,
  ].filter(Boolean);
  const linkStatus = worstStatus(linkStatuses.length ? linkStatuses : ['unknown']);
  const overallStatus = worstStatus([
    info?.qualityStatus || 'unknown',
    topics?.qualityStatus || 'unknown',
    knowledge?.qualityStatus || 'unknown',
    automation?.qualityStatus || 'unknown',
    linkStatus,
  ]);
  const criticalIssues = [
    ...(info?.criticalIssues || []),
    ...(topics?.criticalIssues || []),
    ...(knowledge?.criticalIssues || []),
    ...(automation?.criticalIssues || []),
  ];
  const warnings = [
    ...(info?.warnings || []),
    ...(topics?.warnings || []),
    ...(knowledge?.warnings || []),
    ...(automation?.warnings || []),
  ];
  const conclusion = overallStatus === 'fail'
    ? '存在阻断项；首页和自动化不得显示已正式完成。'
    : overallStatus === 'warn'
      ? '状态链可信但仍有运营债务；允许展示 warn，不允许美化成 pass。'
      : '状态一致，链接与路径检查通过，fallback 未冒充正式产物。';

  return `# 系统健康状态

> 自动生成：${new Date().toISOString()}

## 一眼判断

- 总体状态：${statusIcon(overallStatus)}
- 情报流状态：${statusIcon(info?.qualityStatus)}
- 专题研究状态：${statusIcon(topics?.qualityStatus)}
- 知识库状态：${statusIcon(knowledge?.qualityStatus)}
- 自动化状态：${statusIcon(automation?.qualityStatus)}
- 一方链接状态：${statusIcon(linkStatus)}
- 当前结论：${conclusion}

## 情报流状态

- 最新日期：${info?.latestDate || '未生成'}
- 今日卡片数：${info?.latestCardCount ?? info?.latest?.cardCount ?? '未知'}
- 今日新增事实：${info?.newFactCount ?? info?.latest?.newFactCount ?? '未知'}
- 旧线复核 / Context：${info?.contextCount ?? info?.latest?.contextCount ?? '未知'}
- 弱信号：${info?.weakSignalCount ?? info?.latest?.weakSignalCount ?? '未知'}
- 缺口记录：${info?.gapRecordCount ?? info?.latest?.gapRecordCount ?? '未知'}
- 渠道覆盖：${Array.isArray(info?.channelCoverage) ? info.channelCoverage.join('、') : Object.keys(info?.latest?.channelCoverage || {}).join('、') || '未识别'}
- sourceUrl 缺失：${info?.sourceUrlMissingCount ?? info?.latest?.sourceUrlMissingCount ?? '未知'}

## 专题研究状态

- 今日日期：${topics?.today || '未生成'}
- 今日专题状态：${topics?.todayStatus || '未生成'}
- 最新正式日报日期：${topics?.latestFormalDate || '无'}
- 待正式重跑日期数：${topics?.pendingRerunDates?.length ?? 0}
- 待正式重跑日期：${list(topics?.pendingRerunDates)}

## 知识库状态

- Catalog 日期：${knowledge?.latestCatalogDate || '未标注'}
- 知识源：${knowledge?.counts?.knowledgeSources ?? '未知'}
- 报告 / 知识页：${knowledge?.counts?.reports ?? '未知'}
- 待重试 PDF：${knowledge?.pdfRetryCount ?? '未知'}
- 本地或私有路径泄露：${knowledge?.privatePathLeaks?.length ?? '未知'}
- 缺失 summaryFile：${knowledge?.missingSummaryFiles?.length ?? '未知'}

## 自动化状态

- 本地正式任务：${automation?.chains?.localFormalTask?.status || 'unknown'}
- GitHub Actions 角色：${automation?.chains?.githubActionsFallback?.role || 'unknown'}
- GitHub Actions 定时数：${automation?.chains?.githubActionsFallback?.schedules ?? '未知'}
- 信息库链路：${statusIcon(automation?.chains?.infoFeed?.qualityStatus)}
- 专题链路：${statusIcon(automation?.chains?.topicProjects?.qualityStatus)}
- 知识库 lint 链路：${statusIcon(automation?.chains?.knowledgeLint?.qualityStatus)}
- 链接检查链路：${statusIcon(automation?.chains?.linkCheck?.qualityStatus)}

## 链接检查

- 一方断链数：${Math.max(info?.links?.brokenCount || 0, topics?.links?.brokenCount || 0, knowledge?.links?.brokenCount || 0)}
- 外部链接 warning：${Math.max(info?.links?.externalWarnings || 0, topics?.links?.externalWarnings || 0, knowledge?.links?.externalWarnings || 0)}
- 公开扫描桥接：${(info?.links?.publicScanBridge || []).map((entry) => `${entry.ok ? 'ok' : 'warn'}:${entry.status || 'n/a'}`).join('、') || '未检查'}

## 质量语义

- pass：状态一致；一方链接无 broken；无路径泄露；脚本通过；fallback 未冒充 formal。
- warn：外部链接网络失败；低信息日但有缺口说明；今日未到正式运行时间；专题待正式重跑；sourceUrl 缺失但为弱信号或缺口记录。
- fail：本机绝对路径或私有来源路径泄露；一方内部链接 broken；公开扫描桥接 404；manifest JSON 不可解析；fallback 被标成 formal；弱信号被标成 L3/L4；首页关键状态不可验证。

## 当前问题

${criticalIssues.length ? criticalIssues.map((issue) => `- ❌ ${issue}`).join('\n') : '- ✅ 无 P0 fail。'}
${warnings.length ? warnings.slice(0, 20).map((issue) => `- ⚠️ ${issue}`).join('\n') : '- ✅ 无额外 warning。'}
`;
}

function main() {
  const info = readJson('data/info-feed-status.json');
  const topics = readJson('data/topic-projects-status.json');
  const knowledge = readJson('data/knowledge-status.json');
  const automation = readJson('data/automation-status.json');

  fs.mkdirSync(operationsDir, { recursive: true });
  fs.writeFileSync(systemHealthPath, renderHealth({ info, topics, knowledge, automation }));
  const overall = worstStatus([
    info?.qualityStatus || 'unknown',
    topics?.qualityStatus || 'unknown',
    knowledge?.qualityStatus || 'unknown',
    automation?.qualityStatus || 'unknown',
  ]);
  console.log(`System health generated: ${overall}.`);

  if (overall === 'fail') {
    process.exitCode = 1;
  }
}

main();
