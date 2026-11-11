<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<div class="yadixa-site">

    <div class="yadixa-topbar">
        <div class="yadixa-container yadixa-topbar-inner">

            <div class="yadixa-topbar-right">
                <span>☎ ۰۲۱-۹۱۰۰۲۰۰۰۰</span>
                <span class="yadixa-divider">|</span>
                <span>ارسال رایگان سفارش‌های بالای ۲ میلیون تومان</span>
            </div>

            <div class="yadixa-topbar-left">
                <a href="<?php echo esc_url(wc_get_account_endpoint_url('orders')); ?>">
                    پیگیری سفارش
                </a>

                <a href="<?php echo esc_url(get_permalink(get_page_by_path('راهنمای-خرید'))); ?>">
    راهنمای خرید
</a>
            </div>

        </div>
    </div>

    <header class="yadixa-header">

    <div class="yadixa-container yadixa-header-inner">

        <!-- LOGO -->
        <a class="yadixa-logo" href="<?php echo esc_url(home_url('/')); ?>">

            <div class="yadixa-logo-icon">⚙</div>

            <div class="yadixa-logo-text">
                <strong>یادیکسا</strong>
                <small>Yadixa · قطعات اصلی خودرو</small>
            </div>

        </a>


        <!-- SEARCH DESKTOP -->
        <div class="yadixa-header-search">
            <?php get_search_form(); ?>
        </div>


        <!-- NAV -->
        <nav class="yadixa-desktop-nav">

            <a href="<?php echo esc_url(wc_get_page_permalink('shop')); ?>">
                محصولات
            </a>

          <a href="<?php echo esc_url(home_url('/دستهبندی-محصولات/')); ?>">
    دسته‌بندی
</a>

            <a href="<?php echo esc_url(wc_get_page_permalink('myaccount')); ?>">
                حساب کاربری
            </a>

        </nav>


        <!-- ACTIONS -->
        <div class="yadixa-header-actions">

            <!-- ACCOUNT -->
            <a
                class="yadixa-action-icon"
                href="<?php echo esc_url(wc_get_page_permalink('myaccount')); ?>"
                aria-label="حساب کاربری"
            >
                👤
            </a>


            <!-- FAVORITES -->
            <a
                class="yadixa-action-icon"
                href="#"
                aria-label="علاقه‌مندی‌ها"
            >
                ♡
            </a>


            <!-- CART -->
            <a
                class="yadixa-cart-button"
                href="<?php echo esc_url(wc_get_cart_url()); ?>"
                aria-label="سبد خرید"
            >

                <span class="yadixa-cart-icon" aria-hidden="true">
                    🛒
                </span>

                <span class="yadixa-cart-label">
                    سبد خرید
                </span>

                <b class="yadixa-cart-count">
                    <?php echo WC()->cart ? WC()->cart->get_cart_contents_count() : 0; ?>
                </b>

            </a>

        </div>

    </div>


    <!-- MOBILE SEARCH -->
    <div class="yadixa-mobile-search yadixa-container">

        <?php get_search_form(); ?>

    </div>

</header>