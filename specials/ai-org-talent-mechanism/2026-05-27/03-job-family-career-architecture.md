# 2026-05-27｜专题三：岗位、族群、序列的持续建设（Job Family / Career Architecture）

## 1. 今日一句话专题判断

当企业开始为 agents 建“系统台账 + 身份（Agent ID）+ 运行时审计”，岗位体系的基本单位会从“职能 title”迁移到“**责任对象（asset/agent/workflow）+ 权限边界 + 审计/例外升级**”：很多组织争议不再靠新序列命名解决，而要靠 `job family + level guide + pay band + 证据包字段` 解决。

## 2. 今日新增事实（可追溯）

- Workday 在官方博客中宣布 Workday Agent System of Record 已一般可用，并描述其可记录/追踪 AI agent 交互，区分 agent 是代表用户行动还是作为自身行动，并在 Workday 安全模型下确保其访问权限与流程访问。来源：https://blog.workday.com/en-us/managing-ai-powered-future-of-work.html  
- Microsoft Entra 团队博客在介绍 Entra Agent ID 时明确提到：将把 Entra Agent ID 与 ServiceNow AI Platform 以及 Workday Agent System of Record 集成（以官方博客口径为准）。来源：https://techcommunity.microsoft.com/blog/microsoft-entra-blog/announcing-microsoft-entra-agent-id-secure-and-manage-your-ai-agents/3827392  
- Slack 在官方文章中提出：在 `Tools > Agents` 提供统一 agent browser（浏览 AgentExchange、管理 active agents、恢复对话），把 agent 的“发现与管理”收敛到协作中枢。来源：https://slack.com/blog/news/slack-is-where-agents-work  

## 3. 今日核心判断（3-5条）

1. **“岗位/序列是否新增”的本质，越来越像“责任对象是否从人扩展到 agent/workflow”，而不是命名游戏。可信度：高。**  
   - 证据基础：Workday 把 agent 纳入 system of record；Entra Agent ID 把 agent 当作一等身份；Slack 把 agent 目录与管理放进协作中枢。  
   - 为什么重要：当组织的“可行动主体”扩展到 agent，岗位体系必须回答：谁是 owner？权限边界是什么？出了问题谁负责？这些问题不解决，新增序列只会制造更大灰区。
2. **岗位族群（job family）需要从“功能”升级为“治理接口”：`owner/权限/审计/例外升级` 是新的共同语言层。可信度：中高。**  
   - 证据基础：Workday 强调 agent 的访问控制与交互记录；Entra 强调身份基础；Slack 强调集中管理。  
   - 为什么重要：这为“agent 资产治理类岗位”提供了可稳定定义的职责与边界，满足“可评价、可审计、可训练”的序列前提。
3. **“只用技能标签”会在 agent 时代更危险：因为权限与审计需要明确的责任承接，而标签很难承接问责。可信度：中。**  
   - 证据基础：平台侧正在把 agent 的权限与行为记录变成基础设施；这意味着组织必须能把“谁批准/谁审计/谁升级”的责任映射到明确角色。  
   - 为什么重要：当出事故时，标签化角色难以追责与改进；组织会被迫回到临时“补角色/补流程”的救火模式。
4. **但也要警惕“为 agent 新建一堆序列”的过度设计：优先用现有序列承接，只有满足稳定性与可定价性才新增。可信度：中。**  
   - 证据基础：目前更多是平台与治理基础设施信号，行业对“新岗位族群”的成熟度仍在形成期。  
   - 为什么重要：过早固化新序列会导致组织僵化；更稳妥的是以职责与证据包字段推进，再观察是否需要独立 job family。

## 4. 重点案例事实还原（Workday × Microsoft Entra：把 agent 变成“可注册、可授权、可审计”的组织对象）

- 背景：企业软件与身份系统开始把 agent 当作正式治理对象：既要“业务上下文/流程访问”（Workday），也要“身份/权限基础”（Entra）。  
- 时间线：  
  - Workday 侧：宣布 Agent System of Record 一般可用（官方博客）。  
  - Entra 侧：在 Entra Agent ID 的官方介绍中提到将与 Workday Agent System of Record、ServiceNow 等集成。  
- 动作：  
  - Workday：为 agent 提供记录/追踪与访问控制，强调能区分代表用户行动 vs 以自身身份行动。  
  - Entra：为 agent 提供身份基础与权限治理能力（Agent ID 叙事）。  
- 机制：  
  - 把 agent 从“插件/脚本”升级为“组织中可盘点、可授权、可审计、可下线”的资产对象，为后续的责任归属与岗位设计提供技术底座。  
- 结果（已披露/待披露）：  
  - 公开材料披露了系统能力与集成方向，但对组织岗位如何承接（owner/审计/升级）尚缺少可复原的客户落地细节。  
- 争议与阻碍：  
  - 组织侧最难的不是“能不能集成”，而是“谁来当 owner、谁来做审计、谁来兜底例外”，以及这些职责在 job architecture 中如何定价与晋升承接。  
- 可借鉴点：  
  - 先把 agent 纳入“台账 + 身份 + 审计”的基础设施，再谈扩大规模；岗位体系同步把 owner 与责任链写清。  
- 不可照搬点：  
  - 仅靠工具能力无法自动生成组织秩序；没有清晰的责任链与校准机制，反而会放大争议与风险。

## 5. Context 层（暂不形成结论，但提示关注）

- 暂不形成结论，但提示我们关注：**“agent 目录/注册/审计”可能会重塑 IT/安全/HR/法务之间的边界**，从而触发“谁来拥有这些新职责”的组织拉扯（需要更多客户落地案例验证）。  
- 暂不形成结论，但提示我们关注：**国内企业的 job architecture 表达方式可能更依赖 title**，若走向“角色与责任链优先”，需要更强的沟通与制度文本来承接市场可识别性。  

## 6. 证据地图（按渠道）

- 官方/一手：Workday ASOR 官方博客；Microsoft Entra Agent ID 官方博客；Slack 官方博客。  
- 权威媒体/咨询：今日未新增“岗位体系重构”深度长文（延续跟踪）。  
- 公司案例：Workday × Entra（agent 身份与台账）；Slack（协作中枢收敛入口）。  
- 学术/研究：今日未新增 job architecture 的实证研究（延续跟踪）。  
- 招聘薪酬：可跟踪“agent governance / identity / audit / control tower”相关岗位在 JD 中的职责边界（列入待验证）。  
- 社媒/职场线索：围绕 Agent ID 与治理的讨论多，但噪音高，仅作线索。  
- 内部信息库/知识库：`digest.md`、`daily/2026-05-27.md`、`knowledge/index.md`（PDF 自动入库索引含 Entra/治理相关研究）。

## 7. 对我们行动的启发（方法论：什么时候新增序列 vs 技能标签 vs 溢价承接）

- **先写“责任对象与治理接口”，再写岗位名**：  
  - 责任对象：agent / workflow / policy / runtime audit / identity  
  - 治理接口：owner、权限边界、审计口径、例外升级、成本归属、停用机制
- **什么时候新建岗位/族群/序列（建议规则）**：  
  - 职责稳定（>12–18 个月）且跨部门共用  
  - 可审计（能写清日志与证据字段）  
  - 可训练（能形成能力地图与成长路径）  
  - 可定价（能解释市场稀缺性与 pay band）  
  - 对组织风险/价值关键（安全/合规/质量/成本）
- **什么时候只用技能标签/项目角色**：  
  - 仍在探索期、职责边界频繁变化  
  - 组织尚无法给出审计与责任链  
  - 主要诉求是短期交付而非长期能力沉淀
- **什么时候用市场稀缺系数/项目激励/专项津贴/带宽调整（而不是新增序列）**：  
  - 真实诉求是“关键人才溢价承接”，而不是需要一条长期序列  
  - 现有序列能承接职责，但 pay band 不够  
- **什么时候坚决不新增序列**：  
  - 为少数人绕开规则  
  - 无法写清审计口径与责任链（出了问题无法问责与复盘）  
  - 会引发更大公平争议且没有治理方案

## 8. 待验证清单与下一步搜索路径

1. Workday ASOR 的“agent 角色模型”：是否提供标准角色模板（agent owner、approver、auditor 等）。搜索路径：Workday 产品文档/客户案例/大会演讲。  
2. Entra Agent ID 的“组织映射”：agent 与人的 delegation/impersonation 边界如何定义。搜索路径：Microsoft Learn/安全白皮书。  
3. Slack 的 agent browser 在企业内的治理粒度：目录、审批、权限、审计与下线。搜索路径：Slack admin docs。  
4. 国内企业的对应物：飞书/钉钉/企业微信是否提供 agent 目录与治理台账。搜索路径：产品发布/白皮书/客户案例。  

## 9. 来源索引

- Workday｜Managing an AI-powered future of work（ASOR 一般可用，2026）：https://blog.workday.com/en-us/managing-ai-powered-future-of-work.html  
- Microsoft Entra｜Announcing Microsoft Entra Agent ID（提及与 Workday/ServiceNow 集成）：https://techcommunity.microsoft.com/blog/microsoft-entra-blog/announcing-microsoft-entra-agent-id-secure-and-manage-your-ai-agents/3827392  
- Slack｜Slack is where agents work（2026-04-15）：https://slack.com/blog/news/slack-is-where-agents-work  
- 内部信息库｜`daily/2026-05-27.md`、`daily-report/2026-05-27.md`、`digest.md`

