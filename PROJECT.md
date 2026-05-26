# AI 组织设计研究 · 项目说明

> 本文件是 AI 组织设计研究项目的完整介绍，用于迁移、交接和日常参考。

---

## 📌 项目概述

**项目名称**：AI 组织设计研究 · 看板（OD Intelligence Center）

**核心目标**：追踪 AI 如何改变组织设计，包括：
- AI 对团队结构的影响
- 职级体系与岗位族群改革
- 大厂（百度/字节/阿里/腾讯/华为）组织变革动态
- AI Agent 工作流对组织的冲击
- OD 方法论在 AI 时代的演进

**研究视角**：组织发展（OD）视角，关注"人"和"组织"在 AI 转型中的变化。

---

## 🏗️ 项目结构

```
ai-org-research/
├── README.md              ← 本文件（项目概览）
├── digest.md              ← 每日搜集信息汇总（自动化更新）
├── index.html            ← 主页面（可搜索的信息看板）
├── report-viewer.html    ← 报告查看器
│
├── daily/                ← 每日原始信息（自动化追加）
│   └── YYYY-MM-DD.md     ← 每日搜集的原始条目
│
├── daily-report/          ← 每日工作日报（自动化生成）
│   ├── YYYY-MM-DD.md     ← 每日结构化日报
│   └── weekly-YYYY-WXX.md ← 周报
│
├── analysis/             ← 深度分析报告
│   └── *.md / *.html     ← 专题分析
│
├── specials/             ← 专题追踪
│   ├── job-levels/       ← 职级变革专项
│   └── ai-org-talent-mechanism/  ← AI组织与人才机制
│
├── knowledge/            ← 知识库（Karpathy LLM Wiki 模式）
│   ├── CLAUDE.md         ← 知识库规范
│   ├── catalog.json      ← 内容索引
│   ├── index.md          ← 页面目录
│   ├── log.md            ← 操作日志
│   ├── raw/              ← 原始文件（PDF/图片）
│   ├── wiki/             ← 摘要页
│   ├── entities/         ← 实体页（公司/人物/产品）
│   ├── concepts/         ← 概念页（框架/理论/模型）
│   ├── comparisons/      ← 对比分析
│   └── summaries/        ← 综合报告
│
├── scripts/              ← 工具脚本
│   └── *.sh              ← 同步、部署脚本
│
└── .git/                 ← Git 仓库
```

---

## 🔄 自动化工作流

### 运营责任边界（2026-05-26 更新）

首页「信息库」由 `digest.md` 驱动，历史上主要由 WorkBuddy 本地自动化写入并通过 `sync.sh` 生成 `auto-sync` 提交。后续情报中心的稳定运营、信息质量、证据交付和页面发布由 Codex 负责；WorkBuddy 仅作为基础文档与知识管理工具，写入内容视为候选素材，需要经过 Codex 抽检、去重、补源和质量校准。

详细交接说明见 `operations/intelligence-library-ownership.md`；状态检查由 `scripts/audit-info-library.js` 生成 `operations/info-library-status.md`。

### 每日任务（8:00-8:35 并行执行）

| 时间 | 任务 | Skill | 数据来源 |
|------|------|-------|----------|
| 8:05 | 国际媒体搜集 | `ai-org-intel-global` | Hacker News / TechCrunch / The Verge |
| 8:15 | 国内媒体搜集 | `ai-org-intel-china` | 36氪 / 机器之心 / 虎嗅 / 界面 |
| 8:25 | 咨询学术搜集 | `ai-org-intel-consulting` | McKinsey / BCG / Deloitte / HBR |
| 8:35 | 社交搜索搜集 | `ai-org-intel-social` | Web搜索（知乎/Reddit等）|

### 日报生成（17:00）

| 任务 | Skill | 输出 |
|------|-------|------|
| 每日工作日报 | `ai-4` (ai-org-daily-report) | `daily-report/YYYY-MM-DD.md` |

### 同步与部署

| 频率 | 任务 | 说明 |
|------|------|------|
| 每小时 | 自动同步 | `sync.sh` 推送到 GitHub |
| 每2小时 | 自动部署 | Vercel 自动部署 |

---

## 📊 情报搜集 Skill

### 1. ai-org-intel-global（国际媒体）

**数据来源**：
- Hacker News（技术社区热点）
- TechCrunch（创业/科技动态）
- The Verge（科技评论）

**价值定位**：硅谷视角 / 工程师声音 / 技术前沿

---

### 2. ai-org-intel-china（国内媒体）

**数据来源**：
- 36氪 AI频道（科技创投）
- 机器之心（AI技术社区）
- 虎嗅（商业分析）
- 界面新闻（商业报道）

**价值定位**：国内大厂动态 / 商业落地 / 政策解读

---

### 3. ai-org-intel-consulting（咨询/学术）

**数据来源**：
- McKinsey People & Org
- BCG People & Org
- Deloitte AI Institute
- Harvard Business Review

**价值定位**：权威框架 / 方法论 / 趋势预测 / 引用背书

---

### 4. ai-org-intel-social（社交/搜索）

**数据来源**：
- Web搜索（知乎 / Reddit / Twitter / LinkedIn）
- 小红书（舆情）
- 搜索引擎热点

**价值定位**：从业者视角 / 舆情情绪 / 热点讨论

---

## 📝 日报格式

每日工作日报包含以下模块：

```markdown
# AI 组织设计研究 · 每日工作日报
## YYYY-MM-DD

### 一、数据概览
- 新增条目数
- 覆盖来源平台
- 来源可信度分布（⭐高 / 📰较高 / 💬参考）
- 涉及研究方向标签

### 二、来源覆盖情况
| 来源平台 | 条目数 | 可信度分布 |

### 三、重点推荐（⭐高可信度 + 高OD启示价值）
- 标题 + 来源 + 链接
- 一句话推荐理由

### 四、趋势观察
- 2-3 条趋势洞察

### 五、明日关注方向
- 2-3 个待追踪方向

---
*由 Javis 自动生成 · YYYY-MM-DD HH:MM*
```

---

## 🌐 在线访问

| 平台 | 链接 |
|------|------|
| **GitHub Pages** | https://jordanfu.github.io/OD-Intelligence-Center/ |
| **Vercel** | （自动化部署）|

---

## 🛠️ 常用命令

```bash
# 进入项目目录
cd /Users/tal/WorkBuddy/Claw/.workbuddy/ai-org-research

# 本地预览
python3 -m http.server 8080
# 或
npx serve .

# 手动同步到 GitHub
bash sync.sh

# 查看今日搜集记录
cat daily/YYYY-MM-DD.md

# 查看今日日报
cat daily-report/YYYY-MM-DD.md
```

---

## 🔧 迁移 Checklist

如果需要迁移到新环境，确保以下内容：

### 1. 核心文件
- [ ] `ai-org-research/` 目录完整
- [ ] `.git/` 仓库配置正确
- [ ] `sync.sh` 可执行权限

### 2. 自动化任务
- [ ] 4 个信息搜集自动化已配置（WorkBuddy）
- [ ] 日报生成自动化已配置
- [ ] 同步/部署自动化已配置

### 3. Skill 配置
- [ ] `ai-org-intel-global` skill 已安装
- [ ] `ai-org-intel-china` skill 已安装
- [ ] `ai-org-intel-consulting` skill 已安装
- [ ] `ai-org-intel-social` skill 已安装

### 4. 依赖项
- [ ] Git 配置正确（remote/origin）
- [ ] Vercel 部署已连接
- [ ] WorkBuddy 自动化服务运行正常

---

## 📋 标签体系

研究方向的标签分类：

| 标签 | 说明 |
|------|------|
| #AI-Agent | AI Agent 相关 |
| #组织身份 | 身份认同变化 |
| #知识工作 | 知识工作者变化 |
| #职级体系 | 职级/岗位改革 |
| #管理幅度 | 管理层级压缩 |
| #AI人才 | AI 人才趋势 |
| #组织重构 | 组织架构调整 |
| #平台化 | 平台型组织 |

---

## ⚠️ 已知问题

1. **MCP 服务不可用**：小红书 MCP 自 2026-04-29 起不可用（cookie 过期），当前基于历史趋势推演
2. **部分自动化过期**：ai-v3 已暂停，ai-5 与 ai-4 重复，建议清理

---

## 📞 维护记录

| 日期 | 更新内容 |
|------|----------|
| 2026-05-18 | 创建项目说明文档，整理情报搜集 Skill 体系 |

---

*最后更新：2026-05-18*
