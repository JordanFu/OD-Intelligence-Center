const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

assert.match(html, /\.levels-content-grid\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*40fr\)\s+minmax\(0,\s*35fr\)\s+minmax\(0,\s*25fr\)/s, '桌面端必须使用 40/35/25 三栏布局');
assert.match(html, /\.levels-content-grid\s*\{[^}]*align-items:\s*stretch/s, '桌面端三个内容面板必须等高对齐');
assert.match(html, /@media \(max-width:\s*1080px\)[\s\S]*?\.levels-content-grid\s*\{[^}]*grid-template-columns:\s*repeat\(2,/s, '平板端必须降为两栏');
assert.match(html, /@media \(max-width:\s*700px\)[\s\S]*?\.levels-mobile-tabs\s*\{[^}]*display:\s*grid/s, '手机端必须显示专题内容标签');
assert.match(html, /data-levels-panel="synthesis"/, '必须提供阶段性专题综合面板');
assert.match(html, /data-levels-panel="weekly"/, '必须提供周报面板');
assert.match(html, /data-levels-panel="daily"/, '必须提供日报面板');
assert.match(html, /function setLevelsMobileSection\(section\)/, '必须提供手机端面板切换逻辑');

console.log('topic three-pane layout ok');
