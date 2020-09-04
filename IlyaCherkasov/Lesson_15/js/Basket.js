class Basket {
  constructor() {
    this.itemInBasket = [];
  }
  addToBasket(item) {
    if (first) {
      this.itemInBasket.push(item);
      this.drawBasketItem();
      first = false;
    } else {
      for (let i = 1; i <= this.itemInBasket.length; i++) {
        if (item.index == this.itemInBasket[i - 1].index) {
          if (item.index == "chair") {
            let val = +input1.value;
            document.querySelector(".basketInputchair").value = val;
            let searchName = "chair";
            let idx = this.itemInBasket.findIndex(
              (el) => el.index === searchName
            );
            this.itemInBasket[idx].amount = val;
            this.allAmount();
            let basketSpanChair = document.querySelector(".spanchair");
            let basketInputChair = document.querySelector(".basketInputchair");
            basketSpanChair.innerHTML = ` Цена ${
              this.itemInBasket[i - 1].cost * +basketInputChair.value
              } `;
            return;
          } else if (item.index == "table") {
            let val = +input2.value;
            document.querySelector(".basketInputtable").value = val;
            let searchName = "table";
            let idx = this.itemInBasket.findIndex(
              (el) => el.index === searchName
            );
            this.itemInBasket[idx].amount = val;
            this.allAmount();
            let basketSpanTable = document.querySelector(".spantable");
            let basketInputTable = document.querySelector(".basketInputtable");
            basketSpanTable.innerHTML = ` Цена ${
              this.itemInBasket[i - 1].cost * +basketInputTable.value
              } `;
            return;
          } else if (item.index == "lamp") {
            let val = +input3.value;
            document.querySelector(".basketInputlamp").value = val;
            let searchName = "lamp";
            let idx = this.itemInBasket.findIndex(
              (el) => el.index === searchName
            );
            this.itemInBasket[idx].amount = val;
            this.allAmount();
            let basketSpanLamp = document.querySelector(".spanlamp");
            let basketInputLamp = document.querySelector(".basketInputlamp");
            basketSpanLamp.innerHTML = ` Цена ${
              this.itemInBasket[i - 1].cost * +basketInputLamp.value
              } `;
            return;
          }
        }
      }
      this.itemInBasket.push(item);
      this.drawBasketItem();
    }
  }
  drawBasketItem() {
    let item_block = document.createElement("div");
    item_block.classList.add("item_block");

    let basketSpan1 = document.createElement("span");
    basketSpan1.classList.add("lead");

    let basketSpan2 = document.createElement("span");
    basketSpan2.classList.add("lead");

    let basketBtnMinus = document.createElement("button");
    basketBtnMinus.classList.add("btn", "btn-outline-secondary");
    basketBtnMinus.innerHTML = "-";

    let basketInput = document.createElement("input");
    basketInput.classList.add("basketForm");

    let basketBtnPlus = document.createElement("button");
    basketBtnPlus.classList.add("btn", "btn-outline-secondary");
    basketBtnPlus.innerHTML = "+";

    let basketDeleteItem = document.createElement("button");
    basketDeleteItem.classList.add("btn", "btn-outline-secondary");
    basketDeleteItem.innerHTML = "Удалить из корзины";

    for (let i = 0; i <= this.itemInBasket.length; i++) {
      if (i == this.itemInBasket.length) {
        item_block.classList.add(`item_block${this.itemInBasket[i - 1].index}`);

        basketBtnMinus.classList.add(
          `basketBtnMinus${this.itemInBasket[i - 1].index}`
        );
        basketBtnMinus.setAttribute(
          "onclick",
          `mainBasket.minusBtn(${this.itemInBasket[i - 1].delindex});`
        );

        basketInput.classList.add(
          `basketInput${this.itemInBasket[i - 1].index}`
        );
        basketInput.value = this.itemInBasket[i - 1].amount;

        basketBtnPlus.classList.add(
          `basketBtnPlus${this.itemInBasket[i - 1].index}`
        );
        basketBtnPlus.setAttribute(
          "onclick",
          `mainBasket.plusBtn(${this.itemInBasket[i - 1].delindex});`
        );

        basketDeleteItem.classList.add(
          `basketDeleteItem${this.itemInBasket[i - 1].index}`
        );
        basketDeleteItem.setAttribute(
          "onclick",
          `mainBasket.deleteFromBasket(${this.itemInBasket[i - 1].delindex});`
        );

        basketBlock.appendChild(item_block);

        basketSpan1.innerHTML = `${this.itemInBasket[i - 1].name} количество `;
        item_block.appendChild(basketSpan1);

        item_block.appendChild(basketBtnMinus);
        item_block.appendChild(basketInput);
        item_block.appendChild(basketBtnPlus);

        basketSpan2.classList.add(`span${this.itemInBasket[i - 1].index}`);
        basketSpan2.innerHTML = ` Цена ${
          this.itemInBasket[i - 1].cost * +basketInput.value
          } `;
        item_block.appendChild(basketSpan2);

        item_block.appendChild(basketDeleteItem);
      }
    }
    this.allAmount();
  }
  allAmount() {
    allamount = 0;
    for (let i = 0; i < this.itemInBasket.length; i++) {
      allamount += this.itemInBasket[i].amount;
    }
  }
  emptyBasket() {
    document.querySelector(".totalPriceBlock").remove();
    let basketEmpt = document.createElement("h2");
    basketEmpt.classList.add("basketEpty");
    basketEmpt.innerHTML = "Корзина пуста";
    basketBlock.appendChild(basketEmpt);
    first = true;
  }
  deleteFromBasket(inx) {
    if (inx == 1) {
      let searchName = "chair";
      let idx = this.itemInBasket.findIndex((el) => el.index === searchName);
      this.itemInBasket.splice(idx, 1);
      document.querySelector(".item_blockchair").remove();
      this.allAmount();
      this.FullPrice();
      this.basketAdressBtn();
      if (this.itemInBasket.length == 0) {
        this.emptyBasket();
        return;
      }
      return;
    } else if (inx == 2) {
      let searchName = "table";
      let idx = this.itemInBasket.findIndex((el) => el.index === searchName);
      this.itemInBasket.splice(idx, 1);
      document.querySelector(".item_blocktable").remove();
      this.allAmount();
      this.FullPrice();
      this.basketAdressBtn();
      if (this.itemInBasket.length == 0) {
        this.emptyBasket();
        return;
      }
      return;
    } else if (inx == 3) {
      let searchName = "lamp";
      let idx = this.itemInBasket.findIndex((el) => el.index === searchName);
      this.itemInBasket.splice(idx, 1);
      document.querySelector(".item_blocklamp").remove();
      this.allAmount();
      this.FullPrice();
      this.basketAdressBtn();
      if (this.itemInBasket.length == 0) {
        this.emptyBasket();
        return;
      }
      return;
    }
  }
  plusBtn(inx) {
    if (inx == 1) {
      let input = document.querySelector(".basketInputchair");
      let val = +input.value;
      val += 1;
      input.value = val;
      let basketSpanChair = document.querySelector(".spanchair");
      let basketInputChair = document.querySelector(".basketInputchair");
      basketSpanChair.innerHTML = ` Цена ${3420 * +basketInputChair.value} `;
      let searchName = "chair";
      let idx = this.itemInBasket.findIndex((el) => el.index === searchName);
      this.itemInBasket[idx].amount = val;
      this.allAmount();
      this.FullPrice();
      this.basketAdressBtn();
      basketBlock.after(totalPriceBasket);
    } else if (inx == 2) {
      let input = document.querySelector(".basketInputtable");
      let val = +input.value;
      val += 1;
      input.value = val;
      let basketSpanTable = document.querySelector(".spantable");
      let basketInputTable = document.querySelector(".basketInputtable");
      basketSpanTable.innerHTML = ` Цена ${7990 * +basketInputTable.value} `;
      let searchName = "table";
      let idx = this.itemInBasket.findIndex((el) => el.index === searchName);
      this.itemInBasket[idx].amount = val;
      this.allAmount();
      this.FullPrice();
      this.basketAdressBtn();
      basketBlock.after(totalPriceBasket);
    } else if (inx == 3) {
      let input = document.querySelector(".basketInputlamp");
      let val = +input.value;
      val += 1;
      input.value = val;
      let basketSpanLamp = document.querySelector(".spanlamp");
      let basketInputLamp = document.querySelector(".basketInputlamp");
      basketSpanLamp.innerHTML = ` Цена ${1070 * +basketInputLamp.value} `;
      let searchName = "lamp";
      let idx = this.itemInBasket.findIndex((el) => el.index === searchName);
      this.itemInBasket[idx].amount = val;
      this.allAmount();
      this.FullPrice();
      this.basketAdressBtn();
      basketBlock.after(totalPriceBasket);
    }
  }
  minusBtn(inx) {
    if (inx == 1) {
      let input = document.querySelector(".basketInputchair");
      if (+input.value > 1) {
        let val = +input.value;
        val -= 1;
        input.value = val;
        let basketSpanChair = document.querySelector(".spanchair");
        let basketInputChair = document.querySelector(".basketInputchair");
        basketSpanChair.innerHTML = ` Цена ${3420 * +basketInputChair.value} `;
        let searchName = "chair";
        let idx = this.itemInBasket.findIndex((el) => el.index === searchName);
        this.itemInBasket[idx].amount = val;
        this.allAmount();
        this.FullPrice();
        this.basketAdressBtn();
        basketBlock.after(totalPriceBasket);
      }
    } else if (inx == 2) {
      let input = document.querySelector(".basketInputtable");
      if (+input.value > 1) {
        let val = +input.value;
        val -= 1;
        input.value = val;
        let basketSpanTable = document.querySelector(".spantable");
        let basketInputTable = document.querySelector(".basketInputtable");
        basketSpanTable.innerHTML = ` Цена ${7990 * +basketInputTable.value} `;
        let searchName = "table";
        let idx = this.itemInBasket.findIndex((el) => el.index === searchName);
        this.itemInBasket[idx].amount = val;
        this.allAmount();
        this.FullPrice();
        this.basketAdressBtn();
        basketBlock.after(totalPriceBasket);
      }
    } else if (inx == 3) {
      let input = document.querySelector(".basketInputlamp");
      if (+input.value > 1) {
        let val = +input.value;
        val -= 1;
        input.value = val;
        let basketSpanLamp = document.querySelector(".spanlamp");
        let basketInputLamp = document.querySelector(".basketInputlamp");
        basketSpanLamp.innerHTML = ` Цена ${1070 * +basketInputLamp.value} `;
        let searchName = "lamp";
        let idx = this.itemInBasket.findIndex((el) => el.index === searchName);
        this.itemInBasket[idx].amount = val;
        this.allAmount();
        this.FullPrice();
        this.basketAdressBtn();
        basketBlock.after(totalPriceBasket);
      }
    }
  }
  FullPrice() {
    price = 0;
    for (let i = 0; i < this.itemInBasket.length; i++) {
      price += this.itemInBasket[i].cost * this.itemInBasket[i].amount;
    }
    totalPriceBasket.innerHTML = `В корзине ${allamount} товар(а/ов) на сумму ${price} рублей`;
  }
  basketAdressBtn() {
    let continueBtn = document.createElement("button");
    continueBtn.classList.add("continueBtn", "btn", "btn-outline-secondary");
    continueBtn.innerHTML = "Оформить заказ";
    continueBtn.setAttribute("onclick", `mainAdress.basketAdress();`);
    totalPriceBasket.appendChild(continueBtn);
  }
}