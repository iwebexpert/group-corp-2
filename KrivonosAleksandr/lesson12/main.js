"use strict";

let basket = new Basket();
let catalog = new Catalog();
let message = new Messages();

message.init();

//*****CATALOG PROCESSING*****
catalog.init();

//*****BASKET PROCESSING*****
basket.drawHead();

const  images = document.querySelectorAll('[data-img-index="0"]');
const names = document.querySelectorAll('.catalog-item--name');
const prices = document.querySelectorAll('.catalog-item--price--value');
const num = document.querySelectorAll('.catalog-item--num--value');
const addBtn = document.querySelectorAll('.catalog-btn--add');
const removeBtn = document.querySelectorAll('.catalog-btn--remove');

addBtn.forEach((btn, i) => {
    btn.onclick = function () {
        if(num[i].innerHTML > 0){
            num[i].innerHTML--;
            let product = new Product(images[i], names[i].innerHTML, prices[i].innerHTML, 1);
            basket.addToBasket(product);
            basket.countBasketPrice();
            basket.showAddress();
        } else {
            message.showMessage(message.messages.noItemInCatalog);
        }
    }
});

removeBtn.forEach((btn, i) => {
    btn.onclick = function () {
        if(basket.basketItems.length === 0){
            message.showMessage(message.messages.noItemInBasket);
            return;
        }
        for (let k = 0; k < basket.basketItems.length; k++) {
            if (basket.basketItems[k].name === names[i].innerHTML && basket.basketItems[k].num > 0) {
                basket.deleteFromBasket(names[i].innerHTML, 1);
                num[i].innerHTML++;
                basket.countBasketPrice();
                basket.showAddress();
                message.showMessage(message.messages.deletedFromBasket);
            }
        }
    }
});

basket.drawAdditionalBlocks();
basket.showComment();


