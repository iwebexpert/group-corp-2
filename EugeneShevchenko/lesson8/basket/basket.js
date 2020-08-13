'use strict'

class Goods {
    constructor(options) {
        this.item = options.item
        this.maker = options.maker
        this.price = options.price
        this.currency = options.currency
        this.lot = options.lot
    }
    countProductPrice(par) {
        return par = this.price * this.lot;
    }
}

class Basket {
    constructor(...lots) {
        this.lots = lots
    }
    countBasketPrice() {
        let sum = 0
        for(let i = 0; i < this.lots.length; i++) {
            sum += this.lots[i].countProductPrice()
        }
        return sum
    }
    render() {
        let divCatalog = document.querySelector('#catalog')
        let divContent = document.createElement('div')
        let divProductForm = document.createElement('div')
        let h1 = document.createElement('h1')
        let h2 = document.createElement('h2')
        let h3 = document.createElement('h3')

        divContent.classList.add('content')
        h1.textContent = 'Корзина'
        divProductForm.classList.add('product-form')
        h2.classList.add('product-title')
        if(monitor.item == undefined || graphics.item == undefined) {
            h2.textContent = 'В корзине нет товаров'
        } else {
            h3.classList.add('product-total')
            h2.textContent = monitor.item + ' ' + graphics.item
            h3.textContent = `итого: ${basket.countBasketPrice()}`
        }

        divProductForm.appendChild(h2)
        divProductForm.appendChild(h3)
        divContent.appendChild(h1)
        divContent.appendChild(divProductForm)
        divCatalog.appendChild(divContent)
    }
}

const monitor = new Goods({
    item: 'монитор',
    maker: 'LG',
    price: 15000,
    currency: 'RUB',
    lot: 3,
})
const graphics = new Goods({
    item: 'видеокарта',
    maker: 'nvidia',
    price: 80000,
    currency: 'RUB',
    lot: 1,
})
// const monitor = new Goods({})    // --- если
// const graphics = new Goods({})   // --- товаров нет
let basket = new Basket(monitor, graphics)

basket.render()