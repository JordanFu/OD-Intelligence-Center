# 2026-W31 AI 组织与人才机制补跑实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 补齐 2026-07-27 至 2026-08-02 的七日日报、四专题报告和 2026-W31 CEO 聚合周报，并发布到 OD Intelligence Center。

**Architecture:** 三个只读研究代理并行形成日报/内部知识、四课题复盘、外部证据与反例底稿；CEO 视角主代理统一处理时间边界、证据分层和事实—判断—行动转换，独占文件写入与页面集成。所有正式材料只使用截至对应日期已公开的证据，事后材料只能作为校验并显式标注。

**Tech Stack:** Markdown、现有 Node.js 渲染/质量脚本、Git、OD Content Quality Standard。

---

### Task 1: 建立 W31 证据账本

**Files:**
- Read: `digest.md`, `daily/`, `daily-report/`, `knowledge/`, `specials/`, `AI时代的职级变革-全球大公司组织架构调整追踪.md`
- Create: `/tmp/automation-2-w31-evidence-ledger.md`

- [ ] 核对 2026-07-27 至 2026-08-02 的现有内部材料、发布时间、来源类型和可用日期。
- [ ] 并行检索官方/一手、权威媒体、咨询研究、招聘薪酬和社媒弱信号。
- [ ] 每条证据记录标题、主体、事件日期、发布日期、URL、来源层级、支持/反驳的课题和是否可进入正式结论。
- [ ] 对一手材料与关键数字打开原文复核；无法复核的材料降为 L1/Context。

### Task 2: 补齐七日日报与四专题报告

**Files:**
- Create: `specials/ai-org-talent-mechanism/2026-07-27/` through `2026-08-02/`
- Create per day: `00-overview.md`, `01-flat-organization.md`, `02-talent-density.md`, `03-job-family-career-architecture.md`, `04-promotion-system.md`
- Create per day: matching five HTML files and `index.html`

- [ ] 按日期分配证据，只使用当日及此前已公开材料；没有高置信新增事实的日期明确写“无足够新增证据”，不重复包装旧闻。
- [ ] 每份日报包含一句话判断、事实、机制解释、L0-L4、行动含义、Context、反例、待验证问题和来源索引。
- [ ] 每日总览提供判断图、三句话收束、管理层问题和不要误读。
- [ ] 运行 `node scripts/render-special-html.js <date-dir>` 生成五个 HTML，并按历史模板创建当日 `index.html`。

### Task 3: 生成 2026-W31 CEO 聚合周报

**Files:**
- Create: `specials/ai-org-talent-mechanism/weekly/2026-W31.md`
- Create: `specials/ai-org-talent-mechanism/weekly/2026-W31-quick.md`
- Create: `specials/ai-org-talent-mechanism/weekly/2026-W31-detailed.md`
- Create: matching HTML pages
- Modify: `specials/ai-org-talent-mechanism/weekly/latest*.md`, `latest*.html`, `weekly/index.html`, root `index.html`

- [ ] 按 15 段 CEO 结构聚合七日日报，最高置信结论不超过七条，并标注增强/削弱/修正。
- [ ] 输出立即决策、授权试点、继续观察，以及 1-3 个含目标、范围、周期、owner、指标和风险控制的试点。
- [ ] 对国内、海外、AI 原生、传统企业案例还原时间线、机制、结果、争议和不可照搬点。
- [ ] 生成快速版、详细版、canonical 和 latest 别名，更新周报与专题入口，所有入口指向 HTML。

### Task 4: 质量校验与发布

**Files:**
- Verify: all Task 2-3 outputs and repository state
- Modify: automation memory after successful verification

- [ ] 运行结构检查：七天各 5 份 Markdown/HTML、7 个 index、W31 三版 Markdown/HTML、latest 三版。
- [ ] 运行 `node scripts/quality-gate-ai-org-reports.js`、`node scripts/test-site-editions.js`、`node scripts/check-public-links.js`、`git diff --check`，并修复所有失败。
- [ ] 核对关键来源链接、日期、数字、公司归类和 L0-L4 分层；单点传闻不得进入强结论。
- [ ] 运行 `./sync.sh` 提交并推送，再验证 Git 状态、远端对齐和公开 HTML 页面可访问。
- [ ] 将本次补跑范围、证据窗口、产物、验证和提交信息写入 `/Users/tal/.codex/automations/automation-2/memory.md`。

