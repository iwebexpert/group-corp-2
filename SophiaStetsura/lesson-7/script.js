let n = +prompt('Введите число от 0 до 999');

let number = {
    units: 0,
    tens: 0,
    hundreds: 0,
};

if (n <= 999 && n >= 0) {
    number.units = Math.floor(n % 10);
    number.tens = Math.floor(n / 10 % 10);
    number.hundreds = Math.floor(n / 100 % 10);
    console.log(number);
}
else console.log('Вы вышли из диапазона, введите другое число');

// 2

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
console.log(sum);

