
/*  2. Сделать генерацию корзины динамической: верстка корзины не должна находиться в HTML-структуре. Там должен быть только div,
в который будет вставляться корзина, сгенерированная на базе JS:
 - Пустая корзина должна выводить строку «Корзина пуста»;
 - Наполненная должна выводить «В корзине: n товаров на сумму m рублей».
    * 3. Сделать так, чтобы товары в каталоге выводились при помощи JS:
 - Создать массив товаров (сущность Product);
 - При загрузке страницы на базе данного массива генерировать вывод из него. HTML-код должен содержать только div id=”catalog”
 без вложенного кода. Весь вид каталога генерируется JS.*/


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
    getInfo() {
        let str = ''
        this.products.forEach(item => str += `${item.name}: ${item.price} ${item.currency} - ${item.count} pieces \n`)
        return str
    }
    getSum() {
        let sum = 0
        this.products.forEach(item =>
            sum += item.price * item.count)
        return sum + ' ' + this.products[0].currency
    }
}

let bread = new Product(1, 'Bread', 2, 'USD',)
let milk = new Product(2, 'Milk', 5, 'USD',)
let meat = new Product(3, 'Meat', 12, 'USD',)
let chocolate = new Product(4, 'Chocolate', 7, 'USD',)

let cart1 = new Cart()

cart1.addProduct(bread, 5)
cart1.addProduct(meat, 1)

console.log(cart1.getSum())
console.log(cart1.getInfo())


let cart = document.querySelector('.cart')
let products = document.querySelector('.products')

function cartAppend (cartData) {
    let cartInfo = document.createElement('div')
    cartInfo.className = 'cartInfo'
    cartInfo.textContent = cartData.getInfo()
    cart.appendChild(cartInfo)

    let sum = document.createElement('h2')
    sum.className = 'sum'
    sum.textContent = 'Sum : ' + cartData.getSum()
    cart.appendChild(sum)
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

    products.appendChild(product)
}

productAppend(bread)
productAppend(milk)
productAppend(meat)
productAppend(chocolate)

cartAppend(cart1)

let breadArea = document.querySelector(`.bread`)
let milkArea = document.querySelector(`.milk`)
let meatArea = document.querySelector(`.meat`)
let chocolateArea = document.querySelector(`.chocolate`)

breadArea.onclick = function () {
    cart1.addProduct(bread, 1)
    cartRemove()
    cartAppend(cart1)
}

milkArea.onclick = function () {
    cart1.addProduct(milk, 1)
    cartRemove()
    cartAppend(cart1)
}

meatArea.onclick = function () {
    cart1.addProduct(meat, 1)
    cartRemove()
    cartAppend(cart1)
}

chocolateArea.onclick = function () {
    cart1.addProduct(chocolate, 1)
    cartRemove()
    cartAppend(cart1)
}
