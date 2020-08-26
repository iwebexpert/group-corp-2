const bigHumburger = document.querySelector('#bigHumburger');
const smallHumburger = document.querySelector('#smallHumburger');
const cheese = document.querySelector('#cheese');
const salad = document.querySelector('#salad');
const potatoes = document.querySelector('#potatoes');
const seasoning = document.querySelector('#seasoning');
const mayonnaise = document.querySelector('#mayonnaise');
const successBtn = document.querySelector('.btn');
let hamburger;

class Hamburger {
    constructor(size) {
        this.size = size;
        this.stuffing = [];
    }
    createHamburger() {
        if (salad.checked) {
            this.stuffing.push(new Salad);
        }
        if (potatoes.checked) {
            this.stuffing.push(new Potatoes);
        }
        if (cheese.checked) {
            this.stuffing.push(new Cheese);
        }
        if (seasoning.checked) {
            this.stuffing.push(new Seasoning);
        }
        if (mayonnaise.checked) {
            this.stuffing.push(new Mayonnaise);
        }
    }
    countTotalPrice() {
        let totalPrice = this.price;
        for (let i = 0; i < this.stuffing.length; i++) {
            totalPrice += this.stuffing[i].price;
        }
        return `${totalPrice} рублей`;
    }

    countTotalCalories() {
        let totalCalories = this.calories;
        for (let i = 0; i < this.stuffing.length; i++) {
            totalCalories += this.stuffing[i].calories;
        }
        return totalCalories;
    }

    appendTotal() {
        const totalPriceValue = document.querySelector('.total-price--value');
        const totalCaloriesValue = document.querySelector('.total-calories--value');
        totalPriceValue.textContent = this.countTotalPrice();
        totalCaloriesValue.textContent = this.countTotalCalories();
    }
}
class BigHamburger extends Hamburger {
    constructor() {
        super('big');
        this.price = 100;
        this.calories = 40;
    }
}

class MiniHamburger extends Hamburger {
    constructor() {
        super('mini');
        this.price = 50;
        this.calories = 20;
    }
}

//Начинки
class Toppings {
    constructor(price, calories) {
        this.price = price;
        this.calories = calories;
    }
}

class Cheese extends Toppings {
    constructor() {
        super(10, 20);
    }
}

class Salad extends Toppings {
    constructor() {
        super(20, 5);
    }
}

class Potatoes extends Toppings {
    constructor() {
        super(15, 10);
    }
}


//Другие добавки
class OtherAdditives {
    constructor(price, calories) {
        this.price = price;
        this.calories = calories;
    }
}

class Seasoning extends OtherAdditives {
    constructor() {
        super(15, 0);
    }
}

class Mayonnaise extends OtherAdditives {
    constructor() {
        super(20, 5);
    }
}

//Подсчет итогов по нажатию
successBtn.addEventListener('click', () => {
    if (bigHumburger.checked)
        hamburger = new BigHamburger();
    else
        hamburger = new MiniHamburger();

    hamburger.createHamburger();
    hamburger.countTotalPrice();
    hamburger.countTotalCalories();
    hamburger.appendTotal();
});

//Смена картинки гамбургера
let img = document.querySelector('img')
smallHumburger.addEventListener('click', () => {
    img.src = 'https://raketaburger.ru/wp-content/uploads/2019/09/-%D1%80%D0%B0%D0%BA%D0%B5%D1%82%D0%B0-min-960x600.jpg';
});

bigHumburger.addEventListener('click', () => {
    img.src = 'https://eda.yandex/images/1380157/4797a7c69d2b66f4e90cad9cb0446e2e-400x400.jpeg';
});