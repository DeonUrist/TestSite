(function () {
    const STORAGE_KEY = 'site-lang';
    const DEFAULT = (() => {
        try {
            const nav = navigator.language || navigator.userLanguage || '';
            return nav.startsWith('en') ? 'en' : 'ro';
        } catch (e) {
            return 'ro';
        }
    })();

    function loadLangScript(lang) {
        // Remove previous script if present
        const prev = document.getElementById('site-lang-script');
        if (prev) prev.remove();

        const s = document.createElement('script');
        s.id = 'site-lang-script';
        s.src = `/js/${lang}.js`;
        s.async = false;
        s.defer = false;
        s.onload = () => {
            // If the translation module exposes applyTranslations, call it
            try {
                if (typeof window.applyTranslations === 'function') {
                    window.applyTranslations(lang);
                }
            } catch (e) {
                console.warn('applyTranslations error', e);
            }
        };
        s.onerror = () => {
            console.warn('Failed to load language file:', s.src);
        };
        document.body.appendChild(s);
    }

    function applyLang(lang) {
        document.documentElement.lang = (lang === 'ro') ? 'ro' : 'en';
        localStorage.setItem(STORAGE_KEY, lang);
        const btn = document.getElementById('lang-btn');
        if (btn) {
            btn.setAttribute('aria-pressed', String(lang === 'ro'));
            // Remove visible text entirely
            btn.textContent = '';
            // Set accessible label/title describing the action (the language the button will switch to)
            const target = (lang === 'ro') ? 'English' : 'Romanian';
            btn.setAttribute('aria-label', `Switch to ${target}`);
            btn.title = `Switch to ${target}`;
        }
        loadLangScript(lang);
    }

    function toggleLang() {
        const current = localStorage.getItem(STORAGE_KEY) || DEFAULT;
        const next = current === 'ro' ? 'en' : 'ro';
        applyLang(next);
    }

    function init() {
        const initial = localStorage.getItem(STORAGE_KEY) || DEFAULT;
        applyLang(initial);

        const btn = document.getElementById('lang-btn');
        if (!btn) return;
        btn.addEventListener('click', (ev) => {
            ev.preventDefault();
            toggleLang();
        });
    }

    // Expose init for include-header to call
    window.headerLangInit = init;

    // Also allow programmatic call
    window.setSiteLanguage = applyLang;
})();