const container = document.querySelector(".container");
const catalog = document.getElementById("catalog");
const cardItems = [];

const emptyBasket = document.createElement("span");
emptyBasket.textContent = `Корзина пуста`;
emptyBasket.classList.add("error-empty");
container.appendChild(emptyBasket);

const basketContainer = document.createElement("div");
basketContainer.classList.add("basket");
container.appendChild(basketContainer);

const itemName = document.createElement("select");

itemName.classList.add("item-name");
basketContainer.appendChild(itemName);

const errorName = document.createElement("div");
errorName.classList.add("error-name");
basketContainer.appendChild(errorName);

const itemCount = document.createElement("input");
itemCount.setAttribute("type", "number");
itemCount.setAttribute("value", "1");
itemCount.setAttribute("placeholder", "Укажите количество товара");
itemCount.setAttribute("min", "1");
itemCount.setAttribute("max", "100");
itemCount.classList.add("item-count");
basketContainer.appendChild(itemCount);

const errorCount = document.createElement("div");
errorCount.classList.add("error-count");
basketContainer.appendChild(errorCount);

const addBtn = document.createElement("button");
addBtn.setAttribute("type", "submit");
addBtn.textContent = "Добавить";
addBtn.classList.add("send", "btn-primary");
basketContainer.appendChild(addBtn);

const clearBtn = document.createElement("button");
clearBtn.setAttribute("type", "reset");
clearBtn.textContent = "Удалить";
clearBtn.classList.add("clear", "btn-primary");
basketContainer.appendChild(clearBtn);

const imgContainer = document.createElement("div");
imgContainer.classList.add("item-image");
container.appendChild(imgContainer);

const img = document.querySelector(".img-item");

const modal = document.createElement("div");
modal.innerHTML = `<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
Посмотреть изображения товара
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title" id="exampleModalLabel">Носки</h5>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
   <ol class="carousel-indicators">
<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
<li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
<li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
</ol>
<div class="carousel-inner">
<div class="carousel-item active">
<img src="./css/img/socks-1.png" class="d-block w-100" alt="socks">
</div>
<div class="carousel-item">
<img src="./css/img/socks-2.png" class="d-block w-100" alt="socks">
</div>
<div class="carousel-item">
<img src="./css/img/socks-3.png" class="d-block w-100" alt="socks">
 </div>
</div>
<a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
<span class="carousel-control-prev-icon" aria-hidden="true"></span>
<span class="sr-only">Previous</span>
</a>
<a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
<span class="carousel-control-next-icon" aria-hidden="true"></span>
<span class="sr-only">Next</span>
</a>
</div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
    </div>
  </div>
</div>
</div>`;
imgContainer.appendChild(modal);

class Basket {
    constructor(rest) {
        this.rest = [];

    }
}

class Product extends Basket {
    constructor(name, price) {
        super();
        this.name = name;
        this.price = price;
        this.count = itemCount.value;
    }
}

cardItems.push(new Product("Носки", 200));
cardItems.push(new Product("Полотенце", 400));
cardItems.push(new Product("Трусы", 300));
for (let i = 0; i < cardItems.length; i++) {
    const cardOptoin = document.createElement("option");
    cardOptoin.classList.add("cardOption__item");
    cardOptoin.textContent = `${cardItems[i].name}`;
    itemName.appendChild(cardOptoin);
}

const basketArray = new Basket();
const basketArr = basketArray.rest;

// showImages();

addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (itemName.value === "") {
        errorName.textContent = "Выберите товар";
    } else {
        errorName.textContent = "";
    }
    if (itemCount.value === "") {
        errorCount.textContent = "Выберите количество товара";
    } else {
        errorCount.textContent = "";

    }

    getValue(itemCount);
    let cardSelected = cardItems.find(item => item.name == itemName.value);
    cardSelected.count = itemCount.value;

    hideBlockEmptyBasket();

    const newItem = getBasketMarkup(itemName.value, itemCount.value);
    basketContainer.appendChild(newItem);


});

itemName.addEventListener('change', (e) => {
    changeImage(itemName.value);
});


clearBtn.addEventListener("click", (e) => {
    e.preventDefault();
    showBlockEmptyBasket();
    itemName.value = "";
    itemCount.value = "";

    const totalBasket = document.querySelector(".items");

    const topToDelete = document.querySelectorAll(".top-item");
    for (let i = 0; i < topToDelete.length; i++) {
        topToDelete[i].remove();
    }
    let basketTextToDelete = document.querySelector(".basket-text");
    basketTextToDelete.textContent = "";

});

function getValue() {
    let selectValue = itemCount.value;
    console.log(selectValue);
    return selectValue;
}

function hideBlockEmptyBasket() {
    emptyBasket.style.display = 'none';
}

function showBlockEmptyBasket() {
    emptyBasket.style.display = 'block';
}

function getBasketMarkup(name, count) {
    const basketPopover = document.createElement("div");
    basketPopover.classList.add("items");

    let newProd = new Product(name);
    getValue(itemCount);
    let cardSelected = cardItems.find(item => item.name == itemName.value);
    newProd.price = cardSelected.price;
    basketArr.push(newProd);
    console.log(basketArr);

    let totalCount = 0;
    let totalPrice = 0;
    for (let i = 0; i < basketArr.length; i++) {
        totalPrice += basketArr[i].price * basketArr[i].count;
        totalCount += +basketArr[i].count;
    }

    const basketText = document.createElement("div");
    basketText.textContent = `В корзине ${totalCount} товаров на сумму ${totalPrice} рублей`;
    basketText.classList.add("basket-text");
    basketPopover.appendChild(basketText);

    const queryCount = document.querySelector(".items");
    if (queryCount != null) {
        queryCount.remove();
    }
    showBasket();
    return basketPopover;
}

function showBasket() {
    const topItem = document.createElement("div");
    topItem.classList.add("top-item");
    getValue(itemCount);
    let cardSelected = cardItems.find(item => item.name == itemName.value);

    topItem.textContent = `Имя товара: ${cardSelected.name}, количество товара: ${cardSelected.count}, цена товара: ${cardSelected.price}`;
    catalog.appendChild(topItem);

}

function changeImage(name) {
    if (name === "Трусы") {
        modal.innerHTML = `<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
Посмотреть изображения товара
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title" id="exampleModalLabel">Трусы</h5>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
   <ol class="carousel-indicators">
<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
<li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
<li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
</ol>
<div class="carousel-inner">
<div class="carousel-item active">
<img src="./css/img/pants-1.png" class="d-block w-100" alt="pants">
</div>
<div class="carousel-item">
<img src="./css/img/pants-2.png" class="d-block w-100" alt="pants">
</div>
<div class="carousel-item">
<img src="./css/img/pants-3.png" class="d-block w-100" alt="pants">
 </div>
</div>
<a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
<span class="carousel-control-prev-icon" aria-hidden="true"></span>
<span class="sr-only">Previous</span>
</a>
<a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
<span class="carousel-control-next-icon" aria-hidden="true"></span>
<span class="sr-only">Next</span>
</a>
</div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
    </div>
  </div>
</div>
</div>`;
    }
    if (name === "Полотенце") {
        modal.innerHTML = `<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
Посмотреть изображения товара
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title" id="exampleModalLabel">Полотенце</h5>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
   <ol class="carousel-indicators">
<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
<li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
<li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
</ol>
<div class="carousel-inner">
<div class="carousel-item active">
<img src="./css/img/towel-1.jpg" class="d-block w-100" alt="towel">
</div>
<div class="carousel-item">
<img src="./css/img/towel-2.jpg" class="d-block w-100" alt="towel">
</div>
<div class="carousel-item">
<img src="./css/img/towel-3.jpg" class="d-block w-100" alt="towel">
 </div>
</div>
<a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
<span class="carousel-control-prev-icon" aria-hidden="true"></span>
<span class="sr-only">Previous</span>
</a>
<a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
<span class="carousel-control-next-icon" aria-hidden="true"></span>
<span class="sr-only">Next</span>
</a>
</div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
    </div>
  </div>
</div>
</div>`;
    }
    if (name === "Носки") {
        modal.innerHTML = `<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
Посмотреть изображения товара
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title" id="exampleModalLabel">Носки</h5>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
   <ol class="carousel-indicators">
<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
<li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
<li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
</ol>
<div class="carousel-inner">
<div class="carousel-item active">
<img src="./css/img/socks-1.png" class="d-block w-100" alt="socks">
</div>
<div class="carousel-item">
<img src="./css/img/socks-2.png" class="d-block w-100" alt="socks">
</div>
<div class="carousel-item">
<img src="./css/img/socks-3.png" class="d-block w-100" alt="socks">
 </div>
</div>
<a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
<span class="carousel-control-prev-icon" aria-hidden="true"></span>
<span class="sr-only">Previous</span>
</a>
<a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
<span class="carousel-control-next-icon" aria-hidden="true"></span>
<span class="sr-only">Next</span>
</a>
</div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
    </div>
  </div>
</div>
</div>`;
    }

}









