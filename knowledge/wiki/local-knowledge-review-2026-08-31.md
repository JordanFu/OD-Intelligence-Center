---
title: 本地知识库定期 Review（2026-08-31）
source: Codex Local Review
date: 2026-08-31
ingested: 2026-08-31
tags: [知识库巡检, AI组织设计, 组织机制, 人才发展, 晋升, People/HR, AI fluency]
status: 已完成仓库校验、PDF 自动入库、结构化质量、专题连续性与分享入口审计
---

# 本地知识库定期 Review（2026-08-31）

## 一句话判断

知识库本体仍可检索、可追溯且无一方硬断链，但运行链已经出现实质性保鲜失败：信息流停在 8 月 27 日，8 月 28—31 日只有非决策兜底专题；与此同时，81 张 PDF 卡中 66 张仍停留在模板级，来源类型、生命周期和 canonical 映射继续失真。本周最值得保留的新沉淀是 Tibo 的“能力发现—产品化—真实使用—反馈回流—资源再配置”机制研究；当前优先级应从继续扩来源转向恢复正式信息流、完成高引用 PDF 精读和统一证据语义。

## 本周知识库健康度

- **总体健康度：80/100（warn）。** 知识库 lint 与系统总体均为 `warn`；当前无 P0 fail，但信息流停在 8 月 27 日、连续四天专题待正式重跑，不能把索引可用等同于知识系统健康。
- **仓库完整性：20/20。** 活动仓库是完整 `main` 工作区，包含 2,219 个跟踪文件；`git fsck --full` 无错误，`git pull --ff-only` 已快进到最新 `origin/main`。
- **隐私与来源边界：20/20。** catalog、索引与 PDF 卡没有本地绝对路径、私有渠道名、凭据或密码泄露；被排除的私有、结构化本地与归档位置未被公开入库。
- **内容结构化：6/20。** 81 张 PDF 卡中 66 张仍含“需精读/尚未完成报告级摘要”等模板信号，占 81.5%；只有少量高价值 PDF 达到可复用中文结构化卡片标准。
- **时效与状态链：14/20。** 8 月 24—27 日信息流和正式专题完整，8 月 26 日新增 Tibo 机制研究质量较高；但信息流停在 8 月 27 日，8 月 28—31 日专题均为 `non-decision`，系统列出 24 个待正式重跑日期。
- **链接与证据闭环：18/20。** 本地检查 3,276 个一方目标，硬断链为 0；公开根页和 8 月 27 日页面返回 200，8 月 31 日公开页面返回 404。50 个外部链接仍仅完成 Phase 1。

## 已确认的积极变化

1. **8 月 24—27 日新增内容归位正确。** `daily/`、`daily-report/`、专题五件套、质量门禁和 manifest 状态链完整，事实、判断、行动、弱信号和反事实边界总体清楚。
2. **Tibo 研究形成了真正的机制页。** `tibo-research-product-org-mechanism-2026-08-26.md` 不是访谈摘抄，而是把研究—产品协同、发布梯度、资源再配置、监督瓶颈和 stop energy 翻译成决策权、岗位、绩效和治理机制，并区分 L1/L2/L3。
3. **近期日报继续避免伪造趋势。** 8 月 24—27 日没有把招聘页当编制、把培训目标当结果、把减员当减层，也没有把单点岗位或媒体线索升级为稳定组织效果。
4. **PDF 自动入库覆盖扩大。** 本轮识别 73 个公开 PDF，60 个已有本地原文，13 个当前下载失败；新引用已进入 raw/wiki/index/catalog/log 链路。
5. **首次入库时间污染已止住。** 入库生成器新增回归保护：重复扫描保留原始 `ingested/uploadDate`，相同公开安全引用不再重复写入。
6. **公开根页仍可用。** `https://jordanfu.github.io/org-intelligence-info/` 与 8 月 27 日公开页均返回 200；分享系统不是整体下线。

## 已发现问题

### P1：运行链保鲜风险

1. **信息流公开镜像停在 8 月 27 日。** `daily/`、`daily-report/`、`digest.md` 和状态文件没有 8 月 28—31 日正式信息卡；当前尚未被系统判为 P0，但保鲜风险已经明显。
2. **连续四天只有非决策兜底专题。** 8 月 28—31 日五件套文件存在、结构也完整，但 manifest 和质量报告均明确为 `fallback/non-decision`，不得进入正式证据账本。
3. **8 月 31 日公开分享页为 404。** 根页和 8 月 27 日页面可用，说明问题是最新内容未发布，而不是 GitHub Pages 整体不可用。

### P1：直接影响证据可信度

4. **PDF 模板债务升至 66/81。** 高引用材料如 NBER `f232578`、ANU Managers as Gatekeepers、OpenAI Jobs Transition、UK Skills Classification、WEF entry-level work 仍缺中文结论、样本、关键数字、OD 机制、反例、页码和证据等级。
5. **PDF 来源类型仍大面积失真。** 81 张 PDF 卡中 58 张标为 `media`，其中包含 NBER、ANU、arXiv、NIST、政府、法院、交易所和公司 IR 一手材料；这会误导检索、统计和后续证据使用。
6. **PDF 失败计数仍有三种口径。** 本轮真实下载失败为 13，卡片/lint 按历史与 catalog 映射统计为 15，重复 summaryFile 又影响 canonical 数；当前失败、历史失败、替代入口和 superseded 尚未共享生命周期模型。
7. **W34 对 8 月 21 日的状态冲突仍未解决。** `weekly/latest*` 仍写 8 月 21 日为非决策兜底，但 manifest、质量报告和当前专题状态将其标为 formal；同一日期不能同时作为正式证据和 Context。

### P2：重复、标题与字段债务

8. **catalog 仍有 3 组重复 `summaryFile`。** OECD、CEN/CENELEC 草案、PwC AI Jobs Barometer 各有两个 report ID 指向同一知识页，应标 canonical/superseded，而不是静默重复计数。
9. **23 张 PDF 标题仍是文件名、哈希或编号。** 包括 `f232578`、多张 arXiv 编号、ANU 工作论文名、腾讯哈希、法院案号和 Intel filing 编号，检索时不能直接表达主题和机制。
10. **3 张旧 PDF 卡仍无统一 `status`。** McKinsey AI-first workforce、McKinsey State of Organizations、Microsoft Work Trend Index 不进入统一生命周期统计。
11. **最近 7 个信息日仍有结构字段缺失。** 8 月 24—25 日存在信息类型、渠道类型、结论置信度等缺口；全库还有 63 个 `sourceUrl`、12 个 tags、10 个 time、10 个 trust 和 1 个 source 缺失。
12. **外部链接仍未完成二阶段核验。** 50 个 warning 不是已失效结论；13 个当前 PDF 下载失败项应优先补官方落地页、DOI、SEC/交易所归档页或其他 canonical 入口。

## 最近新增内容的归位判断

| 内容 | 当前归位 | 判断 |
|---|---|---|
| 8 月 24—27 日信息流 | `daily/` + `daily-report/` | 归位正确；事实、Context、弱信号和缺口均有显式标签。 |
| 8 月 24—27 日专题 | 日期专题目录 + quality + manifest | 归位正确；正式门禁与状态一致。 |
| 8 月 28—31 日专题 | 日期专题目录 + quality + manifest | 文件齐全但只是 fallback；不得因页面完整而升级为正式证据。 |
| Tibo 研究—产品机制 | wiki 卡 + synthesis + concept/entity 关联 | 归位正确且结构化充分，是本周最值得复用的新知识。 |
| W35 周报 | `specials/.../weekly/2026-W35*` | 只能作为 fallback 状态汇总，不应覆盖正式 latest；同时暴露正式输入中断。 |
| 73 个 PDF 来源刷新 | raw + wiki + catalog + log | 入库成功；首次日期与重复引用问题已修复，结构化、来源类型与生命周期仍待治理。 |

## 建议补齐主题

1. **AI 运行许可链。** 把暂停、隔离、逐 workload 复启、回滚、人工升级、独立复核和申诉整合为一页“停止—恢复—审计”责任图。
2. **初级经验生产与经理门禁。** 连接入口任务、受控实训、导师负荷、评审等待、独立承担率、第二人覆盖和晋升证据。
3. **People/HR agent operating model。** 明确 HRBP、COE、People Ops/SSC、manager self-service、员工服务和人才系统的数据权、专业签字、例外、申诉与审计。
4. **AI fluency—绩效—晋升—薪酬闭环。** 以真实任务、可复用资产、质量结果、风险责任、带教和近期证据形成统一 rubric，避免把工具使用频次当能力。
5. **研究—产品转换回路的组织测量。** 将 Tibo 研究继续落到 feedback latency、review load、release gate、撤并速度、恢复能力和资源再配置成本。
6. **中国公司制度原文池。** 优先补交易所公告、岗位族、职级、晋升、绩效、员工数据治理与申诉制度，而不是继续扩二手叙事。

## 优先级与可直接执行的下一步

1. **P1：恢复 8 月 28—31 日正式信息流。** 先补 `daily/`、`daily-report/`、digest 与公开镜像，再重跑专题；不要直接把 fallback 改名为 formal。
2. **P1：发布并验证 8 月 31 日公开页。** 以 200 状态、页面内容和根页入口三项同时验收。
3. **P1：正式重跑 8 月 28—30 日专题。** 逐日通过严格质量门禁后再更新 manifest、baseline 和周报引用。
4. **P1：精读六份高引用 PDF。** 依次处理 NBER、ANU、OpenAI Jobs Transition、UK Skills Classification、WEF entry-level work、Mercer/Eightfold pay-for-skills。
5. **P1：重做 PDF 来源类型分类。** 建立 `government/regulatory/academic/company-primary/consulting/industry/media` 映射，并用 NBER、ANU、arXiv、NIST、法院、交易所和公司 IR 做回归样本。
6. **P2：统一 PDF 生命周期与 canonical 映射。** 采用 `discovered → raw-available/download-failed-current → structured → superseded`，标记 3 组重复 mapping，不删除历史记录。
7. **P2：修订 W34/8 月 21 日状态。** 保留历史截点说明，但让 `weekly/latest*` 与当前 manifest 明确区分“当时状态”和“当前状态”。
8. **P3：建立三张机制页。** 停止—恢复—审计、初级经验生产线、People/HR agent operating model；再用 AI fluency—晋升—薪酬页连接三者。

## 本次执行记录

1. 当前模式：Adopt/维护；保持知识库 canonical 语义，不删除历史、不把 fallback 冒充 formal。
2. 验证完整 Git 工作区、remote、branch、跟踪文件与 Git 对象，随后执行 `git pull --ff-only`。
3. 按要求在正式 review 前运行公开 PDF 自动入库；扫描排除私有渠道、归档和本地结构化私有源。
4. 运行信息流审计、知识库 lint、PDF 完整性回归、专题覆盖和链接检查；一方硬断链 0，私有路径泄露 0。
5. 在线验证公开根页与 8 月 27 日页面返回 200，8 月 31 日页面返回 404。
6. 修复 PDF 重扫覆盖首次入库日期及重复公开安全引用的问题，并补回归测试。
