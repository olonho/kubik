// Создание декораций уровня

function createTree() {
    const treeGroup = new THREE.Group();

    const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.3, 2, 12);
    const trunkMaterial = new THREE.MeshStandardMaterial({
        color: 0x8B4513,
        roughness: 0.9,
        metalness: 0
    });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = 1;
    trunk.castShadow = true;
    trunk.receiveShadow = true;
    treeGroup.add(trunk);

    const crownGeometry = new THREE.SphereGeometry(1.2, 16, 16);
    const crownMaterial = new THREE.MeshStandardMaterial({
        color: 0x228B22,
        roughness: 0.8,
        metalness: 0
    });
    const crown = new THREE.Mesh(crownGeometry, crownMaterial);
    crown.position.y = 2.5;
    crown.castShadow = true;
    crown.receiveShadow = true;
    crown.scale.set(1, 1.3, 1);
    treeGroup.add(crown);

    return treeGroup;
}

function createRock() {
    const rockGroup = new THREE.Group();
    const rockGeometry = new THREE.DodecahedronGeometry(0.6, 1);
    const rockMaterial = new THREE.MeshStandardMaterial({
        color: 0x808080,
        roughness: 0.95,
        metalness: 0.1
    });
    const rock = new THREE.Mesh(rockGeometry, rockMaterial);
    rock.castShadow = true;
    rock.receiveShadow = true;
    rock.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
    rock.scale.set(1 + Math.random() * 0.5, 0.7 + Math.random() * 0.3, 1 + Math.random() * 0.5);
    rockGroup.add(rock);
    return rockGroup;
}

function createCloud() {
    const cloudGroup = new THREE.Group();
    const cloudMaterial = new THREE.MeshPhongMaterial({
        color: 0xFFFFFF,
        transparent: true,
        opacity: 0.8
    });
    
    for (let i = 0; i < 3; i++) {
        const geometry = new THREE.SphereGeometry(0.5 + Math.random() * 0.3, 8, 8);
        const sphere = new THREE.Mesh(geometry, cloudMaterial);
        sphere.position.set((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 1);
        cloudGroup.add(sphere);
    }
    
    return cloudGroup;
}

function createBush() {
    const bushGroup = new THREE.Group();
    const bushMaterial = new THREE.MeshStandardMaterial({
        color: 0x228B22,
        roughness: 0.85,
        metalness: 0
    });

    for (let i = 0; i < 4; i++) {
        const geometry = new THREE.SphereGeometry(0.3 + Math.random() * 0.2, 12, 12);
        const sphere = new THREE.Mesh(geometry, bushMaterial);
        sphere.position.set((Math.random() - 0.5) * 0.6, 0.2, (Math.random() - 0.5) * 0.6);
        sphere.castShadow = true;
        sphere.receiveShadow = true;
        bushGroup.add(sphere);
    }

    return bushGroup;
}

function createFlower() {
    const flowerGroup = new THREE.Group();

    const stemGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.4, 8);
    const stemMaterial = new THREE.MeshStandardMaterial({
        color: 0x228B22,
        roughness: 0.7,
        metalness: 0
    });
    const stem = new THREE.Mesh(stemGeometry, stemMaterial);
    stem.position.y = 0.2;
    stem.castShadow = true;
    flowerGroup.add(stem);

    const flowerColors = [0xFF1493, 0xFFFF00, 0xFF6347, 0xFF69B4, 0xFFA500, 0x9370DB];
    const flowerColor = flowerColors[Math.floor(Math.random() * flowerColors.length)];
    const flowerGeometry = new THREE.SphereGeometry(0.1, 12, 12);
    const flowerMaterial = new THREE.MeshStandardMaterial({
        color: flowerColor,
        emissive: flowerColor,
        emissiveIntensity: 0.3,
        roughness: 0.5,
        metalness: 0
    });
    const flower = new THREE.Mesh(flowerGeometry, flowerMaterial);
    flower.position.y = 0.45;
    flower.scale.set(1, 0.5, 1);
    flower.castShadow = true;
    flowerGroup.add(flower);

    return flowerGroup;
}

function createFence() {
    const fenceGroup = new THREE.Group();
    
    for (let i = 0; i < 3; i++) {
        const postGeometry = new THREE.BoxGeometry(0.1, 0.8, 0.1);
        const postMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
        const post = new THREE.Mesh(postGeometry, postMaterial);
        post.position.set(i * 0.5, 0.4, 0);
        post.castShadow = true;
        fenceGroup.add(post);
    }
    
    for (let i = 0; i < 2; i++) {
        const railGeometry = new THREE.BoxGeometry(1.2, 0.08, 0.08);
        const railMaterial = new THREE.MeshPhongMaterial({ color: 0xA0522D });
        const rail = new THREE.Mesh(railGeometry, railMaterial);
        rail.position.set(0.5, 0.3 + i * 0.3, 0);
        rail.castShadow = true;
        fenceGroup.add(rail);
    }
    
    return fenceGroup;
}

function createBird() {
    const birdGroup = new THREE.Group();
    
    const bodyGeometry = new THREE.SphereGeometry(0.15, 8, 8);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x4169E1 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.scale.set(1, 0.8, 1.2);
    birdGroup.add(body);
    
    const wingGeometry = new THREE.BoxGeometry(0.4, 0.05, 0.2);
    const wingMaterial = new THREE.MeshPhongMaterial({ color: 0x1E90FF });
    
    const leftWing = new THREE.Mesh(wingGeometry, wingMaterial);
    leftWing.position.set(-0.25, 0, 0);
    birdGroup.add(leftWing);
    
    const rightWing = new THREE.Mesh(wingGeometry, wingMaterial);
    rightWing.position.set(0.25, 0, 0);
    birdGroup.add(rightWing);
    
    birdGroup.userData.wingAnimation = 0;
    
    return birdGroup;
}

function createGrass() {
    const grassGroup = new THREE.Group();
    
    for (let i = 0; i < 5; i++) {
        const bladeGeometry = new THREE.BoxGeometry(0.02, 0.3, 0.02);
        const bladeMaterial = new THREE.MeshPhongMaterial({ color: 0x32CD32 });
        const blade = new THREE.Mesh(bladeGeometry, bladeMaterial);
        blade.position.set((Math.random() - 0.5) * 0.3, 0.15, (Math.random() - 0.5) * 0.3);
        blade.rotation.z = (Math.random() - 0.5) * 0.2;
        grassGroup.add(blade);
    }
    
    return grassGroup;
}

function createSign() {
    const signGroup = new THREE.Group();

    const postGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1.2, 8);
    const postMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    const post = new THREE.Mesh(postGeometry, postMaterial);
    post.position.y = 0.6;
    post.castShadow = true;
    signGroup.add(post);

    const signGeometry = new THREE.BoxGeometry(0.6, 0.4, 0.05);
    const signMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
    const sign = new THREE.Mesh(signGeometry, signMaterial);
    sign.position.y = 1.1;
    sign.castShadow = true;
    signGroup.add(sign);

    return signGroup;
}

function createStreetLamp() {
    const lampGroup = new THREE.Group();

    // Столб
    const poleGeometry = new THREE.CylinderGeometry(0.08, 0.1, 3, 8);
    const poleMaterial = new THREE.MeshPhongMaterial({ color: 0x2F4F4F });
    const pole = new THREE.Mesh(poleGeometry, poleMaterial);
    pole.position.y = 1.5;
    pole.castShadow = true;
    lampGroup.add(pole);

    // Верхушка
    const topGeometry = new THREE.SphereGeometry(0.15, 8, 8);
    const topMaterial = new THREE.MeshPhongMaterial({ color: 0x696969 });
    const top = new THREE.Mesh(topGeometry, topMaterial);
    top.position.y = 3;
    top.castShadow = true;
    lampGroup.add(top);

    // Лампа
    const lightGeometry = new THREE.BoxGeometry(0.3, 0.4, 0.3);
    const lightMaterial = new THREE.MeshPhongMaterial({
        color: 0xFFFFAA,
        emissive: 0xFFFF00,
        emissiveIntensity: 0.5
    });
    const light = new THREE.Mesh(lightGeometry, lightMaterial);
    light.position.set(0, 2.7, 0.2);
    lampGroup.add(light);

    return lampGroup;
}

function createBench() {
    const benchGroup = new THREE.Group();

    // Сиденье
    const seatGeometry = new THREE.BoxGeometry(1.2, 0.1, 0.4);
    const woodMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    const seat = new THREE.Mesh(seatGeometry, woodMaterial);
    seat.position.y = 0.4;
    seat.castShadow = true;
    benchGroup.add(seat);

    // Спинка
    const backGeometry = new THREE.BoxGeometry(1.2, 0.5, 0.1);
    const back = new THREE.Mesh(backGeometry, woodMaterial);
    back.position.set(0, 0.65, -0.15);
    back.castShadow = true;
    benchGroup.add(back);

    // Ножки
    for (let i = 0; i < 4; i++) {
        const legGeometry = new THREE.BoxGeometry(0.1, 0.4, 0.1);
        const legMaterial = new THREE.MeshPhongMaterial({ color: 0x2F4F4F });
        const leg = new THREE.Mesh(legGeometry, legMaterial);
        const x = (i % 2) * 1 - 0.5;
        const z = Math.floor(i / 2) * 0.3 - 0.15;
        leg.position.set(x, 0.2, z);
        leg.castShadow = true;
        benchGroup.add(leg);
    }

    return benchGroup;
}

function createBarrel() {
    const barrelGroup = new THREE.Group();

    const barrelGeometry = new THREE.CylinderGeometry(0.3, 0.35, 0.8, 12);
    const barrelMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    const barrel = new THREE.Mesh(barrelGeometry, barrelMaterial);
    barrel.position.y = 0.4;
    barrel.castShadow = true;
    barrelGroup.add(barrel);

    // Обручи
    for (let i = 0; i < 3; i++) {
        const ringGeometry = new THREE.TorusGeometry(0.32, 0.03, 8, 12);
        const ringMaterial = new THREE.MeshPhongMaterial({ color: 0x2F4F4F });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.position.y = 0.1 + i * 0.3;
        ring.rotation.x = Math.PI / 2;
        barrelGroup.add(ring);
    }

    return barrelGroup;
}

function createCrate() {
    const crateGroup = new THREE.Group();

    const crateGeometry = new THREE.BoxGeometry(0.6, 0.6, 0.6);
    const crateMaterial = new THREE.MeshPhongMaterial({ color: 0xA0522D });
    const crate = new THREE.Mesh(crateGeometry, crateMaterial);
    crate.position.y = 0.3;
    crate.castShadow = true;
    crate.rotation.y = Math.random() * Math.PI;
    crateGroup.add(crate);

    // Планки
    for (let i = 0; i < 3; i++) {
        const plankGeometry = new THREE.BoxGeometry(0.65, 0.05, 0.1);
        const plankMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
        const plank = new THREE.Mesh(plankGeometry, plankMaterial);
        plank.position.set(0, i * 0.25, 0.31);
        crateGroup.add(plank);
    }

    return crateGroup;
}

function createMushroom() {
    const mushroomGroup = new THREE.Group();

    // Ножка
    const stemGeometry = new THREE.CylinderGeometry(0.08, 0.06, 0.3, 8);
    const stemMaterial = new THREE.MeshPhongMaterial({ color: 0xF5F5DC });
    const stem = new THREE.Mesh(stemGeometry, stemMaterial);
    stem.position.y = 0.15;
    mushroomGroup.add(stem);

    // Шляпка
    const capGeometry = new THREE.SphereGeometry(0.2, 12, 12);
    const capColors = [0xFF0000, 0xFF6347, 0xDC143C, 0xFFB6C1];
    const capColor = capColors[Math.floor(Math.random() * capColors.length)];
    const capMaterial = new THREE.MeshPhongMaterial({ color: capColor });
    const cap = new THREE.Mesh(capGeometry, capMaterial);
    cap.position.y = 0.35;
    cap.scale.set(1, 0.6, 1);
    mushroomGroup.add(cap);

    // Белые точки на шляпке
    for (let i = 0; i < 5; i++) {
        const dotGeometry = new THREE.SphereGeometry(0.03, 6, 6);
        const dotMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
        const dot = new THREE.Mesh(dotGeometry, dotMaterial);
        const angle = (i / 5) * Math.PI * 2;
        dot.position.set(Math.cos(angle) * 0.12, 0.37, Math.sin(angle) * 0.12);
        mushroomGroup.add(dot);
    }

    return mushroomGroup;
}

function createPillar() {
    const pillarGroup = new THREE.Group();

    // База
    const baseGeometry = new THREE.CylinderGeometry(0.4, 0.5, 0.3, 8);
    const stoneMaterial = new THREE.MeshPhongMaterial({ color: 0x808080 });
    const base = new THREE.Mesh(baseGeometry, stoneMaterial);
    base.position.y = 0.15;
    base.castShadow = true;
    pillarGroup.add(base);

    // Колонна
    const columnGeometry = new THREE.CylinderGeometry(0.3, 0.3, 2, 12);
    const column = new THREE.Mesh(columnGeometry, stoneMaterial);
    column.position.y = 1.3;
    column.castShadow = true;
    pillarGroup.add(column);

    // Верхушка
    const topGeometry = new THREE.CylinderGeometry(0.5, 0.4, 0.3, 8);
    const top = new THREE.Mesh(topGeometry, stoneMaterial);
    top.position.y = 2.45;
    top.castShadow = true;
    pillarGroup.add(top);

    return pillarGroup;
}

function createWell() {
    const wellGroup = new THREE.Group();

    // Основание колодца
    const baseGeometry = new THREE.CylinderGeometry(0.6, 0.7, 0.5, 12);
    const stoneMaterial = new THREE.MeshPhongMaterial({ color: 0x696969 });
    const base = new THREE.Mesh(baseGeometry, stoneMaterial);
    base.position.y = 0.25;
    base.castShadow = true;
    wellGroup.add(base);

    // Столбы
    for (let i = 0; i < 2; i++) {
        const postGeometry = new THREE.CylinderGeometry(0.08, 0.08, 1.2, 8);
        const postMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
        const post = new THREE.Mesh(postGeometry, postMaterial);
        post.position.set((i * 2 - 1) * 0.5, 1.1, 0);
        post.castShadow = true;
        wellGroup.add(post);
    }

    // Крыша
    const roofGeometry = new THREE.ConeGeometry(0.8, 0.6, 4);
    const roofMaterial = new THREE.MeshPhongMaterial({ color: 0x8B0000 });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = 2;
    roof.rotation.y = Math.PI / 4;
    roof.castShadow = true;
    wellGroup.add(roof);

    return wellGroup;
}

function createCampfire() {
    const campfireGroup = new THREE.Group();

    // Камни вокруг
    for (let i = 0; i < 8; i++) {
        const stoneGeometry = new THREE.DodecahedronGeometry(0.15);
        const stoneMaterial = new THREE.MeshPhongMaterial({ color: 0x696969 });
        const stone = new THREE.Mesh(stoneGeometry, stoneMaterial);
        const angle = (i / 8) * Math.PI * 2;
        stone.position.set(Math.cos(angle) * 0.5, 0.08, Math.sin(angle) * 0.5);
        stone.castShadow = true;
        campfireGroup.add(stone);
    }

    // Бревна
    for (let i = 0; i < 4; i++) {
        const logGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.6, 8);
        const logMaterial = new THREE.MeshPhongMaterial({ color: 0x4A2511 });
        const log = new THREE.Mesh(logGeometry, logMaterial);
        const angle = (i / 4) * Math.PI * 2;
        log.position.set(Math.cos(angle) * 0.15, 0.3, Math.sin(angle) * 0.15);
        log.rotation.x = Math.PI / 2;
        log.rotation.z = angle;
        campfireGroup.add(log);
    }

    // Огонь
    const fireGeometry = new THREE.ConeGeometry(0.2, 0.5, 6);
    const fireMaterial = new THREE.MeshPhongMaterial({
        color: 0xFF4500,
        emissive: 0xFF4500,
        emissiveIntensity: 0.8
    });
    const fire = new THREE.Mesh(fireGeometry, fireMaterial);
    fire.position.y = 0.5;
    campfireGroup.add(fire);

    return campfireGroup;
}

function createFlag() {
    const flagGroup = new THREE.Group();

    // Флагшток
    const poleGeometry = new THREE.CylinderGeometry(0.05, 0.05, 2.5, 8);
    const poleMaterial = new THREE.MeshPhongMaterial({ color: 0x2F4F4F });
    const pole = new THREE.Mesh(poleGeometry, poleMaterial);
    pole.position.y = 1.25;
    pole.castShadow = true;
    flagGroup.add(pole);

    // Флаг
    const flagGeometry = new THREE.BoxGeometry(0.8, 0.5, 0.05);
    const flagColors = [0xFF0000, 0x0000FF, 0x00FF00, 0xFFFF00, 0xFF00FF];
    const flagColor = flagColors[Math.floor(Math.random() * flagColors.length)];
    const flagMaterial = new THREE.MeshPhongMaterial({ color: flagColor });
    const flag = new THREE.Mesh(flagGeometry, flagMaterial);
    flag.position.set(0.4, 2.2, 0);
    flagGroup.add(flag);

    return flagGroup;
}

function createShed() {
    const shedGroup = new THREE.Group();

    // Стены
    const wallGeometry = new THREE.BoxGeometry(2, 1.5, 1.5);
    const wallMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    const walls = new THREE.Mesh(wallGeometry, wallMaterial);
    walls.position.y = 0.75;
    walls.castShadow = true;
    shedGroup.add(walls);

    // Крыша
    const roofGeometry = new THREE.ConeGeometry(1.3, 0.8, 4);
    const roofMaterial = new THREE.MeshPhongMaterial({ color: 0x8B0000 });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = 1.9;
    roof.rotation.y = Math.PI / 4;
    roof.castShadow = true;
    shedGroup.add(roof);

    // Дверь
    const doorGeometry = new THREE.BoxGeometry(0.6, 1, 0.05);
    const doorMaterial = new THREE.MeshPhongMaterial({ color: 0x654321 });
    const door = new THREE.Mesh(doorGeometry, doorMaterial);
    door.position.set(0, 0.5, 0.76);
    shedGroup.add(door);

    return shedGroup;
}

function createBoulder() {
    const boulderGroup = new THREE.Group();

    // Большой камень
    const boulderGeometry = new THREE.DodecahedronGeometry(0.8);
    const boulderMaterial = new THREE.MeshPhongMaterial({ color: 0x696969 });
    const boulder = new THREE.Mesh(boulderGeometry, boulderMaterial);
    boulder.position.y = 0.4;
    boulder.castShadow = true;
    boulder.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
    boulderGroup.add(boulder);

    // Мох на камне
    for (let i = 0; i < 3; i++) {
        const mossGeometry = new THREE.SphereGeometry(0.15, 8, 8);
        const mossMaterial = new THREE.MeshPhongMaterial({ color: 0x228B22 });
        const moss = new THREE.Mesh(mossGeometry, mossMaterial);
        moss.position.set(
            (Math.random() - 0.5) * 0.6,
            0.2 + Math.random() * 0.4,
            (Math.random() - 0.5) * 0.6
        );
        moss.scale.set(0.8, 0.6, 0.8);
        boulderGroup.add(moss);
    }

    return boulderGroup;
}

function createHouse() {
    const houseGroup = new THREE.Group();

    // Фундамент
    const foundationGeometry = new THREE.BoxGeometry(4, 0.3, 3);
    const foundationMaterial = new THREE.MeshPhongMaterial({ color: 0x808080 });
    const foundation = new THREE.Mesh(foundationGeometry, foundationMaterial);
    foundation.position.y = 0.15;
    foundation.castShadow = true;
    foundation.receiveShadow = true;
    houseGroup.add(foundation);

    // Стены
    const wallGeometry = new THREE.BoxGeometry(4, 2.5, 3);
    const wallMaterial = new THREE.MeshPhongMaterial({ color: 0xD2691E });
    const walls = new THREE.Mesh(wallGeometry, wallMaterial);
    walls.position.y = 1.55;
    walls.castShadow = true;
    walls.receiveShadow = true;
    houseGroup.add(walls);

    // Крыша (двускатная)
    const roofGeometry = new THREE.ConeGeometry(2.5, 1.5, 4);
    const roofMaterial = new THREE.MeshPhongMaterial({ color: 0x8B0000 });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = 3.55;
    roof.rotation.y = Math.PI / 4;
    roof.castShadow = true;
    houseGroup.add(roof);

    // Дверь
    const doorGeometry = new THREE.BoxGeometry(0.8, 1.6, 0.1);
    const doorMaterial = new THREE.MeshPhongMaterial({ color: 0x654321 });
    const door = new THREE.Mesh(doorGeometry, doorMaterial);
    door.position.set(0, 1.1, 1.51);
    door.castShadow = true;
    houseGroup.add(door);

    // Дверная ручка
    const handleGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const handleMaterial = new THREE.MeshPhongMaterial({ color: 0xFFD700 });
    const handle = new THREE.Mesh(handleGeometry, handleMaterial);
    handle.position.set(0.3, 1.1, 1.56);
    houseGroup.add(handle);

    // Окна
    const windowGeometry = new THREE.BoxGeometry(0.6, 0.6, 0.05);
    const windowMaterial = new THREE.MeshPhongMaterial({
        color: 0x87CEEB,
        transparent: true,
        opacity: 0.6,
        emissive: 0x87CEEB,
        emissiveIntensity: 0.2
    });

    // Переднее окно (слева от двери)
    const window1 = new THREE.Mesh(windowGeometry, windowMaterial);
    window1.position.set(-1, 1.8, 1.51);
    houseGroup.add(window1);

    // Переднее окно (справа от двери)
    const window2 = new THREE.Mesh(windowGeometry, windowMaterial);
    window2.position.set(1, 1.8, 1.51);
    houseGroup.add(window2);

    // Боковые окна
    const window3 = new THREE.Mesh(windowGeometry, windowMaterial);
    window3.position.set(-2.01, 1.8, 0);
    window3.rotation.y = Math.PI / 2;
    houseGroup.add(window3);

    const window4 = new THREE.Mesh(windowGeometry, windowMaterial);
    window4.position.set(2.01, 1.8, 0);
    window4.rotation.y = Math.PI / 2;
    houseGroup.add(window4);

    // Труба на крыше
    const chimneyGeometry = new THREE.BoxGeometry(0.4, 1, 0.4);
    const chimneyMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    const chimney = new THREE.Mesh(chimneyGeometry, chimneyMaterial);
    chimney.position.set(1, 3.8, 0.5);
    chimney.castShadow = true;
    houseGroup.add(chimney);

    // Дым из трубы
    for (let i = 0; i < 3; i++) {
        const smokeGeometry = new THREE.SphereGeometry(0.15 + i * 0.05, 8, 8);
        const smokeMaterial = new THREE.MeshPhongMaterial({
            color: 0xCCCCCC,
            transparent: true,
            opacity: 0.4 - i * 0.1
        });
        const smoke = new THREE.Mesh(smokeGeometry, smokeMaterial);
        smoke.position.set(1 + (Math.random() - 0.5) * 0.2, 4.5 + i * 0.3, 0.5 + (Math.random() - 0.5) * 0.2);
        houseGroup.add(smoke);
    }

    // Крыльцо
    const porchGeometry = new THREE.BoxGeometry(1.5, 0.2, 0.8);
    const porchMaterial = new THREE.MeshPhongMaterial({ color: 0xA0522D });
    const porch = new THREE.Mesh(porchGeometry, porchMaterial);
    porch.position.set(0, 0.4, 2.1);
    porch.castShadow = true;
    houseGroup.add(porch);

    // Ступеньки
    for (let i = 0; i < 2; i++) {
        const stepGeometry = new THREE.BoxGeometry(1.5, 0.15, 0.3);
        const stepMaterial = new THREE.MeshPhongMaterial({ color: 0x8B7355 });
        const step = new THREE.Mesh(stepGeometry, stepMaterial);
        step.position.set(0, 0.075 + i * 0.15, 2.5 + i * 0.3);
        step.castShadow = true;
        houseGroup.add(step);
    }

    return houseGroup;
}

function createTrees() {
    // Увеличиваем количество деревьев до 100 с каждой стороны
    for (let i = 0; i < 100; i++) {
        const tree = createTree();
        tree.position.set(-5.5, 0, -i * 5 - 5);
        tree.userData.isTree = true; // Помечаем как дерево для рубки
        tree.userData.canChop = true; // Можно рубить
        scene.add(tree);
        decorations.push(tree);
    }
    for (let i = 0; i < 100; i++) {
        const tree = createTree();
        tree.position.set(5.5, 0, -i * 5 - 5);
        tree.userData.isTree = true; // Помечаем как дерево для рубки
        tree.userData.canChop = true; // Можно рубить
        scene.add(tree);
        decorations.push(tree);
    }

    // Добавляем деревья в разных местах карты для разнообразия
    for (let i = 0; i < 50; i++) {
        const tree = createTree();
        const side = Math.random() > 0.5 ? -7 : 7;
        tree.position.set(side + (Math.random() - 0.5) * 2, 0, -i * 8 - Math.random() * 10);
        tree.userData.isTree = true;
        tree.userData.canChop = true;
        scene.add(tree);
        decorations.push(tree);
    }

    // Добавляем МНОГО деревьев по всему полю в случайных местах
    for (let i = 0; i < 200; i++) {
        const tree = createTree();

        // Случайная позиция X (избегаем центральной дороги от -3 до 3)
        let randomX;
        if (Math.random() > 0.5) {
            // Справа от дороги (от 3.5 до 9)
            randomX = 3.5 + Math.random() * 5.5;
        } else {
            // Слева от дороги (от -9 до -3.5)
            randomX = -9 + Math.random() * 5.5;
        }

        // Случайная позиция Z по всей длине карты
        const randomZ = -Math.random() * 500 - 10;

        tree.position.set(randomX, 0, randomZ);
        tree.userData.isTree = true;
        tree.userData.canChop = true;
        scene.add(tree);
        decorations.push(tree);
    }

    // Добавляем группы деревьев (леса)
    for (let i = 0; i < 10; i++) {
        // Центр группы деревьев
        const centerX = (Math.random() > 0.5 ? 1 : -1) * (4 + Math.random() * 4);
        const centerZ = -Math.random() * 400 - 20;

        // Создаем группу из 8-15 деревьев вокруг центра
        const treesInGroup = 8 + Math.floor(Math.random() * 8);
        for (let j = 0; j < treesInGroup; j++) {
            const tree = createTree();

            // Деревья в радиусе 3-5 единиц от центра
            const angle = (j / treesInGroup) * Math.PI * 2 + Math.random();
            const distance = 1.5 + Math.random() * 3.5;

            tree.position.set(
                centerX + Math.cos(angle) * distance,
                0,
                centerZ + Math.sin(angle) * distance
            );

            tree.userData.isTree = true;
            tree.userData.canChop = true;
            scene.add(tree);
            decorations.push(tree);
        }
    }
    
    for (let i = 0; i < 20; i++) {
        const rock = createRock();
        const side = Math.random() > 0.5 ? -6 : 6;
        rock.position.set(side + (Math.random() - 0.5) * 0.5, 0, -i * 6 - 10);
        scene.add(rock);
        decorations.push(rock);
    }
    
    for (let i = 0; i < 20; i++) {
        const cloud = createCloud();
        cloud.position.set((Math.random() - 0.5) * 20, 8 + Math.random() * 4, -i * 8 - 20);
        scene.add(cloud);
        decorations.push(cloud);
    }
    
    for (let i = 0; i < 30; i++) {
        const bush = createBush();
        const side = Math.random() > 0.5 ? -4.5 : 4.5;
        bush.position.set(side + (Math.random() - 0.5) * 0.8, 0, -i * 4 - Math.random() * 5);
        scene.add(bush);
        decorations.push(bush);
    }
    
    for (let i = 0; i < 40; i++) {
        const flower = createFlower();
        const side = Math.random() > 0.5 ? -4 : 4;
        flower.position.set(side + (Math.random() - 0.5) * 1.5, 0, -i * 3 - Math.random() * 4);
        scene.add(flower);
        decorations.push(flower);
    }
    
    for (let i = 0; i < 50; i++) {
        const grass = createGrass();
        const side = Math.random() > 0.5 ? -3.5 : 3.5;
        grass.position.set(side + (Math.random() - 0.5) * 2, 0, -i * 2.5 - Math.random() * 3);
        scene.add(grass);
        decorations.push(grass);
    }
    
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

    // Фонари
    for (let i = 0; i < 20; i++) {
        const lamp = createStreetLamp();
        const side = Math.random() > 0.5 ? -5.2 : 5.2;
        lamp.position.set(side, 0, -i * 7 - 10);
        scene.add(lamp);
        decorations.push(lamp);
    }

    // Скамейки
    for (let i = 0; i < 12; i++) {
        const bench = createBench();
        const side = Math.random() > 0.5 ? -4.2 : 4.2;
        bench.position.set(side, 0, -i * 12 - Math.random() * 8);
        if (side > 0) {
            bench.rotation.y = -Math.PI / 2;
        } else {
            bench.rotation.y = Math.PI / 2;
        }
        scene.add(bench);
        decorations.push(bench);
    }

    // Бочки
    for (let i = 0; i < 15; i++) {
        const barrel = createBarrel();
        const side = Math.random() > 0.5 ? -4.5 : 4.5;
        barrel.position.set(side + (Math.random() - 0.5) * 0.5, 0, -i * 8 - Math.random() * 6);
        scene.add(barrel);
        decorations.push(barrel);
    }

    // Ящики
    for (let i = 0; i < 18; i++) {
        const crate = createCrate();
        const side = Math.random() > 0.5 ? -4.3 : 4.3;
        crate.position.set(side + (Math.random() - 0.5) * 0.6, 0, -i * 7 - Math.random() * 5);
        scene.add(crate);
        decorations.push(crate);
    }

    // Грибы
    for (let i = 0; i < 25; i++) {
        const mushroom = createMushroom();
        const side = Math.random() > 0.5 ? -4.8 : 4.8;
        mushroom.position.set(side + (Math.random() - 0.5) * 1.2, 0, -i * 5 - Math.random() * 4);
        scene.add(mushroom);
        decorations.push(mushroom);
    }

    // Колонны/Столбы
    for (let i = 0; i < 10; i++) {
        const pillar = createPillar();
        const side = Math.random() > 0.5 ? -5.5 : 5.5;
        pillar.position.set(side, 0, -i * 15 - 25);
        scene.add(pillar);
        decorations.push(pillar);
    }

    // Колодцы
    for (let i = 0; i < 5; i++) {
        const well = createWell();
        const side = Math.random() > 0.5 ? -3.5 : 3.5;
        well.position.set(side, 0, -i * 25 - 30);
        scene.add(well);
        decorations.push(well);
    }

    // Костры
    for (let i = 0; i < 8; i++) {
        const campfire = createCampfire();
        const side = Math.random() > 0.5 ? -3 : 3;
        campfire.position.set(side + (Math.random() - 0.5) * 0.8, 0, -i * 18 - Math.random() * 10);
        scene.add(campfire);
        decorations.push(campfire);
    }

    // Флаги
    for (let i = 0; i < 15; i++) {
        const flag = createFlag();
        const side = Math.random() > 0.5 ? -5.3 : 5.3;
        flag.position.set(side, 0, -i * 10 - Math.random() * 8);
        scene.add(flag);
        decorations.push(flag);
    }

    // Сараи
    for (let i = 0; i < 6; i++) {
        const shed = createShed();
        const side = Math.random() > 0.5 ? -6.5 : 6.5;
        shed.position.set(side, 0, -i * 20 - 40);
        if (side > 0) {
            shed.rotation.y = -Math.PI / 2;
        } else {
            shed.rotation.y = Math.PI / 2;
        }
        scene.add(shed);
        decorations.push(shed);
    }

    // Большие камни с мхом
    for (let i = 0; i < 12; i++) {
        const boulder = createBoulder();
        const side = Math.random() > 0.5 ? -5.8 : 5.8;
        boulder.position.set(side + (Math.random() - 0.5) * 0.8, 0, -i * 12 - Math.random() * 10);
        scene.add(boulder);
        decorations.push(boulder);
    }
}
