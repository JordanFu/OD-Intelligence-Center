const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const { assessOrgIntelligenceFreshness } = require('./org-intelligence-freshness');

const current = new Date('2026-08-22T02:00:00.000Z');

assert.deepEqual(
  assessOrgIntelligenceFreshness('2026-08-22', current),
  { status: 'pass', ageDays: 0, maxAgeDays: 1 },
);

assert.deepEqual(
  assessOrgIntelligenceFreshness('2026-08-21', current),
  { status: 'pass', ageDays: 1, maxAgeDays: 1 },
);

assert.deepEqual(
  assessOrgIntelligenceFreshness('2026-08-18', current),
  { status: 'fail', ageDays: 4, maxAgeDays: 1 },
);

assert.deepEqual(
  assessOrgIntelligenceFreshness('not-a-date', current),
  { status: 'unknown', ageDays: null, maxAgeDays: 1 },
);

const workflow = fs.readFileSync(
  path.join(__dirname, '..', '.github', 'workflows', 'ai-org-reports-fallback.yml'),
  'utf8',
);
assert.match(workflow, /node scripts\/test-org-intelligence-freshness\.js/);

console.log('organization intelligence freshness checks ok');
