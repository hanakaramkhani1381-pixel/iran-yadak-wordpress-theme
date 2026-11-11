document.addEventListener('DOMContentLoaded', function () {

    const searchForms = document.querySelectorAll('.yadixa-search-form');

    searchForms.forEach(function (form) {

        const input = form.querySelector('.yadixa-search-input');

        if (!input) {
            return;
        }

        const wrapper =
            form.closest('.yadixa-header-search') ||
            form.closest('.yadixa-mobile-search') ||
            form.parentElement;

        let resultsBox = wrapper.querySelector('.yadixa-live-results');

        if (!resultsBox) {
            resultsBox = document.createElement('div');
            resultsBox.className = 'yadixa-live-results';
            wrapper.appendChild(resultsBox);
        }

        let controller = null;
        let requestNumber = 0;

        input.addEventListener('input', function () {

            const term = input.value.trim();

            requestNumber++;

            const currentRequest = requestNumber;

            /* لغو درخواست قبلی */
            if (controller) {
                controller.abort();
            }

            /* اگر سرچ خالی شد */
            if (!term) {
                resultsBox.innerHTML = '';
                resultsBox.classList.remove('is-visible');
                return;
            }

            controller = new AbortController();

            const formData = new FormData();

            formData.append('action', 'yadixa_live_search');
            formData.append('term', term);

            fetch(window.yadixaLiveSearch.ajaxUrl, {
                method: 'POST',
                body: formData,
                signal: controller.signal
            })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {

                /*
                 * اگر این پاسخ مربوط به آخرین تایپ کاربر نیست،
                 * آن را نمایش نده
                 */
                if (currentRequest !== requestNumber) {
                    return;
                }

                resultsBox.innerHTML = '';

                if (
                    !data.success ||
                    !data.data ||
                    data.data.length === 0
                ) {
                    resultsBox.innerHTML =
                        '<div class="yadixa-no-results">محصولی پیدا نشد</div>';

                    resultsBox.classList.add('is-visible');

                    return;
                }

                data.data.forEach(function (product) {

                    const item = document.createElement('a');

                    item.className = 'yadixa-live-result';
                    item.href = product.url;

                    item.innerHTML = `
                        <img
                            src="${product.image}"
                            alt="${product.title}"
                            loading="lazy"
                        >

                        <div class="yadixa-live-result-info">
                            <strong>${product.title}</strong>
                            <span>${product.price}</span>
                        </div>
                    `;

                    resultsBox.appendChild(item);
                });

                resultsBox.classList.add('is-visible');

            })
            .catch(function (error) {

                /*
                 * Abort شدن درخواست قبلی خطا محسوب نمی‌شود
                 */
                if (error.name === 'AbortError') {
                    return;
                }

                if (currentRequest !== requestNumber) {
                    return;
                }

                resultsBox.innerHTML =
                    '<div class="yadixa-no-results">خطا در جستجو</div>';

                resultsBox.classList.add('is-visible');
            });

        });

        document.addEventListener('click', function (event) {

            if (!form.contains(event.target)) {
                resultsBox.classList.remove('is-visible');
            }

        });

    });

});