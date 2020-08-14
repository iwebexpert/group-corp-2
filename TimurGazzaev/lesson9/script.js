
/*  1. Продолжаем реализовывать модуль корзины:
        - Добавлять в объект корзины выбранные товары по клику на кнопке «Купить» без перезагрузки страницы;
        - Привязать к событию покупки товара пересчет корзины и обновление ее внешнего вида.
    2. * У товара может быть несколько изображений. Нужно:
        - Реализовать функционал показа полноразмерных картинок товара в модальном окне;
        - Реализовать функционал перехода между картинками внутри модального окна.*/


class Product {
    constructor(id, name, price, currency) {
        this.id = id
        this.name = name
        this.price = price
        this.currency = currency
    }
}

class Cart {
    constructor() {
        this.products = []
    }
    addProduct(product, count) {
        if(product instanceof Product && product && count > 0) {
            let tmp = {...product}
            tmp.count = count
            if(this.products.find(item => item.id === product.id)) {
                this.products.find(item => item.id === product.id).count += count
            }
            else {
                this.products.push(tmp)
            }
        }
    }
    deleteProduct(product) {
        if(product instanceof Product && product) {
            if(this.products.find(item => item.id === product.id)) {
                this.products = this.products.filter(item => item.id !== product.id)
            }
        }
    }
    getSum() {
        let sum = 0
        this.products.forEach(item =>
            sum += item.price * item.count)
        return sum + ' ' + this.products[0].currency
    }
    reset() {
        this.products = []
    }
}

let bread = new Product(1, 'Bread', 2, 'USD',)
let milk = new Product(2, 'Milk', 5, 'USD',)
let meat = new Product(3, 'Meat', 12, 'USD',)
let chocolate = new Product(4, 'Chocolate', 7, 'USD',)

let cart1 = new Cart()

let cart = document.querySelector('.cart')
let products = document.querySelector('.products')
let emptyCart = document.createElement('h2')
emptyCart.textContent = 'Your cart is empty'
cart.appendChild(emptyCart)

function refreshCart (cartData) {
    let cartInfo = document.createElement('div')
    cartInfo.className = 'cartInfo'

    cartData.products.forEach( item => {
        let cartInfoItem = document.createElement('div')
        cartInfoItem.className = 'cartInfoItem'
        cartInfoItem.textContent = `${item.name} : ${item.price} ${item.currency} - ${item.count} pieces`

        let deleteIcon = document.createElement('img')
        deleteIcon.className = `deleteIco delete-${item.name.toLowerCase()}`
        deleteIcon.src = 'img/delete.svg'

        cartInfoItem.appendChild(deleteIcon)
        cartInfo.appendChild(cartInfoItem)
    })

    let sum = document.createElement('h2')
    sum.className = 'sum'
    sum.textContent = 'Sum : ' + cartData.getSum()

    let clearIco = document.createElement('img')
    clearIco.className = 'clearIco'
    clearIco.src = 'img/clearCart.svg'

    cart.appendChild(cartInfo)
    sum.appendChild(clearIco)
    cart.appendChild(sum)
}

function cartAppend (cartData, productName) {
    cartData.products.length && cartRemove()
    cart1.addProduct(productName, 1)
    refreshCart (cartData)
    emptyCart.remove()
}

function deleteItem (cartData, productName) {
    cartRemove ()
    cartData.deleteProduct(productName)

    cartData.products.length && refreshCart (cartData)

    !cartData.products.length ? cart.appendChild(emptyCart) : null
    console.log(!cartData.products.length)
}

function cartRemove () {
    let cartInfo = document.querySelector('.cartInfo')
    let sum = document.querySelector('.sum')
    cartInfo.remove()
    sum.remove()
}

function productAppend (productName) {
    let product = document.createElement('div')
    product.className = `item ${productName.name.toLowerCase()}`

    let productTitle = document.createElement('h2')
    productTitle.textContent = productName.name
    product.appendChild(productTitle)

    let productPrice = document.createElement('b')
    productPrice.textContent = productName.price + ' ' + productName.currency
    product.appendChild(productPrice)

    let productImg = document.createElement('img')
    productImg.src = `img/${productName.name.toLowerCase()}1.png`
    productImg.alt = productName.name.toLowerCase()
    product.appendChild(productImg)

    let btn = document.createElement('button')
    btn.className = `btn btn-${productName.name.toLowerCase()}`
    btn.textContent = 'Add to cart'
    product.appendChild(btn)

    products.appendChild(product)
}

productAppend(bread)
productAppend(milk)
productAppend(meat)
productAppend(chocolate)

cart1.products.length && cartAppend(cart1)

let breadArea = document.querySelector('.btn-bread')
let milkArea = document.querySelector('.btn-milk')
let meatArea = document.querySelector('.btn-meat')
let chocolateArea = document.querySelector('.btn-chocolate')

breadArea.onclick = function () {
    cartAppend(cart1, bread)

}

milkArea.onclick = function () {
    cartAppend(cart1, milk)
}

meatArea.onclick = function () {
    cartAppend(cart1, meat)
}

chocolateArea.onclick = function () {
    cartAppend(cart1, chocolate)
}

cart.onclick = function (event) {
    switch (event.target.className) {
        case 'clearIco': {
            cart1.reset()
            cartRemove()
            cart.appendChild(emptyCart)
            break
        }
        case 'deleteIco delete-milk': {
            deleteItem(cart1, milk)
            break
        }
        case 'deleteIco delete-bread': {
            deleteItem(cart1, bread)
            break
        }
        case 'deleteIco delete-meat': {
            deleteItem(cart1, meat)
            break
        }
        case 'deleteIco delete-chocolate': {
            deleteItem(cart1, chocolate)
            break
        }
    }
}
