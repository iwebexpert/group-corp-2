const container = document.querySelector(".container");
const catalog = document.getElementById("catalog");
console.log(catalog);
console.log(container);

const emptyBasket = document.createElement("span");
emptyBasket.textContent = `Корзина пуста`;
emptyBasket.classList.add("error-empty");
container.appendChild(emptyBasket);

const basketContainer = document.createElement("div");
basketContainer.classList.add("basket");
container.appendChild(basketContainer);

const itemName = document.createElement("input");
itemName.setAttribute("type", "text");
itemName.setAttribute("placeholder", "Введите название товара");
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

const itemPrice = document.createElement("input");
itemPrice.setAttribute("type", "text");
itemPrice.setAttribute("placeholder", "Введите цену товара");
itemPrice.classList.add("item-price");
basketContainer.appendChild(itemPrice);

const errorPrice = document.createElement("div");
errorPrice.classList.add("error-price");
basketContainer.appendChild(errorPrice);

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
    if (itemPrice.value === "") {
        errorPrice.textContent = "Введите сумму товара";
    } else {
        errorPrice.textContent = "";
    }

    hideBlockEmptyBasket();

    const newItem = getBasketMarkup(itemName.value, itemCount.value, itemPrice.value);
    basketContainer.appendChild(newItem);
});

clearBtn.addEventListener("click", (e) => {
    e.preventDefault();
    showBlockEmptyBasket();
    itemName.value = "";
    itemCount.value = "";
    itemPrice.value = "";

    const totalBasket = document.querySelector(".items");
    totalBasket.remove();

    const topToDelete = document.querySelectorAll(".top-item");
    for (let i = 0; i < topToDelete.length; i++) {
        topToDelete[i].remove();
    }

});

function hideBlockEmptyBasket() {
    emptyBasket.style.display = 'none';
}

function showBlockEmptyBasket() {
    emptyBasket.style.display = 'block';
}

function getBasketMarkup(name, count, price) {
    const basketPopover = document.createElement("div");
    basketPopover.classList.add("items");

    class Product extends Basket {
        constructor(name, count, price) {
            super();
            this.name = name;
            this.count = count;
            this.price = price;
        }
    }
    let newProd = new Product(name, count, price);
    basketArr.push(newProd);

    let totalCount = 0;
    let totalPrice = 0;
    for (let i = 0; i < basketArr.length; i++) {
        totalPrice += basketArr[i].price * basketArr[i].count;
        totalCount += +basketArr[i].count;
    }

    const basketText = document.createElement("div");
    basketText.textContent = `В корзине ${totalCount} товаров на сумму ${totalPrice} рублей`;
    basketPopover.appendChild(basketText);

    const queryCount = document.querySelector(".items");
    if (queryCount != null) {
        queryCount.remove();
    }
    console.log(queryCount);
    showBasket();

    return basketPopover;
}

function showBasket() {
    const topItem = document.createElement("div");
    topItem.classList.add("top-item");
    topItem.textContent = `Имя товара: ${basketArr[basketArr.length - 1].name}, количество товара: ${basketArr[basketArr.length - 1].count}, цена товара: ${basketArr[basketArr.length - 1].price}`
    catalog.appendChild(topItem);
}









