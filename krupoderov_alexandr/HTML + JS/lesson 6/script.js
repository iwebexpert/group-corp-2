
//Task 1
let i = 0;
while (i !== 100){
    let count = 0;
    for (let j = 0; j <= i; j++){
        if (i % j === 0){
            count++;
        }
    }
    if (count === 2) console.log(i);
    count = 0;
    i++;
}


//Task 2, 3
let bucket = [
    {
        name: 'Pepperoni',
        size: 'S',
        price: 380,
        currency: 'RUB',
        count: 2
    },
    {
        name: 'Margarita',
        size: 'L',
        price: 580,
        currency: 'RUB',
        count: 1
    }
];

function countBasketPrice(items){
    let currency = items[0].currency;
    let sum = 0;

    items.forEach(item => {
        sum+= item.price * item.count;
    });
    return `${sum} ${currency}`
}

console.log(countBasketPrice(bucket))

//Task 4
for (let i = 0; i < 10; console.log(i++)){}

//Task 5
let str = '';
for (let i = 0; i < 20; i++) {
    str = str + 'x';
    console.log(str);
}