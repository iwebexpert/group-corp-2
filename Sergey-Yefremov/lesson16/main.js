class Product {
    constructor(name, price, currency, id) {
        this.name = name;
        this.price = price;
        this.currency = currency;
        this.id = id;
    }
}
let initBtn = document.querySelector('.cart-init-btn');
let clear = document.createElement('button');
let address = document.createElement('button');
let comment = document.createElement('button');
let form = document.createElement('button');
let sendForm = document.createElement('button');

class Cart {
    constructor() {
        this.address = document.createElement('input');
        this.cartInit = document.querySelector('.cart-init');
        this.comment = document.createElement('input');
        this.name = document.createElement('input');
        this.email = document.createElement('input');
        this.phone = document.createElement('input');
        this.sum = 0;
    }
    sendRequest() {
        axios.get('/goods').then(({ data }) => {
            this.renderProducts(data);
        });
    }
    renderProducts(data) {
        const catalogBlocks = document.createElement('div');
        catalogBlocks.classList.add('catalog-blocks');

        data.map((item) => {
            const catalog = document.querySelector('.catalog');
            const catalogBlock = document.createElement('div');
            catalogBlock.classList.add('catalog-block');

            catalog.appendChild(catalogBlocks);
            catalogBlocks.appendChild(catalogBlock);

            const catalogBlockTitle = document.createElement("h3");
            catalogBlockTitle.classList.add("catalog-block-title");

            catalogBlock.appendChild(catalogBlockTitle);

            const catalogBlockImg = document.createElement("img");
            catalogBlockImg.classList.add("catalog-block-img");
            catalogBlockImg.setAttribute("src", item.img);

            catalogBlock.appendChild(catalogBlockImg);

            const catalogBlockPrice = document.createElement("p");
            catalogBlockPrice.classList.add("catalog-block-price");

            catalogBlock.appendChild(catalogBlockPrice);

            const addButton = document.createElement("button");
            addButton.classList.add(`add-${item.class}`);
            addButton.textContent = "+";

            catalogBlock.appendChild(addButton);

            const deleteButton = document.createElement("button");
            deleteButton.classList.add(`delete-${item.class}`);
            catalogBlockTitle.textContent = item.title;
            catalogBlockPrice.textContent = `Стоимость : ${item.price}`;
            deleteButton.textContent = "-";

            catalogBlock.appendChild(deleteButton);
        });
    }
    addProduct(element) {
        if (element.target.className === "add-keyboard") {
            axios.post("http://localhost:3000/cart", {

                title: "Keyboard",
                class: "keyboard",
                price: 2000

            });

        } else if (element.target.className === "add-mouse") {
            axios.post("http://localhost:3000/cart", {

                title: "Mouse",
                class: "mouse",
                price: 1000

            });

        } else if (element.target.className === "add-monitor") {
            axios.post("http://localhost:3000/cart", {

                title: "Monitor",
                class: "monitor",
                price: 10000

            });
        }

        this.countCartPrice();
    }
    deleteProduct(element) {

        if (element.target.className === "delete-keyboard" || element.target.className === "delete-mouse" || element.target.className === "delete-monitor") {
            axios.get("cart").then(({ data }) => {

                let className = element.target.className.split("delete-")[1];
                data.map((item, i) => {

                    if (className === item.class) {
                        data.splice(i, 1);
                        axios.delete("http://localhost:3000/cart/" + item.id);

                        this.countCartPrice();
                    }
                });
            });
        }
    }
    loadBasket(element) {
        if (element.target.className === "cart-init-btn") {
            this.address.style.display = "block";
            address.style.display = "block";
            address.classList.add("address-next");
            this.address.classList.add("address-input");
            this.address.placeholder = "Введите адрес";
            address.textContent = "Далее";
            this.cartInit.appendChild(this.address);
            this.cartInit.appendChild(address);
            initBtn.style.display = "none";
            this.address.value = "";
            this.comment.value = "";
            this.name.value = "";
            this.phone.value = "";
            this.email.value = "";
            this.phone.style.border = "1px solid black";
            this.email.style.border = "1px solid black";
            this.name.style.border = "1px solid black";
        }
    }
    loadComment(element) {
        if (element.target.className === "address-next") {
            this.address.style.display = "none";
            address.style.display = "none";
            this.comment.style.display = "block";
            comment.style.display = "block";
            comment.textContent = "Далее";
            comment.classList.add("comment-next");
            this.comment.placeholder = "Введите комментарий";
            this.cartInit.appendChild(this.comment);
            this.cartInit.appendChild(comment);
        }
    }
    loadForm(element) {
        if (element.target.className === "comment-next") {
            let formButtons = document.createElement("div");
            formButtons.classList.add("form-buttons");
            this.comment.style.display = "none";
            comment.style.display = "none";
            form.textContent = "Далее";
            form.classList.add("form-next");
            sendForm.textContent = "Отравить";
            this.name.placeholder = "Имя должно состоять из 4-15 английских символов";
            this.phone.placeholder = "Номер телефона в формате +71234567890";
            this.email.placeholder = "Почта, например, test@gmail.com";
            this.name.style.display = "block";
            this.email.style.display = "block";
            this.phone.style.display = "block";
            formButtons.style.display = "flex";
            sendForm.style.display = "inline-block";
            form.style.display = "inline-block";

            this.cartInit.appendChild(this.name);
            this.cartInit.appendChild(this.phone);
            this.cartInit.appendChild(this.email);

            this.cartInit.appendChild(formButtons);

            sendForm.classList.add("send-form");

            formButtons.appendChild(sendForm);

            formButtons.appendChild(form);
        }
    }
    formValidate(element) {
        if (element.target.className === "send-form") {
            let nameRegExp = /^[a-z]{4,15}$/i;
            let phoneRegExp = /^\+7\(\d{3}\)\d{3}-\d{4}$/;
            let emailRegExp = /^([a-z0-9_.-]+)@([a-z0-9_.-]+)\.([a-z]{2})$/i;
            if (!nameRegExp.test(this.name.value) && !phoneRegExp.test(this.phone.value) && !emailRegExp.test(this.email.value)) {

                this.email.style.border = "1px solid red";
                this.name.style.border = "1px solid red";
                this.phone.style.border = "1px solid red";
            }
            if (!nameRegExp.test(this.name.value)) {
                this.name.style.border = "1px solid red";
            } else {
                this.name.style.border = "1px solid black";
            }
            if (!phoneRegExp.test(this.phone.value)) {
                this.phone.style.border = "1px solid red";
            } else {
                this.phone.style.border = "1px solid black";
            }
            if (!emailRegExp.test(this.email.value)) {
                this.email.style.border = "1px solid red";
            } else {
                this.email.style.border = "1px solid black";
            }
            if (nameRegExp.test(this.name.value) && phoneRegExp.test(this.phone.value) && emailRegExp.test(this.email.value)) {
                alert("Ваш заказ отправлен!");
            }
        }
    }
    loadTotal(element) {
        if (element.target.className === "form-next") {
            this.phone.style.display = "none";
            this.name.style.display = "none";
            this.email.style.display = "none";
            form.style.display = "none";
            sendForm.style.display = "none";

            this.total = document.createElement("p");

            clear.classList.add("clear-btn");
            clear.textContent = "Заказать снова";
            clear.style.display = "block";
            this.total.textContent = `Итоговая стоимость корзины ${this.sum}. Адрес : ${this.address.value}. Комментарий : ${this.comment.value}`;
            this.cartInit.appendChild(this.total);
            this.cartInit.appendChild(clear);

            this.cartItems = [];
        }
    }
    clearCart(element) {
        if (element.target.className === "clear-btn") {
            initBtn.style.display = "block";
            this.cartInit.appendChild(initBtn);
            this.total.style.display = "none";
            clear.style.display = "none";
        }
    }
    countCartPrice() {
        axios.get("http://localhost:3000/cart").then(({ data }) => {
            this.sum = data.reduce((amount, item) => (amount += item.price), 0);

            let priceSum = document.querySelector(".price-sum");

            if (!data.length) {
                priceSum.textContent = "Корзина пуста";
            } else {
                priceSum.textContent = `В корзине товаров (${data.length}) на сумму ${this.sum}`;
            }
        });
    }
}

let cart = new Cart();
document.addEventListener("DOMContentLoaded", () => {

    cart.sendRequest();
    cart.countCartPrice();
});

document.addEventListener("click", (i) => {

    cart.addProduct(i);
    cart.deleteProduct(i);
    cart.loadBasket(i);
    cart.loadComment(i);
    cart.clearCart(i);
    cart.loadForm(i);
    cart.loadTotal(i);
    cart.formValidate(i);
});