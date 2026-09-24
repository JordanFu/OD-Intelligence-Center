const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const baseUrl = 'https://jordanfu.github.io/talotd/';
const read = filename => fs.readFileSync(path.join(root, filename), 'utf8');
const delivery = read('scripts/check-info-delivery.cjs');
const links = read('scripts/check-public-links.js');
assert.ok(delivery.includes(`const publicBase = '${baseUrl}'`));
assert.ok(delivery.includes('https://github.com/JordanFu/talotd/actions/runs/'));
assert.ok(links.includes("const REPO_PUBLIC_PREFIX = '/talotd/'"));

for (const filename of ['README.md', 'PROJECT.md', 'report-viewer.html', 'digest.md', 'daily/2026-09-06.md', 'daily/2026-09-10.md', 'daily-report/weekly-2026-W15.md']) {
  assert.doesNotMatch(read(filename), /https:\/\/(?:jordanfu\.github\.io|github\.com\/JordanFu)\/OD-Intelligence-Center/i, filename);
}

const html = read('index.html');
const shareFunction = html.match(/function getKBShareUrl\(reportId\) \{[\s\S]*?\n    \}/)[0];
for (const entry of [baseUrl, `${baseUrl}hr/`]) {
  const baseURI = entry.endsWith('/hr/') ? new URL('../', entry).href : entry;
  const context = { URL, document: { baseURI, documentElement: { dataset: { edition: entry.endsWith('/hr/') ? 'hr' : 'internal' } } }, window: {} };
  vm.createContext(context);
  vm.runInContext(read('assets/odic-app.js'), context);
  assert.equal(context.window.ODICApp.getHrShareUrl(), `${baseUrl}hr/`);
  vm.runInContext(shareFunction, context);
  assert.equal(context.getKBShareUrl('report 1'), `${baseUrl}knowledge-viewer.html?id=report%201`);
}
console.log('Migration URLs, delivery target, HR and knowledge sharing passed.');
