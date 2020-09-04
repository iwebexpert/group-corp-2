//Инпуты
let input1 = document.querySelector(".form1");
let input2 = document.querySelector(".form2");
let input3 = document.querySelector(".form3");

let basketBlock = document.querySelector("#basket");

let totalPriceBasket = document.createElement("div");
totalPriceBasket.classList.add("totalPriceBlock");

let first = true;
let price = 0;
let allamount = 0;
let newItem = {};

let userName = "",
  userSecName = "",
  userAdress = "",
  userComment = "";

//Добавление количества товаров
//Переписал через делигаты, не получилось динамически искать класс без помощи jquery
//так что нашел каждый класс отдельно

let mainBasket = new Basket();
let items = new Items();
let mainAdress = new Adress();

const btns = document.querySelectorAll(".goodsBuyBtns");

const plusBtn = input => {
  return ++input;
}

const minusBtn = input => {
  if (input > 1) {
    return --input;
  }
  return input;
}

function addGoodsToBasket(event) {
  if (this.classList.contains("btnplus1")) {
    let result = plusBtn(+input1.value);
    input1.value = result;
    return;
  }
  if (this.classList.contains("btnplus2")) {
    let result = plusBtn(+input2.value);
    input2.value = result;
    return;
  }
  if (this.classList.contains("btnplus3")) {
    let result = plusBtn(+input3.value);
    input3.value = result;
    return;
  }
  if (this.classList.contains("btnminus1")) {
    let result = minusBtn(+input1.value);
    input1.value = result;
    return;
  }
  if (this.classList.contains("btnminus2")) {
    let result = minusBtn(+input2.value);
    input2.value = result;
    return;
  }
  if (this.classList.contains("btnminus3")) {
    let result = minusBtn(+input3.value);
    input3.value = result;
    return;
  }
  if (this.classList.contains("goodsBuy1")) {
    if (first) {
      let basketEmpty = document.querySelector(".basketEpty");
      basketEmpty.remove();
    }
    items.translateItem("chair");
  }
  if (this.classList.contains("goodsBuy2")) {
    if (first) {
      let basketEmpty = document.querySelector(".basketEpty");
      basketEmpty.remove();
    }
    items.translateItem("table");
  }
  if (this.classList.contains("goodsBuy3")) {
    if (first) {
      let basketEmpty = document.querySelector(".basketEpty");
      basketEmpty.remove();
    }
    items.translateItem("lamp");
  }
}

btns.forEach((button) => button.addEventListener("click", addGoodsToBasket));