---
title: 本地知识库定期 Review（2026-06-22）
source: Codex Local Review
date: 2026-06-22
ingested: 2026-06-22
tags: [知识库巡检, AI组织设计, 组织机制, People/HR, AI fluency]
status: 已完成本地巡检；含 PDF 自动入库结果、问题分级与下一步建议
---

# 本地知识库定期 Review（2026-06-22）

## 本周健康度

- **总体健康度：81/100。**
- **仓库完整性：** 当前 OD Intelligence Center 仓库已恢复为正常 `main` 工作树；`git pull --ff-only` 成功，当前可持续维护。
- **PDF 入库：** 本轮自动识别 21 个公开 PDF 引用，16 个已下载，5 个仍为待重试卡片；`knowledge/index.md`、`knowledge/catalog.json`、`knowledge/log.md` 已更新。
- **边界控制：** 未发现把 `source-channels.private`、`local-reference-structured`、`archive` 或密码/私有附件正文直接入库；但自动入库卡片一度写入本地私有扫描地址，已在本轮清理。
- **研究连续性：** `daily/` 与 `daily-report/` 当前最新到 `2026-06-18`，`coverage-latest.md` 显示 `2026-06-19` 至 `2026-06-21` 仍为 non-decision，说明近三天产出存在“有稿但未升级”为正式结论的断层。

## 已确认的积极变化

1. **仓库同步能力正常。** 当前 HEAD 位于 `main`，远端同步正常，已不是上周那种残缺工作树。
2. **状态页已追平已存在日报。** [`operations/info-library-status.md`](../../operations/info-library-status.md) 现在显示最新日期 `2026-06-18`，与当前 `daily/` 最新日期一致，说明上周“状态页滞后日报”的问题已消除。
3. **公开 PDF 已形成中文结构化骨架。** 新入库的 WEF、AIHR、BCG AI-First Organization、Anthropic 等卡片至少具备“一句话判断、核心内容、相关性、后续任务”等中文结构。
4. **本轮修复了两项低风险治理问题。** 腾讯两份 PDF 卡片已改成中文标题；公开知识库中带出的本地私有扫描地址已移除。

## 已发现问题

### P1

1. **最近三天专题仍停留在 non-decision。**
   [`specials/ai-org-talent-mechanism/quality/coverage-latest.md`](../../specials/ai-org-talent-mechanism/quality/coverage-latest.md) 明确将 `2026-06-19`、`2026-06-20`、`2026-06-21` 标为 non-decision。对外看起来像“日报持续产出”，但高置信结论层实际上中断了。
2. **5 个高价值 PDF 仍未完成原文闭环。**
   本轮失败项包括 GitLab 8-K、SSRN `6456498`、BCG AI Radar 2026、BCG+MIT Sloan《The Emerging Agentic Enterprise》、UMassMed career ladder matrix。它们目前只能作为线索层，不应与已下载精读材料并列使用。
3. **自动入库存在公开边界回流风险。**
   腾讯两张卡片把本地私有扫描目录路径写进了“被引用位置”。虽然内容本身未公开私有附件，但路径泄露说明自动入库对“公开仓库可暴露内容”的过滤还不够严。

### P2

4. **大量 PDF 卡片仍是“结构化初筛”，不是“结论化精读”。**
   多份卡片仍保留 `date: 待核验`、`待评估：需精读后确定`、`线索层优先` 等标记，说明知识库吸纳来源的速度快于把来源升级成复用知识的速度。
5. **索引命名质量不稳定。**
   虽然腾讯两条已修复，但 [`knowledge/index.md`](../index.md) 附近仍有 `netflix culture`、`engineering progression framework v2 0`、`6456498`、`0000050863 26 000011` 这类文件名式标题，影响检索和去重。
6. **知识日志噪声偏高。**
   [`knowledge/log.md`](../log.md) 开始的多轮 PDF 入库记录对同一报告反复记账，已不适合作为快速巡检入口。

### P3

7. **主题沉淀仍偏向“AI组织设计”总标签。**
   新入库 PDF 多数默认打到 `AI组织设计`，但围绕 People/HR、晋升、内部流动、AI fluency、技能薪酬 的二级主题拆分还不够细。
8. **中国公司正式 People/HR 机制证据仍偏弱。**
   目前腾讯、百度等更多是财报、媒体或组织调整信号，缺少可直接引用的公开 handbook、晋升规则、薪酬治理或内部流动制度页。

## 主题覆盖判断

- **相对较强：** AI fluency、岗位/能力包、技能溢价、AI-first operating model、工程与产品的人机协作。
- **相对较弱：** 正式的 People/HR operating model、中国公司的一手晋升与内部流动制度、manager/player-coach 校准机制、AI 进入绩效治理的合规边界。

## 建议补齐的研究缺口

1. **AI fluency 如何正式进入绩效与晋升。**
   现有 Zapier、Microsoft、McKinsey 足够强，但还缺更多公司 handbook / rubric / manager guide 级证据。
2. **People/HR 自身的 AI operating model。**
   已有 AIHR 与 McKinsey 宏观框架，仍缺把 HRBP、COE、SSC/People Ops、manager self-service、Agent workflow 串起来的综合页。
3. **技能标签、岗位族群与薪酬激励的联动治理。**
   EY、Payscale、Monzo、UMassMed、GitLab 各有片段，但尚未收敛成一张“什么时候用 skill premium，什么时候用新序列”的机制图。
4. **中国公司公开的一手组织机制样本。**
   尤其是 People/HR、职级、晋升、内部流动、项目负责制和 AI 人才发展制度。
5. **non-decision 到 decision-ready 的质量升级机制。**
   目前已能识别 non-decision，但缺少稳定的补跑 SLA 和“何时升级为正式稿”的闭环。

## 优先级与可直接执行的下一步

1. **P1：** 优先重跑 `2026-06-19`、`2026-06-20`、`2026-06-21` 的四专题正式稿，消除近三天 non-decision 断层。
2. **P1：** 给 PDF 自动入库增加公开边界过滤，至少排除本地绝对路径、私有扫描目录和非仓库内引用位置。
3. **P1：** 为 5 个下载失败 PDF 建“重试/替代入口”清单，避免它们长期停在线索层。
4. **P2：** 批量把文件名式 PDF 标题改成正式标题，并补充发布日期与样本口径。
5. **P2：** 以 `AI fluency / People AI ops / internal mobility / skill premium / promotion evidence` 五条主线，挑 3-5 个已下载 PDF 做精读升级。

## 本次执行记录

1. 确认当前 OD Intelligence Center 仓库初始为异常 checkout：只有 `.git` 元数据、无正常 HEAD 工作树；通过拉取远端 `main` 恢复为完整工作树。
2. 执行 `git pull --ff-only`，结果为 `Already up to date.`。
3. 执行 PDF 自动入库：`EXTRA_PDF_SCAN_DIRS="[本地私有资料目录已脱敏]" node scripts/ingest-pdf-references.js`。
4. 入库结果：21 个引用中成功 16 个、失败 5 个；成功项已写入 `knowledge/raw/` 和 `knowledge/wiki/`。
5. 修正腾讯两张 PDF 来源卡片的标题与公开边界，避免知识库继续保留哈希标题和本地私有路径。
