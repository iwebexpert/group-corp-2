
class Product {
            constructor(name, price, quantity, images){
                this.setName(name);
                this.setPrice(price);
                this.setQuantity(quantity);
                this.setImages(images);


            }

            get name() {
                return this._name;
            }
            get price() {
                return this._price;
            }
            get quantity() {
                return this._quantity;
            }
            get images(){
                return this._images;
            }

            setName(name) {
                this._name = name;
            }
            setPrice(price) {
                this._price = price;
            }
            setQuantity(quantity) {
                this._quantity = quantity;
            }
            setImages(images) {
                this._images = images;
            }

            showProduct(){
                return `Название ${this._name} Цена ${this._price}руб. Количество ${this._quantity}`;
            }
            
        }

class Basket{
    constructor(productsList){
        this.setProductsList(productsList);
    }

    get productsList() {
        return this.productsList;
    }

    setProductsList(productsList){
        this._productsList = productsList;
    }

    countBasketPrice(){
        let sum = 0;
        for (let i = 0; i < this._productsList.length; i++){
            sum += this._productsList[i].price * this._productsList[i].quantity;
        }
        return sum;
    }

    add(product){
        if (product instanceof Product) {
            this._productsList.push(product);
        } else { 
            console.log('Товар не может быть вставлен');
        }
        
    }

    delete(idProduct){
        if(idProduct>=0 && idProduct < this._productsList.length){

            this._productsList[idProduct].setQuantity(1);
            // Удаляет продукт из корзины
            this._productsList.splice(idProduct, 1);
        } else {
            console.log('Удалить нельзя - неверный индекс');
        }
    }

    changeQuality(index){
        this._productsList[index].setQuantity(this._productsList[index].quantity + 1);
        return true;
    }

    showNameProduct(index){
        if(index>=0 && index < this._productsList.length){
            return this._productsList[index].name;
        }
        return -1;
    }

    showProducts(){
        for (let i = 0; i < this._productsList.length; i++){
            this._productsList[i].showProduct();
        }
    }
    showProduct(product){
        
        return this._productsList[product].showProduct();
        
    }
    show_sum(){
        return `Общая сумма: ${this.countBasketPrice()}`;
    }
    showSumProducts(){
        let qualities = 0;
        for (let i = 0; i < this._productsList.length; i++){
            qualities += this._productsList[i].quantity;
        }
        return qualities;
    }

    length(){
        return this._productsList.length;
    }
}

const catalog = document.getElementById('catalog');

let catalogPrd = 
[ 
    new Product('Table', 10000, 1,['img/table.jpg','img/table1.jpg','img/table2.jpg']),
    new Product('Armchair', 4570, 1,['img/armchair.jpg','img/armchair1.jpg','img/armchair2.jpg']),
    new Product('Chair', 1390, 1,['img/chair.jpg','img/chair1.jpg']),
    new Product('Lamp', 1600, 1,['img/lamp.jpg','img/lamp1.jpg'])
]

function showCatalog(){
    const titleCatalog = document.createElement('h2');
    titleCatalog.innerHTML =`Каталог`;
    catalog.appendChild(titleCatalog);
    

    for(let i = 0; i<catalogPrd.length; i++){
        const product = document.createElement('div');
        product.classList.add('prd');
        const prdText = document.createElement('p');
        prdText.innerHTML =`${catalogPrd[i].showProduct()}`;
        product.appendChild(prdText);

        const imgDiv = document.createElement('div');
        imgDiv.classList.add('images');
        product.appendChild(imgDiv);


        for(let imgs = 0; imgs < catalogPrd[i].images.length; imgs++){
            const img = document.createElement('img');
            img.setAttribute("src", catalogPrd[i].images[imgs]);
            img.setAttribute("width", "50");
            img.setAttribute("height", "50");
            img.className = `${i}`;
            img.setAttribute('id', `${imgs}`);
            img.addEventListener('click', function(event){

                // Не нашла, как на чистом js запустить модальное окно
                // от bootstrap
                $(document).ready(function(){
                    $("#exampleModal").modal('show');
                });

                showModal(+event.target.className, +event.target.id);
            });
            imgDiv.appendChild(img);
        }

        

        const prdBtn = document.createElement('button');
        prdBtn.className='btn btn-primary';
        prdBtn.id = `${i}`;

        prdBtn.addEventListener('click', function(event){
            let findProductIndex = findName(catalogPrd[event.target.id].name);
            if(findProductIndex>=0){
                basket1.changeQuality(findProductIndex);
            } else {
                basket1.add(catalogPrd[event.target.id]);
            }
            document.getElementById('basket').innerHTML = '';
            showBasket();
        });

        prdBtn.innerHTML =`Добавить в корзину`;
        product.appendChild(prdText);
        product.appendChild(prdBtn);
        catalog.appendChild(product);
        const hr = document.createElement('hr');
        catalog.appendChild(hr);
    }

}

let basket1 = new Basket ([]);

// Возвращает индекс продукта,если он уже есть в корзине - поиск по имени
function findName(productName){
    for(let i = 0; i < basket1.length(); i++){
        if(basket1.showNameProduct(i) === productName){
            return i;
        }
    }
    return -1;
}


function showBasket(){
    const basket = document.getElementById('basket');
    const titleBasket = document.createElement('h2');
    titleBasket.innerHTML =`Корзина`;
    basket.appendChild(titleBasket);

    
    if(basket1.length() === 0){
        const error = document.createElement('span');
        error.innerHTML =`Корзина пуста`;
        error.classList.add('error-basket');
        basket.appendChild(error);
        document.getElementsByName('sumPrice').innerHTML = '' ;
    } else {
        for (let i = 0; i < basket1.length(); i++){
            const product = document.createElement('div');
            product.classList.add('prd');
            const prdText = document.createElement('p');
            prdText.innerHTML =`${basket1.showProduct(i)}`;
            product.appendChild(prdText);
            const prdBtn = document.createElement('button');
            prdBtn.className='btn btn-danger';
            prdBtn.id=`${i}`;

            // удаление продукта из корзины
            prdBtn.addEventListener('click', function(event){
                basket1.delete(event.target.id);
                document.getElementById('basket').innerHTML = '';
                showBasket();
            });
            prdBtn.innerHTML =`Удалить из корзины`;
            product.appendChild(prdText);
            product.appendChild(prdBtn);
            basket.appendChild(product);
            const hr = document.createElement('hr');
            basket.appendChild(hr);
        }
        const sumPrice = document.createElement('span');
        sumPrice.classList.add('sumPrice');
        sumPrice.innerHTML =`В корзине: ${basket1.showSumProducts()} товара на сумму 
        ${basket1.countBasketPrice()} рублей`;
        basket.appendChild(sumPrice);
    }
}


//Структура модального окна - bootstrap
// index - product, id - img active
function showModal(index, id){

    const cont = document.querySelector('.container');
    const modFad = document.createElement('div');
    modFad.className = 'modal fade';
    modFad.setAttribute('id', 'exampleModal');
    cont.appendChild(modFad);

    const modDial = document.createElement('div');
    modDial.className = 'modal-dialog modal-dialog-centered';
    modFad.appendChild(modDial);

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modDial.appendChild(modalContent);

    const carSlide = document.createElement('div');
    carSlide.className = 'carousel slide';
    carSlide.setAttribute('id', 'carouselExampleControls');
    carSlide.setAttribute('data-ride', 'carousel');
    modalContent.appendChild(carSlide);

    const carInner = document.createElement('div');
    carInner.className = 'carousel-inner';
    carSlide.appendChild(carInner);

    const aPref = document.createElement('a');
    aPref.className = 'carousel-control-prev';
    aPref.setAttribute('href', '#carouselExampleControls');
    aPref.setAttribute('role', 'button');
    aPref.setAttribute('data-slide', 'prev');
    carSlide.appendChild(aPref);

    const prevIcon = document.createElement('span');
    prevIcon.className = 'carousel-control-prev-icon';
    prevIcon.setAttribute('aria-hidden', 'true');
    aPref.appendChild(prevIcon);


    for(let photo = 0; photo < catalogPrd[index].images.length; photo++){
        const act = document.createElement('div');
        act.className = (photo===id) ? 'carousel-item active' : 'carousel-item';
        carInner.appendChild(act);

        const img = document.createElement('img');
        img.className = 'd-block w-100';

        img.setAttribute('src', catalogPrd[index].images[photo]);
        act.appendChild(img);
    }



    const aNext = document.createElement('a');
    aNext.className = 'carousel-control-next';
    aNext.setAttribute('href', '#carouselExampleControls');
    aNext.setAttribute('role', 'button');
    aNext.setAttribute('data-slide', 'next');
    carSlide.appendChild(aNext);

    const nextIcon = document.createElement('span');
    nextIcon.className = 'carousel-control-next-icon';
    nextIcon.setAttribute('aria-hidden', 'true');
    aNext.appendChild(nextIcon);
}

// Удаляет ранее созданные div-ы с фотографиями
document.addEventListener('click', function(event){
    if(event.target.id=== 'exampleModal'){
        const mod = document.getElementById('exampleModal');
        mod.remove(mod);
    }
});

showCatalog();

showBasket();