'use strict'

document.addEventListener('DOMContentLoaded', () => {
    class Product {
        constructor(id, name, price) {
            this.id = id;
            this.name = name;
            this.price = price;
        }

        initHtml(){
            let body = document.querySelector('body');
            let product = document.createElement('div');
            let name = document.createElement('div');
            let price = document.createElement('div');
            name.textContent = this.name;
            name.classList.add('name');
            product.appendChild(name);
            price.innerHTML = '<b>' + this.price +'</b>'+ ' руб.';
            price.classList.add('price');
            product.appendChild(price);
            product.classList.add('product');
            let button = document.createElement('button');
            button.textContent = 'Добавить в корзину';
            button.classList.add('btn-add');
            product.addEventListener('click', (event) => {
                event.target.classList.contains('btn-add');
                newBasket.addProduct(this, 1);
                newBasket.sumBasket();   
            });
            product.appendChild(button);
            return product;
        }
    }

    class Basket {
        constructor(items) {
            this.products = [];
            this.sum = 0;
        }

        addProduct(product, count){
            let newProduct = {...product};
            newProduct.count = count;
            this.products.push(newProduct);
            this.initHtml();
            return this;
        }

        sumBasket(){
            this.sum = 0;
            this.products.forEach(item => {
                this.sum += item.price * item.count;
            })
            return `${this.sum} руб.`;
        }

        initHtml(){
            let basket = document.getElementById('basket');
            if (this.products.length === 0){
                basket.textContent = 'В коризне пусто';
            }
            else {
                basket.textContent = `В корзине ${this.products.length} товаров на сумму ${this.sumBasket()}`;
            }
        }
    }


    let catalog = document.getElementById('catalog');

    let keyboard = new Product(1, 'Keyboard', '1000');
    let mouse = new Product(2, 'Mouse', '2000');
    let gamepad = new Product(3, 'Gamepad', '3000');

    let productArray = [keyboard , mouse, gamepad];
    productArray.forEach(product => {
        let newProduct = product.initHtml();
        catalog.appendChild(newProduct);
    });

    let newBasket = new Basket();
    newBasket.initHtml();

});

