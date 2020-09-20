const catalogContainer = document.getElementById("catalog");
const basketContainer = document.getElementById("basket");
const catalogItems = document.createElement("div");
catalogItems.id = "catalog__items";
catalogItems.classList.add("row", "row-cols-1", "row-cols-md-3");
const addressContainer = document.getElementById("address");
const commentContainer = document.getElementById("comment");

class BaseWithCatalogProduct {
  constructor(catalogProducts) {
    this.catalogBox = catalogProducts;
  }
  getCatalogProduct(id) {
    return this.catalogBox.find((item) => item.id === id);
  }
  setCatalogProduct(product) {
    this.catalogBox.push(product);
  }
  getAll() {
    return this.catalogBox;
  }
}

class BaseWithBasketProduct {
  constructor() {
    this.basketBox = [];
  }
  getBasketProduct(id) {
    return this.basketBox.find((item) => item.id === id);
  }
  setBasketProduct(product) {
    this.basketBox.push(product);
  }
  getAll() {
    return this.basketBox;
  }
  setProps(id, name, value) {
    this.basketBox.find((item) => item.id === +id)[name] = +value;
  }
}

//обертка для заголовка + добавление стрелочки для сворачивания
function wrapperForHeader(header, idForRollUp) {
  const wrapperHeader = document.createElement("div");
  wrapperHeader.insertAdjacentHTML("afterbegin", header);
  const btnRollUp = createRollUpElem(idForRollUp);
  wrapperHeader.append(btnRollUp);
  return wrapperHeader;
}
// отрисовка стрелочки для сворачивания блока
function createRollUpElem(id) {
  const btnForRollUp = document.createElement("div");
  btnForRollUp.classList.add("rollUp");
  btnForRollUp.addEventListener("click", () =>
    btnForRollUpFunc(id, btnForRollUp)
  );
  function btnForRollUpFunc(blockForRollUp) {
    const block = document.getElementById(blockForRollUp);
    block.classList.toggle("hide");
    btnForRollUp.classList.toggle("rollDown");
  }
  return btnForRollUp;
}

// закрытие предыдущего блока при нажатии "далее"
function closePreviousBlock(idPrevBlock, mainBlock) {
  const getBtn = document.querySelector(`#${mainBlock} .rollUp`);
  getBtn.classList.toggle("rollDown");
  const elemForClose = document.getElementById(idPrevBlock);
  elemForClose.classList.add("hide");
}

// общие функции для корзины и каталога
class objWithBaseFunc {
  //шаблон для кнопок увеличения/уменьшения кол-ва товаров
  createButtonsCountItem(content, listener) {
    const elem = this.createHTMLElem(
      "button",
      ["btn", "btn-outline-dark", "btn__changeCount"],
      { textContent: content }
    );
    elem.addEventListener("click", listener);
    return elem;
  }
  // шаблон для контента продукта
  paintItem(product) {
    return `<div style=background-image:url(${product.img}); class="card-img-top item__img"></div><div class='card__info'><span class='card-name'>${product.name}</span><h5>${product.price}	
        &#8381;</h5></div>`;
  }
  createHTMLElem(tagName, listClasses, attributes) {
    const elem = document.createElement(tagName);
    elem.classList.add(...listClasses);
    for (let keys in attributes) {
      elem[keys] = attributes[keys];
    }
    return elem;
  }
}

class Catalog extends objWithBaseFunc {
  constructor(catalogProducts) {
    super();
    this.catalogProduct = new BaseWithCatalogProduct(catalogProducts);
    this.buyProduct = new BaseWithBasketProduct();
  }
  renderCatalog() {
    const headerCatalog = `<h2 class="header">Каталог</h2>`;
    const headerCatalogBox = wrapperForHeader(headerCatalog, "catalog__items");
    catalogContainer.append(headerCatalogBox);

    headerCatalogBox.insertAdjacentHTML(
      "beforeend",
      '<p id="emptyCatalog">Каталог пуст</p>'
    );
    this.catalogProduct.getAll().forEach((item) => this.renderProducts(item));
    catalogContainer.append(catalogItems);
  }
  async upadateBasketItems() {
    const data = await fetch("./basketProducts");
    this.buyProduct.basketBox = await data.json();
    this.renderBasketItems();
  }
  renderBasketItems() {
    const basketInfo = document.createElement("p");
    const box = document.getElementById("basketBody");
    box.innerHTML = "";
    const btnToAddress = createBtnFurther("toAddress", createWindowAddress);
    function createWindowAddress(event) {
      event.preventDefault();
      addressContainer.style.display = "block";
      closePreviousBlock("basketBody", "basket");
      createAddress();
    }
    const basketItems = this.createHTMLElem("div", [
      "row",
      "row-cols-1",
      "row-cols-md-3",
    ]);
    basketInfo.textContent = this.updateQuantity();
    box.append(basketInfo);
    box.append(basketItems);
    box.append(btnToAddress);

    this.buyProduct.basketBox.map((item) => {
      const basketItem = this.createHTMLElem("div", ["col", "mb-4"], {
        id: item.id,
      });
      const basketCard = this.createHTMLElem("div", ["card", "cards__card"]);
      basketCard.insertAdjacentHTML("afterbegin", this.paintItem(item));
      const addDelContainer = this.createHTMLElem("div", [
        "btns__changeCount",
        "d-flex",
      ]);
      const input = this.createHTMLElem("input", ["basketItem__input"], {
        type: "text",
        value: item.count,
      });
      // увеличить кол-во товаров в корзине
      let countBasketItemAdd = (event) => {
        event.preventDefault();
        input.value++;
        (async () => {
          const data = await fetch(`basketProducts/${basketItem.id}`, {
            method: "PATCH",
            body: JSON.stringify({ count: input.value }),
            headers: {
              "Content-type": "application/json",
            },
          });
        })();
        this.upadateBasketItems();
      };
      // уменьшить кол-во товаров в корзине
      let countBasketItemDel = (event) => {
        event.preventDefault();
        if (input.value > 1) input.value--;
        (async () => {
          const data = await fetch(`basketProducts/${basketItem.id}`, {
            method: "PATCH",
            body: JSON.stringify({ count: input.value }),
            headers: {
              "Content-type": "application/json",
            },
          });
        })();
        this.upadateBasketItems();
      };
      addDelContainer.prepend(
        this.createButtonsCountItem("-", countBasketItemDel)
      );
      addDelContainer.append(input);
      addDelContainer.append(
        this.createButtonsCountItem("+", countBasketItemAdd)
      );
      // удалить элемент корзины
      let deleteItemBasket = (event) => {
        (async () => {
          const data = await fetch(`/basketProducts/${event.target.id}`, {
            method: "DELETE",
          });
        })();
        this.upadateBasketItems();
      };
      const btnDelete = this.createHTMLElem("div", ["btn__delete"], {
        id: item.id,
      });
      btnDelete.addEventListener("click", deleteItemBasket);

      const btnItemContainer = this.createHTMLElem("div", [
        "btnItem-container",
      ]);

      basketItem.append(basketCard);
      btnItemContainer.append(btnDelete);
      basketCard.append(btnItemContainer);
      basketCard.append(addDelContainer);
      basketItems.append(basketItem);
      box.append(btnToAddress);
    });
    const btnThen = document.getElementById("toAddress");
    if (this.buyProduct.basketBox.length) {
      btnThen.style.display = "block";
    } else {
      btnThen.style.display = "none";
      addressContainer.style.display = "none";
      commentContainer.style.display = "none";
    }
  }
  // обновить строчку с кол-вом товаров и суммой
  updateQuantity() {
    let count = this.buyProduct
      .getAll()
      .reduce((quantity, item) => quantity + +item.count, 0);
    let quantity = count % 100;
    let word = "товаров";
    if (quantity >= 5 && quantity <= 20) {
      word = "товаров";
    }
    quantity %= 10;
    if (quantity === 1) {
      word = "товар";
    }
    if (quantity >= 2 && quantity <= 4) {
      word = "товара";
    }
    let currency = {
      RUB: 1,
      USD: 72.95,
      EUR: 86.61,
    };
    let result = this.buyProduct
      .getAll()
      .reduce(
        (sum, item) => sum + item.price * currency[item.currency] * item.count,
        0
      );
    let str =
      this.buyProduct.getAll().length !== 0
        ? `В корзине ${count} ${word} на сумму ${result} рублей`
        : "Корзина пуста";
    return str;
  }

  renderProducts = (product) => {
    const createBasketItem = (id, count) => {
      const objToChange = this.buyProduct.getBasketProduct(id);
      if (objToChange) {
        (async () => {
          const data = await fetch(`./basketProducts/${id}`, {
            method: "PATCH",
            body: JSON.stringify({ count: count }),
            headers: {
              "Content-type": "application/json",
            },
          });
        })();
      } else {
        const newElemBasket = this.catalogProduct.getCatalogProduct(id);
        newElemBasket.count = count;
        (async () => {
          const data = await fetch("./basketProducts", {
            method: "POST",
            body: JSON.stringify(newElemBasket),
            headers: {
              "Content-type": "application/json",
            },
          });
        })();
      }
      this.upadateBasketItems();
    };
    const clearEmptyCatalog = document.getElementById("emptyCatalog");
    clearEmptyCatalog.classList.add("hide");

    const catalogItemBox = this.createHTMLElem("div", [
      "col",
      "mb-4",
      "catalog__product",
    ]);
    const catalogCard = this.createHTMLElem("div", [
      "card",
      "h-100",
      "cards__card",
    ]);
    catalogCard.insertAdjacentHTML("afterbegin", this.paintItem(product));

    function btnCatalogItem(event) {
      event.preventDefault();
      createBasketItem(event.target.id, +input.value);
    }
    const btnItem = this.createHTMLElem("div", ["btn__buy"], {
      id: product.id,
    });
    btnItem.addEventListener("click", btnCatalogItem);
    const btnItemContainer = this.createHTMLElem("div", ["btnItem-container"]);
    const addDelContainer = this.createHTMLElem("div", [
      "btns__changeCount",
      "d-flex",
      "justify-content-center",
    ]);
    const input = this.createHTMLElem("input", ["basketItem__input"], {
      type: "text",
      value: product.count,
    });

    // увеличение кол-ва товаров
    function countBasketItemAdd(event) {
      event.preventDefault();
      input.value++;
    }
    // уменьшение кол-ва товаров
    function countBasketItemDel(event) {
      event.preventDefault();
      if (input.value > 1) input.value--;
    }

    addDelContainer.prepend(
      this.createButtonsCountItem("-", countBasketItemDel)
    );
    addDelContainer.append(input);
    addDelContainer.append(
      this.createButtonsCountItem("+", countBasketItemAdd)
    );
    btnItemContainer.append(btnItem);
    catalogCard.append(btnItemContainer);
    catalogCard.append(addDelContainer);
    catalogItemBox.append(catalogCard);
    catalogItems.append(catalogItemBox);
  };
}

class Basket extends objWithBaseFunc {
  constructor() {
    super();
  }
  // отображение корзины
  createBasket() {
    const headerBasket = `<h2 class="header">Корзина</h2>`;
    const headerBasketBox = wrapperForHeader(headerBasket, "basketBody");
    basketContainer.append(headerBasketBox);

    basketContainer.insertAdjacentHTML(
      "beforeend",
      '<div id = "basketBody" class="basketBody"></div>'
    );
    const basketBody = document.getElementById("basketBody");
    basketContainer.append(basketBody);
  }
}

function createAddress() {
  addressContainer.style.display = "block";
  addressContainer.innerHTML = "";

  const headerAddress = `<h2 class="header">Адрес доставки</h2>`;
  const headerAddressBox = wrapperForHeader(headerAddress, "boxInputsAddress");
  addressContainer.append(headerAddressBox);

  const boxInputsAddress = document.createElement("form");
  boxInputsAddress.id = "boxInputsAddress";
  function renderInput(label, id) {
    const inputBox = document.createElement("div");
    inputBox.classList.add("address__input", "form-group");
    inputBox.insertAdjacentHTML(
      "afterbegin",
      `<label for=${id}>${label}</label><input class='form-control' name=${id} id=${id}></input>`
    );
    boxInputsAddress.append(inputBox);
  }
  renderInput("Имя", "userName");
  renderInput("Фамилия", "userLastName");
  renderInput("Email", "userEmail");
  renderInput("Phone", "userPhone");
  renderInput("Адрес", "userAddress");

  const textareaComment = document.createElement("div");
  textareaComment.insertAdjacentHTML(
    "beforeend",
    '<label class="taxtareaLabel" for="comment__textarea">Комментарий</label><textarea class="form-control" id="comment__textarea" rows="10" cols="45" name="text"></textarea>'
  );
  boxInputsAddress.append(textareaComment);

  const btnSubmit = document.createElement("button");
  btnSubmit.type = "submit";
  btnSubmit.textContent = "Заказать";
  btnSubmit.classList.add("btn", "btn-primary", "mt-3", "mb-4");
  addressContainer.append(boxInputsAddress);
  btnSubmit.addEventListener("click", () => checkValidForm());
  addressContainer.append(btnSubmit);
}
function checkValidElem(exp, id) {
  const elem = document.getElementById(id);
  elem.classList.remove("is-valid", "is-invalid");
  elem.classList.add(exp.test(elem.value) ? "is-valid" : "is-invalid");
  return exp.test(elem.value);
}
function checkValidForm() {
  const checkName = checkValidElem(/^[A-ZА-Я]([a-zа-я]+)$/, "userName");
  const checkLastName = checkValidElem(
    /^([A-ZА-Я])([a-zа-я]+)$/,
    "userLastName"
  );
  const checkEmail = checkValidElem(
    /^([a-z0-9_.-]+)@([a-z0-9_.-]+)\.([a-z]{2,6})$/i,
    "userEmail"
  );
  const checkPhone = checkValidElem(/^[0-9]+$/, "userPhone");
  const checkAddress = checkValidElem(/^(\w+)$/i, "userAddress");
  if (checkName && checkLastName && checkPhone && checkEmail && checkAddress) {
    swal("Ваш заказ принят");
  } else {
    swal("Неправильно заполнена форма");
  }
}
function createBtnFurther(id, listener) {
  const btnFurther = document.createElement("button");
  btnFurther.textContent = "Далее";
  btnFurther.classList.add("btn", "btn-primary", "mt-3", "mb-4");
  btnFurther.id = id;
  btnFurther.addEventListener("click", listener);
  btnFurther.style.display = "none";
  return btnFurther;
}

function mainFunc(catalogProducts) {
  let myCatalog = new Catalog(catalogProducts);
  myCatalog.renderCatalog();
  myCatalog.upadateBasketItems();
  let myBasket = new Basket();
  myBasket.createBasket();
}

function makeGETRequest(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = function () {
      if (xhr.status != 200) {
        reject(xhr.status);
      }
      const catalogProduct = JSON.parse(xhr.response);
      resolve(catalogProduct);
    };
    xhr.send();
  });
}

makeGETRequest("/catalogProducts")
  .then((catalogProduct) => {
    mainFunc(catalogProduct);
  })
  .catch((err) => console.log(err));
