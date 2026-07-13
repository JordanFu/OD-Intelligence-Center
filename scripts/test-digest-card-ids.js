const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function titlePattern(file) {
  const source = fs.readFileSync(file, 'utf8');
  const match = source.match(/const titleMatch = line\.match\((\/\^###[\s\S]*?\/)\);/);
  assert.ok(match, `${file} 中没有找到信息卡标题解析规则`);
  return vm.runInNewContext(match[1]);
}

for (const file of ['scripts/audit-info-library.js', 'index.html']) {
  const pattern = titlePattern(file);
  assert.ok(pattern.test('### [12] 数字编号信息卡'), `${file} 必须继续兼容数字编号`);
  assert.ok(pattern.test('### [K05] HBR 绩效指标'), `${file} 必须识别渠道前缀编号`);
  assert.ok(pattern.test('### [HBR-01] HBR 绩效指标'), `${file} 必须识别连字符编号`);
}

console.log('digest card id parsing ok');
