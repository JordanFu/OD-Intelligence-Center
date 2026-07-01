# Token 控制策略

## 默认读取顺序

1. 先读 `operations/system-health-latest.md`。
2. 再读 `data/info-feed-status.json`、`data/topic-projects-status.json`、`data/knowledge-status.json`、`data/automation-status.json`。
3. 需要定位问题时，只读对应脚本或当日 manifest。
4. 不全仓重读，不全量打开历史日报、PDF、HTML。

## 每日工作

- 默认只处理最新 24–48 小时新增。
- 低新增日写缺口记录，不用低质量信息卡凑数量。
- 多渠道检索用于互证，不要求每个渠道都生成长文。
- 只有 P0 风险才扩大阅读范围。

## 周报和月报

- 周报只读当周状态、正式产物和高价值信息卡。
- 月报只读周报、专题账本和高价值知识页。
- 不重新扫描全部历史内容。

## 阶段停止条件

- 每个阶段只做：计划、执行、本地验收、commit/push。
- push 后默认不做完整 post-push 检查。
- 只有页面异常、rebase 冲突、auto-fallback 覆盖关键文件时，才做 post-push check。

## 输出规则

默认只输出结论、修改文件、测试结果、阻塞项、下一步。不反复贴完整 JSON、完整 diff、完整报告。
