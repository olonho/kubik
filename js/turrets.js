/**
 * Создание 3D моделей всех турелей (29 типов)
 * Зависимости: THREE.js, глобальные массивы scene, turrets
 */

// Вспомогательная функция для получения следующей позиции турели
function getNextTurretPosition() {
    // Размещаем турели по кругу вокруг игрока
    const radius = 4; // Радиус круга
    const angle = (turrets.length * Math.PI * 2) / 8; // Распределяем по кругу
    const x = player.position.x + Math.cos(angle) * radius;
    const z = player.position.z + Math.sin(angle) * radius;
    return { x: x, y: 0, z: z };
}

function createTurret(position) {
    // Если позиция не указана, вычисляем автоматически
    if (!position) {
        position = getNextTurretPosition();
    }
    const turretGroup = new THREE.Group();

    // База турели
    const baseGeometry = new THREE.CylinderGeometry(0.6, 0.8, 0.3, 8);
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x555555 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = 0.15;
    base.castShadow = true;
    turretGroup.add(base);

    // Корпус турели
    const bodyGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.6, 8);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.6;
    body.castShadow = true;
    turretGroup.add(body);

    // Голова турели (вращающаяся часть)
    const headGeometry = new THREE.BoxGeometry(0.5, 0.4, 0.5);
    const headMaterial = new THREE.MeshPhongMaterial({ color: 0x444444 });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.1;
    head.castShadow = true;
    turretGroup.add(head);

    // Ствол
    const barrelGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.8, 8);
    const barrelMaterial = new THREE.MeshPhongMaterial({ color: 0x222222 });
    const barrel = new THREE.Mesh(barrelGeometry, barrelMaterial);
    barrel.rotation.z = Math.PI / 2;
    barrel.position.set(0.4, 1.1, 0);
    barrel.castShadow = true;
    turretGroup.add(barrel);

    // Красный огонёк
    const lightGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const lightMaterial = new THREE.MeshPhongMaterial({
        color: 0xff0000,
        emissive: 0xff0000,
        emissiveIntensity: 0.8
    });
    const light = new THREE.Mesh(lightGeometry, lightMaterial);
    light.position.set(0, 1.3, 0.25);
    turretGroup.add(light);

    // Устанавливаем турель в указанную позицию
    turretGroup.position.set(position.x, position.y, position.z);

    // Данные турели
    turretGroup.userData.head = head;
    turretGroup.userData.barrel = barrel;
    turretGroup.userData.shootCooldown = 0;
    turretGroup.userData.targetRotation = 0;
    turretGroup.userData.type = 'basic';

    scene.add(turretGroup);
    turrets.push(turretGroup);
}

function createFireTurret(position) {
    if (!position) position = getNextTurretPosition();
    const turretGroup = new THREE.Group();
    const baseGeometry = new THREE.CylinderGeometry(0.6, 0.8, 0.3, 8);
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x8B0000 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = 0.15;
    base.castShadow = true;
    turretGroup.add(base);
    const bodyGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.6, 8);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0xFF4500 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.6;
    body.castShadow = true;
    turretGroup.add(body);
    const headGeometry = new THREE.BoxGeometry(0.5, 0.4, 0.5);
    const headMaterial = new THREE.MeshPhongMaterial({ color: 0xFF6347, emissive: 0xFF4500, emissiveIntensity: 0.3 });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.1;
    head.castShadow = true;
    turretGroup.add(head);
    const barrelGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.8, 8);
    const barrelMaterial = new THREE.MeshPhongMaterial({ color: 0xFF8C00, emissive: 0xFF6600, emissiveIntensity: 0.4 });
    const barrel = new THREE.Mesh(barrelGeometry, barrelMaterial);
    barrel.rotation.z = Math.PI / 2;
    barrel.position.set(0.4, 1.1, 0);
    barrel.castShadow = true;
    turretGroup.add(barrel);
    const lightGeometry = new THREE.SphereGeometry(0.12, 8, 8);
    const lightMaterial = new THREE.MeshPhongMaterial({ color: 0xFF4500, emissive: 0xFF4500, emissiveIntensity: 1.0 });
    const light = new THREE.Mesh(lightGeometry, lightMaterial);
    light.position.set(0, 1.3, 0.25);
    turretGroup.add(light);
    turretGroup.position.set(position.x, position.y, position.z);
    turretGroup.userData.head = head;
    turretGroup.userData.barrel = barrel;
    turretGroup.userData.shootCooldown = 0;
    turretGroup.userData.type = 'fire';
    scene.add(turretGroup);
    turrets.push(turretGroup);
}

function createLaserTurret(position) {
    if (!position) position = getNextTurretPosition();
    const turretGroup = new THREE.Group();
    const baseGeometry = new THREE.CylinderGeometry(0.6, 0.8, 0.3, 8);
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x003366 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = 0.15;
    base.castShadow = true;
    turretGroup.add(base);
    const bodyGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.6, 8);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x0066CC });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.6;
    body.castShadow = true;
    turretGroup.add(body);
    const headGeometry = new THREE.BoxGeometry(0.5, 0.4, 0.5);
    const headMaterial = new THREE.MeshPhongMaterial({ color: 0x00CCFF, emissive: 0x00AAFF, emissiveIntensity: 0.4 });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.1;
    head.castShadow = true;
    turretGroup.add(head);
    const barrelGeometry = new THREE.CylinderGeometry(0.06, 0.06, 0.9, 16);
    const barrelMaterial = new THREE.MeshPhongMaterial({ color: 0x00FFFF, emissive: 0x00FFFF, emissiveIntensity: 0.6 });
    const barrel = new THREE.Mesh(barrelGeometry, barrelMaterial);
    barrel.rotation.z = Math.PI / 2;
    barrel.position.set(0.45, 1.1, 0);
    barrel.castShadow = true;
    turretGroup.add(barrel);
    const lightGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const lightMaterial = new THREE.MeshPhongMaterial({ color: 0x00FFFF, emissive: 0x00FFFF, emissiveIntensity: 1.2 });
    const light = new THREE.Mesh(lightGeometry, lightMaterial);
    light.position.set(0, 1.3, 0.25);
    turretGroup.add(light);
    turretGroup.position.set(position.x, position.y, position.z);
    turretGroup.userData.head = head;
    turretGroup.userData.barrel = barrel;
    turretGroup.userData.shootCooldown = 0;
    turretGroup.userData.type = 'laser';
    scene.add(turretGroup);
    turrets.push(turretGroup);
}

function createRocketTurret(position) {
    if (!position) position = getNextTurretPosition();
    const turretGroup = new THREE.Group();
    const baseGeometry = new THREE.CylinderGeometry(0.7, 0.9, 0.4, 6);
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x4B0082 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = 0.2;
    base.castShadow = true;
    turretGroup.add(base);
    const bodyGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.7, 6);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x6A0DAD });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.75;
    body.castShadow = true;
    turretGroup.add(body);
    const headGeometry = new THREE.BoxGeometry(0.6, 0.5, 0.6);
    const headMaterial = new THREE.MeshPhongMaterial({ color: 0x8B00FF, emissive: 0x6A0DAD, emissiveIntensity: 0.3 });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.3;
    head.castShadow = true;
    turretGroup.add(head);
    const barrelGeometry = new THREE.BoxGeometry(0.8, 0.15, 0.15);
    const barrelMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
    const barrel = new THREE.Mesh(barrelGeometry, barrelMaterial);
    barrel.position.set(0.4, 1.3, 0);
    barrel.castShadow = true;
    turretGroup.add(barrel);
    const rocketGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.3, 8);
    const rocketMaterial = new THREE.MeshPhongMaterial({ color: 0xCC00FF, emissive: 0xAA00CC, emissiveIntensity: 0.5 });
    const rocket1 = new THREE.Mesh(rocketGeometry, rocketMaterial);
    rocket1.rotation.z = Math.PI / 2;
    rocket1.position.set(0.65, 1.4, 0);
    turretGroup.add(rocket1);
    const rocket2 = new THREE.Mesh(rocketGeometry, rocketMaterial);
    rocket2.rotation.z = Math.PI / 2;
    rocket2.position.set(0.65, 1.2, 0);
    turretGroup.add(rocket2);
    const lightGeometry = new THREE.SphereGeometry(0.12, 8, 8);
    const lightMaterial = new THREE.MeshPhongMaterial({ color: 0xAA00FF, emissive: 0xAA00FF, emissiveIntensity: 1.0 });
    const light = new THREE.Mesh(lightGeometry, lightMaterial);
    light.position.set(0, 1.5, 0.3);
    turretGroup.add(light);
    turretGroup.position.set(position.x, position.y, position.z);
    turretGroup.userData.head = head;
    turretGroup.userData.barrel = barrel;
    turretGroup.userData.shootCooldown = 0;
    turretGroup.userData.type = 'rocket';
    scene.add(turretGroup);
    turrets.push(turretGroup);
}

function createFreezeTurret(position) {
    if (!position) position = getNextTurretPosition();
    const turretGroup = new THREE.Group();
    const baseGeometry = new THREE.CylinderGeometry(0.6, 0.8, 0.3, 8);
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x87CEEB });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = 0.15;
    base.castShadow = true;
    turretGroup.add(base);
    const bodyGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.6, 8);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0xADD8E6 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.6;
    body.castShadow = true;
    turretGroup.add(body);
    const headGeometry = new THREE.BoxGeometry(0.5, 0.4, 0.5);
    const headMaterial = new THREE.MeshPhongMaterial({ color: 0xE0FFFF, emissive: 0x00CED1, emissiveIntensity: 0.5 });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.1;
    head.castShadow = true;
    turretGroup.add(head);
    const barrelGeometry = new THREE.CylinderGeometry(0.12, 0.12, 0.8, 8);
    const barrelMaterial = new THREE.MeshPhongMaterial({ color: 0xB0E0E6, emissive: 0x4682B4, emissiveIntensity: 0.4 });
    const barrel = new THREE.Mesh(barrelGeometry, barrelMaterial);
    barrel.rotation.z = Math.PI / 2;
    barrel.position.set(0.4, 1.1, 0);
    barrel.castShadow = true;
    turretGroup.add(barrel);
    const lightGeometry = new THREE.SphereGeometry(0.12, 8, 8);
    const lightMaterial = new THREE.MeshPhongMaterial({ color: 0x00FFFF, emissive: 0x00FFFF, emissiveIntensity: 1.0 });
    const light = new THREE.Mesh(lightGeometry, lightMaterial);
    light.position.set(0, 1.3, 0.25);
    turretGroup.add(light);
    turretGroup.position.set(position.x, position.y, position.z); // Изменена позиция чтобы не конфликтовать
    turretGroup.userData.head = head;
    turretGroup.userData.barrel = barrel;
    turretGroup.userData.shootCooldown = 0;
    turretGroup.userData.type = 'freeze';
    scene.add(turretGroup);
    turrets.push(turretGroup);
}

function createElectricTurret(position) {
    if (!position) position = getNextTurretPosition();
    const turretGroup = new THREE.Group();
    const baseGeometry = new THREE.CylinderGeometry(0.6, 0.8, 0.3, 8);
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 0xFFD700 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = 0.15;
    base.castShadow = true;
    turretGroup.add(base);
    const bodyGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.6, 8);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0xFFA500 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.6;
    body.castShadow = true;
    turretGroup.add(body);
    const headGeometry = new THREE.BoxGeometry(0.5, 0.4, 0.5);
    const headMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFF00, emissive: 0xFFFF00, emissiveIntensity: 0.6 });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.1;
    head.castShadow = true;
    turretGroup.add(head);
    const barrelGeometry = new THREE.BoxGeometry(0.8, 0.1, 0.1);
    const barrelMaterial = new THREE.MeshPhongMaterial({ color: 0xFFD700, emissive: 0xFFD700, emissiveIntensity: 0.5 });
    const barrel = new THREE.Mesh(barrelGeometry, barrelMaterial);
    barrel.position.set(0.4, 1.1, 0);
    barrel.castShadow = true;
    turretGroup.add(barrel);
    const lightGeometry = new THREE.SphereGeometry(0.12, 8, 8);
    const lightMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFF00, emissive: 0xFFFF00, emissiveIntensity: 1.2 });
    const light = new THREE.Mesh(lightGeometry, lightMaterial);
    light.position.set(0, 1.3, 0.25);
    turretGroup.add(light);
    turretGroup.position.set(position.x, position.y, position.z);
    turretGroup.userData.head = head;
    turretGroup.userData.barrel = barrel;
    turretGroup.userData.shootCooldown = 0;
    turretGroup.userData.type = 'electric';
    scene.add(turretGroup);
    turrets.push(turretGroup);
}

function createPoisonTurret(position) {
    if (!position) position = getNextTurretPosition();
    const turretGroup = new THREE.Group();
    const baseGeometry = new THREE.CylinderGeometry(0.6, 0.8, 0.3, 8);
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x228B22 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = 0.15;
    base.castShadow = true;
    turretGroup.add(base);
    const bodyGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.6, 8);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x32CD32 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.6;
    body.castShadow = true;
    turretGroup.add(body);
    const headGeometry = new THREE.BoxGeometry(0.5, 0.4, 0.5);
    const headMaterial = new THREE.MeshPhongMaterial({ color: 0x00FF00, emissive: 0x00FF00, emissiveIntensity: 0.4 });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.1;
    head.castShadow = true;
    turretGroup.add(head);
    const barrelGeometry = new THREE.CylinderGeometry(0.1, 0.15, 0.7, 8);
    const barrelMaterial = new THREE.MeshPhongMaterial({ color: 0x7FFF00, emissive: 0x7FFF00, emissiveIntensity: 0.3 });
    const barrel = new THREE.Mesh(barrelGeometry, barrelMaterial);
    barrel.rotation.z = Math.PI / 2;
    barrel.position.set(0.35, 1.1, 0);
    barrel.castShadow = true;
    turretGroup.add(barrel);
    const lightGeometry = new THREE.SphereGeometry(0.12, 8, 8);
    const lightMaterial = new THREE.MeshPhongMaterial({ color: 0x00FF00, emissive: 0x00FF00, emissiveIntensity: 1.0 });
    const light = new THREE.Mesh(lightGeometry, lightMaterial);
    light.position.set(0, 1.3, 0.25);
    turretGroup.add(light);
    turretGroup.position.set(position.x, position.y, position.z);
    turretGroup.userData.head = head;
    turretGroup.userData.barrel = barrel;
    turretGroup.userData.shootCooldown = 0;
    turretGroup.userData.type = 'poison';
    scene.add(turretGroup);
    turrets.push(turretGroup);
}

function createExplosiveTurret(position) {
    if (!position) position = getNextTurretPosition();
    const turretGroup = new THREE.Group();
    const baseGeometry = new THREE.CylinderGeometry(0.7, 0.9, 0.4, 6);
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x2F4F4F });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = 0.2;
    base.castShadow = true;
    turretGroup.add(base);
    const bodyGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.7, 6);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x696969 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.75;
    body.castShadow = true;
    turretGroup.add(body);
    const headGeometry = new THREE.BoxGeometry(0.6, 0.5, 0.6);
    const headMaterial = new THREE.MeshPhongMaterial({ color: 0x8B0000, emissive: 0xFF4500, emissiveIntensity: 0.3 });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.3;
    head.castShadow = true;
    turretGroup.add(head);
    const barrelGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.6, 8);
    const barrelMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    const barrel = new THREE.Mesh(barrelGeometry, barrelMaterial);
    barrel.rotation.z = Math.PI / 2;
    barrel.position.set(0.3, 1.3, 0);
    barrel.castShadow = true;
    turretGroup.add(barrel);
    const lightGeometry = new THREE.SphereGeometry(0.12, 8, 8);
    const lightMaterial = new THREE.MeshPhongMaterial({ color: 0xFF4500, emissive: 0xFF4500, emissiveIntensity: 1.0 });
    const light = new THREE.Mesh(lightGeometry, lightMaterial);
    light.position.set(0, 1.5, 0.3);
    turretGroup.add(light);
    turretGroup.position.set(position.x, position.y, position.z);
    turretGroup.userData.head = head;
    turretGroup.userData.barrel = barrel;
    turretGroup.userData.shootCooldown = 0;
    turretGroup.userData.type = 'explosive';
    scene.add(turretGroup);
    turrets.push(turretGroup);
}

function createSonicTurret(position) {
    if (!position) position = getNextTurretPosition();
    const turretGroup = new THREE.Group();
    const baseGeometry = new THREE.CylinderGeometry(0.6, 0.8, 0.3, 12);
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x4169E1 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = 0.15;
    base.castShadow = true;
    turretGroup.add(base);
    const bodyGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.6, 12);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x6495ED });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.6;
    body.castShadow = true;
    turretGroup.add(body);
    const headGeometry = new THREE.SphereGeometry(0.35, 16, 16);
    const headMaterial = new THREE.MeshPhongMaterial({ color: 0x00BFFF, emissive: 0x1E90FF, emissiveIntensity: 0.5 });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.2;
    head.castShadow = true;
    turretGroup.add(head);
    const speakerGeometry = new THREE.ConeGeometry(0.2, 0.4, 8);
    const speakerMaterial = new THREE.MeshPhongMaterial({ color: 0x191970, emissive: 0x4169E1, emissiveIntensity: 0.4 });
    const speaker = new THREE.Mesh(speakerGeometry, speakerMaterial);
    speaker.rotation.z = -Math.PI / 2;
    speaker.position.set(0.5, 1.2, 0);
    speaker.castShadow = true;
    turretGroup.add(speaker);
    const lightGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const lightMaterial = new THREE.MeshPhongMaterial({ color: 0x00BFFF, emissive: 0x00BFFF, emissiveIntensity: 1.2 });
    const light = new THREE.Mesh(lightGeometry, lightMaterial);
    light.position.set(0, 1.4, 0.25);
    turretGroup.add(light);
    turretGroup.position.set(position.x, position.y, position.z);
    turretGroup.userData.head = head;
    turretGroup.userData.speaker = speaker;
    turretGroup.userData.shootCooldown = 0;
    turretGroup.userData.type = 'sonic';
    scene.add(turretGroup);
    turrets.push(turretGroup);
}

function createPlasmaTurret(position) {
    if (!position) position = getNextTurretPosition();
    const turretGroup = new THREE.Group();
    const baseGeometry = new THREE.CylinderGeometry(0.6, 0.8, 0.3, 8);
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x8a2be2 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = 0.15;
    turretGroup.add(base);
    const bodyGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.6, 8);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x9932cc, emissive: 0x9932cc, emissiveIntensity: 0.3 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.6;
    turretGroup.add(body);
    const barrelGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.8, 8);
    const barrelMaterial = new THREE.MeshPhongMaterial({ color: 0xba55d3, emissive: 0xba55d3, emissiveIntensity: 0.5 });
    const barrel = new THREE.Mesh(barrelGeometry, barrelMaterial);
    barrel.rotation.z = Math.PI / 2;
    barrel.position.set(0.5, 1, 0);
    turretGroup.add(barrel);
    turretGroup.position.set(position.x, position.y, position.z);
    turretGroup.userData.barrel = barrel;
    turretGroup.userData.shootCooldown = 0;
    turretGroup.userData.type = 'plasma';
    scene.add(turretGroup);
    turrets.push(turretGroup);
}

function createTeslaTurret(position) {
    if (!position) position = getNextTurretPosition();
    const turretGroup = new THREE.Group();
    const baseGeometry = new THREE.CylinderGeometry(0.6, 0.8, 0.3, 8);
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x4b0082 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = 0.15;
    turretGroup.add(base);
    const coilGeometry = new THREE.TorusGeometry(0.3, 0.05, 8, 12);
    const coilMaterial = new THREE.MeshPhongMaterial({ color: 0x9400d3, emissive: 0x9400d3, emissiveIntensity: 0.7 });
    for (let i = 0; i < 3; i++) {
        const coil = new THREE.Mesh(coilGeometry, coilMaterial);
        coil.position.y = 0.5 + i * 0.2;
        turretGroup.add(coil);
    }
    turretGroup.position.set(position.x, position.y, position.z);
    turretGroup.userData.shootCooldown = 0;
    turretGroup.userData.type = 'tesla';
    scene.add(turretGroup);
    turrets.push(turretGroup);
}

function createGravityTurret(position) {
    if (!position) position = getNextTurretPosition();
    const turretGroup = new THREE.Group();
    const baseGeometry = new THREE.CylinderGeometry(0.6, 0.8, 0.3, 8);
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x2f4f4f });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = 0.15;
    turretGroup.add(base);
    const sphereGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0x000000, emissive: 0x4b0082, emissiveIntensity: 0.8 });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.y = 0.9;
    turretGroup.add(sphere);
    turretGroup.position.set(position.x, position.y, position.z);
    turretGroup.userData.sphere = sphere;
    turretGroup.userData.shootCooldown = 0;
    turretGroup.userData.type = 'gravityt';
    scene.add(turretGroup);
    turrets.push(turretGroup);
}

function createRailgunTurret(position) {
    if (!position) position = getNextTurretPosition();
    const turretGroup = new THREE.Group();
    const baseGeometry = new THREE.CylinderGeometry(0.6, 0.8, 0.3, 8);
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x4682b4 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = 0.15;
    turretGroup.add(base);
    const barrelGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1.2, 8);
    const barrelMaterial = new THREE.MeshPhongMaterial({ color: 0x0080ff, emissive: 0x0080ff, emissiveIntensity: 0.3 });
    const barrel = new THREE.Mesh(barrelGeometry, barrelMaterial);
    barrel.rotation.z = Math.PI / 2;
    barrel.position.set(0.7, 0.7, 0);
    turretGroup.add(barrel);
    turretGroup.position.set(position.x, position.y, position.z);
    turretGroup.userData.barrel = barrel;
    turretGroup.userData.shootCooldown = 0;
    turretGroup.userData.type = 'railgunt';
    scene.add(turretGroup);
    turrets.push(turretGroup);
}

function createMinigunTurret(position) {
    if (!position) position = getNextTurretPosition();
    const turretGroup = new THREE.Group();
    const baseGeometry = new THREE.CylinderGeometry(0.6, 0.8, 0.3, 8);
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x8b4513 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = 0.15;
    turretGroup.add(base);
    for (let i = 0; i < 6; i++) {
        const barrelGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.8, 8);
        const barrelMaterial = new THREE.MeshPhongMaterial({ color: 0x696969 });
        const barrel = new THREE.Mesh(barrelGeometry, barrelMaterial);
        const angle = (i / 6) * Math.PI * 2;
        barrel.rotation.z = Math.PI / 2;
        barrel.position.set(0.5, 0.7 + Math.sin(angle) * 0.15, Math.cos(angle) * 0.15);
        turretGroup.add(barrel);
    }
    turretGroup.position.set(position.x, position.y, position.z);
    turretGroup.userData.shootCooldown = 0;
    turretGroup.userData.type = 'minigunt';
    scene.add(turretGroup);
    turrets.push(turretGroup);
}

function createFlamethrowerTurret(position) {
    if (!position) position = getNextTurretPosition();
    const turretGroup = new THREE.Group();
    const baseGeometry = new THREE.CylinderGeometry(0.6, 0.8, 0.3, 8);
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x8b0000 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = 0.15;
    turretGroup.add(base);
    const tankGeometry = new THREE.CylinderGeometry(0.35, 0.35, 0.7, 8);
    const tankMaterial = new THREE.MeshPhongMaterial({ color: 0xff4500 });
    const tank = new THREE.Mesh(tankGeometry, tankMaterial);
    tank.position.y = 0.65;
    turretGroup.add(tank);
    const nozzleGeometry = new THREE.ConeGeometry(0.15, 0.6, 8);
    const nozzleMaterial = new THREE.MeshPhongMaterial({ color: 0xff6347, emissive: 0xff0000, emissiveIntensity: 0.4 });
    const nozzle = new THREE.Mesh(nozzleGeometry, nozzleMaterial);
    nozzle.rotation.z = -Math.PI / 2;
    nozzle.position.set(0.6, 0.9, 0);
    turretGroup.add(nozzle);
    turretGroup.position.set(position.x, position.y, position.z);
    turretGroup.userData.nozzle = nozzle;
    turretGroup.userData.shootCooldown = 0;
    turretGroup.userData.type = 'flamethrower';
    scene.add(turretGroup);
    turrets.push(turretGroup);
}

function createSniperTurret(position) {
    if (!position) position = getNextTurretPosition();
    const turretGroup = new THREE.Group();
    const baseGeometry = new THREE.CylinderGeometry(0.5, 0.7, 0.3, 8);
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x8b4513 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = 0.15;
    turretGroup.add(base);
    const barrelGeometry = new THREE.CylinderGeometry(0.08, 0.08, 1.5, 8);
    const barrelMaterial = new THREE.MeshPhongMaterial({ color: 0x2f4f4f });
    const barrel = new THREE.Mesh(barrelGeometry, barrelMaterial);
    barrel.rotation.z = Math.PI / 2;
    barrel.position.set(0.85, 0.7, 0);
    turretGroup.add(barrel);
    const scopeGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.3, 8);
    const scopeMaterial = new THREE.MeshPhongMaterial({ color: 0x000000, emissive: 0xff0000, emissiveIntensity: 0.5 });
    const scope = new THREE.Mesh(scopeGeometry, scopeMaterial);
    scope.position.set(0.2, 0.95, 0);
    turretGroup.add(scope);
    turretGroup.position.set(position.x, position.y, position.z);
    turretGroup.userData.barrel = barrel;
    turretGroup.userData.shootCooldown = 0;
    turretGroup.userData.type = 'sniper';
    scene.add(turretGroup);
    turrets.push(turretGroup);
}

function createShotgunTurret(position) {
    if (!position) position = getNextTurretPosition();
    const turretGroup = new THREE.Group();
    const baseGeometry = new THREE.CylinderGeometry(0.6, 0.8, 0.3, 8);
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 0xb8860b });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = 0.15;
    turretGroup.add(base);
    for (let i = 0; i < 2; i++) {
        const barrelGeometry = new THREE.CylinderGeometry(0.12, 0.12, 0.7, 8);
        const barrelMaterial = new THREE.MeshPhongMaterial({ color: 0xdaa520 });
        const barrel = new THREE.Mesh(barrelGeometry, barrelMaterial);
        barrel.rotation.z = Math.PI / 2;
        barrel.position.set(0.45, 0.7, (i - 0.5) * 0.2);
        turretGroup.add(barrel);
    }
    turretGroup.position.set(position.x, position.y, position.z);
    turretGroup.userData.shootCooldown = 0;
    turretGroup.userData.type = 'shotgunt';
    scene.add(turretGroup);
    turrets.push(turretGroup);
}

function createCannonTurret(position) {
    if (!position) position = getNextTurretPosition();
    const turretGroup = new THREE.Group();
    const baseGeometry = new THREE.CylinderGeometry(0.7, 0.9, 0.4, 8);
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x2f4f4f });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = 0.2;
    turretGroup.add(base);
    const barrelGeometry = new THREE.CylinderGeometry(0.25, 0.25, 1, 8);
    const barrelMaterial = new THREE.MeshPhongMaterial({ color: 0x708090 });
    const barrel = new THREE.Mesh(barrelGeometry, barrelMaterial);
    barrel.rotation.z = Math.PI / 2;
    barrel.position.set(0.6, 0.8, 0);
    turretGroup.add(barrel);
    turretGroup.position.set(position.x, position.y, position.z);
    turretGroup.userData.barrel = barrel;
    turretGroup.userData.shootCooldown = 0;
    turretGroup.userData.type = 'cannon';
    scene.add(turretGroup);
    turrets.push(turretGroup);
}

function createNuclearTurret(position) {
    if (!position) position = getNextTurretPosition();
    const turretGroup = new THREE.Group();
    const baseGeometry = new THREE.CylinderGeometry(0.7, 0.9, 0.4, 8);
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x556b2f });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = 0.2;
    turretGroup.add(base);
    const coreGeometry = new THREE.SphereGeometry(0.4, 16, 16);
    const coreMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00, emissive: 0x00ff00, emissiveIntensity: 0.9 });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    core.position.y = 1;
    turretGroup.add(core);
    const ringGeometry = new THREE.TorusGeometry(0.5, 0.05, 8, 16);
    const ringMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00, emissive: 0xffff00, emissiveIntensity: 0.6 });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.position.y = 1;
    turretGroup.add(ring);
    turretGroup.position.set(position.x, position.y, position.z);
    turretGroup.userData.core = core;
    turretGroup.userData.shootCooldown = 0;
    turretGroup.userData.type = 'nuclear';
    scene.add(turretGroup);
    turrets.push(turretGroup);
}

function createRainbowTurret(position) {
    if (!position) position = getNextTurretPosition();
    const turretGroup = new THREE.Group();
    const baseGeometry = new THREE.CylinderGeometry(0.6, 0.8, 0.3, 8);
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = 0.15;
    turretGroup.add(base);
    const colors = [0xff0000, 0xff7f00, 0xffff00, 0x00ff00, 0x0000ff, 0x4b0082, 0x9400d3];
    for (let i = 0; i < 7; i++) {
        const crystalGeometry = new THREE.ConeGeometry(0.1, 0.3, 6);
        const crystalMaterial = new THREE.MeshPhongMaterial({ color: colors[i], emissive: colors[i], emissiveIntensity: 0.6 });
        const crystal = new THREE.Mesh(crystalGeometry, crystalMaterial);
        const angle = (i / 7) * Math.PI * 2;
        crystal.position.set(Math.sin(angle) * 0.3, 0.8, Math.cos(angle) * 0.3);
        crystal.position.y = 0.8 + i * 0.1;
        turretGroup.add(crystal);
    }
    turretGroup.position.set(position.x, position.y, position.z);
    turretGroup.userData.shootCooldown = 0;
    turretGroup.userData.type = 'rainbow';
    scene.add(turretGroup);
    turrets.push(turretGroup);
}

function createHealingTurret(position) {
    if (!position) position = getNextTurretPosition();
    const turretGroup = new THREE.Group();
    const baseGeometry = new THREE.CylinderGeometry(0.6, 0.8, 0.3, 8);
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x228b22 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = 0.15;
    turretGroup.add(base);
    const crossGeometry = new THREE.BoxGeometry(0.5, 0.1, 0.1);
    const crossMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff7f, emissive: 0x00ff7f, emissiveIntensity: 0.7 });
    const cross1 = new THREE.Mesh(crossGeometry, crossMaterial);
    cross1.position.y = 0.9;
    turretGroup.add(cross1);
    const cross2 = new THREE.Mesh(crossGeometry, crossMaterial);
    cross2.rotation.z = Math.PI / 2;
    cross2.position.y = 0.9;
    turretGroup.add(cross2);
    turretGroup.position.set(position.x, position.y, position.z);
    turretGroup.userData.shootCooldown = 0;
    turretGroup.userData.type = 'healing';
    scene.add(turretGroup);
    turrets.push(turretGroup);
}

function createShieldTurret(position) {
    if (!position) position = getNextTurretPosition();
    const turretGroup = new THREE.Group();
    const baseGeometry = new THREE.CylinderGeometry(0.6, 0.8, 0.3, 8);
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x191970 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = 0.15;
    turretGroup.add(base);
    const shieldGeometry = new THREE.SphereGeometry(0.5, 16, 16, 0, Math.PI);
    const shieldMaterial = new THREE.MeshPhongMaterial({ color: 0x1e90ff, transparent: true, opacity: 0.5, emissive: 0x1e90ff, emissiveIntensity: 0.4 });
    const shield = new THREE.Mesh(shieldGeometry, shieldMaterial);
    shield.rotation.x = Math.PI / 2;
    shield.position.y = 0.8;
    turretGroup.add(shield);
    turretGroup.position.set(position.x, position.y, position.z);
    turretGroup.userData.shield = shield;
    turretGroup.userData.shootCooldown = 0;
    turretGroup.userData.type = 'shield';
    scene.add(turretGroup);
    turrets.push(turretGroup);
}

function createQuantumTurret(position) {
    if (!position) position = getNextTurretPosition();
    const turretGroup = new THREE.Group();
    const baseGeometry = new THREE.CylinderGeometry(0.6, 0.8, 0.3, 8);
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x663399 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = 0.15;
    turretGroup.add(base);
    const cubeGeometry = new THREE.BoxGeometry(0.4, 0.4, 0.4);
    const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0xba55d3, emissive: 0xba55d3, emissiveIntensity: 0.8 });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.y = 1;
    turretGroup.add(cube);
    turretGroup.position.set(position.x, position.y, position.z);
    turretGroup.userData.cube = cube;
    turretGroup.userData.shootCooldown = 0;
    turretGroup.userData.type = 'quantum';
    scene.add(turretGroup);
    turrets.push(turretGroup);
}

function createBlackholeTurret(position) {
    if (!position) position = getNextTurretPosition();
    const turretGroup = new THREE.Group();
    const baseGeometry = new THREE.CylinderGeometry(0.6, 0.8, 0.3, 8);
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = 0.15;
    turretGroup.add(base);
    const holeGeometry = new THREE.SphereGeometry(0.35, 16, 16);
    const holeMaterial = new THREE.MeshPhongMaterial({ color: 0x000000, emissive: 0x4b0082, emissiveIntensity: 1 });
    const hole = new THREE.Mesh(holeGeometry, holeMaterial);
    hole.position.y = 0.9;
    turretGroup.add(hole);
    const ringGeometry = new THREE.TorusGeometry(0.4, 0.05, 8, 16);
    const ringMaterial = new THREE.MeshPhongMaterial({ color: 0x9400d3, emissive: 0x9400d3, emissiveIntensity: 0.9 });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.position.y = 0.9;
    turretGroup.add(ring);
    turretGroup.position.set(position.x, position.y, position.z);
    turretGroup.userData.hole = hole;
    turretGroup.userData.shootCooldown = 0;
    turretGroup.userData.type = 'blackhole';
    scene.add(turretGroup);
    turrets.push(turretGroup);
}

function createTimeTurret(position) {
    if (!position) position = getNextTurretPosition();
    const turretGroup = new THREE.Group();
    const baseGeometry = new THREE.CylinderGeometry(0.6, 0.8, 0.3, 8);
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 0xdaa520 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = 0.15;
    turretGroup.add(base);
    const clockGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.1, 16);
    const clockMaterial = new THREE.MeshPhongMaterial({ color: 0xffd700, emissive: 0xffd700, emissiveIntensity: 0.5 });
    const clock = new THREE.Mesh(clockGeometry, clockMaterial);
    clock.position.y = 0.9;
    turretGroup.add(clock);
    const handGeometry = new THREE.BoxGeometry(0.05, 0.3, 0.05);
    const handMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
    const hand = new THREE.Mesh(handGeometry, handMaterial);
    hand.position.set(0, 1.05, 0.15);
    turretGroup.add(hand);
    turretGroup.position.set(position.x, position.y, position.z);
    turretGroup.userData.clock = clock;
    turretGroup.userData.hand = hand;
    turretGroup.userData.shootCooldown = 0;
    turretGroup.userData.type = 'timet';
    scene.add(turretGroup);
    turrets.push(turretGroup);
}

function createEnergyTurret(position) {
    if (!position) position = getNextTurretPosition();
    const turretGroup = new THREE.Group();
    const baseGeometry = new THREE.CylinderGeometry(0.6, 0.8, 0.3, 8);
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 0xf0e68c });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = 0.15;
    turretGroup.add(base);
    const orbGeometry = new THREE.SphereGeometry(0.35, 16, 16);
    const orbMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 1 });
    const orb = new THREE.Mesh(orbGeometry, orbMaterial);
    orb.position.y = 1;
    turretGroup.add(orb);
    turretGroup.position.set(position.x, position.y, position.z);
    turretGroup.userData.orb = orb;
    turretGroup.userData.shootCooldown = 0;
    turretGroup.userData.type = 'energyt';
    scene.add(turretGroup);
    turrets.push(turretGroup);
}

function createMeteorTurret(position) {
    if (!position) position = getNextTurretPosition();
    const turretGroup = new THREE.Group();
    const baseGeometry = new THREE.CylinderGeometry(0.6, 0.8, 0.3, 8);
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x8b4513 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = 0.15;
    turretGroup.add(base);
    const launcherGeometry = new THREE.ConeGeometry(0.3, 0.8, 8);
    const launcherMaterial = new THREE.MeshPhongMaterial({ color: 0xdc143c, emissive: 0xff4500, emissiveIntensity: 0.4 });
    const launcher = new THREE.Mesh(launcherGeometry, launcherMaterial);
    launcher.position.y = 1;
    turretGroup.add(launcher);
    turretGroup.position.set(position.x, position.y, position.z);
    turretGroup.userData.launcher = launcher;
    turretGroup.userData.shootCooldown = 0;
    turretGroup.userData.type = 'meteor';
    scene.add(turretGroup);
    turrets.push(turretGroup);
}

function createStormTurret(position) {
    if (!position) position = getNextTurretPosition();
    const turretGroup = new THREE.Group();
    const baseGeometry = new THREE.CylinderGeometry(0.6, 0.8, 0.3, 8);
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x4682b4 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = 0.15;
    turretGroup.add(base);
    const cloudGeometry = new THREE.SphereGeometry(0.5, 8, 8);
    const cloudMaterial = new THREE.MeshPhongMaterial({ color: 0x6495ed, emissive: 0xffffff, emissiveIntensity: 0.3 });
    const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
    cloud.scale.set(1, 0.6, 1);
    cloud.position.y = 1.1;
    turretGroup.add(cloud);
    turretGroup.position.set(position.x, position.y, position.z);
    turretGroup.userData.cloud = cloud;
    turretGroup.userData.shootCooldown = 0;
    turretGroup.userData.type = 'stormt';
    scene.add(turretGroup);
    turrets.push(turretGroup);
}

function createAntimatterTurret(position) {
    if (!position) position = getNextTurretPosition();
    const turretGroup = new THREE.Group();
    const baseGeometry = new THREE.CylinderGeometry(0.7, 0.9, 0.4, 8);
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x8b0000 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = 0.2;
    turretGroup.add(base);
    const coreGeometry = new THREE.SphereGeometry(0.4, 16, 16);
    const coreMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000, emissive: 0xff0000, emissiveIntensity: 1.2 });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    core.position.y = 1.1;
    turretGroup.add(core);
    const antiCoreGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const antiCoreMaterial = new THREE.MeshPhongMaterial({ color: 0x000000, emissive: 0x4b0082, emissiveIntensity: 1 });
    const antiCore = new THREE.Mesh(antiCoreGeometry, antiCoreMaterial);
    antiCore.position.y = 1.1;
    turretGroup.add(antiCore);
    turretGroup.position.set(position.x, position.y, position.z);
    turretGroup.userData.core = core;
    turretGroup.userData.antiCore = antiCore;
    turretGroup.userData.shootCooldown = 0;
    turretGroup.userData.type = 'antimatter';
    scene.add(turretGroup);
    turrets.push(turretGroup);
}
