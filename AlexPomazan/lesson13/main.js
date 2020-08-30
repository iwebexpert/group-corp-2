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

const makeGETRequest = (url) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status != 200) {
                    reject(`${xhr.status}: ${xhr.statusText}`);
                }
                resolve(JSON.parse(xhr.responseText));
            }
        }
        xhr.open('GET', url, true);
        xhr.send();
    });
}

const API_URL = '';

const basket = new BasketOfGoods(" ", " ");
const goods = new GoodsList();

goods.fetchGoods();
basket.basketInfo();


function wait() {
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
}
setTimeout(wait, 100);
basket.showComplitionBasket();