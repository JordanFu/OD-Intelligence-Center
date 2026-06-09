const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

const quickReport = `# 2026-W23｜AI时代组织与人才机制变革｜快速导读版

> 周期：2026-06-01 ～ 2026-06-07
> 本版已于 2026-06-09 完成缺口修正：\`2026-06-02\`、\`2026-06-06\`、\`2026-06-07\` 已补跑为决策稿；\`2026-05-30\`、\`2026-05-31\` 已作为周末复盘型日报补齐，不再作为正式结论缺口处理。
> 详细决策版详见：\`2026-W23-detailed.md\`

## 本周一句话结论

AI 组织变革已经从“有没有 AI”转向“有没有正式的人机混合运行规则”：领先公司正在把权限、上下文、例外处理、审计记录和结果责任写进系统，这将同时重写扁平化、中层角色、高人才密度、岗位序列和晋升机制。

## CEO 必读五件事

- **扁平化真正要迁移的是协调劳动，不是简单减少管理者。** GitLab 的一手样本已经把减层、端到端小队，以及“评审、审批、交接”的智能体化放在同一组组织动作里。
- **管理者角色没有消失，而是被改写成“人机协作编排者、规则负责人和例外处理负责人”。** Microsoft、Workday、SAP 的共同信号都是这个方向。
- **高人才密度的硬标准已变成“结果负责、流程语境理解和治理意识”。** Zapier 在招聘里明确测这一点，BCG 说明很多员工已把更多时间花在“管理和指挥 AI”上。
- **岗位体系不宜先扩头衔，宜先做能力图谱和基于技能的岗位重设计。** Workday、华为、LinkedIn 都在往这个方向收敛。
- **晋升机制不该奖励 AI 使用量，而该奖励结果、流程重构、风险控制和复用资产。** 本周高置信证据支持“证据结构升级”，不支持“固定窗口马上消失”。

## 三个管理判断

- **本周最强判断**：组织竞争力开始取决于能否把“负责人、审批、例外覆盖、审计、回滚”这些字段标准化。
- **本周最值得试点的动作**：选一个跨部门流程，先跑通“协调劳动迁移 + 例外治理”。
- **本周最需要克制的冲动**：不要急着新建一堆 AI 序列，也不要把 AI 使用量变成晋升指标。

## 三个建议动作

1. 设立一个跨部门的人机混合运营模式负责人。
2. 发布“AI 熟练度 × 结果负责”招聘与内部认证评价量表 v0。
3. 启动晋升证据包 v2，把系统贡献显性化。

## 最大风险与最大机会

- **最大风险**：只学“减层、提效、多上工具”，不学运行规则、例外治理和证据流，最后会出现影子中层回潮、晋升公平争议和关键人才流失。
- **最大机会**：率先把组织升级为“有边界、有审计、有证据流的人机混合运营模式”，形成速度、质量和人才密度的复利。

## 本周来源主轴

- GitLab Act 2 与 8-K
- Microsoft WorkLab 与 Microsoft 官方博客
- Workday 运营模式与 Agent Passport
- SAP SuccessFactors、自主型企业与 academia 材料
- Zapier AI 熟练度评价量表
- BCG 2026-06-03 调研
- 华为 AI 人才发展能力图谱
- 内部知识库：\`digest.md\`、\`knowledge/wiki/\`、GitLab / Zapier / baseline 专题页
`;

const exactReplacements = new Map([
  ['默认运行规则写成正式接口: 谁拥有 workflow、谁能触发 agent、谁做 verification、谁保留 override、谁记录审计、谁对结果负责', '默认运行规则写成正式接口：谁拥有工作流、谁能触发智能体、谁做验证、谁保留例外覆盖权、谁记录审计、谁对结果负责'],
  ['reviews/approvals/handoffs 的 agent 化', '评审、审批、交接的智能体化'],
  ['deployment、partner enablement、technical architect、verification', '部署、伙伴赋能、技术架构和验证'],
  ['“accountability + process context + governance literacy”', '“结果负责、流程语境理解和治理意识”'],
  ['role flow、capability package 和 pay logic', '角色流、能力包和薪酬逻辑'],
  ['workflow owner / verifier / technical architect / FDE / agent governance owner', '工作流负责人、验证者、技术架构师、前线部署工程师（FDE）和智能体治理负责人'],
  ['人机混合 operating model', '人机混合运营模式'],
  ['总 owner', '总负责人'],
  ['owner / approve / override / audit / rollback', '负责人、审批、例外覆盖、审计、回滚'],
  ['AI fluency x accountability', 'AI 熟练度 × 结果负责'],
  ['rubric v0', '评价量表 v0'],
  ['override 质量', '例外覆盖质量'],
  ['有 owner、有审计、有验证、有证据流的人机混合 operating model', '有负责人、有审计、有验证、有证据流的人机混合运营模式'],
  ['headcount 动作', '人员规模动作'],
  ['build、deploy, contextualize, govern, observe, improve 系统', '建设、部署、语境化、治理、观测和持续改进系统'],
  ['adoption campaign', '采纳推广'],
  ['operating model', '运营模式'],
  ['deployment、verification、partner enablement、workflow ownership', '部署、验证、伙伴赋能和工作流负责'],
  ['AI adoption', 'AI 采纳'],
  ['accountability + process context + governance literacy', '结果负责、流程语境理解和治理意识'],
  ['title', '头衔'],
  ['capability map + role flow + authority boundary + pay logic', '能力图谱 + 角色流 + 权责边界 + 薪酬逻辑'],
  ['system contribution、manage AI、process context、skills governance', '系统贡献、管理 AI、流程语境理解和技能治理'],
  ['FDE / technical architect / verifier / partner-facing applied AI', '前线部署工程师（FDE）、技术架构师、验证者和面向伙伴的应用 AI 角色'],
  ['reviews/approvals/handoffs', '评审、审批、交接'],
  ['authority boundary / runtime governance / exception handling', '权责边界、运行时治理和例外处理'],
  ['player-coach / project owner / verifier', '队员兼教练型管理者、项目负责人和验证者'],
  ['process context', '流程语境理解'],
  ['governance literacy', '治理意识'],
  ['repeatable systems', '可复用系统'],
  ['Technical Architect', '技术架构师'],
  ['industry engineering team', '行业工程团队'],
  ['agent governance owner', '智能体治理负责人'],
  ['workflow owner', '工作流负责人'],
  ['runtime auditor', '运行审计者'],
  ['technical architect / verifier / AI delivery owner', '技术架构师、验证者和 AI 交付负责人'],
  ['eligibility criteria + sunset clause + audit mechanisms', '适用条件、退出条款和审计机制'],
  ['agent governance / workflow owner / verifier', '智能体治理、工作流负责人和验证者'],
  ['workflow owner / technical architect / verifier', '工作流负责人、技术架构师和验证者'],
  ['capability map 先行，序列后置', '能力图谱先行，序列后置'],
  ['AI fluency x accountability rubric', 'AI 熟练度 × 结果负责评价量表'],
  ['AI fluency', 'AI 熟练度'],
  ['rubric', '评价量表'],
  ['new hire', '新员工'],
  ['regular AI users', '经常使用 AI 的员工'],
  ['accountability', '结果负责'],
  ['deployment / verification / workflow ownership 明确化', '部署、验证和工作流责任明确化'],
  ['capability map、authority boundary 和 outcome metric', '能力图谱、权责边界和结果指标'],
  ['capability map + skills-based redesign + authority boundary', '能力图谱 + 基于技能的岗位重设计 + 权责边界'],
  ['capability map', '能力图谱'],
  ['skills-based role redesign', '基于技能的岗位重设计'],
  ['skills-based redesign', '基于技能的岗位重设计'],
  ['player-coach leader', '队员兼教练型负责人'],
  ['player-coach', '队员兼教练型管理者'],
  ['AI-native 小队', 'AI 原生小队'],
  ['handoff 次数', '交接次数'],
  ['AI-first 化', 'AI 优先化'],
  ['mindset、strategy、building、结果负责', '心智模式、战略理解、构建能力和结果负责'],
  ['human-智能体 运营模式 owner', '人机混合运营模式负责人'],
  ['skills governance owner', '技能治理负责人'],
  ['agent governance / workflow owner / runtime auditor / verifier', '智能体治理、工作流负责人、运行审计者和验证者'],
  ['deployment / verification / workflow owner', '部署、验证和工作流负责人'],
  ['正式接口**:', '正式接口**：'],
  ['谁拥有 工作流', '谁拥有工作流'],
  ['谁能触发 智能体', '谁能触发智能体'],
  ['谁做 验证', '谁做验证'],
  ['谁保留 例外覆盖', '谁保留例外覆盖权'],
  ['把 部署、伙伴赋能、技术架构和验证 做成', '把部署、伙伴赋能、技术架构和验证做成'],
  ['把 结果负责 写入', '把结果负责写入'],
  ['招聘 评价量表', '招聘评价量表'],
  ['把 流程语境理解 和能力图谱', '把流程语境理解和能力图谱'],
  ['从 头衔 转向', '从头衔转向'],
  ['没有，智能体 会', '没有，智能体会'],
  ['角色流 ownership', '角色流责任'],
  ['涉及明确 policy 的流程', '涉及明确制度规则的流程'],
  ['先做 负责人、approve、例外覆盖、审计、回滚', '先定义负责人、审批、例外覆盖、审计和回滚'],
  ['有 负责人、有审计', '有负责人、有审计'],
  ['流程 智能体化', '流程智能体化'],
  ['把 智能体 放进', '把智能体放进'],
  ['单纯 人员规模动作', '单纯的人员规模动作'],
  ['从 采纳推广 拉回 运营模式', '从采纳推广拉回运营模式'],
  ['而是 部署、验证、伙伴赋能和工作流负责 这类', '而是部署、验证、伙伴赋能和工作流负责这类'],
  ['新 头衔', '新头衔'],
  ['头衔 inflation', '头衔膨胀'],
  ['build、context、govern、observe、improve 系统', '建设、语境化、治理、观测和持续改进系统'],
  ['`Redesign first`', '“先重设计”'],
  ['outcome 和治理质量', '结果和治理质量'],
  ['Oracle 校准 workspace', 'Oracle 校准工作台'],
  ['promotion document / 校准', '晋升文档与校准'],
  ['promotion/transfers 内部基线', '晋升与调动内部基线'],
  ['skills 治理、管理者 action、工作流 evidence', '技能治理、管理者行动和工作流证据'],
  ['部署、partner enablement、验证', '部署、伙伴赋能和验证'],
  ['AI 公司开始把 部署', 'AI 公司开始把部署'],
  ['工作流 重写', '工作流重写'],
  ['管理者赋能 将', '管理者赋能将'],
  ['human-agent operating model', '人机混合运营模式'],
  ['manager orchestration', '管理者编排'],
  ['agent passport', '智能体护照'],
  ['override frequency', '例外覆盖频率'],
  ['workflow telemetry', '工作流遥测'],
  ['workflow telemetry 的正式边界设计', '工作流遥测的正式边界设计'],
  ['manager span', '管理跨度'],
  ['manager enablement', '管理者赋能'],
  ['early-career', '早期职业阶段'],
  ['role-ready', '角色就绪'],
  ['enablement 不均', '赋能不均'],
  ['applied AI engineer', '应用 AI 工程师'],
  ['role package', '角色包'],
  ['role-flow', '角色流'],
  ['job family', '岗位族群'],
  ['pay band', '薪酬带宽'],
  ['skill premium', '技能溢价'],
  ['market premium', '市场溢价'],
  ['outcome metrics', '结果指标'],
  ['decision quality', '决策质量'],
  ['employee trust', '员工信任'],
  ['calibration', '校准'],
  ['business justification', '业务理由'],
  ['internal mobility', '内部流动'],
  ['verified skills', '已验证技能'],
  ['career evidence', '职业证据'],
  ['outcome-based metrics', '基于结果的指标'],
]);

const tokenReplacements = [
  [/\bmanager\b/g, '管理者'],
  [/\borchestrator\b/g, '编排者'],
  [/\brule owner\b/g, '规则负责人'],
  [/\bowner\b/g, '负责人'],
  [/\boverride\b/g, '例外覆盖'],
  [/\baudit\b/g, '审计'],
  [/\brollback\b/g, '回滚'],
  [/\bverification\b/g, '验证'],
  [/\bdeployment\b/g, '部署'],
  [/\bworkflow\b/g, '工作流'],
  [/\bagent\b/g, '智能体'],
  [/\bagents\b/g, '智能体'],
  [/\bgovernance\b/g, '治理'],
  [/\bContext\b/g, '背景材料'],
];

function protectUrls(text) {
  const urls = [];
  return {
    text: text.replace(/https?:\/\/[^\s)]+/g, match => {
      const key = `__URL_${urls.length}__`;
      urls.push(match);
      return key;
    }),
    restore(next) {
      return next.replace(/__URL_(\d+)__/g, (_, index) => urls[Number(index)]);
    },
  };
}

function normalizeText(text) {
  const protectedText = protectUrls(text);
  let next = protectedText.text;
  for (const [from, to] of exactReplacements) {
    next = next.split(from).join(to);
  }
  for (const [pattern, to] of tokenReplacements) {
    next = next.replace(pattern, to);
  }
  next = next
    .replace(/AI\s+熟练度/g, 'AI 熟练度')
    .replace(/AI\s+采纳/g, 'AI 采纳')
    .replace(/智能体\s+化/g, '智能体化')
    .replace(/人机\s+混合/g, '人机混合')
    .replace(/岗位族群\s+膨胀/g, '岗位族群膨胀')
    .replace(/头衔\s+膨胀/g, '头衔膨胀')
    .replace(/负责人\s+化/g, '负责人化')
    .replace(/首席执行官\/COO/g, 'CEO / COO');
  return protectedText.restore(next);
}

function write(file, content) {
  const fullPath = path.join(root, file);
  fs.writeFileSync(fullPath, content);
}

function normalizeFile(file) {
  const fullPath = path.join(root, file);
  const original = fs.readFileSync(fullPath, 'utf8');
  fs.writeFileSync(fullPath, normalizeText(original));
}

write('specials/ai-org-talent-mechanism/weekly/2026-W23-quick.md', quickReport);
write('specials/ai-org-talent-mechanism/weekly/latest-quick.md', quickReport);

[
  'specials/ai-org-talent-mechanism/weekly/2026-W23.md',
  'specials/ai-org-talent-mechanism/weekly/2026-W23-detailed.md',
  'specials/ai-org-talent-mechanism/weekly/latest.md',
  'specials/ai-org-talent-mechanism/weekly/latest-detailed.md',
].forEach(normalizeFile);

console.log('Normalized visible OD weekly reports with Chinese-first wording.');
