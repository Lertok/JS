// 2. Сделать генерацию корзины динамической: верстка корзины не должна находиться в HTML-структуре.
//  Там должен быть только div, в который будет вставляться корзина, сгенерированная на базе JS:
// a. Пустая корзина должна выводить строку «Корзина пуста»;
// b. Наполненная должна выводить «В корзине: n товаров на сумму m рублей».

// 3. * Сделать так, чтобы товары в каталоге выводились при помощи JS:
// a. Создать массив товаров (сущность Product);
// b. При загрузке страницы на базе данного массива генерировать вывод из него.
//  HTML-код должен содержать только div id=”catalog” без вложенного кода.
//   Весь вид каталога генерируется JS.

let product = [
    {
        title: 'Банан',
        count: 1,
        cost: '50'
    },
    {
        title: 'Шпроты',
        count: 1,
        cost: '80'
    },
    {
        title: 'Кабачки',
        count: 5,
        cost: '30'
    }
]

let cart = document.getElementById('cart');
let catalog = document.getElementById('catalog');
let resSum = 0;
let resCount = 0;
let resName = ' ';


function fillingCart(product) {
    product.forEach(el => resSum += el.count * el.cost);
    product.forEach(el => resCount += el.count);
    product.forEach(el => resName += el.title + ' ');
    console.log(resCount)
    if (resSum === 0 && resCount === 0) {
        cart.textContent = "Корзина пуста"
    }
    cart.textContent = `В корзине: ${resCount} товаров на сумму ${resSum} рублей`
    catalog.textContent = `Каталог: ${resName} `

}

fillingCart(product);