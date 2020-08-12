let cartE = document.getElementById("cart");
let catalog = document.getElementById("catalog");
let headCatalog = document.createElement("h2");
let headCart = document.createElement("h2");
headCatalog.textContent = "Каталог: ";
headCart.textContent = "Корзина: ";
catalog.append(headCatalog);
cartE.append(headCart);

class Product {
    constructor(name, price, currency, quantity) {
        this.name = name;
        this.price = price;
        this.currency = currency;
        this.quantity = quantity;
    }
    productInfo() {
        let infProd = document.createElement("p");
        infProd.className = "product";
        infProd.textContent = "Информация о товаре "+ this.name + ". " + "Название товара: " + this.name + ", " + "Цена: " + this.price + ", " + "Валюта: " + this.currency;
        catalog.append(infProd);
    }
}

class Cart {
    constructor() {
        this.products = [];
    }
    addToCart(product){
        this.products.push(product);
        console.log('В корзину добавили ' + product.name + ' в количестве: ' + product.quantity);
    }
    countCartPrice() {
        let res = 0;
        for(let i in this.products ){
            res += this.products[i].price * this.products[i].quantity;
        }
        return res;
    }
    cartInfo() {
        let infoCart = document.createElement("p");
        infoCart.className = "cartInf";
        let totalProd = 0;
        let showCart;
        if (this.products.length === 0) {
            showCart = "Корзина пуста.";
        } else {
            for (let i in this.products) {
                let quantity = this.products[i].quantity;
                totalProd += quantity;
            }
            showCart =
                "В корзине " + totalProd + " товаров на сумму " + this.countCartPrice() + " рублей.";
        }
        infoCart.textContent = showCart;
        cartE.append(infoCart);
    }

}

let keyboard = new Product("Клавиатура", 2000, "руб", 3);
let mouse = new Product("Мышь", 1000, "руб", 2);
let monitor = new Product("Монитор", 10000, "руб", 1);
let cart = new Cart();
cart.addToCart(keyboard);
cart.addToCart(mouse);
cart.addToCart(monitor);
cart.countCartPrice();
mouse.productInfo();
cart.cartInfo();