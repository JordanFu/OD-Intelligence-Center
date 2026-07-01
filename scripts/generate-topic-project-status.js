const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const dataDir = path.join(root, 'data');
const specialRoot = path.join(root, 'specials', 'ai-org-talent-mechanism');
const manifestPath = path.join(specialRoot, 'manifest.json');
const dataStatusPath = path.join(dataDir, 'topic-projects-status.json');

const REQUIRED_FILES = [
  '00-overview.md',
  '01-flat-organization.md',
  '02-talent-density.md',
  '03-job-family-career-architecture.md',
  '04-promotion-system.md',
];

const FALLBACK_PATTERN = /非决策稿|待正式重跑|研究状态记录|云端兜底|兜底|最低可用|待增强|仅记录自动化触发|不作为正式日报/i;
const QUALITY_FAIL_PATTERN = /状态[：:]\s*fail|结论[：:]\s*(未通过|失败)|qualityStatus[：:]\s*fail/i;
const QUALITY_PASS_PATTERN = /状态[：:]\s*pass|结论[：:]\s*(通过|未触发)|✅/i;
const DATE_DIR_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const FORMAL_RUN_HOUR_SHANGHAI = 18;

function shanghaiNow() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date());
  const map = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return {
    date: `${map.year}-${map.month}-${map.day}`,
    hour: Number(map.hour),
    minute: Number(map.minute),
  };
}

function todayShanghai() {
  return shanghaiNow().date;
}

function readText(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
}

function existingDateDirs() {
  if (!fs.existsSync(specialRoot)) return [];
  return fs.readdirSync(specialRoot)
    .filter((entry) => DATE_DIR_PATTERN.test(entry) && fs.statSync(path.join(specialRoot, entry)).isDirectory())
    .sort();
}

function rel(filePath) {
  return path.relative(root, filePath).replace(/\\/g, '/');
}

function classifyDate(date, runtime = shanghaiNow()) {
  const dir = path.join(specialRoot, date);
  const exists = fs.existsSync(dir) && fs.statSync(dir).isDirectory();
  const required = REQUIRED_FILES.map((file) => {
    const filePath = path.join(dir, file);
    return {
      file,
      path: rel(filePath),
      exists: fs.existsSync(filePath),
    };
  });
  const missingRequired = required.filter((entry) => !entry.exists).map((entry) => entry.file);
  const indexPath = path.join(dir, 'index.html');
  const hasFormalEntry = fs.existsSync(indexPath) || fs.existsSync(path.join(dir, '00-overview.html'));
  const combinedText = required
    .filter((entry) => entry.exists)
    .map((entry) => readText(path.join(root, entry.path)))
    .join('\n\n');
  const hasFallbackKeywords = FALLBACK_PATTERN.test(combinedText);
  const qualityPath = path.join(specialRoot, 'quality', `${date}.md`);
  const qualityText = readText(qualityPath);
  const qualityFailed = qualityText ? QUALITY_FAIL_PATTERN.test(qualityText) : false;
  const qualityPassed = qualityText ? QUALITY_PASS_PATTERN.test(qualityText) && !qualityFailed : null;

  let status = 'formal';
  const qualityIssues = [];

  if (!exists) {
    if (date === runtime.date && runtime.hour < FORMAL_RUN_HOUR_SHANGHAI) {
      status = 'scheduled';
      qualityIssues.push('未到今日 18:00 正式自动化运行时间');
    } else {
      status = 'missing';
      qualityIssues.push('日期目录不存在');
    }
  } else if (missingRequired.length > 0 || !hasFormalEntry) {
    status = 'needs-rerun';
    if (missingRequired.length > 0) qualityIssues.push(`缺少必要 Markdown：${missingRequired.join('、')}`);
    if (!hasFormalEntry) qualityIssues.push('缺少 index.html 或正式入口');
  } else if (hasFallbackKeywords) {
    status = 'fallback';
    qualityIssues.push('正文包含兜底/非决策稿/待正式重跑关键词');
  } else if (qualityFailed) {
    status = 'needs-rerun';
    qualityIssues.push('质量门禁明确失败');
  }

  return {
    date,
    status,
    isFormal: status === 'formal',
    isFallback: status === 'fallback',
    needsRerun: status === 'fallback' || status === 'needs-rerun' || status === 'missing',
    overview: exists && fs.existsSync(path.join(dir, '00-overview.html')) ? rel(path.join(dir, '00-overview.html')) : null,
    overviewMarkdown: exists && fs.existsSync(path.join(dir, '00-overview.md')) ? rel(path.join(dir, '00-overview.md')) : null,
    index: exists && fs.existsSync(indexPath) ? rel(indexPath) : null,
    topicReports: required.map((entry) => ({
      title: entry.file.replace(/^\d+-/, '').replace(/\.md$/, ''),
      markdown: entry.exists ? entry.path : null,
      html: fs.existsSync(path.join(dir, entry.file.replace(/\.md$/, '.html'))) ? rel(path.join(dir, entry.file.replace(/\.md$/, '.html'))) : null,
      exists: entry.exists,
    })),
    missingRequired,
    hasFormalEntry,
    qualityGate: {
      path: fs.existsSync(qualityPath) ? rel(qualityPath) : null,
      status: qualityFailed ? 'fail' : qualityPassed ? 'pass-or-warn' : qualityText ? 'warn-or-unknown' : 'not-found',
    },
    qualityIssues,
  };
}

function summarize(dates) {
  const latestFormal = dates.find((entry) => entry.status === 'formal');
  const latestAny = dates[0] || null;
  const today = todayShanghai();
  const todayEntry = dates.find((entry) => entry.date === today) || classifyDate(today);
  const pendingRerunDates = dates
    .filter((entry) => entry.needsRerun)
    .map((entry) => entry.date);
  const statusCounts = dates.reduce((acc, entry) => {
    acc[entry.status] = (acc[entry.status] || 0) + 1;
    return acc;
  }, {});

  return {
    latestFormalDate: latestFormal ? latestFormal.date : null,
    latestAnyDate: latestAny ? latestAny.date : null,
    today,
    todayStatus: todayEntry.status,
    latestStatus: todayEntry.status === 'formal' ? 'formal' : todayEntry.status,
    pendingRerunDates,
    statusCounts,
  };
}

function main() {
  if (!fs.existsSync(specialRoot)) {
    throw new Error(`special root does not exist: ${specialRoot}`);
  }

  const runtime = shanghaiNow();
  const today = runtime.date;
  const dateSet = new Set(existingDateDirs());
  dateSet.add(today);
  const dates = [...dateSet].sort().reverse().map((date) => classifyDate(date, runtime));
  const summary = summarize(dates);
  const qualityStatus = summary.todayStatus === 'formal'
    ? (summary.pendingRerunDates.length > 0 ? 'warn' : 'pass')
    : 'warn';

  const status = {
    generatedAt: new Date().toISOString(),
    module: 'topic-projects',
    project: {
      id: 'ai-org-talent-mechanism',
      title: 'AI时代组织与人才机制四课题研究',
      root: 'specials/ai-org-talent-mechanism',
    },
    qualityStatus,
    ...summary,
    statusDefinitions: {
      formal: '正式决策稿：00-overview、四专题 Markdown、正式入口均存在，且无兜底/待重跑关键词，质量门禁未明确失败。',
      fallback: '仅兜底记录：存在自动化或非决策稿痕迹，不能冒充正式日报。',
      scheduled: '待今日正式运行：当前时间早于每日 18:00 正式自动化窗口，不能判为缺失或待补跑。',
      needsRerun: '待正式重跑：文件不完整或质量门禁失败。',
      missing: '缺失：日期目录或必要文件不存在。',
    },
    dates,
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
  fs.writeFileSync(manifestPath, JSON.stringify(status, null, 2) + '\n');
  fs.writeFileSync(dataStatusPath, JSON.stringify(status, null, 2) + '\n');

  console.log(`Topic project status generated: today ${summary.today} is ${summary.todayStatus}; latest formal ${summary.latestFormalDate || 'none'}.`);
}

main();
