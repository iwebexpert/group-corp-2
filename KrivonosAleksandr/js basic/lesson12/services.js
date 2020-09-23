function loadGoods(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onreadystatechange = function(){
            if (xhr.readyState === XMLHttpRequest.DONE){
                if(xhr.status !== 200){
                    reject(xhr.status);
                }
                const goods = JSON.parse(xhr.responseText);
                resolve(goods);
            }
        };
        xhr.send();
    });
}

