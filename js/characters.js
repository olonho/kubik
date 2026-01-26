/**
 * Создание 3D моделей персонажей/скинов
 * Зависимости: THREE.js
 */

console.log('✅ characters.js загружен');

// Создание рук для FPS вида (как в CS:GO)
function createFPSHands() {
    console.log('createFPSHands() вызвана');
    const handsGroup = new THREE.Group();

    // Материал для кожи
    const skinMaterial = new THREE.MeshStandardMaterial({
        color: 0xFFDBB0, // Нормальный цвет кожи
        roughness: 0.9,
        metalness: 0.0
    });

    // Левая рука УДАЛЕНА - ничего не мешает обзору!

    // Правая рука (держит оружие) - сдвинута дальше вправо и ниже
    const rightArmGeometry = new THREE.BoxGeometry(0.11, 0.4, 0.11);
    const rightArm = new THREE.Mesh(rightArmGeometry, skinMaterial);
    rightArm.position.set(0.45, -0.35, -0.5); // Дальше вправо, ниже
    rightArm.rotation.x = Math.PI / 5;
    rightArm.rotation.z = Math.PI / 10;
    rightArm.castShadow = true;
    handsGroup.add(rightArm);

    // Правая кисть - также сдвинута
    const rightHandGeometry = new THREE.BoxGeometry(0.13, 0.07, 0.16);
    const rightHand = new THREE.Mesh(rightHandGeometry, skinMaterial);
    rightHand.position.set(0.5, -0.55, -0.65); // Дальше вправо и ниже
    rightHand.rotation.x = Math.PI / 3;
    rightHand.rotation.z = Math.PI / 10;
    rightHand.castShadow = true;
    handsGroup.add(rightHand);

    // Пальцы правой руки (меньше и ближе к краю)
    for (let i = 0; i < 4; i++) {
        const fingerGeometry = new THREE.BoxGeometry(0.025, 0.045, 0.045);
        const finger = new THREE.Mesh(fingerGeometry, skinMaterial);
        finger.position.set(0.45 + i * 0.032, -0.6, -0.72);
        finger.rotation.x = Math.PI / 3;
        handsGroup.add(finger);
    }

    // Большой палец правой руки
    const thumbGeometry = new THREE.BoxGeometry(0.035, 0.045, 0.055);
    const thumb = new THREE.Mesh(thumbGeometry, skinMaterial);
    thumb.position.set(0.57, -0.53, -0.68);
    thumb.rotation.x = Math.PI / 4;
    thumb.rotation.z = Math.PI / 3;
    handsGroup.add(thumb);

    // Рукав правой руки (темно-серый)
    const sleeveGeometry = new THREE.BoxGeometry(0.13, 0.14, 0.13);
    const sleeveMaterial = new THREE.MeshStandardMaterial({
        color: 0x2F4F4F,
        roughness: 0.8
    });

    const rightSleeve = new THREE.Mesh(sleeveGeometry, sleeveMaterial);
    rightSleeve.position.set(0.45, -0.15, -0.5); // Соответствует новой позиции правой руки
    rightSleeve.rotation.x = Math.PI / 5;
    rightSleeve.rotation.z = Math.PI / 10;
    handsGroup.add(rightSleeve);

    console.log('FPS рука создана. Всего элементов:', handsGroup.children.length);

    // Нормальный размер (без дополнительного масштабирования)
    handsGroup.scale.set(1, 1, 1);
    // Позиция настроена индивидуально для каждого элемента руки

    return handsGroup;
}

function createHouse() {
    const houseGroup = new THREE.Group();

    // Основание дома
    const wallGeometry = new THREE.BoxGeometry(2.5, 2, 2);
    const wallMaterial = new THREE.MeshPhongMaterial({ color: 0xD2691E });
    const walls = new THREE.Mesh(wallGeometry, wallMaterial);
    walls.position.y = 1;
    walls.castShadow = true;
    walls.receiveShadow = true;
    houseGroup.add(walls);

    // Крыша
    const roofGeometry = new THREE.ConeGeometry(1.8, 1.2, 4);
    const roofMaterial = new THREE.MeshPhongMaterial({ color: 0x8B0000 });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = 2.6;
    roof.rotation.y = Math.PI / 4;
    roof.castShadow = true;
    houseGroup.add(roof);

    // Дверь
    const doorGeometry = new THREE.BoxGeometry(0.6, 1.2, 0.1);
    const doorMaterial = new THREE.MeshPhongMaterial({ color: 0x654321 });
    const door = new THREE.Mesh(doorGeometry, doorMaterial);
    door.position.set(0, 0.6, 1.05);
    door.castShadow = true;
    houseGroup.add(door);

    // Окна
    const windowGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.1);
    const windowMaterial = new THREE.MeshPhongMaterial({
        color: 0x87CEEB,
        emissive: 0x4682B4,
        emissiveIntensity: 0.3
    });

    const window1 = new THREE.Mesh(windowGeometry, windowMaterial);
    window1.position.set(-0.8, 1.2, 1.05);
    houseGroup.add(window1);

    const window2 = new THREE.Mesh(windowGeometry, windowMaterial);
    window2.position.set(0.8, 1.2, 1.05);
    houseGroup.add(window2);

    // Труба
    const chimneyGeometry = new THREE.BoxGeometry(0.3, 0.8, 0.3);
    const chimneyMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    const chimney = new THREE.Mesh(chimneyGeometry, chimneyMaterial);
    chimney.position.set(0.8, 2.8, 0.5);
    chimney.castShadow = true;
    houseGroup.add(chimney);

    return houseGroup;
}

function createHouseCat() {
    const catGroup = new THREE.Group();

    // Тело кошки
    const bodyGeometry = new THREE.BoxGeometry(0.5, 0.3, 0.7);
    const catMaterial = new THREE.MeshPhongMaterial({ color: 0xFF8C00 });
    const body = new THREE.Mesh(bodyGeometry, catMaterial);
    body.position.y = 0.25;
    body.castShadow = true;
    catGroup.add(body);

    // Голова
    const headGeometry = new THREE.SphereGeometry(0.18, 16, 16);
    const head = new THREE.Mesh(headGeometry, catMaterial);
    head.position.set(0, 0.35, 0.4);
    head.castShadow = true;
    catGroup.add(head);

    // Уши
    const earGeometry = new THREE.ConeGeometry(0.08, 0.15, 4);
    const ear1 = new THREE.Mesh(earGeometry, catMaterial);
    ear1.position.set(-0.1, 0.5, 0.4);
    ear1.rotation.z = -0.3;
    catGroup.add(ear1);

    const ear2 = new THREE.Mesh(earGeometry, catMaterial);
    ear2.position.set(0.1, 0.5, 0.4);
    ear2.rotation.z = 0.3;
    catGroup.add(ear2);

    // Хвост
    const tailGeometry = new THREE.CylinderGeometry(0.05, 0.03, 0.6, 8);
    const tail = new THREE.Mesh(tailGeometry, catMaterial);
    tail.position.set(0, 0.4, -0.3);
    tail.rotation.x = Math.PI / 3;
    tail.castShadow = true;
    catGroup.add(tail);

    // Лапы
    const legGeometry = new THREE.CylinderGeometry(0.04, 0.04, 0.25, 8);
    const positions = [
        [-0.15, 0.12, 0.2],
        [0.15, 0.12, 0.2],
        [-0.15, 0.12, -0.2],
        [0.15, 0.12, -0.2]
    ];

    positions.forEach(pos => {
        const leg = new THREE.Mesh(legGeometry, catMaterial);
        leg.position.set(...pos);
        leg.castShadow = true;
        catGroup.add(leg);
    });

    // Глаза
    const eyeGeometry = new THREE.SphereGeometry(0.04, 8, 8);
    const eyeMaterial = new THREE.MeshPhongMaterial({
        color: 0x00FF00,
        emissive: 0x00FF00,
        emissiveIntensity: 0.5
    });

    const eye1 = new THREE.Mesh(eyeGeometry, eyeMaterial);
    eye1.position.set(-0.08, 0.38, 0.52);
    catGroup.add(eye1);

    const eye2 = new THREE.Mesh(eyeGeometry, eyeMaterial);
    eye2.position.set(0.08, 0.38, 0.52);
    catGroup.add(eye2);

    return catGroup;
}

function createDog() {
    const dogGroup = new THREE.Group();

    // Тело
    const bodyGeometry = new THREE.BoxGeometry(0.8, 0.5, 0.5);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0xD2691E });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.set(0, 0.3, 0);
    body.castShadow = true;
    dogGroup.add(body);

    // Голова
    const headGeometry = new THREE.BoxGeometry(0.4, 0.4, 0.35);
    const headMaterial = new THREE.MeshPhongMaterial({ color: 0xD2691E });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.set(0.5, 0.4, 0);
    head.castShadow = true;
    dogGroup.add(head);

    // Морда
    const snoutGeometry = new THREE.BoxGeometry(0.25, 0.2, 0.25);
    const snoutMaterial = new THREE.MeshPhongMaterial({ color: 0xCD853F });
    const snout = new THREE.Mesh(snoutGeometry, snoutMaterial);
    snout.position.set(0.72, 0.35, 0);
    snout.castShadow = true;
    dogGroup.add(snout);

    // Нос
    const noseGeometry = new THREE.SphereGeometry(0.08, 8, 8);
    const noseMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
    const nose = new THREE.Mesh(noseGeometry, noseMaterial);
    nose.position.set(0.84, 0.35, 0);
    nose.castShadow = true;
    dogGroup.add(nose);

    // Глаза
    const eyeGeometry = new THREE.SphereGeometry(0.06, 8, 8);
    const eyeMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });

    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(0.6, 0.5, -0.12);
    dogGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.6, 0.5, 0.12);
    dogGroup.add(rightEye);

    // Уши
    const earGeometry = new THREE.BoxGeometry(0.15, 0.3, 0.1);
    const earMaterial = new THREE.MeshPhongMaterial({ color: 0xA0522D });

    const leftEar = new THREE.Mesh(earGeometry, earMaterial);
    leftEar.position.set(0.5, 0.65, -0.2);
    leftEar.rotation.z = 0.2;
    leftEar.castShadow = true;
    dogGroup.add(leftEar);

    const rightEar = new THREE.Mesh(earGeometry, earMaterial);
    rightEar.position.set(0.5, 0.65, 0.2);
    rightEar.rotation.z = -0.2;
    rightEar.castShadow = true;
    dogGroup.add(rightEar);

    // Лапы
    const legGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.35, 8);
    const legMaterial = new THREE.MeshPhongMaterial({ color: 0xD2691E });

    const frontLeftLeg = new THREE.Mesh(legGeometry, legMaterial);
    frontLeftLeg.position.set(0.3, 0.05, -0.2);
    frontLeftLeg.castShadow = true;
    dogGroup.add(frontLeftLeg);

    const frontRightLeg = new THREE.Mesh(legGeometry, legMaterial);
    frontRightLeg.position.set(0.3, 0.05, 0.2);
    frontRightLeg.castShadow = true;
    dogGroup.add(frontRightLeg);

    const backLeftLeg = new THREE.Mesh(legGeometry, legMaterial);
    backLeftLeg.position.set(-0.3, 0.05, -0.2);
    backLeftLeg.castShadow = true;
    dogGroup.add(backLeftLeg);

    const backRightLeg = new THREE.Mesh(legGeometry, legMaterial);
    backRightLeg.position.set(-0.3, 0.05, 0.2);
    backRightLeg.castShadow = true;
    dogGroup.add(backRightLeg);

    // Хвост
    const tailGeometry = new THREE.CylinderGeometry(0.05, 0.08, 0.4, 8);
    const tailMaterial = new THREE.MeshPhongMaterial({ color: 0xA0522D });
    const tail = new THREE.Mesh(tailGeometry, tailMaterial);
    tail.position.set(-0.5, 0.4, 0);
    tail.rotation.z = Math.PI / 4;
    tail.castShadow = true;
    dogGroup.add(tail);

    return dogGroup;
}

function createCat() {
    const catGroup = new THREE.Group();

    // Тело
    const bodyGeometry = new THREE.BoxGeometry(0.7, 0.4, 0.5);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0xFFA500 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.set(0, 0.3, 0);
    body.castShadow = true;
    catGroup.add(body);

    // Голова
    const headGeometry = new THREE.SphereGeometry(0.25, 16, 16);
    const headMaterial = new THREE.MeshPhongMaterial({ color: 0xFFA500 });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.set(0.45, 0.45, 0);
    head.castShadow = true;
    catGroup.add(head);

    // Мордочка
    const snoutGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const snoutMaterial = new THREE.MeshPhongMaterial({ color: 0xFFE4B5 });
    const snout = new THREE.Mesh(snoutGeometry, snoutMaterial);
    snout.position.set(0.65, 0.4, 0);
    snout.scale.set(0.8, 0.8, 0.6);
    snout.castShadow = true;
    catGroup.add(snout);

    // Нос
    const noseGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const noseMaterial = new THREE.MeshPhongMaterial({ color: 0xFF69B4 });
    const nose = new THREE.Mesh(noseGeometry, noseMaterial);
    nose.position.set(0.72, 0.4, 0);
    catGroup.add(nose);

    // Глаза
    const eyeGeometry = new THREE.SphereGeometry(0.07, 8, 8);
    const eyeMaterial = new THREE.MeshPhongMaterial({ color: 0x90EE90 });

    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(0.58, 0.5, -0.12);
    catGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.58, 0.5, 0.12);
    catGroup.add(rightEye);

    // Зрачки
    const pupilGeometry = new THREE.SphereGeometry(0.03, 8, 8);
    const pupilMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });

    const leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    leftPupil.position.set(0.64, 0.5, -0.12);
    catGroup.add(leftPupil);

    const rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    rightPupil.position.set(0.64, 0.5, 0.12);
    catGroup.add(rightPupil);

    // Уши треугольные
    const earGeometry = new THREE.ConeGeometry(0.12, 0.25, 4);
    const earMaterial = new THREE.MeshPhongMaterial({ color: 0xFFA500 });

    const leftEar = new THREE.Mesh(earGeometry, earMaterial);
    leftEar.position.set(0.45, 0.65, -0.15);
    leftEar.rotation.z = Math.PI;
    leftEar.castShadow = true;
    catGroup.add(leftEar);

    const rightEar = new THREE.Mesh(earGeometry, earMaterial);
    rightEar.position.set(0.45, 0.65, 0.15);
    rightEar.rotation.z = Math.PI;
    rightEar.castShadow = true;
    catGroup.add(rightEar);

    // Лапы
    const legGeometry = new THREE.CylinderGeometry(0.07, 0.07, 0.35, 8);
    const legMaterial = new THREE.MeshPhongMaterial({ color: 0xFFA500 });

    const frontLeftLeg = new THREE.Mesh(legGeometry, legMaterial);
    frontLeftLeg.position.set(0.25, 0.05, -0.18);
    frontLeftLeg.castShadow = true;
    catGroup.add(frontLeftLeg);

    const frontRightLeg = new THREE.Mesh(legGeometry, legMaterial);
    frontRightLeg.position.set(0.25, 0.05, 0.18);
    frontRightLeg.castShadow = true;
    catGroup.add(frontRightLeg);

    const backLeftLeg = new THREE.Mesh(legGeometry, legMaterial);
    backLeftLeg.position.set(-0.25, 0.05, -0.18);
    backLeftLeg.castShadow = true;
    catGroup.add(backLeftLeg);

    const backRightLeg = new THREE.Mesh(legGeometry, legMaterial);
    backRightLeg.position.set(-0.25, 0.05, 0.18);
    backRightLeg.castShadow = true;
    catGroup.add(backRightLeg);

    // Хвост (выше и изогнутый)
    const tailGeometry = new THREE.CylinderGeometry(0.04, 0.06, 0.5, 8);
    const tailMaterial = new THREE.MeshPhongMaterial({ color: 0xFFA500 });
    const tail = new THREE.Mesh(tailGeometry, tailMaterial);
    tail.position.set(-0.5, 0.5, 0);
    tail.rotation.z = Math.PI / 3;
    tail.castShadow = true;
    catGroup.add(tail);

    return catGroup;
}

function createCube() {
    const cubeGroup = new THREE.Group();

    // Просто кубик
    const geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
    const material = new THREE.MeshPhongMaterial({ color: 0x4169E1 });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.y = 0.3;
    cube.castShadow = true;
    cubeGroup.add(cube);

    // Глаза
    const eyeGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const eyeMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });

    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(0.42, 0.4, -0.15);
    cubeGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.42, 0.4, 0.15);
    cubeGroup.add(rightEye);

    // Зрачки
    const pupilGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const pupilMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });

    const leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    leftPupil.position.set(0.48, 0.4, -0.15);
    cubeGroup.add(leftPupil);

    const rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    rightPupil.position.set(0.48, 0.4, 0.15);
    cubeGroup.add(rightPupil);

    // Улыбка
    const smileGeometry = new THREE.TorusGeometry(0.15, 0.02, 8, 16, Math.PI);
    const smileMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
    const smile = new THREE.Mesh(smileGeometry, smileMaterial);
    smile.position.set(0.42, 0.2, 0);
    smile.rotation.set(0, Math.PI / 2, 0);
    cubeGroup.add(smile);

    return cubeGroup;
}

function createOval() {
    const ovalGroup = new THREE.Group();

    // Тело - эллипсоид
    const bodyGeometry = new THREE.SphereGeometry(0.4, 16, 16);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.3;
    body.scale.set(1.2, 1, 0.8);
    body.castShadow = true;
    ovalGroup.add(body);

    // Глаза
    const eyeGeometry = new THREE.SphereGeometry(0.08, 8, 8);
    const eyeMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });

    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(0.4, 0.4, -0.12);
    ovalGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.4, 0.4, 0.12);
    ovalGroup.add(rightEye);

    // Румянец
    const blushGeometry = new THREE.CircleGeometry(0.08, 16);
    const blushMaterial = new THREE.MeshPhongMaterial({
        color: 0xFFB6C1,
        transparent: true,
        opacity: 0.6
    });

    const leftBlush = new THREE.Mesh(blushGeometry, blushMaterial);
    leftBlush.position.set(0.38, 0.3, -0.18);
    leftBlush.rotation.y = -Math.PI / 2;
    ovalGroup.add(leftBlush);

    const rightBlush = new THREE.Mesh(blushGeometry, blushMaterial);
    rightBlush.position.set(0.38, 0.3, 0.18);
    rightBlush.rotation.y = -Math.PI / 2;
    ovalGroup.add(rightBlush);

    // Улыбка
    const smileGeometry = new THREE.TorusGeometry(0.12, 0.02, 8, 16, Math.PI);
    const smileMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
    const smile = new THREE.Mesh(smileGeometry, smileMaterial);
    smile.position.set(0.38, 0.22, 0);
    smile.rotation.set(0, Math.PI / 2, 0);
    ovalGroup.add(smile);

    // Маленькие ручки
    const armGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const armMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });

    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(0, 0.3, -0.35);
    leftArm.scale.set(0.6, 1, 0.6);
    leftArm.castShadow = true;
    ovalGroup.add(leftArm);

    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(0, 0.3, 0.35);
    rightArm.scale.set(0.6, 1, 0.6);
    rightArm.castShadow = true;
    ovalGroup.add(rightArm);

    return ovalGroup;
}

function createFox() {
    const foxGroup = new THREE.Group();

    // Тело
    const bodyGeometry = new THREE.BoxGeometry(0.7, 0.4, 0.5);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0xFF8C00 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.set(0, 0.3, 0);
    body.castShadow = true;
    foxGroup.add(body);

    // Голова
    const headGeometry = new THREE.BoxGeometry(0.4, 0.35, 0.35);
    const headMaterial = new THREE.MeshPhongMaterial({ color: 0xFF8C00 });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.set(0.5, 0.45, 0);
    head.castShadow = true;
    foxGroup.add(head);

    // Морда белая
    const snoutGeometry = new THREE.BoxGeometry(0.2, 0.25, 0.3);
    const snoutMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
    const snout = new THREE.Mesh(snoutGeometry, snoutMaterial);
    snout.position.set(0.68, 0.4, 0);
    snout.castShadow = true;
    foxGroup.add(snout);

    // Нос черный
    const noseGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const noseMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
    const nose = new THREE.Mesh(noseGeometry, noseMaterial);
    nose.position.set(0.78, 0.42, 0);
    foxGroup.add(nose);

    // Глаза
    const eyeGeometry = new THREE.SphereGeometry(0.06, 8, 8);
    const eyeMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(0.6, 0.52, -0.12);
    foxGroup.add(leftEye);
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.6, 0.52, 0.12);
    foxGroup.add(rightEye);

    // Уши треугольные большие
    const earGeometry = new THREE.ConeGeometry(0.15, 0.3, 4);
    const earMaterial = new THREE.MeshPhongMaterial({ color: 0xFF8C00 });
    const leftEar = new THREE.Mesh(earGeometry, earMaterial);
    leftEar.position.set(0.5, 0.7, -0.15);
    leftEar.rotation.z = Math.PI;
    leftEar.castShadow = true;
    foxGroup.add(leftEar);
    const rightEar = new THREE.Mesh(earGeometry, earMaterial);
    rightEar.position.set(0.5, 0.7, 0.15);
    rightEar.rotation.z = Math.PI;
    rightEar.castShadow = true;
    foxGroup.add(rightEar);

    // Лапы
    const legGeometry = new THREE.CylinderGeometry(0.07, 0.07, 0.35, 8);
    const legMaterial = new THREE.MeshPhongMaterial({ color: 0xFF8C00 });
    for (let x of [0.25, -0.25]) {
        for (let z of [-0.18, 0.18]) {
            const leg = new THREE.Mesh(legGeometry, legMaterial);
            leg.position.set(x, 0.05, z);
            leg.castShadow = true;
            foxGroup.add(leg);
        }
    }

    // Хвост пушистый
    const tailGeometry = new THREE.CylinderGeometry(0.06, 0.12, 0.6, 8);
    const tailMaterial = new THREE.MeshPhongMaterial({ color: 0xFF8C00 });
    const tail = new THREE.Mesh(tailGeometry, tailMaterial);
    tail.position.set(-0.6, 0.5, 0);
    tail.rotation.z = Math.PI / 2.5;
    tail.castShadow = true;
    foxGroup.add(tail);

    return foxGroup;
}

function createPanda() {
    const pandaGroup = new THREE.Group();

    // Тело
    const bodyGeometry = new THREE.SphereGeometry(0.4, 16, 16);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.set(0, 0.35, 0);
    body.scale.set(1, 0.9, 0.8);
    body.castShadow = true;
    pandaGroup.add(body);

    // Голова
    const headGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const headMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.set(0.3, 0.5, 0);
    head.castShadow = true;
    pandaGroup.add(head);

    // Черные пятна вокруг глаз
    const patchGeometry = new THREE.SphereGeometry(0.12, 16, 16);
    const patchMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
    const leftPatch = new THREE.Mesh(patchGeometry, patchMaterial);
    leftPatch.position.set(0.42, 0.52, -0.15);
    leftPatch.scale.set(0.9, 1.2, 0.5);
    pandaGroup.add(leftPatch);
    const rightPatch = new THREE.Mesh(patchGeometry, patchMaterial);
    rightPatch.position.set(0.42, 0.52, 0.15);
    rightPatch.scale.set(0.9, 1.2, 0.5);
    pandaGroup.add(rightPatch);

    // Глаза белые
    const eyeGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const eyeMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(0.48, 0.52, -0.15);
    pandaGroup.add(leftEye);
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.48, 0.52, 0.15);
    pandaGroup.add(rightEye);

    // Зрачки
    const pupilGeometry = new THREE.SphereGeometry(0.03, 8, 8);
    const pupilMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
    const leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    leftPupil.position.set(0.52, 0.52, -0.15);
    pandaGroup.add(leftPupil);
    const rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    rightPupil.position.set(0.52, 0.52, 0.15);
    pandaGroup.add(rightPupil);

    // Нос черный
    const noseGeometry = new THREE.SphereGeometry(0.06, 8, 8);
    const noseMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
    const nose = new THREE.Mesh(noseGeometry, noseMaterial);
    nose.position.set(0.55, 0.42, 0);
    pandaGroup.add(nose);

    // Уши черные круглые
    const earGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const earMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
    const leftEar = new THREE.Mesh(earGeometry, earMaterial);
    leftEar.position.set(0.3, 0.7, -0.2);
    leftEar.castShadow = true;
    pandaGroup.add(leftEar);
    const rightEar = new THREE.Mesh(earGeometry, earMaterial);
    rightEar.position.set(0.3, 0.7, 0.2);
    rightEar.castShadow = true;
    pandaGroup.add(rightEar);

    // Лапы черные
    const legGeometry = new THREE.CylinderGeometry(0.09, 0.09, 0.35, 8);
    const legMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
    for (let x of [0.2, -0.2]) {
        for (let z of [-0.25, 0.25]) {
            const leg = new THREE.Mesh(legGeometry, legMaterial);
            leg.position.set(x, 0.05, z);
            leg.castShadow = true;
            pandaGroup.add(leg);
        }
    }

    return pandaGroup;
}

function createRabbit() {
    const rabbitGroup = new THREE.Group();

    // Тело
    const bodyGeometry = new THREE.SphereGeometry(0.35, 16, 16);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0xF5F5DC });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.set(0, 0.3, 0);
    body.scale.set(1, 1.1, 0.9);
    body.castShadow = true;
    rabbitGroup.add(body);

    // Голова
    const headGeometry = new THREE.SphereGeometry(0.25, 16, 16);
    const headMaterial = new THREE.MeshPhongMaterial({ color: 0xF5F5DC });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.set(0.35, 0.5, 0);
    head.castShadow = true;
    rabbitGroup.add(head);

    // Морда
    const snoutGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const snoutMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
    const snout = new THREE.Mesh(snoutGeometry, snoutMaterial);
    snout.position.set(0.55, 0.45, 0);
    snout.scale.set(0.8, 0.7, 0.6);
    rabbitGroup.add(snout);

    // Нос розовый
    const noseGeometry = new THREE.SphereGeometry(0.04, 8, 8);
    const noseMaterial = new THREE.MeshPhongMaterial({ color: 0xFFB6C1 });
    const nose = new THREE.Mesh(noseGeometry, noseMaterial);
    nose.position.set(0.63, 0.46, 0);
    rabbitGroup.add(nose);

    // Глаза
    const eyeGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const eyeMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(0.5, 0.55, -0.12);
    rabbitGroup.add(leftEye);
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.5, 0.55, 0.12);
    rabbitGroup.add(rightEye);

    // Длинные уши
    const earGeometry = new THREE.BoxGeometry(0.1, 0.5, 0.08);
    const earMaterial = new THREE.MeshPhongMaterial({ color: 0xF5F5DC });
    const leftEar = new THREE.Mesh(earGeometry, earMaterial);
    leftEar.position.set(0.35, 0.9, -0.12);
    leftEar.rotation.z = 0.1;
    leftEar.castShadow = true;
    rabbitGroup.add(leftEar);
    const rightEar = new THREE.Mesh(earGeometry, earMaterial);
    rightEar.position.set(0.35, 0.9, 0.12);
    rightEar.rotation.z = -0.1;
    rightEar.castShadow = true;
    rabbitGroup.add(rightEar);

    // Лапы
    const legGeometry = new THREE.CylinderGeometry(0.06, 0.08, 0.25, 8);
    const legMaterial = new THREE.MeshPhongMaterial({ color: 0xF5F5DC });
    for (let x of [0.15, -0.15]) {
        for (let z of [-0.2, 0.2]) {
            const leg = new THREE.Mesh(legGeometry, legMaterial);
            leg.position.set(x, 0.05, z);
            leg.castShadow = true;
            rabbitGroup.add(leg);
        }
    }

    // Хвост пушистый
    const tailGeometry = new THREE.SphereGeometry(0.12, 16, 16);
    const tailMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
    const tail = new THREE.Mesh(tailGeometry, tailMaterial);
    tail.position.set(-0.35, 0.3, 0);
    tail.castShadow = true;
    rabbitGroup.add(tail);

    return rabbitGroup;
}

function createRobot() {
    const robotGroup = new THREE.Group();

    // Тело
    const bodyGeometry = new THREE.BoxGeometry(0.6, 0.7, 0.4);
    const bodyMaterial = new THREE.MeshPhongMaterial({
        color: 0x808080,
        metalness: 0.8,
        shininess: 100
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.set(0, 0.4, 0);
    body.castShadow = true;
    robotGroup.add(body);

    // Голова
    const headGeometry = new THREE.BoxGeometry(0.4, 0.4, 0.35);
    const headMaterial = new THREE.MeshPhongMaterial({
        color: 0xA9A9A9,
        metalness: 0.8
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.set(0, 0.85, 0);
    head.castShadow = true;
    robotGroup.add(head);

    // Антенна
    const antennaGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.15, 8);
    const antennaMaterial = new THREE.MeshPhongMaterial({ color: 0x808080 });
    const antenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
    antenna.position.set(0, 1.12, 0);
    robotGroup.add(antenna);

    // Лампочка на антенне
    const bulbGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const bulbMaterial = new THREE.MeshPhongMaterial({
        color: 0xFF0000,
        emissive: 0xFF0000,
        emissiveIntensity: 0.5
    });
    const bulb = new THREE.Mesh(bulbGeometry, bulbMaterial);
    bulb.position.set(0, 1.22, 0);
    robotGroup.add(bulb);

    // Глаза (светящиеся)
    const eyeGeometry = new THREE.BoxGeometry(0.1, 0.08, 0.05);
    const eyeMaterial = new THREE.MeshPhongMaterial({
        color: 0x00FFFF,
        emissive: 0x00FFFF,
        emissiveIntensity: 0.7
    });
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(0.21, 0.88, -0.1);
    robotGroup.add(leftEye);
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.21, 0.88, 0.1);
    robotGroup.add(rightEye);

    // Рот
    const mouthGeometry = new THREE.BoxGeometry(0.2, 0.05, 0.05);
    const mouthMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
    const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial);
    mouth.position.set(0.21, 0.75, 0);
    robotGroup.add(mouth);

    // Руки
    const armGeometry = new THREE.BoxGeometry(0.15, 0.5, 0.15);
    const armMaterial = new THREE.MeshPhongMaterial({ color: 0x808080 });
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(0, 0.35, -0.35);
    leftArm.castShadow = true;
    robotGroup.add(leftArm);
    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(0, 0.35, 0.35);
    rightArm.castShadow = true;
    robotGroup.add(rightArm);

    // Ноги
    const legGeometry = new THREE.BoxGeometry(0.18, 0.35, 0.18);
    const legMaterial = new THREE.MeshPhongMaterial({ color: 0x696969 });
    const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    leftLeg.position.set(0, 0.075, -0.15);
    leftLeg.castShadow = true;
    robotGroup.add(leftLeg);
    const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
    rightLeg.position.set(0, 0.075, 0.15);
    rightLeg.castShadow = true;
    robotGroup.add(rightLeg);

    return robotGroup;
}
