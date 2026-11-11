(function () {

    'use strict';


    /* =========================================================
       YADIXA ENGINE STORY
       
       ثابت:
       - Camera
       - Engine position
       - Engine rotation
       - Engine scale

       متحرک:
       - فقط قطعات داخلی
       - فقط با Scroll
       ========================================================= */


    const stage =
        document.getElementById(
            'yadixa-engine-stage'
        );


    if (!stage) {
        return;
    }


    let scene = null;
    let camera = null;
    let renderer = null;

    let engineRoot = null;

    let engineMeshes = [];

    let valveParts = [];
    let rodParts = [];
    let gearParts = [];
    let cylinderParts = [];

    let ready = false;


    /*
     * =========================================================
     * SCROLL STATE
     * =========================================================
     */

    let targetProgress = 0;

    let animationProgress = 0;


    /*
     * =========================================================
     * WAIT FOR EXISTING THREE.JS
     *
     * Three.js را دوباره Load نمی‌کنیم.
     * همان نسخه‌ای که Audi استفاده می‌کند استفاده می‌شود.
     * =========================================================
     */

    function waitForThree() {

        if (
            window.THREE &&
            window.THREE.GLTFLoader
        ) {

            console.log(
                'YADIXA ENGINE: using existing THREE',
                window.THREE.REVISION
            );

            init();

            return;
        }


        setTimeout(
            waitForThree,
            100
        );

    }


    waitForThree();


    /*
     * =========================================================
     * INIT
     * =========================================================
     */

    function init() {

        createScene();

        loadEngine();

    }


    /*
     * =========================================================
     * CREATE SCENE
     * =========================================================
     */

    function createScene() {

        const THREE =
            window.THREE;


        scene =
            new THREE.Scene();


        /*
         * =====================================================
         * CAMERA
         *
         * کاملاً ثابت.
         *
         * هیچ Scroll یا Mouse روی آن تأثیر ندارد.
         * =====================================================
         */

        camera =
            new THREE.PerspectiveCamera(
                35,
                Math.max(
                    stage.clientWidth,
                    1
                ) /
                Math.max(
                    stage.clientHeight,
                    1
                ),
                0.01,
                1000
            );


        /*
         * فاصله بیشتر برای اینکه کل موتور داخل کادر باشد.
         */

        camera.position.set(
            11.5,
            6.8,
            12.5
        );


        /*
         * مرکز واقعی مدل
         */

        camera.lookAt(
            0.484,
            -3.023,
            -4.089
        );


        /*
         * =====================================================
         * RENDERER
         * =====================================================
         */

        renderer =
            new THREE.WebGLRenderer({

                antialias: true,

                alpha: true,

                powerPreference:
                    'high-performance'

            });


        renderer.setPixelRatio(
            Math.min(
                window.devicePixelRatio || 1,
                2
            )
        );


        renderer.setSize(
            stage.clientWidth,
            stage.clientHeight,
            false
        );


        renderer.outputEncoding =
            THREE.sRGBEncoding;


        renderer.setClearColor(
            0x000000,
            0
        );


        stage.innerHTML = '';


        stage.appendChild(
            renderer.domElement
        );


        /*
         * =====================================================
         * LIGHTING
         * =====================================================
         */

        const ambient =
            new THREE.AmbientLight(
                0xffffff,
                1.7
            );

        scene.add(
            ambient
        );


        const key =
            new THREE.DirectionalLight(
                0xffffff,
                2.5
            );

        key.position.set(
            5,
            8,
            7
        );

        scene.add(
            key
        );


        const fill =
            new THREE.DirectionalLight(
                0xffffff,
                1.3
            );

        fill.position.set(
            -5,
            4,
            3
        );

        scene.add(
            fill
        );


        const top =
            new THREE.DirectionalLight(
                0xffffff,
                1.1
            );

        top.position.set(
            0,
            10,
            -4
        );

        scene.add(
            top
        );


        /*
         * =====================================================
         * NO ORBIT CONTROLS
         *
         * عمداً هیچ OrbitControls نداریم.
         *
         * بنابراین:
         *
         * Rotate = ممنوع
         * Zoom   = ممنوع
         * Pan    = ممنوع
         * =====================================================
         */


        window.addEventListener(
            'resize',
            resize
        );

    }


    /*
     * =========================================================
     * LOAD ENGINE MODEL
     * =========================================================
     */

    function loadEngine() {

        const THREE =
            window.THREE;


        const loader =
    new THREE.GLTFLoader();

loader.setMeshoptDecoder(
    THREE.MeshoptDecoder
);


        const modelURL =
            '/wordpress/wp-content/themes/yadixa/assets/models/yadixa-engine.glb';


        console.log(
            'YADIXA ENGINE: loading model...'
        );


        loader.load(

            modelURL,


            function (gltf) {

                console.log(
                    'YADIXA ENGINE: model loaded'
                );


                engineRoot =
                    gltf.scene;


                /*
                 * =================================================
                 * FIXED ENGINE TRANSFORM
                 * =================================================
                 *
                 * این سه مورد هیچ‌وقت در Scroll تغییر نمی‌کنند.
                 */


                /*
                 * نمای مایل
                 */

                engineRoot.rotation.x =
                    THREE.MathUtils.degToRad(
                        -6
                    );


                engineRoot.rotation.y =
                    THREE.MathUtils.degToRad(
                        -25
                    );


                engineRoot.rotation.z =
                    THREE.MathUtils.degToRad(
                        1
                    );


                /*
                 * اندازه ثابت
                 */

                engineRoot.scale.set(
                    0.52,
                    0.52,
                    0.52
                );


                /*
                 * موقعیت ثابت
                 */

                engineRoot.position.set(
                    0,
                    0,
                    0
                );


                /*
                 * =================================================
                 * ADD MODEL
                 * =================================================
                 */

                scene.add(
                    engineRoot
                );


                /*
                 * =================================================
                 * COLLECT ALL MESHES
                 * =================================================
                 */

                engineMeshes = [];


                engineRoot.traverse(
                    function (object) {

                        if (
                            object.isMesh
                        ) {

                            engineMeshes.push(
                                object
                            );


                            object.frustumCulled =
                                false;

                        }

                    }
                );


                /*
                 * Global debug reference
                 */

                window.yadixaEngineMeshes =
                    engineMeshes;


                console.log(
                    'YADIXA ENGINE:',
                    engineMeshes.length,
                    'meshes'
                );


                /*
                 * =================================================
                 * FIND ANIMATION PARTS
                 * =================================================
                 */

                valveParts = [];

                rodParts = [];

                gearParts = [];

                cylinderParts = [];


                engineMeshes.forEach(
                    function (mesh) {

                        const parent =
                            mesh.parent;


                        if (!parent) {
                            return;
                        }


                        const name =
                            (
                                parent.name ||
                                ''
                            ).toLowerCase();


                        /*
                         * =================================================
                         * VALVES
                         * =================================================
                         */

                        if (
                            name.indexOf(
                                'klep'
                            ) !== -1
                        ) {

                            registerPart(
                                valveParts,
                                parent,
                                'valve'
                            );

                        }


                        /*
                         * =================================================
                         * CONNECTING RODS
                         * =================================================
                         */

                        if (
                            name.indexOf(
                                'drijfstang'
                            ) !== -1
                            ||
                            name.indexOf(
                                'drijstang'
                            ) !== -1
                        ) {

                            registerPart(
                                rodParts,
                                parent,
                                'rod'
                            );

                        }


                        /*
                         * =================================================
                         * GEARS
                         * =================================================
                         */

                        if (
                            name.indexOf(
                                'tandwiel'
                            ) !== -1
                        ) {

                            registerPart(
                                gearParts,
                                parent,
                                'gear'
                            );

                        }


                        /*
                         * =================================================
                         * CYLINDER PARTS
                         * =================================================
                         */

                        if (
                            name.indexOf(
                                'cylinder'
                            ) !== -1
                        ) {

                            registerPart(
                                cylinderParts,
                                parent,
                                'cylinder'
                            );

                        }

                    }
                );


                console.log(
                    'VALVES:',
                    valveParts.length
                );


                console.log(
                    'RODS:',
                    rodParts.length
                );


                console.log(
                    'GEARS:',
                    gearParts.length
                );


                console.log(
                    'CYLINDERS:',
                    cylinderParts.length
                );


                /*
                 * =================================================
                 * INITIAL STATE
                 * =================================================
                 */

                ready = true;


                targetProgress = 0;

                animationProgress = 0;


                updateAnimation(
                    0
                );


                updateScroll();


                animate();

            },


            /*
             * =====================================================
             * LOADING
             * =====================================================
             */

            function (xhr) {

                if (
                    xhr.total
                ) {

                    console.log(
                        'ENGINE:',
                        (
                            xhr.loaded /
                            xhr.total *
                            100
                        ).toFixed(1) +
                        '%'
                    );

                }

            },


            /*
             * =====================================================
             * ERROR
             * =====================================================
             */

            function (error) {

                console.error(
                    'YADIXA ENGINE LOAD ERROR:',
                    error
                );

            }

        );

    }


    /*
     * =========================================================
     * REGISTER PART
     *
     * Parent واقعی ذخیره می‌شود.
     * =========================================================
     */

    function registerPart(
        array,
        object,
        type
    ) {

        const exists =
            array.some(
                function (item) {

                    return (
                        item.object === object
                    );

                }
            );


        if (
            exists
        ) {

            return;

        }


        array.push({

            object: object,

            type: type,

            index: array.length,

            position:
                object.position.clone(),

            rotation:
                object.rotation.clone()

        });

    }


    /*
     * =========================================================
     * RESET ALL PARTS
     * =========================================================
     */

    function resetPart(
        part
    ) {

        part.object.position.copy(
            part.position
        );


        part.object.rotation.copy(
            part.rotation
        );

    }


    /*
     * =========================================================
     * RESET EVERYTHING
     * =========================================================
     */

    function resetAllParts() {

        valveParts.forEach(
            resetPart
        );


        rodParts.forEach(
            resetPart
        );


        gearParts.forEach(
            resetPart
        );


        cylinderParts.forEach(
            resetPart
        );

    }


    /*
     * =========================================================
     * SCROLL POSITION
     * =========================================================
     *
     * 0 = ابتدای Story
     * 1 = انتهای Story
     *
     * پایین:
     * 0 → 1
     *
     * بالا:
     * 1 → 0
     * =========================================================
     */

    function updateScroll() {

        const section =
            document.getElementById(
                'yadixa-engine-story'
            );


        if (!section) {
            return;
        }


        const rect =
            section.getBoundingClientRect();


        const scrollable =
            section.offsetHeight -
            window.innerHeight;


        if (
            scrollable <= 0
        ) {

            targetProgress = 0;

            return;

        }


        let progress =
            -rect.top /
            scrollable;


        progress =
            Math.max(
                0,
                Math.min(
                    1,
                    progress
                )
            );


        /*
         * این مقدار مستقیماً جهت Scroll را تعیین می‌کند.
         *
         * پایین رفتن:
         * progress زیاد می‌شود.
         *
         * بالا رفتن:
         * progress کم می‌شود.
         */

        targetProgress =
            progress;

    }


    window.addEventListener(
        'scroll',
        updateScroll,
        {
            passive: true
        }
    );


    /*
     * =========================================================
     * MAIN ANIMATION
     * =========================================================
     *
     * تمام حرکت‌ها تابع مستقیم progress هستند.
     *
     * بنابراین:
     *
     * Scroll Down = جلو
     * Scroll Up   = عقب
     *
     * بدون Loop
     * =========================================================
     */

    function updateAnimation(
        progress
    ) {

        /*
         * ابتدا همه قطعات را به موقعیت اصلی برمی‌گردانیم.
         */

        resetAllParts();


        /*
         * =====================================================
         * PHASE 1
         *
         * VALVES
         *
         * 0 → 35%
         * =====================================================
         */

        const valveProgress =
            smoothRange(
                progress,
                0.00,
                0.35
            );


        valveParts.forEach(
            function (
                part,
                index
            ) {

                /*
                 * دو گروه متناوب
                 */

                const direction =
                    index % 2 === 0
                        ? 1
                        : -1;


                /*
                 * حرکت رفت و برگشتی
                 * اما کاملاً وابسته به Scroll
                 */

                const motion =
                    Math.sin(
                        valveProgress *
                        Math.PI *
                        4
                    );


                part.object.position.y =
                    part.position.y +
                    direction *
                    motion *
                    0.32;

            }
        );


        /*
         * =====================================================
         * PHASE 2
         *
         * CONNECTING RODS
         *
         * 20 → 65%
         * =====================================================
         */

        const rodProgress =
            smoothRange(
                progress,
                0.20,
                0.65
            );


        rodParts.forEach(
            function (
                part,
                index
            ) {

                const phase =
                    index *
                    (
                        Math.PI /
                        2
                    );


                part.object.rotation.z =
                    part.rotation.z +
                    Math.sin(
                        rodProgress *
                        Math.PI *
                        4 +
                        phase
                    ) *
                    0.34;

            }
        );


        /*
         * =====================================================
         * PHASE 3
         *
         * GEARS
         *
         * 40 → 85%
         * =====================================================
         */

        const gearProgress =
            smoothRange(
                progress,
                0.40,
                0.85
            );


        gearParts.forEach(
            function (
                part,
                index
            ) {

                const direction =
                    index % 2 === 0
                        ? 1
                        : -1;


                part.object.rotation.z =
                    part.rotation.z +
                    direction *
                    gearProgress *
                    Math.PI *
                    2;

            }
        );


        /*
         * =====================================================
         * PHASE 4
         *
         * CYLINDER PARTS
         *
         * 55 → 100%
         * =====================================================
         */

        const cylinderProgress =
            smoothRange(
                progress,
                0.55,
                1.00
            );


        cylinderParts.forEach(
            function (
                part,
                index
            ) {

                const phase =
                    index *
                    0.7;


                const movement =
                    Math.sin(
                        cylinderProgress *
                        Math.PI *
                        5 +
                        phase
                    );


                part.object.position.y =
                    part.position.y +
                    movement *
                    0.10;

            }
        );


        /*
         * =====================================================
         * FINAL INTERNAL EXPOSURE
         *
         * 75 → 100%
         * =====================================================
         */

        const finalProgress =
            smoothRange(
                progress,
                0.75,
                1.00
            );


        /*
         * Valves کمی بازتر می‌شوند.
         */

        valveParts.forEach(
            function (
                part,
                index
            ) {

                const direction =
                    index % 2 === 0
                        ? 1
                        : -1;


                part.object.position.y =
                    part.object.position.y +
                    direction *
                    finalProgress *
                    0.16;

            }
        );


        /*
         * Rods کمی به طرفین باز می‌شوند.
         */

        rodParts.forEach(
            function (
                part,
                index
            ) {

                const direction =
                    index % 2 === 0
                        ? 1
                        : -1;


                part.object.position.x =
                    part.object.position.x +
                    direction *
                    finalProgress *
                    0.12;

            }
        );

    }


    /*
     * =========================================================
     * SMOOTH RANGE
     * =========================================================
     */

    function smoothRange(
        value,
        start,
        end
    ) {

        if (
            value <= start
        ) {

            return 0;

        }


        if (
            value >= end
        ) {

            return 1;

        }


        let t =
            (
                value -
                start
            ) /
            (
                end -
                start
            );


        /*
         * Smoothstep
         */

        t =
            t *
            t *
            (
                3 -
                2 *
                t
            );


        return t;

    }


    /*
     * =========================================================
     * RESIZE
     * =========================================================
     *
     * فقط Canvas تغییر اندازه می‌دهد.
     *
     * خود موتور:
     * position ثابت
     * rotation ثابت
     * scale ثابت
     * =========================================================
     */

    function resize() {

        if (
            !camera ||
            !renderer
        ) {

            return;

        }


        const width =
            stage.clientWidth;


        const height =
            stage.clientHeight;


        if (
            width <= 0 ||
            height <= 0
        ) {

            return;

        }


        camera.aspect =
            width /
            height;


        camera.updateProjectionMatrix();


        renderer.setSize(
            width,
            height,
            false
        );

    }


    /*
     * =========================================================
     * RENDER LOOP
     * =========================================================
     */

    function animate() {

        requestAnimationFrame(
            animate
        );


        if (
            !ready
        ) {

            return;

        }


        /*
         * Scroll را دائماً می‌خوانیم.
         */

        updateScroll();


        /*
         * =====================================================
         * SMOOTH FOLLOW
         *
         * اگر کاربر پایین برود:
         *
         * animationProgress → targetProgress
         *
         * اگر بالا برود:
         *
         * animationProgress ← targetProgress
         *
         * اگر توقف کند:
         *
         * targetProgress ثابت
         * animationProgress هم به همان مقدار می‌رسد
         * و متوقف می‌شود.
         * =====================================================
         */

        animationProgress +=
            (
                targetProgress -
                animationProgress
            ) *
            0.16;


        /*
         * اگر اختلاف بسیار کم شد،
         * دقیقاً روی Target قرار می‌گیریم.
         */

        if (
            Math.abs(
                targetProgress -
                animationProgress
            ) <
            0.0005
        ) {

            animationProgress =
                targetProgress;

        }


        /*
         * اجرای انیمیشن
         */

        updateAnimation(
            animationProgress
        );


        /*
         * =====================================================
         * RENDER
         *
         * هیچ Camera Control نداریم.
         * =====================================================
         */

        renderer.render(
            scene,
            camera
        );

    }

})();