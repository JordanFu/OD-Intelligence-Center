const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const project = path.join(root, 'specials', 'ai-org-talent-mechanism');
const weeklyDir = path.join(project, 'weekly');
const now = process.env.REPORT_DATE ? new Date(`${process.env.REPORT_DATE}T12:00:00+08:00`) : new Date();
const formatter = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' });
const today = process.env.REPORT_DATE || formatter.format(now);

const SOURCES = [
  ['IBM Think 2026 recap', 'https://www.ibm.com/think/news/think-2026-ai-recap', 'agentic AI scale、Bob、governance、productivity'],
  ['Microsoft Work Trend Index 2026', 'https://www.microsoft.com/en-us/worklab/work-trend-index/agents-human-agency-and-the-opportunity-for-every-organization', 'human-agent agency、operating model redesign'],
  ['Deloitte agent operating model', 'https://www.deloitte.com/us/en/insights/topics/talent/operating-models-for-humans-ai-agents.html', '84% 未 redesign jobs、agent operating model'],
  ['McKinsey AI-first workforce', 'https://www.mckinsey.com/capabilities/mckinsey-technology/our-insights/designing-an-end-to-end-technology-workforce-for-the-ai-first-era', 'AI-first technology workforce、深专家、product/platform model'],
  ['Mercer Global Talent Trends 2026', 'https://www.mercer.com/about/newsroom/mercer-s-global-talent-trends-2026-report/', 'work redesign、skills as currency、human-AI teaming'],
  ['EY Future of Pay 2026', 'https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/newsroom/2026/02/ey-future-of-pay-report-2026.pdf', 'AI skill premium、skills-based pay、sunset clauses'],
  ['Payscale 2026 CBPR', 'https://www.payscale.com/press-releases/2026-compensation-best-practices-report', 'AI skills compensation、pay equity'],
  ['CHRO Association 2026 Survey', 'https://www.chro.org/documents/d/guest/2026_chro_survey_key_findings_p', '中层阻力、CHRO 议题'],
  ['OD Intelligence Center 知识库', './knowledge/wiki/zhiyinlou-hr-thematic-index-2026-05-13.md', 'AI+HR、薪酬福利、组织发展精读池'],
];

function ensureDir(dir) { fs.mkdirSync(dir, { recursive: true }); }
function writeIfMissing(file, content) {
  if (!fs.existsSync(file)) fs.writeFileSync(file, content);
}
function isoWeek(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
}
function sourceList() {
  return SOURCES.map(([name, url, note]) => `- [${name}](${url})：${note}`).join('\n');
}
function md(title, body) {
  return `# ${today}｜${title}\n\n${body}\n\n## 来源索引\n\n${sourceList()}\n`;
}

function dailyContent(kind) {
  const common = `> 云端兜底生成：当本地设备离线或常规自动化未提交时，由 GitHub Actions 生成最低可用版本；后续可由主代理继续精读增强。\n\n## 今日一句话结论\n\nAI 组织改革需要同时观察结论层、Context 层和线索层：高置信材料进入判断，未验证材料保留为追踪线索，不硬凑结论。\n\n## 今日核心判断\n\n1. **AI operating model 正在从工具层走向组织层。** IBM、Microsoft、Deloitte、McKinsey 的材料共同指向 agent、人、数据、流程和治理的一体化重构。\n2. **执行层角色会变宽，核心专家能力会变深。** Routine work 被 agent 吸收后，workflow owner、agent governance、AI infra、data context、security、model evaluation 等能力更关键。\n3. **岗位体系问题经常是薪酬与激励承接问题。** EY、Payscale 与市场薪酬信号提示 AI 技能溢价需要 skill premium、project bonus、LTI、market adjustment 等机制承接。\n\n## Context 层\n\n- 企业宣布 AI adoption 不等于完成 job/workflow redesign。Deloitte 的 84% 未重设岗位是关键反例。\n- 中层减少的新闻需要拆解：哪些是协调任务被系统化，哪些是成本控制，哪些是真正的 manager role rewrite。\n- AI skill premium 需要区分地区、行业、职能、base pay、bonus 和 LTI。\n\n## 线索层\n\n- 继续追踪 FDE、AI workflow owner、agent ops、AI governance、skills-based pay 等 title 是否形成稳定 job family。\n- 继续追踪中国公司是否用技能标签、稀缺系数、项目激励替代新增岗位序列。\n`;
  if (kind === 'flat') return md('专题一：组织扁平化与中层减少', `${common}\n## 落地启发\n\n先拆 manager 工作：信息同步、进度追踪、跨部门协调、质量判断、人才发展、冲突处理。可系统化的部分交给 agent 和平台，不可替代的部分升级为 player-coach、workflow owner 和治理 owner。`);
  if (kind === 'talent') return md('专题二：高人才密度与复合型人才机制', `${common}\n## 落地启发\n\n高人才密度不再只看个人绩效，而要看 human-agent agency：问题定义、agent 编排、质量治理、复用资产和跨团队推进能力。`);
  if (kind === 'job') return md('专题三：岗位、族群、序列持续建设', `${common}\n## 落地启发\n\n新建岗位/族群前先判断：是长期战略能力，还是短期技能溢价、项目贡献、关键人才保留或 pay band 不足。`);
  if (kind === 'promotion') return md('专题四：未来组织的晋升机制', `${common}\n## 落地启发\n\n晋升证据包应记录业务结果、workflow redesign、agent governance、复用资产和团队能力提升，不记录 AI 使用次数。`);
  return md('AI时代组织与人才机制四课题总览', `${common}\n## 今日新增证据地图\n\n| 渠道 | 用途 |\n|---|---|\n| 官方/一手 | IBM、Microsoft 等 operating model 与 agent 使用信号 |\n| 权威咨询 | Deloitte、McKinsey、Mercer 对 job/workflow redesign 的判断 |\n| 薪酬信号 | EY、Payscale 对 AI skill premium 与 pay governance 的提示 |\n| 知识库 | 知音楼 HR 资料作为 AI+HR、薪酬福利、组织发展精读池 |\n\n## 待验证清单\n\n1. 今日是否存在新的一手公司公告或 SEC 文件。\n2. 是否有新增 JD/薪酬区间支持 AI skill premium。\n3. 是否有员工/管理者反馈能还原落地争议。\n4. 是否需要把 Context 升级为高置信结论。`);
}

function writeIndex(dir) {
  const date = path.basename(dir);
  writeIfMissing(path.join(dir, 'index.html'), `<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${date} AI时代组织与人才机制四课题日报</title><style>body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC",sans-serif;background:#0f1117;color:#eef2fb;line-height:1.75;margin:0}main{max-width:1080px;margin:auto;padding:28px 24px}.hero,.card{background:#171a24;border:1px solid #31374b;border-radius:16px;padding:22px;margin:12px 0}.grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}.card a,.btn{display:inline-block;color:white;background:#7c92ff;text-decoration:none;border-radius:8px;padding:8px 12px;font-weight:700}.btn{background:#202434;border:1px solid #31374b}@media(max-width:900px){.grid{grid-template-columns:1fr}}</style></head><body><main><a class="btn" href="../../../index.html">返回 OD 情报中心</a><section class="hero"><h1>${date} AI时代组织与人才机制四课题日报</h1><p>云端兜底版：确保本地设备离线时，日报仍会生成、渲染并提交。后续主代理可继续增强。</p><a class="card a" href="./00-overview.html">阅读总览报告</a></section><section class="grid"><article class="card"><h2>组织扁平化</h2><p>中层减少、player-coach、agent workflow owner。</p><a href="./01-flat-organization.html">阅读专题一</a></article><article class="card"><h2>高人才密度</h2><p>human-agent agency、复合型人才、复用资产。</p><a href="./02-talent-density.html">阅读专题二</a></article><article class="card"><h2>岗位族群序列</h2><p>宽岗位、深专家、技能标签与薪酬承接。</p><a href="./03-job-family-career-architecture.html">阅读专题三</a></article><article class="card"><h2>未来晋升机制</h2><p>项目证据、技能溢价、例外通道与校准。</p><a href="./04-promotion-system.html">阅读专题四</a></article></section></main></body></html>`);
}

function ensureDaily() {
  const dir = path.join(project, today);
  ensureDir(dir);
  writeIfMissing(path.join(dir, '00-overview.md'), dailyContent('overview'));
  writeIfMissing(path.join(dir, '01-flat-organization.md'), dailyContent('flat'));
  writeIfMissing(path.join(dir, '02-talent-density.md'), dailyContent('talent'));
  writeIfMissing(path.join(dir, '03-job-family-career-architecture.md'), dailyContent('job'));
  writeIfMissing(path.join(dir, '04-promotion-system.md'), dailyContent('promotion'));
  execFileSync('node', ['scripts/render-special-html.js', `specials/ai-org-talent-mechanism/${today}`], { cwd: root, stdio: 'inherit' });
  writeIndex(dir);
}

function weeklyAnchorDate() {
  const d = new Date(now);
  const shanghaiDay = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Shanghai', weekday: 'short' }).format(d);
  if (shanghaiDay === 'Mon') d.setDate(d.getDate() - 7);
  return d;
}

function ensureWeekly() {
  ensureDir(weeklyDir);
  const week = isoWeek(weeklyAnchorDate());
  const files = fs.readdirSync(project).filter(name => /^\d{4}-\d{2}-\d{2}$/.test(name)).sort().slice(-7);
  const rows = files.map(date => `| ${date} | [日报](../${date}/index.html) | ${fs.existsSync(path.join(project, date, '00-overview.md')) ? '已生成' : '缺总览'} |`).join('\n');
  const content = `# ${week}｜AI时代组织与人才机制周报\n\n> 云端兜底生成：汇总最近 7 个日报目录，确保本地设备离线时周报入口不断档。\n\n## 本周一句话结论\n\n本周证据继续指向：AI 组织改革不是单点工具上线，而是 operating model、job/workflow redesign、skills-based pay 和 promotion evidence 的组合变革。\n\n## 本周日报索引\n\n| 日期 | 链接 | 状态 |\n|---|---|---|\n${rows}\n\n## 本周待增强\n\n- 由主代理补充每天的新增一手证据与 Context/线索层。\n- 对 AI skill premium、manager role rewrite、agent governance job family 做交叉验证。\n\n## 来源索引\n\n${sourceList()}\n`;
  writeIfMissing(path.join(weeklyDir, `${week}.md`), content);
  if (!fs.existsSync(path.join(weeklyDir, 'latest.md'))) fs.writeFileSync(path.join(weeklyDir, 'latest.md'), content);
  const html = `<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${week} AI组织人才机制周报</title><style>body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC",sans-serif;background:#0f1117;color:#eef2fb;line-height:1.75;margin:0}main{max-width:980px;margin:auto;padding:28px 24px}article{background:#171a24;border:1px solid #31374b;border-radius:16px;padding:24px}a{color:#34d399}td{border:1px solid #31374b;padding:8px}table{border-collapse:collapse;width:100%}</style></head><body><main><article>${content.replace(/^# (.+)$/m, '<h1>$1</h1>').replace(/\n/g, '<br>')}</article></main></body></html>`;
  writeIfMissing(path.join(weeklyDir, `${week}.html`), html);
  if (!fs.existsSync(path.join(weeklyDir, 'latest.html'))) fs.writeFileSync(path.join(weeklyDir, 'latest.html'), html);
  if (!fs.existsSync(path.join(weeklyDir, 'index.html'))) fs.writeFileSync(path.join(weeklyDir, 'index.html'), html);
}

function updateHome() {
  const indexPath = path.join(root, 'index.html');
  if (!fs.existsSync(indexPath)) return;
  const s = fs.readFileSync(indexPath, 'utf8');
  const start = s.indexOf('    const levelsOutputs = [');
  if (start === -1) return;
  const end = s.indexOf('    ];', start) + 6;
  const dates = fs.readdirSync(project).filter(name => /^\d{4}-\d{2}-\d{2}$/.test(name)).sort().reverse().slice(0, 6);
  const week = isoWeek(weeklyAnchorDate());
  const items = [
    `      {\n        date: '${today}',\n        title: 'AI时代组织与人才机制四课题日报',\n        status: '自动化已生成',\n        summary: '云端兜底生成，覆盖结论层、Context层、线索层和来源索引。',\n        href: './specials/ai-org-talent-mechanism/${today}/index.html'\n      },`,
    `      {\n        date: '${week}',\n        title: 'AI时代组织与人才机制四课题周报',\n        status: '周报已生成',\n        summary: '汇总最近 7 个日报目录，保证周报入口不断档。',\n        href: './specials/ai-org-talent-mechanism/weekly/latest.html'\n      },`,
    ...dates.filter(date => date !== today).map(date => `      {\n        date: '${date}',\n        title: 'AI时代组织与人才机制四课题日报',\n        status: '历史版本',\n        summary: '四专题日报历史归档。',\n        href: './specials/ai-org-talent-mechanism/${date}/index.html'\n      },`),
  ];
  const block = `    const levelsOutputs = [\n${items.join('\n')}\n    ];`;
  fs.writeFileSync(indexPath, s.slice(0, start) + block + s.slice(end));
}

ensureDaily();
ensureWeekly();
updateHome();
console.log(`Ensured AI org reports for ${today}`);
