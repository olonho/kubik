/**
 * Инициализация игры - настройка сцены и выбор персонажа
 * Зависимости: THREE.js, все модули (загружается последним)
 */

function selectSkin(skin) {
    selectedSkin = skin;

    // Сбрасываем параметры игры
    score = 0;
    level = 1;
    lives = 3;
    ammo = maxAmmo;
    obstacleSpeed = 0.015; // Медленная скорость зомби
    spawnRate = 0.03; // Много зомби
    playerVelocityY = 0;
    isJumping = false;
    gameActive = true;
    cameraMode = 'firstPerson'; // Начинаем с вида от первого лица

    document.getElementById('skinMenu').style.display = 'none';
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

    // Градиентное небо
    const skyColor = new THREE.Color(0x87ceeb);
    scene.background = skyColor;

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
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

    // Улучшенная земля с текстурой
    const groundGeometry = new THREE.PlaneGeometry(10, 100);
    const groundMaterial = new THREE.MeshStandardMaterial({
        color: 0x2d5a2d,
        roughness: 0.8,
        metalness: 0.1
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

    // Создаём игрока в зависимости от выбранного скина
    switch(selectedSkin) {
        case 'dog':
            player = createDog();
            break;
        case 'cat':
            player = createCat();
            break;
        case 'fox':
            player = createFox();
            break;
        case 'panda':
            player = createPanda();
            break;
        case 'rabbit':
            player = createRabbit();
            break;
        case 'robot':
            player = createRobot();
            break;
        case 'cube':
            player = createCube();
            break;
        case 'oval':
            player = createOval();
            break;
        default:
            player = createDog();
    }

    player.position.set(0, 0.5, 0);
    player.rotation.y = -Math.PI / 2; // Смотрит налево (на кубики)
    player.castShadow = true;
    scene.add(player);

    // Создаем оружие
    currentWeapon = createWeapon(selectedWeapon);

    // Позиционирование зависит от режима камеры
    if (cameraMode === 'firstPerson') {
        // Вид от первого лица - оружие к камере (как в Chicken Gun)
        currentWeapon.position.set(0.3, -0.25, -0.5);
        currentWeapon.rotation.y = -Math.PI / 12;
        currentWeapon.rotation.x = Math.PI / 24;
        currentWeapon.rotation.z = -Math.PI / 16;
        camera.add(currentWeapon);
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

