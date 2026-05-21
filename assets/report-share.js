(function(){
  if (window.__odReportShareLoaded) return;
  window.__odReportShareLoaded = true;

  function canonicalUrl() {
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical && canonical.href) return canonical.href;
    return window.location.href.split('#')[0];
  }

  function findMarkdownUrl() {
    const explicit = document.querySelector('[data-share-markdown]');
    if (explicit) return explicit.getAttribute('href') || explicit.getAttribute('data-share-markdown');
    const links = Array.from(document.querySelectorAll('a[href$=".md"]'));
    const preferred = links.find((link) => /markdown|md|原文|查看/i.test(link.textContent || '')) || links[0];
    return preferred ? preferred.href : '';
  }

  function pageTitle() {
    const h1 = document.querySelector('h1');
    return (document.querySelector('meta[property="og:title"]') || {}).content || (h1 && h1.textContent.trim()) || document.title || 'OD 情报中心报告';
  }

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
  }

  function toast(message) {
    let node = document.querySelector('.od-share-toast');
    if (!node) {
      node = document.createElement('div');
      node.className = 'od-share-toast';
      document.body.appendChild(node);
    }
    node.textContent = message;
    node.classList.add('is-visible');
    clearTimeout(node._timer);
    node._timer = setTimeout(() => node.classList.remove('is-visible'), 1800);
  }

  function buildShareText() {
    return `${pageTitle()}\n${canonicalUrl()}`;
  }

  async function nativeShare() {
    if (navigator.share) {
      await navigator.share({ title: pageTitle(), text: '来自 OD 情报中心的报告', url: canonicalUrl() });
      return;
    }
    await copyText(buildShareText());
    toast('已复制分享文本');
  }

  function openMail() {
    const subject = encodeURIComponent(pageTitle());
    const body = encodeURIComponent(buildShareText());
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }

  async function downloadMarkdown() {
    const markdownUrl = findMarkdownUrl();
    if (!markdownUrl) {
      toast('未找到 Markdown 原文');
      return;
    }
    window.open(markdownUrl, '_blank', 'noopener');
  }

  function ensureWidget() {
    if (document.querySelector('.od-share-widget') || document.querySelector('.share-panel') || document.body.dataset.shareDisabled === 'true') return;
    const widget = document.createElement('div');
    widget.className = 'od-share-widget';
    widget.innerHTML = `
      <button class="od-share-toggle" type="button" aria-label="分享报告" aria-expanded="false">↗</button>
      <section class="od-share-panel" aria-label="分享菜单">
        <div class="od-share-title"></div>
        <div class="od-share-url"></div>
        <div class="od-share-grid">
          <button class="od-share-action primary" type="button" data-action="native">系统分享</button>
          <button class="od-share-action" type="button" data-action="link">复制链接</button>
          <button class="od-share-action" type="button" data-action="text">复制标题+链接</button>
          <button class="od-share-action" type="button" data-action="mail">邮件发送</button>
          <button class="od-share-action" type="button" data-action="markdown">查看 Markdown</button>
          <button class="od-share-action" type="button" data-action="print">打印/PDF</button>
        </div>
      </section>`;
    document.body.appendChild(widget);

    const toggle = widget.querySelector('.od-share-toggle');
    const title = widget.querySelector('.od-share-title');
    const url = widget.querySelector('.od-share-url');
    title.textContent = pageTitle();
    url.textContent = canonicalUrl();

    toggle.addEventListener('click', () => {
      const open = !widget.classList.contains('is-open');
      widget.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });

    document.addEventListener('click', (event) => {
      if (!widget.contains(event.target)) {
        widget.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    widget.addEventListener('click', async (event) => {
      const button = event.target.closest('[data-action]');
      if (!button) return;
      const action = button.dataset.action;
      try {
        if (action === 'native') await nativeShare();
        if (action === 'link') { await copyText(canonicalUrl()); toast('分享链接已复制'); }
        if (action === 'text') { await copyText(buildShareText()); toast('标题和链接已复制'); }
        if (action === 'mail') openMail();
        if (action === 'markdown') await downloadMarkdown();
        if (action === 'print') window.print();
      } catch (error) {
        if (error && error.name === 'AbortError') return;
        await copyText(buildShareText());
        toast('已复制分享文本');
      }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ensureWidget);
  else ensureWidget();
})();
