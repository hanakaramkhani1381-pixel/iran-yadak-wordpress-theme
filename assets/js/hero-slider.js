document.addEventListener('DOMContentLoaded', function () {

    /* =========================================================
       YADIXA HERO SLIDER
    ========================================================= */

    const slider = document.querySelector('.yadixa-hero-slider');

    if (slider) {

        const slides = slider.querySelectorAll('.yadixa-slide');
        const dots = slider.querySelectorAll('.yadixa-slider-dot');
        const nextButton = slider.querySelector('.yadixa-slider-next');
        const prevButton = slider.querySelector('.yadixa-slider-prev');

        if (slides.length) {

            let currentSlide = 0;
            let autoPlay;

            function showSlide(index) {

                if (index >= slides.length) {
                    index = 0;
                }

                if (index < 0) {
                    index = slides.length - 1;
                }

                slides.forEach(function (slide, i) {
                    slide.classList.toggle(
                        'is-active',
                        i === index
                    );
                });

                dots.forEach(function (dot, i) {
                    dot.classList.toggle(
                        'is-active',
                        i === index
                    );
                });

                currentSlide = index;
            }

            function nextSlide() {
                showSlide(currentSlide + 1);
            }

            function previousSlide() {
                showSlide(currentSlide - 1);
            }

            function startAutoPlay() {

                clearInterval(autoPlay);

                autoPlay = setInterval(function () {
                    nextSlide();
                }, 10000);
            }

            if (nextButton) {

                nextButton.addEventListener('click', function () {
                    nextSlide();
                    startAutoPlay();
                });

            }

            if (prevButton) {

                prevButton.addEventListener('click', function () {
                    previousSlide();
                    startAutoPlay();
                });

            }

            dots.forEach(function (dot, index) {

                dot.addEventListener('click', function () {
                    showSlide(index);
                    startAutoPlay();
                });

            });

            showSlide(0);
            startAutoPlay();
        }
    }


    /* =========================================================
       YADIXA CAR EXPLORER
    ========================================================= */

    const explorer = document.getElementById(
        'yadixa-3d-explorer'
    );

    if (!explorer) {
        return;
    }

    const stage = document.getElementById(
        'yadixa-3d-stage'
    );

    if (!stage) {
        return;
    }


    /* =========================================================
       ELEMENTS
    ========================================================= */

    const searchInput = document.getElementById(
        'yadixa-3d-search'
    );

    const panel = document.getElementById(
        'yadixa-3d-part-panel'
    );

    const panelTitle = document.getElementById(
        'yadixa-3d-part-title'
    );

    const panelDescription = document.getElementById(
        'yadixa-3d-part-description'
    );

    const panelLink = document.getElementById(
        'yadixa-3d-part-link'
    );

    const panelClose = document.getElementById(
        'yadixa-3d-panel-close'
    );

    const viewButtons = explorer.querySelectorAll(
        '.yadixa-3d-control'
    );


    /* =========================================================
       PART DATA
    ========================================================= */

    const carParts = {

        engine: {
            title: 'قطعات موتور',
            description:
                'قطعات مربوط به موتور و سیستم پیشرانه خودرو.',
            keywords: [
                'موتور',
                'پیشرانه',
                'engine',
                'شمع',
                'تسمه',
                'واشر',
                'سوپاپ',
                'موتوری'
            ],
            link:
                '/wordpress/shop/?product_cat=قطعات-موتور'
        },

        brakes: {
            title: 'سیستم ترمز',
            description:
                'لنت، دیسک، کالیپر و سایر قطعات سیستم ترمز.',
            keywords: [
                'ترمز',
                'لنت',
                'لنت ترمز',
                'دیسک',
                'دیسک ترمز',
                'کالیپر',
                'brake'
            ],
            link:
                '/wordpress/shop/?product_cat=سیستم-ترمز'
        },

        clutch: {
            title: 'کلاچ',
            description:
                'دیسک و صفحه، بلبرینگ و قطعات مرتبط با سیستم کلاچ.',
            keywords: [
                'کلاچ',
                'دیسک و صفحه',
                'صفحه کلاچ',
                'بلبرینگ',
                'clutch'
            ],
            link:
                '/wordpress/shop/?product_cat=کلاچ'
        },

        suspension: {
            title: 'جلوبندی و تعلیق',
            description:
                'قطعات جلوبندی، تعلیق و سیستم فرمان خودرو.',
            keywords: [
                'جلوبندی',
                'تعلیق',
                'کمک',
                'کمک فنر',
                'فنر',
                'سیبک',
                'طبق',
                'فرمان',
                'میل فرمان',
                'suspension'
            ],
            link:
                '/wordpress/shop/?product_cat=جلوبندی-و-تعلیق'
        },

        cooling: {
            title: 'سیستم خنک‌کننده',
            description:
                'قطعات مربوط به رادیاتور و سیستم خنک‌کننده.',
            keywords: [
                'خنک کننده',
                'خنک‌کننده',
                'رادیاتور',
                'فن',
                'واترپمپ',
                'آب',
                'ضدیخ',
                'cooling'
            ],
            link:
                '/wordpress/shop/?product_cat=سیستم-خنک‌کننده'
        },

        consumable: {
            title: 'فیلتر و مصرفی',
            description:
                'فیلترها و قطعات مصرفی خودرو.',
            keywords: [
                'فیلتر',
                'فیلتر هوا',
                'فیلتر روغن',
                'فیلتر بنزین',
                'روغن',
                'مصرفی',
                'شمع',
                'لوازم مصرفی'
            ],
            link:
                '/wordpress/shop/?product_cat=فیلتر-و-مصرفی'
        }

    };


    /* =========================================================
       CREATE EXPLORER CAR
    ========================================================= */

    stage.innerHTML = `

        <div class="yadixa-car-scene">

            <div class="yadixa-car-glow"></div>

            <div class="yadixa-car">

                <!-- ENGINE -->

                <button
                    type="button"
                    class="yadixa-car-part yadixa-car-engine"
                    data-part="engine"
                    data-label="قطعات موتور"
                    aria-label="قطعات موتور">
                </button>


                <!-- BRAKES -->

                <button
                    type="button"
                    class="yadixa-car-part yadixa-car-brakes"
                    data-part="brakes"
                    data-label="سیستم ترمز"
                    aria-label="سیستم ترمز">
                </button>


                <!-- CLUTCH -->

                <button
                    type="button"
                    class="yadixa-car-part yadixa-car-clutch"
                    data-part="clutch"
                    data-label="کلاچ"
                    aria-label="کلاچ">
                </button>


                <!-- SUSPENSION -->

                <button
                    type="button"
                    class="yadixa-car-part yadixa-car-suspension"
                    data-part="suspension"
                    data-label="جلوبندی و تعلیق"
                    aria-label="جلوبندی و تعلیق">
                </button>


                <!-- COOLING -->

                <button
                    type="button"
                    class="yadixa-car-part yadixa-car-cooling"
                    data-part="cooling"
                    data-label="سیستم خنک‌کننده"
                    aria-label="سیستم خنک‌کننده">
                </button>


                <!-- CONSUMABLE -->

                <button
                    type="button"
                    class="yadixa-car-part yadixa-car-consumable"
                    data-part="consumable"
                    data-label="فیلتر و مصرفی"
                    aria-label="فیلتر و مصرفی">
                </button>


                <!-- CAR BODY -->

                <div class="yadixa-car-body">

                    <div class="yadixa-car-roof"></div>

                    <div
                        class="yadixa-car-window yadixa-car-window-front">
                    </div>

                    <div
                        class="yadixa-car-window yadixa-car-window-rear">
                    </div>

                    <div
                        class="yadixa-car-headlight yadixa-car-headlight-left">
                    </div>

                    <div
                        class="yadixa-car-headlight yadixa-car-headlight-right">
                    </div>

                    <div
                        class="yadixa-car-wheel yadixa-car-wheel-front">
                    </div>

                    <div
                        class="yadixa-car-wheel yadixa-car-wheel-rear">
                    </div>

                </div>

            </div>

        </div>
    `;


    /* =========================================================
       CAR ELEMENTS
    ========================================================= */

    const carScene = stage.querySelector(
        '.yadixa-car-scene'
    );

    const carPartsButtons = stage.querySelectorAll(
        '.yadixa-car-part'
    );


    /* =========================================================
       OPEN PART PANEL
    ========================================================= */

    function openPartPanel(partName) {

        const part = carParts[partName];

        if (!part) {
            return;
        }

        if (panelTitle) {
            panelTitle.textContent = part.title;
        }

        if (panelDescription) {
            panelDescription.textContent =
                part.description;
        }

        if (panelLink) {
            panelLink.href = part.link;
        }

        if (panel) {
            panel.hidden = false;
        }
    }


    /* =========================================================
       PART CLICK
    ========================================================= */

    carPartsButtons.forEach(function (button) {

        button.addEventListener('click', function () {
            carPartsButtons.forEach(function (item) {
    item.classList.remove('is-selected');
});

button.classList.add('is-selected');

            const partName = button.dataset.part;

            openPartPanel(partName);

        });

    });


    /* =========================================================
       CLOSE PANEL
    ========================================================= */

    if (panelClose) {

        panelClose.addEventListener('click', function () {

            if (panel) {
                panel.hidden = true;
            }

        });

    }


    /* =========================================================
       NORMALIZE PERSIAN SEARCH
    ========================================================= */

    function normalizePersianText(text) {

        return text
            .toLowerCase()
            .replace(/ي/g, 'ی')
            .replace(/ى/g, 'ی')
            .replace(/ك/g, 'ک')
            .replace(/ۀ/g, 'ه')
            .replace(/ة/g, 'ه')
            .replace(/‌/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();

    }


    /* =========================================================
       SMART SEARCH
    ========================================================= */

    if (searchInput) {

        searchInput.addEventListener(
            'input',
            function () {

                const query = normalizePersianText(
                    searchInput.value
                );


                carPartsButtons.forEach(function (button) {

                    const partName =
                        button.dataset.part;

                    const part =
                        carParts[partName];

                    if (!part) {
                        return;
                    }


                    if (!query) {

                        button.classList.remove(
                            'is-highlighted'
                        );

                        return;
                    }


                    const searchableText =
                        normalizePersianText(

                            part.title +
                            ' ' +
                            part.description +
                            ' ' +
                            (part.keywords || []).join(' ')

                        );


                    const matched =
                        searchableText.includes(query);


                    button.classList.toggle(
                        'is-highlighted',
                        matched
                    );

                });

            }
        );

    }


    /* =========================================================
       VIEW CONTROLS
    ========================================================= */

    viewButtons.forEach(function (button) {

        button.addEventListener(
            'click',
            function () {

                if (!carScene) {
                    return;
                }


                /* Active button */

                viewButtons.forEach(function (item) {

                    item.classList.remove(
                        'is-active'
                    );

                });

                button.classList.add(
                    'is-active'
                );


                /* Selected view */

                const view =
                    button.dataset.view;


                /* Reset */

                carScene.classList.remove(
                    'is-front',
                    'is-side',
                    'is-rear'
                );


                /* Apply */

                if (view === 'front') {

                    carScene.classList.add(
                        'is-front'
                    );

                }

                if (view === 'side') {

                    carScene.classList.add(
                        'is-side'
                    );

                }

                if (view === 'rear') {

                    carScene.classList.add(
                        'is-rear'
                    );

                }

            }
        );

    });


    /* =========================================================
       DEFAULT VIEW
    ========================================================= */

    if (carScene) {

        carScene.classList.add(
            'is-front'
        );

    }


    /* =========================================================
       SEARCH ENTER KEY
    ========================================================= */

    if (searchInput) {

        searchInput.addEventListener(
            'keydown',
            function (event) {

                if (event.key !== 'Enter') {
                    return;
                }


                const highlighted =
                    stage.querySelector(
                        '.yadixa-car-part.is-highlighted'
                    );


                if (highlighted) {

                    highlighted.click();

                }

            }
        );

    }

});