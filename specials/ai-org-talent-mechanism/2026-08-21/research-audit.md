# 2026-08-21｜研究审计与证据留痕

> 本文件记录四专题正式日报的研究过程、证据时间、来源族、排除项与质量边界；不替代任何专题正文。

## 1. 启动与仓库状态

- 运行开始时工作目录不存在，按任务要求从 GitHub 重新克隆 OD Intelligence Center。
- 克隆后执行规定的 git pull --rebase origin main，结果为 Already up to date；启动基线提交为 07c85e6b16b5d1b9b1593baa11b3c822d290de82。
- 8 月 21 日五份专题文件在启动时均是研究未完成的状态记录，专题清单显示 todayStatus=fallback、latestFormalDate=2026-08-20；本轮重新研究并完全替换五份正文。
- 启动时工作树干净，且 git worktree list 只显示当前目录，不是旧 worktree。

## 2. 多代理工作流

### 第一轮：研究审计

1. 内部知识源代理审计 digest、近 14 天 daily 与 daily-report、知识库、历史专题、滚动基线、W34 周报和职级追踪档案。
2. 官方／媒体／案例代理检索并核验官方一手、权威媒体、咨询、公司案例和制度材料。
3. 学术／JD／薪酬／中国／社媒代理核验论文首次提交时间、岗位首发时间、薪酬口径、中国媒体与社媒弱信号。

### 第二轮：四专题独立写作

- 专题一、二、三、四分别由独立任务拥有单一文件，各代理不得改动其他专题。
- 主代理读取三份渠道审计和四份专题正文，独立完成总览、日期校正、证据去重、反例校准、HTML 与项目入口。
- 主代理不把代理完成陈述当验收；所有文件统一进入结构门禁、静态测试、差异检查和浏览器验收。

## 3. 检索工具与异常

- 首选工具：python3 /Users/tal/.codex/skills/anysearch/scripts/anysearch_cli.py。
- 脚本 SHA-256：e520555be51c39e129320bbdd367ac18d6298fd854901dc81c6b8a0b3d2a5380。
- 脚本与原始版本相比只有一处已知本地改动：请求超时从固定 30 秒改为环境变量 ANYSEARCH_TIMEOUT_SECONDS，默认 90 秒；本轮设置为 30 秒。没有改变请求、结果或证据逻辑。
- 学术检索按 skill 要求先调用 list_domains --domain academic，工具逐字返回：

~~~text
API Error: tool 'list_domains' not found: tool not found
~~~

- 随后降级为 AnySearch 通用检索、arXiv 原始页／API、公司官方页和招聘系统原始字段。
- 第一次批量检索输入 6 个查询，服务返回最多 5 个查询；按上限重试成功。此类调用错误不作为没有材料的证据。

## 4. 严格证据窗口

- 主窗口：北京时间 2026-08-20 18:00:00—2026-08-21 18:00:00。
- 搜索抓取时间、索引更新时间、内部入库日期和页面通用元数据不能替代首发时间。
- 日期只有日而没有时分的候选，不能证明进入小时级窗口；保留在候选池或 Context，不计严格新增。

| 证据根 | 精确时间（北京时间） | 等级 | 可确认 | 不可确认 |
|---|---:|---:|---|---|
| Cisco 网络安全劳动力研究与官方解读 | 2026-08-20 20:15:27 | L2 | 招聘数据、入口／资深增速差、SOC 责任变化、薪酬横截面 | AI 因果、实际减层、成熟岗位族、内部涨薪与晋升 |
| J&J Foundation／Google.org 一线训练计划 | 2026-08-20 22:30:00 | 动作 L2 | 1,000 万美元、三年、25 万覆盖目标、工作流共创设计 | 培训完成、能力提升、节时、质量和患者结果 |
| Axios 裁员沟通观察 | 2026-08-20 23:59:06 | L2 媒体观察 | 部分 CEO 的措辞变化 | 裁员真实因果、内部转岗、再培训或机制改善 |
| Anthropic 三个平台 Staff+ 岗位 | 2026-08-20 23:55—08-21 01:13 | L1 JD | 运行、分发、迁移责任与公开报价 | 净新增、到岗、团队边界、序列与薪酬上涨 |
| Anthropic Applied AI／安全产品岗位 | 2026-08-20 21:01—08-21 03:07 | L1 JD | 端到端交付、管理＋构建和高风险接口责任 | 全公司制度、减层、跨度与晋升 |
| AWS Dogwood Policy Authoring | 2026-08-21 00:31:28 | L2 | 规则分解、形式化、校验、外部执行与人工审查 | 客户效果、跨会话控制、误拦截、申诉与治理成熟度 |

## 5. 来源去重

1. Cisco 的薪酬、初级／资深岗位、技能和角色变化来自同一联盟研究；D02、D03、D04 只算一个证据根。
2. Cisco 报告页、官方博客与 SiliconANGLE 数字转述不是三份独立研究。
3. Anthropic 六个可精确核时岗位只形成平台责任与 Applied AI／高风险产品接口两个同公司 ATS 岗位簇。
4. AWS Dogwood 博客与产品文档共同解释动作和边界，但仍属于 AWS 一手来源族。
5. J&J 项目在 daily→digest→daily-report 的多次落盘只是一条公告。
6. 当日知识目录 69 条上传／入库记录多数是元数据刷新、模板卡或待精读材料，不计新外部证据。

## 6. 排除项

| 候选 | 处理 | 原因 |
|---|---|---|
| Anthropic Applied AI Solutions Architect | 排除严格新增 | 首发北京时间 8 月 20 日 13:40，早于窗口 |
| OpenAI Private Compute／Identity 候选 JD | 候选池 | 只有日期级字段，无法判断时分与重挂 |
| Google 搜索产品岗位 | 候选池 | 原页未取得可核首发字段 |
| arXiv 2608.20319 | 不进入四专题结论 | 时间在窗内，但只有技术任务模型，无组织／人才机制证据 |
| arXiv 2608.19199 | 排除 | 首次提交为 5 月，属于旧稿新可见 |
| 两篇 36氪高相关候选 | 排除 | 内嵌真实首发分别为 8 月 18、19 日；通用页面元数据不能改写首发 |
| Reddit 匿名讨论 | Context | 身份、公司与绝对时间不可核，只生成工作负荷验证问题 |

## 7. 证据空白

- 严格窗口内没有 L3/L4 的组织结果。
- 没有企业披露 AI 改造前后层级、经理人数、管理跨度或决策周期。
- 没有完整的高人才密度识别—招聘—授权—盘点—保留闭环结果。
- 没有正式岗位族、三级梯度、内部流动、晋升规则和退出机制的新证据。
- 没有公司公开完整的新晋升窗口、周期外例外、人才委员会、薪酬校准、申诉和晋升后效。
- 中国媒体、公众号和可核社媒严格窗口新增为空；该空白不等于相关公司没有动作。

## 8. 采用原则

- L2 可支持窄观察和机制假设，不能写强因果或组织效果。
- L1 JD 只证明当前职责命名和报价意图，不证明到岗、净增、重组、薪酬上涨或序列成熟。
- 事实、判断、行动和 Context 在四份专题中分别呈现；没有高置信新增的专题直接写明证据空白。
- 每条强判断至少保留一个反例、替代解释或不可照搬点。
- 总览只做跨专题综合，不重复堆叠同一材料。

## 9. 当日检索词摘要

- August 20 2026 AI workforce organization restructuring promotion management company
- August 21 2026 AI organization talent workforce company official announcement
- site:reuters.com August 20 2026 AI jobs workforce company management
- site:axios.com 2026/08/20 AI workforce organization jobs management
- site:mckinsey.com 2026 August 20 AI organization workforce talent management
- site:bcg.com 2026 August 20 AI workforce organization talent
- site:deloitte.com 2026 August 20 AI workforce organization talent
- site:arxiv.org abs AI job family career architecture occupational task submitted August 20 2026
- site:job-boards.greenhouse.io/anthropic/jobs AI published August 20 2026 manager staff salary
- site:jobs.ashbyhq.com/openai AI job posted August 20 2026 salary
- site:reddit.com AI layoffs team workload promotion manager August 20 2026
- 2026年8月21日 AI 组织架构 人才 晋升 岗位 大厂

