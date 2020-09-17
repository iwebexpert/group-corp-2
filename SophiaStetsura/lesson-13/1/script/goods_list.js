var btnBasket = document.getElementById('basket-btn');
var btnArrange = document.getElementById('arrange-btn');
var goodsListSection = document.getElementById('goods-list-section');
var btnCloseCart = document.getElementById('goods-list-section__delete');
var btnOrder = document.getElementsByClassName('product-card-section_btn-order');
var modalCheck = document.querySelector('.modal__checkout');
var subBut = document.querySelector('#submit');
var overflow = document.createElement('div');

// var allProducts = {
//     margarita: { title: 'Маргарита', price: 300, src: 'image/products_photo/m1.jpg' },
//     meet: { title: 'Мясная', price: 400, src: 'image/products_photo/p1.jpg' },
//     vegan: { title: 'Веганская', price: 500, src: 'image/products_photo/v1.jpg' }
// };

function makeGETRequest(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status != 200) {
                    reject();
                }
                resolve(JSON.parse(xhr.response));
            }
        }
        xhr.send();
    })
}
// makeGETRequest('/allProducts').then((allProducts) => {
//     allProducts.forEach(item => )
// })
class CartItem {
    // constructor(product) {
    //     this.title = product.title;
    //     this.price = product.price;
    //     this.src = product.src;
    //     this.quantity = 1;
    // }
    renderWithIndex(index) {
        return `<div class="goods-list__product-box">
        <span class="goods-list__product-box__name">${this.title}</span>
        <div class="goods-list__product-box__price">${this.price}</div>
        <div class="goods-list__product-box__quantity">${this.quantity}</div>
        <img class="goods-list__product-box__img" src=${this.src} height="100px" alt="">
        <input type="submit" value="X" class="goods-list-item__product-box__delete" data-product-index=${index} onclick="deleteItemFromCart()">
        </div>`
    }

    addQuantity() {
        this.quantity += 1;
    }
}

class Cart {
    constructor() {
        this.goods = [];
    }

    render() {
        let listHtml = '';
        let goodsList = document.getElementById('goods-list__product-box');

        this.goods.forEach((cartItem, indexOfProduct) => {
            listHtml += cartItem.renderWithIndex(indexOfProduct);
        });
        goodsList.innerHTML = listHtml;

        this.totalCartPrice();
    }

    addItemToCart(product) {
        let cartItem = this.goods.filter(el => el.title == product.title)[0]

        if (cartItem != undefined) {
            cartItem.addQuantity();
        } else {
            let item = new CartItem(product);
            this.goods.push(item);
        }
    }

    totalCartPrice() {
        let totalPrice = document.getElementById('goods-list__total');
        let sum = 0;
        this.goods.forEach(good => {
            sum += good.price * good.quantity;
        });
        totalPrice.innerText = `Итого  ${sum} рублей`;
    }

    deleteItemFromCart(index) {
        this.goods.splice(index, 1);
        this.render();
    }
}

const addItemToCart = () => {
    let productName = event.target.dataset.productName;
    let product = allProducts[productName];
    cart.addItemToCart(product);
}

const deleteItemFromCart = () => {
    let index = event.target.dataset.productIndex;
    cart.deleteItemFromCart(index);
}

var openBasket = () => {
    cart.render();
    goodsListSection.style.display = 'block';
}

var openArrange = () => {
    goodsListSection.style.display = 'none';
    modalCheck.classList.add('block');
    modalCheck.style.display = 'block';

    overflow.className = 'overflow';
    document.body.appendChild(overflow);
    let height = modalCheck.offsetHeight;
    modalCheck.style.marginTop = - height / 2 + 'px';
    modalCheck.style.top = '50%';
}
var closeModal = () => {
    modalCheck.classList.remove('block');
    modalCheck.style.display = 'none';
    overflow.remove();
}
makeGETRequest('/allProducts', (db) => {
    this.db = JSON.parse(db);
})
var cart = new Cart();
cart.fetch(() => {
    cart.render();
});
subBut.addEventListener('click', closeModal);
btnBasket.addEventListener('click', openBasket);
btnArrange.addEventListener('click', openArrange);
window.addEventListener('click', function (evt) { console.log(evt) });
btnCloseCart.addEventListener('click', function () { goodsListSection.style.display = 'none' });
