// Магазин питомцев - логика покупки и именования
console.log('✅ petsShop.js загружен');

// Данные о питомцах
const petsData = [
    { id: 'dog', name: 'Собака', icon: '🐶', price: 0, description: 'Верный друг. Начальный питомец.' },
    { id: 'cat', name: 'Кошка', icon: '🐱', price: 500, description: 'Ловкая стрелок. Дальняя атака.' },
    { id: 'wolf', name: 'Волк', icon: '🐺', price: 1000, description: 'Сильный боец. Ближний бой.' },
    { id: 'bear', name: 'Медведь', icon: '🐻', price: 1500, description: 'Танк с большим HP. Защитник.' },
    { id: 'dragon', name: 'Дракон', icon: '🐉', price: 3000, description: 'Огненное дыхание. Мощная атака.' },
    { id: 'robot', name: 'Робот', icon: '🤖', price: 2500, description: 'Лазерные атаки. Технологичный.' },
    { id: 'eagle', name: 'Орёл', icon: '🦅', price: 1800, description: 'Летает и атакует сверху.' },
    { id: 'panda', name: 'Панда', icon: '🐼', price: 2000, description: 'Целитель. Восстанавливает HP.' },
    { id: 'fox', name: 'Лиса', icon: '🦊', price: 1200, description: 'Очень быстрая. Хитрая.' },
    { id: 'unicorn', name: 'Единорог', icon: '🦄', price: 3500, description: 'Магическая атака. Редкий.' },
    { id: 'tiger', name: 'Тигр', icon: '🐯', price: 2200, description: 'Полосатый хищник. Сильный.' },
    { id: 'lion', name: 'Лев', icon: '🦁', price: 2800, description: 'Король зверей. Мощный урон.' }
];

// Глобальные переменные
let currentPetToBuy = null;

// Открытие магазина питомцев
function openPetsShop() {
    console.log('🐾 Открытие магазина питомцев...');

    // Показываем магазин
    document.getElementById('petsShopMenu').style.display = 'block';

    // Скрываем главное меню
    document.getElementById('mainMenu').style.display = 'none';

    // Обновляем отображение
    updatePetsShopDisplay();
}

// Обновление отображения магазина
function updatePetsShopDisplay() {
    // Обновляем монеты
    document.getElementById('petsShopCoins').textContent = coins;

    // Получаем список купленных питомцев из localStorage
    const ownedPetsData = JSON.parse(localStorage.getItem('cubeGameOwnedPets')) || [];
    const petNamesData = JSON.parse(localStorage.getItem('cubeGamePetNames')) || {};

    // Отображаем доступных питомцев
    const availableContainer = document.getElementById('petsShopAvailable');
    availableContainer.innerHTML = '';

    petsData.forEach(pet => {
        const isOwned = ownedPetsData.includes(pet.id);
        const petCard = createPetCard(pet, isOwned, false);
        availableContainer.appendChild(petCard);
    });

    // Отображаем купленных питомцев
    const ownedContainer = document.getElementById('petsShopOwned');
    ownedContainer.innerHTML = '';

    if (ownedPetsData.length === 0) {
        ownedContainer.innerHTML = '<p style="color: #999; font-size: 24px; text-align: center; width: 100%; padding: 40px;">У вас пока нет питомцев. Купите своего первого друга!</p>';
    } else {
        ownedPetsData.forEach(petId => {
            const petInfo = petsData.find(p => p.id === petId);
            if (petInfo) {
                const petName = petNamesData[petId] || petInfo.name;
                const petCard = createOwnedPetCard(petInfo, petName);
                ownedContainer.appendChild(petCard);
            }
        });
    }
}

// Создание карточки питомца
function createPetCard(pet, isOwned, showBuyButton = true) {
    const card = document.createElement('div');
    card.style.cssText = `
        background: linear-gradient(135deg, rgba(60, 60, 80, 0.95), rgba(30, 30, 50, 0.95));
        padding: 25px;
        border-radius: 20px;
        border: 4px solid ${isOwned ? 'rgba(76, 175, 80, 0.8)' : 'rgba(255, 107, 107, 0.6)'};
        width: 220px;
        text-align: center;
        box-shadow: 0 8px 25px ${isOwned ? 'rgba(76, 175, 80, 0.4)' : 'rgba(255, 107, 107, 0.3)'};
        transition: all 0.3s;
        cursor: ${isOwned ? 'default' : 'pointer'};
        position: relative;
    `;

    card.innerHTML = `
        <div style="font-size: 80px; margin-bottom: 15px;">${pet.icon}</div>
        <h4 style="color: #fff; font-size: 26px; margin: 0 0 10px 0; font-weight: bold; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.9);">${pet.name}</h4>
        <p style="color: #ccc; font-size: 16px; margin: 0 0 15px 0; line-height: 1.4; min-height: 50px;">${pet.description}</p>
        <div style="color: gold; font-size: 22px; font-weight: bold; margin-bottom: 15px; text-shadow: 0 0 10px rgba(255, 215, 0, 0.8);">
            ${pet.price === 0 ? 'БЕСПЛАТНО' : pet.price + ' 💰'}
        </div>
        ${isOwned ?
            '<div style="background: linear-gradient(135deg, #4CAF50, #45a049); padding: 12px 20px; border-radius: 12px; color: white; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);">✅ КУПЛЕНО</div>' :
            '<button class="buyPetBtn" data-pet-id="' + pet.id + '" style="width: 100%; padding: 12px 20px; background: linear-gradient(135deg, #FF6B6B, #EE5A6F); border: 3px solid #FF6B6B; border-radius: 12px; color: white; font-size: 20px; font-weight: bold; cursor: pointer; transition: all 0.3s; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8); box-shadow: 0 4px 15px rgba(255, 107, 107, 0.5);">💰 КУПИТЬ</button>'
        }
    `;

    // Эффекты наведения
    if (!isOwned) {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.05)';
            card.style.boxShadow = '0 12px 35px rgba(255, 107, 107, 0.6)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 8px 25px rgba(255, 107, 107, 0.3)';
        });
    }

    // Обработчик кнопки покупки
    const buyBtn = card.querySelector('.buyPetBtn');
    if (buyBtn) {
        buyBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            buyPet(pet);
        });

        buyBtn.addEventListener('mouseenter', () => {
            buyBtn.style.transform = 'scale(1.1)';
            buyBtn.style.boxShadow = '0 6px 20px rgba(255, 107, 107, 0.7)';
        });
        buyBtn.addEventListener('mouseleave', () => {
            buyBtn.style.transform = 'scale(1)';
            buyBtn.style.boxShadow = '0 4px 15px rgba(255, 107, 107, 0.5)';
        });
    }

    return card;
}

// Создание карточки купленного питомца
function createOwnedPetCard(pet, petName) {
    const card = document.createElement('div');
    card.style.cssText = `
        background: linear-gradient(135deg, rgba(76, 175, 80, 0.25), rgba(69, 160, 73, 0.25));
        padding: 25px;
        border-radius: 20px;
        border: 4px solid rgba(76, 175, 80, 0.8);
        width: 220px;
        text-align: center;
        box-shadow: 0 8px 25px rgba(76, 175, 80, 0.4);
        transition: all 0.3s;
    `;

    card.innerHTML = `
        <div style="font-size: 80px; margin-bottom: 15px;">${pet.icon}</div>
        <h4 style="color: #4CAF50; font-size: 26px; margin: 0 0 5px 0; font-weight: bold; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.9);">${petName}</h4>
        <p style="color: #aaa; font-size: 18px; margin: 0 0 15px 0;">${pet.name}</p>
        <p style="color: #ccc; font-size: 16px; margin: 0; line-height: 1.4;">${pet.description}</p>
    `;

    // Эффект наведения
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px) scale(1.03)';
        card.style.boxShadow = '0 12px 35px rgba(76, 175, 80, 0.6)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '0 8px 25px rgba(76, 175, 80, 0.4)';
    });

    return card;
}

// Покупка питомца
function buyPet(pet) {
    console.log('🛒 Попытка купить питомца:', pet.name);

    // Проверяем достаточно ли монет
    if (coins < pet.price) {
        showNotification('❌ Недостаточно монет! Нужно: ' + pet.price + ', есть: ' + coins, 'error');
        return;
    }

    // Проверяем не куплен ли уже
    const ownedPetsData = JSON.parse(localStorage.getItem('cubeGameOwnedPets')) || [];
    if (ownedPetsData.includes(pet.id)) {
        showNotification('ℹ️ У вас уже есть этот питомец!', 'info');
        return;
    }

    // Сохраняем какого питомца покупаем
    currentPetToBuy = pet;

    // Открываем диалог ввода имени
    openPetNameDialog(pet);
}

// Открытие диалога ввода имени
function openPetNameDialog(pet) {
    const dialog = document.getElementById('petNameDialog');
    const preview = document.getElementById('petNamePreview');
    const type = document.getElementById('petNameType');
    const input = document.getElementById('petNameInput');

    // Заполняем данные
    preview.textContent = pet.icon;
    type.textContent = pet.name;
    input.value = pet.name; // По умолчанию название вида

    // Показываем диалог
    dialog.style.display = 'flex';

    // Фокус на инпут
    setTimeout(() => input.focus(), 100);
}

// Подтверждение имени и завершение покупки
function confirmPetName() {
    const input = document.getElementById('petNameInput');
    const petName = input.value.trim();

    if (!petName) {
        showNotification('❌ Введите имя питомца!', 'error');
        return;
    }

    if (!currentPetToBuy) {
        console.error('Ошибка: currentPetToBuy не установлен');
        return;
    }

    // Снимаем монеты
    coins -= currentPetToBuy.price;
    updateCoinsDisplay();
    localStorage.setItem('cubeGameCoins', coins);

    // Добавляем питомца в список купленных
    const ownedPetsData = JSON.parse(localStorage.getItem('cubeGameOwnedPets')) || [];
    ownedPetsData.push(currentPetToBuy.id);
    localStorage.setItem('cubeGameOwnedPets', JSON.stringify(ownedPetsData));

    // Сохраняем имя питомца
    const petNamesData = JSON.parse(localStorage.getItem('cubeGamePetNames')) || {};
    petNamesData[currentPetToBuy.id] = petName;
    localStorage.setItem('cubeGamePetNames', JSON.stringify(petNamesData));

    // Показываем уведомление
    showNotification('🎉 Питомец "' + petName + '" куплен! Он будет сражаться рядом с вами!', 'success');

    // Закрываем диалог
    closePetNameDialog();

    // Обновляем отображение
    updatePetsShopDisplay();

    console.log('✅ Питомец куплен:', currentPetToBuy.name, 'с именем:', petName);
    currentPetToBuy = null;
}

// Закрытие диалога
function closePetNameDialog() {
    document.getElementById('petNameDialog').style.display = 'none';
    document.getElementById('petNameInput').value = '';
    currentPetToBuy = null;
}

// Закрытие магазина и возврат в главное меню
function closePetsShop() {
    document.getElementById('petsShopMenu').style.display = 'none';
    document.getElementById('mainMenu').style.display = 'flex';
}

// Инициализация обработчиков
document.addEventListener('DOMContentLoaded', () => {
    // Кнопка подтверждения имени
    const confirmBtn = document.getElementById('petNameConfirm');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', confirmPetName);
    }

    // Кнопка отмены
    const cancelBtn = document.getElementById('petNameCancel');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closePetNameDialog);
    }

    // Enter в инпуте
    const input = document.getElementById('petNameInput');
    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                confirmPetName();
            }
        });
    }

    // Кнопка возврата в меню
    const backBtn = document.getElementById('backToMainMenuBtn');
    if (backBtn) {
        backBtn.addEventListener('click', closePetsShop);
    }

    console.log('✅ Обработчики магазина питомцев установлены');
});
