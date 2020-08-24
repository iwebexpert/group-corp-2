class Hamburger {
    constructor(size, stuffings, toppings) { 
        this.size = size;
        this.stuffings = [...stuffings];
        this.toppings = [...toppings];
    }

    getToppings() {   
        // Получить список добавок 
        return this.toppings;
    }

    getSize() {              
        // Узнать размер гамбургера 
        return this.size;
    }

    getStuffing() {          
        // Узнать начинку гамбургера 
        return this.stuffings;
    }

    calculatePrice() {       
        // Узнать цену
        let price = 0;
        switch(this.size) {
            case 'small':
                price += 50;
                break;
            case 'large':
                price += 100;
                break;
        }
        [...this.stuffings].forEach(stuffing => {
            switch(stuffing) {
                case 'cheese':
                    price += 10;
                    break;
                case 'salad':
                    price += 20;
                    break;
                case 'potato':
                    price += 15;
                    break;
            }
        });
        [...this.toppings].forEach(topping => {
            switch(topping) {
                case 'species':
                    price += 15;
                    break;
                case 'mayonese':
                    price += 20;
                    break;
            }
        });
        return price;
    }

    calculateCalories() {    
        // Узнать калорийность
        let calorificValue = 0;
        switch(this.size) {
            case 'small':
                calorificValue += 20;
                break;
            case 'large':
                calorificValue += 40;
                break;
        }
        [...this.stuffings].forEach(stuffing => {
            switch(stuffing) {
                case 'cheese':
                    calorificValue += 20;
                    break;
                case 'salad':
                    calorificValue += 5;
                    break;
                case 'potato':
                    calorificValue += 10;
                    break;
            }
        });
        [...this.toppings].forEach(topping => {
            switch(topping) {
                case 'mayonese':
                    calorificValue += 5;
                    break;
            }
        });
        return calorificValue;
    }
}
let counterSize = 0;

let size = 'small',
    snuffings = [],
    toppings = [];

const sizeElement = document.querySelector('.check-custom-toggle'),
    checkboxElements = document.querySelectorAll('.check-custom');

const getIndex = (smth, arr) => {
    let j = -1;
    [...arr].forEach((item, i) => {
        if (item === smth) j = i;
    });
    return j;
}


sizeElement.addEventListener('change', () => {
    if (sizeElement.checked) {
        size = 'large';
    } else {
        size = 'small';
    }
});

checkboxElements.forEach(elem => {
    elem.addEventListener('change', () => {
        const snuffing = elem.dataset.additive,
            topping = elem.dataset.topping;
        if (elem.checked) {
            if (snuffing) {
                snuffings.push(snuffing);
            }
            if (topping) {
                toppings.push(topping);
            }
        } else {
            snuffings.splice(getIndex(snuffing, snuffings), 1);
            toppings.splice(getIndex(topping, toppings), 1);
        }
    });
});

const btnSubmit = document.querySelector('.submit');

btnSubmit.addEventListener('click', () => {
    const hamburger = new Hamburger(size, snuffings, toppings);

    const amountTitle = document.querySelector('.title-amount');
    amountTitle.textContent = `Ваш гамбургер содержит ${hamburger.calculateCalories()} калорий и стоит ${hamburger.calculatePrice()} RUB`;
    // amountTitle.style.display = 'block';
});
