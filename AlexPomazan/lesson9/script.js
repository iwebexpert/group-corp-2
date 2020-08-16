///////// TASK 1-2 /////////
const basketOfProduct = document.querySelector(".basket");
const catalogOfProduct = document.querySelector(".catalog");
const headingCatalog = document.createElement("h3");
headingCatalog.textContent = "Каталог:";
catalogOfProduct.append(headingCatalog);
const headingBasket = document.createElement("h3");
headingBasket.textContent = "Корзина товаров:";
basketOfProduct.prepend(headingBasket);
const infoBasketMessage = document.createElement("p");
infoBasketMessage.className = "info-basket";
basketOfProduct.append(infoBasketMessage);

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
        <a class="carousel-control-prev" href="#carouselExampleControls-${this.id}" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleControls-${this.id}" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
        </div>
      </div>
    </div>
  </div>`;
    const productCard = document.createElement("div");
    productCard.className = "card";
    catalogOfProduct.append(productCard);
    productCard.style.margin = "20px";
    const productItem = document.createElement("div");
    productItem.className = `product product-${this.id}`;
    productItem.style.display = "flex";
    productItem.style.alignItems = "center";
    productCard.appendChild(productItem);
    const infoProduct = document.createElement("div");
    infoProduct.className = "product-info";
    let imgProduct = document.createElement("img");
    imgProduct.src = this.images[0];
    imgProduct.width = 150;
    imgProduct.setAttribute("data-target", "#exampleModal-1");
    imgProduct.setAttribute("data-togle", "modal");
    imgProduct.style.margin = "20px";
    imgProduct.className = "product-img";
    productItem.append(modalImg);
    productItem.appendChild(infoProduct);
    infoProduct.innerHTML = `<p>Название товара: ${this.name} </br>Цена: ${this.price} рублей</p>`;
    let modalTarget = document.querySelector(`.a-${this.id}`);
    modalTarget.prepend(imgProduct);
    let btn = document.createElement("button");
    btn.className = `btn btn-${this.id} btn-primary`;
    btn.textContent = "Добавить в корзину";
    productItem.append(btn);
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
  constructor() {
    this.items = [];
  }

  addToBasket(product) {
    this.items.push(product);
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
}

graphicsCard.productAppend(graphicsCard);
cpu.productAppend(cpu);
ssd.productAppend(ssd);
cooler.productAppend(cooler);

const graphicsCardBtn = document.querySelector(".btn-1");
const cpuBtn = document.querySelector(".btn-2");
const ssdBtn = document.querySelector(".btn-3");
const coolerBtn = document.querySelector(".btn-4");

let basket = new BasketOfGoods();

basket.basketInfo();

graphicsCardBtn.onclick = function () {
  basket.addToBasket(graphicsCard);
  basket.basketInfo();
};

cpuBtn.onclick = function () {
  basket.addToBasket(cpu);
  basket.basketInfo();
};

ssdBtn.onclick = function () {
  basket.addToBasket(ssd);
  basket.basketInfo();
};

coolerBtn.onclick = function () {
  basket.addToBasket(cooler);
  basket.basketInfo();
};
