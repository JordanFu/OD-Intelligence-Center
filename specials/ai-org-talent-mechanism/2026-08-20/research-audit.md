# 2026-08-20｜AI 组织与人才机制研究审计

> 证据窗口：2026-08-19 18:00—2026-08-20 18:00（Asia/Shanghai）。本文件记录检索、日期校正、证据分级与排除项，不替代五份正式报告。

## 1. 启动与仓库状态

- 任务开始时确认 `/private/tmp/ODIC-current` 是完整 Git 仓库、工作区无未提交变更。
- 已先执行 `git pull --rebase origin main`，从 `9b13f517` 快进到 `f9057801`。
- 远端 8 月 20 日五份专题来自 `auto-fallback`，正文明确为研究状态记录/非决策稿；本轮全部重写，不把它们计入证据或稳定基线。

## 2. 多代理分工

| 代理 | 独立责任 | 产物 |
|---|---|---|
| 内部知识源代理 | `digest.md`、近 7—14 天 `daily/`、`daily-report/`、`knowledge/`、历史专题和滚动基线 | `/private/tmp/ODIC-research-2026-08-20/internal-sources.md` |
| 官方与公司渠道代理 | 官方/一手、权威媒体、公司案例、咨询材料；重点核验 OpenAI、AWS/Fanatics、Microsoft | `/private/tmp/ODIC-research-2026-08-20/channel-primary.md` |
| 学术与信号渠道代理 | 学术、JD/薪酬、中国媒体、公众号、社媒/职场平台；逐页核验日期 | `/private/tmp/ODIC-research-2026-08-20/channel-signals.md` |
| 四专题代理 | 扁平化、人才密度、岗位族群序列、晋升机制分别写作 | 当天 `01`—`04` 正式 Markdown |
| 主代理 | 日期复核、证据去重、反例校准、总览、页面、质量与线上验证 | `00-overview.md`、HTML、首页与状态文件 |

## 3. 内部知识源去重

- `daily → digest → daily-report → specials` 是同一加工链；相同外部 URL 只计一个证据根，不因多处出现而升级可信度。
- `knowledge/catalog.json`、`knowledge/index.md` 当日大批更新时间主要是机械元数据刷新，不代表报告内容或事实在 8 月 20 日首次发生。
- 8 月 19 日正式专题与四份 rolling baseline 用于连续判断；8 月 20 日上午 fallback 只用于发现待补缺口。
- 历史稳定基线：没有新证据支持 AI 普遍减中层；人才密度按净结果、复用、第二人减验证/返工/带教/单点成本；岗位继续“宽交付＋深控制”；晋升仍以持续留证、即时分流回报、固定横向校准和受控例外为主干。

## 4. 外部检索记录

AnySearch 配置使用 Python CLI：

`python3 /Users/tal/.codex/skills/anysearch/scripts/anysearch_cli.py`

- 调用前检查 `runtime.conf` 和脚本差异。脚本相对上游只有已存在的请求超时环境变量修改；本轮用 `ANYSEARCH_TIMEOUT_SECONDS=30` 限定。
- 学术垂直域先按技能要求调用 `list_domains --domain academic`，返回原始错误：`API Error: tool 'list_domains' not found: tool not found`。随后降级为通用检索，并用 arXiv API 逐篇核验 `published` 时间。
- AnySearch 对 OpenAI 官方页的全文抽取返回 `extract_failed`；主代理改用精准搜索摘要、官方页面、媒体互证和渠道代理逐页核验，没有据失败抽取补写字段。

### 主要搜索词

1. `2026-08-20 AI organization restructuring management layers promotion talent official`
2. `2026-08-20 AI jobs skills hiring promotion pay band official company`
3. `2026-08-20 OpenAI zero data retention frontier models private safety processing`
4. `2026-08-20 AWS Fanatics multi-agent customer support organization human escalation`
5. `site:openai.com/index/offering-zero-data-retention-for-frontier-models "August 19, 2026"`
6. `site:aws.amazon.com/blogs/machine-learning/how-fanatics-betting-and-gaming-built-a-multi-agent-customer-support-system "August" "2026"`
7. `2608.17111`、`2608.17624`、`2608.17099`、`2608.16893`
8. `AI promotion cycle out-of-cycle calibration company policy August 2026`
9. `AI organization delayering span of control China technology company 2026-08-20`
10. `AI job family pay band model policy human data program manager OpenAI`

## 5. 证据根与等级

| 证据根 | 发布时间/窗口 | 等级 | 可支持 | 不可支持 |
|---|---|---:|---|---|
| [OpenAI｜Offering Zero Data Retention for frontier models](https://openai.com/index/offering-zero-data-retention-for-frontier-models/)＋TechCrunch/Bloomberg | 官方 2026-08-19；TechCrunch 折算北京 8/20 06:10 | 动作 L3／效果 L1 | 客户内容/密钥控制、自动跨交互监测、平台窄信号执法、客户调查与自愿分享的职责分离；9 月白皮书是计划 | 误报、申诉、独立审计已有效；组织减层或经营结果 |
| [AWS/Fanatics｜Multi-agent customer support](https://aws.amazon.com/blogs/machine-learning/how-fanatics-betting-and-gaming-built-a-multi-agent-customer-support-system/) | AWS RSS 2026-08-20 04:40:45 北京时间 | 机制 L2／结果 L1 | 主管智能体、专业工具、合规分类器、人工升级、每日复盘；先做 4/20+ case types | 普遍减员、长期效果；公司自报 +56%/+53% 缺分母、对照、成本与合规漏检 |
| [TechCrunch｜OpenAI cyber access incident](https://techcrunch.com/2026/08/19/researchers-complain-that-openai-revoked-their-access-to-limited-cyber-program/) | 北京时间 2026-08-20 02:46 | L2 事件 | 5 名受访者遭遇异常撤权；OpenAI 称有限用户技术故障并要求重验 | 地域政策主动收紧；影响人数、恢复时长和后效 |
| [AWS｜KnowledgeForge](https://aws.amazon.com/blogs/machine-learning/knowledgeforge-mining-gold-from-the-itsm-ticket-graveyard/) | 严格窗口 | L1 样例 | 生成—知识经理审批—发布的责任链 | 真实客户收益、组织采用或人效改善 |
| [Microsoft Education](https://www.microsoft.com/en-us/education/blog/2026/08/built-for-the-complexity-of-education-ai-that-understands-your-institution/) | 严格窗口 | L1 框架 | 单流程试点、继承身份权限、成熟后扩围 | 具名客户成效或普遍方法有效性 |
| OpenAI Model Policy 与 Human Data 项目岗位 | Ashby API：8/20 08:10、8/19 23:23 北京时间 | L1 JD | “宽交付＋深控制”；研究/工程/运营/供应商与质量校准接口 | 新序列、净增编制、到岗、涨薪或晋升制度；Model Policy 疑似旧岗位重挂 |

## 6. 学术日期纠错

上午信息库把四篇预印本描述为“进入今日新稿批次”。arXiv API 显示它们都不属于严格窗口新增：

| arXiv | 首次提交（UTC） | 处理 |
|---|---|---|
| [2608.17111](https://arxiv.org/abs/2608.17111) | 2026-08-17 20:39:51 | 窗口外研究 Context；可讨论凭证近期有效性，不计今日事实 |
| [2608.17624](https://arxiv.org/abs/2608.17624) | 2026-08-18 10:40:39 | 窗口外研究 Context；可讨论事前约束与事中纠偏 |
| [2608.17099](https://arxiv.org/abs/2608.17099) | 2026-08-17 20:14:34 | 窗口外研究 Context；代表权论证不等于企业后效 |
| [2608.16893](https://arxiv.org/abs/2608.16893) | 2026-07-06 15:26:59 | 历史反例；6 名人类专家样本不能外推所有组织调研 |

因此不得写成“今日四项新学术事实”，也不得据此升级趋势。它们只用于说明：人员与晋升决定需要近期、真实、可复核的人类证据。

## 7. 渠道空白

- 中国科技公司、36 氪/界面/虎嗅/机器之心/第一财经、微信公众号「AI组织进化论」及可核社媒，在严格窗口没有高置信新组织机制。
- 严格窗口没有实际减层、管理跨度、决策周期和员工后效数据。
- 没有企业公开完整“识别—招聘—项目—授权—学习—盘点—激励—留任”人才密度闭环。
- 没有达到复数岗位、三级梯度、薪带、横向流动、晋升、申诉和退出门槛的新岗位序列。
- 没有新的固定/即时/项目制晋升、技能徽章、同行评审、人才委员会、薪酬校准或晋升后效制度。

## 8. 主代理采用原则

1. 当日事实只使用严格窗口内且可追溯的来源；窗口外研究明确标注 Context。
2. 公司自报结果与机制事实分开评级；两个百分比不因同页出现而成为独立互证。
3. JD 只证明责任与定价意图，不证明到岗、净新增、序列或晋升。
4. “内容不让平台人员看”不等于无人治理；应拆解内容控制、机器监测、窄信号执法、客户调查和申诉。
5. “自主解决率提高”不等于减员；必须继续追释放人力去向、质量、合规、成本、客户体验和员工影响。
