const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const project = path.join(root, 'specials', 'ai-org-talent-mechanism');
const qualityDir = path.join(project, 'quality');
const formatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit',
});
const today = process.env.REPORT_DATE || formatter.format(new Date());
const requiredFiles = [
  '00-overview.md',
  '01-flat-organization.md',
  '02-talent-density.md',
  '03-job-family-career-architecture.md',
  '04-promotion-system.md',
  'index.html',
];
const requiredSignals = [
  ['一句话结论', /一句话/],
  ['核心判断', /核心判断/],
  ['Context/背景材料', /Context|背景材料/],
  ['证据地图', /证据地图/],
  ['来源索引', /来源索引/],
];

function read(file) { return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : ''; }
function dateAdd(date, days) {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}
function dateRange(start, end) {
  const out = [];
  for (let cur = start; cur <= end; cur = dateAdd(cur, 1)) out.push(cur);
  return out;
}
function dateAddLocal(date, days) {
  return dateAdd(date, days);
}
function dailyDirs() {
  if (!fs.existsSync(project)) return [];
  return fs.readdirSync(project).filter((name) => /^\d{4}-\d{2}-\d{2}$/.test(name)).sort();
}
function isNonDecision(text) {
  return /^# .*研究状态记录/m.test(text) || /^>\s*研究状态记录\s*\/\s*非决策稿/m.test(text) || /待正式重跑\s*\/\s*非决策稿/.test(text);
}
function auditDate(date) {
  const dir = path.join(project, date);
  const missing = requiredFiles.filter((file) => !fs.existsSync(path.join(dir, file)));
  const overview = read(path.join(dir, '00-overview.md'));
  const status = missing.length ? 'missing-files' : isNonDecision(overview) ? 'non-decision' : 'decision-ready';
  const signalIssues = [];
  if (overview) {
    for (const [name, pattern] of requiredSignals) {
      if (!pattern.test(overview)) signalIssues.push(name);
    }
  } else {
    signalIssues.push(...requiredSignals.map(([name]) => name));
  }
  return { date, status, missing, signalIssues };
}
function main() {
  fs.mkdirSync(qualityDir, { recursive: true });
  const dates = dailyDirs();
  const lookback = Number.parseInt(process.env.AUDIT_LOOKBACK_DAYS || '14', 10);
  const defaultStart = dateAddLocal(today, -Math.max(1, Number.isFinite(lookback) ? lookback : 14) + 1);
  const start = process.env.AUDIT_START_DATE || defaultStart;
  const expected = dateRange(start, today);
  const existing = new Set(dates);
  const missingDates = expected.filter((date) => !existing.has(date));
  const audits = expected.filter((date) => existing.has(date)).map(auditDate);
  const nonDecision = audits.filter((item) => item.status === 'non-decision');
  const incomplete = audits.filter((item) => item.missing.length || item.signalIssues.length);
  const rows = audits.map((item) => `| ${item.date} | ${item.status} | ${item.missing.length ? item.missing.join('<br>') : '完整'} | ${item.signalIssues.length ? item.signalIssues.join('<br>') : '通过'} |`).join('\n');
  const report = `# ${today}｜AI 组织人才日报覆盖审计

## 审计结论

- 日期范围：${start} 至 ${today}
- 已发现日报日期：${dates.length} 天
- 缺失日期：${missingDates.length ? missingDates.join('、') : '无'}
- 非决策稿/待重跑：${nonDecision.length ? nonDecision.map((item) => item.date).join('、') : '无'}
- 文件或结构缺口：${incomplete.length ? incomplete.map((item) => item.date).join('、') : '无'}

## 明细

| 日期 | 状态 | 文件完整性 | 结构信号 |
|---|---|---|---|
${rows || '| - | - | - | - |'}

## 自动化要求

- 每日任务必须先做覆盖审计，再做质量门禁。
- 若出现缺失日期，自动化必须生成状态记录并在审计报告中标红，不允许静默缺口。
- 若出现非决策稿，不得进入基线证据账本，也不得在首页标为正式日报。
- 正式重跑必须通过严格质量门禁后，才可升级为决策稿。
`;
  const reportPath = path.join(qualityDir, `${today}-coverage-audit.md`);
  fs.writeFileSync(reportPath, report);
  fs.writeFileSync(path.join(qualityDir, 'coverage-latest.md'), report);
  console.log(report);
  if (process.env.STRICT_COVERAGE_AUDIT === '1' && (missingDates.length || incomplete.some((item) => item.missing.length))) {
    process.exitCode = 1;
  }
}
main();
