/* Lightweight client-side i18n for static pages (EN / RO)
 - Uses /lang/{code}.json (e.g. /lang/en.json)
 - Persists selection in localStorage ('site.lang')
 - Works with dynamically injected header via MutationObserver
*/

(function () {
  const DEFAULT = 'en';
  const LANG_PATH = '/lang/'; // expects en.json, ro.json here
  const STORAGE_KEY = 'site.lang';

  function currentLang() {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT;
  }

  async function fetchLangDict(lang) {
    try {
      const res = await fetch(`${LANG_PATH}${lang}.json`, { cache: 'no-store' });
      if (!res.ok) throw new Error(res.statusText);
      return await res.json();
    } catch (e) {
      console.error('i18n: failed to load', lang, e);
      if (lang !== DEFAULT) return fetchLangDict(DEFAULT);
      return {};
    }
  }

  function lookup(obj, key) {
    return key.split('.').reduce((o, k) => (o && o[k] !== undefined) ? o[k] : undefined, obj);
  }

  function applyTranslations(dict, root = document) {
    if (!dict) return;
    root.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (!key) return;
      const val = lookup(dict, key);
      if (val !== undefined) el.textContent = val;
    });
    document.documentElement.lang = currentLang();
    // update lang button aria-pressed
    root.querySelectorAll('[data-lang]').forEach(btn => {
      btn.setAttribute('aria-pressed', btn.getAttribute('data-lang') === currentLang() ? 'true' : 'false');
    });
  }

  async function setLang(lang) {
    if (!lang) return;
    localStorage.setItem(STORAGE_KEY, lang);
    const dict = await fetchLangDict(lang);
    applyTranslations(dict);
  }

  function wireLangButtons(root = document) {
    root.querySelectorAll('[data-lang]').forEach(btn => {
      if (btn.__i18n_bound) return;
      btn.addEventListener('click', () => setLang(btn.getAttribute('data-lang')));
      btn.__i18n_bound = true;
    });
  }

  // Apply translation to newly added nodes (e.g. header include)
  function observeDomForInserts() {
    const mo = new MutationObserver((mutations) => {
      let added = false;
      mutations.forEach(m => {
        if (m.addedNodes && m.addedNodes.length) {
          added = true;
        }
      });
      if (!added) return;
      // wire buttons for any new nodes and reapply current translations
      wireLangButtons(document);
      fetchLangDict(currentLang()).then(dict => applyTranslations(dict, document));
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });
  }

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', async () => {
    wireLangButtons(document);
    observeDomForInserts();
    const dict = await fetchLangDict(currentLang());
    applyTranslations(dict);
  });
})();