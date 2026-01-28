// Логика питомцев

// Функция создания питомцев
function createPet(type, customName) {
    let petGroup;

    switch(type) {
        case 'dog':
            petGroup = createDogPet();
            break;
        case 'cat':
            petGroup = createCatPet();
            break;
        case 'wolf':
            petGroup = createWolfPet();
            break;
        case 'bear':
            petGroup = createBearPet();
            break;
        case 'eagle':
            petGroup = createEaglePet();
            break;
        case 'panda':
            petGroup = createPandaPet();
            break;
        case 'fox':
            petGroup = createFoxPet();
            break;
        case 'dragon':
            petGroup = createDragonPet();
            break;
        case 'unicorn':
            petGroup = createUnicornPet();
            break;
        case 'robot':
            petGroup = createRobotPet();
            break;
        case 'tiger':
            petGroup = createTigerPet();
            break;
        case 'lion':
            petGroup = createLionPet();
            break;
        default:
            petGroup = createDogPet();
    }

    if (petGroup) {
        petGroup.userData.type = type;
        petGroup.userData.shootCooldown = 0;
        petGroup.userData.hp = 10;
        petGroup.userData.maxHp = 10;
        petGroup.userData.petName = customName || '';

        // Создаем текстовый спрайт с именем питомца над ним
        if (customName) {
            createPetNameTag(petGroup, customName);
        }

        pets.push(petGroup);
    }
}

// Функция создания бирки с именем питомца
function createPetNameTag(petGroup, name) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 256;
    canvas.height = 64;

    // Фон
    context.fillStyle = 'rgba(0, 0, 0, 0.7)';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Текст
    context.font = 'bold 32px Arial';
    context.fillStyle = '#FFD700';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(name, canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(1.5, 0.4, 1);
    sprite.position.set(0, 1.2, 0);

    petGroup.add(sprite);
    petGroup.userData.nameTag = sprite;
}

function createDogPet() {
    console.log('🐕 Создание собаки-питомца...');
    const petGroup = new THREE.Group();
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x8b4513 });

    // Тело
    const bodyGeometry = new THREE.BoxGeometry(0.4, 0.3, 0.6);
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.3;
    petGroup.add(body);

    // Голова
    const headGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
    const head = new THREE.Mesh(headGeometry, bodyMaterial);
    head.position.set(0, 0.4, 0.4);
    petGroup.add(head);

    // 🐕 ДЕТАЛЬНОЕ ЛИЦО СОБАКИ
    // Морда (вытянутая вперед)
    const snoutGeometry = new THREE.BoxGeometry(0.2, 0.15, 0.2);
    const snout = new THREE.Mesh(snoutGeometry, bodyMaterial);
    snout.position.set(0, 0.35, 0.55);
    petGroup.add(snout);

    // Нос (черный, влажный)
    const noseGeometry = new THREE.SphereGeometry(0.04, 8, 8);
    const noseMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
    const nose = new THREE.Mesh(noseGeometry, noseMaterial);
    nose.position.set(0, 0.38, 0.65);
    petGroup.add(nose);

    // Глаза (выразительные с белками)
    const eyeGeometry = new THREE.SphereGeometry(0.04, 8, 8);
    const eyeMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
    const eyeWhiteGeometry = new THREE.SphereGeometry(0.055, 8, 8);
    const eyeWhiteMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });

    // Левый глаз
    const leftEyeWhite = new THREE.Mesh(eyeWhiteGeometry, eyeWhiteMaterial);
    leftEyeWhite.position.set(-0.1, 0.45, 0.52);
    petGroup.add(leftEyeWhite);
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.1, 0.45, 0.55);
    petGroup.add(leftEye);

    // Правый глаз
    const rightEyeWhite = new THREE.Mesh(eyeWhiteGeometry, eyeWhiteMaterial);
    rightEyeWhite.position.set(0.1, 0.45, 0.52);
    petGroup.add(rightEyeWhite);
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.1, 0.45, 0.55);
    petGroup.add(rightEye);

    // Язык (розовый, высунутый)
    const tongueGeometry = new THREE.BoxGeometry(0.08, 0.02, 0.12);
    const tongueMaterial = new THREE.MeshPhongMaterial({ color: 0xff69b4 });
    const tongue = new THREE.Mesh(tongueGeometry, tongueMaterial);
    tongue.position.set(0, 0.3, 0.62);
    petGroup.add(tongue);

    // Уши
    const earGeometry = new THREE.ConeGeometry(0.08, 0.15, 4);
    const leftEar = new THREE.Mesh(earGeometry, bodyMaterial);
    leftEar.position.set(-0.12, 0.55, 0.4);
    petGroup.add(leftEar);
    const rightEar = new THREE.Mesh(earGeometry, bodyMaterial);
    rightEar.position.set(0.12, 0.55, 0.4);
    petGroup.add(rightEar);

    // Хвост
    const tailGeometry = new THREE.CylinderGeometry(0.05, 0.02, 0.3);
    const tail = new THREE.Mesh(tailGeometry, bodyMaterial);
    tail.position.set(0, 0.3, -0.3);
    tail.rotation.x = Math.PI / 4;
    petGroup.add(tail);

    petGroup.position.set(2, 0, 0);
    petGroup.userData.attackType = 'melee'; // Ближний бой
    petGroup.userData.damage = 2;
    petGroup.userData.attackRange = 2;
    petGroup.userData.speed = 0.08;
    petGroup.userData.isPet = true; // Маркер что это питомец

    scene.add(petGroup);
    console.log('🐕 Собака-питомец создана и добавлена в сцену на позиции:', petGroup.position);
    console.log('🐕 Собака находится СПРАВА от игрока на расстоянии 2 метра');
    return petGroup;
}

function createCatPet() {
    const petGroup = new THREE.Group();
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0xffa500 });

    // Тело (меньше чем у собаки)
    const bodyGeometry = new THREE.BoxGeometry(0.3, 0.25, 0.5);
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.25;
    petGroup.add(body);

    // Голова
    const headGeometry = new THREE.BoxGeometry(0.25, 0.25, 0.25);
    const head = new THREE.Mesh(headGeometry, bodyMaterial);
    head.position.set(0, 0.35, 0.35);
    petGroup.add(head);

    // Острые уши
    const earGeometry = new THREE.ConeGeometry(0.06, 0.15, 3);
    const leftEar = new THREE.Mesh(earGeometry, bodyMaterial);
    leftEar.position.set(-0.1, 0.5, 0.35);
    petGroup.add(leftEar);
    const rightEar = new THREE.Mesh(earGeometry, bodyMaterial);
    rightEar.position.set(0.1, 0.5, 0.35);
    petGroup.add(rightEar);

    // Длинный хвост
    const tailGeometry = new THREE.CylinderGeometry(0.04, 0.02, 0.4);
    const tail = new THREE.Mesh(tailGeometry, bodyMaterial);
    tail.position.set(0, 0.35, -0.25);
    tail.rotation.x = -Math.PI / 6;
    petGroup.add(tail);

    petGroup.position.set(-2, 0, 0);
    petGroup.userData.attackType = 'ranged'; // Дальний бой (стрельба)
    petGroup.userData.damage = 3;
    petGroup.userData.attackRange = 15;
    petGroup.userData.speed = 0.06;

    scene.add(petGroup);
    return petGroup;
}

function createWolfPet() {
    const petGroup = new THREE.Group();
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x808080 });

    // Тело (крупнее собаки)
    const bodyGeometry = new THREE.BoxGeometry(0.5, 0.4, 0.7);
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.4;
    petGroup.add(body);

    // Голова (вытянутая морда)
    const headGeometry = new THREE.BoxGeometry(0.35, 0.35, 0.4);
    const head = new THREE.Mesh(headGeometry, bodyMaterial);
    head.position.set(0, 0.5, 0.5);
    petGroup.add(head);

    // Острые уши
    const earGeometry = new THREE.ConeGeometry(0.1, 0.2, 4);
    const leftEar = new THREE.Mesh(earGeometry, bodyMaterial);
    leftEar.position.set(-0.15, 0.7, 0.5);
    petGroup.add(leftEar);
    const rightEar = new THREE.Mesh(earGeometry, bodyMaterial);
    rightEar.position.set(0.15, 0.7, 0.5);
    petGroup.add(rightEar);

    petGroup.position.set(3, 0, 2);
    petGroup.userData.attackType = 'melee';
    petGroup.userData.damage = 4;
    petGroup.userData.attackRange = 2.5;
    petGroup.userData.speed = 0.1;

    scene.add(petGroup);
    return petGroup;
}

function createBearPet() {
    const petGroup = new THREE.Group();
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x654321 });

    // Большое тело
    const bodyGeometry = new THREE.BoxGeometry(0.7, 0.6, 0.8);
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.6;
    petGroup.add(body);

    // Большая голова
    const headGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const head = new THREE.Mesh(headGeometry, bodyMaterial);
    head.position.set(0, 0.9, 0.5);
    petGroup.add(head);

    // Круглые уши
    const earGeometry = new THREE.SphereGeometry(0.12, 8, 8);
    const leftEar = new THREE.Mesh(earGeometry, bodyMaterial);
    leftEar.position.set(-0.2, 1.1, 0.5);
    petGroup.add(leftEar);
    const rightEar = new THREE.Mesh(earGeometry, bodyMaterial);
    rightEar.position.set(0.2, 1.1, 0.5);
    petGroup.add(rightEar);

    petGroup.position.set(-3, 0, 2);
    petGroup.userData.attackType = 'melee';
    petGroup.userData.damage = 6;
    petGroup.userData.attackRange = 2;
    petGroup.userData.speed = 0.05;
    petGroup.userData.hp = 20;
    petGroup.userData.maxHp = 20;

    scene.add(petGroup);
    return petGroup;
}

function createDragonPet() {
    const petGroup = new THREE.Group();
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000, emissive: 0xff0000, emissiveIntensity: 0.3 });

    // Тело дракона
    const bodyGeometry = new THREE.BoxGeometry(0.4, 0.3, 0.6);
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.8;
    petGroup.add(body);

    // Голова с длинной мордой
    const headGeometry = new THREE.BoxGeometry(0.3, 0.25, 0.4);
    const head = new THREE.Mesh(headGeometry, bodyMaterial);
    head.position.set(0, 0.9, 0.5);
    petGroup.add(head);

    // Рога
    const hornGeometry = new THREE.ConeGeometry(0.06, 0.25, 4);
    const hornMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00 });
    const leftHorn = new THREE.Mesh(hornGeometry, hornMaterial);
    leftHorn.position.set(-0.1, 1.15, 0.5);
    petGroup.add(leftHorn);
    const rightHorn = new THREE.Mesh(hornGeometry, hornMaterial);
    rightHorn.position.set(0.1, 1.15, 0.5);
    petGroup.add(rightHorn);

    // Крылья
    const wingGeometry = new THREE.BoxGeometry(0.5, 0.02, 0.4);
    const leftWing = new THREE.Mesh(wingGeometry, bodyMaterial);
    leftWing.position.set(-0.4, 0.9, 0);
    leftWing.rotation.z = Math.PI / 4;
    petGroup.add(leftWing);
    const rightWing = new THREE.Mesh(wingGeometry, bodyMaterial);
    rightWing.position.set(0.4, 0.9, 0);
    rightWing.rotation.z = -Math.PI / 4;
    petGroup.add(rightWing);

    // Хвост
    const tailGeometry = new THREE.CylinderGeometry(0.08, 0.02, 0.5);
    const tail = new THREE.Mesh(tailGeometry, bodyMaterial);
    tail.position.set(0, 0.7, -0.4);
    tail.rotation.x = Math.PI / 3;
    petGroup.add(tail);

    petGroup.position.set(0, 0, 3);
    petGroup.userData.attackType = 'fire'; // Дыхание огнём
    petGroup.userData.damage = 5;
    petGroup.userData.attackRange = 10;
    petGroup.userData.speed = 0.07;
    petGroup.userData.wings = [leftWing, rightWing];

    scene.add(petGroup);
    return petGroup;
}

function createRobotPet() {
    const petGroup = new THREE.Group();
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0xc0c0c0, metalness: 0.8 });

    // Роботизированное тело
    const bodyGeometry = new THREE.BoxGeometry(0.4, 0.3, 0.5);
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.3;
    petGroup.add(body);

    // Голова с антеннами
    const headGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
    const head = new THREE.Mesh(headGeometry, bodyMaterial);
    head.position.set(0, 0.5, 0.3);
    petGroup.add(head);

    // Антенны
    const antennaGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.2);
    const antenna = new THREE.Mesh(antennaGeometry, bodyMaterial);
    antenna.position.set(0, 0.75, 0.3);
    petGroup.add(antenna);

    // Светящиеся глаза
    const eyeGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const eyeMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00, emissive: 0x00ff00, emissiveIntensity: 1 });
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.08, 0.52, 0.45);
    petGroup.add(leftEye);
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.08, 0.52, 0.45);
    petGroup.add(rightEye);

    // Лазерная пушка
    const gunGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.3);
    const gunMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000, emissive: 0xff0000, emissiveIntensity: 0.5 });
    const gun = new THREE.Mesh(gunGeometry, gunMaterial);
    gun.rotation.z = Math.PI / 2;
    gun.position.set(0.3, 0.4, 0.3);
    petGroup.add(gun);

    petGroup.position.set(0, 0, -2);
    petGroup.userData.attackType = 'laser'; // Лазерная атака
    petGroup.userData.damage = 4;
    petGroup.userData.attackRange = 20;
    petGroup.userData.speed = 0.06;
    petGroup.userData.gun = gun;

    scene.add(petGroup);
    return petGroup;
}

// Упрощенные версии остальных питомцев
function createEaglePet() {
    const petGroup = createDogPet(); // Используем базу собаки
    petGroup.children.forEach(child => {
        child.material = new THREE.MeshPhongMaterial({ color: 0x8b7355 });
    });
    petGroup.position.set(0, 2, 2); // Летает выше
    petGroup.userData.attackType = 'ranged';
    petGroup.userData.damage = 3;
    petGroup.userData.attackRange = 12;
    petGroup.userData.speed = 0.09;
    petGroup.userData.canFly = true;
    return petGroup;
}

function createPandaPet() {
    const petGroup = createBearPet(); // Используем базу медведя
    petGroup.children.forEach(child => {
        child.material = new THREE.MeshPhongMaterial({ color: 0xffffff });
    });
    petGroup.position.set(1, 0, -2);
    petGroup.userData.attackType = 'heal'; // Лечение
    petGroup.userData.damage = 0;
    petGroup.userData.healAmount = 1;
    petGroup.userData.attackRange = 5;
    petGroup.userData.speed = 0.04;
    return petGroup;
}

function createFoxPet() {
    const petGroup = createDogPet(); // Используем базу собаки
    petGroup.children.forEach(child => {
        child.material = new THREE.MeshPhongMaterial({ color: 0xff6600 });
    });
    petGroup.position.set(-1, 0, -2);
    petGroup.userData.attackType = 'melee';
    petGroup.userData.damage = 3;
    petGroup.userData.attackRange = 2;
    petGroup.userData.speed = 0.12; // Очень быстрая
    return petGroup;
}

function createUnicornPet() {
    const petGroup = createBearPet(); // Используем базу медведя
    petGroup.children.forEach(child => {
        child.material = new THREE.MeshPhongMaterial({ color: 0xffc0cb });
    });
    // Добавляем рог
    const hornGeometry = new THREE.ConeGeometry(0.1, 0.4, 8);
    const hornMaterial = new THREE.MeshPhongMaterial({ color: 0xffd700, emissive: 0xffd700, emissiveIntensity: 0.8 });
    const horn = new THREE.Mesh(hornGeometry, hornMaterial);
    horn.position.set(0, 1.3, 0.5);
    petGroup.add(horn);

    petGroup.position.set(1, 0, 3);
    petGroup.userData.attackType = 'magic'; // Магическая атака
    petGroup.userData.damage = 5;
    petGroup.userData.attackRange = 12;
    petGroup.userData.speed = 0.07;
    return petGroup;
}

function createTigerPet() {
    const petGroup = createWolfPet(); // Используем базу волка
    petGroup.children.forEach(child => {
        child.material = new THREE.MeshPhongMaterial({ color: 0xff8c00 });
    });
    petGroup.position.set(-1, 0, 3);
    petGroup.userData.attackType = 'melee';
    petGroup.userData.damage = 5;
    petGroup.userData.attackRange = 2.5;
    petGroup.userData.speed = 0.09;
    return petGroup;
}

function createLionPet() {
    const petGroup = createBearPet(); // Используем базу медведя
    petGroup.children.forEach(child => {
        child.material = new THREE.MeshPhongMaterial({ color: 0xdaa520 });
    });
    // Добавляем гриву
    const maneGeometry = new THREE.SphereGeometry(0.35, 8, 8);
    const maneMaterial = new THREE.MeshPhongMaterial({ color: 0x8b4513 });
    const mane = new THREE.Mesh(maneGeometry, maneMaterial);
    mane.position.set(0, 0.9, 0.4);
    petGroup.add(mane);

    petGroup.position.set(-1, 0, -3);
    petGroup.userData.attackType = 'melee';
    petGroup.userData.damage = 7;
    petGroup.userData.attackRange = 2.5;
    petGroup.userData.speed = 0.08;
    petGroup.userData.hp = 25;
    petGroup.userData.maxHp = 25;
    return petGroup;
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
