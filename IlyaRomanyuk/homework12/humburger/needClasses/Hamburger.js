class Hamburger {
    constructor(size) {
        this.size = size;
        this.ingredients = [];
    }

    createHamburger() {
        if (cheese.checked) {
            this.ingredients.push(new Cheese);
        }
        if (salad.checked) {
            this.ingredients.push(new Salad);
        }
        if (potato.checked) {
            this.ingredients.push(new Potato);
        }
        if (spice.checked) {
            this.ingredients.push(new Spice);
        }
        if (mayonnaise.checked) {
            this.ingredients.push(new Mayonnaise);
        }
    }

    calculatePrice() {
        let totalPrice = this.price;
        this.ingredients.forEach(el => totalPrice += el.price)
        return totalPrice;
    }

    calculateCalories() {
        let totalCalories = this.caloricContent;
        this.ingredients.forEach(el => totalCalories += el.calories)
        return totalCalories;
    }

    showTotal() {
        result.textContent = `Цена: ${this.calculatePrice()}, калории: ${this.calculateCalories()}.`
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
    constructor() {
        super('small');
        this.price = 50;
        this.caloricContent = 20;
    }
}