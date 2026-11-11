<?php

function yadixa_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('woocommerce');

    register_nav_menus(array(
        'primary' => 'منوی اصلی',
    ));
}
add_action('after_setup_theme', 'yadixa_setup');


function yadixa_enqueue_styles() {
    wp_enqueue_style(
        'yadixa-style',
        get_stylesheet_uri(),
        array(),
        '1.0'
    );
}
add_action('wp_enqueue_scripts', 'yadixa_enqueue_styles');
function yadixa_woocommerce_add_to_cart_text() {
    return 'افزودن به سبد خرید';
}

add_filter('woocommerce_product_single_add_to_cart_text', 'yadixa_woocommerce_add_to_cart_text');
add_filter('woocommerce_product_add_to_cart_text', 'yadixa_woocommerce_add_to_cart_text');
/* =========================
   YADIXA - PERSIAN WOOCOMMERCE
========================= */

function yadixa_persian_woocommerce_text($translated, $text, $domain) {

    if ($domain !== 'woocommerce') {
        return $translated;
    }

    $translations = array(
        'View cart'            => 'مشاهده سبد خرید',
        'Cart'                 => 'سبد خرید',
        'Checkout'             => 'تسویه حساب',
        'Proceed to checkout'  => 'ادامه جهت تسویه حساب',
        'Cart totals'          => 'جمع سبد خرید',
        'Subtotal'             => 'جمع جزء',
        'Total'                => 'مبلغ کل',
        'Shipping'             => 'هزینه ارسال',
        'Coupon:'              => 'کد تخفیف:',
        'Apply coupon'         => 'اعمال کد تخفیف',
        'Update cart'          => 'به‌روزرسانی سبد خرید',
        'Remove item'          => 'حذف محصول',
        'Product'              => 'محصول',
        'Price'                => 'قیمت',
        'Quantity'             => 'تعداد',
        'Add to cart'          => 'افزودن به سبد خرید',
        'Continue shopping'   => 'ادامه خرید',
        'Calculate shipping'   => 'محاسبه هزینه ارسال',
        'Enter your address to view shipping options.' => 'برای مشاهده روش‌های ارسال، آدرس خود را وارد کنید.',
        'has been added to your cart.' => 'به سبد خرید شما اضافه شد.',
    );

    return isset($translations[$text])
        ? $translations[$text]
        : $translated;
}

add_filter(
    'gettext',
    'yadixa_persian_woocommerce_text',
    20,
    3
);


/* تبدیل اعداد انگلیسی به فارسی در سایت */

function yadixa_persian_digits_script() {
    if (is_admin()) {
        return;
    }
    ?>
    <script>
    document.addEventListener('DOMContentLoaded', function () {

        function convertPersianDigits(node) {

            if (node.nodeType === Node.TEXT_NODE) {

                node.nodeValue = node.nodeValue.replace(
                    /[0-9]/g,
                    function (digit) {
                        return '۰۱۲۳۴۵۶۷۸۹'[digit];
                    }
                );

            } else {

                node.childNodes.forEach(convertPersianDigits);

            }
        }

        convertPersianDigits(document.body);

    });
    </script>
    <?php
}

add_action('wp_footer', 'yadixa_persian_digits_script', 100);

/* =========================
   YADIXA - LIVE PRODUCT SEARCH
========================= */
function yadixa_live_product_search() {

    if (empty($_POST['term'])) {
        wp_send_json_success(array());
    }

    $term = sanitize_text_field(wp_unslash($_POST['term']));

    /*
     * جستجوی سریع محصولات
     * فقط یک Query اصلی
     */
    $products = new WP_Query(array(
        'post_type'              => 'product',
        'post_status'            => 'publish',
        'posts_per_page'         => 6,
        's'                      => $term,
        'orderby'                => 'relevance',
        'order'                  => 'DESC',
        'no_found_rows'          => true,
        'ignore_sticky_posts'    => true,
        'update_post_meta_cache' => false,
        'update_post_term_cache' => false,
    ));

    $results = array();

    if ($products->have_posts()) {

        while ($products->have_posts()) {

            $products->the_post();

            $product = wc_get_product(get_the_ID());

            if (!$product) {
                continue;
            }

            $image = get_the_post_thumbnail_url(
                get_the_ID(),
                'woocommerce_thumbnail'
            );

            $results[] = array(
                'id'    => get_the_ID(),
                'title' => get_the_title(),
                'price' => $product->get_price_html(),
                'image' => $image ?: wc_placeholder_img_src(),
                'url'   => get_permalink(),
            );
        }
    }

    wp_reset_postdata();

    wp_send_json_success($results);
}
add_action(
    'wp_ajax_yadixa_live_search',
    'yadixa_live_product_search'
);

add_action(
    'wp_ajax_nopriv_yadixa_live_search',
    'yadixa_live_product_search'
);


/* ارسال آدرس AJAX به جاوااسکریپت */

function yadixa_live_search_script() {

    if (is_admin()) {
        return;
    }

    ?>
    <script>
    window.yadixaLiveSearch = {
        ajaxUrl: "<?php echo esc_url(admin_url('admin-ajax.php')); ?>"
    };
    </script>
    <?php
}

add_action('wp_head', 'yadixa_live_search_script');
/* =========================
   YADIXA - LIVE SEARCH JS
========================= */

function yadixa_live_search_assets() {

    if (is_admin()) {
        return;
    }

    wp_enqueue_script(
        'yadixa-live-search',
        get_template_directory_uri() . '/assets/js/live-search.js',
        array(),
        '1.0',
        true
    );

}

add_action('wp_enqueue_scripts', 'yadixa_live_search_assets');

/* =========================
   YADIXA - HERO SLIDER JS
========================= */

function yadixa_hero_slider_assets() {

    if (is_admin()) {
        return;
    }

    wp_enqueue_script(
        'yadixa-hero-slider',
        get_template_directory_uri() . '/assets/js/hero-slider.js',
        array(),
        '1.0',
        true
    );
}

add_action('wp_enqueue_scripts', 'yadixa_hero_slider_assets');
/* =========================
   YADIXA PRODUCT CARD
========================= */

function yadixa_product_card($product) {

    if (!$product || !$product->exists()) {
        return;
    }

    $product_id    = $product->get_id();
    $regular_price = $product->get_regular_price();
    $sale_price    = $product->get_sale_price();
    $current_price = $product->get_price();

    $discount = 0;

    if (
        $product->is_on_sale() &&
        $regular_price &&
        $sale_price &&
        (float) $regular_price > 0
    ) {
        $discount = round(
            (($regular_price - $sale_price) / $regular_price) * 100
        );
    }
    ?>

    <article class="yadixa-product-card">

        <a
            href="<?php echo esc_url($product->get_permalink()); ?>"
            class="yadixa-product-image"
        >

            <?php if ($discount > 0) : ?>

                <span class="yadixa-sale-badge">
                    <?php echo esc_html($discount); ?>٪ تخفیف
                </span>

            <?php endif; ?>


            <?php
            if ($product->get_image_id()) {

                echo wp_get_attachment_image(
                    $product->get_image_id(),
                    'woocommerce_thumbnail'
                );

            } else {

                echo '<div class="yadixa-product-no-image">بدون تصویر</div>';

            }
            ?>

        </a>


        <div class="yadixa-product-info">

            <span class="yadixa-product-stock">

                <?php if ($product->is_in_stock()) : ?>

                    موجود در انبار

                <?php else : ?>

                    ناموجود

                <?php endif; ?>

            </span>


            <h3 class="yadixa-product-name">

                <a href="<?php echo esc_url($product->get_permalink()); ?>">

                    <?php echo esc_html($product->get_name()); ?>

                </a>

            </h3>


            <div class="yadixa-product-price">

                <?php if ($product->is_on_sale() && $regular_price) : ?>

                    <del>
                        <?php echo esc_html(number_format((float) $regular_price)); ?>
                    </del>

                <?php endif; ?>


                <strong>

                    <?php echo esc_html(number_format((float) $current_price)); ?>

                    <small>تومان</small>

                </strong>

            </div>


            <a
                href="<?php echo esc_url($product->add_to_cart_url()); ?>"
                class="yadixa-add-to-cart"
                data-quantity="1"
                data-product_id="<?php echo esc_attr($product_id); ?>"
            >
                افزودن به سبد خرید
            </a>

        </div>

    </article>

    <?php
}
function yadixa_vehicle_finder_assets() {

    if (is_admin()) {
        return;
    }

    wp_enqueue_script(
        'yadixa-vehicle-finder',
        get_template_directory_uri() . '/assets/js/vehicle-finder.js',
        array(),
        '1.0',
        true
    );
}

add_action(
    'wp_enqueue_scripts',
    'yadixa_vehicle_finder_assets'
);
function yadixa_vehicle_finder_filter($query) {

    if (
        is_admin() ||
        !$query->is_main_query() ||
        !is_shop()
    ) {
        return;
    }

    $tax_query = array();

    /*
     * دسته‌بندی قطعه
     */
    if (!empty($_GET['product_cat_name'])) {

        $category_name = sanitize_text_field(
            wp_unslash($_GET['product_cat_name'])
        );

        $category = get_term_by(
            'name',
            $category_name,
            'product_cat'
        );

        if ($category && !is_wp_error($category)) {

            $tax_query[] = array(
                'taxonomy' => 'product_cat',
                'field'    => 'term_id',
                'terms'    => $category->term_id,
            );
        }
    }

    /*
     * برند خودرو
     */
    if (!empty($_GET['vehicle_brand'])) {

        $brand = sanitize_text_field(
            wp_unslash($_GET['vehicle_brand'])
        );

        $tax_query[] = array(
            'taxonomy' => 'pa_vehicle_brand',
            'field'    => 'name',
            'terms'    => $brand,
        );
    }

    /*
     * مدل خودرو
     */
    if (!empty($_GET['vehicle_model'])) {

        $model = sanitize_text_field(
            wp_unslash($_GET['vehicle_model'])
        );

        $tax_query[] = array(
            'taxonomy' => 'pa_vehicle_model',
            'field'    => 'name',
            'terms'    => $model,
        );
    }

    /*
     * اعمال همه فیلترها به صورت همزمان
     */
    if (!empty($tax_query)) {

        if (count($tax_query) > 1) {
            $tax_query['relation'] = 'AND';
        }

        $query->set('tax_query', $tax_query);
    }
}

add_action(
    'pre_get_posts',
    'yadixa_vehicle_finder_filter'
);
add_filter('the_title', function ($title, $post_id) {

    if (is_admin()) {
        return $title;
    }

    if (function_exists('is_account_page') && is_account_page()) {
        if (get_the_ID() === $post_id) {
            return 'حساب من';
        }
    }

    return $title;

}, 10, 2);
function yadixa_load_3d_car() {

    wp_enqueue_script(
        'yadixa-3d-car',
        get_template_directory_uri() . '/assets/js/yadixa-3d-car.js',
        array(),
        '1.0.0',
        true
    );

}

add_action(
    'wp_enqueue_scripts',
    'yadixa_load_3d_car'
);
/* =========================
   YADIXA ENGINE STORY JS
========================= */

function yadixa_load_engine_story() {

    wp_enqueue_script(
        'yadixa-meshopt-decoder',
        get_template_directory_uri() . '/meshopt_decoder.js',
        array(),
        '1.0.0',
        true
    );

    wp_enqueue_script(
        'yadixa-engine-story',
        get_template_directory_uri() . '/yadixa-engine-story.js',
        array('yadixa-meshopt-decoder'),
        '1.0.4',
        true
    );

}

add_action(
    'wp_enqueue_scripts',
    'yadixa_load_engine_story'
);