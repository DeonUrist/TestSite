// Simple loader to include header.html into pages.
// Place a <div id="site-header"></div> near the top of each page's <body>.
(function () {
  const targetId = 'site-header';
  const headerPath = '/header.html';
  const headerScriptId = 'header-icons-script';
  const headerLangScriptId = 'header-lang-script';

  function insertHeader(html) {
    const container = document.getElementById(targetId);
    if (!container) return;
    container.innerHTML = html;

    // Inject header-icons.js (only once) so interactive behaviors run
    if (!document.getElementById(headerScriptId)) {
      const s = document.createElement('script');
      s.id = headerScriptId;
      s.src = '/js/header-icons.js';
      // ensure predictable execution order: do not use async/defer for dynamic insertion
      s.async = false;
      s.defer = false;
      s.onload = function () {
        try {
          if (window.headerIconsInit) window.headerIconsInit();
        } catch (e) { /* ignore */ }
      };
      document.body.appendChild(s);
    } else {
      // Script already present (cached or injected earlier) — call init if available
      try {
        if (window.headerIconsInit) window.headerIconsInit();
      } catch (e) { /* ignore */ }
    }

    // Inject header-lang.js (only once) to enable language button behavior
    if (!document.getElementById(headerLangScriptId)) {
      const s2 = document.createElement('script');
      s2.id = headerLangScriptId;
      s2.src = '/js/header-lang.js';
      s2.async = false;
      s2.defer = false;
      s2.onload = function () {
        try {
          if (window.headerLangInit) window.headerLangInit();
        } catch (e) { /* ignore */ }
      };
      document.body.appendChild(s2);
    } else {
      try {
        if (window.headerLangInit) window.headerLangInit();
      } catch (e) { /* ignore */ }
    }
  }

  // Fetch and insert header (deferred to avoid blocking)
  fetch(headerPath, { cache: 'no-cache' })
    .then(response => {
      if (!response.ok) throw new Error('Failed to load header');
      return response.text();
    })
    .then(insertHeader)
    .catch(err => {
      // Optional: show a minimal fallback header if fetch fails
      console.warn('Header load failed:', err);
    });
})();