# 系统健康状态

> 自动生成：2026-07-14T11:48:29.947Z

## 一眼判断

- 总体状态：❌ fail
- 情报流状态：❌ fail
- 专题研究状态：❌ fail
- 知识库状态：❌ fail
- 自动化状态：❌ fail
- 一方链接状态：❌ fail
- 当前结论：存在阻断项；首页和自动化不得显示已正式完成。

## 情报流状态

- 最新日期：2026-07-13
- 今日卡片数：24
- 今日新增事实：24
- 旧线复核 / Context：0
- 弱信号：0
- 缺口记录：0
- 渠道覆盖：报告学术、JD薪酬、媒体、官方、社媒公众号
- sourceUrl 缺失：1

## 专题研究状态

- 今日日期：2026-07-14
- 今日专题状态：fallback
- 最新正式日报日期：2026-07-10
- 待正式重跑日期数：19
- 待正式重跑日期：2026-07-14、2026-07-13、2026-07-12、2026-07-11、2026-07-06、2026-07-03、2026-06-22、2026-06-11、2026-06-10、2026-06-01、2026-05-29、2026-05-28 等 19 项

## 知识库状态

- Catalog 日期：2026-07-14
- 知识源：4
- 报告 / 知识页：85
- 待重试 PDF：1
- 本地或私有路径泄露：0
- 缺失 summaryFile：0

## 自动化状态

- 本地正式任务：manual-check-required
- GitHub Actions 角色：fallback-only
- GitHub Actions 定时数：4
- 信息库链路：❌ fail
- 专题链路：❌ fail
- 知识库 lint 链路：✅ pass
- 链接检查链路：❌ fail

## 链接检查

- 一方断链数：1
- 外部链接 warning：26
- 公开扫描桥接：ok:200、ok:200、warn:404

## 质量语义

- pass：状态一致；一方链接无 broken；无路径泄露；脚本通过；fallback 未冒充 formal。
- warn：外部链接网络失败；低信息日但有缺口说明；今日未到正式运行时间；专题待正式重跑；sourceUrl 缺失但为弱信号或缺口记录。
- fail：本机绝对路径或私有来源路径泄露；一方内部链接 broken；公开扫描桥接 404；manifest JSON 不可解析；fallback 被标成 formal；弱信号被标成 L3/L4；首页关键状态不可验证。

## 当前问题

- ❌ 一方内部链接存在断链：1 条；需先运行或修复链接检查。
- ❌ 一方链接或公开扫描桥接存在 fail
- ⚠️ 最新日期非缺口信息卡多于 15 条：当前 24 条；需要确认不是低价值堆叠。
- ⚠️ 最新日期有 1 条 sourceUrl 缺失：C04。
- ⚠️ 最新日期仍有新结构字段缺失：信息类型 24 条；渠道类型 24 条；结论置信度 24 条；验证问题 24 条。
- ⚠️ 最近 7 个信息日存在结构字段缺失：24 类日期/字段组合需逐步补齐。
- ⚠️ external link not hard-checked in Phase 1
- ⚠️ external link not hard-checked in Phase 1
- ⚠️ external link not hard-checked in Phase 1
- ⚠️ external link not hard-checked in Phase 1
- ⚠️ external link not hard-checked in Phase 1
- ⚠️ external link not hard-checked in Phase 1
- ⚠️ external link not hard-checked in Phase 1
- ⚠️ external link not hard-checked in Phase 1
- ⚠️ external link not hard-checked in Phase 1
- ⚠️ external link not hard-checked in Phase 1
- ⚠️ external link not hard-checked in Phase 1
- ⚠️ external link not hard-checked in Phase 1
- ⚠️ external link not hard-checked in Phase 1
- ⚠️ external link not hard-checked in Phase 1
- ⚠️ external link not hard-checked in Phase 1
- ⚠️ external link not hard-checked in Phase 1
