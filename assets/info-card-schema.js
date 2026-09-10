(function (root) {
  function informationType(value) {
    const text = String(value || '').trim();
    if (/缺口|无新增/.test(text)) return '缺口记录';
    if (/弱信号|待验证|线索/.test(text)) return '弱信号';
    if (/context|旧线|背景|复核/i.test(text)) return '旧线复核';
    if (/^新增事实$/.test(text)) return '新增事实';
    return '未标注';
  }

  function channelType(value) {
    const parts = String(value || '').split(/[／/、；;|]/);
    for (const part of parts) {
      if (/招聘|JD|薪酬|岗位/.test(part)) return 'JD薪酬';
      if (/咨询|报告|学术|研究|调查/.test(part)) return '报告学术';
      if (/社媒|职场|公众号|社交/.test(part)) return '社媒公众号';
      if (/官方|一手/.test(part)) return '官方';
      if (/媒体|公司案例/.test(part)) return '媒体';
    }
    return '未归类';
  }

  function sourceLinks(value) {
    const text = String(value || '');
    const links = [];
    const add = (label, candidate) => {
      try {
        const url = new URL(candidate);
        if (!['http:', 'https:'].includes(url.protocol)) return;
        if (!links.some(link => link.url === url.href)) links.push({ label: label || url.hostname, url: url.href });
      } catch {}
    };
    for (const match of text.matchAll(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g)) add(match[1], match[2]);
    for (const match of text.matchAll(/(?:^|[；;])\s*([^\[（）()]+)[（(](https?:\/\/[^\s）)]+)[）)]/g)) add(match[1].trim(), match[2]);
    for (const match of text.matchAll(/https?:\/\/[^\s）)\]>"，；]+/g)) add('', match[0]);
    return links;
  }

  function readingTier(item) {
    const type = informationType(item.infoType);
    if (['弱信号', '缺口记录', '未标注'].includes(type)) return '持续观察';
    if (['重点读', '快速知道', '持续观察'].includes(item.readingTier)) return item.readingTier;
    return '快速知道';
  }

  const api = { informationType, channelType, sourceLinks, readingTier };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.InfoCardSchema = api;
})(typeof window !== 'undefined' ? window : globalThis);
