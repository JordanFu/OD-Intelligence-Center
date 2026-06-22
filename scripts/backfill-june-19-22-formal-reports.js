const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const projectRoot = path.join(root, "specials", "ai-org-talent-mechanism");

const dates = ["2026-06-19", "2026-06-20", "2026-06-21", "2026-06-22"];

const sourceCatalog = {
  pwcJobs: {
    label: "PwC 2026 AI Jobs Barometer（二手报道交叉验证）",
    url: "https://www.businessinsider.com/pwc-global-jobs-barometer-ai-advanced-skills-entry-level-jobs-2026-6",
    type: "媒体/报告解读",
    grade: "L3",
    fact: "PwC 基于十亿级招聘广告分析指出，受 AI 影响的美国初级岗位比 2019 年更可能要求过去通常属于资深岗位的能力；相关岗位中新增大量资深能力要求的部分增长 35%，对照岗位下降 10%。",
  },
  investopediaPwc: {
    label: "Investopedia 对 PwC 报告的二次核验",
    url: "https://www.investopedia.com/entry-level-jobs-now-want-senior-skills-as-ai-splits-the-workforce-new-study-says-11998894",
    type: "媒体/报告解读",
    grade: "L3",
    fact: "报道复核 PwC 样本口径：27 个国家、十亿级招聘广告、美国 240 万个初级岗位；受 AI 影响的初级岗位更强调领导力、流程管理、辅导、数据化决策等能力。",
  },
  ftSenior: {
    label: "Financial Times：AI 正在让初级岗位高级化",
    url: "https://www.ft.com/content/22bdc93e-ac75-409f-a1e0-cd3617d1d9e4",
    type: "权威媒体",
    grade: "L3",
    fact: "FT 将 PwC 报告解读为“初级岗位高级化”：0—2 年经验岗位开始要求管理、策略、决策和人际协同能力。",
  },
  pwcChair: {
    label: "PwC 全球主席 Mohamed Kande 访谈",
    url: "https://www.businessinsider.com/big-four-pwc-mohamed-kande-ai-impact-jobs-2026-6",
    type: "高管访谈",
    grade: "L3",
    fact: "Kande 认为大规模采用 AI 的企业并未简单裁员，而是在增加能够把 AI 落地到业务中的人才；PwC 同时为工程师建立不同于会计和咨询的职业路径。",
  },
  payrolls: {
    label: "arXiv：Payrolls to Prompts",
    url: "https://arxiv.org/abs/2602.00139",
    type: "学术论文",
    grade: "L2",
    fact: "研究跟踪 2021 年三季度至 2025 年三季度企业在在线劳务市场与 AI 模型供应商上的支出，发现对在线劳务依赖越高的企业越早采用 AI，并减少外部劳务支出。",
  },
  anthropicCorps: {
    label: "AP：Anthropic 推出 Claude Corps",
    url: "https://apnews.com/article/b1c130a08417d13e1256f8982d233b0e",
    type: "媒体/公司项目",
    grade: "L2",
    fact: "Anthropic 投入 1.5 亿美元，让 1000 名早期职业阶段人员接受 Claude 训练，并进入 400 家美国非营利组织，每家机构获得 1 万美元资助和 Claude 使用额度。",
  },
  anthropicSecurity: {
    label: "Business Insider：白宫与 Anthropic 讨论 AI 安全评估框架",
    url: "https://www.businessinsider.com/white-house-talks-anthropic-ai-security-rules-2026-6",
    type: "媒体/政策线索",
    grade: "L2",
    fact: "双方讨论用统一框架评估 AI 安全风险，指标包括防护绕过程度、潜在滥用能力和现实影响。",
  },
  ftBankTesting: {
    label: "Financial Times：英国讨论银行 AI 模型统一测试",
    url: "https://www.ft.com/content/3053b547-5e55-4520-9b95-828c417a5d79",
    type: "权威媒体/监管线索",
    grade: "L2",
    fact: "英国金融监管相关讨论提出，对银行使用的通用 AI 模型建立统一测试机制，背景是英格兰银行担忧模型评估不足、监测频率不够。",
  },
  kpmgFinance: {
    label: "KPMG 财务 AI 调研报道",
    url: "https://www.techradar.com/pro/ai-is-no-longer-a-future-concept-but-an-operational-reality-new-kpmg-report-claims-firms-are-racing-to-deploy-ai-but-need-to-ensure-they-have-the-right-security-protections",
    type: "咨询报告报道",
    grade: "L2",
    fact: "KPMG 报道显示，财务场景中的 AI 已进入运营阶段，企业主要难点包括岗位场景识别、练习环境、安全隐私、模型可靠性、监管合规。",
  },
  lloyds: {
    label: "The Guardian：Lloyds 招募 300 名 AI 技术专家",
    url: "https://www.theguardian.com/business/2026/jun/20/lloyds-banking-group-ai-recruitment-drive-300-tech-experts",
    type: "权威媒体/企业案例",
    grade: "L3",
    fact: "Lloyds 计划到 2026 年 9 月招聘 300 名技术专家，加入约 1000 人的 AI 团队；其 2025 年生成式 AI 收益约 5000 万英镑，2026 年目标约 1 亿英镑，同时承认未来可能出现由 AI 引发的岗位削减。",
  },
  kpmgBanks: {
    label: "The Guardian 引述 KPMG 银行业 AI 韧性调查",
    url: "https://www.theguardian.com/business/2026/jun/20/lloyds-banking-group-ai-recruitment-drive-300-tech-experts",
    type: "咨询调查/媒体引述",
    grade: "L2",
    fact: "KPMG 调查中，93% 英国银行高管认为重大 AI 中断时业务仍能运行，但只有 47% 做过一次 AI 中断测试，26% 没做过测试。",
  },
  itproPwc: {
    label: "ITPro：AI 技能薪酬溢价与双轨劳动力市场",
    url: "https://www.itpro.com/technology/artificial-intelligence/ai-is-creating-a-two-track-labor-market-with-better-pay-for-human-intensive-skills",
    type: "媒体/报告解读",
    grade: "L3",
    fact: "基于 PwC 报告，具备 AI 相关技能的岗位薪酬溢价达到 62%；专业化岗位增长约为普及化岗位两倍，薪酬增长快 42%。",
  },
};

const reportData = {
  "2026-06-19": {
    title: "初级岗位高级化与人才入口再设计",
    oneLine: "AI 没有简单取消初级岗位，而是把原本用于训练新人的低复杂度任务压缩掉，迫使企业重新设计人才入口、学徒机制和初级岗位的评价标准。",
    sources: ["pwcJobs", "investopediaPwc", "ftSenior", "pwcChair", "payrolls", "anthropicCorps"],
    findings: [
      ["初级岗位正在被重新定价", "PwC、FT 与 Investopedia 的交叉报道共同指向：受 AI 影响的初级岗位不再只要求执行能力，而是提前要求流程管理、利益相关方协同、判断力和辅导能力。可信度高，因为样本口径大、媒体交叉一致。"],
      ["“高人才密度”不能只理解为少招人", "PwC 全球主席的表述与报告数据都显示，采用 AI 更深的企业人员规模仍在增长；真正变化是企业需要能把 AI 嵌入业务的人。可信度中高，因为来自高管访谈与报告数据，但企业样本差异仍需继续验证。"],
      ["人才入口需要从校园批量招聘转向项目化培养", "Anthropic 的 Claude Corps 提供一个弱信号：企业可能用训练、任务派驻、资助和工具额度组合出新的外部人才入口。可信度中等，因为它是专项公益项目，不能直接等同企业常规招聘。"],
      ["外部低复杂度劳务可能先被替代", "Payrolls to Prompts 显示企业减少在线劳务支出并增加模型支出，提示被压缩的未必先是正式员工，而可能是可标准化、可外包的执行性工作。可信度中等，因为样本来自在线劳务市场。"],
    ],
    context: [
      "暂不形成结论，但提示我们关注：如果初级岗位承担的重复任务被 AI 吸收，企业必须主动补回训练场景，否则三年后会出现中层断档。",
      "暂不形成结论，但提示我们关注：所谓复合型人才不是“什么都会一点”，而是能把工具、流程、业务判断和责任闭环串起来。",
      "暂不形成结论，但提示我们关注：AI 训练项目、专项项目人才、内部转岗训练，可能成为替代传统校招漏斗的新入口。",
    ],
    chinaCase: "今日无新增中国公司一手制度材料。对中国企业的可迁移启发是：不要把“AI 时代校招减少”直接等同于“不培养新人”，而要把新人培养拆成项目任务、导师责任、AI 工具使用证据和复盘机制。",
    globalCase: "PwC、Anthropic 与在线劳务市场研究共同构成一组海外信号：岗位初级门槛被抬高，外部劳务被重新配置，企业开始用训练项目和新职业路径补齐能力供给。",
    action: [
      "战略：把“新人少招”改写成“新人如何更快进入高价值任务”。",
      "岗位：初级岗位说明书增加业务判断、工具使用、流程复盘和协作证据，不只写工具熟练。",
      "职级：保留初级职级，但重写晋升证据，避免直接把初级岗位改成准资深岗位。",
      "薪酬：对能把 AI 嵌入流程并形成复用资产的人设置能力溢价，不靠头衔膨胀解决激励。",
      "激励：用项目奖金、导师津贴和复用资产奖励补足培养成本。",
    ],
    leads: [
      "继续追踪 PwC 报告原文中各行业、各国家的岗位族群差异。",
      "查找 Anthropic Claude Corps 后续是否形成转录用、认证或企业合作招聘机制。",
      "对比咨询、金融、软件公司是否同步减少初级岗位数量并提高技能要求。",
    ],
  },
  "2026-06-20": {
    title: "人机混合治理从岗位能力进入风险规则",
    oneLine: "AI 组织改革正在从“谁会用工具”进入“谁对模型风险、流程例外、成本和业务后果负责”的阶段，岗位族群设计必须把治理责任写进工作本身。",
    sources: ["anthropicSecurity", "ftBankTesting", "kpmgFinance", "kpmgBanks"],
    findings: [
      ["AI 安全正在形成跨企业、跨监管的共同语言", "白宫与 Anthropic 讨论统一风险评估框架，英国银行业讨论模型统一测试，说明模型风险不再只是技术团队内部问题。可信度中等，因为目前多为政策和监管讨论。"],
      ["高风险业务不适合只靠岗位新增解决", "银行、财务和安全场景的共同信号是：企业需要明确测试、监测、例外处理和最终责任，而不是简单新增一个“AI 治理岗”。可信度中高，因为多个行业材料方向一致。"],
      ["管理者角色没有消失，而是变成规则拥有者", "当 AI 进入流程，管理者的价值从分配任务转向定义节奏、标准、授权边界和反馈回路。可信度中等，基于多源趋势推断。"],
      ["财务与银行场景暴露出落地缺口", "KPMG 报道的企业难点集中在场景识别、练习环境、安全隐私、可靠性和合规；银行业韧性测试不足说明很多组织还停留在信心而非验证。可信度中等。"],
    ],
    context: [
      "暂不形成结论，但提示我们关注：AI 风险管理可能需要成为所有关键岗位的责任标签，而不是单独成立一个孤岛式序列。",
      "暂不形成结论，但提示我们关注：统一测试、独立评估和中断演练会倒逼岗位说明书增加“可审计、可解释、可追责”的要求。",
      "暂不形成结论，但提示我们关注：成本可见性可能成为新的管理责任，AI 预算不能只挂在技术团队。", 
    ],
    chinaCase: "今日无新增中国公司可核验案例。对中国企业的提示是：在金融、教育、医疗、招聘等高风险场景中，岗位变革要优先回答责任链，而不是优先追逐新头衔。",
    globalCase: "Anthropic、英国银行监管讨论与 KPMG 财务调研共同显示：人机混合组织的关键不只是能力，而是风险分级、测试机制、授权边界和成本归属。",
    action: [
      "战略：把 AI 治理视为运营能力，不只是合规附件。",
      "岗位：关键岗位增加模型使用边界、异常升级、人工复核和证据留存责任。",
      "职级：高级岗位评价加入风险判断、规则制定和跨团队协同，而不是只看自动化数量。",
      "薪酬：对承担高风险治理责任的岗位给责任津贴或项目激励，不随意新设序列。",
      "激励：奖励减少风险和形成标准的人，不奖励单纯调用工具的人。",
    ],
    leads: [
      "追踪英国银行 AI 模型统一测试是否由监管机构或独立机构落地。",
      "查找企业是否把 AI 风险责任写进绩效考核、岗位说明或管理者手册。",
      "补充高风险行业中 AI 审计、模型评测、数据治理岗位的薪酬溢价证据。",
    ],
  },
  "2026-06-21": {
    title: "AI 专家队伍扩张与岗位压缩并存",
    oneLine: "企业正在同时做两件看似矛盾的事：扩大 AI 专家队伍、压缩低复杂度岗位；这说明执行层分工会合并，但核心专家能力会继续深化并获得溢价。",
    sources: ["lloyds", "kpmgBanks", "itproPwc", "pwcChair", "pwcJobs"],
    findings: [
      ["专家队伍扩张不是反例，而是结构变化的一部分", "Lloyds 招募 300 名技术专家并建设约 1000 人 AI 团队，说明企业在减少传统执行成本的同时，会集中投入模型、平台、智能体和风险治理能力。可信度高，来自权威媒体企业案例。"],
      ["AI 收益与岗位削减会同时出现", "Lloyds 披露生成式 AI 已带来财务收益，并承认未来可能出现由 AI 引发的岗位削减；这支持“低复杂度任务被压缩、专家能力被强化”的双轨判断。可信度中高。"],
      ["薪酬溢价应跟能力稀缺绑定，而不是跟头衔绑定", "PwC 相关报道显示 AI 技能溢价显著，专业化岗位薪酬增长更快；这支持用市场稀缺系数、专项津贴和项目激励处理差异，而不是无限新增岗位族群。可信度高。"],
      ["银行业的信心与演练存在缺口", "KPMG 调查显示高管对 AI 中断韧性有信心，但实际演练不足；这说明专家岗位不仅要能建设系统，还要能组织演练和应急。可信度中等。"],
    ],
    context: [
      "暂不形成结论，但提示我们关注：金融企业可能会先把 AI 专家集中在平台、风控、客户体验和内部知识检索场景。",
      "暂不形成结论，但提示我们关注：如果专家队伍扩张没有与业务岗位责任重写同步，AI 团队容易变成新的中台瓶颈。",
      "暂不形成结论，但提示我们关注：岗位压缩先发生在可标准化、可替代、证据链短的工作，而不是所有低职级岗位。",
    ],
    chinaCase: "今日无新增中国公司一手案例。对中国公司有直接启发的是：不要把 AI 专家团队当作万能中台，必须同步改业务岗位的责任边界和复用机制。",
    globalCase: "Lloyds 是今日关键案例：它一边扩 AI 专家队伍，一边公开承认 AI 可能影响岗位数量，提供了“专家深化 + 执行合并”的典型证据。",
    action: [
      "战略：明确哪些能力必须集中建设，哪些能力必须嵌入业务岗位。",
      "岗位：新建专家岗位只限模型平台、智能体工程、安全评测、数据治理等深水区。",
      "职级：业务岗位合并时扩大职责范围，但专家岗位要保留深度评价标准。",
      "薪酬：用市场稀缺系数解决 AI 专家溢价，用职责范围解决业务岗位合并。",
      "激励：对专家团队设置业务收益、复用资产和风险稳定性共同指标。",
    ],
    leads: [
      "继续追踪 Lloyds 300 名专家的岗位类型、职级分布和薪酬口径。",
      "查找银行业 AI 团队是否出现从数字化中台转向智能体平台团队的组织调整。",
      "补充 AI 安全评测、智能体工程、数据治理岗位的招聘需求和薪酬数据。",
    ],
  },
  "2026-06-22": {
    title: "四日补跑总判断：真正缺的是运行责任链",
    oneLine: "6 月 19 日至 22 日的新增证据共同说明：AI 组织改革的主线不是新增多少岗位名称，而是重写人才入口、专家深度、业务责任、风险治理和激励分配的运行责任链。",
    sources: ["pwcJobs", "investopediaPwc", "lloyds", "itproPwc", "anthropicSecurity", "ftBankTesting", "kpmgFinance", "payrolls"],
    findings: [
      ["执行层工作正在合并，高复杂度责任前移", "PwC 相关材料显示初级岗位开始要求过去属于资深角色的能力，这与岗位颗粒度变粗、端到端负责增强的假设一致。可信度高。"],
      ["核心专家能力仍在继续拆分并获得溢价", "Lloyds 扩大 AI 专家队伍、PwC 报告中的 AI 技能溢价、银行模型测试讨论共同构成反例：平台、治理、评测、安全、数据能力不会被合并掉。可信度中高。"],
      ["岗位体系问题经常是激励和定价问题", "AI 技能溢价、专业化岗位更快薪酬增长和专家团队扩张说明，很多“新增序列”诉求背后是关键能力的市场定价缺口。可信度高。"],
      ["自动化本身也需要责任机制", "过去几天页面出现非决策稿占位，说明情报生产不能只依赖触发器；必须把证据门槛、质量门禁、补跑责任和页面发布状态分开。可信度高，来自本项目自身运行复盘。"],
    ],
    context: [
      "暂不形成结论，但提示我们关注：AI 时代的组织改革不是扁平化口号，而是减少交接、提高责任密度，同时把关键专家能力做深。",
      "暂不形成结论，但提示我们关注：如果薪酬架构不承认 AI 稀缺能力，业务就会用新增头衔、虚高职级和例外审批来绕开规则。",
      "暂不形成结论，但提示我们关注：情报中心页面必须明确区分正式决策稿、补跑稿、占位记录和待验证线索。",
    ],
    chinaCase: "本日为补跑整合日，未新增中国公司个案。后续要补齐国内互联网、金融、教育企业在 AI 岗位合并、专家序列、薪酬溢价和项目激励方面的一手材料。",
    globalCase: "海外证据形成较清晰链条：PwC 解释岗位能力变化，Lloyds 呈现专家队伍扩张，KPMG 与英国金融监管线索呈现治理缺口，Payrolls to Prompts 呈现外部低复杂度劳务被替代。",
    action: [
      "战略：先定义哪些工作要端到端负责，哪些专家能力必须集中建设。",
      "岗位：执行岗位可合并，专家岗位不宜粗暴合并。",
      "职级：业务通道强调责任范围，专家通道强调技术深度、风险判断和复用资产。",
      "薪酬：岗位架构与薪酬架构解耦，用稀缺系数、专项津贴、项目奖金处理市场溢价。",
      "激励：禁止用新增族群掩盖薪酬预算不足；新增序列必须有清晰供给缺口和评价标准。",
    ],
    leads: [
      "建立日报缺口审计：每天检查正式日报、专题页、首页卡片和证据库是否同步。",
      "把“非决策稿”从首页主列表降权或单独标识，避免误读为正式产出。",
      "补充 6 月国内企业岗位改革和薪酬溢价材料，降低海外材料占比。",
    ],
  },
};

const languageReplacements = [
  [/repeatable systems/g, "可复用系统"],
  [/measurable impact/g, "可衡量影响"],
  [/accountability/g, "结果负责"],
  [/internal ownership/g, "内部拥有责任"],
  [/external pipeline/g, "外部人才入口"],
  [/capability tag/g, "能力标签"],
  [/pricing/g, "定价"],
  [/premium \/ allowance/g, "溢价/津贴"],
  [/title promotion/g, "头衔式晋升"],
  [/project owner/g, "项目负责人"],
  [/apprentice/g, "学徒"],
  [/junior baseline/g, "初级岗位基线"],
  [/early-career AI fellows/g, "早期职业阶段 AI 项目人才"],
  [/fellows/g, "项目人才"],
  [/grant/g, "资助"],
  [/Claude credits/g, "Claude 使用额度"],
  [/contracted labor/g, "外部劳务"],
  [/headcount/g, "人员规模"],
  [/entry-level roles/g, "初级岗位"],
  [/entry-level/g, "初级"],
  [/seniorized/g, "高级化"],
  [/graduate recruitment/g, "毕业生招聘"],
  [/title inflation/g, "头衔膨胀"],
  [/work packaging/g, "工作包重组"],
  [/market premium/g, "市场溢价"],
  [/premium\/allowance/g, "溢价/津贴"],
  [/manager layer/g, "管理层级"],
  [/junior training layer/g, "新人培养层"],
  [/outsourced support layer/g, "外部支持层"],
  [/internal role need/g, "内部岗位需求"],
  [/external pipeline need/g, "外部人才入口需求"],
  [/capability tag need/g, "能力标签需求"],
  [/pricing need/g, "定价需求"],
  [/ownership rule/g, "责任规则"],
  [/fellowship-to-hire/g, "项目人才转录用"],
  [/workflow/g, "流程"],
  [/rubric/g, "评价尺"],
  [/owner/g, "负责人"],
  [/manager/g, "管理者"],
  [/scope/g, "职责范围"],
  [/title/g, "头衔"],
  [/internal baseline/g, "内部能力基线"],
  [/AI service layer/g, "AI 服务层"],
  [/AI service/g, "AI 服务"],
  [/project talent/g, "项目制人才"],
  [/nonprofit/g, "非营利组织"],
  [/项目人才hip/g, "专项培养项目"],
  [/fellowship/g, "专项培养项目"],
  [/early-career/g, "早期职业阶段"],
  [/senior-level skills/g, "资深能力"],
  [/senior-level/g, "资深"],
  [/junior tasks/g, "初级任务"],
  [/junior task/g, "初级任务"],
  [/junior/g, "初级员工"],
  [/host organization/g, "接收组织"],
  [/AI credits/g, "AI 使用额度"],
  [/capability injection/g, "能力注入"],
  [/capability jumpstart/g, "能力启动包"],
  [/operating model/g, "运营模式"],
  [/AI fellow \/ guild \/ residency \/ short-cycle 学徒/g, "AI 项目人才、实践社群、驻场计划或短周期学徒"],
  [/graduate hiring/g, "毕业生招聘"],
  [/graduate cut/g, "毕业生招聘削减"],
  [/fellow design/g, "项目设计"],
  [/learning architecture/g, "学习架构"],
  [/contract talent/g, "外部合约人才"],
  [/external AI-enabled support/g, "外部 AI 增强支持"],
  [/tension/g, "张力"],
  [/external /g, "外部"],
  [/内部 baseline/g, "内部能力基线"],
  [/更高 bar/g, "更高门槛"],
  [/管理者 bar/g, "管理者门槛"],
  [/seniorization/g, "高级化"],
  [/capability infrastructure/g, "能力基础设施"],
  [/AI Pyramid/g, "AI 能力金字塔（AI Pyramid）"],
  [/正式 人员规模/g, "正式人员规模"],
  [/资助 和/g, "资助和"],
  [/毕业生招聘 缩减/g, "毕业生招聘缩减"],
  [/的 初级员工 高级化/g, "的初级岗位高级化"],
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function normalizeChinese(text) {
  const urls = [];
  let normalized = text
    .replace(/pwc-global-jobs-barometer-ai-advanced-skills-初级-jobs/g, "pwc-global-jobs-barometer-ai-advanced-skills-entry-level-jobs")
    .replace(/investopedia\.com\/初级-jobs-now-want-senior-skills/g, "investopedia.com/entry-level-jobs-now-want-senior-skills")
    .replace(/(AP News|Anthropic|Claude Corps)([\s\S]{0,220}?)- undefined/g, `$1$2- ${sourceCatalog.anthropicCorps.url}`)
    .replace(/(Business Insider|PwC 2026 AI Jobs Barometer|Employers want)([\s\S]{0,220}?)- undefined/g, `$1$2- ${sourceCatalog.pwcJobs.url}`)
    .replace(/(Investopedia)([\s\S]{0,220}?)- undefined/g, `$1$2- ${sourceCatalog.investopediaPwc.url}`)
    .replace(/(Financial Times|金融时报|Large employers)([\s\S]{0,220}?)- undefined/g, `$1$2- https://www.ft.com/content/bbf57e46-51ef-4013-8f09-8391fb69e6f1`)
    .replace(/(Payrolls to Prompts|arXiv)([\s\S]{0,220}?)- undefined/g, `$1$2- ${sourceCatalog.payrolls.url}`);
  normalized = normalized.replace(new RegExp("https?://\\S+", "g"), (match) => {
    urls.push(match);
    return `__URL_${urls.length - 1}__`;
  });
  for (const [pattern, replacement] of languageReplacements) {
    normalized = normalized.replace(pattern, replacement);
  }
  normalized = normalized.replace(/__URL_(\d+)__/g, (_, idx) => urls[Number(idx)] || "");
  normalized = normalized
    .replace(/\\n/g, "")
    .replace(/AI 能力金字塔（AI 能力金字塔（AI Pyramid））/g, "AI 能力金字塔（AI Pyramid）")
    .replace(/头衔和 人员规模/g, "头衔和人员规模")
    .replace(/undefined/g, "来源链接待恢复")
    .replace(/([一-龥]) +([一-龥])/g, "$1$2")
    .replace(/([一-龥]) +([，。；：、])/g, "$1$2")
    .replace(/ +\n/g, "\n");
  return normalized;
}

function sourceList(keys) {
  return keys.map((key, index) => {
    const source = sourceCatalog[key];
    return `${index + 1}. ${source.label}（${source.type}，${source.grade}）：${source.url}`;
  }).join("\n");
}

function evidenceMap(keys) {
  const byType = {
    "官方/一手材料": [],
    "权威媒体与案例": [],
    "社媒/职场平台线索": [],
    "招聘JD与薪酬信号": [],
  };
  for (const key of keys) {
    const source = sourceCatalog[key];
    if (source.type.includes("高管") || source.type.includes("公司项目") || source.type.includes("政策")) byType["官方/一手材料"].push(source.fact);
    else byType["权威媒体与案例"].push(source.fact);
    if (source.label.includes("PwC") || source.label.includes("ITPro")) byType["招聘JD与薪酬信号"].push(source.fact);
  }
  if (!byType["社媒/职场平台线索"].length) byType["社媒/职场平台线索"].push("今日未将社媒单点信息上升为结论；后续只作为线索池处理。");
  return Object.entries(byType).map(([type, facts]) => `### ${type}\n${facts.map((fact) => `- ${fact}`).join("\n")}`).join("\n\n");
}

function topicDoc(date, topicNo, topicName, data) {
  const topicAngles = {
    1: ["组织结构与管理层级", "关注层级减少、责任前移和管理者角色改写。"],
    2: ["高人才密度与复合型人才机制", "关注复合型人才、初级岗位高级化、培养机制与关键人才激励。"],
    3: ["岗位族群、职级序列与薪酬架构", "关注岗位合并、专家拆分、薪酬带宽、稀缺系数和头衔膨胀风险。"],
    4: ["AI 原生工作方式与治理机制", "关注智能体流程、风险分级、测试演练、成本归属和责任链。"],
  };
  const [angleTitle, angleIntro] = topicAngles[topicNo];
  const chosenFindings = data.findings.map(([title, body], index) => `${index + 1}. **${title}**：${body}`).join("\n");
  const topicEvidence = data.sources.map((key) => {
    const source = sourceCatalog[key];
    return `- **${source.label}**：${source.fact}`;
  }).join("\n");
  return normalizeChinese(`# ${date}｜专题${topicNo}：${topicName}

> 状态：正式补跑稿｜用途：CEO/OD 决策参考｜语言规则：中文为主，必要英文仅保留专名和来源标题。

## 1. 今日一句话结论

${data.oneLine}

## 2. 本专题为什么重要

${angleTitle} 的核心不是换几个岗位名称，而是回答：在 AI 放大个人产出、压缩交接和改变技能供需以后，企业如何重新定义责任、能力、价格和激励。${angleIntro}

## 3. 今日核心判断

${chosenFindings}

## 4. 今日事实底座

${topicEvidence}

## 5. 今日 Context：暂不下结论，但必须纳入判断

${data.context.map((item) => `- ${item}`).join("\n")}

## 6. 重点案例更新

### 中国公司

${data.chinaCase}

### 海外公司

${data.globalCase}

## 7. 对本课题的落地启发

${data.action.map((item) => `- ${item}`).join("\n")}

## 8. 待验证清单

${data.leads.map((item) => `- ${item}`).join("\n")}

## 9. 来源索引

${sourceList(data.sources)}
`);
}

function overviewDoc(date, data) {
  return normalizeChinese(`# ${date}｜AI 时代组织与人才机制日报

> 状态：正式补跑稿｜补跑原因：6 月 19 日至 22 日页面曾只保留自动触发记录，缺少可用于决策的正式研究稿。本稿以新增证据重新整理，不把单点材料硬凑为结论。

## 1. 今日一句话结论

${data.oneLine}

## 2. 今日核心判断

${data.findings.map(([title, body], index) => `${index + 1}. **${title}**：${body}`).join("\n")}

## 3. 今日 Context：背景材料、弱信号、反例和冲突信息

${data.context.map((item) => `- ${item}`).join("\n")}

## 4. 今日新增证据地图

${evidenceMap(data.sources)}

## 5. 重点案例更新

### 中国公司

${data.chinaCase}

### 海外公司

${data.globalCase}

## 6. 对本课题的落地启发：战略—岗位—职级—薪酬—激励

${data.action.map((item) => `- ${item}`).join("\n")}

## 7. 社媒/职场平台线索池

- 今日没有把社媒单点内容作为结论使用；后续将仅在可追溯、可交叉验证时进入证据地图。
- 可继续追踪员工对初级岗位减少、AI 工具强制使用、岗位头衔变化和薪酬溢价的体感材料。

## 8. 待验证清单与下一步计划

${data.leads.map((item) => `- ${item}`).join("\n")}

## 9. 来源索引

${sourceList(data.sources)}
`);
}

function dailyDoc(date, data) {
  return normalizeChinese(`# ${date}｜AI 时代组织与人才机制四课题日报

## 今日一句话结论

${data.oneLine}

## CEO 必读三件事

${data.findings.slice(0, 3).map(([title, body], index) => `${index + 1}. **${title}**：${body}`).join("\n")}

## 今日事实底座

${data.sources.map((key) => `- ${sourceCatalog[key].fact}`).join("\n")}

## 今日 Context

${data.context.map((item) => `- ${item}`).join("\n")}

## 落地启发

${data.action.map((item) => `- ${item}`).join("\n")}

## 待验证线索

${data.leads.map((item) => `- ${item}`).join("\n")}

## 来源索引

${sourceList(data.sources)}
`);
}

function indexHtml(date, data) {
  const cards = [
    ["00-overview.html", `${date}｜日报总览`, data.oneLine],
    ["01-flat-organization.html", "专题一：组织结构与管理层级", "查看层级、责任和管理者角色变化。"],
    ["02-talent-density.html", "专题二：高人才密度与复合型人才机制", "查看复合型人才、培养入口和关键人才激励。"],
    ["03-job-family-career-architecture.html", "专题三：岗位族群、职级序列与薪酬架构", "查看岗位合并、专家拆分和薪酬溢价机制。"],
    ["04-promotion-system.html", "专题四：AI 原生工作方式与治理机制", "查看智能体流程、风险治理和责任链。"],
  ];
  const cardHtml = cards
    .map(([href, title, desc]) => `<a class="card" href="${href}"><h2>${title}</h2><p>${desc}</p></a>`)
    .join("");
  return `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${date} AI 组织日报</title><style>body{margin:0;background:#0f1220;color:#eef2ff;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}.wrap{max-width:1100px;margin:0 auto;padding:48px 22px}.hero{border:1px solid rgba(129,140,248,.45);border-radius:24px;padding:28px;background:linear-gradient(135deg,rgba(99,102,241,.18),rgba(15,23,42,.78))}.status{display:inline-block;color:#34d399;background:rgba(16,185,129,.12);border-radius:999px;padding:6px 12px;font-size:14px}h1{font-size:34px;margin:16px 0 10px}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px;margin-top:22px}.card{display:block;color:inherit;text-decoration:none;border:1px solid rgba(148,163,184,.22);background:#171b2d;border-radius:18px;padding:20px}.card:hover{border-color:#818cf8;transform:translateY(-1px)}.card h2{font-size:20px;margin:0 0 10px}.card p{color:#b8c0d8;line-height:1.65;margin:0}.back{display:inline-block;margin-top:28px;color:#a5b4fc;text-decoration:none}</style></head><body><main class="wrap"><section class="hero"><span class="status">正式补跑稿</span><h1>${date}｜AI 时代组织与人才机制日报</h1><p>${data.oneLine}</p></section><section class="grid">${cardHtml}</section><a class="back" href="../../ai-org-talent-mechanism.html">返回专题首页</a></main></body></html>`;
}

function write(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, normalizeChinese(content).trim() + "\\n", "utf8");
}

function cleanExisting(filePath) {
  if (!fs.existsSync(filePath)) return;
  const before = fs.readFileSync(filePath, "utf8");
  const after = normalizeChinese(before);
  if (after !== before) fs.writeFileSync(filePath, after, "utf8");
}

for (const date of dates) {
  const data = reportData[date];
  const dir = path.join(projectRoot, date);
  ensureDir(dir);
  write(path.join(dir, "00-overview.md"), overviewDoc(date, data));
  write(path.join(dir, "01-flat-organization.md"), topicDoc(date, 1, "组织结构与管理层级", data));
  write(path.join(dir, "02-talent-density.md"), topicDoc(date, 2, "高人才密度与复合型人才机制", data));
  write(path.join(dir, "03-job-family-career-architecture.md"), topicDoc(date, 3, "岗位族群、职级序列与薪酬架构", data));
  write(path.join(dir, "04-promotion-system.md"), topicDoc(date, 4, "AI 原生工作方式与治理机制", data));
  write(path.join(dir, "index.html"), indexHtml(date, data));
  write(path.join(root, "daily", `${date}.md`), dailyDoc(date, data));
  write(path.join(root, "daily-report", `${date}.md`), dailyDoc(date, data));
}

for (const date of ["2026-06-18", ...dates]) {
  const dir = path.join(projectRoot, date);
  if (fs.existsSync(dir)) {
    for (const file of fs.readdirSync(dir)) {
      if (file.endsWith(".md") || file.endsWith(".html")) cleanExisting(path.join(dir, file));
    }
  }
  cleanExisting(path.join(root, "daily", `${date}.md`));
  cleanExisting(path.join(root, "daily-report", `${date}.md`));
}

for (const date of dates) {
  execFileSync(process.execPath, [path.join(root, "scripts", "render-special-html.js"), `specials/ai-org-talent-mechanism/${date}`], { cwd: root, stdio: "inherit" });
  fs.writeFileSync(path.join(projectRoot, date, "index.html"), indexHtml(date, reportData[date]), "utf8");
}

execFileSync(process.execPath, [path.join(root, "scripts", "enhance-report-sharing.js")], { cwd: root, stdio: "inherit" });
if (fs.existsSync(path.join(root, "scripts", "update-ai-org-baselines.js"))) {
  execFileSync(process.execPath, [path.join(root, "scripts", "update-ai-org-baselines.js")], { cwd: root, stdio: "inherit" });
}

console.log(`Backfilled formal reports for ${dates.join(", ")} and cleaned mixed-language expressions.`);
