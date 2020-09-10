import { checkInputs } from './utils.js';
import { sendData } from './services.js';

const ulList = document.querySelector('.list');
const totalPrice = document.querySelector('.total__price');

const renderBasket = (products) => {
    const liItems = document.querySelectorAll('.item');
    liItems.forEach(item => item.remove());

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

export default class Basket {
    constructor({ items, prices, currency, quantities }) {
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
        if (this.items[i]) return this.items[i];
    }

    getItems() {
        return this.items;
    }

    getItemQuantity(i){
        if (this.quantities[i]) return +this.quantities[i];
    }

    getItemPrice(i) {
        if (this.prices[i]) return this.prices[i];
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
        sendData(`basket/${name}`,'PATCH', { quantity: quantity });
    }

    pushItem(item) {
        this.items.push(item.name);
        this.prices.push(item.price);
        this.quantities.push(item.quantity);
        sendData('basket', 'POST', { 'id': item.name, ...item });
    }

    deleteItem(i, name) {
        this.items.splice(i, 1);
        this.prices.splice(i, 1);
        this.quantities.splice(i, 1);
        sendData(`basket/${name}`, 'DELETE');
    }
    
    getOrder() {
        let orderMessage = '';
        [...this.getItems()].forEach((item, i) => {
            orderMessage += `${item} ${this.getItemQuantity(i)}x, `
        });

        return orderMessage.split(0, orderMessage.length - 1);
    }
}

export { renderBasket };