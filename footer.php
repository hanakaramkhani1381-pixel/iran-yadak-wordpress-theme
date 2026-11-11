
<?php
/**
 * Yadixa Footer
 */
?>

<footer class="yadixa-footer">

    <!-- FOOTER MAIN -->
    <div class="yadixa-footer-main">

        <div class="yadixa-container">

            <div class="yadixa-footer-grid-3">

                <!-- ستون اول: درباره Yadixa -->
                <div class="yadixa-footer-column yadixa-footer-brand">

                    <a href="<?php echo esc_url(home_url('/')); ?>"
                       class="yadixa-footer-logo">
                        <span>Yadixa</span>
                    </a>

                    <h3>ایران یدک</h3>

                    <p class="yadixa-footer-description">
                        یدیکسا یک فروشگاه تخصصی قطعات و لوازم یدکی خودرو است
                        که با هدف فراهم‌کردن خریدی مطمئن، سریع و آسان فعالیت می‌کند.
                        در Yadixa می‌توانید قطعات موردنیاز خودروهای ایرانی را
                        بر اساس خودرو و دسته‌بندی پیدا و آنلاین سفارش دهید.
                    </p>

                    <div class="yadixa-footer-contact-box">

                        <a href="tel:021910020000">
                            <span class="yadixa-footer-contact-icon">☎</span>
                            <span>
                                <small>تماس با ما</small>
                                <strong>۰۲۱-۹۱۰۰۲۰۰۰۰</strong>
                            </span>
                        </a>

                        <div>
                            <span class="yadixa-footer-contact-icon">⌖</span>
                            <span>
                                <small>آدرس</small>
                                <strong>تهران، ایران</strong>
                            </span>
                        </div>

                    </div>

                    <div class="yadixa-footer-socials">

                        <a href="#" aria-label="Instagram">Instagram</a>
                        <a href="#" aria-label="Telegram">Telegram</a>
                        <a href="#" aria-label="WhatsApp">WhatsApp</a>

                    </div>

                </div>


                <!-- ستون دوم: دسترسی سریع -->
                <div class="yadixa-footer-column">

                    <h3 class="yadixa-footer-title">
                        دسترسی سریع
                    </h3>

                    <ul class="yadixa-footer-menu">

                        <li>
                            <a href="<?php echo esc_url(home_url('/')); ?>">
                                صفحه اصلی
                            </a>
                        </li>

                        <li>
                            <a href="<?php echo esc_url(wc_get_page_permalink('shop')); ?>">
                                فروشگاه
                            </a>
                        </li>

                        <li>
                            <a href="#vehicle-finder">
                                انتخاب خودرو
                            </a>
                        </li>

                        <li>
                            <a href="<?php echo esc_url(wc_get_cart_url()); ?>">
                                سبد خرید
                            </a>
                        </li>

                        <li>
                            <a href="<?php echo esc_url(wc_get_checkout_url()); ?>">
                                ثبت سفارش
                            </a>
                        </li>

                        <li>
                            <a href="<?php echo esc_url(wc_get_page_permalink('myaccount')); ?>">
                                حساب کاربری
                            </a>
                        </li>

                    </ul>

                    <h3 class="yadixa-footer-title yadixa-footer-title-second">
                        خدمات مشتریان
                    </h3>

                    <ul class="yadixa-footer-menu">

                        <li>
                            <a href="<?php echo esc_url(wc_get_page_permalink('myaccount')); ?>">
                                پیگیری سفارش
                            </a>
                        </li>

                        <li>
    <a href="<?php echo esc_url(get_permalink(get_page_by_title('سؤالات متداول'))); ?>#faq-questions">
        سوالات متداول
    </a>
</li>

                        <li>
                            <a href="<?php echo esc_url(home_url('/')); ?>">
                                تماس با ما
                            </a>
                        </li>

                    </ul>

                </div>


                <!-- ستون سوم: دسته‌بندی محصولات -->
                <div class="yadixa-footer-column">

                    <h3 class="yadixa-footer-title">
                        دسته‌بندی محصولات
                    </h3>

                    <ul class="yadixa-footer-menu">

                        <li>
                            <a href="<?php echo esc_url(get_term_link('قطعات-موتور', 'product_cat')); ?>">
                                قطعات موتور
                            </a>
                        </li>

                        <li>
                            <a href="<?php echo esc_url(get_term_link('سیستم-ترمز', 'product_cat')); ?>">
                                سیستم ترمز
                            </a>
                        </li>

                        <li>
                            <a href="<?php echo esc_url(get_term_link('قطعات-برقی', 'product_cat')); ?>">
                                قطعات برقی
                            </a>
                        </li>

                        <li>
                            <a href="<?php echo esc_url(get_term_link('فیلترها', 'product_cat')); ?>">
                                فیلترها
                            </a>
                        </li>

                        <li>
                            <a href="<?php echo esc_url(get_term_link('مصرفی-خودرو', 'product_cat')); ?>">
                                مصرفی خودرو
                            </a>
                        </li>

                        <li>
                            <a href="<?php echo esc_url(get_term_link('بدنه-خودرو', 'product_cat')); ?>">
                                بدنه خودرو
                            </a>
                        </li>

                    </ul>

                    <div class="yadixa-footer-guarantee">

                        <span class="yadixa-footer-guarantee-icon">
    <span></span>
</span>

                        <div>
                            <strong>خرید مطمئن از Yadixa</strong>
                            <span>اصالت کالا و پشتیبانی تخصصی</span>
                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>


    <!-- FOOTER FEATURES -->
    <div class="yadixa-footer-features">

        <div class="yadixa-container yadixa-footer-features-grid">

            <div>
                <span>✓</span>
                <strong>تضمین اصالت کالا</strong>
            </div>

            <div>
                <span>→</span>
                <strong>ارسال به سراسر کشور</strong>
            </div>

            <div>
                <span>◈</span>
                <strong>پرداخت امن</strong>
            </div>

            <div>
                <span>?</span>
                <strong>پشتیبانی تخصصی</strong>
            </div>

        </div>

    </div>


    <!-- FOOTER BOTTOM -->
    <div class="yadixa-footer-bottom">

        <div class="yadixa-container yadixa-footer-bottom-inner">

            <p>
                © <?php echo esc_html(date('Y')); ?>
                Yadixa
                — تمامی حقوق محفوظ است.
            </p>

            <div class="yadixa-footer-bottom-links">

                <a href="<?php echo esc_url(home_url('/')); ?>">
                    قوانین و مقررات
                </a>

                <a href="<?php echo esc_url(home_url('/')); ?>">
                    حریم خصوصی
                </a>

            </div>

        </div>

    </div>

</footer>

<?php wp_footer(); ?>

</body>
</html>
