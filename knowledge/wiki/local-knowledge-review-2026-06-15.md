---
title: 本地知识库定期 Review（2026-06-15）
source: Codex Local Review
date: 2026-06-15
ingested: 2026-06-15
tags: [知识库巡检, AI组织设计, 人才发展, 晋升机制, AI fluency]
status: 已完成本地巡检；含仓库修复、PDF入库结果与后续优先级
---

# 本地知识库定期 Review（2026-06-15）

## 本周健康度

- **总体健康度：74/100。**
- **结构完整性：** 已从异常状态恢复到可维护状态。`/private/tmp/ODIC-current` 原工作树残缺，已通过干净克隆修复并重新执行 `git pull --ff-only`。
- **索引与入库：** PDF 自动入库成功处理 21 个引用，成功下载 16 个，失败 5 个；`knowledge/index.md`、`knowledge/catalog.json`、`knowledge/log.md` 已更新。
- **主题交付：** 最近一周 `daily/`、`daily-report/`、`specials/ai-org-talent-mechanism/` 持续有新增，但质量门禁并未全部通过，`2026-06-15` 仍是非决策稿。

## 已确认的积极变化

1. **仓库同步能力恢复。** 当前目录已是完整 git 仓库，`git pull --ff-only` 正常。
2. **PDF 入库边界守住。** 脚本明确跳过 `source-channels.private`、`local-reference-structured`、`archive`，本次未发现私有渠道被公开入库。
3. **新增公开 PDF 已进入知识库。** 腾讯两份 2026 年一季度 PDF 已落到 `knowledge/raw/`，并生成中文结构化来源卡片。
4. **可检索性略有改善。** 新入库腾讯 PDF 已从哈希标题修正为中文标题，避免在索引和目录里只显示乱码式文件标识。

## 已发现问题

### P1

1. **信息库索引滞后于最新日报。** [`operations/info-library-status.md`](/private/tmp/ODIC-current/operations/info-library-status.md:5) 仍显示最新日期为 `2026-06-14`，但本地已存在 [`daily/2026-06-15.md`](/private/tmp/ODIC-current/daily/2026-06-15.md:1)。这说明“日报存在”与“正式进入信息库滚动流”仍然脱节。
2. **当日专题页是兜底稿，不是正式研究稿。** [`specials/ai-org-talent-mechanism/2026-06-15/00-overview.md`](/private/tmp/ODIC-current/specials/ai-org-talent-mechanism/2026-06-15/00-overview.md:1) 及同日分专题文件均标明“非决策稿 / 待检索”，但目录结构上已经占位，容易让读者误判为已完成研究。
3. **质量审计显示连续结构缺口。** [`specials/ai-org-talent-mechanism/quality/coverage-latest.md`](/private/tmp/ODIC-current/specials/ai-org-talent-mechanism/quality/coverage-latest.md:6) 仍将 `2026-06-03`、`06-04`、`06-05`、`06-08`、`06-09`、`06-12`、`06-13`、`06-14` 标记为“文件或结构缺口”；`2026-06-10`、`06-11`、`06-15` 为非决策稿。

### P2

4. **大量 PDF 卡片仍停留在“待核验”层。** 多份 `knowledge/wiki/pdf-source-*.md` 只有初筛结构，没有明确发布日期、样本口径或可复用结论；`operations/info-library-status.md` 同时记录 `sourceUrl` 缺失 47 条。
5. **证据层级仍有混用风险。** 例如 GitLab 8-K、BCG Radar、BCG+MIT Sloan 等卡片虽然已入库，但仍是“待重试/待核验”，而专题稿中很容易把它们和正式一手制度材料并列使用。
6. **知识日志噪声偏高。** [`knowledge/log.md`](/private/tmp/ODIC-current/knowledge/log.md:17) 对同一 PDF 的重复下载/待重试记录很多，长期会降低日志作为巡检入口的可读性。

### P3

7. **个别索引命名仍偏技术化。** 例如 `netflix culture`、`engineering progression framework v2 0`、`6456498` 仍保留文件名式标题，检索体验不稳定。

## 主题覆盖判断

- **相对较强：** AI fluency、岗位族群/能力包、晋升证据包、技能溢价、AI-first 工程组织。
- **相对较弱：** 中国公司公开的一手 People/HR 机制、AI 时代内部流动制度、正式的薪酬带宽/技能溢价治理文件、manager/player-coach 校准机制、AI 进入绩效与晋升系统的劳动合规边界。

## 建议补齐的研究缺口

1. **AI fluency 如何正式进入绩效与晋升。**
   目前有 Zapier、Microsoft、McKinsey 的强线索，但缺少更多公司一手制度页，尤其缺 People/HR 正式写法。
2. **AI 时代的内部流动与 career lattice。**
   GitLab 有较强案例，但缺 OpenAI、Anthropic、Shopify、Salesforce 等公司公开 mobility 机制互证。
3. **基于技能的薪酬带宽与溢价治理。**
   EY、Payscale 已有研究层材料，但还缺公司一手 pay band、skill premium、sunset clause、项目激励治理案例。
4. **中国样本的正式组织机制证据。**
   国内目前仍偏媒体转述、岗位线索或业绩会表达，缺可直接锚定汇报线、岗位序列、晋升规则的公开制度材料。
5. **People/HR 自身如何被 AI 重写。**
   Shopify、GitLab、McKinsey 提供方向，但缺更多公开 handbook / operating model 级别材料。

## 优先级与下一步

### 本周优先级

1. **P1：** 重跑 `2026-06-15` 四专题正式稿，避免首页和专题目录继续混用非决策稿与正式稿。
2. **P1：** 补一次索引/滚动流同步，让 `operations/info-library-status.*` 与 `daily/2026-06-15.md` 对齐。
3. **P1：** 为本周新入库 PDF 建立“精读待办池”，优先处理腾讯两份 PDF、GitLab 8-K、BCG Radar、BCG+MIT Sloan。
4. **P2：** 批量清理仍以文件名/哈希命名的 PDF 卡片，统一成中文检索标题。
5. **P2：** 给 `coverage-latest.md` 里的结构缺口日期补“Context/背景材料/证据地图”层，减少“看似完整、实际不可复用”的日报。

### 可直接执行的动作

1. 运行一次正式的 AI 组织四专题重跑，不再保留 `2026-06-15` 的兜底稿为最新版本。
2. 以 `AI fluency / promotion evidence / internal mobility / skill premium / People AI ops` 五个关键词为轴，补一批公司一手 handbook 与制度页。
3. 把 `knowledge/log.md` 拆成“本次新增 / 待重试汇总”两层，降低重复行噪声。
4. 对 `sourceUrl` 缺失的 47 条做批量巡检，先区分“确实没有公开 URL”与“结构化漏填”。

## 本次执行记录

1. 确认原目录不是完整工作树后，先备份旧目录，再用干净克隆替换为新的 `/private/tmp/ODIC-current`。
2. 执行 `git pull --ff-only`，结果为 `Already up to date.`。
3. 执行 PDF 自动入库：`EXTRA_PDF_SCAN_DIRS="/Users/tal/Documents/New project/research/private-industry-bigtech-watch" node scripts/ingest-pdf-references.js`。
4. 入库结果：21 个引用中成功 16 个、失败 5 个；失败项包括 GitLab 8-K、SSRN、两份 BCG PDF、UMassMed PDF。
5. 恢复旧目录中的 `2026-06-15` 日报与工作日报，避免今日新增内容丢失。
