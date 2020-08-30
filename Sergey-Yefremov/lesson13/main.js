const basketDom = document.querySelector(".basket");
const catalogDom = document.querySelector(".catalog");
const modalDom = document.querySelector(".modal");
const modalImageDom = document.querySelector(".modalImage");

const options = {
    productCss: "product",
    productImageCss: "productImage",
    buttonCss: "myButton",
    groupButtonsCss: "groupButtons",
    groupTitleCss: "groupTitle",
}

class product {
    constructor(title, price, priceType, imageArray) {
        this.title = title;
        this.price = price;
        this.priceType = priceType;
        this.images = imageArray;
    }
    drawProduct(objectDom, index) {
        objectDom.appendChild(this.createProductBox(this, index));
    }

    createProductBox(prod, index) {
        const res = document.createElement("div");
        res.classList.add(options.productCss);
        const imageProd = document.createElement("img");
        imageProd.addEventListener("click", showImages);
        imageProd.src = this.images[0];
        imageProd.classList.add(options.productImageCss);
        imageProd.setAttribute("productIndex", index + "");

        const titleProd = document.createElement("p");
        titleProd.textContent = prod.title + '(' + prod.price + ' ' + prod.priceType + ')';
        const buttonAdd = document.createElement("div");
        buttonAdd.classList.add(options.buttonCss);
        buttonAdd.textContent = "Добавить";
        buttonAdd.setAttribute("productIndex", index + "");
        buttonAdd.setAttribute("onClick", "addToBasket(this);");
        res.appendChild(imageProd);
        res.appendChild(titleProd);
        res.appendChild(buttonAdd);
        res.setAttribute("productIndex", index + "");
        return res;

    }
}
class basketUnit {
    constructor(prod, count) {
        this.product = prod;
        this.count = count;
    }
    drawBasketUnit(objectDom, index) {
        const res = document.createElement("div");
        res.classList.add(options.productCss);

        const titleProd = document.createElement("p");
        titleProd.textContent = this.product.title + '(' + this.product.price + ' ' + this.product.priceType + ')';
        const buttons = document.createElement("div");
        buttons.classList.add(options.groupButtonsCss);
        const buttonAdd = document.createElement("div");
        buttonAdd.classList.add(options.buttonCss);
        buttonAdd.textContent = "+";
        buttonAdd.setAttribute("basketUnitIndex", index + "");
        buttonAdd.setAttribute("basketUnitButtonType", "+1");
        buttonAdd.setAttribute("onClick", "changeBasketUnit(event,this);");

        const basketUnitCount = document.createElement("p");
        basketUnitCount.textContent = this.count;
        const buttonRem = document.createElement("div");
        buttonRem.classList.add(options.buttonCss);
        buttonRem.textContent = "-";
        buttonRem.setAttribute("basketUnitIndex", index + "");
        buttonRem.setAttribute("basketUnitButtonType", "-1");
        buttonRem.setAttribute("onClick", "changeBasketUnit(event,this);");
        res.appendChild(titleProd);
        buttons.appendChild(buttonAdd);
        buttons.appendChild(basketUnitCount);
        buttons.appendChild(buttonRem);
        res.appendChild(buttons);
        res.setAttribute("basketUnitIndex", index + "");
        objectDom.appendChild(res);

    }
}
function changeBasketUnit(event, button) {
    let indx = parseInt(button.getAttribute("basketUnitIndex"));
    if (basketCurrent == null) {
        let basketCurrent = new basket();
    }
    basketCurrent.shopBin[indx].count += parseInt(button.getAttribute("basketUnitButtonType"));
    if (basketCurrent.shopBin[indx].count <= 0) {
        basketCurrent.shopBin.splice(indx, 1);
    }
    basketCurrent.ShowBasket(basketDom);
}
class basket {

    constructor() {
        this.shopBin = [];
        this.currentStepIndx = 0;
        this.adress = "";
        this.comment = "";
    }
    add(basketUnit) {
        for (let i = 0; i < this.shopBin.length; i++) {
            if (this.shopBin[i].product.title === basketUnit.product.title) {
                this.shopBin[i].count += basketUnit.count;
                return true;
            }

        }
        this.shopBin.push(basketUnit);
    }
    countBasketPrice() {
        let res = 0;
        for (let i = 0; i < this.shopBin.length; i++) {
            res += (parseInt(this.shopBin[i].product.price) * parseInt(this.shopBin[i].count));

        }
        return res;
    }
    countBasketProd() {
        return this.shopBin.length;
    }
    countBasket() {
        let res = 0;
        for (let i = 0; i < this.shopBin.length; i++) {
            res += (parseInt(this.shopBin[i].count));

        }
        return res;
    }
    ShowBasket(basketDomCur) {
        basketDomCur.innerHTML = "";
        const titleBasketDiv = document.createElement("div");
        const titleBasket = document.createElement("h3");
        titleBasket.textContent = "Корзина";
        titleBasketDiv.appendChild(titleBasket);
        basketDomCur.appendChild(titleBasketDiv);
        const texrBasket = document.createElement("p");
        if (this.shopBin.length === 0) {
            texrBasket.textContent = "В корзине ничего нет!";
            titleBasketDiv.appendChild(texrBasket);
        }
        else {
            texrBasket.textContent = this.countBasketProd() + " позиций и " + this.countBasket() + " товаров на сумму = " + this.countBasketPrice() + " рублей.";
            titleBasketDiv.appendChild(texrBasket);
            if (this.currentStepIndx == 0) {
                for (let i = 0; i < basketCurrent.shopBin.length; i++) {
                    this.shopBin[i].drawBasketUnit(basketDomCur, i);
                }
                const buttonClear = document.createElement("div");
                buttonClear.classList.add(options.buttonCss);
                buttonClear.textContent = "Очистить";
                buttonClear.addEventListener("click", clearBasket);
                basketDomCur.appendChild(buttonClear);
            }
            titleBasketDiv.classList.add(options.groupTitleCss);

            const titleAdressDiv = document.createElement("div");
            const titleAdress = document.createElement("h3");
            titleAdress.textContent = "Адрес";
            titleAdressDiv.appendChild(titleAdress);
            basketDomCur.appendChild(titleAdressDiv);
            if (this.currentStepIndx == 1) {
                const adressText = document.createElement("textarea");
                adressText.value = this.adress;
                adressText.classList.add(options.productCss);
                adressText.classList.add("textarea");
                adressText.addEventListener("change", adressChage)
                basketDomCur.appendChild(adressText);
            }
            titleAdressDiv.classList.add(options.groupTitleCss);


            const titleCommentDiv = document.createElement("div");
            const titleComment = document.createElement("h3");
            titleComment.textContent = "Комментарий";
            titleCommentDiv.appendChild(titleComment);
            basketDomCur.appendChild(titleCommentDiv);
            if (this.currentStepIndx == 2) {
                const commentText = document.createElement("textarea");
                commentText.value = this.comment;
                commentText.setAttribute("cols", 30);
                commentText.setAttribute("rows", 10);
                commentText.classList.add(options.productCss);
                commentText.addEventListener("change", commentChage)
                basketDomCur.appendChild(commentText);
            }
            titleCommentDiv.classList.add(options.groupTitleCss);

            const basketNavigationDiv = document.createElement("div");
            basketNavigationDiv.classList.add(options.groupButtonsCss);

            const buttonNext = document.createElement("div");
            buttonNext.classList.add(options.buttonCss);
            if (this.currentStepIndx < 2) {
                buttonNext.textContent = "Продолжить";
                buttonNext.addEventListener("click", nextStep);
            }
            else {
                buttonNext.textContent = "Отправить заказ";
                buttonNext.addEventListener("click", sendOrder);

            }

            const buttonPrev = document.createElement("div");
            buttonPrev.classList.add(options.buttonCss);
            buttonPrev.textContent = "Назад";
            buttonPrev.addEventListener("click", prevStep);



            if (this.currentStepIndx > 0) {
                basketNavigationDiv.appendChild(buttonPrev);
            }
            basketNavigationDiv.appendChild(buttonNext);
            basketDomCur.appendChild(basketNavigationDiv);
        }
    }

}
function sendOrder(event) {
    console.log("Отправка заказа:", basketCurrent);
    clearBasket();
}
function adressChage(event) {
    basketCurrent.adress = this.value;
}
function commentChage(event) {
    basketCurrent.comment = this.value;
}
function nextStep() {
    basketCurrent.currentStepIndx++;
    basketCurrent.ShowBasket(basketDom);
}
function prevStep() {
    if (basketCurrent.currentStepIndx > 0) {
        basketCurrent.currentStepIndx--;
    }
    basketCurrent.ShowBasket(basketDom);
}
function addToBasket(button) {
    let indx = parseInt(button.getAttribute("productIndex"));
    if (basketCurrent === null) {
        let basketCurrent = new basket();
    }
    basketCurrent.add(new basketUnit(catalog[indx], 1));
    basketCurrent.ShowBasket(basketDom);
}
function clearBasket() {
    basketCurrent.shopBin = [];
    basketCurrent.comment = "";
    basketCurrent.adress = "";
    basketCurrent.currentStepIndx = 0;
    console.log("Корзина очищена");
    basketCurrent.ShowBasket(basketDom);
}
function showImages(event) {

    console.log(event);
    console.log(event.target.classList);
    if (event.target.className === options.productImageCss) {
        modalDom.classList.add("show");
        let indx = parseInt(event.target.getAttribute("productIndex"));
        imagesList = catalog[indx].images;
        imageIndex = 0;


        document.addEventListener('keydown', pressKeyHandler);
        updateModalImage();
    }

}
function updateModalImage() {
    if (imageIndex < 0) {
        imageIndex = imagesList.length - 1;
    }
    modalImageDom.src = imagesList[imageIndex % imagesList.length];
    console.log(imagesList);

}
function pressKeyHandler(event) {
    switch (event.key) {
        case 'ArrowLeft': {
            imageIndex--;
            updateModalImage();
            break;
        }
        case 'ArrowRight': { }
            imageIndex++;
            updateModalImage();
            break;
        case 'Escape': { }
            modalDom.classList.remove("show");
            modalImageDom.src = "";
            document.removeEventListener('keydown', pressKeyHandler);
            break;
    }

}
function imgNavClick(event) {
    if (event.target.className === "myButton" && event.target.getAttribute("actionType") != null) {
        if (event.target.getAttribute("actionType") === "close") {
            modalDom.classList.remove("show");
            modalImageDom.src = "";
            document.removeEventListener('keydown', pressKeyHandler);
        }
        else {

            imageIndex += parseInt(event.target.getAttribute("actionType"));
            updateModalImage();
        }
    }
}
function makeGETRequest(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status !== 200) {
                    reject();
                }
                resolve(JSON.parse(xhr.responseText));
            }
        };

        xhr.send();
    });
}

function getProducts() {
    fetch('/goods')
        .then(response => response.json())
        .then((products) => {
            products.forEach(function (prod) {
                console.log(prod);
                catalog.push(new product(prod.title, prod.price, prod.priceType, prod.images));
            });
            catalogDom.innerHTML = "";
            const titleCatalog = document.createElement("h3");
            titleCatalog.textContent = "Католог товаров";
            catalogDom.appendChild(titleCatalog);
            catalogDom.onclick = showImages;
            for (let i = 0; i < catalog.length; i++) {
                catalog[i].drawProduct(catalogDom, i);
            }

        });
}
let imagesList = [];
let imageIndex = 0;
const basketCurrent = new basket();
const catalog = [];
/* catalog.push(new product("Keyboard", 2000, "RUB", ["https://media.kingston.com/hyperx/features/hx-features-keyboard-alloyfpspro-litup.jpg",
    "https://mark.com.ru/wa-data/public/shop/products/13/19/31913/images/26553/26553.750@2x.jpeg",
    "https://avatars.mds.yandex.net/get-mpic/1336510/img_id8139733990913955767.jpeg/orig"]));
catalog.push(new product("Mouse", 1000, "RUB", ["https://epix.ru/images/catalog/accessories/mouse/hyperx/pulsefire_fps_pro/hyperpx-pulsefire-fps-pro.jpg",
    "https://media.kingston.com/hyperx/category/hx-family-mouse-pulsefire-surge-md.jpg",
    "https://i.ytimg.com/vi/kiEawFvNRAY/maxresdefault.jpg"]));
catalog.push(new product("Monitor", 10000, "RUB", ["https://epix.ru/images/catalog/accessories/monitors/benq/zowie-xl2411p/benq-zowie-xl2411p.jpg",
    "https://cdn.multitronic.fi/images/prod/0/C/9H.LGPLB.QBE-7.jpg",
    "https://image.coolblue.be/max/500x500/products/1372974"]));
*/

//Сделал без отрисовки, тк проще через fetch
window.onload = function () {
    getProducts();
    basketCurrent.ShowBasket(basketDom);
    makeGETRequest('/product').then((products) => { console.log(products) });
}
