class Toppings {
    constructor(price, caloricContent) {
        this.price = price;
        this.caloricContent = caloricContent;
    }
}

class Potato extends Toppings {
    constructor() {
        super(15, 10);
    }
}

class Salad extends Toppings {
    constructor() {
        super(20, 5);
    }
}

class Cheese extends Toppings {
    constructor() {
        super(10, 20);
    }
}

// let potato = new Potato()

// console.log(potato)