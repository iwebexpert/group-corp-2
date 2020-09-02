//Кнопки + и -
let minus1 = document.querySelector(".btnminus1");
let minus2 = document.querySelector(".btnminus2");
let minus3 = document.querySelector(".btnminus3");
let plus1 = document.querySelector(".btnplus1");
let plus2 = document.querySelector(".btnplus2");
let plus3 = document.querySelector(".btnplus3");
//Инпуты
let input1 = document.querySelector(".form1");
let input2 = document.querySelector(".form2");
let input3 = document.querySelector(".form3");
//Кнопки "добавить в корзину"
let btn1 = document.querySelector(".goodsBuy1");
let btn2 = document.querySelector(".goodsBuy2");
let btn3 = document.querySelector(".goodsBuy3");

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
//****1****
minus1.onclick = function () {
  if (+input1.value > 1) {
    let val = +input1.value;
    val -= 1;
    input1.value = val;
  }
};

plus1.onclick = function () {
  let val = +input1.value;
  val += 1;
  input1.value = val;
};

//****2****
minus2.onclick = function () {
  if (+input2.value > 1) {
    let val = +input2.value;
    val -= 1;
    input2.value = val;
  }
};

plus2.onclick = function () {
  let val = +input2.value;
  val += 1;
  input2.value = val;
};

//****3****
minus3.onclick = function () {
  if (+input3.value > 1) {
    let val = +input3.value;
    val -= 1;
    input3.value = val;
  }
};

plus3.onclick = function () {
  let val = +input3.value;
  val += 1;
  input3.value = val;
};

let mainBasket = new Basket();
let items = new Items();

btn1.onclick = function () {
  if (first) {
    let basketEmpty = document.querySelector(".basketEpty");
    basketEmpty.remove();
  }
  items.translateItem("chair");
};

btn2.onclick = function () {
  if (first) {
    let basketEmpty = document.querySelector(".basketEpty");
    basketEmpty.remove();
  }
  items.translateItem("table");
};

btn3.onclick = function () {
  if (first) {
    let basketEmpty = document.querySelector(".basketEpty");
    basketEmpty.remove();
  }
  items.translateItem("lamp");
};
