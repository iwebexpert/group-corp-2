export default class Basket {
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