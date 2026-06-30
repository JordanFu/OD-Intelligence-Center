const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const digestPath = path.join(root, 'digest.md');
const operationsDir = path.join(root, 'operations');
const statusJsonPath = path.join(operationsDir, 'info-library-status.json');
const statusMdPath = path.join(operationsDir, 'info-library-status.md');
const dailyDir = path.join(root, 'daily');
const dailyReportDir = path.join(root, 'daily-report');
const weeklyDir = path.join(root, 'weekly');

const MIN_LATEST_ITEMS = 8;
const MIN_LATEST_PLATFORMS = 4;
const MIN_LATEST_LINKS = 6;
const MIN_INSIGHT_CHARS = 24;

function parseDigest(markdown) {
  const lines = markdown.split('\n');
  const days = [];
  let currentDay = null;
  let currentItem = null;

  for (const line of lines) {
    if (line.includes('<!--')) continue;

    const dayMatch = line.match(/^## (\d{4}-\d{2}-\d{2})\b/);
    if (dayMatch) {
      if (currentDay && currentDay.items.length > 0) days.push(currentDay);
      currentDay = { date: dayMatch[1], items: [] };
      currentItem = null;
      continue;
    }

    if (!currentDay) continue;

    const titleMatch = line.match(/^### \[(\d+)\]\s+(.+)/);
    if (titleMatch) {
      currentItem = {
        id: titleMatch[1],
        title: titleMatch[2].trim(),
        summary: '',
        source: '',
        sourceUrl: '',
        platform: '',
        trust: '',
        insight: '',
        tags: [],
        time: '',
      };
      currentDay.items.push(currentItem);
      continue;
    }

    if (!currentItem) continue;

    const fieldMatch = line.match(/^- \*\*(事件摘要|来源|来源平台|来源可信度|OD启示|标签|抓取时间)\*\*[：:]\s*(.+)/);
    if (!fieldMatch) continue;

    const [, field, value] = fieldMatch;
    const text = value.trim();

    if (field === '事件摘要') currentItem.summary = text;
    if (field === '来源') {
      currentItem.source = text;
      const urlMatch = text.match(/https?:\/\/[^）)\s]+/);
      if (urlMatch) currentItem.sourceUrl = urlMatch[0];
    }
    if (field === '来源平台') currentItem.platform = text;
    if (field === '来源可信度') currentItem.trust = text;
    if (field === 'OD启示') currentItem.insight = text;
    if (field === '标签') currentItem.tags = text.match(/#[\w\u4e00-\u9fff-]+/g) || [];
    if (field === '抓取时间') currentItem.time = text;
  }

  if (currentDay && currentDay.items.length > 0) days.push(currentDay);
  return days;
}

function countMissing(items, field) {
  return items.filter((item) => !item[field] || (Array.isArray(item[field]) && item[field].length === 0)).length;
}

function countLinks(text) {
  return (text.match(/https?:\/\/[^\s）)]+/g) || []).length;
}

function listMarkdownDates(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .map((file) => file.match(/^(\d{4}-\d{2}-\d{2})\.md$/))
    .filter(Boolean)
    .map((match) => match[1])
    .sort();
}

function detectAbcStyle(text) {
  const patterns = [
    /\bmanager\b/i,
    /\btitle\b/i,
    /\bcapability map\b/i,
    /\bskills-based\b/i,
    /\baccountability\b/i,
    /\bgovernance literacy\b/i,
    /\brepeatable systems\b/i,
    /\bmeasurable impact\b/i,
    /\bowner\b/i,
  ];
  return patterns.filter((pattern) => pattern.test(text)).length;
}

function qualityIssues(latestDay, latestDigestText) {
  const latestItems = latestDay.items;
  const latestPlatforms = [...new Set(latestItems.map((item) => item.platform || item.source).filter(Boolean))];
  const latestLinks = latestItems.filter((item) => item.sourceUrl).length;
  const thinInsights = latestItems.filter((item) => (item.insight || '').length < MIN_INSIGHT_CHARS).length;
  const issues = [];

  if (latestItems.length < MIN_LATEST_ITEMS) {
    issues.push(`最新日期信息卡少于 ${MIN_LATEST_ITEMS} 条：当前 ${latestItems.length} 条；若为低信息日，必须写明扫描范围和缺口。`);
  }
  if (latestPlatforms.length < MIN_LATEST_PLATFORMS) {
    issues.push(`最新日期来源平台少于 ${MIN_LATEST_PLATFORMS} 个：当前 ${latestPlatforms.length} 个；需要恢复多渠道代理采集。`);
  }
  if (latestLinks < MIN_LATEST_LINKS) {
    issues.push(`最新日期可追溯链接少于 ${MIN_LATEST_LINKS} 个：当前 ${latestLinks} 个；信息库不能只保留观点摘要。`);
  }
  if (thinInsights > 0) {
    issues.push(`最新日期有 ${thinInsights} 条 OD 启示过短；每条高价值信息必须说明提示关注的组织机制。`);
  }
  const abcScore = detectAbcStyle(latestDigestText);
  if (abcScore >= 3) {
    issues.push(`最新日期疑似 ABC 体表达过多：命中 ${abcScore} 类英文混写；应改为中文为主，必要英文用“中文解释 + 英文原词”。`);
  }

  return {
    latestPlatforms,
    latestLinks,
    thinInsights,
    abcScore,
    issues,
  };
}

function main() {
  if (!fs.existsSync(digestPath)) {
    throw new Error('digest.md does not exist');
  }

  const digest = fs.readFileSync(digestPath, 'utf8');
  const days = parseDigest(digest);
  const items = days.flatMap((day) => day.items.map((item) => ({ ...item, date: day.date })));

  if (days.length === 0 || items.length === 0) {
    throw new Error('digest.md has no parseable information-library items');
  }

  const latestDate = days[0].date;
  const latestItems = days[0].items.length;
  const latestDigestMatch = digest.match(new RegExp(`^## ${latestDate}[\\s\\S]*?(?=^## \\d{4}-\\d{2}-\\d{2}\\b|$)`, 'm'));
  const latestDigestText = latestDigestMatch ? latestDigestMatch[0] : '';
  const latestQuality = qualityIssues(days[0], latestDigestText);
  const platforms = [...new Set(items.map((item) => item.platform || item.source).filter(Boolean))].sort();
  const trustStats = items.reduce((stats, item) => {
    const key = item.trust || '未标注';
    stats[key] = (stats[key] || 0) + 1;
    return stats;
  }, {});

  const missing = {
    summary: countMissing(items, 'summary'),
    source: countMissing(items, 'source'),
    sourceUrl: countMissing(items, 'sourceUrl'),
    platform: countMissing(items, 'platform'),
    trust: countMissing(items, 'trust'),
    insight: countMissing(items, 'insight'),
    tags: countMissing(items, 'tags'),
    time: countMissing(items, 'time'),
  };

  const status = {
    generatedAt: new Date().toISOString(),
    latestDate,
    latestItems,
    latestPlatforms: latestQuality.latestPlatforms,
    latestLinks: latestQuality.latestLinks,
    latestThinInsights: latestQuality.thinInsights,
    latestAbcScore: latestQuality.abcScore,
    qualityIssues: latestQuality.issues,
    totalDays: days.length,
    totalItems: items.length,
    totalPlatforms: platforms.length,
    dailyFiles: listMarkdownDates(dailyDir).length,
    dailyReportFiles: listMarkdownDates(dailyReportDir).length,
    weeklyFiles: fs.existsSync(weeklyDir) ? fs.readdirSync(weeklyDir).filter((file) => file.endsWith('.md')).length : 0,
    trustStats,
    missing,
    governance: 'Intelligence center, topic projects, and knowledge base are governed separately and periodically cross-fed.',
    ownership: 'Codex owns end-to-end operation while inheriting WorkBuddy high-density multi-channel information-card standards.',
  };

  fs.mkdirSync(operationsDir, { recursive: true });
  fs.writeFileSync(statusJsonPath, JSON.stringify(status, null, 2) + '\n');

  const missingRows = Object.entries(missing)
    .map(([field, count]) => `| ${field} | ${count} |`)
    .join('\n');
  const trustRows = Object.entries(trustStats)
    .map(([trust, count]) => `| ${trust} | ${count} |`)
    .join('\n');

  const markdown = `# 信息库滚动流状态

> 自动生成：${status.generatedAt}

## 当前状态

- 最新日期：${latestDate}
- 最新日期条目数：${latestItems}
- 最新日期来源平台数：${latestQuality.latestPlatforms.length}
- 最新日期可追溯链接数：${latestQuality.latestLinks}
- 总天数：${days.length}
- 总条目：${items.length}
- 来源平台数：${platforms.length}
- \`daily/\` 文件数：${status.dailyFiles}
- \`daily-report/\` 文件数：${status.dailyReportFiles}
- \`weekly/\` 文件数：${status.weeklyFiles}
- 运营责任：Codex 负责端到端运营，但必须继承 WorkBuddy 的高密度、多渠道、信息卡式生产标准。

## 质量闸门

${latestQuality.issues.length ? latestQuality.issues.map((issue) => `- ⚠️ ${issue}`).join('\n') : '- ✅ 最新日期未触发密度、来源、链接、OD 启示或 ABC 体质量警报。'}

## 可信度分布

| 可信度 | 条目数 |
|---|---:|
${trustRows}

## 字段缺失

| 字段 | 缺失条目数 |
|---|---:|
${missingRows}

## 维护规则

- \`digest.md\` 是首页「信息库」卡片的直接数据源。
- 情报中心、专题项目和知识库分开治理；周期沉淀时互相回看是否有补充。
- WorkBuddy 历史产物是质量基准；新增 \`auto-sync\` 内容由 Codex 抽检、修正、去重和补源后进入正式交付。
- 正常日信息库应保留 8-15 条高质量信息卡；低信息日必须记录扫描范围、缺口和弱信号。
- 每周生成快速导读版与详细资料版；每月生成结构化信息月报。
- 没有足够可信新增信息时，宁可标注缺口，不用低质量内容填充。
`;

  fs.writeFileSync(statusMdPath, markdown);
  console.log(`Info library audit passed: ${items.length} items across ${days.length} days; latest ${latestDate} has ${latestItems} items.`);
}

main();
