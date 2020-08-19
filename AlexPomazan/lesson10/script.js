const basketOfProduct = document.querySelector(".basket");
const catalogOfProduct = document.querySelector(".catalog");
const headingBasket = document.createElement("h3");
const basketCard = document.createElement("div");
basketCard.className = "card";
const order = document.createElement("h3");
headingBasket.textContent = "Корзина:";
order.textContent = "Заказ:";
order.style.display = "none";
basketOfProduct.prepend(headingBasket);
basketOfProduct.prepend(order);
basketOfProduct.append(basketCard);

const infoBasketMessage = document.createElement("p");
infoBasketMessage.className = "info-basket";
basketCard.append(infoBasketMessage);

const acceptBasket = document.createElement("button");
acceptBasket.textContent = "Оформить заказ";
acceptBasket.className = "btn accept-basket btn-warning";
acceptBasket.style.display = "none";
basketCard.append(acceptBasket);

class Product {
  constructor(id, name, price, quantity, images) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.images = images;
  }
  productAppend() {
    const modalImg = document.createElement("div");
    modalImg.className = "modal-img";
    modalImg.innerHTML = `
    <a type="button" class="a-${this.id}" data-toggle="modal" data-target="#exampleModal-${this.id}">
</a>
  <div class="modal fade" id="exampleModal-${this.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">${this.name}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
        <div id="carouselExampleControls-${this.id}" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="${this.images[0]}" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img src="${this.images[1]}" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img src="${this.images[2]}" class="d-block w-100" alt="...">
          </div>
        </div>
        <a class="carousel-control-prev prev-${this.id}" href="#carouselExampleControls-${this.id}" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next next-${this.id}" href="#carouselExampleControls-${this.id}" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
        </div>
      </div>
    </div>
  </div>`;
    const productCard = document.createElement("div");
    productCard.className = "card card-product";
    catalogOfProduct.append(productCard);
    productCard.style.margin = "20px";
    const productItem = document.createElement("div");
    productItem.className = `product product-${this.id}`;
    productCard.appendChild(productItem);
    const infoProduct = document.createElement("div");
    infoProduct.className = "product-info";
    let imgProduct = document.createElement("img");
    imgProduct.src = this.images[0];
    imgProduct.height = 150;
    imgProduct.style.margin = "20px";
    imgProduct.className = "product-img";
    productItem.append(modalImg);
    let productName = document.createElement("div");
    let productPrice = document.createElement("div");
    let productPriceValue = document.createElement("div");
    const productInfo = document.createElement("div");
    productName.className = "name";
    productPrice.className = "price";
    productPriceValue.className = "price-value";
    productInfo.className = "product-info";
    productName.innerHTML = `${this.name}`;
    productPrice.innerHTML = "Цена:";
    productPriceValue.innerHTML = `${this.price}`;
    productItem.append(productInfo);
    productInfo.append(productName);
    productInfo.append(productPrice);
    productPrice.append(productPriceValue);

    let modalTarget = document.querySelector(`.a-${this.id}`);
    modalTarget.prepend(imgProduct);
    const btnsProduct = document.createElement("div");
    btnsProduct.className = "product-btns";
    productItem.append(btnsProduct);
    const btnAdd = document.createElement("button");
    const btnDelete = document.createElement("button");
    btnAdd.className = `btn btn-add btn-success`;
    btnDelete.className = `btn btn-delete btn-danger`;
    btnAdd.textContent = "Добавить";
    btnDelete.textContent = "Удалить";
    btnsProduct.append(btnAdd);
    btnsProduct.append(btnDelete);
    document.addEventListener("keydown", moveCarousel);
    function moveCarousel(event) {
      if (event.keyCode === 37) {
        // Previous
        let btnPrev = document.querySelector(`.prev-${this.id}`);
        btnPrev.click();
        return false;
      }
      if (event.keyCode === 39) {
        // Next
        let btnNext = document.querySelector(`.next-${this.id}`);
        btnNext.click();
        return false;
      }
    }
  }
}

let graphicsCard = new Product(
  1,
  "Видеокарта nVidia GeForce GTX 1660",
  22000,
  1,
  [
    "https://avatars.mds.yandex.net/get-mpic/2008455/img_id1669331565646531338.png/orig",
    "https://www.kns.ru/linkpics/gigabyte-nvidia-geforce-gtx-1660-super-6gb-gv-n166soc-6gd-0.jpg",
    "https://www.alternate.lu/p/o/j/GIGABYTE_GeForce_GTX_1660_OC_6G__Grafikkarte@@jfxy0c66_1.jpg",
  ]
);
let cpu = new Product(2, "Процессор Ryzen 5 2600", 15000, 1, [
  "https://3dnews.ru/assets/external/illustrations/2018/07/14/972642/art-2.jpg",
  "https://comp.dmkos.ru/images/publ/142/kit2.jpg",
  "https://ru.gecid.com/data/cpu/201808040800-53057/img/02_2_amd_ryzen_5_2600.jpg",
]);
let ssd = new Product(3, "SSD Kingston 120gb", 4500, 1, [
  "https://andpro.ru/upload/iblock/2c5/9abd6d07_1f76_11e7_80d7_001e67d1aaeb_1ace89ea_1f78_11e7_80d7_001e67d1aaeb.jpg",
  "https://cdn.svyaznoy.ru/upload/iblock/d62/1025935003.jpg/resize/483x483/hq/",
  "https://c.dns-shop.ru/thumb/st1/fit/wm/800/650/a1d8f8af4e82fc12092e37e760bff908/347602f7d3dd0a44cb6f5b0ad22d510eff10458b2d6b16c9304e464c19c1e934.jpg",
]);
let cooler = new Product(
  4,
  "Кулер для процессора DEEPCOOL GAMMAXX 200T RET",
  800,
  1,
  [
    "https://static.onlinetrade.ru/img/items/b/kuler_dlya_protsessora_deepcool_gammaxx200t_ret_1.jpg",
    "https://www.overclockers.ua/news/cooler/116555-dc-gammaxx-200t-2.jpg",
    "https://static.onlinetrade.ru/img/items/m/kuler_dlya_protsessora_deepcool_gammaxx200t_ret_8.jpg",
  ]
);

class BasketOfGoods {
  constructor(address, comment) {
    this.items = [];
    this.setAddress(address);
    this.setComment(comment);
  }

  setAddress(address) {
    this._address = address;
  }

  setComment(comment) {
    this._comment = comment;
  }

  addToBasket(product) {
    this.items.push(product);
  }
  deleteFromBasket(productName) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name === productName) {
        this.items.splice(i, 1);
      }
    }
  }

  countBasketPrice() {
    let amout = 0;
    for (let product in this.items) {
      amout += this.items[product].price * this.items[product].quantity;
    }
    return amout;
  }

  basketInfo() {
    let infoBasket;
    let numberOfGoods = 0;
    if (this.items.length == 0) {
      infoBasket = "Корзина пуста.";
    } else {
      acceptBasket.style.display = "inline-block";
      for (let product in this.items) {
        let quantity = this.items[product].quantity;
        numberOfGoods += quantity;
      }
      infoBasket =
        "В корзине " +
        numberOfGoods +
        " товаров на сумму " +
        this.countBasketPrice() +
        " рублей.";
    }
    return (infoBasketMessage.textContent = infoBasket);
  }
  //Отображение формы и кнопок
  appendOrderForm() {
    const form = document.createElement("form");
    basketCard.append(form);

    const nextBasket = document.createElement("button");
    nextBasket.textContent = "Далее";
    nextBasket.className = "btn next-basket btn-info";
    basketCard.append(nextBasket);

    const completeBasket = document.createElement("button");
    completeBasket.textContent = "Завершить заказ";
    completeBasket.className = "btn complete-basket btn-warning";
    basketCard.append(completeBasket);
  }

  //Заполнение адресса и скрытие ненужных блоков
  showAddress() {
    let form = document.querySelector("form");
    const addressDiv = document.createElement("div");
    addressDiv.classList.add("address-div");
    form.appendChild(addressDiv);

    const labelForAddress = document.createElement("label");
    labelForAddress.className = "label-address";
    labelForAddress.setAttribute("for", "address");
    labelForAddress.textContent = "Введите адрес доставки:";
    addressDiv.appendChild(labelForAddress);

    const address = document.createElement("input");
    address.setAttribute("name", "address");
    address.setAttribute("id", "address");
    address.setAttribute("type", "text");
    address.setAttribute("placeholder", "Ваш адрес");
    address.setAttribute("minlength", "10");
    address.classList.add("address-input");
    addressDiv.appendChild(address);

    let completeBtn = document.querySelector(".complete-basket ");

    completeBtn.style.display = "none";
    addressDiv.style.display = "flex";
  }

  //Заполнение коммента и скрытие ненужных блоков
  showComment() {
    let form = document.querySelector("form");
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("comment-div");
    form.appendChild(commentDiv);

    const labelForComment = document.createElement("label");
    labelForComment.setAttribute("for", "comment");
    labelForComment.textContent = "Оставьте комментарий к заказу:";
    commentDiv.appendChild(labelForComment);

    const comment = document.createElement("textarea");
    comment.className = "comment-textarea";
    comment.setAttribute("name", "comment");
    comment.setAttribute("id", "comment");
    comment.setAttribute("placeholder", "Ваш комментарий...");
    commentDiv.appendChild(comment);

    let addDiv = document.querySelector(".address-div");
    let commDiv = document.querySelector(".comment-div");
    let nextBtn = document.querySelector(".next-basket");
    let submitBtn = document.querySelector(".complete-basket");

    nextBtn.style.display = "none";
    addDiv.style.display = "none";
    commentDiv.style.display = "flex";
    submitBtn.style.display = "inline-block";
  }

  //Отображение оформления заказа при нажатии кнопки
  showComplitionBasket() {
    acceptBasket.onclick = function () {
      acceptBasket.style.display = "none";
      headingBasket.style.display = "none";
      order.style.display = "block";
      infoBasketMessage.style.display = "none";
      btnsDelete.forEach((btn, i) => {
        btn.setAttribute("disabled", true);
      });
      btnsAdd.forEach((btn, i) => {
        btn.setAttribute("disabled", true);
      });
      basket.appendOrderForm();
      basket.showAddress();
      let next = document.querySelector(".next-basket");
      next.onclick = function () {
        let inputAddress = document.querySelector(".address-input");
        if (inputAddress.value.length > 8) {
          basket.setAddress(inputAddress.value);
          console.log(basket);
          basket.showComment();
        } else {
          alert("Введите адрес доставки!");
        }
      };
      let complete = document.querySelector(".complete-basket");
      complete.onclick = function () {
        let commentDiv = document.querySelector(".comment-div");
        infoBasketMessage.style.display = "block";
        commentDiv.style.display = "none";
        complete.style.display = "none";

        let textareaСomment = document.querySelector(".comment-textarea");
        basket.setComment(textareaСomment.value);
        let addressBasket = document.createElement("div");
        addressBasket.className = "address";
        addressBasket.textContent = `Адресс доставки: ${basket._address}`;
        basketCard.append(addressBasket);
        let commentBasket = document.createElement("div");
        commentBasket.className = "comment";
        if (textareaСomment.value.length > 0) {
          commentBasket.textContent = `Комментарий: ${basket._comment}`;
        } else {
          commentBasket.textContent = "Комментарий: Комментария нет";
        }
        basketCard.append(commentBasket);
      };
    };
  }
}

graphicsCard.productAppend(graphicsCard);
cpu.productAppend(cpu);
ssd.productAppend(ssd);
cooler.productAppend(cooler);

let basket = new BasketOfGoods(" ", " ");

basket.basketInfo();

const products = [];
products.push(graphicsCard);
products.push(cpu);
products.push(ssd);
products.push(cooler);

const names = document.querySelectorAll(".name");
const prices = document.querySelectorAll(".price");
const btnsAdd = document.querySelectorAll(".btn-add");
const btnsDelete = document.querySelectorAll(".btn-delete");

//Добавление товара в корзину
btnsAdd.forEach((btn, i) => {
  btn.onclick = function () {
    for (let j = 0; j < products.length; j++) {
      if (products[j].name === names[i].innerHTML) {
        basket.addToBasket(products[j]);
        basket.basketInfo();
      }
    }
  };
});

//Удаление товара из корзины
btnsDelete.forEach((btn, i) => {
  btn.onclick = function () {
    for (let j = 0; j < basket.items.length; j++) {
      if (basket.items[j].name === names[i].innerHTML) {
        basket.deleteFromBasket(names[i].innerHTML, 1);
        basket.basketInfo();
      }
    }
  };
});

basket.showComplitionBasket();
