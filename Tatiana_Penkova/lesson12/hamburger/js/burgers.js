class Hamburger {
    constructor(size, stuffing) {
        this.size = size;
        this.stuffing = [];
    }

    createHamburger() {
        if (cheese.checked) {
            this.stuffing.push(new Cheese);
        }
        if (salad.checked) {
            this.stuffing.push(new Salad);
        }
        if (potato.checked) {
            this.stuffing.push(new Potato);
        }
        if (pepper.checked) {
            this.stuffing.push(new Pepper);
        }
        if (mayo.checked) {
            this.stuffing.push(new Mayo);
        }

    }

    getSize() {
        return this.size;

    }

    getStuffing() {
        return this.stuffing
    }

    calculatePrice() {
        let totalPrice = this.price;
        for (let i = 0; i < this.stuffing.length; i++) {
            totalPrice += this.stuffing[i].price;
        }
        return totalPrice;
    }

    calculateCalories() {
        let totalCalories = this.caloricContent;
        for (let i = 0; i < this.stuffing.length; i++) {
            totalCalories += this.stuffing[i].caloricContent;
        }
        return totalCalories;
    }

    showTotal() {
        let totalCalories = this.caloricContent;
        let totalPrice = this.price;
        for (let i = 0; i < this.stuffing.length; i++) {
            totalPrice += this.stuffing[i].price;
            totalCalories += this.stuffing[i].caloricContent;
        }

        calc.textContent = `Ваш бургер будет стоить ${totalPrice} рублей и содержать ${totalCalories} калорий. Приятного аппетита!`
    }

}

class BigHamburger extends Hamburger {
    constructor() {
        super('big');
        this.price = 100;
        this.caloricContent = 40;


    }
}

class SmallHamburger extends Hamburger {
    constructor(price, caloricContent) {
        super('small');
        this.price = 50;
        this.caloricContent = 20;
    }
}

// let burger = new SmallHamburger();
// console.log(burger)

// burger = new BigHamburger();
// console.log(burger)
