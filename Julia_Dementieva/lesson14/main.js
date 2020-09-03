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
                  const renderForm = new RenderForm();
                  renderForm.init(basket);
                  renderForm.renderAddressComment();
                  renderForm.switchForm(true,false,false);

                  document.querySelector('.wrapper').addEventListener('click',(event) =>{
                    if(event.target.classList.contains('nextBasket')){
                      renderForm.activeAddress = true;
                      renderForm.switchForm(true,true,false);
                    } else if (event.target.classList.contains('nextAddress')){
                        const inputName = document.querySelector('.inputName');
                        const inputPhone = document.querySelector('.inputPhone');
                        const inputEmail = document.querySelector('.inputEmail');
                        const inputAddress = document.querySelector('.inputAddress');

                        // Вся проверка в методе, в нем же и отрисовка подсказок в случае ошибки
                        if(renderForm.validContact(inputName,inputPhone,inputEmail,inputAddress)){
                          renderForm.activeComment = true;
                          renderForm.switchForm(true,true,true);

                        } else {
                          alert(renderForm.getErr());
                          renderForm.clearErr();

                        }
                            
                        
                    } else if (event.target.classList.contains('orderExec')){
                        alert('Заказ выполнен');
                        renderForm.switchForm(true,false,false);
                        renderForm.allOpen = false;
                        basket.clear();
                    } 


                     
                  });

                  
                  

                  
            });
      },(status) => {
          console.log(status);
      });
