# Phase 4 知识库复利系统交接

## 本阶段目标

把 Phase 2 信息库与 Phase 3 四专题账本中的高价值判断，回流到 `knowledge/` 的实体页、概念页、导航索引和 catalog，让知识库从资料目录变成可追溯的研究导航。

## 本阶段新增

### 实体页

- `knowledge/entities/openai.md`
- `knowledge/entities/anthropic.md`
- `knowledge/entities/aws-amazon.md`
- `knowledge/entities/cursor.md`
- `knowledge/entities/bytedance.md`
- `knowledge/entities/oracle.md`
- `knowledge/entities/gitlab.md`
- `knowledge/entities/microsoft.md`

### 概念页

- `knowledge/concepts/fde-applied-ai.md`
- `knowledge/concepts/ai-workforce-risk.md`
- `knowledge/concepts/auditable-promotion-evidence.md`

## 已更新

- `knowledge/index.md`：新增实体页导航和 3 个概念页入口。
- `knowledge/catalog.json`：只追加本次 11 个新增条目，不删除历史条目。
- `knowledge/log.md`：顶部追加 Phase 4 操作记录。

## 证据使用边界

- 使用最近 7 个信息日中的 digest 条目。
- 使用 Phase 3 四专题账本与对应 formal 总览路径作为专题锚点。
- 未读取 PDF 原文。
- 未修改 `digest.md`、`daily/`、`daily-report/`、`index.html` 或 Phase 3 专题账本。

## 证据较强的回流

- FDE / Applied AI：OpenAI、AWS / Amazon、Anthropic、Cursor 共同构成组织接口收敛证据。
- AI workforce risk：Oracle 与 RAISE US 线索支持“效率、技能供给、知识保留、士气和外部转型”必须一起看。
- 可审计晋升证据：GitLab、OpenAI Codex、ByteDance 管理评价语言共同支持“AI 贡献要进入可复核证据包，而不是工具使用率”。

## 仍不足的部分

- ByteDance：公开证据只能支持管理评价语言靠近绩效场景，不能证明绩效档位、晋升规则或奖金机制已改变。
- Microsoft：本阶段未读取报告原文，只作为人机协作和 manager role 的背景实体，暂不形成公司自身组织改革强结论。
- Cursor：可支持 FDE 管理化观察，但不能证明成熟职业体系、薪酬带宽或晋升路径。

## 后续建议

- Phase 4.1 可补 `AI fluency` 与 `责任包 / 任务封装` 两个概念页。
- 若后续要纳入 BCG / McKinsey / Tencent，建议先明确它们分别作为“咨询来源页”“方法论概念页”还是“公司实体页”，避免实体页空泛化。
