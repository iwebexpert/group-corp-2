//1

function isPrime(num){
    let i = 2;
    while(i <= Math.sqrt(num)){
        if(num % i === 0){
            return false;
        }
        i++;
    } 
    return num > 1;
}

function getPrimes(num){
    let primes =[];
    let j = 2;
    while (j <= num){
        if(isPrime(j)){
            primes.push(j);
        }
        j++;
    }
    // primes = primes.join();
    return primes.join(', ');
}

console.log(getPrimes(100));

//2-3
 
function countBasketPrice(goods){
let totalAmoung = 0;
    for (let i = 0; i < goods.length; i++){
        totalAmoung +=  goods[i][1] * goods[i][2];
}
return totalAmoung;
}

console.log(countBasketPrice([
    ['apples', 100, 3, "RUB"],
    ['chocolade', 25, 5, "RUB"],
    ['books', 1250, 1, "RUB"],
    ['pineapples', 100, 3, "RUB"],
    ['apple Music card', 100, 3, "RUB"],
    ['toilete paper', 15, 100, "RUB"]
]));

//4

for(let i=0 ; i <= 9;console.log(i),i++);

//5

let i = '';
for(let j = 0; j < 20;j++){
    console.log(i += '*' );
}