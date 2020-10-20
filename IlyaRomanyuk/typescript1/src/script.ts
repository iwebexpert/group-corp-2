import './main.css';

const totalPrice: HTMLElement | null = document.querySelector('.totalPrice');
const cart: HTMLDivElement | null = document.querySelector('#catalog');
const clearAll: HTMLButtonElement | null = document.querySelector(".btn--clear");

function createProduct(id: string, name: string, quantity: number, valute: string, price: number, url: string): Items {
    return { id, name, quantity, valute, price, url }
}

const shorts: Items = createProduct('1', 'шорты', 1, 'RUB', 1200, 'src/assets/shorts.jpg');
const shirt: Items = createProduct('2', 'майка', 1, 'RUB', 800, 'src/assets/shirt.jpg');
const sneakers: Items = createProduct('3', 'кроссовки', 1, 'RUB', 3500, 'src/assets/kross.jpg');

interface Items {
    id: string,
    name: string,
    quantity: number,
    valute: string,
    price: number,
    url: string
}

let arrayCart: Array<Items> = [];

//количество элементов в корзине
function quantityInCart(): string {
    let quantity: number = 0;
    for (let i = 0; i < arrayCart.length; i++) {
        quantity += arrayCart[i].quantity;
    }
    return `количество: ${quantity}`;
}

//стоимость корзины
function countBasketPrice(): string {
    let totalPrice: number = 0;
    for (let i = 0; i < arrayCart.length; i++) {
        totalPrice += arrayCart[i].price * arrayCart[i].quantity;
    }
    return `сумма: ${totalPrice} ${arrayCart[0].valute}`;
}

//пересчет корзины
function checkCart(element: Items): void {
    arrayCart = [...arrayCart, element];
    if (totalPrice) {
        totalPrice.textContent = `${countBasketPrice()} ${quantityInCart()}`;
    }
}

//очистка корзины
function clearBtn(): void {
    arrayCart = [];
    if (totalPrice) {
        totalPrice.textContent = 'Корзина пуста';
    }
}

//генерация DOM
function generationDOM(...elements: Array<Items>): void {
    if (totalPrice && clearAll && cart) {
        if (!arrayCart.length) {
            totalPrice.textContent = 'Корзина пуста';
        }
        clearAll.addEventListener('click', () => clearBtn())
        for (let i = 0; i < elements.length; i++) {

            let img: HTMLImageElement = document.createElement("img");
            img.classList.add('img');
            img.setAttribute("src", `${elements[i].url}`)


            let element: HTMLDivElement = document.createElement("div");
            element.classList.add('cart__item');

            let title: HTMLParagraphElement = document.createElement("p");
            title.textContent = elements[i].name;

            let price: HTMLParagraphElement = document.createElement("p");
            price.textContent = `${elements[i].price}  ${elements[i].valute}`;

            let buyBtn: HTMLButtonElement = document.createElement("button");
            buyBtn.classList.add('btn');
            buyBtn.textContent = 'В корзину';
            buyBtn.addEventListener('click', (e) => checkCart(elements[i]))

            element.append(img);
            element.append(title);
            element.append(price);
            element.append(buyBtn);

            cart.append(element);
        }
    }
}

generationDOM(shorts, shirt, sneakers);


