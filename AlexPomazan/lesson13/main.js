const basketOfProduct = document.querySelector(".basket");

const headingBasket = document.createElement("h3");
headingBasket.textContent = "Корзина:";
basketOfProduct.prepend(headingBasket);

const basketCard = document.createElement("div");
basketCard.className = "card";
basketOfProduct.append(basketCard);

const order = document.createElement("h3");
order.textContent = "Заказ:";
order.style.display = "none";
basketOfProduct.prepend(order);

const infoBasketMessage = document.createElement("p");
infoBasketMessage.className = "info-basket";
basketCard.append(infoBasketMessage);

const acceptBasket = document.createElement("button");
acceptBasket.textContent = "Оформить заказ";
acceptBasket.className = "btn accept-basket btn-warning";
acceptBasket.style.display = "none";
basketCard.append(acceptBasket);

const API_URL = '';
const goods = new GoodsList();
goods.fetchGoods();

const basket = new BasketOfGoods(" ", " ");
basket.basketInfo();



const btnsAdd = document.querySelectorAll(".btn-add");
const btnsDelete = document.querySelectorAll(".btn-delete");
const images = document.querySelectorAll(".img-1");
const names = document.querySelectorAll(".name");
const prices = document.querySelectorAll(".price-value");

//Добавление товара в корзину
btnsAdd.forEach((btn, i) => {
    btn.onclick = function () {
        let product = new Product(names[i].innerHTML, prices[i].innerHTML, 1, images[i]);
        basket.addToBasket(product);
        basket.basketInfo();
    }
});

//Удаление товара из корзины
btnsDelete.forEach((btn, i) => {
    btn.onclick = function () {
        for (let j = 0; j < basket.items.length; j++) {
            if (basket.items[j].name === names[i].innerHTML) {
                basket.deleteFromBasket(names[i].innerHTML, 1);
                basket.basketInfo();
            }
        }
    };
});

basket.showComplitionBasket();