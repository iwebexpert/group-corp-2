//Задание 1 Простые числа
console.log('Задание 1');
console.log('Вывод простых чисел от 0 до 100');
let x = 100;
let i = 1, j = 1;
let result = [];
let primes = [];

while (i <= x) {
    while (j <= x) {
        if (i % j == 0) {
            primes.push(j);
        }
        ++j
    }
    if (primes.length == 2) {
        result.push(i);
        primes = [];
        j = 1;
        ++i;
    } else {
        primes = [];
        j = 1;
        ++i;
    }
}
console.log(result);

//Задание 2 - 3 Подсчёт стоимости товаров
console.log('Задание 2 - 3');
console.log('Стоимость товаров');
let ShopBasket = [
    {
        name: 'Настольная лампа',
        cost: 2510,
        amount: 2,
        currency: 'RUB'
    },
    {
        name: 'Кухонный стол',
        cost: 15990,
        amount: 1,
        currency: 'RUB'
    },
    {
        name: 'Кухонный стул',
        cost: 5990,
        amount: 4,
        currency: 'RUB'
    }
];
function countBasketPrice(ShopBasket) {
    let result = 0;
    for (let i = 0; i < ShopBasket.length; i++) {
        result += ShopBasket[i].cost;
    }
    return result;
}
let amt = countBasketPrice(ShopBasket);
console.log(amt);

//Задание 4 Вывести числа от 0 до 9 циклом for без тела
console.log('Задание 4');
console.log('Вывести числа от 0 до 9 циклом for без тела');
for (let i = 0; i <= 9; console.log(i++));

//Задание 5 Вывести пирамиду с 20 рядами с помощью console.log
console.log('Задание 5');
console.log('Вывести пирамиду с 20 рядами с помощью console.log');
let str = '';
for (let i = 0; i <= 20; ++i) {
    str += 'x';
    console.log(str);
}