<?php
defined('ABSPATH') || exit;

get_header();
?>

<main class="yadixa-shop-page">

    <div class="yadixa-container">

        <!-- مسیر صفحه -->
        <div class="yadixa-shop-breadcrumb">
            <a href="<?php echo esc_url(home_url('/')); ?>">
                خانه
            </a>

            <span>/</span>

            <span>
                فروشگاه
            </span>
        </div>


        <!-- هدر فروشگاه -->
        <div class="yadixa-shop-header">

            <div>
                <h1>
                    فروشگاه
                </h1>

                <p>
                    مجموعه‌ای از قطعات یدکی خودرو با کیفیت و ضمانت اصالت
                </p>
            </div>

            <div class="yadixa-shop-count">
                <?php
                global $wp_query;

                $total_products = $wp_query->found_posts;

                echo esc_html(
                    number_format_i18n($total_products)
                );
                ?>

                محصول
            </div>

        </div>


        <!-- نوار مرتب‌سازی -->
        <div class="yadixa-shop-toolbar">

            <div class="yadixa-shop-result-count">
                <?php
                woocommerce_result_count();
                ?>
            </div>

            <div class="yadixa-shop-ordering">
                <?php
                woocommerce_catalog_ordering();
                ?>
            </div>

        </div>


        <!-- محصولات -->
        <?php if (woocommerce_product_loop()) : ?>

            <?php
            woocommerce_product_loop_start();
            ?>

            <?php while (have_posts()) : ?>

                <?php
                the_post();

                do_action('woocommerce_shop_loop');

                wc_get_template_part('content', 'product');
                ?>

            <?php endwhile; ?>

            <?php
            woocommerce_product_loop_end();
            ?>


            <!-- صفحه‌بندی -->
            <div class="yadixa-shop-pagination">

                <?php
                do_action('woocommerce_after_shop_loop');
                ?>

            </div>


        <?php else : ?>

            <?php
            do_action('woocommerce_no_products_found');
            ?>

        <?php endif; ?>

    </div>

</main>

<?php
get_footer();