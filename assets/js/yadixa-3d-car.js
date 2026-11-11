(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {

        const stage = document.getElementById("yadixa-3d-stage");

        if (!stage) {
            console.warn("YADIXA 3D: stage not found.");
            return;
        }

        console.log("YADIXA 3D: starting clean Audi explorer...");

        /* =========================================================
           CONFIG
        ========================================================= */

        const MODEL_URL =
            "/wordpress/wp-content/themes/yadixa/assets/models/2006_audi_s4_1_by_get3dmodels.glb";

        const THREE_URL =
            "https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js";

        const ORBIT_URL =
            "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js";

        const GLTF_URL =
            "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js";


        /* =========================================================
           CLEAN OLD CONTENT
           ========================================================= */

        /*
         * مهم:
         * اگر اجرای قبلی Canvas یا ماشین قدیمی ساخته باشد،
         * همه چیز از داخل Stage پاک می‌شود.
         */

        stage.innerHTML = "";

        stage.style.background = "transparent";
        stage.style.backgroundColor = "transparent";
        stage.style.boxShadow = "none";
        stage.style.border = "none";
        stage.style.overflow = "hidden";
        stage.style.position = "relative";
        stage.style.minHeight = "520px";


        /* =========================================================
           SCRIPT LOADER
           ========================================================= */

        function loadScript(src, callback, failed) {

            const existing = document.querySelector(
                'script[src="' + src + '"]'
            );

            if (existing) {

                if (
                    src.indexOf("three.min.js") !== -1 &&
                    window.THREE
                ) {
                    callback();
                    return;
                }

                if (
                    src.indexOf("OrbitControls") !== -1 &&
                    window.THREE &&
                    THREE.OrbitControls
                ) {
                    callback();
                    return;
                }

                if (
                    src.indexOf("GLTFLoader") !== -1 &&
                    window.THREE &&
                    THREE.GLTFLoader
                ) {
                    callback();
                    return;
                }
            }

            const script = document.createElement("script");

            script.src = src;
            script.async = false;

            script.onload = function () {
                callback();
            };

            script.onerror = function () {

                console.error(
                    "YADIXA 3D: failed to load:",
                    src
                );

                if (failed) {
                    failed();
                }
            };

            document.head.appendChild(script);
        }


        /* =========================================================
           ERROR BOX
           ========================================================= */

        function showError(title, message) {

            stage.innerHTML = "";

            const box = document.createElement("div");

            box.style.position = "absolute";
            box.style.left = "50%";
            box.style.top = "50%";
            box.style.transform = "translate(-50%, -50%)";
            box.style.zIndex = "20";
            box.style.padding = "22px 28px";
            box.style.maxWidth = "420px";
            box.style.width = "calc(100% - 40px)";
            box.style.background = "rgba(20,22,29,.96)";
            box.style.color = "#fff";
            box.style.borderRadius = "16px";
            box.style.direction = "rtl";
            box.style.textAlign = "center";
            box.style.fontFamily = "inherit";
            box.style.lineHeight = "1.9";

            box.innerHTML =
                "<strong style='font-size:17px;'>" +
                title +
                "</strong>" +
                "<br><br>" +
                message;

            stage.appendChild(box);
        }


        /* =========================================================
           LOAD THREE
           ========================================================= */

        function loadThree() {

            if (window.THREE) {

                console.log(
                    "YADIXA 3D: THREE already loaded:",
                    THREE.REVISION
                );

                loadOrbit();
                return;
            }

            loadScript(
                THREE_URL,

                function () {

                    console.log(
                        "YADIXA 3D: THREE loaded:",
                        THREE.REVISION
                    );

                    loadOrbit();
                },

                function () {

                    showError(
                        "خطا در بارگذاری موتور سه‌بعدی",
                        "Three.js بارگذاری نشد."
                    );
                }
            );
        }


        /* =========================================================
           LOAD ORBIT
           ========================================================= */

        function loadOrbit() {

            if (
                window.THREE &&
                THREE.OrbitControls
            ) {

                loadGLTF();
                return;
            }

            loadScript(
                ORBIT_URL,

                function () {

                    if (!THREE.OrbitControls) {

                        showError(
                            "خطا در کنترل خودرو",
                            "OrbitControls بارگذاری نشد."
                        );

                        return;
                    }

                    console.log(
                        "YADIXA 3D: OrbitControls loaded."
                    );

                    loadGLTF();
                },

                function () {

                    showError(
                        "خطا در کنترل خودرو",
                        "OrbitControls بارگذاری نشد."
                    );
                }
            );
        }


        /* =========================================================
           LOAD GLTF
           ========================================================= */

        function loadGLTF() {

            if (
                window.THREE &&
                THREE.GLTFLoader
            ) {

                createScene();
                return;
            }

            loadScript(
                GLTF_URL,

                function () {

                    if (!THREE.GLTFLoader) {

                        showError(
                            "خطا در بارگذاری مدل",
                            "GLTFLoader بارگذاری نشد."
                        );

                        return;
                    }

                    console.log(
                        "YADIXA 3D: GLTFLoader loaded."
                    );

                    createScene();
                },

                function () {

                    showError(
                        "خطا در بارگذاری مدل",
                        "GLTFLoader بارگذاری نشد."
                    );
                }
            );
        }


        /* =========================================================
           CREATE SCENE
           ========================================================= */

        function createScene() {

            /*
             * دوباره Stage را تمیز می‌کنیم.
             * این باعث می‌شود هیچ Canvas قبلی باقی نماند.
             */

            stage.innerHTML = "";

            const width =
                Math.max(stage.clientWidth, 320);

            const height =
                Math.max(stage.clientHeight, 520);


            /* =====================================================
               SCENE
            ===================================================== */

            const scene = new THREE.Scene();

            scene.background = null;


            /* =====================================================
               CAMERA
            ===================================================== */

            const camera =
                new THREE.PerspectiveCamera(
                    40,
                    width / height,
                    0.01,
                    1000
                );

            camera.position.set(
                7.2,
                3.0,
                7.2
            );


            /* =====================================================
               RENDERER
            ===================================================== */

            const renderer =
                new THREE.WebGLRenderer({
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance"
                });

            renderer.setPixelRatio(
                Math.min(
                    window.devicePixelRatio || 1,
                    2
                )
            );

            renderer.setSize(
                width,
                height,
                false
            );

            renderer.setClearColor(
                0x000000,
                0
            );

            renderer.shadowMap.enabled = false;

            if (
                typeof THREE.sRGBEncoding !== "undefined"
            ) {

                renderer.outputEncoding =
                    THREE.sRGBEncoding;
            }

            renderer.domElement.style.display = "block";
            renderer.domElement.style.width = "100%";
            renderer.domElement.style.height = "100%";
            renderer.domElement.style.background = "transparent";
            renderer.domElement.style.touchAction = "none";
            renderer.domElement.style.cursor = "grab";

            stage.appendChild(
                renderer.domElement
            );


            /* =====================================================
               ORBIT CONTROLS
               
               کاربر خودش دوربین را کنترل می‌کند.
               انتخاب قطعه هیچ تغییری در دوربین نمی‌دهد.
            ===================================================== */

            const controls =
                new THREE.OrbitControls(
                    camera,
                    renderer.domElement
                );

            controls.enableDamping = true;
            controls.dampingFactor = 0.055;

            controls.enablePan = false;

            controls.rotateSpeed = 0.55;
            controls.zoomSpeed = 0.65;

            controls.minDistance = 3.2;
            controls.maxDistance = 14;

            controls.minPolarAngle = 0.45;
            controls.maxPolarAngle =
                Math.PI / 2.02;

            controls.target.set(
                0,
                1.15,
                0
            );

            controls.update();


            /* =====================================================
               LIGHTING
               
               کاملاً خنثی.
               هیچ نور قرمز یا محیط قرمز نداریم.
            ===================================================== */

            const ambient =
                new THREE.HemisphereLight(
                    0xffffff,
                    0x555555,
                    1.65
                );

            scene.add(ambient);


            const keyLight =
                new THREE.DirectionalLight(
                    0xffffff,
                    2.15
                );

            keyLight.position.set(
                5,
                8,
                7
            );

            scene.add(keyLight);


            const fillLight =
                new THREE.DirectionalLight(
                    0xffffff,
                    0.9
                );

            fillLight.position.set(
                -6,
                4,
                5
            );

            scene.add(fillLight);


            const rimLight =
                new THREE.DirectionalLight(
                    0xffffff,
                    0.65
                );

            rimLight.position.set(
                -4,
                5,
                -7
            );

            scene.add(rimLight);


            /* =====================================================
               MODEL
            ===================================================== */

            let car = null;

            const loader =
                new THREE.GLTFLoader();


            /* =====================================================
               PART DATA
            ===================================================== */

            const knownParts = {

    Object_8: {
        title: "چراغ عقب",
        description:
            "چراغ عقب خودرو وظیفه تأمین دید و افزایش ایمنی خودرو در هنگام رانندگی را بر عهده دارد و شامل مجموعه چراغ‌های بخش انتهایی بدنه است."
    },

    Object_10: {
        title: "قطعه جانبی چراغ جلو",
        description:
            "این بخش از مجموعه قطعات اطراف چراغ جلو و قسمت جلویی بدنه خودرو است."
    },

    Object_13: {
        title: "لاستیک",
        description:
            "لاستیک خودرو وظیفه ایجاد تماس مناسب با سطح جاده و انتقال نیرو، ترمز و فرمان به سطح مسیر را بر عهده دارد."
    },

    Object_16: {
        title: "اگزوز",
        description:
            "سیستم اگزوز وظیفه انتقال و هدایت گازهای حاصل از احتراق موتور و کاهش صدا و آلایندگی خروجی را بر عهده دارد."
    },

    Object_18: {
        title: "ستون بدنه",
        description:
            "ستون بدنه بخشی از ساختار اصلی خودرو است که میان بخش‌های شیشه‌ای جانبی و عقب قرار گرفته و به استحکام کابین کمک می‌کند."
    },

    Object_20: {
        title: "مجموعه جلوی خودرو",
        description:
            "این بخش شامل قسمت‌هایی از مجموعه جلویی خودرو است که در ساختار و ظاهر بخش جلوی بدنه نقش دارند."
    },

    Object_26: {
        title: "مجموعه قطعات جلویی",
        description:
            "این قسمت شامل چند قطعه کوچک و جزئیات ظاهری بخش جلویی خودرو، از جمله قسمت‌هایی اطراف نشان و اجزای تزئینی است."
    },

    Object_29: {
        title: "دیسک ترمز",
        description:
            "دیسک ترمز یکی از اجزای اصلی سیستم ترمز است که همراه با لنت و کالیپر برای ایجاد اصطکاک و کاهش سرعت خودرو عمل می‌کند."
    },

    Object_32: {
        title: "قطعات پلاستیکی بدنه",
        description:
            "این بخش از مجموعه قطعات پلاستیکی خودرو است که در قسمت‌های مختلف بدنه و ساختار بیرونی خودرو استفاده شده‌اند."
    },

    Object_35: {
        title: "کف خودرو",
        description:
            "کف خودرو بخش زیرین ساختار بدنه است که اجزای مختلف خودرو روی آن قرار گرفته یا به آن متصل می‌شوند."
    },

    Object_38: {
        title: "چراغ جلو",
        description:
            "چراغ جلو برای روشنایی مسیر و افزایش دید راننده در شرایط مختلف رانندگی استفاده می‌شود."
    },

    Object_41: {
        title: "گارد و قاب چراغ جلو",
        description:
            "این بخش مربوط به قسمت‌های اطراف چراغ جلو و قاب محافظ آن در نمای جلویی خودرو است."
    },

    Object_44: {
        title: "کاپوت",
        description:
            "کاپوت پوشش متحرک بخش جلویی خودرو است که از محفظه موتور محافظت می‌کند و امکان دسترسی به اجزای موتور را فراهم می‌سازد."
    },

    Object_46: {
        title: "مجموعه آینه‌ها",
        description:
            "این مجموعه شامل آینه‌های جانبی و بخش‌هایی از تجهیزات دید اطراف خودرو است که برای افزایش میدان دید راننده استفاده می‌شوند."
    },

    Object_49: {
        title: "رینگ چرخ",
        description:
            "رینگ بخش مرکزی مجموعه چرخ است که لاستیک روی آن نصب می‌شود و نقش مهمی در انتقال نیرو و پایداری مجموعه چرخ دارد."
    },

    Object_52: {
        title: "پلاک خودرو",
        description:
            "پلاک خودرو برای شناسایی رسمی وسیله نقلیه استفاده می‌شود و در بخش بیرونی بدنه نصب شده است."
    },

    Object_55: {
        title: "مجموعه داخلی خودرو",
        description:
            "این بخش شامل قسمت‌هایی از ساختار داخلی کابین و اجزای قابل مشاهده داخل خودرو است."
    },

    Object_60: {
        title: "مجموعه شیشه و تجهیزات دید",
        description:
            "این بخش شامل قسمت‌هایی از شیشه‌ها، آینه‌های دید و تجهیزات مرتبط با میدان دید راننده است."
    },

    Object_63: {
        title: "قطعه زیرین اگزوز",
        description:
            "این قطعه پلاستیکی در قسمت زیرین و بین خروجی‌های اگزوز قرار گرفته و بخشی از مجموعه زیرین بخش عقب خودرو است."
    }

};
            /* =====================================================
               PANEL
            ===================================================== */

            const panel =
                document.getElementById(
                    "yadixa-3d-part-panel"
                );

            const title =
                document.getElementById(
                    "yadixa-3d-part-title"
                );

            const description =
                document.getElementById(
                    "yadixa-3d-part-description"
                );

            const link =
                document.getElementById(
                    "yadixa-3d-part-link"
                );

            const close =
                document.getElementById(
                    "yadixa-3d-panel-close"
                );


            function hidePanel() {

                if (!panel) {
                    return;
                }

                panel.classList.remove(
                    "is-visible"
                );

                panel.hidden = true;
                panel.style.display = "none";
            }


            function showPanel(info) {

                if (!panel) {
                    return;
                }

                if (title) {
                    title.textContent =
                        info.title;
                }

                if (description) {
                    description.textContent =
                        info.description;
                }

                if (link) {

                    link.href =
                        "/wordpress/shop/";

                    link.textContent =
                        "مشاهده قطعات مرتبط";
                }

                panel.hidden = false;
                panel.style.display = "block";

                panel.classList.add(
                    "is-visible"
                );
            }


            hidePanel();


            if (close) {

                close.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();

                        deselectCurrent();
                    }
                );
            }


            /* =====================================================
               PART INFO
            ===================================================== */

            function getPartInfo(object) {

    if (!object) {
        return {
            title: "قطعه خودرو",
            description:
                "بخشی از مدل سه‌بعدی خودرو."
        };
    }

    const objectName =
        object.name || "Unknown";

    /*
     * اگر این Mesh را در knownParts داریم،
     * اطلاعات فارسی واقعی آن را برگردان.
     */
    if (
        knownParts[objectName]
    ) {
        return knownParts[objectName];
    }

    /*
     * برای Meshهایی که هنوز نام‌گذاری نشده‌اند،
     * هرگز Object_XX را به مشتری نشان نده.
     */
    return {
        title: "قطعه خودرو",
        description:
            "این بخش از مدل سه‌بعدی خودرو انتخاب شده است."
    };
}
            /* =====================================================
               MESH PREPARATION
            ===================================================== */

            let meshCount = 0;

            function prepareMesh(object) {

                if (!object.isMesh) {
                    return;
                }

                meshCount++;

                object.castShadow = false;
                object.receiveShadow = false;
                object.frustumCulled = false;

                /*
                 * موقعیت اصلی قطعه
                 */

                object.userData.yadixaOriginalPosition =
                    object.position.clone();

                /*
                 * وضعیت حرکت
                 */

                object.userData.yadixaProgress = 0;
                object.userData.yadixaTarget = 0;

                object.userData.yadixaDirection =
                    new THREE.Vector3();

                object.userData.yadixaDetachDistance =
                    0.55;

                /*
                 * متریال اصلی را نگه می‌داریم.
                 */

                object.userData.yadixaOriginalMaterial =
                    object.material;

                object.userData.yadixaGlowMaterial =
                    null;
            }


            /* =====================================================
               SOFT NEUTRAL HIGHLIGHT
               
               نه قرمز.
               نه تغییر رنگ شدید.
               فقط یک Highlight بسیار ملایم.
            ===================================================== */

            function applySoftHighlight(object) {

                const original =
                    object.userData
                        .yadixaOriginalMaterial;

                if (!original) {
                    return;
                }

                /*
                 * اگر قبلاً Highlight داریم،
                 * دوباره Clone نمی‌کنیم.
                 */

                if (
                    object.userData
                        .yadixaGlowMaterial
                ) {
                    return;
                }


                if (Array.isArray(original)) {

                    const cloned =
                        original.map(
                            function (material) {

                                const copy =
                                    material.clone();

                                if (
                                    copy.emissive
                                ) {

                                    copy.emissive =
                                        new THREE.Color(
                                            0xffffff
                                        );

                                    copy.emissiveIntensity =
                                        0.12;
                                }

                                return copy;
                            }
                        );

                    object.userData
                        .yadixaGlowMaterial =
                        cloned;

                    object.material =
                        cloned;

                } else {

                    const copy =
                        original.clone();

                    if (copy.emissive) {

                        copy.emissive =
                            new THREE.Color(
                                0xffffff
                            );

                        copy.emissiveIntensity =
                            0.12;
                    }

                    object.userData
                        .yadixaGlowMaterial =
                        copy;

                    object.material =
                        copy;
                }
            }


            function removeSoftHighlight(object) {

                const original =
                    object.userData
                        .yadixaOriginalMaterial;

                if (!original) {
                    return;
                }

                object.material = original;

                object.userData
                    .yadixaGlowMaterial =
                    null;
            }


            /* =====================================================
               OUTWARD DIRECTION
            ===================================================== */

            function calculateOutwardDirection(object) {

                if (!car) {

                    return new THREE.Vector3(
                        0,
                        0.1,
                        1
                    );
                }


                const partBox =
                    new THREE.Box3()
                        .setFromObject(object);

                const partCenter =
                    partBox.getCenter(
                        new THREE.Vector3()
                    );


                const carBox =
                    new THREE.Box3()
                        .setFromObject(car);

                const carCenter =
                    carBox.getCenter(
                        new THREE.Vector3()
                    );


                const direction =
                    partCenter
                        .sub(carCenter);


                if (
                    direction.length() <
                    0.001
                ) {

                    direction.set(
                        0,
                        0.15,
                        1
                    );
                }


                direction.normalize();


                /*
                 * کمی بالا برای ظاهر حرفه‌ای‌تر.
                 */

                direction.y += 0.08;

                direction.normalize();


                return direction;
            }


            /* =====================================================
               SELECTED PART
            ===================================================== */

            let selectedPart = null;


            /* =====================================================
               SELECT PART
               
               مهم:
               این تابع هیچ کاری با دوربین ندارد.
            ===================================================== */

            function selectPart(object) {

                if (!object || !object.isMesh) {
    return;
}


/*
 * اگر همان قطعه دوباره انتخاب شد،
 * آن را برگردان سر جای اصلی.
 */

if (selectedPart === object) {

    returnPart(object);

    selectedPart = null;

    hidePanel();

    return;
}


/*
 * اگر قطعه دیگری قبلاً انتخاب شده،
 * ابتدا آن را برگردان.
 */

if (selectedPart) {

    returnPart(
        selectedPart
    );

    selectedPart = null;
}


/*
 * قطعه جدید را انتخاب کن.
 */

selectedPart = object;


/*
 * جهت خروج قطعه.
 */

object.userData.yadixaDirection =
    calculateOutwardDirection(
        object
    );


object.userData.yadixaTarget = 1;


/*
 * فاصله خروج قطعه.
 */

object.userData.yadixaDetachDistance =
    0.60;


/*
 * Highlight خیلی ظریف.
 */

applySoftHighlight(
    object
);


/*
 * نمایش اطلاعات قطعه.
 */

showPanel(
    getPartInfo(object)
);


                /*
                 * قطعه قبلی را برگردان.
                 */

                if (selectedPart) {

                    returnPart(
                        selectedPart
                    );
                }


                selectedPart = object;


                /*
                 * جهت خروج قطعه.
                 */

                object.userData
                    .yadixaDirection =
                    calculateOutwardDirection(
                        object
                    );


                object.userData
                    .yadixaTarget = 1;


                object.userData
                    .yadixaDetachDistance =
                    0.60;


                /*
                 * Highlight خیلی ظریف.
                 */

                applySoftHighlight(
                    object
                );


                /*
                 * پنل.
                 */

                showPanel(
                    getPartInfo(object)
                );


                /*
                 * بسیار مهم:
                 *
                 * اینجا هیچ camera.position
                 * و controls.target
                 * تغییر نمی‌کند.
                 *
                 * کاربر دقیقاً همان جایی می‌ماند
                 * که بوده است.
                 */
            }


            /* =====================================================
               RETURN PART
            ===================================================== */

            function returnPart(object) {

                if (!object) {
                    return;
                }

                object.userData
                    .yadixaTarget = 0;

                removeSoftHighlight(
                    object
                );
            }


            /* =====================================================
               DESELECT
            ===================================================== */

            function deselectCurrent() {

                if (selectedPart) {

                    returnPart(
                        selectedPart
                    );
                }

                selectedPart = null;

                hidePanel();
            }


            /* =====================================================
               LOAD MODEL
            ===================================================== */

            loader.load(

                MODEL_URL,

                function (gltf) {

                    /*
                     * فقط همین یک مدل.
                     */

                    car = gltf.scene;

                    scene.add(car);


                    /* =============================================
                       NORMALIZE
                    ============================================= */

                    let box =
                        new THREE.Box3()
                            .setFromObject(car);

                    let size =
                        box.getSize(
                            new THREE.Vector3()
                        );

                    let center =
                        box.getCenter(
                            new THREE.Vector3()
                        );


                    const largest =
                        Math.max(
                            size.x,
                            size.y,
                            size.z
                        );


                    if (largest > 0) {

                        const targetSize = 6.2;

                        const scale =
                            targetSize /
                            largest;

                        car.scale.setScalar(
                            scale
                        );
                    }


                    /* =============================================
                       CENTER
                    ============================================= */

                    box =
                        new THREE.Box3()
                            .setFromObject(car);

                    center =
                        box.getCenter(
                            new THREE.Vector3()
                        );


                    car.position.x -=
                        center.x;

                    car.position.z -=
                        center.z;


                    box =
                        new THREE.Box3()
                            .setFromObject(car);


                    car.position.y -=
                        box.min.y;


                    car.position.y -=
                        0.04;


                    /*
                     * چرخش اولیه خودرو.
                     */

                    car.rotation.y =
                        Math.PI * 0.18;


                    /* =============================================
                       PREPARE ALL MESHES
                    ============================================= */

                    car.traverse(
                        prepareMesh
                    );


                    console.log(
                        "YADIXA 3D: Audi loaded."
                    );

                    console.log(
                        "YADIXA 3D: selectable meshes:",
                        meshCount
                    );
                    /* =====================================================
   DEBUG: LIST ALL AUDI PARTS
===================================================== */

console.log("====================================");
console.log("YADIXA AUDI PART LIST");
console.log("====================================");

car.traverse(function (object) {

    if (!object.isMesh) {
        return;
    }

    console.log(
        "PART:",
        object.name,
        "| TYPE:",
        object.type
    );
});

console.log("====================================");
console.log("END AUDI PART LIST");
console.log("====================================");


                    /*
                     * موقعیت اولیه دوربین.
                     */

                    camera.position.set(
                        7.2,
                        3.0,
                        7.2
                    );

                    controls.target.set(
                        0,
                        1.15,
                        0
                    );

                    controls.update();


                    console.log(
                        "YADIXA 3D: READY."
                    );
                },

                function (xhr) {

                    if (
                        xhr &&
                        xhr.total
                    ) {

                        console.log(
                            "YADIXA 3D loading:",
                            Math.round(
                                (
                                    xhr.loaded /
                                    xhr.total
                                ) * 100
                            ) + "%"
                        );
                    }
                },

                function (error) {

                    console.error(
                        "YADIXA 3D MODEL ERROR:",
                        error
                    );

                    showError(
                        "مدل خودرو باز نشد",
                        "فایل Audi GLB را بررسی کن."
                    );
                }
            );


            /* =====================================================
               RAYCAST
            ===================================================== */

            const raycaster =
                new THREE.Raycaster();

            const mouse =
                new THREE.Vector2();


            function updateMouse(event) {

                const rect =
                    renderer
                        .domElement
                        .getBoundingClientRect();


                mouse.x =
                    (
                        (
                            event.clientX -
                            rect.left
                        ) /
                        rect.width
                    ) * 2 - 1;


                mouse.y =
                    -(
                        (
                            event.clientY -
                            rect.top
                        ) /
                        rect.height
                    ) * 2 + 1;
            }


            /* =====================================================
   SELECT PART FROM SCREEN POSITION
===================================================== */

function selectPartFromScreen(clientX, clientY) {

    if (!car) {
        return;
    }

    const rect =
        renderer.domElement.getBoundingClientRect();

    mouse.x =
        (
            (clientX - rect.left) /
            rect.width
        ) * 2 - 1;

    mouse.y =
        -(
            (clientY - rect.top) /
            rect.height
        ) * 2 + 1;

    raycaster.setFromCamera(
        mouse,
        camera
    );

    const hits =
        raycaster.intersectObject(
            car,
            true
        );

    if (!hits.length) {
        return;
    }

    const object =
        hits[0].object;

    if (!object.isMesh) {
        return;
    }

    selectPart(object);
}


/* =====================================================
   MOUSE CLICK
===================================================== */

renderer.domElement.addEventListener(
    "click",
    function (event) {

        selectPartFromScreen(
            event.clientX,
            event.clientY
        );
    }
);


/* =====================================================
   MOBILE TOUCH
===================================================== */

let touchStartX = 0;
let touchStartY = 0;
let touchStartTime = 0;


/*
 * شروع لمس
 */

renderer.domElement.addEventListener(
    "touchstart",
    function (event) {

        if (!event.touches.length) {
            return;
        }

        const touch =
            event.touches[0];

        touchStartX =
            touch.clientX;

        touchStartY =
            touch.clientY;

        touchStartTime =
            Date.now();

    },
    {
        passive: true
    }
);


/*
 * پایان لمس
 */

renderer.domElement.addEventListener(
    "touchend",
    function (event) {

        if (!event.changedTouches.length) {
            return;
        }

        const touch =
            event.changedTouches[0];

        const deltaX =
            Math.abs(
                touch.clientX -
                touchStartX
            );

        const deltaY =
            Math.abs(
                touch.clientY -
                touchStartY
            );

        const duration =
            Date.now() -
            touchStartTime;


        /*
         * اگر انگشت حرکت زیادی نکرده باشد،
         * آن را Tap در نظر می‌گیریم.
         *
         * اگر حرکت کرده باشد،
         * کاربر در حال چرخاندن خودرو بوده.
         */

        const isTap =
            deltaX < 12 &&
            deltaY < 12 &&
            duration < 700;


        if (!isTap) {
            return;
        }


        selectPartFromScreen(
            touch.clientX,
            touch.clientY
        );

    },
    {
        passive: true
    }
);
            /* =====================================================
               POINTER
            ===================================================== */

            renderer.domElement.addEventListener(
                "pointermove",
                function (event) {

                    if (!car) {
                        return;
                    }


                    updateMouse(event);


                    raycaster.setFromCamera(
                        mouse,
                        camera
                    );


                    const hits =
                        raycaster.intersectObject(
                            car,
                            true
                        );


                    renderer
                        .domElement
                        .style
                        .cursor =
                        hits.length
                            ? "pointer"
                            : "grab";
                }
            );


            /* =====================================================
               DOUBLE CLICK
               
               فقط با درخواست صریح کاربر:
               مدل/دوربین به حالت اولیه برمی‌گردد.
            ===================================================== */

            renderer.domElement.addEventListener(
                "dblclick",
                function () {

                    deselectCurrent();

                    camera.position.set(
                        7.2,
                        3.0,
                        7.2
                    );

                    controls.target.set(
                        0,
                        1.15,
                        0
                    );

                    controls.update();
                }
            );


            /* =====================================================
               VIEW BUTTONS
            ===================================================== */

            function setView(view) {

                if (!view) {
                    return;
                }


                if (view === "front") {

                    camera.position.set(
                        0,
                        2.8,
                        8.5
                    );

                } else if (
                    view === "rear"
                ) {

                    camera.position.set(
                        0,
                        2.8,
                        -8.5
                    );

                } else if (
                    view === "side"
                ) {

                    camera.position.set(
                        8.5,
                        2.8,
                        0
                    );
                }


                /*
                 * دکمه تغییر نما عمداً دوربین را
                 * به مرکز خودرو برمی‌گرداند.
                 *
                 * این با کلیک روی قطعه فرق دارد.
                 */

                controls.target.set(
                    0,
                    1.15,
                    0
                );

                controls.update();
            }


            document
                .querySelectorAll(
                    ".yadixa-3d-control[data-view]"
                )
                .forEach(
                    function (button) {

                        button.addEventListener(
                            "click",
                            function () {

                                setView(
                                    button.dataset.view
                                );
                            }
                        );
                    }
                );


            /* =====================================================
               SEARCH
            ===================================================== */

            const search =
                document.getElementById(
                    "yadixa-3d-search"
                );


            if (search) {

                search.addEventListener(
                    "input",
                    function () {

                        const query =
                            search.value
                                .trim()
                                .toLowerCase();


                        if (!query || !car) {
                            return;
                        }


                        let found = null;


                        car.traverse(
                            function (object) {

                                if (
                                    found ||
                                    !object.isMesh
                                ) {
                                    return;
                                }


                                const info =
                                    getPartInfo(
                                        object
                                    );


                                const text =
                                    (
                                        (
                                            object.name ||
                                            ""
                                        ) +
                                        " " +
                                        info.title +
                                        " " +
                                        info.description
                                    )
                                    .toLowerCase();


                                if (
                                    text.indexOf(
                                        query
                                    ) !== -1
                                ) {

                                    found =
                                        object;
                                }
                            }
                        );


                        if (found) {

                            /*
                             * فقط خود قطعه انتخاب می‌شود.
                             * دوربین حرکت نمی‌کند.
                             */

                            selectPart(
                                found
                            );
                        }
                    }
                );
            }


            /* =====================================================
               PART ANIMATION
            ===================================================== */

            function animateParts() {

                if (!car) {
                    return;
                }


                car.traverse(
                    function (object) {

                        if (!object.isMesh) {
                            return;
                        }


                        const target =
                            object.userData
                                .yadixaTarget ||
                            0;


                        const current =
                            object.userData
                                .yadixaProgress ||
                            0;


                        /*
                         * حرکت خیلی نرم.
                         */

                        const next =
                            THREE.MathUtils.lerp(
                                current,
                                target,
                                0.045
                            );


                        object.userData
                            .yadixaProgress =
                            next;


                        const original =
                            object.userData
                                .yadixaOriginalPosition;


                        const direction =
                            object.userData
                                .yadixaDirection;


                        if (
                            original &&
                            direction
                        ) {

                            const distance =
                                object.userData
                                    .yadixaDetachDistance ||
                                0.60;


                            const offset =
                                direction
                                    .clone()
                                    .multiplyScalar(
                                        distance *
                                        next
                                    );


                            object.position
                                .copy(original)
                                .add(offset);
                        }
                    }
                );
            }


            /* =====================================================
               RESIZE
            ===================================================== */

            function resize() {

                const newWidth =
                    Math.max(
                        stage.clientWidth,
                        320
                    );


                const newHeight =
                    Math.max(
                        stage.clientHeight,
                        520
                    );


                camera.aspect =
                    newWidth /
                    newHeight;


                camera.updateProjectionMatrix();


                renderer.setSize(
                    newWidth,
                    newHeight,
                    false
                );
            }


            window.addEventListener(
                "resize",
                resize
            );


            if (
                typeof ResizeObserver !==
                "undefined"
            ) {

                const observer =
                    new ResizeObserver(
                        function () {
                            resize();
                        }
                    );

                observer.observe(
                    stage
                );
            }


            /* =====================================================
               RENDER LOOP
            ===================================================== */

            function animate() {

                requestAnimationFrame(
                    animate
                );


                animateParts();


                /*
                 * فقط کنترل‌های دستی کاربر.
                 */

                controls.update();


                renderer.render(
                    scene,
                    camera
                );
            }


            animate();


            /* =====================================================
               PUBLIC API
            ===================================================== */

            window.yadixa3D = {

                reset: function () {

                    deselectCurrent();

                    camera.position.set(
                        7.2,
                        3.0,
                        7.2
                    );

                    controls.target.set(
                        0,
                        1.15,
                        0
                    );

                    controls.update();
                },

                front: function () {
                    setView("front");
                },

                rear: function () {
                    setView("rear");
                },

                side: function () {
                    setView("side");
                }
            };
        }


        /* =========================================================
           START
        ========================================================= */

        loadThree();

    });

})();