
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
    getSum() {
        let sum = 0
        this.products.forEach(item =>
            sum += item.price * item.count)
        return sum
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


let cart = document.querySelector('.cart')
let products = document.querySelector('.products')

let breadBlock = document.createElement('div')
bread.className = 'item bread'

products.appendChild(breadBlock)

let milkBlock = document.createElement('div')
milk.className = 'item'

let meatBlock = document.createElement('div')
meat.className = 'item'

let chocolateBlock = document.createElement('div')
chocolate.className = 'item'

