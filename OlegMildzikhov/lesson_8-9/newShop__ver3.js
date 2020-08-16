

//Конструктор новых товаров
class Products {
    constructor (id, name, price, count, currency){
        this.id = id;
        this.name = name;
        this.price = price;
        this.priceCount = price * count;
        this.count = count;
        this.currency = currency;
    }
}
//Каталог с товарами
let catalogObj = {};
//Корзина
let cart = {};
//Количество элементов в корзине
let cartItems;
//Суммарная сумма товаров
let cartTotalSum;

//Функция, отвечающая за добавление нового объекта в корзину
function addToCart(item){
    // console.log(item);
    cart[item.id] = {};
    cart[item.id].name = item.name;
    cart[item.id].count = item.count;
    cart[item.id].price = item.price;
    cart[item.id].totalPrice = item.count * item.price;
    console.log('вызываю рендер корзины');
    renderCart();
}

function addToCatalog(item){
    catalogObj[item.id] = {};
    catalogObj[item.id].id = item.id;
    catalogObj[item.id].name = item.name;
    catalogObj[item.id].count = item.count;
    catalogObj[item.id].price = item.price;
    catalogObj[item.id].totalPrice = item.count * item.price;
}

//Создаем новый товар
let newBuy = new Products(1,'apples', 100, 1, "RUB");
let newBuy1 = new Products(3,'chocolade', 25, 1, "RUB");
let newBuy2 = new Products(8,'books', 1250, 1, "RUB");
let newBuy3 = new Products(9,'pineapples', 100, 1, "RUB");
let newBuy4 = new Products(52,'toilete paper', 15, 1, "RUB");

//Товар закидываем в коризнну
// addToCart(newBuy4);
// addToCart(newBuy2);
// addToCart(newBuy1);

//Добавляем товар в каталог
addToCatalog(newBuy1);
addToCatalog(newBuy2);
addToCatalog(newBuy3);
addToCatalog(newBuy4);
addToCatalog(newBuy);


//Обработчик событий, который подхватывает ID товара
document.onclick = event => {
    if(event.target.classList.contains('plus')){
        plusFunction(event.target.dataset.id);
    } 
    if(event.target.classList.contains('minus')){
        minusFunction(event.target.dataset.id);
    }
    if(event.target.classList.contains('bucket')){
        addButton(event.target.dataset.id);
    }
};
//Увеличение товара
const plusFunction = id => {
    cart[id]['count']++;
    cart[id].totalPrice = cart[id]["price"] * cart[id]['count'];
    
    renderCart();
};
//Уменьшение товара
const minusFunction = id => {
    if(cart[id]['count'] - 1 == 0) {
        deleteFunction(id);
        return true;
    }
    cart[id]['count']--;
    cart[id].totalPrice = cart[id]["price"] * cart[id]['count'];
    renderCart();
};
//Удаление товара
const deleteFunction = id => {
    Object.keys(cart).forEach((item, index)=>{
      if (item === id)
        {
          document.querySelectorAll('.item')[index].remove();
        }
    })
  delete cart[id];
    renderCart();
};

//кнопка добавить
const addButton = id => {
    addToCart(catalogObj[id]);
};

const createShopItem = (product) => {
  
    testCat = document.createElement('div');
    testCat.innerHTML = `
        <div class="test__header">${product.name}</div>
        <div class="test__count_wrapper">
        </div>
        <div class="test__price">${product.price}</div>
        <button class="bucket" data-id=${product.id}>add to bucket</button>
    `;
    testCat.className = 'test__shop';
    document.querySelector('#catalog').appendChild(testCat);
};


createShopItem(newBuy1);
createShopItem(newBuy2);
createShopItem(newBuy3);

//Отрисовка самой корзины и каталога
let catalog = document.querySelector('#catalog');
let basket = document.createElement('div');
basket.className = 'basket__wrapper';
catalog.appendChild(basket);

const renderCart = () => {
cartItems = 0;
cartTotalSum = 0;
Object.keys(cart).forEach((i)=> {
    cartItems += cart[i]['count'];
    cartTotalSum += cart[i]['totalPrice'];
    });   
    if(Object.keys(cart).length == 0){
        document.querySelector('.basket__wrapper').innerHTML = `Корзина пустая`;
      } else {
        document.querySelector('.basket__wrapper').innerHTML = `в корзине ${cartItems} товаров на сумму ${cartTotalSum} рублей`;
      }
console.log(cart);
        

};

renderCart();
