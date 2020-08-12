//Задание 2 Корзина магазина
//Найду все DOM элементы
let input1 = document.getElementById('goods__item_amount1');
let input2 = document.getElementById('goods__item_amount2');
let input3 = document.getElementById('goods__item_amount3');
let goodsButton1 = document.getElementById('goods__item_add1');
let goodsButton2 = document.getElementById('goods__item_add2');
let goodsButton3 = document.getElementById('goods__item_add3');
let amount1 = document.querySelector('#goods__item_amount1');
let amount2 = document.querySelector('#goods__item_amount2');
let amount3 = document.querySelector('#goods__item_amount3');
let busketBlock = document.querySelector('.Busket');
let goods = document.querySelector('.goods');

//Некоторые нужные переменные
var price = 0;
var allamount = 0;

//Создам элементы корзины
let busketword = document.createElement('h3');
busketword.classList.add('busket_word');
busketword.innerHTML = "Корзина";

let hrLine = document.createElement('hr');

let totalPriceBasket = document.createElement('div');
totalPriceBasket.innerHTML = `Цена корзины: ${price}`;
totalPriceBasket.classList.add('totalPriceBlock');



//Описываю классы
class Items {
    constructor(name, cost, amount) {
        this.name = name;
        this.cost = cost;
        this.amount = amount;
    }
}

class Basket {
    constructor() {
        this.itemsInBasket = [];
    }
    addToBasket(items) {
        this.itemsInBasket.push(items);
        let busketList = document.createElement('div');
        busketList.classList.add('busketItem');
        let deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = "Удалить из корзины";
        for (let i = 0; i <= this.itemsInBasket.length; i++) {
            if (i == this.itemsInBasket.length) {
                busketList.innerHTML = `${this.itemsInBasket[i - 1].name} стоимость ${this.itemsInBasket[i - 1].cost} количество ${this.itemsInBasket[i - 1].amount}`;
                //deleteBtn.classList.add('goods__deletebtn' + [i], "goods__deletebtn");
            }
        }
        allamount = 0;
        for (let i = 0; i < this.itemsInBasket.length; i++) {
            allamount += this.itemsInBasket[i].amount;
            console.log(allamount);
        }
        busketBlock.appendChild(busketList);
        //busketList.appendChild(deleteBtn);
    }
    /*
    deleteFromBasket(itemname) {
        for (let i = 0; i < this.itemsInBasket.length; i++) {
            if (this.itemsInBasket[i].name == itemname) {
                this.itemsInBasket.pop();
                console.log("Товар удален успешно");
                return;
            }
        }
        console.log('Товара не найдено в корзине')
    }*/
    totalPrice() {
        price = 0;
        for (let i = 0; i < this.itemsInBasket.length; i++) {
            price += this.itemsInBasket[i].cost * this.itemsInBasket[i].amount;
        }
        totalPriceBasket.innerHTML = `В корзине ${allamount} товар(а/ов) на сумму ${price} рублей`;
    }
}

let mainBasket = new Basket();

//Описываю нажатия на кнопки
document.getElementById('goods__item_add1').onclick = function () {
    let chair = new Items('Стул', 3599, +amount1.value);
    goods.after(busketword);
    mainBasket.addToBasket(chair);
    busketBlock.after(hrLine);
    hrLine.after(totalPriceBasket);
    mainBasket.totalPrice();
}

document.getElementById('goods__item_add2').onclick = function () {
    let table = new Items('Стол', 8900, +amount2.value);
    goods.after(busketword);
    mainBasket.addToBasket(table);
    busketBlock.after(hrLine);
    hrLine.after(totalPriceBasket);
    mainBasket.totalPrice();
}

document.getElementById('goods__item_add3').onclick = function () {
    let lamp = new Items('Лампа', 680, +amount3.value);
    goods.after(busketword);
    mainBasket.addToBasket(lamp);
    busketBlock.after(hrLine);
    hrLine.after(totalPriceBasket);
    mainBasket.totalPrice();
}