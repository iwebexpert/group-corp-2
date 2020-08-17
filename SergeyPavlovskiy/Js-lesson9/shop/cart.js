'use strict';

let container = document.querySelector('.container'),
  catalogOfGoods = document.querySelector('.catalog'),
  cartOfGoods = document.querySelector('.cart'), 
  goodsList = document.createElement('div'), 
  catalogHead = document.createElement('h2'),
  cartHead = document.createElement('h2'),
  catalogSumm = document.createElement('p'), 
  resetCart = document.createElement('button'); 

catalogOfGoods.classList.add('goods__catalog');
cartOfGoods.classList.add('goods__cart');

catalogHead.textContent = 'Каталог: ';
//Добавляем заглавие для блока с каталогом
catalogOfGoods.append(catalogHead);

cartOfGoods.append(goodsList);

//Добавляем заглавие для блока с выбранными товарами
cartHead.textContent = 'Корзина: ';
goodsList.append(cartHead);

//сообщение в корзине товаров
catalogSumm.textContent = 'Корзина пуста';
goodsList.append(catalogSumm);

//Кнопка очистки корзины
resetCart.className = 'button button--reset';
resetCart.textContent = 'Очистить корзину';

resetCart.addEventListener('click', () => {
  createCard.clearGoodsList();
  createCard.summElements();
  createCard.hideBtn();
});

class Goods {
  constructor(item, cost, currency, img) {
    this.item = item;
    this.cost = cost;
    this.currency = currency;
    this.img = img;
    this.createGoods();
  };
  createGoods() {
    //Див карточки товара
    let goods = document.createElement('div');
    goods.className = 'good__card';
    //Кнопка Добавить в корзину
    let goodsBtn = document.createElement('button');
    goodsBtn.className = 'button button--add';
    goodsBtn.textContent = 'Добавить в корзину';

    //Див обертка для изображения
    let goodsImgWrapper = document.createElement('div');
    goodsImgWrapper.className = 'goods__img';
    goods.appendChild(goodsImgWrapper);
    //Изображение
    let goodsImage = document.createElement('img');
    goodsImage.src = this.img;
    goodsImage.className = 'goods__image';
    goodsImgWrapper.appendChild(goodsImage);
    //Создаем заголовок для товара
    let goodsTitle = document.createElement('span');
    goodsTitle.className = 'goods__title';
    goodsTitle.textContent = `${this.item}`;
    goodsImgWrapper.appendChild(goodsTitle);
    //Создаем контент карточки
    let goodsDescription = document.createElement('div');
    goodsDescription.classList.add('goods__description');
    goodsDescription.innerHTML = `<p class="cost">${this.cost} ${this.currency}</p>`;
    goods.appendChild(goodsDescription);

    goodsBtn.addEventListener('click', () => {
      createCard.addItem(this);
      createCard.resetGoodsList();
      createCard.updateGoodsList();
      createCard.countBasketPrice();
      createCard.summElements();
    });
    // Добавим кнопку под описание
    goodsDescription.appendChild(goodsBtn);
    // Добавим карточки товаров под заголовок
    catalogHead.appendChild(goods);
  };
};
// Создаем элементы каталога
let keyboard = new Goods('Клавиатура', 1000, 'руб', "img/keyboard.jpg");
let mouse = new Goods('Мыш', 500, 'руб', "img/mouse.png");
let touchpad = new Goods('Тач пад', 1500, 'руб', "img/touchpad.jpg");
let processor = new Goods('Процессор', 5000, 'руб', "img/processor.png");


class Cart {
  constructor(items, cost) {
    this.items = [...items];
    this.cost = [...cost];
    this.summElements();
  }
  addItem(item) {
    this.items.push(item.item);
    this.cost.push(item.cost);
    console.log(this.items);
    console.log(this.cost);
  }
  countBasketPrice() {
		let sum = 0;
		for (let i = 0; i < this.cost.length; i++) {
			sum += this.cost[i];
		};
		this.finalPrice = sum;
	};

  summElements() {
    if (this.items.length !== 0) {
      catalogSumm.textContent = `У Вас ${this.items.length} товаров, на сумму: ${this.finalPrice} RUB`;
      this.showBtn();
    } else {
      catalogSumm.textContent = 'Корзина пуста';
      this.hideBtn();
    };
  };
  hideBtn() {
    if (cartOfGoods.contains(resetCart)) {
      cartOfGoods.removeChild(resetCart);
    };
  };
  showBtn() {
    if (!cartOfGoods.contains(resetCart)) {
      cartOfGoods.appendChild(resetCart);
    };
  };
  updateGoodsList() {
    for (let j = 0; j < this.items.length; j++) {
      let goodsItem = document.createElement('p');
      goodsItem.innerHTML = `${this.items[j]} ${this.cost[j]} RUB`;
      goodsList.appendChild(goodsItem);
    }
  };
  resetGoodsList() {
    goodsList.innerHTML = '';
  };
  clearGoodsList() {
    goodsList.innerHTML = '';
    this.items = [];
    this.prices = [];
  };
};
let createCard = new Cart([], []);
