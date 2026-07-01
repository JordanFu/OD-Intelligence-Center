# Phase 1 主编系统修复日志｜2026-07-01

## 已修复

- 新增三类状态 manifest：`data/info-feed-status.json`、`data/topic-projects-status.json`、`data/knowledge-status.json`。
- 信息库审计只强制检查最新日期，兼容旧 `digest.md`，并把新字段缺失列为 warning，不批量改写历史。
- 专题状态生成器按正向条件识别正式决策稿，明确区分 `formal`、`fallback`、`needs-rerun`、`missing`。
- 知识库 lint 检查本地/私有路径泄露、summaryFile 存在性和索引重复编号。
- 公共链接检查把一方断链和公开扫描桥接 404 写入 manifest，首页不能再无条件显示“已同步”。
- 系统健康状态汇总写入 `operations/system-health-latest.md`。

## 当前状态

- 情报流：warn，最新日期 2026-07-01，今日卡片 8。
- 专题研究：warn，今日状态 fallback，最新正式日报 2026-06-30。
- 知识库：warn，本地/私有路径泄露 0，缺失 summaryFile 0。
- 链接检查：warn，一方断链 0。

## 仍未完成

- Phase 1 不重写最近 7 天 `digest.md`，因此历史信息卡的新字段缺失只作为 warning。
- Phase 1 不补 11 个实体页长文；实体页、概念页、对比页复利在 Phase 2 处理。
- Phase 1 不重跑正式专题日报；若未到 18:00 正式窗口，首页显示“待今日正式运行”；若今日只有 fallback 或缺失，首页显示“待正式重跑”。

## 需要补跑或人工验证

- 待正式重跑日期：2026-07-01、2026-06-22、2026-06-11、2026-06-10、2026-06-01、2026-05-29、2026-05-28、2026-05-27、2026-05-25、2026-05-20、2026-05-17、2026-05-16、2026-05-15、2026-05-13
- 待人工验证链接：https://www.aboutamazon.com/news/aws/aws-1-billion-forward-deployed-ai-engineers、https://job-boards.greenhouse.io/anthropic/jobs/5140403008、https://www.anthropic.com/careers/jobs、https://news.bjd.com.cn/2026/06/30/11836953.shtml、https://jobs.bytedance.com/experienced/culture、https://deploy.co/、https://openai.com/index/introducing-openai-deployment-company/、https://www.sec.gov/Archives/edgar/data/1341439/000119312526277521/orcl-20260531.htm、https://apnews.com/article/929986c149d415cd2ef4dc3eaf66ca8c、https://www.businessinsider.com/list-companies-replacing-human-employees-with-ai-layoffs-workforce-reductions

## 之后每日自动化应如何运行

1. 本地深度研究在 18:00 生成正式日报、专题证据和知识库回流。
2. GitHub Actions 只能兜底、审计、记录缺口，不能把兜底稿标为正式日报。
3. 每次自动提交前依次运行信息库审计、专题状态生成、知识库 lint 和公共链接检查。
4. 如果没有足够可信新增，首页显示缺口，不用低质量内容填充。
