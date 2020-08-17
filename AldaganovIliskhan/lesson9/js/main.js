let cart = document.querySelector(".cart");
let addKeyboard = document.querySelector(".add-keyboard");
let addMonitor = document.querySelector(".add-monitor");
let addMouse = document.querySelector(".add-mouse");
let deleteKeyboard = document.querySelector(".delete-keyboard");
let deleteMonitor = document.querySelector(".delete-monitor");
let deleteMouse = document.querySelector(".delete-mouse");
let main = document.querySelector(".main");
class Product {
    constructor(name, price, currency, count, id) {
        this.name = name;
        this.price = price;
        this.currency = currency;
        this.count = count;
        this.id = id;
    }
    productInfo() {
        let singleProduct = document.createElement("p");
        singleProduct.className = "product";
        singleProduct.textContent = `Информация о товаре -  Название : ${this.name}, Цена : ${this.price} ${this.currency}, Количество : ${this.count}`;
        main.appendChild(singleProduct);
    }
}

class Cart {
    constructor() {
        this.items = [];
    }
    addProductToCart(product) {
        this.items.push(product);
    }
    deleteProductFromCart(product) {
        this.items.map((item, i) => {
            if (product.name === item.name) {
                this.items.splice(i, 1);
            }
        })
    }
    countCartPrice() {
        let sum = this.items.reduce(
            (amount, item) => (amount += item.price * item.count),
            0
        );
        let priceSum = document.querySelector(".price-sum");
        if (!this.items.length) {
            priceSum.textContent = "В корзине пусто";
        } else {
            priceSum.textContent = `В корзине ${this.items.length}  на сумму ${sum}`;
        }
    }
}

let keyboard = new Product("Keyboard", 3000, "RUB", 1, 1);
let mouse = new Product("Mouse", 500, "RUB", 1, 2);
let monitor = new Product("Monitor", 2000, "RUB", 1, 3);
let products = new Cart();
addKeyboard.addEventListener("click", () => {
    products.addProductToCart(keyboard);
    products.countCartPrice();
});
addMouse.addEventListener("click", () => {
    products.addProductToCart(mouse);
    products.countCartPrice();
});
addMonitor.addEventListener("click", () => {
    products.addProductToCart(monitor);
    products.countCartPrice();
});
deleteKeyboard.addEventListener("click", () => {
    products.deleteProductFromCart(keyboard);
    products.countCartPrice();
});
deleteMouse.addEventListener("click", () => {
    products.deleteProductFromCart(mouse);
    products.countCartPrice();
});
deleteMonitor.addEventListener("click", () => {
    products.deleteProductFromCart(monitor);
    products.countCartPrice();
});
products.countCartPrice();
