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
                btn.className = 'btn btn-primary';
                btn.setAttribute('id', i);
                console.log(`${this.basket} из рендера`);
                // Добавить событие на кнопку
                
                // this.basket.add(this.productList[event.target.id]);
                // this.basket.render();
                btn.innerHTML = 'Добавить в корзину';
                // btn.addEventListener('click', function(event){
                //     this.basket.add(this.productList[event.target.id]);
                //     // document.getElementById('basket').innerHTML = '';
                //     this.basket.render();
                // });
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
    }

    

    countBasketPrice(){
        let sum = 0;
        for (let i = 0; i < this.basketList.length; i++){
            sum += this.basketList[i].price * this.basketList[i].quantity;
        }
        return sum;
    }

    add(product){
        if (product instanceof ProductInBasket) {
            this.basketList.push(product);
        } else { 
            console.log('Товар не может быть вставлен');
        }
        
    }

    findName(productName){
        for(let i = 0; i < this.length(); i++){
            if(this.showNameProduct(i) === productName){
                return i;
            }
        }
        return -1;
    }

    length(){
        return this.basketList.length;
    }

    showNameProduct(index){
        if(index>=0 && index < this.length()){
            return this.basketList[index].name;
        }
        return -1;
    }

    changeQuality(index){
        this.basketList[index].quantity += 1;
    }

    render(){
        [...this.basketList].forEach(element => {
            if(element instanceof ProductInBasket){
                this.basket.appendChild(element.render());
                const btn = document.createElement('button');
                btn.className = 'btn btn-danger';
                // Добавить событие на кнопку
                btn.innerHTML = 'Удалить из корзины';
                element._product.appendChild(btn);
            }
        });

        const p = document.createElement('p');
        p.className = 'sumBasket';
        p.innerHTML = `Суммарная стоимость всех товаров в корзине: ${this.countBasketPrice()}`;
        this.basket.appendChild(p);

        return this.basket;
    }

    
}