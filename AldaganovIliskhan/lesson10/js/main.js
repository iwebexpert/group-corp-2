let addKeyboard = document.querySelector(".add-keyboard");
let addMonitor = document.querySelector(".add-monitor");
let addMouse = document.querySelector(".add-mouse");
let deleteKeyboard = document.querySelector(".delete-keyboard");
let deleteMonitor = document.querySelector(".delete-monitor");
let deleteMouse = document.querySelector(".delete-mouse");
let arrangeBtn = document.querySelector('.cart__arrange-btn');
let addressNext = document.createElement('button');
let commentNext = document.createElement('button');
let clearBtn = document.createElement('button');


class Product {
    constructor(name, price, currency, count, id) {
        this.name = name;
        this.price = price;
        this.currency = currency;
        this.count = count;
        this.id = id;
    }
}

class Cart {
    constructor() {
        this.items = [];
        this.address = document.createElement('input');
        this.cartArrange = document.querySelector('.cart__arrange');
        this.comment = document.createElement('input');
        this.sum = 0;
    }
    addProductToCart(product) {
        this.items.push(product);
    }
    deleteProductFromCart(product) {
        this.items.map((item, i) => {
            if (product.name === item.name) {
                this.items.splice(i, 1);
            }
        });
    }
    showBasket() {
        this.address.style.display = 'block';
        addressNext.style.display = 'block';
        addressNext.classList.add('address-next');
        this.address.classList.add('adress-input');
        this.address.placeholder = 'Введите адрес';
        addressNext.textContent = 'Далее';
        this.cartArrange.appendChild(this.address);
        this.cartArrange.appendChild(addressNext);
        arrangeBtn.style.display = 'none';
        this.address.value = '';
        this.comment.value = '';
    }
    showComment() {
        this.address.style.display = 'none';
        addressNext.style.display = 'none';
        this.comment.style.display = 'block';
        commentNext.style.display = 'block';
        commentNext.textContent = 'Далее';
        commentNext.classList.add('comment-next');
        this.comment.placeholder = 'Введите комментарий';
        this.cartArrange.appendChild(this.comment);
        this.cartArrange.appendChild(commentNext);
    }
    showTotal() {
        this.comment.style.display = 'none';
        commentNext.style.display = 'none';
        this.total = document.createElement('p');
        clearBtn.classList.add('clear-btn');
        clearBtn.textContent = 'Заказать снова';
        clearBtn.style.display = 'block';
        this.total.textContent = `Итоговая стоимость корзины ${this.sum}. Адрес : ${this.address.value}. Комментарий : ${this.comment.value}`;
        this.cartArrange.appendChild(this.total);
        this.cartArrange.appendChild(clearBtn);
    }
    clearCart() {
        arrangeBtn.style.display = 'block';
        this.cartArrange.appendChild(arrangeBtn);
        this.total.style.display = 'none';
        clearBtn.style.display = 'none';
    }
    countCartPrice() {
         this.sum = this.items.reduce(
            (amount, item) => (amount += item.price * item.count),
            0
        );
        let priceSum = document.querySelector(".price-sum");
        if (!this.items.length) {
            priceSum.textContent = "В корзине пусто";
        } else {
            priceSum.textContent = `В корзине ${this.items.length}  товаров на сумму ${this.sum}`;
        }
    }
}

let keyboard = new Product("Keyboard", 3000, "RUB", 1, 1);
let mouse = new Product("Mouse", 500, "RUB", 1, 2);
let monitor = new Product("Monitor", 2000, "RUB", 1, 3);
let cart = new Cart();

arrangeBtn.addEventListener('click', () => {
    cart.showBasket();
});
addressNext.addEventListener('click', () => {
    cart.showComment();
});
clearBtn.addEventListener('click', () => {
    cart.clearCart();
});
commentNext.addEventListener('click', () => {
    cart.showTotal();
});
addKeyboard.addEventListener("click", () => {
    cart.addProductToCart(keyboard);
    cart.countCartPrice();
});
addMouse.addEventListener("click", () => {
    cart.addProductToCart(mouse);
    cart.countCartPrice();
});
addMonitor.addEventListener("click", () => {
    cart.addProductToCart(monitor);
    cart.countCartPrice();
});
deleteKeyboard.addEventListener("click", () => {
    cart.deleteProductFromCart(keyboard);
    cart.countCartPrice();
});
deleteMouse.addEventListener("click", () => {
    cart.deleteProductFromCart(mouse);
    cart.countCartPrice();
});
deleteMonitor.addEventListener("click", () => {
    cart.deleteProductFromCart(monitor);
    cart.countCartPrice();
});
cart.countCartPrice();
