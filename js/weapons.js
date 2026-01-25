// Создание оружия

function createPistol() {
    const pistolGroup = new THREE.Group();
    
    const handleGeometry = new THREE.BoxGeometry(0.08, 0.15, 0.06);
    const handleMaterial = new THREE.MeshPhongMaterial({ color: 0x654321 });
    const handle = new THREE.Mesh(handleGeometry, handleMaterial);
    handle.position.set(0, -0.1, 0);
    handle.castShadow = true;
    pistolGroup.add(handle);
    
    const barrelGeometry = new THREE.BoxGeometry(0.25, 0.08, 0.08);
    const barrelMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
    const barrel = new THREE.Mesh(barrelGeometry, barrelMaterial);
    barrel.position.set(0.125, 0, 0);
    barrel.castShadow = true;
    pistolGroup.add(barrel);
    
    const slideGeometry = new THREE.BoxGeometry(0.2, 0.06, 0.06);
    const slideMaterial = new THREE.MeshPhongMaterial({ color: 0x111111 });
    const slide = new THREE.Mesh(slideGeometry, slideMaterial);
    slide.position.set(0.1, 0.01, 0);
    slide.castShadow = true;
    pistolGroup.add(slide);
    
    pistolGroup.scale.set(1.5, 1.5, 1.5);
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

function createWeapon(type) {
    if (type === 'pistol') return createPistol();
    else if (type === 'rifle') return createRifle();
    else if (type === 'laser') return createLaserGun();
    else if (type === 'gravity') return createGravityGun();
    else if (type === 'machinegun') return createMachinegun();
    else if (type === 'shotgun') return createShotgun();
    else if (type === 'sniper') return createSniper();
    else if (type === 'rocket') return createRocket();
    else if (type === 'crossbow') return createCrossbow();
    else if (type === 'minigun') return createMinigun();
    else if (type === 'railgun') return createRailgun();
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
