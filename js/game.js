// Основная игровая логика

// Глобальные переменные (используем var для совместимости с inline скриптом)
var scene, camera, renderer;
var player, ground, currentWeapon;
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
var obstacleSpeed = 0.015;
var spawnRate = 0.03;
var gravity = -0.015;
var playerSpeed = 0.1;
var bulletSpeed = 0.5;
var jumpPower = 0.3;
var cameraLookTarget;
var ownedSkins = ['dog', 'cat', 'fox', 'panda', 'rabbit', 'robot', 'cube', 'oval'];
var ownedWeapons = JSON.parse(localStorage.getItem('cubeGameOwnedWeapons')) || ['pistol', 'rifle'];
var turrets = [];
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

        // Создаем дом рядом с игроком
        playerHouse = createHouse();
        playerHouse.position.set(-10, 0, player.position.z - 5); // Ставим слева от дорожки
        scene.add(playerHouse);

        // Показываем уведомление
        showNotification('🏠 Дом построен! Отличная работа!', 'success');

        // Даем бонус за постройку дома
        coins += 500;
        updateCoinsDisplay();
        lives = Math.min(lives + 1, 5); // Добавляем жизнь (максимум 5)
        updateScoreDisplay();

    } else {
        showNotification('❌ Недостаточно древесины! Нужно: ' + woodRequired + ', есть: ' + wood, 'error');
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
    }

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
    document.getElementById('skinMenu').style.display = 'block';

    selectedSkin = null;
}
