const list = [];
const stepsCheckout = ['.listBasket', '.adress_delivery', '.comment'];

const shoppingCart = {
    items: [],
    htmlObj: null,
    viewStatus: 'short',
    getItems: function () {
        return this.items
    },

    addItem: function (product, count) {
        let item = {
            product: product,
            count: count,
        };
        this.items.push(item)
    },
    renderShortView: function () {
        this.htmlObj.innerHTML = '';
        if (this.items.length < 1) {
            let p = document.createElement('p');
            p.className = 'errorMessage';
            p.textContent = 'Корзина пуста';
            this.htmlObj.appendChild(p);
        } else {
            let p = document.createElement('p');
            p.className = 'Message';
            let total = this.countBasketPrice();
            p.textContent = 'В корзине: ' + total.count + ' товаров на сумму ' + total.sum + ' рублей';
            this.htmlObj.appendChild(p);
        }
    },
    renderFullView: function () {
        let tableBasket = document.createElement('table');
        let titleRow = document.createElement('tr');
        titleRow.id = 'titleCatalog';
        let thd1 = document.createElement('th');
        thd1.textContent = '';
        let thd2 = document.createElement('th');
        thd2.textContent = 'Наименование';
        let thd3 = document.createElement('th');
        thd3.textContent = 'Кол-во';
        let thd4 = document.createElement('th');
        thd4.textContent = 'Цена';
        let thd5 = document.createElement('th');
        thd5.textContent = 'Валюта';

        titleRow.appendChild(thd1);
        titleRow.appendChild(thd2);
        titleRow.appendChild(thd3);
        titleRow.appendChild(thd4);
        titleRow.appendChild(thd5);
        tableBasket.appendChild(titleRow);
        let count = 0;

        for (let item of this.items) {
            let productRow = document.createElement('tr');
            productRow.id = 'rowProduct';
            let td1 = document.createElement('td');
            let cell0 = document.createElement('div');
            cell0.classList.add('thumbnail');
            cell0.setAttribute('product_id', item.product.id);
            let thumbnail = document.createElement('img');
            thumbnail.src = item.product.imgUrls[0];
            thumbnail.alt = 'product image';
            cell0.appendChild(thumbnail);
            td1.setAttribute('product_id', item.product.id);
            td1.appendChild(cell0);

            let td2 = document.createElement('td');
            td2.textContent = item.product.name;

            let td3 = document.createElement('td');
            td3.textContent = item.count;

            let td4 = document.createElement('td');
            td4.textContent = item.product.price;

            let td5 = document.createElement('td');
            td5.textContent = item.product.currency;

            productRow.appendChild(td1);
            productRow.appendChild(td2);
            productRow.appendChild(td3);
            productRow.appendChild(td4);
            productRow.appendChild(td5);
            tableBasket.appendChild(productRow);
        }
        let hrRow = document.createElement('tr');
        let hrTd = document.createElement('td');
        hrTd.colSpan = 5;
        hrTd.appendChild(document.createElement('hr'));
        hrRow.appendChild(hrTd);
        tableBasket.appendChild(hrRow);
        let total = this.countBasketPrice();

        let totalRow = document.createElement('tr');
        totalRow.id = 'totalBasket';
        let tothd1 = document.createElement('th');
        tothd1.textContent = '';
        let tothd2 = document.createElement('th');
        tothd2.textContent = 'Итого';
        let tothd3 = document.createElement('th');
        tothd3.textContent = total.count;

        let tothd4 = document.createElement('th');
        tothd4.textContent = total.sum;
        let tothd5 = document.createElement('th');
        tothd5.textContent = 'RUB';
        totalRow.appendChild(tothd1);
        totalRow.appendChild(tothd2);
        totalRow.appendChild(tothd3);
        totalRow.appendChild(tothd4);
        totalRow.appendChild(tothd5);
        tableBasket.appendChild(totalRow);
        this.htmlObj.appendChild(tableBasket);

    },
    updateView: function () {
        if (this.viewStatus === 'short') {
            this.renderShortView()
        } else {
            this.renderFullView()
        }
    },
    switchToFullView: function () {
        this.htmlObj = document.querySelector('.listBasket');
        this.viewStatus = 'full';
    },
    countBasketPrice: function () {
        let totalSum = 0;
        let totalItems = 0;
        for (let item of this.items) {
            totalSum += item.count * item.product.price;
            totalItems += item.count;
        }
        return { sum: totalSum, count: totalItems };
    },
};

function productClass(id, name, description, price, currency) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.currency = currency;
    this.imgUrls = [];
}

function catalogClass(htmlObj) {
    this.htmlObj = htmlObj;
    this.products = [];
    this.updateView = function () {
        this.htmlObj.innerHTML = "";
        for (let product of this.products) {
            this.htmlObj.appendChild(this.renderProduct(product));
        }

    };
    this.renderProduct = function (product) {
        let productView = document.createElement('div');
        productView.classList.add('product');
        let productThumbContainer = document.createElement('div');
        productThumbContainer.classList.add('thumbnail');
        productThumbContainer.setAttribute('product_id', product.id);
        let productThumb = document.createElement('img');
        productThumb.alt = 'product image';
        productThumb.src = product.imgUrls[0];
        productThumbContainer.appendChild(productThumb);
        let productHeader = document.createElement('h4');
        productHeader.textContent = product.name;
        productHeader.classList.add('product_name');
        let productDesc = document.createElement('p');
        productDesc.textContent = product.description;
        let productPrice = document.createElement('h5');
        productPrice.textContent = 'Цена ' + product.price + ' ' + product.currency;
        let buttonBuy = document.createElement('button');
        buttonBuy.classList.add('buyButton');
        buttonBuy.setAttribute('product_id', product.id);
        buttonBuy.textContent = 'Купить';
        productView.appendChild(productThumbContainer);
        productView.appendChild(productHeader);
        productView.appendChild(productDesc);
        productView.appendChild(productPrice);
        productView.appendChild(buttonBuy);

        return productView
    }

    this.addItem = function (item) {
        this.products.push(item)
    }

    this.getProductById = function (id) {
        for (let item of this.products) {
            if (item.id == id) {
                return item
            }
        }
    }
}

function createModal() {
    const modalElem = document.querySelector('.modal');
    modalElem.innerHTML = '';
    const closeButton = document.createElement('a');
    closeButton.classList.add('modal__cross');
    closeButton.classList.add('js-modal-close');
    closeButton.textContent = 'Закрыть';
    modalElem.appendChild(closeButton);
    closeButton.addEventListener('click', closeModal);

    return modalElem
}
function buyProduct(event) {
    const btn = event.target;
    const id = btn.attributes.product_id.value;
    console.log(id);
    if (id) {
        let product = catalog.getProductById(id);
        if (product) {
            id.value = '';
            shoppingCart.addItem(product, 1)
            shoppingCart.updateView();
        } else {
            console.log('Id продукта не найден в каталоге');
            id.value = '';
        }
    } else {
        console.log('Id продукта не может быть пустым');
    }
    event.stopPropagation()
}
function showModalProductImgs(event) {
    const id = event.target.parentElement.attributes.product_id.value;
    const product = catalog.getProductById(id);
    const modalElem = createModal();
    const imgContainer = document.querySelector('.imgContainer');
    list.push({ htmlObj: imgContainer, html: imgContainer.innerHTML });
    imgContainer.innerHTML = '';
    const overlay = document.querySelector('.js-overlay-modal');
    overlay.classList.add('active');

    for (let i = 0; i < product.imgUrls.length; i++) {
        const img = document.createElement('img');
        img.alt = 'Image_' + i;
        img.id = 'img_' + i;
        img.classList.add('imgModal');
        img.src = product.imgUrls[i];
        img.classList.add('hide');
        if (i === 0) {
            img.classList.remove('hide');
        }
        imgContainer.appendChild(img);
    }

    modalElem.appendChild(imgContainer);
    modalElem.addEventListener('click', nextImg);
    document.addEventListener('keydown', pressKeyHandler);
    imgContainer.classList.remove('hide');
    modalElem.classList.add('active');
}

function pressKeyHandler() {
    switch (event.key) {
        case 'ArrowLeft':
            nextImg()
            break;
        case 'ArrowRight':
            nextImg()
            break;
    }
}
function nextImg() {
    const imgs = document.querySelectorAll('.imgModal');
    console.log(imgs);
    for (let i = 0; i < imgs.length; i++) {
        const img = imgs[i];
        console.log(img.style.visibility);
        if (!img.classList.contains('hide')) {
            let id = img.id.split('_')[1];
            let nextId = (+id + 1) % imgs.length;
            console.log(nextId);
            img.classList.add('hide');
            imgs[nextId].classList.remove('hide');
            break;
        }
    }

}
function closeModal(event) {
    const parentModal = this.closest('.modal');
    const overlay = document.querySelector('.js-overlay-modal');
    parentModal.classList.remove('active');
    parentModal.removeChild(parentModal.firstChild);
    while (list.length) {
        let o = list.pop();
        document.body.appendChild(o.htmlObj);
        o.htmlObj.innerHTML = o.html;
        o.htmlObj.classList.add('hide');
    }
    overlay.classList.remove('active');

    if (shoppingCart.viewStatus !== 'short') {
        shoppingCart.htmlObj = document.getElementById('basket');
        shoppingCart.viewStatus = 'short';
    }
    event.stopPropagation()
}
function checkoutNextStep(event) {
    let step = event.target.attributes.step.value;
    if (+step < stepsCheckout.length) {
        let prevStepPage = document.querySelector(stepsCheckout[+step - 1]);
        let nextStepPage = document.querySelector(stepsCheckout[+step]);
        document.body.appendChild(prevStepPage);

        list.push({ htmlObj: nextStepPage, html: nextStepPage.innerHTML });
        const modalElem = document.querySelector('.modal');
        event.target.insertAdjacentElement('beforebegin', nextStepPage);
        event.target.setAttribute('step', + step + 1);
        prevStepPage.classList.add('hide');
        nextStepPage.classList.remove('hide');

    } else {
        event.target.setAttribute('step', 99);
        event.target.textContent = 'Оплатить';
    }

}

function checkoutBegin() {
    shoppingCart.switchToFullView();
    let modalElem = createModal();
    list.push({ htmlObj: shoppingCart.htmlObj, html: shoppingCart.htmlObj.innerHTML });
    modalElem.appendChild(shoppingCart.htmlObj);
    shoppingCart.updateView();
    let btnNext = document.createElement('button');
    btnNext.classList.add('nextButton');
    btnNext.setAttribute('step', 1);
    btnNext.textContent = 'Далее';
    btnNext.addEventListener('click', checkoutNextStep);
    modalElem.appendChild(btnNext);

    const overlay = document.querySelector('.js-overlay-modal');
    overlay.classList.add('active');
    modalElem.classList.add('active');
    shoppingCart.htmlObj.classList.remove('hide');
}

window['catalog'] = null;

let product1 = new productClass(1, 'Keyboard', 'Описание Item1', 2000, 'RUB');
let product2 = new productClass(2, 'Mouse', 'Описание Item1', 1000, 'RUB');
let product3 = new productClass(3, 'Monitor', 'Описание Item1', 10000, 'RUB');

product1.imgUrls.push('https://media.kingston.com/hyperx/features/hx-features-keyboard-alloyfpspro-litup.jpg');
product1.imgUrls.push('https://mark.com.ru/wa-data/public/shop/products/13/19/31913/images/26553/26553.750@2x.jpeg');
product1.imgUrls.push('https://avatars.mds.yandex.net/get-mpic/1336510/img_id8139733990913955767.jpeg/orig');

product2.imgUrls.push('https://epix.ru/images/catalog/accessories/mouse/hyperx/pulsefire_fps_pro/hyperpx-pulsefire-fps-pro.jpg');
product2.imgUrls.push('https://media.kingston.com/hyperx/category/hx-family-mouse-pulsefire-surge-md.jpg');
product2.imgUrls.push('https://i.ytimg.com/vi/kiEawFvNRAY/maxresdefault.jpg');

product3.imgUrls.push('https://epix.ru/images/catalog/accessories/monitors/benq/zowie-xl2411p/benq-zowie-xl2411p.jpg');
product3.imgUrls.push('https://cdn.multitronic.fi/images/prod/0/C/9H.LGPLB.QBE-7.jpg');
product3.imgUrls.push('https://image.coolblue.be/max/500x500/products/1372974');

catalog = new catalogClass(document.getElementById('catalog'));

shoppingCart.htmlObj = document.getElementById('basket');
shoppingCart.htmlObj.addEventListener('click', checkoutBegin);

catalog.addItem(product1);
catalog.addItem(product2);
catalog.addItem(product3);

catalog.updateView();
shoppingCart.updateView();

console.log(catalog.getProductById(1));
console.log(catalog.htmlObj.querySelectorAll('.buyButton'));

let buyButtons = catalog.htmlObj.querySelectorAll('.buyButton');
let thumbnailsCatalog = catalog.htmlObj.querySelectorAll('.product > .thumbnail');

for (const btn of buyButtons) {
    btn.addEventListener('click', buyProduct);
}
for (const thumbnail of thumbnailsCatalog) {
    thumbnail.addEventListener('click', showModalProductImgs);
}
let clearButton = document.getElementById('clearBasketButton');
clearButton.onclick = function () {
    shoppingCart.items = [];
    shoppingCart.updateView();
}