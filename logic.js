// Январ - 0, Дек- 11. 
const targetDate = new Date(2026, 4, 19, 0, 0, 0); // Пример:  2026год, Май (4), 15 число, 00:00:00

function updateCountdown() {
    const now = new Date(); // Текущее время
    const diff = targetDate - now; // Разница в миллисекундах

    if (diff <= 0) {
        document.getElementById('countdown').innerText = "ОТКРЫТО!";
        return;
    }

    // дни, часы, минуты секунды
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    // Формат числа, чтобы было две цифры (01, 02а не просто 1, 2)
    const fDays = days.toString().padStart(2, '0');
    const fHours = hours.toString().padStart(2, '0');
    const fMinutes = minutes.toString().padStart(2, '0');
    const fSeconds = seconds.toString().padStart(2, '0');

    // Выводим результат в твой <span> в HTML
    document.getElementById('countdown').innerText = `${fDays} Днів ${fHours}:${fMinutes}:${fSeconds}`;
}

const settingsBtn = document.getElementById('settingsBtn');
const settingsPopup = document.getElementById('settingsPopup');
const themeCheckbox = document.getElementById('themeCheckbox');

// Открыть/закрыть окошко
settingsBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    settingsPopup.classList.toggle('active');
});

// Закрыть окно, если кликнули мимо
document.addEventListener('click', () => settingsPopup.classList.remove('active'));
settingsPopup.addEventListener('click', (e) => e.stopPropagation());

// Переключатель темы
themeCheckbox.addEventListener('change', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// Проверка при загрузке
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-theme');
    themeCheckbox.checked = true;
}

// 1 сек 1000 миллисек
setInterval(updateCountdown, 1000);
updateCountdown();

// БАЗА данных товаров (массив объектов)
const products = [
    { id: 1, name: "17 minute pro max", price: 1500, time: 17, img: "images/watch1.png" },
    { id: 2, name: "5 minute lite", price: 500, time: 5, img: "images/watch2.png" },
    { id: 3, name: "3 minute mini X", price: 220, time: 3, img: "images/watch3.png" },
    { id: 4, name: "60 minute ViP", price: 2888, time: 60, img: "images/watch4.png" },
    { id: 5, name: "30 minute pro", price: 1200, time: 30, img: "images/watch5.png" },
    { id: 6, name: "10 minute standard", price: 800, time: 10, img: "images/watch6.png" },
    { id: 7, name: "45 minute elite", price: 2000, time: 45, img: "images/watch7.png" },
    { id: 8, name: "20 minute basic", price: 600, time: 20, img: "images/watch8.png" },
    { id: 9, name: "15 minute classic", price: 900, time: 15, img: "images/watch9.png" },
    { id: 10, name: "25 minute sport", price: 1100, time: 25, img: "images/watch10.png" }
];



const grid = document.getElementById('productGrid');

// котораЯ рисует карточки на экране
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

// Главная функция фильтрации
function filter() {
    const searchVal = document.getElementById('searchInput').value.toLowerCase();
    
    // Цены
    const priceFrom = Number(document.getElementById('priceFrom').value) || 0;
    const priceTo = Number(document.getElementById('priceTo').value) || Infinity;
    
    // Время (берем либо из полей ввода, либо из ползунка)
    const timeFrom = Number(document.getElementById('timeFrom').value) || 0;
    const timeToInput = Number(document.getElementById('timeTo').value);
    const sliderVal = Number(document.getElementById('timeSlider').value);
    
    // Если поле "до" пустое, используем значение ползунка
    const timeTo = timeToInput || sliderVal;

    const filtered = products.filter(p => {
        const matchesName = p.name.toLowerCase().includes(searchVal);
        const matchesPrice = p.price >= priceFrom && p.price <= priceTo;
        const matchesTime = p.time >= timeFrom && p.time <= timeTo;
        
        return matchesName && matchesPrice && matchesTime;
    });

    render(filtered);
}

// Добавляем новых "слушателей" для полей времени и ползунка
document.getElementById('timeFrom').addEventListener('input', filter);
document.getElementById('timeTo').addEventListener('input', filter);
document.getElementById('timeSlider').addEventListener('input', (e) => {
    // Чтобы было красиво: при движении ползунка обновляем цифру в поле "до"
    document.getElementById('timeTo').value = e.target.value;
    filter();
});
render(products);