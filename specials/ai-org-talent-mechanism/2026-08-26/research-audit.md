# 2026-08-26｜研究审计与证据边界

> 严格窗口：2026-08-25 18:00—2026-08-26 18:00（Asia/Shanghai）。本文件记录搜索、去重、降级与排除，不替代五份正式报告。

## 1. 工作流与覆盖

- 四专题分别由独立代理起草，主代理逐篇复核事实、等级、重复来源和跨专题冲突。
- 渠道并行覆盖：官方/一手、权威媒体/公司案例、咨询与专业研究、招聘 JD/薪酬、社媒/职场/公众号、内部信息库。
- 内部知识源读取：digest.md、最近 14 天 daily/ 与 daily-report/、knowledge/catalog.json、knowledge/index.md、相关 wiki/concepts/summaries、四专题历史稿与基线账本。
- 外部检索优先使用 AnySearch；学术垂直域按正确参数调用后返回“API Error: tool 'list_domains' not found: tool not found”，已降级为通用搜索、官方页面与 ATS feed。
- 09:41—18:00 再扫描未发现可新增为 L2/L3 的组织机制结果；记录“零结果”，没有用旧报告填补。

## 2. 证据等级

| 等级 | 本日口径 | 允许用途 |
|---|---|---|
| L4 | 同一机制有多源、可审计的长期业务与人员后效 | 强结论、扩围 |
| L3 | 官方/法律原件与可靠独立来源交叉，或跨案例稳定机制 | 窄事实或历史机制 |
| L2 | 单一高信誉媒体、可核调查/页面事实、正式披露 | 观察、假设与验证设计 |
| L1 | 供应商自报、匿名回应、招聘意图、单一公司叙事 | 线索、问题与指标 |
| L0 | 无绝对时间、无原文、社媒匿名、搜索摘要 | 不进入结论层 |

本日没有 L4。星宇校招事实链达到 L3，但不是 AI 组织机制结果；四专题直接新增最高为 L2。

## 3. 来源族去重

- daily → digest → daily-report 是同一编辑链，不是三份独立证据。
- OpenAI、Perplexity、Harvey 各自的多张 Ashby 页面分别只算一个公司/ATS 来源族；岗位页同时按唯一 ID 和岗位族去重。
- iCIMS 新闻稿、公司新闻室和转载属于同一个 iCIMS×Lighthouse 调查根。
- 腾讯多家报道回到同一匿名公司回应，不构成多源互证。
- WalkMe 官方页与分发镜像属于同一调查根；官方顶部日期、正文日期和分发时间存在冲突，报告已显式标注。
- 内部 Tibo 的 analysis、synthesis、wiki、concept、catalog/index 是同一研究产品的多种呈现，不重复计数。

## 4. 关键时间校正

| 材料 | 校正后处理 |
|---|---|
| 字节 TRAE/扣子并入豆包 | 36氪首发 8/25 07:55，动作 8/24，均早于窗口；列旧线 L2，不计今日新增 |
| OpenAI 数据中心负责人离职 | CNBC 8/26 05:23、TechCrunch 08:06（北京时间），落窗 L2 |
| 大众汽车治理冲突 | Reuters 8/25 19:03 起（北京时间），落窗 L2 |
| OPM 绩效规则诉讼 | Reuters 8/26 02:44（北京时间），落窗 L2 |
| 腾讯 AI 游戏部门回应 | 8/25 18:44—20:43，落窗但匿名窄回应 L1 |
| 星宇校招事件 | 政府口径经可靠媒体于 8/25 21:22 起发布，事实链 L3 |
| Amazon 公民开发 | 官方仅标日期、无时分，严格窗口不计新增，保留 Context |
| OpenAI/Perplexity/Harvey ATS | 保存 publishedAt 与唯一 ID；仅代表当前发布/再发布字段 |

## 5. 降级与排除

1. 字节由晨稿“L3 当日机制”降为“旧线 L2 窄事实”；没有周期、人效、层级、跨度与员工结果。
2. WalkMe 与 iCIMS 将调查事实和效果外推拆分；自报数字可核，生产率/招聘质量改善只作 L1。
3. Holly、Electric 是产品能力发布，不是客户组织结果。
4. Amazon 无精确时分，排除出严格窗口新增。
5. 招聘页面不换算批准编制、offer、到岗、人才密度、岗位族成熟或晋升制度。
6. 大众的裁员数字是方案/测算，不是已批准决定；与 AI 的直接因果弱。
7. OPM 诉讼中的违法、政治化等是原告主张，不是法院认定。
8. 星宇事件不写成 AI 替岗；“业务—岗位—预算失配”是治理假设，已证事实止于 440/107、沟通问题、道歉与 HR 总监停职。
9. McKinsey、BCG、Deloitte 严格窗口无新报告；旧材料只作历史 Context。
10. LinkedIn、X、Reddit、知乎、小红书、脉脉和公众号没有同时满足原文、绝对时间与机制细节的新增材料，全部停留 L0。

## 6. 来源统计与缺口

- 公司/治理可核事实族：OpenAI、大众、OPM 诉讼、腾讯回应、星宇，共 5 个。
- 专业/供应商发布族：WalkMe、iCIMS、Holly、Electric，共 4 个。
- ATS 公司来源族：OpenAI、Perplexity、Harvey，共 3 个。
- 旧线：字节 1 个；严格时间缺口：Amazon 1 个；社媒/公众号合格新增 0。
- 直接减层结果 0；同一人才队列生命周期闭环 0；正式新岗位族/序列制度 0；直接晋升制度 0；L4 组织结果 0。

## 7. 主要搜索词

- 2026-08-26 字节 TRAE 扣子 团队 汇报线 调整 豆包 飞书
- August 26 2026 OpenAI infrastructure leader departure data center
- Volkswagen workers Lower Saxony alternative turnaround proposals Reuters
- AFGE NFFE OPM performance evaluations suitability complaint
- 腾讯 IEG 游戏AI引擎部 400 500人 回应
- 星宇股份 校招生 解约 107 人 人力负责人 停职 官方
- August 26 2026 official promotion policy peer review talent committee
- AI skills badge certification recertification promotion compensation official
- OpenAI Perplexity Harvey Ashby publishedAt salary
- site:mckinsey.com OR site:bcg.com OR site:deloitte.com AI organization workforce August 26 2026
- site:mp.weixin.qq.com AI 组织 晋升 人才委员会 2026年8月26日

## 8. 审计结论

本日最可靠的交付不是宣告新趋势，而是把事实边界收紧：**组织改革先审治理权，人才密度先审净合格产出，岗位体系先审长期责任，晋升先审持续证据与横向公平。**任何来源若只提供裁员数、岗位页、AI 自信、产品能力或市场报价，都不足以越过永久结构、序列或职级变更的决策门槛。
