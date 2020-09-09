function loadGoods(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onreadystatechange = function(){
            if (xhr.readyState === XMLHttpRequest.DONE){
                if(xhr.status !== 200){
                    reject(xhr.status);
                }
                const item = JSON.parse(xhr.responseText);
                resolve(item);
            }
        };
        xhr.send();
    });
}

//изменяем кол-во товара в каталоге
changeNumOfGoods = async (url, newNum) => {
    const data = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify({num: newNum}),
        headers: {
            'Content-type': 'application/json',
        },
    });
}

//получаем товары добавленные в корзину
getGoodsFromBasket = async (url) => {
    return (await fetch(url)).json();
}

//изменения связанные с товаром, добавленным в корзину (POST, PATCH, DELETE)
changeGoodsInBasket = async (url, product, i, method) => {
    let imagesLinks;
    let images;

    if(method !== 'DELETE'){
        images = product.img;
    }else{
        images = '';
    }

    if(product instanceof Product){
        imagesLinks = product.img.src.split('/');
        images = `${imagesLinks[imagesLinks.length - 2]}\/${imagesLinks[imagesLinks.length - 1]}`;
    }
    const data = await fetch(url, {
        method: method,
        body: JSON.stringify({
            id: i,
            img: images,
            name: product.name,
            price: product.price,
            num: product.num
        }),
        headers: {
            'Content-type': 'application/json',
        },
    });
}