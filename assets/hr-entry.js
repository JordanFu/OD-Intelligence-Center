(async function () {
  const loading = document.getElementById('hrLoading');

  try {
    const response = await fetch('../index.html', { cache: 'no-store' });
    if (!response.ok) throw new Error(`页面模板读取失败：${response.status}`);

    const source = await response.text();
    const page = new DOMParser().parseFromString(source, 'text/html');
    page.documentElement.dataset.edition = 'hr';
    page.documentElement.lang = 'zh-CN';

    const existingBase = page.querySelector('base');
    if (existingBase) existingBase.remove();
    const base = page.createElement('base');
    base.href = '../';
    page.head.prepend(base);

    page.title = 'OD 情报中心｜HR 分享版';
    const description = page.querySelector('meta[name="description"]') || page.createElement('meta');
    description.name = 'description';
    description.content = '面向 HR 伙伴的每日组织情报与人力资源知识库。';
    if (!description.parentNode) page.head.append(description);

    const heading = page.querySelector('.header h1');
    const subtitle = page.querySelector('.header h1 + p');
    if (heading) heading.textContent = '🧠 OD 情报中心｜HR 分享版';
    if (subtitle) subtitle.textContent = '每日组织情报 · HR 知识库 · 持续更新';

    page.querySelector('.levels-tab')?.remove();
    page.querySelector('#page-levels')?.remove();
    page.querySelector('.edition-share-button')?.remove();

    const fallback = page.querySelector('#statusDashboard');
    if (fallback) {
      fallback.innerHTML = '<div class="manifest-fallback-warning">正在读取每日情报与知识库状态。</div>';
    }

    const footer = page.querySelector('.footer');
    if (footer) footer.textContent = 'OD 情报中心 HR 分享版 · 每日组织情报与知识持续更新';

    document.open();
    document.write(`<!DOCTYPE html>${page.documentElement.outerHTML}`);
    document.close();
  } catch (error) {
    if (loading) {
      loading.innerHTML = `
        <strong>页面暂时无法加载</strong>
        <p>${String(error.message || error)}</p>
        <button type="button" onclick="window.location.reload()">重新加载</button>
      `;
    }
  }
})();
