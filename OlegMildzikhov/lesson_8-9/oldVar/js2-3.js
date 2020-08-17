//Конструктор из предыдущего ДЗ. В этом конструкторе создаем объект с товаром. 
class Products {
    constructor (name, price, count, currency){
        this.name = name;
        this.price = price;
        this.priceCount = price * count;
        this.count = count;
        this.currency = currency;
    }
    totalPrice(){
       return this.price * this.count;
    }
  
}

let newBuy = new Products('apples', 100, 1, "RUB");
let newBuy1 = new Products('chocolade', 25, 1, "RUB");
let newBuy2 = new Products('books', 1250, 1, "RUB");
let newBuy3 = new Products('pineapples', 100, 1, "RUB");
let newBuy4 = new Products('toilete paper', 15, 1, "RUB");


//Создаем сам каталог 

let catalog = document.querySelector('#catalog');

let productsWrapper = document.createElement('div');
productsWrapper.className = 'products__wrapper';
catalog.appendChild(productsWrapper);

let newProduct;
let newProducts;
let minBut;
let plusBut;
let price;
let bucket;
let totalAmoung = [];
let totalCount = [];


//Функция, отвечающая за построение каталога с товаром
function createShopItem(product){
    newProducts = document.querySelectorAll('item');
    newProduct = document.createElement('div');
    newProduct.innerHTML = `
        <div class="item__header">${product.name}</div>
        <div class="item__count_wrapper">
        <button class='minBut'>-</button>
        <div class="item__count">${product.count}</div>
        <button class='plusBut'>+</button>
        </div>
        <div class="item__price">${product.price}</div>
        <button class="bucket">add to bucket</button>
    `;
    newProduct.className = 'item';
    productsWrapper.appendChild(newProduct);

//Обработчик событий. Самая сложная и проблемная часть. Очень много лишнего кода, но решения лучше не придумал. Данный обработчик изменяет количество товара, которое будет добавлено в корзину
    newProduct.addEventListener('mouseenter', (e)=>{
        
        minBut = document.querySelectorAll('.minBut');
        plusBut = document.querySelectorAll('.plusBut');
        bucket = document.querySelectorAll(".bucket");
        count = document.querySelectorAll('.item__count');
        price =  document.querySelectorAll('.item__price');
       //уменьшение количества товара
        minBut.forEach((item, i)=>{
            item.onclick = function(){
                count[i].innerHTML = --count[i].innerHTML;
                price[i].innerHTML = count[i].innerHTML * product.price;
                }; 
        });
        //увеличениие количества товара
        plusBut.forEach((item, i)=>{
            item.onclick = function(){
                count[i].innerHTML = ++count[i].innerHTML;
                price[i].innerHTML = count[i].innerHTML * product.price;
                }; 
        });
        //добавление товара в корзину. В момент нажатия на эту конпку в два массива пушится цена товара с учетом его количества. А также вызывается функция, которая отвечает за вывод количество товара и его сумму
        bucket.forEach((item, i)=>{
            item.onclick = function(){
                totalAmoung.push(parseInt(price[i].innerHTML));
                totalCount.push(parseInt(count[i].innerHTML));
                createShopBasket(totalAmoung, totalCount);
                };
});


});

}
//Функция, отвечающая за создание корзины. Самый главный минус данной корзины в том, что она создается каждый раз снова после нажатия на кнопку Add to bucket, что приводит к появлению каждый раз нового сообщения о добавлении товара в корзину
function createShopBasket(totalSum, totalCount){
    let basketWrapper = document.createElement('div');
        basketWrapper.className = 'basket__wrapper';
        catalog.appendChild(basketWrapper);
//Проверяем пустая корзина или нет
        if(totalSum == null || totalCount == null){
           return basketWrapper.innerHTML = `Корзина пустая`;
        } else {
//Так как при нажатии кнопки add to bucket в массивы пушится цена и количество товара, я передаю их в эту функцию, а далее с помощью редьюса считаю суммарную стоимость     
totalCount = totalCount.reduce(function(sum,current){
            return sum + current;
        }, 0);
       totalSum = totalSum.reduce(function(sum,current){
            return sum + current;
    }, 0);
    catalog.appendChild(basketWrapper);
        basketWrapper.innerHTML = `
            <p>в корзине ${totalCount} товара на ${totalSum} рублей </p>`;
    }
    
     console.log(totalSum);
        
}
createShopBasket();
createShopItem(newBuy2);
createShopItem(newBuy1);
createShopItem(newBuy4);