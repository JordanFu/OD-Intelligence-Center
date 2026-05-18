# 知识库操作日志

> 追加式记录 · 格式：## [YYYY-MM-DD] 操作类型 | 标题

---

## [2026-05-18] migrate | 标杆研究更新报告迁入知识库
- 从工作日报模块迁入 `daily-report/2026-05-08-benchmark-update.md`，新增知识库页面 `wiki/benchmark-ai-org-design-update-2026-05-08.md`。
- 该报告作为“AI 如何重塑组织设计”的周度知识沉淀样例，后续按周更新到知识库，而不是放在首页工作日报模块展示。
- 页面端保留每日工作日报 Markdown 作为追溯档案，但不再把工作日报作为一级功能模块。

## [2026-05-13] ingest | 知音楼 HR 知识库十主题整理
- 基于知音楼 LoreBase 全量目录元数据，将 331 个节点、234 份 PDF 拆成 10 个主题切片。
- 主题包括 AI+HR 与智能体、薪酬福利与激励、组织与人才发展、领导力、出海 HR、劳动法、咨询白皮书、推荐书籍、行业背景、学习工具。
- 新增主题导航页 `wiki/zhiyinlou-hr-thematic-index-2026-05-13.md`，用于页面端快速查看“先读哪里、为什么读、读完沉淀成什么”。
- 当前只发布来源题名、目录路径、主题判断和精读优先级；不发布 PDF 原文、下载链接、账号、Cookie 或 Token。

## [2026-05-13] ingest | 知音楼 PDF 附件全量枚举与临时解析
- 按 `https://s.tal.com/a/lXaUte` 短链边界重新递归枚举知音楼文件夹，而不是只读取页面目录。
- 确认 `人力资源行业洞察 2024` 中共有 11 份 PDF 附件，已下载到临时解析区作为知识源。
- 其中 10 份 PDF 已可提取文本，`中国人才发展现代化指数2024.pdf` 文本提取不足，需 OCR 或人工复核。
- 更新知识库页面为 PDF 知识源地图，不公开 PDF 原文、访问令牌、账号或协作者信息。

## [2026-05-13] ingest | 知音楼《人力资源行业洞察 2024》目录同步
- 通过用户授权的知音楼会话读取 `https://s.tal.com/a/lXaUte` 对应的石墨文件夹。
- 确认根目录为 `人力资源知识库`，可见子目录包含 `yach_knowledge_folder_1721107726`，可见文档为 `人力资源行业洞察 2024`。
- 从在线文档读取到 10 个 HR 行业资料入口，包括 DDI 人才管理、怡安医疗趋势、美世招聘洞察、上市公司人效、弹性福利、人才发展指数、腾讯全域经营组织与人才洞察等。
- 仅同步目录、分类判断和研究价值；不发布附件 PDF 原文、不暴露内部会话信息。

## [2026-05-13] ingest | Obsidian 首批导入 + 知音楼入口建档 + LLM Wiki 运维规则
- 读取本地 `/Users/tal/Documents/Obsidian Vault`，识别 43 篇 Markdown。
- 首批导入 LLM Wiki、AI 原生工程组织、技能为本组织、百度职级改革、亚马逊 Builder 与百度对比。
- 验证知音楼短链 `https://s.tal.com/a/lXaUte`，已定位石墨文件夹入口，但静态抓取只能读到 JS 容器，待登录态或导出文件后批量摄入。
- 将 Karpathy LLM Wiki 方法论固化为 OD 情报中心知识库运维规则。

## [2026-04-27] ingest | BCG: Design Your Company for AI, Not AI for Your Company
- 来源：BCG, 2026-04-23
- 文件：raw/bcg-2026-04-design-your-company-for-ai.pdf
- 摘要页：wiki/bcg-2026-04-design-company-for-ai.md
- 提取概念：AI-First运营模型、能力-判断评估矩阵、端到端旅程重设计
- 交叉引用：关联 BCG 2026-02 劳动力转型报告、McKinsey 2026 组织报告
- 同时完成：知识库按 Karpathy LLM Wiki 三层架构重构（raw/wiki/schema）
