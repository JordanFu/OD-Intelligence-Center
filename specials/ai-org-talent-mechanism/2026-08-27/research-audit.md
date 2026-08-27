# 2026-08-27 研究与证据审计

> 严格窗口：2026-08-26 18:00—2026-08-27 18:00（Asia/Shanghai）。本文件记录检索、计时、去重、降级、渠道缺口与人本验收，不承担新的专题判断。

## 1. 工作流与独立性

- 四个独立专题代理分别撰写扁平化、人才密度、岗位序列、晋升机制；两个分渠道代理分别审计官方/媒体/中国/咨询与学术/JD/薪酬/社媒；一个内部知识源代理审计 `digest.md`、近 14 天 `daily/` 与 `daily-report/`、知识库和专题基线。
- 主代理按事件根、公司/ATS 根和内部编辑链交叉去重，独立完成总览、事实—判断—Context 分层、HTML 与发布验证。
- 外部检索优先使用 AnySearch CLI；academic `list_domains --domain academic` 两次尝试均返回服务端 `tool not found`，后改用通用搜索、官方页面、官方 feed 和精确时间锚。失败未被解释成“学术无发布”。

## 2. 时间窗纠偏

- 晨稿错误使用 `8/26 09:26—8/27 09:41`：多计 8 小时 34 分，并漏扫 8 小时 19 分。
- 正式稿统一为 `8/26 18:00—8/27 18:00`；09:41—18:00 补扫没有新的 L2/L3 事实。
- 窗外排除：腾讯 WorkBuddy 首发为 8/26 12:55:46；IFS 分发为 16:33；Synthesia 分发为 17:03，且官方首发更早。均只作历史 Context。
- 落窗主要时间锚：Meta Reuters 03:14；MiniMax 官网 19:36、电话会 20:00；Anthropic 官方分发 01:12:53；ECB 作者分发 18:54:42；APRA/ASIC 官方锚 12:56:43/14:10:52；OpenAI 两个 ATS 页面 00:36:48/01:58:25。

## 3. 来源族与证据等级

| 事实族 | 等级 | 计数与边界 |
|---|---|---|
| Meta Project OT / Reuters | L3 窄机制 | Reuters 调查、普通页与 newswire 镜像算一个来源族；无公开 Meta 原始方案；60% 仅部分团队情景 |
| OpenAI 事故复盘 | L2 | 支持控制设计，不证明控制有效或新设部门 |
| MiniMax 共用研发底座 | L2 | 官网与同一电话会摘要不作独立互证；效率为管理层自报 |
| Anthropic 受控研究接口 | L2 | 聚合交付与多审查不等于独立监督或充分用户授权 |
| ECB 调查 | L2 | 自报采用/节时不等于企业生产率或质量 |
| APRA/ASIC | L2 | 圆桌观察不是强制新规或运行结果 |
| G-P、PageUp/Sapia、ETHRWorld SEA | L1 | 厂商/品牌内容，无客户、员工或候选人结果 |
| OpenAI 两个岗位页 | L1 | 同一 OpenAI/Ashby 来源族；页面≠编制≠到岗≠level≠溢价 |
| IBM 匿名帖、聚合播客 | L0 | 只作搜索导航，不承担公司事实 |

全天没有 L4。内部 `daily → digest → daily-report → concept/wiki → special` 是同一编辑传播链，不增加外部证据根。

## 4. 渠道覆盖与零结果

| 渠道 | 结果 |
|---|---|
| 官方/一手 | OpenAI、MiniMax、Anthropic、ECB、APRA/ASIC；均保留结果边界 |
| 权威媒体与公司案例 | Meta 为主；下午 36氪 15:45 转载匿名制造案例降 L0—L1、排除 |
| 咨询 | McKinsey、BCG、Bain、Deloitte 严格窗无合格新增 |
| 学术/专业 | 严格窗学术新增 0；不以旧稿刷新补量 |
| JD/薪酬 | OpenAI 两页可核；补扫官方 feed 新增 0 |
| 社媒/职场/公众号 | IBM 匿名帖 L0；同名播客只导航；微信公众号无稳定原文和绝对时间 |
| 内部知识库 | 完成近 14 天去重、四专题历史 L3 主线与反例复用 |

直接晋升制度、技能徽章与晋升挂钩、同行评审、人才委员会、薪酬校准的正式制度新增均为 **0**。

## 5. 人本专项审计

所有行动建议经过六道门：

1. 员工是否先获得减少重复劳动、等待、无效会议、加班或更好判断支持等个人价值；
2. 证据是否来自已授权的自然工作流程，而非新增详细日报、AI 打卡或为管理看板填数；
3. 数据用途、最小化、访问、保留、跨境、查看、纠错、反对和申诉是否清楚；
4. 节省时间如何在员工、客户和组织间分配；全部变成新增任务时是否如实称为工作负荷强化；
5. 返工、人工接管、维护、峰值队列、情绪劳动和单点风险是否计入净结果；
6. AI 是否只辅助检索、校验和记录，而没有越权推断潜力、自动排名或裁决人才决定。

## 6. 搜索词与下一步

本日主要检索包括：`Meta Project OT Reuters exact publication time`、`AI workplace employee value privacy workload August 27 2026`、`MiniMax evaluation infrastructure exact time`、`promotion skills badge peer review talent committee compensation calibration`、`2026年8月27日 AI 组织 调整 岗位 晋升 人才`、`site:mp.weixin.qq.com AI组织 晋升制度`，以及 OpenAI Ashby posting API 时间过滤。

下一步优先取得 Meta 原始组织/人员口径、员工监测与申诉规则、情绪调查方法、回撤后业务与人员结果；取得 ECB 节时流向；取得 G-P、PageUp/Sapia 的用途授权、公平、纠错、申诉与实际减负结果；继续搜具名公司的正式晋升制度原文。
