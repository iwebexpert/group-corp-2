const basket = document.querySelector('.basket');

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

const shopList = document.querySelector('.shop__list');
let products = new Basket([], [], 'RUB', []);

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