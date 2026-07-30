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

const extraScanRoots = (process.env.EXTRA_PDF_SCAN_DIRS || '')
  .split(path.delimiter)
  .map((dir) => dir.trim())
  .filter(Boolean)
  .map((dir) => path.resolve(dir))
  .filter((dir) => fs.existsSync(dir));

scanRoots.push(...extraScanRoots);

const knownTitles = new Map([
  ['https://media-publications.bcg.com/AI-First-Organization.pdf', 'BCG：AI-First Organization'],
  ["https://reports.weforum.org/docs/WEF_Organizational_Transformation_in_the_Age_of_AI_How_Organizations_Maximize_AI's_Potential_2026.pdf", 'WEF：Organizational Transformation in the Age of AI'],
  ['https://www.aihr.com/resources/AIHR_HR_Priorities_2026_Report.pdf', 'AIHR：HR Priorities 2026 Report'],
  ['https://resources.anthropic.com/hubfs/2026%20Agentic%20Coding%20Trends%20Report.pdf', 'Anthropic：2026 Agentic Coding Trends Report'],
  ['https://ir.gitlab.com/sec-filings/all-sec-filings/content/0001628280-26-023407/0001628280-26-023407.pdf', 'GitLab：2026 SEC 8-K Filing'],
  ['https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/newsroom/2026/02/ey-future-of-pay-report-2026.pdf', 'EY：Future of Pay Report 2026'],
  ['https://www.mckinsey.com/~/media/mckinsey/business%20functions/people%20and%20organizational%20performance/our%20insights/the%20state%20of%20organizations/2026/the-state-of-organizations-2026.pdf', 'McKinsey：The State of Organizations 2026'],
  ['https://web-assets.bcg.com/73/8e/cc44cbc14a3b81695f8a3de28ff1/ai-radar-2026-web-jan-2026-edit.pdf', 'BCG：AI Radar 2026'],
  ['https://web-assets.bcg.com/dc/c5/1bcbfdc0405c85fb14972a57c20a/the-emerging-agentic-enterprise-how-leaders-must-navigate-a-new-age-of-ai.pdf', 'BCG + MIT Sloan：The Emerging Agentic Enterprise'],
  ['https://www.payscale.com/content/report/2026-compensation-best-practice-report.pdf', 'Payscale：2026 Compensation Best Practices Report'],
  ['https://www.hkexnews.hk/listedco/listconews/sehk/2026/0623/2026062301078_c.pdf', 'MiniMax：IPO 后股份激励计划授出奖励公告'],
  ['https://www.oecd.org/content/dam/oecd/en/publications/reports/2026/07/competition-in-the-age-of-ai_e9f49e20/6f88a1ea-en.pdf', 'OECD：Competition in the Age of AI'],
]);

const reportProfiles = new Map([
  ['https://media-publications.bcg.com/AI-First-Organization.pdf', {
    summary: 'BCG 把 AI-First 组织定义为从“工具辅助”走向“AI 默认执行、人类编排监督”的经营模式重构。',
    focus: 'AI 默认执行、端到端流程重构、人机编排',
    relevanceLabel: '强相关：组织与岗位重构',
    evidenceLevel: '结论层可用，但关键案例和数字需在引用时回到原文复核。',
    core: [
      '核心不是给每个岗位加 AI 工具，而是把业务流程重新设计为 AI/Agent 可承担执行、监控和分流的端到端工作流。',
      '人的角色从重复执行转向目标设定、例外判断、质量监督和跨职能协调，直接支撑“执行层角色更宽、更端到端”的假设。',
      '报告强调从职能烟囱转向端到端流程，同时指出数据、治理、监管和技能迁移是落地瓶颈。',
    ],
    attention: [
      '不要把“AI-First”理解成简单减员；对 OD 更重要的是重新划分人、Agent、流程 owner 和治理责任。',
      '适合提炼“何时合并岗位/何时保留专家能力”的判断框架：流程执行可合并，模型、治理、数据等能力仍需深专家。',
      '可作为 CEO 汇报中解释“小团队化、产品工程一体化、manager/IC player-coach”的战略背景材料。',
    ],
    relevance: [
      ['岗位族群/角色合并', '高', '用于支撑从窄岗位转向端到端流程角色的趋势判断。'],
      ['管理层级/组织跨度', '中', '提示管理者职责从派活转向编排 AI 与人类团队。'],
      ['薪酬与激励', '中', '可引出对 AI fluency、流程 owner、治理角色的激励资源再分配。'],
    ],
    useInResearch: [
      '放入日报/周报“结论层”时，应与 WEF、AIHR、Anthropic 等来源互证。',
      '单独引用案例时要标注咨询报告属性，避免把个案当作全行业事实。',
    ],
  }],
  ["https://reports.weforum.org/docs/WEF_Organizational_Transformation_in_the_Age_of_AI_How_Organizations_Maximize_AI's_Potential_2026.pdf", {
    summary: 'WEF/Accenture 把 AI 转型的重点放在 workflow、运营模式（operating model）、decision rights 的系统性重构。',
    focus: '工作流重构、决策权、AI 参与执行',
    relevanceLabel: '强相关：战略到组织机制',
    evidenceLevel: '结论层可用，适合作为跨行业高层叙事和治理框架证据。',
    core: [
      '报告强调 AI 价值来自嵌入核心工作流和运营模型，而不是孤立 use case。',
      'AI 从支持分析走向参与执行后，组织需要同步重构治理、领导力、技能、信任和问责边界。',
      '它支持“更少、更宽、更端到端的人类团队 + Agent 执行层”的方向，但同时保留人类判断、责任和监督。',
    ],
    attention: [
      '这份报告最适合做“为什么岗位体系改革不能只新增 岗位族群（job family）”的战略依据。',
      '关注 decision rights：AI 进入执行后，岗位说明、绩效口径和授权边界必须一起改。',
      '可继续追踪报告中的企业案例，拆解原体系、新体系、套改和员工影响。',
    ],
    relevance: [
      ['战略-组织能力', '高', '解释 AI 时代组织改革为什么要从流程和权责入手。'],
      ['岗位/职级体系', '高', '提示岗位设计应围绕工作流 owner、监督者和专家节点重构。'],
      ['风险治理', '高', '提供反例侧证：AI 安全、数据治理、监督问责会继续专业化。'],
    ],
    useInResearch: [
      '优先放在“背景材料（Context）/结论层桥接”：用来解释趋势，不单独证明某公司已完成改革。',
      '后续精读应抽取具体企业案例和可量化组织变化。',
    ],
  }],
  ['https://www.aihr.com/resources/AIHR_HR_Priorities_2026_Report.pdf', {
    summary: 'AIHR 把 2026 HR 重点归纳为共领导 AI 转型、把 AI 产能收益再投资增长、从 headcount 转向 skill count。',
    focus: '技能本位组织、HR 重构、skill count',
    relevanceLabel: '强相关：岗位与技能体系',
    evidenceLevel: '结论层可用，尤其适合支撑“岗位结构滞后于技能变化”的判断。',
    core: [
      '企业部署 AI 的速度快于工作方式重建，价值差异来自 workflow redesign 而非工具数量。',
      '报告主张从 job-based structures 转向 skills-driven ecosystems，把绩效、奖励和治理与技能连接。',
      'HR 自身也要从职能交付转向跨职能结果，形成 AI fluency、技能治理和人才 pod 能力。',
    ],
    attention: [
      '这是“不要靠无限新增岗位族群解决激励问题”的关键材料：技能标签、技能治理和回报机制可替代部分新序列。',
      '关注 headcount 到 skill count 的语言，可用于设计岗位-技能-薪酬三层解耦方案。',
      '可补充中国企业落地时“以岗定薪 vs 以技能定价”的冲突讨论。',
    ],
    relevance: [
      ['岗位族群', '高', '提示岗位不必无限拆分，可用技能标签承载差异。'],
      ['薪酬激励', '高', '支撑技能溢价、专项津贴、项目激励与薪酬带宽的机制设计。'],
      ['HR 组织能力', '高', '说明 HR 自身也需从流程服务转向跨职能变革伙伴。'],
    ],
    useInResearch: [
      '可进入“落地启发”部分，形成“岗位/技能/薪酬/激励分层设计”方法论。',
      '引用数据时需标明样本和调研口径，避免泛化。',
    ],
  }],
  ['https://resources.anthropic.com/hubfs/2026%20Agentic%20Coding%20Trends%20Report.pdf', {
    summary: 'Anthropic 从软件开发场景说明 Agentic coding 正在把工程师角色推向任务编排、质量判断和系统设计。',
    focus: 'Agentic coding、工程师角色重塑、人机协作',
    relevanceLabel: '强相关：产品工程一体化',
    evidenceLevel: 'Context 到结论层之间；对工程岗位变化强，对全行业岗位改革需交叉验证。',
    core: [
      'AI Agent 已覆盖测试、调试、文档、代码导航和实现工作流，个人/小团队产出边界被放大。',
      '工程师角色从逐行生产转向编排 Agent、评估输出、设定方向和确保系统解决正确问题。',
      '报告同时强调安全、质量和监督机制，提示执行层合并不等于专家能力消失。',
    ],
    attention: [
      '可作为“产品工程一体化、全栈化、小团队化”的强场景证据。',
      '需要避免外推过度：软件工程是 AI 改造最前沿领域，不代表所有岗位同步发生同等变化。',
      '重点追踪企业是否把 JD/title 从单一语言/框架岗位改为更宽的 product engineer / AI engineer。',
    ],
    relevance: [
      ['执行层角色合并', '高', '说明 AI 让单人覆盖更多开发生命周期环节。'],
      ['核心专家深化', '高', '安全、评测、架构和治理仍需专业化，是反例证据。'],
      ['绩效与激励', '中', '提示产出衡量从工时/代码量转向质量、系统影响和 Agent 编排能力。'],
    ],
    useInResearch: [
      '适合放在“海外公司/技术组织”案例池，与招聘 JD 和薪酬信号一起验证。',
      '后续应抽取可转化为岗位说明书的能力项。',
    ],
  }],
  ['https://ir.gitlab.com/sec-filings/all-sec-filings/content/0001628280-26-023407/0001628280-26-023407.pdf', {
    summary: 'GitLab SEC 8-K 是官方披露来源，可作为核验组织调整、AI 智能体优先（AI-agent-first） 运营模式（operating model） 相关说法的原始锚点。',
    focus: '官方披露、组织压缩、AI 智能体优先（AI-agent-first） 待核验',
    relevanceLabel: '中高相关：公司案例核验',
    evidenceLevel: '线索层优先；当前下载失败，不能仅凭日报上下文进入结论层。',
    core: [
      '该来源的价值在于官方披露属性，可用于核验媒体或社媒中关于 GitLab 组织调整的说法。',
      '当前本地仅保留 URL 与日报引用上下文，原文下载待重试，因此不能扩展解读。',
      '若原文确认组织压缩、小团队和 AI 智能体优先（AI-agent-first） 表述，可升级为海外公司案例。',
    ],
    attention: [
      '优先解决下载/访问，拿到原文后核对是否真的涉及岗位、层级、薪酬或激励变化。',
      'SEC 文件通常披露事实有限，不能期待它完整解释 OD 方案。',
      '适合做“官方锚点”，不适合单独做趋势结论。',
    ],
    relevance: [
      ['官方/一手材料', '高', '用于校验 GitLab 案例事实。'],
      ['组织压缩', '中', '若原文匹配上下文，可支撑小团队化和层级收敛。'],
      ['薪酬激励', '低', '需确认是否披露相关细节。'],
    ],
    useInResearch: [
      '保持在线索池，直到原文成功下载并完成逐页核验。',
      '每日自动化可持续重试下载，或用 SEC 页面替代 PDF 入口。',
    ],
  }],
  ['https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/newsroom/2026/02/ey-future-of-pay-report-2026.pdf', {
    summary: 'EY 把未来薪酬改革连接到技能、绩效、AI 人才、生产率和治理，适合支撑“岗位改革背后是激励资源再配置”。',
    focus: '技能薪酬、生产率锚点、AI 人才溢价',
    relevanceLabel: '强相关：薪酬与激励机制',
    evidenceLevel: '结论层可用，但具体薪酬数字需按地区/样本复核。',
    core: [
      '报告指出传统薪酬和总奖酬方式不足以应对 AI 技能、混合人机工作和高绩效预期。',
      '薪酬锚点从 headcount/年资进一步转向生产率、技能、业务影响和 AI 采用效果。',
      '变量薪酬、长期激励、福利和治理被放到同一套 future-ready rewards 体系中讨论。',
    ],
    attention: [
      '这是验证第三个假设的关键来源：岗位/族群变革常常是为稀缺人才和关键贡献争取激励空间。',
      '可用于设计“不要新增序列也能给钱”的工具箱：带宽、稀缺系数、项目激励、技能津贴、长期激励（LTI）。',
      '注意地区差异：EY India 报告不能直接等同全球薪酬实践。',
    ],
    relevance: [
      ['薪酬架构', '高', '支撑带宽调整、技能溢价、变量薪酬和长期激励设计。'],
      ['岗位架构', '中', '说明岗位架构应与薪酬架构适度解耦。'],
      ['绩效管理', '高', '提示绩效口径要从活动转向产出、采用和业务影响。'],
    ],
    useInResearch: [
      '适合放在周报“对本课题的落地启发”中，形成激励工具箱。',
      '后续要补充薪酬数据库/JD 薪资区间来验证 AI 技能溢价。',
    ],
  }],
  ['https://web-assets.bcg.com/73/8e/cc44cbc14a3b81695f8a3de28ff1/ai-radar-2026-web-jan-2026-edit.pdf', {
    summary: 'BCG AI Radar 2026 预计可用于观察 AI 投资、价值兑现和组织阻碍，但当前原文下载失败，需要重试后再精读。',
    focus: 'AI 投资、价值兑现、组织阻碍待核验',
    relevanceLabel: '中相关：战略背景',
    evidenceLevel: '线索层优先；当前不能作为结论层证据。',
    core: [
      '该报告可能提供 CEO/企业层面对 AI 采用、预算和价值兑现的年度脉冲。',
      '当前只保留日报/周报引用上下文和 URL，原文下载失败，不能提炼硬结论。',
      '若后续下载成功，可用于解释为什么企业推动岗位与激励改革。',
    ],
    attention: [
      '先解决原文获取，再确认是否包含组织、人才、技能或激励相关数据。',
      '如果只讲 AI 投资和采用，则作为战略背景；如果有 workforce/运营模式（operating model） 数据，可升级。',
      '与 BCG AI-First Organization 分工：Radar 看宏观采用，AI-First 看组织设计。',
    ],
    relevance: [
      ['战略背景', '中', '用于解释企业为什么加速 AI 组织改革。'],
      ['组织机制', '待验证', '需原文确认是否有工作流/人才/治理内容。'],
      ['薪酬激励', '待验证', '需原文确认是否涉及人才稀缺和投资配置。'],
    ],
    useInResearch: [
      '暂放线索层，不在 CEO 结论页中单独使用。',
      '自动化继续重试下载，成功后再结构化升级。',
    ],
  }],
  ['https://web-assets.bcg.com/dc/c5/1bcbfdc0405c85fb14972a57c20a/the-emerging-agentic-enterprise-how-leaders-must-navigate-a-new-age-of-ai.pdf', {
    summary: 'BCG + MIT Sloan 把 agentic enterprise 作为组织结构变量讨论，尤其适合核验“中层减少、层级压缩、Agent 进入执行流”的证据。',
    focus: 'Agentic enterprise、中层层级、组织结构变量',
    relevanceLabel: '强相关：扁平化与管理层级',
    evidenceLevel: 'Context 到结论层之间；当前下载失败，需用报告原文或可访问版本复核具体数字。',
    core: [
      '日报引用该报告用于说明“减少中层管理层级”已成为 AI 组织研究中的结构变量。',
      '它把 Agent 引入企业运营后对领导者、组织结构和治理方式的影响放在同一框架下讨论。',
      '对我们的课题价值在于把“AI 工具采用”推进到“管理层级、跨度、协调劳动如何重分配”的组织问题。',
    ],
    attention: [
      '重点不是记住某个比例，而是先定义“中层”的口径：层级数、管理跨度、项目管理还是人员管理。',
      '若要给 CEO 使用，需要把报告数字与公司案例交叉验证，避免把咨询调研样本当作普遍事实。',
      '它提示我们追踪 player-coach、工作流负责人（workflow owner）、agent supervisor 等管理角色是否替代传统协调型中层。',
    ],
    relevance: [
      ['管理层级', '高', '用于讨论 AI 是否压缩协调型中层和改变管理跨度。'],
      ['岗位合并', '中', '可解释执行层更端到端后，管理者也需要从派活转向编排。'],
      ['专家深化', '中', '治理、架构、安全和数据责任仍可能形成更深专家节点。'],
    ],
    useInResearch: [
      '暂放 背景材料（Context），成功下载并核验数字后再进入结论层。',
      '后续要与 GitLab、Deloitte、Gartner 等来源交叉验证“层级减少不等于 ROI”的边界。',
    ],
  }],
  ['https://www.payscale.com/content/report/2026-compensation-best-practice-report.pdf', {
    summary: 'Payscale 2026 薪酬实践报告可用于验证 AI 技能定价、薪酬公平、benchmarking 和 job management 的制度化问题。',
    focus: 'AI 技能定价、薪酬公平、薪酬基准、job management',
    relevanceLabel: '强相关：薪酬架构与激励资源',
    evidenceLevel: '结论层可用但需精读具体数据口径；适合与 EY Future of Pay 互证。',
    core: [
      '报告被专题引用来拆分 base、奖金（bonus）、长期激励（LTI）、pay equity、benchmarking 与 job management 等薪酬治理主题。',
      '它直接对应“岗位体系问题本质上常是关键员工激励和市场溢价空间问题”的假设。',
      '其价值不只是证明 AI 技能溢价（skill premium），而是帮助设计薪酬治理：哪些用市场定价，哪些用技能津贴，哪些用项目激励。',
    ],
    attention: [
      '重点关注 AI 技能如何进入 job pricing、market benchmark、pay equity review 和薪酬带宽。',
      '避免把新增 岗位族群（job family） 当作唯一解；薪酬带宽、稀缺系数、临时补贴和项目奖金可能更稳。',
      '后续需要抽取能直接落入 CEO 决策的工具箱：何时新序列、何时技能标签、何时调薪酬带宽。',
    ],
    relevance: [
      ['薪酬架构', '高', '支持技能溢价、市场基准、带宽和公平治理设计。'],
      ['岗位族群', '中', '提示 job management 与 pay management 要拆开设计。'],
      ['激励资源配置', '高', '支撑有限激励资源下的分层工具箱。'],
    ],
    useInResearch: [
      '与 EY Future of Pay 一起作为薪酬/激励证据组。',
      '精读后优先抽取薪酬实践数据、AI 技能溢价表述、pay equity 风险和岗位管理建议。',
    ],
  }],
  ['https://www.oecd.org/content/dam/oecd/en/publications/reports/2026/07/competition-in-the-age-of-ai_e9f49e20/6f88a1ea-en.pdf', {
    summary: 'OECD 的跨国微观数据表明，AI 可得性不会自动抹平组织差异；高技能人才、数字基础设施、吸收能力与资本仍是关键互补资产。',
    focus: '组织吸收能力、高技能人才、市场结构、企业边界',
    relevanceLabel: '强相关：组织能力与人才结构',
    evidenceLevel: 'L2：权威多源微观数据，但以描述性关联和固定效应回归为主，不构成 AI 因果证明。',
    core: [
      '报告连接法国、葡萄牙企业调查与行政数据、葡萄牙约 300 万员工/年数据、跨国专利与企业数据，以及 38 万余家融资或有专利的初创企业。',
      '2020/2022 年非生成式 AI 使用与企业加价率系统性上升之间没有稳定关系；高生成式 AI 暴露企业平均更小、更年轻，但生产率和高学历员工占比更高。',
      'AI 专利集中度与销售集中度相关，生成式 AI 初创持续进入并获得融资，也频繁被大型既有企业收购。',
    ],
    attention: [
      '底层企业采用数据明显早于 2025—2026 智能体浪潮，不能直接外推当前组织结果。',
      '岗位暴露不等于实际采用，高能力企业也可能本来就更容易采用、申请专利和提高加价率。',
      '对 OD 的价值在于识别互补能力和自建/采购/合作权责，不是把市场关联写成组织最佳实践。',
    ],
    relevance: [
      ['组织能力', '高', '用于解释技术接入之外的人才、数据、基础设施与吸收能力差异。'],
      ['人才结构', '高', '高学历员工占比提供能力互补的方向性证据。'],
      ['企业边界', '中', '初创进入、融资与收购可支持自建/采购/合作讨论。'],
    ],
    useInResearch: [
      '放入日报/周报的组织能力与反事实部分，强调技术民主化不等于收益自动民主化。',
      '后续用 2025—2026 企业采用和智能体数据复核，并避免将描述性关联升级为因果。',
    ],
  }],
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

function extractPdfUrls(content) {
  const urlPattern = /https?:\/\/[^\s<>")\]；，。]+?\.pdf(?:\?[^\s<>")\]；，。]*)?/gi;
  return (content.match(urlPattern) || []).map(cleanUrl);
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
  if (url === 'https://www.oecd.org/content/dam/oecd/en/publications/reports/2026/07/competition-in-the-age-of-ai_e9f49e20/6f88a1ea-en.pdf') return 'OECD';
  if (host.includes('bcg.com')) return 'BCG';
  if (host.includes('deloitte.com')) return 'Deloitte';
  if (host === 'mckinsey.com' || host.endsWith('.mckinsey.com')) return 'McKinsey & Company';
  if (host === 'ey.com' || host.endsWith('.ey.com')) return 'EY';
  if (host.includes('weforum.org')) return 'World Economic Forum';
  if (host.includes('aihr.com')) return 'AIHR';
  if (host.includes('anthropic.com')) return 'Anthropic';
  if (host.includes('gitlab.com')) return 'GitLab';
  if (host.includes('payscale.com')) return 'Payscale';
  return host;
}

function sourceTypeFor(url) {
  const host = new URL(url).hostname;
  if (url === 'https://www.oecd.org/content/dam/oecd/en/publications/reports/2026/07/competition-in-the-age-of-ai_e9f49e20/6f88a1ea-en.pdf') return 'industry';
  if (/(^|\.)(bcg|deloitte|ey|mckinsey)\.com$/.test(host)) return 'consulting';
  if (/weforum|aihr|anthropic|gitlab|payscale/.test(host)) return 'industry';
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

function profileFor(item) {
  if (reportProfiles.has(item.url)) return reportProfiles.get(item.url);
  const topics = topicsFor(item.title, item.url);
  return {
    summary: `${item.title} 已作为日报/周报 PDF 证据源入库，当前需要完成结构化精读后再进入结论层。`,
    focus: topics.join('、'),
    relevanceLabel: '待评估：需精读后确定',
    evidenceLevel: '线索层优先；未完成精读前不进入结论层。',
    core: [
      '当前已完成来源、引用位置和原文状态建档，避免证据散落在日报正文。',
      '尚未完成报告级摘要、关键数据口径和可复用框架抽取。',
      '需要判断它支撑的是组织设计、岗位族群、职级序列、薪酬激励，还是仅作为行业背景。',
    ],
    attention: [
      '先确认发布日期、样本口径、行业范围和是否为一手材料。',
      '区分可形成结论的事实、只能作为 Context 的专家观点，以及仍需追踪的单点线索。',
      '如果报告只提供宏观背景，不应强行写入岗位/薪酬改革结论。',
    ],
    relevance: [
      ['AI 组织改革', topics.includes('AI组织设计') ? '待验证' : '弱', '需精读后判断是否有流程、权责、岗位或治理内容。'],
      ['岗位/职级/族群', '待验证', '需确认是否包含岗位结构、职业通道或管理层级变化。'],
      ['薪酬/激励', '待验证', '需确认是否包含薪酬带宽、技能溢价、项目激励或稀缺人才定价。'],
    ],
    useInResearch: [
      '先放入知识库线索层，后续按主题补充到日报/周报证据地图。',
      '精读后再决定是否拆成概念页、企业案例页或机制模板。',
    ],
  };
}

function markdownList(items) {
  return items.map((item) => `- ${item}`).join('\n');
}

function relevanceTable(rows) {
  return rows.map(([theme, relevance, usage]) => `| ${theme} | ${relevance} | ${usage} |`).join('\n');
}

function contextFromLine(line, url) {
  const markdownLink = line.match(new RegExp(`\\[([^\\]]+)\\]\\(${url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)`));
  if (markdownLink) return markdownLink[1];
  return line.replace(url, '').replace(/^[-*]\s*/, '').replace(/\*\*/g, '').trim().slice(0, 180);
}

function isPublicRepoCitation(file) {
  return !path.relative(root, file).startsWith('..');
}

function citationFileLabel(file) {
  if (isPublicRepoCitation(file)) return path.relative(root, file);
  return '外部公开 PDF 扫描';
}

function citationContext(line, url, file) {
  const context = contextFromLine(line, url);
  if (isPublicRepoCitation(file)) return context;
  return context ? `公开安全引用：${context}` : '公开安全引用：外部公开 PDF 扫描命中。';
}

function collectPdfReferences() {
  const references = new Map();
  for (const file of scanRoots.flatMap(walk)) {
    if (/source-channels\.private|local-reference-structured|\/archive\//.test(file)) continue;
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split(/\r?\n/);
    lines.forEach((line, index) => {
      for (const url of extractPdfUrls(line)) {
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
          file: citationFileLabel(file),
          line: index + 1,
          context: citationContext(line, url, file),
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
  const profile = profileFor(item);
  const citations = item.citations
    .map((citation) => `- \`${citation.file}:${citation.line}\`：${citation.context || '日报/周报引用该 PDF。'}`)
    .join('\n');
  const topics = topicsFor(item.title, item.url);
  const sourceFileLine = status === 'downloaded' ? `sourceFile: ../${rawRelative}` : 'sourceFile:';
  return `---\ntitle: ${item.title}\nsource: ${item.publisher}\ndate: 待核验\ningested: ${today}\n${sourceFileLine}\nsourceUrl: ${item.url}\ntags: [${topics.join(', ')}]\nstatus: ${status === 'downloaded' ? '已下载原始PDF，已生成结构化初筛卡片' : '已索引来源，PDF下载待重试'}\n---\n\n# ${item.title}\n\n## 一句话判断\n\n${profile.summary}\n\n## 入库状态\n\n- **来源机构**：${item.publisher}\n- **来源类型**：${item.sourceType}\n- **原文 URL**：${item.url}\n- **原始文件**：${status === 'downloaded' ? `\`${rawRelative}\`` : '下载失败或待重试，先保留 URL 与引用上下文'}\n- **入库日期**：${today}\n- **证据层级**：${profile.evidenceLevel}\n\n## 核心内容\n\n${markdownList(profile.core)}\n\n## 你需要关注\n\n${markdownList(profile.attention)}\n\n## 与近期研究主题的相关性\n\n| 研究主题 | 相关性 | 可怎么用 |\n|---|---|---|\n${relevanceTable(profile.relevance)}\n\n## 对日报/周报的使用方式\n\n${markdownList(profile.useInResearch)}\n\n## 被引用位置\n\n${citations}\n\n## 后续精读任务\n\n- 核验报告发布日期、作者/机构、样本范围和数据口径。\n- 抽取可支撑“执行层分工合并 vs 核心专家深化”的直接证据。\n- 抽取可支撑“岗位改革背后是激励资源再配置”的薪酬、技能溢价或预算配置证据。\n- 判断是否需要拆成独立概念页、企业案例页或机制模板。\n\n## 与已有知识的关联\n\n- [[AI-First 运营模型]]\n- [[技能为本的组织]]\n- [[能力-判断评估矩阵]]\n`;
}

function updateCatalog(items) {
  const catalogPath = path.join(root, 'knowledge/catalog.json');
  const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
  catalog.lastUpdated = today;
  const reports = catalog.reports || [];
  const existingByUrl = new Map(reports.map((report, index) => [report.originalUrl, index]).filter(([url]) => Boolean(url)));
  const existingIds = new Set((catalog.reports || []).map((report) => report.id));
  let nextNumber = Math.max(0, ...Array.from(existingIds).map((id) => {
    const match = String(id).match(/^p(\d+)$/);
    return match ? Number(match[1]) : 0;
  })) + 1;
  for (const item of items) {
    const profile = profileFor(item);
    const record = {
      title: item.title,
      originalTitle: item.title,
      author: item.publisher,
      publisher: item.publisher,
      sourceType: item.sourceType,
      topics: topicsFor(item.title, item.url),
      date: '',
      uploadDate: today,
      description: `${profile.summary} 关注重点：${profile.focus}。相关性：${profile.relevanceLabel}。`,
      summaryFile: `./knowledge/wiki/${item.wikiName}`,
      rawFile: item.status === 'downloaded' ? `./${item.rawRelative}` : '',
      fileName: path.basename(item.rawRelative),
      fileSize: item.status === 'downloaded' ? `${item.size} bytes` : 'download pending',
      tags: ['PDF自动入库', ...topicsFor(item.title, item.url), item.publisher],
      originalUrl: item.url,
    };
    if (existingByUrl.has(item.url)) {
      const index = existingByUrl.get(item.url);
      catalog.reports[index] = {
        ...catalog.reports[index],
        ...record,
        id: catalog.reports[index].id,
      };
      continue;
    }
    const id = `p${String(nextNumber++).padStart(3, '0')}`;
    catalog.reports.push({
      id,
      ...record,
    });
  }
  fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2) + '\n');
}

function updateIndex(items) {
  const indexPath = path.join(root, 'knowledge/index.md');
  let content = fs.readFileSync(indexPath, 'utf8');
  content = content.replace(/最后更新: \d{4}-\d{2}-\d{2}/, `最后更新: ${today}`);
  const rows = items.map((item) => {
    const profile = profileFor(item);
    const status = item.status === 'downloaded' ? '已下载原文' : '已索引待重试';
    return `| [${item.title}](wiki/${item.wikiName}) | ${item.publisher} | ${profile.focus} | ${profile.relevanceLabel} | ${status}，引用 ${item.citations.length} 次 |`;
  }).join('\n');
  const block = `<!-- PDF_AUTO_INDEX_START -->\n## PDF 自动入库索引\n\n> 从日报、周报和专题报告中自动发现 PDF 证据源；每份报告必须呈现核心内容、关注重点、与近期研究主题的相关性和证据层级，避免只留下引用路径。\n\n| 标题 | 来源 | 关注重点 | 相关性 | 状态 |\n|---|---|---|---|---|\n${rows}\n<!-- PDF_AUTO_INDEX_END -->`;
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

if (require.main === module) main();

module.exports = { extractPdfUrls };
