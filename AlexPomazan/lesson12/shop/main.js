const basketOfProduct = document.querySelector(".basket");

const headingBasket = document.createElement("h3");
headingBasket.textContent = "Корзина:";
basketOfProduct.prepend(headingBasket);

const basketCard = document.createElement("div");
basketCard.className = "card";
basketOfProduct.append(basketCard);

const order = document.createElement("h3");
order.textContent = "Заказ:";
order.style.display = "none";
basketOfProduct.prepend(order);

const infoBasketMessage = document.createElement("p");
infoBasketMessage.className = "info-basket";
basketCard.append(infoBasketMessage);

const acceptBasket = document.createElement("button");
acceptBasket.textContent = "Оформить заказ";
acceptBasket.className = "btn accept-basket btn-warning";
acceptBasket.style.display = "none";
basketCard.append(acceptBasket);

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

graphicsCard.productAppend(graphicsCard);
cpu.productAppend(cpu);
ssd.productAppend(ssd);
cooler.productAppend(cooler);

const basket = new BasketOfGoods(" ", " ");

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