class Basket {
    constructor(...products) {
        this.products = products
    }
    countBasketPrice() {
        let total = 0
        for(let i = 0; i < this.products.length; i++) {
            total += this.products[i].cuntProductPrice()
        }
        return Number(total)
    }
    addToCart() {

    }
    clearCart() {

    }
    deleteProductFromCart() {

    }
    renderAllProducts() {
        
    }
    renderCart() {

    }

}
class Products {
    constructor(item, maker, price, currency, lot) {
        this.item = item
        this.maker = maker
        this.price = price
        this.currency = currency
        this.lot = lot
    }
    cuntProductPrice(own) {
        return own = this.price * this.lot
    }
    renderProduct() {
        
    }
}

const product1 = new Products('монитор', 'LG', 15000, 'RUB', 3)
const product2 = new Products('видеокарта', 'nvidia', 80000, 'RUB', 1)

const basket = new Basket(product1, product2)
console.log(basket.countBasketPrice())

class DOM$el {
    constructor($el) {
        this.$el = $el
    }
    getSelector() {
        return  this.$el = document.querySelector(this.$el)
    }
    setId() {
        let id = new Date()
        return id.getDate()
    }
}
const app = new DOM$el('#app')
const $el = app.getSelector()

const header = document.createElement('header')
const divHeader = document.createElement('div')
divHeader.classList.add('overlay')

const nav = document.createElement('nav')

header.appendChild(nav)
header.appendChild(divHeader)
$el.appendChild(header)