"use strict";

// ***************FIRST TASK***************
const chessBoard = document.querySelector(".chessBoard");
const letters = document.querySelector(".letters");
const numbers = document.querySelector(".numbers");

function drawChessBoard(){
    const numbersArr = ["1", "2", "3", "4", "5", "6", "7", "8"];
    const lettersArr = ["A", "B", "C", "D", "E", "F", "G", "H"];

    for (let i = lettersArr.length - 1; i >= 0; i--) {
        const number = document.createElement("div");
        number.className = "number";
        number.textContent = numbersArr[i];
        numbers.append(number);
    }

    for (let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
            const blackCell = document.createElement("div");
            const whiteCell = document.createElement("div");

            blackCell.className = "black-cell";
            whiteCell.className = "white-cell";
            if ((i + j) % 2 === 0) {
                chessBoard.append(whiteCell);
            } else {
                chessBoard.append(blackCell);
            }
        }
    }

    for (let i = 0; i < numbersArr.length; i++) {
        const letter = document.createElement("div");
        letter.className = "letter";
        letter.textContent = lettersArr[i];
        letters.append(letter);
    }
}

drawChessBoard();

//***************SECOND AND THIRD TASK***************
class Basket{
    constructor(){
        this.basketItems = [];                                              //инициализация массива товаров
    }

    //добавление товара в корзину
    addToBasket(product){
        this.basketItems.push(product);
        alert(`В корзину дабавлено ${product.name} в количестве ${product.num}`);
    }

    //удаление товара из корзины
    deleteFromBasket(productName, num){
        for(let i = 0; i < this.basketItems.length; i++){                   //проходимся по всему массиву товаров
            if(this.basketItems[i].name == productName){                    //если название товара совпадает с нпереданным названием
                console.log(this.basketItems[i].num);
                this.basketItems[i].num -= num;                             //уменьшаем количество товаров в корзине
                if(this.basketItems[i].num <= 0){                           //если кол-во товаров в корзине <= 0
                    this.basketItems.splice(i, 1);                          //удаляем товар из массива
                    alert(`Из корзины удален товар ${productName}`);
                    break;
                }
                alert(`Из корзины удалено товар ${productName} в количестве ${num}`);
                break;
            }
        }
    }

    //подсчет стоимости всех товаров в корзине
    countBasketPrice(appendTo) {
        let sum = 0;                                                        //сумма
        for( let product in this.basketItems ){
            sum += this.basketItems[product].price * this.basketItems[product].num;
        }
        appendTo.textContent = `Всего в корзине товаров на сумму: ${sum}`;
    }
}

class Product{
    constructor(img, name = null, price = 0, num = 0){
        this.img = img;
        this.name = name;
        this.price = price;
        this.num = num;
    }
}

let basket = new Basket();
let products = [];

let jackets = new Product("https://im0-tub-ru.yandex.net/i?id=02c2066484df729bc153f7261019e85c&n=13","Куртка", 7000, 3);
let shoes = new Product("https://i.pinimg.com/originals/a6/99/66/a69966eb8869dedabdd9ead6981f1357.jpg", "Кроссовки", 7990, 2);
let tShirt = new Product("https://www.studio-fashion.com/image/cache/data/2017-07/persikovaya-futbolka-hollister-s-logotipom-36633-2000x2000.jpg","Футболка", 2000, 4);

products.push(jackets);
products.push(shoes);
products.push(tShirt);

const catalog = document.querySelector('.catalog');

function createLayout(...product){
    const wrapper = document.createElement('div');
    wrapper.classList.add('catalog-wrapper');
    catalog.append(wrapper);

    for(let i = 0; i < products.length; i++){
        const item = document.createElement('div');
        item.classList.add('catalog-item');
        wrapper.append(item);

        const image = document.createElement('img');
        image.classList.add('catalog-img');
        image.setAttribute("alt", "itemImage");
        image.setAttribute("src", `${products[i].img}`);
        item.append(image);

        const title = document.createElement('h2');
        title.classList.add('catalog-item--name');
        title.textContent = `${products[i].name}`;
        item.append(title);

        const price = document.createElement('div');
        price.classList.add('catalog-item--price');
        price.innerHTML = `Цена: <span class="catalog-item--price--value">${products[i].price}</span>`;
        item.append(price);

        const number = document.createElement('div');
        number.classList.add('catalog-item--num');
        number.innerHTML = `На складе: <span class="catalog-item--num--value">${products[i].num}</span>`;
        item.append(number);

        const btns = document.createElement('div');
        btns.classList.add('catalog-btns');
        btns.innerHTML = `<button class="catalog-btn--add">Add</button>
                    <button class="catalog-btn--remove">Remove</button>`;
        item.append(btns);
    }
}

createLayout(products);

const  imgs = document.querySelectorAll('.catalog-img');
const names = document.querySelectorAll('.catalog-item--name');
const prices = document.querySelectorAll('.catalog-item--price--value');
const num = document.querySelectorAll('.catalog-item--num--value');
const addBtn = document.querySelectorAll('.catalog-btn--add');
const removeBtn = document.querySelectorAll('.catalog-btn--remove');

const total = document.querySelector('.basket');


addBtn.forEach((btn, i) => {
    btn.onclick = function () {
        if(num[i].innerHTML > 0){
            num[i].innerHTML--;
            let product = new Product(imgs[i], names[i].innerHTML, prices[i].innerHTML, 1);
            basket.addToBasket(product);
            basket.countBasketPrice(total);
        } else {
            num[i].innerHTML = '0';
            alert("Больше не осталось товара на скаладе(")
        }
    }
});

removeBtn.forEach((btn, i) => {
    btn.onclick = function () {
        if(products[i].name === names[i].innerHTML && num[i].innerHTML < products[i].num){
            basket.deleteFromBasket(names[i].innerHTML, 1);
            basket.countBasketPrice(total);
            num[i].innerHTML++;
        } else{
            alert(`У вас в корзине нет товара ${products[i].name}`);
        }
    }
});