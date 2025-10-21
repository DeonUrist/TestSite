// Romanian translations (nested object)
window.siteTranslations = {
    page: {
        companyname: "EVDANCO OCG",
        companydescriptionp1: "EVDANCO OCG este un grup de companii, înregistrat în Târgoviște, România, care oferă servicii complexe pentru sondele de foraj și de lucru din România. Compania noastră dispune de o echipă tehnică profesionistă cu peste 30 de ani de experiență în proiectarea, fabricarea și repararea sondele de foraj și a altor echipamente incorporate. Până în prezent, EVDANCO a furnizat echipamente de foraj, piese de schimb și oferă servicii de întreținere în peste 15 țări din întreaga lume, cum ar fi România, Germania, Oman, Irak, Libia, Brazilia, Ecuador și alte țări.",
        companydescriptionp2: "EVDANCO oferă servicii de marketing pentru echipamente de petrol și gaze, proiectare, service și întreținere a echipamentelor de petrol și gaze, consultanță în România, dar și în străinătate. Compania noastră se dezvoltă cu o conducere dinamică, capabilă să devină un partener de afaceri serios pe piețele interne și internaționale.",
        companydescriptionp3: "EVDANCO este întotdeauna dedicată asigurării că clienții primesc cele mai bune echipamente și servicii din industrie, unde condițiile și cerințele se schimbă zilnic. Scopul EVDANCO este de a livra produsele și serviciile de care aveți nevoie într-un mod fiabil, receptiv și profesionist, care stabilește un nou standard pentru industrie.",
        companydescriptionp4: "Puteți conta pe EVDANCO pentru a oferi o gamă largă de produse și servicii, cu o diferență distinctă - un angajament autentic de a vă susține în fiecare etapă a drumului. EVDANCO oferă expertiza și livrarea receptivă solicitată în această industrie."
        // add more keys here
    }
};

// Apply translations to DOM elements marked with `data-i18n="page.companyname"`
window.applyTranslations = function (lang) {
    const dict = window.siteTranslations || {};
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (!key) return;
        const parts = key.split('.');
        let v = parts.reduce((acc, p) => (acc && acc[p] !== undefined) ? acc[p] : undefined, dict);
        if (v !== undefined) {
            el.textContent = v;
        }
    });
    console.log('Translations applied (ro):', window.siteTranslations);
};