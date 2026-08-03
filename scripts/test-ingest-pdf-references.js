const assert = require('assert');
const { extractPdfUrls } = require('./ingest-pdf-references');

const mixedMarkdown = [
  '报道：https://apnews.com/article/meta-lawsuit)；[诉状](https://storage.courtlistener.com/recap/case/complaint.pdf)',
  '报告页：https://www.pwc.com/report.html)，[完整报告](https://www.pwc.com/report/full-report.pdf)',
].join('\n');

assert.deepStrictEqual(extractPdfUrls(mixedMarkdown), [
  'https://storage.courtlistener.com/recap/case/complaint.pdf',
  'https://www.pwc.com/report/full-report.pdf',
]);

console.log('PDF URL boundary test passed');
