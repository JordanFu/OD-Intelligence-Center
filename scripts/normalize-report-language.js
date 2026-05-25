const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const targets = [
  'specials/ai-org-talent-mechanism',
  'specials/job-levels',
  'daily-report',
  'weekly',
].map((dir) => path.join(root, dir));
const scriptTargets = [
  'scripts/ensure-ai-org-reports.js',
  'scripts/update-ai-org-baselines.js',
].map((file) => path.join(root, file)).filter(fs.existsSync);

const phrasePairs = [
  ['AI 技能溢价（skill premium）', 'AI 技能溢价（AI skill premium）'],
    ['基于技能的薪酬（skills-based pay）', '基于技能的薪酬（skills-based pay）'],
  ['pay governance', '薪酬治理（pay governance）'],
  ['pay bands', '薪酬带宽（pay bands）'],
        ['spot 奖金（bonus）', '即时奖金（spot 奖金（bonus））'],
    ['market adjustment', '市场校准调薪（market adjustment）'],
  ['special allowance', '专项津贴（special allowance）'],
  ['sunset clauses', '退出条款（sunset clauses）'],
      ['workflow redesign', '工作流重设计（workflow redesign）'],
    ['workflow impact', '工作流影响力（workflow impact）'],
    ['job architecture', '岗位架构（job architecture）'],
    ['skills taxonomy', '技能分类体系（skills taxonomy）'],
        ['human-agent agency', '人机协同能动性（human-agent agency）'],
  ['player-coaches', '实战型教练管理者（player-coaches）'],
  ['player-coach', '实战型教练管理者（player-coach）'],
  ['one-person teams', '一人团队（one-person teams）'],
  ['AI-native', 'AI 原生（AI-native）'],
  ['no pure managers', '取消纯管理者（no pure managers）'],
  ['pure managers', '纯管理者（pure managers）'],
  ['direct reports', '直接下属（direct reports）'],
  ['evidence packet', '证据包（evidence packet）'],
  ['world model', '世界模型（world model）'],
  ['intelligence layer', '智能层（intelligence layer）'],
];

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name.endsWith('.md')) files.push(full);
  }
  return files;
}

function protect(text) {
  const tokens = [];
  const pattern = /(`[^`]*`|https?:\/\/[^\s<>)"']+|\[[^\]]+\]\([^)]*\))/g;
  const body = text.replace(pattern, (value) => {
    const token = `__KEEP_${tokens.length}__`;
    tokens.push([token, value]);
    return token;
  });
  return [body, tokens];
}

function restore(text, tokens) {
  let next = text;
  for (const [token, value] of tokens) next = next.replaceAll(token, value);
  return next;
}

function replacePhrase(text, phrase, replacement) {
  const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(escaped, 'g');
  return text.replace(pattern, (match, offset, source) => {
    const before = source.slice(Math.max(0, offset - 12), offset);
    const after = source.slice(offset + match.length, offset + match.length + 1);
    if (after === '）' || before.includes('（')) return match;
    return replacement;
  });
}

function normalize(body) {
  const [protectedBody, tokens] = protect(body);
  let next = protectedBody;
  next = next
    .replace(/## 背景材料（Context）/g, '## 背景材料（Context）')
    .replace(/## 今日 Context/g, '## 今日背景材料（Context）')
    .replace(/背景材料（Context）/g, '背景材料（Context）')
    .replace(/今日 Context/g, '今日背景材料（Context）')
    .replace(/进入 Context/g, '进入背景材料（Context）')
    .replace(/Context\/线索/g, '背景材料（Context）/线索')
    .replace(/Context、/g, '背景材料（Context）、')
    .replace(/Context 和/g, '背景材料（Context）和')
    .replace(/把 Context 升级/g, '把背景材料（Context）升级')
    .replace(/redesign jobs to fit AI/g, '围绕 AI 重新设计岗位')
    .replace(/redesign jobs/g, '重新设计岗位')
    .replace(/AI 采用/g, 'AI 采用')
    .replace(/常规执行工作/g, '常规执行工作')
    .replace(/常规执行工作/g, '常规执行工作')
    .replace(/协调性工作/g, '协调性工作')
    .replace(/判断性工作/g, '判断性工作')
    .replace(/人才发展工作/g, '人才发展工作')
    .replace(/治理工作/g, '治理工作')
    .replace(/管理者角色重写/g, '管理者角色重写')
    .replace(/晋升证据/g, '晋升证据')
    .replace(/pay tools/g, '薪酬工具')
    .replace(/title tools/g, '头衔工具');
  for (const [phrase, replacement] of phrasePairs) next = replacePhrase(next, phrase, replacement);
  return restore(next, tokens);
}

let changed = 0;
for (const file of [...targets.flatMap((dir) => walk(dir)), ...scriptTargets]) {
  const before = fs.readFileSync(file, 'utf8');
  const after = normalize(before);
  if (after !== before) {
    fs.writeFileSync(file, after);
    changed += 1;
  }
}
console.log(`Normalized report language in ${changed} files.`);
