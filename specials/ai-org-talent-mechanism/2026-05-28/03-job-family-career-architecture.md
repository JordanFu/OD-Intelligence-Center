# 2026-05-28｜专题三：岗位、族群、序列的持续建设（Job Family / Career Architecture）

## 1. 今日一句话专题判断

当 agent 能跨系统执行（computer-using agents）、把政策嵌入流程（policy execution）、并被纳入正式治理对象（owner/身份/审计）时，岗位体系的基本单位会从“功能 title”迁移到“**责任对象（workflow / policy / agent）+ 权限边界 + 审计与例外升级字段**”：很多组织争议不再靠“新增序列/改 title”解决，而要靠 `job family + level guide + pay band + 证据包字段` 解决。

## 2. 今日新增事实（可追溯）

- Microsoft 于 2026-05-26 发布 Copilot Studio 更新，computer-using agents GA，并推出 workflows 体验与 agent-to-agent 通信，强调可覆盖没有 API 的旧系统流程执行。来源：https://www.microsoft.com/en-us/microsoft-copilot/blog/copilot-studio/new-and-improved-computer-using-agents-a-new-workflows-experience-and-real-time-voice-experiences/  
- SAP 于 2026-05-15 发布 sustainability AI agents，覆盖包装合规、GHS 分类与标签、工作场所安全等，并披露效率改进指标；显示“政策/合规”开始作为可执行约束进入工作流。来源：https://news.sap.com/2026/05/autonomous-enterprise-new-sustainability-ai-agents/  
- Microsoft Learn 文档中对 Entra Agent ID 的管理员关系与角色分工进行说明（例如 agent owner、sponsor、manager 等角色与治理边界，具体以文档为准）。来源：https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/administrative-relationships-of-agents  
- McKinsey 于 2026-05-11 提出 agentic AI 将冲击组织默认的四条运行规则，其中之一是“绩效只评估人”。来源：https://www.mckinsey.com/capabilities/people-and-organizational-performance/our-insights/the-organization-blog/how-agentic-ai-challenges-four-rules-your-organization-runs-on  

## 3. 今日核心判断（3-5条）

1. **岗位体系必须先回答“谁对 workflow/policy/agent 负责”，再回答“岗位叫什么”。可信度：高。**  
   - 证据基础：computer-using agents 把执行边界推到 legacy UI；SAP 把政策嵌进可执行流程；Entra Agent ID 文档给出 agent 管理关系与角色分工方向。  
   - 为什么重要：一旦可行动主体扩展到 agent，事故与合规风险的问责链必须可追溯；否则组织会用“新增头衔/新增序列”掩盖责任缺口。
2. **job family 的升级方向是“治理接口化”：`owner/权限/审计/override` 成为共同语言层。可信度：中高。**  
   - 证据基础：SAP 的 policy-bearing agents 需要规则 owner 与 override；Microsoft 的工作流与执行能力让“谁能发起动作/谁能批准”成为关键制度问题。  
   - 为什么重要：这为“规则 owner/工作流 owner/agent owner”类职责提供了可稳定定义的岗位边界，有利于薪酬带宽与晋升承接。
3. **“只做技能标签、不做岗位承接”在政策执行场景更危险。可信度：中。**  
   - 证据基础：政策进入运行时约束后，组织必须有明确责任承接；技能标签难以承接审计、例外升级与风险责任。  
   - 为什么重要：当出现不合规阻断或误阻断时，组织需要明确谁能 override、谁对后果负责、谁复盘并修规则。
4. **同时要避免“为了 agent 新建一堆序列”的过度设计：先用现有序列承接，再用稀缺系数/专项激励处理溢价。可信度：中。**  
   - 证据基础：当前更多是平台能力信号与治理框架信号；行业对新岗位族群的稳定度仍在形成期。  
   - 为什么重要：过早固化会让组织僵化；更稳妥的是先把责任对象与证据字段写清，再观察是否需要独立 job family。

## 4. 重点案例事实还原（SAP：政策执行型 agents 如何倒逼“规则 owner / override owner”岗位清晰化）

- 背景：ESG/合规过去常被当作“报告与审查流程”，与业务执行分离；SAP sustainability agents 显示政策开始以运行时约束进入流程，甚至阻断不合规动作。  
- 时间线：  
  - 2026-05-15：SAP 发布 sustainability AI agents 新闻稿。  
- 动作：  
  - 将监管准备、包装合规、GHS 分类标签、工作场所安全等跨职能流程纳入 agent 执行与编排。  
  - 把可持续/合规数据与财务、采购、运营、安全等数据连接到同一治理框架（以官方口径为准）。  
- 机制（对岗位体系的要求）：  
  - 必须定义：规则由谁维护（rule owner）、例外由谁批准（override owner）、阻断造成业务损失时由谁承担责任（risk owner）。  
  - 必须把审计字段写进岗位职责：谁能查看日志、保留期、抽检机制与复盘节奏。  
- 结果（已披露/待披露）：  
  - 已披露：效率改进指标与覆盖流程范围；但未披露客户组织如何设置 owner/委员会/校准机制。  
- 争议与阻碍：  
  - “政策阻断”会把业务与合规的冲突前置化，需要明确治理层级与升级路径，避免演变为新的官僚层。  
- 可借鉴点：  
  - 先在 policy-heavy 场景把 owner/override/审计字段固化，再扩展到更广泛的工作流与岗位族群。  
- 不可照搬点：  
  - 只上工具不改责任链，会导致阻断/误阻断后无人兜底，最终迫使组织回到人工审批与层级加码。

## 5. Context 层（暂不形成结论，但提示关注）

- 暂不形成结论，但提示我们关注：**“computer-using agents + policy execution”可能会重塑后台职能的岗位边界**。当执行穿透到旧系统，很多“凭经验卡点”的岗位会被迫转型为“规则维护/例外处理/质量审计”。  
- 暂不形成结论，但提示我们关注：**国内企业对 title 的市场识别依赖更强**。若岗位定义从 title 迁移到“责任对象+证据字段”，需要更强的沟通与薪酬带宽承接，否则会引发外部可比性焦虑。  

## 6. 证据地图（按渠道）

- 官方/一手：Microsoft Copilot Studio 更新；SAP sustainability agents；Microsoft Learn（Entra Agent ID 管理关系文档）。  
- 权威媒体/咨询：McKinsey（四条运行规则）。  
- 公司案例：SAP（policy execution）、Microsoft（legacy UI 执行 + workflow 编排）。  
- 学术/研究：今日未新增 job architecture 的强实证研究（延续跟踪）。  
- 招聘薪酬：可追踪 “workflow owner / policy owner / agent owner / audit” 类岗位 JD 与 pay band 信号（列入待验证）。  
- 社媒/职场线索：对“岗位被 AI 吃掉/岗位被重写”的讨论多，但缺乏制度文本，仅作线索。  
- 内部信息库/知识库：`digest.md`、`daily/2026-05-28.md`、`specials/ai-org-talent-mechanism/baseline/03-job-family-career-architecture.md`。  

## 7. 对我们行动的启发（方法论：什么时候新建岗位/族群/序列 vs 技能标签 vs 溢价承接）

- **先定义“责任对象与治理接口”**：  
  - 责任对象：workflow / policy / agent / data access / exception handling  
  - 治理接口：owner、审批权、override、审计字段、保留期、抽检、回滚、事故响应
- **什么时候新建岗位/族群/序列（建议规则）**：  
  - 职责稳定（>12–18 个月）且跨部门共用  
  - 可审计（能写清证据字段与日志口径）  
  - 可训练（能形成能力地图与成长路径）  
  - 可定价（能解释稀缺性与 pay band）  
  - 对风险/价值关键（合规/质量/成本/安全）
- **什么时候只用技能标签/项目角色**：  
  - 仍在探索期、职责边界频繁变化  
  - 组织尚不能给出审计与责任链  
  - 主要诉求是短期交付而非长期能力沉淀
- **什么时候用市场稀缺系数/专项津贴/带宽调整（而不是新增序列）**：  
  - 真实诉求是“关键人才溢价承接”，而不是需要一条长期序列  
  - 现有序列能承接职责，但 pay band 不够
- **什么时候坚决不新增序列**：  
  - 无法写清责任链与审计口径（出了问题无法问责与复盘）  
  - 只是为少数人绕开规则或包装 title  

## 8. 待验证清单与下一步搜索路径

1. Entra Agent ID 的更完整治理模型：owner/sponsor/manager 的职责边界、审批与审计字段。搜索路径：Microsoft Learn/安全白皮书。  
2. Copilot Studio 的组织落地样板：企业如何把 UI-based agent 接入审批链、例外升级与回滚。搜索路径：客户案例/管理员文档。  
3. SAP sustainability agents 的客户组织设计：规则 owner/override owner 如何设置，是否出现新的岗位族群。搜索路径：SAP 客户案例/大会演讲。  
4. 国内企业的对应实践：飞书/钉钉/企业微信是否出现“policy execution + agent 执行层”的岗位与制度。搜索路径：产品白皮书/客户案例/JD。  

## 9. 来源索引

- Microsoft｜Copilot Studio update: computer-using agents GA（2026-05-26）：https://www.microsoft.com/en-us/microsoft-copilot/blog/copilot-studio/new-and-improved-computer-using-agents-a-new-workflows-experience-and-real-time-voice-experiences/  
- SAP｜Autonomous enterprise: new sustainability AI agents（2026-05-15）：https://news.sap.com/2026/05/autonomous-enterprise-new-sustainability-ai-agents/  
- Microsoft Learn｜Administrative relationships of agents（Entra Agent ID）：https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/administrative-relationships-of-agents  
- McKinsey｜How agentic AI challenges four rules your organization runs on（2026-05-11）：https://www.mckinsey.com/capabilities/people-and-organizational-performance/our-insights/the-organization-blog/how-agentic-ai-challenges-four-rules-your-organization-runs-on  
- 内部信息库｜`digest.md`、`daily/2026-05-28.md`、`daily-report/2026-05-28.md`

