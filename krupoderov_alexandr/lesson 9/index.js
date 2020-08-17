'use strict'

const IMAGES_URLS = {
    apple: ['img/apple/apple-1.jpg', 'img/apple/apple-2.jpg', 'img/apple/apple-3.jpg'],
    melon: ['img/melon/melon-1.jpg', 'img/melon/melon-2.jpg'],
    chicken: ['img/chicken/chicken.jpg']
}
//Task 1

document.addEventListener('DOMContentLoaded', () => {
    class Product {
        constructor(id, name, weight, category, price, description) {
            this.id = id;
            this.name = name;
            this.weight = weight;
            this.category = category;
            this.standartPrice = price;
            this.price = price;
            this.description = description;
            this.images = [];
        }

        makeDiscount(percent) {
            if (this.price) this.price *= 1 - percent/100;
            else console.log('Цена не задана');
            this.getInfo()
        }

        returnPrice(){
            this.price = this.standartPrice;
            this.getInfo();
        }

        getInfo(){
            console.log(`Продукт ${this.name}. Его вес ${this.weight}. Категория: ${this.category}. Цена: ${this.price}. Краткое описание продукта: ${this.description}`);
        }

        addCategory(category){
            this.category.push(category);
            this.getInfo();
        }

        deleteCategory(category){
            for (let i = 0; i < this.category.length; i ++){
                if (this.category[i] === category) {
                    this.category.splice(i, 1);
                    this.getInfo();
                    return;
                }
            }
            console.log('Такой категории нет');
        }

        pushImages(pictures){
            for (let i = 0; i < pictures.length; i++) this.images.push(pictures[i]);
        }


        createSlider(){
            let slider = document.createElement('div');
            let slidesContainer = document.createElement('div');
            slider.classList.add('slider');
            for (let i = 0; i < this.images.length; i ++){
                let slide = document.createElement('div');
                slide.style.background = `url(${this.images[i].toString()}) center/cover no-repeat`;
                slide.classList.add('slide');
                if (i === 0) slide.classList.add('active');
                slidesContainer.appendChild(slide);
                slide.addEventListener('click', () => {
                    slider.classList.toggle('active');
                })
            }

            slider.appendChild(slidesContainer);

            let right = document.createElement('span');
            let left = document.createElement('span');

            right.classList.add('right-switch');
            left.classList.add('left-switch');
            let imgArray = this.images.slice();
            right.addEventListener('click', () => {
                imgArray.unshift(imgArray.pop());
                slider.childNodes[1].remove();
                let container = document.createElement('div');
                for (let i = 0; i < imgArray.length; i ++){
                    let slide = document.createElement('div');
                    slide.style.background = `url(${imgArray[i].toString()}) center/cover no-repeat`;
                    slide.classList.add('slide');
                    slide.classList.remove('active');
                    if (i === 0) slide.classList.add('active');
                    slide.addEventListener('click', () => {
                        slider.classList.toggle('active');
                    })
                    container.appendChild(slide);
                }
                slider.childNodes[0].insertAdjacentElement('afterend', container);
            });

            left.addEventListener('click', () => {
                imgArray.push(imgArray.shift());
                slider.childNodes[1].remove();
                let container = document.createElement('div');
                for (let i = 0; i < imgArray.length; i ++){
                    let slide = document.createElement('div');
                    slide.style.background = `url(${imgArray[i].toString()}) center/cover no-repeat`;
                    slide.classList.add('slide');
                    slide.classList.remove('active');
                    if (i === 0) slide.classList.add('active');
                    slide.addEventListener('click', () => {
                        slider.classList.toggle('active');
                    })
                    container.appendChild(slide);
                }
                slider.childNodes[0].insertAdjacentElement('afterend', container);
            })

            slider.insertAdjacentElement('beforeend', right);
            slider.insertAdjacentElement('afterbegin', left);
            return slider;
        }

        createHtml(){
            let body = document.querySelector('body');
            let product = document.createElement('div');
            let title = document.createElement('span');
            let weight = document.createElement('span');
            let descr = document.createElement('span');
            let price = document.createElement('span');
            title.textContent = this.name;
            weight.textContent = this.weight + 'g';
            descr.textContent = this.description;
            price.textContent = this.price + ' RUB';
            product.appendChild(title);
            product.appendChild(weight);
            product.appendChild(descr);
            product.appendChild(price);
            product.classList.add('product');

            let button = document.createElement('button');
            button.textContent = 'Добавить';
            button.classList.add('button-add');
            product.style.background = `url(${this.images[0].toString()}) center/cover no-repeat`;
            let slider = this.createSlider();
            body.appendChild(slider);
            product.addEventListener('click', (event) => {
                if (event.target.classList.contains('button-add')){
                        lenaBucket.addProduct(this, 1);
                        lenaBucket.sumBucket();
                }else {
                    slider.classList.toggle('active');
                }
            });
            product.appendChild(button);

            return product;
        }
    }



    class Bucket {
        constructor(user) {
            this.user = user;
            this.products = [];
            this.sum = 0;
        }
        addProduct(product, count){
            if (product && product instanceof Product && count > 0){
                let newProduct = {...product};
                newProduct.count = count;
                this.products.push(newProduct);
                this.createHtml();
                return this;
            }else{
                console.log('Неправильный продукт или неверно указано количество');
            }

        }

        sumBucket(){
            this.sum = 0;
            this.products.forEach(item => {
                this.sum += item.price * item.count;
            })
            return `${this.user} набрал товаров на сумму: ${this.sum} рублей`;
        }

        createHtml(){
            let bucket = document.createElement('div');
            bucket.classList.add('bucket');
            let bucketContainer = document.getElementById('bucket');
            if (this.products.length === 0){
                bucket.innerHTML = 'Корзина пуста';
                bucketContainer.innerHTML = '';
                bucketContainer.appendChild(bucket);
            }
            else {
                bucket.innerHTML = '';
                bucket.innerHTML = `В корзине ${this.products.length} товаров на сумму ${this.sumBucket()}`;
                bucketContainer.innerHTML = '';
                bucketContainer.appendChild(bucket);
            }
        }

    }



    let catalog = document.getElementById('catalog');

    let apple = new Product(1, 'Apple', '1000', ['fruit', 'fresh'], 150, 'Some fresh and tasty apple');
    let melon = new Product(2, 'Melon', '1000', ['fresh', 'berry'], 32, 'The best melons');
    let chicken = new Product(3, 'Chicken', '1000', ['meat'], 260, 'Homemade chicken');

    apple.pushImages(IMAGES_URLS.apple);
    melon.pushImages(IMAGES_URLS.melon);
    chicken.pushImages(IMAGES_URLS.chicken);

    let productArray = [apple , melon, chicken];
    productArray.forEach(product => {
        let newProduct = product.createHtml();
        catalog.appendChild(newProduct);
    });

    let lenaBucket = new Bucket('Elena');
    lenaBucket.createHtml();

});




