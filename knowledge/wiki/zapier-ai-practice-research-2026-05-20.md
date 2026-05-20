---
title: Zapier AI 实践深度研究：从工具采用到 AI-first operating model
source: Zapier Blog / Zapier Product Pages
date: 2026-05-20
ingested: 2026-05-20
tags: [AI组织设计, AI实践, 变革管理, 人才发展, AI能力框架, Agent, MCP]
related:
  - zapier-ai-first-hiring-onboarding-2025.md
  - zapier-ai-fluency-rubric-v2-2026.md
  - pdf-source-cfte-2026-04-ai-proficiency-framework.md
status: 深度研究报告；基于 Zapier 公开文章和产品页整理，非逐字转载
---

# Zapier AI 实践深度研究：从工具采用到 AI-first operating model

## 0. 研究结论

Zapier 的 AI 实践不是“某个部门上了几个 AI 工具”，而是一个逐步形成的 AI-first operating model：先用危机感和 hackathon 激活全员，再用安全工具、知识中心、冠军网络和重复传播降低门槛；随后把 AI 嵌入日常流程、招聘门槛、入职训练、绩效预期和管理者责任；最后把内部实践产品化为 Agents、MCP、Chatbots、Tables、Interfaces、Copilot 等 AI orchestration 平台能力。

它最值得我们借鉴的地方有三点：

1. **AI 变革的单位从“个人会用工具”升级为“团队工作流被重构”**。Zapier 的 2026 V2 AI Fluency Rubric 明确把最低门槛从“用过 AI 并能描述影响”抬高为：AI 嵌入核心工作、形成可重复系统、对质量/效率/结果有清晰影响。
2. **AI adoption 被制度化进人才入口和管理系统**。Zapier 在申请、初筛、技能测试、终面四个环节持续采集 AI fluency 信号，并把 AI 实验和影响力纳入绩效预期。
3. **内部实践和产品战略形成飞轮**。Zapier 内部用 AI 做客户成功、销售、HR、支持、内容、工程、财务、RevOps 等流程；这些实践反过来强化其“AI orchestration platform”的产品定位。

一句话：Zapier 的核心不是“人人用 AI”，而是“人人能把 AI 接进真实工作系统，并对结果负责”。

## 1. 信息来源

本报告主要阅读和整理以下公开来源：

- Zapier, Wade Foster, 2026-01-08, *How Zapier rolled out AI org-wide: Our playbook to driving 97% adoption*  
  https://zapier.com/blog/how-zapier-rolled-out-ai/
- Zapier, Steph Spector, 2026-01-19, *AI at Zapier: How we use artificial intelligence to streamline work*  
  https://zapier.com/blog/how-zapier-uses-ai/
- Zapier, Tracy St.Dic, 2025-05-21, *From AI-friendly to AI-first: How Zapier is transforming hiring and onboarding*  
  https://zapier.com/blog/zapier-ai-first-hiring-leaning/
- Zapier, Tracy St.Dic, 2026-03-31, *One year later: Raising the AI fluency bar for every Zapier hire*  
  https://www.zapier.com/blog/raising-ai-fluency-bar-in-hiring/
- Zapier, Jane Zhang, 2025-01-22, *Introducing Zapier Agents: AI agents that automate work across your apps*  
  https://zapier.com/blog/introducing-zapier-ai-agents/
- Zapier, Steph Spector, 2026-04-03, *Zapier MCP: Perform tens of thousands of actions in your AI tool*  
  https://zapier.com/blog/zapier-mcp-guide/
- Zapier, Sami Akkawi, 2026-04-02, *How to build safe and trustworthy AI agents with Zapier*  
  https://zapier.com/blog/safe-trustworthy-ai-agents/
- Zapier, Miguel Rebelo, 2026-03-03, *How to improve AI agents*  
  https://zapier.com/blog/improve-ai-agents/
- Zapier product page, *Zapier MCP*  
  https://zapier.com/mcp
- Zapier product page, *Zapier Agents*  
  https://zapier.com/agents

## 2. Zapier 的 AI 子话题地图

| 子话题 | Zapier 的实践 | 对 AI 组织变革的意义 |
|---|---|---|
| 全员 AI adoption | 从 curiosity、Code Red、AI Hackathon 到 97%/100% 使用率；用调查追踪 adoption。 | AI 采用不能靠号召，要有危机叙事、动手场、工具供给、指标追踪和反复强化。 |
| AI fluency / 人才门槛 | 所有新员工必须达到最低 AI fluency；V2 把 Capable 门槛提高到核心工作嵌入、可重复系统、结果改善。 | AI 能力从培训项变成招聘、入职、绩效和晋升的共同语言。 |
| AI-first onboarding | 入职不只学产品，而是从第一天识别机会、搭建 AI-powered workflow、形成 builder mindset。 | 新员工培养目标从“理解公司流程”转向“参与重构工作系统”。 |
| 内部 AI workflow | 客户成功、销售、HR、支持、技术写作、内容、教育、L&D、工程、财务、RevOps 等均有 AI 工作流。 | AI 最先落地的不是抽象战略，而是高频、重复、信息密集、有明确输出的工作节点。 |
| Agents | Zapier Agents 被定义为能访问业务数据、跨应用工作、独立处理任务的 AI teammates。 | 组织中的“岗位”会出现可配置的数字队友，人的工作从执行转向定义目标、审批、治理和优化。 |
| MCP / AI action layer | Zapier MCP 让 Claude、ChatGPT、Cursor 等 AI 工具通过 Zapier 连接 9,000+ app 和 30,000+ actions。 | AI 从“会说”变成“会做”，企业需要一个可治理的 action layer。 |
| Agent 安全与治理 | 安全 agent 需具备 defined scope、human oversight、content safeguards、observability、recoverability。 | AI 治理不能事后补丁化，而要在 agent 设计阶段内建权限、审批、监控和可恢复性。 |
| Agent 质量运营 | Agent 需要版本控制、sandbox、目标/scorecard、输出采样、测试集、changelog、持续迭代。 | AI 系统不是一次性上线，而是进入“产品运营 + 质量工程”循环。 |
| 产品战略 | Zapier 把自己定位为 AI orchestration platform：Zaps、Tables、Interfaces、Agents、Chatbots、Copilot、MCP 共同组成系统。 | 公司产品战略从“连接应用”升级为“编排 AI、数据、工具和工作流”。 |

## 3. 变革路径：Zapier 如何把 AI 从兴趣变成组织能力

### 3.1 Curiosity：先让高层和早期采用者建立体感

Zapier 的 AI 旅程不是从完整战略开始，而是从创始人和早期团队成员对 GPT-3、ChatGPT 的持续试用开始。关键不是一开始就有正式项目，而是领导层先亲自感到“这里有隐藏能力”。这给后续变革提供了真实信念，而不是外部压力下的表态。

对我们有用的判断：AI 变革必须先让核心管理层建立体感。没有体感的 AI 战略容易变成采购清单；有体感的领导者才会愿意重构工作、角色和资源配置。

### 3.2 Code Red：把 AI 明确变成公司级议题

2023 年 GPT-4 发布后，Zapier 发起内部 Code Red。它不是精致方案，而是公开表达紧迫性：AI 已经到来，不行动是确定性风险。Zapier 后续总结中强调，透明沟通紧迫性、讲清不行动风险，是推动 adoption 的关键。

这对应变革管理中的“制造必要张力”。如果 AI 仍被描述为“可选效率工具”，组织就会按旧优先级行动；如果它被定义为工作方式和竞争力变化，组织才会重排时间和注意力。

### 3.3 Hackathon：暂停正常工作，让每个人动手

Code Red 后，Zapier 暂停一周工作，做全公司 AI Hackathon。工程团队可以做 AI features，非技术团队可以把 AI 用进日常任务。这个动作的价值不是提交了多少作品，而是让全员形成 tactile feel：AI 到底能改变什么。

Zapier 的做法有几个要点：

- 全公司参与，而不是只给技术团队。
- 主题是 build something real，而不是听培训。
- 允许失败和重复，不急着清理所有试验。
- 通过 demo、Slack channel、working groups、Q&A 和 hack weeks 反复扩散。

对组织启发：AI training 如果停留在听课和工具介绍，会很快消散。真正的最小变革单元应该是“带着真实工作问题，在安全边界内做出一个 workflow 或 agent，并公开演示前后变化”。

### 3.4 Foundations：安全、采购、赋能、冠军网络、结构并行

Zapier 并不是让员工随意使用 AI。它同时搭建了基础设施：

- Legal 和 Security 制定 AI 使用指南，明确哪些工具可用、数据隐私如何处理、哪些数据不可使用。
- Procurement、Legal、Engineering 协作，加快 AI 工具审批和上手。
- 建立中央 AI Enablement knowledge hub。
- 让懂 AI 的高势能人员成为 champion，录 Loom、做示范、帮助团队。
- 同时采取 top-down 和 bottom-up：公司层面对关键产品能力做重点推进，小团队则快速试、快速分享。

这说明 AI adoption 的底座不是“自由试用”，而是“有边界的自由”：员工敢试，是因为合规、安全、采购、学习材料和内部支持已经替他们铺好路。

### 3.5 From hackathons to habits：从活动进入日常工作流

Zapier 后续不再把 AI 视为活动，而是把它嵌入 daily process。它上线了 Zapier on Zapier，内部团队用自家平台和 AI 工具自动化 brief generation、PRD drafts、internal reporting 等关键工作。Support 团队的 Sidekick ticket summarizer 把 average handle time 减半；People 团队无代码构建 onboarding、feedback coaching、goal setting、pulse survey analysis 工具。

关键转折：AI 不再是“我个人今天用了 ChatGPT”，而是“团队工作流中多了一个可重复、可审计、能被他人使用的系统”。

### 3.6 Reinvention：从提效到重新设计工作

Zapier 明确区分“用 AI 做同样的工作更快”和“做过去不可能做的工作”。后者才是组织变革的核心。它提到团队开始 retrofitting and reimagining entire workflows；公司招聘速度没有过去快，因为现有团队有了更高杠杆；2025 年晚些时候还设立了 Chief People & AI Transformation Officer，把 people、systems、strategy 连接起来。

这已经进入 AI operating model 层：不是工具推广，而是组织结构、领导角色、工作流和人才机制的重设。

## 4. Zapier 的 AI 应用全景：按职能拆解

### 4.1 Customer Success / 客户成功

Zapier 用 AI 支持客户通话前准备、通话后摘要和客户情绪分析：

- AI 根据 HubSpot 中的 record/deal，收集公司信息、预测客户可能遇到的 automation challenges，并通过 Slack 发给相关人员。
- 从 CRM 拉取客户通话录音，生成摘要并发布到 Slack，帮助团队学习客户互动。
- 用 AI 分析客户 sentiment，形成更全面的客户旅程视图。

组织启发：客户成功中的 AI 价值不只是节省记录时间，而是把一线对话转化为可复用知识，帮助产品、销售、支持共享客户理解。

### 4.2 Sales / 销售

销售团队把 AI 用在 lead prioritization、call transcript、meeting summary、CRM 更新和内容检索：

- AI 生成销售通话 transcript 和 meeting summary，并自动写入 HubSpot 对应 lead。
- Sales managers 因此更清楚哪些 deal 接近成交，应该把时间投入哪些对象。
- 团队还搭建了 `#blog-post-search-agent`，销售人员在 Slack 输入主题，系统通过 Zapier Table、Agents 和 Zaps 返回相关博客文章，支持客户问题回答和销售材料准备。

组织启发：销售 AI 应用的第一阶段是减少行政记录，第二阶段是形成“客户上下文 + 内容资产 + 行动建议”的实时销售助手。

### 4.3 Onboarding and HR / 入职与 HR

Zapier HR 场景很有参考价值：

- 反欺诈申请：系统 enrich 申请人的 IP 地址和电话号码，将声明地点与真实信号比较，检查互联网号码，按 no/moderate/high fraud risk 分类；有风险时 Slack 提醒招聘人员，并把结果记录回招聘系统。
- 调研情绪分析：onboarding surveys、employment feedback、retreat assessment 等表单反馈由 AI 自动分析 positive/neutral/negative sentiment，并送到 Slack 或 Google Sheets。

组织启发：AI 在 HR 中不只是“写 JD/筛简历”，更适合做风险识别、候选人信号整合、员工体验反馈分析和流程质量监控。

### 4.4 Technical Support Operations / 技术支持运营

Zapier 支持团队的 AI 用法体现了“人机协同 + 知识检索 + 审批”的组合：

- Slack 支持频道中的 AI bot 可帮助排查 Zap 问题、提供自动化想法、加速学习产品功能。
- Daily summary 汇总前一天 Slack 中 escalated tickets、resolved issues 和讨论事项，提升团队可见性。
- 状态页更新：支持人员通过 Typeform 描述问题，AI 按模板和规则生成状态页文案，先发 Slack 审批，再通过 webhook 更新状态页。
- Support sidekick：支持成员用特定 emoji 标记 Slack 问题，ChatGPT 生成搜索词，Webhooks 拉取相关 help docs/blog posts，ChatGPT assistant 再结合 tickets、customer interactions、troubleshooting notes，在 Slack thread 回复带链接的步骤。

组织启发：支持场景最适合做 AI，因为知识密集、重复问题多、反馈闭环短。但必须设计审批点，尤其涉及客户可见状态页时，人类仍要确认。

### 4.5 Technical Writing / 技术写作

技术写作团队用 Zapier Agent 处理 release notes / product updates：

- 当 Zendesk 中发布 help center tutorial 时，agent 根据规则判断是否包含产品更新。
- 若包含，则根据文章上下文在 Google Docs 起草 product update。
- 之后通知 Slack 频道等待团队发布。

组织启发：文档团队的 AI 价值不是替代写作，而是把“从产品文档识别更新点、生成候选稿、提醒发布”变成监控型工作流。

### 4.6 Content and Video / 内容与视频

内容团队使用 AI 做文章摘要、outline、meta description，并搭建多 agent 系统生成 feature guide 初稿：

- 作者通过 Zapier Form 提交 built-in tool 名称和相关 help docs。
- Zap 创建 Zapier Table record，作为多 agents 的 single source of truth。
- Agent 1 去 Zapier Community 研究客户问题、常见痛点、正面反馈和 desired outcomes。
- Agent 2 用 Glean 搜索内部文档，找普通和高级用例。
- Agent 3 根据研究和模板写初稿。
- 另外四个 agents 分别处理客户语言、Zapier style、AI 腔重写、内部链接补充。
- 完成后生成 Google Doc，并通过 Slack DM 发给作者。

组织启发：复杂内容生产不适合一个超级 prompt，而适合拆成多个职责清晰的 agents。多 agent 的意义不是玄学，而是把“研究、结构、语气、引用、链接”分成可检查步骤。

### 4.7 PR / Social / Marketing Ops

Zapier 提到 PR 和社媒团队从 qualified leads 或 webhooks 数据中查找信息、筛选标准、写入 Zapier Tables。RevOps 团队则用 ChatGPT 根据用户信息自动生成 trial expiration emails 和个性化邮件文案。

组织启发：营销 AI 不是“写更多内容”这么简单，而是把用户数据、生命周期节点、渠道内容和个性化文案连接成自动化系统。

### 4.8 User Education / 用户教育

用户教育团队使用 ChatGPT 将英文视频课程字幕翻译成十种热门语言，同时保持 SRT 时间戳；还在学习课程中嵌入 Zapier Chatbots，让客户根据角色和技术栈发现更相关的自动化想法和用例。

组织启发：AI 可用于“规模化学习体验个性化”：翻译解决语言覆盖，chatbot 解决学习路径和场景匹配。

### 4.9 Learning and Development / 学习发展

L&D 团队创建了大量 chatbots，支持员工 coaching tips、training ice breakers、meeting ice breakers 等。Zapier 强调，关键是给 AI 足够具体的 company context、role context 和 clear purpose，输出才会贴合组织。

组织启发：内部学习 bot 的质量不在模型本身，而在上下文资产：公司语境、角色语境、场景目的和输出标准。

### 4.10 Engineering / 工程

工程团队的 AI 用法覆盖 sprint planning、ticket creation、Zendesk metrics、daily standup、performance review：

- 把 Slack 消息摘要转成 Jira ticket，并加入 sprint。
- 对 Zendesk ticket 中每条 message 进行分类，提取指标如 replies 数，并写入 Google Sheet 进行追踪。
- 自动收集 Google Calendar、Jira、Slack、GitLab 等系统中的个人成果，汇总成 daily standup。
- 用 Zapier MCP 让 Cursor 通过 Glean actions 访问内部公司数据、过去绩效评审和个人 achievements scratchpad，生成格式化绩效自评并提交到绩效管理工具。

组织启发：工程 AI 的价值不止代码生成。更大的杠杆在“把分散在开发、沟通、支持、绩效系统中的上下文收集起来”，形成可行动的任务和证据。

### 4.11 Accounting / 财务会计

Accounting 团队把 AI 接入项目管理 flow：

- 从 Slack 拉取任务列表，按重要性优先级排序，并给出预计完成时间。
- 个人财务示例中，系统从信用卡邮件提醒中提取 vendor、amount，分类后写入 Google Sheet；企业场景中可用于费用分析和财务规划。

组织启发：财务 AI 可以先从任务编排、凭证/邮件信息抽取、分类、优先级和审计准备切入，而不是一开始挑战最终财务判断。

### 4.12 Revenue Operations / 收入运营

RevOps 用 AI 自动生成 trial expiration emails：系统从 marketing automation system 拉取用户信息，生成突出相关 Zapier features 的邮件，不需要复杂 if/then 逻辑。

组织启发：RevOps 的 AI 应用核心是“动态文案 + 用户状态 + 生命周期触发”的组合，替代过去笨重的规则树。

## 5. 产品化路径：Zapier 把内部能力做成 AI orchestration 平台

Zapier 对外把自己定义为 AI orchestration layer。它不是单一 AI 写作工具，而是把 AI apps、agents、chatbots 与企业工具连接起来的工作流底座。

### 5.1 Zapier Agents：AI teammate

Zapier Agents 被定义为能访问业务数据、跨应用工作、按自然语言指令执行任务的 AI teammates。它们可以：

- 与用户自然聊天，理解任务。
- 连接 7,000+/9,000+ 应用。
- 访问 live business data。
- 一旦被教会，就独立处理任务。
- 通过浏览器扩展跟随用户在网页上工作。

这其实是把组织里的“流程执行者”产品化。它的组织含义是：一些过去需要 coordinator、researcher、assistant、ops specialist 执行的任务，会被拆成 agent instructions、knowledge sources、app permissions 和 review checkpoints。

### 5.2 Zapier MCP：AI action layer

Zapier MCP 的定位是让 Claude、ChatGPT、Cursor 等 AI 工具从“能想、能写”变成“能行动”。它通过 Zapier 现有集成网络，让 AI 使用 9,000+ app connections 和 30,000+ actions。产品页显示，Zapier MCP 已有 195,000+ MCP servers、4.6M+ tool calls、250,000+ apps connected。

对企业来说，MCP 的关键不是技术新鲜感，而是治理价值：

- 不同 AI 客户端可以共用一个连接层。
- IT 可以统一控制哪些 app、哪些 action 可用。
- 企业级限制、managed connections、workspace controls 可延续。
- 每个 action 有 history log，便于审计。

组织启发：未来企业 AI 基础设施会分成三层：model layer、context layer、action layer。Zapier 抢的是 action layer 位置。

### 5.3 Zaps + Tables + Interfaces + Chatbots + Copilot

Zapier 的组合拳是：

- Zaps：事件触发和动作执行。
- Tables：工作流中的结构化数据和 single source of truth。
- Interfaces / Forms：收集输入、触发流程。
- Agents：执行复杂任务。
- Chatbots：对内/对外问答和引导。
- Copilot：辅助搭建和排错。
- MCP：让外部 AI 客户端调用动作。

这解释了 Zapier 为什么适合 AI 时代：AI 需要上下文、工具、动作和反馈闭环，而 Zapier 原本就拥有跨应用连接和自动化基础。

## 6. 治理和质量：Zapier 对 AI agent 的成熟理解

Zapier 关于 agent 安全和改进的文章非常值得单独吸收，因为它把“AI agent 很酷”拉回了生产系统基本功。

### 6.1 安全 agent 的五个条件

Zapier 认为可信 agent 应该具备：

- Defined scope：只访问完成特定任务所需的 app、data、actions。
- Human oversight：高风险决策前有人审查批准。
- Content safeguards：对 PII、prompt injection、toxic content 等进行输入/输出筛查。
- Observability：能看见 agent 做了什么、何时做、为什么做。
- Recoverability：不给 agent 不可逆权限。

这套原则很适合我们沉淀为 AI 工作流治理模板。尤其是 recoverability：低风险任务可自动化，高风险任务必须保留 human-in-the-loop。

### 6.2 Agent 不是上线一次，而是持续维护

Zapier 的 agent improvement framework 包括：

- 版本控制和 sandbox。
- 设定 objective 和 scorecard。
- 收集 20-50 个近期输出样本。
- 对输出打分，识别主要问题。
- 建测试集。
- 做假设、改配置、短周期测试。
- 写 changelog。
- 上线后持续迭代。

质量指标包括 correctness/completeness、groundedness、helpfulness/clarity、tone/format/brand。dealbreakers 包括 hallucination、违反安全/合规、错误使用工具、忽略关键指令。

### 6.3 常见问题诊断

Zapier 对 agent 失败原因的归纳很务实：

- 幻觉/事实错误：检查 RAG、知识库冲突、上下文窗口。
- 工具使用不可预测：工具描述过于相似、工具过多、模型能力不足。
- 外部系统交互失败：工具 schema、API 权限、参数说明有问题。
- 语气/品牌不稳定：模型过于话痨、system instructions 不清楚、温度设置不合适。
- token 成本高：system instructions、知识库 chunk、用户输入过长；必要时做对话摘要。
- 多 agent 系统不稳定：上游 agent 未完成、等待逻辑不对、返回信息过多或过少。

这说明 agent 运营会成为新的组织能力：不是所有员工都要会训练模型，但越来越多岗位需要会定义任务、配置工具、评估输出、迭代知识库和维护 workflow。

## 7. Zapier 案例对 AI 组织设计的核心启发

### 7.1 AI-first 组织不是“买工具”，而是五个系统同时变化

Zapier 至少改了五个系统：

1. **文化系统**：Code Red、Build the Robot、hackathon、leader demo、shared learning。
2. **工具系统**：approved AI tools、AI Enablement hub、Zapier on Zapier、Agents、MCP。
3. **流程系统**：客户、销售、支持、HR、内容、工程等 workflow 重构。
4. **人才系统**：AI fluency bar、招聘评估、onboarding、learning programs、ERG experiment。
5. **治理系统**：AI guidelines、security/legal、scope、human oversight、audit logs、version control。

任何只改其中一个系统的 AI 转型都会偏。

### 7.2 岗位能力要从“工具熟练”转为“工作流资产”

Zapier V2 最重要的进步是把 Capable 门槛提高为：

- AI embedded into core work。
- Repeatable systems, not one-off prompts。
- Clear impact on quality, efficiency, or related outcomes。

这给我们一个判断标准：一个员工说自己 AI 能力强，不应只看他会不会写 prompt，而应看他是否沉淀了可重复 workflow、agent、dashboard、knowledge base、automation template，并能证明前后结果变化。

### 7.3 管理者的 AI 能力标准要更高

Zapier 对 manager 的要求高于 IC：管理者要创造实验安全感、设定预期、留出 upskilling 空间、通过真实实施带动 change management，并重构团队 workflow。

这对我们的职级/干部体系很关键：AI 时代管理者不只是“会用 AI 的个人”，而是“能让团队用 AI 改变产出方式的人”。干部评估里应加入：

- 是否推动团队关键流程 AI 化。
- 是否建立可复用工作流资产。
- 是否降低团队使用门槛。
- 是否管理 AI 风险和质量。
- 是否把人从低价值重复工作中释放出来。

### 7.4 AI adoption 要看分布，不只看均值

Zapier 强调 AI usage distributed，不是一支团队特别强，而是各团队都在找到用法。这个视角很重要。组织 AI 成熟度不只看全员使用率，还要看：

- 哪些岗位已经进入 workflow redesign。
- 哪些岗位还停在 summarization/writing。
- 哪些团队已经产出 reusable systems。
- 哪些团队已有 AI champions。
- 哪些流程已有质量和治理闭环。

### 7.5 新岗位不一定先出现，旧岗位边界先改变

Zapier 案例中，很多变化不是先新增 AI job family，而是原有岗位的工作方式改变：

- PM/Designer 可以 shipping code。
- EA 可以拥有 exec AI infrastructure。
- Support 可以维护 sidekick。
- HR 可以构建反欺诈和情绪分析 workflow。
- Engineering 可以用 MCP 连接绩效证据和内部知识。
- Content 可以编排多 agent 内容生产线。

这支持我们现有研究假设：AI 时代不一定立即新增大量岗位族群，更常见的是在原有岗位中加入 AI capability profile、workflow ownership 和 system stewardship。

## 8. 可直接借鉴的落地方案

### 8.1 建一个中文 AI Fluency Rubric

建议采用四级：

| 等级 | 定义 |
|---|---|
| 不达标 | 只用 AI 做零散辅助，核心工作未变，无法说明影响。 |
| 合格 | AI 已嵌入核心工作，有可重复流程，并能说明效率/质量改善。 |
| 进阶 | 能连接多工具、多数据源、多步骤流程，形成团队可复用系统。 |
| 变革 | 能重构工作如何发生，改变团队角色分工、流程和产出模型。 |

四个评估组件：

- Mindset：好奇、实验、愿意重构旧方法。
- Strategy：知道哪些工作值得 AI 化，能判断 ROI 和风险。
- Building：能搭 workflow / agent / dashboard / automation。
- Accountability：能定义结果标准、验证输出、承担责任。

### 8.2 招聘面试加入四个触点

参照 Zapier：

- 申请：让候选人描述最近一个 AI 改造工作的例子。
- 初筛：问当前 AI 使用、失败案例、放弃过的工具、学习速度。
- 技能测试：给真实岗位任务，允许/要求使用 AI，看过程和结果。
- 终面：检查战略判断、责任边界、AI-first 组织适配度。

### 8.3 入职 30 天任务改成 builder challenge

每个新员工入职 30 天内完成：

1. 识别本岗位一个高频、低风险、信息密集流程。
2. 用 AI + 自动化搭一个最小可用 workflow。
3. 记录 before/after：时间、质量、错误率、体验、可复用性。
4. 做一次 demo。
5. 把 workflow 资产沉淀到团队知识库。

### 8.4 建 AI workflow 资产库

资产库每条记录包括：

- 适用岗位/场景。
- 触发条件。
- 输入数据。
- 使用工具和权限。
- 输出格式。
- 人工审批点。
- 质量检查方法。
- 风险和不可用场景。
- 负责人和版本。
- 效果数据。

### 8.5 管理者纳入 AI adoption OKR

建议对管理者增加三个结果要求：

- 每季度至少推动一个团队级 workflow 从手工/半手工变成 AI-assisted 或 AI-orchestrated。
- 至少沉淀一个可复用 AI workflow asset。
- 对关键 AI workflow 建立质量、权限、审计和迭代机制。

## 9. 对我们的 OD 情报中心主题的贡献

### 对“岗位族群改革”的贡献

Zapier 提供了一个非常好的反例：AI 变革未必先通过新增 job family 表达，而是通过每个岗位的 AI fluency bar 和 role-specific rubric 表达。岗位族群可以保持相对稳定，但岗位画像中要加入 AI capability、workflow ownership、agent stewardship 和 accountability。

### 对“职级/晋升”的贡献

可以把 AI 能力作为晋升证据：

- 初级：能在个人任务中安全使用 AI。
- 中级：能把 AI 嵌入核心工作，形成可重复流程。
- 高级：能搭建团队可复用系统，带动他人使用。
- 专家/管理者：能重构工作模式、治理风险、提升组织杠杆。

### 对“薪酬/激励”的贡献

Zapier 没有直接谈薪酬，但其 V2 rubric 可为激励设计提供能力分级底座。对 AI 能力强的人，不一定立刻新增岗位序列，也可以通过：

- 项目激励。
- AI workflow asset 奖励。
- 技能津贴。
- 晋升证据加权。
- 内部平台贡献认可。

### 对“组织设计”的贡献

Zapier 的组织设计信号包括：

- 设置 Chief People & AI Transformation Officer。
- 管理者对 team AI adoption 负责。
- AI 从单点工具变成 operating system。
- Teams reimagining workflows，而不是只做个人效率优化。
- 公司招聘速度下降但产出提升，说明 AI 进入 workforce planning。

## 10. 风险提醒

Zapier 的做法很先进，但不能照搬：

- Zapier 原本就是自动化公司，有“Build the Robot”文化，迁移成本低于传统组织。
- 其产品和内部需求高度同构，内部 dogfood 能直接反哺产品；其他公司未必有同样飞轮。
- 高 AI fluency bar 可能提高招聘门槛，也可能误伤传统强专业但 AI 起步较慢的人，需要提供准备材料和公平评估。
- 如果只追求 adoption rate，容易出现表层使用；必须同时看 workflow redesign、system assets 和 measurable impact。
- Agent 规模化后，权限、审计、数据安全和责任边界会变成硬问题。

## 11. 最终判断

Zapier 的 AI 实践已经从“工具采用”进入“组织能力重构”。它的路径可以概括为：

```text
Curiosity
→ Code Red
→ 全员 Hackathon
→ 安全/采购/赋能基础设施
→ 内部 AI workflow
→ 招聘与入职 AI fluency
→ 绩效和管理者责任
→ Agents / MCP / orchestration 产品化
→ Operating model reinvention
```

对我们最有价值的，不是照抄 Zapier 的工具，而是照搬它的判断标准：

> AI 能力是否真实成立，不看一个人会不会用 AI，而看 TA 是否能把 AI 嵌入核心工作，形成可重复系统，交付可度量结果，并对输出质量和风险负责。

这句话可以成为我们后续设计 AI 组织能力模型、岗位画像、干部评估和人才发展路径的核心原则。
