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
addBtn.classList.add("send");
basketContainer.appendChild(addBtn);

const clearBtn = document.createElement("button");
clearBtn.setAttribute("type", "reset");
clearBtn.textContent = "Удалить";
clearBtn.classList.add("clear");
basketContainer.appendChild(clearBtn);

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

    let mySelectedItem = getValue(itemCount);
    let cardSelected = cardItems.find(item => item.name == itemName.value);
    cardSelected.count = itemCount.value;

    hideBlockEmptyBasket();

    const newItem = getBasketMarkup(itemName.value, itemCount.value);
    basketContainer.appendChild(newItem);

});

function getValue() {
    let selectValue = itemCount.value;
    console.log(selectValue);
    return selectValue;
}

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
    let mySelectedItem = getValue(itemCount);
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

    let topItem = document.querySelector(".top-item");

    if (topItem == null) {
        basketText.style.display = "none";
    }

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
    let mySelectedItem = getValue(itemCount);
    let cardSelected = cardItems.find(item => item.name == itemName.value);

    let basketText = document.querySelector(".basket-text");
    topItem.textContent = `Имя товара: ${cardSelected.name}, количество товара: ${cardSelected.count}, цена товара: ${cardSelected.price}`;
    catalog.appendChild(topItem);
    if (basketText == null) {
        topItem.textContent = "";
    }
    console.log(cardSelected.count);

}









