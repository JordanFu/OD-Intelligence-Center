const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const assetsDir = path.join(root, 'assets');
const reportRoots = [
  'specials',
  'daily-report',
  'knowledge/wiki',
  'pdfs',
].map((dir) => path.join(root, dir));
const extraFiles = ['report-viewer.html', 'knowledge-viewer.html'].map((file) => path.join(root, file));

function walk(dir, results = []) {
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, results);
    else if (entry.isFile() && entry.name.endsWith('.html')) results.push(full);
  }
  return results;
}

function shareTags(file) {
  const prefix = path.relative(path.dirname(file), assetsDir).replace(/\\/g, '/') || '.';
  return [
    `<link rel="stylesheet" href="${prefix}/report-share.css">`,
    `<script defer src="${prefix}/report-share.js"></script>`,
  ].join('\n');
}

function inject(file) {
  let html = fs.readFileSync(file, 'utf8');
  if (html.includes('report-share.js')) return false;
  const tags = shareTags(file);
  if (/<\/head>/i.test(html)) {
    html = html.replace(/<\/head>/i, `${tags}\n</head>`);
  } else {
    html = `${tags}\n${html}`;
  }
  fs.writeFileSync(file, html);
  return true;
}

const files = [...new Set([...reportRoots.flatMap((dir) => walk(dir)), ...extraFiles.filter(fs.existsSync)])];
let changed = 0;
for (const file of files) {
  if (inject(file)) changed += 1;
}
console.log(`Enhanced report sharing for ${changed} HTML files (${files.length} checked).`);
