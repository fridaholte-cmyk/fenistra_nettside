// Enkel regelbasert chat-widget. Matcher brukerspørsmål mot FENISTRA_CHAT_KB (nøkkelord),
// og henviser til support/salg når det ikke finnes et godt treff.
(function () {
  const trigger = document.getElementById('chatTrigger');
  const panel = document.getElementById('chatPanel');
  const backdrop = document.getElementById('chatBackdrop');
  const closeBtn = document.getElementById('chatClose');
  const messagesEl = document.getElementById('chatMessages');
  const form = document.getElementById('chatForm');
  const input = document.getElementById('chatInput');
  if (!trigger || !panel || typeof FENISTRA_CHAT_KB === 'undefined') return;

  let greeted = false;

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  function addMessage(html, who) {
    const div = document.createElement('div');
    div.className = 'chat-msg chat-msg-' + who;
    div.innerHTML = html;
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function addSuggestions() {
    const wrap = document.createElement('div');
    wrap.className = 'chat-suggestions';
    wrap.innerHTML = [
      'Hva er Fenistra?',
      'Hva inneholder Standard?',
      'Kan dere integreres med vårt regnskapssystem?'
    ].map((s) => '<button type="button" class="chat-suggestion">' + s + '</button>').join('');
    messagesEl.appendChild(wrap);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function findAnswer(query) {
    const q = ' ' + query.toLowerCase() + ' ';
    let best = null;
    let bestScore = 0;
    FENISTRA_CHAT_KB.forEach((entry) => {
      let score = 0;
      entry.keywords.forEach((kw) => {
        if (q.includes(kw.toLowerCase())) score++;
      });
      if (score > bestScore) {
        bestScore = score;
        best = entry;
      }
    });
    return bestScore > 0 ? best.answer : null;
  }

  function handleSend(text) {
    const trimmed = text.trim();
    if (!trimmed) return;
    addMessage(escapeHtml(trimmed), 'user');
    input.value = '';
    setTimeout(() => {
      const answer = findAnswer(trimmed);
      if (answer) {
        addMessage(answer, 'bot');
      } else {
        addMessage(
          'Jeg fant dessverre ikke et godt svar på det her. Ta gjerne kontakt med oss, så hjelper vi deg videre:' +
          '<br><br>Brukerstøtte: <a href="mailto:support.fenistra@visma.com">support.fenistra@visma.com</a>' +
          '<br>Salg: <a href="pakke-resultat.html">book en demo</a>' +
          '<br>Telefon: <a href="tel:+4722229049">22 22 90 49</a>' +
          '<br><br>Du finner også svar på flere vanlige spørsmål på <a href="sporsmal.html">spørsmål-siden</a>.',
          'bot'
        );
      }
    }, 450);
  }

  function openChat() {
    const searchPanel = document.getElementById('searchPanel');
    if (searchPanel && searchPanel.classList.contains('open')) {
      searchPanel.classList.remove('open');
      const searchBackdrop = document.getElementById('searchBackdrop');
      if (searchBackdrop) searchBackdrop.classList.remove('open');
    }
    panel.classList.add('open');
    backdrop.classList.add('open');
    trigger.classList.add('chat-open-hide');
    if (!greeted) {
      addMessage(
        'Hei! Jeg er Fenistra-assistenten. Spør meg om løsninger, integrasjoner eller pakker - finner jeg ikke svaret, henviser jeg deg videre til support/salg.',
        'bot'
      );
      addSuggestions();
      greeted = true;
    }
    setTimeout(() => input.focus(), 60);
  }
  function closeChat() {
    panel.classList.remove('open');
    backdrop.classList.remove('open');
    trigger.classList.remove('chat-open-hide');
  }

  trigger.addEventListener('click', openChat);
  closeBtn.addEventListener('click', closeChat);
  backdrop.addEventListener('click', closeChat);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.classList.contains('open')) closeChat();
  });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    handleSend(input.value);
  });
  messagesEl.addEventListener('click', (e) => {
    if (e.target.classList.contains('chat-suggestion')) {
      handleSend(e.target.textContent);
    }
  });
})();
