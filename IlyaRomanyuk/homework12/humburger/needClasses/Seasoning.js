class Seasoning {
    constructor(price, calories) {
        this.price = price;
        this.calories = calories;
    }
}

class Mayonnaise extends Seasoning {
    constructor() {
        super(20, 5);
    }
}

class Spice extends Seasoning {
    constructor() {
        super(15, 0);
    }
}