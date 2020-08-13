
class Products {
    constructor (name, price, count, currency){
        this.name = name;
        this.price = price;
        this.count = count;
        this.currency = currency;
    }
    totalPrice(){
       return this.price * this.count;
    }
}

let newBuy = new Products('apples', 100, 3, "RUB");
let newBuy1 = new Products('chocolade', 25, 5, "RUB");
let newBuy2 = new Products('books', 1250, 1, "RUB");
let newBuy3 = new Products('pineapples', 100, 3, "RUB");
let newBuy4 = new Products('toilete paper', 15, 100, "RUB");

function sumTotalAmong(...args) {
    return [...args].reduce(function(sum,current){
        return sum + current;
    }, 0);
}



let catalog = document.querySelector('#catalog');

let productsWrapper = document.createElement('div');
productsWrapper.className = 'products__wrapper';
catalog.appendChild(productsWrapper);
let newProduct;
let newProducts;

let minBut;
let plusBut;

let price;

function createShopItem(product){
    
    newProduct = document.createElement('div');
    newProduct.innerHTML = `
    <div class="item__header">${product.name}</div>
    <div class="item__count_wrapper">
    <button class='minBut'>-</button>
    <div class="item__count">${product.count}</div>
    <button class='plusBut'>+</button>
    </div>
    <div class="item__price">${product.price}</div>
    <button>add to bucket</button>
    `;
    newProduct.className = 'item';

    
    productsWrapper.appendChild(newProduct);
    
    // console.log(newProduct);
}

function countChanger(){
   
    
        minBut = document.querySelector('.minBut');
        plusBut = document.querySelector('.plusBut');
        
        minBut.onclick = function(){
           count = document.querySelector('.item__count');
            count.innerHTML = --count.innerHTML;
        };
    
        plusBut.onclick = function(){
            count = document.querySelector('.item__count');
            count.innerHTML = ++count.innerHTML;
        };  
}

function test(){
    newProducts = document.querySelectorAll('.item');
    console.log(newProducts);
    newProducts.forEach(item =>{
        countChanger();
    })
}


createShopItem(newBuy2);
createShopItem(newBuy1);
createShopItem(newBuy4);

test();
// createShopItem('books', 1250, 1, "RUB");


// console.log(sumTotalAmong(newBuy.totalPrice(),newBuy1.totalPrice(),newBuy2.totalPrice(),newBuy3.totalPrice(),newBuy4.totalPrice()));