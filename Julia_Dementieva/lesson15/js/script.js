//ES6
class ProductItem {
    constructor(id, name, price, quantity){
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this._product = null;
    }

    showProduct(){
        return `Название ${this.name} Цена ${this.price}руб. В наличии: ${this.quantity}`;
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
    constructor (id, name, price, quantity, imgs){
        super(id, name, price, quantity); //Вызов конструктора родителя
        this.imgs = imgs;
    }

    reducNumber(number){
        if(this.quantity >= number){
            this.quantity -= number;
            return true;
        } 
        return false;
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
        this.catalog = document.querySelector('.catalog');
    }

    init(basket){
        this.basket = basket;
    }
    // id продукта и кол-во продукции, на которое изменилось
    changePrdQuan(idProduct, changeQuantity){
        this.productList.forEach( (element, index) => {
            if(idProduct == element.id){
                changeQuan(`/catalog/${element.id}`, element.quantity + changeQuantity);
                element.quantity += changeQuantity;
                
            }
        })

    }

    findID(idProduct){
        let indexFind = -1;
        this.productList.forEach( (element, index) => {
            if(idProduct == element.id){
                indexFind = index;            
            }
        })
        return indexFind;
    }

    findName(productName){
        let indexFind = -1;
        [...this.productList].forEach( (element, index) => {
            if(productName === element.name){
                indexFind = index;
            }
        })
        return indexFind;
    }

    render(){

        for(let i = 0; i <this.productList.length; i++){
            if(this.productList[i] instanceof Product){
                this.catalog.appendChild(this.productList[i].render());
                const block = document.createElement('div');
                block.classList = 'containerInpAndBlock';
                const quanCatInput = document.createElement('input');
                quanCatInput.setAttribute('type', 'text');
                quanCatInput.setAttribute('id', `quanCatInput${i}`);
                quanCatInput.setAttribute('value', '0');
                quanCatInput.className = "form-control quanCatInput";
                block.appendChild(quanCatInput);
            
                const btn = document.createElement('button');
                btn.className = 'btn btn-primary addBasket';
                btn.setAttribute('id', i);
                btn.innerHTML = 'Добавить в корзину';
                block.appendChild(btn);

                this.productList[i]._product.appendChild(block);
                
            }
        }
        return this.catalog;
    }

    clearRender(){
        document.querySelector('.catalog').innerHTML = '';
    }
}

class ProductInBasket extends Product {
    constructor (id,name, price, quantity, imgs){
        super(id, name, price, quantity, imgs); //Вызов конструктора родителя
    }


    render(){
        super.render();
        return this._product;
    }
    
    showProduct(){
        return `Название ${this.name} Цена ${this.price}руб. Количество: ${this.quantity}`;
    }
}

class Basket  {
    constructor(basketList){
        this.basketList = basketList;
        this.basket = document.createElement('div');
        this.name = '';
        this.phone = '';
        this.email = '';
        this.address = '';
        this.comment = '';
    }

    init(renderForm, catalog){
        this.renderForm = renderForm;
        this.catalog = catalog;
    }

    countBasketPrice(){
        let sum = 0;
        for (let i = 0; i < this.basketList.length; i++){
            sum += this.basketList[i].price * this.basketList[i].quantity;
        }
        return sum;
    }

    add(product, quantity){
        if(product instanceof Product && product.reducNumber(+quantity)){
            let indexFind = this.findName(product.name);
            if(indexFind > -1){
                
                this.basketList[indexFind].quantity += +quantity;
                // изменение кол-ва для корзины
                changeQuan(`/basket/${product.id}`, this.basketList[indexFind].quantity);
                // изменение кол-ва для каталога
                changeQuan(`/catalog/${product.id}`, product.quantity);
                
            } else {
                const newProduct = new ProductInBasket(product.id, product.name, product.price, +quantity, product.imgs);
                this.basketList.push(newProduct);

                addPrdInBasket(newProduct);
                changeQuan(`/catalog/${product.id}`, product.quantity);
            } 
            return true;

        } else { 
            console.log('Товар не может быть вставлен');
            return false;
        }
    }

    delete(idProduct){
        if(idProduct>=0 && idProduct < this.basketList.length){
            this.catalog.changePrdQuan(this.basketList[idProduct].id, this.basketList[idProduct].quantity);
            
            deleteProduct(this.basketList[idProduct].id);

            // Удаляет продукт из корзины
            this.basketList.splice(idProduct, 1);
        } else {
            console.log('Удалить нельзя - неверный индекс');
        }
    }

    clear(){
        this.basketList.forEach( (index) => {
            deleteProduct(index.id);
        });
        this.basketList.length = 0;
        
        this.name = '';
        this.phone = '';
        this.email = '';
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
    // ищет по ID индекс в массиве
    findID(productID){
        let indexFind = -1;
        [...this.basketList].forEach( (element, index) => {
            if(productID === element.id){
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

    expCheck(type, value){
        let regExp = '';
        switch(type){
            case 'name':
            regExp = /^[a-z]+$/i;
            break;

            case 'phone':
            regExp = /^\+7\(\d{3}\)\d{3}\-\d{4}$/i;
            break;

            case 'email':
            regExp = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z]{2,6})$/i;
            break;

            case 'address':
            regExp = /^[a-z\-]+ [a-z\-]+ \d{1,3}$/i;
            break;

            default:
            throw new Error('Передан неверный тип');
        }

        if(regExp.test(value)){
            return true;
        }
        return false;
    }

    length(){
        return this.basketList.length;
    }

    showProduct(prodBask){ 
        return this.basketList[prodBask].showProduct();
    }



    render(){
        this.basket.className = 'basket-items';
        const p = document.createElement('p');

        if(this.basketList.length){
            [...this.basketList].forEach((element,index) => {
                if(element instanceof ProductInBasket){
                    this.basket.appendChild(element.render());
                    const btn = document.createElement('button');
                    btn.className = 'btn btn-danger deleteProduct';
                    btn.id = index;
                    // Добавить событие на кнопку
                    btn.innerHTML = 'Удалить из корзины';
                    
                    element._product.appendChild(btn);
                }
            });

            
            p.className = 'sumBasket';
            p.innerHTML = `В корзине ${this.allQuantity()} товара на сумму ${this.countBasketPrice()}`;
            this.basket.appendChild(p);

            const basketBtn = document.createElement('button');
            basketBtn.className='btn btn-warning nextBasket';
            basketBtn.innerHTML='Далее';
            this.basket.appendChild(basketBtn);
        } else {
            p.className = 'basketEmpty';
            p.innerHTML = `Корзина пуста`;
            this.basket.appendChild(p);
        }
        
        return this.basket;
    }

    
}

