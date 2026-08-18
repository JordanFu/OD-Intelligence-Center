const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { extractPdfUrls, isPdfFile } = require('./ingest-pdf-references');

const mixedMarkdown = [
  '报道：https://apnews.com/article/meta-lawsuit)；[诉状](https://storage.courtlistener.com/recap/case/complaint.pdf)',
  '报告页：https://www.pwc.com/report.html)，[完整报告](https://www.pwc.com/report/full-report.pdf)',
  '正式规则：[Fannie Mae LL-2026-04](https://singlefamily.fanniemae.com/media/45196/display)',
].join('\n');

assert.deepStrictEqual(extractPdfUrls(mixedMarkdown), [
  'https://storage.courtlistener.com/recap/case/complaint.pdf',
  'https://www.pwc.com/report/full-report.pdf',
  'https://singlefamily.fanniemae.com/media/45196/display',
]);

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'odic-pdf-test-'));
const pdfFile = path.join(tempDir, 'valid.pdf');
const htmlFile = path.join(tempDir, 'challenge.pdf');
fs.writeFileSync(pdfFile, `${'x'.repeat(32)}%PDF-1.7\n${'0'.repeat(2048)}`);
fs.writeFileSync(htmlFile, `<!DOCTYPE html>\n${'x'.repeat(2048)}`);

assert.strictEqual(isPdfFile(pdfFile), true, 'accepts a PDF signature within the first 1 KB');
assert.strictEqual(isPdfFile(htmlFile), false, 'rejects an HTML response saved with a .pdf extension');

fs.rmSync(tempDir, { recursive: true, force: true });

console.log('PDF URL boundary test passed');
