<?php
defined('ABSPATH') || exit;

get_header();

while (have_posts()) :
    the_post();

    global $product;

    if (!$product) {
        $product = wc_get_product(get_the_ID());
    }
?>

<main class="yadixa-single-product">

    <div class="yadixa-container">

        <div class="yadixa-product-breadcrumb">
            <a href="<?php echo esc_url(home_url('/')); ?>">خانه</a>
            <span> / </span>
            <a href="<?php echo esc_url(wc_get_page_permalink('shop')); ?>">فروشگاه</a>
            <span> / </span>
            <span><?php echo esc_html($product->get_name()); ?></span>
        </div>

        <div class="yadixa-single-product-grid">

            <!-- تصویر محصول -->
            <div class="yadixa-single-product-image">

                <?php if ($product->is_on_sale()) : ?>
                    <span class="yadixa-single-sale">
                        تخفیف ویژه
                    </span>
                <?php endif; ?>

                <?php
                if (has_post_thumbnail()) {
                    echo get_the_post_thumbnail(
                        get_the_ID(),
                        'large'
                    );
                } else {
                    echo '<div class="yadixa-single-no-image">بدون تصویر</div>';
                }
                ?>

            </div>


            <!-- اطلاعات محصول -->
            <div class="yadixa-single-product-info">

                <span class="yadixa-single-stock">
                    <?php echo $product->is_in_stock() ? '✓ موجود در انبار' : '✕ ناموجود'; ?>
                </span>

                <h1>
                    <?php echo esc_html($product->get_name()); ?>
                </h1>

                <?php if ($product->get_short_description()) : ?>

                    <div class="yadixa-single-short-description">
                        <?php echo wp_kses_post($product->get_short_description()); ?>
                    </div>

                <?php endif; ?>


                <!-- قیمت -->
                <div class="yadixa-single-price">

                    <?php if ($product->is_on_sale() && $product->get_regular_price()) : ?>

                        <del>
                            <?php echo esc_html(number_format((float) $product->get_regular_price())); ?>
                            تومان
                        </del>

                    <?php endif; ?>

                    <strong>
                        <?php echo esc_html(number_format((float) $product->get_price())); ?>
                        <small>تومان</small>
                    </strong>

                </div>


                <!-- افزودن به سبد -->
                <div class="yadixa-single-cart">

                    <?php
                    woocommerce_template_single_add_to_cart();
                    ?>

                </div>


                <!-- ویژگی‌های کلی -->
                <div class="yadixa-product-features">

                    <div>
                        <strong>✓</strong>
                        <span>تضمین اصالت کالا</span>
                    </div>

                    <div>
                        <strong>🚚</strong>
                        <span>ارسال سریع</span>
                    </div>

                    <div>
                        <strong>🔒</strong>
                        <span>پرداخت امن</span>
                    </div>

                </div>

            </div>

        </div>


        <!-- توضیحات کامل -->
        <?php if (get_the_content()) : ?>

            <section class="yadixa-product-description">

                <h2>توضیحات محصول</h2>

                <div>
                    <?php the_content(); ?>
                </div>

            </section>

        <?php endif; ?>

    </div>

</main>

<?php
endwhile;

get_footer();