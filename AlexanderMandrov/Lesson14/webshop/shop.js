import isCorrectInput from './utils.js';

class Basket {
    constructor(items, prices, currency, quantities) {
        this.items = [...items];
        this.prices = [...prices];
        this.currency = currency;
        this.quantities = [...quantities];
    }

    countBasketPrice() {
        let sum = 0;
        this.prices.forEach((price, i) => {
            sum += price * this.quantities[i];
        });
        return sum;
    }

    getItem(i) {
        return this.items[i];
    }

    getItems() {
        return this.items;
    }

    getItemQuantity(i){
        return +this.quantities[i];
    }

    getItemPrice(i) {
        return this.prices[i];
    }

    getItemIndex(name) {
        let j = 0;
        [...this.getItems()].forEach((item, i) => {
            if (item === name) j = i;
        });
        return j;
    }

    editItemQuantity(name, quantity) {
        this.quantities[this.getItemIndex(name)] = quantity;
    }

    pushItem(item) {
        this.items.push(item.name);
        this.prices.push(item.price);
        this.quantities.push(item.quantity);
    }

    deleteItem(i) {
        this.items.splice(i, 1);
        this.prices.splice(i, 1);
        this.quantities.splice(i, 1);
    }
    
    getOrder() {
        let orderMessage = '';
        [...this.getItems()].forEach((item, i) => {
            orderMessage += `${item} ${this.getItemQuantity(i)}x, `
        });

        return orderMessage.split(0, orderMessage.length - 1);
    }
}

let shopList = document.querySelector('.shop__list');
let products = new Basket([], [], 'RUB', []);
var counter = 0;

const makeGETRequest = (url) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status != 200) {
                    reject(`${xhr.status}: ${xhr.statusText}`);
                }
                resolve(JSON.parse(xhr.responseText));
            }
        }

        xhr.open('GET', url, true);
        xhr.send();
    });
}

const eventHandler = () => {
    const shopImages = document.querySelectorAll('.shop__img');
    shopImages.forEach(img => {
        img.addEventListener('click', (event) => {
            const target = event.target;
            const item = target.closest('.shop__item'),
                counter = item.dataset.counter,
                itemName = document.querySelectorAll('.shop__description')[counter].textContent,
                itemPrice = document.querySelectorAll('.shop__price')[counter].textContent;
    
            modalName.textContent = itemName;
            modalPrice.textContent = itemPrice;
            modal.style.display = 'block';
        });
    });
};

//GET items
const API_URL = '';

class ItemsList {
    fetchItems () {
        makeGETRequest(`${API_URL}/items`)
            .then(items => {
                            items.forEach(item => this.renderShopItem(item.name, item.price, item.currency));
                            eventHandler();
                        })
            .catch(errMessage => console.log(errMessage));
    }

    renderShopItem(name, price, currency) {
        const shopItem = document.createElement('div');
        shopItem.classList.add('shop__item');
        shopItem.dataset['counter'] = counter;
        
        const dataShopItem = `
        <img src="https://placehold.it/200" alt="photo" class="shop__img">
        <hr>
        `;
    
        shopItem.insertAdjacentHTML('afterbegin', dataShopItem);
    
        const shopContent = document.createElement('div');
        shopContent.classList.add('shop__content');
        shopContent.dataset['counter'] = counter;
    
        const dataShopContent = `
        <div class="shop__description" data-counter="${counter}">${name}</div>
        <div class="shop__price" data-counter="${counter}">${price} ${currency}</div>
        <input type="text" class="shop__input" value="1" data-counter="${counter++}"><br>
        `;
    
        shopContent.insertAdjacentHTML('afterbegin', dataShopContent);
    
        const btns = document.createElement('div');
        btns.classList.add('btns');
    
        const dataBtns = `
        <button type="button" class="shop__btn">Buy</button>
        <button type="button" class="shop__btn btn-delete">Delete</button>
        `;
    
        btns.insertAdjacentHTML('afterbegin', dataBtns);
    
        shopContent.insertAdjacentElement('beforeend', btns);
    
        shopItem.insertAdjacentElement('beforeend', shopContent);
        
        shopList.insertAdjacentElement('beforeend', shopItem);
    }
}

const goods = new ItemsList();
goods.fetchItems();

const isInvalidInput = (el) => {
    if (!isCorrectInput(el.classList[0], el.value)) {
        return true;
    }
    return false;
};

const checkInputs = () => {
    const phone = document.querySelector('.phone'),
    email = document.querySelector('.email'),
    name = document.querySelector('.name');


    [phone, email, name].forEach(el => {
        el.addEventListener('input', () => {
            if (isInvalidInput(el)) {
                el.style.border = '1px solid red';
            } else {
                el.style.border = '1px solid lightgrey';
            }
        });
    });
};


const renderBasket = (products) => {
    let ulList = document.querySelector('.list');
    const liItems = document.querySelectorAll('.item');
    liItems.forEach(item => item.remove());
    let totalPrice = document.querySelector('.total__price');

    totalPrice.textContent = 'Basket is clear';

    for (let i = 0; i < products.items.length; i++) {
        const liItem = document.createElement('li');
        liItem.classList.add('item');

        const itemName = document.createElement('div');
        itemName.classList.add('item--inner');
        itemName.classList.add('item__name');
        itemName.insertAdjacentHTML('afterbegin', products.getItem(i));

        const itemQuantity = document.createElement('div');
        itemQuantity.dataset.name = products.getItem(i);
        itemQuantity.classList.add('item--inner');
        itemQuantity.classList.add('item__quantity');
        itemQuantity.insertAdjacentHTML('beforeend', ` ${parseInt(products.getItemQuantity(i))} `);

        const itemPrice = document.createElement('div');
        itemPrice.dataset.name = products.getItem(i);
        itemPrice.classList.add('item--inner');
        itemPrice.classList.add('item__price');
        itemPrice.insertAdjacentHTML('afterbegin', `${products.getItemPrice(i) * products.getItemQuantity(i)} ${products.currency}`);

        liItem.insertAdjacentElement('beforeend', itemName);
        liItem.insertAdjacentHTML('beforeend', `<i class="far fa-minus-square" data-name=${products.getItem(i)}></i>`);
        liItem.insertAdjacentElement('beforeend', itemQuantity);
        liItem.insertAdjacentHTML('beforeend', `<i class="far fa-plus-square" data-name=${products.getItem(i)}></i>`);
        liItem.insertAdjacentElement('beforeend', itemPrice);

        ulList.insertAdjacentElement('beforeend', liItem);
        totalPrice.textContent = `Total amount is ${products.countBasketPrice()} ${products.currency}`;
    };
    checkInputs();
};

const deleteProductFromBasket = (itemName) => {
    products.items.forEach((item, i) => {
        if (item == itemName) {
            products.deleteItem(i);
        };
    });
    renderBasket(products);
};

const isUnique = (obj) => {
    let flg = true;
    [...products.getItems()].forEach(item => {
        if (item === obj.name) {
            flg = false;
        };
    });
    return flg;
};

const addQuantity = (quantity, name) => {
    const quantityElement = document.querySelectorAll('.item__quantity');
    quantityElement.forEach(elem => {
        if (elem.dataset.name === name) {
            const newQuantity = +elem.textContent + +quantity;
            if (newQuantity >= 1) {
                elem.textContent = newQuantity;
                products.editItemQuantity(name, newQuantity);
            } else {
                deleteProductFromBasket(name);
                getBtns();
                if (document.querySelectorAll('.item').length === 0) document.querySelector('.form').style.display = 'none';
            }
        };
    });
};

const editPriceAndTotal = (products, name) => {
    const itemPrices = document.querySelectorAll('.item__price'),
        totalPrice = document.querySelector('.total__price');
    const j = products.getItemIndex(name);
    itemPrices.forEach(item => {
        if (item.dataset.name === name) {
            item.textContent = `${products.getItemPrice(j) * products.getItemQuantity(j)} ${products.currency}`;
        };
    });
    totalPrice.textContent = products.countBasketPrice() === 0 ? 'Basket is clear' : `Total amount is ${products.countBasketPrice()} ${products.currency}`;
};

const getBtns = () => {
    let plusBtns = document.querySelectorAll('.fa-plus-square'),
        minusBtns = document.querySelectorAll('.fa-minus-square');
    plusBtns.forEach(btn => {
        btn.addEventListener('click', event => {
            const target = event.target;
            addQuantity(1, target.dataset.name);
            editPriceAndTotal(products, target.dataset.name);
        });
    });

    minusBtns.forEach(btn => {
        btn.addEventListener('click', event => {
            const target = event.target;
            addQuantity(-1, target.dataset.name);
            editPriceAndTotal(products, target.dataset.name);
        });
    });
};

shopList.addEventListener('click', (event) => {
    const target = event.target;
    const item = target.closest('.shop__item'),
        counter = item.dataset.counter,
        itemName = document.querySelectorAll('.shop__description')[counter].textContent;
    if (target.classList.value === 'shop__btn') {
        const itemPrice = document.querySelectorAll('.shop__price')[counter].textContent,
            itemQuantity = document.querySelectorAll('.shop__input')[counter].value;

        const tempObj = {
            name: itemName,
            price: parseInt(itemPrice),
            currency: 'RUB',
            quantity: itemQuantity
        };
        
        if (isUnique(tempObj)) {
            products.pushItem(tempObj);
        } else {
            addQuantity(itemQuantity, itemName);
        };
        renderBasket(products);
        getBtns();
        document.querySelector('.form').style.display = 'block';
    };
    if (target.classList.contains('btn-delete')) {
        deleteProductFromBasket(itemName);
    };
});

const modal = document.querySelector('.modal'),
    modalName = document.querySelector('.modal__name'),
    modalPrice = document.querySelector('.modal__price'),
    modalComment = document.querySelector('.modal__comment'),
    modalEmail = document.querySelector('.modal__email'),
    modalPhone = document.querySelector('.modal__phone'),
    modalAddress = document.querySelector('.modal__address');

const orderBtn = document.querySelector('.order');

orderBtn.addEventListener('click', (event) => {
    const swiperContainer = document.querySelector('.swiper-container'),
        comment = document.querySelector('#comment'),
        phone = document.querySelector('.phone'),
        email = document.querySelector('.email'),
        name = document.querySelector('.name'),
        address = document.querySelector('.address');

    let counter = 0;
    swiperContainer.style.display = 'none';
    [phone, email, name].forEach(el => {
        if (isInvalidInput(el)) {
            event.preventDefault();
            console.log('Please input the correct input values');
        } else {
            modalName.textContent = `You ordered: ${products.getOrder()}`;
            modalPrice.textContent = `Total amount is ${products.countBasketPrice()} ${products.currency},`;
            modalComment.textContent = `Your comment: ${comment.value}`;
            modalPhone.textContent = `Your phone: ${phone.value},`;
            modalEmail.textContent = `Your email: ${email.value},`;
            modalName.textContent = `Your name: ${name.value},`;
            modalAddress.textContent = `Your address: ${address.value},`
            modal.style.display = 'block';
        }
    });
});

document.addEventListener('click', e => {
    const target = e.target;
    if (target.classList.contains('modal')) modal.style.display = 'none';
});

var mySwiper = new Swiper('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,

    effect: 'slide',

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
})