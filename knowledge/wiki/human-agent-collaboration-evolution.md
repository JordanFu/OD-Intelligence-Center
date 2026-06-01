---
title: 人机协作演进框架：Author、Editor、Director、Orchestrator
source: Microsoft WorkLab / Obsidian synthesis
date: 2026-06-01
ingested: 2026-06-01
tags: [人机协作, Agent, AI组织设计, 工作重构, 软件工程]
related:
  - ./microsoft-ai-at-work-function-playbook-2026.md
  - ./pdf-source-microsoft-2026-work-trend-index.md
  - ./pdf-source-anthropic-anthropic-2026-agentic-coding-trends-report.md
---

# 人机协作演进框架：Author、Editor、Director、Orchestrator

## 一句话判断

人机协作的关键变化不是“AI 能做更多”，而是人类签核的最小工作单元变大：从一行代码，到一个功能、一个任务，再到整个 backlog。

## 四阶框架

| 阶段 | AI 角色 | 人类核心责任 | 人类签核单元 |
|---|---|---|---|
| Author | 智能补全与建议 | 亲自创造，采纳或拒绝建议 | 单行、函数、片段 |
| Editor | 草稿生成器 | 评估、修改、决定是否发布 | 完整功能或文档 |
| Director | 自主执行者 | 设定意图、约束、质量门槛 | 任务、PR、项目切片 |
| Orchestrator | 多 Agent 系统 | 设计系统、分配工作、处理异常 | backlog、工作流、组合结果 |

## 判断标准

这不是线性成熟度模型，而是工作诊断地图。某项工作能进入 Director 或 Orchestrator，取决于三件事：

- “什么是好结果”是否能被清晰定义。
- 是否存在 Agent 可自动读取的输入、规则和反馈信号。
- 人类是否可以从过程签核转向结果签核，而不显著放大风险。

软件工程先进入高阶模式，是因为编译、测试、静态分析、CI/CD 等反馈信号足够明确。法务、财务、HR、营销等职能如果要复制这种演进，需要先建设自己的质量标准、结构化输入和自动反馈回路。

## 对组织的含义

- 职位价值会从产出量转向判断力、护栏设计、异常处理和跨职能协调。
- 经理与高级 IC 的边界会变得更模糊，因为“编排工作”会成为高阶专业能力。
- 绩效系统需要识别人类贡献与 Agent 产出之间的归属关系。
- 人才培养不能只教工具使用，而要训练任务分解、验收标准、风险判断和系统编排。

## 风险边界

高阶协作模式并不适合所有工作。标准不清、反馈滞后、价值判断高度依赖人类经验的工作，仍需要 Author 或 Editor 模式。过早让 Agent 自主执行，会把模糊目标转化为高速错误。
