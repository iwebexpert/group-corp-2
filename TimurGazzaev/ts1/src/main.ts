import './main.css' // @ts-ignore
import breadImg from './img/bread1.png' // @ts-ignore
import milkImg from './img/milk1.png' // @ts-ignore
import meatImg from './img/meat1.png' // @ts-ignore
import chocolateImg from './img/chocolate1.png' // @ts-ignore
import clearCartImg from './img/clearCart.svg' // @ts-ignore
import deleteImg from './img/delete.svg'

interface Product {
    id: number,
    name: string,
    price: number,
    currency: string,
    count: number
}

function createProduct(id: number, name: string, price: number, currency: string, count: number): Product {
    return {id, name, price, currency, count}
}

let bread: Product = createProduct(1, 'Bread', 2, 'USD', 1)
let milk: Product = createProduct(2, 'Milk', 5, 'USD', 1)
let meat: Product = createProduct(3, 'Meat', 12, 'USD', 1)
let chocolate: Product = createProduct(4, 'Chocolate', 7, 'USD', 1)

let catalog: Array<Product> = [bread, milk, meat, chocolate]

let cart1: {products: Array<Product>, address: string, comment: string} = {products: [], address: "", comment: ""}

function addProduct(product: Product): void {
    let p = false
    for (let i=0; i<cart1.products.length; i++){
        if(cart1.products[i].id === product.id){
            cart1.products[i].count ++
            p = true
        }
    }
    if (!p) {
        cart1.products.push(product)
    }
}

function deleteProduct(product: Product): void {
    if (cart1.products.find(item => item.id === product.id)) {
        cart1.products = cart1.products.filter(item => item.id !== product.id)
    }
}

function getSum(): string | null {
    let sum = 0
    cart1.products.forEach(item =>
        sum += item.price * item.count)
    return cart1.products.length ? sum + ' ' + cart1.products[0].currency : null
}

function reset(): void {
    cart1.products = []
}

function setAddress(address: string): void {
    cart1.address = address
}

function setComment(comment: string): void {
    cart1.comment = comment
}

let nav: HTMLElement | null = document.querySelector('.nav')
let prev: HTMLButtonElement | null = document.querySelector('.prev')
let next: HTMLButtonElement | null = document.querySelector('.next')
let order: HTMLButtonElement | null = document.querySelector('.order')
let cart: HTMLDivElement | null = document.querySelector('.cart')
let address: HTMLElement | null = document.querySelector('.address')
let comment: HTMLElement | null = document.querySelector('.comment')
let products: HTMLElement | null = document.querySelector('.products')
let emptyCart: HTMLElement = document.createElement('h2')

emptyCart.textContent = 'Your cart is empty'
cart && cart.appendChild(emptyCart)

let addressTitle: HTMLElement = document.createElement('h2')
addressTitle.textContent = 'Enter your address'

let addressInput: HTMLInputElement = document.createElement('input')
addressInput.className = 'addressInput'
addressInput.placeholder = 'Your address'

address && address.appendChild(addressTitle)
address && address.appendChild(addressInput)

let commentTitle: HTMLElement = document.createElement('h2')
commentTitle.textContent = 'Enter your comment'

let commentInput: HTMLInputElement = document.createElement('input')
commentInput.className = 'commentInput'
commentInput.placeholder = 'Your comment'

comment && comment.appendChild(commentTitle)
comment && comment.appendChild(commentInput)

function refreshCart(): void {
    let cartInfo: HTMLElement = document.createElement('div')
    cartInfo.className = 'cartInfo'

    cart1.products.forEach(item => {
        let cartInfoItem: HTMLElement = document.createElement('div')
        cartInfoItem.className = 'cartInfoItem'
        cartInfoItem.textContent = `${item.name} : ${item.price} ${item.currency} - ${item.count} pieces`

        let deleteIcon: HTMLImageElement = document.createElement('img')
        deleteIcon.className = `deleteIco delete-${item.name.toLowerCase()}`
        deleteIcon.src = deleteImg

        cartInfoItem.appendChild(deleteIcon)
        cartInfo.appendChild(cartInfoItem)
    })

    let sum: HTMLElement = document.createElement('h2')
    sum.className = 'sum'
    sum.textContent = 'Sum : ' + getSum()

    let clearIco: HTMLImageElement = document.createElement('img')
    clearIco.className = 'clearIco'
    clearIco.src = clearCartImg

    cart && cart.appendChild(cartInfo)
    sum.appendChild(clearIco)
    cart && cart.appendChild(sum)
}

function cartAppend(product?: Product): void {
    cart1.products.length && cartRemove()
    product && addProduct(product)
    refreshCart()
    emptyCart && emptyCart.remove()
}

function deleteItem(product: Product): void {
    cartRemove()
    deleteProduct(product)
    cart1.products.length && refreshCart()
    !cart1.products.length ? cart && cart.appendChild(emptyCart) : null
}

function cartRemove(): void {
    let cartInfo = document.querySelector('.cartInfo')
    let sum = document.querySelector('.sum')
    cartInfo && cartInfo.remove()
    sum && sum.remove()
}

function productAppend(productName: Product): void {
    let name = productName.name.toLowerCase()
    let product = document.createElement('div')
    product.className = `item ${name}`

    let productTitle: HTMLElement = document.createElement('h2')
    productTitle.textContent = productName.name
    product.appendChild(productTitle)

    let productPrice: HTMLElement = document.createElement('b')
    productPrice.textContent = productName.price + ' ' + productName.currency
    product.appendChild(productPrice)

    let productImg: HTMLImageElement = document.createElement('img')
    productImg.src = name === 'bread' ? breadImg : name === 'milk' ? milkImg :
        name === 'meat' ? meatImg : chocolateImg
    productImg.alt = name
    product.appendChild(productImg)

    let btn: HTMLButtonElement = document.createElement('button')
    btn.className = `btn btn-${name}`
    btn.textContent = 'Add to cart'
    product.appendChild(btn)

    products && products.appendChild(product)
}

catalog.forEach(item => {
    productAppend(item)
})

cart1.products.length && cartAppend()

let breadArea: HTMLElement | null = document.querySelector('.btn-bread')
let milkArea: HTMLElement | null = document.querySelector('.btn-milk')
let meatArea: HTMLElement | null = document.querySelector('.btn-meat')
let chocolateArea: HTMLElement | null = document.querySelector('.btn-chocolate')

breadArea && breadArea.addEventListener('click', (e) => cartAppend(bread))
milkArea && milkArea.addEventListener('click', (e) => cartAppend(milk))
meatArea && meatArea.addEventListener('click', (e) => cartAppend(meat))
chocolateArea && chocolateArea.addEventListener('click', (e) => cartAppend(chocolate))

cart && cart.addEventListener('click', (event: MouseEvent) => {
    switch ((event.target as Element).className) {
        case 'clearIco': {
            reset()
            cartRemove()
            cart && cart.appendChild(emptyCart)
            break
        }
        case 'deleteIco delete-milk': {
            deleteItem(milk)
            break
        }
        case 'deleteIco delete-bread': {
            deleteItem(bread)
            break
        }
        case 'deleteIco delete-meat': {
            deleteItem(meat)
            break
        }
        case 'deleteIco delete-chocolate': {
            deleteItem(chocolate)
            break
        }
    }
})

nav && nav.addEventListener('click', (event: MouseEvent) => {
    if(cart && address && comment && prev && next && order) {
        switch ((event.target as Element).className) {
            case 'next': {
                prev.className = 'addressPrev'
                next.className = 'addressNext'
                cart.classList.add('none')
                address.classList.add('block')
                break
            }
            case 'addressPrev': {
                prev.className = 'buttonHidden'
                next.className = 'next'
                cart.classList.remove('none')
                address.classList.remove('block')
                cartAppend()
                break
            }
            case 'addressNext': {
                prev.className = 'commentPrev'
                next.className = 'buttonHidden'
                order.className = 'order'
                address.classList.remove('block')
                comment.classList.add('block')
                break
            }
            case 'commentPrev': {
                prev.className = 'addressPrev'
                next.className = 'addressNext'
                order.className = 'buttonHidden'
                address.classList.add('block')
                comment.classList.remove('block')
                break
            }
            case 'order': {
                let tmp = 'ORDER LIST: \n'
                cart1.products.forEach(item => {
                    tmp += `       ${item.name} : ${item.price} ${item.currency} - ${item.count} pieces \n`
                })
                tmp += `ADDRESS: ${cart1.address} \n`
                tmp += `COMMENT: ${cart1.comment}`
                alert(tmp)
                break
            }
        }
    }
})

addressInput.addEventListener('change', (event: Event) => setAddress((<HTMLInputElement>event.target).value))
commentInput.addEventListener('change', (event: Event) => setComment((<HTMLInputElement>event.target).value))
