# OD Intelligence Center 最终运营 Runbook｜2026-07-01

## 三模块边界

1. **日常情报搜集**：维护 `digest.md`、`daily/`、`daily-report/` 的广谱前沿雷达。每日必须区分新增事实、旧线复核、弱信号和缺口记录。
2. **四专题研究**：维护 `specials/ai-org-talent-mechanism/` 的正式研究判断。只用 formal 报告支持结论，fallback 只能作为待补跑记录。
3. **知识库复利**：维护 `knowledge/` 的实体页、概念页、目录和 catalog。高价值信息必须回流实体、概念、对比页或专题 evidence-map。

## 每日运行规则

1. 信息库先运行 `node scripts/audit-info-library.js`，生成 `data/info-feed-status.json`。
2. 专题状态运行 `node scripts/generate-topic-project-status.js`，生成 `data/topic-projects-status.json` 和专题 manifest。
3. 知识库运行 `node scripts/lint-knowledge-base.js`，生成 `data/knowledge-status.json`。
4. 链接运行 `node scripts/check-public-links.js`，只负责 links、brokenLinks、warnings、qualityStatus。
5. 自动化运行 `node scripts/generate-automation-status.js`，记录各链路是否可确认。
6. 最后运行 `node scripts/generate-system-health.js`，聚合 manifest，生成 `operations/system-health-latest.md`。

## 每周与每月规则

- **周报**：每周输出两份：快速导读版只放结论、关键事实和启发；详细资料版沉淀当周 Context、线索和反例。
- **月报**：只读周报、专题账本和高价值知识页，不重新扫全历史。
- **周期互补**：信息库、专题研究、知识库分开治理；周/月沉淀时再交叉检查互补信息。

## pass / warn / fail

- **pass**：状态一致；一方链接无 broken；无绝对路径泄露；脚本通过；fallback 未冒充 formal。
- **warn**：外部链接网络失败；低信息日但有缺口说明；今日未到正式运行时间；专题待正式重跑；sourceUrl 缺失但属于弱信号或缺口记录。
- **fail**：本机绝对路径或私有来源路径泄露；一方内部链接 broken；公开扫描桥接 404；manifest JSON 不可解析；fallback 被标成 formal；弱信号被标成 L3/L4；首页关键状态不可验证。

## 故障处理

1. **manifest 不可解析**：停止发布判断，先修 JSON。
2. **专题今日为 fallback**：首页显示“仅兜底记录 / 待正式重跑”，不能显示正式完成。
3. **信息库低新增**：写缺口记录，说明扫描范围，不用低质量卡片凑数。
4. **外部链接失败**：记 warning；一方链接失败才阻断。
5. **状态冲突**：以 `operations/system-health-latest.md` 为最终读数。

## fallback 边界

GitHub Actions 只能做兜底、审计、补缺口记录、健康状态更新和可追责提交。它不能替代正式多代理研究，也不能把兜底稿标成 formal。

## Token 控制策略

默认先读 `data/*.json`、`operations/system-health-latest.md`、manifest 和最近交接文档；不全仓重读。每日只处理最新 24–48 小时，周报只读当周状态和正式产物，月报只读周报、专题账本和高价值知识页。
