/**
 * Инициализация игры - настройка сцены и выбор персонажа
 * Зависимости: THREE.js, все модули (загружается последним)
 */

console.log('✅ init.js загружен');

// Функция запуска игры из вступительной катсцены
function startGameFromIntro() {
    console.log('🎬 Запуск игры из вступительной катсцены...');

    // Скрываем вступительную сцену
    const introScene = document.getElementById('introScene');
    if (introScene) {
        introScene.style.transition = 'opacity 1.5s';
        introScene.style.opacity = '0';
        setTimeout(() => {
            introScene.style.display = 'none';
        }, 1500);
    }

    // Запускаем игру с человеческим персонажем
    selectSkin('human');
}

// Делаем функцию глобальной
window.startGameFromIntro = startGameFromIntro;

function selectSkin(skin) {
    console.log('=== selectSkin вызвана, скин:', skin);
    console.log('cameraMode:', cameraMode);
    selectedSkin = skin;

    // Загружаем сохранённые параметры игры или используем дефолтные
    score = parseInt(localStorage.getItem('cubeGameScore')) || 0;
    wave = parseInt(localStorage.getItem('cubeGameWave')) || 1;
    lives = parseInt(localStorage.getItem('cubeGameLives')) || 3;
    ammo = parseInt(localStorage.getItem('cubeGameAmmo')) || maxAmmo;
    coins = parseInt(localStorage.getItem('cubeGameCoins')) || 50000;
    wood = parseInt(localStorage.getItem('cubeGameWood')) || 0;

    level = 1;
    obstacleSpeed = 0.015; // Медленная скорость зомби
    spawnRate = 0.03; // Много зомби
    playerVelocityY = 0;
    isJumping = false;
    gameActive = true;
    cameraMode = 'firstPerson'; // Начинаем с вида от первого лица

    console.log('📂 Загружены данные: score=', score, 'wave=', wave, 'lives=', lives, 'coins=', coins, 'wood=', wood);
    document.getElementById('score').style.display = 'block';
    document.getElementById('instructions').style.display = 'block';
    document.getElementById('crosshair').style.display = 'block';
    document.getElementById('cameraMode').style.display = 'block';
    document.getElementById('coinsDisplay').style.display = 'block';
    document.getElementById('openShopBtn').style.display = 'block';
    document.getElementById('openItemsShopBtn').style.display = 'block';
    document.getElementById('openWeaponsShopBtn').style.display = 'block';
    document.getElementById('woodDisplay').style.display = 'block';
    document.getElementById('buildHouseBtn').style.display = 'block';
    document.getElementById('buildBedBtn').style.display = 'block';
    updateCoinsDisplay();
    updateWoodDisplay();
    init();
}

// Делаем функцию selectSkin глобальной сразу после определения
window.selectSkin = selectSkin;

function init() {
    // Останавливаем старую анимацию если есть
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }

    // Очищаем массивы
    obstacles = [];
    decorations = [];
    bullets = [];

    // Очищаем турели
    turrets.forEach(turret => scene.remove(turret));
    turrets = [];

    // Очищаем питомцев
    pets.forEach(pet => scene.remove(pet));
    pets = [];

    // Инициализируем цель взгляда камеры
    cameraLookTarget = new THREE.Vector3(0, 0.7, -10);

    scene = new THREE.Scene();

    // Создаем отдельную сцену для FPS рук и оружия (viewmodel)
    fpsScene = new THREE.Scene();
    console.log('FPS сцена создана для viewmodel');

    // Улучшенное освещение в FPS сцене (как в Chicken Gun)
    const fpsAmbientLight = new THREE.AmbientLight(0xffffff, 1.2);
    fpsScene.add(fpsAmbientLight);

    // Основной свет спереди (подсвечивает оружие)
    const fpsMainLight = new THREE.DirectionalLight(0xffffff, 1.5);
    fpsMainLight.position.set(0, 0.5, 1);
    fpsScene.add(fpsMainLight);

    // Боковой свет для бликов на металле
    const fpsSideLight = new THREE.DirectionalLight(0xaaccff, 0.8);
    fpsSideLight.position.set(1, 0.2, 0);
    fpsScene.add(fpsSideLight);

    // Задний свет для контура (rim light)
    const fpsRimLight = new THREE.DirectionalLight(0xffeecc, 0.6);
    fpsRimLight.position.set(-0.5, 0.5, -1);
    fpsScene.add(fpsRimLight);

    // Точечный свет для усиления деталей
    const fpsPointLight = new THREE.PointLight(0xffffff, 1.0, 3);
    fpsPointLight.position.set(0, 0, 0.5);
    fpsScene.add(fpsPointLight);

    console.log('Высококачественное освещение добавлено в FPS сцену');

    // Реалистичное градиентное небо (как в Far Cry)
    const vertexShader = `
        varying vec3 vWorldPosition;
        void main() {
            vec4 worldPosition = modelMatrix * vec4(position, 1.0);
            vWorldPosition = worldPosition.xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;
    const fragmentShader = `
        uniform vec3 topColor;
        uniform vec3 bottomColor;
        uniform float offset;
        uniform float exponent;
        varying vec3 vWorldPosition;
        void main() {
            float h = normalize(vWorldPosition + offset).y;
            gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
        }
    `;
    const skyGeo = new THREE.SphereGeometry(500, 32, 15);
    const skyMat = new THREE.ShaderMaterial({
        uniforms: {
            topColor: { value: new THREE.Color(0x0077ff) },    // Яркое синее небо
            bottomColor: { value: new THREE.Color(0xffffff) }, // Белый горизонт
            offset: { value: 33 },
            exponent: { value: 0.6 }
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        side: THREE.BackSide
    });
    const sky = new THREE.Mesh(skyGeo, skyMat);
    scene.add(sky);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000);
    // Вид от первого лица - камера на уровне глаз персонажа
    camera.position.set(0, 1.2, 0);
    camera.lookAt(0, 0, 0);

    // Создаём renderer только если его еще нет
    if (!renderer) {
        renderer = new THREE.WebGLRenderer({
            antialias: true,
            powerPreference: "high-performance"
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        // Улучшенные тени
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // Улучшенный рендеринг
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;

        document.body.appendChild(renderer.domElement);

        // Инициализация постобработки для основной сцены
        composer = new THREE.EffectComposer(renderer);
        const renderPass = new THREE.RenderPass(scene, camera);
        composer.addPass(renderPass);

        // Bloom эффект для свечения (как в современных играх)
        const bloomPass = new THREE.UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            0.6,  // strength (интенсивность свечения)
            0.4,  // radius
            0.85  // threshold (порог яркости для свечения)
        );
        composer.addPass(bloomPass);

        // Composer для FPS сцены (оружие)
        fpsComposer = new THREE.EffectComposer(renderer);
        const fpsRenderPass = new THREE.RenderPass(fpsScene, camera);
        fpsComposer.addPass(fpsRenderPass);

        // Еще более сильный bloom для оружия (подсветка деталей)
        const fpsBloomPass = new THREE.UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            1.2,  // сильное свечение для металла и прицелов
            0.5,
            0.5   // более низкий порог чтобы больше деталей светилось
        );
        fpsComposer.addPass(fpsBloomPass);

        console.log('✨ Постобработка с bloom эффектом инициализирована');
    }

    // Туман для атмосферы и глубины
    scene.fog = new THREE.Fog(0x87ceeb, 10, 60);

    // Более реалистичное освещение
    const hemisphereLight = new THREE.HemisphereLight(0x87ceeb, 0x228b22, 0.5);
    scene.add(hemisphereLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Основной направленный свет с улучшенными тенями
    const directionalLight = new THREE.DirectionalLight(0xfff5e6, 1.2);
    directionalLight.position.set(10, 20, 10);
    directionalLight.castShadow = true;

    // Улучшенные настройки теней
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -20;
    directionalLight.shadow.camera.right = 20;
    directionalLight.shadow.camera.top = 20;
    directionalLight.shadow.camera.bottom = -20;
    directionalLight.shadow.bias = -0.0001;

    scene.add(directionalLight);

    // Дополнительный заполняющий свет
    const fillLight = new THREE.DirectionalLight(0xadd8e6, 0.3);
    fillLight.position.set(-5, 5, -5);
    scene.add(fillLight);

    // Улучшенная земля с процедурной текстурой травы (как в Far Cry)
    const groundGeometry = new THREE.PlaneGeometry(10, 100, 100, 100);

    // Создаем процедурную текстуру травы
    const groundCanvas = document.createElement('canvas');
    groundCanvas.width = 512;
    groundCanvas.height = 512;
    const groundCtx = groundCanvas.getContext('2d');

    // Базовый цвет травы
    groundCtx.fillStyle = '#2d5a2d';
    groundCtx.fillRect(0, 0, 512, 512);

    // Добавляем шум для реалистичности
    for (let i = 0; i < 10000; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const brightness = 0.8 + Math.random() * 0.4;
        groundCtx.fillStyle = `rgba(${30 * brightness}, ${90 * brightness}, ${30 * brightness}, 0.3)`;
        groundCtx.fillRect(x, y, 2, 2);
    }

    const groundTexture = new THREE.CanvasTexture(groundCanvas);
    groundTexture.wrapS = THREE.RepeatWrapping;
    groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set(20, 20);

    const groundMaterial = new THREE.MeshStandardMaterial({
        map: groundTexture,
        color: 0x2d5a2d,
        roughness: 0.95,
        metalness: 0.0
    });

    ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Добавляем деревья по краям
    decorations = [];
    createTrees();

    // Создаём турели если были куплены
    if (hasTurret) {
        createTurret();
    }
    if (hasFireTurret) {
        createFireTurret();
    }
    if (hasLaserTurret) {
        createLaserTurret();
    }
    if (hasRocketTurret) {
        createRocketTurret();
    }
    if (hasFreezeTurret) {
        createFreezeTurret();
    }
    if (hasElectricTurret) {
        createElectricTurret();
    }
    if (hasPoisonTurret) {
        createPoisonTurret();
    }
    if (hasExplosiveTurret) {
        createExplosiveTurret();
    }
    if (hasSonicTurret) {
        createSonicTurret();
    }
    if (hasPlasmaTurret) {
        createPlasmaTurret();
    }
    if (hasTeslaTurret) {
        createTeslaTurret();
    }
    if (hasGravityTurret) {
        createGravityTurret();
    }
    if (hasRailgunTurret) {
        createRailgunTurret();
    }
    if (hasMinigunTurret) {
        createMinigunTurret();
    }
    if (hasFlamethrowerTurret) {
        createFlamethrowerTurret();
    }
    if (hasSniperTurret) {
        createSniperTurret();
    }
    if (hasShotgunTurret) {
        createShotgunTurret();
    }
    if (hasCannonTurret) {
        createCannonTurret();
    }
    if (hasNuclearTurret) {
        createNuclearTurret();
    }
    if (hasRainbowTurret) {
        createRainbowTurret();
    }
    if (hasHealingTurret) {
        createHealingTurret();
    }
    if (hasShieldTurret) {
        createShieldTurret();
    }
    if (hasQuantumTurret) {
        createQuantumTurret();
    }
    if (hasBlackholeTurret) {
        createBlackholeTurret();
    }
    if (hasTimeTurret) {
        createTimeTurret();
    }
    if (hasEnergyTurret) {
        createEnergyTurret();
    }
    if (hasMeteorTurret) {
        createMeteorTurret();
    }
    if (hasStormTurret) {
        createStormTurret();
    }
    if (hasAntimatterTurret) {
        createAntimatterTurret();
    }

    // Добавляем траву
    for (let i = 0; i < 50; i++) {
        const grass = createGrass();
        const side = Math.random() > 0.5 ? -3.5 : 3.5;
        grass.position.set(side + (Math.random() - 0.5) * 2, 0, -i * 2.5 - Math.random() * 3);
        scene.add(grass);
        decorations.push(grass);
    }

    // Добавляем заборы
    for (let i = 0; i < 15; i++) {
        const fence = createFence();
        const side = Math.random() > 0.5 ? -4.8 : 4.8;
        fence.position.set(side, 0, -i * 8 - 15);
        if (side > 0) {
            fence.rotation.y = Math.PI;
        }
        scene.add(fence);
        decorations.push(fence);
    }

    // Добавляем птиц в небе
    for (let i = 0; i < 12; i++) {
        const bird = createBird();
        bird.position.set(
            (Math.random() - 0.5) * 15,
            5 + Math.random() * 3,
            -i * 10 - Math.random() * 10
        );
        scene.add(bird);
        decorations.push(bird);
    }

    // Добавляем знаки
    for (let i = 0; i < 8; i++) {
        const sign = createSign();
        const side = Math.random() > 0.5 ? -5 : 5;
        sign.position.set(side, 0, -i * 15 - 20);
        if (side > 0) {
            sign.rotation.y = Math.PI;
        }
        scene.add(sign);
        decorations.push(sign);
    }

    // Добавляем дом с кошкой справа от игрока
    const house = createHouse();
    house.position.set(6, 0, 3);
    house.rotation.y = -Math.PI / 4; // Поворачиваем дом к игроку
    scene.add(house);
    decorations.push(house);

    // Добавляем кошку перед домом
    const houseCat = createHouseCat();
    houseCat.position.set(5, 0, 5);
    houseCat.rotation.y = Math.PI; // Кошка смотрит на игрока
    scene.add(houseCat);
    decorations.push(houseCat);

    // Создаём игрока - человека Dani Rojas
    player = createHuman();

    player.position.set(0, 0.5, 0);
    player.rotation.y = -Math.PI / 2; // Смотрит вперед
    lastPlayerDirection = -Math.PI / 2; // Инициализируем направление
    player.castShadow = true;
    scene.add(player);

    // Создаем оружие
    currentWeapon = createWeapon(selectedWeapon);
    console.log('Оружие создано:', currentWeapon);

    // Позиционирование зависит от режима камеры
    console.log('Проверяем режим камеры. cameraMode =', cameraMode);
    if (cameraMode === 'firstPerson') {
        // Скрываем персонажа в режиме от первого лица (камера внутри головы)
        player.visible = false;
        console.log('Персонаж скрыт для FPS вида');

        // Создаем руки для FPS вида (как в CS:GO)
        console.log('Режим камеры - первое лицо! Создаем FPS руки...');
        console.log('Функция createFPSHands доступна?', typeof createFPSHands);
        fpsHands = createFPSHands();
        console.log('FPS руки созданы:', fpsHands);

        // Добавляем руки в FPS сцену (НЕ к камере!)
        fpsScene.add(fpsHands);
        console.log('FPS руки добавлены в fpsScene');

        // Вид от первого лица - оружие БЕЗ РУК, ближе к центру и выше
        currentWeapon.position.set(0.18, -0.12, -0.4); // Приближено к персонажу, выше, перед камерой
        // Поворачиваем оружие так чтобы ствол смотрел вперед (-Z)
        // Модель создается со стволом по X, нужно повернуть на -90° по Y
        currentWeapon.rotation.x = 0;
        currentWeapon.rotation.y = -Math.PI / 2 - Math.PI / 20; // -90° + небольшой доп. поворот
        currentWeapon.rotation.z = Math.PI / 20; // Небольшой наклон
        currentWeapon.scale.set(0.9, 0.9, 0.9); // Нормальный размер
        fpsHands.add(currentWeapon);
        console.log('Оружие позиционировано без рук, ближе к центру');
        console.log('Оружие добавлено к рукам. Руки имеют', fpsHands.children.length, 'детей');
        console.log('Позиция рук относительно камеры:', fpsHands.position);
        console.log('Позиция оружия относительно рук:', currentWeapon.position);
    } else {
        // Вид от третьего лица - оружие к игроку
        currentWeapon.position.set(0.15, 0.2, -0.4);
        currentWeapon.rotation.y = 0;
        currentWeapon.rotation.z = -Math.PI / 6;
        player.add(currentWeapon);
    }

    // Обновляем дисплей
    updateScoreDisplay();
    updateAmmoDisplay();
    document.getElementById('weaponDisplay').style.display = 'block';
    document.getElementById('weaponDisplay').textContent = '🔫 Пистолет';

    // Восстанавливаем дом если был построен
    const savedHousePos = localStorage.getItem('cubeGameHousePosition');
    if (savedHousePos) {
        try {
            const pos = JSON.parse(savedHousePos);
            playerHouse = createHouse();
            playerHouse.position.set(pos.x, pos.y, pos.z);
            playerHouse.userData.isHouse = true;
            playerHouse.userData.canEnter = true;
            scene.add(playerHouse);
            console.log('Дом восстановлен на позиции:', pos);
        } catch (e) {
            console.error('Ошибка восстановления дома:', e);
        }
    }

    // Восстанавливаем кровать если была построена
    const savedBed = localStorage.getItem('cubeGameHasBed');
    if (savedBed === 'true' && playerHouse) {
        hasBed = true;
        playerBed = createBed();
        playerBed.position.set(
            playerHouse.position.x - 1.2,
            playerHouse.position.y + 0.3,
            playerHouse.position.z - 0.5
        );
        playerBed.rotation.y = Math.PI / 2;
        scene.add(playerBed);
        console.log('Кровать восстановлена');

        // Скрываем кнопку постройки кровати
        document.getElementById('buildBedBtn').style.display = 'none';
    }

    // Запускаем первую волну
    startNewWave();

    // Запускаем игровой цикл
    animate();
}

// Функции создания персонажей перенесены в js/characters.js
// (createHouse, createHouseCat, createDog, createCat, createCube,
//  createOval, createFox, createPanda, createRabbit, createRobot)

