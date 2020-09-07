function sendRequest(url){
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.onreadystatechange = function(){
            if(xhr.readyState === XMLHttpRequest.DONE){
                if(xhr.status !== 200){
                    reject(xhr.status)
                }
                const users = JSON.parse(xhr.responseText)
                resolve(users)
            }
        }
        xhr.send()
    })
}

let productList = []

sendRequest('/products').then((products) => {
        products.forEach((product) => {
            productList.push(product)
        })
    },
    (status) => {
        console.log('Error', 'Status code:', status)
    }
)
