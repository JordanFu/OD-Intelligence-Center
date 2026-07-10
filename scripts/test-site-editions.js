const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const internalHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const hrPath = path.join(root, 'hr', 'index.html');

assert.match(internalHtml, /data-edition="internal"/, '内部首页必须声明 internal edition');
assert.match(internalHtml, /专题项目/, '内部首页必须保留专题项目入口');
assert.match(internalHtml, /复制 HR 分享版链接/, '内部首页必须提供 HR 分享入口');
assert.match(internalHtml, /assets\/odic-app\.js/, '内部首页必须加载共享运行时');
assert.match(internalHtml, /btn\.dataset\.tab === tab/, '标签切换必须按 data-tab 工作，兼容两种入口');
assert.ok(fs.existsSync(hrPath), '必须存在独立的 hr/index.html 分享入口');

const hrHtml = fs.readFileSync(hrPath, 'utf8');
assert.match(hrHtml, /data-edition="hr"/, 'HR 首页必须声明 hr edition');
assert.match(hrHtml, /<base href="\.\.\/">/, 'HR 首页必须从仓库根目录读取共享数据');
assert.match(hrHtml, /OD 情报中心｜HR 分享版/, 'HR 首页必须使用分享版标题');
assert.doesNotMatch(hrHtml, /<iframe\b/i, 'HR 首页不得通过 iframe 嵌入内部版');
assert.doesNotMatch(hrHtml, /http-equiv=["']refresh/i, 'HR 首页不得通过页面跳转实现');
assert.doesNotMatch(hrHtml, /专题项目|专题日报|专题周报|专题 manifest/, 'HR 静态入口不得暴露专题项目文案');
assert.doesNotMatch(hrHtml, /系统健康|fallback|待正式重跑|内部路径检查/, 'HR 静态入口不得暴露内部运维文案');
assert.match(hrHtml, /assets\/hr-entry\.js/, 'HR 首页必须通过共享入口加载应用');

const sharedScript = fs.readFileSync(path.join(root, 'assets', 'odic-app.js'), 'utf8');
assert.match(sharedScript, /ODIC_EDITION/, '共享运行时必须根据 edition 切换行为');
assert.match(sharedScript, /renderReaderStatus/, '共享运行时必须提供 HR 阅读状态');
assert.match(sharedScript, /if \(ODIC_EDITION === 'hr'\)/, '共享运行时必须包含 HR 模式保护');

const hrEntry = fs.readFileSync(path.join(root, 'assets', 'hr-entry.js'), 'utf8');
assert.match(hrEntry, /fetch\(['"]\.\.\/index\.html['"]/, 'HR 入口必须复用内部首页作为唯一页面模板');
assert.match(hrEntry, /document\.write/, 'HR 入口必须在当前 URL 渲染共享模板');
assert.doesNotMatch(hrEntry, /location\.(?:assign|replace)|<iframe\b/i, 'HR 入口不得跳转或使用 iframe');

console.log('site editions ok');
