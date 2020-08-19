class Item {
    constructor(guitar, product, currency, price, amount, img) {
        this.guitar = guitar;
        this.product = product;
        this.currency = currency;
        this.price = price;
        this.amount = amount;
        this.img = img;

    };
};

const items = [];


let fender = new Item('fender', 'FENDER Redondo Special MBK w/bag', 'руб.', 78000, 0, ['./assets/fender/1.jpg', './assets/fender/2.jpg', './assets/fender/3.jpg']);
let yamaha = new Item('yamaha', 'YAMAHA FG820 SUNSET BLUE', 'руб.', 24990, 0, ['./assets/yamaha/1.jpg', './assets/yamaha/2.jpg', './assets/yamaha/3.jpg']);
let epiphone = new Item('epiphone', 'EPIPHONE DOVE PRO ACOUSTIC', 'руб.', 40000, 0, ['./assets/epiphone/1.jpg', './assets/epiphone/2.jpg', './assets/epiphone/3.jpg']);
let gibson = new Item('gibson', 'GIBSON J-200 Standard Maple Vintage Sunburst', 'руб.', 401000, 0, ['./assets/gibson/1.jpg', './assets/gibson/2.jpg', './assets/gibson/3.jpg']);
let seagull = new Item('seagull', 'SEAGULL 41886 Entourage Folk Burnt Umber QIT', 'руб.', 49161, 0, ['./assets/seagull/1.jpg', './assets/seagull/2.jpg', './assets/seagull/3.jpg']);
let taylor = new Item('taylor', 'TAYLOR 214ce-K DLX 200 Series Deluxe', 'руб.', 161000, 0, ['./assets/taylor/1.jpg', './assets/taylor/2.jpg', './assets/taylor/3.jpg']);

items.push(fender, yamaha, epiphone, gibson, seagull, taylor);
console.log(items);



class Basket {
    constructor(items) {
        this.items = [];
    };

    addItem(item, amount) {
        item.amount = amount;
        if (amount && amount > 0) {
            this.items.push([item, amount]);
        }
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
};


const myBasket = new Basket();

const container = document.createElement('div');
container.className = 'container';
document.body.append(container);

const title = document.createElement("h2");
title.textContent = 'Добро пожаловать в интернет-магазин гитар!';
container.prepend(title);
title.className = 'title';

const titleImage = document.createElement('img');
titleImage.src = './assets/shop.png';
titleImage.className = 'titleImage';
container.prepend(titleImage);

const main = document.createElement('div');
main.className = 'main';
container.append(main);

const itemCard = document.createElement('div')
itemCard.id = 'itemCard';
container.append(itemCard);

const infoContainer = document.createElement('div');
infoContainer.className = 'infoContainer';
container.append(infoContainer);

main.append(itemCard, infoContainer);

const basketInfo = document.createElement("div");
infoContainer.append(basketInfo);
basketInfo.textContent = 'Ваша корзина пуста. Нажите "добавить", чтобы продолжить покупки.';
basketInfo.className = 'basketInfo';

const totalInfo = document.createElement('div');
infoContainer.append(totalInfo);
totalInfo.className = 'totalInfo';

const contacts = document.querySelector('#contacts');
container.append(contacts);
contacts.style.display = 'none';


const next = document.createElement('button');
next.className = "next";
next.textContent = 'Продолжить';
contacts.before(next);

next.addEventListener("click", () => {
    contacts.style.display = (contacts.style.display == 'none') ? 'block' : 'none';
    main.style.display = 'none';
    title.style.display = 'none';
    titleImage.style.display = 'none';
    next.style.display = 'none';
    back.style.display = 'block';



});


const back = document.createElement('button');
back.className = "back";
back.textContent = 'Назад';
contacts.after(back);
back.style.display = 'none'
back.addEventListener("click", () => {
    contacts.style.display = (contacts.style.display == 'none') ? 'block' : 'none';
    main.style.display = 'block';
    title.style.display = 'block';
    titleImage.style.display = 'block';
    next.style.display = 'block';
    back.style.display = 'none';


});


const product = (guitar, p) => {
    let block = document.createElement("div");
    block.className = 'block';
    itemCard.append(block);
    block.textContent = `${p}`;

    let img = document.createElement('img');
    img.src = guitar.img[0];
    img.className = 'img';
    block.append(img);


    let actions = document.createElement('div');
    actions.className = 'actions';
    block.append(actions);

    let input = document.createElement("input");
    input.className = 'input';
    input.type = 'number';
    actions.append(input);

    let addFruit = document.createElement("button");
    addFruit.textContent = 'Добавить в корзину';
    addFruit.className = "addFruit";
    actions.append(addFruit);

    addFruit.addEventListener("click", () => {
        myBasket.addItem(guitar, input.value);
        basketInfo.innerHTML = `${myBasket.itemInfo()}`;
        totalInfo.textContent = `Cтоимость всех товаров в корзине: ${myBasket.totalPrice()}  руб.`;

        const product_image = document.querySelector('.product_image');
        product_image.src = guitar.img[0];

        const calculated_total = document.querySelector('#calculated_total');
        calculated_total.innerHTML = `Итого: ${myBasket.totalPrice()}  руб.`

        const product_details = document.querySelector('#product_details');
        product_details.innerHTML = `${myBasket.itemInfo()}`;
    });

    let removeFruit = document.createElement("button");
    removeFruit.className = "removeFruit";
    removeFruit.textContent = 'Убрать из корзины';
    actions.append(removeFruit);

    removeFruit.addEventListener("click", () => {
        myBasket.removeItem(guitar);
        basketInfo.innerHTML = `Товар удален из корзины`;
        myBasket.clearInput(input);
        if (myBasket.totalPrice() === 0) {
            basketInfo.textContent = `Корзина пуста`;
        };
        totalInfo.textContent = `Cтоимость всех товаров в корзине: ${myBasket.totalPrice()}  руб.`
    });

    const openInfo = document.createElement("a");
    openInfo.textContent = 'Информация о товаре';
    openInfo.href = '#mymodal';
    openInfo.classList = 'mymodal-view';
    actions.append(openInfo);


    const modal = document.createElement('div');
    modal.className = "mymodal";
    modal.id = "mymodal";
    block.append(modal);

    const content = document.createElement('div');
    content.className = 'content';
    modal.append(content);

    const closeInfo = document.createElement("a");
    closeInfo.textContent = 'Закрыть';
    closeInfo.href = '#';
    closeInfo.className = 'mymodal-view';
    closeInfo.className = 'closeInfo';


    content.innerHTML = `<div class="slider">
      <input type="radio" name="toggle" id="btn-1" checked>
      <input type="radio" name="toggle" id="btn-2">
      <input type="radio" name="toggle" id="btn-3">

      <div class="slider-controls">
        <label for="btn-1"></label>
        <label for="btn-2"></label>
        <label for="btn-3"></label>
      </div>

      <ul class="slides">
        <li class="slide">
          <p class="slide-image">
            <img src = "${guitar.img[0]}"/>
          </p>
        </li>
        <li class="slide">
          <p class="slide-image">
            <img src = "${guitar.img[1]}"/>
          </p>
        </li>
        <li class="slide">
          <p class="slide-image">
            <img src = "${guitar.img[2]}"/>
          </p>
        </li>
      </ul>
    </div>`

    content.append(closeInfo);


};



product(fender, "Fender Redondo Special MBK w/bag");
product(yamaha, 'YAMAHA FG820 SUNSET BLUE');
product(epiphone, 'EPIPHONE DOVE PRO ACOUSTIC');
product(gibson, 'GIBSON J-200 Standard Maple Vintage Sunburst');
product(seagull, 'SEAGULL 41886 Entourage Folk Burnt Umber QIT');
product(taylor, 'TAYLOR 214ce-K DLX 200 Series Deluxe');