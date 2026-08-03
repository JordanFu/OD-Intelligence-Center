# 系统健康状态

> 自动生成：2026-08-03T05:59:56.278Z

## 一眼判断

- 总体状态：❌ fail
- 情报流状态：✅ pass
- 专题研究状态：⚠️ warn
- 知识库状态：⚠️ warn
- 自动化状态：❌ fail
- 一方链接状态：⚠️ warn
- 当前结论：存在阻断项；首页和自动化不得显示已正式完成。

## 情报流状态

- 最新日期：2026-08-03
- 今日卡片数：14
- 今日新增事实：11
- 旧线复核 / Context：1
- 弱信号：1
- 缺口记录：1
- 渠道覆盖：官方、媒体、报告学术、社媒公众号、JD薪酬
- sourceUrl 缺失：0

## 专题研究状态

- 今日日期：2026-08-03
- 今日专题状态：fallback
- 最新正式日报日期：2026-08-02
- 待正式重跑日期数：19
- 待正式重跑日期：2026-08-03、2026-07-13、2026-07-12、2026-07-11、2026-07-06、2026-07-03、2026-06-22、2026-06-11、2026-06-10、2026-06-01、2026-05-29、2026-05-28 等 19 项

## 知识库状态

- Catalog 日期：2026-08-03
- 知识源：4
- 报告 / 知识页：113
- 待重试 PDF：11
- 本地或私有路径泄露：0
- 缺失 summaryFile：0

## 自动化状态

- 本地正式任务：manual-check-required
- GitHub Actions 角色：fallback-only
- GitHub Actions 定时数：0
- 信息库链路：✅ pass
- 专题链路：⚠️ warn
- 知识库 lint 链路：✅ pass
- 链接检查链路：⚠️ warn

## 链接检查

- 一方断链数：0
- 外部链接 warning：50
- 公开扫描桥接：warn:n/a、warn:n/a

## 质量语义

- pass：状态一致；一方链接无 broken；无路径泄露；脚本通过；fallback 未冒充 formal。
- warn：外部链接网络失败；低信息日但有缺口说明；今日未到正式运行时间；专题待正式重跑；sourceUrl 缺失但为弱信号或缺口记录。
- fail：本机绝对路径或私有来源路径泄露；一方内部链接 broken；公开扫描桥接 404；manifest JSON 不可解析；fallback 被标成 formal；弱信号被标成 L3/L4；首页关键状态不可验证。

## 当前问题

- ❌ workflow 缺少命令：node scripts/audit-info-library.js；node scripts/generate-topic-project-status.js；node scripts/lint-knowledge-base.js；node scripts/check-public-links.js；node scripts/generate-automation-status.js；node scripts/generate-system-health.js
- ❌ workflow 缺少定时 cron
- ⚠️ knowledge/catalog.json 的 reports 存在 3 组重复 summaryFile。
- ⚠️ workflow 名称未显式标注 fallback
- ⚠️ workflow git add 未覆盖 data/
- ⚠️ workflow git add 未覆盖 operations/
- ⚠️ workflow git add 未覆盖新增自动化聚合脚本
- ⚠️ 专题研究状态为 warn
- ⚠️ 本地正式任务无法确认已完成，需要人工补跑或等待正式自动化
- ⚠️ 专题待正式重跑 19 天
