---
title: 知识库主题分类与去重治理建议
source: OD Intelligence Center catalog review
date: 2026-05-22
ingested: 2026-05-22
tags: [知识管理, 去重, 分类体系, AI组织设计]
---

# 知识库主题分类与去重治理建议

## 一句话判断

当前知识库不是“严重重复”，而是进入了来源快速积累后的正常阶段：来源页很多、主题页偏少。同一问题被 Microsoft、McKinsey、BCG、Zapier、GitLab、Obsidian、知音楼等多份来源反复覆盖，这些不应该删除；真正需要做的是建立主题导航和“来源页 → 主题页 → 方法/框架页”的分层。

## 当前结构健康度

- Catalog 当前有 44 个报告/知识条目。
- 主题高度集中：AI组织设计 38 条、人才发展 22 条、变革管理 17 条、绩效管理 16 条。
- 内容类型混在一起：官方报告、PDF 自动索引、Obsidian 全量索引、GitLab/Zapier 深研、中文翻译/摘要、知识库运维报告都在同一个来源列表里。
- 这会导致一个问题：用户想问“AI能力盘点怎么做”时，会同时看到 CFTE、Zapier、Microsoft、Obsidian、内部研究稿、McKinsey，多而不聚焦。

## 重复信息判断

| 主题簇 | 涉及页面 | 是否重复 | 处理建议 |
|---|---|---|---|
| Zapier AI-first 实践 | Zapier AI 实践深研、AI Fluency V2、AI-first 招聘入职、本地实施复盘 | 内容有重叠，但层级不同 | 保留全部来源页；新增/维护“Zapier AI-first 组织案例总览”主题页，其他页面作为证据 |
| GitLab People / 晋升 | People 机制模块、People source map、Promotions and Transfers | 不是重复，是总览/索引/专题三层 | 保留；晋升页归到“晋升与内部流动”，People 模块归到“PeopleOps 操作系统” |
| Obsidian | 首批导入地图、全量覆盖索引、若干 Obsidian 概念页 | 首批地图已被全量索引取代 | 不删除旧页，标记为历史记录；以后入口指向全量索引 |
| AI 能力盘点 | CFTE、Zapier Fluency、AI能力盘点研究、Microsoft WTI、Obsidian AI能力盘点 | 高度相关，易分散 | 建立“AI能力盘点与AI fluency”主题页，区分个人能力、岗位能力、组织 readiness、治理要求 |
| AI-first 组织/Operating Model | BCG、McKinsey State、Microsoft WTI、WEF、Zapier、Obsidian | 是同一大主题的多证据 | 建立“AI-first Operating Model”主题页，按组织结构、流程、角色、治理、绩效归类 |
| 技术组织与工程岗位 | McKinsey 技术 workforce、Anthropic Coding、Monzo 工程职级、AI原生工程组织 | 主题重复但证据互补 | 建立“AI-first 技术岗位族群与工程组织”主题页 |
| 薪酬/绩效/职级 | GitLab 晋升、百度职级、Amazon/百度、EY Future of Pay、Payscale、BCG CPA | 不是重复，属于制度拼图 | 建立“AI时代绩效、晋升、薪酬与职级机制”主题页 |
| 知音楼 HR 资料 | 学习材料、行业洞察、PDF map、十主题整理 | 目录页和主题页有一定重叠 | 保留十主题整理为入口；PDF map 作为证据覆盖索引 |
| PDF 自动入库条目 | p001-p017 | 多数是证据页，部分标题质量低 | 不删；后续精读后改名、补证据等级，低价值条目标记待重试/待精读 |

## 推荐的分门别类体系

### 第一层：研究主题

| 主题 | 用途 | 应归入的典型内容 |
|---|---|---|
| AI-first Operating Model | 解释 AI 如何改变组织操作系统 | BCG、McKinsey State、Microsoft WTI、WEF、Zapier |
| AI能力盘点与AI Fluency | 设计员工/岗位/管理者 AI 能力标准 | CFTE、Zapier V2、AI能力盘点研究、Microsoft Frontier Professional |
| PeopleOps 与组织机制 | 研究 HR/People 如何制度化运作 | GitLab People、People Policies、知音楼 HR、AIHR |
| 晋升、绩效、职级与薪酬 | 研究评价和激励机制如何变化 | GitLab Promotions、百度职级、EY Pay、Payscale、BCG CPA |
| AI-first 技术组织 | 研究工程岗位、CIO、Agentic coding 和技术人才结构 | McKinsey 技术 workforce、Anthropic、Monzo、AI原生工程组织 |
| 组织文化与变革管理 | 研究 adoption、领导力、学习系统、心理安全与变革节奏 | Microsoft、Zapier、GitLab、Netflix Culture |
| 知识管理与研究基础设施 | 维护知识库本身 | Obsidian、Karpathy LLM Wiki、Review 报告、source maps |

### 第二层：页面类型

| 类型 | 定义 | 是否可重复 | 处理原则 |
|---|---|---|---|
| Source Page | 单一报告/网页/PDF/本地资料的摘要 | 可以重复主题 | 保留证据、来源、日期、原始 URL/Raw |
| Source Map | 一个目录或资料库的覆盖索引 | 可以与主题页重叠 | 用于追踪覆盖，不承担最终结论 |
| Theme Page | 多来源综合后的主题结论 | 应尽量少而强 | 用户默认阅读入口 |
| Concept Page | 单一概念/框架解释 | 适度保留 | 与主题页互链 |
| Case Page | 公司案例或机制案例 | 适度保留 | 如 GitLab、Zapier、百度 |
| Review Page | 知识库维护和质量报告 | 可归档 | 不参与主题判断，只做运维证据 |

## 不建议做的事

- 不建议删除来源页来“去重”。来源页是证据链，删掉会让综合结论失去出处。
- 不建议把所有内容都塞到一个大报告里。那会短期看起来整齐，长期会失去可维护性。
- 不建议只靠 tag 分类。当前 tag 已经太宽，必须有主题页作为阅读入口。
- 不建议把内部/个人资料全文公开。Obsidian、知音楼、内部报告应以 source map + 匿名化/结构化沉淀为主。

## 应立即补的 6 个主题页

1. AI-first Operating Model 总览
2. AI能力盘点与 AI Fluency 标准
3. AI-first 技术岗位族群与工程组织
4. PeopleOps 操作系统与 HR 机制
5. AI 时代晋升、绩效、职级与薪酬机制
6. 组织文化、领导力与变革管理

## 执行规则

- 新资料入库先判断页面类型：Source / Source Map / Theme / Concept / Case / Review。
- 若已有主题页，新资料只追加到主题页的“新增证据/冲突/待验证”区域。
- 若同一主题下来源超过 5 个，必须建立或更新主题页。
- Catalog 保留来源完整性；Index 首页优先展示主题页，其次展示重要来源页。
- 每周 Review 检查“来源页堆积但没有主题页”的主题簇。
