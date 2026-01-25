// Логика магазина

function openShop() {
    gameActive = false;
    document.getElementById('shopMenu').style.display = 'block';
    document.getElementById('shopCoins').textContent = coins;
}

function closeShop() {
    document.getElementById('shopMenu').style.display = 'none';
    document.getElementById('shopMessage').style.display = 'none';
    gameActive = true;
}

function showShopMessage(message, isSuccess) {
    const msgElement = document.getElementById('shopMessage');
    msgElement.textContent = message;
    msgElement.style.display = 'block';
    msgElement.style.backgroundColor = isSuccess ? 'rgba(76, 175, 80, 0.8)' : 'rgba(244, 67, 54, 0.8)';
    msgElement.style.color = 'white';
    
    setTimeout(() => {
        msgElement.style.display = 'none';
    }, 2000);
}

function buyAmmo(amount, cost) {
    if (coins >= cost) {
        coins -= cost;
        ammo += amount;
        localStorage.setItem('cubeGameCoins', coins);
        updateCoinsDisplay();
        updateAmmoDisplay();
        document.getElementById('shopCoins').textContent = coins;
        showShopMessage('✅ Куплено +' + amount + ' патронов!', true);
    } else {
        const need = cost - coins;
        showShopMessage('❌ Недостаточно монет! Нужно еще: ' + need + ' 💰', false);
    }
}
