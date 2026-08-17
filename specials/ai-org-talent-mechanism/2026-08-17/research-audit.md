# 2026-08-17｜四专题分渠道与内部知识源审计

> 本文件记录检索、去重、证据等级与结论边界，不代替四份专题日报。严格窗口为 2026-08-16 18:00—2026-08-17 18:00 CST；窗口外材料只作历史机制校准。

## 审计结论

- 严格窗口内没有发现直接回答四专题、且达到 L2/L3 的新企业机制材料。8 月 17 日可核实的增量主要是中国 AI 校招与关键人才任命线索，均保持 L1 Context。
- 今日最稳妥的判断不是“AI 正在普遍减层”，而是“任务与责任重组正在把判断、评测、产品化和控制能力前移”；永久组织层级、岗位序列和晋升制度尚无新闭环证据。
- 旧证据中，Intuit、Block、Netflix、GitLab、PwC 与 NBER 分别提供减层设计、角色拆分、人才密度、晋升校准、劳动力市场分化和组织结构反例；它们只用于校准机制，不包装成今日新闻。
- `daily/2026-08-16.md`、`digest.md` 对应条目与 `daily-report/2026-08-16.md` 是同一外部证据的不同加工层，只计一次；8 月 16—17 日专题占位内容不进入正式基线。
- `knowledge/catalog.json` 与知识卡 8 月 17 日的大量日期变化属于元数据刷新，不构成事实新增、精读完成或独立互证。

## 多代理工作流

| 代理 | 责任范围 | 产出 |
|---|---|---|
| 渠道 A | 官方/一手、权威媒体/咨询、公司案例与制度 | 十条证据根、动因反证、实施结果空白 |
| 渠道 B | 学术、招聘 JD/薪酬、社媒/职场、中国科技媒体 | 八条证据、学术反例、岗位与薪酬线索 |
| 内部知识源 | `digest.md`、近 14 日、`daily-report/`、`knowledge/`、历史专题与基线 | 同源去重、历史校准、判断变化与重复风险 |
| 四专题代理 | 扁平化、人才密度、岗位架构、晋升机制 | 四份互不复制的九段正式底稿 |
| 主代理 | 一手抽取、反事实检查、跨专题校准、页面与发布 | 总览、HTML、索引、状态与质量验收 |

## AnySearch 与检索审计

- 首选 AnySearch 批量搜索与原文抽取；学术代理先调用 `list_domains --domain academic`，服务端返回：`API Error: tool 'list_domains' not found: tool not found`，随后降级为通用检索并回到论文题录/摘要核验。
- AnySearch CLI 检查发现本机脚本相对安装版本存在超时参数改动；渠道 A 在实际检索中显式恢复 30 秒超时，端点、鉴权、请求参数与结果解析未发生变化。
- `freshness=day/week` 仍会返回旧页面，因此发布日期全部回到原页、监管文件或搜索题录复核，不把过滤器当时间证据。
- 代表搜索词：
  1. `2026-08-16 2026-08-17 company organization flattening managers official announcement AI`
  2. `2026-08-16 2026-08-17 talent density AI native company organization official`
  3. `2026-08-16 2026-08-17 job family career architecture promotion framework AI company official`
  4. `2026年8月17日 AI 招聘 组织 人才 管理 晋升`
  5. `2026 AI labor market job postings wage premium hybrid skills research`
  6. `2026 talent density AI teams generalist middle management academic research`
  7. `腾讯 负责人制 M标签 专业定级 晋升 2026`
  8. `site:gitlab.com job families levels promotion process career architecture`

## 代表证据根与边界

| 证据根 | 日期 | 等级 | 能确认 | 不能确认 |
|---|---:|---:|---|---|
| [Intuit SEC 员工信](https://www.sec.gov/Archives/edgar/data/896878/000089687826000024/fy26q3-ex9902.htm) | 5/20 | L3 动作 | 减层、前线决策、协调岗减少与团队整合被同时宣布 | 改革后跨度、质量、员工与经营结果 |
| [Block / Sequoia](https://sequoiacap.com/article/from-hierarchy-to-intelligence/) | 3/31 | L2-L3 动作 | 个人贡献者、直接责任人、实战型教练与信息层的目标设计 | 模式已稳定运行或优于其他结构 |
| [Netflix Culture](https://jobs.netflix.com/culture) | 持续页 | L2 制度主张 | 高薪、反馈、授权、keeper test 与育人责任的组合 | 员工体验与长期结果已独立验证 |
| [GitLab SA Career Development](https://handbook.gitlab.com/handbook/solutions-architects/sa-career-development/) | 2/9 更新 | L2 制度 | 提前两季度校准、同侪/委员会评审与预算约束 | 执行公平、申诉与晋升后效 |
| [PwC AI Jobs Barometer](https://www.pwc.com/gx/en/news-room/press-releases/2026/pwc-2026-ai-jobs-barometer.html) | 6/15 | L3 研究 | 10 亿+招聘广告中的 AI 岗增长、技能溢价和初级岗位高级能力前移 | 中国单家公司岗位、薪带和晋升制度 |
| [NBER 金字塔—钻石](https://conference.nber.org/conf_papers/f232578.pdf) | 4/10 | L3 工作论文 | AI 冲击可能压缩初级入口并使中部相对变厚 | 某一公司已发生该结构变化 |
| [新浪/投中网 AI 校招](https://finance.sina.com.cn/tech/roll/2026-08-17/doc-ininreaq9141235.shtml) | 8/17 | L1 | 当日媒体、平台统计与候选人叙事存在 | 净岗位增长、实际 offer、成熟岗位族或晋升结果 |
| [POSCO DX Agent 生命周期](https://newsroom.posco.com/en/posco-dx-makes-major-transformation-into-an-ai-native-company-leading-the-ai-market-with-physical-ai-and-agentic-ai/) | 8/4 | L2 公司自报 | Agent 招聘、评价、训练、晋升、退休与 200+ Agent 目录 | Agent 晋升等于人的晋升，或完整人岗架构已形成 |

## 内部知识源与去重

- 最近 14 天的连续证据仍是“交付/运营责任变宽＋安全、芯片、评测、数据和控制责任变深”；不能压成“全员全栈化”。
- `daily → digest → daily-report → specials → weekly/baseline → knowledge` 是加工链，不增加外部样本数。
- 同一公司同一 ATS 的多个岗位只是一组责任设计信号；同一论文的摘要、PDF、知识卡和专题引用只算一篇；媒体转载同一备忘录不构成交叉验证。
- 8 月 16 日信息库的 12 张卡可以作事实入口，但其四专题页面仍是状态记录；8 月 17 日远端页面同样需要本次正式研究替换。
- 根部职级追踪最后实质更新仍在 5 月，只作待证假设池；“技能库取代职级”“一人＋AI 替代团队”等强断言继续降级。

## 四专题当日边界

1. **扁平化：**无高置信新增减层结论；Intuit 是动作样本，Etsy 和 NBER 是动因与结构反例。必须追前后层级、跨度、决策权、员工承接和 90/180 天结果。
2. **人才密度：**无高置信新增完整闭环；Netflix 说明高薪、反馈、授权和管理责任要组合，PwC/IZA 提醒复合能力是互补任务而非“一个人全包”。
3. **岗位架构：**无高置信新增成熟序列；当日校招与 JD 只支持能力门槛和岗位语言重组。新序列仍需稳定责任、复数岗位、至少三级梯度、统一评价、横向流动、专属薪带与退出机制。
4. **晋升：**无高置信新增完整制度；GitLab 仍支持“持续留证＋即时分流回报＋固定校准＋受控例外”。AI 使用量、代码量、检测或水印不能单独裁决永久职级。

## 严格窗口空白与下一步

- 找到具名企业同时披露层级/经理占比/跨度前后值、七类责任迁移、员工承接及 90/180 天结果的减层样本。
- 取得中国企业正式职级、管理标签、晋升制度与薪酬带宽原文，区分岗位命名、定价意图与实际兑现。
- 追踪字节校招项目的正式岗位数量、面试评分、定级、薪酬/股权兑现、项目分配与 6/12 月留任。
- 为高人才密度建立净值口径：结果、质量、复用、第二人覆盖减去验证、导师、健康和单点风险成本。
- 寻找第二家公司公开固定窗口、周期外例外、项目/市场回报、人才委员会、薪酬校准、申诉与晋升后效的完整制度。

---

*审计截止：2026-08-17 18:15 CST。*
