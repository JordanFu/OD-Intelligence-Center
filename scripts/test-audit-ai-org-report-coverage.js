const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const { applyFormalRunWindow } = require('./audit-ai-org-report-coverage');

const root = path.resolve(__dirname, '..');
const qualityDir = path.join(root, 'specials', 'ai-org-talent-mechanism', 'quality');
const generatedFiles = [
  path.join(qualityDir, '2026-08-28-coverage-audit.md'),
  path.join(qualityDir, 'coverage-latest.md'),
];
const snapshots = new Map(generatedFiles.map((file) => [
  file,
  fs.existsSync(file) ? fs.readFileSync(file) : null,
]));

let output;
try {
  output = execFileSync(process.execPath, [path.join(__dirname, 'audit-ai-org-report-coverage.js')], {
    cwd: root,
    env: {
      ...process.env,
      REPORT_DATE: '2026-08-28',
      AUDIT_START_DATE: '2026-08-28',
    },
    encoding: 'utf8',
  });
} finally {
  for (const [file, snapshot] of snapshots) {
    if (snapshot === null) fs.rmSync(file, { force: true });
    else fs.writeFileSync(file, snapshot);
  }
}

assert.match(output, /日期范围：2026-08-28 至 2026-08-28/);
assert.match(output, /已发现日报日期：1 天/);
assert.equal(
  applyFormalRunWindow('non-decision', '2026-09-21', '2026-09-21', 9),
  'scheduled',
  '正式窗口前的当日 fallback 不得列为历史待重跑',
);
assert.equal(
  applyFormalRunWindow('non-decision', '2026-09-21', '2026-09-21', 18),
  'non-decision',
  '正式窗口后仍只有 fallback 时必须列为 non-decision',
);

console.log('AI org coverage window count ok');
