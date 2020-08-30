function loadProducts(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onreadystatechange = function(){
            if (xhr.readyState === XMLHttpRequest.DONE){
                if(xhr.status !== 200){
                    reject(xhr.status);
                }
                const dbObject = JSON.parse(xhr.responseText);
                resolve(dbObject);
            }
        };
        xhr.send();
    });
}


loadProducts('/catalog')
      .then((catalogDB) => {

            const arrCatalog = [];

            catalogDB.forEach( (element) => {
                  const catalogItem = new Product(element.name, element.price, element.quantity, element.imgs);
                  arrCatalog.push(catalogItem);
            });

            const catalog = new Catalog(arrCatalog);

            document.querySelector('.catalog-container').appendChild(catalog.render());
            const hr = document.createElement('hr');
            document.querySelector('.catalog-container').appendChild(hr);

            // Сделала через замыкание, т.к. нужен был доступ сразу к переменной catalog(catalog.init(basket)) и 
            // к данным корзины, поэтому написать просто return loadProducts('/catalog') не получилось
            return loadProducts('/basket').then((basketDB)=> {

                  const arrBasket = [];

                  basketDB.forEach( (element) => {
                        const basketItem = new ProductInBasket(element.name, element.price, element.quantity, element.imgs);
                        arrBasket.push(basketItem);
                  });
                  

                  const basket = new Basket(arrBasket);
                  catalog.init(basket);
                  document.querySelector('.basket-container').appendChild(basket.render());
            });
      },(status) => {
          console.log(status);
      });
