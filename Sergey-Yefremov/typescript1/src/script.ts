import './style.css';
const totalPrice: HTMLElement | null = document.querySelector('.totalPrice');
const cart: HTMLDivElement | null = document.querySelector('#catalog');
const clearAll: HTMLButtonElement | null = document.querySelector(".btn-clear");
function createProduct(id: string, name: string, quantity: number, currency: string, price: number, url: string): Items {
    return { id, name, quantity, currency, price, url }
}
const keyboard: Items = createProduct('1', 'Keyboard', 1, 'RUB', 2000, 'https://media.kingston.com/hyperx/features/hx-features-keyboard-alloyfpspro-litup.jpg');
const mouse: Items = createProduct('2', 'Mouse', 1, 'RUB', 1000, 'https://epix.ru/images/catalog/accessories/mouse/hyperx/pulsefire_fps_pro/hyperpx-pulsefire-fps-pro.jpg');
const monitor: Items = createProduct('3', 'Monitor', 1, 'RUB', 10000, 'https://epix.ru/images/catalog/accessories/monitors/benq/zowie-xl2411p/benq-zowie-xl2411p.jpg');

interface Items {
    id: string;
    quantity: number;
    name: string;
    currency: string;
    price: number;
    url: string;
}

let basketArr: Array<Items> = [];

function quantityInBasket(): string {
    let quantity: number = 0;
    for (let i = 0; i < basketArr.length; i++) {
        quantity += basketArr[i].quantity;
    } return `Number of products: ${quantity}`;
}

function countBasketPrice(): string {
    let totalPrice: number = 0;
    for (let i = 0; i < basketArr.length; i++) {
        totalPrice += basketArr[i].price * basketArr[i].quantity;
    } return `Total sum: ${totalPrice} ${basketArr[0].currency}`;
}

function viewBasket(element: Items): void {
    basketArr = [...basketArr, element];
    if (totalPrice) {
        totalPrice.textContent = `${countBasketPrice()} ${quantityInBasket()}`;
    }
}

function clearBtn(): void {
    basketArr = [];
    if (totalPrice) {
        totalPrice.textContent = 'Basket is empty...';
    }
}

function renderDom(...elements: Array<Items>): void {
    if (totalPrice && clearAll && cart) {
        if (!basketArr.length) {
            totalPrice.textContent = 'Basket is empty...';
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
            price.textContent = `${elements[i].price}  ${elements[i].currency}`;
            let buyBtn: HTMLButtonElement = document.createElement("button");
            buyBtn.classList.add('btn');
            buyBtn.textContent = 'Add to cart';
            buyBtn.addEventListener('click', (e) => viewBasket(elements[i]))
            element.append(img);
            element.append(title);
            element.append(price);
            element.append(buyBtn);
            cart.append(element);
        }
    }
}

renderDom(keyboard, mouse, monitor);


