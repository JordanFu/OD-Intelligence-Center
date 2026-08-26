---
title: 从“有模型”到“有产品”：Tibo 的研究—产品组织机制
date: 2026-08-26
source_type: interview-synthesis
topics: [AI组织设计, 组织文化, 变革管理, 领导力, 数字化转型]
entities: [Thibault Sottiaux, OpenAI, Google DeepMind, Google]
evidence_level: L3
status: 已核验
related: [../concepts/capability-to-product-conversion-loop.md, ../entities/openai.md, ../entities/google-deepmind.md, ../entities/thibault-sottiaux.md]
analysis: ../../analysis/tibo-research-product-org-mechanism-2026-08-26.md
---

# 从“有模型”到“有产品”：Tibo 的研究—产品组织机制

## 一句话判断

AI 竞争的组织分水岭，是能否建立“能力发现—产品化—真实使用—反馈回流—资源再配置”的短闭环，而不只是更早拥有模型或 demo。

## 核心内容

Thibault “Tibo” Sottiaux 在 2025–2026 年多次公开访谈中持续主张：

- 研究、模型、产品界面和用户反馈应共同演化。
- 团队需要端到端责任、直接 dogfood 和较低的跨部门摩擦。
- 新产品应先向容错度较高的用户小步发布，再随可靠性扩大。
- 快速发布必须受简洁、性能、质量、安全和可监督性约束。
- 组织要能让新能力冲击旧产品，并依据证据撤并方向、重新配置人和算力。

他对 DeepMind 的个人观察是：团队较早已有 LM Chat 原型，但当时组织“not set up to ship product”，并受到可能冲击 Google 既有业务的约束。该说法属于强一手观察，但完整决策动机尚未被独立核验。

## 证据化判断

### Fact

- DeepMind 在 2021–2022 年已有 Gopher、Sparrow 等语言模型和对话代理研究；Sparrow 仍存在规则违反和不可靠回答。
- OpenAI 的 Codex 经历 research preview、真实反馈与可靠性提升后再 GA。
- Tibo 曾披露内部终端原型 “10x” 因完成度不足未直接发布。
- OpenAI 后来停止或撤并部分独立产品，将人员与算力投入核心方向。
- Tibo 公开称 Codex 团队的新瓶颈已转向帮助与监督输出。

### Judgment

- DeepMind 的历史问题不能只归因于“害怕”，而应同时考虑产品化架构、既有业务资源配置和真实安全/责任门槛。
- OpenAI 的“低 stop energy”不是没有治理，而是把治理转化为风险分级、发布梯度、日志、权限、人工复核与例外升级。
- AI 降低执行成本后，判断、对齐、审查和恢复成为新的组织瓶颈。
- Tibo 的组织主张具有跨访谈一致性；但 OpenAI 的文化能否在更大规模和高风险业务中持续，仍是开放问题。

### Action meaning

- 研究与产品对同一用户任务共享结果，而不是一次性交接。
- 为内部、技术预览、广泛可用和高风险使用设置不同发布门槛。
- 在护栏内下放可逆决策，对不可逆事项保留清晰升级权。
- 组合管理同时奖励放大有效方向和尽快停止低价值方向。
- manager 与高级 IC 的评价转向意图、判断、审查、可靠性和跨边界影响。
- 同步建设评测、review、回滚、事故学习与上下文基础设施。

## 为什么值得关注

这组材料把“创新文化”翻译成了可观察的组织机制：共享问责、用户反馈回路、决策权分层、资源再配置、管理角色和绩效证据。它也纠正了两个常见误区：有 demo 不等于有产品；低审批不等于低治理。

## 证据等级

- Tibo 管理哲学的跨时间一致性：L3。
- Codex 发布梯度及 DeepMind 公开研究状态：L2–L3。
- Tibo 对本人所在 DeepMind 团队的经历：L2。
- Google 高层阻止 LM Chat 的具体动机：L1–L2，待第二位直接参与者或决策记录核验。
- OpenAI 文化的长期可扩展性：L1，属于待观察问题。

## 主要来源

- [Matthew Berman 访谈（2026-08）](https://www.youtube.com/watch?v=4qjEgPojjzM)
- [WIRED 访谈（2026-06）](https://www.wired.com/story/model-behavior-interview-with-openai-codex-lead-tibo-sottiaux/)
- [OpenAI Podcast（2025-09）](https://www.youtube.com/watch?v=OXOypK7_90c)
- [Dev Interrupted（2026-01）](https://linearb.io/dev-interrupted/podcast/openai-codex-thibault-sottiaux-agentic-autonomy)
- [Every / AI & I（2026-02）](https://every.to/podcast/how-openai-s-codex-team-uses-their-coding-agent)
- [TechCrunch 访谈（2026-08）](https://techcrunch.com/2026/08/25/the-world-seems-to-be-ready-an-interview-with-openai-head-of-product-thibault-sottiaux/)
- [DeepMind：Sparrow](https://deepmind.google/blog/building-safer-dialogue-agents/)
- [OpenAI：Introducing Codex](https://openai.com/index/introducing-codex/)
- [O’Reilly & Tushman：Organizational Ambidexterity](https://journals.aom.org/doi/10.5465/amp.2013.0025)
- [Christensen & Bower：资源配置与领先企业失败](https://onlinelibrary.wiley.com/doi/10.1002/%28SICI%291097-0266%28199603%2917%3A3%3C197%3A%3AAID-SMJ804%3E3.0.CO%3B2-U)

## 完整报告

[阅读深度研究](../../analysis/tibo-research-product-org-mechanism-2026-08-26.md)
