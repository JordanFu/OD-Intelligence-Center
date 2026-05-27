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
  ['IBM Think 2026 recap', 'https://www.ibm.com/think/news/think-2026-ai-recap', '智能体式 AI（agentic AI）规模化、Bob 工具、治理与生产率'],
  ['Microsoft Work Trend Index 2026', 'https://www.microsoft.com/en-us/worklab/work-trend-index/agents-human-agency-and-the-opportunity-for-every-organization', '人机协同能动性（human-agent agency）、运营模式重设计（operating model redesign）'],
  ['Deloitte：人机协同 AI 运营模式', 'https://www.deloitte.com/us/en/insights/topics/talent/operating-models-for-humans-ai-agents.html', '84% 的公司尚未围绕 AI 重新设计岗位；智能体运营模式'],
  ['McKinsey：AI 优先技术人才体系', 'https://www.mckinsey.com/capabilities/mckinsey-technology/our-insights/designing-an-end-to-end-technology-workforce-for-the-ai-first-era', 'AI 优先技术人才、深度专家、产品/平台模式'],
  ['Mercer Global Talent Trends 2026', 'https://www.mercer.com/about/newsroom/mercer-s-global-talent-trends-2026-report/', '工作重设计、技能作为价值货币、人机协作'],
  ['EY Future of Pay 2026', 'https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/newsroom/2026/02/ey-future-of-pay-report-2026.pdf', 'AI 技能溢价（AI skill premium）、基于技能的薪酬（skills-based pay）、退出条款（sunset clauses）'],
  ['Payscale 2026 薪酬最佳实践报告', 'https://www.payscale.com/press-releases/2026-compensation-best-practices-report', 'AI 技能薪酬、薪酬公平'],
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
  const common = `> 研究状态记录 / 非决策稿：本文件只用于记录“自动化已触发但尚未完成正式研究”的状态，不能作为 CEO 决策稿。正式日报必须由四课题代理、四渠道代理和主代理交叉证伪后重跑；若未完成，不用通用判断冒充结论。\n\n## 今日一句话结论\n\n今日暂不形成正式结论：当前仅完成兜底记录，缺少当日新增一手事实、反例、薪酬/JD 信号和多源互证，不满足 CEO 决策质量门槛。\n\n## 今日核心判断\n\n1. **不升级为结论。可信度：低。** 现有来源池只能说明这些方向值得追踪，不能证明今日发生了新的岗位、职级、薪酬或组织改革事实。\n2. **必须补齐上下文后再判断。可信度：高。** 正式研究需要还原主体、时间线、改革动作、员工影响、薪酬/激励承接和争议信息，否则只是信息堆叠。\n3. **宁可标注缺口，也不输出空泛总结。可信度：高。** 兜底自动化的价值是提醒缺口与触发重跑，不是生成看似完整但不可追溯的报告。\n\n## 今日背景材料（Context）\n\n- 来源池中 IBM、Microsoft、Deloitte、McKinsey、Mercer、EY、Payscale 等材料仍可作为后续研究入口，但今日未完成逐条复核，暂不形成结论。\n- 继续关注 岗位与工作流重设计（job/workflow redesign）、智能体治理（agent governance）、基于技能的薪酬（skills-based pay） 和 薪酬带宽（pay band） 等方向，但必须用当日新证据验证。\n- 当前最重要的缺口不是“缺文字”，而是缺新增事实、证据解释、反例、落地细节和可追溯来源之间的逻辑链。\n\n## 今日新增证据地图\n\n| 渠道 | 当前状态 | 必须补齐 |\n|---|---|---|\n| 官方/一手 | 待检索 | 公司公告、IR/SEC、官方博客、制度手册、招聘页原文 |\n| 权威媒体与案例 | 待检索 | Reuters/FT/WSJ/咨询报告中的事实、时间线、争议 |\n| 社媒/职场平台 | 待检索 | 只收线索，不当结论；记录关键词和待验证方向 |\n| 招聘 JD 与薪酬 | 待检索 | title、职责、薪资区间、level、地区、IC/Manager 边界 |\n\n## 线索层\n\n- 追踪 FDE、AI 工作流负责人、智能体运营（agent ops）、AI 治理（AI governance）、基于技能的薪酬（skills-based pay）等头衔是否形成稳定 岗位族群（job family）。\n- 追踪中国公司是否用技能标签、稀缺系数、项目激励替代新增岗位序列。\n- 追踪“执行层角色变宽”与“核心专家能力深化”是否同时出现，而不是只看单向趋势。\n`;
  if (kind === 'flat') return md('专题一：组织扁平化与中层减少', `${common}\n## 待补齐的落地问题\n\n正式重跑必须回答：哪些管理工作被系统化、哪些仍需管理者承担、管理跨度是否变化、员工体验和晋升路径是否受影响、是否只是成本控制而非组织升级。`);
  if (kind === 'talent') return md('专题二：高人才密度与复合型人才机制', `${common}\n## 待补齐的落地问题\n\n正式重跑必须回答：复合型人才的能力证据是什么、是否有招聘/JD/薪酬信号、是否存在验证和治理能力的溢价、组织如何避免把“少招人”包装成高人才密度。`);
  if (kind === 'job') return md('专题三：岗位、族群、序列持续建设', `${common}\n## 待补齐的落地问题\n\n正式重跑必须回答：是新建岗位族群、保留技能标签，还是调整薪酬带宽和项目激励；必须同时验证岗位合并与专家岗位深化。`);
  if (kind === 'promotion') return md('专题四：未来组织的晋升机制', `${common}\n## 待补齐的落地问题\n\n正式重跑必须回答：AI 贡献如何进入晋升证据包、谁负责验证与质量、是否有校准机制、是否存在调岗降薪和劳动合规风险。`);
  return md('AI时代组织与人才机制四课题总览', `${common}\n## 待补齐的落地问题\n\n正式重跑必须把证据转化为战略、岗位、职级、薪酬和激励机制建议；没有证据链时，只记录缺口，不输出管理建议。\n\n## 待验证清单与下一步计划\n\n1. 检索今日新增官方/一手材料，确认是否有新公司案例。\n2. 检索权威媒体与咨询报告，补齐改革时间线、员工影响和争议。\n3. 检索招聘 JD 与薪酬信号，验证岗位变宽、专家深化和技能溢价。\n4. 收集社媒/职场平台弱信号，只进入线索池，不进入结论层。\n5. 主代理交叉验证后，将可互证内容升级为正式日报。`);
}

function writeIndex(dir) {
  const date = path.basename(dir);
  writeIfMissing(path.join(dir, 'index.html'), `<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${date} AI时代组织与人才机制研究状态记录</title><style>body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC",sans-serif;background:#0f1117;color:#eef2fb;line-height:1.75;margin:0}main{max-width:1080px;margin:auto;padding:28px 24px}.hero,.card{background:#171a24;border:1px solid #31374b;border-radius:16px;padding:22px;margin:12px 0}.hero{border-color:#f59e0b}.badge{display:inline-block;background:#78350f;color:#fde68a;border:1px solid #f59e0b;border-radius:999px;padding:4px 10px;font-weight:800}.grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}.card a,.btn{display:inline-block;color:white;background:#7c92ff;text-decoration:none;border-radius:8px;padding:8px 12px;font-weight:700}.btn{background:#202434;border:1px solid #31374b}@media(max-width:900px){.grid{grid-template-columns:1fr}}</style></head><body><main><a class="btn" href="../../../index.html">返回 OD 情报中心</a><section class="hero"><span class="badge">非决策稿｜待正式重跑</span><h1>${date} AI时代组织与人才机制研究状态记录</h1><p>本页只说明自动化已触发但尚未完成正式多代理研究。缺少当日新增一手事实、反例、薪酬/JD 信号和主代理交叉验证时，不再用兜底内容冒充日报。</p><a class="card a" href="./00-overview.html">查看缺口与重跑清单</a></section><section class="grid"><article class="card"><h2>组织扁平化</h2><p>待补齐管理层级、管理跨度、员工影响与反例。</p><a href="./01-flat-organization.html">查看缺口</a></article><article class="card"><h2>高人才密度</h2><p>待补齐复合能力证据、招聘/JD/薪酬信号。</p><a href="./02-talent-density.html">查看缺口</a></article><article class="card"><h2>岗位族群序列</h2><p>待补齐岗位合并、专家深化与薪酬承接证据。</p><a href="./03-job-family-career-architecture.html">查看缺口</a></article><article class="card"><h2>未来晋升机制</h2><p>待补齐晋升证据包、校准与合规风险。</p><a href="./04-promotion-system.html">查看缺口</a></article></section></main></body></html>`);
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
  const quick = `# ${week}｜AI时代组织与人才机制周报状态记录\n\n> 非决策稿：这是云端兜底状态记录，只保证入口不断档，不替代正式周报。若本周缺少多源互证、案例事实、反例、薪酬/JD 信号和主代理交叉验证，不输出快速导读式结论。\n\n## 本周一句话结论\n\n本周暂不形成正式结论：当前文件只记录资料入口和待补齐问题，不能作为 CEO 决策周报。\n\n## 本周核心判断\n\n1. **不升级为结论。可信度：低。** 来源池和历史日报只能提供追踪方向，不能替代本周新增事实与互证。\n2. **周报必须先有信息密度再做导读。可信度：高。** 快速导读版只能压缩高质量信息，不能把低质量信息包装得更像结论。\n3. **详细版应成为证据仓，而不是流水账。可信度：高。** 每条材料必须说明它支持什么、反驳什么、提示什么风险。\n\n## 对我们的启发\n\n- 证据不足时明确写“暂不形成结论”，不硬凑完整周报。\n- 正式周报必须先完成详细资料版，再抽取快速导读版。\n- 周报入口可以不断档，但不能让兜底稿占用正式报告心智。\n\n## 来源索引\n\n${sourceList()}\n`;
  const detailed = `# ${week}｜AI时代组织与人才机制详细资料状态记录\n\n> 非决策稿：整理当周日报入口、来源池和待验证问题。它是资料聚合底稿，不是最终决策结论；主代理重跑后应按多代理研究协议补充 Context、案例、反例、社媒/招聘薪酬信号和交叉验证。\n\n## 本周日报索引\n\n| 日期 | 链接 | 状态 |\n|---|---|---|\n${rows}\n\n## 本周信息聚合框架\n\n### 结论层候选\n\n- AI 运营模式（operating model）、岗位与工作流重设计（job/workflow redesign）、基于技能的薪酬（skills-based pay） 和 晋升证据 是否形成多源互证。\n- 执行层角色变宽与核心专家能力变深是否同时成立。\n- 业务提出岗位/序列变化是否实为薪酬、激励和市场溢价承接问题。\n\n### 背景材料（Context）候选\n\n- 公司制度片段、员工体感、行业讨论、招聘 JD 和薪酬信号，只要未充分互证就保留在 Context。\n- 国内外案例不能直接互推，必须标注地区、业务类型、岗位层级和公司阶段。\n\n### 线索层候选\n\n- FDE、AI 工作流负责人、智能体运营（agent ops）、AI 治理（AI governance）、基于技能的薪酬（skills-based pay）、技能津贴（skill allowance）、市场溢价（market premium） 等关键词。\n- 中层减少与 player-coach 角色变化的真实落地细节。\n\n## 本周待增强\n\n- 由主代理补充每天的新增一手证据与 Context/线索层。\n- 对 AI 技能溢价（AI skill premium）、管理者角色重写、智能体治理（agent governance） 岗位族群（job family） 做交叉验证。\n- 补充中国公司案例、招聘薪酬信号和员工影响。\n\n## 来源索引\n\n${sourceList()}\n`;
  writeIfMissing(path.join(weeklyDir, `${week}-quick.md`), quick);
  writeIfMissing(path.join(weeklyDir, `${week}-detailed.md`), detailed);
  writeIfMissing(path.join(weeklyDir, `${week}.md`), quick);
  if (!fs.existsSync(path.join(weeklyDir, 'latest-quick.md'))) fs.writeFileSync(path.join(weeklyDir, 'latest-quick.md'), quick);
  if (!fs.existsSync(path.join(weeklyDir, 'latest-detailed.md'))) fs.writeFileSync(path.join(weeklyDir, 'latest-detailed.md'), detailed);
  if (!fs.existsSync(path.join(weeklyDir, 'latest.md'))) fs.writeFileSync(path.join(weeklyDir, 'latest.md'), quick);
  for (const file of [`${week}-quick.md`, `${week}-detailed.md`, `${week}.md`, 'latest-quick.md', 'latest-detailed.md', 'latest.md']) {
    execFileSync('node', ['scripts/render-markdown-page.js', `specials/ai-org-talent-mechanism/weekly/${file}`], { cwd: root, stdio: 'inherit' });
  }
  if (!fs.existsSync(path.join(weeklyDir, 'latest.html'))) fs.copyFileSync(path.join(weeklyDir, 'latest-quick.html'), path.join(weeklyDir, 'latest.html'));
  if (!fs.existsSync(path.join(weeklyDir, 'index.html'))) fs.writeFileSync(path.join(weeklyDir, 'index.html'), `<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>AI组织人才机制周报</title><style>body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC",sans-serif;background:#0f1117;color:#eef2fb;line-height:1.75;margin:0}main{max-width:900px;margin:auto;padding:28px 24px}.card{background:#171a24;border:1px solid #31374b;border-radius:16px;padding:22px;margin:14px 0}a{color:#34d399;font-weight:800}</style></head><body><main><h1>AI时代组织与人才机制周报</h1><div class="card"><h2>快速导读版</h2><p>只呈现结论、重要事实和启发。</p><a href="./latest-quick.html">阅读最新快速导读版</a></div><div class="card"><h2>详细资料版</h2><p>聚合当周所有有价值信息、Context 和线索。</p><a href="./latest-detailed.html">阅读最新详细资料版</a></div></main></body></html>`);
}

function updateHome() {
  const indexPath = path.join(root, 'index.html');
  if (!fs.existsSync(indexPath)) return;
  const s = fs.readFileSync(indexPath, 'utf8');
  function replaceConstArray(source, name, block) {
    const start = source.indexOf(`    const ${name} = [`);
    if (start === -1) return source;
    const end = source.indexOf('    ];', start) + 6;
    return source.slice(0, start) + block + source.slice(end);
  }
  const dates = fs.readdirSync(project).filter(name => /^\d{4}-\d{2}-\d{2}$/.test(name)).sort().reverse();
  const week = isoWeek(weeklyAnchorDate());
  function isNonDecisionDate(date) {
    const overview = path.join(project, date, '00-overview.md');
    if (!fs.existsSync(overview)) return true;
    const text = fs.readFileSync(overview, 'utf8');
    return /^# .*研究状态记录/m.test(text) || /^>\s*研究状态记录\s*\/\s*非决策稿/m.test(text) || /待正式重跑\s*\/\s*非决策稿/.test(text);
  }
  function weeklyStatus(file, fallbackTitle, fallbackSummary) {
    const reportPath = path.join(weeklyDir, file);
    if (!fs.existsSync(reportPath)) {
      return {
        title: fallbackTitle,
        status: '待正式重跑 / 非决策稿',
        summary: fallbackSummary,
      };
    }
    const text = fs.readFileSync(reportPath, 'utf8');
    const nonDecision = /非决策稿|周报状态记录|待正式重跑/.test(text);
    if (nonDecision) {
      return {
        title: fallbackTitle,
        status: '待正式重跑 / 非决策稿',
        summary: fallbackSummary,
      };
    }
    return {
      title: file.includes('detailed') ? '详细资料版周报' : '快速导读版周报',
      status: '已重跑 / 决策稿',
      summary: file.includes('detailed')
        ? '聚合当周高价值信息、Context、线索与落地方法论，已完成正式重跑。'
        : '只呈现本周结论、关键事实和对我们的启发，已完成正式重跑。',
    };
  }
  const dailyItems = dates.map(date => {
    const nonDecision = isNonDecisionDate(date);
    return `      {\n        date: '${date}',\n        title: 'AI时代组织与人才机制四课题日报',\n        status: '${nonDecision ? '待正式重跑 / 非决策稿' : (date === today ? '已修正 / 决策稿' : '历史版本')}',\n        summary: '${nonDecision ? '仅记录自动化触发与研究缺口；缺少新增事实、反例、薪酬/JD 信号和交叉验证时，不作为正式日报。' : '四专题日报归档，包含总览和四份专题报告。'}',\n        href: './specials/ai-org-talent-mechanism/${date}/index.html'\n      },`;
  });
  const quickStatus = weeklyStatus(`${week}-quick.md`, '周报状态记录', '仅记录本周入口和研究缺口；没有信息密度时不输出快速导读式结论。');
  const detailedStatus = weeklyStatus(`${week}-detailed.md`, '详细资料状态记录', '仅整理当周日报入口、Context 候选和待验证线索；正式资料版需主代理重跑。');
  const weeklyItems = [
    `      {\n        date: '${week}',\n        title: '${quickStatus.title}',\n        status: '${quickStatus.status}',\n        summary: '${quickStatus.summary}',\n        href: './specials/ai-org-talent-mechanism/weekly/${week}-quick.html',\n        markdown: './specials/ai-org-talent-mechanism/weekly/${week}-quick.md'\n      },`,
    `      {\n        date: '${week}',\n        title: '${detailedStatus.title}',\n        status: '${detailedStatus.status}',\n        summary: '${detailedStatus.summary}',\n        href: './specials/ai-org-talent-mechanism/weekly/${week}-detailed.html',\n        markdown: './specials/ai-org-talent-mechanism/weekly/${week}-detailed.md'\n      },`,
  ];
  let next = replaceConstArray(s, 'levelsDailyOutputs', `    const levelsDailyOutputs = [\n${dailyItems.join('\n')}\n    ];`);
  next = replaceConstArray(next, 'levelsWeeklyOutputs', `    const levelsWeeklyOutputs = [\n${weeklyItems.join('\n')}\n    ];`);
  fs.writeFileSync(indexPath, next);
}

ensureDaily();
ensureWeekly();
updateHome();
execFileSync('node', ['scripts/update-ai-org-baselines.js'], { cwd: root, stdio: 'inherit' });
execFileSync('node', ['scripts/enhance-report-sharing.js'], { cwd: root, stdio: 'inherit' });
console.log(`Ensured AI org reports for ${today}`);
