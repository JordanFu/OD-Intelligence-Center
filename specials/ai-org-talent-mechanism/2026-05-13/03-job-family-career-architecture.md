# 2026-05-13｜专题三：岗位、族群、序列的持续建设

> 主题：AI 时代岗位是否变宽、专家岗位是否变深、序列诉求背后的激励/薪酬/市场溢价诉求  
> 写入范围：`specials/ai-org-talent-mechanism/2026-05-13/03-job-family-career-architecture.md`  
> 证据来源：公开信息联网核验 + 仓库内部知识源交叉整理

---

## 1. 今日一句话结论

AI 时代的岗位族群建设不是简单“新增 AI 序列”，而是出现了两股相反但同时成立的力量：面向业务交付的岗位正在变宽，面向模型、评测、安全、推理基础设施等护城河能力的专家岗位正在变深；很多“要建新序列”的真实诉求，其实是关键技能定价、薪酬带宽不足、项目激励不足或外部市场溢价无法表达。

## 2. 今日核心判断

### 判断一：岗位变宽成立，但主要发生在业务交付和管理协调层

Coinbase 官方博客在 2026-05-05 明确把裁员、扁平化和 AI-native 工作方式放在同一套组织动作里：组织层级压到 CEO/COO 以下最多 5 层，领导者可能管理 15+ 直接下属，取消纯管理者，改为 player-coach，并试验“工程师、设计师、产品经理合一”的 one person team。[Coinbase](https://www.coinbase.com/blog/building-a-leaner-and-faster-coinbase)

Block 2026-03-31 官方文章则从组织原理层面解释：AI 可以替代层级承担的信息路由功能，因此人类角色收敛为 IC、DRI、player-coach 三类。这里的“岗位变宽”不是把所有人都变成全才，而是把过去分散在产品、协调、项目管理、部分技术执行中的责任重新组合到更靠近客户结果的角色上。[Block](https://block.xyz/inside/from-hierarchy-to-intelligence)

Amazon Ring/Blink 的 Builder 试点提供了另一个信号。Reuters 报道称，两个业务单元将白领产品相关员工统一为 builder，管理者称为 builder leader；但 Amazon 同时强调薪酬、成长和晋升路径不变。这说明外部 title 可以变宽，但内部 level、pay band、promotion path 仍然是治理底盘。[Reuters via Investing.com](https://www.investing.com/news/stock-market-news/in-two-amazon-units-builder-replaces-traditional-job-titles-4633350)

**OD 启示：** 岗位变宽的适用对象，是 AI 能显著降低交接、执行和协调成本的工作。对这类工作，岗位说明书应从“任务清单”改为“端到端结果 + 决策边界 + AI/Agent 使用规范”。

### 判断二：专家岗位变深也成立，且越靠近 AI 核心能力越明显

Block 在提出角色收敛时并没有否定专家，反而把 IC 定义为在系统特定层级构建和运营能力、模型、智能层、界面的深度专家。[Block](https://block.xyz/inside/from-hierarchy-to-intelligence)

Anthropic 当前公开招聘页显示，AI 核心公司正在把专家岗位拆得更深：Model Evaluations 要求把模糊的“模型能力”转化为可辩护指标，并建设可在训练 checkpoint 上稳定运行的 eval 平台，年薪区间 $320k-$485k；Safeguards ML Infrastructure 要求建设实时/批量分类器、安全评测、监控、回滚等安全关键基础设施，年薪区间 $320k-$405k；Inference 工程岗位强调请求路由、算力编排、批处理、缓存、多区域部署，年薪区间 $300k-$485k。[Anthropic Model Evaluations](https://job-boards.greenhouse.io/anthropic/jobs/5198255008) / [Anthropic Safeguards](https://job-boards.greenhouse.io/anthropic/jobs/4778843008) / [Anthropic Inference](https://job-boards.greenhouse.io/anthropic/jobs/4951696008)

**OD 启示：** “岗位变宽”不能被误读为“专业化消失”。越是决定企业 AI 护城河、风险暴露和规模化能力的领域，越需要更深的专家梯队、清晰的任职资格、技术影响力标准和特殊薪酬机制。

### 判断三：序列诉求背后，经常是激励、薪酬和市场溢价诉求

字节跳动 2025-12-19 全员信把新职级 L1-L10 与薪酬激励同步推出：提高所有职级总包上下限，调薪投入提升 1.5 倍，奖金投入提升 35%，期权/RSU 从一次发 4 年改为 3 年，并提高现金占比。[DoNews](https://www.donews.com/news/detail/1/6317714.html)

PwC 2025 Global AI Jobs Barometer 显示，同一职业中具备 AI 技能的员工有 56% 薪资溢价，且 AI 暴露岗位所需技能变化速度比其他岗位快 66%。这支持一个判断：许多“新增 AI 序列”的请求，本质不是职业路径缺失，而是企业现有薪酬带宽无法表达外部市场价格。[PwC](https://www.pwc.com/gx/en/services/ai/ai-jobs-barometer.html)

Gartner 也把 2026 年人才管理压力指向补偿和职业发展：入门级岗位下降会造成中层通道断裂，保留顶尖人才需要直面 compensation and career development；同时 CHRO 需要进行 talent remix，而不是只把裁员归因于 AI。[Gartner Talent Management](https://www.gartner.com/en/newsroom/press-releases/2025-10-29-gartner-identifies-four-trends-talent-management-leaders-should-prepare-for-in-2026) / [Gartner Future of Work](https://www.gartner.com/en/newsroom/press-releases/2026-01-12-gartner-identifies-the-top-future-of-work-trends-for-chros-in-2026)

**OD 启示：** 当业务要求“建一个 AI 序列 / Agent 序列 / 算法产品序列”时，应先诊断真实诉求。如果诉求是“涨薪、留人、匹配市场 offer、给项目贡献分奖金”，优先用薪酬带宽、市场稀缺系数、项目激励、RSU refresh 或津贴解决，避免把岗位体系做成激励预算的旁门。

## 3. 今日证据地图

| 证据 | 观察 | 对专题三的含义 |
|---|---|---|
| Coinbase 官方重组 | 5 层以内、15+ span、no pure managers、AI-native pods、one person teams | 岗位变宽、管理者 player-coach 化成立 |
| Block 官方组织文章 | 公司 world model 替代层级信息流；角色收敛为 IC/DRI/player-coach | 岗位变宽的底层逻辑是信息协调成本下降 |
| Amazon Builder 试点 | title 变宽，但薪酬/晋升路径不变 | 外部 title 可简化，内部职级薪酬治理不能消失 |
| Anthropic JD | Evals/Safeguards/Inference 高度专业化且高薪 | 核心专家岗位变深，不能一概合并 |
| Deloitte 2026 | 84% 企业未围绕 AI 重设计岗位；新角色包括 AI operations managers、人机交互专员、quality stewards | 角色重设计仍是大缺口，新角色需谨慎制度化 |
| PwC AI Jobs Barometer | AI 技能 56% 薪资溢价，技能变化快 66% | 序列诉求常是技能定价和市场溢价诉求 |
| 字节全员信 | 新职级与总包上下限、奖金、RSU 归属同步调整 | 职级改革常与激励资源重配绑定 |
| 百度职级调整 | 中管层以下专业/管理通道打通，T/P/E/Band/M 统一为 5-12 级 | 国内案例支持去标签化与复合型人才诉求，但一手性弱于官方财报和海外官方材料 |

## 4. 专题分析：岗位、族群、序列如何持续建设

### 4.1 岗位变宽：从“职能任务”转向“端到端结果”

内部知识库的 BCG AI-First 运营模型指出，AI-first 不是在旧流程上叠加工具，而是围绕 Agent 重新设计结构、流程和工作方式；人类负责结果定义、上下文、战略、风险和问责，Agent 在约束内执行。`knowledge/concepts/ai-first-operating-model.md`

因此，岗位变宽最适合出现在三类场景：

1. 交接成本高、流程碎片化、重复协调多的业务链路。
2. AI 能完成大量执行任务，但仍需要人类做目标设定、判断、质量把关的岗位。
3. 业务结果可被一个小团队或单一 owner 端到端负责的场景。

不宜把岗位变宽理解为“一个人包打天下”。更准确的表达是：岗位边界从功能分工转向结果边界，员工从“做某类任务的人”转为“调动工具、Agent、数据和协作者达成结果的人”。

### 4.2 专家岗位变深：从“通用专家”转向“关键能力域专家”

内部知识库的能力-判断矩阵强调，分工要同时回答“AI 能不能”和“AI 应不该”。`knowledge/concepts/capability-judgment-matrix.md`

当一个能力域同时具备高技术复杂度、高风险暴露和强战略差异化时，应优先建设深专家岗位，而不是合并到通用序列。例如：

- 模型评测、红队、安全分类器、Agent 运行监控。
- 推理基础设施、算力调度、低延迟工程、模型部署可靠性。
- 数据治理、主权 AI、合规审计、模型风险。
- 行业知识工程、复杂客户场景解决方案架构。

这些岗位的任职资格应强调“可验证产出”：平台可靠性、评测覆盖率、风险发现率、推理成本下降、事故响应、研究生产化能力，而不仅是年限或 title。

### 4.3 序列诉求：先问“组织问题”还是“定价问题”

新增序列会带来长期制度成本：任职资格、晋升评审、薪酬带宽、横向对齐、绩效口径、外部映射都要重做。若问题只是市场稀缺或短期项目贡献，用序列解决会让岗位体系膨胀。

一条实用判断：如果三个月后业务需求可能变，优先用技能标签或项目角色；如果一年后技能价格可能变，优先用市场稀缺系数或带宽调整；只有当能力域稳定存在、可形成独立产出、可沉淀成长路径、且与其他族群的评价标准显著不同，才新建序列。

## 5. 新建序列 vs 技能标签 vs 激励/薪酬机制：适用边界

| 机制 | 适用场景 | 典型例子 | 不适用信号 | OD/HR 关键动作 |
|---|---|---|---|---|
| 新建序列 / job family | 能力域长期稳定、职责边界清晰、评价标准与现有族群不同、可形成多层级成长路径 | AI Safety、Model Evals、AI Infra、Agent Operations、数据治理 | 只是热门技能、短期项目、少数关键人保留诉求 | 定义职责边界、任职资格、层级标准、晋升委员会、与现有 band 映射 |
| 技能标签 / skill tag | 技能横跨多个岗位，变化快，需要盘点、组队、学习路径和内部流动 | Prompting、Agent 编排、低代码、行业知识图谱、AI 审校 | 标签被拿来要求涨薪或替代职级 | 建技能字典、熟练度等级、认证方式、项目匹配规则 |
| 市场稀缺系数 / market premium | 同岗位因外部市场供需产生价格差，需要在薪酬上表达 | AI Infra、推理优化、数据平台、安全工程 | 业务想借此永久抬高所有同类岗位成本 | 建稀缺系数有效期、复核频率、样本来源、退出机制 |
| 项目激励 / milestone bonus | 短周期、高不确定、跨职能攻坚，对结果贡献需要即时激励 | Agent 上线、流程自动化节省、模型评测平台搭建 | 项目已常态化运行，贡献应纳入常规绩效 | 定义里程碑、收益口径、团队分配规则、复盘机制 |
| 薪酬带宽调整 / broadband | 现有族群整体市场价格上移，旧带宽压不住 offer 和保留 | AI 工程、算法平台、行业解决方案专家 | 只有个别明星员工问题 | 用市场数据重估带宽，保留内部公平校准 |
| 专项津贴 / allowance | 稀缺技能暂时性、工作条件特殊或承担额外责任 | on-call 安全值守、模型发布窗口、关键系统保障 | 变成无期限固定工资替代品 | 设置期限、条件、复核和退出规则 |

## 6. 对 OD Intelligence Center 的落地建议

1. **岗位架构先做“宽窄分层”。** 将岗位分为宽岗位、深专家、治理岗位、项目角色四类，不要把所有 AI 相关工作都塞进一个“AI 序列”。
2. **新增序列必须过四问。** 是否长期存在？是否有独立产出？是否需要独立评价标准？是否无法用技能标签和薪酬机制解决？
3. **把技能标签做成流动基础设施。** 技能标签服务于盘点、组队、学习和内部流动，不直接等同于职级。
4. **把市场溢价从序列里拆出来。** 对稀缺技能设 market premium 或薪酬带宽上调，比新建序列更灵活，也更容易退出。
5. **保护初级岗位的人才管道功能。** Gartner 关于 entry-level decline 的提醒很关键：低复杂度任务被 AI 接管后，组织仍要设计“AI 协同学徒制”，否则未来中层和专家供给会断。
6. **保留内部治理底盘。** Amazon Builder 试点说明，title 可以简化，但 pay band、level、promotion path 必须清楚，否则变宽会变成公平性争议。

## 7. 待验证清单

1. 继续寻找百度全员信全文或 HR FAQ，确认套改规则、是否影响薪酬带宽、晋升标准和管理/专业通道映射。
2. 继续追踪 Amazon Ring/Blink Builder 试点后，员工在简历、内部晋升、外部招聘上的实际反馈。
3. 建立 AI 核心专家 JD 样本池，覆盖 OpenAI、Anthropic、Google DeepMind、Meta、ByteDance、腾讯、阿里云，用职责、薪酬、level 验证“专家岗位变深”。
4. 收集 market premium、skill premium、project bonus、RSU refresh 的企业制度案例，补强“不要用新序列解决薪酬问题”的操作证据。

## 8. 来源索引

### 外部公开来源

- Coinbase 官方博客：Brian Armstrong, “Building a leaner and faster Coinbase”, 2026-05-05. https://www.coinbase.com/blog/building-a-leaner-and-faster-coinbase
- Block 官方文章：Jack Dorsey & Roelof Botha, “From Hierarchy to Intelligence”, 2026-03-31. https://block.xyz/inside/from-hierarchy-to-intelligence
- Reuters 转载：In two Amazon units, “builder” replaces traditional job titles, 2026-04-23. https://www.investing.com/news/stock-market-news/in-two-amazon-units-builder-replaces-traditional-job-titles-4633350
- Deloitte：State of AI in the Enterprise 2026. https://www.deloitte.com/us/en/what-we-do/capabilities/applied-artificial-intelligence/content/state-of-ai-in-the-enterprise.html
- Gartner：Top Future of Work Trends for CHROs in 2026, 2026-01-12. https://www.gartner.com/en/newsroom/press-releases/2026-01-12-gartner-identifies-the-top-future-of-work-trends-for-chros-in-2026
- Gartner：Four Trends Talent Management Leaders Should Prepare for in 2026, 2025-10-29. https://www.gartner.com/en/newsroom/press-releases/2025-10-29-gartner-identifies-four-trends-talent-management-leaders-should-prepare-for-in-2026
- PwC：The Fearless Future: 2025 Global AI Jobs Barometer. https://www.pwc.com/gx/en/services/ai/ai-jobs-barometer.html
- Anthropic：Research Engineer, Model Evaluations. https://job-boards.greenhouse.io/anthropic/jobs/5198255008
- Anthropic：ML Infrastructure Engineer, Safeguards. https://job-boards.greenhouse.io/anthropic/jobs/4778843008
- Anthropic：Staff + Sr. Software Engineer, Inference. https://job-boards.greenhouse.io/anthropic/jobs/4951696008
- DoNews：字节跳动全员信：提升薪酬与激励，优化期权归属，2025-12-19. https://www.donews.com/news/detail/1/6317714.html
- 科创板日报：百度发全员信通知职级体系大调整，2026-04-28. https://www.cls.cn/detail/2357688
- Baidu IR：Baidu Announces Fourth Quarter and Fiscal Year 2025 Results, 2026-02-26. https://ir.baidu.com/news-releases/news-release-details/baidu-announces-fourth-quarter-and-fiscal-year-2025-results/

### 仓库内部知识源

- `digest.md`
- `daily/2026-05-13.md`
- `AI时代的职级变革-全球大公司组织架构调整追踪.md`
- `specials/job-levels/2026-05-12.md`
- `knowledge/index.md`
- `knowledge/wiki/bcg-2026-04-design-company-for-ai.md`
- `knowledge/concepts/ai-first-operating-model.md`
- `knowledge/concepts/capability-judgment-matrix.md`
- `knowledge/concepts/end-to-end-journey-redesign.md`
- `knowledge/summaries/r001-bcg-zh.md`
- `knowledge/summaries/r002-deloitte-zh.md`

---

*本专题三日报用于 OD Intelligence Center 2026-05-13 四专题汇总。*
