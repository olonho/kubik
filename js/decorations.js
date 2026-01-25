// Создание декораций уровня

function createTree() {
    const treeGroup = new THREE.Group();
    
    const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.3, 2, 8);
    const trunkMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = 1;
    trunk.castShadow = true;
    treeGroup.add(trunk);
    
    const crownGeometry = new THREE.SphereGeometry(1.2, 8, 8);
    const crownMaterial = new THREE.MeshPhongMaterial({ color: 0x228B22 });
    const crown = new THREE.Mesh(crownGeometry, crownMaterial);
    crown.position.y = 2.5;
    crown.castShadow = true;
    crown.scale.set(1, 1.3, 1);
    treeGroup.add(crown);
    
    return treeGroup;
}

function createRock() {
    const rockGroup = new THREE.Group();
    const rockGeometry = new THREE.DodecahedronGeometry(0.6);
    const rockMaterial = new THREE.MeshPhongMaterial({ color: 0x808080 });
    const rock = new THREE.Mesh(rockGeometry, rockMaterial);
    rock.castShadow = true;
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
    const bushMaterial = new THREE.MeshPhongMaterial({ color: 0x228B22 });
    
    for (let i = 0; i < 4; i++) {
        const geometry = new THREE.SphereGeometry(0.3 + Math.random() * 0.2, 8, 8);
        const sphere = new THREE.Mesh(geometry, bushMaterial);
        sphere.position.set((Math.random() - 0.5) * 0.6, 0.2, (Math.random() - 0.5) * 0.6);
        sphere.castShadow = true;
        bushGroup.add(sphere);
    }
    
    return bushGroup;
}

function createFlower() {
    const flowerGroup = new THREE.Group();
    
    const stemGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.4, 6);
    const stemMaterial = new THREE.MeshPhongMaterial({ color: 0x228B22 });
    const stem = new THREE.Mesh(stemGeometry, stemMaterial);
    stem.position.y = 0.2;
    flowerGroup.add(stem);
    
    const flowerColors = [0xFF1493, 0xFFFF00, 0xFF6347, 0xFF69B4, 0xFFA500, 0x9370DB];
    const flowerColor = flowerColors[Math.floor(Math.random() * flowerColors.length)];
    const flowerGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const flowerMaterial = new THREE.MeshPhongMaterial({ 
        color: flowerColor,
        emissive: flowerColor,
        emissiveIntensity: 0.2
    });
    const flower = new THREE.Mesh(flowerGeometry, flowerMaterial);
    flower.position.y = 0.45;
    flower.scale.set(1, 0.5, 1);
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

function createTrees() {
    for (let i = 0; i < 25; i++) {
        const tree = createTree();
        tree.position.set(-5.5, 0, -i * 5 - 5);
        scene.add(tree);
        decorations.push(tree);
    }
    for (let i = 0; i < 25; i++) {
        const tree = createTree();
        tree.position.set(5.5, 0, -i * 5 - 5);
        scene.add(tree);
        decorations.push(tree);
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
}
