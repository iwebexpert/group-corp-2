import "./style.css";
const container: HTMLDivElement | null = document.querySelector(".container");
const catalog: HTMLElement | null = document.getElementById("catalog");
const emptyBasket: HTMLSpanElement | null = document.createElement("span");
emptyBasket.textContent = `Корзина пуста`;
emptyBasket.classList.add("error-empty");
const basketContainer: HTMLDivElement | null = document.createElement("div");
basketContainer.classList.add("basket");
const itemName: HTMLSelectElement | null = document.createElement("select");
itemName.classList.add("item-name");
basketContainer.appendChild(itemName);
if (container) {
    container.appendChild(basketContainer);
    container.appendChild(emptyBasket);
};
const errorName: HTMLDivElement | null = document.createElement("div");
errorName.classList.add("error-name");
basketContainer.appendChild(errorName);
const itemCount: HTMLInputElement | null = document.createElement("input");
itemCount.setAttribute("type", "number");
itemCount.setAttribute("value", "1");
itemCount.setAttribute("placeholder", "Укажите количество товара");
itemCount.setAttribute("min", "1");
itemCount.setAttribute("max", "100");
itemCount.classList.add("item-count");
basketContainer.appendChild(itemCount);
const errorCount: HTMLDivElement | null = document.createElement("div");
errorCount.classList.add("error-count");
basketContainer.appendChild(errorCount);
const addBtn: HTMLButtonElement | null = document.createElement("button");
addBtn.setAttribute("type", "submit");
addBtn.textContent = "Добавить";
addBtn.classList.add("send");
basketContainer.appendChild(addBtn);
const clearBtn: HTMLButtonElement | null = document.createElement("button");
clearBtn.setAttribute("type", "reset");
clearBtn.textContent = "Удалить";
clearBtn.classList.add("clear");
basketContainer.appendChild(clearBtn);

interface basketItem {
    name: string;
    price: number;
    count: number;
};

const basketArr: basketItem[] = [];
const cardItems: basketItem[] = [{ name: "Носки", price: 200, count: +itemCount.value }, { name: "Полотенце", price: 400, count: +itemCount.value }, { name: "Трусы", price: 300, count: +itemCount.value }];

for (let i: number = 0; i < cardItems.length; i++) {
    const cardOptoin: HTMLOptionElement | null = document.createElement("option");
    cardOptoin.classList.add("cardOption__item");
    cardOptoin.textContent = `${cardItems[i].name}`;
    itemName.appendChild(cardOptoin);
}

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

    getValue();
    if (itemName) {
        let cardSelected: basketItem | undefined = cardItems.find(item => item.name == itemName.value);
        if (cardSelected) {
            cardSelected.count = +itemCount.value;
        }
    }

    hideBlockEmptyBasket();

    const newItem: HTMLDivElement | undefined = getBasketMarkup(itemName.value, +itemCount.value);
    if (newItem) {
        basketContainer.appendChild(newItem);
    }
});

function getValue(): number | undefined {
    if (itemCount) {
        let selectValue: number = +itemCount.value;
        return selectValue;
    }
    return;
};

clearBtn.addEventListener("click", (e) => {
    e.preventDefault();
    showBlockEmptyBasket();
    itemName.value = "Носки";
    itemCount.value = "1";
    const topToDelete: NodeListOf<HTMLDivElement> | null = document.querySelectorAll(".top-item");
    for (let i: number = 0; i < topToDelete.length; i++) {
        topToDelete[i].remove();
    }
    let basketTextToDelete: HTMLDivElement | null = document.querySelector(".basket-text");
    if (basketTextToDelete) {
        basketTextToDelete.textContent = "";
    }
});

function hideBlockEmptyBasket(): void {
    if (emptyBasket) {
        emptyBasket.style.display = "none";
    }
};

function showBlockEmptyBasket(): void {
    if (emptyBasket) {
        emptyBasket.style.display = "block";
    }
};

function getBasketMarkup(name: string, count: number): HTMLDivElement | undefined {
    const basketPopover: HTMLDivElement | null = document.createElement("div");
    basketPopover.classList.add("items");
    getValue();
    if (itemName) {
        let cardSelected: basketItem | undefined = cardItems.find(item => item.name == itemName.value);
        if (cardSelected) {
            let newProd: basketItem = { name, price: cardSelected.price, count };
            basketArr.push(newProd);
        }
    }
    let totalCount: number = 0;
    let totalPrice: number = 0;
    for (let i: number = 0; i < basketArr.length; i++) {
        totalPrice += basketArr[i].price * basketArr[i].count;
        totalCount += +basketArr[i].count;
    }

    const basketText: HTMLDivElement | null = document.createElement("div");
    basketText.textContent = `В корзине ${totalCount} товаров на сумму ${totalPrice} рублей`;
    basketText.classList.add("basket-text");
    basketPopover.appendChild(basketText);

    const queryCount: HTMLDivElement | null = document.querySelector(".items");
    if (queryCount) {
        queryCount.remove();
    }
    showBasket();
    return basketPopover;
};

function showBasket(): void {
    const topItem: HTMLDivElement | null = document.createElement("div");
    topItem.classList.add("top-item");
    getValue();
    if (itemName) {
        let cardSelected: basketItem | undefined = cardItems.find(item => item.name == itemName.value);
        if (cardSelected && catalog) {
            topItem.textContent = `Имя товара: ${cardSelected.name}, количество товара: ${cardSelected.count}, цена товара: ${cardSelected.price}`;
            catalog.appendChild(topItem);
        }
    }
};









