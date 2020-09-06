import isCorrectInput from './utils.js';
import Basket from './Basket.js';
import ItemsList from './ItemsList.js'
import initCanvasDrawing from  './canvas.js';

let products = new Basket([], [], 'RUB', []);
const shopList = document.querySelector('.shop__list');

//draw charts
initCanvasDrawing();




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
    if (products.countBasketPrice() === 0) {
        modal.style.display = 'none';
    }
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
    modalOrder = document.querySelector('.modal__order'),
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
    let flg = true;
    swiperContainer.style.display = 'none';
    [phone, email, name].forEach(el => {
        if (el.value === '') el.style.border = '1px solid red';
        if (isInvalidInput(el)) {
            event.preventDefault();
            flg = false;
        }
    });
    if (flg) {
        modalOrder.textContent = `You ordered: ${products.getOrder()}`;
        modalPrice.textContent = `Total amount is ${products.countBasketPrice()} ${products.currency},`;
        modalComment.textContent = `Your comment: ${comment.value}`;
        modalPhone.textContent = `Your phone: ${phone.value},`;
        modalEmail.textContent = `Your email: ${email.value},`;
        modalName.textContent = `Your name: ${name.value},`;
        modalAddress.textContent = `Your address: ${address.value},`
        modal.style.display = 'block';
    } else {
        console.log('Please input the correct input values');
    }
});

document.addEventListener('click', e => {
    const target = e.target;
    if (target.classList.contains('modal')) modal.style.display = 'none';
});

const mySwiper = new Swiper('.swiper-container', {
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