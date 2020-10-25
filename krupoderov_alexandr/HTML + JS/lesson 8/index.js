'use strict'

//Task1
document.addEventListener('DOMContentLoaded', () => {
    let desk = document.getElementById('chess');
    generateDesk(desk);
    getMarks();
});

function generateSquare(color){
    let square = document.createElement('div');
    if (color === 'black') square.classList.add('black-square');
    else square.classList.add('white-square');
    return square;
}

function generateRow(flag) {
    let squares = [];
    if (flag === 1){
        for (let i = 0; i < 8; i ++){
            if (i % 2 === 0){
                let square = generateSquare('black');
                square.classList.add('labels');
                squares.push(square);
            } else {
                let square = generateSquare('white');
                square.classList.add('labels');
                squares.push(square);
            }
        }
    }else if (flag === 2){
        for (let i = 0; i < 8; i ++){
            if (i % 2 === 0){
                let square = generateSquare('white');
                square.classList.add('labels');
                squares.push(square);
            } else {
                let square = generateSquare('black');
                square.classList.add('labels');
                squares.push(square);
            }
        }
    }
    let row = document.createElement('div');
    squares.forEach( item => {row.appendChild(item)});
    row.classList.add('row');
    return row;
}

function generateDesk(desk) {
    let rows = [];
    for (let i = 0; i < 8; i ++){
        if (i % 2 === 0){
            let row = generateRow(1);
            rows.push(row);
        } else {
            let row = generateRow(2);
            rows.push(row);
        }
    }
    rows.forEach(row => {desk.appendChild(row)});
    return desk;
}

function getMarks() {
    let helpArrayLetter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    let helpArrayNumber = ['1', '2', '3', '4', '5', '6', '7', '8'];
    let marks = document.querySelectorAll('.labels');
    let marker = 0;

    for (let i = 0; i < 8; i ++){
        marks[i].innerHTML = `<span class="left">${i + 1}<span/>`;
    }
    for (let i = 0; i < 57; i += 8){
        marks[i].innerHTML = marks[i].innerHTML + `<span class="top">${helpArrayLetter[marker]}<span/>`;
        marker++;
    }
    marker = 0;
    for(let i = 56; i < 64; i ++){
        marks[i].innerHTML = marks[i].innerHTML + `<span class="right">${helpArrayNumber[marker]}<span/>`;
        marker++;
    }
    marker = 0;
    for(let i = 7; i < 64; i+= 8){
        marks[i].innerHTML = marks[i].innerHTML + `<span class="bottom">${helpArrayLetter[marker]}<span/>`;
        marker++;
    }
}


//Task 2, 3

document.addEventListener('DOMContentLoaded', () => {
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

        makeDiscount(percent) {
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

        createHtml(){
            let product = document.createElement('div');
            let title = document.createElement('span');
            let weight = document.createElement('span');
            let descr = document.createElement('span');
            let price = document.createElement('span');
            title.textContent = this.name;
            weight.textContent = this.weight + 'g';
            descr.textContent = this.description;
            price.textContent = this.price + ' RUB';
            product.appendChild(title);
            product.appendChild(weight);
            product.appendChild(descr);
            product.appendChild(price);
            product.classList.add('product');

            let button = document.createElement('button');
            button.addEventListener('click', () => {
                lenaBucket.addProduct(this, 1);
                lenaBucket.sumBucket()
            })
            button.textContent = 'Добавить';
            product.appendChild(button);

            return product;
        }
    }



    class Bucket {
        constructor(user) {
            this.user = user;
            this.products = [];
            this.sum = 0;
        }
        addProduct(product, count){
            if (product && product instanceof Product && count > 0){
                let newProduct = {...product};
                newProduct.count = count;
                this.products.push(newProduct);
                this.createHtml();
                return this;
            }else{
                console.log('Неправильный продукт или неверно указано количество');
            }

        }

        sumBucket(){
            this.sum = 0;
            this.products.forEach(item => {
                this.sum += item.price * item.count;
            })
            return `${this.user} набрал товаров на сумму: ${this.sum} рублей`;
        }

        createHtml(){
            let bucket = document.createElement('div');
            bucket.classList.add('bucket');
            let bucketContainer = document.getElementById('bucket');
            if (this.products.length === 0){
                bucket.innerHTML = 'Корзина пуста';
                bucketContainer.innerHTML = '';
                bucketContainer.appendChild(bucket);
            }
            else {
                bucket.innerHTML = '';
                bucket.innerHTML = `В корзине ${this.products.length} товаров на сумму ${this.sumBucket()}`;
                bucketContainer.innerHTML = '';
                bucketContainer.appendChild(bucket);
            }
        }

    }



    let catalog = document.getElementById('catalog');

    let apple = new Product(1, 'Apple', '1000', ['fruit', 'fresh'], 150, 'Some fresh and tasty apple');
    let melon = new Product(2, 'Melon', '1000', ['fresh', 'berry'], 32, 'The best melons');
    let chicken = new Product(3, 'Chicken', 1000, ['meat'], 260, 'Homemade chicken');

    let productArray = [apple , melon, chicken];
    productArray.forEach(product => {
        let newProduct = product.createHtml();
        catalog.appendChild(newProduct);
    });

    let lenaBucket = new Bucket('Elena');
    lenaBucket.createHtml();

});




