"use strict";

const API_URL = "";

class Item {
  constructor(name, price, count, img) {
    this.img = img;
    this.name = name;
    this.price = price;
    this.count = count;
  }
}
class ShoppingBucket {
  constructor(user) {
    this.user = user;
    this.items = [];
    this.catalog = document.querySelector("#catalog");
  }

  addItem(item) {
    if (!this.items.includes(item)) {
      this.items.push(item);
    }
  }

  fetchItem(name, price, count, img) {
    let item = new Item(name, price, count, img);
    this.addItem(item, count);
  }

  fetchItems() {
    makeGETRequest(`${API_URL}/items`)
      .then((items) => {
        items.forEach((item) =>
          this.fetchItem(item.name, item.price, item.count, item.img)
        );
        this.render();
      })
      .catch((errMessage) => console.log(errMessage));
  }

  sumTotal() {
    let totalPrice = 0;
    let totalItems = 0;
    for (let item of this.items) {
      totalPrice += item.price * item.count;
      totalItems += item.count;
    }
    this.totalPrice = totalPrice;
    this.totalItems = totalItems;
  }

  render() {
    this.renderForm();
    this.renderHead();
    this.renderItems();
    this.renderFooter();
    this.renderModal();
  }

  renderForm() {
    const bucket = document.createElement("div");
    bucket.classList.add("bucket");
    catalog.appendChild(bucket);
  }

  renderHead() {
    const bucketTitle = document.createElement("h1");
    bucketTitle.classList.add("bucketTitle");
    bucketTitle.innerHTML = "Shopping Cart";
    document.querySelector(".bucket").appendChild(bucketTitle);
  }

  renderItems() {
    let obj = this;
    let bucket = document.querySelector(".bucket");
    for (let item of this.items) {
      //Добавление товара в корзину
      const bucketItem = document.createElement("div");
      bucketItem.classList.add("item");
      bucket.appendChild(bucketItem);

      //Добавление изображение товара
      const img = document.createElement("IMG");
      img.src = item.img;
      img.classList.add("imgIcon");
      img.setAttribute("tabindex", "0");
      bucketItem.appendChild(img);

      //Добавление названия товара
      const name = document.createElement("p");
      name.innerHTML = item.name;
      name.classList.add("itemName");
      bucketItem.appendChild(name);

      //Добваление правой части секции товара
      const right = document.createElement("div");
      right.classList.add("rightSide");
      bucketItem.appendChild(right);

      //Добавление кол-ва товаров
      const bucketItemCount = document.createElement("div");
      bucketItemCount.innerHTML = item.count;
      bucketItemCount.classList.add("itemCount");
      right.appendChild(bucketItemCount);

      //Добавление стоимости товаров
      const coast = document.createElement("div");
      coast.classList.add("itemCoast");
      coast.innerHTML = item.price * item.count;
      right.appendChild(coast);

      //Добавление кнопки Add
      const addBtn = document.createElement("button");
      addBtn.innerHTML = "Add";
      addBtn.classList.add("button");
      right.appendChild(addBtn);
      addBtn.addEventListener("click", function () {
        item.count++;
        coast.innerHTML = item.price * item.count;
        bucketItemCount.innerHTML = item.count;
        obj.reRenderFooter();
      });

      //Добавление кнопки Delete
      const deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = "Delete";
      deleteBtn.classList.add("button");
      right.appendChild(deleteBtn);
      deleteBtn.onclick = function () {
        item.count--;
        if (item.count == 0) {
          bucketItem.remove();
        }
        coast.innerHTML = item.price * item.count;
        bucketItemCount.innerHTML = item.count;
        obj.reRenderFooter();
      };
    }
  }

  renderFooter() {
    const footer = document.createElement("div");
    footer.classList.add("footer");
    document.querySelector(".bucket").appendChild(footer);

    const total = document.createElement("div");
    total.classList.add("total");
    footer.appendChild(total);
    this.sumTotal();
    total.innerHTML = `Items - ${this.totalItems}, total price - ${this.totalPrice} &#8381;`;
  }

  reRenderFooter() {
    let total = document.querySelector(".total");
    this.sumTotal();
    if (this.totalItems == 0) {
      total.innerHTML = `Empty bucket`;
      $("#nextButton").remove();
    } else {
      total.innerHTML = `Items - ${this.totalItems}, total price - ${this.totalPrice} &#8381;`;
    }
  }

  renderModal() {
    let obj = this;

    // Добавление модального окна с формой (Bootstrap)
    const nextButton = document.createElement("button");
    nextButton.setAttribute("type", "button");
    nextButton.classList.add("button");
    nextButton.setAttribute("data-toggle", "modal");
    nextButton.setAttribute("data-target", "#myModal");
    nextButton.innerHTML = "Confirm order";
    document.querySelector(".footer").appendChild(nextButton);
    nextButton.id = "nextButton";

    const modal = document.createElement("div");
    modal.setAttribute("type", "button");
    modal.classList.add("modal");
    modal.classList.add("fade");
    modal.id = "myModal";
    modal.setAttribute("role", "dialog");
    document.querySelector(".bucket").appendChild(modal);

    const modalDialog = document.createElement("div");
    modalDialog.classList.add("modal-dialog");
    modalDialog.classList.add("modal-lg");
    modal.appendChild(modalDialog);

    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");
    modalDialog.appendChild(modalContent);

    const modalHeader = document.createElement("div");
    modalHeader.classList.add("modal-header");
    modalContent.appendChild(modalHeader);

    const closeBtn = document.createElement("btn");
    closeBtn.classList.add("close");
    closeBtn.setAttribute("type", "button");
    closeBtn.setAttribute("data-dismiss", "modal");
    closeBtn.innerHTML = "&times;";
    modalHeader.appendChild(closeBtn);

    const modalHeading = document.createElement("h4");
    modalHeading.classList.add("modal-title");
    modalHeading.innerHTML = "Confirm order";
    modalHeader.appendChild(modalHeading);

    const modalBody = document.createElement("div");
    modalBody.classList.add("modal-body");
    modalContent.appendChild(modalBody);

    //Добавление формы модального окна
    const modalForm = document.createElement("form");
    modalForm.classList.add("needs-validation");
    modalForm.id = "myForm";
    modalForm.noValidate = true;
    modalBody.appendChild(modalForm);

    const formGroupAdress = document.createElement("div");
    formGroupAdress.classList.add("form-group");
    modalForm.appendChild(formGroupAdress);

    const label = document.createElement("label");
    label.setAttribute("for", "adress");
    label.innerHTML = "Adress:";
    formGroupAdress.appendChild(label);

    const adress = document.createElement("input");
    adress.setAttribute("type", "text");
    adress.classList.add("form-control");
    adress.id = "adress";
    adress.required = true;
    formGroupAdress.appendChild(adress);

    const formGroupMessage = document.createElement("div");
    formGroupMessage.classList.add("form-group");
    modalForm.appendChild(formGroupMessage);

    const labelForAdress = document.createElement("label");
    labelForAdress.setAttribute("for", "message");
    labelForAdress.innerHTML = "Message:";
    formGroupMessage.appendChild(labelForAdress);

    const message = document.createElement("textarea");
    message.setAttribute("rows", "3");
    message.classList.add("form-control");
    message.id = "message";
    formGroupMessage.appendChild(message);

    const invalid = document.createElement("div");
    invalid.classList.add("invalid-feedback");
    invalid.innerHTML = "Please, enter adress.";
    formGroupAdress.appendChild(invalid);

    const applyBtn = document.createElement("button");
    applyBtn.setAttribute("type", "submit");
    applyBtn.classList.add("button");
    applyBtn.classList.add("btn");
    applyBtn.innerHTML = "Apply";
    applyBtn.id = "submit";
    modalForm.appendChild(applyBtn);

    // Добавление модального окна подтверждения
    const modalConfrim = document.createElement("div");
    modalConfrim.setAttribute("tabindex", "-1");
    modalConfrim.classList.add("modal");
    modalConfrim.classList.add("fade");
    modalConfrim.id = "myModalConfrim";
    modalConfrim.setAttribute("role", "dialog");
    document.querySelector(".bucket").appendChild(modalConfrim);

    const modalDialogConfrim = document.createElement("div");
    modalDialogConfrim.classList.add("modal-dialog");
    modalDialogConfrim.setAttribute("role", "document");
    modalConfrim.appendChild(modalDialogConfrim);

    const modalContentConfrim = document.createElement("div");
    modalContentConfrim.classList.add("modal-content");
    modalDialogConfrim.appendChild(modalContentConfrim);

    const modalHeaderConfrim = document.createElement("div");
    modalHeaderConfrim.classList.add("modal-header");
    modalContentConfrim.appendChild(modalHeaderConfrim);

    modalHeaderConfrim.appendChild(closeBtn);

    const modalHeadingConfirm = document.createElement("h4");
    modalHeadingConfirm.classList.add("modal-title");
    modalHeadingConfirm.innerHTML = "Sucsess";
    modalHeaderConfrim.appendChild(modalHeadingConfirm);

    const modalBodyConfrim = document.createElement("div");
    modalBodyConfrim.classList.add("modal-body");
    modalContentConfrim.appendChild(modalBodyConfrim);

    const modalText = document.createElement("p");
    modalBodyConfrim.appendChild(modalText);

    modalForm.onsubmit = function () {
      if (modalForm.checkValidity()) {
        if (message.value == "") {
          obj.message = " - ";
        } else {
          obj.message = message.value;
        }
        obj.adress = adress.value;
        modalText.innerHTML = `
        Items - ${obj.totalItems},
        total price - ${obj.totalPrice} &#8381;,
        adress: ${obj.adress},
        message: ${obj.message};`;
        $("#myModal").modal("hide");
        $("#myModalConfrim").modal("show");
      }
      return false;
    };
  }
}
// НЕ НУЖНО С СЕРВЕРНОЙ ЧАСТЬЮ
// //Добавить товары и создать корзину
// let cpu = new Item("Intel Core i5-9600K", 12854, 0, "./img/1.jpg");
// let graphicCard = new Item("Nvidia GTX 1660S (Super)", 15161, 0, "./img/2.jpg");
// let ram = new Item(
//   "Corsair Vengeance LPX DDR4 3200 C16 2x8GB",
//   3626,
//   0,
//   "./img/3.jpg"
// );

let myBucket = new ShoppingBucket("Philipp");

// //Добавить товары в корзину
// myBucket.addItem(cpu, 1);
// myBucket.addItem(ram, 2);
// myBucket.addItem(graphicCard, 1);

const makeGETRequest = (url) => {
  return new Promise((resolve, reject) => {
    let xhr;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status != 200) {
          reject(`${xhr.status}: ${xhr.statusText}`);
        }
        resolve(JSON.parse(xhr.responseText));
      }
    };

    xhr.open("GET", url, true);
    xhr.send();
  });
};

//Инициализация
myBucket.fetchItems();
