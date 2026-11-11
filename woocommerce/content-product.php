<?php
defined('ABSPATH') || exit;

global $product;

if (!$product || !$product->is_visible()) {
    return;
}
?>

<li <?php wc_product_class('yadixa-shop-product-card', $product); ?>>

    <a
        href="<?php echo esc_url($product->get_permalink()); ?>"
        class="yadixa-shop-product-image"
    >

        <?php if ($product->is_on_sale()) : ?>

            <span class="yadixa-shop-sale-badge">
                تخفیف
            </span>

        <?php endif; ?>


        <?php
        if ($product->get_image_id()) {

            echo wp_get_attachment_image(
                $product->get_image_id(),
                'woocommerce_thumbnail'
            );

        } else {

            echo '<div class="yadixa-shop-no-image">بدون تصویر</div>';

        }
        ?>

    </a>


    <div class="yadixa-shop-product-content">

        <h2 class="yadixa-shop-product-title">

            <a href="<?php echo esc_url($product->get_permalink()); ?>">

                <?php echo esc_html($product->get_name()); ?>

            </a>

        </h2>


        <div class="yadixa-shop-product-price">

            <?php if ($product->is_on_sale()) : ?>

                <del>
                    <?php
                    echo esc_html(
                        number_format(
                            (float) $product->get_regular_price()
                        )
                    );
                    ?>

                    تومان
                </del>

            <?php endif; ?>


            <strong>

                <?php
                echo esc_html(
                    number_format(
                        (float) $product->get_price()
                    )
                );
                ?>

                <small>تومان</small>

            </strong>

        </div>


        <a
            href="<?php echo esc_url($product->add_to_cart_url()); ?>"
            data-quantity="1"
            class="yadixa-shop-add-to-cart"
            data-product_id="<?php echo esc_attr($product->get_id()); ?>"
            data-product_sku="<?php echo esc_attr($product->get_sku()); ?>"
            rel="nofollow"
        >
            افزودن به سبد خرید
        </a>

    </div>

</li>