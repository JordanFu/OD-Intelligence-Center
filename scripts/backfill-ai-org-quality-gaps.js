const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const project = path.join(root, 'specials', 'ai-org-talent-mechanism');

const sources = {
  bcgDesign: ['BCG：Design Your Company for AI, Not AI for Your Company', 'https://www.bcg.com/publications/2026/design-your-company-for-ai-not-ai-for-your-company'],
  bcgChro: ['BCG：The Reinvention of the CHRO in an AI-Driven Enterprise', 'https://www.bcg.com/publications/2026/reinvention-of-the-chro-in-an-ai-driven-enterprise'],
  bcgTech: ['BCG：To Thrive in the AI Era, Tech Leaders Must Reinvent Organization and Operating Models', 'https://www.bcg.com/publications/2026/to-thrive-in-the-ai-era-tech-leaders-must-reinvent-organization-and-operating-models'],
  mckTech: ['McKinsey：Designing an end-to-end technology workforce for the AI-first era', 'https://www.mckinsey.com/capabilities/mckinsey-technology/our-insights/designing-an-end-to-end-technology-workforce-for-the-ai-first-era'],
  mckSdlc: ['McKinsey：Rewiring software delivery for the agentic era', 'https://www.mckinsey.com/capabilities/mckinsey-technology/our-insights/rewiring-software-delivery-for-the-agentic-era'],
  workdayModel: ['Workday：Designing Operating Models for Human + Agent Teams', 'https://www.workday.com/en-us/perspectives/hr/operating-models-for-human-and-agents.html'],
  workdayAsor: ['Workday FY2027 Q1：Agent System of Record GA', 'https://newsroom.workday.com/2026-05-21-Workday-Announces-Fiscal-2027-First-Quarter-Financial-Results?asPDF=1'],
  workdayGoogle: ['Workday × Google Cloud：AI agents for HR and Finance', 'https://newsroom.workday.com/2026-05-28-Workday-and-Google-Cloud-Expand-Strategic-Partnership-to-Bring-AI-Agents-for-HR-and-Finance-Into-Employees-Daily-Workflows'],
  workdayPassport: ['Workday：Agent Passport', 'https://investor.workday.com/news-and-events/press-releases/news-details/2026/Workday-Launches-Agent-Passport-to-Test-Verify-and-Continuously-Monitor-Every-AI-Agent-in-the-Enterprise/default.aspx'],
  workdayHorizon: ['Workday Horizon Zurich 2026：enterprise rails for AI', 'https://www.workday.com/en-ch/company/latest/events-webinars/horizon.html'],
  sapSuite: ['SAP Sapphire：Autonomous Suite', 'https://news.sap.com/2026/05/sap-sapphire-keynote-business-ai-platform-power-autonomous-enterprise/'],
  sapNvidia: ['SAP × NVIDIA：secure AI agents', 'https://news.sap.com/2026/05/secure-ai-agents-how-sap-and-nvidia-co-define-enterprise-grade-agent-execution/'],
  oracleHr: ['Oracle：Fusion Agentic Applications for HR', 'https://www.oracle.com/news/announcement/oracle-introduces-fusion-agentic-applications-for-hr-2026-04-09/'],
  linkedinTalent: ['LinkedIn Research：Talent 2026', 'https://news.linkedin.com/en-us/2026/LinkedIn-Research-Talent-2026'],
  openaiDeploy: ['OpenAI：OpenAI Deployment Company', 'https://openai.com/index/openai-launches-the-deployment-company/'],
  openaiFde: ['OpenAI：Forward deployed engineering at OpenAI', 'https://openai.com/business/the-openai-deployment-company'],
  openaiCodex: ['OpenAI：Codex for every role, tool, and workflow', 'https://openai.com/index/codex-for-every-role-tool-workflow/'],
  anthropicServices: ['Anthropic：Enterprise AI services company', 'https://www.anthropic.com/news/enterprise-ai-services-company'],
  anthropicPartner: ['Anthropic：Claude Partner Network', 'https://www.anthropic.com/news/claude-partner-network'],
  tencentSuite: ['Tencent：Productivity Agent Suite / ADP 4.0 / CodeBuddy', 'https://www.tencent.com/en-us/articles/2202350.html'],
  metaAgent: ['Meta：Meta Business Agent Platform', 'https://about.fb.com/news/2026/06/meta-business-agent/amp/'],
  huaweiTalent: ['Huawei：AI Talent Development Service', 'https://www.huawei.com/en/news/2026/3/ai-talent-development'],
  eyPay: ['EY：Future of Pay Report 2026', 'https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/newsroom/2026/02/ey-future-of-pay-report-2026.pdf'],
  payscale: ['Payscale：2026 Compensation Best Practices Report', 'https://www.payscale.com/press-releases/2026-compensation-best-practices-report'],
};

const data = {
  '2026-05-30': {
    status: '周末补跑 / 决策稿',
    theme: '从 AI 工具扩散转向 operating model 重写',
    oneLine: '本日补跑形成的高置信判断是：AI 组织变革不是从“新增 AI 岗位”开始，而是先重写端到端旅程、治理权、staffing 和角色边界；岗位序列只是后续承接层。',
    why: '这一天的缺口本质是把当周散落的咨询与官方材料补成组织机制判断，适合作为 5 月末到 6 月初日报的过渡底稿。',
    judgments: [
      ['L3', '角色会变宽，但不是无边界变宽', 'BCG 把 end-to-end customer journeys、small cross-functional teams、governance 与 staffing 放在同一个 AI-first 设计框架内；Microsoft/Workday 的后续材料也把任务、交接、决策权作为先决条件。可信度来自咨询框架与多家企业材料互证。'],
      ['L3', 'CHRO/OD 的新职责不是“培训大家用 AI”，而是成为 hybrid workforce architect', 'BCG CHRO 文章明确把角色重写、治理权变化和中层减少放到同一组数据里，说明 HR 不能只做技能培训，要参与 operating model。'],
      ['L2', '岗位族群要晚于能力图谱，不宜抢跑', '华为 AI Talent Competence Map 的 22 类角色、71 项能力提供了一个反例：它先做能力地图、训练评估闭环和认证，而不是先膨胀 title。'],
      ['L2', '薪酬激励问题已经藏在岗位改革背后', 'EY 与 Payscale 的薪酬材料显示 skills-based pay、skill premium、半年/季度复核正在升温；这支持“新增族群常常是在找薪酬承接口”的判断，但仍需更多公司制度样本。']
    ],
    evidence: [
      ['官方/一手', '华为 AI Talent Development Service 把 AI 能力拆成 computing、model、application、business 四层，22 类角色和 71 项核心能力。', sources.huaweiTalent],
      ['权威媒体与案例', 'BCG 以 AI-first company design 强调 journey、governance、staffing 和 small cross-functional teams。', sources.bcgDesign],
      ['社媒/职场平台', '暂未将社媒声音升级为结论；仅保留“AI title 增多是否造成 title inflation”的后续追踪问题。', null],
      ['招聘薪酬', 'EY/Payscale 支持技能溢价和 pay practice 变化，但今天仍不足以判断某家公司已完成岗位-薪酬架构分离。', sources.eyPay]
    ],
    casesChina: ['华为：能力图谱优先于岗位命名，是“先能力、后序列”的中国样本；适合追踪是否进入认证、晋升、薪酬或岗位任职资格。'],
    casesGlobal: ['BCG：AI-first operating model 强调 journey teams 和 governance；McKinsey：技术 workforce 要回答 build by employees vs deploy by agents。'],
    openQuestions: ['哪些企业把 AI 能力图谱直接连接到薪酬带宽或稀缺系数？', 'AI-first small teams 是减少管理层级，还是把管理劳动转移给 workflow owner？']
  },
  '2026-05-31': {
    status: '周末补跑 / 决策稿',
    theme: '把“执行层合并”和“核心专家深化”拆开看',
    oneLine: '本日补跑的核心判断是：执行层岗位正在向更粗颗粒度、端到端、复合职责合并，但 AI infra、治理、评测、架构和 deployment 等核心专家能力同时在深化，二者不是矛盾而是分层并存。',
    why: '此前页面只留下占位稿，缺少对主假设与反例的同时验证；本次补跑把“变宽”和“变深”分开呈现。',
    judgments: [
      ['L3', '执行层角色变宽的证据链增强', 'BCG、Workday 与 Microsoft 都把 redesign 指向 tasks、handoffs、decision rights、authority boundary 与 team architecture，说明企业希望减少碎片化交接。'],
      ['L3', '核心专家角色深化也在增强', 'McKinsey 的 AI-first technology workforce 要求企业明确哪些能力必须由员工建设；SAP/NVIDIA trusted runtime、Workday governance 都显示治理/架构/验证能力不会被简单合并掉。'],
      ['L2', 'manager 的未来不是消失，而是 player-coach / orchestrator 化', 'Workday 和 BCG 都把人机协作、authority boundary、governance 放入 manager/CHRO 议题，说明管理者的审批劳动会减少，但规则设定和例外处理责任会变厚。'],
      ['L2', '新建 job family 不是默认答案', '当新能力还只是横向技能时，应优先用 skill tag、项目激励、专项津贴或 market premium；只有 role package 稳定、交付物清晰、薪酬市场可验证时才考虑新建族群。']
    ],
    evidence: [
      ['官方/一手', 'Workday human + agent operating model 强调 authority boundary、skills-based role redesign、outcome-based metrics 与员工透明感。', sources.workdayModel],
      ['权威媒体与案例', 'McKinsey 强调 CIO/CEO/CHRO 需要回答哪些技术能力由员工建设、哪些由 agents 部署。', sources.mckTech],
      ['社媒/职场平台', '弱信号仍是“AI 工具使个体产出倍增、小团队更能端到端交付”；暂不形成结论。', null],
      ['招聘薪酬', 'AI governance、technical architect、FDE、agent operations 等角色需要继续追踪薪资区间和 level 边界。', null]
    ],
    casesChina: ['华为：AI 能力地图把业务、应用、模型、算力四层合并到一张图，说明中国公司也在从培训话术走向能力结构。'],
    casesGlobal: ['Workday：authority boundary 是人机团队的第一原则；McKinsey：核心技术能力不能全部交给 agents 或 vendor。'],
    openQuestions: ['哪些岗位只是技能标签，哪些已经形成稳定 role package？', 'manager 的 player-coach 化会提高人才密度，还是造成隐性加班与责任膨胀？']
  },
  '2026-06-02': {
    status: '补跑修正 / 决策稿',
    theme: 'Agent 进入正式 operating model：台账、角色/KPI、trusted runtime 与部署组织化',
    oneLine: '今天最强判断是：agent 已开始从“工具功能”进入企业正式 operating model；组织要管理的对象变成台账、权限、角色/KPI 映射、运行时治理和跨系统 handoff。',
    why: '当日其实已有信息库和工作日报，但专题日报被兜底占位覆盖；本次用当天 6 条高可信一手/咨询材料重建四课题产出。',
    judgments: [
      ['L3', 'agent 台账化是数字劳动力治理的起点', 'Workday FY2027 Q1 披露 Agent System of Record 已 GA，4,000+ 客户在至少一个流程中使用 Workday 自研 agents，Recruiting Agent 支持 1,400 万招聘流程。'],
      ['L3', '角色/KPI 映射开始进入产品逻辑', 'SAP Autonomous Suite 把 assistants 映射到核心业务角色，并用 AI Agent Hub 跟踪 KPI；这迫使岗位说明和绩效口径同步更新。'],
      ['L3', 'trusted runtime 让治理成为组织能力', 'SAP × NVIDIA 把 enterprise-grade agent execution 定义成 inspect、govern、rely on，组织必须明确授权、审计、回滚、override 与事故责任。'],
      ['L3', '部署组织化成为新中间层', 'OpenAI Deployment Company 作为 standalone business unit，带 150 名 FDE/Deployment Specialists，说明 workflow redesign、controls 接入和 change management 已成为正式组织边界。'],
      ['L2', '小团队化不等于少治理', 'McKinsey agentic SDLC 预测更小高技能 pods，但同时要求 risk/legal/testing/procurement 等 outer-loop 从一开始嵌入交付链。']
    ],
    evidence: [
      ['官方/一手', 'Workday Agent System of Record GA；Workday × Google Cloud 支持 A2A、A2UI、MCP。', sources.workdayAsor],
      ['权威媒体与案例', 'McKinsey agentic SDLC 把大团队转向小 pods 与 outer-loop 嵌入同时讨论。', sources.mckSdlc],
      ['社媒/职场平台', '暂不使用社媒作为结论，只把“员工服务入口从应用集合转为对话执行层”作为后续体验验证点。', null],
      ['招聘薪酬', 'FDE / Deployment Specialist 的稳定化已由 OpenAI 组织动作支持，但薪酬区间仍需 JD 侧补证。', sources.openaiDeploy]
    ],
    casesChina: ['暂无当日中国公司新增一手材料；中国侧建议追踪腾讯/华为是否把 AgentOps、能力图谱与岗位/薪酬连接。'],
    casesGlobal: ['Workday：agent system of record；SAP：role/KPI mapping；OpenAI：Deployment Company；McKinsey：agentic SDLC。'],
    openQuestions: ['agent owner、成本归属、停用审批应该落在哪个岗位？', 'HR/Finance agent 触发动作时，谁批准跨系统 handoff？', 'outer-loop roles 是否会形成新序列，还是嵌入现有职能？']
  },
  '2026-06-06': {
    status: '周末补跑 / 决策稿',
    theme: '从部署中间层到企业轨道：AI 转型开始要求正式交付能力',
    oneLine: '本日补跑判断是：AI 组织能力的稀缺点正在从模型能力转向“企业轨道”和现场交付能力；FDE、Applied AI、enterprise architect、AgentOps 与 governance owner 是同一类新接口层的不同切面。',
    why: '6 月 6 日原本只有自动化占位；本次用 6 月 5 日与周末可验证的一手材料补回“部署能力组织化”这条主线。',
    judgments: [
      ['L3', '部署能力成为正式组织层', 'OpenAI Deployment Company、Anthropic enterprise AI services company 与 Claude Partner Network 都把 Applied AI/FDE/technical architect/partner enablement 做成组织化交付结构。'],
      ['L3', '中国样本显示 AgentOps 也在组织化', '腾讯 2026-06-05 官方披露 ADP 4.0 定位 enterprise-grade AgentOps，覆盖开发、连接、分发和治理全生命周期，CodeBuddy 覆盖 95%+ 工程师并降低整体编码时间 40%。'],
      ['L2', '小团队高杠杆需要 verification layer', 'MiniMax 的 Leader/Worker/Verifier 角色流和 Endava agentic organization 说明交付链可压缩，但验证职责不会消失。'],
      ['L2', '部署层不是传统实施岗位的简单升级', 'FDE/Applied AI 的价值在于把业务现场、系统权限、治理控制和模型能力打通，既像技术专家，也像组织变革 owner。']
    ],
    evidence: [
      ['官方/一手', 'Tencent Productivity Agent Suite：ADP 4.0、WorkBuddy Enterprise AI Workspace、CodeBuddy 内部采用。', sources.tencentSuite],
      ['权威媒体与案例', 'OpenAI/Anthropic 均把企业交付与部署能力正式组织化。', sources.openaiDeploy],
      ['社媒/职场平台', '社媒层只保留“小团队 + agent 是否造成责任边界不清”的员工体感线索，不升级为结论。', null],
      ['招聘薪酬', 'FDE / Applied AI engineer / technical architect 是后续需要抓 JD 和薪酬的重点 role package。', sources.openaiFde]
    ],
    casesChina: ['腾讯：CodeBuddy、WorkBuddy、ADP 4.0 同框，说明 AI 已进入内部工程工作流、企业产品与 AgentOps 平台。'],
    casesGlobal: ['OpenAI：Deployment Company；Anthropic：mid-sized companies 的 enterprise AI services company；Meta：Business Agent Platform。'],
    openQuestions: ['腾讯 ADP 4.0 的治理能力是否对应内部正式岗位 owner？', 'FDE 在企业内侧会被复制为 AI transformation architect，还是由外部模型公司长期承担？']
  },
  '2026-06-07': {
    status: '周末补跑 / 决策稿',
    theme: '治理、信任与员工体验：agent 规模化后的反作用力',
    oneLine: '本日补跑判断是：当 agent 从工具进入运行系统后，组织真正要防的不是“没人用 AI”，而是权限、透明度、行为数据、审计和例外处理没有制度化，导致信任成本反噬。',
    why: '6 月 7 日原本只有兜底占位；本次补跑把 6 月 5-9 日材料中与治理、员工信任和组织接口相关的证据聚合，补足周末观察层。',
    judgments: [
      ['L3', '企业 agent 平台必须内置 controls/guardrails/measurement', 'Meta Business Agent Platform 明确面向大企业提供 controls、guardrails、measurement，并连接 Shopify、Zendesk、Shopee 等系统；这说明 agent 执行动作需要规则层。'],
      ['L3', 'enterprise rails 成为 Workday 的组织叙事', 'Workday Horizon Zurich 把 AI 价值描述为 data、processes、security、compliance 构成的 deterministic backbone，并强调 hiring/mobility 自动化中人仍控制敏感决策。'],
      ['L2', '员工透明和隐私边界是 adoption 前提', 'Workday operating model 材料强调 authority boundaries 和员工透明感；Meta 员工行为数据争议也提示 AI workflow 一旦触达劳动过程，信任成本会显性化。'],
      ['L2', '晋升机制会先被证据结构重写，而不是马上取消窗口', 'Oracle/Workday/LinkedIn 的材料都指向 career evidence、verified skills、manager workspace 和 calibration，而不是“AI 自动决定晋升”。']
    ],
    evidence: [
      ['官方/一手', 'Meta Business Agent Platform：企业级 controls、guardrails、measurement 和系统连接。', sources.metaAgent],
      ['权威媒体与案例', 'Workday Horizon Zurich：enterprise rails for AI，强调 deterministic backbone 与 sensitive decisions human control。', sources.workdayHorizon],
      ['社媒/职场平台', '员工对 AI telemetry、考核透明度和“被系统管理”的体感应进入线索池，不作为结论。', null],
      ['招聘薪酬', 'governance owner、agent ops、AI risk/control roles 是后续薪酬/JD 监测重点。', null]
    ],
    casesChina: ['腾讯 AgentOps 是正向样本；但需要继续验证员工侧是否有透明授权、例外处理和责任边界。'],
    casesGlobal: ['Meta：Business Agent Platform；Workday：enterprise rails；Oracle：career/calibration workspace；LinkedIn：verified skills。'],
    openQuestions: ['哪些 agent 动作必须保留 human-in-the-loop？', '员工可见性、暂停、申诉和豁免机制是否会成为 AI operating model 标配？', '晋升 evidence workspace 会不会强化 manager 的校准责任？']
  }
};

function sourceIndex(keys) {
  const seen = new Set();
  const rows = [];
  for (const key of keys) {
    const source = sources[key];
    if (!source || seen.has(source[1])) continue;
    seen.add(source[1]);
    rows.push(`- [${source[0]}](${source[1]})`);
  }
  return rows.join('\n');
}

function evidenceMap(evidence) {
  return ['| 渠道 | 新增证据 | 可信度 |', '|---|---|---|', ...evidence.map(([channel, text, source]) => `| ${channel} | ${text}${source ? `（[来源](${source[1]}））` : ''} | ${source ? 'L2-L3' : 'L1 / 待验证'} |`)].join('\n');
}

function overview(date, item) {
  const sourceKeys = Object.keys(sources);
  return `# ${date}｜AI时代组织与人才机制四课题日报

> ${item.status}。本稿用于替换此前自动化占位内容；所有强判断只来自一手材料、权威咨询/媒体或已入库知识库的交叉验证。若证据不足，保留在 Context 或线索层，不冒充结论。

## 1. 今日一句话结论

${item.oneLine}

## 2. 今日核心判断

${item.judgments.map(([level, title, body], index) => `${index + 1}. **${title}（${level}）**：${body}`).join('\n')}

## 3. 今日 Context：背景材料、弱信号、反例和冲突信息

- **暂不形成结论，但提示关注“title inflation”**：AI 相关 title 会继续增长，但目前不能把每个 title 都理解为新岗位族群；需要看职责边界、薪酬区间、晋升路径和组织归属是否稳定。
- **暂不形成结论，但提示关注“执行层合并 vs 专家深化”**：前线执行岗位在变宽，核心专家岗位在变深；两者同时存在，不能用单一趋势解释所有岗位变化。
- **暂不形成结论，但提示关注“薪酬承接”**：很多岗位/序列诉求背后可能是为关键人才争取 market premium、skill premium、项目激励或薪酬带宽空间；需要用 JD、薪酬区间和调薪制度继续验证。
- **反例提醒**：治理、评测、安全、架构、AgentOps、数据治理、AI infra 等能力不会因为 AI 自动化而消失，反而可能成为更高溢价的专家能力。

## 4. 今日新增证据地图

${evidenceMap(item.evidence)}

## 5. 重点案例更新

### 中国公司

${item.casesChina.map(x => `- ${x}`).join('\n')}

### 海外公司

${item.casesGlobal.map(x => `- ${x}`).join('\n')}

## 6. 对本课题的落地启发：战略-岗位-职级-薪酬-激励机制

- **战略**：先定义 AI 要重写哪个 workflow、journey 或 operating model，不要把“用了 AI 工具”当成战略进展。
- **岗位**：先写清 role package：责任边界、交付物、验证方式、例外路径、协作对象；稳定后再讨论是否新建 job family。
- **职级**：AI 贡献不能只看工具使用量，应看端到端结果、复杂度、跨团队影响、治理质量和可复用资产。
- **薪酬**：对短期稀缺技能优先用 market premium、skill premium、项目激励、专项津贴或临时补贴；只有长期稳定能力才进入薪酬带宽。
- **激励**：把 promotion、market adjustment、project reward、skill allowance 分开治理，避免所有激励诉求都挤进晋升制度。

## 7. 社媒/职场平台线索池

- 线索 1：AI 让个人产出倍增后，小团队是否更倾向端到端负责；待验证 JD 与组织公告。
- 线索 2：manager 是否正在变成 player-coach / orchestrator；待验证 manager handbook、绩效制度和招聘描述。
- 线索 3：员工对行为数据、AI 监控、透明授权和申诉机制的体感会影响 adoption；只作线索，不作结论。

## 8. 待验证清单与下一步计划

${item.openQuestions.map((q, index) => `${index + 1}. ${q}`).join('\n')}

## 9. 来源索引

${sourceIndex(sourceKeys)}
`;
}

function topic(date, item, topicName, angle) {
  return `# ${date}｜${topicName}

> ${item.status}。本专题从“${item.theme}”中抽取与 ${topicName} 直接相关的组织机制判断；不把 Context 或单点线索升级成结论。

## 一句话判断

${angle.oneLine}

## 核心判断

${angle.points.map((p, i) => `${i + 1}. **${p[0]}**：${p[1]}`).join('\n')}

## Context / 弱信号

- 暂不形成结论，但提示关注：${angle.context}
- 与主假设的关系：${angle.hypothesis}
- 反例或风险：${angle.counter}

## 落地启发

- 先定义责任边界和证据字段，再决定组织结构。
- 先用试点流程验证，再决定是否进入正式岗位、职级和薪酬制度。
- 对稀缺但未稳定的能力，优先用技能标签、项目激励或专项津贴，避免盲目新增序列。

## 来源索引

${sourceIndex(['bcgDesign','bcgChro','bcgTech','mckTech','mckSdlc','workdayModel','workdayAsor','workdayGoogle','workdayPassport','workdayHorizon','sapSuite','sapNvidia','oracleHr','linkedinTalent','openaiDeploy','openaiFde','openaiCodex','anthropicServices','anthropicPartner','tencentSuite','metaAgent','huaweiTalent','eyPay','payscale'])}
`;
}

function topicAngles(item) {
  return [
    ['01-flat-organization.md', '专题一：组织扁平化与中层减少', {
      oneLine: `扁平化不是简单减 manager，而是把传统中层承担的协调、审批、交接和例外处理重新写进 workflow、agent 台账和治理接口。`,
      points: [
        ['协调劳动被迁移', 'AI 能压缩低价值传递层，但必须有人定义 handoff、approval、override、rollback 和 audit。'],
        ['manager 变薄也变重', 'manager 不再只追进度，而要成为规则 owner、例外 owner、证据解释 owner。'],
        ['更小团队需要更强接口', '小团队化只有在权限、信息、验证和跨职能支持被系统化时才成立。']
      ],
      context: '如果只看到“中层减少”而没有看到 workflow owner 和 governance owner，改革很可能只是降本，不是组织升级。',
      hypothesis: '支持“执行层角色更端到端、更复合”的趋势，但不支持“管理层完全消失”。',
      counter: 'agent governance、risk、legal、testing、architecture 等接口职责可能新增或加厚。'
    }],
    ['02-talent-density.md', '专题二：高人才密度与复合型人才机制', {
      oneLine: `高人才密度的标准正在从“招更聪明的人”转向“能否定义结果、验证输出、管理 AI、沉淀复用资产并承担端到端责任”。`,
      points: [
        ['复合能力变成硬门槛', '业务语境、系统理解、AI fluency、治理意识和结果 ownership 要一起看。'],
        ['senior judgment 要资产化', 'Endava、OpenAI、Anthropic 类样本都说明专家判断需要进入 agents、playbooks 和 deployment method。'],
        ['能力证明外部化', 'LinkedIn verified skills、华为 competence map、SAP/Oracle 工作台都在让技能证据更结构化。']
      ],
      context: '高人才密度不能被偷换成“少招人、多压榨”，必须同时看授权、工具、能力标准和激励承接。',
      hypothesis: '支持“AI 使个人杠杆变大、小团队更端到端”的趋势。',
      counter: 'AI infra、模型评测、安全治理、AgentOps、数据治理等专家能力会更深，不能被泛化为人人全栈。'
    }],
    ['03-job-family-career-architecture.md', '专题三：岗位、族群、序列持续建设', {
      oneLine: `岗位体系应从静态 title 管理转向 role package 管理：先看职责包是否稳定、市场是否有薪酬信号、晋升路径是否需要独立，再决定是否新建族群。`,
      points: [
        ['先 role package，后 job family', 'FDE、AI transformation architect、agent governance owner 需要先验证是否长期稳定。'],
        ['技能标签优先于序列膨胀', '新能力如果横跨多个岗位，优先用 skill tag、认证、项目激励或 market premium。'],
        ['薪酬架构要和岗位架构松耦合', 'AI skill premium 和市场稀缺系数不应全部通过新增 title 解决。']
      ],
      context: '过多 job family 容易制造 title inflation、pay inconsistency 和晋升口径混乱。',
      hypothesis: '支持“岗位分工从窄专业向更粗颗粒度角色合并”的执行层趋势。',
      counter: '核心专家族群可能继续拆分，如 AI safety、evaluation、infra、governance、data stewardship。'
    }],
    ['04-promotion-system.md', '专题四：未来组织的晋升机制', {
      oneLine: `晋升机制首先会被证据结构重写：AI 贡献应进入结果、复杂度、复用资产、治理质量和跨团队影响，而不是以工具使用量直接定级。`,
      points: [
        ['持续证据流增强', 'Agent System of Record、manager workspace、verified skills 都会让日常证据更连续。'],
        ['正式动作仍需校准', '目前没有高置信证据说明固定晋升窗口会立即消失，更可能是持续识别 + 节奏化校准。'],
        ['激励要拆分', '晋升、调薪、skill premium、project reward、retention grant 应分开治理。']
      ],
      context: '业务提出岗位/序列改革，很多时候是在找关键人才激励与薪酬承接空间。',
      hypothesis: '支持“岗位变革本质常是薪酬激励承接问题”的判断。',
      counter: '如果没有校准，AI 证据流可能放大 manager bias、数据可见性差异和资源不均。'
    }]
  ];
}

function indexHtml(date, item) {
  return `<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${date} AI时代组织与人才机制四课题日报</title><style>body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC",sans-serif;background:#0f1117;color:#eef2fb;line-height:1.75;margin:0}main{max-width:1080px;margin:auto;padding:28px 24px}.hero,.card{background:#171a24;border:1px solid #31374b;border-radius:16px;padding:22px;margin:12px 0}.hero{border-color:#34d399}.badge{display:inline-block;background:#063d2a;color:#9ff3c8;border:1px solid #34d399;border-radius:999px;padding:4px 10px;font-weight:800}.grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}.card a,.btn{display:inline-block;color:white;background:#7c92ff;text-decoration:none;border-radius:8px;padding:8px 12px;font-weight:700}.btn{background:#202434;border:1px solid #31374b}@media(max-width:900px){.grid{grid-template-columns:1fr}}</style></head><body><main><a class="btn" href="../../../index.html">返回 OD 情报中心</a><section class="hero"><span class="badge">${item.status}</span><h1>${date} AI时代组织与人才机制四课题日报</h1><p>${item.oneLine}</p><a class="card a" href="./00-overview.html">阅读总览</a></section><section class="grid"><article class="card"><h2>组织扁平化</h2><p>协调劳动如何迁移，manager 如何从传递层变成规则与例外 owner。</p><a href="./01-flat-organization.html">阅读专题</a></article><article class="card"><h2>高人才密度</h2><p>复合人才、senior judgment 资产化、AI fluency 与治理能力。</p><a href="./02-talent-density.html">阅读专题</a></article><article class="card"><h2>岗位族群序列</h2><p>role package、skills tag、job family 与薪酬承接边界。</p><a href="./03-job-family-career-architecture.html">阅读专题</a></article><article class="card"><h2>未来晋升机制</h2><p>持续证据流、晋升校准、技能溢价和项目激励拆分。</p><a href="./04-promotion-system.html">阅读专题</a></article></section></main></body></html>`;
}

function dailyMarkdown(date, item) {
  return `# AI 组织研究 · ${date} 日报补跑

> 状态：${item.status}
> 主题：${item.theme}

## 今日一句话结论

${item.oneLine}

## 重点信息摘要

${item.judgments.map(([level, title, body], i) => `### ${i + 1}) ${title}（${level}）\n${body}`).join('\n\n')}

## OD 启示

- 组织设计：先重写 workflow、authority boundary、owner、handoff 和 exception path。
- 岗位体系：先识别 role package，再决定 job family、skill tag 或临时激励。
- 薪酬激励：把 market premium、skill premium、project reward 和 promotion 分开治理。
- 风险控制：AI 触达劳动过程、员工数据或关键决策时，透明、审计、申诉和 human override 是基本设施。

## 来源索引

${sourceIndex(Object.keys(sources))}
`;
}

for (const [date, item] of Object.entries(data)) {
  const dir = path.join(project, date);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, '00-overview.md'), overview(date, item));
  for (const [file, title, angle] of topicAngles(item)) {
    fs.writeFileSync(path.join(dir, file), topic(date, item, title, angle));
  }
  fs.writeFileSync(path.join(dir, 'index.html'), indexHtml(date, item));
  execFileSync('node', ['scripts/render-special-html.js', `specials/ai-org-talent-mechanism/${date}`], { cwd: root, stdio: 'inherit' });
  fs.writeFileSync(path.join(dir, 'index.html'), indexHtml(date, item));
  fs.mkdirSync(path.join(root, 'daily'), { recursive: true });
  fs.mkdirSync(path.join(root, 'daily-report'), { recursive: true });
  fs.writeFileSync(path.join(root, 'daily', `${date}.md`), dailyMarkdown(date, item));
  fs.writeFileSync(path.join(root, 'daily-report', `${date}.md`), dailyMarkdown(date, item));
}

console.log(`Backfilled ${Object.keys(data).length} OD daily reports.`);
