class Product {
    constructor(id, name, quantity, valute, price, url) {
        this.id = id,
            this.name = name,
            this.quantity = quantity,
            this.valute = valute,
            this.price = price,
            this.url = url
    }

    getPriceOfProduct() {
        return this.price * this.quantity;
    }

}

class Backet {
    constructor(items) {
        this.result = '';
        this.totalPrice = 0;
        this.quantity = 0;
        this.basket = items;
    }

    quantityInCart() {
        for (let i = 0; i < this.basket.length; i++) {
            this.quantity += this.basket[i].quantity;
        }
        return `количество ${this.quantity}`;
    }

    countBasketPrice() {
        for (let i = 0; i < this.basket.length; i++) {
            this.totalPrice += this.basket[i].price * this.basket[i].quantity;
        }

        this.result = `сумма - ${this.totalPrice} ${this.basket[0].valute}`
        return this.result;
    }
}

const shorts = new Product('1', 'шорты', 1, 'RUB', 1200, './assets/shorts.jpg');
const shirt = new Product('2', 'майка', 1, 'RUB', 800, './assets/shirt.jpg');
const sneakers = new Product('3', 'кроссовки', 1, 'RUB', 3500, './assets/kross.jpg');

let options = {
    arrayCart: [],
}

function checkCart(element) {
    let totalPrice = document.querySelector('.totalPrice');
    options.arrayCart = [...options.arrayCart, element];

    let backet = new Backet(options.arrayCart);
    totalPrice.textContent = `${backet.countBasketPrice()} ${backet.quantityInCart()}`;
}

function clearBtn() {
    let totalPrice = document.querySelector('.totalPrice');
    options.arrayCart.length = 0;
    totalPrice.textContent = 'Корзина пуста';
}

function generationDOM(...elements) {
    if (options.arrayCart.length == 0) {
        document.querySelector('.totalPrice').textContent = 'Корзина пуста';
    }
    let cart = document.querySelector('#catalog');
    document.querySelector(".btn--clear").addEventListener('click', () => clearBtn())

    for (let i = 0; i < elements.length; i++) {
        let img = document.createElement("img");
        img.classList.add('img');
        img.setAttribute("src", `${elements[i].url}`)

        let element = document.createElement("div");
        element.classList.add('cart__item');

        let title = document.createElement("p");
        title.textContent = elements[i].name;

        let price = document.createElement("p");
        price.textContent = `${elements[i].price}  ${elements[i].valute}`;

        let buyBtn = document.createElement("button");
        buyBtn.classList.add('btn');
        buyBtn.textContent = 'В корзину';
        buyBtn.addEventListener('click', (e) => checkCart(elements[i]))

        element.append(img);
        element.append(title);
        element.append(price);
        element.append(buyBtn);

        cart.append(element);
    }
}

generationDOM(shorts, shirt, sneakers);


