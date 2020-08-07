
function numObj() {
    let n = +prompt('Введите число от 0 до 999');
    let number = {};

    if (n <= 999 && n >= 0) {
        number.units = Math.floor(n % 10);
        number.tens = Math.floor(n / 10 % 10);
        number.hundreds = Math.floor(n / 100 % 10);
        console.log(number);
    }
    else {
        console.log('Вы вышли из диапазона, введите другое число');
        return (number);
    }
}
numObj();

// 2.1 примитивный и топорный вариант
/*
const apples = {
    price: 100,
    quantity: 2,
}
const onion = {
    price: 50,
    quantity: 3,
}
const potatoes = {
    price: 48,
    quantity: 4,
}
const salad = {
    price: 32,
    quantity: 4,
}
const carrot = {
    price: 130,
    quantity: 1,
}
const pasta = {
    price: 133,
    quantity: 1,
}
let sum = 0;
sum = sum + apples.price * apples.quantity + onion.price * onion.quantity + potatoes.price *
    potatoes.quantity + salad.price * salad.quantity + carrot.price * carrot.quantity +
    pasta.price * pasta.quantity;
console.log(sum); */

// 2.2 менее топорное решение вижу таким

let arr = [];
const reducer = (a, b) => a + b;
class Basket {
    constructor(product, price, quantity) {
        this.product = product;
        this.price = price;
        this.quantity = quantity;
    }

    countSum() {
        let sum = this.price * this.quantity;
        arr.push(sum);
        return arr;
    }
}

function sumTotal(arr) {
    return arr.reduce(reducer);
}
let potato = new Basket('potato', 100, 1);
let tomato = new Basket('tomato', 100, 2);
let apple = new Basket('apple', 130, 2);

console.log(sumTotal(potato.countSum(), tomato.countSum(), apple.countSum()));