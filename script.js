// Получаем доступ к элементам на странице
const scoreElement = document.getElementById('score');
const coinElement = document.getElementById('main-coin');
const userDataElement = document.getElementById('user-data');

// Переменная для хранения очков
let score = 0;

// Инициализируем веб-приложение Telegram
const tg = window.Telegram.WebApp;
tg.expand(); // Расширяем приложение на весь экран

// Показываем данные пользователя (если они есть)
if (tg.initDataUnsafe?.user) {
    const user = tg.initDataUnsafe.user;
    userDataElement.textContent = `Игрок: ${user.first_name} ${user.last_name || ''} (@${user.username || 'n/a'})`;
} else {
    userDataElement.textContent = "Игра в тестовом режиме (вне Telegram)";
}


// Функция, которая будет вызываться при каждом клике
function handleCoinClick() {
    // Увеличиваем счет
    score++;
    
    // Обновляем текст на экране
    scoreElement.textContent = score;
}

// "Слушаем" клики по нашей главной монете
coinElement.addEventListener('click', handleCoinClick);

// ВАЖНО: Сейчас счет хранится только пока открыта страница.
// Чтобы сохранять его, нужен бэкенд (сервер)!
// Например, можно отправлять счет на сервер, когда пользователь закрывает игру.
tg.onEvent('mainButtonClicked', function(){
    // Пример отправки данных на ваш сервер
    // tg.sendData(JSON.stringify({ score: score })); 
});

// Если мы хотим показать кнопку внизу для отправки результата
// tg.MainButton.setText("Сохранить результат");
// tg.MainButton.show();
