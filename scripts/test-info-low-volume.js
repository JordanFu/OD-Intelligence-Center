const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, 'audit-info-library.js'), 'utf8');
const context = vm.createContext({ require, __dirname, process, console });
vm.runInContext(source.replace(/\nmain\(\);\s*$/, ''), context);
const card = (identifier, type, url = '') => [
  `### [${identifier}] 测试材料`,
  `- **信息类型**：${type}`,
  '- **事件摘要**：扫描官方与媒体渠道，可信新增不足，记录覆盖缺口。',
  `- **来源**：${url}`,
  `- **来源平台**：来源${identifier}`,
  '- **结论置信度**：L1 线索',
].join('\n');
const materials = [
  card('A', '新增事实', 'https://example.org/one'),
  card('B', '旧线复核', 'https://example.org/two'),
  card('C', '弱信号', 'https://example.org/three'),
];
const gap = card('G', '缺口记录');
function assess(cards, existing = null) {
  context.markdown = ['## 2026-09-21', ...cards].join('\n');
  context.existing = existing;
  return vm.runInContext('qualityIssues(parseDigest(markdown)[0], markdown, existing)', context);
}
const low = assess([...materials, gap]);
assert.equal(low.criticalIssues.length, 0);
assert.ok(low.warnings.some((issue) => issue.includes('可追溯链接少于')));
assert.ok(assess(materials).criticalIssues.some((issue) => issue.includes('可追溯链接少于')));
const missing = materials.map((item) => item.replace('https://example.org/two', ''));
assert.ok(assess([...missing, gap]).criticalIssues.some((issue) => issue.includes('可追溯链接少于')));
assert.ok(assess([gap]).criticalIssues.some((issue) => issue.includes('可追溯链接少于')));
const overclaimed = [...materials, gap].map((item) => item.replace('L1 线索', 'L3 机制'));
assert.ok(assess(overclaimed).criticalIssues.some((issue) => issue.includes('弱信号被标成')));
assert.ok(assess([...materials, gap], { links: { brokenCount: 1 } }).criticalIssues.some((issue) => issue.includes('断链')));
console.log('Low-volume source gate: valid gap warns; missing sources, absent evidence, overclaims and broken links remain failures.');
