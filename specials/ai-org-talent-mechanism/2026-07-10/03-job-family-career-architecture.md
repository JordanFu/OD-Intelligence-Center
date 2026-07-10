# 2026-07-10｜专题三：岗位、族群、序列的持续建设

> 研究状态：正式决策稿。今日采用内部知识源代理、外部渠道检索、专题代理和主代理交叉验证；内部来源包括 `digest.md`、`daily/2026-07-10.md`、`knowledge/`、`specials/`、专题三 baseline/evidence-map 与 W28 周报。

## 0. 读者应该带走什么

今天的重点不是给每个 AI 新词建岗位、族群或序列，而是把岗位体系从“职责清单”升级为“责任系统”：这个岗位做什么判断、掌握哪些 AI 工作流、对哪些业务结果负责、承担哪些质量/风险/控制面责任。多数 AI 能力今天仍应先进入技能标签、项目角色、稀缺系数或薪酬带宽调整，而不是新建正式序列。

## 背景材料

今日背景材料来自 `daily/2026-07-10.md`、`digest.md`、2026-07-09 专题三正式稿、job-family-career-architecture baseline/evidence-map、W28 周报，以及 BCG AI at Work、Harvard Business Publishing role fluidity、BCG AI-first、Deloitte role fusion、字节 TRAE、Momenta、T3、Reid Hoffman 岗位说明书三要素等材料。

## 1. 今日一句话专题判断

岗位体系正在从“岗位名/序列名”转向“判断责任 + AI 工作流 + 业务结果 + 控制面责任”的组合管理；但今天仍不支持新建公司级 AI 岗位族群或序列，优先动作是用岗位五分法分流。

## 2. 今日新增事实：只写可追溯事实

1. **Harvard Business Publishing 提出岗位非线性演化。** 文章基于领导力研究提出职责可能碎片化、融合或消失，并以 UBS 信贷审批为例：信贷官从逐笔审批转向参数定义、场景测试和教练 AI 系统。来源：Harvard Business Publishing，L3。
2. **Reid Hoffman 访谈整理提出未来 JD 三要素。** 未来岗位说明书要写清做哪些判断、掌握哪些 AI 工作流、对哪些业务结果负责。来源：笔记侠/公开转述，L1-L2，可作为方法论线索。
3. **Deloitte role fusion 说明 forward-deployed 是 archetype，不只是 title。** 其原则是用 AI 减少 handoff，让相邻技能在一个 outcome role 中合并，同时保留审批和控制边界。来源：Deloitte，L3。
4. **字节 TRAE / AI Development 线索说明 AI coding 需要新责任池。** 90% 代码由 AI 生成但吞吐提升约 60%，暴露验证、维护、架构、权限和跨角色协作责任。来源：极客公园/火山引擎线索，L2。
5. **FDE/agent identity 官方 JD 显示候选责任包加厚。** Okta Principal FDE 负责 agent identity、delegation、audit、kill-switch reference architecture；Databricks/Turing FDE 负责生产化 GenAI deployment 与客户/产品回流。来源：官方招聘页，L2。
6. **国内网约车、自动驾驶、AI 制药线索显示岗位分化。** T3 数字员工、Momenta 驻场交付、字节 AI 制药拆分与外部科学顾问提示行业会出现远程安全、AI 训练、流程治理、跨界信用锚等责任池。来源：`daily/2026-07-10.md`，L1-L2。

## 3. 今日核心判断

1. **岗位说明书要从职责清单改成责任系统。可信度：高。** 今日最可用的表达是：判断、AI 工作流、业务结果、质量/风险责任。为什么重要：这能减少“新词等于新岗位”的冲动。
2. **应用层岗位继续变宽，专家层岗位继续变深。可信度：中高。** 业务、产品、运营、交付岗位更端到端；AI infra、模型评估、agent identity、AI safety、推理优化更专业化和高溢价。为什么重要：岗位体系要同时容纳 broad role fusion 和 deep expert premium。
3. **“会用 AI”只适合作为技能标签，不适合作为新序列依据。可信度：高。** 除非责任对象、质量指标、薪酬带宽、晋升路径和跨业务复用都稳定，否则新增序列会制造身份膨胀和薪酬不公平。为什么重要：避免把培训口号固化成组织复杂度。
4. **FDE/AI Development/AgentOps/AI治理仍是候选责任池，不是成熟序列。可信度：中高。** 今日 JD 和案例证明责任包变厚，但仍缺公开 career ladder、晋升标准和完整薪酬带宽。为什么重要：先试点责任包，再决定是否建族群。
5. **个体效率提升不能直接转译成岗位压缩。可信度：中高。** 字节 TRAE 与 Bun 共同说明瓶颈会转向验证、集成、质量、架构和知识传承。为什么重要：岗位设计要防止维护债和隐性人力消耗。

## 4. 重点案例事实还原

### 案例 A：Harvard Business / UBS 动态角色

- **背景：** AI 让审批、分析、文档等 starter tasks 发生重组，传统静态 JD 难以反映真实工作。
- **动作：** UBS 信贷审批场景中，AI 承接无人干预审批，信贷官角色转向参数、场景和系统行为的设计与校准。
- **机制：** 岗位从“执行审批动作”转向“定义判断边界、测试例外场景、教练 AI 系统、承担风险责任”。
- **结果：** 证明岗位责任可能变宽和变高阶，但不等于岗位消失。
- **可借鉴点：** 岗位模板新增判断、AI workflow、业务结果和控制责任四栏。
- **不可照搬点：** 高监管审批场景必须保留明确问责和审计，不能只追求 role fusion。

### 案例 B：字节 TRAE / AI coding 责任池

- **背景：** 研发团队从人工写码进入 AI 生成、验证、修复和提交全流程。
- **动作：** AI 生成代码占比高，但真实吞吐提升低于代码生成率。
- **机制：** 新责任池包括需求拆解、AI 输出验证、架构约束、可维护性治理、异常处理、权限安全、跨角色上线规则。
- **结果：** 说明“AI 代码债治理”“AI Development Harness”“AI 输出验证”可能成为岗位责任，但暂不构成成熟序列。
- **可借鉴点：** 用技能标签和项目角色承接，先观察 2-3 个业务单元是否重复出现。
- **不可照搬点：** 不要把 AI coding 贡献率写进岗位价值或晋升主指标。

### 案例 C：Okta Principal FDE for AI Agents

- **背景：** 企业部署 agent 后，身份、授权、审计、delegation、kill-switch 成为生产基础设施。
- **动作：** Okta 招 Principal FDE，要求定义 canonical agent identity、delegation、audit、kill-switch patterns，并把 field learning 反馈到 product roadmap。
- **机制：** FDE 从客户交付扩展到 reference architecture、标准化模式、技术权威和团队杠杆。
- **结果：** 强化 AI governance / agent identity 的深专家溢价，但仍缺完整岗位族群材料。
- **可借鉴点：** 先做责任包和技能标签，配合稀缺系数与项目激励。
- **不可照搬点：** 不要因为一个厂商岗位就新建全公司序列。

## 5. Context 层

- 暂不形成结论，但提示我们关注：百度、阿里、腾讯、字节等职级数字化/通道融合报道可能反映复合人才需求，但需官方制度文本核验。
- 暂不形成结论，但提示我们关注：T3 数字员工会催生 AI 训练、远程安全、流程治理等责任，但原岗位转岗路径未明。
- 暂不形成结论，但提示我们关注：AI 制药跨界案例说明长周期行业需要“信用锚人才”，不只是算法人才。
- 暂不形成结论，但提示我们关注：title-less 或大岗位不是不要岗位体系，而是要更清晰的责任、薪酬和绩效校准。
- 暂不形成结论，但提示我们关注：FDE 热也可能说明产品自助化不足，不能只当作先进组织形态。

## 6. 证据地图

| 渠道 | 今日证据 | 证据等级 | 用途 |
|---|---|---:|---|
| 官方/一手 | Okta/Databricks/Turing FDE JD；BCG/Deloitte/HBP | L2-L3 | 责任包、role fusion、动态岗位 |
| 权威媒体/咨询 | BCG、Deloitte、Harvard Business Publishing、HBR | L2-L3 | 方法论与边界 |
| 公司案例 | UBS、字节 TRAE、Momenta、T3、AI 制药 | L1-L3 | 岗位分化与责任池 |
| 学术/研究 | Nubank Agent 论文；GenAI at Work 旧线 | L2-L3 | AI 环境下的新学徒制和验证责任 |
| 招聘薪酬 | FDE/Principal FDE/AI Engineer FDE 薪酬与职责 | L2 | 市场溢价与责任包 |
| 社媒/职场线索 | Reid Hoffman、李飞飞访谈整理 | L1-L2 | 岗位模板和人才结构观点 |
| 内部信息库/知识库 | 专题三 baseline/evidence-map、W28、2026-07-09 正式稿 | L3 内部基线 | 五分法与边界校准 |

## 7. 对我们行动的启发

落地启发：今天真正有价值的不是新增岗位名，而是建立岗位五分法。管理层该问新岗位诉求到底是长期责任包、技能标签、市场溢价、项目激励，还是为关键人涨薪包装头衔。

1. 所有新 AI 岗位申请必须写清：责任对象、可问责结果、现有岗位为何不能承接、是否只是薪酬/保留诉求。
2. 对 AI coding、Agent、HR AI 同事等项目，绩效指标不要看使用率，要看端到端交付、质量、风险和复用资产。
3. 对初级岗位压缩风险，设计 AI 环境下的新学徒制：验证轮岗、双稿对照、例外处理、导师责任和项目证据包。
4. 对稀缺专家，先用市场稀缺系数、项目奖金、股权刷新或带宽调整，避免 title inflation。
5. 每季度跑一次岗位五分法审查：新建岗位、建族群/序列、技能标签、薪酬工具、坚决不新增。

## 8. 方法论：岗位五分法

| 情境 | 应对方式 | 判断标准 |
|---|---|---|
| 何时新建岗位 | 建岗位 | 责任对象稳定、端到端问责、有质量/成本/风险/客户结果指标、2-3 个业务单元重复出现、现有岗位无法承接 |
| 何时新建族群 | 建族群 | 多个岗位共享能力模型、成长路径、评价标准、市场供给逻辑和薪酬对标 |
| 何时新建序列 | 建序列 | 专家深度、晋升证据、薪酬带宽、管理替代路径和跨业务复用都成立 |
| 何时只用技能标签 | 不建岗位 | 能力快速变化、跨多个岗位、不能独立问责，例如 AI fluency、模型选择、输出校验、工具安全意识 |
| 何时用市场稀缺系数 | 调薪酬工具 | 原岗位责任基本不变，但 AI safety、model evaluation、AI infra、inference optimization 等能力被市场系统性加价 |
| 何时用项目激励 | 项目奖金/临时授权 | 短期攻坚、客户部署、流程智能体化、系统迁移、合规整改、关键交付 |
| 何时用专项津贴/临时补贴 | 过渡补偿 | 旧流程迁移、夜间护航、工具替换、内部培训、合规修复等过渡期额外负担 |
| 何时坚决不新增序列 | 拒绝 | 单团队诉求、为关键人涨薪包装 title、缺评价标准/晋升路径/外部对标、职责 6-12 个月内高度不稳定、会制造薪酬公平争议 |

## 9. 待验证清单与下一步搜索路径

1. FDE career ladder compensation band promotion criteria OpenAI Replit AWS Databricks Okta。
2. AI governance role model evaluation job family pay band。
3. China company AI sequence job family salary band skill tag project bonus。
4. AI coding productivity throughput generated code ByteDance TRAE Force。
5. Entry-level jobs AI apprenticeship redesign company program。

## 10. 来源索引

- Harvard Business Publishing, The Fluid Future of Work, https://www.harvardbusiness.org/insight/the-fluid-future-of-work-rethinking-roles-in-the-age-of-intelligent-machines/
- Deloitte, The work chart vs. org chart, https://www.deloitte.com/us/en/what-we-do/capabilities/applied-artificial-intelligence/articles/role-fusion-organizational-delayering.html
- BCG, Design Your Company for AI, Not AI for Your Company, https://www.bcg.com/publications/2026/design-your-company-for-ai-not-ai-for-your-company
- Okta, Principal Forward Deployed Engineer - Okta for AI Agents, https://job-boards.greenhouse.io/okta/jobs/7961339
- Databricks, AI Engineer - FDE U.S. Federal Sector, https://job-boards.greenhouse.io/databricks/jobs/8546365002
- Turing, Fullstack Forward Deployed Engineer, https://job-boards.greenhouse.io/turing/jobs/6007383004
- 极客公园 字节 TRAE，https://www.geekpark.net/news/367002
- OD Intelligence Center 内部来源：`daily/2026-07-10.md`、`digest.md`、`specials/ai-org-talent-mechanism/2026-07-09/03-job-family-career-architecture.md`、`specials/ai-org-talent-mechanism/baseline/03-job-family-career-architecture.md`、`specials/ai-org-talent-mechanism/weekly/latest-detailed.md`
