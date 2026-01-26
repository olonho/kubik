// Создание оружия

function createPistol() {
    const pistolGroup = new THREE.Group();

    // Ультра реалистичные материалы оружия (AAA качество)
    const metalMaterial = new THREE.MeshStandardMaterial({
        color: 0x333333,
        roughness: 0.25,
        metalness: 0.95,
        envMapIntensity: 1.5
    });

    const darkMetalMaterial = new THREE.MeshStandardMaterial({
        color: 0x1A1A1A,
        roughness: 0.35,
        metalness: 0.9,
        envMapIntensity: 1.3
    });

    const gripMaterial = new THREE.MeshStandardMaterial({
        color: 0x2C1810,
        roughness: 0.98,
        metalness: 0.02
    });

    // Рукоятка с текстурой
    const handleGeometry = new THREE.BoxGeometry(0.12, 0.25, 0.08);
    const handle = new THREE.Mesh(handleGeometry, gripMaterial);
    handle.position.set(0, -0.15, 0);
    handle.castShadow = true;
    pistolGroup.add(handle);

    // Насечки на рукоятке (детализация)
    for (let i = 0; i < 8; i++) {
        const notchGeometry = new THREE.BoxGeometry(0.122, 0.015, 0.082);
        const notchMaterial = new THREE.MeshStandardMaterial({
            color: 0x1A0F08,
            roughness: 1.0
        });
        const notch = new THREE.Mesh(notchGeometry, notchMaterial);
        notch.position.set(0, -0.24 + i * 0.025, 0);
        pistolGroup.add(notch);
    }

    // Ствол высокого качества (больше сегментов)
    const barrelGeometry = new THREE.CylinderGeometry(0.04, 0.04, 0.4, 32);
    const barrel = new THREE.Mesh(barrelGeometry, darkMetalMaterial);
    barrel.rotation.z = Math.PI / 2;
    barrel.position.set(0.2, -0.02, 0);
    barrel.castShadow = true;
    pistolGroup.add(barrel);

    // Компенсатор с отверстиями
    const compensatorGeometry = new THREE.CylinderGeometry(0.048, 0.042, 0.08, 16);
    const compensator = new THREE.Mesh(compensatorGeometry, metalMaterial);
    compensator.rotation.z = Math.PI / 2;
    compensator.position.set(0.44, -0.02, 0);
    pistolGroup.add(compensator);

    // Отверстия в компенсаторе (4 шт)
    for (let i = 0; i < 4; i++) {
        const holeGeometry = new THREE.CylinderGeometry(0.008, 0.008, 0.05, 8);
        const holeMaterial = new THREE.MeshStandardMaterial({
            color: 0x000000,
            roughness: 0.9
        });
        const hole = new THREE.Mesh(holeGeometry, holeMaterial);
        hole.rotation.x = Math.PI / 2;
        const angle = (i / 4) * Math.PI * 2;
        hole.position.set(0.44, -0.02 + Math.sin(angle) * 0.035, Math.cos(angle) * 0.035);
        pistolGroup.add(hole);
    }

    // Затвор с насечками
    const slideGeometry = new THREE.BoxGeometry(0.35, 0.08, 0.09);
    const slide = new THREE.Mesh(slideGeometry, metalMaterial);
    slide.position.set(0.175, 0.01, 0);
    slide.castShadow = true;
    pistolGroup.add(slide);
    pistolGroup.userData.slide = slide;

    // Насечки на затворе для захвата
    for (let i = 0; i < 6; i++) {
        const serrationGeometry = new THREE.BoxGeometry(0.01, 0.082, 0.005);
        const serration = new THREE.Mesh(serrationGeometry, darkMetalMaterial);
        serration.position.set(0.05 + i * 0.02, 0.01, 0.048);
        pistolGroup.add(serration);

        const serration2 = new THREE.Mesh(serrationGeometry, darkMetalMaterial);
        serration2.position.set(0.05 + i * 0.02, 0.01, -0.048);
        pistolGroup.add(serration2);
    }

    // Выбрасыватель патронов
    const ejectorGeometry = new THREE.BoxGeometry(0.015, 0.02, 0.01);
    const ejector = new THREE.Mesh(ejectorGeometry, darkMetalMaterial);
    ejector.position.set(0.25, 0.04, 0.05);
    pistolGroup.add(ejector);

    // Мушка светящаяся (реалистичная как в Far Cry 3)
    const frontSightGeometry = new THREE.BoxGeometry(0.02, 0.04, 0.02);
    const frontSightMaterial = new THREE.MeshStandardMaterial({
        color: 0x00FF00,
        emissive: 0x00FF00,
        emissiveIntensity: 0.8,
        metalness: 0.3,
        roughness: 0.5
    });
    const frontSight = new THREE.Mesh(frontSightGeometry, frontSightMaterial);
    frontSight.position.set(0.35, 0.06, 0);
    pistolGroup.add(frontSight);

    // Легкая подсветка на мушке
    const sightLight = new THREE.PointLight(0x00FF00, 0.5, 1);
    sightLight.position.set(0.35, 0.06, 0);
    pistolGroup.add(sightLight);

    // Целик
    const rearSightGeometry = new THREE.BoxGeometry(0.035, 0.045, 0.035);
    const rearSight = new THREE.Mesh(rearSightGeometry, metalMaterial);
    rearSight.position.set(0.05, 0.05, 0);
    pistolGroup.add(rearSight);

    // Спусковая скоба с высокой детализацией
    const triggerGuardGeometry = new THREE.TorusGeometry(0.08, 0.012, 16, 32, Math.PI);
    const triggerGuard = new THREE.Mesh(triggerGuardGeometry, metalMaterial);
    triggerGuard.rotation.y = Math.PI / 2;
    triggerGuard.rotation.z = Math.PI;
    triggerGuard.position.set(0, -0.05, 0);
    pistolGroup.add(triggerGuard);

    // Курок
    const triggerGeometry = new THREE.BoxGeometry(0.025, 0.06, 0.02);
    const trigger = new THREE.Mesh(triggerGeometry, metalMaterial);
    trigger.position.set(0, -0.06, 0);
    trigger.rotation.z = -0.2;
    pistolGroup.add(trigger);

    // Винты (детали)
    for (let i = 0; i < 3; i++) {
        const screwGeometry = new THREE.CylinderGeometry(0.008, 0.008, 0.01, 8);
        const screwMaterial = new THREE.MeshStandardMaterial({
            color: 0x3A3A3A,
            metalness: 0.8,
            roughness: 0.3
        });
        const screw = new THREE.Mesh(screwGeometry, screwMaterial);
        screw.rotation.x = Math.PI / 2;
        screw.position.set(0.05 + i * 0.1, -0.1 + i * 0.05, 0.042);
        pistolGroup.add(screw);
    }

    // Направляющая для лазера/фонаря (пикатинни)
    const railGeometry = new THREE.BoxGeometry(0.15, 0.008, 0.025);
    const railMaterial = new THREE.MeshStandardMaterial({
        color: 0x1A1A1A,
        roughness: 0.5,
        metalness: 0.9
    });
    const rail = new THREE.Mesh(railGeometry, railMaterial);
    rail.position.set(0.25, -0.065, 0);
    pistolGroup.add(rail);

    pistolGroup.scale.set(2.5, 2.5, 2.5);
    return pistolGroup;
}

function createRifle() {
    const rifleGroup = new THREE.Group();
    
    const barrelGeometry = new THREE.CylinderGeometry(0.035, 0.035, 0.7, 8);
    const barrelMaterial = new THREE.MeshPhongMaterial({ color: 0x222222 });
    const barrel = new THREE.Mesh(barrelGeometry, barrelMaterial);
    barrel.rotation.z = Math.PI / 2;
    barrel.castShadow = true;
    rifleGroup.add(barrel);
    
    const bodyGeometry = new THREE.BoxGeometry(0.35, 0.08, 0.1);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x444444 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.set(-0.1, 0, 0);
    body.castShadow = true;
    rifleGroup.add(body);
    
    const stockGeometry = new THREE.BoxGeometry(0.25, 0.1, 0.08);
    const stockMaterial = new THREE.MeshPhongMaterial({ color: 0x654321 });
    const stock = new THREE.Mesh(stockGeometry, stockMaterial);
    stock.position.set(-0.35, -0.02, 0);
    stock.castShadow = true;
    rifleGroup.add(stock);
    
    const gripGeometry = new THREE.BoxGeometry(0.06, 0.12, 0.06);
    const gripMaterial = new THREE.MeshPhongMaterial({ color: 0x654321 });
    const grip = new THREE.Mesh(gripGeometry, gripMaterial);
    grip.position.set(-0.05, -0.09, 0);
    grip.castShadow = true;
    rifleGroup.add(grip);
    
    const scopeBodyGeometry = new THREE.CylinderGeometry(0.04, 0.04, 0.15, 8);
    const scopeBodyMaterial = new THREE.MeshPhongMaterial({ color: 0x111111 });
    const scopeBody = new THREE.Mesh(scopeBodyGeometry, scopeBodyMaterial);
    scopeBody.position.set(0.1, 0.08, 0);
    scopeBody.castShadow = true;
    rifleGroup.add(scopeBody);
    
    const lensGeometry = new THREE.CircleGeometry(0.035, 16);
    const lensMaterial = new THREE.MeshPhongMaterial({
        color: 0x4444FF,
        emissive: 0x0000FF,
        emissiveIntensity: 0.3
    });
    const lensFront = new THREE.Mesh(lensGeometry, lensMaterial);
    lensFront.position.set(0.175, 0.08, 0);
    lensFront.rotation.y = Math.PI / 2;
    rifleGroup.add(lensFront);
    
    const sightGeometry = new THREE.BoxGeometry(0.02, 0.05, 0.02);
    const sightMaterial = new THREE.MeshPhongMaterial({ color: 0xFF0000 });
    const sight = new THREE.Mesh(sightGeometry, sightMaterial);
    sight.position.set(0.3, 0.04, 0);
    rifleGroup.add(sight);
    
    rifleGroup.scale.set(1.8, 1.8, 1.8);
    return rifleGroup;
}

function createAK47() {
    const ak47Group = new THREE.Group();

    // Материалы
    const woodMaterial = new THREE.MeshStandardMaterial({
        color: 0x8B4513, // Коричневое дерево
        roughness: 0.9,
        metalness: 0.1
    });
    const metalMaterial = new THREE.MeshStandardMaterial({
        color: 0x1A1A1A, // Черный металл
        roughness: 0.3,
        metalness: 0.9
    });
    const darkMetalMaterial = new THREE.MeshStandardMaterial({
        color: 0x0A0A0A,
        roughness: 0.2,
        metalness: 1.0
    });

    // Ствол (длинный цилиндр)
    const barrelGeometry = new THREE.CylinderGeometry(0.018, 0.02, 0.42, 16);
    const barrel = new THREE.Mesh(barrelGeometry, darkMetalMaterial);
    barrel.rotation.z = Math.PI / 2;
    barrel.position.set(0.21, 0, 0);
    barrel.castShadow = true;
    ak47Group.add(barrel);

    // Пламегаситель АК-47 (характерный наклонный)
    const muzzleGeometry = new THREE.CylinderGeometry(0.025, 0.022, 0.06, 8);
    const muzzle = new THREE.Mesh(muzzleGeometry, darkMetalMaterial);
    muzzle.rotation.z = Math.PI / 2;
    muzzle.position.set(0.45, 0, 0);
    ak47Group.add(muzzle);

    // Газовая трубка над стволом
    const gasTubeGeometry = new THREE.CylinderGeometry(0.012, 0.012, 0.35, 8);
    const gasTube = new THREE.Mesh(gasTubeGeometry, metalMaterial);
    gasTube.rotation.z = Math.PI / 2;
    gasTube.position.set(0.15, 0.035, 0);
    ak47Group.add(gasTube);

    // Цевье (деревянное, под стволом)
    const handguardGeometry = new THREE.BoxGeometry(0.3, 0.05, 0.08);
    const handguard = new THREE.Mesh(handguardGeometry, woodMaterial);
    handguard.position.set(0.1, -0.025, 0);
    handguard.castShadow = true;
    ak47Group.add(handguard);

    // Ресивер (металлический корпус)
    const receiverGeometry = new THREE.BoxGeometry(0.25, 0.08, 0.075);
    const receiver = new THREE.Mesh(receiverGeometry, metalMaterial);
    receiver.position.set(-0.05, 0.01, 0);
    receiver.castShadow = true;
    ak47Group.add(receiver);
    ak47Group.userData.receiver = receiver; // Для анимации отдачи

    // Крышка ствольной коробки (верхняя часть)
    const coverGeometry = new THREE.BoxGeometry(0.22, 0.02, 0.08);
    const cover = new THREE.Mesh(coverGeometry, metalMaterial);
    cover.position.set(-0.04, 0.05, 0);
    ak47Group.add(cover);

    // Рукоятка взведения (справа)
    const chargingHandleGeometry = new THREE.BoxGeometry(0.04, 0.015, 0.02);
    const chargingHandle = new THREE.Mesh(chargingHandleGeometry, metalMaterial);
    chargingHandle.position.set(0.03, 0.03, 0.055);
    ak47Group.add(chargingHandle);

    // Прицельная планка
    const sightRailGeometry = new THREE.BoxGeometry(0.15, 0.015, 0.015);
    const sightRail = new THREE.Mesh(sightRailGeometry, metalMaterial);
    sightRail.position.set(0.02, 0.06, 0);
    ak47Group.add(sightRail);

    // Мушка (передний прицел)
    const frontSightPostGeometry = new THREE.BoxGeometry(0.008, 0.03, 0.008);
    const frontSightPost = new THREE.Mesh(frontSightPostGeometry, darkMetalMaterial);
    frontSightPost.position.set(0.35, 0.05, 0);
    ak47Group.add(frontSightPost);

    // Целик (задний прицел)
    const rearSightGeometry = new THREE.BoxGeometry(0.02, 0.025, 0.025);
    const rearSight = new THREE.Mesh(rearSightGeometry, metalMaterial);
    rearSight.position.set(-0.05, 0.055, 0);
    ak47Group.add(rearSight);

    // Деревянная пистолетная рукоятка
    const gripGeometry = new THREE.BoxGeometry(0.045, 0.12, 0.055);
    const grip = new THREE.Mesh(gripGeometry, woodMaterial);
    grip.position.set(-0.08, -0.08, 0);
    grip.rotation.z = -0.15;
    grip.castShadow = true;
    ak47Group.add(grip);

    // Спусковая скоба
    const triggerGuardGeometry = new THREE.TorusGeometry(0.05, 0.008, 8, 16, Math.PI);
    const triggerGuard = new THREE.Mesh(triggerGuardGeometry, metalMaterial);
    triggerGuard.rotation.y = Math.PI / 2;
    triggerGuard.rotation.z = Math.PI;
    triggerGuard.position.set(-0.05, -0.04, 0);
    ak47Group.add(triggerGuard);

    // Курок
    const triggerGeometry = new THREE.BoxGeometry(0.015, 0.04, 0.015);
    const trigger = new THREE.Mesh(triggerGeometry, metalMaterial);
    trigger.position.set(-0.05, -0.05, 0);
    ak47Group.add(trigger);

    // Магазин (изогнутый, характерный для АК-47)
    const magazineGroup = new THREE.Group();

    // Верхняя часть магазина
    const magTopGeometry = new THREE.BoxGeometry(0.035, 0.08, 0.055);
    const magTop = new THREE.Mesh(magTopGeometry, darkMetalMaterial);
    magTop.position.set(0, 0, 0);
    magazineGroup.add(magTop);

    // Средняя изогнутая часть
    const magMidGeometry = new THREE.BoxGeometry(0.035, 0.12, 0.06);
    const magMid = new THREE.Mesh(magMidGeometry, darkMetalMaterial);
    magMid.position.set(0.01, -0.1, 0);
    magMid.rotation.z = 0.1;
    magMid.castShadow = true;
    magazineGroup.add(magMid);

    // Нижняя часть магазина
    const magBottomGeometry = new THREE.BoxGeometry(0.035, 0.05, 0.055);
    const magBottom = new THREE.Mesh(magBottomGeometry, darkMetalMaterial);
    magBottom.position.set(0.02, -0.19, 0);
    magazineGroup.add(magBottom);

    magazineGroup.position.set(-0.05, -0.1, 0);
    magazineGroup.castShadow = true;
    ak47Group.add(magazineGroup);

    // Приклад (деревянный)
    const stockGeometry = new THREE.BoxGeometry(0.22, 0.055, 0.065);
    const stock = new THREE.Mesh(stockGeometry, woodMaterial);
    stock.position.set(-0.28, 0, 0);
    stock.castShadow = true;
    ak47Group.add(stock);

    // Затыльник приклада
    const buttplateGeometry = new THREE.BoxGeometry(0.015, 0.08, 0.08);
    const buttplate = new THREE.Mesh(buttplateGeometry, darkMetalMaterial);
    buttplate.position.set(-0.4, 0, 0);
    ak47Group.add(buttplate);

    // Антабка (крепление ремня)
    const slingMountGeometry = new THREE.TorusGeometry(0.015, 0.005, 8, 12);
    const slingMount = new THREE.Mesh(slingMountGeometry, metalMaterial);
    slingMount.rotation.y = Math.PI / 2;
    slingMount.position.set(-0.38, -0.03, 0);
    ak47Group.add(slingMount);

    // Переключатель огня
    const selectorGeometry = new THREE.BoxGeometry(0.04, 0.01, 0.005);
    const selector = new THREE.Mesh(selectorGeometry, metalMaterial);
    selector.position.set(-0.1, 0.01, 0.04);
    selector.rotation.z = -0.5;
    ak47Group.add(selector);

    ak47Group.scale.set(2, 2, 2);
    return ak47Group;
}

function createLaserGun() {
    const laserGroup = new THREE.Group();
    
    const bodyGeometry = new THREE.BoxGeometry(0.5, 0.15, 0.15);
    const bodyMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x00FFFF,
        emissive: 0x00FFFF,
        emissiveIntensity: 0.3,
        metalness: 0.9
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.castShadow = true;
    laserGroup.add(body);
    
    const coreGeometry = new THREE.CylinderGeometry(0.04, 0.04, 0.6, 8);
    const coreMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x00FF00,
        emissive: 0x00FF00,
        emissiveIntensity: 0.8
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    core.rotation.z = Math.PI / 2;
    core.position.set(0.1, 0, 0);
    laserGroup.add(core);
    
    for (let i = 0; i < 4; i++) {
        const ringGeometry = new THREE.TorusGeometry(0.08, 0.02, 8, 16);
        const ringMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x0088FF,
            emissive: 0x0088FF,
            emissiveIntensity: 0.5
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.position.set(0.05 + i * 0.15, 0, 0);
        ring.rotation.y = Math.PI / 2;
        laserGroup.add(ring);
    }
    
    const gripGeometry = new THREE.BoxGeometry(0.1, 0.2, 0.12);
    const gripMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
    const grip = new THREE.Mesh(gripGeometry, gripMaterial);
    grip.position.set(-0.15, -0.15, 0);
    grip.castShadow = true;
    laserGroup.add(grip);
    
    const powerGeometry = new THREE.BoxGeometry(0.15, 0.1, 0.1);
    const powerMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xFF00FF,
        emissive: 0xFF00FF,
        emissiveIntensity: 0.6
    });
    const power = new THREE.Mesh(powerGeometry, powerMaterial);
    power.position.set(-0.25, -0.05, 0);
    laserGroup.add(power);
    
    const muzzleGeometry = new THREE.CylinderGeometry(0.06, 0.04, 0.1, 8);
    const muzzleMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xFFFFFF,
        emissive: 0x00FFFF,
        emissiveIntensity: 0.9
    });
    const muzzle = new THREE.Mesh(muzzleGeometry, muzzleMaterial);
    muzzle.rotation.z = Math.PI / 2;
    muzzle.position.set(0.45, 0, 0);
    laserGroup.add(muzzle);
    
    laserGroup.scale.set(1.5, 1.5, 1.5);
    return laserGroup;
}

function createGravityGun() {
    const gravityGroup = new THREE.Group();
    
    const bodyGeometry = new THREE.BoxGeometry(0.6, 0.2, 0.2);
    const bodyMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x9400D3,
        emissive: 0x9400D3,
        emissiveIntensity: 0.4,
        metalness: 1.0
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.castShadow = true;
    gravityGroup.add(body);
    
    for (let i = 0; i < 6; i++) {
        const ringGeometry = new THREE.TorusGeometry(0.12 + i * 0.02, 0.025, 8, 16);
        const ringMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xFF00FF,
            emissive: 0xFF00FF,
            emissiveIntensity: 0.7 - i * 0.1
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.position.set(0.2 + i * 0.08, 0, 0);
        ring.rotation.y = Math.PI / 2;
        gravityGroup.add(ring);
    }
    
    const coreGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const coreMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xFFFFFF,
        emissive: 0xFF00FF,
        emissiveIntensity: 1.5,
        transparent: true,
        opacity: 0.8
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    core.position.set(0.5, 0, 0);
    gravityGroup.add(core);
    
    const emitterGeometry = new THREE.ConeGeometry(0.15, 0.25, 16);
    const emitterMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x8A2BE2,
        emissive: 0x8A2BE2,
        emissiveIntensity: 0.8,
        transparent: true,
        opacity: 0.7
    });
    const emitter = new THREE.Mesh(emitterGeometry, emitterMaterial);
    emitter.rotation.z = -Math.PI / 2;
    emitter.position.set(0.7, 0, 0);
    gravityGroup.add(emitter);
    
    const gripGeometry = new THREE.BoxGeometry(0.12, 0.25, 0.14);
    const gripMaterial = new THREE.MeshPhongMaterial({ color: 0x1a1a1a });
    const grip = new THREE.Mesh(gripGeometry, gripMaterial);
    grip.position.set(-0.15, -0.2, 0);
    grip.castShadow = true;
    gravityGroup.add(grip);
    
    for (let i = 0; i < 3; i++) {
        const ledGeometry = new THREE.BoxGeometry(0.03, 0.03, 0.03);
        const ledMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x00FFFF,
            emissive: 0x00FFFF,
            emissiveIntensity: 1.0
        });
        const led = new THREE.Mesh(ledGeometry, ledMaterial);
        led.position.set(-0.15, -0.1 - i * 0.05, 0.08);
        gravityGroup.add(led);
    }
    
    const stabGeometry = new THREE.BoxGeometry(0.4, 0.05, 0.05);
    const stabMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x4B0082,
        emissive: 0x4B0082,
        emissiveIntensity: 0.3
    });
    
    const topStab = new THREE.Mesh(stabGeometry, stabMaterial);
    topStab.position.set(0.1, 0.12, 0);
    gravityGroup.add(topStab);
    
    const bottomStab = new THREE.Mesh(stabGeometry, stabMaterial);
    bottomStab.position.set(0.1, -0.12, 0);
    gravityGroup.add(bottomStab);
    
    gravityGroup.scale.set(1.6, 1.6, 1.6);
    return gravityGroup;
}

function createFlamethrower() {
    const flameGroup = new THREE.Group();

    // Баллон с топливом
    const tankGeometry = new THREE.CylinderGeometry(0.12, 0.12, 0.4, 12);
    const tankMaterial = new THREE.MeshPhongMaterial({ color: 0xFF4500 });
    const tank = new THREE.Mesh(tankGeometry, tankMaterial);
    tank.rotation.z = Math.PI / 2;
    tank.position.set(-0.2, 0, 0);
    tank.castShadow = true;
    flameGroup.add(tank);

    // Шланг
    const hoseGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.3, 8);
    const hoseMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
    const hose = new THREE.Mesh(hoseGeometry, hoseMaterial);
    hose.rotation.z = Math.PI / 2;
    hose.position.set(0, 0, 0);
    hose.castShadow = true;
    flameGroup.add(hose);

    // Горелка/сопло
    const nozzleGeometry = new THREE.ConeGeometry(0.08, 0.2, 8);
    const nozzleMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    const nozzle = new THREE.Mesh(nozzleGeometry, nozzleMaterial);
    nozzle.rotation.z = -Math.PI / 2;
    nozzle.position.set(0.25, 0, 0);
    nozzle.castShadow = true;
    flameGroup.add(nozzle);

    // Рукоятка
    const handleGeometry = new THREE.BoxGeometry(0.06, 0.15, 0.08);
    const handleMaterial = new THREE.MeshPhongMaterial({ color: 0x4a4a4a });
    const handle = new THREE.Mesh(handleGeometry, handleMaterial);
    handle.position.set(-0.1, -0.1, 0);
    handle.castShadow = true;
    flameGroup.add(handle);

    return flameGroup;
}

function createGrenade() {
    const grenadeGroup = new THREE.Group();

    // Основной ствол (труба для гранат)
    const barrelGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.5, 12);
    const barrelMaterial = new THREE.MeshPhongMaterial({ color: 0x2F4F4F });
    const barrel = new THREE.Mesh(barrelGeometry, barrelMaterial);
    barrel.rotation.z = Math.PI / 2;
    barrel.position.set(0.15, 0, 0);
    barrel.castShadow = true;
    grenadeGroup.add(barrel);

    // Казенная часть (где загружаются гранаты)
    const breechGeometry = new THREE.CylinderGeometry(0.13, 0.11, 0.15, 12);
    const breechMaterial = new THREE.MeshPhongMaterial({ color: 0x696969 });
    const breech = new THREE.Mesh(breechGeometry, breechMaterial);
    breech.rotation.z = Math.PI / 2;
    breech.position.set(-0.1, 0, 0);
    breech.castShadow = true;
    grenadeGroup.add(breech);

    // Корпус/ложа
    const bodyGeometry = new THREE.BoxGeometry(0.3, 0.12, 0.12);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.set(-0.15, 0, 0);
    body.castShadow = true;
    grenadeGroup.add(body);

    // Рукоятка
    const gripGeometry = new THREE.BoxGeometry(0.08, 0.16, 0.08);
    const gripMaterial = new THREE.MeshPhongMaterial({ color: 0x4a4a4a });
    const grip = new THREE.Mesh(gripGeometry, gripMaterial);
    grip.position.set(-0.15, -0.14, 0);
    grip.castShadow = true;
    grenadeGroup.add(grip);

    // Прицел
    const sightGeometry = new THREE.BoxGeometry(0.04, 0.06, 0.03);
    const sightMaterial = new THREE.MeshPhongMaterial({ color: 0xFF0000 });
    const sight = new THREE.Mesh(sightGeometry, sightMaterial);
    sight.position.set(0, 0.08, 0);
    grenadeGroup.add(sight);

    return grenadeGroup;
}

function createWeapon(type) {
    if (type === 'pistol') return createPistol();
    else if (type === 'rifle') return createRifle();
    else if (type === 'ak47') return createAK47();
    else if (type === 'laser') return createLaserGun();
    else if (type === 'gravity') return createGravityGun();
    else if (type === 'machinegun') return createMachinegun();
    else if (type === 'shotgun') return createShotgun();
    else if (type === 'sniper') return createSniper();
    else if (type === 'rocket') return createRocket();
    else if (type === 'crossbow') return createCrossbow();
    else if (type === 'minigun') return createMinigun();
    else if (type === 'railgun') return createRailgun();
    else if (type === 'flamethrower') return createFlamethrower();
    else if (type === 'grenade') return createGrenade();
    else if (type === 'bfg') return createBFG();
    else if (type === 'plasmacannon') return createPlasmaCannon();
    else if (type === 'plasma') return createPlasma();
    return createPistol();
}

function createShotgun() {
    const sgGroup = new THREE.Group();
    
    const barrelGeometry = new THREE.CylinderGeometry(0.045, 0.045, 0.6, 8);
    const barrelMaterial = new THREE.MeshPhongMaterial({ color: 0x2a2a2a });
    
    const barrel1 = new THREE.Mesh(barrelGeometry, barrelMaterial);
    barrel1.rotation.z = Math.PI / 2;
    barrel1.position.z = 0.03;
    barrel1.castShadow = true;
    sgGroup.add(barrel1);
    
    const barrel2 = new THREE.Mesh(barrelGeometry, barrelMaterial);
    barrel2.rotation.z = Math.PI / 2;
    barrel2.position.z = -0.03;
    barrel2.castShadow = true;
    sgGroup.add(barrel2);
    
    const bodyGeometry = new THREE.BoxGeometry(0.35, 0.12, 0.14);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x3a3a3a });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.set(-0.15, 0, 0);
    body.castShadow = true;
    sgGroup.add(body);
    
    const stockGeometry = new THREE.BoxGeometry(0.3, 0.12, 0.1);
    const stockMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    const stock = new THREE.Mesh(stockGeometry, stockMaterial);
    stock.position.set(-0.4, -0.01, 0);
    stock.castShadow = true;
    sgGroup.add(stock);
    
    const gripGeometry = new THREE.BoxGeometry(0.07, 0.14, 0.07);
    const gripMaterial = new THREE.MeshPhongMaterial({ color: 0x654321 });
    const grip = new THREE.Mesh(gripGeometry, gripMaterial);
    grip.position.set(-0.1, -0.11, 0);
    grip.castShadow = true;
    sgGroup.add(grip);
    
    const boltGeometry = new THREE.BoxGeometry(0.15, 0.05, 0.05);
    const boltMaterial = new THREE.MeshPhongMaterial({ color: 0x555555 });
    const bolt = new THREE.Mesh(boltGeometry, boltMaterial);
    bolt.position.set(-0.15, 0.08, 0);
    bolt.castShadow = true;
    sgGroup.add(bolt);
    
    sgGroup.scale.set(1.9, 1.9, 1.9);
    return sgGroup;
}

function createSniper() {
    const group = new THREE.Group();
    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.0, 8), new THREE.MeshPhongMaterial({ color: 0x1a1a1a }));
    barrel.rotation.z = Math.PI / 2;
    group.add(barrel);
    const scope = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.3, 8), new THREE.MeshPhongMaterial({ color: 0x222222 }));
    scope.position.set(0.1, 0.1, 0);
    group.add(scope);
    group.scale.set(2.0, 2.0, 2.0);
    return group;
}

function createRocket() {
    const group = new THREE.Group();
    const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.7, 8), new THREE.MeshPhongMaterial({ color: 0x4a4a4a }));
    tube.rotation.z = Math.PI / 2;
    group.add(tube);
    const grip = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.15, 0.08), new THREE.MeshPhongMaterial({ color: 0x654321 }));
    grip.position.set(-0.2, -0.12, 0);
    group.add(grip);
    group.scale.set(2.2, 2.2, 2.2);
    return group;
}

function createCrossbow() {
    const group = new THREE.Group();
    const stock = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.06, 0.08), new THREE.MeshPhongMaterial({ color: 0x8B4513 }));
    group.add(stock);
    const bow = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.02, 8, 16, Math.PI), new THREE.MeshPhongMaterial({ color: 0x222222 }));
    bow.rotation.z = -Math.PI / 2;
    bow.position.set(0.25, 0, 0);
    group.add(bow);
    group.scale.set(1.7, 1.7, 1.7);
    return group;
}

function createPlasma() {
    const group = new THREE.Group();
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.1), new THREE.MeshPhongMaterial({ color: 0xFF00FF, emissive: 0xFF00FF, emissiveIntensity: 0.8 }));
    group.add(core);
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.02, 8, 16), new THREE.MeshPhongMaterial({ color: 0x00FFFF, emissive: 0x00FFFF, emissiveIntensity: 0.5 }));
    group.add(ring1);
    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.3, 8), new THREE.MeshPhongMaterial({ color: 0x666666 }));
    handle.position.set(-0.2, -0.08, 0);
    group.add(handle);
    group.scale.set(1.9, 1.9, 1.9);
    return group;
}

function createMachinegun() {
    const mgGroup = new THREE.Group();
    const barrelGeometry = new THREE.CylinderGeometry(0.04, 0.04, 0.8, 8);
    const barrelMaterial = new THREE.MeshPhongMaterial({ color: 0x1a1a1a });
    const barrel = new THREE.Mesh(barrelGeometry, barrelMaterial);
    barrel.rotation.z = Math.PI / 2;
    barrel.castShadow = true;
    mgGroup.add(barrel);
    const bodyGeometry = new THREE.BoxGeometry(0.4, 0.1, 0.12);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.set(-0.1, 0, 0);
    body.castShadow = true;
    mgGroup.add(body);
    const magazineGeometry = new THREE.BoxGeometry(0.15, 0.25, 0.1);
    const magazineMaterial = new THREE.MeshPhongMaterial({ color: 0x444444 });
    const magazine = new THREE.Mesh(magazineGeometry, magazineMaterial);
    magazine.position.set(-0.05, -0.17, 0);
    magazine.castShadow = true;
    mgGroup.add(magazine);
    mgGroup.scale.set(1.8, 1.8, 1.8);
    return mgGroup;
}

// Премиум оружие для магазина

function createMinigun() {
    const minigunGroup = new THREE.Group();
    
    // 6 стволов в круге
    for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const x = Math.cos(angle) * 0.08;
        const z = Math.sin(angle) * 0.08;
        
        const barrelGeometry = new THREE.CylinderGeometry(0.025, 0.025, 0.8, 8);
        const barrelMaterial = new THREE.MeshPhongMaterial({ color: 0x2a2a2a });
        const barrel = new THREE.Mesh(barrelGeometry, barrelMaterial);
        barrel.rotation.z = Math.PI / 2;
        barrel.position.set(0.2, x, z);
        barrel.castShadow = true;
        minigunGroup.add(barrel);
    }
    
    // Центральный вал
    const axleGeometry = new THREE.CylinderGeometry(0.06, 0.06, 0.5, 8);
    const axleMaterial = new THREE.MeshPhongMaterial({ color: 0x1a1a1a });
    const axle = new THREE.Mesh(axleGeometry, axleMaterial);
    axle.rotation.z = Math.PI / 2;
    axle.position.set(0.2, 0, 0);
    minigunGroup.add(axle);
    
    // Корпус мотора
    const motorGeometry = new THREE.BoxGeometry(0.3, 0.25, 0.25);
    const motorMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xFF4500,
        emissive: 0xFF4500,
        emissiveIntensity: 0.2
    });
    const motor = new THREE.Mesh(motorGeometry, motorMaterial);
    motor.position.set(-0.15, 0, 0);
    motor.castShadow = true;
    minigunGroup.add(motor);
    
    // Рукоятка
    const gripGeometry = new THREE.BoxGeometry(0.1, 0.2, 0.12);
    const gripMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
    const grip = new THREE.Mesh(gripGeometry, gripMaterial);
    grip.position.set(-0.1, -0.2, 0);
    grip.castShadow = true;
    minigunGroup.add(grip);
    
    // Патронная лента
    const beltGeometry = new THREE.BoxGeometry(0.2, 0.15, 0.08);
    const beltMaterial = new THREE.MeshPhongMaterial({ color: 0xFFD700 });
    const belt = new THREE.Mesh(beltGeometry, beltMaterial);
    belt.position.set(-0.2, 0.15, 0);
    minigunGroup.add(belt);
    
    minigunGroup.scale.set(1.7, 1.7, 1.7);
    return minigunGroup;
}

function createRailgun() {
    const railgunGroup = new THREE.Group();
    
    // Длинный рельсовый ствол
    const railGeometry = new THREE.BoxGeometry(1.2, 0.06, 0.06);
    const railMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x00FFFF,
        emissive: 0x00FFFF,
        emissiveIntensity: 0.5,
        metalness: 1.0
    });
    
    const topRail = new THREE.Mesh(railGeometry, railMaterial);
    topRail.position.set(0.4, 0.04, 0);
    railgunGroup.add(topRail);
    
    const bottomRail = new THREE.Mesh(railGeometry, railMaterial);
    bottomRail.position.set(0.4, -0.04, 0);
    railgunGroup.add(bottomRail);
    
    // Энергетические катушки
    for (let i = 0; i < 8; i++) {
        const coilGeometry = new THREE.TorusGeometry(0.08, 0.02, 8, 16);
        const coilMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x0088FF,
            emissive: 0x0088FF,
            emissiveIntensity: 0.6
        });
        const coil = new THREE.Mesh(coilGeometry, coilMaterial);
        coil.position.set(0.1 + i * 0.12, 0, 0);
        coil.rotation.y = Math.PI / 2;
        railgunGroup.add(coil);
    }
    
    // Корпус генератора
    const bodyGeometry = new THREE.BoxGeometry(0.4, 0.2, 0.15);
    const bodyMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x1a1a2e,
        metalness: 0.9
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.set(-0.2, 0, 0);
    body.castShadow = true;
    railgunGroup.add(body);
    
    // Энергетический блок
    const powerGeometry = new THREE.BoxGeometry(0.2, 0.15, 0.12);
    const powerMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xFF00FF,
        emissive: 0xFF00FF,
        emissiveIntensity: 0.8
    });
    const power = new THREE.Mesh(powerGeometry, powerMaterial);
    power.position.set(-0.35, 0, 0);
    railgunGroup.add(power);
    
    // Рукоятка
    const gripGeometry = new THREE.BoxGeometry(0.1, 0.22, 0.12);
    const gripMaterial = new THREE.MeshPhongMaterial({ color: 0x222222 });
    const grip = new THREE.Mesh(gripGeometry, gripMaterial);
    grip.position.set(-0.15, -0.18, 0);
    grip.castShadow = true;
    railgunGroup.add(grip);
    
    // Прицел
    const scopeGeometry = new THREE.BoxGeometry(0.15, 0.06, 0.06);
    const scopeMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xFF0000,
        emissive: 0xFF0000,
        emissiveIntensity: 0.5
    });
    const scope = new THREE.Mesh(scopeGeometry, scopeMaterial);
    scope.position.set(0, 0.12, 0);
    railgunGroup.add(scope);
    
    railgunGroup.scale.set(1.6, 1.6, 1.6);
    return railgunGroup;
}

function createBFG() {
    const bfgGroup = new THREE.Group();
    
    // Массивный корпус
    const bodyGeometry = new THREE.BoxGeometry(0.8, 0.3, 0.3);
    const bodyMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x00FF00,
        emissive: 0x00FF00,
        emissiveIntensity: 0.4,
        metalness: 1.0
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.castShadow = true;
    bfgGroup.add(body);
    
    // Огромное дуло
    const muzzleGeometry = new THREE.CylinderGeometry(0.2, 0.15, 0.3, 16);
    const muzzleMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xFFFFFF,
        emissive: 0x00FF00,
        emissiveIntensity: 1.0
    });
    const muzzle = new THREE.Mesh(muzzleGeometry, muzzleMaterial);
    muzzle.rotation.z = Math.PI / 2;
    muzzle.position.set(0.55, 0, 0);
    bfgGroup.add(muzzle);
    
    // Энергетическая сфера в центре
    const coreGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const coreMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x00FF00,
        emissive: 0x00FF00,
        emissiveIntensity: 2.0,
        transparent: true,
        opacity: 0.9
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    core.position.set(0.2, 0, 0);
    bfgGroup.add(core);
    
    // Охлаждающие ребра
    for (let i = 0; i < 5; i++) {
        const finGeometry = new THREE.BoxGeometry(0.15, 0.35, 0.02);
        const finMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x00AA00,
            metalness: 0.8
        });
        const fin = new THREE.Mesh(finGeometry, finMaterial);
        fin.position.set(-0.1 + i * 0.15, 0, 0.16 - i % 2 * 0.32);
        bfgGroup.add(fin);
    }
    
    // Рукоятка
    const gripGeometry = new THREE.BoxGeometry(0.12, 0.25, 0.14);
    const gripMaterial = new THREE.MeshPhongMaterial({ color: 0x1a1a1a });
    const grip = new THREE.Mesh(gripGeometry, gripMaterial);
    grip.position.set(-0.15, -0.25, 0);
    grip.castShadow = true;
    bfgGroup.add(grip);
    
    // Индикаторы заряда
    for (let i = 0; i < 3; i++) {
        const ledGeometry = new THREE.BoxGeometry(0.04, 0.04, 0.04);
        const ledMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xFF0000,
            emissive: 0xFF0000,
            emissiveIntensity: 1.5
        });
        const led = new THREE.Mesh(ledGeometry, ledMaterial);
        led.position.set(-0.3, 0.1 - i * 0.05, 0.1);
        bfgGroup.add(led);
    }
    
    bfgGroup.scale.set(2.0, 2.0, 2.0);
    return bfgGroup;
}

function createPlasmaCannon() {
    const plasmaGroup = new THREE.Group();
    
    // Корпус пушки
    const bodyGeometry = new THREE.BoxGeometry(0.7, 0.25, 0.25);
    const bodyMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x8B00FF,
        emissive: 0x8B00FF,
        emissiveIntensity: 0.3
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.castShadow = true;
    plasmaGroup.add(body);
    
    // Плазменный контейнер
    const containerGeometry = new THREE.SphereGeometry(0.12, 16, 16);
    const containerMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xFF00FF,
        emissive: 0xFF00FF,
        emissiveIntensity: 1.8,
        transparent: true,
        opacity: 0.7
    });
    
    for (let i = 0; i < 3; i++) {
        const container = new THREE.Mesh(containerGeometry, containerMaterial);
        container.position.set(-0.2 + i * 0.2, 0, 0);
        plasmaGroup.add(container);
    }
    
    // Излучатель
    const emitterGeometry = new THREE.ConeGeometry(0.12, 0.3, 16);
    const emitterMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xFF00FF,
        emissive: 0xFF00FF,
        emissiveIntensity: 1.0,
        transparent: true,
        opacity: 0.8
    });
    const emitter = new THREE.Mesh(emitterGeometry, emitterMaterial);
    emitter.rotation.z = -Math.PI / 2;
    emitter.position.set(0.5, 0, 0);
    plasmaGroup.add(emitter);
    
    // Энергетические кольца вокруг излучателя
    for (let i = 0; i < 4; i++) {
        const ringGeometry = new THREE.TorusGeometry(0.1 + i * 0.03, 0.015, 8, 16);
        const ringMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x00FFFF,
            emissive: 0x00FFFF,
            emissiveIntensity: 0.8
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.position.set(0.45, 0, 0);
        ring.rotation.y = Math.PI / 2;
        plasmaGroup.add(ring);
    }
    
    // Рукоятка
    const gripGeometry = new THREE.BoxGeometry(0.1, 0.2, 0.12);
    const gripMaterial = new THREE.MeshPhongMaterial({ color: 0x2a2a2a });
    const grip = new THREE.Mesh(gripGeometry, gripMaterial);
    grip.position.set(-0.1, -0.2, 0);
    grip.castShadow = true;
    plasmaGroup.add(grip);
    
    plasmaGroup.scale.set(1.7, 1.7, 1.7);
    return plasmaGroup;
}

function createRifle() {
    const rifleGroup = new THREE.Group();

    // Длинный ствол
    // Толстый ствол
    const barrelGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.8, 8);
    const barrelMaterial = new THREE.MeshPhongMaterial({ color: 0x1a1a1a });
    const barrel = new THREE.Mesh(barrelGeometry, barrelMaterial);
    barrel.rotation.z = Math.PI / 2;
    barrel.castShadow = true;
    mgGroup.add(barrel);

    // Кожух охлаждения
    const coolingGeometry = new THREE.CylinderGeometry(0.07, 0.07, 0.4, 12);
    const coolingMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
    const cooling = new THREE.Mesh(coolingGeometry, coolingMaterial);
    cooling.rotation.z = Math.PI / 2;
    cooling.position.set(0.1, 0, 0);
    cooling.castShadow = true;
    mgGroup.add(cooling);

    // Массивный корпус
    const bodyGeometry = new THREE.BoxGeometry(0.5, 0.12, 0.15);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x2a2a2a });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.set(-0.15, 0, 0);
    body.castShadow = true;
    mgGroup.add(body);

    // Магазин (барабан)
    const magGeometry = new THREE.CylinderGeometry(0.12, 0.12, 0.08, 16);
    const magMaterial = new THREE.MeshPhongMaterial({ color: 0x444444 });
    const mag = new THREE.Mesh(magGeometry, magMaterial);
    mag.position.set(-0.1, -0.1, 0);
    mag.castShadow = true;
    mgGroup.add(mag);

    // Рукоятка
    const gripGeometry = new THREE.BoxGeometry(0.08, 0.15, 0.08);
    const gripMaterial = new THREE.MeshPhongMaterial({ color: 0x654321 });
    const grip = new THREE.Mesh(gripGeometry, gripMaterial);
    grip.position.set(-0.2, -0.12, 0);
    grip.castShadow = true;
    mgGroup.add(grip);

    mgGroup.scale.set(2.0, 2.0, 2.0);
    return mgGroup;
}


