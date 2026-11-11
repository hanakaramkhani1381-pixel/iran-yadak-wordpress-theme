document.addEventListener('DOMContentLoaded', function () {

    const button = document.getElementById('yadixa-finder-button');

    if (!button) {
        return;
    }

    const brand = document.getElementById('yadixa-car-brand');
    const model = document.getElementById('yadixa-car-model');
    const category = document.getElementById('yadixa-part-category');

    button.addEventListener('click', function () {

        const selectedBrand = brand.value.trim();
        const selectedModel = model.value.trim();
        const selectedCategory = category.value.trim();

        /*
         * حداقل یک فیلتر باید انتخاب شده باشد
         */
        if (
            !selectedBrand &&
            !selectedModel &&
            !selectedCategory
        ) {
            alert('لطفاً حداقل یک گزینه را انتخاب کنید.');
            return;
        }

        const params = new URLSearchParams();

        /*
         * ویژگی برند خودرو
         */
        if (selectedBrand) {
            params.set('vehicle_brand', selectedBrand);
        }

        /*
         * ویژگی مدل خودرو
         */
        if (selectedModel) {
            params.set('vehicle_model', selectedModel);
        }

        /*
         * دسته‌بندی قطعه
         */
        if (selectedCategory) {
            params.set('product_cat_name', selectedCategory);
        }

        const shopUrl = button.dataset.shopUrl;

        if (!shopUrl) {
            return;
        }

        const targetUrl =
            shopUrl +
            '?' +
            params.toString();

        window.location.href = targetUrl;
    });

});