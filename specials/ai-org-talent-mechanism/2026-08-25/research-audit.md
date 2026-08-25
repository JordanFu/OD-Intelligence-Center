# 2026-08-25｜研究审计与来源去重

> 严格窗口：2026-08-24 18:00—2026-08-25 18:00（Asia/Shanghai）。本文件记录检索、时间核验、来源族去重、证据升降级与排除项，不作为独立结论来源。

## 1. 工作流与内部知识源

- 启动前执行 `git pull --rebase origin main`，起始正式研究基线为 `865552abeda0cda4b2f3e5a28ef8b80fada6a4ba`；确认仓库只有当前 worktree。
- 并行使用四专题代理、官方／一手渠道代理、学术／招聘／薪酬／社媒信号代理、内部知识源代理，主代理负责交叉证伪和总览。
- 内部依次读取 `digest.md`、`daily/` 最近 14 天、`daily-report/`、`knowledge/catalog.json`、`knowledge/index.md`、`knowledge/wiki/`、`knowledge/summaries/`、`knowledge/concepts/`、职级追踪基线及 `specials/`。内部重复加工不增加外部来源数；2026-08-25 的 fallback 五稿全部禁用并重写。
- 内部材料截至晨间 09:40，主代理与渠道代理补扫至 18:00。历史材料只用于去重、纠偏与判断连续性，不回填成当日新增。

## 2. 外部检索记录

优先使用 AnySearch：

```text
python3 /Users/tal/.codex/skills/anysearch/scripts/anysearch_cli.py
脚本 SHA-256：e520555be51c39e129320bbdd367ac18d6298fd854901dc81c6b8a0b3d2a5380
```

主要搜索词族：

- `AI organization redesign delayering manager span promotion August 25 2026`
- `AI talent density job family career architecture compensation equity August 2026`
- `promotion framework continuous promotion skill badge talent committee AI contribution 2026`
- `组织架构 调整 AI 人才 职级 晋升 2026-08-25`
- `招聘 AI Enablement research scientist agent development salary posted August 25 2026`
- `site:company.com newsroom AI organization workforce job architecture 2026-08-25`

学术垂直域探测按本地帮助说明执行后，服务端返回：

```text
API Error: tool 'list_domains' not found: tool not found
```

因此学术候选改用通用搜索、DOI 出版页和出版社页面核验。OpenAI、Notion 的页面正文抽取曾返回 `extract_failed / Unable to extract content from the URL`，最终改用公司官方 Ashby feed；Apple 与 ServiceNow 使用官方招聘页字段核验。

## 3. 证据族与边界

| 来源族 | 时间／等级 | 正式支持 | 不支持 |
|---|---|---|---|
| 中国武夷总部机构公告 | 8/24 23:21；动作 L2 | 保留 15 个机构、新增 1 个出海统筹办公室，总数 16 | AI 因果、层级、经理、跨度、编制、决策权与后效 |
| Pave／Nua AI 人才报告 | 8/24 22:00；市场观察 L1—L2 | 9,000+ 公司池中三类岗位族、股权和流失差异 | 内部序列、普遍薪带、因果、人才密度与留任成效 |
| Culture Amp／iManage | 窗口内；产品事实 L2 | 人员数据权限继承、组织知识读写与审计能力 | 经理质量、人效、晋升质量或组织结果 |
| 支付公约／Google Cloud | 窗口内；治理观察 L1—L2 | 机器身份、授权、人工阈值、日志、回退议题 | 普遍治理成熟、法律效果或组织减层 |
| 字节 AI 办公线收束 | 媒体发布落窗、事件仅称 8/24 下午；L1 | 媒体所述的集中汇报与部分专业产品线保留 | 事件严格落窗、正式组织图、减层、人员和结果 |
| 两篇质性论文 | 8/25 首发；事实观察 L2 | n=17 的工作中学习机制、n=15 的组织编排构念 | 绩效、留任、晋升或最佳组织设计因果 |
| OpenAI／Notion／Cursor／Apple／ServiceNow 招聘页 | 官方发布时间落窗；L1 | 目标责任、公开级别、报价与岗位分化信号 | 页面数、编制、到岗、团队规模、正式 job family／薪带／晋升 |
| 社媒／职场平台 | 截至 18:00 无合格新增；L0／缺口 | T+24 复扫范围 | 任何公司或趋势结论 |

## 4. 招聘来源族核验

- OpenAI：People Research Scientist，Ashby `publishedAt=2026-08-25T00:46:30.177Z`，基本薪酬 19.8万—22万美元并含股权。
- Notion：Workflow + Process Designer（AI Enablement），Ashby `publishedAt` 对应北京时间 06:48；页面写明旧金山基本薪酬 16.6万—18.5万美元。
- Cursor：Pretraining 与 User Operations 分别在北京时间 04:53、06:13 首发；同一公司／ATS 合并为一个来源族。
- Apple：Applied Intelligence 标准级与高级级官方 `longPostingDate` 分别对应北京时间 01:26、01:02；页面职责高度重叠，经验与报价存在差异，不能据此推出内部晋升规则。
- ServiceNow：四页官方 `releasedDate` 均落窗；同一公司／ATS 合并为一个来源族，页面数不等于四个净增编制。
- Perplexity：晨间记录的候选 ID 未能在当前官方 feed 重现，正式专题全部排除，不以内部落盘替代外部可复现性。

## 5. 主代理交叉验证结论

1. 本窗口没有 L3/L4 组织结果，已确认减层、经理减少、跨度扩大、人才密度结果与直接晋升制度均为 0。
2. 中国武夷是当日最强正式结构动作，也是“组织必然变薄”的反例；机构增加不等于增加层级，亦不等于协同改善。
3. Pave 数据适合触发内部岗位映射与薪酬诊断，不足以直接新建序列；供应商报告页和新闻稿合并为同一报告根。
4. 招聘页面证明目标责任和报价，不证明批准编制、到岗、运行机制或结果；各公司分别按 ATS 来源族合并。
5. 字节线索因事件小时不明只进 Context；社媒零合格新增不等于绝对零发布。
6. 正式主干为：宽交付与深控制并存；先责任包、再技能／项目／薪酬路由、最后永久序列；持续留证与即时回报分流，永久职级保留固定校准与受控例外。

## 6. 下一轮复核

- T+24 小时复扫字节正式原文、社媒／职场平台索引延迟与北森完整报告方法。
- 获取中国武夷新办公室负责人、编制、权责、接口与 90 天结果。
- 获取 Pave 分层样本、股权估值、自愿流失与地区／公司阶段口径。
- 继续寻找直接晋升制度原文和同一队列的 6／12 月晋升后效；在此之前维持“无高置信新增结论”。
