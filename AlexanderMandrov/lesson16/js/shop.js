import { isInvalidInput } from './utils.js';
import Basket, { renderBasket } from './Basket.js';
import { getData } from './services.js';


const initShopLogic = (obj) => {
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

    const products = new Basket(obj);
    renderBasket(products);
    getBtns();

    const shopList = document.querySelector('.shop__list');

    const deleteProductFromBasket = (itemName) => {
        products.items.forEach((item, i) => {
            if (item === itemName) {
                products.deleteItem(i, itemName);
            };
        });
        renderBasket(products);
        getBtns();
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

    const modalName = document.querySelector('.modal__name'),
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
};

const getBasket = async () => {
    const data = await getData('basket');
    const items = [],
        prices = [],
        currency = 'RUB',
        quantities = [];

    if (data) {
        data.forEach(item => {
            items.push(item.name);
            prices.push(item.price);
            quantities.push(item.quantity);
        });
    }
    initShopLogic({
        items,
        prices,
        currency,
        quantities
    });
};

const modal = document.querySelector('.modal');

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


document.addEventListener('click', e => {
    const target = e.target;
    if (target.classList.contains('modal')) modal.style.display = 'none';
});

const mySwiper = new Swiper('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,

    effect: 'slide'
});

getBasket();