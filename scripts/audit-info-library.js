const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const digestPath = path.join(root, 'digest.md');
const operationsDir = path.join(root, 'operations');
const statusJsonPath = path.join(operationsDir, 'info-library-status.json');
const statusMdPath = path.join(operationsDir, 'info-library-status.md');

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
    totalDays: days.length,
    totalItems: items.length,
    totalPlatforms: platforms.length,
    trustStats,
    missing,
    ownership: 'Codex owns intelligence-center stability and information delivery; WorkBuddy remains a basic document and knowledge-management utility.',
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
- 总天数：${days.length}
- 总条目：${items.length}
- 来源平台数：${platforms.length}
- 运营责任：Codex 负责情报中心稳定运营和信息交付；WorkBuddy 仅作为基础文档与知识管理工具。

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
- WorkBuddy 或其他工具写入的 \`auto-sync\` 内容只视为候选素材；正式交付由 Codex 抽检、修正、去重和补源。
- 没有足够可信新增信息时，宁可标注缺口，不用低质量内容填充。
`;

  fs.writeFileSync(statusMdPath, markdown);
  console.log(`Info library audit passed: ${items.length} items across ${days.length} days; latest ${latestDate} has ${latestItems} items.`);
}

main();
