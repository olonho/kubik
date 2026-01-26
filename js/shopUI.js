/**
 * UI магазина - функции управления интерфейсом магазина
 * Зависимости: shopData.js, глобальное состояние игры, localStorage
 */

function openShop(showReward = false) {
    document.getElementById('itemsShopMenu').style.display = 'block';
    document.getElementById('score').style.display = 'none';
    document.getElementById('instructions').style.display = 'none';
    document.getElementById('weaponDisplay').style.display = 'none';
    document.getElementById('ammoDisplay').style.display = 'none';
    document.getElementById('cameraMode').style.display = 'none';
    document.getElementById('coinsDisplay').style.display = 'none';
    document.getElementById('crosshair').style.display = 'none';

    // Показываем сообщение о награде если это после прохождения 10 уровней
    if (showReward) {
        document.getElementById('shopRewardMessage').style.display = 'block';
        document.getElementById('rewardLevel').textContent = level;
    } else {
        document.getElementById('shopRewardMessage').style.display = 'none';
    }

    updateShopDisplay();
}


function updateShopDisplay() {
    document.getElementById('shopCoins').textContent = coins;

    // Отображаем скины
    const skinsContainer = document.getElementById('shopSkins');
    if (skinsContainer) {
        skinsContainer.innerHTML = '';
        shopItems.skins.forEach(item => {
            const owned = ownedSkins.includes(item.id);
            const itemDiv = document.createElement('div');
            itemDiv.className = 'shop-item' + (owned ? ' owned' : '');
            itemDiv.innerHTML = `
                <div class="shop-item-icon">${item.icon}</div>
                <div class="shop-item-name">${item.name}</div>
                <div class="shop-item-price">${owned ? 'Куплено' : '💰 ' + item.price}</div>
            `;
            if (!owned) {
                itemDiv.onclick = () => buyItem('skin', item);
            }
            skinsContainer.appendChild(itemDiv);
        });
    }
}

function buyItem(type, item) {
    if (coins >= item.price) {
        coins -= item.price;
        if (type === 'skin') {
            ownedSkins.push(item.id);
        } else if (type === 'weapon') {
            ownedWeapons.push(item.id);
        }
        updateShopDisplay();
        updateCoinsDisplay();
    } else {
        alert('Недостаточно монет! Нужно: ' + item.price + ', у вас: ' + coins);
    }
}

function buyTurret(type) {
    const prices = {
        basic: 1000, fire: 1500, laser: 2000, rocket: 2500, freeze: 3000,
        electric: 3500, poison: 4000, explosive: 4500, sonic: 5000,
        plasma: 5500, tesla: 6000, gravityt: 6500, railgunt: 7000, minigunt: 7500,
        flamethrower: 8000, sniper: 8500, shotgunt: 9000, cannon: 9500, nuclear: 10000,
        rainbow: 10500, healing: 11000, shield: 11500, quantum: 12000, blackhole: 12500,
        timet: 13000, energyt: 13500, meteor: 14000, stormt: 14500, antimatter: 15000
    };
    const price = prices[type];

    if (coins >= price) {
        coins -= price;

        switch(type) {
            case 'basic':
                hasTurret = true;
                createTurret();
                break;
            case 'fire':
                hasFireTurret = true;
                createFireTurret();
                break;
            case 'laser':
                hasLaserTurret = true;
                createLaserTurret();
                break;
            case 'rocket':
                hasRocketTurret = true;
                createRocketTurret();
                break;
            case 'freeze':
                hasFreezeTurret = true;
                createFreezeTurret();
                break;
            case 'electric':
                hasElectricTurret = true;
                createElectricTurret();
                break;
            case 'poison':
                hasPoisonTurret = true;
                createPoisonTurret();
                break;
            case 'explosive':
                hasExplosiveTurret = true;
                createExplosiveTurret();
                break;
            case 'sonic':
                hasSonicTurret = true;
                createSonicTurret();
                break;
            case 'plasma':
                hasPlasmaTurret = true;
                createPlasmaTurret();
                break;
            case 'tesla':
                hasTeslaTurret = true;
                createTeslaTurret();
                break;
            case 'gravityt':
                hasGravityTurret = true;
                createGravityTurret();
                break;
            case 'railgunt':
                hasRailgunTurret = true;
                createRailgunTurret();
                break;
            case 'minigunt':
                hasMinigunTurret = true;
                createMinigunTurret();
                break;
            case 'flamethrower':
                hasFlamethrowerTurret = true;
                createFlamethrowerTurret();
                break;
            case 'sniper':
                hasSniperTurret = true;
                createSniperTurret();
                break;
            case 'shotgunt':
                hasShotgunTurret = true;
                createShotgunTurret();
                break;
            case 'cannon':
                hasCannonTurret = true;
                createCannonTurret();
                break;
            case 'nuclear':
                hasNuclearTurret = true;
                createNuclearTurret();
                break;
            case 'rainbow':
                hasRainbowTurret = true;
                createRainbowTurret();
                break;
            case 'healing':
                hasHealingTurret = true;
                createHealingTurret();
                break;
            case 'shield':
                hasShieldTurret = true;
                createShieldTurret();
                break;
            case 'quantum':
                hasQuantumTurret = true;
                createQuantumTurret();
                break;
            case 'blackhole':
                hasBlackholeTurret = true;
                createBlackholeTurret();
                break;
            case 'timet':
                hasTimeTurret = true;
                createTimeTurret();
                break;
            case 'energyt':
                hasEnergyTurret = true;
                createEnergyTurret();
                break;
            case 'meteor':
                hasMeteorTurret = true;
                createMeteorTurret();
                break;
            case 'stormt':
                hasStormTurret = true;
                createStormTurret();
                break;
            case 'antimatter':
                hasAntimatterTurret = true;
                createAntimatterTurret();
                break;
        }

        updateShopDisplay();
        updateCoinsDisplay();
        localStorage.setItem('cubeGameCoins', coins);
    } else {
        alert('Недостаточно монет! Нужно: ' + price + ', у вас: ' + coins);
    }
}

function updateCoinsDisplay() {
    document.getElementById('coinsDisplay').textContent = '💰 Монеты: ' + coins;
}

// Функции для магазина оружия
function openWeaponsShop() {
    gameActive = false;
    document.getElementById('weaponsShopMenu').style.display = 'block';
    document.getElementById('score').style.display = 'none';
    document.getElementById('instructions').style.display = 'none';
    document.getElementById('weaponDisplay').style.display = 'none';
    document.getElementById('ammoDisplay').style.display = 'none';
    document.getElementById('cameraMode').style.display = 'none';
    document.getElementById('coinsDisplay').style.display = 'none';
    document.getElementById('crosshair').style.display = 'none';
    updateWeaponsShopDisplay();
}

function updateWeaponsShopDisplay() {
    document.getElementById('weaponsShopCoins').textContent = coins;

    // Отображаем оружие
    const weaponsContainer = document.getElementById('weaponsShopWeapons');
    weaponsContainer.innerHTML = '';
    shopItems.weapons.forEach(item => {
        const owned = ownedWeapons.includes(item.id);
        const itemDiv = document.createElement('div');
        itemDiv.className = 'shop-item' + (owned ? ' owned' : '');
        itemDiv.innerHTML = `
            <div class="shop-item-icon">${item.icon}</div>
            <div class="shop-item-name">${item.name}</div>
            <div class="shop-item-desc">${item.description}</div>
            <div class="shop-item-price">${owned ? '✓ Куплено' : '💰 ' + item.price}</div>
        `;
        if (!owned) {
            itemDiv.onclick = () => {
                console.log('Клик по оружию:', item.name);
                buyWeaponFromShop(item);
            };
            itemDiv.style.cursor = 'pointer';
        } else {
            itemDiv.style.cursor = 'default';
        }
        weaponsContainer.appendChild(itemDiv);
    });

    // Отображаем турели
    const turretsContainer = document.getElementById('weaponsShopTurrets');
    turretsContainer.innerHTML = '';

    const turretColors = {
        basic: { bg: 'rgba(100, 100, 100, 0.2)', border: 'rgba(150, 150, 150, 0.5)', name: '#aaaaaa', desc: '#cccccc' },
        fire: { bg: 'rgba(255, 100, 0, 0.2)', border: 'rgba(255, 100, 0, 0.5)', name: '#ff6600', desc: '#ffaa88' },
        laser: { bg: 'rgba(0, 200, 255, 0.2)', border: 'rgba(0, 200, 255, 0.5)', name: '#00ccff', desc: '#aaeeff' },
        rocket: { bg: 'rgba(150, 0, 200, 0.2)', border: 'rgba(150, 0, 200, 0.5)', name: '#aa00ff', desc: '#ddaaff' },
        freeze: { bg: 'rgba(135, 206, 235, 0.2)', border: 'rgba(0, 206, 209, 0.5)', name: '#00ffff', desc: '#aaffff' },
        electric: { bg: 'rgba(255, 215, 0, 0.2)', border: 'rgba(255, 215, 0, 0.5)', name: '#ffff00', desc: '#ffffaa' },
        poison: { bg: 'rgba(34, 139, 34, 0.2)', border: 'rgba(50, 205, 50, 0.5)', name: '#00ff00', desc: '#aaffaa' },
        explosive: { bg: 'rgba(139, 0, 0, 0.2)', border: 'rgba(255, 69, 0, 0.5)', name: '#ff4500', desc: '#ffaa88' },
        sonic: { bg: 'rgba(65, 105, 225, 0.2)', border: 'rgba(0, 191, 255, 0.5)', name: '#00bfff', desc: '#aaddff' },
        plasma: { bg: 'rgba(138, 43, 226, 0.2)', border: 'rgba(138, 43, 226, 0.5)', name: '#8a2be2', desc: '#dda0ff' },
        tesla: { bg: 'rgba(75, 0, 130, 0.2)', border: 'rgba(138, 43, 226, 0.5)', name: '#8a2be2', desc: '#ccaaff' },
        gravityt: { bg: 'rgba(75, 0, 130, 0.2)', border: 'rgba(75, 0, 130, 0.5)', name: '#4b0082', desc: '#aa88cc' },
        railgunt: { bg: 'rgba(0, 128, 255, 0.2)', border: 'rgba(0, 128, 255, 0.5)', name: '#0080ff', desc: '#aaccff' },
        minigunt: { bg: 'rgba(255, 69, 0, 0.2)', border: 'rgba(255, 140, 0, 0.5)', name: '#ff4500', desc: '#ffaa77' },
        flamethrower: { bg: 'rgba(255, 0, 0, 0.2)', border: 'rgba(255, 69, 0, 0.5)', name: '#ff0000', desc: '#ff8888' },
        sniper: { bg: 'rgba(139, 69, 19, 0.2)', border: 'rgba(210, 105, 30, 0.5)', name: '#d2691e', desc: '#ffbb99' },
        shotgunt: { bg: 'rgba(184, 134, 11, 0.2)', border: 'rgba(218, 165, 32, 0.5)', name: '#daa520', desc: '#ffdd88' },
        cannon: { bg: 'rgba(47, 79, 79, 0.2)', border: 'rgba(112, 128, 144, 0.5)', name: '#708090', desc: '#ccdddd' },
        nuclear: { bg: 'rgba(0, 255, 0, 0.2)', border: 'rgba(0, 255, 0, 0.5)', name: '#00ff00', desc: '#88ff88' },
        rainbow: { bg: 'linear-gradient(135deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)', border: 'rgba(255, 255, 255, 0.8)', name: '#ffffff', desc: '#ffffff' },
        healing: { bg: 'rgba(0, 255, 127, 0.2)', border: 'rgba(0, 255, 127, 0.5)', name: '#00ff7f', desc: '#88ffcc' },
        shield: { bg: 'rgba(30, 144, 255, 0.2)', border: 'rgba(30, 144, 255, 0.5)', name: '#1e90ff', desc: '#aaccff' },
        quantum: { bg: 'rgba(138, 43, 226, 0.2)', border: 'rgba(186, 85, 211, 0.5)', name: '#ba55d3', desc: '#ddaaff' },
        blackhole: { bg: 'rgba(0, 0, 0, 0.4)', border: 'rgba(75, 0, 130, 0.5)', name: '#ffffff', desc: '#aaaaaa' },
        timet: { bg: 'rgba(255, 215, 0, 0.2)', border: 'rgba(255, 215, 0, 0.5)', name: '#ffd700', desc: '#ffffaa' },
        energyt: { bg: 'rgba(255, 255, 255, 0.2)', border: 'rgba(255, 255, 255, 0.5)', name: '#ffffff', desc: '#dddddd' },
        meteor: { bg: 'rgba(205, 92, 92, 0.2)', border: 'rgba(220, 20, 60, 0.5)', name: '#dc143c', desc: '#ff9999' },
        stormt: { bg: 'rgba(70, 130, 180, 0.2)', border: 'rgba(100, 149, 237, 0.5)', name: '#6495ed', desc: '#aaccff' },
        antimatter: { bg: 'rgba(139, 0, 0, 0.2)', border: 'rgba(178, 34, 34, 0.5)', name: '#b22222', desc: '#ff8888' }
    };

    shopItems.turrets.forEach(item => {
        const ownedVars = {
            basic: hasTurret, fire: hasFireTurret, laser: hasLaserTurret, rocket: hasRocketTurret,
            freeze: hasFreezeTurret, electric: hasElectricTurret, poison: hasPoisonTurret,
            explosive: hasExplosiveTurret, sonic: hasSonicTurret, plasma: hasPlasmaTurret,
            tesla: hasTeslaTurret, gravityt: hasGravityTurret, railgunt: hasRailgunTurret,
            minigunt: hasMinigunTurret, flamethrower: hasFlamethrowerTurret, sniper: hasSniperTurret,
            shotgunt: hasShotgunTurret, cannon: hasCannonTurret, nuclear: hasNuclearTurret,
            rainbow: hasRainbowTurret, healing: hasHealingTurret, shield: hasShieldTurret,
            quantum: hasQuantumTurret, blackhole: hasBlackholeTurret, timet: hasTimeTurret,
            energyt: hasEnergyTurret, meteor: hasMeteorTurret, stormt: hasStormTurret,
            antimatter: hasAntimatterTurret
        };
        const owned = ownedVars[item.id];
        const colors = turretColors[item.id] || { bg: 'rgba(100, 100, 100, 0.2)', border: 'rgba(150, 150, 150, 0.5)', name: '#aaaaaa', desc: '#cccccc' };

        const turretItem = document.createElement('div');
        turretItem.className = 'shop-item' + (owned ? ' owned' : '');
        turretItem.style.backgroundColor = colors.bg;
        turretItem.style.border = '4px solid ' + colors.border;
        turretItem.innerHTML = `
            <div class="shop-item-icon">${item.icon}</div>
            <div class="shop-item-name" style="color: ${colors.name};">${item.name}</div>
            <div class="shop-item-desc" style="color: ${colors.desc};">${item.description}</div>
            <div class="shop-item-price">${owned ? '✓ Установлена' : '💰 ' + item.price}</div>
        `;
        if (!owned) {
            turretItem.onclick = () => {
                console.log('Клик по турели:', item.name);
                buyTurretFromShop(item.id);
            };
            turretItem.style.cursor = 'pointer';
        } else {
            turretItem.style.cursor = 'default';
        }
        turretsContainer.appendChild(turretItem);
    });

    // Отображаем питомцев
    const petsContainer = document.getElementById('weaponsShopPets');
    petsContainer.innerHTML = '';

    shopItems.pets.forEach(item => {
        // Пропускаем собаку - она дается с самого начала
        if (item.id === 'dog') {
            return;
        }

        const owned = ownedPets.includes(item.id);
        const petColors = {
            dog: { bg: 'rgba(139, 69, 19, 0.2)', border: 'rgba(210, 105, 30, 0.5)' },
            cat: { bg: 'rgba(255, 228, 181, 0.2)', border: 'rgba(255, 218, 185, 0.5)' },
            wolf: { bg: 'rgba(105, 105, 105, 0.2)', border: 'rgba(128, 128, 128, 0.5)' },
            bear: { bg: 'rgba(101, 67, 33, 0.2)', border: 'rgba(139, 69, 19, 0.5)' },
            eagle: { bg: 'rgba(70, 130, 180, 0.2)', border: 'rgba(100, 149, 237, 0.5)' },
            panda: { bg: 'rgba(240, 240, 240, 0.2)', border: 'rgba(255, 255, 255, 0.5)' },
            fox: { bg: 'rgba(255, 140, 0, 0.2)', border: 'rgba(255, 165, 0, 0.5)' },
            dragon: { bg: 'rgba(220, 20, 60, 0.2)', border: 'rgba(255, 69, 0, 0.5)' },
            unicorn: { bg: 'rgba(255, 192, 203, 0.2)', border: 'rgba(255, 182, 193, 0.5)' },
            robot: { bg: 'rgba(192, 192, 192, 0.2)', border: 'rgba(169, 169, 169, 0.5)' },
            tiger: { bg: 'rgba(255, 127, 80, 0.2)', border: 'rgba(255, 99, 71, 0.5)' },
            lion: { bg: 'rgba(218, 165, 32, 0.2)', border: 'rgba(255, 215, 0, 0.5)' }
        };
        const colors = petColors[item.id] || { bg: 'rgba(100, 100, 100, 0.2)', border: 'rgba(150, 150, 150, 0.5)' };

        // Показываем имя питомца если он куплен
        const petNameDisplay = owned && petNames && petNames[item.id] ? `"${petNames[item.id]}"` : item.name;

        const petItem = document.createElement('div');
        petItem.className = 'shop-item' + (owned ? ' owned' : '');
        petItem.style.backgroundColor = colors.bg;
        petItem.style.border = '4px solid ' + colors.border;
        petItem.innerHTML = `
            <div class="shop-item-icon">${item.icon}</div>
            <div class="shop-item-name" style="color: #66ff66;">${petNameDisplay}</div>
            <div class="shop-item-desc" style="color: #aaffaa;">${item.description}</div>
            <div class="shop-item-price">${owned ? '✓ Куплен' : '💰 ' + item.price}</div>
        `;
        if (!owned) {
            petItem.onclick = () => {
                console.log('Клик по питомцу:', item.name);
                buyPetFromShop(item.id);
            };
            petItem.style.cursor = 'pointer';
        } else {
            petItem.style.cursor = 'default';
        }
        petsContainer.appendChild(petItem);
    });
}

function buyWeaponFromShop(item) {
    console.log('Покупка оружия:', item.name, 'Цена:', item.price, 'Монеты:', coins);
    if (coins >= item.price) {
        coins -= item.price;
        ownedWeapons.push(item.id);
        localStorage.setItem('cubeGameOwnedWeapons', JSON.stringify(ownedWeapons));
        updateWeaponsShopDisplay();
        updateCoinsDisplay();
        localStorage.setItem('cubeGameCoins', coins);
        alert('✅ Куплено: ' + item.name + '!\nИспользуйте клавишу ' + item.description.split('|')[0].trim() + ' для выбора.');
    } else {
        alert('Недостаточно монет! Нужно: ' + item.price + ', у вас: ' + coins);
    }
}

function buyTurretFromShop(type) {
    const turret = shopItems.turrets.find(t => t.id === type);
    if (!turret) {
        console.error('Турель не найдена:', type);
        return;
    }

    console.log('Покупка турели:', turret.name, 'Цена:', turret.price, 'Монеты:', coins);
    if (coins >= turret.price) {
        coins -= turret.price;

        switch(type) {
            case 'basic':
                hasTurret = true;
                createTurret();
                break;
            case 'fire':
                hasFireTurret = true;
                createFireTurret();
                break;
            case 'laser':
                hasLaserTurret = true;
                createLaserTurret();
                break;
            case 'rocket':
                hasRocketTurret = true;
                createRocketTurret();
                break;
            case 'freeze':
                hasFreezeTurret = true;
                createFreezeTurret();
                break;
            case 'electric':
                hasElectricTurret = true;
                createElectricTurret();
                break;
            case 'poison':
                hasPoisonTurret = true;
                createPoisonTurret();
                break;
            case 'explosive':
                hasExplosiveTurret = true;
                createExplosiveTurret();
                break;
            case 'sonic':
                hasSonicTurret = true;
                createSonicTurret();
                break;
            case 'plasma':
                hasPlasmaTurret = true;
                createPlasmaTurret();
                break;
            case 'tesla':
                hasTeslaTurret = true;
                createTeslaTurret();
                break;
            case 'gravityt':
                hasGravityTurret = true;
                createGravityTurret();
                break;
            case 'railgunt':
                hasRailgunTurret = true;
                createRailgunTurret();
                break;
            case 'minigunt':
                hasMinigunTurret = true;
                createMinigunTurret();
                break;
            case 'flamethrower':
                hasFlamethrowerTurret = true;
                createFlamethrowerTurret();
                break;
            case 'sniper':
                hasSniperTurret = true;
                createSniperTurret();
                break;
            case 'shotgunt':
                hasShotgunTurret = true;
                createShotgunTurret();
                break;
            case 'cannon':
                hasCannonTurret = true;
                createCannonTurret();
                break;
            case 'nuclear':
                hasNuclearTurret = true;
                createNuclearTurret();
                break;
            case 'rainbow':
                hasRainbowTurret = true;
                createRainbowTurret();
                break;
            case 'healing':
                hasHealingTurret = true;
                createHealingTurret();
                break;
            case 'shield':
                hasShieldTurret = true;
                createShieldTurret();
                break;
            case 'quantum':
                hasQuantumTurret = true;
                createQuantumTurret();
                break;
            case 'blackhole':
                hasBlackholeTurret = true;
                createBlackholeTurret();
                break;
            case 'timet':
                hasTimeTurret = true;
                createTimeTurret();
                break;
            case 'energyt':
                hasEnergyTurret = true;
                createEnergyTurret();
                break;
            case 'meteor':
                hasMeteorTurret = true;
                createMeteorTurret();
                break;
            case 'stormt':
                hasStormTurret = true;
                createStormTurret();
                break;
            case 'antimatter':
                hasAntimatterTurret = true;
                createAntimatterTurret();
                break;
        }

        updateWeaponsShopDisplay();
        updateCoinsDisplay();
        localStorage.setItem('cubeGameCoins', coins);
        alert('✅ Куплена турель: ' + turret.name + '!\nТурель установлена на поле боя.');
    } else {
        alert('Недостаточно монет! Нужно: ' + turret.price + ', у вас: ' + coins);
    }
}

function buyPetFromShop(type) {
    const pet = shopItems.pets.find(p => p.id === type);
    if (!pet) return;

    if (coins >= pet.price) {
        // Показываем красивый диалог для ввода имени
        showPetNameDialog(type, pet);
    } else {
        alert('Недостаточно монет! Нужно: ' + pet.price + ', у вас: ' + coins);
    }
}

function showPetNameDialog(type, pet) {
    const dialog = document.getElementById('petNameDialog');
    const input = document.getElementById('petNameInput');
    const icon = document.getElementById('petDialogIcon');
    const title = document.getElementById('petDialogTitle');
    const desc = document.getElementById('petDialogDesc');

    // Настраиваем диалог
    icon.textContent = pet.icon;
    title.textContent = `Дайте имя вашему питомцу!`;
    desc.textContent = pet.description;
    input.value = '';

    // Показываем диалог
    dialog.style.display = 'flex';
    setTimeout(() => input.focus(), 100);

    // Обработчик подтверждения
    const confirmHandler = () => {
        const petName = input.value.trim();
        if (!petName || petName === '') {
            alert('Пожалуйста, введите имя для питомца!');
            input.focus();
            return;
        }

        // Покупаем питомца
        coins -= pet.price;
        ownedPets.push(type);
        localStorage.setItem('cubeGameOwnedPets', JSON.stringify(ownedPets));

        // Сохраняем имя питомца
        if (!petNames) window.petNames = {};
        petNames[type] = petName;
        localStorage.setItem('cubeGamePetNames', JSON.stringify(petNames));

        // Создаем питомца
        createPet(type, petName);

        updateWeaponsShopDisplay();
        updateCoinsDisplay();
        localStorage.setItem('cubeGameCoins', coins);

        // Скрываем диалог
        dialog.style.display = 'none';
        cleanup();
    };

    // Обработчик отмены
    const cancelHandler = () => {
        dialog.style.display = 'none';
        cleanup();
    };

    // Обработчик Enter
    const enterHandler = (e) => {
        if (e.key === 'Enter') {
            confirmHandler();
        }
    };

    // Функция очистки обработчиков
    const cleanup = () => {
        document.getElementById('petNameConfirm').removeEventListener('click', confirmHandler);
        document.getElementById('petNameCancel').removeEventListener('click', cancelHandler);
        input.removeEventListener('keypress', enterHandler);
    };

    // Добавляем обработчики
    document.getElementById('petNameConfirm').addEventListener('click', confirmHandler);
    document.getElementById('petNameCancel').addEventListener('click', cancelHandler);
    input.addEventListener('keypress', enterHandler);
}
