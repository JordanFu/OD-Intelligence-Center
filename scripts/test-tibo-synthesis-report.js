const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const slug = '2026-08-26-tibo-research-product-org-mechanism';
const markdownPath = path.join(root, 'specials', 'ai-org-talent-mechanism', 'synthesis', `${slug}.md`);
const htmlPath = path.join(root, 'specials', 'ai-org-talent-mechanism', 'synthesis', `${slug}.html`);
const wikiPath = path.join(root, 'knowledge', 'wiki', 'tibo-research-product-org-mechanism-2026-08-26.md');
const catalogPath = path.join(root, 'knowledge', 'catalog.json');
const indexPath = path.join(root, 'index.html');

test('Tibo 完整报告在阶段性专题综合目录中有可直接阅读的 HTML 和 Markdown', () => {
  assert.ok(fs.existsSync(markdownPath), '阶段性专题综合目录缺少完整报告 Markdown');
  assert.ok(fs.existsSync(htmlPath), '阶段性专题综合目录缺少可直接阅读的完整报告 HTML');

  const markdown = fs.readFileSync(markdownPath, 'utf8');
  const html = fs.readFileSync(htmlPath, 'utf8');
  assert.match(markdown, /^# 从“有模型”到“有产品”/m, 'Markdown 不是目标完整报告');
  assert.match(markdown, /## 八、主要来源/, 'Markdown 缺少完整来源部分');
  assert.match(html, /<article class="doc">[\s\S]+能力发现—产品化—真实使用—反馈回流—资源再配置[\s\S]+<\/article>/, 'HTML 未渲染完整报告正文');
});

test('知识卡和阶段性专题综合面板都使用站内安全路径指向完整报告', () => {
  const wiki = fs.readFileSync(wikiPath, 'utf8');
  const index = fs.readFileSync(indexPath, 'utf8');
  const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
  const report = catalog.reports.find((item) => item.id === 'tibo-research-product-org-mechanism-2026-08-26');

  assert.doesNotMatch(wiki, /\.\.\/\.\.\/analysis\/tibo-research-product-org-mechanism-2026-08-26\.md/, '知识卡仍使用会跳出站点的旧相对路径');
  assert.match(wiki, /\.\/specials\/ai-org-talent-mechanism\/synthesis\/2026-08-26-tibo-research-product-org-mechanism\.html/, '知识卡未链接到可阅读专题页');
  assert.match(index, /href: '\.\/specials\/ai-org-talent-mechanism\/synthesis\/2026-08-26-tibo-research-product-org-mechanism\.html'/, '阶段性专题综合缺少 HTML 入口');
  assert.match(index, /markdown: '\.\/specials\/ai-org-talent-mechanism\/synthesis\/2026-08-26-tibo-research-product-org-mechanism\.md'/, '阶段性专题综合缺少 Markdown 入口');
  assert.equal(report.analysisFile, './specials/ai-org-talent-mechanism/synthesis/2026-08-26-tibo-research-product-org-mechanism.md');
});
