const tg = window.Telegram.WebApp;
tg.expand();

// Элементы DOM
const scoreElement = document.getElementById('score');
const hamsterElement = document.getElementById('hamster');
const withdrawBtn = document.getElementById('withdraw-btn');
const modal = document.getElementById('withdraw-modal');
const closeBtn = document.querySelector('.close-btn');
const form = document.getElementById('withdraw-form');
const coinsInput = document.getElementById('coins-input');
const moneyDisplay = document.getElementById('money-display');
const balanceDisplay = document.getElementById('balance-display');

let score = 0;
const CONVERSION_RATE = 1000; // 1000 коинов = 1$

// --- Логика тапов ---
hamsterElement.addEventListener('click', (e) => {
    score++;
    scoreElement.textContent = score;
});

// --- Логика модального окна ---
withdrawBtn.addEventListener('click', () => {
    balanceDisplay.textContent = score;
    modal.classList.replace('modal-hidden', 'modal-visible');
});
closeBtn.addEventListener('click', () => modal.classList.replace('modal-visible', 'modal-hidden'));
window.addEventListener('click', (e) => {
    if (e.target == modal) {
        modal.classList.replace('modal-visible', 'modal-hidden');
    }
});

// --- Логика конвертации ---
coinsInput.addEventListener('input', () => {
    let amount = parseInt(coinsInput.value) || 0;
    if (amount > score) {
        amount = score;
        coinsInput.value = score;
    }
    if (amount < 0) {
        amount = 0;
        coinsInput.value = 0;
    }
    moneyDisplay.textContent = (amount / CONVERSION_RATE).toFixed(2);
});

// --- Логика отправки формы ---
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const coins = parseInt(coinsInput.value);
    const nickname = document.getElementById('nickname-input').value;

    if (!coins || coins <= 0) {
        tg.showAlert('Пожалуйста, введите корректное количество коинов.');
        return;
    }
    if (coins > score) {
        tg.showAlert('У вас недостаточно коинов!');
        return;
    }
    if (!nickname) {
        tg.showAlert('Пожалуйста, укажите ваш никнейм.');
        return;
    }

    // Формируем данные для отправки боту
    const data = {
        coins: coins,
        nickname: nickname,
    };

    // Отправляем данные
    tg.sendData(JSON.stringify(data));
    // При успешной отправке Telegram закроет веб-приложение.
});
