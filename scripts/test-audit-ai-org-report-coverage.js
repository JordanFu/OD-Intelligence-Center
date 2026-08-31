const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

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

console.log('AI org coverage window count ok');
