/**
 * Управление - обработка ввода (клавиатура, тач, геймпад)
 * Зависимости: глобальное состояние игры, keys объект
 */

// Геймпад переменные
let gamepad = null;
let gamepadIndex = null;
let lastShootButton = false;
let lastJumpButton = false;
let lastCameraButton = false;
let lastShopButton = false;
let lastWeaponButtons = [false, false, false, false];

function updateGamepad() {
    if (!gamepad) return;

    // Получаем актуальное состояние геймпада
    const gamepads = navigator.getGamepads();
    const gp = gamepads[gamepadIndex];
    if (!gp) return;

    // DualShock 4 маппинг:
    // Левый стик: axes[0] = X, axes[1] = Y
    // Правый стик: axes[2] = X, axes[3] = Y
    // Кнопки:
    // 0 = X (прыжок)
    // 1 = O (назад)
    // 2 = □ (сменить вид)
    // 3 = △ (открыть магазин)
    // 4 = L1 (оружие 1)
    // 5 = R1 (оружие 2)
    // 6 = L2 (оружие 3)
    // 7 = R2 (стрельба)
    // 12-15 = D-pad

    const deadzone = 0.15;

    // Левый стик - движение
    const leftStickX = Math.abs(gp.axes[0]) > deadzone ? gp.axes[0] : 0;
    const leftStickY = Math.abs(gp.axes[1]) > deadzone ? gp.axes[1] : 0;

    // Движение влево-вправо
    if (leftStickX < -deadzone) {
        keys['ArrowLeft'] = true;
        keys['ArrowRight'] = false;
    } else if (leftStickX > deadzone) {
        keys['ArrowRight'] = true;
        keys['ArrowLeft'] = false;
    } else {
        if (!gp.buttons[14]?.pressed && !gp.buttons[15]?.pressed) {
            keys['ArrowLeft'] = false;
            keys['ArrowRight'] = false;
        }
    }

    // Движение вперед-назад
    if (leftStickY < -deadzone) {
        keys['ArrowUp'] = true;
        keys['ArrowDown'] = false;
    } else if (leftStickY > deadzone) {
        keys['ArrowDown'] = true;
        keys['ArrowUp'] = false;
    } else {
        if (!gp.buttons[12]?.pressed && !gp.buttons[13]?.pressed) {
            keys['ArrowUp'] = false;
            keys['ArrowDown'] = false;
        }
    }

    // D-pad для движения (альтернатива)
    if (gp.buttons[14] && gp.buttons[14].pressed) { // D-pad Left
        keys['ArrowLeft'] = true;
    }
    if (gp.buttons[15] && gp.buttons[15].pressed) { // D-pad Right
        keys['ArrowRight'] = true;
    }
    if (gp.buttons[12] && gp.buttons[12].pressed) { // D-pad Up
        keys['ArrowUp'] = true;
    }
    if (gp.buttons[13] && gp.buttons[13].pressed) { // D-pad Down
        keys['ArrowDown'] = true;
    }

    // Кнопка X - прыжок
    if (gp.buttons[0] && gp.buttons[0].pressed) {
        if (!lastJumpButton) {
            keys['Space'] = true;
            lastJumpButton = true;
        }
    } else {
        keys['Space'] = false;
        lastJumpButton = false;
    }

    // R2 - стрельба
    if (gp.buttons[7] && gp.buttons[7].pressed) {
        keys['KeyW'] = true;
    } else {
        keys['KeyW'] = false;
    }

    // □ (Square) - смена вида камеры
    if (gp.buttons[2] && gp.buttons[2].pressed) {
        if (!lastCameraButton) {
            if (cameraMode === 'firstPerson') {
                cameraMode = 'thirdPerson';
                document.getElementById('crosshair').style.display = 'none';
                const camModeEl = document.getElementById('cameraMode');
                if (camModeEl) camModeEl.textContent = 'Вид: От третьего лица';
            } else {
                cameraMode = 'firstPerson';
                document.getElementById('crosshair').style.display = 'block';
                const camModeEl = document.getElementById('cameraMode');
                if (camModeEl) camModeEl.textContent = 'Вид: От первого лица';
            }
            lastCameraButton = true;
        }
    } else {
        lastCameraButton = false;
    }

    // △ (Triangle) - открыть магазин
    if (gp.buttons[3] && gp.buttons[3].pressed) {
        if (!lastShopButton) {
            keys['KeyB'] = true;
            lastShopButton = true;
            setTimeout(() => {
                keys['KeyB'] = false;
            }, 100);
        }
    } else {
        lastShopButton = false;
    }

    // L1 - оружие 1 (пистолет)
    if (gp.buttons[4] && gp.buttons[4].pressed) {
        if (!lastWeaponButtons[0]) {
            changeWeapon('pistol');
            lastWeaponButtons[0] = true;
        }
    } else {
        lastWeaponButtons[0] = false;
    }

    // R1 - оружие 2 (винтовка)
    if (gp.buttons[5] && gp.buttons[5].pressed) {
        if (!lastWeaponButtons[1]) {
            changeWeapon('rifle');
            lastWeaponButtons[1] = true;
        }
    } else {
        lastWeaponButtons[1] = false;
    }

    // L2 - оружие 3 (лазер)
    if (gp.buttons[6] && gp.buttons[6].pressed && gp.buttons[6].value > 0.5) {
        if (!lastWeaponButtons[2]) {
            if (unlockedWeapons.includes('laser')) {
                changeWeapon('laser');
            }
            lastWeaponButtons[2] = true;
        }
    } else {
        lastWeaponButtons[2] = false;
    }

    // O (Circle) - оружие 4 (гравитация)
    if (gp.buttons[1] && gp.buttons[1].pressed) {
        if (!lastWeaponButtons[3]) {
            if (unlockedWeapons.includes('gravity')) {
                changeWeapon('gravity');
            }
            lastWeaponButtons[3] = true;
        }
    } else {
        lastWeaponButtons[3] = false;
    }
}

// Вызываем updateGamepad в игровом цикле через requestAnimationFrame
function gamepadLoop() {
    updateGamepad();
    requestAnimationFrame(gamepadLoop);
}
gamepadLoop();

// Показываем подсказку при запуске
window.addEventListener('load', () => {
    setTimeout(() => {
        const hint = document.createElement('div');
        hint.style.cssText = 'position: fixed; bottom: 20px; right: 20px; background: rgba(0, 0, 0, 0.8); color: white; padding: 15px 25px; border-radius: 10px; font-size: 16px; z-index: 1000; border: 2px solid #667eea;';
        hint.innerHTML = '🎮 Подключите DualShock 4 для управления!<br>🕹️ Левый стик: движение | R2: стрельба | ✖️ X: прыжок<br>🔲 Square: вид | 🔺 Triangle: магазин | L1/R1: оружие';
        document.body.appendChild(hint);

        setTimeout(() => {
            if (hint.parentNode) {
                document.body.removeChild(hint);
            }
        }, 8000);
    }, 2000);
});

document.addEventListener('keydown', (e) => keys[e.code] = true);
document.addEventListener('keyup', (e) => keys[e.code] = false);

// Инициализируем event listeners после загрузки DOM
window.addEventListener('DOMContentLoaded', () => {
        document.getElementById('restart').addEventListener('click', restartGame);
    document.getElementById('changeSkin').addEventListener('click', returnToSkinMenu);
    document.getElementById('openShopBtn').addEventListener('click', () => {
        gameActive = false;
        document.getElementById('shopMenu').style.display = 'block';
        document.getElementById('score').style.display = 'none';
        document.getElementById('instructions').style.display = 'none';
        document.getElementById('weaponDisplay').style.display = 'none';
        document.getElementById('ammoDisplay').style.display = 'none';
        document.getElementById('cameraMode').style.display = 'none';
        document.getElementById('coinsDisplay').style.display = 'none';
        document.getElementById('crosshair').style.display = 'none';
        document.getElementById('openShopBtn').style.display = 'none';
        document.getElementById('openItemsShopBtn').style.display = 'none';
    });
    
    document.getElementById('openItemsShopBtn').addEventListener('click', () => {
        openShop(false);
    });
    document.getElementById('closeShopBtn').addEventListener('click', closeShop);
    document.getElementById('buyAmmoBtn').addEventListener('click', () => buyAmmo(40, 50));
    document.getElementById('buyAmmoBigBtn').addEventListener('click', () => buyAmmo(100, 100));
    
    // Event listeners для покупки оружия
    document.querySelectorAll('.buyWeaponBtn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const weaponType = e.target.getAttribute('data-weapon');
            const price = parseInt(e.target.getAttribute('data-price'));
            buyWeapon(weaponType, price);
        });
    });
    // document.getElementById('closeShop').addEventListener('click', () => {
    //     closeShop();
    //     gameActive = true;
    // });
    document.getElementById('closeShopBtn').addEventListener('click', () => {
        closeShop();
        gameActive = true;
    });
    document.getElementById('exitShopBtn').addEventListener('click', () => {
        document.getElementById('itemsShopMenu').style.display = 'none';
        returnToSkinMenu();
    });
    
    document.getElementById('continueBtn').addEventListener('click', () => {
        document.getElementById('itemsShopMenu').style.display = 'none';
        document.getElementById('score').style.display = 'block';
        document.getElementById('instructions').style.display = 'block';
        document.getElementById('weaponDisplay').style.display = 'block';
        document.getElementById('ammoDisplay').style.display = 'block';
        document.getElementById('cameraMode').style.display = 'block';
        document.getElementById('coinsDisplay').style.display = 'block';
        if (cameraMode === 'firstPerson') {
            document.getElementById('crosshair').style.display = 'block';
        }
        gameActive = true;
    });
    
    document.getElementById('exitShopBtn').addEventListener('click', () => {
        document.getElementById('itemsShopMenu').style.display = 'none';
        returnToSkinMenu();
    });
    
    // Обработчики для магазина оружия
    document.getElementById('openWeaponsShopBtn').addEventListener('click', () => {
        openWeaponsShop();
    });
    
    document.getElementById('continueWeaponsShopBtn').addEventListener('click', () => {
        document.getElementById('weaponsShopMenu').style.display = 'none';
        document.getElementById('score').style.display = 'block';
        document.getElementById('instructions').style.display = 'block';
        document.getElementById('weaponDisplay').style.display = 'block';
        document.getElementById('ammoDisplay').style.display = 'block';
        document.getElementById('cameraMode').style.display = 'block';
        document.getElementById('coinsDisplay').style.display = 'block';
        if (cameraMode === 'firstPerson') {
            document.getElementById('crosshair').style.display = 'block';
        }
        gameActive = true;
    });
    
        document.getElementById('exitWeaponsShopBtn').addEventListener('click', () => {
            document.getElementById('weaponsShopMenu').style.display = 'none';
        returnToSkinMenu();
    });

    // Обработчик кнопки постройки дома
    document.getElementById('buildHouseBtn').addEventListener('click', () => {
        buildHouse();
    });

    // Обработчик кнопки постройки кровати
    document.getElementById('buildBedBtn').addEventListener('click', () => {
        buildBed();
    });
});

// init() будет вызван после выбора скина (определён в init.js)

// Подключение геймпада
window.addEventListener('gamepadconnected', (e) => {
    console.log('Геймпад подключен:', e.gamepad.id);
    gamepad = e.gamepad;
    gamepadIndex = e.gamepad.index;

    // Показываем уведомление
    const notification = document.createElement('div');
    notification.style.cssText = 'position: fixed; top: 20px; left: 50%; transform: translateX(-50%); background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px 40px; border-radius: 15px; font-size: 24px; font-weight: bold; z-index: 1000; border: 3px solid gold;';
    notification.innerHTML = '🎮 DualShock 4 подключён!';
    document.body.appendChild(notification);

    setTimeout(() => {
        if (notification.parentNode) {
            document.body.removeChild(notification);
        }
    }, 3000);
});

// Отключение геймпада
window.addEventListener('gamepaddisconnected', (e) => {
    console.log('Геймпад отключен');
    if (e.gamepad.index === gamepadIndex) {
        gamepad = null;
        gamepadIndex = null;
    }
});

