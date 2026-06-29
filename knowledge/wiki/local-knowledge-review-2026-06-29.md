---
title: 本地知识库定期 Review（2026-06-29）
source: Codex Local Review
date: 2026-06-29
ingested: 2026-06-29
tags: [知识库巡检, AI组织设计, 组织机制, People/HR, AI fluency]
status: 已完成本地巡检；含 PDF 自动入库、边界修复、覆盖审计与下一步建议
---

# 本地知识库定期 Review（2026-06-29）

## 本周健康度

- **总体健康度：84/100。**
- **仓库完整性：** `/private/tmp/ODIC-current` 是完整 git 仓库，remote 指向 `https://github.com/JordanFu/OD-Intelligence-Center.git`；`git pull --ff-only` 返回 `Already up to date.`。
- **信息库同步：** `node scripts/audit-info-library.js` 通过，当前信息库覆盖 65 天、599 条，最新日期为 `2026-06-29`，最新日 2 条。
- **PDF 入库：** 本轮自动识别 22 个唯一公开 PDF 来源，17 个已下载，5 个保留 URL 与引用上下文待重试；新增 MiniMax / HKEX 股份激励计划 PDF 原文与结构化卡片。
- **边界控制：** 已修复 PDF 入库脚本的仓库外引用路径泄露问题；仓库外扫描命中现在只保留“外部公开 PDF 扫描”的脱敏引用，不写本地私有目录路径。
- **研究连续性：** 日报层已到 `2026-06-29`；专题层审计显示 `2026-06-29` 尚无专题目录，`2026-06-24` 和 `2026-06-28` 仍为 non-decision。

## 已确认的积极变化

1. **信息库状态页已追平最新日报。** `operations/info-library-status.md` 从 `2026-06-27` 更新到 `2026-06-29`，解决了状态页滞后于日报的问题。
2. **PDF 自动入库边界得到脚本级修复。** 上周已手工清理过腾讯 PDF 卡片的本地路径，本周入库再次复现；本轮已在 `scripts/ingest-pdf-references.js` 增加脱敏引用标签，避免下次入库回流。
3. **新增 MiniMax 股份激励线索。** HKEX 公告已下载到 `knowledge/raw/`，并在 `knowledge/wiki/` 生成中文结构化卡片，可作为 AI 公司上市后长期激励、股权授予和稀缺人才保留的线索层证据。
4. **近期日报质量控制较克制。** `daily/2026-06-29.md` 明确把 DeepSeek 扩招降级为 L2-L3 近窗观察，未把招聘线索包装成公司级组织机制结论。

## 已发现问题

### P1

1. **专题覆盖缺口继续存在。** `specials/ai-org-talent-mechanism/quality/coverage-latest.md` 显示 `2026-06-29` 缺失专题目录，`2026-06-24`、`2026-06-28` 仍为 non-decision；日报已产出，但专题研究还没有完全闭环。
2. **5 个 PDF 仍未完成原文闭环。** 失败项为 GitLab 8-K、SSRN `6456498`、BCG AI Radar 2026、BCG + MIT Sloan《The Emerging Agentic Enterprise》、UMassMed career ladder matrix。它们仍只能作为线索层，不应进入结论层。
3. **PDF 入库仍会重复记录同一外部扫描上下文。** MiniMax HKEX 卡片出现两条同样行号的“外部公开 PDF 扫描”引用，说明脚本已脱敏但未做 citation 去重。

### P2

4. **自动入库卡片仍有大量“待精读”状态。** 新增 MiniMax 卡片和部分既有 PDF 仍停留在结构化初筛，缺报告发布日期、样本口径、关键数字和可复用机制提炼。
5. **索引命名质量仍不稳定。** 仍存在 `netflix culture`、`engineering progression framework v2 0`、`6456498`、`0000050863 26 000011` 等文件名式标题，影响检索和知识复用。
6. **信息库字段仍有少量结构缺失。** 审计显示 `sourceUrl` 缺失 50 条、`time` 缺失 3 条；不影响本轮通过，但会影响后续证据追溯和时间线排序。

### P3

7. **主题标签仍偏粗。** 新增 MiniMax 股份激励公告仍默认进入 `AI组织设计`，但更适合细分到 `薪酬激励`、`股权激励`、`AI人才保留`。
8. **中国公司 People/HR 一手制度证据仍偏弱。** 近期有 DeepSeek 扩招、MiniMax 股份激励、腾讯财报等线索，但还缺公司正式 handbook、晋升规则、内部流动制度或 AI fluency 评价制度。

## 主题覆盖判断

- **相对较强：** AI-first operating model、AI fluency、工程组织人机协作、岗位/能力包、薪酬和技能溢价的咨询/行业报告证据。
- **正在增强：** 中国 AI 原生公司组织扩张、股权激励、AI 研发投入与产品核算线索。
- **仍然偏弱：** People/HR 自身的 AI operating model、晋升制度一手材料、内部流动机制、AI 能力如何进入绩效与晋升、管理跨度和 player-coach 校准机制。

## 建议补齐的研究缺口

1. **AI fluency 进入绩效与晋升的制度样本。** 继续找 handbook、rubric、manager guide、promotion packet 级证据，避免只停留在培训或工具采用。
2. **AI 原生公司从小团队扩张到平台组织的机制。** 以 DeepSeek 为近窗观察，追踪岗位族群、onboarding、代码/模型评审、安全 gate、产品化与职能边界。
3. **股权/薪酬激励如何承接 AI 稀缺人才。** 以 MiniMax HKEX 公告、EY、Payscale、Monzo 为证据组，拆出“新序列、技能标签、薪酬带宽、股权授予”四类工具。
4. **People/HR 自身的 Agent 工作流。** 需要把 HRBP、COE、SSC/People Ops、manager self-service 和员工服务 agent 放进一张 operating model。
5. **下载失败 PDF 的替代入口。** 对 5 个失败 PDF 建立浏览器页面、HTML 报告、SEC filing 页面或机构镜像入口，降低长期线索层滞留。

## 优先级与可直接执行的下一步

1. **P1：** 为 `2026-06-29` 生成 `specials/ai-org-talent-mechanism/2026-06-29/` 四专题正式稿，或明确记录为 non-decision，不要让覆盖审计保持“缺失日期”。
2. **P1：** 重跑并升级 `2026-06-24`、`2026-06-28` 两天 non-decision 专题稿。
3. **P1：** 给 PDF 入库增加 citation 去重，避免同一外部扫描行重复进入“被引用位置”。
4. **P2：** 批量清理文件名式 PDF 标题，优先处理 Netflix、Monzo、SSRN、Intel、Orgvue、HBS。
5. **P2：** 精读 MiniMax HKEX 公告，判断是否可拆成“AI 公司股权激励与人才保留”案例卡。

## 本次执行记录

1. 读取上次自动化记忆，确认上周遗留问题包括 PDF 失败项、文件名式标题和私有路径回流风险。
2. 确认 `/private/tmp/ODIC-current` 为完整 git 仓库，并执行 `git pull --ff-only`，结果为 `Already up to date.`。
3. 按自动化指定的 `EXTRA_PDF_SCAN_DIRS` 执行 PDF 自动入库；报告中不保留本地私有扫描目录路径。
4. 入库结果：22 个唯一 PDF 来源，17 个下载成功，5 个下载失败待重试。
5. 修复 `scripts/ingest-pdf-references.js`，对仓库外扫描来源进行脱敏 citation 输出，并为 HKEX MiniMax 公告补充中文标题。
6. 重新执行 PDF 入库并验证：不再出现本地私有扫描目录路径；`node --check scripts/ingest-pdf-references.js` 通过。
7. 执行 `node scripts/audit-info-library.js`，信息库审计通过并更新状态页。
8. 执行 `node scripts/audit-ai-org-report-coverage.js`，生成 `2026-06-29` 覆盖审计并暴露专题缺口。
