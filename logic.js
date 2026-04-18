// 1. Установи дату, до которой считаем (Год, Месяц (от 0 до 11), Число, Часы, Минуты)
// Январь - 0, Декабрь - 11. 
const targetDate = new Date(2026, 4, 15, 0, 0, 0); // Пример:  2026год, Май (4), 15 число, 00:00:00

function updateCountdown() {
    const now = new Date(); // Текущее время
    const diff = targetDate - now; // Разница в миллисекундах

    if (diff <= 0) {
        document.getElementById('countdown').innerText = "ОТКРЫТО!";
        return;
    }

    // Рассчитываем дни, часы, минуты и секунды
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    // Форматируем числа, чтобы всегда было две цифры (01, 02... а не просто 1, 2)
    const fDays = days.toString().padStart(2, '0');
    const fHours = hours.toString().padStart(2, '0');
    const fMinutes = minutes.toString().padStart(2, '0');
    const fSeconds = seconds.toString().padStart(2, '0');

    // Выводим результат в твой <span> в HTML
    document.getElementById('countdown').innerText = `${fDays} Днів ${fHours}:${fMinutes}:${fSeconds}`;
}

// Запускаем функцию каждую секунду (1000 миллисекунд)
setInterval(updateCountdown, 1000);

// Запускаем один раз сразу, чтобы не ждать секунду до первого обновления
updateCountdown();

// 1. Твоя база данных товаров (массив объектов)
const products = [
    { id: 1, name: "17 minute pro max", price: 1500, img: "images/watch1.png" },
    { id: 2, name: "5 minute lite", price: 500, img: "images/watch2.png" },
    { id: 3, name: "3 minute mini X", price: 220, img: "images/watch3.png" },
    { id: 4, name: "60 minute ViP", price: 2888, img: "images/watch4.png" },
    { id: 5, name: "30 minute pro", price: 1200, img: "images/watch5.png" },
    { id: 6, name: "10 minute standard", price: 800, img: "images/watch6.png" },
    { id: 7, name: "45 minute elite", price: 2000, img: "images/watch7.png" },
    { id: 8, name: "20 minute basic", price: 600, img: "images/watch8.png" },
    { id: 9, name: "15 minute classic", price: 900, img: "images/watch9.png" },
    { id: 10, name: "25 minute sport", price: 1100, img: "images/watch10.png" }
];

const grid = document.getElementById('productGrid');

// 2. Функция, которая рисует карточки на экране
function render(items) {
    grid.innerHTML = items.map(item => `
        <div class="product-card">
            <div class="product-image-container">
                <img src="${item.img}" alt="${item.name}" onerror="this.style.display='none'">
            </div>
            <h3 class="product-title">${item.name}</h3>
            <p class="product-price">${item.price}₴</p>
        </div>
    `).join('');
}

// 3. Главная функция фильтрации
function filter() {
    const searchVal = document.getElementById('searchInput').value.toLowerCase();
    const from = Number(document.getElementById('priceFrom').value) || 0;
    const to = Number(document.getElementById('priceTo').value) || Infinity;

    // Магия фильтрации: проверяем цену и буквы в названии
    const filtered = products.filter(p => {
        const matchesName = p.name.toLowerCase().includes(searchVal);
        const matchesPrice = p.price >= from && p.price <= to;
        return matchesName && matchesPrice;
    });

    render(filtered); // Перерисовываем только то, что подошло
}

// 4. Слушаем каждое нажатие клавиши или ввод цифры
document.getElementById('searchInput').addEventListener('input', filter);
document.getElementById('priceFrom').addEventListener('input', filter);
document.getElementById('priceTo').addEventListener('input', filter);

// Запускаем первый раз при загрузке
render(products);