/**
 * Игровой цикл - главный цикл игры и логика обновления
 * Зависимости: все глобальные переменные и модули
 */

function changeWeapon(weaponType) {
    if (selectedWeapon === weaponType) return;

    selectedWeapon = weaponType;

    // Удаляем старое оружие и руки
    if (currentWeapon) {
        if (cameraMode === 'firstPerson') {
            if (fpsHands) {
                fpsHands.remove(currentWeapon);
            } else {
                camera.remove(currentWeapon);
            }
        } else {
            player.remove(currentWeapon);
        }
    }

    // Создаем новое оружие
    currentWeapon = createWeapon(weaponType);

    // Позиционирование зависит от режима камеры
    if (cameraMode === 'firstPerson') {
        // Создаем руки если их еще нет
        if (!fpsHands) {
            console.log('Создаем FPS руки в changeWeapon...');
            fpsHands = createFPSHands();
            console.log('FPS руки созданы:', fpsHands);
            fpsScene.add(fpsHands);
            console.log('FPS руки добавлены в fpsScene');
        }

        // Вид от первого лица - оружие БЕЗ РУК, ближе к центру и выше
        currentWeapon.position.set(0.2, -0.15, -0.6); // Ближе к центру, выше, перед камерой
        // Поворачиваем оружие так чтобы ствол смотрел вперед (-Z)
        currentWeapon.rotation.x = 0;
        currentWeapon.rotation.y = -Math.PI / 2 - Math.PI / 20; // -90° + небольшой поворот
        currentWeapon.rotation.z = Math.PI / 20; // Небольшой наклон
        currentWeapon.scale.set(0.9, 0.9, 0.9); // Нормальный размер
        fpsHands.add(currentWeapon);
    } else {
        // Вид от третьего лица - оружие к игроку
        currentWeapon.position.set(0.15, 0.2, -0.4);
        currentWeapon.rotation.y = 0;
        currentWeapon.rotation.z = -Math.PI / 6;
        currentWeapon.scale.set(1, 1, 1);
        player.add(currentWeapon);
    }

    // Обновляем UI и параметры стрельбы
    const weaponConfigs = {
        pistol: { name: '🔫 Пистолет', cooldown: 300, ammo: 30 },
        rifle: { name: '🎯 Винтовка (x3)', cooldown: 800, ammo: 30 },
        ak47: { name: '🔫⚡ АК-47 (Калаш)', cooldown: 150, ammo: 30 },
        machinegun: { name: '🔫💨 Пулемёт', cooldown: 100, ammo: 80 },
        shotgun: { name: '💥🔫 Дробовик', cooldown: 600, ammo: 25 },
        laser: { name: '⚡🔫 Лазерная Пушка', cooldown: 100, ammo: 9999 },
        gravity: { name: '🌀💜 Гравитационная Пушка', cooldown: 150, ammo: 9999 },
        sniper: { name: '🎯🔭 Снайперка', cooldown: 1000, ammo: 15 },
        rocket: { name: '🚀💥 Ракетница', cooldown: 1500, ammo: 12 },
        crossbow: { name: '🏹 Арбалет', cooldown: 400, ammo: 40 },
        flamethrower: { name: '🔥🔫 Огнемёт', cooldown: 80, ammo: 50 },
        railgun: { name: '⚡🎯 Рельсотрон', cooldown: 1200, ammo: 10 },
        minigun: { name: '🔫⚙️ Минигун', cooldown: 50, ammo: 200 },
        grenade: { name: '💣🔫 Гранатомёт', cooldown: 1800, ammo: 15 },
        plasma: { name: '⚛️💫 Плазма', cooldown: 200, ammo: 60 },
    };

    const config = weaponConfigs[weaponType] || weaponConfigs.pistol;
    document.getElementById('weaponDisplay').textContent = 'Оружие: ' + config.name;
    shootCooldown = config.cooldown;
    maxAmmo = config.ammo;
    ammo = maxAmmo;
    updateAmmoDisplay();
}

function updatePlayer() {
    if (!gameActive) return;

    // Эффективная скорость (замедляется при прицеливании)
    const effectiveSpeed = isAiming ? playerSpeed * 0.5 : playerSpeed;

    // Движение влево-вправо
    if (keys['ArrowLeft']) {
        const newX = player.position.x - effectiveSpeed;
        // Разные границы для дома и улицы (широкие границы, основная проверка в checkCollisionInHouse)
        const leftBound = isInsideHouse ? -3 : -15; // Увеличена в 3 раза

        if (newX > leftBound) {
            // Проверяем коллизии
            if (!checkCollisionInHouse(newX, player.position.z)) {
                player.position.x = newX;
            }
        }
        // Запоминаем направление
        lastPlayerDirection = -Math.PI; // Влево
    }
    if (keys['ArrowRight']) {
        const newX = player.position.x + effectiveSpeed;
        // Разные границы для дома и улицы
        const rightBound = isInsideHouse ? 3 : 15; // Увеличена в 3 раза

        if (newX < rightBound) {
            // Проверяем коллизии
            if (!checkCollisionInHouse(newX, player.position.z)) {
                player.position.x = newX;
            }
        }
        // Запоминаем направление
        lastPlayerDirection = 0; // Вправо
    }

    // Движение вперёд-назад (в пределах базы)
    if (keys['ArrowUp']) {
        const newZ = player.position.z - effectiveSpeed;
        // Разные границы для дома и улицы
        const forwardBound = isInsideHouse ? -2.5 : -120; // Увеличена в 3 раза

        if (newZ > forwardBound) {
            // Проверяем коллизии
            if (!checkCollisionInHouse(player.position.x, newZ)) {
                player.position.z = newZ;
            }
        }
        // Запоминаем направление
        lastPlayerDirection = -Math.PI / 2; // Вперед
    }
    if (keys['ArrowDown']) {
        const newZ = player.position.z + effectiveSpeed;
        // Разные границы для дома и улицы
        const backBound = isInsideHouse ? 2.5 : 15; // Увеличена в 3 раза

        if (newZ < backBound) {
            // Проверяем коллизии
            if (!checkCollisionInHouse(player.position.x, newZ)) {
                player.position.z = newZ;
            }
        }
        // Запоминаем направление
        lastPlayerDirection = Math.PI / 2; // Назад
    }

    // Прыжок на пробел
    if (keys['Space'] && !isJumping) {
        playerVelocityY = jumpPower;
        isJumping = true;
    }

    // Смена оружия
    if (keys['Digit1']) {
        changeWeapon('pistol');
    }
    if (keys['Digit2']) {
        changeWeapon('rifle');
    }
    if (keys['Digit3']) {
        changeWeapon('ak47');
    }
    if (keys['KeyT'] && unlockedWeapons.includes('laser')) {
        changeWeapon('laser');
    }
    // Купленные оружия из магазина (клавиши 4-0)
    if (keys['Digit4'] && ownedWeapons.includes('machinegun')) {
        changeWeapon('machinegun');
    }
    if (keys['Digit5'] && ownedWeapons.includes('shotgun')) {
        changeWeapon('shotgun');
    }
    if (keys['Digit6'] && ownedWeapons.includes('sniper')) {
        changeWeapon('sniper');
    }
    if (keys['Digit7'] && ownedWeapons.includes('crossbow')) {
        changeWeapon('crossbow');
    }
    if (keys['Digit8'] && ownedWeapons.includes('flamethrower')) {
        changeWeapon('flamethrower');
    }
    if (keys['Digit9'] && ownedWeapons.includes('railgun')) {
        changeWeapon('railgun');
    }
    if (keys['Digit0'] && ownedWeapons.includes('minigun')) {
        changeWeapon('minigun');
    }
    // Дополнительные купленные оружия (клавиши Q, E, R)
    if (keys['KeyQ'] && ownedWeapons.includes('grenade')) {
        changeWeapon('grenade');
    }
    if (keys['KeyE'] && ownedWeapons.includes('plasma')) {
        changeWeapon('plasma');
    }
    if (keys['KeyR'] && ownedWeapons.includes('rocket')) {
        changeWeapon('rocket');
    }

    // Переключение режима камеры на ENTER
    if (keys['Enter']) {
        keys['Enter'] = false; // Чтобы не переключалось постоянно
        if (cameraMode === 'firstPerson') {
            cameraMode = 'thirdPerson';
            document.getElementById('crosshair').style.display = 'none';
            document.getElementById('cameraMode').textContent = 'Вид: От третьего лица';

            // Показываем персонажа в режиме третьего лица
            player.visible = true;

            // Переносим оружие от рук/fpsScene к игроку
            if (currentWeapon) {
                if (fpsHands) {
                    fpsHands.remove(currentWeapon);
                    fpsScene.remove(fpsHands);
                    fpsHands = null;
                }
                currentWeapon.position.set(0.15, 0.2, -0.4);
                currentWeapon.rotation.y = 0;
                currentWeapon.rotation.x = 0;
                currentWeapon.rotation.z = -Math.PI / 6;
                currentWeapon.scale.set(1, 1, 1);
                player.add(currentWeapon);
            }
        } else {
            cameraMode = 'firstPerson';
            document.getElementById('crosshair').style.display = 'block';
            document.getElementById('cameraMode').textContent = 'Вид: От первого лица';

            // Скрываем персонажа в режиме первого лица
            player.visible = false;

            // Переносим оружие от игрока к рукам
            if (currentWeapon) {
                player.remove(currentWeapon);

                // Создаем руки если их нет
                if (!fpsHands) {
                    fpsHands = createFPSHands();
                    fpsScene.add(fpsHands);
                }

                currentWeapon.position.set(0.2, -0.15, -0.6); // Ближе к центру, выше, перед камерой
                // Поворачиваем оружие так чтобы ствол смотрел вперед (-Z)
                currentWeapon.rotation.x = 0;
                currentWeapon.rotation.y = -Math.PI / 2 - Math.PI / 20; // -90° + небольшой поворот
                currentWeapon.rotation.z = Math.PI / 20; // Небольшой наклон
                currentWeapon.scale.set(0.9, 0.9, 0.9); // Нормальный размер
                fpsHands.add(currentWeapon);
            }
        }
    }

    // Переключение ручного/автоматического управления камерой на клавишу C
    if (keys['KeyC']) {
        keys['KeyC'] = false; // Чтобы не переключалось постоянно
        manualCameraControl = !manualCameraControl;

        // Показываем уведомление
        const notification = document.createElement('div');
        notification.style.cssText = 'position: fixed; top: 100px; left: 50%; transform: translateX(-50%); background: rgba(0, 0, 0, 0.8); color: white; padding: 15px 30px; border-radius: 10px; font-size: 18px; font-weight: bold; z-index: 999; border: 2px solid #667eea;';
        notification.textContent = manualCameraControl ? '🖱️ Ручное управление камерой' : '🎯 Автоприцеливание включено';
        document.body.appendChild(notification);

        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 2000);
    }

    // Сохранение игры на клавишу Command (Meta) - лечь в кровать
    if (keys['MetaLeft'] || keys['MetaRight']) {
        keys['MetaLeft'] = false;
        keys['MetaRight'] = false;

        // Проверяем, внутри ли игрок дома и рядом ли с кроватью
        if (isInsideHouse && checkBedProximity()) {
            saveGame();

            // Анимация "лечь в кровать" - небольшой эффект
            const sleepNotification = document.createElement('div');
            sleepNotification.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(0, 0, 0, 0.9); color: white; padding: 40px 60px; border-radius: 20px; font-size: 32px; font-weight: bold; z-index: 1000; border: 4px solid #FFD700;';
            sleepNotification.innerHTML = '😴 Сон...<br><span style="font-size: 20px;">Игра сохранена!</span>';
            document.body.appendChild(sleepNotification);

            setTimeout(() => {
                if (sleepNotification.parentNode) {
                    document.body.removeChild(sleepNotification);
                }
            }, 2000);
        } else if (isInsideHouse && !checkBedProximity()) {
            showNotification('🛏️ Подойдите ближе к кровати!', 'error');
        } else {
            showNotification('🏠 Сохранение доступно только в доме у кровати!', 'error');
        }
    }

    // Открытие магазина на клавишу B
    if (keys['KeyB']) {
        keys['KeyB'] = false;
        openShop();
    }

    // Поглаживание собаки на клавишу A (когда рядом)
    if (keys['KeyA']) {
        keys['KeyA'] = false;
        // Проверяем близость к собаке
        const dog = pets.find(pet => pet.userData.type === 'dog');
        if (dog && player) {
            const distance = player.position.distanceTo(dog.position);
            if (distance < 3) { // Если ближе 3 метров
                petDog();
            }
        }
    }

    // Прицеливание на клавишу K (ADS - Aim Down Sights)
    if (keys['KeyK']) {
        keys['KeyK'] = false;
        isAiming = !isAiming;

        // Скрываем 2D прицел CS:GO при ADS
        const crosshair = document.getElementById('crosshair');
        if (crosshair) {
            crosshair.style.display = isAiming ? 'none' : 'block';
        }

        // Показываем уведомление
        const notification = document.createElement('div');
        notification.style.cssText = 'position: fixed; top: 100px; left: 50%; transform: translateX(-50%); background: rgba(0, 0, 0, 0.8); color: white; padding: 15px 30px; border-radius: 10px; font-size: 18px; font-weight: bold; z-index: 999; border: 2px solid #ff6347;';
        notification.textContent = isAiming ? '🔍 Прицеливание' : '👁️ Обычный режим';
        document.body.appendChild(notification);

        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 1500);
    }

    // Стрельба на клавишу W
    if ((keys['KeyW'] || keys['KeyW'.toLowerCase()]) && canShoot && !isBurstFiring) {
        if (selectedWeapon === 'rifle') {
            shootBurst();
        } else if (selectedWeapon === 'shotgun') {
            shootShotgun();
            canShoot = false;
            setTimeout(() => { canShoot = true; }, shootCooldown);
        } else if (selectedWeapon === 'rocket') {
            shootRocket();
            canShoot = false;
            setTimeout(() => { canShoot = true; }, shootCooldown);
        } else if (selectedWeapon === 'plasma') {
            shootPlasma();
            canShoot = false;
            setTimeout(() => { canShoot = true; }, shootCooldown);
        } else {
            // Все остальные: пистолет, пулемёт, снайперка, лазер, арбалет
            shoot();
            canShoot = false;
            setTimeout(() => { canShoot = true; }, shootCooldown);
        }
    }

    playerVelocityY += gravity;
    player.position.y += playerVelocityY;

    if (player.position.y <= 0.5) {
        player.position.y = 0.5;
        playerVelocityY = 0;
        isJumping = false;
    }
}

function shoot() {
    // Проверяем наличие патронов (в тренировке безлимитные патроны)
    if (ammo <= 0 && gameMode !== 'training') {
        return;
    }

    // Статистика выстрелов для тренировки
    if (gameMode === 'training') {
        trainingStats.shots++;
        updateTrainingStatsUI();
        // Безлимитные патроны в тренировке
        ammo = 999;
        updateAmmoDisplay();
    }

    // Лазерная пушка не расходует патроны
    if (selectedWeapon !== 'laser' && selectedWeapon !== 'gravity' && gameMode !== 'training') {
        ammo--;
        updateAmmoDisplay();
    }

    // Анимация отдачи оружия (только в режиме FPS)
    if (cameraMode === 'firstPerson' && currentWeapon) {
        const originalZ = currentWeapon.position.z;
        const originalRotX = currentWeapon.rotation.x;

        // Отдача назад и вверх
        currentWeapon.position.z += 0.1;
        currentWeapon.rotation.x += 0.15;

        // Возвращаем обратно
        setTimeout(() => {
            if (currentWeapon) {
                currentWeapon.position.z = originalZ;
                currentWeapon.rotation.x = originalRotX;
            }
        }, 100);
    }


    // Создаем пулю в зависимости от типа оружия
    let bulletGeometry, bulletMaterial;

    if (selectedWeapon === 'laser') {
        // Лазерный луч - зеленый светящийся цилиндр
        bulletGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.6, 8);
        bulletMaterial = new THREE.MeshPhongMaterial({
            color: 0x00FF00,
            emissive: 0x00FF00,
            emissiveIntensity: 1.2,
            transparent: true,
            opacity: 0.9
        });
    } else if (selectedWeapon === 'gravity') {
        // Гравитационная сфера - фиолетовая с эффектами
        bulletGeometry = new THREE.SphereGeometry(0.35, 16, 16);
        bulletMaterial = new THREE.MeshPhongMaterial({
            color: 0x9400D3,
            emissive: 0xFF00FF,
            emissiveIntensity: 1.5,
            transparent: true,
            opacity: 0.8
        });
    } else {
        // Обычная пуля
        bulletGeometry = new THREE.SphereGeometry(0.25, 12, 12);
        bulletMaterial = new THREE.MeshPhongMaterial({
            color: 0xFF4500,
            emissive: 0xFF4500,
            emissiveIntensity: 0.8
        });
    }

    // Создаем mesh пули
    const bullet = new THREE.Mesh(bulletGeometry, bulletMaterial);

    // Пуля вылетает из позиции игрока
    if (cameraMode === 'firstPerson') {
        // От первого лица - из камеры
        bullet.position.copy(camera.position);
    } else {
        // От третьего лица - из игрока
        bullet.position.set(player.position.x, player.position.y + 0.5, player.position.z);
    }

    // Направление пули
    const direction = new THREE.Vector3();
    if (cameraMode === 'firstPerson') {
        // От первого лица - куда смотрит камера
        camera.getWorldDirection(direction);
    } else {
        // От третьего лица - от игрока к цели автоприцеливания
        direction.subVectors(cameraLookTarget, bullet.position).normalize();
    }
    bullet.userData.direction = direction;

    bullet.castShadow = true;
    scene.add(bullet);
    bullets.push(bullet);
}

function shootBurst() {
    // Стреляем очередью из 3 выстрелов с интервалом
    if (ammo <= 0) {
        return;
    }

    isBurstFiring = true;
    canShoot = false;
    burstCount = 0;

    const burstInterval = setInterval(() => {
        if (burstCount >= burstMax || ammo <= 0) {
            clearInterval(burstInterval);
            isBurstFiring = false;
            setTimeout(() => {
                canShoot = true;
            }, shootCooldown);
            return;
        }

        shoot();
        burstCount++;
    }, 100); // 100мс между выстрелами в очереди
}

function shootShotgun() {
    // Дробовик стреляет дробью (множество мелких пуль с разбросом)
    if (ammo <= 0) {
        return;
    }

    const pelletsCount = 15; // Больше дроби
    const spreadAngle = 0.25; // Разброс в радианах (~30 градусов конус)
    const ammoUsed = Math.min(1, ammo); // Дробовик использует 1 патрон

    ammo -= ammoUsed;

    // Получаем направление взгляда камеры
    const cameraDirection = new THREE.Vector3();
    camera.getWorldDirection(cameraDirection);

    for (let i = 0; i < pelletsCount; i++) {
        const bulletGeometry = new THREE.SphereGeometry(0.1, 8, 8); // Мелкая дробь
        const bulletMaterial = new THREE.MeshPhongMaterial({
            color: 0xFF6600,
            emissive: 0xFF4500,
            emissiveIntensity: 0.8
        });
        const bullet = new THREE.Mesh(bulletGeometry, bulletMaterial);

        // Пуля вылетает из позиции игрока
        if (cameraMode === 'firstPerson') {
            bullet.position.copy(camera.position);
        } else {
            bullet.position.set(player.position.x, player.position.y + 0.5, player.position.z);
        }

        // Направление - вперед от камеры с случайным разбросом
        const direction = cameraDirection.clone();

        // Добавляем случайный разброс
        direction.x += (Math.random() - 0.5) * spreadAngle;
        direction.y += (Math.random() - 0.5) * spreadAngle;
        direction.z += (Math.random() - 0.5) * spreadAngle * 0.5; // Меньше по Z

        direction.normalize();
        bullet.userData.direction = direction;

        bullet.castShadow = true;
        scene.add(bullet);
        bullets.push(bullet);
    }

    updateAmmoDisplay();
}

function shootRocket() {
    // Ракетница стреляет большой взрывной ракетой
    if (ammo <= 0) return;

    ammo--;
    updateAmmoDisplay();

    const bulletGeometry = new THREE.CylinderGeometry(0.15, 0.2, 0.4, 8);
    const bulletMaterial = new THREE.MeshPhongMaterial({
        color: 0xFF0000,
        emissive: 0xFF4500,
        emissiveIntensity: 0.9
    });
    const bullet = new THREE.Mesh(bulletGeometry, bulletMaterial);
    bullet.rotation.z = Math.PI / 2;

    if (cameraMode === 'firstPerson') {
        bullet.position.copy(camera.position);
    } else {
        bullet.position.set(player.position.x, player.position.y + 0.5, player.position.z);
    }

    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    bullet.userData.direction = direction;
    bullet.userData.isRocket = true; // Специальный флаг для ракеты

    bullet.castShadow = true;
    scene.add(bullet);
    bullets.push(bullet);
}

function shootPlasma() {
    // Плазменная пушка стреляет энергетическими шарами
    if (ammo <= 0) return;

    ammo--;
    updateAmmoDisplay();

    const bulletGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const bulletMaterial = new THREE.MeshPhongMaterial({
        color: 0xFF00FF,
        emissive: 0xFF00FF,
        emissiveIntensity: 1.0,
        transparent: true,
        opacity: 0.8
    });
    const bullet = new THREE.Mesh(bulletGeometry, bulletMaterial);

    if (cameraMode === 'firstPerson') {
        bullet.position.copy(camera.position);
    } else {
        bullet.position.set(player.position.x, player.position.y + 0.5, player.position.z);
    }

    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    bullet.userData.direction = direction;
    bullet.userData.isPlasma = true; // Специальный флаг

    bullet.castShadow = true;
    scene.add(bullet);
    bullets.push(bullet);
}

function updateAmmoDisplay() {
    const ammoColor = ammo < 10 ? 'red' : (ammo < 30 ? 'orange' : 'yellow');
    document.getElementById('ammoDisplay').innerHTML = `<span style="color: ${ammoColor}">Патроны: ${ammo} / ${maxAmmo}</span>`;
}

function updateBullets() {
    if (!gameActive) return;

    for (let i = bullets.length - 1; i >= 0; i--) {
        const bullet = bullets[i];

        // Если это частица от рубки дерева
        if (bullet.userData.velocity) {
            bullet.position.add(bullet.userData.velocity);
            bullet.userData.velocity.y += gravity; // Гравитация
            bullet.userData.lifetime--;

            if (bullet.userData.lifetime <= 0) {
                scene.remove(bullet);
                bullets.splice(i, 1);
            }
            continue;
        }

        // Пули летят по направлению камеры (автоприцеливание)
        if (bullet.userData.direction) {
            bullet.position.x += bullet.userData.direction.x * bulletSpeed;
            bullet.position.y += bullet.userData.direction.y * bulletSpeed;
            bullet.position.z += bullet.userData.direction.z * bulletSpeed;
        }

        // Проверяем столкновение с деревьями
        let treeHit = false;
        for (let k = decorations.length - 1; k >= 0; k--) {
            const decoration = decorations[k];
            if (decoration.userData.isTree && decoration.userData.canChop) {
                const distance = bullet.position.distanceTo(decoration.position);
                if (distance < 1.5) {
                    // Попали в дерево!
                    scene.remove(bullet);
                    bullets.splice(i, 1);
                    chopTree(decoration);
                    treeHit = true;
                    break;
                }
            }
        }

        if (treeHit) continue;

        // Проверяем столкновение с препятствиями
        for (let j = obstacles.length - 1; j >= 0; j--) {
            const obstacleGroup = obstacles[j];
            const target = obstacleGroup.userData.zombie || obstacleGroup.userData.cube;
            if (!target) continue;

            const targetWorldPos = new THREE.Vector3();
            target.getWorldPosition(targetWorldPos);

            // Проверяем попадание в тренировочных ботов (более точная проверка по частям тела)
            let hitDetected = false;
            let isHeadshot = false;

            if (obstacleGroup.userData.type === 'trainingBot' && gameMode === 'training') {
                // Проверяем попадание в каждую часть тела
                obstacleGroup.children.forEach(part => {
                    if (part.userData.isPart && !hitDetected) {
                        const partWorldPos = new THREE.Vector3();
                        part.getWorldPosition(partWorldPos);
                        const distToPart = bullet.position.distanceTo(partWorldPos);

                        if (distToPart < 0.8) {
                            hitDetected = true;
                            if (part.userData.isPart === 'head') {
                                isHeadshot = true;
                            }
                        }
                    }
                });
            } else {
                // Стандартная проверка для обычных врагов
                const distance = bullet.position.distanceTo(targetWorldPos);
                if (distance < 1.5) {
                    hitDetected = true;
                }
            }

            if (hitDetected) {
                // Попадание!
                scene.remove(bullet);
                bullets.splice(i, 1);

                // Статистика для тренировки
                if (gameMode === 'training' && obstacleGroup.userData.type === 'trainingBot') {
                    trainingStats.hits++;
                    if (isHeadshot) {
                        trainingStats.headshots++;
                        showNotification('🎯 ХЕДШОТ!', 'success');
                        obstacleGroup.userData.hp -= 50; // Хедшот наносит больше урона
                    } else {
                        obstacleGroup.userData.hp -= 10;
                    }
                    updateTrainingStatsUI();
                }

                // Отнимаем HP
                if (!obstacleGroup.userData.hp) {
                    obstacleGroup.userData.hp = 1; // Если HP не установлен, считаем что 1
                }

                // Обычный урон для не-тренировочных ботов
                if (obstacleGroup.userData.type !== 'trainingBot') {
                    obstacleGroup.userData.hp--;
                }

                // Обновляем HP бар для босса
                if (obstacleGroup.userData.isBoss && obstacleGroup.userData.hpBar) {
                    const hpPercent = obstacleGroup.userData.hp / obstacleGroup.userData.maxHp;
                    obstacleGroup.userData.hpBar.scale.x = hpPercent;
                    obstacleGroup.userData.hpBar.position.x = -(1 - hpPercent);

                    // Меняем цвет HP бара
                    if (hpPercent > 0.5) {
                        obstacleGroup.userData.hpBar.material.color.setHex(0xff0000);
                    } else if (hpPercent > 0.25) {
                        obstacleGroup.userData.hpBar.material.color.setHex(0xff8800);
                    } else {
                        obstacleGroup.userData.hpBar.material.color.setHex(0xffff00);
                    }
                }

                // Если HP <= 0, удаляем зомби (кроме тренировочных ботов)
                if (obstacleGroup.userData.hp <= 0) {
                    // Тренировочные боты восстанавливают HP вместо смерти
                    if (gameMode === 'training' && obstacleGroup.userData.type === 'trainingBot') {
                        obstacleGroup.userData.hp = obstacleGroup.userData.maxHp;
                        showNotification('✅ БОТ УНИЧТОЖЕН!', 'info');
                        // Не удаляем бота, просто восстанавливаем HP
                        break;
                    }

                    scene.remove(obstacleGroup);
                    obstacles.splice(j, 1);

                    // ФИНАЛЬНЫЙ БОСС - особая обработка смерти
                    if (obstacleGroup.userData.isFinalBoss) {
                        console.log('💀 ФИНАЛЬНЫЙ БОСС УБИТ! Запуск катсцены победы...');

                        // Убираем лейбл босса
                        const bossLabel = document.getElementById('finalBossLabel');
                        if (bossLabel && bossLabel.parentNode) {
                            document.body.removeChild(bossLabel);
                        }

                        // Огромная награда
                        score += 500;
                        coins += 500;

                        // Скрываем HP бар игрока
                        document.getElementById('playerHPContainer').style.display = 'none';

                        // Останавливаем игру
                        gameActive = false;
                        waveActive = false;

                        // Показываем уведомление
                        showNotification('🎉 ФИНАЛЬНЫЙ БОСС ПОВЕРЖЕН! 🎉', 'success');

                        // Запускаем катсцену победы через 1 секунду
                        setTimeout(() => {
                            console.log('🎬 Запуск функции victoryScene()...');
                            victoryScene();
                        }, 1000);
                    } else if (obstacleGroup.userData.isBoss) {
                        // Обычный босс
                        score += 100;
                        coins += 50;
                        zombiesInCurrentWave--; // Обычные боссы считаются в волне
                        zombiesKilled++; // Увеличиваем счетчик убитых зомби
                        checkFinalBossConditions(); // Проверяем условия финального босса
                    } else {
                        // Обычный зомби
                        score += 10;
                        coins += 5;
                        zombiesInCurrentWave--;
                        zombiesKilled++; // Увеличиваем счетчик убитых зомби
                        checkFinalBossConditions(); // Проверяем условия финального босса
                    }

                    updateCoinsDisplay();
                    // localStorage.setItem('cubeGameCoins', coins); // Сохранение отключено
                    updateScoreDisplay();
                    checkWaveComplete();
                }
                break;
            }
        }

        // Удаляем пули, которые улетели далеко
        const distanceFromPlayer = bullet.position.distanceTo(player.position);
        if (distanceFromPlayer > 60) {
            scene.remove(bullet);
            bullets.splice(i, 1);
        }
    }
}

function updateScoreDisplay() {
    const heartsDisplay = '❤️'.repeat(lives);
    document.getElementById('score').textContent = 'Счёт: ' + score + ' | Рекорд: ' + highScore + ' | 🌊 Волна: ' + wave + ' (' + zombiesInCurrentWave + '/' + zombiesPerWave + ' зомби) | Жизни: ' + heartsDisplay;
}

function loseLife() {
    lives--;
    updateScoreDisplay();

    // Эффект потери жизни - красная вспышка
    scene.background = new THREE.Color(0xFF0000);
    setTimeout(() => {
        scene.background = new THREE.Color(0x87ceeb);
    }, 200);

    if (lives <= 0) {
        gameOver();
    }
}

// Функция updateLevel перенесена в js/game.js как startNewWave()

function updateObstacles() {
    if (!gameActive) return;

    // Не спавним и не двигаем зомби если игрок внутри дома или на тренировочном полигоне
    if (isInsideHouse || isOnTrainingMap) return;

    // Создаём зомби постоянно пока не вызван финальный босс
    if (!finalBossSpawned && gameActive) {
        // Нормальная вероятность спавна как в оригинале (2% базовая)
        // Постепенно увеличивается до 5% по мере прогресса
        const baseChance = 0.02; // 2% базовый шанс
        const progressBonus = Math.min(zombiesKilled / 5000, 0.03); // +3% максимум
        const spawnChance = baseChance + progressBonus; // От 2% до 5%

        if (Math.random() < spawnChance) {
            createZombie();
            zombiesInCurrentWave++; // Увеличиваем счетчик для отображения
        }
    }

    // Двигаем и обрабатываем зомби
    for (let i = obstacles.length - 1; i >= 0; i--) {
        const obstacleGroup = obstacles[i];

        // ФИНАЛЬНЫЙ БОСС - особое поведение: идёт к игроку и атакует
        if (obstacleGroup.userData.isFinalBoss) {
            // Направление к игроку
            const dx = player.position.x - obstacleGroup.position.x;
            const dz = player.position.z - obstacleGroup.position.z;
            const distance = Math.sqrt(dx * dx + dz * dz);

            // Отладка (редко, чтобы не спамить консоль)
            if (Math.random() < 0.01) {
                console.log('👹 Финальный босс жив! Позиция:', obstacleGroup.position, 'Расстояние до игрока:', distance.toFixed(2), 'HP:', obstacleGroup.userData.hp);
            }

            // Поворачивается лицом к игроку
            const targetAngle = Math.atan2(dx, dz);
            obstacleGroup.rotation.y = targetAngle;

            // Если дальше 5 метров - идет к игроку
            if (distance > 5) {
                const bossSpeed = 0.08; // Медленнее чем rush, но быстрее обычных зомби
                obstacleGroup.position.x += (dx / distance) * bossSpeed;
                obstacleGroup.position.z += (dz / distance) * bossSpeed;

                // Ограничиваем позицию босса в разумных пределах (предотвращаем выход за границы)
                obstacleGroup.position.x = Math.max(-18, Math.min(18, obstacleGroup.position.x));
                obstacleGroup.position.z = Math.max(-150, Math.min(20, obstacleGroup.position.z));
            } else {
                // На расстоянии 5 метров - атакует!
                // Инициализируем таймер атаки если его нет
                if (!obstacleGroup.userData.attackCooldown) {
                    obstacleGroup.userData.attackCooldown = 0;
                }

                obstacleGroup.userData.attackCooldown--;

                // Атакует каждые 2 секунды (120 кадров при 60 FPS)
                if (obstacleGroup.userData.attackCooldown <= 0) {
                    obstacleGroup.userData.attackCooldown = 120;

                    // Наносим урон игроку (четверть HP = 25)
                    const damage = 25;
                    playerHP -= damage;

                    // Если HP закончилось, теряем жизнь и восстанавливаем HP
                    if (playerHP <= 0) {
                        lives--;
                        playerHP = maxPlayerHP;
                    }

                    updateScoreDisplay();
                    updatePlayerHPDisplay();

                    // Эффект атаки босса - красная вспышка
                    scene.background = new THREE.Color(0xFF0000);
                    setTimeout(() => {
                        scene.background = new THREE.Color(0x87ceeb);
                    }, 200);

                    // Уведомление об атаке
                    const attackNotif = document.createElement('div');
                    attackNotif.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(255, 0, 0, 0.9); color: white; padding: 30px 50px; border-radius: 15px; font-size: 32px; font-weight: bold; z-index: 999; border: 3px solid #8B0000; box-shadow: 0 0 30px rgba(255, 0, 0, 0.8);';
                    attackNotif.innerHTML = '💀 БОСС АТАКУЕТ! -25 HP';
                    document.body.appendChild(attackNotif);
                    setTimeout(() => {
                        if (document.body.contains(attackNotif)) {
                            document.body.removeChild(attackNotif);
                        }
                    }, 1000);

                    // Анимация удара руками
                    if (obstacleGroup.userData.leftArm && obstacleGroup.userData.rightArm) {
                        obstacleGroup.userData.leftArm.rotation.x = Math.PI / 3;
                        obstacleGroup.userData.rightArm.rotation.x = Math.PI / 3;
                        setTimeout(() => {
                            obstacleGroup.userData.leftArm.rotation.x = -Math.PI / 4;
                            obstacleGroup.userData.rightArm.rotation.x = -Math.PI / 4;
                        }, 200);
                    }

                    // Проверка на game over
                    if (lives <= 0) {
                        gameOver();
                    }
                }

                // Анимация угрожающих взмахов руками
                if (obstacleGroup.userData.leftArm && obstacleGroup.userData.rightArm) {
                    const armWave = Math.sin(Date.now() * 0.005) * 0.3;
                    obstacleGroup.userData.leftArm.rotation.x = -Math.PI / 4 + armWave;
                    obstacleGroup.userData.rightArm.rotation.x = -Math.PI / 4 - armWave;
                }
            }
        } else {
            // Обычные зомби двигаются к игроку (как босс)
            const dx = player.position.x - obstacleGroup.position.x;
            const dz = player.position.z - obstacleGroup.position.z;
            const distance = Math.sqrt(dx * dx + dz * dz);

            // Поворачиваются к игроку
            if (distance > 0.1) {
                const targetAngle = Math.atan2(dx, dz);
                obstacleGroup.rotation.y = targetAngle;

                // Двигаются к игроку
                obstacleGroup.position.x += (dx / distance) * obstacleSpeed;
                obstacleGroup.position.z += (dz / distance) * obstacleSpeed;
            }
        }

        // Анимация ног зомби
        const leftLeg = obstacleGroup.userData.leftLeg;
        const rightLeg = obstacleGroup.userData.rightLeg;
        if (leftLeg && rightLeg) {
            obstacleGroup.userData.legPhase += 0.1;
            const swingAngle = Math.sin(obstacleGroup.userData.legPhase) * 0.3;
            leftLeg.rotation.x = swingAngle;
            rightLeg.rotation.x = -swingAngle;
        }

        // Анимация ауры босса
        if (obstacleGroup.userData.aura) {
            const time = Date.now() * 0.001;
            obstacleGroup.userData.aura.material.opacity = 0.2 + Math.sin(time * 2) * 0.1;
        }

        // Обновление HP бара
        if (obstacleGroup.userData.hpBar) {
            const hpRatio = obstacleGroup.userData.hp / obstacleGroup.userData.maxHp;
            obstacleGroup.userData.hpBar.scale.x = hpRatio;
            obstacleGroup.userData.hpBar.position.x = -(1 - hpRatio) * 0.4;

            // Цвет HP бара
            if (hpRatio > 0.6) {
                obstacleGroup.userData.hpBar.material.color.setHex(0x00ff00);
            } else if (hpRatio > 0.3) {
                obstacleGroup.userData.hpBar.material.color.setHex(0xffff00);
            } else {
                obstacleGroup.userData.hpBar.material.color.setHex(0xff0000);
            }

            // ФИНАЛЬНЫЙ БОСС - при низком HP (5%) бросается на игрока для трагичной катсцены
            if (obstacleGroup.userData.isFinalBoss) {
                if (hpRatio < 0.05 && !obstacleGroup.userData.canBite) {
                    obstacleGroup.userData.canBite = true;
                }

                // Когда HP совсем низкий, босс делает отчаянный рывок к игроку для катсцены
                if (obstacleGroup.userData.canBite && !obstacleGroup.userData.biteTriggered) {
                    // Направление к игроку
                    const dx = player.position.x - obstacleGroup.position.x;
                    const dz = player.position.z - obstacleGroup.position.z;
                    const distance = Math.sqrt(dx * dx + dz * dz);

                    // Бежит очень быстро к игроку, но только если достаточно далеко
                    if (distance > 2) {
                        const rushSpeed = 0.4;
                        obstacleGroup.position.x += (dx / distance) * rushSpeed;
                        obstacleGroup.position.z += (dz / distance) * rushSpeed;

                        // Ограничиваем позицию босса в разумных пределах
                        obstacleGroup.position.x = Math.max(-18, Math.min(18, obstacleGroup.position.x));
                        obstacleGroup.position.z = Math.max(-150, Math.min(20, obstacleGroup.position.z));
                    }

                    // Поворачивается к игроку
                    const targetAngle = Math.atan2(dx, dz);
                    obstacleGroup.rotation.y = targetAngle;

                    // Анимация рук (взмах перед укусом)
                    if (obstacleGroup.userData.leftArm && obstacleGroup.userData.rightArm) {
                        const armSwing = Math.sin(Date.now() * 0.01) * 0.5;
                        obstacleGroup.userData.leftArm.rotation.x = -Math.PI / 4 + armSwing;
                        obstacleGroup.userData.rightArm.rotation.x = -Math.PI / 4 + armSwing;
                    }

                    // Если босс близко к игроку - кусает и запускает трагичную катсцену!
                    if (distance < 2) {
                        console.log('oH');
                        obstacleGroup.userData.biteTriggered = true;
                        bossBitePlayer();
                    }
                }
            }
        }

        // Зомби дошёл до игрока - потеря жизни (НЕ для финального босса)
        if (!obstacleGroup.userData.isFinalBoss && obstacleGroup.position.z > 15) {
            scene.remove(obstacleGroup);
            obstacles.splice(i, 1);
            loseLife();
        }
    }

    // Проверяем конец волны (НЕ для 20 волны - там финальный босс)
    if (waveActive && zombiesInCurrentWave === 0 && obstacles.length === 0 && wave !== 20) {
        waveActive = false;

        // Перерыв между 10 и 11 волной (4 минуты)
        if (wave === 10) {
            gameActive = false;
            showNotification('🎉 Волна 10 завершена! Перерыв 4 минуты ⏰', 'success');

            // Таймер обратного отсчёта
            let timeLeft = 240; // 4 минуты = 240 секунд
            const timerDiv = document.createElement('div');
            timerDiv.id = 'waveTimer';
            timerDiv.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                padding: 50px;
                border-radius: 20px;
                font-size: 48px;
                font-weight: bold;
                z-index: 1000;
                text-align: center;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: 5px solid gold;
            `;
            document.body.appendChild(timerDiv);

            const timerInterval = setInterval(() => {
                timeLeft--;
                const minutes = Math.floor(timeLeft / 60);
                const seconds = timeLeft % 60;
                timerDiv.innerHTML = `⏰ Перерыв<br>${minutes}:${seconds.toString().padStart(2, '0')}`;

                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    document.body.removeChild(timerDiv);
                    gameActive = true;
                    startNewWave();
                    showNotification('⚔️ Волна 11 начинается!', 'info');
                }
            }, 1000);
        } else {
            // Обычная награда между волнами
            coins += 100;
            updateCoinsDisplay();
            showNotification(`✅ Волна ${wave} завершена! +100 монет`, 'success');

            setTimeout(() => {
                startNewWave();
            }, 2000);
        }
    }
}

// Обновление питомцев
function updatePets() {
    if (!gameActive) return;

    pets.forEach(pet => {
        // Уменьшаем кулдаун
        if (pet.userData.shootCooldown > 0) {
            pet.userData.shootCooldown--;
        }

        // Ищем ближайшего зомби
        let nearestZombie = null;
        let nearestDistance = pet.userData.attackRange || 10;

        obstacles.forEach(obstacleGroup => {
            const zombie = obstacleGroup.userData.zombie || obstacleGroup.userData.cube;
            if (!zombie) return;

            const zombieWorldPos = new THREE.Vector3();
            zombie.getWorldPosition(zombieWorldPos);

            const distance = pet.position.distanceTo(zombieWorldPos);
            if (distance < nearestDistance) {
                nearestDistance = distance;
                nearestZombie = { pos: zombieWorldPos, group: obstacleGroup };
            }
        });

        // Если есть зомби в радиусе атаки
        if (nearestZombie) {
            // Поворачиваемся к цели
            const dx = nearestZombie.pos.x - pet.position.x;
            const dz = nearestZombie.pos.z - pet.position.z;
            const targetAngle = Math.atan2(dx, dz);
            pet.rotation.y = targetAngle;

            const distanceToZombie = pet.position.distanceTo(nearestZombie.pos);

            // Атакуем если кулдаун закончился
            if (pet.userData.shootCooldown <= 0) {
                petAttack(pet, nearestZombie.pos, nearestZombie.group);

                // Устанавливаем кулдаун в зависимости от типа атаки
                const cooldowns = {
                    melee: 30,
                    ranged: 20,
                    fire: 40,
                    laser: 10,
                    magic: 25,
                    heal: 120
                };
                pet.userData.shootCooldown = cooldowns[pet.userData.attackType] || 30;
            }

            // Если ближний бой, двигаемся к зомби
            if (pet.userData.attackType === 'melee' && distanceToZombie > 1.5) {
                const moveX = dx * pet.userData.speed * 0.1;
                const moveZ = dz * pet.userData.speed * 0.1;
                pet.position.x += moveX;
                pet.position.z += moveZ;
            }
        } else {
            // Нет зомби поблизости - следуем за игроком
            if (player) {
                const dx = player.position.x - pet.position.x;
                const dz = player.position.z - pet.position.z;
                const distance = Math.sqrt(dx * dx + dz * dz);

                // Если далеко от игрока, подходим ближе
                if (distance > 3) {
                    const targetAngle = Math.atan2(dx, dz);
                    pet.rotation.y = targetAngle;

                    const moveX = dx * pet.userData.speed * 0.1;
                    const moveZ = dz * pet.userData.speed * 0.1;
                    pet.position.x += moveX;
                    pet.position.z += moveZ;
                }
            }
        }

        // Анимация крыльев для дракона
        if (pet.userData.wings) {
            const time = Date.now() * 0.003;
            pet.userData.wings[0].rotation.z = Math.PI / 4 + Math.sin(time) * 0.3;
            pet.userData.wings[1].rotation.z = -Math.PI / 4 - Math.sin(time) * 0.3;
        }

        // Летающие питомцы колеблются по Y
        if (pet.userData.canFly) {
            const time = Date.now() * 0.002;
            pet.position.y = 2 + Math.sin(time + pet.userData.flyOffset || 0) * 0.3;
        }
    });

    // Обновляем напарника
    if (companion && gameActive) {
        // Напарник следует за игроком
        if (player) {
            const dx = player.position.x - companion.position.x + 3;
            const dz = player.position.z - companion.position.z - 2;
            const distance = Math.sqrt(dx * dx + dz * dz);

            // Если далеко от игрока, подходим ближе
            if (distance > 1) {
                companion.position.x += dx * 0.05;
                companion.position.z += dz * 0.05;
            }
        }

        // Напарник стреляет по ближайшему зомби
        companion.userData.shootCooldown--;

        let nearestZombie = null;
        let nearestDistance = 30;

        obstacles.forEach(obstacleGroup => {
            const zombie = obstacleGroup.userData.zombie || obstacleGroup.userData.cube;
            if (!zombie) return;

            const zombieWorldPos = new THREE.Vector3();
            zombie.getWorldPosition(zombieWorldPos);

            const distance = companion.position.distanceTo(zombieWorldPos);
            if (distance < nearestDistance) {
                nearestDistance = distance;
                nearestZombie = { pos: zombieWorldPos, group: obstacleGroup };
            }
        });

        // Если есть зомби и кулдаун прошел, стреляем
        if (nearestZombie && companion.userData.shootCooldown <= 0) {
            companionShoot(companion, nearestZombie.pos);
            companion.userData.shootCooldown = 30; // Стреляет каждые 30 кадров
        }
    }
}

// Стрельба напарника
function companionShoot(companion, targetPos) {
    // Создаем пулю
    const bulletGeometry = new THREE.SphereGeometry(0.15, 8, 8);
    const bulletMaterial = new THREE.MeshPhongMaterial({
        color: 0x667eea,
        emissive: 0x667eea,
        emissiveIntensity: 0.8
    });
    const bullet = new THREE.Mesh(bulletGeometry, bulletMaterial);

    bullet.position.copy(companion.position);
    bullet.position.y += 1.5; // Пуля вылетает из уровня груди

    // Направление к цели
    const direction = new THREE.Vector3()
        .subVectors(targetPos, bullet.position)
        .normalize();

    bullet.userData.direction = direction;
    bullet.userData.isCompanionBullet = true;

    scene.add(bullet);
    bullets.push(bullet);
}

// Атака питомца
function petAttack(pet, targetPos, targetGroup) {
    const attackType = pet.userData.attackType;

    if (attackType === 'melee') {
        // Ближний бой - наносим урон напрямую если достаточно близко
        const distance = pet.position.distanceTo(targetPos);
        if (distance < 1.5 && targetGroup.userData.hp) {
            targetGroup.userData.hp -= pet.userData.damage || 2;

            if (targetGroup.userData.hp <= 0) {
                scene.remove(targetGroup);
                obstacles.splice(obstacles.indexOf(targetGroup), 1);
                score += targetGroup.userData.isBoss ? 100 : 10;
                coins += targetGroup.userData.isBoss ? 50 : 5;
                zombiesKilled++; // Увеличиваем счетчик убитых зомби
                checkFinalBossConditions(); // Проверяем условия финального босса
                updateCoinsDisplay();
                // localStorage.setItem('cubeGameCoins', coins); // Сохранение отключено
                zombiesInCurrentWave--;
                updateScoreDisplay();
                checkWaveComplete();
            } else if (targetGroup.userData.hpBar) {
                const hpPercent = targetGroup.userData.hp / targetGroup.userData.maxHp;
                targetGroup.userData.hpBar.scale.x = hpPercent;
                targetGroup.userData.hpBar.position.x = -(1 - hpPercent);
            }
        }
    } else if (attackType === 'heal') {
        // Лечение игрока
        if (lives < 3 && player) {
            const distance = pet.position.distanceTo(player.position);
            if (distance < 5) {
                lives = Math.min(lives + 1, 3);
                updateScoreDisplay();

                // Визуальный эффект лечения
                const healParticle = new THREE.Mesh(
                    new THREE.SphereGeometry(0.2),
                    new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.8 })
                );
                healParticle.position.copy(player.position);
                scene.add(healParticle);
                setTimeout(() => scene.remove(healParticle), 500);
            }
        }
    } else {
        // Дальние атаки - создаем снаряд
        const bulletGeometry = new THREE.SphereGeometry(0.15, 8, 8);
        let bulletMaterial;

        switch(attackType) {
            case 'fire':
                bulletMaterial = new THREE.MeshPhongMaterial({ color: 0xff4500, emissive: 0xff4500, emissiveIntensity: 1 });
                break;
            case 'laser':
                bulletMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00, emissive: 0x00ff00, emissiveIntensity: 1 });
                break;
            case 'magic':
                bulletMaterial = new THREE.MeshPhongMaterial({ color: 0xff00ff, emissive: 0xff00ff, emissiveIntensity: 1 });
                break;
            default:
                bulletMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00, emissive: 0xffff00, emissiveIntensity: 0.8 });
        }

        const bullet = new THREE.Mesh(bulletGeometry, bulletMaterial);
        bullet.position.set(
            pet.position.x,
            pet.position.y + 0.5,
            pet.position.z
        );

        const direction = new THREE.Vector3()
            .subVectors(targetPos, bullet.position)
            .normalize();

        bullet.userData.direction = direction;
        bullet.userData.speed = 0.5;
        bullet.userData.isPetBullet = true;
        bullet.userData.damage = pet.userData.damage || 2;

        scene.add(bullet);
        bullets.push(bullet);
    }
}

function checkCollision(obj1, obstacleGroup) {
    // Получаем мировую позицию зомби или кубика в группе
    const target = obstacleGroup.userData.zombie || obstacleGroup.userData.cube;
    if (!target) return false;

    const targetWorldPos = new THREE.Vector3();
    target.getWorldPosition(targetWorldPos);

    const distance = obj1.position.distanceTo(targetWorldPos);
    return distance < 1.2;
}

function gameOver() {
    gameActive = false;
    // Обновляем рекорд
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
    wood = 0; // Сбрасываем древесину
    obstacleSpeed = 0.015; // Медленная скорость зомби
    spawnRate = 0.03; // Много зомби
    canShoot = true;
    isBurstFiring = false;
    burstCount = 0;
    cameraMode = 'firstPerson';

    // Удаляем построенный дом и кровать
    if (playerHouse) {
        scene.remove(playerHouse);
        playerHouse = null;
    }
    if (playerBed) {
        scene.remove(playerBed);
        playerBed = null;
    }
    hasBed = false;

    updateScoreDisplay();
    updateAmmoDisplay();
    updateWoodDisplay();
    document.getElementById('gameOver').style.display = 'none';
    document.getElementById('crosshair').style.display = 'block';
    document.getElementById('cameraMode').style.display = 'block';
    document.getElementById('cameraMode').textContent = 'Вид: От первого лица';
    player.position.set(0, 0.5, 0);
    player.rotation.set(0, -Math.PI / 2, 0); // Смотрит на кубики
    playerVelocityY = 0;
    isJumping = false;
    gameActive = true;
}

function returnToSkinMenu() {
    // Останавливаем анимацию
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }

    // Останавливаем игру
    gameActive = false;

    // Сбрасываем параметры игры
    score = 0;
    level = 1;
    lives = 3;
    ammo = maxAmmo;
    obstacleSpeed = 0.015;
    spawnRate = 0.01;
    playerVelocityY = 0;
    isJumping = false;
    canShoot = true;
    isBurstFiring = false;
    burstCount = 0;
    selectedSkin = null;
    cameraMode = 'firstPerson';

    // Показываем меню выбора скина
    document.getElementById('gameOver').style.display = 'none';
    document.getElementById('score').style.display = 'none';
    document.getElementById('instructions').style.display = 'none';
    document.getElementById('weaponDisplay').style.display = 'none';
    document.getElementById('ammoDisplay').style.display = 'none';
    document.getElementById('crosshair').style.display = 'none';
    document.getElementById('cameraMode').style.display = 'none';
    document.getElementById('skinMenu').style.display = 'block';
}

function findNearestObstacle() {
    let nearest = null;
    let bestScore = Infinity;

    obstacles.forEach(obstacleGroup => {
        const target = obstacleGroup.userData.zombie || obstacleGroup.userData.cube;
        if (!target) return;

        const targetWorldPos = new THREE.Vector3();
        target.getWorldPosition(targetWorldPos);

        // Рассматриваем только цели впереди игрока
        if (targetWorldPos.z < player.position.z) {
            const distance = player.position.distanceTo(targetWorldPos);

            // Вектор направления от игрока к цели
            const directionToTarget = new THREE.Vector3()
                .subVectors(targetWorldPos, player.position)
                .normalize();

            // Направление взгляда (вперед по -Z)
            const forward = new THREE.Vector3(0, 0, -1);

            // Угловое отклонение (чем меньше, тем лучше)
            const angle = Math.acos(directionToTarget.dot(forward));

            // Комбинированная оценка: расстояние + угол (приоритет центральным целям)
            const score = distance + angle * 5;

            if (score < bestScore) {
                bestScore = score;
                nearest = targetWorldPos;
            }
        }
    });

    return nearest;
}

function updateCamera() {
    if (!gameActive) return;

    if (cameraMode === 'firstPerson') {
        // Вид от первого лица - камера ВСЕГДА на уровне глаз игрока
        camera.position.x = player.position.x;
        camera.position.y = player.position.y + 0.7;
        camera.position.z = player.position.z;

        // При прицеливании только меняем FOV
        if (isAiming) {
            if (camera.fov > 50) {
                camera.fov -= 3;
                camera.updateProjectionMatrix();
            }
        } else {
            if (camera.fov < 75) {
                camera.fov += 3;
                camera.updateProjectionMatrix();
            }
        }

        if (manualCameraControl) {
            // Ручное управление камерой через тач/мышь
            const lookDistance = 10;
            const targetLook = new THREE.Vector3(
                player.position.x + Math.sin(cameraYaw) * Math.cos(cameraPitch) * lookDistance,
                player.position.y + 0.7 + Math.sin(cameraPitch) * lookDistance,
                player.position.z + Math.cos(cameraYaw) * Math.cos(cameraPitch) * lookDistance
            );
            cameraLookTarget.lerp(targetLook, 0.2);
            camera.lookAt(cameraLookTarget);
        } else {
            // Автоприцеливание на ближайший кубик с плавным переходом
            const nearestCube = findNearestObstacle();
            let targetLook;
            if (nearestCube) {
                targetLook = nearestCube.clone();
            } else {
                // Если кубиков нет, смотрим вперед
                targetLook = new THREE.Vector3(player.position.x, player.position.y + 0.7, player.position.z - 10);
            }

            // Плавное следование за целью (lerp)
            cameraLookTarget.lerp(targetLook, 0.15);
            camera.lookAt(cameraLookTarget);
        }
    } else {
        // Вид от третьего лица - камера позади и выше игрока
        if (manualCameraControl) {
            // Ручное управление - камера вращается вокруг игрока
            const distance = 8;
            const height = 5;
            camera.position.x = player.position.x + Math.sin(cameraYaw) * distance;
            camera.position.y = player.position.y + height + Math.sin(cameraPitch) * 3;
            camera.position.z = player.position.z + Math.cos(cameraYaw) * distance;

            // Смотрим на игрока
            const targetLook = new THREE.Vector3(
                player.position.x,
                player.position.y + 0.5,
                player.position.z
            );
            cameraLookTarget.lerp(targetLook, 0.2);
            camera.lookAt(cameraLookTarget);
        } else {
            // Автоматическая камера
            camera.position.x = player.position.x;
            camera.position.y = player.position.y + 5; // Выше игрока
            camera.position.z = player.position.z + 8; // Позади игрока

            // Автоприцеливание на ближайший кубик для стрельбы
            const nearestCube = findNearestObstacle();
            let targetLook;
            if (nearestCube) {
                targetLook = nearestCube.clone();
            } else {
                // Если кубиков нет, смотрим на игрока и вперед
                targetLook = new THREE.Vector3(player.position.x, player.position.y, player.position.z - 10);
            }

            // Плавное следование за целью
            cameraLookTarget.lerp(targetLook, 0.15);
            camera.lookAt(cameraLookTarget);
        }
    }
}

function updateTurrets() {
    if (!gameActive) return;

    // Турели не стреляют когда игрок внутри дома
    if (isInsideHouse) return;

    turrets.forEach(turret => {
        // Уменьшаем кулдаун
        if (turret.userData.shootCooldown > 0) {
            turret.userData.shootCooldown--;
        }

        // Ищем ближайшего зомби
        let nearestZombie = null;
        let nearestDistance = 20; // Радиус обстрела

        obstacles.forEach(obstacleGroup => {
            const zombie = obstacleGroup.userData.zombie || obstacleGroup.userData.cube;
            if (!zombie) return;

            const zombieWorldPos = new THREE.Vector3();
            zombie.getWorldPosition(zombieWorldPos);

            const distance = turret.position.distanceTo(zombieWorldPos);
            if (distance < nearestDistance) {
                nearestDistance = distance;
                nearestZombie = { pos: zombieWorldPos, group: obstacleGroup };
            }
        });

        // Если нашли зомби, поворачиваемся к нему и стреляем
        if (nearestZombie) {
            // Вычисляем угол к цели
            const dx = nearestZombie.pos.x - turret.position.x;
            const dz = nearestZombie.pos.z - turret.position.z;
            const targetAngle = Math.atan2(dx, dz);

            // Поворачиваем части турели в зависимости от типа
            const turretType = turret.userData.type;

            // Стандартные части (head, barrel)
            if (turret.userData.head) {
                turret.userData.head.rotation.y = targetAngle;
            }
            if (turret.userData.barrel) {
                turret.userData.barrel.rotation.y = targetAngle;
            }

            // Специфичные части для разных типов турелей
            if (turret.userData.speaker) { // sonic
                turret.userData.speaker.rotation.y = targetAngle;
            }
            if (turret.userData.sphere) { // gravity
                turret.userData.sphere.rotation.y = targetAngle;
            }
            if (turret.userData.nozzle) { // flamethrower
                turret.userData.nozzle.rotation.y = targetAngle;
            }
            if (turret.userData.core) { // nuclear, antimatter
                turret.userData.core.rotation.y = targetAngle;
            }
            if (turret.userData.antiCore) { // antimatter
                turret.userData.antiCore.rotation.y = targetAngle;
            }
            if (turret.userData.cube) { // quantum
                turret.userData.cube.rotation.y = targetAngle;
            }
            if (turret.userData.hole) { // blackhole
                turret.userData.hole.rotation.y = targetAngle;
            }
            if (turret.userData.clock) { // time
                turret.userData.clock.rotation.y = targetAngle;
            }
            if (turret.userData.hand) { // time
                turret.userData.hand.rotation.y = targetAngle;
            }
            if (turret.userData.shield) { // shield
                turret.userData.shield.rotation.y = targetAngle;
            }
            if (turret.userData.orb) { // energy
                turret.userData.orb.rotation.y = targetAngle;
            }
            if (turret.userData.launcher) { // meteor
                turret.userData.launcher.rotation.y = targetAngle;
            }
            if (turret.userData.cloud) { // storm
                turret.userData.cloud.rotation.y = targetAngle;
            }

            // Для турелей без вращающихся частей (tesla, rainbow, healing, minigun, shotgun)
            // - они стреляют во всех направлениях или автоматически
            // Поворачиваем всю турель если нет вращающихся частей
            if (!turret.userData.head && !turret.userData.barrel &&
                !turret.userData.speaker && !turret.userData.sphere &&
                !turret.userData.nozzle && !turret.userData.core &&
                !turret.userData.cube && !turret.userData.hole &&
                !turret.userData.clock && !turret.userData.shield &&
                !turret.userData.orb && !turret.userData.launcher &&
                !turret.userData.cloud) {
                turret.rotation.y = targetAngle;
            }

            // Стреляем если кулдаун закончился
            if (turret.userData.shootCooldown <= 0) {
                turretShoot(turret, nearestZombie.pos);
                // Разный кулдаун для разных турелей
                const cooldowns = {
                    basic: 20, fire: 40, laser: 5, rocket: 60, freeze: 30,
                    electric: 15, poison: 35, explosive: 50, sonic: 25,
                    plasma: 12, tesla: 18, gravityt: 35, railgunt: 45, minigunt: 3,
                    flamethrower: 8, sniper: 50, shotgunt: 22, cannon: 55, nuclear: 100,
                    rainbow: 10, healing: 60, shield: 70, quantum: 30, blackhole: 80,
                    timet: 40, energyt: 15, meteor: 65, stormt: 20, antimatter: 90
                };
                turret.userData.shootCooldown = cooldowns[turret.userData.type] || 20;
            }
        }
    });
}

function turretShoot(turret, targetPos) {
    const turretType = turret.userData.type || 'basic';

    // Разные параметры для разных типов турелей
    const bulletConfigs = {
        basic: { size: 0.2, color: 0xffff00, emissive: 0xffff00 },
        fire: { size: 0.3, color: 0xFF4500, emissive: 0xFF4500 },
        laser: { size: 0.15, color: 0x00FFFF, emissive: 0x00FFFF },
        rocket: { size: 0.4, color: 0xAA00FF, emissive: 0xAA00FF },
        freeze: { size: 0.25, color: 0x00FFFF, emissive: 0x00CED1 },
        electric: { size: 0.2, color: 0xFFFF00, emissive: 0xFFD700 },
        poison: { size: 0.3, color: 0x00FF00, emissive: 0x32CD32 },
        explosive: { size: 0.35, color: 0xFF4500, emissive: 0x8B0000 },
        sonic: { size: 0.25, color: 0x00BFFF, emissive: 0x1E90FF },
        plasma: { size: 0.28, color: 0x8a2be2, emissive: 0x9932cc },
        tesla: { size: 0.22, color: 0x9400d3, emissive: 0x9400d3 },
        gravityt: { size: 0.3, color: 0x4b0082, emissive: 0x4b0082 },
        railgunt: { size: 0.18, color: 0x0080ff, emissive: 0x0080ff },
        minigunt: { size: 0.15, color: 0xff4500, emissive: 0xff4500 },
        flamethrower: { size: 0.32, color: 0xff0000, emissive: 0xff0000 },
        sniper: { size: 0.2, color: 0xd2691e, emissive: 0xd2691e },
        shotgunt: { size: 0.2, color: 0xdaa520, emissive: 0xdaa520 },
        cannon: { size: 0.4, color: 0x708090, emissive: 0x708090 },
        nuclear: { size: 0.5, color: 0x00ff00, emissive: 0x00ff00 },
        rainbow: { size: 0.25, color: 0xffffff, emissive: 0xffffff },
        healing: { size: 0.25, color: 0x00ff7f, emissive: 0x00ff7f },
        shield: { size: 0.3, color: 0x1e90ff, emissive: 0x1e90ff },
        quantum: { size: 0.27, color: 0xba55d3, emissive: 0xba55d3 },
        blackhole: { size: 0.35, color: 0x000000, emissive: 0x4b0082 },
        timet: { size: 0.26, color: 0xffd700, emissive: 0xffd700 },
        energyt: { size: 0.24, color: 0xffffff, emissive: 0xffffff },
        meteor: { size: 0.45, color: 0xdc143c, emissive: 0xdc143c },
        stormt: { size: 0.23, color: 0x6495ed, emissive: 0x6495ed },
        antimatter: { size: 0.38, color: 0xff0000, emissive: 0xb22222 }
    };

    const config = bulletConfigs[turretType];
    const bulletGeometry = new THREE.SphereGeometry(config.size, 8, 8);
    const bulletMaterial = new THREE.MeshPhongMaterial({
        color: config.color,
        emissive: config.emissive,
        emissiveIntensity: turretType === 'fire' ? 1.0 : 0.8
    });
    const bullet = new THREE.Mesh(bulletGeometry, bulletMaterial);

    bullet.position.set(
        turret.position.x,
        turret.position.y + 1.1,
        turret.position.z
    );

    const direction = new THREE.Vector3()
        .subVectors(targetPos, bullet.position)
        .normalize();

    bullet.userData.direction = direction;
    bullet.userData.isTurretBullet = true;
    bullet.userData.turretType = turretType;

    bullet.castShadow = true;
    scene.add(bullet);
    bullets.push(bullet);
}

// Переменная для хранения индикатора кровати
let bedIndicator = null;

// Функция обновления позиции оружия для ADS
function updateWeaponADS() {
    if (!currentWeapon || cameraMode !== 'firstPerson') return;

    // Целевая позиция оружия
    let targetX, targetY, targetZ;

    if (isAiming) {
        // При прицеливании - оружие ближе к камере и по центру
        targetX = 0.05;  // Почти по центру
        targetY = -0.08; // Чуть ниже
        targetZ = -0.4;  // Ближе к камере
    } else {
        // Обычная позиция
        targetX = 0.2;
        targetY = -0.15;
        targetZ = -0.6;
    }

    // Плавно перемещаем оружие к целевой позиции
    currentWeapon.position.x += (targetX - currentWeapon.position.x) * 0.15;
    currentWeapon.position.y += (targetY - currentWeapon.position.y) * 0.15;
    currentWeapon.position.z += (targetZ - currentWeapon.position.z) * 0.15;
}

function animate() {
    animationId = requestAnimationFrame(animate);
    if (gameActive) {
        updatePlayer();
        updateObstacles();
        updateBullets();
        updateTurrets();
        updatePets();
        updateCamera();
        updateWeaponADS(); // Обновляем позицию оружия для ADS

        // Уменьшаем голод и жажду с течением времени
        if (!window.hungerThirstFrame) window.hungerThirstFrame = 0;
        window.hungerThirstFrame++;

        // Каждые 5 секунд (примерно 300 кадров при 60fps) уменьшаем голод и жажду на 1
        if (window.hungerThirstFrame >= 300) {
            window.hungerThirstFrame = 0;
            hunger = Math.max(0, hunger - 1);
            thirst = Math.max(0, thirst - 1);
            updateHungerDisplay();
            updateThirstDisplay();

            // Если голод или жажда слишком низкие, отнимаем жизнь
            if (hunger <= 0 || thirst <= 0) {
                lives--;
                updateScoreDisplay();
                if (hunger <= 0) {
                    hunger = 30; // Восстанавливаем немного после потери жизни
                    showNotification('💀 Вы умерли от голода! -1 жизнь', 'error');
                }
                if (thirst <= 0) {
                    thirst = 30; // Восстанавливаем немного после потери жизни
                    showNotification('💀 Вы умерли от жажды! -1 жизнь', 'error');
                }
                if (lives <= 0) {
                    gameOver();
                }
            }
        }

        checkHouseProximity(); // Проверяем близость к дому

        // Проверяем близость к кровати и показываем подсказку
        if (isInsideHouse && hasBed && checkBedProximity()) {
            // Показываем индикатор если его нет
            if (!bedIndicator) {
                bedIndicator = document.createElement('div');
                bedIndicator.style.cssText = 'position: fixed; top: 200px; left: 50%; transform: translateX(-50%); background: rgba(255, 215, 0, 0.9); color: black; padding: 20px 40px; border-radius: 15px; font-size: 24px; font-weight: bold; z-index: 999; border: 3px solid #FFD700; animation: pulse 2s infinite;';
                bedIndicator.innerHTML = '🛏️ Нажмите <kbd style="background: #333; color: white; padding: 5px 10px; border-radius: 5px;">⌘ Command</kbd> чтобы лечь в кровать и сохранить игру';
                document.body.appendChild(bedIndicator);
            }
        } else {
            // Убираем индикатор если далеко от кровати
            if (bedIndicator && bedIndicator.parentNode) {
                document.body.removeChild(bedIndicator);
                bedIndicator = null;
            }
        }

        // Проверяем близость к собаке и показываем подсказку (если напарник еще не появился)
        if (!hasCompanion && pets && pets.length > 0) {
            const dog = pets.find(pet => pet.userData.type === 'dog');
            if (dog && player) {
                const distance = player.position.distanceTo(dog.position);
                const petIndicator = document.getElementById('petDogIndicator');

                if (distance < 3) { // Если ближе 3 метров
                    if (petIndicator) {
                        petIndicator.style.display = 'block';
                    }
                } else {
                    if (petIndicator) {
                        petIndicator.style.display = 'none';
                    }
                }
            }
        } else {
            // Скрываем индикатор если напарник уже появился
            const petIndicator = document.getElementById('petDogIndicator');
            if (petIndicator) {
                petIndicator.style.display = 'none';
            }
        }

        // Проверяем близость к еде и газировке в доме
        if (isInsideHouse && houseInterior) {
            let nearFood = false;
            let nearSoda = false;

            houseInterior.children.forEach(child => {
                if (child.userData.isFood) {
                    const worldPos = new THREE.Vector3();
                    child.getWorldPosition(worldPos);
                    const distance = player.position.distanceTo(worldPos);
                    if (distance < 1.5) {
                        nearFood = true;
                    }
                }
                if (child.userData.isSoda) {
                    const worldPos = new THREE.Vector3();
                    child.getWorldPosition(worldPos);
                    const distance = player.position.distanceTo(worldPos);
                    if (distance < 1.5) {
                        nearSoda = true;
                    }
                }
            });

            // Показываем индикатор еды
            if (nearFood) {
                if (!window.foodIndicator) {
                    window.foodIndicator = document.createElement('div');
                    window.foodIndicator.style.cssText = 'position: fixed; top: 270px; left: 50%; transform: translateX(-50%); background: rgba(255, 140, 0, 0.95); color: white; padding: 15px 30px; border-radius: 12px; font-size: 20px; font-weight: bold; z-index: 999; border: 3px solid #FF8C00; cursor: pointer; transition: all 0.2s;';
                    window.foodIndicator.innerHTML = '🍖 Нажмите чтобы купить еду (50 монет)';
                    window.foodIndicator.onclick = buyAndEatFood;
                    window.foodIndicator.onmouseenter = function() { this.style.transform = 'translateX(-50%) scale(1.05)'; };
                    window.foodIndicator.onmouseleave = function() { this.style.transform = 'translateX(-50%) scale(1)'; };
                    document.body.appendChild(window.foodIndicator);
                }
            } else {
                if (window.foodIndicator && window.foodIndicator.parentNode) {
                    document.body.removeChild(window.foodIndicator);
                    window.foodIndicator = null;
                }
            }

            // Показываем индикатор газировки
            if (nearSoda) {
                if (!window.sodaIndicator) {
                    window.sodaIndicator = document.createElement('div');
                    window.sodaIndicator.style.cssText = 'position: fixed; top: 340px; left: 50%; transform: translateX(-50%); background: rgba(30, 144, 255, 0.95); color: white; padding: 15px 30px; border-radius: 12px; font-size: 20px; font-weight: bold; z-index: 999; border: 3px solid #1E90FF; cursor: pointer; transition: all 0.2s;';
                    window.sodaIndicator.innerHTML = '💧 Нажмите чтобы купить газировку (50 монет)';
                    window.sodaIndicator.onclick = buyAndDrinkSoda;
                    window.sodaIndicator.onmouseenter = function() { this.style.transform = 'translateX(-50%) scale(1.05)'; };
                    window.sodaIndicator.onmouseleave = function() { this.style.transform = 'translateX(-50%) scale(1)'; };
                    document.body.appendChild(window.sodaIndicator);
                }
            } else {
                if (window.sodaIndicator && window.sodaIndicator.parentNode) {
                    document.body.removeChild(window.sodaIndicator);
                    window.sodaIndicator = null;
                }
            }
        } else {
            // Убираем индикаторы если не в доме
            if (window.foodIndicator && window.foodIndicator.parentNode) {
                document.body.removeChild(window.foodIndicator);
                window.foodIndicator = null;
            }
            if (window.sodaIndicator && window.sodaIndicator.parentNode) {
                document.body.removeChild(window.sodaIndicator);
                window.sodaIndicator = null;
            }
        }

        // Обновляем позицию FPS рук чтобы они следовали за камерой
        if (fpsHands && cameraMode === 'firstPerson') {
            // Базовая позиция - камера
            fpsHands.position.copy(camera.position);

            // Добавляем покачивание рук от движения мыши (эффект инерции)
            fpsHands.position.x += handsSway.x * 0.15;
            fpsHands.position.y += handsSway.y * 0.15;

            // Копируем только горизонтальный поворот (yaw), игнорируем pitch (вверх-вниз)
            fpsHands.rotation.x = 0;
            fpsHands.rotation.y = camera.rotation.y;
            fpsHands.rotation.z = 0;

            // Затухание покачивания (возврат к исходной позиции)
            handsSway.x *= 0.85; // Быстро затухает
            handsSway.y *= 0.85;

            // Обнуление очень маленьких значений
            if (Math.abs(handsSway.x) < 0.001) handsSway.x = 0;
            if (Math.abs(handsSway.y) < 0.001) handsSway.y = 0;
        }
    }

    // Анимация облаков (медленное движение по небу)
    if (decorations && decorations.length > 0) {
        decorations.forEach(decoration => {
            // Проверяем является ли это облаком (в небе и белого цвета)
            if (decoration.position.y > 10 && decoration.children.length > 0) {
                // Медленное движение облака по оси X
                decoration.position.x += 0.01;

                // Если облако улетело далеко, возвращаем его обратно
                if (decoration.position.x > 50) {
                    decoration.position.x = -50;
                }
            }
        });
    }

    if (renderer && scene && camera) {
        // Рендерим основную сцену БЕЗ постобработки (обычный рендеринг)
        renderer.render(scene, camera);

        // Рендерим FPS сцену (руки и оружие) поверх основной
        if (fpsScene && cameraMode === 'firstPerson') {
            renderer.autoClear = false; // Не очищаем canvas
            renderer.clearDepth(); // Очищаем только depth buffer
            renderer.render(fpsScene, camera);

            renderer.autoClear = true; // Восстанавливаем
        }
    }
}

function onWindowResize() {
    if (camera) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }
    if (renderer) {
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

// Регистрируем обработчик изменения размера окна
window.addEventListener('resize', onWindowResize);

// Инициализируем event listeners один раз при загрузке страницы
// Обработка ввода с геймпада
