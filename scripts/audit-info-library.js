const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const digestPath = path.join(root, 'digest.md');
const dataDir = path.join(root, 'data');
const operationsDir = path.join(root, 'operations');
const infoStatusPath = path.join(dataDir, 'info-feed-status.json');
const legacyStatusJsonPath = path.join(operationsDir, 'info-library-status.json');
const legacyStatusMdPath = path.join(operationsDir, 'info-library-status.md');
const dailyDir = path.join(root, 'daily');
const dailyReportDir = path.join(root, 'daily-report');
const weeklyDir = path.join(root, 'weekly');

const MIN_LATEST_ITEMS = 8;
const MAX_LATEST_ITEMS = 15;
const MIN_LATEST_PLATFORMS = 4;
const MIN_LATEST_LINKS = 6;
const MIN_CHANNEL_TYPES = 4;
const MIN_INSIGHT_CHARS = 24;

const INFO_TYPES = ['新增事实', '旧线复核', '弱信号', '缺口记录'];
const CHANNEL_TYPES = ['官方', '媒体', '报告学术', '社媒公众号', 'JD薪酬'];
const CONFIDENCE_LEVELS = ['L1', 'L2', 'L3', 'L4'];
const LOCAL_PATH_PATTERN = new RegExp([
  '\\/' + 'Users\\/',
  '\\/' + 'private\\/' + 'tmp',
  '\\/' + 'private\\/' + 'var',
  '\\.' + 'workbuddy',
  'WorkBuddy\\/' + 'Claw',
  'file:\\/\\/',
].join('|'), 'i');

function parseFieldLine(line) {
  const fieldMatch = line.match(/^- \*\*(事件摘要|来源|来源平台|来源可信度|信息类型|渠道类型|结论置信度|验证问题|OD启示|标签|抓取时间)\*\*[：:]\s*(.*)/);
  if (!fieldMatch) return null;
  return { field: fieldMatch[1], value: fieldMatch[2].trim() };
}

function extractUrls(text) {
  return (text.match(/https?:\/\/[^\s）)\]>"]+/g) || [])
    .map((url) => url.replace(/[，。；、]+$/g, ''));
}

function normalizeHashTags(text) {
  return text.match(/#[\w\u4e00-\u9fff-]+/g) || [];
}

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
        sourceUrls: [],
        platform: '',
        trust: '',
        infoType: '',
        channelType: '',
        conclusionConfidence: '',
        verificationQuestion: '',
        insight: '',
        tags: [],
        time: '',
        explicitFields: {},
      };
      currentDay.items.push(currentItem);
      continue;
    }

    if (!currentItem) continue;

    const parsed = parseFieldLine(line);
    if (!parsed) continue;

    const { field, value } = parsed;
    currentItem.explicitFields[field] = true;

    if (field === '事件摘要') currentItem.summary = value;
    if (field === '来源') {
      currentItem.source = value;
      currentItem.sourceUrls = extractUrls(value);
      currentItem.sourceUrl = currentItem.sourceUrls[0] || '';
    }
    if (field === '来源平台') currentItem.platform = value;
    if (field === '来源可信度') currentItem.trust = value;
    if (field === '信息类型') currentItem.infoType = value;
    if (field === '渠道类型') currentItem.channelType = value;
    if (field === '结论置信度') currentItem.conclusionConfidence = value;
    if (field === '验证问题') currentItem.verificationQuestion = value;
    if (field === 'OD启示') currentItem.insight = value;
    if (field === '标签') currentItem.tags = normalizeHashTags(value);
    if (field === '抓取时间') currentItem.time = value;
  }

  if (currentDay && currentDay.items.length > 0) days.push(currentDay);
  return days;
}

function countMissing(items, field) {
  return items.filter((item) => !item[field] || (Array.isArray(item[field]) && item[field].length === 0)).length;
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

function inferInfoType(item) {
  const text = `${item.title} ${item.summary} ${item.tags.join(' ')}`;
  if (/缺口|未发现|无新增|扫描缺口|低新增/i.test(text)) return '缺口记录';
  if (/弱信号|线索|待验证|候选|传闻|社媒|context|Context/i.test(text)) return '弱信号';
  if (/旧线|复核|跟踪|回看|再验证|baseline|基线/i.test(text)) return '旧线复核';
  return '新增事实';
}

function inferChannelType(item) {
  const text = `${item.source} ${item.platform} ${item.title} ${item.summary}`.toLowerCase();
  if (/job|jobs|career|careers|linkedin|薪酬|salary|pay|compensation|招聘|jd/.test(text)) return 'JD薪酬';
  if (/wechat|微信|公众号|x\.com|twitter|linkedin|blind|脉脉|小红书|reddit|社媒/.test(text)) return '社媒公众号';
  if (/mckinsey|bcg|deloitte|pwc|ey|gartner|harvard|hbr|stanford|mit|arxiv|report|whitepaper|报告|学术|论文|研究/.test(text)) return '报告学术';
  if (/reuters|bloomberg|financial times|wall street journal|techcrunch|36氪|晚点|财新|虎嗅|界面|媒体|新闻/.test(text)) return '媒体';
  if (/official|官网|官方|press release|newsroom|blog|worklab|handbook|sec|annual report|investor|about\.amazon|openai\.com|anthropic\.com|microsoft\.com|gitlab\.com/.test(text)) return '官方';
  return '未归类';
}

function inferConclusionConfidence(item) {
  const text = `${item.infoType} ${item.trust} ${item.summary} ${item.insight}`;
  if (/L[1-4]/.test(item.conclusionConfidence)) return item.conclusionConfidence.match(/L[1-4]/)[0];
  if (/弱信号|待验证|线索|传闻|💬/.test(text)) return 'L1';
  if (/机制|制度|多源|互证|稳定模式|L4/.test(text)) return 'L3';
  if (/官方|⭐|高|报告|研究/.test(text)) return 'L2';
  return 'L1';
}

function enrichLatestItems(items) {
  return items.map((item) => {
    const inferredInfoType = INFO_TYPES.includes(item.infoType) ? item.infoType : inferInfoType(item);
    const inferredChannelType = CHANNEL_TYPES.includes(item.channelType) ? item.channelType : inferChannelType(item);
    const inferredConfidence = CONFIDENCE_LEVELS.includes(item.conclusionConfidence.slice(0, 2))
      ? item.conclusionConfidence.slice(0, 2)
      : inferConclusionConfidence({ ...item, infoType: inferredInfoType, channelType: inferredChannelType });
    return {
      ...item,
      normalizedInfoType: inferredInfoType,
      normalizedChannelType: inferredChannelType,
      normalizedConclusionConfidence: inferredConfidence,
    };
  });
}

function distribution(items, field) {
  return items.reduce((stats, item) => {
    const key = item[field] || '未标注';
    stats[key] = (stats[key] || 0) + 1;
    return stats;
  }, {});
}

function latestSectionText(digest, latestDate) {
  const latestDigestMatch = digest.match(new RegExp(`^## ${latestDate}[\\s\\S]*?(?=^## \\d{4}-\\d{2}-\\d{2}\\b|$)`, 'm'));
  return latestDigestMatch ? latestDigestMatch[0] : '';
}

function fieldWarnings(latestItems) {
  const requiredNewFields = [
    ['信息类型', 'infoType'],
    ['渠道类型', 'channelType'],
    ['结论置信度', 'conclusionConfidence'],
    ['验证问题', 'verificationQuestion'],
  ];
  return requiredNewFields
    .map(([label, field]) => ({
      field: label,
      missing: latestItems.filter((item) => !item.explicitFields[label] || !item[field]).length,
    }))
    .filter((entry) => entry.missing > 0);
}

function qualityIssues(latestDay, latestDigestText) {
  const latestItems = enrichLatestItems(latestDay.items);
  const latestPlatforms = [...new Set(latestItems.map((item) => item.platform || item.source).filter(Boolean))];
  const latestLinks = latestItems.filter((item) => item.sourceUrl).length;
  const latestSourceUrlsMissing = latestItems.filter((item) => !item.sourceUrl).map((item) => item.id);
  const thinInsights = latestItems.filter((item) => (item.insight || '').length < MIN_INSIGHT_CHARS).length;
  const channelTypes = [...new Set(latestItems.map((item) => item.normalizedChannelType).filter((type) => type && type !== '未归类'))];
  const infoTypeStats = distribution(latestItems, 'normalizedInfoType');
  const channelStats = distribution(latestItems, 'normalizedChannelType');
  const confidenceStats = distribution(latestItems, 'normalizedConclusionConfidence');
  const newFactCount = infoTypeStats['新增事实'] || 0;
  const oldLineReviewCount = infoTypeStats['旧线复核'] || 0;
  const weakSignalCount = infoTypeStats['弱信号'] || 0;
  const gapCount = infoTypeStats['缺口记录'] || 0;
  const criticalIssues = [];
  const warnings = [];

  if (latestItems.length < MIN_LATEST_ITEMS) {
    criticalIssues.push(`最新日期信息卡少于 ${MIN_LATEST_ITEMS} 条：当前 ${latestItems.length} 条；若为低信息日，必须写明扫描范围和缺口。`);
  }
  if (latestItems.length > MAX_LATEST_ITEMS) {
    warnings.push(`最新日期信息卡多于 ${MAX_LATEST_ITEMS} 条：当前 ${latestItems.length} 条；需要确认不是低价值堆叠。`);
  }
  if (latestPlatforms.length < MIN_LATEST_PLATFORMS) {
    criticalIssues.push(`最新日期来源平台少于 ${MIN_LATEST_PLATFORMS} 个：当前 ${latestPlatforms.length} 个；需要恢复多渠道代理采集。`);
  }
  if (latestLinks < MIN_LATEST_LINKS) {
    criticalIssues.push(`最新日期可追溯链接少于 ${MIN_LATEST_LINKS} 个：当前 ${latestLinks} 个；信息库不能只保留观点摘要。`);
  }
  if (latestSourceUrlsMissing.length > 0) {
    warnings.push(`最新日期有 ${latestSourceUrlsMissing.length} 条 sourceUrl 缺失：${latestSourceUrlsMissing.join(', ')}。`);
  }
  if (channelTypes.length < MIN_CHANNEL_TYPES) {
    warnings.push(`最新日期渠道类型少于 ${MIN_CHANNEL_TYPES} 类：当前 ${channelTypes.length} 类；应覆盖官方、媒体、报告学术、社媒公众号、JD薪酬中的至少 4 类。`);
  }
  if (newFactCount < 5) {
    warnings.push(`最新日期“新增事实”少于 5 条：当前 ${newFactCount} 条；如果确实低新增，应显式写缺口记录。`);
  }
  if (thinInsights > 0) {
    warnings.push(`最新日期有 ${thinInsights} 条 OD 启示过短；每条高价值信息必须说明提示关注的组织机制。`);
  }
  const abcScore = detectAbcStyle(latestDigestText);
  if (abcScore >= 3) {
    warnings.push(`最新日期疑似 ABC 体表达过多：命中 ${abcScore} 类英文混写；应改为中文为主，必要英文用“中文解释 + 英文原词”。`);
  }
  const missingNewFields = fieldWarnings(latestItems);
  if (missingNewFields.length > 0) {
    warnings.push(`最新日期仍有新结构字段缺失：${missingNewFields.map((entry) => `${entry.field} ${entry.missing} 条`).join('；')}。Phase 1 仅告警，不批量改写历史。`);
  }
  if (LOCAL_PATH_PATTERN.test(latestDigestText)) {
    criticalIssues.push('最新日期 digest 存在本地绝对路径或私有路径泄露。');
  }

  return {
    latestItems,
    latestPlatforms,
    latestLinks,
    latestSourceUrlsMissing,
    thinInsights,
    abcScore,
    channelTypes,
    infoTypeStats,
    channelStats,
    confidenceStats,
    newFactCount,
    oldLineReviewCount,
    weakSignalCount,
    gapCount,
    fieldWarnings: missingNewFields,
    criticalIssues,
    warnings,
  };
}

function qualityStatus(criticalIssues, warnings) {
  if (criticalIssues.length > 0) return 'fail';
  if (warnings.length > 0) return 'warn';
  return 'pass';
}

function publicScanUrlFor(date) {
  return `https://jordanfu.github.io/org-intelligence-info/daily-log/${date}.html`;
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
  const latestDigestText = latestSectionText(digest, latestDate);
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
    infoType: countMissing(days[0].items, 'infoType'),
    channelType: countMissing(days[0].items, 'channelType'),
    conclusionConfidence: countMissing(days[0].items, 'conclusionConfidence'),
    verificationQuestion: countMissing(days[0].items, 'verificationQuestion'),
    insight: countMissing(items, 'insight'),
    tags: countMissing(items, 'tags'),
    time: countMissing(items, 'time'),
  };

  const status = {
    generatedAt: new Date().toISOString(),
    module: 'info-feed',
    qualityStatus: qualityStatus(latestQuality.criticalIssues, latestQuality.warnings),
    latestDate,
    latest: {
      date: latestDate,
      cardCount: days[0].items.length,
      newFactCount: latestQuality.newFactCount,
      oldLineReviewCount: latestQuality.oldLineReviewCount,
      weakSignalCount: latestQuality.weakSignalCount,
      gapCount: latestQuality.gapCount,
      sourcePlatformCount: latestQuality.latestPlatforms.length,
      sourceUrlCount: latestQuality.latestLinks,
      channelTypeCount: latestQuality.channelTypes.length,
      channelTypes: latestQuality.channelTypes,
      infoTypeDistribution: latestQuality.infoTypeStats,
      channelTypeDistribution: latestQuality.channelStats,
      conclusionConfidenceDistribution: latestQuality.confidenceStats,
      sourceUrlMissingItemIds: latestQuality.latestSourceUrlsMissing,
      explicitFieldWarnings: latestQuality.fieldWarnings,
      abcScore: latestQuality.abcScore,
      thinInsightCount: latestQuality.thinInsights,
    },
    totals: {
      days: days.length,
      cards: items.length,
      platforms: platforms.length,
      dailyFiles: listMarkdownDates(dailyDir).length,
      dailyReportFiles: listMarkdownDates(dailyReportDir).length,
      weeklyFiles: fs.existsSync(weeklyDir) ? fs.readdirSync(weeklyDir).filter((file) => file.endsWith('.md')).length : 0,
    },
    homepageBridge: {
      digestLatestDate: latestDate,
      latestScanUrl: publicScanUrlFor(latestDate),
      publicMirrorUrl: 'https://jordanfu.github.io/org-intelligence-info/',
      checkedBy: 'scripts/check-public-links.js',
      status: 'pending-link-check',
    },
    trustStats,
    missing,
    warnings: latestQuality.warnings,
    criticalIssues: latestQuality.criticalIssues,
    brokenLinks: [],
    links: {
      checkedAt: null,
      qualityStatus: 'pending',
      firstPartyChecked: 0,
      externalWarnings: 0,
      brokenCount: 0,
    },
    governance: '信息库负责广谱前沿雷达；专题项目负责假设检验；知识库负责长期复利，三者分开治理、周期互补。',
  };

  fs.mkdirSync(dataDir, { recursive: true });
  fs.mkdirSync(operationsDir, { recursive: true });
  fs.writeFileSync(infoStatusPath, JSON.stringify(status, null, 2) + '\n');
  fs.writeFileSync(legacyStatusJsonPath, JSON.stringify(status, null, 2) + '\n');

  const missingRows = Object.entries(missing)
    .map(([field, count]) => `| ${field} | ${count} |`)
    .join('\n');
  const trustRows = Object.entries(trustStats)
    .map(([trust, count]) => `| ${trust} | ${count} |`)
    .join('\n');
  const warningList = [...latestQuality.criticalIssues, ...latestQuality.warnings];

  const markdown = `# 信息库滚动流状态

> 自动生成：${status.generatedAt}

## 当前状态

- 状态：${status.qualityStatus}
- 最新日期：${latestDate}
- 最新日期条目数：${status.latest.cardCount}
- 今日新增事实：${status.latest.newFactCount}
- 旧线复核 / Context：${status.latest.oldLineReviewCount}
- 弱信号：${status.latest.weakSignalCount}
- 缺口记录：${status.latest.gapCount}
- 最新日期来源平台数：${status.latest.sourcePlatformCount}
- 最新日期渠道覆盖：${status.latest.channelTypes.join('、') || '未识别'}
- 最新日期可追溯链接数：${status.latest.sourceUrlCount}
- 总天数：${days.length}
- 总条目：${items.length}

## 质量闸门

${warningList.length ? warningList.map((issue) => `- ⚠️ ${issue}`).join('\n') : '- ✅ 最新日期未触发密度、来源、链接、字段或表达质量警报。'}

## 可信度分布

| 可信度 | 条目数 |
|---|---:|
${trustRows}

## 字段缺失

| 字段 | 缺失条目数 |
|---|---:|
${missingRows}

## 维护规则

- \`digest.md\` 是首页「信息库」卡片的直接数据源，最新日期必须可追溯到公开来源。
- 信息库、专题项目和知识库分开治理；周期沉淀时互相回看是否有补充。
- 最新信息卡必须逐步补齐：信息类型、渠道类型、结论置信度、验证问题。
- 没有足够可信新增信息时，宁可标注缺口，不用低质量内容填充。
`;

  fs.writeFileSync(legacyStatusMdPath, markdown);
  console.log(`Info library audit completed: ${status.qualityStatus}; latest ${latestDate} has ${status.latest.cardCount} cards, ${status.latest.sourceUrlCount} source URLs.`);

  if (status.qualityStatus === 'fail') {
    process.exitCode = 1;
  }
}

main();
