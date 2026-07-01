const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const dataDir = path.join(root, 'data');
const operationsDir = path.join(root, 'operations');
const catalogPath = path.join(root, 'knowledge', 'catalog.json');
const indexPath = path.join(root, 'knowledge', 'index.md');
const statusPath = path.join(dataDir, 'knowledge-status.json');
const lintReportPath = path.join(operationsDir, 'knowledge-lint-latest.md');

const PRIVATE_PATH_PATTERN = new RegExp([
  '\\/' + 'Users\\/',
  '\\/' + 'private\\/' + 'tmp',
  '\\/' + 'private\\/' + 'var',
  '\\.' + 'workbuddy',
  'WorkBuddy\\/' + 'Claw',
  'file:\\/\\/',
  'private scan',
  '私有扫描' + '路径',
].join('|'), 'i');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function walkStrings(value, visitor, trail = []) {
  if (Array.isArray(value)) {
    value.forEach((entry, index) => walkStrings(entry, visitor, [...trail, index]));
    return;
  }
  if (value && typeof value === 'object') {
    Object.entries(value).forEach(([key, entry]) => walkStrings(entry, visitor, [...trail, key]));
    return;
  }
  if (typeof value === 'string') {
    visitor(value, trail);
  }
}

function normalizeRepoPath(filePath) {
  if (!filePath || /^https?:\/\//.test(filePath)) return null;
  const normalized = filePath.replace(/^\.\//, '');
  return path.join(root, normalized);
}

function collectSummaryFiles(catalog) {
  const entries = [];
  for (const section of ['knowledgeSources', 'reports']) {
    for (const item of catalog[section] || []) {
      entries.push({
        section,
        id: item.id || item.title || 'unknown',
        title: item.title || item.id || '未命名',
        summaryFile: item.summaryFile || '',
        summaryPath: normalizeRepoPath(item.summaryFile),
      });
    }
  }
  return entries;
}

function duplicateIndexNumbers(markdown) {
  const duplicates = [];
  let section = 'root';
  const seenBySection = new Map();
  for (const line of markdown.split('\n')) {
    const heading = line.match(/^##\s+(.+)/);
    if (heading) section = heading[1].trim();
    const row = line.match(/^\|\s*(\d+)\s*\|/);
    if (!row) continue;
    const number = row[1];
    const key = `${section}:${number}`;
    if (seenBySection.has(key)) {
      duplicates.push({ section, number, line: line.trim() });
    } else {
      seenBySection.set(key, true);
    }
  }
  return duplicates;
}

function countKnowledgePages(catalog) {
  const reports = catalog.reports || [];
  const sources = catalog.knowledgeSources || [];
  const typeCounts = reports.reduce((acc, report) => {
    const sourceType = report.sourceType || 'unknown';
    acc[sourceType] = (acc[sourceType] || 0) + 1;
    return acc;
  }, {});
  return {
    reports: reports.length,
    knowledgeSources: sources.length,
    sourceTypes: typeCounts,
  };
}

function qualityStatus(criticalIssues, warnings) {
  if (criticalIssues.length > 0) return 'fail';
  if (warnings.length > 0) return 'warn';
  return 'pass';
}

function main() {
  if (!fs.existsSync(catalogPath)) throw new Error('knowledge/catalog.json does not exist');
  if (!fs.existsSync(indexPath)) throw new Error('knowledge/index.md does not exist');

  const catalog = readJson(catalogPath);
  const indexMarkdown = fs.readFileSync(indexPath, 'utf8');
  const privatePathLeaks = [];
  walkStrings(catalog, (value, trail) => {
    if (PRIVATE_PATH_PATTERN.test(value)) {
      privatePathLeaks.push({ path: trail.join('.'), value });
    }
  });
  if (PRIVATE_PATH_PATTERN.test(indexMarkdown)) {
    privatePathLeaks.push({ path: 'knowledge/index.md', value: 'index markdown contains private/local path pattern' });
  }

  const summaryFiles = collectSummaryFiles(catalog);
  const missingSummaryFiles = summaryFiles
    .filter((entry) => !entry.summaryFile || !entry.summaryPath || !fs.existsSync(entry.summaryPath))
    .map((entry) => ({
      section: entry.section,
      id: entry.id,
      title: entry.title,
      summaryFile: entry.summaryFile || null,
    }));
  const duplicateNumbers = duplicateIndexNumbers(indexMarkdown);
  const counts = countKnowledgePages(catalog);
  const pdfRetryEntries = (catalog.reports || []).filter((report) => /待重试|retry/i.test(`${report.status || ''} ${report.description || ''} ${report.fileName || ''}`));
  const warnings = [];
  const criticalIssues = [];

  if (privatePathLeaks.length > 0) criticalIssues.push(`发现 ${privatePathLeaks.length} 处本地绝对路径或私有路径泄露。`);
  if (missingSummaryFiles.length > 0) criticalIssues.push(`发现 ${missingSummaryFiles.length} 个 catalog summaryFile 缺失或指向不存在文件。`);
  if (duplicateNumbers.length > 0) warnings.push(`knowledge/index.md 存在 ${duplicateNumbers.length} 个重复编号。`);

  const status = {
    generatedAt: new Date().toISOString(),
    module: 'knowledge-base',
    qualityStatus: qualityStatus(criticalIssues, warnings),
    latestCatalogDate: catalog.lastUpdated || null,
    counts,
    privatePathLeaks,
    missingSummaryFiles,
    duplicateNumbers,
    pdfRetryCount: pdfRetryEntries.length,
    pdfRetrySample: pdfRetryEntries.slice(0, 10).map((entry) => ({
      id: entry.id,
      title: entry.title,
      summaryFile: entry.summaryFile,
    })),
    warnings,
    criticalIssues,
    brokenLinks: [],
    links: {
      checkedAt: null,
      qualityStatus: 'pending',
      firstPartyChecked: 0,
      externalWarnings: 0,
      brokenCount: 0,
    },
  };

  fs.mkdirSync(dataDir, { recursive: true });
  fs.mkdirSync(operationsDir, { recursive: true });
  fs.writeFileSync(statusPath, JSON.stringify(status, null, 2) + '\n');

  const leakRows = privatePathLeaks.length
    ? privatePathLeaks.map((leak) => `| ${leak.path} | ${leak.value.replace(/\|/g, '／')} |`).join('\n')
    : '| - | - |';
  const missingRows = missingSummaryFiles.length
    ? missingSummaryFiles.map((entry) => `| ${entry.section} | ${entry.id} | ${entry.summaryFile || '未填写'} |`).join('\n')
    : '| - | - |';
  const duplicateRows = duplicateNumbers.length
    ? duplicateNumbers.map((entry) => `| ${entry.section} | ${entry.number} | ${entry.line.replace(/\|/g, '／')} |`).join('\n')
    : '| - | - |';

  const report = `# 知识库 Lint 最新结果

> 自动生成：${status.generatedAt}

## 总览

- 状态：${status.qualityStatus}
- Catalog 日期：${status.latestCatalogDate || '未标注'}
- 知识源：${counts.knowledgeSources}
- 报告 / 知识页：${counts.reports}
- PDF 待重试样本数：${status.pdfRetryCount}
- 本地或私有路径泄露：${privatePathLeaks.length}
- 缺失 summaryFile：${missingSummaryFiles.length}
- 重复编号：${duplicateNumbers.length}

## 问题

${[...criticalIssues, ...warnings].length ? [...criticalIssues, ...warnings].map((issue) => `- ⚠️ ${issue}`).join('\n') : '- ✅ 未发现 Phase 1 强检查问题。'}

## 本地或私有路径泄露

| 位置 | 内容 |
|---|---|
${leakRows}

## 缺失 summaryFile

| 区域 | ID | summaryFile |
|---|---|---|
${missingRows}

## 重复编号

| 区域 | 编号 | 行 |
|---|---:|---|
${duplicateRows}
`;

  fs.writeFileSync(lintReportPath, report);
  console.log(`Knowledge lint completed: ${status.qualityStatus}; reports ${counts.reports}, sources ${counts.knowledgeSources}.`);

  if (status.qualityStatus === 'fail') {
    process.exitCode = 1;
  }
}

main();
