const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

assert.match(html, /id="channelFilters"/, '首屏必须提供渠道分类筛选');
assert.match(html, /id="topicCategoryFilters"/, '首屏必须提供研究主题筛选');
assert.match(html, /<details[^>]*class="advanced-filters"[\s\S]*id="sourceFilters"[\s\S]*id="tagFilters"[\s\S]*id="coverage"[\s\S]*<\/details>/, '原始来源、标签和覆盖明细必须收进高级筛选');
assert.match(html, /const CHANNEL_FILTERS = \{[\s\S]*官方一手[\s\S]*媒体案例[\s\S]*报告学术[\s\S]*社媒公众号[\s\S]*招聘薪酬[\s\S]*\};/, '必须提供五类渠道导航');
assert.match(html, /const TOPIC_FILTERS = \{[\s\S]*组织设计[\s\S]*人才机制[\s\S]*岗位职级[\s\S]*绩效晋升[\s\S]*薪酬激励[\s\S]*AI 治理[\s\S]*\};/, '必须提供六类研究主题导航');
assert.match(html, /function classifyChannel\(item\)/, '渠道分类必须基于信息卡字段和来源回退判断');
assert.match(html, /function matchesTopicCategory\(item, category\)/, '研究主题必须按卡片内容归类');
assert.match(html, /if \(activeChannelFilter && classifyChannel\(item\) !== activeChannelFilter\) return false;/, '信息列表必须应用渠道分类筛选');
assert.match(html, /if \(activeTopicCategoryFilter && !matchesTopicCategory\(item, activeTopicCategoryFilter\)\) return false;/, '信息列表必须应用研究主题筛选');

console.log('info filter taxonomy ok');
