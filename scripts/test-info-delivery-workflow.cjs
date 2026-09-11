const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const workflow = fs.readFileSync(path.join(root, '.github/workflows/info-delivery-watchdog.yml'), 'utf8');
const source = workflow.match(/          script: \|\n([\s\S]*?)      - name:/)[1].split('\n').map(line => line.slice(12)).join('\n');
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
const notify = new AsyncFunction('require', 'github', 'context', 'Date', source);
const now = Date.parse('2026-09-11T04:00:00Z');
class FixedDate extends Date { static now() { return now; } }

async function run(receipt, existing = []) {
  const calls = [];
  const github = {
    paginate: async () => existing,
    rest: { issues: {
      listForRepo: () => {},
      create: async value => calls.push({ action: 'create', ...value }),
      update: async value => calls.push({ action: 'update', ...value }),
    } },
  };
  await notify(() => ({ readFileSync: () => JSON.stringify(receipt) }), github, { repo: { owner: 'JordanFu', repo: 'OD-Intelligence-Center' }, runId: 123 }, FixedDate);
  return calls;
}

async function main() {
  const receipt = { date: '2026-09-11', checkedAt: new Date(now).toISOString(), status: 'overdue', publicVerified: false };
  const existing = [{ number: 1, title: '信息库交付待补跑：2026-09-11', state: 'open' }];
  assert.equal((await run(receipt))[0].action, 'create');
  assert.equal((await run(receipt, existing))[0].action, 'update');
  assert.equal((await run({ ...receipt, status: 'published', publicVerified: true }, existing))[0].state, 'closed');
  assert.equal((await run({ ...receipt, status: 'published-gap', publicVerified: true }, existing))[0].state, 'open');
  assert.equal((await run({ ...receipt, checkedAt: '2026-09-10T04:00:00Z', status: 'published', publicVerified: true }, existing))[0].state, 'open');
  assert.equal((await run(null))[0].action, 'create');
  assert.equal((await run({ ...receipt, status: 'scheduled' })).length, 0);
  assert.match(workflow, /if: always\(\)[\s\S]*actions\/upload-artifact/);
  assert.match(workflow, /git add -- "\$file"/);
  assert.doesNotMatch(workflow, /git add -A|ensure-recent-ai-org|ingest-pdf/);
  console.log('delivery workflow: deduplicated issue, recovery, gaps, stale/missing receipt and evidence scope passed');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
