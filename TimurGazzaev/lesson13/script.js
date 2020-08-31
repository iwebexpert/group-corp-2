
/* 1. Реализовать страницу корзины:
        - Добавить возможность не только смотреть состав корзины, но и редактировать его, обновляя общую стоимость или выводя сообщение «Корзина пуста».
   2. На странице корзины:
        - Сделать отдельные блоки «Состав корзины», «Адрес доставки», «Комментарий»;
        - Сделать эти поля сворачиваемыми;
        - Заполнять поля по очереди, то есть давать посмотреть состав корзины, внизу которого есть кнопка «Далее». Если нажать ее, сворачивается «Состав корзины» и открывается «Адрес доставки» и так далее.
*/

setTimeout(() => {

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
            this.address = ''
            this.comment = ''
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
        setAddress(address) {
            this.address = address
        }
        setComment(comment) {
            this.comment = comment
        }
    }

    let bread = new Product(productList[0].id, productList[0].name, productList[0].price, productList[0].currency,)
    let milk = new Product(productList[1].id, productList[1].name, productList[1].price, productList[1].currency,)
    let meat = new Product(productList[2].id, productList[2].name, productList[2].price, productList[2].currency,)
    let chocolate = new Product(productList[3].id, productList[3].name, productList[3].price, productList[3].currency,)

    console.log(productList[0].id, productList[0].name, productList[0].price, productList[0].currency)

    let cart1 = new Cart()

    let nav = document.querySelector('.nav')
    let prev = document.querySelector('.prev')
    let next = document.querySelector('.next')
    let order = document.querySelector('.order')
    let cart = document.querySelector('.cart')
    let address = document.querySelector('.address')
    let comment = document.querySelector('.comment')
    let products = document.querySelector('.products')
    let emptyCart = document.createElement('h2')

    prev.className = 'buttonHidden'
    order.className = 'buttonHidden'

    emptyCart.textContent = 'Your cart is empty'
    cart.appendChild(emptyCart)

    let addressTitle = document.createElement('h2')
    addressTitle.textContent = 'Enter your address'

    let addressInput = document.createElement('input')
    addressInput.className = 'addressInput'
    addressInput.placeholder = 'Your address'

    address.appendChild(addressTitle)
    address.appendChild(addressInput)

    let commentTitle = document.createElement('h2')
    commentTitle.textContent = 'Enter your comment'

    let commentInput = document.createElement('input')
    commentInput.className = 'commentInput'
    commentInput.placeholder = 'Your comment'

    comment.appendChild(commentTitle)
    comment.appendChild(commentInput)

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
    }

    function cartRemove () {
        let cartInfo = document.querySelector('.cartInfo')
        let sum = document.querySelector('.sum')
        let next = document.querySelector('.cartNext')
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

    nav.onclick = function (event) {
        switch (event.target.className) {
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
                cart1.products.forEach( item => {
                    tmp += `       ${item.name} : ${item.price} ${item.currency} - ${item.count} pieces \n`
                })
                tmp += `ADDRESS: ${cart1.address} \n`
                tmp += `COMMENT: ${cart1.comment}`
                alert(tmp)
                break
            }
        }
    }

    addressInput.onchange = function (event) {
        cart1.setAddress(event.target.value)
    }

    commentInput.onchange = function (event) {
        cart1.setComment(event.target.value)
    }

}, 500)
