class Item {
    constructor(product, currency, price, amount, img) {
        this.product = product;
        this.currency = currency;
        this.price = price;
        this.amount = amount;
        this.img = img;
    }
}

let apple = new Item('Яблоко', 'руб.', 127, 0, './assets/apple.jpg');
let orange = new Item('Апельсин', 'руб.', 98, 0, './assets/orange.jpg');
let pineapple = new Item('Ананас', 'руб.', 277, 0, './assets/pineapple.jpg');
let banana = new Item('Банан', 'руб.', 41, 0, './assets/banana.jpg');
let pear = new Item('Груша', 'руб.', 64, 0, './assets/pear.jpg');
let apricot = new Item('Персик', 'руб.', 77, 0, './assets/apricot.jpg');

class Basket {
    constructor(items) {
        this.items = [];
    }

    addItem(item, amount) {
        item.amount = amount;
        this.items.push([item, amount]);
    }

    removeItem(product) {
        return this.items = this.items.filter(el => el[0].product !== product.product);
    }

    totalPrice() {
        return this.items.map((el) => el[0].price * el[1]).reduce((a, b) => a + b, 0);
    }

    itemInfo() {
        for (const el of this.items) {
            return `${el[0].product} стоимостью ${el[0].price} ${el[0].currency} в количестве ${el[1]} штук`;
        }
    }

    images(img) {
        return img.img;
    }
}

const myBasket = new Basket();


const basketInfo = document.createElement("div");
document.body.append(basketInfo);
basketInfo.textContent = 'Ваша корзина пуста. Нажите "добавить", чтобы продолжить покупки.';
basketInfo.className = 'basketInfo';

const totalInfo = document.createElement('div');
document.body.append(totalInfo);
totalInfo.className = 'totalInfo';

const title = document.createElement("h2");
title.textContent = 'Добро пожаловать в интернет-магазин!';
document.body.prepend(title);
title.className = 'title';


const product = (fruit, p) => {
    let itemCard = document.getElementById('itemCard');
    let block = document.createElement("div");
    block.className = 'block';
    itemCard.append(block);
    block.textContent = `${p}`;

    const img = document.createElement('img');
    let image = myBasket.images(fruit);
    img.src = image;
    block.append(img);
    img.className = 'img';

    let input = document.createElement("input");
    input.className = 'input';
    block.append(input);

    let addFruit = document.createElement("button");
    addFruit.textContent = 'Добавить в корзину';
    addFruit.className = "addFruit";
    block.append(addFruit);

    addFruit.addEventListener("click", () => {
        myBasket.addItem(fruit, input.value);
        basketInfo.textContent = `${myBasket.itemInfo()}`;
        totalInfo.textContent = `Cтоимость всех товаров в корзине: ${myBasket.totalPrice()}`;
    })

    let removeFruit = document.createElement("button");
    removeFruit.className = "removeFruit";
    removeFruit.textContent = 'Убрать из корзины';
    block.append(removeFruit);

    removeFruit.addEventListener("click", () => {
        myBasket.removeItem(fruit, input.value);
        basketInfo.textContent = `Корзина очищена`;
        totalInfo.textContent = `Cтоимость всех товаров в корзине: ${myBasket.totalPrice()}`
    })
}


product(apple, 'Яблоко');
product(orange, 'Апельсин');
product(pineapple, 'Ананас');
product(banana, 'Банан');
product(pear, 'Груша');
product(apricot, 'Персик');