const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const publicBase = 'https://jordanfu.github.io/OD-Intelligence-Center/';

function clock(now) {
  const local = new Date(now.getTime() + 8 * 3600000).toISOString();
  return { date: local.slice(0, 10), time: local.slice(11, 16) };
}

function daySection(text, date) {
  const sections = String(text || '').split(/(?=^## \d{4}-\d{2}-\d{2}\s*$)/m);
  return (sections.find(section => section.startsWith(`## ${date}\n`) || section.startsWith(`## ${date}\r\n`)) || '').trim();
}

function normalized(text) {
  return String(text || '').replace(/\r\n/g, '\n').trim();
}

function assessDelivery({ now = new Date(), files = {}, info, remoteFiles = {}, remoteInfo, remoteErrors = [] }) {
  const { date, time } = clock(now);
  const due = time >= '11:30';
  const section = daySection(files['digest.md'], date);
  const daily = files[`daily/${date}.md`] || '';
  const report = files[`daily-report/${date}.md`] || '';
  const cards = [...section.matchAll(/^### \[([^\]]+)\]/gm)].map(match => match[1]);
  const dailyIds = [...daily.matchAll(/^### \[([^\]]+)\]/gm)].map(match => match[1]);
  const gaps = (section.match(/信息类型\*\*[：:]\s*缺口记录/g) || []).length;
  const issues = [];
  if (!cards.length) issues.push('digest 未出现当日信息卡');
  if (!daily.includes(date) || !report.includes(date)) issues.push('当日 daily 或 daily-report 缺失日期/文件');
  if (JSON.stringify(cards) !== JSON.stringify(dailyIds)) issues.push('digest 与 daily 当日卡片编号不一致');
  if (report.trim().length < 20) issues.push('当日导读正文缺失');
  if (/非决策稿|待正式重跑|研究状态记录|云端兜底/.test([section, daily, report].join('\n'))) issues.push('当日文件仍含兜底或待重跑标识，需人工核实');
  if (!info || info.latestDate !== date || info.latestCardCount !== cards.length) issues.push('信息库 manifest 日期或卡片数与当日产物不符');
  const result = {
    checkedAt: now.toISOString(), module: 'info-delivery', date, timezone: 'Asia/Shanghai',
    scheduledAt: '09:40', deadline: '11:30', status: 'published', qualityStatus: 'pass',
    cardCount: cards.length, gapRecordCount: gaps, localReady: issues.length === 0,
    publicVerified: false, issues, remoteErrors,
    receiptMeaning: '只确认当日文件、审计状态及线上内容一致，不代表人工已认可内容价值。',
  };
  if (issues.length) {
    result.status = due ? 'overdue' : time < '09:40' ? 'scheduled' : 'running-window';
    result.qualityStatus = due ? 'fail' : 'warn';
  } else if (info.qualityStatus === 'fail' || (info.criticalIssues || []).length || (info.brokenLinks || []).length) {
    result.status = 'quality-blocked';
    result.qualityStatus = 'fail';
    issues.push('信息审计存在阻断项，不得作为成功交付');
  } else if (remoteErrors.length) {
    result.status = 'publication-unverified';
    result.qualityStatus = 'warn';
    issues.push('线上检查未完成，不能证明已发布');
  } else {
    if (normalized(daySection(remoteFiles['digest.md'], date)) !== normalized(section)) issues.push('线上 digest 当日内容不一致或不存在');
    for (const filename of [`daily/${date}.md`, `daily-report/${date}.md`]) {
      if (normalized(remoteFiles[filename]) !== normalized(files[filename])) issues.push(`线上 ${filename} 不一致或不存在`);
    }
    if (!remoteInfo || remoteInfo.latestDate !== date || remoteInfo.latestCardCount !== cards.length) issues.push('线上 manifest 未匹配当日内容');
    if (remoteInfo?.qualityStatus === 'fail' || (remoteInfo?.criticalIssues || []).length || (remoteInfo?.brokenLinks || []).length) issues.push('线上 manifest 存在阻断项');
    if (issues.length) {
      result.status = 'publish-pending';
      result.qualityStatus = due ? 'fail' : 'warn';
    } else {
      result.publicVerified = true;
      result.status = gaps === cards.length ? 'published-gap' : 'published';
      result.qualityStatus = result.status === 'published-gap' || info.qualityStatus !== 'pass' || remoteInfo.qualityStatus !== 'pass' ? 'warn' : 'pass';
      if (result.status === 'published-gap') issues.push('已发布的只有缺口说明，研究内容仍待补跑');
    }
  }
  return result;
}

function assessReceipt(receipt, now = new Date()) {
  const { date, time } = clock(now);
  if (!receipt || receipt.date !== date || !Number.isFinite(Date.parse(receipt.checkedAt)) || clock(new Date(receipt.checkedAt)).date !== date) {
    return { status: 'check-required', qualityStatus: time >= '11:30' ? 'fail' : 'warn', date, issues: ['缺少当日信息库交付检查回执'] };
  }
  if (time >= '11:30' && ['scheduled', 'running-window'].includes(receipt.status)) {
    return { ...receipt, status: 'overdue', qualityStatus: 'fail', issues: ['已超过截止时间，尚无成功交付回执'] };
  }
  return receipt;
}

function readText(filename) {
  return fs.existsSync(path.join(root, filename)) ? fs.readFileSync(path.join(root, filename), 'utf8') : '';
}

async function main() {
  const now = new Date();
  const { date } = clock(now);
  const names = ['digest.md', `daily/${date}.md`, `daily-report/${date}.md`];
  const files = Object.fromEntries(names.map(filename => [filename, readText(filename)]));
  let info;
  try { info = JSON.parse(readText('data/info-feed-status.json')); } catch {}
  const remoteFiles = {};
  const remoteErrors = [];
  let remoteInfo;
  for (const filename of [...names, 'data/info-feed-status.json']) {
    try {
      const response = await fetch(`${publicBase}${filename}?delivery=${now.getTime()}`, { signal: AbortSignal.timeout(15000) });
      if (!response.ok) {
        if (response.status !== 404) remoteErrors.push(`${filename}: HTTP ${response.status}`);
        continue;
      }
      const body = await response.text();
      if (filename.endsWith('.json')) remoteInfo = JSON.parse(body);
      else remoteFiles[filename] = body;
    } catch {
      remoteErrors.push(`${filename}: 无法完成网络或 JSON 检查`);
    }
  }
  const result = assessDelivery({ now, files, info, remoteFiles, remoteInfo, remoteErrors });
  result.runUrl = process.env.GITHUB_ACTIONS === 'true' && /^\d+$/.test(process.env.GITHUB_RUN_ID || '')
    ? `https://github.com/JordanFu/OD-Intelligence-Center/actions/runs/${process.env.GITHUB_RUN_ID}` : null;
  fs.mkdirSync(path.join(root, 'data'), { recursive: true });
  fs.writeFileSync(path.join(root, 'data/info-delivery-status.json'), JSON.stringify(result, null, 2) + '\n');
  const summary = `# 信息库交付检查\n\n- 检查日期：${date}（北京时间）\n- 截止时间：11:30\n- 状态：${result.status} / ${result.qualityStatus}\n- 线上内容一致：${result.publicVerified ? '是' : '未确认'}\n- 卡片数：${result.cardCount}（缺口 ${result.gapRecordCount}）\n\n${[...result.issues, ...remoteErrors].map(issue => `- ${issue}`).join('\n') || '- 当日产物已核对；内容价值仍需主编负责。'}\n`;
  fs.writeFileSync(path.join(root, 'operations/info-delivery-latest.md'), summary);
  if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary);
  console.log(summary);
  if (result.qualityStatus === 'fail') process.exitCode = 1;
}

module.exports = { assessDelivery, daySection, assessReceipt };
if (require.main === module) main().catch(error => { console.error(error.name); process.exitCode = 1; });
