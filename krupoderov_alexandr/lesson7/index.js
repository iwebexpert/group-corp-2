'use strict'

//Task 1
// class Translate {
//     constructor(number) {
//         if (number > 1000) throw new Error('Your number more than 1000. Please enter the number from 0 to 1000');
//         else if (number < 0) throw new Error('Your number < 0');
//         let splittedNumber = number.toString().split('');
//         this.hundreds = +splittedNumber[0];
//         this.dozens = +splittedNumber[1];
//         this.units = +splittedNumber[2];
//     }
// }
//
// let num = new Translate(123);
// console.log(num);

//Task 2, 3

class Product {
    constructor(id, name, weight, category, price, description) {
        this.id = id;
        this.name = name;
        this.weight = weight;
        this.category = category;
        this.standartPrice = price;
        this.price = price;
        this.description = description;
    }

    mmakeDiscuont(percent) {
        if (this.price) this.price *= 1 - percent/100;
        else console.log('Цена не задана');
        this.getInfo()
    }

    returnPrice(){
        this.price = this.standartPrice;
        this.getInfo();
    }

    getInfo(){
        console.log(`Продукт ${this.name}. Его вес ${this.weight}. Категория: ${this.category}. Цена: ${this.price}. Краткое описание продукта: ${this.description}`);
    }

    addCategory(category){
        this.category.push(category);
        this.getInfo();
    }

    deleteCategory(category){
        for (let i = 0; i < this.category.length; i ++){
            if (this.category[i] === category) {
                this.category.splice(i, 1);
                this.getInfo();
                return;
            }
        }
        console.log('Такой категории нет');
    }
}

let apple = new Product(1, 'Apple', '1000', ['fruit', 'fresh'], 150, 'Some fresh and tasty apple');
apple.getInfo();
apple.mmakeDiscuont(20);
apple.returnPrice();
apple.addCategory('discount');
apple.deleteCategory('discount');
apple.deleteCategory('mmm');

class Bucket {
    constructor(user) {
        this.user = user;
        this.products = [];
        this.sum = 0;
    }
    addProduct(product, count){
        if (product && product instanceof Product && count > 0){
            product.count = count;
            this.products.push(product);
            return this;
        }else{
            console.log('Неправильный продукт или неверно указано количество');
        }
    }

    sumBucket(){
        this.products.forEach(item => {
            this.sum += item.price * item.count;
        })
        console.log(`${this.user} набрал товаров на сумму: ${this.sum} рублей`);
    }
}

let alexBucket = new Bucket('Alexandr');
alexBucket.addProduct(apple, 5).sumBucket();


