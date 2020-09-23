class Catalog {
    constructor() {
        this.catalog = document.querySelector('.catalog');
        this.productsInCatalog = [];
    }

    //добавление товаров в каталог
    addToCatalog(products){
        products.forEach(product => {
            this.productsInCatalog.push(product);
        });
    }

    //отрисовка каталога
    createProducts(products){
        const wrapper = document.createElement('div');
        wrapper.classList.add('catalog-wrapper');
        this.catalog.append(wrapper);

        for(let i = 0; i < products.length; i++){
            const item = document.createElement('div');
            item.classList.add('catalog-item');
            wrapper.append(item);

            const imgWrapper = document.createElement('div');
            imgWrapper.classList.add('catalog-img--wrapper');
            item.appendChild(imgWrapper);

            if(products[i].img.length > 1) {
                const left = document.createElement('div');
                left.classList.add('left');
                left.innerHTML = '&lt;';
                imgWrapper.appendChild(left);

                const right = document.createElement('div');
                right.classList.add('right');
                right.innerHTML = '&gt;';
                imgWrapper.appendChild(right);

                const imgSlider = document.createElement('div');
                imgSlider.classList.add('catalog-img--slider');
                imgWrapper.appendChild(imgSlider);

                for (let p = 0; p < products[i].img.length; p++) {
                    let image = document.createElement('img');
                    image.classList.add('catalog-img');
                    image.setAttribute("alt", "itemImage");
                    image.setAttribute("src", `${products[i].img[p]}`);
                    image.setAttribute('data-index', `${i}`);
                    image.setAttribute('data-img-index', `${p}`);
                    imgSlider.append(image);
                }
            } else {
                const imgSlider = document.createElement('div');
                imgSlider.classList.add('catalog-img--slider');
                imgWrapper.appendChild(imgSlider);

                let image = document.createElement('img');
                image.classList.add('catalog-img');
                image.setAttribute("alt", "itemImage");
                image.setAttribute("src", `${products[i].img[0]}`);
                image.setAttribute('data-index', `${i}`);
                image.setAttribute('data-img-index', `0`);
                imgSlider.append(image);
            }

            const title = document.createElement('h2');
            title.classList.add('catalog-item--name');
            title.textContent = `${products[i].name}`;
            item.append(title);

            const price = document.createElement('div');
            price.classList.add('catalog-item--price');
            price.innerHTML = `Цена: <span class="catalog-item--price--value">${products[i].price}</span>`;
            item.append(price);

            const number = document.createElement('div');
            number.classList.add('catalog-item--num');
            number.innerHTML = `В наличии: <span class="catalog-item--num--value">${products[i].num}</span>`;
            item.append(number);

            const btns = document.createElement('div');
            btns.classList.add('catalog-btns');
            btns.innerHTML = `<button class="catalog-btn--add">Add</button>
                    <button class="catalog-btn--remove">Remove</button>`;
            item.append(btns);
        }
    }

    ifCatalogEmpty(){
        const empty = document.createElement('div');
        empty.classList.add('empty');
        empty.textContent = 'К сожалению, весь товар распродан...';
        this.catalog.append(empty);
    }

    //отрисовка модального окна
    createModal(){
        const imgPopup = document.createElement('div'),
            bigImage = document.createElement('img'),
            imgWrapper = document.createElement('div');

        imgPopup.classList.add('popup');
        imgWrapper.classList.add('popup-wrapper');
        bigImage.classList.add('popup-img');
        document.body.appendChild(imgPopup);
        imgPopup.appendChild(imgWrapper);
        imgWrapper.appendChild(bigImage);

        const prev = document.createElement('div');
        prev.classList.add('prev-img', 'slider-btn');
        prev.innerHTML = '&lt;';
        imgWrapper.appendChild(prev);

        const next = document.createElement('div');
        next.classList.add('next-img', 'slider-btn');
        next.innerHTML = '&gt;';
        imgWrapper.appendChild(next);

        this.catalog.addEventListener('click', (e) => {
            let target = e.target;

            if(target && target.classList.contains('catalog-img')){
                imgPopup.style.display = 'block';
                const path = target.getAttribute('src');
                const prodIndex = target.getAttribute('data-index');
                bigImage.setAttribute('src', path);
                bigImage.setAttribute('data-index', `${prodIndex}`);
                this.bigImgSlider(next, prev, bigImage);
            }
        });

        imgPopup.addEventListener('click', (e) => {
            let target = e.target;
            if(target && !target.classList.contains(bigImage.className) && !target.classList.contains('slider-btn')){
                imgPopup.style.display = 'none';
            }
        });

    }

    //слайдер изображений модального окна
    bigImgSlider(nextBtn, prevBtn, bigImg){
        let prodIndex = bigImg.getAttribute('data-index');
        let imgIndex = bigImg.getAttribute('data-img-index');

        let slideNext = ()=>{
            if (imgIndex === this.productsInCatalog[prodIndex].img.length - 1) {
                imgIndex = 0;
            } else {
                imgIndex++;
            }
            bigImg.setAttribute('src', this.productsInCatalog[prodIndex].img[imgIndex]);
        }

        let slidePrev = () => {
            if (imgIndex === 0) {
                imgIndex = this.productsInCatalog[prodIndex].img.length - 1;
            } else {
                imgIndex--;
            }
            bigImg.setAttribute('src', this.productsInCatalog[prodIndex].img[imgIndex]);
        }

        function slideByKeyPress(e){
            if(e.key === "ArrowRight"){
                slideNext();
            } else if(e.key === "ArrowLeft"){
                slidePrev();
            }
        }

        if(this.productsInCatalog[prodIndex].img.length > 1) {
            nextBtn.style.display = 'flex';
            prevBtn.style.display = 'flex';

            document.body.addEventListener('keydown', slideByKeyPress);
            nextBtn.addEventListener('click', e => {
                e.preventDefault();

                slideNext();
            });

            prevBtn.addEventListener('click', e => {
                e.preventDefault();

                slidePrev();
            });
        } else {
            document.body.removeEventListener('keydown', slideByKeyPress); //событие не удаляется; когда у товара одна картинка, при нажатии на кнопки "вправо/влево" показываются картинки других товаров
            nextBtn.style.display = 'none';
            prevBtn.style.display = 'none';
        }
    }

    //слайдер на карточке товара
    imgSlider(){
        const cards = document.querySelectorAll('.catalog-item');
        for(let i = 0; i < this.productsInCatalog.length; i++){
            const width = window.getComputedStyle(cards[i].querySelector('.catalog-img--wrapper')).width;
            const slides = cards[i].querySelectorAll('.catalog-img');
            const slidesField = cards[i].querySelector('.catalog-img--slider');
            try {
                const nextBtn = cards[i].querySelector('.right');
                const prevBtn = cards[i].querySelector('.left');

                let offset = 0;

                slidesField.style.width = 100 * slides.length + '%';

                nextBtn.addEventListener('click', e => {
                    e.preventDefault();

                    if(offset === (+width.replace(/\D/g, '') * (slides.length - 1))){
                        offset = 0;
                    } else {
                        offset += +width.replace(/\D/g, '');
                    }

                    slidesField.style.transform = `translateX(-${offset}px)`;

                });

                prevBtn.addEventListener('click', e => {
                    e.preventDefault();
                    if(offset === 0){
                        offset = +width.replace(/\D/g, '') * (slides.length - 1);
                    } else {
                        offset -= +width.replace(/\D/g, '');
                    }

                    slidesField.style.transform = `translateX(-${offset}px)`;
                });
            } catch (e) {

            }
        }
    }

    init() {
        loadGoods('/goods').then(goods => {
                if(goods.length <= 0){
                    this.ifCatalogEmpty();
                }
                else {
                    this.addToCatalog(goods);
                    this.createProducts(this.productsInCatalog);
                    this.createModal();
                    this.imgSlider();
                }
            },
            (status) => {
                alert('Что-то пошло не так...\nПопробуйте перезагрузить страничку чуть позже');
            })
            .then(()=>{
                const  images = document.querySelectorAll('[data-img-index="0"]');
                const names = document.querySelectorAll('.catalog-item--name');
                const prices = document.querySelectorAll('.catalog-item--price--value');
                const num = document.querySelectorAll('.catalog-item--num--value');
                const addBtn = document.querySelectorAll('.catalog-btn--add');
                const removeBtn = document.querySelectorAll('.catalog-btn--remove');

                let products = this.productsInCatalog;

                addBtn.forEach((btn, i) => {
                    btn.onclick = function () {
                        if(num[i].innerHTML > 0){
                            let product = new Product(images[i], names[i].innerHTML, prices[i].innerHTML, 1);
                            products[i].num--;
                            changeNumOfGoods(`/goods/${i+1}`, products[i].num).then(() => {
                                num[i].innerHTML--;
                                basket.addToBasket(product);
                                basket.countBasketPrice();
                                basket.showAddress();
                            });
                        } else {
                            message.showMessage(message.messages.noItemInCatalog);
                        }
                    }
                });

                removeBtn.forEach((btn, i) => {
                    btn.onclick = () => {
                        if(basket.basketItems.length === 0){
                            message.showMessage(message.messages.noItemInBasket);
                            return;
                        }
                        for (let k = 0; k < basket.basketItems.length; k++) {
                            if (basket.basketItems[k].name === names[i].innerHTML && basket.basketItems[k].num > 0) {
                                products[i].num++;
                                changeNumOfGoods(`/goods/${i + 1}`, products[i].num).then(() => {
                                    num[i].innerHTML++;
                                    basket.deleteFromBasket(names[i].innerHTML, 1)
                                    basket.countBasketPrice();
                                    basket.showAddress();
                                    message.showMessage(message.messages.deletedFromBasket);
                                });
                            }
                        }
                    }
                });
            });
    }
}