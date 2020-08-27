//каталог возможных товаров для покупки

let catalogObj = {};

let list1;
let cart = {
    items: [],
};

function addToCart(item) {
    cart.items.push(item);
}

class Products {
    constructor(id, name, price, count, img) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.count = count;
        this.img = img;
    }
    render() {
        return `
        <div class ='product__item'>
        <div class="test__header">${this.name}</div>
        <img src='${this.img}' class="test__img"></img>
        <div class="test__count_wrapper">
        </div>
        <div class="test__price">${this.price}</div>
        <button class="bucket" data-id=${this.id}>add to bucket</button>
        </div>
    `;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        return this.goods = [
            { id: "0", name: "apples", price: 100, count: 1, img: './src/apple.png' },
            { id: "1", name: "chocolade", price: 25, count: 1, img: './src/choko.png' },
            { id: "2", name: "books", price: 1250, count: 1, img: './src/books.png' },
        ];
    }
    addToCatalog(item) {
        catalogObj[item.id] = item;
    }
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new Products(good.id, good.name, good.price, good.count, good.img);
            listHtml += goodItem.render();
            this.addToCatalog(good);
        });
        document.querySelector('#catalog__wrapper').innerHTML = listHtml;
    }
}

document.onclick = (event) => {
    if (event.target.classList.contains("plus")) {
        plusFunction(event.target.dataset.id);
    }
    if (event.target.classList.contains("minus")) {
        minusFunction(event.target.dataset.id);
    }
    if (event.target.classList.contains("bucket")) {
        addButton(event.target.dataset.id);
        // console.log(event.target.dataset.id);
    }
    if (event.target.classList.contains("form__item_changer")) {
        // adress();
    }
};


const plusFunction = (id) => {
    const found = cart.items.find((it) => it.id === id);
    if (found) {
        found.count++;
        list1.fetchGoodsInCart(cart);
        list1.render();

    }
};

const minusFunction = (id) => {
    let found;
    let index;

    cart.items.forEach((it, i) => {
        if (it.id === id) {
            found = it;
            index = i;
        }
    });

    if (found) {
        found.count--;

        if (!found.count) {
            cart.items.splice(index, 1);
        }

        list1.fetchGoodsInCart(cart);
        list1.render();
    }
};

const addButton = (id) => {
    const c = catalogObj[id].count;

    if (c === 0) catalogObj[id].count++;

    const cartItem = cart.items.find((it) => it.id === id);

    if (cartItem) {
        cartItem.count++;
        list1.fetchGoodsInCart(cart);
        list1.render();
        return;
    }

    addToCart(catalogObj[id]);
    list1 = new CartList();
    list1.fetchGoodsInCart(cart);
    list1.render();
};

const list = new GoodsList();
list.fetchGoods();
list.render();




class CartItems {
    constructor(id, name, price, count, img) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.count = count;
        this.img = img;
    }
    render() {
        return `<div class='goods__item'>
        <div class="item__header">${this.name}</div>
        <img src='${this.img}' class="test__img"></img>
        <div class="item__count_wrapper">
        <button class="button-primary minus" data-id="${this.id}">-</button>
        <div class="item__count">${this.count}</div>
        <button class="button-primary plus" data-id="${this.id}">+</button>
        </div>
        <div class="item__price">${this.price * this.count}</div></div>`;
    }
}

class CartList {
    constructor() {
        this.goodsInCart = [];
    }

    fetchGoodsInCart() {
        this.goodsInCart = cart;
    }
    render() {
        let listHtml = '';
        if (!cart.items.length) {
            document.querySelector('.cart_sum').innerHTML = "Корзина пустая";
            document.querySelector('.tab1').innerHTML = "Корзина пустая";
        } else {
            let str1 = '';
            cart.items.forEach((it) => {
                str1 += `${it.count} ${it.name} `;
            });
            document.querySelector('.cart_sum').innerHTML = `В корзине лежит ${str1}`;
            document.querySelector('.tab1').innerHTML = `В корзине лежит ${str1}`;
        }
        this.goodsInCart.items.forEach(good => {
            const cartItem = new CartItems(good.id, good.name, good.price, good.count, good.img);
            listHtml += cartItem.render();
            console.log(this.goodsInCart);

        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }
}

let testShit = new CartList();
testShit.render();