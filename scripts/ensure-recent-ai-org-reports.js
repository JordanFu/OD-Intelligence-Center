const { execFileSync } = require('child_process');

function formatShanghai(date) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

function addDays(date, days) {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

function unique(values) {
  return [...new Set(values)].filter(Boolean).sort();
}

const anchor = process.env.REPORT_DATE
  ? new Date(`${process.env.REPORT_DATE}T12:00:00+08:00`)
  : new Date();
const days = Number.parseInt(process.env.ENSURE_DAYS || '4', 10);
const lookbackDays = Number.isFinite(days) && days > 0 ? days : 4;

const dates = unique([
  ...Array.from({ length: lookbackDays }, (_, index) => formatShanghai(addDays(anchor, -index))),
  process.env.REPORT_DATE,
]);

for (const date of dates) {
  console.log(`\n=== Ensuring AI org report date: ${date} ===`);
  execFileSync('node', ['scripts/ensure-ai-org-reports.js'], {
    stdio: 'inherit',
    env: { ...process.env, REPORT_DATE: date },
  });
}

console.log(`\nEnsured ${dates.length} AI org report date(s): ${dates.join(', ')}`);
