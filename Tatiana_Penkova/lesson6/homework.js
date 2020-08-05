// Задание №1

for (let i = 2; i < 100; i++) {
    let count = 0;
    let j = 1;

    while (j < i) {

        j++;

        if (i % j) {
            continue;
        }

        count += 1;
    }

    if (count === 1) {
        console.log(i);
    }
}

// Задание №2

const basket = [
    {
        title: "War and Peace",
        price: 1000,
        currency: "RUB",
        count: 3
    },
    {
        title: "The Idiot",
        price: 500,
        currency: "RUB",
        count: 2
    },
    {
        title: "The Master and Margarita",
        price: 800,
        currency: "RUB",
        count: 1
    },
    {
        title: "A Dog's Heart",
        price: 600,
        currency: "RUB",
        count: 4
    },
    {
        title: "A Hero of Our Time",
        price: 700,
        currency: "RUB",
        count: 2
    },
]

function countBasketPrice(array) {
    let basketPrice = 0;
    for (let i = 0; i < array.length; i++) {
        basketPrice += array[i].price * array[i].count;

    }
    return basketPrice;
}

console.log(countBasketPrice(basket));

//  Задание №3

for (let i = 0; i < 10; console.log(i++)) {

}

// Задание №4

for (let i = 0; i <= 20; i++) {
    console.log("x".repeat(i));
}