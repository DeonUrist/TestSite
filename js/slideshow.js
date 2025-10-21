(() => {
    const slideHtml1 = `
        <div class="slide-grid">
            <div class="slide-left">
                <img class="slide-image" src="/images/home/ACHIEVEMENT1.jpg" alt="RMTR-80 Training Drilling Rig" />
            </div>
            <div class="slide-right">
                <h2 class="slide-title">RMTR-80 Training Drilling Rig</h2>
                <p class="slide-text">The rig is designed and built in order to train the servicing personnel for the following operations:</p>
                <ol class="slide-list" type="a">
                    <li>Drilling of gas and oil wells;</li>
                    <li>Workover operations like: running in and out of the tubing and sucker rods, dewaxing, handling of bottom pumps, fishing operations with or without the rotation of the rotary table;</li>
                    <li>Repair and put on production operations like: running in and out of the tubing or drill pipes, swabbing, bailing, milling of the cement plugs, windows cuttings in the drill string, deepening of the drill hole, fishing operations.</li>
                </ol>
                <br/>
                <p><a class="slide-cta" href="/learn-more">Learn more</a></p>
            </div>
        </div>
    `;
    const slideHtml2 = `
        <div class="slide-grid">
            <div class="slide-left">
                <img class="slide-image" src="/images/home/ACHIEVEMENT2.jpg" alt="125 Drilling Rig in Germany" />
            </div>
            <div class="slide-right">
                <h2 class="slide-title">125 Drilling Rig in Germany</h2>
                <p class="slide-text">The rig is designed and built in order to train the servicing personnel for the following operations:</p>
                <ol class="slide-list" type="1">
                    <li>Complex design solutions acc. API 4F & 7K</li>
                    <li>Equipment supply, truck and drawworks</li>
                </ol>
                <br/>
                <br/>
                <p><a class="slide-cta" href="/learn-more">Learn more</a></p>
            </div>
        </div>
    `;
    const slideHtml3 = `
        <div class="slide-grid">
            <div class="slide-left">
                <img class="slide-image" src="/images/home/ACHIEVEMENT3.jpg" alt="Offshore Works" />
            </div>
            <div class="slide-right">
                <h2 class="slide-title">Offshore Works</h2>
                <p class="slide-text">Offshore equipment for Romania:</p>
                <ol class="slide-list" type="a">
                    <li> Complex design solutions acc. API 4F;</li>
                    <li>Manufacturing;</li>
                    <li>Transport & mounting.</li>
                </ol>
                <br/>
                <p><a class="slide-cta" href="/learn-more">Learn more</a></p>
            </div>
        </div>
    `;



    // three identical slides per request
    const slides = [slideHtml1, slideHtml2, slideHtml3];

    let current = 0;
    const cardEl = document.getElementById('slideshowCard');
    const indicatorsRoot = document.getElementById('slideshowIndicators');
    const dots = Array.from(indicatorsRoot.querySelectorAll('.dot'));
    const buttons = Array.from(indicatorsRoot.querySelectorAll('.indicator'));
    const intervalMs = 3000;
    let timer = null;

    function show(index) {
        index = ((index % slides.length) + slides.length) % slides.length;
        if (index === current) return;
        // update content (HTML)
        cardEl.innerHTML = slides[index];
        // update indicators
        dots.forEach((d, i) => d.classList.toggle('active', i === index));
        current = index;
    }

    function next() {
        show(current + 1);
    }

    function resetTimer() {
        if (timer) clearInterval(timer);
        timer = setInterval(next, intervalMs);
    }

    // initial state
    cardEl.innerHTML = slides[0];
    dots.forEach((d, i) => d.classList.toggle('active', i === 0));
    resetTimer();

    // click handlers for indicators
    buttons.forEach(btn => {
        btn.addEventListener('click', (ev) => {
            const idx = Number(btn.getAttribute('data-index'));
            show(idx);
            resetTimer();
        });
    });

    // pause on hover of card or indicators, resume on leave
    [cardEl, indicatorsRoot].forEach(el => {
        el.addEventListener('mouseenter', () => { if (timer) clearInterval(timer); });
        el.addEventListener('mouseleave', () => resetTimer());
    });

    // expose for debugging (optional)
    window._slideshow = { show, next, resetTimer };
})();