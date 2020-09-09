let productList = []

async function getProducts() {
    const data = await fetch('/products', {
        method: 'GET',
    });

    productList = await data.json()
}

async function getCartProducts() {
    const data = await fetch('/cart', {
        method: 'GET',
    })
    return data.json()
}

async function addProduct(product) {
    const data = await fetch('/cart', {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
            'Content-type': 'application/json',
        },
    })
}

async function addCount(product, count) {
    const data = await fetch(`/cart/${product.id}`, {
        method: 'PATCH',
        body: JSON.stringify({count: count}),
        headers: {
            'Content-type': 'application/json',
        },
    })
}

async function resetCart() {
    const data = await fetch('/cart/1', {
        method: 'DELETE'
    })
   const data1 = await fetch('/cart/2', {
        method: 'DELETE'
    })
    const data2 = await fetch('/cart/3', {
        method: 'DELETE'
    })
    const data3 = await fetch('/cart/4', {
        method: 'DELETE'
    })
}

async function deleteProduct(product) {
    const data = await fetch(`/cart/${product.id}`, {
        method: 'DELETE',
    })
}

getProducts()

