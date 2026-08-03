---
title: 本地知识库定期 Review（2026-08-03）
source: Codex Local Review
date: 2026-08-03
ingested: 2026-08-03
tags: [知识库巡检, AI组织设计, 组织机制, 人才发展, 晋升, People/HR, AI fluency]
status: 已完成仓库恢复、PDF 自动入库、结构化质量、专题连续性与分享入口审计
---

# 本地知识库定期 Review（2026-08-03）

## 一句话判断

知识库的证据边界和近期日报判断质量仍然可靠，但“内容生成—结构化沉淀—专题/公开同步”三段链路仍有时差：8 月 3 日日报、工作日报、周报、月报和 digest 已在本轮巡检期间补齐，正式专题与公开扫描页尚未同步；同时 PDF 数量快速增长，40 张卡片仍未完成中文精读。当前应先修复公开同步、专题连续性与去重，再扩张资料量。

## 本周健康度

- **总体健康度：82/100（warn）。** 较 7 月 6 日的 86 分略降，主要不是内容判断变差，而是模板卡积压、重复映射、专题待重跑和公开入口失配扩大；本轮并行情报流程已补齐当天信息流，避免进一步失分。
- **仓库完整性：20/20。** `/private/tmp/ODIC-current` 最初只有 `.git` 空壳；本轮完成完整克隆、对象校验、工作树恢复，`git pull --ff-only` 返回 `Already up to date.`。
- **隐私与结构边界：18/20。** lint 未发现本地/私有路径泄露，也未发现缺失 summaryFile；PDF 入库未扫描 `source-channels.private`、`local-reference-structured`、`archive` 或凭据信息。已修复生成器把 `sourceFile` 写成 `../knowledge/raw/...` 的错误，现统一为从 `knowledge/wiki/` 可解析的 `../raw/...`。
- **内容结构化：13/20。** 近期日报能清楚区分事实、判断、行动与 L1-L3 证据，但全库 54 张 PDF 卡中有 40 张仍停留在“尚未完成报告级摘要”的模板状态。
- **时效与同步：15/20。** `daily/2026-08-03.md`、`daily-report/2026-08-03.md`、W31 周报、7 月月报和 digest 已形成，信息库推进到 2026-08-03、累计 1,061 张信息卡；当天正式专题仍在 18:00 窗口前的 scheduled 状态。7 月 27 日、7 月 31 日、8 月 1 日、8 月 2 日仍是 non-decision/fallback。
- **链接与证据闭环：16/20。** 本地一方路径检查 2,433 项，内部仓库路径未发现缺失目标；公开根入口和 7 月 30 日页面均返回 200，但 8 月 3 日公开扫描页返回 404，因此总状态仍为 fail。当前 PDF 扫描 46 个唯一 URL 中 10 个下载失败。

## 已确认的积极变化

1. **近期日报质量高于知识库同步状态。** 7 月 28—30 日以及 8 月 3 日内容均以组织机制为中心，能把任务跨界、转型控制面、模型权限、停止门、资源再配置、客户现场工程和结果责任拆成可验证问题，没有把 AI 使用、裁员或团队变小直接写成组织收益。
2. **证据分层更克制。** 近期材料明确区分 L1 招聘/薪酬截面、L2 单企业或调查事实、L3 可交叉验证的结构动作；没有 L4 时也不补造强结论。
3. **PDF 自动入库规模扩大。** 本轮识别 46 个唯一公开 PDF 来源，36 个已有原文，10 个保留 URL 与引用上下文待重试；新进入的高价值材料覆盖任务跨界、技能分类、入门岗位、AI 工作转型、薪酬与劳动力政策。
4. **隐私边界继续守住。** PDF 卡片、索引、catalog 和日志中未检出本地扫描目录、密码、token、私有渠道正文或绝对路径。
5. **质量工具开始揭示真实债务。** 本轮修正 lint 后，状态从虚假的 `pass / PDF 待重试 1` 变为 `warn / 唯一待重试页 12 / 重复 summaryFile 3 组`，更符合实际资料状态。
6. **当天信息流在巡检期间完成补齐。** 8 月 3 日已有 14 张信息卡，其中新增事实 11、L3 2 张、L2 7 张、L1 5 张，字段完整度缺口为 0；同时生成工作日报、W31 周报和 7 月月报。

## 已发现问题

### P1：必须先处理

1. **公开分享入口存在真实 404。** `https://jordanfu.github.io/org-intelligence-info/` 与 7 月 30 日页面可用，但 `daily-log/2026-08-03.html` 返回 404。当天 digest 已生成、公开镜像未跟上，当前状态文件已如实标记 fail，不能显示“已同步”。
2. **专题正式产出连续性下降。** 8 月 3 日在正式运行窗口前仍为 scheduled，覆盖审计暂记当天专题缺失；更需要补的是 7 月 27 日、7 月 31 日、8 月 1 日、8 月 2 日，它们只有 non-decision/fallback，不能进入基线证据。
3. **PDF 卡片模板债务过大。** 全库 54 张 PDF 卡中 40 张缺报告级摘要、关键数字口径和机制提炼；仅保存原文与“待精读”结构，尚不满足知识条目可复用标准。
4. **当前扫描仍有 10 个 PDF 未闭环。** 包括 GitLab 8-K、BCG Executive Perspectives、SSRN 6456498、CourtListener 诉讼文件、BCG AI Radar、BCG+MIT Sloan、BCG Global Investor Survey、HiBob、McKinsey State of Organizations、UMassMed career ladder。失败项只能作 L1/Context，不能支撑强结论。

### P2：应在下一轮治理

5. **重复与 canonical 关系不清。** catalog 的 reports 中有 3 组重复 summaryFile：OECD `734a5e68-en`、CEN/CENELEC 草案、PwC AI Jobs Barometer；McKinsey State of Organizations 还同时存在一张高质量结构化卡和两张自动模板卡，其中两张模板卡使用同一 PDF URL。为避免越权删除，本轮只记录问题，未删除文件或记录。
6. **lint 覆盖仍有限。** 当前已能发现重复 summaryFile 和真实待重试页，但尚未把“模板卡占比”“frontmatter sourceFile 是否存在”“同 URL 多 wiki 页面”“孤立页”纳入强检查。
7. **旧字段债务继续增加。** 信息库全量统计仍有 `sourceUrl` 缺失 63 条、`time` 缺失 4 条、`tags` 缺失 6 条；最新日期字段完整，但跨期追溯仍受影响。
8. **标题质量影响检索。** `GoogleATLASv1`、`CWA18398 2026`、`6456498`、`H3_AP...`、`47382...`、`0000050863...`、`c0ffced7 en` 等文件名式标题仍大量存在。

### P3：研究主题缺口

9. **People/HR agent operating model 仍未形成主线页。** 现有 AIHR、BNY 能力权限、Meta 人员决策、Anthropic Talent Systems、转型办公室和员工申诉材料仍散落在日报与 PDF 卡中。
10. **AI fluency 尚未进入绩效与晋升的可执行机制。** 已有 Zapier rubric、BNY 分级权限和大量 JD 信号，但缺“岗位要求—训练任务—工作证据—校准—申诉”的完整闭环。
11. **初级人才与继任供给缺纵向证据。** HBR、Gartner、WEF 与工程生产率材料都提示初级任务和评审瓶颈迁移，但缺企业内部的导师负荷、独立承担率、晋升质量和继任结果。
12. **FDE / Applied AI 的职业架构仍停留在招聘信号。** 需要实际团队规模、汇报线、职级、薪带、项目复用率、客户结果和退出/转岗机制。
13. **中国公司制度一手证据仍偏弱。** 字节、腾讯、百度、MiniMax 等案例有组织动作、公告或媒体线索，但正式岗位族、晋升、绩效、AI 使用边界和员工申诉文本不足。

## 最近新增内容的归位判断

| 内容 | 当前归位 | 判断 |
|---|---|---|
| OpenAI 任务跨界 / Jobs Transition Framework | 日报 + PDF 自动卡 | 主题正确，但 PDF 卡仍需把跨岗任务如何进入职责、权限、绩效和薪酬提炼成中文结论。 |
| Google ATLAS / UK Skills Classification / CWA AI skills | 日报 + PDF 自动卡 | 适合进入 skills taxonomy 与 AI fluency 主线，不应继续只停在文件名式来源卡。 |
| BNY 能力等级与模型权限 | 日报 | 应回流 People/HR agent operating model 和 AI fluency 权限治理页。 |
| Visa 小队 / Xbox 组合治理 / 字节双责任线 | 日报与专题 | 适合组织机制与资源配置，不足以支撑“AI 去中层”或稳态效率结论。 |
| Anthropic/OpenAI 停止门与评测岗位 | 日报与 JD 信号 | 应进入 agent governance、暂停权、恢复标准和责任链研究。 |
| WEF 入门岗位 / 工程评审瓶颈 | PDF 卡 + 日报 | 应进入早期人才、练习任务与继任供给主题，优先做跨材料综合。 |

## 建议补齐主题

1. **People/HR agent operating model。** 以 HRBP、COE、People Ops/SSC、manager self-service、员工服务、人才系统与申诉为六个接口，标注 agent owner、人工决定、数据用途、例外与审计。
2. **AI fluency 到绩效/晋升的证据链。** 把技能分级、模型权限、真实任务、质量结果、复用资产、带教与风险责任放进同一 rubric，明确 AI 使用量不能直接换晋升。
3. **初级人才与专家供给。** 追踪哪些练习任务被自动化、哪些训练被重建，以及导师时间、独立承担率、评审负荷、晋升质量和继任覆盖。
4. **FDE / Applied AI 职业架构。** 从动态 JD 升级到连续需求、实际团队、职级薪带、汇报线、客户 owner、资产复用和项目退出。
5. **组织控制面与结果接口。** 将转型办公室、动作级授权、研发停止门、组合治理、资源闭环统一为“owner—指标—暂停—恢复—例外—审计”机制模板。
6. **中国公司制度原文。** 优先获取组织任命、岗位族、职级、晋升、绩效、股权激励、AI 人员数据使用和申诉规则，而不是继续堆叠媒体转述。

## 优先级与可直接执行的下一步

1. **P1：完成 8 月 3 日公开/专题闭环。** 主仓日报、工作日报、周月报和 digest 已补齐；待 18:00 正式专题运行后发布公开扫描页，并重新运行四项校验清除真实 404。
2. **P1：正式重跑 7 月 31 日至 8 月 2 日专题。** 只有通过质量门禁后才升级为 decision-ready；7 月 27 日可继续保留为显式历史缺口。
3. **P1：精读六份高价值新 PDF。** 优先 OpenAI Jobs Transition、Google ATLAS、UK Skills Classification、WEF Entry-Level Work、OECD AI Labour Market、Mercer/Eightfold Pay for Skills；每份补发布日期、样本、关键数字、机制、反例和引用位置。
4. **P1：为 10 个失败 PDF 建替代入口。** 优先机构 landing page、SEC/法院 HTML、SSRN abstract、作者版本或已存在的结构化卡；McKinsey 应直接复用现有高质量卡和本地原文，不再生成第三张模板卡。
5. **P2：建立 canonical 去重表。** 以 `sourceUrl + 报告标题 + 内容哈希` 识别同报告多 URL，先标记 superseded，再由人工确认删除 3 组重复 catalog 记录和孤立 wiki 文件。
6. **P2：扩展 lint。** 新增模板卡占比阈值、同 URL 多页面、frontmatter `sourceFile` 存在性、孤立页、重复 raw 内容和公开入口日期一致性检查。
7. **P2：新建 People/HR agent operating model 页面。** 回收 AIHR、BNY、Meta、Anthropic、转型办公室、数字同事和申诉材料，形成事实—判断—行动三层结构。
8. **P3：分批回填旧字段。** 先修最新 30 天，再处理历史 `sourceUrl` 63 条、`time` 4 条、`tags` 6 条，避免一次性机械改写全库。

## 本次执行记录

1. 读取自动化记忆与知识库 schema，恢复不完整仓库并完成完整对象校验、远端核对与 `git pull --ff-only`。
2. 按指定命令运行 PDF 自动入库两次（第二次验证生成器修复），最终识别 46 个唯一公开 PDF URL：36 个已下载、10 个待重试。
3. 修复 `scripts/ingest-pdf-references.js` 的 wiki frontmatter 相对路径，确认不再生成 `knowledge/knowledge/raw/` 错误目标。
4. 修复 `scripts/lint-knowledge-base.js` 的 PDF 待重试统计，并新增 reports 重复 summaryFile 检查。
5. 运行信息库审计、专题覆盖审计、知识库 lint 与公开分享检查：知识库 lint 为 warn，内部硬断链 0，公开 8 月 3 日扫描页 404。
6. 检查 PDF 卡、近期日报、专题质量页、索引、catalog、日志和隐私关键词，形成本报告。
