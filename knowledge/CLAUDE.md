# Knowledge Base Schema

> Karpathy LLM Wiki 模式 — 适配 AI 组织设计研究课题
> 最后更新: 2026-04-27

## 三层架构

### 1. Raw（原始资料）— `knowledge/raw/`
- 存放原始 PDF、图片、数据文件
- **不可变**：LLM 只读不写
- 命名规范：`{来源}-{日期}-{简短标题}.{ext}`

### 2. Wiki（LLM 维护的 markdown）— `knowledge/wiki/`
- 摘要页、实体页、概念页、对比页、综合结论
- LLM 完全拥有：创建、更新、维护交叉引用
- 人类只读，LLM 只写

#### Wiki 子目录
- `wiki/` — 来源摘要页（每个原始资料一份）
- `entities/` — 实体页（公司、人物、产品）
- `concepts/` — 概念页（理论、框架、模型）
- `comparisons/` — 对比分析页

### 3. Schema（本文件）— `knowledge/CLAUDE.md`
- 告诉 LLM wiki 结构、约定、工作流
- 人类和 LLM 共同演化

## Wiki 页面格式

### 来源摘要页（wiki/）
```markdown
---
title: 报告标题
source: 来源机构
authors: 作者列表
date: 发布日期
ingested: 归档日期
sourceFile: ../raw/文件名.pdf
tags: [标签列表]
concepts: [关联概念链接]
entities: [关联实体链接]
related: [相关摘要链接]
---

# 标题

## 核心论点
...

## 关键框架
...

## 案例研究
...

## OD 启示
...

## 与已有知识的关联
...
```

### 实体页（entities/）
```markdown
---
type: company | person | product
name: 名称
---
```

### 概念页（concepts/）
```markdown
---
type: framework | theory | model | metric
name: 概念名称
---
```

## 三大操作

### Ingest（摄入）
1. 将原始文件放入 `raw/`
2. LLM 读取并生成摘要页到 `wiki/`
3. 提取实体 → 创建/更新 `entities/`
4. 提取概念 → 创建/更新 `concepts/`
5. 更新 `index.md` 和 `log.md`
6. 检查并更新已有页面的交叉引用

### Query（查询）
1. LLM 先读 `index.md` 定位相关页面
2. 深入阅读相关 wiki 页面
3. 综合回答，附带引用
4. 好的分析结果可回存为新 wiki 页面

### Lint（健康检查）
定期检查：
- 页面间矛盾
- 过时声明
- 孤立页面（无入链）
- 缺失的交叉引用
- 缺少独立页面的提及概念

## 导航文件
- `index.md` — 内容目录，每个页面带链接和一行摘要
- `log.md` — 追加式操作日志，格式：`## [YYYY-MM-DD] ingest | 标题`

## 课题标签体系
- AI组织设计、人才发展、绩效管理、变革管理、组织文化、战略规划、数字化转型、领导力
- 来源类型：consulting（咨询）、academic（学术）、industry（行业）、media（媒体）、internal（内部）
