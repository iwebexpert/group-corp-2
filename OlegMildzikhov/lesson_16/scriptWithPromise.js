//каталог возможных товаров для покупки

let catalogObj = {};

let list1;
let cart = {
    items: [],
};


const basketJSON = async() => {
    new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        let goodsArr123 = [];
        xhr.open('GET', '/basket');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status !== 200) {
                    reject(xhr.status);
                } else {
                    if (cart.items.length > 0) {
                        cart.items.length = 0;
                    }
                    const goodsJSON = JSON.parse(xhr.response);
                    console.log(goodsJSON);
                    goodsJSON.forEach((item) => {
                        cart.items.push(item);
                    });
                    resolve();
                }
            }
        };
        xhr.send();
        console.log('work!');
    });
};


const addToCartJSON = async(item) => {
    const data = await fetch('/basket', {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
            'Content-type': 'application/json',
        },
    });
    basketJSON();
};
const plusFunctionJSON = async(item) => {
    const data = await fetch(`/basket/${item.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ count: item.count + 1 }),
        headers: {
            'Content-type': 'application/json',
        },
    });
    basketJSON();
};
const minusFunctionJSON = async(item) => {
    const data = await fetch(`/basket/${item.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ count: item.count - 1 }),
        headers: {
            'Content-type': 'application/json',
        },
    });
    basketJSON();
};

const deleteFunctionJSON = async(item) => {
    const data = await fetch(`/basket/${item.id}`, {
        method: 'DELETE',
    });
    basketJSON();
};

function addToCart(item) {
    // cart.items.push(item);

    addToCartJSON(item);
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
        return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                let goodsArr = [];
                xhr.open('GET', '/goods');
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (xhr.status !== 200) {
                            reject(xhr.status);
                        } else {
                            const goodsJSON = JSON.parse(xhr.response);
                            console.log(goodsJSON);
                            goodsJSON.forEach((item) => {
                                goodsArr.push(item);
                            });
                            resolve();
                        }
                    }
                };
                xhr.send();
                this.goods = goodsArr;
                return this.goods;
            })
            .then(() => {
                this.render();
            });
    }
    addToCatalog(item) {
        catalogObj[item.id] = item;
    }
    render() {
        console.log('start render');
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
    }
};


const plusFunction = (id) => {
    const found = cart.items.find((it) => it.id === id);



    if (found) {
        found.count++;
        list1.fetchGoodsInCart(cart);
        list1.render();
        console.log(found.count);
        plusFunctionJSON(found);
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
            deleteFunctionJSON(found);
        }

        list1.fetchGoodsInCart(cart);
        list1.render();
        minusFunctionJSON(found);
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
        plusFunctionJSON(cartItem);
        return;
    }
    addToCartJSON(catalogObj[id]);
    list1 = new CartList();
    list1.fetchGoodsInCart(cart);
    list1.render();
};

const list = new GoodsList();
list.fetchGoods();


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
        return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                let goodsArr = [];
                xhr.open('GET', '/basket');
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (xhr.status !== 200) {
                            reject(xhr.status);
                        } else {
                            const goodsJSON = JSON.parse(xhr.response);
                            console.log(goodsJSON);
                            goodsJSON.forEach((item) => {
                                goodsArr.push(item);
                            });
                            resolve();
                        }
                    }
                };
                xhr.send();
                this.goodsInCart = goodsArr;
                return this.goodsInCart;
            })
            .then(() => {
                this.render();
            });
    }
    render() {
        let listHtml = '';
        if (!cart.items.length) {
            document.querySelector('.cart_sum').innerHTML = "Корзина пустая";
            document.querySelector('.tab1').innerHTML = "Корзина пустая";
        } else {
            let str1 = '';
            let total = 0;
            cart.items.forEach((it) => {
                str1 += `${it.count} ${it.name} `;
                total += it.price * it.count;
            });
            document.querySelector('.cart_sum').innerHTML = `В корзине лежит ${str1} на сумму ${total}`;
            document.querySelector('.tab1').innerHTML = `В корзине лежит ${str1} на сумму ${total}`;
        }
        console.log(this.goodsInCart);
        this.goodsInCart.forEach(good => {
            const cartItem = new CartItems(good.id, good.name, good.price, good.count, good.img);
            listHtml += cartItem.render();
            console.log(this.goodsInCart);
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }
    sumOfAllItems() {
        let totalSum = 0;
        cart.items.forEach((it) => {
            totalSum += it.price * it.count;
        });
        return totalSum;
    }
}

let starCart = new CartList();
starCart.render();