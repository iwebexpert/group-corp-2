class Product {
    constructor(title, price, count) {
        this.title = title
        this.price = price
        this.count = count
    }
    getAllPrice() {
        return this.price * this.count
    }
}

class Basket {
    constructor(arr) {
        this.arr = arr
    }
    getBasketPrice() {
        let basketPrice = 0
        for(let i = 0; i < this.arr.length; i++) {
            basketPrice += this.arr[i].getAllPrice()
        }
        return basketPrice
    }
}

let product1 = new Product('mouse', 1000, 1)
let product2 = new Product('monitor', 20000, 3)

let basket = new Basket([product1, product2])

console.log(`all: ${basket.getBasketPrice()}`)

class MainBinding {
    constructor(element) {
        this.listElement = element
    }
    addHeader() {
        const myApp = document.getElementById('basketApp')
        const header = document.createElement('header')
        const div = document.createElement('div')
        div.classList.add('overlay')
        const nav = document.createElement('nav')
        const h2 = document.createElement('h2')
        h2.textContent = 'магазин'

        nav.appendChild(h2)
        div.appendChild(nav)
        header.appendChild(div)
        myApp.appendChild(header)
    }
    addContainer() {
        const myApp = document.getElementById('basketApp')
        const div = document.createElement('div')
        div.classList.add('container')

        myApp.appendChild(div)
    }
}