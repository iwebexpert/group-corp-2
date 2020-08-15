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
    getItemQuantity(i){
        return this.quantities[i];
    }
    getItemPrice(i) {
        return this.prices[i];
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
}

let shopList = document.querySelector('.shop__list');
let products = new Basket([], [], 'RUB', []);
var counter = 0;

const renderShopItem = (name, price, currency) => {
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
};

const shopArr = [
    {
        name: 'keyboard',
        price: '1000',
        currency: 'RUB'
    },
    {
        name: 'mouse',
        price: '500',
        currency: 'RUB'
    },
    {
        name: 'cover',
        price: '300',
        currency: 'RUB'
    },
    {
        name: 'phone',
        price: '30000',
        currency: 'RUB'
    }
];

shopArr.forEach(item => {
    renderShopItem(item.name, item.price, item.currency);
});

const renderBasket = (products) => {
    let ulList = document.querySelector('.list');
    const liItems = document.querySelectorAll('.item');
    liItems.forEach(item => item.remove())
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
        itemQuantity.classList.add('item--inner');
        itemQuantity.classList.add('item__quantity');
        itemQuantity.insertAdjacentHTML('afterbegin', products.getItemQuantity(i));

        const itemPrice = document.createElement('div');
        itemPrice.classList.add('item--inner');
        itemPrice.classList.add('item__price');
        itemPrice.insertAdjacentHTML('afterbegin', `${products.getItemPrice(i) * products.getItemQuantity(i)} ${products.currency}`);

        liItem.insertAdjacentElement('beforeend', itemName);
        liItem.insertAdjacentElement('beforeend', itemQuantity);
        liItem.insertAdjacentElement('beforeend', itemPrice);

        ulList.insertAdjacentElement('beforeend', liItem);
        totalPrice.textContent = `Total amount is ${products.countBasketPrice()} ${products.currency}`;
    };

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
        }

        products.pushItem(tempObj);
        renderBasket(products);
    }
    if (target.classList.contains('btn-delete')) {
        products.items.forEach((item, i) => {
            if (item == itemName) {
                products.deleteItem(i);
            }
        });
        renderBasket(products);
    }
});

const shopImages = document.querySelectorAll('.shop__img'),
    modal = document.querySelector('.modal'),
    modalName = document.querySelector('.modal__name'),
    modalPrice = document.querySelector('.modal__price');

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
    })
});

document.addEventListener('click', e => {
    const target = e.target;
    if (target.classList.contains('modal')) modal.style.display = 'none';
});
