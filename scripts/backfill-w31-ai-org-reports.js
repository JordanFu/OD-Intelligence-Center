const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const project = path.join(root, "specials", "ai-org-talent-mechanism");
const weeklyDir = path.join(project, "weekly");

const urls = {
  china: "https://www.36kr.com/p/3913483185673351",
  hiring: "https://www.livemint.com/global/big-companies-are-starting-to-hire-again-defying-predictions-of-ai-wipeout-11785114677792.html",
  gallup: "https://www.gallup.com/workplace/713063/ai-workplace-productivity.aspx",
  gartner: "https://gcom.pdo.aws.gartner.com/en/articles/ai-talent-risks",
  tokenmaxxing: "https://apnews.com/article/ai-token-openai-anthropic-corporate-31bb80ac1cd7862d05f6397177d826b1",
  visa: "https://www.investing.com/news/stock-market-news/visa-plans-to-cut-7-of-workforce-bloomberg-reports-4816822",
  revelio: "https://www.prnewswire.com/news-releases/revelio-labs-launches-ai-labor-market-tracker-an-evidence-backed-real-time-measure-of-ais-impact-on-the-workforce-302836428.html",
  imocha: "https://www.imocha.io/press-releases/imocha-look-beyond-the-label-us-executive-roundtable-series",
  interview: "https://arxiv.org/abs/2607.28222",
  metaResults: "https://s21.q4cdn.com/399680738/files/doc_financials/2026/q2/Meta-06-30-2026-Exhibit-99-1-FINAL.pdf",
  metaCall: "https://s21.q4cdn.com/399680738/files/doc_financials/2026/q2/META-Q2-2026-Earnings-Call-Transcript.pdf",
  metaAp: "https://apnews.com/article/meta-earnings-q2-facebook-profit-revenue-ai-bcbc62dde6d2cac724e3b3385fcabeab",
  tencentTalent: "https://ur.tencent.com/article/1529",
  hibob: "https://www.hibob.com/news/hibob-launches-ai-skills-framework-and-a-new-ai-skills-assessment-guide/",
  monday: "https://www.sec.gov/Archives/edgar/data/1845338/000117891326003553/zk2635715.htm",
  boa: "https://newsroom.bankofamerica.com/content/newsroom/press-releases/2026/07/bank-of-america-enhances-ericaassist-with-generative-ai-to-help-.html",
  presence: "https://openai.com/index/introducing-openai-presence/",
  gitlab: "https://handbook.gitlab.com/handbook/people-group/promotions-transfers/",
  bcg: "https://www.bcg.com/publications/2026/ai-at-work-why-strategy-matters-more-than-tools",
  intuit: "https://investors.intuit.com/sec-filings/all-sec-filings/content/0000896878-26-000024/fy26q3-ex9902.htm",
  shanghai: "https://www.pdhr.com/CMS/CmsDetail?id=2794",
  oecd: "https://www.oecd.org/en/publications/oecd-employment-outlook-2026_7e710f54-en/full-report/component-5.html",
  hscode: "https://aclanthology.org/2026.acl-long.937/"
};

const sourceRows = [
  ["36氪：阿里、腾讯、字节 AI 组织与人才动作", urls.china, "2026-07-27，行业媒体作者分析，L1"],
  ["WSJ/Mint：企业重新招聘与初级岗位反例", urls.hiring, "2026-07-27，权威二手，L2"],
  ["Gallup：AI 采用、经理支持与裁员归因", urls.gallup, "2026-07-27，原始调查，L2"],
  ["Gartner：AI 人才风险框架", urls.gartner, "2026-07-27，咨询框架，L2"],
  ["AP：Token 激励与成本反例", urls.tokenmaxxing, "2026-07-27，多企业采访，L2"],
  ["Reuters：Visa 裁减约 2,600 人", urls.visa, "2026-07-28，公司确认的权威二手，L2"],
  ["Revelio Labs AI Labor Market Tracker", urls.revelio, "2026-07-28，供应商自有数据，L1-L2"],
  ["iMocha 技能验证圆桌", urls.imocha, "2026-07-28，供应商自报，L1"],
  ["Voice AI in Firms 自然田野实验", urls.interview, "2026-07-30，既有工作论文的 arXiv 新版本，L2"],
  ["Meta Q2 2026 官方业绩与电话会", urls.metaResults, "2026-07-29，公司一手披露并有媒体交叉，L3"],
  ["AP：Meta Q2 2026 交叉报道", urls.metaAp, "2026-07-29，权威二手交叉，L2"],
  ["腾讯犀牛鸟开源人才培养计划", urls.tencentTalent, "2026-06-19 发布、2026-07-31 报名节点，官方人才项目，L2"],
  ["HiBob AI Skills Framework", urls.hibob, "2026-07-23，供应商框架，L1-L2"],
  ["monday.com SEC 6-K", urls.monday, "2026-07-22，单一一手组织动作，L2；效果未验证"],
  ["Bank of America EricaAssist", urls.boa, "2026-07-21，单一一手公司材料，L2"],
  ["OpenAI Presence", urls.presence, "2026-07-22，一手产品/岗位契约，L2"],
  ["GitLab Promotions and Transfers", urls.gitlab, "动态公开制度，单一一手 L2 基线"],
  ["BCG AI at Work 2026", urls.bcg, "2026-06-03，大样本自报调查，L2"],
  ["Intuit SEC 附件内部信", urls.intuit, "2026-05-20，单一一手组织动作，L2"],
  ["上海急需紧缺高技能人才目录 2026", urls.shanghai, "2026-07 发布、2026-08-01 生效，单一政策事实 L2"],
  ["OECD Employment Outlook 2026", urls.oecd, "2026 年权威报告，初级岗位反例 L2"],
  ["ACL HSCodeComp", urls.hscode, "2026 年同行评审任务基准，L2"]
];

const days = [
  {
    date: "2026-07-27",
    freshness: "当日新增证据集中在中国大厂 AI 组织权力配置与美国企业招聘反向信号。",
    one: "AI 组织不是简单变扁，而是在模型中枢、业务自主权和稀缺人才收益权之间重新分配控制权；与此同时，企业重新招聘提醒我们，少人化不是 AI 转型的稳定终点。",
    facts: [
      ["阿里、腾讯、字节组织动作", "36氪梳理阿里收拢模型—云—办公链路、腾讯集中基础模型但保留业务赛马、字节围绕 Seed 推出与业务增长挂钩的特殊股权激励。文章明确为作者观点，具体组织图、‘豆包股’与人才流动数字按 L1 线索使用。", urls.china, "L1", "四课题"],
      ["企业重新招聘", "WSJ 报道 Alphabet、CSX、Booz Allen 等恢复或加快特定岗位招聘；Lattice 称部分客户重新招聘初级岗位。该材料反驳 AI 必然导致持续净减员。", urls.hiring, "L2", "扁平化、人才密度"],
      ["采用与经理支持", "Gallup 原始调查称，AI 实施组织中 65% 员工认为效率提高，但仅 12% 强烈认同工作方式已彻底改变；经理主动支持与员工感知价值显著相关。该证据支持保留采用辅导与责任澄清。", urls.gallup, "L2", "扁平化、人才密度"],
      ["Token 指标反例", "AP 报道部分企业用 Token 使用量激励员工，但成本增长并未带来同等生产率，企业转向模型路由。Token、调用量和在线时长只能做采用诊断，不能做绩效或晋升代理。", urls.tokenmaxxing, "L2", "人才密度、晋升"]
    ]
  },
  {
    date: "2026-07-28",
    freshness: "当日形成裁减、增长、技能验证三类相互冲突的证据。",
    one: "AI 对人员规模的影响呈双向分化：Visa 将 AI 列为提效因素但明确不是唯一原因，Revelio 同时观察到高暴露岗位需求下降与成功采用者扩编；管理层应管理任务与能力迁移，而不是先定统一减员率。",
    facts: [
      ["Visa 裁减约 7%", "Reuters 报道 Visa 计划裁减约 2,600 人，主要涉及技术与产品；公司确认 AI 加速转型，但 AI 不是唯一原因。", urls.visa, "L2", "扁平化、人才密度"],
      ["Revelio 劳动力追踪器", "Revelio 自有数据称，高 AI 暴露职业的新增需求相对下降 36%，成功采用 AI 的企业就业人数增长 27%；多数变化发生在职业内部任务，而非整个职业消失。专有数据与选择偏差使其不能解释因果。", urls.revelio, "L1-L2", "人才密度、岗位架构"],
      ["技能验证圆桌", "iMocha 的供应商圆桌建议将自评、经理输入、360 反馈、认证与真实工作历史组合为能力证据；这是 L1 机制信号，不是成效证据。", urls.imocha, "L1", "岗位架构、晋升"]
    ]
  },
  {
    date: "2026-07-29",
    freshness: "Meta 官方财报形成 W31 最强的 L3 人员重配证据；当日仍没有新的成熟晋升制度。",
    one: "Meta 的公司披露显示，总量收缩、AI 技术招聘和技术人才薪酬增长可以同时发生；AI 组织调整应拆开退出岗位、增投岗位和关键人才定价，不能只看净人数。",
    facts: [
      ["Meta Q2 人员与薪酬重配", "Meta 披露 6 月 30 日员工 75,472 人，同比下降 1%；数字仍含约 8,000 名 5 月裁员受影响人员，多数将在 Q3 末移除。公司同时说明，剔除遣散费后员工薪酬增长主要由技术招聘、尤其 AI 人才推动。", urls.metaResults, "L3", "扁平化、人才密度、岗位架构"],
      ["冲突校准", "Meta、Visa 的退出动作与 WSJ 的恢复招聘并存，说明人员规模取决于战略、成本、增长和任务重写的组合，不能做单因果归因。", urls.metaCall, "L3 综合", "扁平化、人才密度"]
    ]
  },
  {
    date: "2026-07-30",
    freshness: "7 月 30 日 arXiv 发布既有 AI 面试工作论文的新版本；不是实验当日完成，也不能外推到晋升。",
    one: "AI 可以标准化人才信息收集，但不能直接替代录用、晋升和潜力裁决；更可靠的方向是让机器改善证据结构，让人对标准、例外、公平和最终决定负责。",
    facts: [
      ["AI 面试自然田野实验", "约 70,000 名申请者被随机分配到人工或语音 AI 面试，最终仍由人类招聘者评估和决策；论文报告 offer +12%、入职 +18%、30 日留任 +17%，未发现生产率下降。样本和利益冲突边界、同行评审与公平性仍需复核。", urls.interview, "L2", "人才密度、晋升"]
    ]
  },
  {
    date: "2026-07-31",
    freshness: "未发现新的公司内部 L2+ 晋升制度；Intuit 过渡期结束与腾讯人才项目报名截止都只是执行节点。",
    one: "重组的真正验收点不在公告日，而在过渡期结束后的责任承接、内部流动、质量、离职和客户结果；没有这些数据，不能把减层动作写成成功。",
    facts: [
      ["Intuit 过渡节点", "Intuit 5 月一手内部信所列部分带薪过渡安排在 7 月 31 日结束；这只能证明支持期安排，不能证明 AI 重组、减层或减员已经改善经营结果。", urls.intuit, "L2 动作/L0 效果", "扁平化、人才密度"],
      ["腾讯外部人才培养节点", "腾讯犀牛鸟计划设置分层任务、真实开发场景、导师、证书/奖学金与优先面试，7 月 31 日为报名截止节点。它可用于设计能力认证与招聘漏斗，但不等于腾讯内部职级或晋升制度。", urls.tencentTalent, "L2", "人才密度、岗位架构、晋升"],
      ["晋升制度空窗", "截至本日仍未发现第二家公司公开 AI 贡献字段、人才委员会校准、群体公平与申诉的完整制度；GitLab 继续作为历史基线。", urls.gitlab, "检索结论", "晋升"]
    ]
  },
  {
    date: "2026-08-01",
    freshness: "新增上海紧缺技能目录生效节点；它是政策分类工具，不是企业序列改革。",
    one: "市场稀缺可以通过动态目录、技能标签、培养补贴和引才政策承接，并不必然要求企业永久新建岗位序列或抬高职级。",
    facts: [
      ["上海紧缺技能目录生效", "上海市急需紧缺高技能人才职业目录自 8 月 1 日实施，支持人才引进与培养方向。它证明动态目录可承接稀缺信号，但不证明企业应新建 AI 序列。", urls.shanghai, "L2", "岗位架构、人才密度"]
    ]
  },
  {
    date: "2026-08-02",
    freshness: "周日无新的高置信公司制度材料；本日用于整周交叉验证与结论冻结。",
    one: "W31 最强结论不是 AI 让组织统一变小，而是结构、人才、岗位和晋升必须围绕同一份责任—权限—质量—净容量账联动；本周没有 L4。",
    facts: [
      ["无新增高等级外证", "当日未发现新的 L2+ 公司组织或晋升制度。周内材料继续支持任务与责任重写，但复盘本身不提高任何单项证据等级。", urls.gitlab, "检索结论，不单独评级", "四课题"]
    ]
  }
];

const topics = {
  flat: {
    file: "01-flat-organization.md",
    html: "01-flat-organization.html",
    title: "专题一：组织扁平化与中层减少",
    judgment: "本周证据支持删除部分协调接口、重配资源和缩小团队，但不支持 AI 正在系统性消灭中层。管理责任不会消失，只会从信息中转转向目标、授权、质量、例外、育人和信任。",
    meaning: "先画人机工作图与责任迁移表，再决定是否移除层级；跨度必须按例外负荷、育人容量和风险半径实测。",
    risks: "若只裁层级，决策会重新上收，骨干会成为隐性中层，质量和培养责任会失主。"
  },
  talent: {
    file: "02-talent-density.md",
    html: "02-talent-density.html",
    title: "专题二：高人才密度与复合型人才机制",
    judgment: "高人才密度不是少招人，而是稳定供应能关闭结果—质量—风险—复用—育人责任环的人。W31 同时出现裁减与重新招聘，说明密度必须与人才管道、负荷和红利分配共同设计。",
    meaning: "用真实责任包识别人才，把基本薪酬、稀缺津贴、项目奖、股权和晋升分流；保留初级入口与导师时间。",
    risks: "只追明星会形成关键人依赖、资产不回流和初级断层；节省的时间也可能全部变成更高工作量。"
  },
  job: {
    file: "03-job-family-career-architecture.md",
    html: "03-job-family-career-architecture.html",
    title: "专题三：岗位、族群、序列持续建设",
    judgment: "Revelio 的当周数据强化了职业内部任务重写，而非职业整体消失；应用责任变宽与安全、评测、数据和治理专家变深继续并存，没有成熟新序列证据。",
    meaning: "新诉求必须通过既有岗位调整、族群、序列、技能标签、项目角色、薪酬/稀缺工具六路由；只有稳定责任和完整治理才建序列。",
    risks: "用新头衔解决短期定价会制造头衔通胀、永久薪酬债和边界重叠。"
  },
  promotion: {
    file: "04-promotion-system.md",
    html: "04-promotion-system.html",
    title: "专题四：未来组织的晋升机制",
    judgment: "W31 没有新的公司级 AI 晋升制度。AI 面试实验只支持改善信息收集；正式晋升仍需持续更高责任、业务必要性、同级校准、预算、公平审计与人工裁决。",
    meaning: "即时战功走认可或项目奖，60—180 天扩大职责验证持续性，正式职级变化进入固定窗口或受控例外。",
    risks: "课程、认证、Token、代码量、模型评分和一次战功直接兑换晋升，会放大错误归因与组织不信任。"
  }
};

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function write(file, text) {
  fs.writeFileSync(file, text.trim() + "\n");
}

const sourceReleaseDates = new Map([
  [urls.china, "2026-07-27"], [urls.hiring, "2026-07-27"], [urls.gallup, "2026-07-27"],
  [urls.gartner, "2026-07-27"], [urls.tokenmaxxing, "2026-07-27"], [urls.visa, "2026-07-28"],
  [urls.revelio, "2026-07-28"], [urls.imocha, "2026-07-28"], [urls.metaResults, "2026-07-29"], [urls.metaAp, "2026-07-29"],
  [urls.interview, "2026-07-30"], [urls.shanghai, "2026-08-01"]
]);

function links(cutoff) {
  return sourceRows.filter(function (row) {
    return !cutoff || !sourceReleaseDates.has(row[1]) || sourceReleaseDates.get(row[1]) <= cutoff;
  }).map(function (row) {
    return "- [" + row[0] + "](" + row[1] + ")：" + row[2] + "。";
  }).join("\n");
}

function factsTable(day) {
  const rows = day.facts.map(function (fact) {
    return "| " + fact[0] + " | " + fact[1] + " | [" + fact[3] + "](" + fact[2] + ") | " + fact[4] + " |";
  }).join("\n");
  return "| 事实 | 事实还原与边界 | 来源/等级 | 关联课题 |\n|---|---|---|---|\n" + rows;
}

function overview(day) {
  return [
    "# " + day.date + "｜AI时代组织与人才机制四课题总览",
    "",
    "> 研究状态：正式历史补跑核验稿。仅把截至该日已公开的材料作为当日正式证据；事后检索只用于校验。证据等级：L4＝外部与内部结果验证机制；L3＝多条一手/权威材料交叉支持；L2＝强一手事实、权威二手或可靠研究；L1＝单一媒体、供应商、JD 或社媒线索；L0＝未核验。W31 内部知识库为空窗，本稿不把 W29/W30 旧闻冒充当日新增。",
    "",
    "## 读者应该带走什么",
    "",
    day.one,
    "",
    "### 一张判断图",
    "",
    "| 管理问题 | 本日答案 | 对管理层意味着什么 |",
    "|---|---|---|",
    "| 是否可以直接减层/减员 | 不可以。先识别任务、接口、责任和净容量 | 所有结构动作先提交责任迁移与质量护栏 |",
    "| 是否需要新岗位/序列 | 多数情况先用既有岗位、标签、项目角色或薪酬工具 | 新序列必须有稳定责任、梯度、薪带、流动与退出 |",
    "| AI 贡献能否直接决定晋升 | 不能。AI 可整理证据，不能推荐、排序或裁决 | 保留固定校准与受控例外 |",
    "",
    "### 三句话收束",
    "",
    "1. " + day.one,
    "2. 本日材料最多支持任务和控制权正在重写，不支持把单点裁员、招聘或新头衔外推为行业趋势。",
    "3. 管理动作应落到责任、权限、质量、净容量、人才管道和公平校准，而不是工具活动量。",
    "",
    "### 管理层该问的问题",
    "",
    "- 被自动化或删除的是信息中转，还是质量、例外、育人和信任节点？",
    "- 节省的时间扣除验证、纠错、人工升级和学习成本后，还剩多少可再投资净容量？",
    "- 新角色诉求是长期责任、短期项目、快变技能，还是市场定价问题？",
    "- 人才决策是否允许更正、申诉和人工推翻？",
    "",
    "### 不要误读",
    "",
    "- 不把裁员规模直接归因于 AI；不把恢复招聘解释为 AI 失败。",
    "- 不把媒体组织图、供应商调查、JD 或社媒体感写成成熟机制。",
    "- 不把课程、认证、Token、代码量和模型评分当晋升结果。",
    "- 暂不足以下结论，但提示我们关注组织动作背后的控制权、成本、人才流动和责任承接。",
    "",
    "## 今日一句话",
    "",
    "**" + day.one + "**",
    "",
    "## 今日核心判断",
    "",
    "1. **事实与因果必须分开。可信度：高。** 公司确认的动作可以进入事实层，AI 是否为主因、结构是否成功仍需结果数据。",
    "2. **组织变化的单位是责任包，不是人数。可信度：中高。** 需要同时记录结果、权限、质量、异常、育人、申诉和净容量。",
    "3. **岗位变化优先发生在职业内部。可信度：中。** 当周数据支持任务组合变化，但不证明成熟族群或序列已经形成。",
    "4. **人才识别与晋升必须分开。可信度：高。** AI 可改善信息收集与证据完整性，最终任命仍需岗位需求、同级校准和人工裁决。",
    "5. **W31 没有 L4。可信度：高。** 缺少内部结果、组织图、跨度、薪酬/晋升数据和 6—12 个月追踪。",
    "",
    "## 今日新增事实",
    "",
    day.freshness,
    "",
    factsTable(day),
    "",
    "## 四课题交叉判断",
    "",
    "- **组织扁平化：** 可系统化低价值接口，但管理责任必须显式迁移。",
    "- **高人才密度：** 需要复合骨干、高后果专家和早期人才入口同时存在。",
    "- **岗位架构：** 应用责任变宽、控制面专家变深；先分流再建序列。",
    "- **晋升机制：** 即时识别、即时认可和正式晋升分流；AI 不进入最终裁决链。",
    "",
    "## 判断变化",
    "",
    "- **增强：** 责任迁移表必须升级为责任—权限—质量—净容量账，扣除验证税和人工尾部负荷。",
    "- **增强：** 人工在回路必须拥有知识、时间、异议权和可逆控制，而非只承担签字责任。",
    "- **削弱：** AI 系统性消灭中层、全面冻结初级岗位、新头衔等于新序列。",
    "- **修正：** W30 证据覆盖口径应为 7/20—7/23 有正式专题稿、7/24 未达到正式决策稿标准；这些仅作历史基线，不算 W31 新增。",
    "",
    "## 背景材料（Context）",
    "",
    "- 暂不足以下结论，但提示我们关注：国内大厂正在模型中枢、业务自主权与稀缺人才收益权之间反复寻找边界。",
    "- 暂不足以下结论，但提示我们关注：裁减与重新招聘可以同时发生，人员总量不是组织机制的充分代理变量。",
    "- 暂不足以下结论，但提示我们关注：供应商技能框架正从头衔转向多证据能力画像，但尚无公平与预测效度闭环。",
    "",
    "## 线索层",
    "",
    "- 跟踪 Visa 受影响岗位、内部转岗、经理比例、质量与 180 天结果。",
    "- 跟踪阿里、腾讯、字节组织动作的公司确认、决策权、薪带、流动与成效。",
    "- 跟踪第二家公开 AI 贡献晋升字段、人才委员会和申诉规则的公司。",
    "- 跟踪 AI 面试实验的同行评审、公平差异和人工推翻机制。",
    "",
    "## 证据地图",
    "",
    "| 渠道 | 本日用途 | 可信度边界 |",
    "|---|---|---|",
    "| 官方/一手 | 公司动作、制度、政策生效 | 动作不等于结果 |",
    "| 权威二手 | 时间线、确认、争议和反例 | 不替代公司完整制度 |",
    "| 行业研究/预印本 | 任务、招聘和能力变化 | 方法与外推范围需复核 |",
    "| 招聘薪酬信号 | 责任意图与市场定价 | 单个样本不等于序列 |",
    "| 社媒/供应商 | 形成问题与弱信号 | 只进入 Context |",
    "",
    "## 行动启发",
    "",
    "- 立即可做：把 Token、登录、调用量、代码量降为诊断输入。",
    "- 需要试点：一条低至中风险流程运行 8—12 周责任—权限—质量—净容量账。",
    "- 需要高层共识：压层、人才密度、岗位架构和晋升使用同一份责任包语言。",
    "- 需要数据验证：前后组织图、跨度、经理负荷、质量、员工体验、薪酬和流动。",
    "- 需要暂缓：证据不足时统一减员、建新序列或用 AI 分数直接晋升。",
    "",
    "## 来源索引",
    "",
    links(day.date)
  ].join("\n");
}

function dailyTopicJudgment(day, topic) {
  const prefix = "截至 " + day.date + "，";
  if (topic.file === "01-flat-organization.md") return prefix + "没有证据支持 AI 系统性消灭中层。是否压层须以责任迁移、权限、质量、例外负荷和净容量验证；新增案例只证明局部动作。";
  if (topic.file === "02-talent-density.md") return prefix + "高人才密度不能定义为少招人；必须同时看关键能力、结果质量、继任管道、负荷、内部流动和知识回流。";
  if (topic.file === "03-job-family-career-architecture.md") return prefix + "没有成熟证据支持批量新建 AI 序列；先用既有岗位调整、技能标签、项目角色或薪酬工具承接，稳定责任形成后再建序列。";
  return prefix + "没有新的公司级 AI 晋升制度；即时认可、临时扩大职责与正式晋升应分流，AI 不进入最终裁决链。";
}

function topicReport(day, topic) {
  const judgment = dailyTopicJudgment(day, topic);
  const topicTag = {
    "01-flat-organization.md": "扁平化",
    "02-talent-density.md": "人才密度",
    "03-job-family-career-architecture.md": "岗位架构",
    "04-promotion-system.md": "晋升"
  }[topic.file];
  const relevant = day.facts.filter(function (fact) {
    return fact[4] === "四课题" || fact[4].indexOf(topicTag) !== -1;
  });
  const useFacts = relevant.length ? relevant : [[
    "本专题无新增高等级制度证据",
    "截至当日未发现与本专题直接相关的新 L2+ 公司机制；保持历史判断，不以其他专题事实替代证据。",
    urls.gitlab,
    "检索结论，不单独评级",
    topicTag
  ]];
  const topicFreshness = relevant.length
    ? day.freshness
    : "本专题当日无新的 L2+ 公司机制材料；不借用其他专题证据升级判断。";
  const localDay = Object.assign({}, day, { facts: useFacts });
  return [
    "# " + day.date + "｜" + topic.title,
    "",
    "> 研究状态：正式历史补跑核验稿。证据按当日可得时间边界归档；没有新增 L2+ 时明确保持判断不变。只有 L3/L4 可支持强结论。",
    "",
    "## 读者应该带走什么",
    "",
    judgment,
    "",
    "管理层该问：这个动作究竟改变了什么责任、权限、质量和人才结果？不要误读：动作不等于成效，媒体/供应商/JD 信号不等于成熟机制。",
    "",
    "## 今日一句话专题判断",
    "",
    "**" + judgment + "**",
    "",
    "## 今日新增事实",
    "",
    topicFreshness,
    "",
    factsTable(localDay),
    "",
    "## 今日核心判断",
    "",
    "1. **主判断。可信度：中高。** " + judgment,
    "2. **机制含义。可信度：高。** " + topic.meaning,
    "3. **证据边界。可信度：高。** W31 没有内部结果数据或 L4 闭环；单点事实只证明动作和方向。",
    "4. **反事实。可信度：中高。** 如果 AI 是唯一驱动，应出现跨公司一致的层级、岗位、薪酬或晋升变化；本周实际呈现裁减、扩编、集中与自治并存。",
    "",
    "## 判断变化",
    "",
    "- **增强：** 评价单位从工具活动量转向责任、权限、质量、异常、复用、育人和净容量。",
    "- **未改变：** " + judgment,
    "- **削弱：** 任何把单点案例外推为全面扁平、全面全栈或即时 AI 晋升的说法。",
    "",
    "## 重点案例与反例",
    "",
    "- **当周案例：** " + useFacts[0][0] + "。可借鉴其可追溯动作；不可照搬其结构、人员规模或供应商结论。",
    "- **历史基线：** monday.com、美国银行、OpenAI Presence、GitLab 分别提供减层动作、接口系统化、数字岗位契约与晋升校准样本。",
    "- **反例：** WSJ 恢复招聘、OECD 初级岗位边界和 HSCodeComp 专家差距共同反驳统一少人化与全面岗位合并。",
    "- **如果照搬会错在哪里：** " + topic.risks,
    "",
    "## 背景材料（Context）",
    "",
    "- 暂不足以下结论，但提示我们关注：" + topic.risks,
    "- 供应商框架、招聘 JD 和社媒讨论只形成待验证问题，不进入强结论。",
    "- W29/W30 与 7 月 22—23 日材料仅作历史基线，不能重复计为 W31 多源互证。",
    "",
    "## 线索层",
    "",
    "- 获取公司组织图、经理/个人贡献者比例、跨度、权限、薪带和 6—12 个月结果。",
    "- 获取受影响员工的转岗质量、薪酬变化、学习支持、负荷和申诉数据。",
    "- 搜索第二个公开制度样本，验证是否能从单案例升级为稳定机制。",
    "",
    "## 证据地图",
    "",
    "| 层级 | 可用材料 | 本专题用法 |",
    "|---|---|---|",
    "| L3 | 两项以上相互独立的一手/权威材料交叉 | 支持强事实与机制方向，仍不等于成效 |",
    "| L2 | 单一官方/SEC/制度、Reuters、权威研究 | 支持有边界的事实观察，不能证明成效 |",
    "| L1 | 供应商、媒体独家、JD、社媒 | 只作 Context 与搜索入口 |",
    "| L0 | 无法回溯原文的传闻 | 排除 |",
    "",
    "## 行动启发",
    "",
    "- " + topic.meaning,
    "- 建立可回滚试点、停止条件、人工升级、审计日志与事后公平检查。",
    "- CEO 只审批可验证的机制假设，不审批未经责任迁移的统一减层、统一建序列或 AI 自动晋升。",
    "",
    "## 来源索引",
    "",
    links(day.date)
  ].join("\n");
}

function dailyIndex(day) {
  return [
    "<!DOCTYPE html><html lang=\"zh-CN\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1.0\"><title>" + day.date + " AI组织人才日报</title>",
    "<style>body{margin:0;background:#0f1117;color:#eef2fb;font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",\"PingFang SC\",sans-serif;line-height:1.7}main{max-width:1050px;margin:auto;padding:28px 20px 60px}.hero,.card{background:#171a24;border:1px solid #31374b;border-radius:16px;padding:22px}.hero{margin-bottom:16px}.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}h1{font-size:34px}p{color:#b2bad0}a{color:#34d399;text-decoration:none;font-weight:800}.btn{display:inline-block;padding:8px 12px;border:1px solid #31374b;border-radius:8px;margin-right:8px}.card h2{font-size:20px}@media(max-width:720px){.grid{grid-template-columns:1fr}}</style></head><body><main>",
    "<section class=\"hero\"><a class=\"btn\" href=\"../../../index.html\">返回 OD 情报中心</a><h1>" + day.date + "｜四课题正式补跑核验稿</h1><p>" + day.one + "</p><a class=\"btn\" href=\"./00-overview.html\">阅读总览</a></section>",
    "<section class=\"grid\">",
    "<article class=\"card\"><h2>组织扁平化与中层</h2><p>" + dailyTopicJudgment(day, topics.flat) + "</p><a href=\"./01-flat-organization.html\">阅读专题</a></article>",
    "<article class=\"card\"><h2>高人才密度与复合人才</h2><p>" + dailyTopicJudgment(day, topics.talent) + "</p><a href=\"./02-talent-density.html\">阅读专题</a></article>",
    "<article class=\"card\"><h2>岗位、族群、序列</h2><p>" + dailyTopicJudgment(day, topics.job) + "</p><a href=\"./03-job-family-career-architecture.html\">阅读专题</a></article>",
    "<article class=\"card\"><h2>未来晋升机制</h2><p>" + dailyTopicJudgment(day, topics.promotion) + "</p><a href=\"./04-promotion-system.html\">阅读专题</a></article>",
    "</section></main></body></html>"
  ].join("");
}

function weeklyReport() {
  return [
    "# 2026-W31｜AI时代组织与人才机制 CEO 周报",
    "",
    "> 覆盖 2026-07-27 至 2026-08-02。研究状态：正式历史补跑决策稿。W31 内部信息流原始产出为空，本报告通过当周外部一手/权威材料补检、历史基线校准和三类只读代理复盘恢复；不把 W29/W30 旧材料冒充当周新增。全周无 L4。",
    "",
    "## 1. CEO一页纸摘要",
    "",
    "### 本周一句话总判断",
    "",
    "**AI 组织变革没有收敛为“统一少人、统一扁平”，而是收敛为“选择性岗位重配＋责任重写”：退出与重点招聘并存、职业内部任务加速变化、AI 改善证据但不能替代人才裁决；CEO 应先建立责任—权限—质量—净容量账，再决定层级、编制、岗位和晋升。**",
    "",
    "### 本周最重要的 5 个管理判断",
    "",
    "1. **AI 不提供统一减员答案。** Meta 同时披露人员总量下降与 AI 技术招聘/薪酬增长；Visa 裁减约 7%，但 AI 不是唯一原因；同周 WSJ 报道多家企业恢复特定岗位和初级招聘。",
    "2. **工具上线不等于工作方式改变。** Gallup 的当周调查显示，员工感知效率提升远高于工作方式被彻底改变，经理支持显著影响采用价值；压层不能取消采用辅导、责任澄清与例外管理。",
    "3. **岗位变化首先发生在职业内部。** Revelio 称多数变化发生在既有职业的活动组合，支持先重写岗位和技能标签，不支持批量新建 AI 序列。",
    "4. **AI 可以改善人才证据，但不能自动做人才裁决。** 7 月 30 日预印本显示 AI 面试可能改善信息收集和入职结果；它没有证明模型可以替代录用、晋升、公平审计和申诉。",
    "5. **W31 没有新的公司级 AI 晋升制度。** 固定窗口、受控例外、即时认可分流和人工校准继续是最强基线。",
    "",
    "### 需要 CEO/高管拍板或关注的 3 个问题",
    "",
    "1. 是否先在 2—3 条流程按风险分层试行责任—权限—质量—净容量账，90 天后再决定是否扩面？",
    "2. 是否授权一个 AI 原生小队和一个岗位六路由/稀缺定价试点，禁止用新 title 或晋升解决短期薪酬问题？",
    "3. 是否明确 AI 在人才决策中的用途红线：只做证据检索、结构化和缺口提示，不做推荐、排序、潜力推断与最终裁决？",
    "",
    "### 本周建议推进的 3 个动作",
    "",
    "1. 在一条低至中风险流程启动 8—12 周责任—权限—质量—净容量试点，不先裁岗。",
    "2. 选择 10—20 名候选人试跑复合型人才责任包，加入质量、异常、复用、带教、负荷和失败学习。",
    "3. 对所有 AI 新角色申请执行岗位六路由，并为技能标签、稀缺系数和项目角色设置 6—12 个月退出条款。",
    "",
    "### 最大风险与最大机会",
    "",
    "- **最大风险：** 把裁员写成 AI 因果、把活动量写成价值、把新头衔写成序列、把模型评分写成晋升证据，最终制造隐性中层、关键人依赖、初级断层和信任债。",
    "- **最大机会：** 用同一份责任账把组织、人才、岗位和晋升联成经营系统，让每次 AI 改造都能回答释放了什么、由谁负责、质量如何守、容量投向哪里、谁获得回报、谁得到成长。",
    "",
    "## 2. 本周最高置信结论",
    "",
    "| 结论 | 来源与可信度 | 相较 W30 | 为什么重要 | 对管理层意味着什么 |",
    "|---|---|---|---|---|",
    "| AI 不是统一少人化变量，退出与重点增投并存 | Meta 官方财报 L3；Visa/Reuters、WSJ L2 | 修正并增强边界 | 防止以单一 AI 替代率决定编制 | 拆开退出岗位、增投岗位、关键人才定价和初级人才管道 |",
    "| 工具采用量不是绩效、晋升或组织成效 | AP Token 成本反例、Gallup 原始调查；L2 | 增强并校准指标 | 防止用调用量、在线时长制造行为游戏 | 把采用量降为诊断输入，以结果、质量、成本、风险和复用评价贡献 |",
    "| 任务级变化应先于新序列决策 | Revelio L1-L2＋OECD/ACL 两项独立 L2 历史基线；综合 L2-L3 | 增强方法边界 | 旧岗位会变，不等于职业整体消失 | 先做任务分析与岗位/标签试验，再考虑新族群序列 |",
    "| AI 可标准化信息收集，但人才裁决必须保留人工校准 | AI 面试预印本＋GitLab 公开制度；两项独立 L2 | 增强 | 提升证据质量与自动裁决不是一回事 | 明确用途限制、人工推翻、更正和申诉 |",
    "| 本周没有成熟新序列或新 AI 晋升制度 | 全周检索＋内部库审计；检索结论 | 未改变 | 避免以完整报告外观掩盖证据空窗 | 暂缓统一建序列、即时 AI 晋升 |",
    "",
    "## 3. 本周日报回顾",
    "",
    "- **7/27：控制权重配与招聘反例。** 国内大厂案例显示集中模型中枢、保留业务自治、用收益权留才；WSJ 显示部分企业恢复招聘。",
    "- **7/28：裁减与增长冲突被量化。** Visa 裁减技术/产品岗位，Revelio 同时给出高暴露岗位需求下降和成功采用者扩编。",
    "- **7/29：Meta 提供本周最强 L3。** 官方披露显示总量下降、AI 技术招聘和技术人才薪酬增长并存；但仍没有新的成熟晋升制度。",
    "- **7/30：AI 面试论文的新 arXiv 版本。** 机器可以改善结构化信息收集，但实验更早完成，公平、例外和最终决定仍需人负责。",
    "- **7/31：过渡期不是成效验收。** Intuit 支持期结束只证明执行节点；腾讯外部培养项目可借鉴能力认证与招聘漏斗，但不等于内部晋升制度。",
    "- **8/1：动态稀缺目录。** 上海目录生效提示稀缺可由目录、标签、培养和引才政策承接，不等于企业永久建序列。",
    "- **8/2：结论冻结。** 四课题共同收敛到责任—权限—质量—净容量账；没有 L4。",
    "",
    "## 4. 四大课题聚合复盘",
    "",
    "### 4.1 组织扁平化与中层减少",
    "",
    "**本周新增事实：** Meta 官方披露人员总量下降与 AI 技术招聘/薪酬增长并存；Visa 裁减约 2,600 人，主要涉及技术与产品，AI 加速转型但不是唯一原因。36氪关于阿里、腾讯、字节的组织叙事仅为 L1 案例线索，不进入强结论。",
    "",
    "**判断变化：** 继续削弱“AI 系统性消灭中层”。本周出现的是资源集中、团队重组和局部减员，并没有经理净减少、跨度、速度、质量和员工结果闭环。",
    "",
    "**重点案例：** Visa 可借鉴“效率后再投资”议题，不可把裁减直接写成 AI ROI；腾讯可借鉴中枢与业务自治双层结构，不可忽略重复投入和成本仲裁。",
    "",
    "**管理启发：** 先删除低价值信息接口，再迁移结果、资源、质量、异常、育人和申诉；管理跨度按例外负荷和风险半径实测。",
    "",
    "**CEO 关注：** 被删的是中转还是控制点？新的直接责任人是否拥有预算、停止权、质量叫停和申诉承接？",
    "",
    "**仍需验证：** Visa 转岗与 180 天结果；阿里/腾讯/字节公司确认、组织图、经理比例、成本和产品结果。",
    "",
    "### 4.2 高人才密度与复合型人才",
    "",
    "**本周新增事实：** Meta 在总量收缩中继续招聘并提高 AI 技术人才薪酬；WSJ 报道部分企业恢复初级与特定岗位招聘；Revelio 称成功采用 AI 的企业就业增长；字节特殊股权为人才收益权提供 L1 信号。",
    "",
    "**判断变化：** 高人才密度不等于少招人；它是复合骨干、高后果专家和早期人才入口共同构成的供给系统。",
    "",
    "**重点案例：** 字节可借鉴业务挂钩收益权，不可在公司制度未核验时照搬；WSJ 的恢复招聘是反例，不代表所有行业回暖。",
    "",
    "**管理启发：** 用真实责任包识别人才，把基本薪酬、稀缺津贴、项目奖、股权和晋升分流；同步管理关键人负荷、备份与资产回收。",
    "",
    "**CEO 关注：** AI 红利是否被员工和团队分享？如果初级入口被切断，两年后的专家和经理从哪里来？",
    "",
    "**仍需验证：** 业务股权覆盖范围、估值和公平；复合人才薪带、留存、负荷与导师数据。",
    "",
    "### 4.3 岗位、族群、序列",
    "",
    "**本周新增事实：** Revelio 观察到多数变化发生在既有职业内部活动组合；上海紧缺技能目录生效提供动态分类工具。",
    "",
    "**判断变化：** 增强“岗位内重写优先于新序列”；应用责任变宽与安全、评测、数据和治理专家变深继续并存。",
    "",
    "**重点案例：** Revelio 支持任务层分析但属于自有数据；上海目录支持动态稀缺信号但不是企业 job family。",
    "",
    "**管理启发：** 统一六路由：既有岗位调整、族群、序列、技能标签、项目角色、薪酬/稀缺工具；拒绝新增是评审结果。",
    "",
    "**CEO 关注：** 新 title 背后究竟是永久责任、快变技能、阶段项目还是关键人定价？",
    "",
    "**仍需验证：** FDE、评测、安全、治理岗位连续 12—24 个月的编制、等级、薪带和内部流动。",
    "",
    "### 4.4 未来组织的晋升机制",
    "",
    "**本周新增事实：** 7 月 30 日 AI 面试预印本提供信息收集标准化的实验证据；没有新的公司公开 AI 晋升字段。",
    "",
    "**判断变化：** AI 可辅助证据，不可裁决；固定窗口、受控例外与即时认可继续分流。",
    "",
    "**重点案例：** AI 面试实验可借鉴结构化信息收集，不可外推到晋升；GitLab 仍是制度基线，不代表行业普遍效果。",
    "",
    "**管理启发：** 即时认可/项目奖，60—180 天临时扩大职责，正式晋升三层承接；AI 贡献包加入反事实、质量、事故、复用、育人和持续时间。",
    "",
    "**CEO 关注：** 周期外晋升的责任门槛、审批、事后公平审计和申诉由谁负责？",
    "",
    "**仍需验证：** 第二家公司公开制度、GitLab 周期外通过率与群体差异、AI 面试公平和人工推翻。",
    "",
    "## 5. 跨课题综合判断",
    "",
    "**联动链：工作流重写 → 协调接口变化 → 责任与权限迁移 → 质量/例外控制 → 净容量再投资 → 岗位编码 → 人才识别配置 → 可审计贡献 → 薪酬/认可/晋升分流。**",
    "",
    "- 必须联动：压层与权责/育人；人才密度与早期入口/负荷；新序列与薪带/退出；AI 贡献与用途限制/申诉。",
    "- 可独立先做：取消采用量结果属性、建立责任账、执行岗位六路由、给晋升材料增加 AI 贡献字段但不改变窗口。",
    "- 单独推进会出问题：只压层会出现隐性中层；只追明星会出现关键人依赖；只建序列会出现 title inflation；只加速晋升会破坏公平与预算。",
    "",
    "## 6. CEO决策议题清单",
    "",
    "### 需要立即决策",
    "",
    "1. **建立责任—权限—质量—净容量闸门。** 背景：裁减与扩编并存且全周无 L4。选项 A：继续按采用率/节时审批，速度快但不可审计；B：按风险分层，在 2—3 条流程试行 90 天责任账；C：全公司立即强制，口径统一但可能造成治理拥堵。**推荐 B**，不是直接上 C。风险：低风险创新被流程拖慢。下一步：COO 与 CHRO 两周内定义低/中/高风险阈值、豁免和 90 天复盘。",
    "2. **明确 AI 人才决策用途边界。** 选项 A：允许模型推荐/排序，效率高但错误归因与合规风险高；B：完全禁用 AI，风险低但会失去检索与结构化价值；C：低风险证据整理可用、推荐/排序/潜力推断禁用，高风险场景只在沙箱评估。**推荐 C**。风险：过严会催生影子工具。下一步：CHRO、法务、数据治理发布用途清单、授权工具、人工推翻和抽样审计。",
    "",
    "### 需要授权试点",
    "",
    "1. **AI 原生小队/实战型教练管理者试点。** 推荐一个低至中风险流程，8—12 周，可回滚。",
    "2. **复合型人才责任包与激励试点。** 推荐 10—20 人，覆盖招聘、内部试岗和项目认可，不直接改变职级。",
    "3. **岗位六路由与稀缺系数试点。** 推荐一个能力域，技能标签与稀缺系数设置退出条款。",
    "",
    "### 需要继续观察",
    "",
    "1. Visa 裁减是否带来速度、质量和客户结果，还是主要成本重配。",
    "2. 字节业务股权是否形成可复制、公平和长期有效的人才机制。",
    "3. AI 面试实验的公平差异、同行评审和跨场景复现。",
    "",
    "## 7. 建议试点方案",
    "",
    "| 试点 | 目标 | 范围/周期 | Owner | 成功指标 | 风险控制 |",
    "|---|---|---|---|---|---|",
    "| AI 原生小队 | 删除一个重复中转接口并验证责任承接 | 选一条每周 ≥100 单、已有 8 周稳定基线的低中风险流程；8—12 周 | 业务一号位（结果）＋COO/OD（机制）＋运营分析（数据） | 相对前 4 周/匹配流程：周期 -20%；返工不升超 2pct；严重事故 0；经理工时不升超 10% | 不先裁岗；第 0/4/8/12 周评审；严重事故、返工升 ≥5pct 或人工升级积压即暂停回滚 |",
    "| 复合型人才责任包 | 识别能关闭结果与风险的人 | 一个岗位族群、10—20 人；与上两期同类项目作基线；90 天 | CHRO（规则）＋业务负责人（任务）＋HR Analytics（数据） | 双人独立评审一致率 ≥80%；90 天责任达标率较基线 +10pct；带教与复用证据齐全；申诉 10 个工作日内关闭 | 不用工具活动量；盲化首轮材料；关键人须有备份；群体差异恶化或申诉无法闭环即暂停任命用途 |",
    "| 岗位六路由/稀缺定价 | 降低新序列冲动 | 选未来 90 天预计 ≥15 个新角色申请的能力域；8—12 周 | HR COE（路由）＋财务BP（预算）＋业务HR（SLA） | 90% 申请 10 个工作日内分流；新序列申请 -50%；招聘周期不恶化超 10%；接受率、保留和公平争议不劣于基线 | 技能/津贴 6—12 月退出；第 4/8/12 周复审；关键岗位因流程丢失候选或超 SLA 两次即调整闸门 |",
    "",
    "**共同里程碑：** 第 0 周冻结对象、基线、对照和数据字典；第 4 周只看安全与执行偏差；第 8 周决定继续/收缩；第 12 周由财务、业务、HR 与风险共同验收。未达到阈值不得转成减编、建序列或正式晋升。",
    "",
    "## 8. 重点案例事实还原",
    "",
    "### 国内公司",
    "",
    "- **阿里：** 模型、云、办公智能体反复归拢，目标是缩短能力到产品/收入链路；争议是研究、产品、云商业化节奏冲突。可借鉴公司级资源仲裁；不可照搬频繁改线。",
    "- **腾讯：** 基础模型统一指挥，核心业务保留自研/外采和产品自主权；可借鉴中枢＋自治，不能忽略重复投入和 Token 成本。",
    "- **字节：** Seed 集中、产品高速迭代，并用“豆包股”媒体所述特殊激励回应人才外流；可借鉴收益权，制度未核验前不可照搬。",
    "",
    "### 海外公司",
    "",
    "- **Visa：** 7/28 确认裁减约 2,600 人，主要技术/产品；AI 是提效因素但非唯一原因。没有前后组织图、转岗和结果。",
    "- **Alphabet/CSX/Booz Allen 等：** WSJ 记录恢复或加速特定招聘，说明 AI 与增员可并存；不可外推为全面招聘复苏。",
    "",
    "### AI 原生公司",
    "",
    "- **OpenAI Presence/Replit 历史基线：** 数字岗位与人机工作流需要最小权限、审批、人工接管、审计和升级；不可把自报产出当独立 ROI。",
    "",
    "### 传统企业/公共机制",
    "",
    "- **上海紧缺目录：** 用动态目录连接培养与引才；可借鉴快变信号，不可把政策职业目录直接复制成企业序列。",
    "",
    "## 9. 本周Context",
    "",
    "- 暂不形成结论，但提示我们关注：模型中枢集中与业务自治可能同时发生，“扁平”不是唯一维度。",
    "- 暂不形成结论，但提示我们关注：特殊股权可能成为大厂对抗创业收益的工具，需核覆盖、公平、估值和退出。",
    "- 暂不形成结论，但提示我们关注：员工社区把多起裁员归因于 AI，但公司战略、宏观成本和并购同样是解释变量。",
    "- 暂不形成结论，但提示我们关注：供应商技能画像正在扩展到 360、认证与真实工作历史，尚缺预测效度和偏差结果。",
    "",
    "## 10. 准确性校验与修正",
    "",
    "- **修正 W30 覆盖口径：** 当前仓库显示 7/20—7/23 有正式专题稿，7/24 未达到正式决策稿标准；W30 写成 2/5 低估了现存覆盖。该修正不把历史材料计作 W31 新增。",
    "- **修正容量账：** 增加验证、纠错、人工升级、经理负荷、学习成本和响应激励，得到净容量而非毛节时。",
    "- **修正“人在回路”：** 责任必须匹配知识、时间、异议/否决权和暂停/回滚能力。",
    "- **修正岗位路由：** 固定为既有岗位调整、族群、序列、技能标签、项目角色、薪酬/稀缺工具；拒绝新增不是第七类。",
    "- **削弱单点趋势：** Visa、字节股权、AI 面试和供应商技能框架都不足以单独形成行业结论。",
    "",
    "## 11. 机制库更新",
    "",
    "1. **组织架构：** 中枢—自治边界表，记录公共能力、业务选择权、资源仲裁、成本和退出。",
    "2. **岗位序列：** 六路由＋稳定责任/三级梯度/薪带/流动/退出闸门。",
    "3. **高人才密度：** 责任包＋关键人上限＋备份＋资产回收＋导师负荷。",
    "4. **招聘识别：** AI 结构化信息＋人工标准/例外/公平复核；禁止自动淘汰和潜力推断。",
    "5. **激励保留：** 基础薪酬、稀缺津贴、项目奖、股权刷新和晋升分流。",
    "6. **晋升机制：** 即时认可、临时扩大职责、正式晋升三层承接。",
    "7. **沟通落地：** 说明为什么改、停止什么、谁负责、谁受影响、支持什么、何时复盘、如何申诉。",
    "8. **风险治理：** 数据用途限制、审计日志、人工推翻、更正、申诉与事后群体公平检查。",
    "",
    "## 12. 行动建议",
    "",
    "- **立即可做：** 降级采用量指标；发布责任账和岗位六路由模板。",
    "- **需要试点：** 三项试点见第 7 节。",
    "- **需要高层共识：** AI 转型是责任与经营系统重写，不是裁员项目；人才数据不得跨用途漂移。",
    "- **需要数据验证：** 组织图、跨度、净容量、质量、员工体验、转岗、薪带、晋升和留任。",
    "- **需要暂缓：** 统一减员率、新 AI 序列、用 AI 分数直接晋升、无退出条款的长期稀缺津贴。",
    "",
    "## 13. 风险与反例",
    "",
    "1. **照搬 Visa 会错：** 不知道其业务、成本、转岗和结果，裁减人数不是组织设计模板。",
    "2. **照搬腾讯双轨会错：** 多模型与多产品路线需要强成本核算和资源仲裁，否则重复投入。",
    "3. **照搬字节特殊股权会错：** 业务估值、覆盖与内部公平不透明，可能制造新的等级和留才争议。",
    "4. **照搬 AI 面试会错：** 一个场景的录用/留任结果不证明跨群体公平，也不证明适用于晋升。",
    "5. **只追复合型人才会错：** 关键人依赖、知识不回流、初级断层和导师过载会吞噬短期红利。",
    "6. **把责任账设成全公司统一总闸门也会错：** 无差别审批会让低风险试验排队、业务绕开治理并制造影子流程；应按风险分层、设 SLA 和豁免，并以 90 天试点决定是否扩面。",
    "7. **把人才用途红线理解为禁用 AI 也会错：** 过严会丢失检索和结构化价值、诱发未授权工具；应提供受控低风险工具，同时禁止推荐、排序、潜力推断和最终裁决。",
    "",
    "## 14. 下周待验证清单",
    "",
    "### CEO 关注项",
    "",
    "- Visa 是否公开受影响岗位、转岗与 180 天结果。",
    "- 国内三家大厂能否确认组织权责、业务股权和成效。",
    "- 是否出现第二家公司公开 AI 晋升字段与人工校准制度。",
    "",
    "### HR/OD 研究项",
    "",
    "- 关键词：中枢—自治、业务股权、AI-native hiring、AI interview fairness、skills evidence、promotion calibration。",
    "- 人物/公司：Ryan McInerney/Visa、姚顺雨/腾讯、吴泳铭/阿里、吴永辉/字节、GitLab、Revelio。",
    "- 文件：组织图、SEC/IR、正式 JD、薪带、人才委员会规则、申诉与公平审计。",
    "",
    "### 业务侧访谈项",
    "",
    "- 哪些协调动作可系统化，哪些例外仍需要经理判断？",
    "- AI 释放的时间扣除验证税后投向哪里？",
    "- 新 title 申请背后是责任、项目还是定价？",
    "- AI 证据由谁更正、谁可推翻、谁承担最终责任？",
    "",
    "## 15. 来源索引与可信度分层",
    "",
    "### 一手材料",
    "",
    "- [monday.com SEC 6-K](" + urls.monday + ")：单一一手 L2 动作，效果未验证。",
    "- [Bank of America EricaAssist](" + urls.boa + ")：单一一手 L2。",
    "- [OpenAI Presence](" + urls.presence + ")：L2 产品/岗位契约。",
    "- [GitLab Promotions and Transfers](" + urls.gitlab + ")：单一一手 L2 公开制度基线。",
    "- [Intuit SEC 附件内部信](" + urls.intuit + ")：单一一手 L2 动作，效果未验证。",
    "- [Meta Q2 2026 官方业绩](" + urls.metaResults + ")：L3。",
    "- [Meta Q2 2026 官方电话会](" + urls.metaCall + ")：L3。",
    "- [腾讯犀牛鸟开源人才培养计划](" + urls.tencentTalent + ")：L2 外部人才项目，不等于内部晋升。",
    "",
    "### 权威二手",
    "",
    "- [Reuters：Visa 裁减约 7%](" + urls.visa + ")：L2。",
    "- [WSJ/Mint：企业重新招聘](" + urls.hiring + ")：L2。",
    "- [36氪：阿里、腾讯、字节 AI 组织动作](" + urls.china + ")：L1，仅作 Context/案例线索。",
    "- [Gallup：AI 采用、经理支持与裁员归因](" + urls.gallup + ")：L2。",
    "- [AP：Token 激励与成本反例](" + urls.tokenmaxxing + ")：L2。",
    "- [AP：Meta Q2 2026 交叉报道](" + urls.metaAp + ")：L2。",
    "",
    "### 行业研究",
    "",
    "- [Revelio AI Labor Market Tracker](" + urls.revelio + ")：L1-L2，专有数据、不能解释因果。",
    "- [Voice AI in Firms 预印本](" + urls.interview + ")：L2，未同行评审。",
    "- [BCG AI at Work 2026](" + urls.bcg + ")：L2，自报调查。",
    "- [OECD Employment Outlook 2026](" + urls.oecd + ")：权威研究 L2 基线。",
    "- [ACL HSCodeComp](" + urls.hscode + ")：同行评审 L2 任务基线。",
    "- [Gartner：AI 人才风险框架](" + urls.gartner + ")：L2 咨询框架。",
    "",
    "### 招聘薪酬信号",
    "",
    "- [HiBob AI Skills Framework](" + urls.hibob + ")：L1-L2。",
    "- [上海急需紧缺高技能人才目录 2026](" + urls.shanghai + ")：单一政策事实 L2。",
    "- 字节“豆包股”仅有媒体材料，列为 L1，不作为正式制度结论。",
    "",
    "### 社媒线索",
    "",
    "- ServiceNow、Visa 等员工社区讨论只进入 Context；不把匿名样本写成公司制度或 AI 因果。",
    "",
    "### 内部信息库/知识库",
    "",
    "- digest.md、daily/、daily-report/、knowledge/、W29/W30、7/20—7/23 正式专题稿。",
    "- 7/24 四专题低质量历史稿排除；同一 URL 跨文件重复引用不计多源互证。",
    "",
    "> 本周结论层没有 L4。L1 只进入 Context 或案例线索，不支持管理结论；L2 支持有边界的事实观察；只有多源交叉后的 L3 机制可进入 CEO 建议。"
  ].join("\n");
}

function quickReport() {
  return [
    "# 2026-W31｜AI时代组织与人才机制 CEO 快速导读",
    "",
    "> 正式历史补跑决策稿。覆盖 2026-07-27 至 2026-08-02；全周无 L4。",
    "",
    "## CEO 一句话",
    "",
    "**AI 组织变革没有收敛为统一少人化，而是选择性岗位重配与责任重写；先建责任—权限—质量—净容量账，再决定层级、岗位与晋升。**",
    "",
    "## 5 个判断",
    "",
    "1. Visa 裁减与企业恢复招聘并存，AI 不是统一减员答案。",
    "2. Gallup 与 AP 的反例说明，工具采用量不能替代工作重构、绩效或晋升证据。",
    "3. 工作首先在职业内部重写，先调岗位和标签，不急着建序列。",
    "4. AI 可改善人才证据，不能自动推荐、排序、晋升或裁决。",
    "5. 本周没有新的成熟 AI 晋升制度，也没有 L4 成效证据。",
    "",
    "## 需要拍板",
    "",
    "- 授权 2—3 条流程按风险分层试行责任—权限—质量—净容量账，90 天后决定是否扩面。",
    "- 明确 AI 人才决策红线：只检索、结构化和提示缺口。",
    "- 授权 AI 原生小队、复合人才责任包、岗位六路由三项试点。",
    "",
    "## 最大风险",
    "",
    "把裁员写成 AI 因果、把活动量写成价值、把新 title 写成序列、把模型评分写成晋升证据。",
    "",
    "## 入口",
    "",
    "- [完整 CEO 周报](./2026-W31.html)",
    "- [详细资料版](./2026-W31-detailed.html)",
    "",
    "## 来源索引",
    "",
    links()
  ].join("\n");
}

function weeklyIndex() {
  const relative = "specials/ai-org-talent-mechanism/weekly/index.html";
  let source = execFileSync("git", ["show", "HEAD:" + relative], { cwd: root, encoding: "utf8" });
  const w31 = [
    "    <section class=\"section\">",
    "      <h2>2026-W31 周报</h2>",
    "      <div class=\"grid\">",
    "        <article class=\"card\"><span class=\"tag\">快速导读版</span><h3>2026-W31｜控制权与责任重配快速导读</h3><p>结论、拍板事项、三项试点与最大风险。</p><div class=\"actions\"><a class=\"primary\" href=\"./2026-W31-quick.html\">阅读 HTML</a><a href=\"./2026-W31-quick.md\">查看 Markdown</a></div></article>",
    "        <article class=\"card\"><span class=\"tag orange\">CEO 周报</span><h3>2026-W31｜控制权、责任与人才机制联动周报</h3><p>七天五件套历史补跑后，聚合四课题、证据分层、决策议题、案例和机制库。</p><div class=\"actions\"><a class=\"primary\" href=\"./2026-W31.html\">阅读 HTML</a><a href=\"./2026-W31.md\">查看 Markdown</a></div></article>",
    "      </div>",
    "    </section>"
  ].join("\n");
  source = source.replace("当前周：2026-W30", "当前周：2026-W31");
  source = source.replace("快速导读版：可审计组织容量", "快速导读版：控制权与责任重配");
  source = source.replace("CEO 周报：责任、容量与证据链", "CEO 周报：责任、人才与机制联动");
  return source.replace("    <section class=\"section\">\n      <h2>2026-W30 周报</h2>", w31 + "\n\n    <section class=\"section\">\n      <h2>2026-W30 周报</h2>");
}

function insertArrayEntries(source, name, entries) {
  const pattern = new RegExp("(\\s*const " + name + " = \\[\\n)");
  if (!pattern.test(source)) throw new Error("Could not find array " + name + " in index.html");
  return source.replace(pattern, "$1" + entries + "\n");
}

function updateHome() {
  const indexPath = path.join(root, "index.html");
  let source = execFileSync("git", ["show", "HEAD:index.html"], { cwd: root, encoding: "utf8" });
  const dates = days.map(function (day) { return day.date; }).sort().reverse();
  const dailyItems = dates.map(function (date) {
    const status = date >= "2026-07-27" ? "已补跑 / 决策稿" : "历史版本";
    return "      {\n        date: '" + date + "',\n        title: 'AI时代组织与人才机制四课题日报',\n        status: '" + status + "',\n        summary: '四专题日报归档，包含总览、证据分层、Context、反例与行动启发。',\n        href: './specials/ai-org-talent-mechanism/" + date + "/index.html'\n      },";
  }).join("\n");
  const weeklyItems = [
    "      {\n        date: '2026-W31',\n        title: 'CEO 快速导读版',\n        status: '已补跑 / 决策稿',\n        summary: '控制权、责任、岗位与人才机制的本周判断和拍板事项。',\n        href: './specials/ai-org-talent-mechanism/weekly/2026-W31-quick.html',\n        markdown: './specials/ai-org-talent-mechanism/weekly/2026-W31-quick.md'\n      },",
    "      {\n        date: '2026-W31',\n        title: 'CEO 详细资料版周报',\n        status: '已补跑 / 决策稿',\n        summary: '四课题证据、案例、反例、机制库与试点方案。',\n        href: './specials/ai-org-talent-mechanism/weekly/2026-W31-detailed.html',\n        markdown: './specials/ai-org-talent-mechanism/weekly/2026-W31-detailed.md'\n      },"
  ].join("\n");
  source = insertArrayEntries(source, "levelsDailyOutputs", dailyItems);
  source = insertArrayEntries(source, "levelsWeeklyOutputs", weeklyItems);
  write(indexPath, source);
}

ensureDir(weeklyDir);

days.forEach(function (day) {
  const dir = path.join(project, day.date);
  ensureDir(dir);
  write(path.join(dir, "00-overview.md"), overview(day));
  Object.keys(topics).forEach(function (key) {
    const topic = topics[key];
    write(path.join(dir, topic.file), topicReport(day, topic));
  });
  execFileSync("node", ["scripts/render-special-html.js", path.relative(root, dir)], { cwd: root, stdio: "inherit" });
  write(path.join(dir, "index.html"), dailyIndex(day));
});

const full = weeklyReport();
const quick = quickReport();
write(path.join(weeklyDir, "2026-W31.md"), full);
write(path.join(weeklyDir, "2026-W31-detailed.md"), full);
write(path.join(weeklyDir, "2026-W31-quick.md"), quick);
write(path.join(weeklyDir, "latest.md"), full);
write(path.join(weeklyDir, "latest-detailed.md"), full);
write(path.join(weeklyDir, "latest-quick.md"), quick);

[
  "2026-W31.md",
  "2026-W31-detailed.md",
  "2026-W31-quick.md",
  "latest.md",
  "latest-detailed.md",
  "latest-quick.md"
].forEach(function (file) {
  execFileSync("node", ["scripts/render-markdown-page.js", "specials/ai-org-talent-mechanism/weekly/" + file], { cwd: root, stdio: "inherit" });
});

write(path.join(weeklyDir, "index.html"), weeklyIndex());
updateHome();
execFileSync("node", ["scripts/generate-topic-project-status.js"], { cwd: root, stdio: "inherit" });
execFileSync("node", ["scripts/enhance-report-sharing.js"], { cwd: root, stdio: "inherit" });

["data/info-feed-status.json", "data/knowledge-status.json"].forEach(function (relative) {
  const baseline = execFileSync("git", ["show", "HEAD:" + relative], { cwd: root, encoding: "utf8" });
  fs.writeFileSync(path.join(root, relative), baseline);
});

console.log("Backfilled W31 daily reports and CEO weekly report.");
