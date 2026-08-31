// Enkelt klientside-søk på tvers av alle sider. Bruker FENISTRA_SEARCH_INDEX fra search-index.js.
(function () {
  const trigger = document.getElementById('searchTrigger');
  const backdrop = document.getElementById('searchBackdrop');
  const panel = document.getElementById('searchPanel');
  const input = document.getElementById('searchInput');
  const resultsEl = document.getElementById('searchResults');
  const closeBtn = document.getElementById('searchClose');
  if (!trigger || !panel || typeof FENISTRA_SEARCH_INDEX === 'undefined') return;

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  function render(query) {
    const q = query.trim().toLowerCase();
    if (!q) {
      resultsEl.innerHTML = '<div class="search-hint">Søk etter løsninger, integrasjoner eller sider på Fenistra.</div>';
      return;
    }
    const matches = FENISTRA_SEARCH_INDEX.filter((item) =>
      item.title.toLowerCase().includes(q) ||
      item.desc.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    ).slice(0, 8);

    if (matches.length === 0) {
      resultsEl.innerHTML =
        '<div class="search-empty">Ingen treff på «' + escapeHtml(query.trim()) + '».<br>' +
        'Finner du ikke det du leter etter? <a href="sporsmal.html">Ta kontakt med oss</a>.</div>';
      return;
    }

    resultsEl.innerHTML = matches
      .map(
        (item) =>
          '<a class="search-result" href="' + item.url + '">' +
          '<span class="cat">' + escapeHtml(item.category) + '</span>' +
          '<h4>' + escapeHtml(item.title) + '</h4>' +
          '<p>' + escapeHtml(item.desc) + '</p>' +
          '</a>'
      )
      .join('');
  }

  function openSearch() {
    const chatPanel = document.getElementById('chatPanel');
    if (chatPanel && chatPanel.classList.contains('open')) {
      chatPanel.classList.remove('open');
      const chatBackdrop = document.getElementById('chatBackdrop');
      const chatTrigger = document.getElementById('chatTrigger');
      if (chatBackdrop) chatBackdrop.classList.remove('open');
      if (chatTrigger) chatTrigger.classList.remove('chat-open-hide');
    }
    backdrop.classList.add('open');
    panel.classList.add('open');
    render(input.value);
    setTimeout(() => input.focus(), 60);
  }
  function closeSearch() {
    backdrop.classList.remove('open');
    panel.classList.remove('open');
  }

  trigger.addEventListener('click', openSearch);
  closeBtn.addEventListener('click', closeSearch);
  backdrop.addEventListener('click', closeSearch);
  input.addEventListener('input', () => render(input.value));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSearch();
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openSearch();
    }
  });

  render('');
})();
