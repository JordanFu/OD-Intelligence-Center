const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const today = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Shanghai',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
}).format(new Date());

const scanRoots = [
  'daily',
  'daily-report',
  'specials',
  'analysis',
].map((dir) => path.join(root, dir)).filter((dir) => fs.existsSync(dir));

const knownTitles = new Map([
  ['https://media-publications.bcg.com/AI-First-Organization.pdf', 'BCG：AI-First Organization'],
  ["https://reports.weforum.org/docs/WEF_Organizational_Transformation_in_the_Age_of_AI_How_Organizations_Maximize_AI's_Potential_2026.pdf", 'WEF：Organizational Transformation in the Age of AI'],
  ['https://www.aihr.com/resources/AIHR_HR_Priorities_2026_Report.pdf', 'AIHR：HR Priorities 2026 Report'],
  ['https://resources.anthropic.com/hubfs/2026%20Agentic%20Coding%20Trends%20Report.pdf', 'Anthropic：2026 Agentic Coding Trends Report'],
  ['https://ir.gitlab.com/sec-filings/all-sec-filings/content/0001628280-26-023407/0001628280-26-023407.pdf', 'GitLab：2026 SEC 8-K Filing'],
  ['https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/newsroom/2026/02/ey-future-of-pay-report-2026.pdf', 'EY：Future of Pay Report 2026'],
  ['https://web-assets.bcg.com/73/8e/cc44cbc14a3b81695f8a3de28ff1/ai-radar-2026-web-jan-2026-edit.pdf', 'BCG：AI Radar 2026'],
]);

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(file));
    else if (/\.(md|json)$/i.test(entry.name)) files.push(file);
  }
  return files;
}

function cleanUrl(url) {
  return url
    .replace(/[),，。；;]+$/g, '')
    .replace(/&amp;/g, '&')
    .trim();
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/%[0-9a-f]{2}/gi, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96);
}

function titleFromUrl(url) {
  if (knownTitles.has(url)) return knownTitles.get(url);
  const parsed = new URL(url);
  const base = decodeURIComponent(path.basename(parsed.pathname)).replace(/\.pdf$/i, '');
  return base.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function publisherFromUrl(url) {
  const host = new URL(url).hostname.replace(/^www\./, '');
  if (host.includes('bcg.com')) return 'BCG';
  if (host.includes('deloitte.com')) return 'Deloitte';
  if (host.includes('ey.com')) return 'EY';
  if (host.includes('weforum.org')) return 'World Economic Forum';
  if (host.includes('aihr.com')) return 'AIHR';
  if (host.includes('anthropic.com')) return 'Anthropic';
  if (host.includes('gitlab.com')) return 'GitLab';
  return host;
}

function sourceTypeFor(url) {
  const host = new URL(url).hostname;
  if (/(bcg|deloitte|ey)\.com/.test(host)) return 'consulting';
  if (/weforum|aihr|anthropic|gitlab/.test(host)) return 'industry';
  return 'media';
}

function topicsFor(title, url) {
  const text = `${title} ${url}`.toLowerCase();
  const topics = new Set(['AI组织设计']);
  if (/pay|compensation|salary|薪酬|future-of-pay/.test(text)) topics.add('绩效管理');
  if (/hr|talent|workforce|people|coding|skills/.test(text)) topics.add('人才发展');
  if (/organi[sz]ation|operating|transformation|agent/.test(text)) topics.add('变革管理');
  if (/radar|strategy|weforum/.test(text)) topics.add('战略规划');
  return Array.from(topics);
}

function contextFromLine(line, url) {
  const markdownLink = line.match(new RegExp(`\\[([^\\]]+)\\]\\(${url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)`));
  if (markdownLink) return markdownLink[1];
  return line.replace(url, '').replace(/^[-*]\s*/, '').replace(/\*\*/g, '').trim().slice(0, 180);
}

function collectPdfReferences() {
  const references = new Map();
  const urlPattern = /https?:\/\/[^\s<>"]+?\.pdf(?:\?[^\s<>"]*)?/gi;
  for (const file of scanRoots.flatMap(walk)) {
    const relativeFile = path.relative(root, file);
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split(/\r?\n/);
    lines.forEach((line, index) => {
      const matches = line.match(urlPattern) || [];
      for (const rawUrl of matches) {
        const url = cleanUrl(rawUrl);
        if (!references.has(url)) {
          references.set(url, {
            url,
            title: titleFromUrl(url),
            publisher: publisherFromUrl(url),
            sourceType: sourceTypeFor(url),
            citations: [],
          });
        }
        references.get(url).citations.push({
          file: relativeFile,
          line: index + 1,
          context: contextFromLine(line, url),
        });
      }
    });
  }
  return Array.from(references.values()).sort((a, b) => a.url.localeCompare(b.url));
}

function downloadPdf(item, rawFile) {
  if (fs.existsSync(rawFile) && fs.statSync(rawFile).size > 1024) return 'downloaded';
  try {
    execFileSync('curl', [
      '-L',
      '--fail',
      '--max-time',
      '90',
      '-A',
      'Mozilla/5.0 OD-Intelligence-Center/1.0',
      '-o',
      rawFile,
      item.url,
    ], { stdio: 'ignore' });
    return fs.existsSync(rawFile) && fs.statSync(rawFile).size > 1024 ? 'downloaded' : 'download_failed';
  } catch {
    if (fs.existsSync(rawFile)) fs.unlinkSync(rawFile);
    return 'download_failed';
  }
}

function wikiMarkdown(item, slug, rawRelative, status) {
  const citations = item.citations
    .map((citation) => `- \`${citation.file}:${citation.line}\`：${citation.context || '日报/周报引用该 PDF。'}`)
    .join('\n');
  const topics = topicsFor(item.title, item.url);
  return `---\ntitle: ${item.title}\nsource: ${item.publisher}\ndate: 待核验\ningested: ${today}\nsourceFile: ${status === 'downloaded' ? `../${rawRelative}` : ''}\nsourceUrl: ${item.url}\ntags: [${topics.join(', ')}]\nstatus: ${status === 'downloaded' ? '已下载原始PDF，待精读摘要' : '已索引来源，PDF下载待重试'}\n---\n\n# ${item.title}\n\n## 入库状态\n\n- **来源机构**：${item.publisher}\n- **来源类型**：${item.sourceType}\n- **原文 URL**：${item.url}\n- **原始文件**：${status === 'downloaded' ? `\`${rawRelative}\`` : '下载失败或待重试，先保留 URL 与引用上下文'}\n- **入库日期**：${today}\n\n## 已知上下文\n\n该 PDF 被日报/周报作为证据引用。当前页面先完成 Raw Source 与 Wiki Source Card 建档，避免 PDF 证据只停留在日报正文中；后续精读时再补充“核心论点、关键框架、案例研究、OD 启示、与已有知识的关联”。\n\n## 被引用位置\n\n${citations}\n\n## 待精读问题\n\n- 该报告是否提供可直接支撑组织设计、岗位族群、职级、薪酬或激励机制改革的框架？\n- 报告中的数据口径、样本范围、发布日期和适用行业是什么？\n- 哪些判断可进入日报/周报结论层，哪些只能作为 Context 或线索层？\n- 是否需要提取为独立概念页、实体页或机制模板？\n\n## 与已有知识的关联\n\n- [[AI-First 运营模型]]\n- [[技能为本的组织]]\n- [[能力-判断评估矩阵]]\n`;
}

function updateCatalog(items) {
  const catalogPath = path.join(root, 'knowledge/catalog.json');
  const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
  catalog.lastUpdated = today;
  const existingUrls = new Set((catalog.reports || []).map((report) => report.originalUrl).filter(Boolean));
  const existingIds = new Set((catalog.reports || []).map((report) => report.id));
  let nextNumber = Math.max(0, ...Array.from(existingIds).map((id) => {
    const match = String(id).match(/^p(\d+)$/);
    return match ? Number(match[1]) : 0;
  })) + 1;
  for (const item of items) {
    if (existingUrls.has(item.url)) continue;
    const id = `p${String(nextNumber++).padStart(3, '0')}`;
    catalog.reports.push({
      id,
      title: item.title,
      originalTitle: item.title,
      author: item.publisher,
      publisher: item.publisher,
      sourceType: item.sourceType,
      topics: topicsFor(item.title, item.url),
      date: '',
      uploadDate: today,
      description: `由日报/周报 PDF 引用自动入库。当前已保存来源 URL、引用上下文${item.status === 'downloaded' ? '和原始 PDF 文件' : '，原始 PDF 下载待重试'}，后续按知识库规则精读补充摘要。`,
      summaryFile: `./knowledge/wiki/${item.wikiName}`,
      rawFile: item.status === 'downloaded' ? `./${item.rawRelative}` : '',
      fileName: path.basename(item.rawRelative),
      fileSize: item.status === 'downloaded' ? `${item.size} bytes` : 'download pending',
      tags: ['PDF自动入库', ...topicsFor(item.title, item.url), item.publisher],
      originalUrl: item.url,
    });
  }
  fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2) + '\n');
}

function updateIndex(items) {
  const indexPath = path.join(root, 'knowledge/index.md');
  let content = fs.readFileSync(indexPath, 'utf8');
  content = content.replace(/最后更新: \d{4}-\d{2}-\d{2}/, `最后更新: ${today}`);
  const rows = items.map((item) => {
    const status = item.status === 'downloaded' ? '已下载原文' : '已索引待重试';
    return `| [${item.title}](wiki/${item.wikiName}) | ${item.publisher} | ${status} | ${item.citations.length} |`;
  }).join('\n');
  const block = `<!-- PDF_AUTO_INDEX_START -->\n## PDF 自动入库索引\n\n> 从日报、周报和专题报告中自动发现 PDF 证据源；先完成来源、原文、引用上下文和追溯链接建档，后续再逐份精读摘要。\n\n| 标题 | 来源 | 状态 | 引用次数 |\n|---|---|---|---|\n${rows}\n<!-- PDF_AUTO_INDEX_END -->`;
  if (content.includes('<!-- PDF_AUTO_INDEX_START -->')) {
    content = content.replace(/<!-- PDF_AUTO_INDEX_START -->[\s\S]*?<!-- PDF_AUTO_INDEX_END -->/, block);
  } else {
    content = content.replace('\n## 操作日志', `\n${block}\n\n## 操作日志`);
  }
  fs.writeFileSync(indexPath, content);
}

function updateLog(items) {
  const logPath = path.join(root, 'knowledge/log.md');
  let content = fs.readFileSync(logPath, 'utf8');
  const downloaded = items.filter((item) => item.status === 'downloaded').length;
  const failed = items.length - downloaded;
  const lines = items.map((item) => `- ${item.status === 'downloaded' ? '已下载' : '待重试'}：${item.title}（引用 ${item.citations.length} 次）`).join('\n');
  const entry = `## [${today}] ingest | 日报 PDF 证据源自动入库\n- 从 daily、daily-report、specials、analysis 中扫描 PDF URL，按知识库 Raw/Wiki/Catalog 规则自动建档。\n- 本次识别 ${items.length} 个唯一 PDF 来源：${downloaded} 个已下载原始 PDF，${failed} 个保留 URL 与引用上下文待重试。\n${lines}\n\n`;
  const marker = `## [${today}] ingest | 日报 PDF 证据源自动入库`;
  if (content.includes(marker)) {
    content = content.replace(new RegExp(`${marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]*?(?=\\n## \\[|$)`), entry.trimEnd());
  } else {
    content = content.replace('---\n\n', `---\n\n${entry}`);
  }
  fs.writeFileSync(logPath, content);
}

function main() {
  const rawDir = path.join(root, 'knowledge/raw');
  const wikiDir = path.join(root, 'knowledge/wiki');
  fs.mkdirSync(rawDir, { recursive: true });
  fs.mkdirSync(wikiDir, { recursive: true });
  const references = collectPdfReferences();
  const ingested = [];
  for (const item of references) {
    const slug = slugify(`${publisherFromUrl(item.url)}-${titleFromUrl(item.url)}`);
    const rawName = `${slug}.pdf`;
    const wikiName = `pdf-source-${slug}.md`;
    const rawFile = path.join(rawDir, rawName);
    const rawRelative = path.relative(root, rawFile);
    const status = downloadPdf(item, rawFile);
    const wikiFile = path.join(wikiDir, wikiName);
    fs.writeFileSync(wikiFile, wikiMarkdown(item, slug, rawRelative, status));
    item.slug = slug;
    item.status = status;
    item.rawRelative = rawRelative;
    item.wikiName = wikiName;
    item.size = status === 'downloaded' ? fs.statSync(rawFile).size : 0;
    ingested.push(item);
  }
  updateCatalog(ingested);
  updateIndex(ingested);
  updateLog(ingested);
  console.log(`PDF references ingested: ${ingested.length}`);
  for (const item of ingested) {
    console.log(`${item.status}\t${item.title}\t${item.url}`);
  }
}

main();
