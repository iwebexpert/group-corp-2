"use strict";

const API_URL = "";

class Item {
  constructor(id, name, price, count, img) {
    this.id = id;
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

  fetchItem(id, name, price, count, img) {
    let item = new Item(id, name, price, count, img);
    this.addItem(item, count);
  }

  fetchItems() {
    this.makeGETRequest(`${API_URL}/items`)
      .then((items) => {
        items.forEach((item) =>
          this.fetchItem(item.id, item.name, item.price, item.count, item.img)
        );
        this.render();
      })
      .catch((errMessage) => console.log(errMessage));
  }

  makeGETRequest(url) {
    return new Promise((resolve, reject) => {
      let xhr;
      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
      } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status != 200) {
            reject(`${xhr.status}: ${xhr.statusText}`);
          }
          resolve(JSON.parse(xhr.responseText));
        }
      };

      xhr.open("GET", url, true);
      xhr.send();
    });
  }

  //Удаление товара из БД
  methodDELETE(item) {
    return fetch(`/items/${item["id"]}`, { method: "DELETE" });
  }

  //Изменение товара из БД
  methodPATCH(item) {
    return fetch(`/items/${item["id"]}`, {
      method: "PATCH",
      body: JSON.stringify({ count: item.count }),
      headers: {
        "Content-type": "application/json",
      },
    });
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
        obj.methodPATCH(item);
        obj.reRenderFooter();
      });

      //Добавление кнопки Delete
      const deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = "Delete";
      deleteBtn.classList.add("button");
      right.appendChild(deleteBtn);
      deleteBtn.onclick = function () {
        item.count--;
        console.log(item.id);
        if (item.count == 0) {
          bucketItem.remove();
          obj.methodDELETE(item);
        }
        coast.innerHTML = item.price * item.count;
        bucketItemCount.innerHTML = item.count;
        obj.methodPATCH(item);
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

    //Имя
    const formGroupName = document.createElement("div");
    formGroupName.classList.add("form-group");
    modalForm.appendChild(formGroupName);

    const nameLabel = document.createElement("label");
    nameLabel.setAttribute("for", "name");
    nameLabel.innerHTML = "Name:";
    formGroupName.appendChild(nameLabel);

    const name = document.createElement("input");
    name.setAttribute("type", "text");
    name.setAttribute("pattern", "[a-zA-Z]+");
    name.classList.add("form-control");
    name.id = "name";
    name.required = true;
    formGroupName.appendChild(name);

    const invalidName = document.createElement("div");
    invalidName.classList.add("invalid-feedback");
    invalidName.innerHTML = "Please, enter correct name(only letters).";
    formGroupName.appendChild(invalidName);

    //Телефон
    const formGroupPhone = document.createElement("div");
    formGroupPhone.classList.add("form-group");
    modalForm.appendChild(formGroupPhone);

    const phoneLabel = document.createElement("label");
    phoneLabel.setAttribute("for", "phone");
    phoneLabel.innerHTML = "Phone:";
    formGroupPhone.appendChild(phoneLabel);

    const phone = document.createElement("input");
    phone.setAttribute("type", "text");
    phone.setAttribute("pattern", "[+][7][(][0-9]{3}[)][0-9]{3}[-][0-9]{4}");
    phone.classList.add("form-control");
    phone.id = "phone";
    phone.required = true;
    formGroupPhone.appendChild(phone);

    const invalidPhone = document.createElement("div");
    invalidPhone.classList.add("invalid-feedback");
    invalidPhone.innerHTML =
      "Please, enter correct phone number(+7(000)000-0000)";
    formGroupPhone.appendChild(invalidPhone);

    //Email
    const formGroupMail = document.createElement("div");
    formGroupMail.classList.add("form-group");
    modalForm.appendChild(formGroupMail);

    const mailLabel = document.createElement("label");
    mailLabel.setAttribute("for", "mail");
    mailLabel.innerHTML = "Mail:";
    formGroupMail.appendChild(mailLabel);

    const mail = document.createElement("input");
    mail.setAttribute("type", "text");
    mail.setAttribute(
      "pattern",
      "^([a-z0-9_.-]+)@([a-z0-9_.-]+).([a-z.]{2,6})$"
    );
    mail.classList.add("form-control");
    mail.id = "mail";
    mail.required = true;
    formGroupMail.appendChild(mail);

    const invalidMail = document.createElement("div");
    invalidMail.classList.add("invalid-feedback");
    invalidMail.innerHTML = "Please, enter correct mail.";
    formGroupMail.appendChild(invalidMail);

    //Адрес
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

    const invalid = document.createElement("div");
    invalid.classList.add("invalid-feedback");
    invalid.innerHTML = "Please, enter adress.";
    formGroupAdress.appendChild(invalid);

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
        obj.name = name.value;
        obj.phone = phone.value;
        obj.mail = mail.value;
        modalText.innerHTML = `
        Items - ${obj.totalItems},
        total price - ${obj.totalPrice} &#8381;,
        name: ${obj.name},
        phone: ${obj.phone},
        mail: ${obj.mail},
        adress: ${obj.adress},
        message: ${obj.message};`;
        $("#myModal").modal("hide");
        $("#myModalConfrim").modal("show");
      }
      return false;
    };
  }
}

let myBucket = new ShoppingBucket("Philipp");

//Инициализация
myBucket.fetchItems();
