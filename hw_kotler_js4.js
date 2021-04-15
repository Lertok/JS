// 1. Написать функцию, преобразующую число в объект. Передавая на вход число от 0 до 999,
// надо получить на выходе объект, в котором в соответствующих свойствах описаны единицы,
// десятки и сотни. Например, для числа 245 надо получить следующий объект: {‘единицы’: 5,
// ‘десятки’: 4, ‘сотни’: 2}. Если число превышает 999, необходимо выдать соответствующее
// сообщение с помощью console.log и вернуть пустой объект.

function CutNumber(Number) {

    this.init = function (Num) {
        if (0 < parseInt(Num) && parseInt(Num) < 1000) {
            this.сотни = parseInt(Num / 100);
            this.десятки = parseInt((Num - this.сотни * 100) / 10);
            this.единицы = parseInt(Num - this.десятки * 10 - this.сотни * 100);
        } else {
            if (typeof (this.единицы) != "undefined") {
                delete this.сотни;
                delete this.десятки;
                delete this.единицы;
            }
        }
    }

    this.init(Number);
}


let testNum = new CutNumber(21);
console.log(testNum);

// 2. Продолжить работу с интернет-магазином:
// a. В прошлом домашнем задании вы реализовали корзину на базе массивов. Какими
// объектами можно заменить их элементы?
// b. Реализуйте такие объекты.
// c. Перенести функционал подсчета корзины на объектно-ориентированную базу.

function Basket(title, description, image, price = 0, quantity = 1) {
    this.title = title;
    this.description = description;
    this.image = `../assets/img/${image}.png`;
    this.price = price;
    this.quantity = quantity
}

const goods = [];

goods.push(
    new Basket('Jacket', 'asdfsgfagsg', '0001', 15000)
)

goods.push(
    new Basket('Socks', 'asdfsgfagsg', '0002', 500, 7)
)

goods.push(
    new Basket('Boots', 'asdfsgfagsg', '0003', 7000)
)

goods.push(
    new Basket('T-shirt', 'asdfsgfagsg', '0004', 2000, 4)
)

console.log(goods)

function getViewCount(goods) {
    return goods.reduce(function (acc, basket) {
        return acc + (basket.price * basket.quantity)
    }, 0)
}

console.log(`Стоимость выбранных товаров: ${getViewCount(goods)} рублей`)

// 3. * Подумать над глобальными сущностями. К примеру, сущность «Продукт» в
// интернет-магазине актуальна не только для корзины, но и для каталога. Стремиться нужно к
// тому, чтобы объект «Продукт» имел единую структуру для различных модулей сайта, но в
// разных местах давал возможность вызывать разные методы.

// section - раздел
// title - Наименование товара
// description - описание товара
// reviews - отзывы
// recommendation - рекомендации похожих товаров
// relatedProducts - сопутствующие товары
// image - картинка
// price - цена
// discount - скидка
// quantity - количество
// product_views - просмотры товара - указывает на популярность
// orders_per_month - заказов за месяц - указывает на популярность товара, может стимулировать к заказу
