class Ingredients {
    constructor(price, calories) {
        this.price = price;
        this.calories = calories;
    }
}

class Potato extends Ingredients {
    constructor() {
        super(15, 10);
    }
}

class Salad extends Ingredients {
    constructor() {
        super(20, 5);
    }
}

class Cheese extends Ingredients {
    constructor() {
        super(10, 20);
    }
}