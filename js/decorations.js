// Создание декораций уровня

function createTree() {
    const treeGroup = new THREE.Group();

    // ОПТИМИЗАЦИЯ: Меньше сегментов для цилиндра (было 12, стало 6)
    const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.3, 2, 6);
    const trunkMaterial = new THREE.MeshStandardMaterial({
        color: 0x8B4513,
        roughness: 0.9,
        metalness: 0
    });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = 1;
    trunk.castShadow = true;
    trunk.receiveShadow = false; // ОПТИМИЗАЦИЯ: Отключены получаемые тени
    treeGroup.add(trunk);

    // ОПТИМИЗАЦИЯ: Меньше сегментов для сферы (было 16x16, стало 8x8)
    const crownGeometry = new THREE.SphereGeometry(1.2, 8, 8);
    const crownMaterial = new THREE.MeshStandardMaterial({
        color: 0x228B22,
        roughness: 0.8,
        metalness: 0
    });
    const crown = new THREE.Mesh(crownGeometry, crownMaterial);
    crown.position.y = 2.5;
    crown.castShadow = true;
    crown.receiveShadow = false; // ОПТИМИЗАЦИЯ
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
    // ОПТИМИЗАЦИЯ: Используем MeshBasicMaterial вместо Phong (быстрее)
    const cloudMaterial = new THREE.MeshBasicMaterial({
        color: 0xFFFFFF,
        transparent: true,
        opacity: 0.8
    });

    // ОПТИМИЗАЦИЯ: Меньше сегментов (было 8x8, стало 4x4)
    for (let i = 0; i < 3; i++) {
        const geometry = new THREE.SphereGeometry(0.5 + Math.random() * 0.3, 4, 4);
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

function createBed() {
    const bedGroup = new THREE.Group();

    // Каркас кровати (основание)
    const frameGeometry = new THREE.BoxGeometry(1.2, 0.3, 1.8);
    const frameMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    frame.position.y = 0.45;
    frame.castShadow = true;
    frame.receiveShadow = true;
    bedGroup.add(frame);

    // Матрас
    const mattressGeometry = new THREE.BoxGeometry(1.1, 0.2, 1.7);
    const mattressMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
    const mattress = new THREE.Mesh(mattressGeometry, mattressMaterial);
    mattress.position.y = 0.7;
    mattress.castShadow = true;
    bedGroup.add(mattress);

    // Одеяло
    const blanketGeometry = new THREE.BoxGeometry(1.0, 0.15, 1.3);
    const blanketMaterial = new THREE.MeshPhongMaterial({ color: 0xFF6347 });
    const blanket = new THREE.Mesh(blanketGeometry, blanketMaterial);
    blanket.position.set(0, 0.85, -0.2);
    blanket.castShadow = true;
    bedGroup.add(blanket);

    // Подушка
    const pillowGeometry = new THREE.BoxGeometry(0.5, 0.15, 0.3);
    const pillowMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
    const pillow = new THREE.Mesh(pillowGeometry, pillowMaterial);
    pillow.position.set(0, 0.9, 0.65);
    pillow.castShadow = true;
    bedGroup.add(pillow);

    // Изголовье
    const headboardGeometry = new THREE.BoxGeometry(1.3, 0.8, 0.1);
    const headboardMaterial = new THREE.MeshPhongMaterial({ color: 0x654321 });
    const headboard = new THREE.Mesh(headboardGeometry, headboardMaterial);
    headboard.position.set(0, 0.9, 0.9);
    headboard.castShadow = true;
    bedGroup.add(headboard);

    // Ножки кровати (4 штуки)
    const legGeometry = new THREE.BoxGeometry(0.1, 0.3, 0.1);
    const legMaterial = new THREE.MeshPhongMaterial({ color: 0x3E2723 });

    const positions = [
        [-0.5, 0.15, -0.8],  // передняя левая
        [0.5, 0.15, -0.8],   // передняя правая
        [-0.5, 0.15, 0.8],   // задняя левая
        [0.5, 0.15, 0.8]     // задняя правая
    ];

    positions.forEach(pos => {
        const leg = new THREE.Mesh(legGeometry, legMaterial);
        leg.position.set(pos[0], pos[1], pos[2]);
        leg.castShadow = true;
        bedGroup.add(leg);
    });

    return bedGroup;
}

function createHouseInterior() {
    const interiorGroup = new THREE.Group();

    // Каменный пол
    const floorGeometry = new THREE.BoxGeometry(5, 0.2, 4.5);
    const stoneMaterial = new THREE.MeshStandardMaterial({
        color: 0x555555,
        roughness: 0.9,
        metalness: 0.1
    });
    const floor = new THREE.Mesh(floorGeometry, stoneMaterial);
    floor.position.y = 0;
    floor.receiveShadow = true;
    // НЕ добавляем isWall - пол не должен блокировать движение
    interiorGroup.add(floor);

    // КАМЕННЫЕ СТЕНЫ
    const wallMaterial = new THREE.MeshStandardMaterial({
        color: 0x707070,
        roughness: 0.8,
        metalness: 0.05
    });

    // Задняя стена (каменная, толще)
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(5, 3, 0.3), wallMaterial);
    backWall.position.set(0, 1.5, -2.25);
    backWall.receiveShadow = true;
    backWall.userData.isWall = true;
    interiorGroup.add(backWall);

    // Левая стена
    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.3, 3, 4.5), wallMaterial);
    leftWall.position.set(-2.5, 1.5, 0);
    leftWall.receiveShadow = true;
    leftWall.userData.isWall = true;
    interiorGroup.add(leftWall);

    // Правая стена
    const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.3, 3, 4.5), wallMaterial);
    rightWall.position.set(2.5, 1.5, 0);
    rightWall.receiveShadow = true;
    rightWall.userData.isWall = true;
    interiorGroup.add(rightWall);

    // Передняя стена с дверью (3 части)
    const frontWallLeft = new THREE.Mesh(new THREE.BoxGeometry(1.5, 3, 0.3), wallMaterial);
    frontWallLeft.position.set(-1.65, 1.5, 2.25);
    frontWallLeft.userData.isWall = true;
    interiorGroup.add(frontWallLeft);

    const frontWallRight = new THREE.Mesh(new THREE.BoxGeometry(1.5, 3, 0.3), wallMaterial);
    frontWallRight.position.set(1.65, 1.5, 2.25);
    frontWallRight.userData.isWall = true;
    interiorGroup.add(frontWallRight);

    const frontWallTop = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1, 0.3), wallMaterial);
    frontWallTop.position.set(0, 2.5, 2.25);
    frontWallTop.userData.isWall = true;
    interiorGroup.add(frontWallTop);

    // Каменный потолок
    const ceiling = new THREE.Mesh(new THREE.BoxGeometry(5, 0.2, 4.5), stoneMaterial);
    ceiling.position.y = 3;
    interiorGroup.add(ceiling);

    // Деревянная дверь
    const doorMaterial = new THREE.MeshStandardMaterial({ color: 0x4a2511, roughness: 0.8 });
    const door = new THREE.Mesh(new THREE.BoxGeometry(1.1, 2, 0.1), doorMaterial);
    door.position.set(0, 1, 2.2);
    interiorGroup.add(door);

    // Окна
    const windowMaterial = new THREE.MeshPhongMaterial({
        color: 0x87CEEB,
        transparent: true,
        opacity: 0.5
    });
    const window1 = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.7, 0.05), windowMaterial);
    window1.position.set(-1.3, 1.7, 2.23);
    interiorGroup.add(window1);

    const window2 = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.7, 0.05), windowMaterial);
    window2.position.set(1.3, 1.7, 2.23);
    interiorGroup.add(window2);

    // КАМИН (левая стена)
    const fireplaceMaterial = new THREE.MeshStandardMaterial({ color: 0x3a3a3a, roughness: 0.9 });
    const fireplaceBase = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1, 0.5), fireplaceMaterial);
    fireplaceBase.position.set(-2.25, 0.6, -1.5);
    fireplaceBase.userData.isFurniture = true;
    interiorGroup.add(fireplaceBase);

    const fireplaceBack = new THREE.Mesh(new THREE.BoxGeometry(1, 0.8, 0.1), new THREE.MeshStandardMaterial({ color: 0x1a1a1a }));
    fireplaceBack.position.set(-2.45, 0.6, -1.5);
    interiorGroup.add(fireplaceBack);

    // Огонь в камине
    const fireGeometry = new THREE.ConeGeometry(0.2, 0.4, 4);
    const fireMaterial = new THREE.MeshPhongMaterial({
        color: 0xff6600,
        emissive: 0xff3300,
        emissiveIntensity: 1
    });
    const fire = new THREE.Mesh(fireGeometry, fireMaterial);
    fire.position.set(-2.3, 0.5, -1.5);
    interiorGroup.add(fire);

    // Свет от камина
    const fireLight = new THREE.PointLight(0xff6600, 1.5, 4);
    fireLight.position.set(-2.3, 0.7, -1.5);
    interiorGroup.add(fireLight);

    // ШКАФ (правая задняя стена)
    const woodMaterial = new THREE.MeshStandardMaterial({ color: 0x4a2511, roughness: 0.7 });
    const wardrobe = new THREE.Mesh(new THREE.BoxGeometry(1.2, 2, 0.6), woodMaterial);
    wardrobe.position.set(1.8, 1.1, -1.5);
    wardrobe.userData.isFurniture = true;
    wardrobe.castShadow = true;
    interiorGroup.add(wardrobe);

    // Дверцы шкафа
    const doorLeft = new THREE.Mesh(new THREE.BoxGeometry(0.55, 1.8, 0.05), new THREE.MeshStandardMaterial({ color: 0x5a3521 }));
    doorLeft.position.set(1.5, 1.1, -1.17);
    interiorGroup.add(doorLeft);

    const doorRight = new THREE.Mesh(new THREE.BoxGeometry(0.55, 1.8, 0.05), new THREE.MeshStandardMaterial({ color: 0x5a3521 }));
    doorRight.position.set(2.1, 1.1, -1.17);
    interiorGroup.add(doorRight);

    // СТОЛ со стульями (центр)
    const table = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.1, 1), woodMaterial);
    table.position.set(0, 0.8, -0.3);
    table.userData.isFurniture = true;
    table.castShadow = true;
    interiorGroup.add(table);

    // Ножки стола
    for (let i = 0; i < 4; i++) {
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.75, 8), woodMaterial);
        const x = (i % 2) * 1.3 - 0.65;
        const z = Math.floor(i / 2) * 0.8 - 0.4;
        leg.position.set(x, 0.375, -0.3 + z);
        interiorGroup.add(leg);
    }

    // Стулья вокруг стола (4 штуки)
    const chairPositions = [
        { x: -0.8, z: -0.3, rot: Math.PI/2 },
        { x: 0.8, z: -0.3, rot: -Math.PI/2 },
        { x: 0, z: -1, rot: 0 },
        { x: 0, z: 0.4, rot: Math.PI }
    ];

    chairPositions.forEach(pos => {
        const chair = new THREE.Group();
        const seat = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.08, 0.45), woodMaterial);
        seat.position.y = 0.5;
        chair.add(seat);

        const backrest = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.5, 0.08), woodMaterial);
        backrest.position.set(0, 0.75, -0.18);
        chair.add(backrest);

        // Ножки стула
        for (let i = 0; i < 4; i++) {
            const legChair = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.5, 6), woodMaterial);
            const lx = (i % 2) * 0.35 - 0.175;
            const lz = Math.floor(i / 2) * 0.35 - 0.175;
            legChair.position.set(lx, 0.25, lz);
            chair.add(legChair);
        }

        chair.position.set(pos.x, 0, pos.z);
        chair.rotation.y = pos.rot;
        chair.userData.isFurniture = true;
        interiorGroup.add(chair);
    });

    // СУНДУК (у задней стены)
    const chestMaterial = new THREE.MeshStandardMaterial({ color: 0x654321, roughness: 0.8 });
    const chest = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.5, 0.5), chestMaterial);
    chest.position.set(-1.5, 0.35, -1.9);
    chest.userData.isFurniture = true;
    chest.castShadow = true;
    interiorGroup.add(chest);

    const chestLid = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.1, 0.52), chestMaterial);
    chestLid.position.set(-1.5, 0.65, -1.9);
    interiorGroup.add(chestLid);

    // Замок сундука
    const lock = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.15, 0.08), new THREE.MeshStandardMaterial({ color: 0xFFD700 }));
    lock.position.set(-1.5, 0.35, -1.63);
    interiorGroup.add(lock);

    // ПОЛКИ на стене (задняя стена)
    for (let i = 0; i < 3; i++) {
        const shelf = new THREE.Mesh(new THREE.BoxGeometry(1, 0.05, 0.3), woodMaterial);
        shelf.position.set(0.5, 1.5 + i * 0.4, -2.1);
        interiorGroup.add(shelf);

        // Книги на полке
        for (let j = 0; j < 5; j++) {
            const bookColors = [0x8B0000, 0x00008B, 0x006400, 0x8B4513, 0x4B0082];
            const book = new THREE.Mesh(
                new THREE.BoxGeometry(0.15, 0.25, 0.2),
                new THREE.MeshStandardMaterial({ color: bookColors[j] })
            );
            book.position.set(0.1 + j * 0.2, 1.65 + i * 0.4, -2.05);
            book.rotation.y = (Math.random() - 0.5) * 0.3;
            interiorGroup.add(book);
        }
    }

    // КОВЁР (красивый узор)
    const rugGeometry = new THREE.BoxGeometry(2.5, 0.03, 2);
    const rugMaterial = new THREE.MeshStandardMaterial({ color: 0x8B1A1A, roughness: 0.9 });
    const rug = new THREE.Mesh(rugGeometry, rugMaterial);
    rug.position.set(0.3, 0.12, 0.2);
    interiorGroup.add(rug);

    // Декоративный узор на ковре
    const rugPattern = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.04, 1.2), new THREE.MeshStandardMaterial({ color: 0xFFD700 }));
    rugPattern.position.set(0.3, 0.14, 0.2);
    interiorGroup.add(rugPattern);

    // ЛЮСТРА на потолке
    const chandelier = new THREE.Group();
    const chain = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.5, 8), new THREE.MeshStandardMaterial({ color: 0x404040 }));
    chain.position.y = 2.75;
    chandelier.add(chain);

    const lampholder = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.25, 0.2, 8), new THREE.MeshStandardMaterial({ color: 0xFFD700, roughness: 0.3, metalness: 0.7 }));
    lampholder.position.y = 2.4;
    chandelier.add(lampholder);

    // 4 свечи на люстре
    for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2;
        const candle = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.15, 8), new THREE.MeshStandardMaterial({ color: 0xFFFACD }));
        candle.position.set(Math.cos(angle) * 0.2, 2.52, Math.sin(angle) * 0.2);
        chandelier.add(candle);

        const flame = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 8), new THREE.MeshPhongMaterial({
            color: 0xFFFF00,
            emissive: 0xFFAA00,
            emissiveIntensity: 1
        }));
        flame.position.set(Math.cos(angle) * 0.2, 2.6, Math.sin(angle) * 0.2);
        chandelier.add(flame);
    }

    interiorGroup.add(chandelier);

    // Основное освещение
    const mainLight = new THREE.PointLight(0xFFFFCC, 1.2, 8);
    mainLight.position.set(0, 2.5, 0);
    mainLight.castShadow = true;
    interiorGroup.add(mainLight);

    // КАРТИНЫ на стенах
    const painting1 = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.9, 0.05), new THREE.MeshStandardMaterial({ color: 0x8B4513 }));
    painting1.position.set(-2.25, 1.8, 0.5);
    painting1.rotation.y = Math.PI / 2;
    interiorGroup.add(painting1);

    const paintingCanvas1 = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.8, 0.02), new THREE.MeshStandardMaterial({ color: 0x4682B4 }));
    paintingCanvas1.position.set(-2.27, 1.8, 0.5);
    paintingCanvas1.rotation.y = Math.PI / 2;
    interiorGroup.add(paintingCanvas1);

    // СВЕЧИ на столе
    for (let i = 0; i < 2; i++) {
        const candleStick = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.06, 0.15, 8), new THREE.MeshStandardMaterial({ color: 0x8B4513 }));
        candleStick.position.set(-0.5 + i, 0.93, -0.3);
        interiorGroup.add(candleStick);

        const candle = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.12, 8), new THREE.MeshStandardMaterial({ color: 0xFFFACD }));
        candle.position.set(-0.5 + i, 1.06, -0.3);
        interiorGroup.add(candle);

        const flame = new THREE.Mesh(new THREE.SphereGeometry(0.04, 6, 6), new THREE.MeshPhongMaterial({
            color: 0xFFFF00,
            emissive: 0xFFAA00,
            emissiveIntensity: 1.2
        }));
        flame.position.set(-0.5 + i, 1.15, -0.3);
        interiorGroup.add(flame);

        // Маленький свет от свечи
        const candleLight = new THREE.PointLight(0xFFAA00, 0.5, 2);
        candleLight.position.set(-0.5 + i, 1.15, -0.3);
        interiorGroup.add(candleLight);
    }

    // ЕДА на столе (мясо/стейк)
    const foodGroup = new THREE.Group();

    // Тарелка
    const plate = new THREE.Mesh(
        new THREE.CylinderGeometry(0.15, 0.15, 0.02, 16),
        new THREE.MeshStandardMaterial({ color: 0xEEEEEE, roughness: 0.4, metalness: 0.2 })
    );
    plate.position.y = 0.86;
    foodGroup.add(plate);

    // Мясо/стейк
    const meat = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 0.06, 0.15),
        new THREE.MeshStandardMaterial({ color: 0x8B4513, roughness: 0.6 })
    );
    meat.position.y = 0.92;
    meat.rotation.y = 0.3;
    foodGroup.add(meat);

    // Косточка для декора
    const bone = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.02, 0.12, 6),
        new THREE.MeshStandardMaterial({ color: 0xF5DEB3 })
    );
    bone.position.set(0.08, 0.92, 0.05);
    bone.rotation.z = Math.PI / 4;
    foodGroup.add(bone);

    foodGroup.position.set(0.4, 0, -0.5);
    foodGroup.userData.isFood = true;
    foodGroup.userData.canBuy = true;
    foodGroup.userData.cost = 50;
    interiorGroup.add(foodGroup);

    // ГАЗИРОВКА на столе
    const sodaGroup = new THREE.Group();

    // Бутылка
    const bottleBody = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.06, 0.25, 12),
        new THREE.MeshStandardMaterial({
            color: 0x00CED1,
            transparent: true,
            opacity: 0.7,
            roughness: 0.2,
            metalness: 0.3
        })
    );
    bottleBody.position.y = 0.985;
    sodaGroup.add(bottleBody);

    // Крышка
    const cap = new THREE.Mesh(
        new THREE.CylinderGeometry(0.055, 0.05, 0.03, 12),
        new THREE.MeshStandardMaterial({ color: 0xFF0000, roughness: 0.5, metalness: 0.4 })
    );
    cap.position.y = 1.125;
    sodaGroup.add(cap);

    // Этикетка
    const label = new THREE.Mesh(
        new THREE.CylinderGeometry(0.052, 0.062, 0.12, 12),
        new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.8 })
    );
    label.position.y = 0.95;
    sodaGroup.add(label);

    // Блик на бутылке
    const highlight = new THREE.Mesh(
        new THREE.SphereGeometry(0.02, 8, 8),
        new THREE.MeshPhongMaterial({
            color: 0xFFFFFF,
            emissive: 0xFFFFFF,
            emissiveIntensity: 0.5,
            transparent: true,
            opacity: 0.6
        })
    );
    highlight.position.set(0.03, 1.0, 0.03);
    sodaGroup.add(highlight);

    sodaGroup.position.set(-0.4, 0, -0.5);
    sodaGroup.userData.isSoda = true;
    sodaGroup.userData.canBuy = true;
    sodaGroup.userData.cost = 50;
    interiorGroup.add(sodaGroup);

    return interiorGroup;
}

function createTrees() {
    // ОПТИМИЗАЦИЯ: Уменьшено количество деревьев для лучшего FPS (было 150, стало 50)
    for (let i = 0; i < 50; i++) {
        const tree = createTree();
        // Слева от центра (-2 до -1)
        tree.position.set(-1.5 + Math.random() * 0.5, 0, -i * 15 - 5);
        tree.userData.isTree = true;
        tree.userData.canChop = true;
        scene.add(tree);
        decorations.push(tree);
    }
    // ОПТИМИЗАЦИЯ: (было 150, стало 50)
    for (let i = 0; i < 50; i++) {
        const tree = createTree();
        // Справа от центра (1 до 2)
        tree.position.set(1.5 - Math.random() * 0.5, 0, -i * 15 - 5);
        tree.userData.isTree = true;
        tree.userData.canChop = true;
        scene.add(tree);
        decorations.push(tree);
    }

    // ОПТИМИЗАЦИЯ: (было 100, стало 30)
    for (let i = 0; i < 30; i++) {
        const tree = createTree();
        // Центральная зона от -4 до 4 (шире!)
        tree.position.set((Math.random() - 0.5) * 8, 0, -i * 20 - Math.random() * 10);
        tree.userData.isTree = true;
        tree.userData.canChop = true;
        scene.add(tree);
        decorations.push(tree);
    }

    // ОПТИМИЗАЦИЯ: Сильно уменьшено (было 400, стало 100)
    for (let i = 0; i < 100; i++) {
        const tree = createTree();

        // Случайная позиция X с приоритетом к центру (от -15 до 15 для новой карты)
        let randomX;
        if (Math.random() > 0.3) {
            // 70% деревьев в центральной зоне (от -8 до 8)
            randomX = (Math.random() - 0.5) * 16;
        } else {
            // 30% деревьев по краям
            if (Math.random() > 0.5) {
                randomX = 8 + Math.random() * 7;
            } else {
                randomX = -8 - Math.random() * 7;
            }
        }

        // Случайная позиция Z по всей длине карты (больше)
        const randomZ = -Math.random() * 700 - 10;

        tree.position.set(randomX, 0, randomZ);
        tree.userData.isTree = true;
        tree.userData.canChop = true;
        scene.add(tree);
        decorations.push(tree);
    }

    // ОПТИМИЗАЦИЯ: Меньше групп деревьев (было 20, стало 8)
    for (let i = 0; i < 8; i++) {
        // Центр группы деревьев (шире по X для новой карты)
        const centerX = (Math.random() > 0.5 ? 1 : -1) * (8 + Math.random() * 7);
        const centerZ = -Math.random() * 600 - 20;

        // ОПТИМИЗАЦИЯ: Меньше деревьев в группе (было 10-20, стало 5-10)
        const treesInGroup = 5 + Math.floor(Math.random() * 6);
        for (let j = 0; j < treesInGroup; j++) {
            const tree = createTree();

            // Деревья в радиусе 3-6 единиц от центра (шире)
            const angle = (j / treesInGroup) * Math.PI * 2 + Math.random();
            const distance = 2 + Math.random() * 4;

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

    // ОПТИМИЗАЦИЯ: Меньше камней (было 50, стало 20)
    for (let i = 0; i < 20; i++) {
        const rock = createRock();
        const side = Math.random() > 0.5 ? -12 : 12; // Дальше по краям
        rock.position.set(side + (Math.random() - 0.5) * 3, 0, -i * 15 - 10);
        scene.add(rock);
        decorations.push(rock);
    }

    // ОПТИМИЗАЦИЯ: Меньше облаков (было 40, стало 15)
    for (let i = 0; i < 15; i++) {
        const cloud = createCloud();
        cloud.position.set((Math.random() - 0.5) * 40, 8 + Math.random() * 4, -i * 20 - 20);
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

// Создание красивого солнца (как на Pinterest)
function createSun() {
    const sunGroup = new THREE.Group();

    // Основное солнце (яркое светящееся)
    const sunGeometry = new THREE.SphereGeometry(8, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({
        color: 0xffff00,
        transparent: true,
        opacity: 1.0
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sunGroup.add(sun);

    // Внутреннее свечение (белое ядро)
    const glowGeometry = new THREE.SphereGeometry(6, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.8
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    sunGroup.add(glow);

    // Внешнее свечение (атмосфера)
    const haloGeometry = new THREE.SphereGeometry(12, 32, 32);
    const haloMaterial = new THREE.MeshBasicMaterial({
        color: 0xffaa00,
        transparent: true,
        opacity: 0.15,
        side: THREE.BackSide
    });
    const halo = new THREE.Mesh(haloGeometry, haloMaterial);
    sunGroup.add(halo);

    // Позиция солнца в небе (как на рассвете/закате)
    sunGroup.position.set(30, 25, -50);

    return sunGroup;
}

// Создание пушистого облака (как на Pinterest)
function createCloud() {
    const cloudGroup = new THREE.Group();

    // Материал облака (белый, полупрозрачный)
    const cloudMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.9,
        roughness: 1.0,
        metalness: 0.0
    });

    // Создаем облако из нескольких сфер для объемности
    const numPuffs = 5 + Math.floor(Math.random() * 3); // 5-7 шариков
    for (let i = 0; i < numPuffs; i++) {
        const size = 2 + Math.random() * 2; // Размер от 2 до 4
        const puffGeometry = new THREE.SphereGeometry(size, 16, 16);
        const puff = new THREE.Mesh(puffGeometry, cloudMaterial);

        // Располагаем шарики облака случайно но близко друг к другу
        puff.position.set(
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 3
        );

        // Немного сплющиваем для реалистичности
        puff.scale.set(1 + Math.random() * 0.3, 0.8 + Math.random() * 0.2, 1 + Math.random() * 0.3);

        cloudGroup.add(puff);
    }

    return cloudGroup;
}

// Добавление облаков в сцену
function createClouds() {
    const numClouds = 15; // Количество облаков

    for (let i = 0; i < numClouds; i++) {
        const cloud = createCloud();

        // Распределяем облака по небу
        cloud.position.set(
            (Math.random() - 0.5) * 80, // X: -40 до 40
            15 + Math.random() * 15,     // Y: 15 до 30 (высота в небе)
            (Math.random() - 0.5) * 100  // Z: -50 до 50
        );

        // Случайный размер облака
        const scale = 0.8 + Math.random() * 0.6; // от 0.8 до 1.4
        cloud.scale.set(scale, scale, scale);

        // Небольшой случайный поворот
        cloud.rotation.y = Math.random() * Math.PI * 2;

        scene.add(cloud);
        decorations.push(cloud);
    }
}
