const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const project = path.join(root, 'specials', 'ai-org-talent-mechanism');
const formatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Shanghai',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});
const today = process.env.REPORT_DATE || formatter.format(new Date());
const strict = process.env.STRICT_DECISION_REPORT === '1';

const requiredSections = [
  '读者应该带走什么',
  '今日一句话',
  '核心判断',
  '背景材料',
  'Context',
  '线索',
  '证据地图',
  '来源索引',
];

const qualitySignals = [
  { name: '一手/准一手证据', pattern: /(官方|一手|SEC|IR|年报|招聘页|制度|公告|原文|press release|handbook)/i },
  { name: '反例或冲突信息', pattern: /(反例|冲突|风险|不能直接照搬|争议|不足以下结论|暂不形成结论)/ },
  { name: '薪酬/JD/激励信号', pattern: /(薪酬|总包|奖金|股权|长期激励|JD|招聘|salary|compensation|pay band|skill premium|市场溢价|稀缺系数)/i },
  { name: '落地启发', pattern: /(落地启发|待补齐的落地问题|对我们的启发|行动启发|机制设计|可落地)/ },
  { name: '决策感', pattern: /(管理层该问|不要误读|管理含义|今天真正有价值)/ },
  { name: '可追溯来源', pattern: /https?:\/\/|knowledge\/|daily\/|specials\// },
];

function read(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
}

function countExternalLinks(text) {
  return (text.match(/https?:\/\/[^\s)]+/g) || []).length;
}

function auditFile(file) {
  const text = read(file);
  const issues = [];
  if (!text.trim()) {
    return { file, status: 'fail', issues: ['文件不存在或为空'] };
  }

  const isFallback = /云端兜底|最低可用|非决策稿|待增强|研究状态记录/.test(text);
  if (isFallback) {
    return {
      file,
      status: 'fail',
      issues: ['非决策稿/兜底稿不能通过日报质量门禁，必须正式重跑后才能作为情报更新展示'],
    };
  }

  for (const section of requiredSections) {
    if (!text.includes(section)) issues.push(`缺少结构模块：${section}`);
  }
  for (const signal of qualitySignals) {
    if (!signal.pattern.test(text)) issues.push(`缺少质量信号：${signal.name}`);
  }

  const externalLinks = countExternalLinks(text);
  if (externalLinks < 4) issues.push(`外部来源链接不足：${externalLinks}/4`);

  const looksFormal = /今日核心判断|正式|决策稿/.test(text) && !/非决策稿|不作为决策稿/.test(text);
  if (isFallback && looksFormal) {
    issues.push('兜底或待增强内容不能伪装成正式决策稿');
  }

  const hasConclusionButWeak = /今日核心判断/.test(text) && !/(可信度|证据基础|为什么重要)/.test(text);
  if (hasConclusionButWeak) {
    issues.push('核心判断缺少可信度、证据基础或为什么重要');
  }

  return {
    file,
    status: issues.length ? (strict ? 'fail' : 'warn') : 'pass',
    issues,
  };
}

function main() {
  const dir = path.join(project, today);
  const files = [
    '00-overview.md',
    '01-flat-organization.md',
    '02-talent-density.md',
    '03-job-family-career-architecture.md',
    '04-promotion-system.md',
  ].map((name) => path.join(dir, name));

  const results = files.map(auditFile);
  const lines = [];
  lines.push(`# ${today}｜AI 组织人才日报质量门禁`);
  lines.push('');
  lines.push(`- 模式：${strict ? '正式决策稿严格门禁' : '常规质量巡检'}`);
  lines.push(`- 结论：${results.some((item) => item.status === 'fail') ? '未通过' : results.some((item) => item.status === 'warn') ? '存在待增强项' : '通过'}`);
  lines.push('');
  for (const result of results) {
    const relative = path.relative(root, result.file);
    lines.push(`## ${relative}`);
    lines.push(`- 状态：${result.status}`);
    if (result.issues.length) {
      for (const issue of result.issues) lines.push(`- ${issue}`);
    } else {
      lines.push('- 未发现结构性质量问题。');
    }
    lines.push('');
  }

  const reportDir = path.join(project, 'quality');
  fs.mkdirSync(reportDir, { recursive: true });
  const reportPath = path.join(reportDir, `${today}.md`);
  fs.writeFileSync(reportPath, `${lines.join('\n')}\n`);

  console.log(lines.join('\n'));

  if (results.some((item) => item.status === 'fail')) {
    process.exitCode = 1;
  }
}

main();
