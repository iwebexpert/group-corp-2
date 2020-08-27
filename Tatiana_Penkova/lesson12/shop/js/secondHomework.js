const container = document.querySelector(".container");
const catalog = document.getElementById("catalog");
const nextBtn = document.querySelector(".next");
const backBtn = document.querySelector(".back");
const backBtnToAdress = document.querySelector(".back__adress");
const adress = document.querySelector(".adress");
const commentSection = document.querySelector(".comment-section");
const done = document.querySelector(".done");
const backToShop = document.querySelector(".back__catalog");
const emptyBasket = document.querySelector(".error-empty");
const basketContainer = document.querySelector(".basket");
const itemName = document.querySelector(".item-name");
const errorName = document.querySelector(".error-name");
const itemCount = document.querySelector(".item-count");
const errorCount = document.querySelector(".error-count");
const addBtn = document.querySelector(".send");
const clearBtn = document.querySelector(".clear");

const cardItems = [];


class GoodsList {
  constructor(rest) {
    this.rest = [];

  }

  getValue() {
    let selectValue = itemCount.value;
    return selectValue;
  }

  hideBlockEmptyBasket() {
    emptyBasket.style.display = 'none';
  }

  showBlockEmptyBasket() {
    emptyBasket.style.display = 'block';
  }

  getBasketMarkup(name, count) {

    const basketPopover = document.createElement("div");
    basketPopover.classList.add("items");

    let newProd = new Product(name);
    basketArray.getValue(itemCount);
    let cardSelected = cardItems.find(item => item.name == itemName.value);
    newProd.price = cardSelected.price;

    basketArr.push(newProd);

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
    basketArray.showBasket();
    // topItemDeleteDouble();
    return basketPopover;

  }

  showBasket() {
    let cardSelected = cardItems.find(item => item.name == itemName.value);
    console.log(cardSelected);
    const item = document.querySelectorAll(".top-item");
    const topItem = document.createElement("div");
    topItem.classList.add("top-item");
    basketArray.getValue(itemCount);
    topItem.textContent = `Имя товара: ${cardSelected.name}, количество товара: ${cardSelected.count}, цена товара: ${cardSelected.price}`;
    catalog.appendChild(topItem);
  }

  changeImage(name) {

    const modalTitle = document.querySelector("#exampleModalLabel");
    const carouselItems = document.querySelector(".carousel-inner");

    if (name === "Трусы") {
      modalTitle.textContent = `Трусы`;
      carouselItems.innerHTML = `<div class="carousel-item active">
      <img src="./css/img/pants-1.png" class="d-block w-100" alt="pants">
      </div>
      <div class="carousel-item">
      <img src="./css/img/pants-2.png" class="d-block w-100" alt="pants">
      </div>
      <div class="carousel-item">
      <img src="./css/img/pants-3.png" class="d-block w-100" alt="pants">
       </div>`;
    }
    if (name === "Полотенце") {
      modalTitle.textContent = `Полотенце`;
      carouselItems.innerHTML = `<div class="carousel-item active">
      <img src="./css/img/towel-1.jpg" class="d-block w-100" alt="towel">
      </div>
      <div class="carousel-item">
      <img src="./css/img/towel-2.jpg" class="d-block w-100" alt="towel">
      </div>
      <div class="carousel-item">
      <img src="./css/img/towel-3.jpg" class="d-block w-100" alt="towel">
       </div>`;
    }
    if (name === "Носки") {

      modalTitle.textContent = `Носки`;
      carouselItems.innerHTML = `<div class="carousel-inner">
      <div class="carousel-item active">
      <img src="./css/img/socks-1.png" class="d-block w-100" alt="socks">
      </div>
      <div class="carousel-item">
      <img src="./css/img/socks-2.png" class="d-block w-100" alt="socks">
      </div>
      <div class="carousel-item">
      <img src="./css/img/socks-3.png" class="d-block w-100" alt="socks">
       </div>`;
    }

  }

}

class Product extends GoodsList {
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

const basketArray = new GoodsList();
const basketArr = basketArray.rest;

// Добавление слушателей

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

  basketArray.getValue(itemCount);
  let cardSelected = cardItems.find(item => item.name == itemName.value);
  cardSelected.count = itemCount.value;

  basketArray.hideBlockEmptyBasket();

  const newItem = basketArray.getBasketMarkup(itemName.value, itemCount.value);
  basketContainer.appendChild(newItem);

  nextBtn.style.display = "block";
  nextBtn.classList.add("btn");

});

itemName.addEventListener('change', (e) => {
  basketArray.changeImage(itemName.value);
});


clearBtn.addEventListener("click", (e) => {
  e.preventDefault();
  basketArray.showBlockEmptyBasket();
  itemName.value = "Носки";
  itemCount.value = "1";

  const totalBasket = document.querySelector(".items");

  const topToDelete = document.querySelectorAll(".top-item");
  for (let i = 0; i < topToDelete.length; i++) {
    topToDelete[i].remove();
  }

  let basketTextToDelete = document.querySelector(".basket-text");
  basketTextToDelete.textContent = "";
  nextBtn.style.display = "none";
});

nextBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const basket = document.querySelector(".basket");
  const itemImage = document.querySelector(".item-image");
  basket.style.display = "none";
  itemImage.style.display = "none";
  catalog.style.display = "none";
  adress.style.display = "block";
  nextBtn.style.display = "none";

  commentBtn.classList.add("btn");
});

const commentBtns = document.querySelectorAll(".btn-primary");
const commentBtn = commentBtns[0];


const form1 = document.getElementById("validationDefault01");
const form2 = document.getElementById("validationDefault02");
const form3 = document.getElementById("validationDefault03");
const form5 = document.getElementById("validationDefault05");


commentBtn.addEventListener("click", (e) => {

  if (!form1.value == "" && !form2.value == "" && !form3.value == "" && !form5.value == "") {
    e.preventDefault();
    adress.style.display = "none";
    const basket = document.querySelector(".basket");
    const itemImage = document.querySelector(".item-image");
    basket.style.display = "none";
    itemImage.style.display = "none";
    commentSection.style.display = "block";
  }
});

backBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const basket = document.querySelector(".basket");
  const itemImage = document.querySelector(".item-image");
  basket.style.display = "block";
  itemImage.style.display = "block";
  catalog.style.display = "block";
  adress.style.display = "none";
  nextBtn.style.display = "block";
});

const textarea = document.getElementById("exampleFormControlTextarea1");
const sendBtn = commentBtns[1];

sendBtn.addEventListener("click", (e) => {
  if (!textarea.value == "") {
    commentSection.style.display = "none";
    done.style.display = "block";

    let totalCount = 0;
    let totalPrice = 0;
    for (let i = 0; i < basketArr.length; i++) {
      totalPrice += basketArr[i].price * basketArr[i].count;
      totalCount += +basketArr[i].count;
      const doneTitle = document.getElementById("done-title");
      doneTitle.textContent = `У вас: ${totalCount} товаров на сумму ${totalPrice}. Будет доставлено по адресу: ${form3.value}. Комментарии к заказу: ${textarea.value}.`
    }

  }
});


backBtnToAdress.addEventListener("click", (e) => {
  e.preventDefault;
  commentSection.style.display = "none";
  adress.style.display = "block";

});

backToShop.addEventListener("click", (e) => {
  location.reload();
});












