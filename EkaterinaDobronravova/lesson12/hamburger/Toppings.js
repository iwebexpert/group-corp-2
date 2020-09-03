class Toppings {
    constructor(price, caloric) {
        this.price = price;
        this.caloric = caloric;
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
