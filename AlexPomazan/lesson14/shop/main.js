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

basket.showComplitionBasket();

function feedbackValidation() {
    const feedback = document.querySelector('.feedback');

}