'use strict';

let catalogOfGoods = document.querySelector('.catalog'),
    cartOfGoods = document.querySelector('.cart'),
    catalogHead = document.createElement('h2'),
    cartHead = document.createElement('h2');
catalogHead.textContent = 'Каталог: ';
//Добавляем заглавие для блока с каталогом
catalogOfGoods.append(catalogHead);

cartHead.textContent = 'Корзина: ';
//Добавляем заглавие для блока с выбранными товарами
cartOfGoods.append(cartHead);


//Вставляем конструктор из прошлого задания, поменял название с Shop на Goods
class Goods {
  constructor(item, cost, currency, quantity) {
    this.item = item;
    this.cost = cost;
    this.currency = currency;
    this.quantity = quantity;
  };
//Функция описания товара
  goodsInfo() {
    let infoGoods = document.createElement('p');
    infoGoods.className = 'goods';
    infoGoods.textContent = `Информация о товаре - ${this.item}  Цена: ${this.cost}, ${this.currency}`;
    catalogOfGoods.append(infoGoods);
  };

};

// создание товаров по конструктору
let keyboard = new Goods('Клавиатура', 1000, 'руб', 2);
let mouse = new Goods('Мыш', 500, 'руб', 3);
let touchpad = new Goods('Тач пад', 1500, 'руб', 1);
let processor = new Goods('Процессор', 5000, 'руб', 1);


//Конструктор Корзины с прошлого урока
class Cart {
  constructor(...items) {
    this.items = items;
  };
// Добавление в корзину
  addToCart(goods) {
    this.items.push(goods);
  };

// Суммирование товара в корзине
  countCartPrice() {
    let amount = 0;
    for (let goods in this.items) {
      amount += this.items[goods].cost * this.items[goods].quantity;
    }
    return amount;
  };
// Динамическая информация от том что находится вкорзине
  cartInfo() {
    let infoCartMessage = document.createElement('p');
    infoCartMessage.className = 'cart-info';
    let infoCart;
    let numberOfGoods = 0;
    if (this.items.length == 0) {
      infoCart = 'Корзина пуста  ';
    } else {
      for (let goods in this.items) {
        let quantity = this.items[goods].quantity;
        numberOfGoods += quantity;
      };
      infoCart = 'У Вас ' + numberOfGoods + ' товаров на сумму ' + this.countCartPrice() + 'рублей ';
    };
    infoCartMessage.textContent = infoCart;
    cartOfGoods.append(infoCartMessage);
  };
};

// объявляем что находится в каталоге
let basket = new Cart()
keyboard.goodsInfo();
mouse.goodsInfo();
touchpad.goodsInfo();
processor.goodsInfo();

// объявляем что находится у нас в корзине

basket.addToCart(keyboard);
basket.addToCart(touchpad);
basket.cartInfo();