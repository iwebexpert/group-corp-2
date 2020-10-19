import './main.css';

"use strict";

// ***************FIRST TASK***************
const chessBoard: HTMLDivElement | null = document.querySelector(".chessBoard");
const letters: HTMLDivElement | null = document.querySelector(".letters");
const numbers: HTMLDivElement | null = document.querySelector(".numbers");

function drawChessBoard(): void {
    const numbersArr: string[] = ["1", "2", "3", "4", "5", "6", "7", "8"];
    const lettersArr: string[] = ["A", "B", "C", "D", "E", "F", "G", "H"];

    if(numbers) {
        for (let i = lettersArr.length - 1; i >= 0; i--) {
            const number: HTMLDivElement | null = document.createElement("div");
            number.className = "number";
            number.textContent = numbersArr[i];
            numbers.append(number);
        }
    }

    if(chessBoard) {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const blackCell: HTMLDivElement | null = document.createElement("div");
                const whiteCell: HTMLDivElement | null = document.createElement("div");

                blackCell.className = "black-cell";
                whiteCell.className = "white-cell";
                if ((i + j) % 2 === 0) {
                    chessBoard.append(whiteCell);
                } else {
                    chessBoard.append(blackCell);
                }
            }
        }
    }

    if(letters) {
        for (let i = 0; i < numbersArr.length; i++) {
            const letter: HTMLDivElement | null = document.createElement("div");
            letter.className = "letter";
            letter.textContent = lettersArr[i];
            letters.append(letter);
        }
    }
}

drawChessBoard();

//***************SECOND AND THIRD TASK***************

interface Product {
    name:string,
    num:number,
    price:number,
    img:string
}

interface Basket {
    name:string,
    num:number,
    price:number,
    img:string
}

let basketItems: Basket[] | null = [];                                              //инициализация массива товаров

//добавление товара в корзину
function addToBasket(product: Product) {
    if(basketItems && product) {
        basketItems.push(product);
        alert(`В корзину дабавлено ${product.name} в количестве ${product.num}`);
    }
}

//удаление товара из корзины
function deleteFromBasket(productName: string, num: number) {
    if(basketItems && productName && num) {
        for (let i = 0; i < basketItems.length; i++) {                   //проходимся по всему массиву товаров
            if (basketItems[i].name === productName) {                    //если название товара совпадает с нпереданным названием
                basketItems[i].num -= num;                             //уменьшаем количество товаров в корзине
                if (basketItems[i].num <= 0) {                           //если кол-во товаров в корзине <= 0
                    basketItems.splice(i, 1);                          //удаляем товар из массива
                    alert(`Из корзины удален товар ${productName}`);
                    break;
                }
                alert(`Из корзины удалено товар ${productName} в количестве ${num}`);
                break;
            }
        }
    }
}

//подсчет стоимости всех товаров в корзине
function countBasketPrice(appendTo: HTMLElement) {
    let sum = 0;                                                        //сумма
    for (let product in basketItems) {
        let item: number = parseInt(product);
        sum += basketItems[item].price * basketItems[item].num;
    }
    appendTo.textContent = `Всего в корзине товаров на сумму: ${sum}`;
}

let products: Product[] = [];

let jackets = {
    img: "https://im0-tub-ru.yandex.net/i?id=02c2066484df729bc153f7261019e85c&n=13",
    name: "Куртка",
    price: 7000,
    num: 3
};
let shoes = {
    img: "https://i.pinimg.com/originals/a6/99/66/a69966eb8869dedabdd9ead6981f1357.jpg",
    name: "Кроссовки",
    price: 7990,
    num: 2
};
let tShirt = {
    img: "https://www.studio-fashion.com/image/cache/data/2017-07/persikovaya-futbolka-hollister-s-logotipom-36633-2000x2000.jpg",
    name: "Футболка",
    price: 2000,
    num: 4
};

products.push(jackets);
products.push(shoes);
products.push(tShirt);

const catalog: HTMLDivElement | null = document.querySelector('.catalog');

function createLayout(product: Product[]) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('catalog-wrapper');
    if(catalog)
        catalog.append(wrapper);

    for (let i = 0; i < products.length; i++) {
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

//т.к. элементы являются псевдомассивами поставил any
const imgs = document.querySelectorAll('.catalog-img');
const names = document.querySelectorAll('.catalog-item--name');
const prices = document.querySelectorAll('.catalog-item--price--value');
const num = document.querySelectorAll('.catalog-item--num--value');
const addBtn: any = document.querySelectorAll('.catalog-btn--add');
const removeBtn: any = document.querySelectorAll('.catalog-btn--remove');

const total: HTMLElement | null= document.querySelector('.basket');


addBtn.forEach((btn:HTMLButtonElement, i:number)=> {
    if(btn && total) {
        btn.onclick = function (): void {
            let number: number = parseInt(num[i].innerHTML);
            if (number > 0) {
                number--;
                num[i].innerHTML = number.toString();
                let product = {
                    img: imgs[i].toString(),
                    name: names[i].innerHTML,
                    price: parseInt(prices[i].innerHTML),
                    num: 1
                };
                addToBasket(product);
                countBasketPrice(total);
            } else {
                num[i].innerHTML = '0';
                alert("Больше не осталось товара на скаладе(")
            }
        }
    }
});

removeBtn.forEach((btn:HTMLButtonElement, i:number) => {
    if(btn) {
        btn.onclick = function () {
            if(btn && total) {
                let number: number = parseInt(num[i].innerHTML);
                if (products[i].name === names[i].innerHTML && number < products[i].num) {
                    deleteFromBasket(names[i].innerHTML, 1);
                    countBasketPrice(total);
                    number++;
                    num[i].innerHTML = number.toString();
                } else {
                    alert(`У вас в корзине нет товара ${products[i].name}`);
                }
            }
        }
    }
});