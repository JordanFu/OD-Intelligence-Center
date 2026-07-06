---
title: 本地知识库定期 Review（2026-07-06）
source: Codex Local Review
date: 2026-07-06
ingested: 2026-07-06
tags: [知识库巡检, AI组织设计, 组织机制, People/HR, AI fluency]
status: 已完成本地巡检；含 PDF 自动入库、近期内容归位、证据质量和下一步建议
---

# 本地知识库定期 Review（2026-07-06）

## 本周健康度

- **总体健康度：86/100。**
- **仓库完整性：** `/private/tmp/ODIC-current` 是完整 git 仓库，remote 指向 `https://github.com/JordanFu/OD-Intelligence-Center.git`；本轮在本地生成日报、PDF 入库与状态文件后等待 `sync.sh` 统一提交/推送。
- **信息库同步：** `operations/info-library-status.md` 最新日期为 `2026-07-06`，覆盖 72 个信息日、656 条信息卡。最近 7 个信息日均有记录，质量状态为 `warn`。
- **知识库 lint：** `operations/knowledge-lint-latest.md` 显示 Phase 1 强检查通过：本地或私有路径泄露 0、缺失 summaryFile 0、重复编号 0。
- **PDF 入库：** 本轮自动识别 24 个唯一公开 PDF 来源，19 个已下载，5 个保留 URL 与引用上下文待重试；未发现把 `source-channels.private`、`local-reference-structured`、`archive`、密码或本地私有扫描路径写入公开知识库。
- **专题连续性：** `specials/ai-org-talent-mechanism/quality/coverage-latest.md` 显示 2026-06-22 至 2026-07-05 无缺失日期、无 non-decision；但 2026-06-23、06-25、06-26、06-27、06-30、07-01 至 07-05 仍有结构信号不完整。

## 已确认的积极变化

1. **上周专题缺口已明显收敛。** 6 月 29 日仍缺专题目录、6 月 24/28 仍为 non-decision 的问题，本轮状态页已显示无缺失日期、无待重跑。
2. **信息库日期已连续推进到 7 月 6 日。** 6 月 30 日至 7 月 6 日均有日报和 digest 信息卡，没有出现断日。
3. **PDF 自动入库边界继续守住。** 仓库外扫描来源仍被脱敏为外部公开扫描上下文，没有回流本地绝对路径。
4. **近期内容分层更克制。** Cisco/Workday、Meta/Challenger、Microsoft/AWS FDE 等近窗内容基本按 L1-L3 分层处理，未把媒体转述或旧线复核直接包装为确定性结论。
5. **Phase 4 概念/实体页补强了长期导航。** FDE / Applied AI、AI workforce risk、可审计晋升证据，以及 OpenAI、Anthropic、AWS、Cursor、ByteDance、Oracle、GitLab、Microsoft 等实体页已经进入主索引。

## 已发现问题

### P1

1. **最近信息日质量仍是 warn。** 7 月 6 日最新日有 4 条新增事实、4 类渠道，但新增事实仍少于 5 条；7 月 3 日至 7 月 5 日也存在新增事实少于 5 条或渠道类型不足的问题。当前处理方式是诚实记录缺口，但还需要补充报告学术、JD 薪酬和一手制度材料。
2. **5 个 PDF 仍未完成原文闭环。** 失败项为 GitLab 8-K、SSRN `6456498`、BCG AI Radar 2026、BCG + MIT Sloan《The Emerging Agentic Enterprise》、UMassMed career ladder matrix。它们仍只能作为线索层或引用上下文，不应进入结论层。
3. **自动入库卡片仍大量停留在“待评估”。** Netflix culture、Monzo engineering progression、Deloitte spans and layers、Orgvue AI research、Intel filing、HBS 论文等虽然已下载，但缺中文精读结论、关键数字、样本口径和可复用机制抽象。

### P2

4. **PDF 标题质量仍影响检索。** 仍有 `netflix culture`、`engineering progression framework v2 0`、`6456498`、`H3 AP202606221823746144 1`、`47382ae...`、`0000050863 26 000011` 等文件名式标题。
5. **索引与 catalog 曾出现分叉。** `knowledge/index.md` 已列出 2026-06-29 review，但 `knowledge/catalog.json` 未登记；本轮补齐 2026-06-29 与 2026-07-06 两个 review 条目，后续仍应避免只改 index 不改 catalog。
6. **信息库旧字段仍有追溯缺口。** 全库 `sourceUrl` 缺失 53 条、`time` 缺失 3 条；这不影响最新日强检查，但影响跨期证据追溯和时间线排序。

### P3

7. **中文公司一手制度材料仍偏弱。** DeepSeek、字节、MiniMax、腾讯等线索已经出现，但多数仍是招聘、公告、媒体或公众号表达，缺 handbook、晋升规则、绩效口径、职级/薪酬带宽和 AI fluency rubric。
8. **People/HR 自身的 agent operating model 仍缺主线页。** Workday、AIHR、HR GenAI adoption 论文和 HR Tech 线索已有碎片，但还没有沉淀成 HRBP、COE、SSC/People Ops、manager self-service 和员工服务 agent 的机制框架。

## 主题覆盖判断

- **相对较强：** FDE / Applied AI、AI-first operating model、工程组织人机协作、AI workforce risk、AI fluency 与技能组织。
- **正在增强：** 客户现场工程组织、agent governance、AI 相关裁员叙事与员工信任、AI 公司股权/薪酬激励。
- **仍然偏弱：** 晋升制度一手证据、People/HR 自身工作流重构、管理跨度与 player-coach 校准、AI fluency 如何进入绩效和晋升。

## 建议补齐的研究缺口

1. **FDE / Frontier Company 的组织边界。** 追踪 Microsoft、AWS、OpenAI、Anthropic、Cursor 等公司 FDE 与销售、咨询、解决方案架构、客户成功、产品工程、SI 伙伴的边界。
2. **AI fluency 进入绩效与晋升。** 优先寻找 rubric、promotion packet、manager guide、skill matrix、校准样例，而不是只收培训或观点稿。
3. **People/HR agent operating model。** 将 Workday agent system of record、AIHR HR priorities、HR GenAI adoption 论文和企业 People Ops 场景沉淀为一张机制图。
4. **AI workforce 风险链条。** 用 Oracle、Challenger、Meta、RAISE US 等材料拆分裁员理由、真实自动化、技能断层、士气/信任和外部转型责任。
5. **中国 AI 原生公司制度证据。** 对 DeepSeek、MiniMax、字节、腾讯继续找官方岗位族、职级、期权/股权、绩效和组织治理文本。

## 优先级与可直接执行的下一步

1. **P1：** 对 5 个下载失败 PDF 建立替代入口：SEC filing HTML、机构报告页、SSRN abstract、BCG HTML/镜像页、UMassMed 页面或搜索缓存。
2. **P1：** 精读并改名 6 个高价值 PDF 卡片：Netflix culture、Monzo progression、Orgvue AI research、Deloitte spans/layers、Intel filing、HBS 论文。
3. **P2：** 为 People/HR agent operating model 新建主题页，回收 Workday、AIHR、HR GenAI adoption、agent system of record 等证据。
4. **P2：** 补齐最近 7 个信息日中渠道不足的报告学术/JD 薪酬证据，尤其是 2026-07-03 至 2026-07-05。
5. **P3：** 回填全库 53 条缺失 `sourceUrl` 与 3 条缺失 `time`，提高跨期追溯质量。

## 本次执行记录

1. 读取上次自动化记忆，确认遗留问题包括 PDF 失败项、文件名式标题、专题 non-decision 和私有路径回流风险。
2. 确认当前目录是完整 git 仓库，并在本地完成 2026-07-06 信息卡、PDF 入库与状态生成。
3. 按自动化指定命令执行 PDF 自动入库：识别 24 个唯一 PDF 来源，19 个下载成功，5 个下载失败待重试。
4. 检查 `knowledge/wiki`、`knowledge/index.md`、`knowledge/catalog.json`，未发现本地私有扫描路径、密码或私有渠道正文泄露。
5. 抽查 2026-06-30 至 2026-07-05 日报、信息库状态、知识库 lint 和专题覆盖审计，形成本报告。
6. 补齐本报告与 2026-06-29 review 在主索引和 catalog 的登记，避免索引/catalog 分叉。
