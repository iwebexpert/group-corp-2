const basket = document.querySelector('.error-empty');
const btn = document.querySelector('.clearBasket');
const products = document.querySelector('.products');

const productsStock= [];  
let productsBasket = [];
let cart = 0;
btn.onclick = function () {
    cart = 0;
    productsBasket = [];
    basket.textContent = 'Корзина пуста';
};

class product {
    constructor(name, price) {
        this.name = name;
        this.price = price;

        this.addNewProduct = function () {
            const oneProduct = document.createElement('div');
            oneProduct.className = 'oneProduct';
            products.appendChild(oneProduct);
            const oneProductName = document.createElement('span');
            oneProductName.className = 'oneProductName';
            oneProductName.textContent = this.name;
            oneProduct.appendChild(oneProductName);
            const oneProductPrice = document.createElement('span');
            oneProductPrice.className = 'oneProductPrice';
            oneProductPrice.textContent = this.price;
            oneProduct.appendChild(oneProductPrice);
            const addBtn = document.createElement('button');
            addBtn.className = 'add-btn';
            addBtn.textContent = 'ADD';
            oneProduct.appendChild(addBtn);
            productsStock.push(this);
        }

    }
}

const product1 = new product('Keyboard', 2000);
const product2 = new product('Mouse', 1000);
const product3 = new product('Monitor', 10000);
product1.addNewProduct();
product2.addNewProduct();
product3.addNewProduct();


console.log(productsStock);

products.addEventListener('click', function (event) {
    if (event.target.className === 'add-btn') {
        console.log(event.target);
        let item = event.target.previousElementSibling.previousElementSibling.textContent;
        console.log(item);
        for (let i = 0; i < productsStock.length; i++) {
            if (productsStock[i].name === item) {
                productsBasket.push(productsStock[i]);
            }
        }
        console.log(productsBasket);
        cart = 0;
        for (let i = 0; i < productsBasket.length; i++) {
            cart += productsBasket[i].price;
        }
        basket.textContent = 'Товаров на сумму ' + cart + ' рублей';
    }

});