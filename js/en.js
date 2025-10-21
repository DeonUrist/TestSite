// English translations (nested object)
window.siteTranslations = {
    page: {
        companyname: "EVDANCO GROUP ROMANIA",
        companydescriptionp1: "EVDANCO GROUP ROMANIA is group of companies, registered in Targoviste,Romania that provides complex service for Romanian drilling and workover rigs. Our company has a professional technical team with more than 30 years of experience in designing, manufacturing and repairing drilling rigs and other incorporated equipment. Up to now EVDANCO has supplied drilling equipment, spare parts and provides maintenance services in more than 15 countries all over the world, as Romania, Germany, Oman, Iraq, Libya, Brazil, Ecuador and other countries.",
        companydescriptionp2: "EVDANCO offers marketing services of oil and gas equipment, design, service and maintenance of oil and gas equipment, consulting in Romania but also abroad. Our company is growing with a dynamic management, able to become a serious business partner on domestic and international markets.",
        companydescriptionp3: "EVDANCO is always dedicated to ensuring customers receive the highest best-in-class equipment and services and products for industry where conditions and requirements change daily. EVDANCO’s goal is to deliver the products and services you need in a reliable, responsive, and professional manner that sets a new standard for the industry.",
        companydescriptionp4: "You can count on EVDANCO to provide a wide range of products and services with one distinct difference - an authentic commitment to supporting you every step of the way. EVDANCO provides the expertise and responsive delivery demanded in this industry."
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
    console.log('Translations applied (en):', window.siteTranslations);
};