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
    return createPistol();
}
