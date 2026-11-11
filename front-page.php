<?php get_header(); ?>

<main class="yadixa-home">

    <!-- HERO SLIDER -->
<section class="yadixa-hero yadixa-hero-slider" id="yadixa-hero-slider">

    <div class="yadixa-container yadixa-hero-inner">

        <div class="yadixa-hero-content">

            <!-- فقط این قسمت تغییر می‌کند -->
            <div class="yadixa-slide-text">

                <div class="yadixa-slide is-active">

                    <span class="yadixa-hero-badge">
                        مرجع تخصصی قطعات خودروهای ایرانی
                    </span>

                    <h1>
                        قطعات اصلی خودرو،
                        <span>سریع و مطمئن</span>
                    </h1>

                    <p>
                        خرید آنلاین لوازم یدکی خودرو با تضمین اصالت،
                        ارسال سریع و پشتیبانی تخصصی.
                    </p>

                </div>


                <div class="yadixa-slide">

                    <span class="yadixa-hero-badge">
                        خرید مطمئن قطعات خودرو
                    </span>

                    <h1>
                        قطعه مناسب،
                        <span>برای خودروی شما</span>
                    </h1>

                    <p>
                        قطعات موردنیاز خودرو را بر اساس برند، مدل و دسته‌بندی
                        به‌راحتی پیدا کنید.
                    </p>

                </div>


                <div class="yadixa-slide">

                    <span class="yadixa-hero-badge">
                        ارسال به سراسر کشور
                    </span>

                    <h1>
                        سفارش آنلاین،
                        <span>ساده و سریع</span>
                    </h1>

                    <p>
                        محصول موردنظر خود را انتخاب کنید، سفارش دهید و
                        آن را در کوتاه‌ترین زمان دریافت کنید.
                    </p>

                </div>

            </div>


            <!-- این قسمت کاملاً ثابت است -->
            <div class="yadixa-hero-buttons">

                <a href="<?php echo esc_url(wc_get_page_permalink('shop')); ?>"
                   class="yadixa-btn yadixa-btn-primary">
                    مشاهده محصولات
                </a>

                <a href="#vehicle-finder"
                   class="yadixa-btn yadixa-btn-secondary">
                    انتخاب خودرو
                </a>

            </div>


            <div class="yadixa-hero-stats">

                <div>
                    <strong>۸,۵۰۰+</strong>
                    <span>کد کالا</span>
                </div>

                <div>
                    <strong>۲۴/۷</strong>
                    <span>پشتیبانی</span>
                </div>

                <div>
                    <strong>۹۸٪</strong>
                    <span>رضایت مشتری</span>
                </div>

                <div>
                    <strong>۴۸ ساعت</strong>
                    <span>ارسال کشوری</span>
                </div>

            </div>

        </div>


        <!-- عکس ثابت -->
        <div class="yadixa-hero-image">

            <img
                src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/hero-parts.jpg'); ?>"
                alt="قطعات خودرو"
            >

        </div>

    </div>


    
</section>

<!-- =========================
     YADIXA CAR EXPLORER
========================= -->

<section class="yadixa-3d-explorer" id="yadixa-3d-explorer">

    <div class="yadixa-container">

        <!-- عنوان -->
        <div class="yadixa-3d-heading">

            <div>
                <span class="yadixa-section-eyebrow">
                    
                </span>

                <h2>
                    قطعه موردنظرت رو روی خودرو پیدا کن
                </h2>
            </div>

            <p>
                روی بخش‌های مختلف خودرو کلیک کنید،
                قطعه موردنظر خود را پیدا کنید و مستقیماً
                محصولات مرتبط را مشاهده کنید.
            </p>

        </div>


        <!-- Explorer Box -->
        <div class="yadixa-3d-explorer-box">


            <!-- =========================
                 SEARCH
            ========================= -->

            <div class="yadixa-3d-search">

                <div class="yadixa-3d-search-input">

                    <span aria-hidden="true">⌕</span>

                    <input
                        type="text"
                        id="yadixa-3d-search"
                        placeholder="جستجوی قطعه؛ مثلاً لنت، کلاچ، فیلتر..."
                        autocomplete="off"
                    >

                </div>

            </div>


            <!-- =========================
                 VIEW CONTROLS
            ========================= -->

            <div class="yadixa-3d-controls">

                <button
                    type="button"
                    class="yadixa-3d-control is-active"
                    data-view="front">

                    نمای جلو

                </button>

                <button
                    type="button"
                    class="yadixa-3d-control"
                    data-view="side">

                    نمای جانبی

                </button>

                <button
                    type="button"
                    class="yadixa-3d-control"
                    data-view="rear">

                    نمای عقب

                </button>

            </div>


            ```html
<!-- =========================
     CAR STAGE
========================= -->

<div
    class="yadixa-3d-stage"
    id="yadixa-3d-stage"
    aria-label="خودروی سه‌بعدی تعاملی Yadixa"
>
</div>
```


            <!-- =========================
                 PART INFORMATION PANEL
            ========================= -->

            <div
                class="yadixa-3d-part-panel"
                id="yadixa-3d-part-panel"
                hidden
            >

                <button
                    type="button"
                    class="yadixa-3d-panel-close"
                    id="yadixa-3d-panel-close"
                    aria-label="بستن"
                >
                    ×
                </button>


                <span class="yadixa-3d-part-label">
                    قطعه خودرو
                </span>


                <h3 id="yadixa-3d-part-title">
                    —
                </h3>


                <p id="yadixa-3d-part-description">
                    برای مشاهده اطلاعات قطعه، یکی از قسمت‌های
                    خودرو را انتخاب کنید.
                </p>


                <a
                    href="#"
                    id="yadixa-3d-part-link"
                    class="yadixa-3d-part-button"
                >
                    مشاهده قطعات
                </a>

            </div>


            <!-- =========================
                 BOTTOM HINT
            ========================= -->

            <div class="yadixa-3d-hint">

                <span>
                    🖱 انتخاب بخش خودرو
                </span>

                <span>
                    ↔ تغییر نما
                </span>

                <span>
                    ⌕ جستجوی قطعه
                </span>

            </div>


        </div>

    </div>

</section>

    <!-- TRUST -->
<section class="yadixa-trust">
    <div class="yadixa-container yadixa-trust-grid">

        <div class="yadixa-trust-card">
    <span class="yadixa-trust-icon">✓</span>
    <strong>تضمین اصالت کالا</strong>
    <span>خرید قطعات اصل و معتبر</span>
</div>

<div class="yadixa-trust-card">
    <span class="yadixa-trust-icon">→</span>
    <strong>ارسال سریع</strong>
    <span>ارسال به سراسر کشور</span>
</div>

<div class="yadixa-trust-card">
    <span class="yadixa-trust-icon">?</span>
    <strong>پشتیبانی تخصصی</strong>
    <span>راهنمایی برای انتخاب قطعه</span>
</div>

<div class="yadixa-trust-card">
    <span class="yadixa-trust-icon">✓</span>
    <strong>خرید امن</strong>
    <span>پرداخت مطمئن و امن</span>
</div>

    </div>
</section>


    <!-- VEHICLE FINDER -->
    <section id="vehicle-finder" class="yadixa-container yadixa-vehicle-finder">

    <div>
        <span>انتخاب خودرو</span>

        <h2>
            قطعه مناسب خودروی خود را پیدا کنید
        </h2>

        <p>
            برند، مدل و دسته‌بندی قطعه موردنظر را انتخاب کنید.
        </p>
    </div>

    <div class="yadixa-finder-fields">

        <!-- برند خودرو -->
        <select id="yadixa-car-brand">
            <option value="">برند خودرو</option>
            <option value="ایران خودرو">ایران خودرو</option>
            <option value="سایپا">سایپا</option>
            <option value="MVM">MVM</option>
        </select>


        <!-- مدل خودرو -->
        <select id="yadixa-car-model">
            <option value="">مدل خودرو</option>

            <option value="پژو ۲۰۶">
                پژو ۲۰۶
            </option>

            <option value="پژو پارس">
                پژو پارس
            </option>

            <option value="پژو ۴۰۵">
                پژو ۴۰۵
            </option>

            <option value="سمند">
                سمند
            </option>

            <option value="دنا">
                دنا
            </option>

            <option value="پراید">
                پراید
            </option>

            <option value="تیبا">
                تیبا
            </option>
        </select>


        <!-- دسته قطعه -->
        <select id="yadixa-part-category">

            <option value="">
                دسته‌بندی قطعه
            </option>

            <option value="سیستم ترمز">
                سیستم ترمز
            </option>

            <option value="کلاچ">
                کلاچ
            </option>

            <option value="جلوبندی و تعلیق">
                جلوبندی و تعلیق
            </option>

            <option value="قطعات موتور">
                قطعات موتور
            </option>

            <option value="سیستم خنک‌کننده">
                سیستم خنک‌کننده
            </option>

            <option value="فیلتر و مصرفی">
                فیلتر و مصرفی
            </option>

            <option value="قطعات برقی">
                قطعات برقی
            </option>

        </select>


        <button
    type="button"
    id="yadixa-finder-button"
    data-shop-url="<?php echo esc_url(wc_get_page_permalink('shop')); ?>"
>
    جستجوی قطعه
</button>

    </div>

</section>

    <!-- CATEGORIES -->
    <section class="yadixa-section yadixa-categories">

        <div class="yadixa-container">

            <div class="yadixa-section-heading">

                <div>
                    <span>دسته‌بندی محصولات</span>
                    <h2>قطعات خودرو</h2>
                </div>

                <a href="<?php echo esc_url(wc_get_page_permalink('shop')); ?>">
                    مشاهده همه
                </a>

            </div>


            <div class="yadixa-category-grid">

    <!-- قطعات موتور -->
    <a href="<?php echo esc_url(get_term_link('قطعات-موتور', 'product_cat')); ?>"
       class="yadixa-category-card">

        <span class="yadixa-category-icon" aria-hidden="true">
            <svg viewBox="0 0 64 64" fill="none">
                <rect x="10" y="16" width="44" height="32" rx="6"
                      stroke="currentColor" stroke-width="4"/>
                <path d="M18 16V10M28 16V10M38 16V10M48 16V10"
                      stroke="currentColor" stroke-width="4"
                      stroke-linecap="round"/>
                <path d="M20 48V54M44 48V54"
                      stroke="currentColor" stroke-width="4"
                      stroke-linecap="round"/>
                <circle cx="32" cy="32" r="8"
                        stroke="currentColor" stroke-width="4"/>
            </svg>
        </span>

        <strong>قطعات موتور</strong>
        <span>انواع قطعات موتور</span>
    </a>


    <!-- سیستم ترمز -->
    <a href="<?php echo esc_url(get_term_link('سیستم-ترمز', 'product_cat')); ?>"
       class="yadixa-category-card">

        <span class="yadixa-category-icon" aria-hidden="true">
            <svg viewBox="0 0 64 64" fill="none">
                <circle cx="32" cy="32" r="22"
                        stroke="currentColor" stroke-width="4"/>
                <circle cx="32" cy="32" r="8"
                        stroke="currentColor" stroke-width="4"/>
                <path d="M32 10V22M32 42V54"
                      stroke="currentColor" stroke-width="4"
                      stroke-linecap="round"/>
            </svg>
        </span>

        <strong>سیستم ترمز</strong>
        <span>لنت، دیسک و قطعات ترمز</span>
    </a>


    <!-- قطعات برقی -->
    <a href="<?php echo esc_url(get_term_link('قطعات-برقی', 'product_cat')); ?>"
       class="yadixa-category-card">

        <span class="yadixa-category-icon" aria-hidden="true">
            <svg viewBox="0 0 64 64" fill="none">
                <path d="M36 6L16 36H30L26 58L48 28H34L36 6Z"
                      stroke="currentColor"
                      stroke-width="4"
                      stroke-linejoin="round"/>
            </svg>
        </span>

        <strong>قطعات برقی</strong>
        <span>قطعات و تجهیزات برقی</span>
    </a>


    <!-- فیلترها -->
    <a href="<?php echo esc_url(get_term_link('فیلترها', 'product_cat')); ?>"
       class="yadixa-category-card">

        <span class="yadixa-category-icon" aria-hidden="true">
            <svg viewBox="0 0 64 64" fill="none">
                <path d="M12 14H52L38 31V48L26 54V31L12 14Z"
                      stroke="currentColor"
                      stroke-width="4"
                      stroke-linejoin="round"/>
            </svg>
        </span>

        <strong>فیلترها</strong>
        <span>فیلتر هوا، روغن و سوخت</span>
    </a>




    <!-- بدنه خودرو -->
    <a href="<?php echo esc_url(get_term_link('بدنه-خودرو', 'product_cat')); ?>"
       class="yadixa-category-card">

        <span class="yadixa-category-icon" aria-hidden="true">
            <svg viewBox="0 0 64 64" fill="none">
                <path d="M10 38L16 24H48L54 38V50H10V38Z"
                      stroke="currentColor"
                      stroke-width="4"
                      stroke-linejoin="round"/>
                <path d="M20 24L25 16H39L44 24"
                      stroke="currentColor"
                      stroke-width="4"
                      stroke-linejoin="round"/>
                <circle cx="20" cy="48" r="4"
                        stroke="currentColor" stroke-width="4"/>
                <circle cx="44" cy="48" r="4"
                        stroke="currentColor" stroke-width="4"/>
            </svg>
        </span>

        <strong>بدنه خودرو</strong>
        <span>قطعات بدنه و ظاهری</span>
    </a>

        <!-- مصرفی خودرو -->
    <a href="<?php echo esc_url(get_term_link('مصرفی-خودرو', 'product_cat')); ?>"
       class="yadixa-category-card">

        <span class="yadixa-category-icon" aria-hidden="true">
            <svg viewBox="0 0 64 64" fill="none">
                <path d="M14 18H50"
                      stroke="currentColor"
                      stroke-width="4"
                      stroke-linecap="round"/>

                <path d="M18 18V48H46V18"
                      stroke="currentColor"
                      stroke-width="4"
                      stroke-linejoin="round"/>

                <path d="M24 28H40M24 36H40M24 44H34"
                      stroke="currentColor"
                      stroke-width="4"
                      stroke-linecap="round"/>
            </svg>
        </span>

        <strong>مصرفی خودرو</strong>
        <span>فیلترها و قطعات مصرفی</span>

    </a>
</div>

        </div>

    </section>

    <!-- =====================================================
     YADIXA ENGINE STORY
===================================================== -->

<section class="yadixa-engine-story" id="yadixa-engine-story">

    <div class="yadixa-engine-story-inner">

        <!-- TEXT -->
        <div class="yadixa-engine-copy">

            <span class="yadixa-engine-kicker">
                درباره Yadixa
            </span>

            <h2>
                از یک ایده ساده،
                <strong>تا یک تجربه متفاوت</strong>
                در انتخاب قطعات خودرو
            </h2>

            <div class="yadixa-engine-text">

                <p>
                    یادیکسا با یک هدف ساده شکل گرفت؛
                    اینکه پیدا کردن قطعه مناسب خودرو، به جای یک جستجوی پیچیده
                    و زمان‌بر، به تجربه‌ای ساده، شفاف و قابل‌اعتماد تبدیل شود.
                </p>

                <p>
                    در بازار قطعات خودرو، انتخاب یک قطعه فقط به پیدا کردن
                    یک محصول محدود نمی‌شود. مدل خودرو، سیستم مربوط به قطعه،
                    مشخصات فنی، کیفیت، سازگاری و قیمت همگی در انتخاب نهایی
                    اهمیت دارند. Yadixa با همین نگاه شکل گرفت تا این مسیر
                    برای مشتری ساده‌تر شود.
                </p>

                <p>
                    در حال حاضر، Yadixa فعالیت خود را با تمرکز بر قطعات
                    پرکاربرد خودرو آغاز کرده است؛ از سیستم ترمز و کلاچ
                    گرفته تا جلوبندی و تعلیق، قطعات موتور، سیستم خنک‌کننده،
                    فیلتر و قطعات مصرفی و قطعات برقی.
                </p>

                <p>
                    اما مسیر Yadixa به همین محصولات محدود نمی‌شود.
                    هدف این است که با توسعه تدریجی فروشگاه، تنوع قطعات،
                    برندها و اطلاعات فنی افزایش پیدا کند و ابزارهای
                    هوشمندتری برای پیدا کردن قطعه مناسب در اختیار مشتری قرار بگیرد.
                </p>

                <p>
                    یکی از بخش‌های مهم این مسیر، نزدیک‌تر کردن تجربه دیجیتال
                    به خود خودرو است. به همین دلیل، ابزارهای سه‌بعدی و
                    تعاملی Yadixa در حال توسعه هستند تا کاربر بتواند
                    بخش‌های مختلف خودرو و قطعات آن را به شکل بصری مشاهده کند.
                </p>

                


            </div>

        </div>


        <!-- 3D ENGINE -->
        <div class="yadixa-engine-visual">

            <div
                id="yadixa-engine-stage"
                aria-label="مدل سه بعدی موتور خودرو">
            </div>

        </div>

    </div>

</section>

    <!-- PRODUCTS -->
<section id="products" class="yadixa-section">

    <div class="yadixa-container">

        <!-- محصولات منتخب -->
        <div class="yadixa-section-heading">

            <div>
                <span>انتخاب‌های Yadixa</span>
                <h2>محصولات منتخب</h2>
            </div>

            <a href="<?php echo esc_url(wc_get_page_permalink('shop')); ?>">
                مشاهده همه محصولات
            </a>

        </div>

        <?php
        $featured_products = new WP_Query(array(
            'post_type'      => 'product',
            'posts_per_page' => 8,
            'post_status'    => 'publish',
            'orderby'        => 'date',
            'order'          => 'DESC',
        ));
        ?>

        <div class="yadixa-product-rail">

            <?php if ($featured_products->have_posts()) : ?>

                <?php while ($featured_products->have_posts()) : $featured_products->the_post(); ?>

                    <?php
                    global $product;
                    $product = wc_get_product(get_the_ID());

                    if (!$product) {
                        continue;
                    }

                    yadixa_product_card($product);
                    ?>

                <?php endwhile; ?>

                <?php wp_reset_postdata(); ?>

            <?php else : ?>

                <p>هنوز محصولی برای نمایش وجود ندارد.</p>

            <?php endif; ?>

        </div>


        <!-- محصولات با تخفیف -->
        <div class="yadixa-section-heading yadixa-product-row-heading">

            <div>
                <span>پیشنهادهای ویژه</span>
                <h2>فروش ویژه</h2>
            </div>

        </div>

        <?php
        $sale_products = new WP_Query(array(
            'post_type'      => 'product',
            'posts_per_page' => 8,
            'post_status'    => 'publish',
            'meta_query'     => array(
                array(
                    'key'     => '_sale_price',
                    'value'   => '',
                    'compare' => '!=',
                ),
            ),
            'orderby'        => 'date',
            'order'          => 'DESC',
        ));
        ?>

        <div class="yadixa-product-rail">

            <?php if ($sale_products->have_posts()) : ?>

                <?php while ($sale_products->have_posts()) : $sale_products->the_post(); ?>

                    <?php
                    global $product;
                    $product = wc_get_product(get_the_ID());

                    if (!$product) {
                        continue;
                    }

                    yadixa_product_card($product);
                    ?>

                <?php endwhile; ?>

                <?php wp_reset_postdata(); ?>

            <?php else : ?>

                <p class="yadixa-empty-products">
                    در حال حاضر محصولی با تخفیف ویژه وجود ندارد.
                </p>

            <?php endif; ?>

        </div>


        <!-- محصولات بدون تخفیف -->
        <div class="yadixa-section-heading yadixa-product-row-heading">

            <div>
                <span>محصولات عادی فروشگاه</span>
                <h2>سایر محصولات</h2>
            </div>

        </div>

        <?php
        $regular_products = new WP_Query(array(
            'post_type'      => 'product',
            'posts_per_page' => 8,
            'post_status'    => 'publish',
            'meta_query'     => array(
                'relation' => 'OR',

                array(
                    'key'     => '_sale_price',
                    'compare' => 'NOT EXISTS',
                ),

                array(
                    'key'     => '_sale_price',
                    'value'   => '',
                    'compare' => '=',
                ),
            ),
            'orderby'        => 'date',
            'order'          => 'DESC',
        ));
        ?>

        <div class="yadixa-product-rail">

            <?php if ($regular_products->have_posts()) : ?>

                <?php while ($regular_products->have_posts()) : $regular_products->the_post(); ?>

                    <?php
                    global $product;
                    $product = wc_get_product(get_the_ID());

                    if (!$product) {
                        continue;
                    }

                    yadixa_product_card($product);
                    ?>

                <?php endwhile; ?>

                <?php wp_reset_postdata(); ?>

            <?php else : ?>

                <p class="yadixa-empty-products">
                    هنوز محصول بدون تخفیفی برای نمایش وجود ندارد.
                </p>

            <?php endif; ?>

        </div>

    </div>

</section>
    <!-- POPULAR VEHICLES -->
    <section class="yadixa-section">

        <div class="yadixa-container">

            <div class="yadixa-section-heading">

                <div>
                    <span>خودروهای محبوب</span>
                    <h2>قطعات مناسب خودرو</h2>
                </div>

            </div>

            <div class="yadixa-vehicle-grid">

                <div>پژو ۲۰۶</div>
                <div>پراید</div>
                <div>سمند</div>
                <div>دنا</div>
                <div>تیبا</div>
                <div>پژو پارس</div>

            </div>

        </div>

    </section>


    <!-- BRANDS -->
    <section class="yadixa-brands">

        <div class="yadixa-container">

            <span>برندهای معتبر</span>

            <div class="yadixa-brand-list">
                <span>BOSCH</span>
                <span>NGK</span>
                <span>VALEO</span>
                <span>SACHS</span>
                <span>SBK</span>
                <span>بهران</span>
                <span>IKD</span>
                <span>سرکان</span>
            </div>

        </div>

    </section>


    <!-- FAQ -->
    <section class="yadixa-section">

        <div class="yadixa-container">

            <div class="yadixa-section-heading">

                <div>
                    <span>سؤالات متداول</span>
                    <h2>سؤالات شما</h2>
                </div>

            </div>

            <div class="yadixa-faq" id="faq-questions">

                <details>
                    <summary>
                       <span class="yadixa-faq-question">
        چطور قطعه مناسب خودروی خود را پیدا کنم؟
    </span>

    <span class="yadixa-faq-toggle">
        
    </span>
                    </summary>

                    <p>
                        می‌توانید برند، مدل خودرو و دسته‌بندی قطعه را انتخاب کنید
                        و محصولات مرتبط را مشاهده کنید.
                    </p>
                </details>

                <details>
                    <summary>
                        <span class="yadixa-faq-question">
        آیا محصولات ضمانت اصالت دارند؟
    </span>

    <span class="yadixa-faq-toggle">
        
    </span>
                    </summary>

                    <p>
                        اطلاعات اصالت و مشخصات هر محصول در صفحه محصول نمایش داده می‌شود.
                    </p>
                </details>

                <details>
                    <summary>
                        <span class="yadixa-faq-question">
        ارسال سفارش‌ها چگونه انجام می‌شود؟
    </span>

    <span class="yadixa-faq-toggle">
        
    </span>
                    </summary>

                    <p>
                        سفارش‌ها به سراسر کشور ارسال خواهند شد.
                    </p>
                </details>

            </div>

        </div>

    </section>

</main>
<script>
document.addEventListener('DOMContentLoaded', function () {

    const slides = document.querySelectorAll('.yadixa-slide');
    const hero = document.getElementById('yadixa-hero-slider');

    if (!slides.length || !hero) return;

    let currentSlide = 0;
    let autoSlide;

    function showSlide(index) {
        slides.forEach(function (slide, i) {
            slide.classList.toggle('is-active', i === index);
        });

        currentSlide = index;
    }

    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    function startAutoSlide() {
        clearInterval(autoSlide);
        autoSlide = setInterval(nextSlide, 10000);
    }

    hero.addEventListener('click', function (event) {

        /*
         * اگر روی دکمه‌های خود Hero کلیک شد،
         * اسلاید عوض نشود.
         */
        if (event.target.closest('a, button')) {
            return;
        }

        nextSlide();
        startAutoSlide();
    });

    showSlide(0);
    startAutoSlide();

});
</script>
<?php get_footer(); ?>