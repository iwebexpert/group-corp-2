class Item {
    constructor(product, currency, price, amount, img) {
        this.product = product;
        this.currency = currency;
        this.price = price;
        this.amount = amount;
        this.img = img;
    };
};

class Basket {
    constructor(items) {
        this.items = [];
    };

    addItem(item, amount) {
        item.amount = amount;
        if (amount && amount > 0) {
            this.items.push([item, amount]);
        };
    };

    removeItem(item) {
        this.items.forEach(function (el, id, object) {
            if (el[0].product === item.product) {
                object.splice(id, 1);
            };
        });
    };

    clearInput(target) {
        if (target.value) {
            target.value = "";
        };
    };
    clearBasket(item) {
        return this.items = this.items.filter(el => el[0].item !== product.item);
    };

    totalPrice() {
        return this.items.map((el) => el[0].price * el[1]).reduce((a, b) => a + b, 0);
    };

    itemInfo() {
        let str = ``;
        for (const el of this.items) {
            str += `${el[0].product} стоимостью ${el[0].price} ${el[0].currency} в количестве ${el[1]} штук <br> <hr>`;
        };
        return str;
    };

    itemFinalInfo() {
        let str = ``;
        for (const el of this.items) {
            str += `${el[0].product}<br>(Количество: ${el[1]}) <hr>`;
        };
        return str;
    }

    badgeCount() {
        return this.items.map(el => el[0]).map(qq => +qq.amount).reduce((a, b) => a + b);
    }

    renderItem(guitar, text) {
        const block = document.createElement("div");
        block.className = 'block';
        itemCard.append(block);
        block.textContent = `${text}`;

        const img = document.createElement('img');
        img.src = guitar.img[0];
        img.className = 'img';
        block.append(img);
        img.dataset.toggle = 'modal';
        img.dataset.target = '#exampleModal';

        const modal = document.querySelector('.modal')
        block.append(modal);

        img.addEventListener('click', (e) => {
            if (e.srcElement.currentSrc.includes('fender')) {
                const carouselItems = document.querySelector(".carousel-inner");
                carouselItems.innerHTML = `<div class="carousel-item active">
        <img src='./assets/fender/1.jpg' class="d-block w-100" alt="pants">
        </div>
        <div class="carousel-item">
        <img src='./assets/fender/2.jpg' class="d-block w-100" alt="pants">
        </div>
        <div class="carousel-item">
        <img src='./assets/fender/3.jpg' class="d-block w-100" alt="pants">
         </div>`;
            };
            if (e.srcElement.currentSrc.includes('yamaha')) {
                const carouselItems = document.querySelector(".carousel-inner");
                carouselItems.innerHTML = `<div class="carousel-item active">
        <img src='./assets/yamaha/1.jpg' class="d-block w-100" alt="pants">
        </div>
        <div class="carousel-item">
        <img src='./assets/yamaha/2.jpg' class="d-block w-100" alt="pants">
        </div>
        <div class="carousel-item">
        <img src='./assets/yamaha/3.jpg' class="d-block w-100" alt="pants">
         </div>`;
            };
            if (e.srcElement.currentSrc.includes('epihone')) {
                const carouselItems = document.querySelector(".carousel-inner");
                carouselItems.innerHTML = `<div class="carousel-item active">
        <img src='./assets/epihone/1.jpg' class="d-block w-100" alt="pants">
        </div>
        <div class="carousel-item">
        <img src='./assets/epihone/2.jpg' class="d-block w-100" alt="pants">
        </div>
        <div class="carousel-item">
        <img src='./assets/epihone/3.jpg' class="d-block w-100" alt="pants">
         </div>`;
            };
            if (e.srcElement.currentSrc.includes('gibson')) {
                const carouselItems = document.querySelector(".carousel-inner");
                carouselItems.innerHTML = `<div class="carousel-item active">
        <img src='./assets/gibson/1.jpg' class="d-block w-100" alt="pants">
        </div>
        <div class="carousel-item">
        <img src='./assets/gibson/2.jpg' class="d-block w-100" alt="pants">
        </div>
        <div class="carousel-item">
        <img src='./assets/gibson/3.jpg' class="d-block w-100" alt="pants">
         </div>`;
            };
            if (e.srcElement.currentSrc.includes('seagull')) {
                const carouselItems = document.querySelector(".carousel-inner");
                carouselItems.innerHTML = `<div class="carousel-item active">
        <img src='./assets/seagull/1.jpg' class="d-block w-100" alt="pants">
        </div>
        <div class="carousel-item">
        <img src='./assets/seagull/2.jpg' class="d-block w-100" alt="pants">
        </div>
        <div class="carousel-item">
        <img src='./assets/seagull/3.jpg' class="d-block w-100" alt="pants">
         </div>`;
            };
            if (e.srcElement.currentSrc.includes('taylor')) {
                const carouselItems = document.querySelector(".carousel-inner");
                carouselItems.innerHTML = `<div class="carousel-item active">
        <img src='./assets/taylor/1.jpg' class="d-block w-100" alt="pants">
        </div>
        <div class="carousel-item">
        <img src='./assets/taylor/2.jpg' class="d-block w-100" alt="pants">
        </div>
        <div class="carousel-item">
        <img src='./assets/taylor/3.jpg' class="d-block w-100" alt="pants">
         </div>`;
            };
        });

        const actions = document.createElement('div');
        actions.className = 'actions';
        block.append(actions);

        const input = document.createElement("input");
        input.className = 'input';
        input.type = 'number';
        actions.append(input);

        const addFruit = document.createElement("button");
        addFruit.textContent = 'Добавить в корзину';
        addFruit.classList.add("btn", "btn-primary", "btn-lg", "btn-block");
        actions.append(addFruit);

        addFruit.addEventListener("click", (e) => {
            e.preventDefault();
            next.classList.remove("btn", "btn-secondary", "btn-lg");
            next.classList.add("btn", "btn-primary", "btn-lg");

            myBasket.addItem(guitar, input.value);
            basketInfo.innerHTML = `${myBasket.itemInfo()}`;
            totalInfo.textContent = `Стоимость всех товаров: ${myBasket.totalPrice()}  руб.`;

            const itemName = document.querySelector(".item-name");
            itemName.innerHTML = `${myBasket.itemFinalInfo()}`;

            const badge = document.querySelector(".badge");
            badge.textContent = `${myBasket.badgeCount()}`;

            const totalValue = document.querySelector('.mytotal');
            totalValue.textContent = `${myBasket.totalPrice()} руб.`;
        });

        const removeFruit = document.createElement("button");
        removeFruit.classList.add("btn", "btn-danger", "btn-lg", "btn-block");
        removeFruit.textContent = 'Убрать из корзины';
        actions.append(removeFruit);

        removeFruit.addEventListener("click", (e) => {
            e.preventDefault();
            myBasket.removeItem(guitar);
            basketInfo.innerHTML = `Товар удален из корзины`;
            myBasket.clearInput(input);
            if (myBasket.totalPrice() === 0) {
                next.className = "nextFaded";
                basketInfo.textContent = `Корзина пуста`;
            };
            totalInfo.textContent = `Стоимость всех товаров: ${myBasket.totalPrice()}  руб.`;

            const itemName = document.querySelector(".item-name");
            itemName.innerHTML = `${myBasket.itemFinalInfo()}`

            const totalValue = document.querySelector('.mytotal');
            totalValue.textContent = `${myBasket.totalPrice()} руб.`;
        });
    };
    makeGETRequest(url) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status !== 200) {
                        reject(xhr.status);
                    }
                    const goods = JSON.parse(xhr.responseText);
                    resolve(goods);
                }
            };

            xhr.send();
        });
    }
    renderBasket() {
        this.makeGETRequest('/goods').then((goods) => {
                goods.forEach((good) => {
                    const guitar = new Item(good.product, good.currency, good.price, 0, good.img);
                    const subtitle = good.product;
                    myBasket.renderItem(guitar, subtitle);
                });
            },
            (status) => {
                console.log('Error', 'Status code:', status);
            }
        );
    };
};

const myBasket = new Basket();

const container = document.createElement('div');
container.className = 'container-fluid';
document.body.append(container);

const title = document.createElement("h2");
title.textContent = 'Добро пожаловать в интернет-магазин гитар!';
container.prepend(title);
title.className = 'display-5';

const titleImage = document.createElement('img');
titleImage.src = './assets/guitar.png';
titleImage.className = 'titleImage';
container.prepend(titleImage);

const head = document.createElement('div');
head.className = 'head';
head.append(title, titleImage);
container.append(head);

const main = document.createElement('div');
main.className = 'main';
container.append(main);

const itemCard = document.createElement('div');
itemCard.className = 'col-md-3';
itemCard.id = 'itemCard';
container.append(itemCard);

const infoContainer = document.createElement('div');
infoContainer.className = 'infoContainer';
itemCard.className = 'col-md-9';
container.append(infoContainer);
main.append(itemCard, infoContainer);

const basketInfo = document.createElement("div");
infoContainer.append(basketInfo);
basketInfo.textContent = 'Ваша корзина пуста. Нажите "добавить", чтобы продолжить покупки.';
basketInfo.className = 'basketInfo';

const basketImg = document.createElement('img');
basketImg.src = './assets/cart.png';
basketImg.className = 'basketImg';
infoContainer.prepend(basketImg);

const totalInfo = document.createElement('totalInfo');
infoContainer.prepend(basketImg);
infoContainer.append(totalInfo);
totalInfo.className = 'totalInfo';

const contacts = document.querySelector('#contacts');
container.append(contacts);
contacts.style.display = 'none';

const next = document.createElement('button');
next.classList.add("btn", "btn-secondary", "btn-lg")
next.textContent = 'Продолжить';
infoContainer.append(next);

next.addEventListener("click", (e) => {

    if (myBasket.totalPrice() != 0) {
        contacts.style.display = (contacts.style.display == 'none') ? 'block' : 'none';
        title.style.display = 'none';
        titleImage.style.display = 'none';
        next.style.display = 'none';
        back.style.display = 'block';
    };
});

const back = document.createElement('button');
back.classList.add("btn", "btn-secondary", "btn-lg");
back.textContent = 'Назад';
const row = document.querySelector('.row');
row.after(back);
back.style.display = 'none';

back.addEventListener("click", () => {
    contacts.style.display = (contacts.style.display == 'none') ? 'block' : 'none';
    title.style.display = 'block';
    titleImage.style.display = 'block';
    next.style.display = 'block';
    back.style.display = 'none';
});

document.getElementById('continue').addEventListener('click', (e) => {
    e.preventDefault();
    const name = document.querySelector('.name');
    name.style.textAlign = 'right';
    const destination = document.querySelector('.destination');
    destination.style.textAlign = 'right';
    const keepintouch = document.querySelector('.keepintouch');
    keepintouch.style.textAlign = 'right';
    const payment = document.querySelector('.payment');
    payment.style.textAlign = 'right';

    name.innerHTML = `${document.getElementById('firstName').value} ${document.getElementById('lastName').value} ${document.getElementById('fatherName').value}`;
    destination.innerHTML = `${document.getElementById('country').value}, ${document.getElementById('state').value}, ${document.getElementById('zip').value} </br> ${document.getElementById('address').value}, ${document.getElementById('address').value}`;
    keepintouch.innerHTML = `${document.getElementById('email').value} </br> ${document.getElementById('tel').value}`;
});

document.getElementById('pay').addEventListener('click', (e) => {
    e.preventDefault();
    const payment = document.querySelector('.payment');

    if (document.getElementById('credit').checked) {
        payment.innerHTML = `${document.getElementById('credit').value}`;
    };
    if (document.getElementById('debit').checked) {
        payment.innerHTML = `${document.getElementById('debit').value}`;
    };
    if (document.getElementById('paypal').checked) {
        payment.innerHTML = `${document.getElementById('paypal').value}`;
    };
});

myBasket.renderBasket();

/*

РЕШЕНИЕ ЧЕРЕЗ FETCH

fetch('/goods')
    .then(response => response.json())
    .then(
        (goods) => {
            goods.forEach((good) => {
                let guitar = new Item(good.product, good.currency, good.price, 0, good.img)
                let subtitle = good.product
                myBasket.render(guitar, subtitle);
            });
        }
    ).catch((error) => {
        console.log('Error', error);
    });

*/