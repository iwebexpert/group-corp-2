let productList = []

async function getProducts() {
    const data = await fetch('/products', {
        method: 'GET',
    });
    productList = await data.json()
}

function getCartProducts() {
    fetch('/cart')
        .then(response => response.json())
        .then(cart => return cart
        )
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

async function deleteProduct(product) {
    const data = await fetch(`/cart/${product.id}`, {
        method: 'DELETE',
    })
}

getProducts()





/*sendRequest('/products').forEach((product) => {
            productList.push(product)
    },
    (status) => {
        console.log('Error', 'Status code:', status)
    }
)*/



/*
btnAdd.addEventListener('click', async () => {
    const data = await fetch('/basket', {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
            'Content-type': 'application/json',
        },
    });

    console.log(data);
});*/
