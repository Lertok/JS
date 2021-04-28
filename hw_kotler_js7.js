function Item(id, name, price = 0, quantity = 1) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
}
let catItems = [];
catItems.push(new Item(catItems.length, "Джинсы", 4500));
catItems.push(new Item(catItems.length, "Куртка", 11000));
catItems.push(new Item(catItems.length, "Носки", 500));
catItems.push(new Item(catItems.length, "Ботинки", 8000));

let cartItems = [];

function getBasketPrice(arrayProd) {
    let sumBasketPrice = 0;
    for (item of arrayProd) {
        sumBasketPrice += item.price * item.quantity;
    }
    return sumBasketPrice;
}
function getBasketQuantity(arrayProd) {
    let sumBasketQuantity = 0;
    for (item of arrayProd) {
        sumBasketQuantity += item.quantity;
    }
    return sumBasketQuantity;
}
console.log(getBasketPrice(cartItems));

function showCat() {
    catItems.forEach(function (item) {
        drawCatItem(item);
    });
}

function drawCatItem(item) {
    const $catList = document.querySelector("#catalog");
    const catItemHtml = `<div id="cat-item-${item.id}" class="cat-item">      
          <p class="cat-item__title">${item.name}</p>
          <p class="cat-item__price">${item.price}</p>
          <button data-id="${item.id}" class="cat-item__btn">buy</button>
        </div>`;
    $catList.insertAdjacentHTML("beforeend", catItemHtml);

    $item = $catList.querySelector(`#cat-item-${item.id}`);
    $btnBuy = $item.querySelector("button");

    $btnBuy.addEventListener("click", function () {
        let itemFind = false;
        cartItems.forEach((cartItem) => {
            if (cartItem.id == item.id) {
                itemFind = !itemFind;
                cartItem.quantity = cartItem.quantity + item.quantity;
            }
        });
        if (!itemFind) {
            cartItems.push(new Item(item.id, item.name, item.price));
        }
        showCart();
        showCartItems();
    });
}
showCat();

function showCart() {
    const $cart = document.querySelector("#cart");

    if (cartItems.length !== 0) {
        $cart.textContent = `в корзине ${getBasketQuantity(
            cartItems
        )} товаров, на сумму  ${getBasketPrice(cartItems)} рублей`;
    } else {
        $cart.textContent = "корзина пуста";
    }
}
showCart();

// Реализовать страницу корзины:
// Добавить возможность не только смотреть состав корзины, но и редактировать его, обновляя общую стоимость или выводя сообщение «Корзина пуста».
const $popupCart = document.querySelector("div.popup-cart");
const $popupCartSec = $popupCart.querySelectorAll("section");
const $cartList = document.querySelector("div.cart-items");
function showCartItems() {
    $cartList.textContent = "";
    cartItems.forEach(function (item) {
        drawCartItem(item);
    });
}

function drawCartItem(item) {
    const cartItemHtml = `<div id="cart-item-${item.id}" class="cart-item">
          <div class="cart-item__id">${item.id}</div>      
          <div class="cart-item__title">${item.name}</div>
          <div class="cart-item__quant">${item.quantity}</div>
          <div class="cart-item__price">${item.price}</div>
          <button data-id="${item.id}" class="cart-item__btn">delete</button>
        </div>`;
    $cartList.insertAdjacentHTML("beforeend", cartItemHtml);

    $item = $cartList.querySelector(`#cart-item-${item.id}`);
    $btnDel = $item.querySelector("button");

    $btnDel.addEventListener("click", function () {
        cartItems = cartItems.filter(function (itemcart, i) {
            return itemcart.id !== item.id;
        });

        showCartItems();

        showCart();
    });
}
const $btnCartNext = document.querySelector("button#cart-next");
const $btnShowCart = document.querySelector("button#cart-show");
$btnShowCart.addEventListener("click", function () {
    hidePopupCartSec();
    $popupCartSec[0].style.display = "block";
    $btnCartNext.style.display = "block";
    showCartItems();
});

// На странице корзины:
// Сделать отдельные блоки «Состав корзины», «Адрес доставки», «Комментарий»;
// Сделать эти поля сворачиваемыми;
// Заполнять поля по очереди, то есть давать посмотреть состав корзины, внизу которого есть кнопка «Далее». Если нажать ее, сворачивается «Состав корзины» и открывается «Адрес доставки» и так далее.

hidePopupCartSec();
$btnCartNext.style.display = "none";
function hidePopupCartSec() {
    $popupCartSec.forEach((sec) => {
        sec.style.display = "none";
    });
}
function showPopupCartSec() {
    let currentShowSec = 0;
    let inxShowSec = currentShowSec;
    $popupCartSec.forEach((sec, i) => {
        if (sec.style.display === "block") {
            currentShowSec = i;
        }
    });
    currentShowSec < $popupCartSec.length - 1
        ? (inxShowSec = currentShowSec + 1)
        : (inxShowSec = 0);
    hidePopupCartSec();
    console.log(inxShowSec, currentShowSec);
    !inxShowSec ? showCartItems() : showCart();
    $popupCartSec[inxShowSec].style.display = "block";
}
$btnCartNext.addEventListener("click", function () {
    showPopupCartSec();
});