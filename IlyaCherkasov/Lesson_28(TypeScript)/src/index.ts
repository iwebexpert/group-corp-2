import './style.css';

let goodsButton1: HTMLElement | null = document.getElementById('goods__item_add1');
let goodsButton2: HTMLElement | null = document.getElementById('goods__item_add2');
let goodsButton3: HTMLElement | null = document.getElementById('goods__item_add3');
let amount1: HTMLInputElement | null = document.querySelector('#goods__item_amount1');
let amount2: HTMLInputElement | null = document.querySelector('#goods__item_amount2');
let amount3: HTMLInputElement | null = document.querySelector('#goods__item_amount3');
let busketBlock: Element | null = document.querySelector('.Busket');
let goods: Element | null = document.querySelector('.goods');
let price: number = 0;
let allamount: number = 0;

let busketword: HTMLHeadingElement = document.createElement('h3');
busketword.classList.add('busket_word');
busketword.innerHTML = "Корзина";

let hrLine: HTMLHRElement = document.createElement('hr');

let totalPriceBasket: HTMLDivElement = document.createElement('div');
totalPriceBasket.innerHTML = `Цена корзины: ${price}`;
totalPriceBasket.classList.add('totalPriceBlock');

interface Items {
    name: string,
    cost: number,
    amount: number
}

let itemsInBasket: Array<Items> = [];

function addToBasket(items: Items): void {
    itemsInBasket.push(items);
    let busketList: HTMLDivElement = document.createElement('div');
    busketList.classList.add('busketItem');
    let deleteBtn: HTMLButtonElement = document.createElement('button');
    deleteBtn.innerHTML = "Удалить из корзины";
    for (let i = 0; i <= itemsInBasket.length; i++) {
        if (i == itemsInBasket.length) {
            busketList.innerHTML =
                `${itemsInBasket[i - 1].name} стоимость ${itemsInBasket[i - 1].cost} количество ${itemsInBasket[i - 1].amount}`;
        }
    }
    allamount = 0;
    for (let i = 0; i < itemsInBasket.length; i++) {
        allamount += itemsInBasket[i].amount;
    }

    if (busketBlock) busketBlock.appendChild(busketList);
}

function totalPrice(): void {
    price = 0;
    for (let i = 0; i < itemsInBasket.length; i++) {
        price += itemsInBasket[i].cost * itemsInBasket[i].amount;
    }
    totalPriceBasket.innerHTML = `В корзине ${allamount} товар(а/ов) на сумму ${price} рублей`;
}

if (goodsButton1) {
    goodsButton1.onclick = function () {
        if (amount1 && goods && busketBlock) {
            let chair: Items = { name: 'Стул', cost: 3599, amount: +amount1.value };
            goods.after(busketword);
            addToBasket(chair);
            busketBlock.after(hrLine);
            hrLine.after(totalPriceBasket);
            totalPrice();
        }
    }
}

if (goodsButton2) {
    goodsButton2.onclick = function () {
        if (amount2 && goods && busketBlock) {
            let table: Items = { name: 'Стол', cost: 8900, amount: +amount2.value };
            goods.after(busketword);
            addToBasket(table);
            busketBlock.after(hrLine);
            hrLine.after(totalPriceBasket);
            totalPrice();
        }
    }
}

if (goodsButton3) {
    goodsButton3.onclick = function () {
        if (amount3 && goods && busketBlock) {
            let lamp: Items = { name: 'Лампа', cost: 680, amount: +amount3.value };
            goods.after(busketword);
            addToBasket(lamp);
            busketBlock.after(hrLine);
            hrLine.after(totalPriceBasket);
            totalPrice();
        }
    }
}