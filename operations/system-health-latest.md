# 系统健康状态

> 自动生成：2026-08-22T04:30:33.159Z

## 一眼判断

- 总体状态：⚠️ warn
- 情报流状态：✅ pass
- 专题研究状态：⚠️ warn
- 知识库状态：⚠️ warn
- 自动化状态：⚠️ warn
- 一方链接状态：⚠️ warn
- 当前结论：状态链可信但仍有运营债务；允许展示 warn，不允许美化成 pass。

## 情报流状态

- 最新日期：2026-08-22
- 今日卡片数：10
- 今日新增事实：8
- 旧线复核 / Context：0
- 弱信号：1
- 缺口记录：1
- 渠道覆盖：官方、媒体、JD薪酬、报告学术、社媒公众号
- sourceUrl 缺失：0

## 专题研究状态

- 今日日期：2026-08-22
- 今日专题状态：fallback
- 最新正式日报日期：2026-08-21
- 待正式重跑日期数：21
- 待正式重跑日期：2026-08-22、2026-08-16、2026-08-09、2026-07-13、2026-07-12、2026-07-11、2026-07-06、2026-07-03、2026-06-22、2026-06-11、2026-06-10、2026-06-01 等 21 项

## 知识库状态

- Catalog 日期：2026-08-22
- 知识源：4
- 报告 / 知识页：136
- 待重试 PDF：13
- 本地或私有路径泄露：0
- 缺失 summaryFile：0

## 自动化状态

- 本地正式任务：manual-check-required
- GitHub Actions 角色：fallback-only
- GitHub Actions 定时数：4
- 信息库链路：✅ pass
- 专题链路：⚠️ warn
- 知识库 lint 链路：✅ pass
- 链接检查链路：⚠️ warn

## 链接检查

- 一方断链数：0
- 外部链接 warning：60
- 公开扫描桥接：ok:200、ok:200、ok:200

## 质量语义

- pass：状态一致；一方链接无 broken；无路径泄露；脚本通过；fallback 未冒充 formal。
- warn：外部链接网络失败；低信息日但有缺口说明；今日未到正式运行时间；专题待正式重跑；sourceUrl 缺失但为弱信号或缺口记录。
- fail：本机绝对路径或私有来源路径泄露；一方内部链接 broken；公开扫描桥接 404；manifest JSON 不可解析；fallback 被标成 formal；弱信号被标成 L3/L4；首页关键状态不可验证。

## 当前问题

- ✅ 无 P0 fail。
- ⚠️ external link not hard-checked in Phase 1
- ⚠️ knowledge/catalog.json 的 reports 存在 3 组重复 summaryFile。
- ⚠️ external link not hard-checked in Phase 1
- ⚠️ 专题研究状态为 warn
- ⚠️ 本地正式任务无法确认已完成，需要人工补跑或等待正式自动化
- ⚠️ 专题待正式重跑 21 天
