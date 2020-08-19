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

}