//Задание 1
//На входе сделал простую проверку на передаваемое значение. Мелочь, а приятно. 
//Видел, как некоторые коллеги использовали функцию Math.floor, но я решил пойти по своему пути, по причине того, что если вводимое число будет большее 999 нужно возвращать пустой объект, у них же сразу идет вычисление единиц, десятков и сотен.
// Также решил, что проще будет число переворачивать и потом уже передавать в объект раз мы начинаем его с единиц, а не с сотен. Да, часть дублируется, но более лаконичного решения я пока не нашел(
function numToObj(num){
    const numObj = {};
    num += '';
    if(num > 999 || num == null || Number.isNaN(num) || num.match(/\D/g)) {
        console.log("Введите число меньше 1000!");
        return numObj;
    } 
    num = num.split("").reverse().join("");
    if(num.length === 3){
        numObj["единицы"] = num[0];
        numObj["десятки"] = num[1];
        numObj["сотни"] = num[2];
    } else if (num.length === 2 ){
        numObj["единицы"] = num[0];
        numObj["десятки"] = num[1];
        numObj["сотни"] = 0;
    } else {
        numObj["единицы"] = num[0];
        numObj["десятки"] = 0;
        numObj["сотни"] = 0;
    }
    return numObj;
}
    console.log(numToObj(159));

//Задание 2
//Сначала создаем конструктор для типичного товара. Да, немного грубо и не совсем гибко, но я только учусь.
// Данный класс позволит нам создать объект любого товара, конечно, было бы не плохо сделать "класс в классе", но пока эо сложно представлется.
// В классе также содержится свойство, позволяющее посчитать итоговую стоимость одного товора с учетом его количества (то есть, у нас есть 5 яблок по 100 рублей, свойство totalPrice позволит посчитать стоимость этих яблок - 500 рублей)
// Для посчета общей стоимости корзины написана функция sumTotalAmong, которая на вход получает объекты, с вызванной функцией подсчета стоимости продукта с учетом его количества, а потом все это складывает. Да, это костыльно немного, но хотелось немного заюзать редюс (пытаюсь привыкнуть к использованию этой штуки)
class Products {
    constructor (name, price, count, currency){
        this.name = name;
        this.price = price;
        this.count = count;
        this.currency = currency;
    }
    totalPrice(){
       return this.price * this.count;
    }
}

let newBuy = new Products('apples', 100, 3, "RUB");
let newBuy1 = new Products('chocolade', 25, 5, "RUB");
let newBuy2 = new Products('books', 1250, 1, "RUB");
let newBuy3 = new Products('pineapples', 100, 3, "RUB");
let newBuy4 = new Products('toilete paper', 15, 100, "RUB");

function sumTotalAmong(...args) {
    return [...args].reduce(function(sum,current){
        return sum + current;
    }, 0);
}

console.log(sumTotalAmong(newBuy.totalPrice(),newBuy1.totalPrice(),newBuy2.totalPrice(),newBuy3.totalPrice(),newBuy4.totalPrice()));

//Задание 3
// Надо было конечно сначала это сделать, прежде чем браться за второе задание, ну да ладно(
// Сначала я создаю один общий класс Товар, потом уже создаю другие классы, которые более относимы к определенным категориям - продукты, товары для дома и т.д. Освоил для себя наследование


class Product {
    constructor (name, price, count,currency){
        this.name = name;
        this.price = price;
        this.count = count;
        this.currency = currency;
    }
    totalPrice(){
        return this.price * this.count;
    }
    setItems(count) {
        this.count = count;
    }
    setPrice(price) {
        this.price = price;
        console.log(`Now ${this.name} costs ${this.price} ${this.currency}`);
    }
}

class Grocery extends Product {
    constructor(type, ...args){
        super(...args);  
        this.type = "grocery"; 
    }
}

class Books extends Product {
    constructor(type, ...args){
        super(...args);  
        this.type = "books"; 
    }
}

class Сonfectionery extends Product {
    constructor(type, ...args){
        super(...args);  
        this.type = "confectionery"; 
    }
}

class HouseholdProducts extends Product {
    constructor(type, ...args){
        super(...args);  
        this.type = "household products"; 
    }
}





let test = new Grocery("fruits",'apples', 100, 3, "RUB");
console.log(test);