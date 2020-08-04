// 1

function numPrime(n) {
    var max = Math.floor(Math.sqrt(n));
    let i = 2;
    while (i <= max) {
        if (n % i == 0) {
            return false;
        }
        i++;
    }
    return true;
}
var arr = [];
for (var i = 2; i <= 100; i++) {
    if (numPrime(i))
        arr.push(i);
}
console.log(arr);


// 2
// 3

let basket = [["apples", 150], ["onion", 50], ["potatoes", 35],
["salad", 70], ["carrot", 77], ["apricots", 140], ["bread", 25], ["pasta", 100],
["mushrooms", 140], ["tomato", 150], ["cucumbers", 125]];

function countBasketPrice(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum = sum + arr[i][1];
    }
    console.log(sum);
}
countBasketPrice(basket);
// 4
for (let i = 0; i <= 9; console.log(i++)) { }

// 5
let x = '';
let number = 1;
while (number <= 20) {
    x = x + "x";
    console.log(x);
    number++;
}
