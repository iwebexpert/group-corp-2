//Наш класс корзина из прошлого задания
class Basket {
    constructor(items, currency, prices, quantities) {
        this.items = [...items]
        this.currency = currency;
        this.prices = [...prices];
        this.quantities = [...quantities];

    }

    getAllItems() {
        this.items.map((item) => item);
    }

    getItem(index) {
        return this.items[index];
    }

    getItemPrice(index) {
        return this.prices[index];
    }

    getQuantityPrice(index) {
        return this.prices[index] * this.quantities[index];
    }

    getItemQuantity(index) {
        return this.quantities[index];
    }

    getCurrency() {
        return this.currency;
    }

    addItem(obj) {
        this.items.push(obj.name);
        this.prices.push(obj.price);
        this.quantities.push(obj.quantity);

    }

    removeItem(index) {
        this.items.splice(index, 1);
        this.prices.splice(index, 1);
        this.quantities.splice(index, 1);

    }
    changeItem(index, value) {
        this.items[index] = value;
    }

    changePrice(index, price) {
        this.prices[index] = price;
    }

    countBasketPrice() {
        let resArr = [];
        for (let i = 0; i < this.prices.length; i++) {
            resArr.push(this.prices[i] * this.quantities[i]);
        }

        return resArr.reduce((a, b) => a + b);
    }



}

//Создаем и получаем элементы для нашей корзины
const basket = document.querySelector('.basket'),
    basketText = document.createElement('p'),
    buyBtn = document.querySelector('.buy'),
    products = document.querySelector('.products'),
    list = document.createElement('ul'),
    amount = document.createElement('div');

amount.innerText = 'Basket is empty';
amount.classList.add('total_amount');
basketText.innerText = 'Basket';
basketText.classList.add('basket-header');
list.classList.add('basket-list');

basket.appendChild(basketText);
basket.appendChild(list);
basket.appendChild(amount);

//Функция создания корзины
function createBasket(products) {
    const basketList = document.querySelector('.basket-list');
    const listItems = document.querySelectorAll('.basket-item');

    listItems.forEach((item) => item.remove());

    let amount = document.querySelector('.total_amount');
    amount.innerText = 'Baket is empty';

    for (let i = 0; i < products.items.length; i++) {
        const liItem = document.createElement('li');
        liItem.classList.add('basket-item');

        const productName = document.createElement('div');
        productName.classList.add('item-name');
        productName.insertAdjacentHTML('afterbegin', products.getItem(i));

        const productQuantity = document.createElement('div');
        productQuantity.classList.add('quantity');
        productQuantity.insertAdjacentHTML('afterbegin', products.getItemQuantity(i));

        const productPrice = document.createElement('div');
        productPrice.classList.add('item-price');
        productPrice.insertAdjacentHTML('afterbegin', `${products.getQuantityPrice(i)} ${products.getCurrency()} `);

        liItem.insertAdjacentElement('beforeend', productName);
        liItem.insertAdjacentElement('beforeend', productQuantity);
        liItem.insertAdjacentElement('beforeend', productPrice);

        basketList.insertAdjacentElement('beforeend', liItem);
        amount.textContent = `Total amount of your basket is ${products.countBasketPrice()} ${products.currency} `;
    }
}



let productsBasket = new Basket([], 'RUB', [], []);

//Добавление и удаление товара из корзины по клику с использованием делегирования
products.addEventListener('click', (e) => {
    const target = event.target,
        product = target.closest('.product-card'),
        number = product.dataset.number,
        productName = document.querySelectorAll('.name')[number].textContent;
    if (target.classList.value === 'buy') {
        const price = document.querySelectorAll('.price')[number].textContent,
            quantity = document.querySelectorAll('.quantity-input')[number].value;

        const productObj = {
            name: productName,
            price: parseInt(price),
            currency: 'RUB',
            quantity: quantity,
        }

        productsBasket.addItem(productObj);
        createBasket(productsBasket);

    }
    else if (target.classList.value === 'delete') {
        for (let i = 0; i < productsBasket.items.length; i++) {
            if (productsBasket.items[i] == productName) {
                productsBasket.removeItem(i);
            }
        }

        createBasket(productsBasket);
    }


});


