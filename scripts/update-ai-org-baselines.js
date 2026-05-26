const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const project = path.join(root, 'specials', 'ai-org-talent-mechanism');
const baselineDir = path.join(project, 'baseline');
const knowledgeCatalog = path.join(root, 'knowledge', 'catalog.json');

const topics = [
  {
    slug: '01-flat-organization',
    title: '专题一：组织扁平化与中层减少',
    file: '01-flat-organization.md',
    keywords: ['扁平', '中层', 'manager', '实战型教练管理者（player-coach）', '小队', 'span', 'coordination', '层级', '组织'],
    stableJudgments: [
      '执行层组织变化不能只理解为“裁中层”，更准确的机制是把信息同步、进度追踪、流程协调等 协调性工作 系统化，再重新定义管理者为 实战型教练管理者（player-coach）、工作流负责人（workflow owner） 或治理 owner。',
      'AI 放大个人与小队产出后，管理跨度、决策权和交付边界需要一起重写；如果只压缩层级而不重写责任边界，会制造晋升、质量和人才发展风险。',
      '“减少管理层级”只有在配套内部等级、校准机制和人才发展责任时才是组织能力升级，否则很容易退化为成本削减叙事。',
    ],
    watchQuestions: [
      '企业是否披露了层级减少前后的基线、目标管理跨度、直接汇报人数和团队边界？',
      '管理者的人才发展、绩效校准和冲突处理职责是否被保留或升级？',
      'AI 智能体承接的是协调任务、分析任务还是决策任务？边界是否清楚？',
    ],
  },
  {
    slug: '02-talent-density',
    title: '专题二：高人才密度与复合型人才机制',
    file: '02-talent-density.md',
    keywords: ['高人才密度', '复合', '人才', 'skills', 'skill', '溢价', '薪酬', 'premium', 'human-agent', 'agency'],
    stableJudgments: [
      'AI 时代的高人才密度不只是“更强个体”，而是能把问题定义、智能体编排、质量治理、复用资产和跨团队推进合成一个闭环的人才密度。',
      'AI 技能溢价正在从招聘市场信号进入薪酬治理问题：企业需要区分稳定能力、短期技能热度、项目贡献和关键人才保留。',
      '复合型人才机制必须同时覆盖选拔、授权、评价、激励和复用资产沉淀；只把 AI 使用频率写进绩效会扭曲行为。',
    ],
    watchQuestions: [
      'AI 技能溢价（AI skill premium） 是进入 基本薪酬（base pay）、奖金（bonus）、长期激励（LTI），还是临时津贴/项目奖？是否有 退出条款（sunset clause）？',
      '复合型人才的证据包是否包含业务结果、AI workflow 设计、治理质量和复用资产？',
      '高人才密度是否伴随更强授权，还是只是更高负荷？',
    ],
  },
  {
    slug: '03-job-family-career-architecture',
    title: '专题三：岗位、族群、序列持续建设',
    file: '03-job-family-career-architecture.md',
    keywords: ['岗位', '族群', '序列', 'job', 'family', 'career', 'title', '职级', '带宽', '薪酬带宽（pay band）', 'builder'],
    stableJudgments: [
      '岗位体系的主线是“双向运动”：交付层岗位边界变宽、端到端责任增强；AI 基础设施、eval、安全治理、数据治理、agent engineering 等核心专家能力继续深化并溢价。',
      '不应把所有新能力都固化为 岗位族群（job family）。长期稳定、战略关键、可评价、可定价的能力才适合新建岗位/族群/序列；短期热词优先用技能标签、项目角色或专项激励承接。',
      '业务提出新增族群/序列时，必须先识别真实诉求：如果本质是关键人才定价和保留，应优先调整薪酬带宽、市场稀缺系数、项目激励或股权刷新，而不是制造 头衔膨胀（title inflation）。',
    ],
    watchQuestions: [
      '新增岗位是否有稳定外部市场、内部评价标准、晋升路径和薪酬基准？',
      '岗位头衔（title）合并后，内部层级（level）、薪酬带宽（pay band） 和晋升证据是否仍清晰？',
      '业务诉求到底是责任边界变化，还是薪酬/激励空间不足？',
    ],
  },
  {
    slug: '04-promotion-system',
    title: '专题四：未来组织的晋升机制',
    file: '04-promotion-system.md',
    keywords: ['晋升', 'promotion', '绩效', 'performance', '校准', 'calibration', '职级', 'evidence', 'review', '认证'],
    stableJudgments: [
      '晋升机制正在从“岗位任期 + 经理叙事”转向更可验证的贡献证据包：业务结果、工作流重设计（workflow redesign）、智能体治理（agent governance）、复用资产、跨团队影响和人才发展。',
      'AI 时代晋升不能奖励“用了多少 AI”，而应奖励“AI 让什么业务流程、质量控制、决策速度或组织能力变得可复用”。',
      '例外晋升、项目制晋升和技能认证可以提升敏捷性，但必须配套预算闸门、公平校准和证据审计，否则会放大资源争夺和信任风险。',
    ],
    watchQuestions: [
      '晋升材料是否允许 AI 辅助？是否有真实性、归因和审计规则？',
      '即时晋升/项目晋升与常规校准窗口如何衔接预算和公平？',
      '技能认证是晋升输入、薪酬输入，还是岗位准入条件？',
    ],
  },
];

function ensureDir(dir) { fs.mkdirSync(dir, { recursive: true }); }
function rel(file) { return path.relative(root, file); }
function read(file) { return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : ''; }
function clean(value) { return value.replace(/\s+/g, ' ').replace(/\|/g, '｜').trim(); }
function limit(value, max = 150) {
  const text = clean(value);
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}
function todayShanghai() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
}
function dailyDirs() {
  if (!fs.existsSync(project)) return [];
  return fs.readdirSync(project)
    .filter((name) => /^\d{4}-\d{2}-\d{2}$/.test(name))
    .sort();
}
function section(text, patterns) {
  const lines = text.split(/\r?\n/);
  const start = lines.findIndex((line) => patterns.some((pattern) => pattern.test(line)));
  if (start === -1) return [];
  const out = [];
  for (let i = start + 1; i < lines.length; i += 1) {
    const line = lines[i];
    if (/^#{2,4}\s+/.test(line)) break;
    if (/^\s*(-|\d+[.)])\s+/.test(line) || /^\s*>\s+/.test(line)) out.push(line.replace(/^\s*>\s*/, '').trim());
    if (out.length >= 4) break;
  }
  return out;
}
function collectTopicEntries(topic) {
  return dailyDirs().map((date) => {
    const file = path.join(project, date, topic.file);
    const text = read(file);
    if (!text) return null;
    if (/研究状态记录\s*\/\s*非决策稿|非决策稿|待正式重跑/.test(text)) return null;
    return {
      date,
      href: `../${date}/${topic.file.replace(/\.md$/, '.html')}`,
      source: rel(file),
      judgments: section(text, [/核心判断/, /今日核心判断/]),
      context: section(text, [/Context/, /背景材料/, /弱信号/, /反例/]),
      next: section(text, [/待验证/, /下一步/, /搜索路径/]),
    };
  }).filter(Boolean);
}
function evidenceLevel(text) {
  if (/官方|一手|SEC|press release|财报|招聘页|JD|薪酬区间/i.test(text)) return '结论层候选';
  if (/Reuters|Deloitte|McKinsey|BCG|Mercer|EY|Payscale|媒体|咨询/i.test(text)) return '背景材料（Context）强证据';
  return '线索层/待验证';
}
function collectKnowledge(topic) {
  if (!fs.existsSync(knowledgeCatalog)) return [];
  let catalog = [];
  try {
    const parsed = JSON.parse(read(knowledgeCatalog));
    catalog = Array.isArray(parsed) ? parsed : [
      ...(Array.isArray(parsed.knowledgeSources) ? parsed.knowledgeSources : []),
      ...(Array.isArray(parsed.reports) ? parsed.reports : []),
    ];
  } catch { return []; }
  return catalog
    .filter((item) => {
      const haystack = `${item.title || ''} ${item.description || ''} ${item.summaryFile || ''}`.toLowerCase();
      return topic.keywords.some((keyword) => haystack.includes(keyword.toLowerCase()));
    })
    .slice(0, 12)
    .map((item) => ({
      title: item.title || item.name || '未命名资料',
      href: item.htmlFile || item.summaryFile || item.url || '',
      note: limit(item.description || item.category || '知识库资料', 110),
    }));
}
function topicMarkdown(topic) {
  const entries = collectTopicEntries(topic);
  const knowledge = collectKnowledge(topic);
  const latest = entries.at(-1);
  const rows = entries.slice(-14).map((entry) => {
    const judgment = entry.judgments[0] ? limit(entry.judgments[0], 135) : '当日未抽取到核心判断，保留源文档待人工复核。';
    const context = entry.context[0] ? limit(entry.context[0], 120) : '暂无单独 Context 摘要。';
    const next = entry.next[0] ? limit(entry.next[0], 95) : '待下次日报/周报继续追踪。';
    return `| ${entry.date} | [日报](${entry.href}) | ${evidenceLevel(`${judgment} ${context}`)} | ${judgment} | ${context} | ${next} |`;
  }).join('\n');
  const knowledgeRows = knowledge.length ? knowledge.map((item) => `| [${clean(item.title)}](${item.href}) | ${item.note} |`).join('\n') : '| 暂无自动匹配知识卡片 | 等待 PDF/知识库入库后补充 |';
  return `# ${topic.title}｜滚动基线档案

> 更新日期：${todayShanghai()}
> 用途：这是四课题研究的“滚动母稿”，不是某一天的日报。日报负责记录新增事实、Context 和线索；周报负责做阶段复盘；基线档案负责沉淀稳定判断、证据账本和待验证问题。
> 自动化规则：每日/周报与 PDF 入库后自动回写证据账本；正式重跑遵循 research-protocol.md 的多代理并行与主代理交叉证伪机制；只有多源互证或一手材料足够强的内容，才进入稳定判断。

## 一句话基线判断

${topic.stableJudgments[0]}

## 稳定判断（高置信/可复用）

${topic.stableJudgments.map((item, index) => `${index + 1}. **${limit(item, 42)}**
   ${item}`).join('\n')}

## 证据账本（自动从日报/周报抽取）

| 日期 | 入口 | 证据层级 | 可沉淀判断 | Context/弱信号 | 待验证 |
|---|---|---|---|---|---|
${rows || '| 暂无日报证据 | - | - | - | - | - |'}

## 知识库与 PDF 证据关联

| 资料 | 对本专题的价值 |
|---|---|
${knowledgeRows}

## 当前不可越界的结论

- 不能把单个公司裁员、压层级或 title 合并直接外推为所有行业趋势；必须区分战略调整、成本控制、组织设计和薪酬治理。
- 不能把 背景材料（Context）材料硬升为结论；未找到一手材料、样本偏差明显或只有员工体感时，只进入线索池。
- 不能用新增岗位/族群/序列替代薪酬治理；若真实诉求是关键人才保留，应回到 薪酬带宽（pay band）、市场溢价（market premium）、项目奖金（project bonus）、长期激励（LTI） 或专项津贴。

## 后续追踪问题

${topic.watchQuestions.map((item) => `- ${item}`).join('\n')}

## 最近日报入口

${latest ? `- 最新日报：${latest.date}｜[打开专题日报](${latest.href})｜源文件：\`${latest.source}\`` : '- 暂无日报入口。'}
`;
}
function writeBaselineIndex() {
  const cards = topics.map((topic) => `
<article class="card">
  <h2>${topic.title}</h2>
  <p>${topic.stableJudgments[0]}</p>
  <a href="./${topic.slug}.html">查看基线档案</a>
</article>`).join('\n');
  const html = `<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>AI时代组织与人才机制四课题滚动基线</title><style>:root{--bg:#0f1117;--surface:#171a24;--border:#31374b;--text:#eef2fb;--text2:#b2bad0;--green:#34d399;--accent:#7c92ff}*{box-sizing:border-box}body{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC",sans-serif;background:linear-gradient(180deg,rgba(124,146,255,.09),transparent 320px),var(--bg);color:var(--text);line-height:1.75}main{max-width:1120px;margin:auto;padding:28px 24px 72px}.btn{display:inline-flex;padding:8px 14px;border:1px solid var(--border);border-radius:9px;color:var(--text);text-decoration:none;background:#171a24;font-weight:800}.hero,.card,.note{background:rgba(23,26,36,.94);border:1px solid var(--border);border-radius:18px;padding:24px;margin:14px 0}.hero{padding:30px}.badge{display:inline-flex;color:#07130f;background:var(--green);border-radius:999px;padding:4px 10px;font-size:12px;font-weight:900}h1{font-size:clamp(30px,4vw,48px);line-height:1.12;margin:14px 0}p{color:var(--text2)}.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.card h2{margin-top:0}.card a{display:inline-flex;margin-top:10px;color:white;background:var(--accent);border-radius:9px;padding:8px 12px;text-decoration:none;font-weight:900}.note strong{color:var(--text)}@media(max-width:820px){main{padding:18px 12px 48px}.grid{grid-template-columns:1fr}}</style></head><body><main><a class="btn" href="../../../index.html">返回 OD 情报中心</a><section class="hero"><span class="badge">滚动基线 · 自动回写</span><h1>AI时代组织与人才机制四课题滚动基线</h1><p>基线档案是研究母稿：沉淀稳定判断、证据账本、Context 与待验证问题。日报负责当天新增，周报负责阶段复盘，基线负责把多天积累的证据变成可复用判断。</p><p><a class="btn" href="../research-protocol.html">查看多代理研究协议</a></p></section><section class="grid">${cards}</section><section class="note"><h2>维护原则</h2><p><strong>结论层</strong>只接收一手材料或多源互证；<strong>背景材料（Context）</strong>保留背景、反例、冲突和弱信号；<strong>线索层</strong>保留单点素材和下一步追踪问题。自动化每天更新证据账本，但不把弱信号硬凑成结论。</p></section></main></body></html>`;
  fs.writeFileSync(path.join(baselineDir, 'index.html'), html);
  const md = `# AI时代组织与人才机制四课题滚动基线

> 基线档案是研究母稿：沉淀稳定判断、证据账本、Context 与待验证问题。日报负责当天新增，周报负责阶段复盘，基线负责把多天积累的证据变成可复用判断。

${topics.map((topic) => `- [${topic.title}](./${topic.slug}.html)：${topic.stableJudgments[0]}`).join('\n')}

## 维护原则

- 结论层只接收一手材料或多源互证。
- 背景材料（Context）保留背景、反例、冲突和弱信号。
- 线索层保留单点素材和下一步追踪问题。
- 自动化每天更新证据账本，但不把弱信号硬凑成结论。
- 正式重跑采用多代理并行：四课题专题代理 + 四渠道证据代理 + 主代理交叉证伪。
`;
  fs.writeFileSync(path.join(baselineDir, 'index.md'), md);
}

ensureDir(baselineDir);
for (const topic of topics) {
  const file = path.join(baselineDir, `${topic.slug}.md`);
  fs.writeFileSync(file, topicMarkdown(topic));
  execFileSync('node', ['scripts/render-markdown-page.js', rel(file)], { cwd: root, stdio: 'inherit' });
}
writeBaselineIndex();
console.log(`Updated AI org rolling baselines in ${rel(baselineDir)}`);
