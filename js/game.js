// Основная игровая логика

console.log('✅ game.js загружен');

// Глобальные переменные (используем var для совместимости с inline скриптом)
var scene, camera, renderer;
var fpsScene; // Отдельная сцена для FPS рук и оружия
var player, ground, currentWeapon, fpsHands;
var obstacles = [];
var bullets = [];
var score = 0;
var highScore = parseInt(localStorage.getItem('cubeGameHighScore')) || 0;
var wave = 1;
var zombiesPerWave = 5;
var zombiesInCurrentWave = 0;
var waveActive = false;
var lives = 3;
var ammo = 80;
var maxAmmo = 80;
var coins = 50000; // Всегда начинаем с 50000 монет
var wood = 0; // Собранная древесина для постройки дома
var playerHouse = null; // Построенный дом игрока
var playerBed = null; // Кровать в доме
var hasBed = false; // Есть ли кровать
var houseInterior = null; // Интерьер дома
var isInsideHouse = false; // Находится ли игрок внутри дома
var savedOutdoorPosition = null; // Сохраненная позиция на улице
var gameActive = true;
var playerVelocityY = 0;
var isJumping = false;
var keys = {};
var selectedSkin = null;
var selectedWeapon = 'pistol';
var unlockedWeapons = JSON.parse(localStorage.getItem('cubeGameUnlockedWeapons')) || ['pistol', 'rifle', 'laser', 'gravity'];
var maxWaveReached = parseInt(localStorage.getItem('cubeGameMaxWave')) || 1;
var animationId = null;
var decorations = [];
var canShoot = true;
var shootCooldown = 300;
var isBurstFiring = false;
var burstCount = 0;
var burstMax = 3;
var cameraMode = 'firstPerson';
var lastPlayerDirection = -Math.PI / 2; // Последнее направление персонажа (по умолчанию вперед)
var handsSway = { x: 0, y: 0 }; // Покачивание рук от движения мыши (эффект инерции)
var obstacleSpeed = 0.015;
var spawnRate = 0.03;
var gravity = -0.015;
var playerSpeed = 0.1;
var bulletSpeed = 0.5;
var jumpPower = 0.3;
var cameraLookTarget;
var ownedSkins = ['dog', 'cat', 'fox', 'panda', 'rabbit', 'robot', 'cube', 'oval'];
var ownedWeapons = JSON.parse(localStorage.getItem('cubeGameOwnedWeapons')) || ['pistol', 'rifle', 'ak47'];
var turrets = [];
// Управление камерой через тач
var cameraYaw = 0; // Горизонтальный поворот камеры (влево-вправо)
var cameraPitch = 0; // Вертикальный поворот камеры (вверх-вниз)
var touchStartX = 0;
var touchStartY = 0;
var isTouching = false;
var manualCameraControl = false; // Ручное управление камерой (отключает автоприцеливание)
var hasTurret = false;
var hasFireTurret = false;
var hasLaserTurret = false;
var hasRocketTurret = false;
var hasFreezeTurret = false;
var hasElectricTurret = false;
var hasPoisonTurret = false;
var hasExplosiveTurret = false;
var hasSonicTurret = false;
var hasPlasmaTurret = false;
var hasTeslaTurret = false;
var hasGravityTurret = false;
var hasRailgunTurret = false;
var hasMinigunTurret = false;
var hasFlamethrowerTurret = false;
var hasSniperTurret = false;
var hasShotgunTurret = false;
var hasCannonTurret = false;
var hasNuclearTurret = false;
var hasRainbowTurret = false;
var hasHealingTurret = false;
var hasShieldTurret = false;
var hasQuantumTurret = false;
var hasBlackholeTurret = false;
var hasTimeTurret = false;
var hasEnergyTurret = false;
var hasMeteorTurret = false;
var hasStormTurret = false;
var hasAntimatterTurret = false;
var pets = [];
var ownedPets = JSON.parse(localStorage.getItem('cubeGameOwnedPets')) || [];

function updateScoreDisplay() {
    const heartsDisplay = '❤️'.repeat(lives);
    document.getElementById('score').textContent = 'Счёт: ' + score + ' | Рекорд: ' + highScore + ' | Волна: ' + wave + ' | Зомби: ' + zombiesInCurrentWave + ' | Жизни: ' + heartsDisplay;
}

function updateAmmoDisplay() {
    document.getElementById('ammoDisplay').textContent = 'Патроны: ' + ammo + ' / ' + maxAmmo;
}

function updateCoinsDisplay() {
    document.getElementById('coinsDisplay').textContent = '💰 Монеты: ' + coins;
}

function updateWoodDisplay() {
    document.getElementById('woodDisplay').textContent = '🪵 Древесина: ' + wood;
}

function buildHouse() {
    const woodRequired = 50; // Нужно 50 дерева для постройки дома

    if (wood >= woodRequired) {
        if (playerHouse) {
            // Уже построен дом
            showNotification('🏠 У вас уже есть дом!', 'info');
            return;
        }

        wood -= woodRequired;
        updateWoodDisplay();

        // Создаем дом на позиции игрока
        playerHouse = createHouse();
        playerHouse.position.set(player.position.x, 0, player.position.z);
        playerHouse.userData.isHouse = true; // Помечаем как дом игрока
        playerHouse.userData.canEnter = true; // Можно войти
        scene.add(playerHouse);

        // Показываем уведомление
        showNotification('🏠 Дом построен! Зайдите внутрь (подойдите близко) для сохранения прогресса!', 'success');

        // Даем бонус за постройку дома
        coins += 500;
        updateCoinsDisplay();
        lives = Math.min(lives + 1, 5); // Добавляем жизнь (максимум 5)
        updateScoreDisplay();

    } else {
        showNotification('❌ Недостаточно древесины! Нужно: ' + woodRequired + ', есть: ' + wood, 'error');
    }
}

function buildBed() {
    const woodRequired = 20; // Нужно 20 дерева для постройки кровати

    if (!playerHouse) {
        showNotification('❌ Сначала постройте дом!', 'error');
        return;
    }

    if (hasBed) {
        showNotification('🛏️ У вас уже есть кровать!', 'info');
        return;
    }

    if (wood >= woodRequired) {
        wood -= woodRequired;
        updateWoodDisplay();
        hasBed = true;

        // Создаем кровать
        playerBed = createBed();
        playerBed.rotation.y = Math.PI / 2; // Поворачиваем вдоль стены

        // Если игрок внутри дома, добавляем кровать в интерьер
        if (isInsideHouse && houseInterior) {
            playerBed.position.set(-1.2, 0.3, -0.5); // Позиция внутри интерьера
            playerBed.visible = true;
            houseInterior.add(playerBed);
        } else {
            // Если снаружи, добавляем в сцену но скрываем
            playerBed.position.set(
                playerHouse.position.x - 1.2,
                playerHouse.position.y + 0.3,
                playerHouse.position.z - 0.5
            );
            playerBed.visible = false; // Не видна снаружи
            scene.add(playerBed);
        }

        // Сохраняем в localStorage
        localStorage.setItem('cubeGameHasBed', 'true');

        // Показываем уведомление
        showNotification('🛏️ Кровать построена! Теперь можно спать и восстанавливать здоровье!', 'success');

        // Даем бонус за постройку кровати
        coins += 200;
        updateCoinsDisplay();

        // Обновляем кнопку
        const bedBtn = document.getElementById('buildBedBtn');
        if (bedBtn) {
            bedBtn.style.display = 'none';
        }

    } else {
        showNotification('❌ Недостаточно древесины! Нужно: ' + woodRequired + ', есть: ' + wood, 'error');
    }
}

// Функция проверки коллизий внутри дома
function checkCollisionInHouse(newX, newZ) {
    if (!isInsideHouse || !houseInterior) return false;

    // Проверка границ дома (простые границы стен)
    // Стены находятся на позициях: -2.5, 2.5 по X и -2.25, 2.25 по Z
    const wallThickness = 0.15; // Половина толщины стены
    const playerRadius = 0.25;

    // Проверяем столкновение со стенами
    if (newX < -2.5 + wallThickness + playerRadius) return true; // Левая стена
    if (newX > 2.5 - wallThickness - playerRadius) return true;  // Правая стена
    if (newZ < -2.25 + wallThickness + playerRadius) return true; // Задняя стена
    if (newZ > 2.25 - wallThickness - playerRadius) return true;  // Передняя стена (кроме двери)

    // Проверка дверного проема - если игрок в зоне двери (X от -0.55 до 0.55, Z > 2.0), пропускаем
    const inDoorway = (Math.abs(newX) < 0.55 && newZ > 2.0);
    if (inDoorway) {
        // В дверном проеме нет коллизий с передней стеной
        return false;
    }

    // Проверяем коллизии с мебелью
    let hasCollision = false;

    houseInterior.children.forEach(child => {
        // Проверяем только мебель (не стены)
        if (!child.userData.isFurniture) return;

        // Получаем bounding box объекта
        const box = new THREE.Box3().setFromObject(child);

        // Пропускаем объекты которые слишком высоко или низко
        if (box.min.y > 1.5 || box.max.y < 0.2) return;

        // Размеры объекта
        const sizeX = box.max.x - box.min.x;
        const sizeZ = box.max.z - box.min.z;

        // Центр объекта
        const centerX = (box.min.x + box.max.x) / 2;
        const centerZ = (box.min.z + box.max.z) / 2;

        // Проверяем пересечение
        const distX = Math.abs(newX - centerX);
        const distZ = Math.abs(newZ - centerZ);

        if (distX < sizeX / 2 + playerRadius && distZ < sizeZ / 2 + playerRadius) {
            hasCollision = true;
        }
    });

    return hasCollision;
}

function enterHouseInterior() {
    if (isInsideHouse) return;

    isInsideHouse = true;
    waveActive = false; // Останавливаем волны зомби

    // Сохраняем позицию игрока на улице
    savedOutdoorPosition = {
        x: player.position.x,
        y: player.position.y,
        z: player.position.z
    };

    // Скрываем внешние объекты
    ground.visible = false;
    decorations.forEach(dec => dec.visible = false);
    obstacles.forEach(obs => obs.visible = false);
    bullets.forEach(bullet => bullet.visible = false);
    turrets.forEach(turret => turret.visible = false);
    if (playerHouse) playerHouse.visible = false;

    // Создаем интерьер если его еще нет
    if (!houseInterior) {
        houseInterior = createHouseInterior();
        scene.add(houseInterior);
    }
    houseInterior.visible = true;

    // Показываем кровать внутри (относительно внутреннего пространства)
    if (playerBed && hasBed) {
        playerBed.visible = true;
        playerBed.position.set(1.5, 0.3, 1); // Позиция в правом углу интерьера
        playerBed.rotation.y = 0;
        playerBed.userData.isFurniture = true; // Добавляем метку для коллизий
        // Добавляем кровать в интерьер если её там нет
        if (playerBed.parent !== houseInterior) {
            scene.remove(playerBed);
            houseInterior.add(playerBed);
        }
    }

    // Перемещаем игрока внутрь дома (ближе к двери)
    player.position.set(0, 0.5, 1.8);
    player.rotation.y = -Math.PI; // Смотрит внутрь дома
    console.log('🏠 Игрок вошел в дом на позиции:', player.position);

    // Меняем фон на более темный
    scene.background = new THREE.Color(0x4a3f35);
    scene.fog = new THREE.Fog(0x4a3f35, 5, 15);

    // Восстанавливаем HP и патроны
    lives = Math.min(lives + 1, 5);
    ammo = maxAmmo;
    updateScoreDisplay();
    updateAmmoDisplay();

    showNotification('🏠 Вы вошли в дом! Нажмите E чтобы выйти | Cmd для сохранения в кровати', 'success');
}

// Функция сохранения игры
function saveGame() {
    localStorage.setItem('cubeGameCoins', coins);
    localStorage.setItem('cubeGameWood', wood);
    localStorage.setItem('cubeGameWave', wave);
    localStorage.setItem('cubeGameScore', score);
    localStorage.setItem('cubeGameLives', lives);
    localStorage.setItem('cubeGameMaxWave', maxWaveReached);
    localStorage.setItem('cubeGameAmmo', ammo);

    console.log('💾 Игра сохранена!');
    showNotification('💾 Игра сохранена!', 'success');
}

// Проверка близости к кровати
function checkBedProximity() {
    if (!isInsideHouse || !playerBed || !hasBed) return false;

    // Получаем мировую позицию кровати
    const bedPos = new THREE.Vector3();
    playerBed.getWorldPosition(bedPos);

    // Проверяем расстояние до кровати
    const distance = player.position.distanceTo(bedPos);

    return distance < 1.5; // Близко к кровати
}

function exitHouseInterior() {
    if (!isInsideHouse) return;

    isInsideHouse = false;

    // Скрываем интерьер
    if (houseInterior) {
        houseInterior.visible = false;
    }

    // Показываем внешние объекты
    ground.visible = true;
    decorations.forEach(dec => dec.visible = true);
    obstacles.forEach(obs => obs.visible = true);
    bullets.forEach(bullet => bullet.visible = true);
    turrets.forEach(turret => turret.visible = true);
    if (playerHouse) playerHouse.visible = true;

    // Возвращаем кровать на внешнюю позицию (снаружи дома не видна)
    if (playerBed && hasBed) {
        // Убираем из интерьера и возвращаем в основную сцену
        if (playerBed.parent === houseInterior) {
            houseInterior.remove(playerBed);
            scene.add(playerBed);
        }
        playerBed.visible = false; // Кровать не видна снаружи
        playerBed.position.set(
            playerHouse.position.x - 1.2,
            playerHouse.position.y + 0.3,
            playerHouse.position.z - 0.5
        );
        playerBed.rotation.y = Math.PI / 2;
    }

    // Возвращаем игрока на улицу (рядом с дверью)
    if (savedOutdoorPosition) {
        player.position.set(
            savedOutdoorPosition.x,
            savedOutdoorPosition.y,
            savedOutdoorPosition.z
        );
    } else if (playerHouse) {
        player.position.set(
            playerHouse.position.x,
            0.5,
            playerHouse.position.z + 3
        );
    }
    player.rotation.y = -Math.PI / 2; // Смотрит вперед

    // Возвращаем небо
    scene.background = new THREE.Color(0x87ceeb);
    scene.fog = new THREE.Fog(0x87ceeb, 10, 60);

    // Возобновляем волны зомби
    waveActive = true;

    showNotification('🏠 Вы вышли из дома!', 'info');
}

function eatInHouse() {
    const foodCost = 50;

    if (coins >= foodCost) {
        coins -= foodCost;
        updateCoinsDisplay();
        localStorage.setItem('cubeGameCoins', coins);

        // Добавляем жизнь (максимум 10)
        lives = Math.min(lives + 1, 10);
        updateScoreDisplay();

        showNotification('🍖 Вы поели! +1 HP. Осталось монет: ' + coins, 'success');
    } else {
        showNotification('❌ Недостаточно монет для еды! Нужно: 50, есть: ' + coins, 'error');
    }
}

function checkHouseProximity() {
    if (!playerHouse || !player) return;

    // Если игрок внутри дома
    if (isInsideHouse) {
        // Показываем подсказку выхода
        let prompt = document.getElementById('housePrompt');
        if (!prompt) {
            prompt = document.createElement('div');
            prompt.id = 'housePrompt';
            prompt.style.cssText = `
                position: fixed;
                bottom: 150px;
                left: 50%;
                transform: translateX(-50%);
                padding: 20px 40px;
                border-radius: 15px;
                font-size: 20px;
                font-weight: bold;
                z-index: 500;
                text-align: center;
                background: linear-gradient(135deg, #FF6347 0%, #FF4500 100%);
                color: white;
                border: 3px solid gold;
            `;
            document.body.appendChild(prompt);
        }
        prompt.innerHTML = '🚪 E - Выйти из дома | F - Поесть (50💰, +1❤️)';

        // Проверяем нажатие E (выход)
        if (keys['KeyE']) {
            exitHouseInterior();
            keys['KeyE'] = false;
            const p = document.getElementById('housePrompt');
            if (p) document.body.removeChild(p);
        }

        // Проверяем нажатие F (еда)
        if (keys['KeyF']) {
            eatInHouse();
            keys['KeyF'] = false;
        }
        return;
    }

    // Если игрок на улице - проверяем расстояние до дома
    const distance = player.position.distanceTo(playerHouse.position);

    // Если игрок близко к дому (в радиусе 3 единиц)
    if (distance < 3) {
        if (!playerHouse.userData.showingPrompt) {
            playerHouse.userData.showingPrompt = true;

            // Показываем подсказку
            const prompt = document.createElement('div');
            prompt.id = 'housePrompt';
            prompt.style.cssText = `
                position: fixed;
                bottom: 150px;
                left: 50%;
                transform: translateX(-50%);
                padding: 20px 40px;
                border-radius: 15px;
                font-size: 20px;
                font-weight: bold;
                z-index: 500;
                text-align: center;
                background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
                color: white;
                border: 3px solid gold;
            `;
            prompt.innerHTML = '🏠 E - Войти в дом';
            document.body.appendChild(prompt);
        }

        // Проверяем нажатие E (вход в дом)
        if (keys['KeyE']) {
            enterHouseInterior();
            keys['KeyE'] = false; // Сбрасываем чтобы не вызывалось много раз
        }

        // Проверяем нажатие F (еда)
        if (keys['KeyF']) {
            eatInHouse();
            keys['KeyF'] = false; // Сбрасываем чтобы не вызывалось много раз
        }
    } else {
        // Убираем подсказку если игрок ушёл
        if (playerHouse.userData.showingPrompt) {
            const prompt = document.getElementById('housePrompt');
            if (prompt) document.body.removeChild(prompt);
            playerHouse.userData.showingPrompt = false;
        }
    }
}

function chopTree(tree) {
    if (tree.userData.canChop) {
        // Удаляем дерево из сцены
        scene.remove(tree);

        // Удаляем из массива декораций
        const index = decorations.indexOf(tree);
        if (index > -1) {
            decorations.splice(index, 1);
        }

        // Добавляем древесину
        wood += 1;
        updateWoodDisplay();

        // Визуальный эффект
        createWoodParticles(tree.position);

        // Звуковой эффект через визуальное уведомление
        showQuickNotification('+1 🪵', tree.position);
    }
}

function createWoodParticles(position) {
    // Создаем частицы дерева для эффекта рубки
    for (let i = 0; i < 10; i++) {
        const particleGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
        const particleMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);

        particle.position.copy(position);
        particle.position.y += 1;

        const velocity = new THREE.Vector3(
            (Math.random() - 0.5) * 0.2,
            Math.random() * 0.3,
            (Math.random() - 0.5) * 0.2
        );

        particle.userData.velocity = velocity;
        particle.userData.lifetime = 60; // Кадры жизни частицы

        scene.add(particle);
        bullets.push(particle); // Используем массив bullets для временного хранения
    }
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 30px 50px;
        border-radius: 15px;
        font-size: 28px;
        font-weight: bold;
        z-index: 500;
        text-align: center;
        border: 3px solid white;
        color: white;
    `;

    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)';
    }

    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        if (document.body.contains(notification)) {
            document.body.removeChild(notification);
        }
    }, 2000);
}

function showQuickNotification(text, position) {
    // Быстрое уведомление над срубленным деревом (через DOM, так как это проще)
    // В реальной игре это были бы 3D спрайты
}

function loseLife() {
    lives--;
    updateScoreDisplay();
    
    scene.background = new THREE.Color(0xFF0000);
    setTimeout(() => {
        scene.background = new THREE.Color(0x87ceeb);
    }, 200);
    
    if (lives <= 0) {
        gameOver();
    }
}

function startNewWave() {
    wave++;

    // Увеличиваем количество зомби с каждой волной (более агрессивная прогрессия)
    zombiesPerWave = 5 + (wave - 1) * 4; // 5, 9, 13, 17, 21, 25...
    zombiesInCurrentWave = zombiesPerWave;

    // Увеличиваем скорость зомби с каждой волной (более агрессивная прогрессия)
    obstacleSpeed = 0.02 + (wave - 1) * 0.008;

    // Обычные зомби получают HP на высоких волнах
    window.zombieBaseHP = Math.floor(wave / 10) + 1; // 1 HP на волнах 1-9, 2 HP на 10-19, и т.д.

    waveActive = true;
    updateScoreDisplay();

    // Визуальный эффект начала волны
    scene.background = new THREE.Color(Math.random() * 0x666666 + 0x6699bb);
    setTimeout(() => {
        scene.background = new THREE.Color(0x87ceeb);
    }, 300);

    // Награды каждые 5 волн
    if (wave % 5 === 0) {
        ammo = maxAmmo;
        updateAmmoDisplay();
        coins += 200;
        updateCoinsDisplay();
    }

    // Магазин каждые 40 волн
    if (wave % 40 === 0 && wave !== 30) {
        coins += 500;
        updateCoinsDisplay();
        gameActive = false;
        setTimeout(() => {
            openShop(true);
        }, 500);
    }

    // Разблокировка лазера на 10 волне
    if (wave === 10 && !unlockedWeapons.includes('laser')) {
        unlockedWeapons.push('laser');
        localStorage.setItem('cubeGameUnlockedWeapons', JSON.stringify(unlockedWeapons));

        gameActive = false;
        const notification = document.createElement('div');
        notification.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 60px; border-radius: 20px; font-size: 32px; font-weight: bold; z-index: 500; text-align: center; border: 5px solid gold; box-shadow: 0 0 50px rgba(102, 126, 234, 0.8);';
        notification.innerHTML = '🎉 ПОЗДРАВЛЯЕМ! 🎉<br><br>🔫⚡ РАЗБЛОКИРОВАНА ЛАЗЕРНАЯ ПУШКА! ⚡🔫<br><br>Нажмите 3 для выбора<br><br><span style="font-size: 20px; color: #FFD700;">Бесконечные патроны • Быстрая стрельба</span>';
        document.body.appendChild(notification);

        setTimeout(() => {
            document.body.removeChild(notification);
            gameActive = true;
        }, 5000);
    }

    // Катсцена победы на 180 уровне
    if (level === 180) {
            gameActive = false;

            // Очищаем всех зомби с экрана
            obstacles.forEach(obstacle => scene.remove(obstacle));
            obstacles = [];

            // Создаем катсцену победы
            const victoryScreen = document.createElement('div');
            victoryScreen.id = 'victoryScreen';
            victoryScreen.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%); z-index: 1000; display: flex; flex-direction: column; align-items: center; justify-content: center; animation: fadeIn 1s ease-in;';

            victoryScreen.innerHTML = `
                <style>
                    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                    @keyframes bounce {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-30px); }
                    }
                    @keyframes sparkle {
                        0%, 100% { opacity: 0; transform: scale(0); }
                        50% { opacity: 1; transform: scale(1); }
                    }
                    .victory-title {
                        font-size: 72px;
                        font-weight: bold;
                        color: gold;
                        text-shadow: 0 0 20px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 215, 0, 0.6);
                        margin-bottom: 30px;
                        animation: bounce 2s ease-in-out infinite;
                    }
                    .victory-content {
                        background: rgba(0, 0, 0, 0.7);
                        padding: 50px;
                        border-radius: 30px;
                        border: 5px solid gold;
                        box-shadow: 0 0 50px rgba(255, 215, 0, 0.5);
                        text-align: center;
                        max-width: 800px;
                    }
                    .victory-text {
                        font-size: 28px;
                        color: white;
                        margin: 20px 0;
                        line-height: 1.6;
                    }
                    .victory-stats {
                        font-size: 32px;
                        color: #FFD700;
                        font-weight: bold;
                        margin: 30px 0;
                    }
                    .victory-button {
                        padding: 20px 50px;
                        font-size: 28px;
                        font-weight: bold;
                        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                        border: none;
                        border-radius: 15px;
                        color: white;
                        cursor: pointer;
                        margin: 10px;
                        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
                        transition: transform 0.2s;
                    }
                    .victory-button:hover {
                        transform: scale(1.05);
                    }
                    .sparkle {
                        position: absolute;
                        width: 10px;
                        height: 10px;
                        background: gold;
                        border-radius: 50%;
                        animation: sparkle 1.5s ease-in-out infinite;
                    }
                </style>
                <div class="victory-title">🎉 ПОБЕДА! 🎉</div>
                <div class="victory-content">
                    <div class="victory-text">
                        🏆 ПОЗДРАВЛЯЕМ! 🏆<br><br>
                        ВЫ ДОСТИГЛИ 180 УРОВНЯ И СПАСЛИ МИР!<br><br>
                        🧟 Все зомби повержены! Вы настоящий герой! 🌍<br><br>
                        💪 Невероятное достижение! 💪
                    </div>
                    <div class="victory-stats">
                        📊 Ваш счёт: ${score}<br>
                        🏅 Уровень: ${level}<br>
                        💰 Награда: +10000 монет!
                    </div>
                    <div>
                        <button class="victory-button" onclick="continueAfterVictory()">Продолжить приключение</button>
                        <button class="victory-button" onclick="returnToMenuAfterVictory()">Вернуться в меню</button>
                    </div>
                </div>
            `;

            // Добавляем сверкающие звезды
            for (let i = 0; i < 50; i++) {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                sparkle.style.left = Math.random() * 100 + '%';
                sparkle.style.top = Math.random() * 100 + '%';
                sparkle.style.animationDelay = Math.random() * 1.5 + 's';
                victoryScreen.appendChild(sparkle);
            }

            document.body.appendChild(victoryScreen);

            // Даем награду
            coins += 10000;
            updateCoinsDisplay();
            localStorage.setItem('cubeGameCoins', coins);

            // Глобальные функции для кнопок
            window.continueAfterVictory = function() {
                const victoryScreen = document.getElementById('victoryScreen');
                if (victoryScreen) {
                    document.body.removeChild(victoryScreen);
                }
                gameActive = true;
            };

            window.returnToMenuAfterVictory = function() {
                const victoryScreen = document.getElementById('victoryScreen');
                if (victoryScreen) {
                    document.body.removeChild(victoryScreen);
                }
                returnToSkinMenu();
            };
    }

    if (wave > maxWaveReached) {
        maxWaveReached = wave;
        localStorage.setItem('cubeGameMaxWave', maxWaveReached);
    }

    // Спавним всех зомби волны
    spawnWaveZombies();
}

function spawnWaveZombies() {
    // Проверяем, нужен ли босс на этой волне (каждые 5 волн начиная с 5-й)
    const isBossWave = wave >= 5 && wave % 5 === 0;

    if (isBossWave) {
        // На волне с боссом спавним босса в конце
        for (let i = 0; i < zombiesPerWave - 1; i++) {
            setTimeout(() => {
                if (gameActive && waveActive) {
                    createObstacle();
                }
            }, i * 300);
        }

        // Спавним босса последним с задержкой
        setTimeout(() => {
            if (gameActive && waveActive) {
                createBoss();

                // Уведомление о появлении босса
                const notification = document.createElement('div');
                notification.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: linear-gradient(135deg, #8b0000 0%, #ff0000 100%); color: white; padding: 30px 50px; border-radius: 15px; font-size: 36px; font-weight: bold; z-index: 500; text-align: center; border: 5px solid gold; box-shadow: 0 0 50px rgba(255, 0, 0, 0.8); animation: pulse 0.5s infinite;';
                notification.innerHTML = '👑 БОСС ПОЯВИЛСЯ! 👑<br><br><span style="font-size: 24px;">Будь осторожен!</span>';
                document.body.appendChild(notification);

                // Эффект тряски экрана
                let shakeIntensity = 20;
                let shakeCount = 0;
                const shakeInterval = setInterval(() => {
                    if (camera) {
                        camera.position.x += (Math.random() - 0.5) * shakeIntensity * 0.01;
                        camera.position.y += (Math.random() - 0.5) * shakeIntensity * 0.01;
                    }
                    shakeCount++;
                    if (shakeCount > 20) {
                        clearInterval(shakeInterval);
                    }
                }, 50);

                // Красная вспышка
                scene.background = new THREE.Color(0xff0000);
                setTimeout(() => {
                    scene.background = new THREE.Color(0x87ceeb);
                }, 200);

                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 3000);
            }
        }, (zombiesPerWave - 1) * 300 + 600);
    } else {
        // Обычная волна - только обычные зомби
        for (let i = 0; i < zombiesPerWave; i++) {
            setTimeout(() => {
                if (gameActive && waveActive) {
                    createObstacle();
                }
            }, i * 300);
        }
    }
}

function checkWaveComplete() {
    if (waveActive && zombiesInCurrentWave <= 0 && obstacles.length === 0) {
        waveActive = false;

        // Проверка на победу (20 волна)
        if (wave >= 20) {
            victoryScene();
            return;
        }

        // Показываем уведомление о завершении волны
        const waveCompleteNotification = document.createElement('div');
        waveCompleteNotification.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%); color: white; padding: 30px 50px; border-radius: 15px; font-size: 36px; font-weight: bold; z-index: 500; text-align: center; border: 3px solid white;';
        waveCompleteNotification.innerHTML = `🎉 Волна ${wave} завершена! 🎉<br><br><span style="font-size: 24px;">Следующая волна через 1.5 секунды...</span>`;
        document.body.appendChild(waveCompleteNotification);

        setTimeout(() => {
            document.body.removeChild(waveCompleteNotification);
            startNewWave();
        }, 1500);
    }
}

// Функция воспроизведения победной музыки "Only You" (Far Cry 5)
function playVictoryMusic() {
    try {
        // Пытаемся загрузить песню "Only You" из разных источников
        const audio = new Audio();
        audio.volume = 0.4; // Умеренная громкость

        // Список возможных путей к файлу
        const audioPaths = [
            'audio/only-you.mp3',
            'only-you.mp3',
            'assets/only-you.mp3',
            // Публичный URL как запасной вариант (The Platters - Only You)
            'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' // Заглушка, замените на настоящий файл
        ];

        // Пробуем первый путь
        audio.src = audioPaths[0];

        audio.play().then(() => {
            console.log('🎵 "Only You" играет!');
            // Показываем уведомление о музыке
            const musicNotification = document.createElement('div');
            musicNotification.style.cssText = 'position: fixed; bottom: 20px; right: 20px; background: rgba(0, 0, 0, 0.8); color: white; padding: 15px 25px; border-radius: 10px; font-size: 18px; z-index: 1001; border: 2px solid gold;';
            musicNotification.innerHTML = '🎵 The Platters - Only You';
            document.body.appendChild(musicNotification);

            setTimeout(() => {
                if (document.body.contains(musicNotification)) {
                    document.body.removeChild(musicNotification);
                }
            }, 5000);
        }).catch(e => {
            console.warn('Не удалось воспроизвести "Only You":', e);
            console.log('💡 Подсказка: Добавьте файл "only-you.mp3" в папку "audio" для воспроизведения песни из Far Cry 5');

            // Показываем подсказку пользователю
            const hint = document.createElement('div');
            hint.style.cssText = 'position: fixed; bottom: 20px; right: 20px; background: rgba(255, 100, 100, 0.9); color: white; padding: 15px 25px; border-radius: 10px; font-size: 16px; z-index: 1001; border: 2px solid white; max-width: 300px;';
            hint.innerHTML = '🎵 Добавьте файл "only-you.mp3"<br>в папку "audio" для музыки';
            document.body.appendChild(hint);

            setTimeout(() => {
                if (document.body.contains(hint)) {
                    document.body.removeChild(hint);
                }
            }, 7000);
        });

        // Событие окончания музыки
        audio.onended = () => {
            console.log('🎵 Музыка закончилась');
        };

        // Сохраняем ссылку на аудио для возможности остановки
        window.victoryAudio = audio;

    } catch (e) {
        console.error('Ошибка воспроизведения музыки:', e);
    }
}

// Катсцена победы на 20-й волне
function victoryScene() {
    gameActive = false;
    waveActive = false;

    console.log('🎉 ПОБЕДА! Запуск катсцены...');

    // Запускаем победную музыку
    playVictoryMusic();

    // Переключаем камеру в режим третьего лица чтобы видеть персонажа
    const wasFirstPerson = cameraMode === 'firstPerson';
    if (wasFirstPerson) {
        cameraMode = 'thirdPerson';
        player.visible = true;

        // Убираем оружие из FPS рук и добавляем к персонажу
        if (currentWeapon && fpsHands) {
            fpsHands.remove(currentWeapon);
            if (fpsScene) fpsScene.remove(fpsHands);
            fpsHands = null;
            currentWeapon.position.set(0.15, 0.2, -0.4);
            currentWeapon.rotation.y = 0;
            currentWeapon.rotation.x = 0;
            currentWeapon.rotation.z = -Math.PI / 6;
            currentWeapon.scale.set(1, 1, 1);
            player.add(currentWeapon);
        }
    }

    // Камера отдаляется для лучшего обзора
    camera.position.set(player.position.x + 5, player.position.y + 3, player.position.z + 8);
    camera.lookAt(player.position);

    // Через 1 секунду персонаж поднимает оружие к голове
    setTimeout(() => {
        if (currentWeapon) {
            currentWeapon.position.set(-0.2, 0.6, 0.1); // К голове
            currentWeapon.rotation.set(0, Math.PI / 2, Math.PI / 2); // Развернуто к голове
        }

        // Ещё через секунду - выстрел
        setTimeout(() => {
            // Эффект выстрела - белая вспышка
            scene.background = new THREE.Color(0xFFFFFF);
            setTimeout(() => {
                scene.background = new THREE.Color(0x87ceeb);
            }, 100);

            // Создаём эффект дыма от выстрела
            for (let i = 0; i < 10; i++) {
                const smoke = new THREE.Mesh(
                    new THREE.SphereGeometry(0.1, 8, 8),
                    new THREE.MeshBasicMaterial({ color: 0x888888, transparent: true, opacity: 0.5 })
                );
                smoke.position.set(player.position.x - 0.2, player.position.y + 0.6, player.position.z);
                scene.add(smoke);

                setTimeout(() => {
                    scene.remove(smoke);
                }, 1000);
            }

            // Персонаж начинает падать
            let fallSpeed = 0;
            const fallInterval = setInterval(() => {
                fallSpeed += 0.02;
                player.position.y -= fallSpeed;
                player.rotation.x += 0.05; // Падает вперёд
                player.rotation.z += 0.02; // Немного вбок

                if (player.position.y <= 0.2) {
                    player.position.y = 0.2;
                    clearInterval(fallInterval);

                    // Персонаж лежит на земле
                    player.rotation.x = Math.PI / 2;
                    player.rotation.z = Math.PI / 4;
                }
            }, 16);

            // Сразу после выстрела начинается салют!
            setTimeout(() => {
                startVictoryFireworks();
            }, 500);

            // Показываем экран победы с чёрным юмором
            setTimeout(() => {
                const victoryScreen = document.createElement('div');
                victoryScreen.id = 'victoryScreen';
                victoryScreen.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(0, 0, 0, 0.85); padding: 50px; border-radius: 20px; z-index: 1000; text-align: center; color: white; border: 5px solid gold; box-shadow: 0 0 40px rgba(255, 215, 0, 0.5);';

                victoryScreen.innerHTML = `
                    <h1 style="font-size: 72px; margin: 20px; text-shadow: 0 0 20px #FFD700;">🎉 ПОБЕДА! 🎉</h1>
                    <p style="font-size: 36px; margin: 10px;">Вы прошли 20 волн!</p>
                    <p style="font-size: 28px; margin: 10px; color: #FFD700;">Счёт: ${score}</p>
                    <p style="font-size: 22px; margin: 20px; opacity: 0.7; font-style: italic;">Герой отдыхает... навсегда 💀</p>
                    <p style="font-size: 20px; margin: 10px;">🎆 Праздничный салют в честь героя! 🎆</p>
                `;
                document.body.appendChild(victoryScreen);

                // Показываем кнопки через 8 секунд (после салюта)
                setTimeout(() => {
                    victoryScreen.innerHTML += `
                        <button onclick="restartGame(); document.getElementById('victoryScreen').remove();"
                                style="margin: 20px; padding: 20px 40px; font-size: 24px; background: #4CAF50; color: white; border: none; border-radius: 10px; cursor: pointer; font-weight: bold; transition: transform 0.2s;"
                                onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                            🔄 Воскресить и играть снова
                        </button>
                        <button onclick="returnToSkinMenu(); document.getElementById('victoryScreen').remove();"
                                style="margin: 20px; padding: 20px 40px; font-size: 24px; background: #f44336; color: white; border: none; border-radius: 10px; cursor: pointer; font-weight: bold; transition: transform 0.2s;"
                                onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                            🏠 В главное меню
                        </button>
                    `;
                }, 8000);
            }, 1000);

        }, 1000);
    }, 1000);
}

// Запуск салюта для катсцены
function startVictoryFireworks() {
    let shotCount = 0;
    const maxShots = 15; // Больше фейерверков!

    const shootInterval = setInterval(() => {
        if (shotCount >= maxShots) {
            clearInterval(shootInterval);
            return;
        }

        // Создаём фейерверк
        createFirework();
        shotCount++;
    }, 400); // Чаще запускаем
}

// Функция создания фейерверка
function createFirework() {
    const colors = [0xFF0000, 0x00FF00, 0x0000FF, 0xFFFF00, 0xFF00FF, 0x00FFFF, 0xFFD700, 0xFF69B4];
    const color = colors[Math.floor(Math.random() * colors.length)];

    // Стартовая позиция - от персонажа вверх
    const startX = player.position.x + (Math.random() - 0.5) * 5;
    const startZ = player.position.z - 5 + (Math.random() - 0.5) * 5;

    // Ракета летит вверх
    const rocketGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const rocketMaterial = new THREE.MeshBasicMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 1
    });
    const rocket = new THREE.Mesh(rocketGeometry, rocketMaterial);
    rocket.position.set(startX, 0.5, startZ);
    scene.add(rocket);

    // Свет от ракеты
    const rocketLight = new THREE.PointLight(color, 2, 10);
    rocketLight.position.copy(rocket.position);
    scene.add(rocketLight);

    let rocketSpeed = 0.3;
    const targetHeight = 8 + Math.random() * 3;

    const rocketInterval = setInterval(() => {
        rocket.position.y += rocketSpeed;
        rocketLight.position.copy(rocket.position);

        // Когда ракета достигла высоты - взрыв
        if (rocket.position.y >= targetHeight) {
            clearInterval(rocketInterval);
            scene.remove(rocket);
            scene.remove(rocketLight);

            // Создаём частицы взрыва
            explodeFirework(rocket.position.clone(), color);
        }
    }, 16);
}

// Функция взрыва фейерверка
function explodeFirework(position, color) {
    const particleCount = 50;
    const particles = [];

    // Звук взрыва (визуальный эффект - вспышка)
    scene.background = new THREE.Color(color);
    setTimeout(() => {
        scene.background = new THREE.Color(0x87ceeb);
    }, 50);

    for (let i = 0; i < particleCount; i++) {
        const particleGeometry = new THREE.SphereGeometry(0.1, 4, 4);
        const particleMaterial = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 1
        });
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);
        particle.position.copy(position);
        scene.add(particle);

        // Случайное направление
        const velocity = new THREE.Vector3(
            (Math.random() - 0.5) * 0.3,
            (Math.random() - 0.5) * 0.3,
            (Math.random() - 0.5) * 0.3
        );

        particle.userData = {
            velocity: velocity,
            life: 100
        };

        particles.push(particle);
    }

    // Свет от взрыва
    const explosionLight = new THREE.PointLight(color, 5, 20);
    explosionLight.position.copy(position);
    scene.add(explosionLight);

    setTimeout(() => {
        scene.remove(explosionLight);
    }, 200);

    // Анимация частиц
    const particleInterval = setInterval(() => {
        for (let i = particles.length - 1; i >= 0; i--) {
            const particle = particles[i];

            // Двигаем частицу
            particle.position.add(particle.userData.velocity);

            // Гравитация
            particle.userData.velocity.y -= 0.01;

            // Уменьшаем время жизни
            particle.userData.life--;
            particle.material.opacity = particle.userData.life / 100;

            // Удаляем мёртвые частицы
            if (particle.userData.life <= 0) {
                scene.remove(particle);
                particles.splice(i, 1);
            }
        }

        // Если все частицы умерли - останавливаем интервал
        if (particles.length === 0) {
            clearInterval(particleInterval);
        }
    }, 16);
}

function gameOver() {
    gameActive = false;
    waveActive = false;
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('cubeGameHighScore', highScore);
    }
    document.getElementById('finalScore').textContent = score;
    document.getElementById('finalLevel').textContent = 'Волна ' + wave;
    document.getElementById('finalHighScore').textContent = highScore;
    document.getElementById('gameOver').style.display = 'block';
    document.getElementById('crosshair').style.display = 'none';
    document.getElementById('cameraMode').style.display = 'none';
}

function restartGame() {
    obstacles.forEach(obstacle => scene.remove(obstacle));
    obstacles = [];
    bullets.forEach(bullet => scene.remove(bullet));
    bullets = [];
    score = 0;
    wave = 0;
    zombiesPerWave = 5;
    zombiesInCurrentWave = 0;
    waveActive = false;
    lives = 3;
    ammo = maxAmmo;
    obstacleSpeed = 0.02;
    canShoot = true;
    isBurstFiring = false;
    burstCount = 0;
    cameraMode = 'firstPerson';
    updateScoreDisplay();
    updateAmmoDisplay();
    document.getElementById('gameOver').style.display = 'none';
    document.getElementById('crosshair').style.display = 'block';
    document.getElementById('cameraMode').style.display = 'block';
    document.getElementById('cameraMode').textContent = 'Вид: От первого лица';
    player.position.set(0, 0.5, 0);
    player.rotation.set(0, -Math.PI / 2, 0);
    playerVelocityY = 0;
    isJumping = false;
    gameActive = true;
    startNewWave();
}

function returnToSkinMenu() {
    gameActive = false;
    waveActive = false;

    score = 0;
    wave = 0;
    zombiesPerWave = 5;
    zombiesInCurrentWave = 0;
    lives = 3;
    ammo = maxAmmo;
    obstacleSpeed = 0.02;
    playerVelocityY = 0;
    isJumping = false;
    wood = 0; // Сбрасываем древесину

    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }

    if (scene) {
        obstacles.forEach(obstacle => scene.remove(obstacle));
        bullets.forEach(bullet => scene.remove(bullet));
        decorations.forEach(decoration => scene.remove(decoration));
        if (playerHouse) {
            scene.remove(playerHouse);
            playerHouse = null;
        }
        if (playerBed) {
            scene.remove(playerBed);
            playerBed = null;
        }
    }

    hasBed = false;

    obstacles = [];
    bullets = [];
    decorations = [];

    document.getElementById('gameOver').style.display = 'none';
    document.getElementById('score').style.display = 'none';
    document.getElementById('instructions').style.display = 'none';
    document.getElementById('weaponDisplay').style.display = 'none';
    document.getElementById('ammoDisplay').style.display = 'none';
    document.getElementById('cameraMode').style.display = 'none';
    document.getElementById('crosshair').style.display = 'none';
    document.getElementById('coinsDisplay').style.display = 'none';
    document.getElementById('openShopBtn').style.display = 'none';
    document.getElementById('woodDisplay').style.display = 'none';
    document.getElementById('buildHouseBtn').style.display = 'none';
    document.getElementById('buildBedBtn').style.display = 'none';
    document.getElementById('skinMenu').style.display = 'block';

    selectedSkin = null;
}
