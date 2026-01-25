// Основная игровая логика

// Глобальные переменные (используем var для совместимости с inline скриптом)
var scene, camera, renderer;
var player, ground, currentWeapon;
var obstacles = [];
var bullets = [];
var score = 0;
var highScore = parseInt(localStorage.getItem('cubeGameHighScore')) || 0;
var level = 1;
var lives = 3;
var ammo = 80;
var maxAmmo = 80;
var coins = parseInt(localStorage.getItem('cubeGameCoins')) || 0;
var gameActive = true;
var playerVelocityY = 0;
var isJumping = false;
var keys = {};
var selectedSkin = null;
var selectedWeapon = 'pistol';
var unlockedWeapons = JSON.parse(localStorage.getItem('cubeGameUnlockedWeapons')) || ['pistol', 'rifle', 'laser', 'gravity'];
var maxLevelReached = parseInt(localStorage.getItem('cubeGameMaxLevel')) || 1;
var animationId = null;
var decorations = [];
var canShoot = true;
var shootCooldown = 300;
var isBurstFiring = false;
var burstCount = 0;
var burstMax = 3;
var cameraMode = 'firstPerson';
var obstacleSpeed = 0.02;
var spawnRate = 0.03;
var gravity = -0.015;
var playerSpeed = 0.1;
var bulletSpeed = 0.5;
var cameraLookTarget;
var ownedSkins = ['dog', 'cat', 'fox', 'panda', 'rabbit', 'robot', 'cube', 'oval'];
var ownedWeapons = ['pistol', 'rifle'];
var turrets = [];
var hasTurret = false;
var hasFireTurret = false;
var hasLaserTurret = false;
var hasRocketTurret = false;

function updateScoreDisplay() {
    const heartsDisplay = '❤️'.repeat(lives);
    document.getElementById('score').textContent = 'Счёт: ' + score + ' | Рекорд: ' + highScore + ' | Уровень: ' + level + ' | Жизни: ' + heartsDisplay;
}

function updateAmmoDisplay() {
    document.getElementById('ammoDisplay').textContent = 'Патроны: ' + ammo + ' / ' + maxAmmo;
}

function updateCoinsDisplay() {
    document.getElementById('coinsDisplay').textContent = '💰 Монеты: ' + coins;
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

function updateLevel() {
    const newLevel = Math.floor(score / 50) + 1;
    if (newLevel > level) {
        level = newLevel;
        obstacleSpeed = 0.05 + (level - 1) * 0.01;
        spawnRate = 0.01 + (level - 1) * 0.008;
        
        if (level % 5 === 0) {
            ammo = maxAmmo;
            updateAmmoDisplay();
        }
        updateScoreDisplay();
        
        scene.background = new THREE.Color(Math.random() * 0x666666 + 0x6699bb);
        setTimeout(() => {
            scene.background = new THREE.Color(0x87ceeb);
        }, 300);
        
        if (level % 10 === 0) {
            coins += 300;
            updateCoinsDisplay();
            gameActive = false;
            setTimeout(() => {
                openShop(true);
            }, 500);
        }
        
        if (level === 20 && !unlockedWeapons.includes('laser')) {
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
        
        if (level === 50 && !unlockedWeapons.includes('gravity')) {
            unlockedWeapons.push('gravity');
            localStorage.setItem('cubeGameUnlockedWeapons', JSON.stringify(unlockedWeapons));
            
            gameActive = false;
            const notification = document.createElement('div');
            notification.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: linear-gradient(135deg, #9400D3 0%, #4B0082 100%); color: white; padding: 40px 60px; border-radius: 20px; font-size: 32px; font-weight: bold; z-index: 500; text-align: center; border: 5px solid gold; box-shadow: 0 0 50px rgba(148, 0, 211, 0.8);';
            notification.innerHTML = '🎉 НЕВЕРОЯТНО! 🎉<br><br>🌀💜 РАЗБЛОКИРОВАНА ГРАВИТАЦИОННАЯ ПУШКА! 💜🌀<br><br>Нажмите 4 для выбора<br><br><span style="font-size: 20px; color: #FFD700;">Бесконечные патроны • Массовое уничтожение</span>';
            document.body.appendChild(notification);
            
            setTimeout(() => {
                document.body.removeChild(notification);
                gameActive = true;
            
            // Показываем кнопку weapon4
            const weapon4Btn = document.getElementById('weapon4Btn');
            if (weapon4Btn) weapon4Btn.style.display = 'block';
            }, 5000);
        }
        
        if (level > maxLevelReached) {
            maxLevelReached = level;
            localStorage.setItem('cubeGameMaxLevel', maxLevelReached);
        }
    }
}

function gameOver() {
    gameActive = false;
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('cubeGameHighScore', highScore);
    }
    document.getElementById('finalScore').textContent = score;
    document.getElementById('finalLevel').textContent = level;
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
    level = 1;
    lives = 3;
    ammo = maxAmmo;
    obstacleSpeed = 0.05;
    spawnRate = 0.01;
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
}

function returnToSkinMenu() {
    gameActive = false;
    
    score = 0;
    level = 1;
    lives = 3;
    ammo = maxAmmo;
    obstacleSpeed = 0.05;
    spawnRate = 0.01;
    playerVelocityY = 0;
    isJumping = false;
    
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
    
    if (scene) {
        obstacles.forEach(obstacle => scene.remove(obstacle));
        bullets.forEach(bullet => scene.remove(bullet));
        decorations.forEach(decoration => scene.remove(decoration));
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
    document.getElementById('skinMenu').style.display = 'block';
    
    selectedSkin = null;
}
