//ES6
class ProductItem {
    constructor(name, price, quantity){
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this._product = null;
    }

    showProduct(){
        return `Название ${this.name} Цена ${this.price}руб. Количество ${this.quantity}`;
    }

    render(){
        this._product = document.createElement('div');
        this._product.classList.add('prd');
        const prdText = document.createElement('p');
        prdText.className = 'item';
        prdText.innerHTML = this.showProduct();
        this._product.appendChild(prdText);

        return this._product;
    }
}

class Product extends ProductItem {
    constructor (name, price, quantity, imgs){
        super(name, price, quantity); //Вызов конструктора родителя
        this.imgs = imgs;
    }

    render(){
        super.render();

        const imgDiv = document.createElement('div');
        imgDiv.classList.add('images');
        this._product.appendChild(imgDiv);
    
        for(let i = 0; i < this.imgs.length; i++){
            const img = document.createElement('img');
            img.setAttribute("src", this.imgs[i]);
            img.setAttribute("width", "50");
            img.setAttribute("height", "50");
            imgDiv.appendChild(img);
        }
        return this._product;
    }
}

class Catalog  {
    constructor(productList){
        this.productList = productList;
        this.catalog = document.createElement('div');
    }

    init(basket){
        this.basket = basket;
    }

    render(){

        for(let i = 0; i <this.productList.length; i++){
            if(this.productList[i] instanceof Product){
                this.catalog.appendChild(this.productList[i].render());
                const btn = document.createElement('button');
                btn.className = 'btn btn-primary addBasket';
                btn.setAttribute('id', i);
                // Добавить событие на кнопку
                
                btn.innerHTML = 'Добавить в корзину';
                btn.addEventListener('click', (event) => {

                    this.basket.add(this.productList[event.target.id]);
                    this.basket.clearRender();
                    this.basket.render();

                });
                this.productList[i]._product.appendChild(btn);
                
            }
        }
        return this.catalog;
    }
}

class ProductInBasket extends Product {
    constructor (name, price, quantity, imgs){
        super(name, price, quantity, imgs); //Вызов конструктора родителя
    }

    render(){
        super.render();
        return this._product;
    }
    // Изменение количества добавленного продукта
    changeQuality(){}
}

class Basket  {
    constructor(basketList){
        this.basketList = basketList;
        this.basket = document.createElement('div');
        this.address = '';
        this.comment = '';
    }

    init(renderForm){
        this.renderForm = renderForm;
    }

    countBasketPrice(){
        let sum = 0;
        for (let i = 0; i < this.basketList.length; i++){
            sum += this.basketList[i].price * this.basketList[i].quantity;
        }
        return sum;
    }

    add(product){
        if(product instanceof Product){
            let indexFind = this.findName(product.name);
            if(indexFind > -1){
                this.basketList[indexFind].quantity +=1;
            } else {
                const newProduct = new ProductInBasket(product.name, product.price, product.quantity, product.imgs);
                this.basketList.push(newProduct);
            }  
        } else { 
            console.log('Товар не может быть вставлен');
        }
    }

    delete(idProduct){
        if(idProduct>=0 && idProduct < this.basketList.length){
            // Удаляет продукт из корзины
            this.basketList.splice(idProduct, 1);
        } else {
            console.log('Удалить нельзя - неверный индекс');
        }
    }

    clear(){
        this.basketList.length = 0;
        this.address = '';
        this.comment = '';
    }

    findName(productName){
        let indexFind = -1;
        [...this.basketList].forEach( (element, index) => {
            // Если есть уже это продукт, то меняем количество
            if(productName === element.name){
                indexFind = index;
            }
        })
        return indexFind;
    }

    allQuantity(){
        let sum = 0;
        [...this.basketList].forEach((element)=>{
            sum += element.quantity;
        })
        return sum;
    }

    clearRender(){
        const div = document.querySelector('.basket-items');
        div.innerHTML = '';
    }

    expAddress(address){
        // Формат адреса Город(пробел)Улица(пробел)Номер дома
        let regAddress = /^[a-z\-]+[ ][a-z\-]+[ ]\d{1,3}/i;
        console.log(regAddress.test(address));
        if(regAddress.test(address)){
            return true;
        }

        return false;
    }

    expName(name){
        // Имя содержит только буквы
        let regName = /^[a-z]+$/i;
        console.log(regName.test(name));
        if(regName.test(name)){
            return true;
        }

        return false;
    }

    expPhone(phone){
        // Телефон имеет вид +7(000)000-0000.
        let regPhone = /^\+7\(\d{3}\)\d{3}\-\d{4}$/i;
        console.log(regPhone.test(phone));
        if(regPhone.test(phone)){
            return true;
        }

        return false;
    }

    expEmail(email){
        // Имя содержит только буквы
        let regEmail = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z]{2,6})$/i;
        console.log(regEmail.test(email));
        if(regEmail.test(email)){
            return true;
        }

        return false;
    }



    render(){
        this.basket.className = 'basket-items';

        if(this.basketList.length){
            [...this.basketList].forEach((element,index) => {
                if(element instanceof ProductInBasket){
                    this.basket.appendChild(element.render());
                    const btn = document.createElement('button');
                    btn.className = 'btn btn-danger';
                    btn.id = index;
                    // Добавить событие на кнопку
                    btn.innerHTML = 'Удалить из корзины';
                    btn.addEventListener('click', (event) => {
                        this.delete(event.target.id);
                        this.clearRender();
                        this.render();
                    });
                    element._product.appendChild(btn);
                }
            });

            const p = document.createElement('p');
            p.className = 'sumBasket';
            p.innerHTML = `В корзине ${this.allQuantity()} товара на сумму ${this.countBasketPrice()}`;
            this.basket.appendChild(p);

            const basketBtn = document.createElement('button');
            basketBtn.className='btn btn-warning nextBasket';
            basketBtn.innerHTML='Далее';
            this.basket.appendChild(basketBtn);
        } else {
            const p = document.createElement('p');
            p.className = 'basketEmpty';
            p.innerHTML = `Корзина пуста`;
            this.basket.appendChild(p);
        }
        
        return this.basket;
    }

    
}

// Обработчики на кнопки
