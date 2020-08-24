//Конструктор новых товаров
class Product {
    constructor(item) {
        const { id, name, price, count, img } = item;

        this.id = id;
        this.name = name;
        this.price = price;
        this.count = count;
        this.img = img;

    }
}

let catalogObj = {

};
let cart = {
    items: [],
};

function addToCart(item) {
    cart.items.push(item);
    renderCart();
}

let newBuy = new Product({ id: "1", name: "apples", price: 100, count: 1, img: 'src/apple.png' });
let newBuy1 = new Product({ id: "2", name: "chocolade", price: 25, count: 1, img: 'src/choko.png' });
let newBuy2 = new Product({ id: "3", name: "books", price: 1250, count: 1, img: 'src/books.png' });

function addToCatalog(item) {
    catalogObj[item.id] = item;
}

addToCatalog(newBuy);
addToCatalog(newBuy1);
addToCatalog(newBuy2);

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
    if (event.target.classList.contains("form__item_changer")) {
        adress();
    }
};

const plusFunction = (id) => {
    const found = cart.items.find((it) => it.id === id);
    if (found) {
        found.count++;
        renderCart();

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

        renderCart();

    }
};

const addButton = (id) => {
    const c = catalogObj[id].count;

    if (c === 0) catalogObj[id].count++;

    const cartItem = cart.items.find((it) => it.id === id);

    if (cartItem) {
        cartItem.count++;
        renderCart();
        return;
    }

    addToCart(catalogObj[id]);

};

const createShopItem = (product) => {
    testCat = document.createElement("div");
    testCat.innerHTML = `
        <div class="test__header">${product.name}</div>
        <img src='${product.img}' class="test__img"></img>
        <div class="test__count_wrapper">
        </div>
        <div class="test__price">${product.price}</div>
        <button class="bucket" data-id=${product.id}>add to bucket</button>
    `;
    testCat.className = "test__shop";
    document.querySelector("#catalog__wrapper").appendChild(testCat);
};

createShopItem(newBuy);
createShopItem(newBuy1);
createShopItem(newBuy2);

const catalog = document.querySelector("#catalog");

const renderCart = () => {
    const wrapper = catalog.querySelector(".products__wrapper");
    const basket = catalog.querySelector(".basket__wrapper");
    const newWrapper = document.createElement("div");
    newWrapper.classList.add("products__wrapper");
    const newBasket = document.createElement("div");
    newBasket.classList.add("basket__wrapper");

    for (const item of cart.items) {
        const el = document.createElement("div");
        el.classList.add("item");
        el.innerHTML = `<div class="item__header">${item.name}</div>
        <img src='${item.img}' class="test__img"></img>
        <div class="item__count_wrapper">
        <button class="button-primary minus" data-id="${item.id}">-</button>
        <div class="item__count">${item.count}</div>
        <button class="button-primary plus" data-id="${item.id}">+</button>
        </div>
        <div class="item__price">${item.price * item.count}</div>`;
        newWrapper.appendChild(el);
    }

    if (!cart.items.length) {
        newBasket.innerHTML = "Корзина пустая";
    } else {
        let total = 0;
        let count = 0;

        cart.items.forEach((it) => {
            total += it.price * it.count;
            count += it.count;
        });

        newBasket.innerHTML = `в корзине ${count} товаров на сумму ${total} рублей`;
    }

    if (wrapper) {
        wrapper.replaceWith(newWrapper);
    } else {
        catalog.appendChild(newWrapper);
    }

    if (basket) {
        basket.replaceWith(newBasket);
    } else {
        catalog.appendChild(newBasket);
    }
    confirmForm();
};

renderCart();

function confirmForm() {
    const modalWrapper = catalog.querySelector(".modal__wrapper");
    const NewModalWrapper = document.createElement("div");
    NewModalWrapper.classList.add("modal__wrapper");



    const modalTrigger = document.querySelector('[data-modal]');

    const cartView = document.querySelector(".modal__item");
    const NewCartView = document.createElement('div');
    NewCartView.classList.add("modal__item");
    // NewCartView.classList.add("show");

    const modal = document.querySelector('.modal');
    const modalItem = document.querySelector('.modal__items');

    // if (!cart.items.length) {
    //     NewCartView.innerHTML = "Корзина пустая";
    // } else {

    //     let str1 = '';
    //     cart.items.forEach((it) => {
    //         str1 += `${it.count} ${it.name} `;
    //     });
    //     NewCartView.innerHTML = `В корзине лежит ${str1}`;
    // }
    // if (cartView) {
    //     cartView.replaceWith(NewCartView);
    // } else {
    //     modalItem.prepend(NewCartView);
    // }


    const modalCloseBtn = document.querySelector('[data-close]');

    modalTrigger.addEventListener('click', () => {
        modal.classList.add('show');
        modal.classList.remove('hide');
    });

    modalCloseBtn.addEventListener('click', () => {
        modal.classList.add('hide');
        modal.classList.remove('show');
    });




}


function adress() {

    const adrBuy = document.querySelector('#adress').value;
    const comBuy = document.querySelector('#comment').value;
    const testSH = document.querySelector('.testSH');
    //Мне просто интересно, получиттся ли создать так элемент
    const modalForm = document.querySelector('.modal__form');
    const modalSummary = document.createElement('div');
    modalSummary.classList.add('modal__item');
    const cartModalView = document.querySelector('.testSH');


    let str1 = '';
    cart.items.forEach((it) => {
        str1 += `${it.count} ${it.name} `;
    });

    cartModalView.textContent = `В корзине: ${str1}`;

    modalSummary.textContent = `${str1}, которые будут доставлены по адресу ${adrBuy}. Комментарий к заказу: ${comBuy}`;
    modalForm.appendChild(modalSummary);





    console.log(adrBuy, comBuy, testSH.textContent);
}