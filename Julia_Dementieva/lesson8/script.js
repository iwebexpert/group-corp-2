//Функция генерирует строку с буквами, addName - к какому элементу
// добавить строку
function notationLetter(addName){
	const notation = document.createElement('tr');
    notation.classList.add('notation');
    addName.appendChild(notation);
    const emptyField = document.createElement('td');
    notation.appendChild(emptyField);
    const letter = ["A","B","C","D","E","F","G","H"];
    for(let i = 1; i <=8; i++){
    	const number = document.createElement('td');
    	number.innerHTML = letter[i-1];
    	notation.appendChild(number);
    }
}


function ChessBoard() {

    const chessDiv = document.querySelector('.chess-board');

    const boardTb = document.createElement('table');
    boardTb.classList.add('chess-table');
    chessDiv.appendChild(boardTb);
    // Добавляем буквы
    notationLetter(boardTb);

    for (let i = 8; i >0; i--){
    	const tr = document.createElement('tr');
    	const number = document.createElement('td');
    	number.innerHTML = `${i}`;
    	tr.appendChild(number);
    	
    	for(let j = 1; j <=8; j++){
    		const field = document.createElement('td');
    		(i + j) % 2 ? field.classList.add('white') : field.classList.add('black');
    		tr.appendChild(field);
    	}
    	const numberSecond = document.createElement('td');
    	numberSecond.innerHTML = `${i}`;
    	tr.appendChild(numberSecond);


    	boardTb.appendChild(tr);
    }
    // Добавляем буквы
    notationLetter(boardTb);

}    


// ---------Задание 2-3-----------

class Product {
            constructor(name, price, quantity){
                this.setName(name);
                this.setPrice(price);
                this.setQuantity(quantity);
            }

            get name() {
                return this._name;
            }
            get price() {
                return this._price;
            }
            get quantity() {
                return this._quantity;
            }

            setName(name) {
                this._name = name;
            }
            setPrice(price) {
                this._price = price;
            }
            setQuantity(quantity) {
                this._quantity = quantity;
            }

            showProduct(){
                return `Название ${this._name} Цена ${this._price}руб. Количество ${this._quantity}`;
            }
            
        }

class Basket{
    constructor(productsList){
        this.setProductsList(productsList);
    }

    get productsList() {
        return this.productsList;
    }

    setProductsList(productsList){
        this._productsList = productsList;
    }

    countBasketPrice(){
        let sum = 0;
        for (let i = 0; i < this._productsList.length; i++){
            sum += this._productsList[i].price * this._productsList[i].quantity;
        }
        return sum;
    }

    add(product){
        if (product instanceof Product) {
            this._productsList.push(product);
        } else { 
            console.log('Товар не может быть вставлен');
        }
        
    }

    delete(idProduct){
        if(idProduct>=0 && idProduct < this._productsList.length){
            // Не знаю, как по-другому сделать, без этой строчки
            // количество при измении в корзине,меняется и в каталоге
            this._productsList[idProduct].setQuantity(1);
            // Удаляет продукт из корзины
            this._productsList.splice(idProduct, 1);
        } else {
            console.log('Удалить нельзя - неверный индекс');
        }
    }

    changeQuality(index){
        this._productsList[index].setQuantity(this._productsList[index].quantity + 1);
        return true;
    }

    showNameProduct(index){
        if(index>=0 && index < this._productsList.length){
            return this._productsList[index].name;
        }
        return -1;
    }

    showProducts(){
        for (let i = 0; i < this._productsList.length; i++){
            this._productsList[i].showProduct();
        }
    }
    showProduct(product){
        
        return this._productsList[product].showProduct();
        
    }
    show_sum(){
        console.log(`Общая сумма: ${this.countBasketPrice()}`);
    }
    showSumProducts(){
        let qualities = 0;
        for (let i = 0; i < this._productsList.length; i++){
            qualities += this._productsList[i].quantity;
        }
        return qualities;
    }

    length(){
        return this._productsList.length;
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
