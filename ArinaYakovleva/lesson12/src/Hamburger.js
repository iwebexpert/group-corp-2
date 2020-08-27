const cheese = document.querySelector('#cheese'),
    container = document.querySelector('.container'),
    salad = document.querySelector('#salad'),
    potato = document.querySelector('#potato'),
    pepper = document.querySelector('#pepper'),
    mayonnaise = document.querySelector('#mayonnaise'),
    resultTxt = document.querySelector('.result-txt');

class Hamburger {
    constructor(size) {
        this.size = size;
        this.ingridients = [];
    }

    addStuffings() {
        if (cheese.checked) {
            this.ingridients.push(new Cheese);
        } if (salad.checked) {
            this.ingridients.push(new Salad);
        } if (potato.checked) {
            this.ingridients.push(new Potato);
        } if (pepper.checked) {
            this.ingridients.push(new Pepper);
        } if (mayonnaise.checked) {
            this.ingridients.push(new Mayonnaise);
        }
    }

    calculatePrice() {
        if (this.ingridients.length === 0) {
            return 0;
        }
        return this.ingridients.map((item) => item.price).reduce((a, b) => a + b);
    }

    calculateCalories() {
        if (this.ingridients.length === 0) {
            return 0;
        }
        return this.ingridients.map((item) => item.calories).reduce((a, b) => a + b);
    }

    calculateTotalAmount() {
        if (this.size === 'Маленький') {
            resultTxt.textContent = `Цена твоего бургера: ${this.calculatePrice() + 50} RUB, в нем ${this.calculateCalories() + 20} калорий`;
        } else if (this.size === 'Большой') {
            resultTxt.textContent = `Цена твоего бургера: ${this.calculatePrice() + 100} RUB, в нем ${this.calculateCalories() + 40} калорий`;
        }
    }

}

