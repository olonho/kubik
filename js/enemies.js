/**
 * Создание врагов (зомби и боссы)
 * Зависимости: THREE.js, глобальные переменные scene, obstacles, wave, zombieBaseHP
 */

function createZombie() {
    const zombieGroup = new THREE.Group();

    // Цвет зомби - зеленоватый с улучшенными материалами
    const zombieMaterial = new THREE.MeshStandardMaterial({
        color: 0x4a7c4a,
        roughness: 0.7,
        metalness: 0.1
    });
    const darkMaterial = new THREE.MeshStandardMaterial({
        color: 0x2d4a2d,
        roughness: 0.8,
        metalness: 0.05
    });

    // Тело
    const bodyGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.3);
    const body = new THREE.Mesh(bodyGeometry, zombieMaterial);
    body.position.y = 0.9;
    body.castShadow = true;
    zombieGroup.add(body);

    // Голова
    const headGeometry = new THREE.BoxGeometry(0.4, 0.4, 0.4);
    const head = new THREE.Mesh(headGeometry, zombieMaterial);
    head.position.y = 1.5;
    head.castShadow = true;
    zombieGroup.add(head);

    // Глаза (красные)
    const eyeGeometry = new THREE.BoxGeometry(0.08, 0.08, 0.05);
    const eyeMaterial = new THREE.MeshPhongMaterial({
        color: 0xff0000,
        emissive: 0xff0000,
        emissiveIntensity: 0.5
    });
    const eye1 = new THREE.Mesh(eyeGeometry, eyeMaterial);
    eye1.position.set(-0.1, 1.55, 0.2);
    zombieGroup.add(eye1);
    const eye2 = new THREE.Mesh(eyeGeometry, eyeMaterial);
    eye2.position.set(0.1, 1.55, 0.2);
    zombieGroup.add(eye2);

    // Руки (вытянуты вперед)
    const armGeometry = new THREE.BoxGeometry(0.15, 0.6, 0.15);
    const leftArm = new THREE.Mesh(armGeometry, darkMaterial);
    leftArm.position.set(-0.375, 1.0, 0.3);
    leftArm.rotation.x = -Math.PI / 3;
    leftArm.castShadow = true;
    zombieGroup.add(leftArm);

    const rightArm = new THREE.Mesh(armGeometry, darkMaterial);
    rightArm.position.set(0.375, 1.0, 0.3);
    rightArm.rotation.x = -Math.PI / 3;
    rightArm.castShadow = true;
    zombieGroup.add(rightArm);

    // Ноги (будут анимированы)
    const legGeometry = new THREE.BoxGeometry(0.2, 0.5, 0.2);
    const leftLeg = new THREE.Mesh(legGeometry, darkMaterial);
    leftLeg.position.set(-0.15, 0.25, 0);
    leftLeg.castShadow = true;
    zombieGroup.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeometry, darkMaterial);
    rightLeg.position.set(0.15, 0.25, 0);
    rightLeg.castShadow = true;
    zombieGroup.add(rightLeg);

    // Сохраняем ссылки на ноги для анимации
    zombieGroup.userData.leftLeg = leftLeg;
    zombieGroup.userData.rightLeg = rightLeg;
    zombieGroup.userData.legPhase = Math.random() * Math.PI * 2; // Случайная фаза анимации
    zombieGroup.userData.zombie = body; // Для обнаружения попаданий
    // HP зависит от волны
    const baseHP = window.zombieBaseHP || 1;
    zombieGroup.userData.hp = baseHP;
    zombieGroup.userData.maxHp = baseHP;
    zombieGroup.userData.isBoss = false;

    // Если у зомби больше 1 HP, добавляем маленький HP бар
    if (baseHP > 1) {
        const hpBarBg = new THREE.Mesh(
            new THREE.PlaneGeometry(0.8, 0.1),
            new THREE.MeshBasicMaterial({ color: 0x333333 })
        );
        hpBarBg.position.set(0, 2.2, 0);
        zombieGroup.add(hpBarBg);

        const hpBarFg = new THREE.Mesh(
            new THREE.PlaneGeometry(0.8, 0.08),
            new THREE.MeshBasicMaterial({ color: 0x00ff00 })
        );
        hpBarFg.position.set(0, 2.2, 0.01);
        zombieGroup.add(hpBarFg);

        zombieGroup.userData.hpBar = hpBarFg;
        zombieGroup.userData.hpBarBg = hpBarBg;
    }

    // Тень на земле
    const shadowGeometry = new THREE.CircleGeometry(0.4, 16);
    const shadowMaterial = new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.3
    });
    const shadow = new THREE.Mesh(shadowGeometry, shadowMaterial);
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = 0.01;
    zombieGroup.add(shadow);

    zombieGroup.position.set((Math.random() - 0.5) * 5, 0, -50);

    scene.add(zombieGroup);
    obstacles.push(zombieGroup);
}

function createBoss() {
    const zombieGroup = new THREE.Group();

    // Увеличенный размер и темный цвет
    const bossMaterial = new THREE.MeshPhongMaterial({ color: 0x8b0000, emissive: 0x8b0000, emissiveIntensity: 0.2 });
    const darkMaterial = new THREE.MeshPhongMaterial({ color: 0x4a0000 });

    // Тело (больше)
    const bodyGeometry = new THREE.BoxGeometry(1.2, 1.6, 0.6);
    const body = new THREE.Mesh(bodyGeometry, bossMaterial);
    body.position.y = 1.8;
    body.castShadow = true;
    zombieGroup.add(body);

    // Голова (больше)
    const headGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
    const head = new THREE.Mesh(headGeometry, bossMaterial);
    head.position.y = 3.0;
    head.castShadow = true;
    zombieGroup.add(head);

    // Корона на голове
    const crownGeometry = new THREE.ConeGeometry(0.5, 0.6, 6);
    const crownMaterial = new THREE.MeshPhongMaterial({ color: 0xffd700, emissive: 0xffd700, emissiveIntensity: 1.2 });
    const crown = new THREE.Mesh(crownGeometry, crownMaterial);
    crown.position.y = 3.7;
    zombieGroup.add(crown);

    // Пульсирующая аура вокруг босса
    const auraGeometry = new THREE.SphereGeometry(2, 16, 16);
    const auraMaterial = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        transparent: true,
        opacity: 0.2,
        side: THREE.BackSide
    });
    const aura = new THREE.Mesh(auraGeometry, auraMaterial);
    aura.position.y = 2;
    zombieGroup.add(aura);
    zombieGroup.userData.aura = aura;

    // Глаза (красные, светящиеся)
    const eyeGeometry = new THREE.BoxGeometry(0.16, 0.16, 0.1);
    const eyeMaterial = new THREE.MeshPhongMaterial({
        color: 0xff0000,
        emissive: 0xff0000,
        emissiveIntensity: 1.5
    });
    const eye1 = new THREE.Mesh(eyeGeometry, eyeMaterial);
    eye1.position.set(-0.2, 3.1, 0.4);
    zombieGroup.add(eye1);
    const eye2 = new THREE.Mesh(eyeGeometry, eyeMaterial);
    eye2.position.set(0.2, 3.1, 0.4);
    zombieGroup.add(eye2);

    // Руки (вытянуты вперед, больше)
    const armGeometry = new THREE.BoxGeometry(0.3, 1.2, 0.3);
    const leftArm = new THREE.Mesh(armGeometry, darkMaterial);
    leftArm.position.set(-0.75, 2.0, 0.6);
    leftArm.rotation.x = -Math.PI / 3;
    leftArm.castShadow = true;
    zombieGroup.add(leftArm);

    const rightArm = new THREE.Mesh(armGeometry, darkMaterial);
    rightArm.position.set(0.75, 2.0, 0.6);
    rightArm.rotation.x = -Math.PI / 3;
    rightArm.castShadow = true;
    zombieGroup.add(rightArm);

    // Ноги (будут анимированы, больше)
    const legGeometry = new THREE.BoxGeometry(0.4, 1.0, 0.4);
    const leftLeg = new THREE.Mesh(legGeometry, darkMaterial);
    leftLeg.position.set(-0.3, 0.5, 0);
    leftLeg.castShadow = true;
    zombieGroup.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeometry, darkMaterial);
    rightLeg.position.set(0.3, 0.5, 0);
    rightLeg.castShadow = true;
    zombieGroup.add(rightLeg);

    // HP бар для босса
    const hpBarBg = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 0.2),
        new THREE.MeshBasicMaterial({ color: 0x333333 })
    );
    hpBarBg.position.set(0, 4.2, 0);
    zombieGroup.add(hpBarBg);

    const hpBarFg = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 0.18),
        new THREE.MeshBasicMaterial({ color: 0xff0000 })
    );
    hpBarFg.position.set(0, 4.2, 0.01);
    zombieGroup.add(hpBarFg);

    // Сохраняем ссылки на ноги для анимации
    zombieGroup.userData.leftLeg = leftLeg;
    zombieGroup.userData.rightLeg = rightLeg;
    zombieGroup.userData.legPhase = Math.random() * Math.PI * 2;
    zombieGroup.userData.zombie = body;
    zombieGroup.userData.hp = 10 + (wave * 5); // HP растет с волнами
    zombieGroup.userData.maxHp = 10 + (wave * 5);
    zombieGroup.userData.isBoss = true;
    zombieGroup.userData.hpBar = hpBarFg;
    zombieGroup.userData.hpBarBg = hpBarBg;

    // Тень на земле (больше)
    const shadowGeometry = new THREE.CircleGeometry(0.8, 16);
    const shadowMaterial = new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.4
    });
    const shadow = new THREE.Mesh(shadowGeometry, shadowMaterial);
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = 0.01;
    zombieGroup.add(shadow);

    zombieGroup.position.set((Math.random() - 0.5) * 5, 0, -50);
    zombieGroup.scale.set(2.5, 2.5, 2.5); // Увеличиваем размер в 2.5 раза

    scene.add(zombieGroup);
    obstacles.push(zombieGroup);
}

function createObstacle() {
    // Пустая функция-заглушка (больше не используется, используется createZombie)
}
