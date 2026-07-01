# Phase 5 自动化运营固化｜2026-07-01

## 本阶段做了什么

- 新增 `scripts/generate-automation-status.js`，把信息库、专题、知识库、链接检查、GitHub fallback 和本地正式任务状态聚合到 `data/automation-status.json`。
- 新增 `scripts/generate-system-health.js`，只读 manifest 生成 `operations/system-health-latest.md`，不重新扫描内容文件。
- 更新 GitHub Actions，让 fallback 在原有审计后生成自动化状态和最终系统健康。
- 新增最终 runbook、项目收口、backlog 和 token 控制策略。

## 边界

- 本阶段不修改 `digest.md`、`daily/`、`daily-report/`、首页、专题账本、知识库实体页和概念页。
- GitHub Actions 仍然只是 fallback，不能把兜底稿冒充正式日报。
- 本地正式任务无法从云端确认时，状态只能写 `manual-check-required`。

## 验收重点

- 六个脚本均通过 `node --check`。
- 六个脚本按顺序运行后，`system-health-latest.md` 能显示总体判断。
- 路径泄露 grep 无真实泄露。
- `git diff --check` 无格式问题。

## 后续建议

进入后续阶段前，先观察一次完整的每日自动化运行，确认 Actions 没有覆盖关键文件、没有把 fallback 标为 formal。
