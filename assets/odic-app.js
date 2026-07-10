(function () {
  const ODIC_EDITION = document.documentElement.dataset.edition === 'hr' ? 'hr' : 'internal';

  function escapeHtml(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function getHrShareUrl() {
    return new URL('./hr/', document.baseURI).href;
  }

  function allowedTab(tab) {
    if (ODIC_EDITION === 'hr') return tab === 'kb' ? 'kb' : 'info';
    return ['info', 'levels', 'kb'].includes(tab) ? tab : 'info';
  }

  function renderReaderStatus({ info, knowledge, days, manifestLoadFailed }) {
    const latestDate = info?.latestDate || days?.[0]?.date || '等待更新';
    const cardCount = info?.latest?.cardCount ?? info?.latestCardCount ?? days?.[0]?.items?.length ?? '—';
    const newFactCount = info?.latest?.newFactCount ?? info?.newFactCount ?? '—';
    const knowledgePages = knowledge?.counts?.reports ?? '—';
    const stateLabel = manifestLoadFailed ? '状态待刷新' : '持续更新';
    const stateNote = manifestLoadFailed
      ? '最新状态暂时无法读取，已有新闻与知识内容仍可正常浏览。'
      : '每日筛选组织、人才与 AI 领域的重要动态，并沉淀为可检索知识。';

    return `
      <div class="public-status-panel ${manifestLoadFailed ? 'warn' : 'pass'}">
        <div class="public-status-summary">
          <div>
            <div class="public-status-eyebrow">
              <span class="status-pill">${escapeHtml(stateLabel)}</span>
              <span>阅读状态</span>
            </div>
            <p class="public-status-title">每日情报更新至 ${escapeHtml(latestDate)} · ${escapeHtml(cardCount)} 条信息卡 · 新增事实 ${escapeHtml(newFactCount)} 条</p>
            <p class="public-status-note">知识库已收录 ${escapeHtml(knowledgePages)} 页。${escapeHtml(stateNote)}</p>
          </div>
        </div>
      </div>
    `;
  }

  window.ODICApp = {
    edition: ODIC_EDITION,
    isHr: ODIC_EDITION === 'hr',
    allowedTab,
    getHrShareUrl,
    renderReaderStatus
  };
})();
