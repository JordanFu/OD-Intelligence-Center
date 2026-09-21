const assert = require('node:assert/strict');
const { applyFormalRunWindow } = require('./generate-topic-project-status');

const morning = { date: '2026-09-21', hour: 9, minute: 45 };
const evening = { date: '2026-09-21', hour: 18, minute: 0 };

assert.equal(
  applyFormalRunWindow('fallback', morning.date, morning, ['已有 fallback']).status,
  'scheduled',
  '正式窗口前的 fallback 只能表示已留状态记录，不能进入待重跑清单',
);
assert.equal(
  applyFormalRunWindow('needs-rerun', morning.date, morning, ['文件不完整']).status,
  'scheduled',
  '正式窗口前的当日不完整产物仍应显示 scheduled',
);
assert.equal(
  applyFormalRunWindow('formal', morning.date, morning, []).status,
  'formal',
  '提前生成且通过门禁的正式稿应保持 formal',
);
assert.equal(
  applyFormalRunWindow('fallback', evening.date, evening, ['已有 fallback']).status,
  'fallback',
  '正式窗口开始后仍只有 fallback 时必须进入待重跑清单',
);

console.log('topic project formal-run window semantics ok');
