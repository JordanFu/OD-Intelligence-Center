const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const dataDir = path.join(root, 'data');
const operationsDir = path.join(root, 'operations');
const infoStatusPath = path.join(dataDir, 'info-feed-status.json');
const topicStatusPath = path.join(dataDir, 'topic-projects-status.json');
const knowledgeStatusPath = path.join(dataDir, 'knowledge-status.json');
const topicManifestPath = path.join(root, 'specials', 'ai-org-talent-mechanism', 'manifest.json');
const systemHealthPath = path.join(operationsDir, 'system-health-latest.md');
const repairLogPath = path.join(operationsDir, 'repair-log-2026-07-01.md');

const FIRST_PARTY_HOSTS = new Set([
  'jordanfu.github.io',
]);

const REPO_PUBLIC_PREFIX = '/OD-Intelligence-Center/';
const PUBLIC_SCAN_PREFIX = 'https://jordanfu.github.io/org-intelligence-info/';

function readJson(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2) + '\n');
}

function isIgnoredUrl(url) {
  return !url
    || url.startsWith('#')
    || url.startsWith('mailto:')
    || url.startsWith('javascript:')
    || url.startsWith('tel:')
    || url.startsWith('data:')
    || (/^[a-z][a-z0-9+.-]*:/i.test(url) && !/^https?:\/\//i.test(url))
    || url.includes('${')
    || url.includes('<%')
    || url === '.+?'
    || url === '.+';
}

function stripFragmentAndQuery(url) {
  return url.replace(/[`。，、；;]+$/g, '').split('#')[0].split('?')[0];
}

function extractLinksFromText(text, sourceFile) {
  const links = [];
  const hrefRegex = /\b(?:href|src)=["']([^"']+)["']/gi;
  const mdRegex = /\[[^\]]+\]\(([^)]+)\)/g;
  const urlRegex = /https?:\/\/[^\s"')<>]+/g;
  let match;
  while ((match = hrefRegex.exec(text)) !== null) links.push({ url: stripFragmentAndQuery(match[1]), sourceFile });
  while ((match = mdRegex.exec(text)) !== null) links.push({ url: stripFragmentAndQuery(match[1]), sourceFile });
  while ((match = urlRegex.exec(text)) !== null) links.push({ url: stripFragmentAndQuery(match[0]), sourceFile });
  return links.filter((link) => !isIgnoredUrl(link.url));
}

function addJsonPathLinks(value, sourceFile, links, keys = new Set(['summaryFile', 'rawFile', 'pdfFile', 'markdown', 'html', 'overview', 'overviewMarkdown', 'index'])) {
  if (Array.isArray(value)) {
    value.forEach((entry) => addJsonPathLinks(entry, sourceFile, links, keys));
    return;
  }
  if (!value || typeof value !== 'object') return;
  for (const [key, entry] of Object.entries(value)) {
    if (typeof entry === 'string' && keys.has(key) && !isIgnoredUrl(entry)) {
      links.push({ url: stripFragmentAndQuery(entry), sourceFile });
    } else if (entry && typeof entry === 'object') {
      addJsonPathLinks(entry, sourceFile, links, keys);
    }
  }
}

function collectInternalLinkCandidates() {
  const links = [];
  const files = [
    path.join(root, 'index.html'),
    path.join(root, 'knowledge', 'index.md'),
  ].filter((file) => fs.existsSync(file));

  const info = readJson(infoStatusPath);
  if (info?.latestDate) {
    for (const file of [
      path.join(root, 'daily', `${info.latestDate}.md`),
      path.join(root, 'daily-report', `${info.latestDate}.md`),
    ]) {
      if (fs.existsSync(file)) files.push(file);
    }
  }

  const uniqueFiles = [...new Set(files)];
  links.push(...uniqueFiles.flatMap((file) => {
    const text = fs.readFileSync(file, 'utf8');
    return extractLinksFromText(text, path.relative(root, file).replace(/\\/g, '/'));
  }));

  for (const [filePath, sourceFile] of [
    [path.join(root, 'knowledge', 'catalog.json'), 'knowledge/catalog.json'],
    [topicManifestPath, 'specials/ai-org-talent-mechanism/manifest.json'],
    [infoStatusPath, 'data/info-feed-status.json'],
    [topicStatusPath, 'data/topic-projects-status.json'],
    [knowledgeStatusPath, 'data/knowledge-status.json'],
  ]) {
    const json = readJson(filePath);
    if (json) addJsonPathLinks(json, sourceFile, links);
  }

  if (info?.homepageBridge?.latestScanUrl) links.push({ url: info.homepageBridge.latestScanUrl, sourceFile: 'data/info-feed-status.json' });
  if (info?.homepageBridge?.publicMirrorUrl) links.push({ url: info.homepageBridge.publicMirrorUrl, sourceFile: 'data/info-feed-status.json' });

  return links;
}

function classifyUrl(url) {
  if (url.startsWith(PUBLIC_SCAN_PREFIX)) return 'public-scan';
  if (/^https?:\/\//i.test(url)) {
    try {
      const parsed = new URL(url);
      if (FIRST_PARTY_HOSTS.has(parsed.hostname) && parsed.pathname.startsWith(REPO_PUBLIC_PREFIX)) return 'first-party-public';
      return 'external';
    } catch {
      return 'external';
    }
  }
  return 'internal';
}

function localPathFor(url, sourceFile) {
  const clean = decodeURIComponent(stripFragmentAndQuery(url));
  if (/^https?:\/\//i.test(clean)) {
    const parsed = new URL(clean);
    if (parsed.hostname === 'jordanfu.github.io' && parsed.pathname.startsWith(REPO_PUBLIC_PREFIX)) {
      return path.join(root, parsed.pathname.replace(REPO_PUBLIC_PREFIX, ''));
    }
    return null;
  }
  if (clean.startsWith('/')) return path.join(root, clean.replace(/^\/+/, ''));
  if (
    clean.startsWith('./knowledge/') || clean.startsWith('knowledge/')
    || clean.startsWith('./specials/') || clean.startsWith('specials/')
    || clean.startsWith('./daily/') || clean.startsWith('daily/')
    || clean.startsWith('./daily-report/') || clean.startsWith('daily-report/')
    || clean.startsWith('./operations/') || clean.startsWith('operations/')
    || clean.startsWith('./data/') || clean.startsWith('data/')
    || clean.startsWith('./pdfs/') || clean.startsWith('pdfs/')
  ) {
    return path.join(root, clean.replace(/^\.\//, ''));
  }
  return path.resolve(root, path.dirname(sourceFile), clean);
}

function checkInternalLink(link) {
  const targetPath = localPathFor(link.url, link.sourceFile);
  if (!targetPath) return null;
  const generatedDuringThisRun = new Set([
    systemHealthPath,
    repairLogPath,
    path.join(operationsDir, 'knowledge-lint-latest.md'),
  ]);
  if (generatedDuringThisRun.has(targetPath)) return null;
  if (fs.existsSync(targetPath)) return null;
  return {
    type: classifyUrl(link.url),
    sourceFile: link.sourceFile,
    url: link.url,
    reason: 'local target does not exist',
    resolvedPath: path.relative(root, targetPath).replace(/\\/g, '/'),
  };
}

async function checkPublicScanUrl(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    let response = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: controller.signal,
    });
    if (response.status === 405 || response.status === 403) {
      response = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        signal: controller.signal,
      });
    }
    if (response.status === 404) {
      return {
        ok: false,
        hardBroken: true,
        status: response.status,
        url,
        reason: 'public scan bridge returned 404',
      };
    }
    if (!response.ok) {
      return {
        ok: false,
        hardBroken: false,
        status: response.status,
        url,
        reason: `public scan bridge returned HTTP ${response.status}`,
      };
    }
    return { ok: true, status: response.status, url };
  } catch (error) {
    return {
      ok: false,
      hardBroken: false,
      status: null,
      url,
      reason: `network check warning: ${error.message}`,
    };
  } finally {
    clearTimeout(timer);
  }
}

function worstStatus(existing, linkStatus) {
  if (existing === 'fail' || linkStatus === 'fail') return 'fail';
  if (existing === 'warn' || linkStatus === 'warn') return 'warn';
  return existing || linkStatus || 'pass';
}

function mergeLinkStatus(status, linkStatus) {
  if (!status) return null;
  const existingWarnings = Array.isArray(status.warnings) ? status.warnings : [];
  const warningText = linkStatus.warnings.map((warning) => warning.reason || warning.url || String(warning));
  const merged = {
    ...status,
    qualityStatus: worstStatus(status.qualityStatus, linkStatus.qualityStatus),
    brokenLinks: linkStatus.brokenLinks,
    warnings: [...existingWarnings, ...warningText],
    links: {
      checkedAt: linkStatus.checkedAt,
      qualityStatus: linkStatus.qualityStatus,
      firstPartyChecked: linkStatus.firstPartyChecked,
      externalWarnings: linkStatus.warnings.length,
      brokenCount: linkStatus.brokenLinks.length,
      publicScanBridge: linkStatus.publicScanBridge,
    },
  };
  return merged;
}

function renderStatusLine(status) {
  if (!status) return '未生成';
  if (status.qualityStatus === 'pass') return '✅ pass';
  if (status.qualityStatus === 'fail') return '❌ fail';
  return '⚠️ warn';
}

function renderSystemHealth({ info, topics, knowledge, linkStatus }) {
  const topicPending = topics?.pendingRerunDates || [];
  return `# 系统健康状态

> 自动生成：${new Date().toISOString()}

## 一眼判断

- 情报流状态：${renderStatusLine(info)}
- 专题研究状态：${renderStatusLine(topics)}
- 知识库状态：${renderStatusLine(knowledge)}
- 一方链接状态：${linkStatus.qualityStatus === 'pass' ? '✅ pass' : linkStatus.qualityStatus === 'fail' ? '❌ fail' : '⚠️ warn'}
- 当前结论：${linkStatus.qualityStatus === 'fail' || [info, topics, knowledge].some((entry) => entry?.qualityStatus === 'fail') ? '系统仍有 P0/P1 风险，首页必须显示告警，不得显示虚假已同步。' : '状态链已可读；当前主要剩余问题是信息质量 warning、专题待补跑和知识库复利深化。'}

## 情报流状态

- 最新日期：${info?.latestDate || '未生成'}
- 今日卡片数：${info?.latest?.cardCount ?? '未知'}
- 今日新增事实：${info?.latest?.newFactCount ?? '未知'}
- 弱信号：${info?.latest?.weakSignalCount ?? '未知'}
- 缺口记录：${info?.latest?.gapCount ?? '未知'}
- 渠道覆盖：${(info?.latest?.channelTypes || []).join('、') || '未识别'}
- 断链数：${info?.brokenLinks?.length ?? 0}

## 专题研究状态

- 今日日期：${topics?.today || '未生成'}
- 今日专题状态：${topics?.todayStatus || '未生成'}
- 最新正式日报日期：${topics?.latestFormalDate || '无'}
- 待正式重跑日期数：${topicPending.length}
- 待正式重跑日期：${topicPending.slice(0, 20).join('、') || '无'}

## 知识库状态

- Catalog 日期：${knowledge?.latestCatalogDate || '未标注'}
- 知识源：${knowledge?.counts?.knowledgeSources ?? '未知'}
- 知识页 / 报告：${knowledge?.counts?.reports ?? '未知'}
- 待重试 PDF：${knowledge?.pdfRetryCount ?? '未知'}
- 本地或私有路径泄露：${knowledge?.privatePathLeaks?.length ?? '未知'}
- 缺失 summaryFile：${knowledge?.missingSummaryFiles?.length ?? '未知'}

## 链接检查

- 一方链接检查数：${linkStatus.firstPartyChecked}
- 一方断链数：${linkStatus.brokenLinks.length}
- 外部链接 warning：${linkStatus.warnings.length}

${linkStatus.brokenLinks.length ? linkStatus.brokenLinks.map((link) => `- ❌ ${link.sourceFile} -> ${link.url}（${link.reason}）`).join('\n') : '- ✅ 未发现一方内部断链或公开扫描桥接 404。'}
`;
}

function renderRepairLog({ info, topics, knowledge, linkStatus }) {
  return `# Phase 1 主编系统修复日志｜2026-07-01

## 已修复

- 新增三类状态 manifest：\`data/info-feed-status.json\`、\`data/topic-projects-status.json\`、\`data/knowledge-status.json\`。
- 信息库审计只强制检查最新日期，兼容旧 \`digest.md\`，并把新字段缺失列为 warning，不批量改写历史。
- 专题状态生成器按正向条件识别正式决策稿，明确区分 \`formal\`、\`fallback\`、\`needs-rerun\`、\`missing\`。
- 知识库 lint 检查本地/私有路径泄露、summaryFile 存在性和索引重复编号。
- 公共链接检查把一方断链和公开扫描桥接 404 写入 manifest，首页不能再无条件显示“已同步”。
- 系统健康状态汇总写入 \`operations/system-health-latest.md\`。

## 当前状态

- 情报流：${info?.qualityStatus || '未生成'}，最新日期 ${info?.latestDate || '未知'}，今日卡片 ${info?.latest?.cardCount ?? '未知'}。
- 专题研究：${topics?.qualityStatus || '未生成'}，今日状态 ${topics?.todayStatus || '未知'}，最新正式日报 ${topics?.latestFormalDate || '无'}。
- 知识库：${knowledge?.qualityStatus || '未生成'}，本地/私有路径泄露 ${knowledge?.privatePathLeaks?.length ?? '未知'}，缺失 summaryFile ${knowledge?.missingSummaryFiles?.length ?? '未知'}。
- 链接检查：${linkStatus.qualityStatus}，一方断链 ${linkStatus.brokenLinks.length}。

## 仍未完成

- Phase 1 不重写最近 7 天 \`digest.md\`，因此历史信息卡的新字段缺失只作为 warning。
- Phase 1 不补 11 个实体页长文；实体页、概念页、对比页复利在 Phase 2 处理。
- Phase 1 不重跑正式专题日报；若未到 18:00 正式窗口，首页显示“待今日正式运行”；若今日只有 fallback 或缺失，首页显示“待正式重跑”。

## 需要补跑或人工验证

- 待正式重跑日期：${(topics?.pendingRerunDates || []).slice(0, 30).join('、') || '无'}
- 待人工验证链接：${linkStatus.warnings.map((warning) => warning.url || warning.reason).slice(0, 20).join('、') || '无'}

## 之后每日自动化应如何运行

1. 本地深度研究在 18:00 生成正式日报、专题证据和知识库回流。
2. GitHub Actions 只能兜底、审计、记录缺口，不能把兜底稿标为正式日报。
3. 每次自动提交前依次运行信息库审计、专题状态生成、知识库 lint 和公共链接检查。
4. 如果没有足够可信新增，首页显示缺口，不用低质量内容填充。
`;
}

async function main() {
  fs.mkdirSync(dataDir, { recursive: true });
  fs.mkdirSync(operationsDir, { recursive: true });

  const links = collectInternalLinkCandidates();
  const internalLinks = [];
  const externalWarnings = [];
  const publicScanUrls = new Set();
  const brokenLinks = [];

  for (const link of links) {
    const type = classifyUrl(link.url);
    if (type === 'external') {
      if (/^https?:\/\//i.test(link.url)) {
        externalWarnings.push({ ...link, type, reason: 'external link not hard-checked in Phase 1' });
      }
      continue;
    }
    if (type === 'public-scan') {
      publicScanUrls.add(stripFragmentAndQuery(link.url));
      continue;
    }
    internalLinks.push(link);
    const broken = checkInternalLink(link);
    if (broken) brokenLinks.push(broken);
  }

  const info = readJson(infoStatusPath);
  if (info?.homepageBridge?.latestScanUrl) publicScanUrls.add(info.homepageBridge.latestScanUrl);

  const publicScanResults = [];
  for (const url of publicScanUrls) {
    const result = await checkPublicScanUrl(url);
    publicScanResults.push(result);
    if (!result.ok && result.hardBroken) {
      brokenLinks.push({
        type: 'public-scan',
        sourceFile: 'data/info-feed-status.json',
        url,
        reason: result.reason,
        status: result.status,
      });
    } else if (!result.ok) {
      externalWarnings.push({
        type: 'public-scan',
        sourceFile: 'data/info-feed-status.json',
        url,
        reason: result.reason,
        status: result.status,
      });
    }
  }

  const checkedAt = new Date().toISOString();
  const linkStatus = {
    checkedAt,
    qualityStatus: brokenLinks.length > 0 ? 'fail' : externalWarnings.length > 0 ? 'warn' : 'pass',
    firstPartyChecked: internalLinks.length + publicScanUrls.size,
    brokenLinks,
    warnings: externalWarnings,
    publicScanBridge: publicScanResults,
  };

  const mergedInfo = mergeLinkStatus(readJson(infoStatusPath), linkStatus);
  const mergedTopics = mergeLinkStatus(readJson(topicStatusPath), linkStatus);
  const mergedKnowledge = mergeLinkStatus(readJson(knowledgeStatusPath), linkStatus);
  const mergedTopicManifest = mergeLinkStatus(readJson(topicManifestPath), linkStatus);

  if (mergedInfo) writeJson(infoStatusPath, mergedInfo);
  if (mergedTopics) writeJson(topicStatusPath, mergedTopics);
  if (mergedKnowledge) writeJson(knowledgeStatusPath, mergedKnowledge);
  if (mergedTopicManifest) writeJson(topicManifestPath, mergedTopicManifest);

  console.log(`Public link check completed: ${linkStatus.qualityStatus}; checked ${linkStatus.firstPartyChecked}, broken ${brokenLinks.length}, warnings ${externalWarnings.length}.`);

  if (linkStatus.qualityStatus === 'fail') {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
