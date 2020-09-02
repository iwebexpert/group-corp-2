const container = document.querySelector('.container-fluid');
const main = document.querySelector('.main');
const itemCard = document.querySelector('#itemCard');
const infoContainer = document.querySelector('.infoContainer');
const basketInfo = document.querySelector('.basketInfo');
const basketImg = document.querySelector('.basketImg');
const totalInfo = document.querySelector('.totalInfo');
const contacts = document.querySelector('#contacts');
const next = document.querySelector('.next');
const back = document.querySelector('.back');
const pay = document.getElementById('pay');
const name = document.querySelector('.name');
const destination = document.querySelector('.destination');
const keepintouch = document.querySelector('.keepintouch');
const payment = document.querySelector('.payment');
const username = document.getElementById('username');
const country = document.getElementById('country');
const address = document.getElementById('address');
const address2 = document.getElementById('address2');
const state = document.getElementById('state');
const zip = document.getElementById('zip');
const tel = document.getElementById('tel');
const email = document.getElementById('email');
const credit = document.getElementById('credit');
const debit = document.getElementById('debit');
const paypal = document.getElementById('paypal');
const inputs = document.querySelectorAll('input');

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

    clearBasket(item) {
        return this.items = this.items.filter(el => el[0].item !== product.item);
    };

    totalPrice() {
        return this.items.map((el) => el[0].price * el[1]).reduce((a, b) => a + b, 0);
    };

    itemInfo() {
        let str = ``;
        for (const el of this.items) {
            str += `${el[0].product} стоимостью ${el[0].price} ${el[0].currency}<br> <hr>`;
        };
        return str;
    };

    itemFinalInfo() {
        let str = ``;
        for (const el of this.items) {
            str += `${el[0].product}<br>(Количество: ${el[1]}) <hr>`;
        };
        return str;
    };

    badgeCount() {
        if (this.items.length != 0) {
            return this.items.map(el => el[0]).map(qq => +qq.amount).reduce((a, b) => a + b);
        } else {
            return document.querySelector(".badge").textContent = `0`;
        };
    };

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

        const modal = document.querySelector('.modal');
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

        const addFruit = document.createElement("button");
        addFruit.textContent = 'Добавить в корзину';
        addFruit.classList.add("btn", "btn-primary", "btn-lg", "btn-block");
        actions.append(addFruit);

        addFruit.addEventListener("click", (e) => {
            e.preventDefault();
            next.classList.remove("btn", "btn-secondary");
            next.classList.add("btn", "btn-primary");
            let count = 0;
            count++;
            this.addItem(guitar, count);
            basketInfo.innerHTML = `${this.itemInfo()}`;
            totalInfo.textContent = `Стоимость всех товаров: ${this.totalPrice()}  руб.`;

            document.querySelector(".item-name").innerHTML = `${this.itemFinalInfo()}`;
            document.querySelector(".badge").textContent = `${this.badgeCount()}`;
            document.querySelector('.mytotal').textContent = `${this.totalPrice()} руб.`;
        });

        const removeFruit = document.createElement("button");
        removeFruit.classList.add("btn", "btn-danger", "btn-lg", "btn-block");
        removeFruit.textContent = 'Убрать из корзины';
        actions.append(removeFruit);

        removeFruit.addEventListener("click", (e) => {
            e.preventDefault();

            let count = 0;
            count--;

            this.removeItem(guitar);
            basketInfo.innerHTML = `${this.itemInfo()}`;

            if (this.totalPrice() === 0) {
                next.classList.add("btn", "btn-secondary");
                basketInfo.textContent = `Корзина пуста`;
            };
            document.querySelector(".badge").textContent = `${this.badgeCount()}`;
            totalInfo.textContent = `Стоимость всех товаров: ${this.totalPrice()}  руб.`;
            document.querySelector(".item-name").innerHTML = `${this.itemFinalInfo()}`
            document.querySelector('.mytotal').textContent = `${this.totalPrice()} руб.`;
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
                };
            };

            xhr.send();
        });
    };

    renderBasket() {
        this.makeGETRequest('/goods').then((goods) => {
                goods.forEach((good) => {
                    const guitar = new Item(good.product, good.currency, good.price, 0, good.img);
                    const subtitle = good.product;
                    this.renderItem(guitar, subtitle);
                });
            },
            (status) => {
                console.log('Error', 'Status code:', status);
            }
        );
    };

    renderButtons() {

        contacts.style.display = 'none';

        next.addEventListener("click", (e) => {
            e.preventDefault();
            if (this.totalPrice() != 0) {
                contacts.style.display = (contacts.style.display == 'none') ? 'block' : 'none';
                back.style.display = 'block';
            };
            scroll(0, document.body.scrollHeight);
        });

        back.style.display = 'none';

        back.addEventListener("click", (e) => {
            e.preventDefault();
            contacts.style.display = (contacts.style.display == 'none') ? 'block' : 'none';
            back.style.display = 'none';
        });

        pay.addEventListener('click', (e) => {
            e.preventDefault();
            name.style.textAlign = 'right';
            destination.style.textAlign = 'right';
            keepintouch.style.textAlign = 'right';
            payment.style.textAlign = 'right';

            name.innerHTML = `${username.value}`;
            destination.innerHTML = `${country.value}, ${state.value} ${zip.value} </br> ${address.value} ${address2.value}`;
            keepintouch.innerHTML = `${email.value} </br> ${tel.value}`;
            if (credit.checked) {
                payment.innerHTML = `${credit.value}`;
            };
            if (debit.checked) {
                payment.innerHTML = `${debit.value}`;
            };
            if (paypal.checked) {
                payment.innerHTML = `${paypal.value}`;
            };
        });
    }
    validation() {
        const fields = {
            username: /^[А-ЯЁ][а-яё]{2,}([-][А-ЯЁ][а-яё]{2,})?\s[А-ЯЁ][а-яё]{2,}\s[А-ЯЁ][а-яё]{2,}$/,
            email: /^([a-z0-9_.-]+)@([a-z0-9_.-]+)\.([a-z]{2,6})$/i,
            tel: /^((\+7|7|8)+([0-9]){10})$/,
            zip: /^\d{6}$/
        };

        const validate = (field, regex) => {
            regex.test(field.value) ? (field.className = "valid") : (field.className = "invalid");
        };

        inputs.forEach(el => el.addEventListener(
            'keyup', e => {
                validate(e.target, fields[e.target.attributes.name.value]);
            }));
    };
};



const myBasket = new Basket();

myBasket.renderButtons();
myBasket.validation();
myBasket.renderBasket();