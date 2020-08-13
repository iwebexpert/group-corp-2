// document.addEventListener('DOMContentLoaded', () => {
let main = document.querySelector('.main');
let hd = document.createElement('h1');
hd.className = 'header';
hd.innerHTML = 'This is your basket';
hd.style.textAlign = 'center';
main.appendChild(hd);
let basketWrap = document.createElement('div');
basketWrap.className = 'basket__wrap';
main.appendChild(basketWrap);
let newProd;

// class Basket {
//     constructor(prod, quan, price, url) {
//         this.prod = prod;
//         this.quan = quan;
//         this.price = price;
//         this.url = url;
//     }
//     getPriceProd() {
//         return this.price * this.quan;
//     }
// }

function createProdItem(prod, price, quan) {
    newProd = document.createElement('div');
    newProd.className = 'prod__wrap';
    newProd.innerHTML = `
 <div class="prod__header">${prod}</div>
 <div class="prod__price">${price}</div>
 <button class="buy">BUY</button>
 <button class="plus">+</button>
 <p class="quan">${quan}</p>
 <button class="minus">-</button>
 <button class="clear">DELETE</button>`;
    basketWrap.appendChild(newProd);
}
createProdItem("pizza", 1500, 0);
createProdItem("sandwich", 120, 0);
createProdItem("ice", 100, 0);
function sumProd(price, quan) {
    return this.price * this.quan;
}
// let basket = document.createElement('div');
// basket.className = 'basket';
// main.appendChild(basket);
// let sum = document.createElement('div');
// sum.className = 'sumBasket';
// sum.appendChild

// -----------------------------------------------
let buy = document.querySelectorAll('.buy');
let clear = document.querySelectorAll('.clear');
let plus = document.querySelectorAll('.plus');
let minus = document.querySelectorAll('.minus');
let quan = document.querySelectorAll('.quan');
let info = document.querySelector('.basket__info');
let sum = document.querySelector('.sum__price');


plus.addEventListener('click', plusBtn);
let basketInfo = document.createElement('div');
basketInfo.className = 'basket__info';
basketInfo.innerHTML =
    `<div class="basket__info"></div>
<div class="sum__price"></div>`;
main.appendChild(basketInfo);

