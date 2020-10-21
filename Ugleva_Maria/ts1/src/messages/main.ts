const root: HTMLElement | null = document.getElementById('root');
const inputsWrapper = document.createElement('div');
inputsWrapper.classList.add('inputsWrapper');
const catalogContainer : HTMLElement | null = document.getElementById('catalog');
const sumBasket = document.createElement('p');

interface ObjectItem {
    name: string | null;
    price: number;
    currency: string;
    count?: number;
    id?: number;
    [a: string] : any
}

function addMainBlocks() {
    // функция для добавления input на страницу 
    function createInputBlock(name : string, type : string) {
        const inputBox = document.createElement('div');
        const labelNameProduct = document.createElement('label');
        inputBox.append(labelNameProduct);
        labelNameProduct.innerText = name;
        const inputNameProduct = document.createElement('input');
        inputBox.append(inputNameProduct);
        inputNameProduct.id = name.toLowerCase();
        inputNameProduct.type = type;
        inputsWrapper.append(inputBox);
        if (root) {
            root.prepend(inputsWrapper);
        }
    }

    // добавление input
    createInputBlock('Name', 'text');
    createInputBlock('Price', 'text');
    createInputBlock('Currency', 'text');

    // кнопка добавления товара
    const btnSend = document.createElement('button');
    btnSend.innerText = 'Создать товар';
    inputsWrapper.append(btnSend);
   
    // проверка валидности
    function checkValid(item : ObjectItem) : boolean {
        return !!(item.name && !isNaN(item.price) && (item.currency === 'RUB' || item.currency === 'USD' || item.currency === 'EUR'));
    }
    // обработчик клика создать товар
    btnSend.onclick = function () : void{   
        const nameInput : HTMLInputElement | null = document.querySelector("input[id='name']");
        const priceInput : HTMLInputElement | null = document.querySelector('input[id="price"]');
        const cuttencyInput : HTMLInputElement | null = document.querySelector('input[id="currency"]');
        if (nameInput && priceInput && cuttencyInput) {
            let newElem : ObjectItem = {
                name: nameInput.value,
                price: +priceInput.value,
                currency: cuttencyInput.value,
                count: 0
            };
            if (checkValid(newElem)) {
                addNewProduct(newElem, basketObj.catalogBox.length);
                sumBasket.innerHTML = updateQuantity();
                nameInput.value = '';
                priceInput.value = '';
                cuttencyInput.value = '';
            }
            else {
                alert('Что-то не так')
            }
            console.log(basketObj.catalogBox);
        
        }
           
       
    }
    // визуализация каталога
    function createCatalog() : void {
        const headerBasket = document.createElement('h2');
        headerBasket.textContent = 'Каталог';
        if (catalogContainer) {
            catalogContainer.append(headerBasket);
            const emptyCatalog = document.createElement('p');
            emptyCatalog.id = 'emptyCatalog';
            emptyCatalog.textContent = 'Каталог пуст';
            basketObj.catalogBox.length === 0 ? catalogContainer.append(emptyCatalog) : null;
            basketObj.catalogBox.forEach((item, index) => addNewProduct(item, index));
        }       
       
    }
    // обновить строчку с кол-вом товаров и суммой
    function updateQuantity():string {
        let str : string = `В корзине ${basketObj.countQuantity()} ${formWordProduct()} на сумму ${basketObj.countBasketPrice()} рублей`;
        return str;
    }
    // добавление нового продукта на экран
    function addNewProduct(product : any, index: number): void {
        const clearEmptyCatalog : HTMLElement | null  = document.getElementById('emptyCatalog');
        if (clearEmptyCatalog) {
            clearEmptyCatalog.innerHTML = '';
            basketObj.catalogBox.push(product);
            const catalogItemBox = document.createElement('div');
            catalogItemBox.classList.add('itemBasket');
            const btn : HTMLButtonElement = document.createElement('button');
            btn.id = index.toString();
    
            btn.textContent = 'Купить';
            btn.addEventListener('click', function (event : any) {
                    event.preventDefault();
                    if (event.target) {
                        createBasketItem(event.target.id);
                    }
                
            });
            Object.defineProperty(product, 'count', { 'enumerable': false });
            let str = '';
            for (let key in product) {
                str += `${key}: ${product[key]} <br>`;
            }
            catalogItemBox.innerHTML = str;
            catalogItemBox.append(btn);
            if (catalogContainer) {
                catalogContainer.append(catalogItemBox);

            }
        }
        
    }
    createCatalog();
    // для правильной формы слова "товар"
    function formWordProduct() : string {
        let quantity : number = basketObj.countQuantity();
        quantity %= 100;
        if (quantity >= 5 && quantity <= 20) {
            return 'товаров';
        }
        quantity %= 10;
        if (quantity === 1) {
            return 'товар';
        }
        if (quantity >= 2 && quantity <= 4) {
            return 'товара';
        }
        return 'товаров';
    }

    function createBasket() : void {
        const basketContainer : HTMLElement | null = document.getElementById('basket');
        const basketHeader = document.createElement('h2');
        const basketInfo = document.createElement('p');
        basketInfo.id = 'basketInfo';
        const basketItemsBox = document.createElement('div');
        basketItemsBox.classList.add('basketItemsBox');
        basketHeader.textContent = 'Корзина';
        if (basketContainer) {
            basketContainer.append(basketHeader);
            basketContainer.append(basketInfo);
            basketContainer.append(basketItemsBox);
        }
        
    }
    createBasket();

    function createBasketItem(id : number) : void {
        const objToChange : ObjectItem | undefined = basketObj.buyProduct.find(item => item.id === id);
        if (objToChange) {
            console.log('уже есть');
            if (objToChange.count !== undefined) objToChange.count++;
            console.log(basketObj.buyProduct);
            renderBasketItem();
            return;
        }
        else {
            const newElemBasket = basketObj.catalogBox[id];
            if (newElemBasket) {
                newElemBasket.id = id;
                if (newElemBasket.count !== undefined) newElemBasket.count++;
                basketObj.buyProduct.push(newElemBasket);
            }
            
            renderBasketItem();
        }
    }
    function renderBasketItem(): void {
        const basketContainer: HTMLElement | null = document.getElementById('basket');
        const basketInfo : HTMLElement | null = document.getElementById('basketInfo');
        if (basketContainer && basketInfo) {
            basketInfo.textContent = updateQuantity();
            basketContainer.append(basketInfo);
            const box : HTMLElement | null = document.querySelector('.basketItemsBox');
            if (box) {
                box.innerHTML = '';
                basketObj.buyProduct.map((item) => {
                    const basketItem = document.createElement('div');
                    basketItem.classList.add('basketItem');
                    let str = '';
                    Object.defineProperty(item, 'count', { 'enumerable': true });
                    Object.defineProperty(item, 'id', { 'enumerable': false });
        
                    for (let key in item) {
                        str += `${key}: ${item[key]} <br>`;
                    }
                    basketItem.innerHTML = str;
                    box.append(basketItem);
                })
            }
            
        }
       

    }
}
interface basketInterface  {
    catalogBox: Array<ObjectItem>;
    buyProduct: Array<ObjectItem>;
    countQuantity() : number;
    countBasketPrice() : number;
}
const basketObj : basketInterface= {
    catalogBox: [],
    buyProduct: [],
    countQuantity: function () {
        let res = this.buyProduct.reduce((quantity, item) =>{
            if (item.count) {
                return (quantity + +item.count)
            }
            return 0;
        } , 0);
        return res;
    },
    countBasketPrice: function (): number{
        let currency : any = {
            "RUB": 1,
            "USD": 72.95,
            "EUR": 86.61
        };
        let result : number = this.buyProduct.reduce((sum, item) : number => {
        if (item.count !== undefined) return sum + item.price * currency[item.currency] * item.count
    else return 0}, 0);
        
        return result;
    }

}
window.onload = addMainBlocks;