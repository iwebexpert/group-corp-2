class Basket {
    constructor(items, currency, prices, quantities) {
        this.items = [...items]
        this.currency = currency;
        this.prices = [...prices];
        this.quantities = [...quantities];

    }

    getAllItems() {
        return this.items;
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

    changeQuantity(name, quantity) {
        let index = 0;
        [...this.getAllItems()].forEach((item, i) => {
            if (item === name) {
                index = i;
            }
        });

        this.quantities[index] = quantity;

    }

    countBasketPrice() {
        let resArr = [];
        for (let i = 0; i < this.prices.length; i++) {
            resArr.push(this.prices[i] * this.quantities[i]);
        }
        if (resArr.length > 0) {
            return `Total amount of your basket is ${resArr.reduce((a, b) => a + b)} ${this.currency}`;
        } else {
            return `Basket is empty`;
        }
    }

    renderBasket() {
        const basketList = document.querySelector('.basket-list');
        const listItems = document.querySelectorAll('.basket-item');

        listItems.forEach((item) => item.remove());

        let amount = document.querySelector('.total_amount');
        amount.textContent = 'Baket is empty';

        for (let i = 0; i < this.items.length; i++) {
            const liItem = document.createElement('li');
            liItem.classList.add('basket-item');

            const productName = document.createElement('div');
            productName.classList.add('item-name');
            productName.insertAdjacentHTML('afterbegin', this.getItem(i));

            const productQuantity = document.createElement('div');
            productQuantity.classList.add('quantity');
            productQuantity.setAttribute('data-product', `${this.getItem(i)}`)
            productQuantity.insertAdjacentHTML('afterbegin', this.getItemQuantity(i));

            const trashIcon = document.createElement('img');
            trashIcon.src = './img/itrash_icon.png';
            trashIcon.alt = 'Delete';
            trashIcon.setAttribute('data-counter', `${i}`);
            trashIcon.classList.add('trash-icon');
            trashIcon.addEventListener('click', () => {
                this.removeItem(i);
                this.renderBasket();
                addButtonsListeners();
            })

            const productPrice = document.createElement('div');
            productPrice.classList.add('item-price');
            productPrice.insertAdjacentHTML('afterbegin', `${this.getQuantityPrice(i)} ${this.getCurrency()} `);
            productPrice.setAttribute('data-product', `${this.getItem(i)}`);


            liItem.insertAdjacentElement('beforeend', productName);
            liItem.insertAdjacentHTML('beforeend', `<button class="minus-btn" data-product=${this.getItem(i)}>-</button>`);
            liItem.insertAdjacentElement('beforeend', productQuantity);
            liItem.insertAdjacentHTML('beforeend', `<button class="plus-btn" data-product=${this.getItem(i)}>+</button>`);
            liItem.insertAdjacentElement('beforeend', productPrice);
            liItem.insertAdjacentElement('beforeend', trashIcon);
            basketList.insertAdjacentElement('beforeend', liItem);
            amount.textContent = `${this.countBasketPrice()}`;
        }

    }

}

