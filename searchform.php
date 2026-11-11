<?php
$search_query = get_search_query();
?>

<form role="search" method="get" class="yadixa-search-form" action="<?php echo esc_url(home_url('/')); ?>">
    <input type="hidden" name="post_type" value="product">
    

    <input
        type="search"
        class="yadixa-search-input"
        name="s"
        value="<?php echo esc_attr($search_query); ?>"
        placeholder="جستجوی قطعه، کد فنی یا نام خودرو..."
        aria-label="جستجوی محصولات"
    >

    <button type="submit" class="yadixa-search-button">
        جستجو
    </button>

</form>