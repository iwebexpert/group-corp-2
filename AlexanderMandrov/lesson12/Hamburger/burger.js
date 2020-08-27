class Additive {
    constructor(type, price, calorificValue) {
        this.type = type;
        this.price = price;
        this.calorificValue = calorificValue;
    }

    render() {
        let additiveText = '';
        switch(this.type) {
            case 'cheese':
                additiveText = 'C сыром';
                break;
            case 'potato':
                additiveText = 'C картофелем';
                break;
            case 'salad':
                additiveText = 'C салатом';
                break;
        }
        const dataAdditive = `
        <label>
            <input type="checkbox" class="check-custom" data-additive="${this.type}">
            <span class="check-toggle"></span>
            <span class="checkbox-text">${additiveText} (+${this.price} рублей, +${this.calorificValue} калорий)</span>
        </label>
        `;
        document.querySelector('.additive-wrapper').insertAdjacentHTML('beforeend', dataAdditive);
    }
}

class Topping {
    constructor(type, price, calorificValue) {
        this.type = type;
        this.price = price;
        this.calorificValue = calorificValue;
    }

    render() {
        let toppingText = '';
        switch(this.type) {
            case 'species':
                toppingText = 'Посыпать преправой';
                break;
            case 'mayonese':
                toppingText = 'Полить майонезом';
                break;
        }
        const dataTopping = `
        <label>
            <input type="checkbox" class="check-custom" data-topping="${this.type}">
            <span class="check-toggle"></span>
            <span class="checkbox-text">${toppingText} (+${this.price} рублей, +${this.calorificValue} калорий)</span>
        </label>
        `;
        document.querySelector('.topping-wrapper').insertAdjacentHTML('beforeend', dataTopping);
    }
}

class Hamburger {
    constructor(size, stuffings, toppings) { 
        this.size = size;
        this.stuffings = [...stuffings];
        this.toppings = [...toppings];
    }

    addTopping(topping) {
        //create and render topping on website
        const tempTopping = new Topping(topping.type, topping.price, topping.calorificValue);
        tempTopping.render();
    }

    addAdditive(additive) {
        //create and render additive on website
        const tempAdditive = new Additive(additive.type, additive.price, additive.calorificValue);
        tempAdditive.render();
    }

    init() {
        const toppingList = [
        {
            type: 'species',
            price: 15,
            calorificValue: 0,
        },
        {
            type: 'mayonese',
            price: 20,
            calorificValue: 5,
        }];
        toppingList.forEach(topping => this.addTopping(topping));

        const additiveList = [
            {
                type: 'cheese',
                price: 10,
                calorificValue: 20,
            },
            {
                type: 'salad',
                price: 20,
                calorificValue: 5,
            },
            {
                type: 'potato',
                price: 15,
                calorificValue: 10,
            }];
            additiveList.forEach(additive => this.addAdditive(additive));
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

//render additives and toppings
const hamburger = new Hamburger('small', [], []);
hamburger.init();

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
});