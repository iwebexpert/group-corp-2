
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
    constructor(productsList, address, comment){
        this.setProductsList(productsList);
        this.setAddress(address);
        this.setComment(comment);
    }

    get productsList() {
        return this._productsList;
    }

    get address() {
        return this._address;
    }

    get comment() {
        return this._comment;
    }

    setProductsList(productsList){
        this._productsList = productsList;
    }
    setAddress(address){
        this._address = address;
    }
    setComment(comment){
        this._comment = comment;
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

    clear(){
        this._productsList.length = 0;
        this._address = '';
        this._comment = '';
    }
    // Возвращает индекс продукта,если он уже есть в корзине - поиск по имени
    findName(productName){
        for(let i = 0; i < basket1.length(); i++){
            if(basket1.showNameProduct(i) === productName){
                return i;
            }
        }
        return -1;
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
            let findProductIndex = basket1.findName(catalogPrd[event.target.id].name);
            if(findProductIndex>=0){
                basket1.changeQuality(findProductIndex);
            } else {
                basket1.add(_.cloneDeep(catalogPrd[event.target.id]));
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

let basket1 = new Basket ([], '', '');



function showBasket(){
    // Отрисовка заголовков
    const headingOne = document.getElementById('headingOne');

    const oneH5 = headingOne.querySelector('.mb-0');
    const basketBtn1 = oneH5.querySelector('.btn');

    basketBtn1.innerHTML =`Корзина`;

    const headingTwo = document.getElementById('headingTwo');

    const twoH5 = headingTwo.querySelector('.mb-0');
    const basketBtn2 = twoH5.querySelector('.btn');

    basketBtn2.innerHTML =`Адрес доставки`;

    const headingThree = document.getElementById('headingThree');

    const threeH5 = headingThree.querySelector('.mb-0');
    const basketBtn3 = threeH5.querySelector('.btn');

    basketBtn3.innerHTML =`Комментарий к доставке`;
    

    const basket = document.getElementById('basket');
    

    
    if(basket1.length() === 0){
        const error = document.createElement('p');
        error.innerHTML =`Корзина пуста`;
        error.classList.add('error-basket');
        basket.appendChild(error);
        document.getElementsByName('sumPrice').innerHTML = '' ;
        disaBtn();
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
        const sumPrice = document.createElement('p');
        sumPrice.classList.add('sumPrice');
        sumPrice.innerHTML =`В корзине: ${basket1.showSumProducts()} товара на сумму 
        ${basket1.countBasketPrice()} рублей`;
        basket.appendChild(sumPrice);
        const basketBtn = document.createElement('button');
        basketBtn.className='btn btn-warning';
        basketBtn.innerHTML='Далее';
        basketBtn.addEventListener('click', function(){
            switchBasketAddress();
        });
        basket.appendChild(basketBtn);
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

    const ui = document.querySelector('#exampleModal');


    


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

// Удаляет ранее созданные div-ы с фотографиями в каталоге
document.addEventListener('click', function(event){
    if(event.target.id === 'exampleModal'){
        const mod = document.getElementById('exampleModal');
        mod.remove(mod);
    }
});



// Были ли раньше переходы
let switchTo = {
    basketAddress: false,
    addressComment: false,
};

// Функция - переход из корзины в адрес доставки
function switchBasketAddress(){
    // Меняю классы от bootstrap
    // Активируем кнопку Адрес
    document.querySelector('[data-target="#collapseTwo"]').disabled = false;
    const headingOne = document.querySelector('#headingOne');
    headingOne.querySelector('button');
    headingOne.classList.add('collapsed');
    headingOne.setAttribute('aria-expanded', 'false');

    const collapseOne = document.querySelector('#collapseOne');
    collapseOne.classList.toggle('show');

    const headingTwo = document.querySelector('#headingTwo');
    headingTwo.querySelector('button');
    headingTwo.classList.toggle('collapsed');
    headingTwo.setAttribute('aria-expanded', 'true');

    const collapseTwo = document.querySelector('#collapseTwo');
    collapseTwo.classList.toggle('show');

    // Если переход уже был, тогда просто переходим в раздел,
    // если не было - отрисовка
    if(!switchTo.basketAddress){
        // Отрисовка блока с адресом
        showAddress();
        switchTo.basketAddress = true;
    } 

}

function showAddress(){

    const address = document.getElementById('address');
    const input = document.createElement('input');
    // bootstrap
    input.className = 'form-control form-control-lg';
    input.type = 'text';
    input.placeholder = 'Введите адрес доставки';
    address.appendChild(input);

    const addressBtn = document.createElement('button');
    addressBtn.className='btn btn-warning';
    addressBtn.innerHTML='Далее';
    addressBtn.addEventListener('click', function(){
        if(input.value.length > 8){
            switchAddressComment();
            basket1.setAddress(input.value);
            console.log(basket1);
        } else {
            alert('Введите адрес доставки');
        }
       
    });
    address.appendChild(addressBtn);
}

// Функция - переход из адреса доставки в комментарии
function switchAddressComment(){

    // Активируем кнопку Комментарий
    document.querySelector('[data-target="#collapseThree"]').disabled = false;
    const headingTwo = document.querySelector('#headingTwo');
    headingTwo.querySelector('button');
    headingTwo.classList.add('collapsed');
    headingTwo.setAttribute('aria-expanded', 'false');

    const collapseTwo = document.querySelector('#collapseTwo');
    collapseTwo.classList.toggle('show');

    const headingThree = document.querySelector('#headingThree');
    headingThree.querySelector('button');
    headingThree.classList.toggle('collapsed');
    headingThree.setAttribute('aria-expanded', 'true');

    const collapseThree = document.querySelector('#collapseThree');
    collapseThree.classList.toggle('show');

    // Если переход уже был, тогда просто переходим в раздел,
    // если не было - отрисовка
    if(!switchTo.addressComment){
        // Отрисовка блока с комментариями
        showComment();
        switchTo.addressComment = true;
    } 

}

function showComment(){

    const comment = document.getElementById('comment');
    const textarea = document.createElement('textarea');
    // bootstrap
    textarea.className = 'form-control';
    textarea.placeholder = 'Ваш комментарий';
    comment.appendChild(textarea);

    const commentBtn = document.createElement('button');
    commentBtn.className='btn btn-success';
    commentBtn.innerHTML='Оформить заказ';
    commentBtn.addEventListener('click', function(){
        basket1.setComment(textarea.value);
        showConfirm();
    });
    comment.appendChild(commentBtn);
}


let isConfirm = 0;

function showConfirm(){
    //Количество вызова этой функции, если она уже была вызвана,значит события на кнопки создавать не надо
    isConfirm++;

    const dialog = document.querySelector('.shadowDialog');
    dialog.style.display ='block';

    const detailInfoStyle = document.querySelector('.detailInfoStyle');

    for(let i = 0; i < basket1.length(); i++){
        const p = document.createElement('p');
        p.innerHTML = basket1.showProduct(i);
        detailInfoStyle.appendChild(p);
    }

    const sumBasket = document.querySelector('.sumBasketInfo');
    sumBasket.innerHTML = `В корзине: ${basket1.showSumProducts()} товара на сумму 
        ${basket1.countBasketPrice()} рублей`;

    if(basket1.address){
        const address = document.querySelector('.addressDetailInfo');
        address.innerHTML = `${basket1.address}`;
    }

    if(basket1.comment){
        const comment = document.querySelector('.commentDetailInfo');
        comment.innerHTML = `${basket1.comment}`;
    }

    //События на кнопки - создаются, если функцию showConfirm вызывают первый раз
    if(isConfirm === 1){
        const btnYes = document.querySelector('.btn-info');
        btnYes.addEventListener('click', function(){
            dialog.style.display ='none';
            basket1.clear();
            document.getElementById('basket').innerHTML = '';

            detailInfoStyle.innerHTML = '';
            sumBasket.innerHTML = '';
            document.querySelector('.addressDetailInfo').innerHTML = '';
            document.querySelector('.commentDetailInfo').innerHTML = '';
            switchCommentBasket();
            showBasket();
            alert('Спасибо за заказ!');

        });

        const btnNo = document.querySelector('.btn-secondary');
        btnNo.addEventListener('click', function(){
            dialog.style.display ='none';
            detailInfoStyle.innerHTML = '';
            sumBasket.innerHTML = '';
            document.querySelector('.addressDetailInfo').innerHTML = '';
            document.querySelector('.commentDetailInfo').innerHTML = '';
        });
        }
    
}

// Функция - после того, как заказ сделан, автоматом переход в корзину
function switchCommentBasket(){

    const headingThree = document.querySelector('#headingThree');
    headingThree.querySelector('button');
    headingThree.classList.add('collapsed');
    headingThree.setAttribute('aria-expanded', 'false');

    const collapseThree = document.querySelector('#collapseThree');
    collapseThree.classList.toggle('show');

    const headingOne = document.querySelector('#headingOne');
    headingOne.querySelector('button');
    headingOne.classList.toggle('collapsed');
    headingOne.setAttribute('aria-expanded', 'true');

    const collapseOne = document.querySelector('#collapseOne');
    collapseOne.classList.toggle('show');

    document.querySelector('input').value = '';
    document.querySelector('textarea').value = '';

    console.log(document.querySelector('input'));


    disaBtn();

}




function disaBtn(){
    document.querySelector('[data-target="#collapseTwo"]').disabled = true;
    document.querySelector('[data-target="#collapseThree"]').disabled = true;
}

// Сначала кнопки Адрес и Комментарии заблокированы
disaBtn();

showCatalog();

showBasket();


// Событие на нажатие клавиш

document.addEventListener('keydown', function(event){
    switch(event.key){
        case 'ArrowLeft':
            console.log('left');
            document.querySelector('.carousel-control-prev').click();
            break;
        case 'ArrowRight':
            console.log('right');
            document.querySelector('.carousel-control-next').click();
            break;
    }
});