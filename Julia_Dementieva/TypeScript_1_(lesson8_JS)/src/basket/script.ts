import './style.css';
class Product {
            constructor(name, price, quantity){
                this.name = name;
                this.price = price;
                this.quantity = quantity;
            }

            showProduct(){
                return `Название ${this.name} Цена ${this.price}руб. Количество ${this.quantity}`;
            }
            
        }
interface Product {
    name: string;
    price: Number;
    
}
class Basket{
    constructor(productsList){
        this.productsList = productsList;
    }

    countBasketPrice(){
        let sum = 0;
        for (let i = 0; i < this.productsList.length; i++){
            sum += this.productsList[i].price * this.productsList[i].quantity;
        }
        return sum;
    }

    add(product){
        if (product instanceof Product) {
            this.productsList.push(product);
        } else { 
            console.log('Товар не может быть вставлен');
        }
        
    }

    delete(idProduct){
        if(idProduct>=0 && idProduct < this.productsList.length){
            // Не знаю, как по-другому сделать, без этой строчки
            // количество при измении в корзине,меняется и в каталоге
            this.productsList[idProduct].quantity = 1;
            // Удаляет продукт из корзины
            this.productsList.splice(idProduct, 1);
        } else {
            console.log('Удалить нельзя - неверный индекс');
        }
    }

    changeQuality(index){
        this.productsList[index].quantity = this.productsList[index].quantity + 1;
        return true;
    }

    showNameProduct(index){
        if(index>=0 && index < this.productsList.length){
            return this.productsList[index].name;
        }
        return -1;
    }

    showProducts(){
        for (let i = 0; i < this.productsList.length; i++){
            this.productsList[i].showProduct();
        }
    }
    showProduct(product){
        
        return this.productsList[product].showProduct();
        
    }
    show_sum(){
        console.log(`Общая сумма: ${this.countBasketPrice()}`);
    }
    showSumProducts(){
        let qualities = 0;
        for (let i = 0; i < this.productsList.length; i++){
            qualities += this.productsList[i].quantity;
        }
        return qualities;
    }

    length(){
        return this.productsList.length;
    }
}

const catalog = document.getElementById('catalog');
let catalogPrd = 
[ 
    new Product('Table', 10000, 1),
    new Product('Armchair', 4570, 1),
    new Product('Picture "Summer"', 1390, 1),
    new Product('Picture "Winter"', 1600, 1)
]

function showCatalog(){
    const titleCatalog = document.createElement('h2');
    titleCatalog.innerHTML =`Каталог`;
    catalog.appendChild(titleCatalog);

    for(let i = 0; i<catalogPrd.length; i++){
        const product = document.createElement('div');
        product.classList.add('prd');
        const prd_text = document.createElement('p');
        prd_text.innerHTML =`${catalogPrd[i].showProduct()}`;
        product.appendChild(prd_text);
        const prd_btn = document.createElement('button');
        prd_btn.className='btn btn-primary';
        prd_btn.id = `${i}`;
        prd_btn.onclick = addBasket;
        prd_btn.innerHTML =`Добавить в корзину`;
        product.appendChild(prd_text);
        product.appendChild(prd_btn);
        catalog.appendChild(product);
        const hr = document.createElement('hr');
        catalog.appendChild(hr);
    }

}
let basket1 = new Basket ([
             new Product('Table', 10000, 1),
             new Product('Picture "Winter"', 1600, 1)
        ]);
// Возвращает индекс продукта,если он уже есть в корзине - поиск по имени
function findName(productName){
    for(let i = 0; i < basket1.length(); i++){
        if(basket1.showNameProduct(i) === productName){
            return i;
        }
    }
    return -1;
}

function addBasket(){
    let findProductIndex = findName(catalogPrd[this.id].name);
    if(findProductIndex>=0){
        basket1.changeQuality(findProductIndex);
    } else {
        basket1.add(catalogPrd[this.id]);
    }
    document.getElementById('basket').innerHTML = '';
    showBasket();
}

const basket = document.getElementById('basket');
function deleteProduct(){
    basket1.delete(this.id);
    document.getElementById('basket').innerHTML = '';
    showBasket();
}
function showBasket(){
    const titleBasket = document.createElement('h2');
    titleBasket.innerHTML =`Корзина`;
    basket.appendChild(titleBasket);

    
    if(basket1.length() === 0){
        const error = document.createElement('span');
        error.innerHTML =`Корзина пуста`;
        error.classList.add('error-basket');
        basket.appendChild(error);
        document.getElementsByName('sumPrice').innerHTML = '' ;
    } else {
        for (let i = 0; i < basket1.length(); i++){
            const product = document.createElement('div');
            product.classList.add('prd');
            const prd_text = document.createElement('p');
            prd_text.innerHTML =`${basket1.showProduct(i)}`;
            product.appendChild(prd_text);
            const prd_btn = document.createElement('button');
            prd_btn.className='btn btn-danger';
            prd_btn.id=`${i}`;
            prd_btn.onclick = deleteProduct;
            prd_btn.innerHTML =`Удалить из корзины`;
            product.appendChild(prd_text);
            product.appendChild(prd_btn);
            basket.appendChild(product);
            const hr = document.createElement('hr');
            basket.appendChild(hr);
        }
        const sumPrice = document.createElement('span');
        sumPrice.classList.add('sumPrice');
        sumPrice.innerHTML =`В корзине: ${basket1.showSumProducts()} товара на сумму 
        ${basket1.countBasketPrice()} рублей`;
        basket.appendChild(sumPrice);
    }

}

showCatalog();
showBasket();
