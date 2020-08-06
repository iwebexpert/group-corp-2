//Задание 1 Написать функцию, преобразующую число в объект

/* Можно сделать с использованием изученных объектов, но по условию нужна функция
let count = {
    units: 0,
    ten: 0,
    hundreds: 0,
    answer: {},
    separationCount: function (num) {
        this.units = num % 10;
        this.ten = Math.trunc(num / 10 % 10);
        this.hundreds = Math.trunc(num / 100);
        return {
            'Сотни': this.hundreds,
            'Десятки': this.ten,
            'Единицы': this.units
        }
    },
}
*/

console.log('Задание 1');
let num = prompt('Введите число от 0 до 999');
let emptyObj = {};

function separationCount(num) {
    return {
        'Сотни': Math.trunc(num / 100),
        'Десятки': Math.trunc(num / 10 % 10),
        'Единицы': num % 10
    }
}

if (num > 0 && num < 999) {
    console.log(`Вы ввели ${num}, в котором:`);
    console.log(separationCount(num));
} else {
    console.log('Введено неверное число');
    console.log(emptyObj);
}

//Задание 2 - 3
console.log('Задание два');

class Items {
    constructor(name, cost, amount) {
        this.name = name;
        this.cost = cost;
        this.amount = amount;
    }
}

class Basket {
    constructor() {
        this.itemsInBasket = [];
    }
    addToBasket(items) {
        this.itemsInBasket.push(items);
        console.log(`В корзине ${this.itemsInBasket.length} товар(a/ов)`);
    }
    deleteFromBasket(itemname) {
        for (let i = 0; i < this.itemsInBasket.length; i++) {
            if (this.itemsInBasket[i].name == itemname) {
                this.itemsInBasket.pop();
                console.log("Товар удален успешно");
                return;
            }
        }
        console.log('Товара не найдено в корзине')
    }
    totalPrice() {
        let result = 0;
        for (let i = 0; i < this.itemsInBasket.length; i++) {
            result += this.itemsInBasket[i].cost * this.itemsInBasket[i].amount;
        }
        console.log(`Цена товаров в корзине: ${result}`)
    }
    basketInfo() {
        let array = [];
        let j = 0;
        for (let i = 0; i < this.itemsInBasket.length; i++) {
            ++j;
            array.push(this.itemsInBasket[i].name, this.itemsInBasket[i].cost, this.itemsInBasket[i].amount);
        }
        console.log(`В корзине найдено ${j} товар(а/ов)`);
        console.log(array);
    }
}

let chair = new Items('Стул', 2000, 2);
let yellowtable = new Items('Желтый стол', 15000, 1);
let lamp = new Items('Лампа', 3590, 2);

let mainBasket = new Basket();

mainBasket.addToBasket(yellowtable); //Добавить товар
mainBasket.addToBasket(chair); //Добавить товар
mainBasket.totalPrice(); //Цена товаров
mainBasket.deleteFromBasket('Стул'); //Удалить товар из корзины
mainBasket.addToBasket(chair);
mainBasket.addToBasket(chair);
mainBasket.addToBasket(lamp);
mainBasket.basketInfo(); //Инофрмация о корзине
mainBasket.totalPrice(); 