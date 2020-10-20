import './style.css';

const catalog: HTMLElement | null = document.getElementById('catalog');
const basket: HTMLElement | null = document.getElementById('basket');

interface Product {
    name: string;
    price: number;
    quantity: number;
}

let productsList: Array<Product> = [];
let product1: Product = {name: 'Table', price: 10000, quantity: 1};
let product2: Product = {name: 'Armchair', price: 4570, quantity: 1};
let product3: Product = {name: 'Picture "Summer"', price: 1390, quantity: 1};
let product4: Product = {name: 'Picture "Winter"', price: 1600, quantity: 1};

productsList.push(product1, product2, product3, product4);

let basketList: Array<Product> = [];
let basket1: Product = {name: 'Table', price: 10000, quantity: 1};
let basket2: Product = {name: 'Armchair', price: 4570, quantity: 1};
basketList.push(basket1, basket2);

//false - выводит продукт из каталог, true - выводит из корзина
function showProduct(index: number, type: boolean): string{
    try{
        return (!type) ? `Название ${productsList[index].name} Цена ${productsList[index].price}руб. Количество ${productsList[index].quantity}`
        : `Название ${basketList[index].name} Цена ${basketList[index].price}руб. Количество ${basketList[index].quantity}`;     
    } catch(e){
        return "Неправильный индекс";
    }
    
}

function countBasketPrice(): number{
    let sum: number = 0;
    for (let i = 0; i < basketList.length; i++){
        sum += basketList[i].price * basketList[i].quantity;
    }
    return sum;
}

function delProduct(idProduct: number): void {
    if(idProduct>=0 && idProduct < basketList.length){
        basketList[idProduct].quantity = 1;
        // Удаляет продукт из корзины
        basketList.splice(idProduct, 1);
    }
}

function changeQuality(index: number): boolean{
    basketList[index].quantity = basketList[index].quantity + 1;
    return true;
}

function showNameProduct(index: number): string | number {
    if(index>=0 && index < basketList.length){
        return basketList[index].name;
    }
    return -1;
}

function showSumProducts(): number{
    let qualities: number = 0;
    for (let i = 0; i < basketList.length; i++){
        qualities += basketList[i].quantity;
    }
    return qualities;
}


function showCatalog(): void{
    if(catalog){
        const titleCatalog: HTMLHeadingElement = document.createElement('h2');
        titleCatalog.innerHTML =`Каталог`;
        catalog.appendChild(titleCatalog);

        for(let i = 0; i < productsList.length; i++){
            const product: HTMLDivElement = document.createElement('div');
            product.classList.add('prd');
            const prd_text: HTMLParagraphElement = document.createElement('p');
            prd_text.innerHTML =`${showProduct(i, false)}`;
            product.appendChild(prd_text);
            const prd_btn: HTMLButtonElement = document.createElement('button');
            prd_btn.className='btn btn-primary';
            prd_btn.id = `${i}`;
            prd_btn.addEventListener('click', (): void => addBasket(i));
            prd_btn.innerHTML =`Добавить в корзину`;
            product.appendChild(prd_text);
            product.appendChild(prd_btn);
            catalog.appendChild(product);
            const hr: HTMLHRElement = document.createElement('hr');
            catalog.appendChild(hr);
        }
    }
}

// Возвращает индекс продукта,если он уже есть в корзине - поиск по имени
function findName(productName: string): number{
    for(let i = 0; i < basketList.length; i++){
        if(showNameProduct(i) === productName){
            return i;
        }
    }
    return -1;
}

function addBasket(id: number): void{
    let findProductIndex: number = findName(productsList[id].name);
    if(findProductIndex>=0){
        changeQuality(findProductIndex);
    } else {
        basketList.push(productsList[id])
    }

    if(basket) basket.innerHTML = '';
    showBasket();
}

function deleteProduct(index: number): void{
    if(basket){
        delProduct(index);
        basket.innerHTML = '';
        showBasket();
    }
}

function showBasket(): void{
    if(basket){
        const titleBasket: HTMLHeadingElement = document.createElement('h2');
        titleBasket.innerHTML =`Корзина`;
        basket.appendChild(titleBasket);
        
        if(basketList.length === 0){
            const error: HTMLSpanElement = document.createElement('span');
            error.innerHTML =`Корзина пуста`;
            error.classList.add('error-basket');
            basket.appendChild(error);
            // const sumPriceSpan: HTMLSpanElement | null = document.getElementsByName('sumPrice') ;
            // sumPriceSpan.innerHTML = '';
            
        } else {
            for (let i = 0; i < basketList.length; i++){
                const product: HTMLDivElement = document.createElement('div');
                product.classList.add('prd');
                const prd_text: HTMLParagraphElement = document.createElement('p');
                prd_text.innerHTML =`${showProduct(i, true)}`;
                product.appendChild(prd_text);
                const prd_btn: HTMLButtonElement = document.createElement('button');
                prd_btn.className='btn btn-danger';
                prd_btn.id=`${i}`;
                prd_btn.addEventListener('click', ():void =>  deleteProduct(i));
                prd_btn.innerHTML =`Удалить из корзины`;
                product.appendChild(prd_text);
                product.appendChild(prd_btn);
                basket.appendChild(product);
                const hr: HTMLHRElement = document.createElement('hr');
                basket.appendChild(hr);
            }
            const sumPrice: HTMLSpanElement = document.createElement('span');
            sumPrice.classList.add('sumPrice');
            sumPrice.innerHTML =`В корзине: ${showSumProducts()} товара на сумму 
            ${countBasketPrice()} рублей`;
            basket.appendChild(sumPrice);
        }
    }
}

showCatalog();
showBasket();
