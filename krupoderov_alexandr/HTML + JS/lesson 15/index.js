'use strict'

function getData(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status !== 200) {
                    reject(xhr.status);
                }
                const goods = JSON.parse(xhr.responseText);
                resolve(goods);
            }
        };
        xhr.send();
    });
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
            if (this.price) this.price *= 1 - percent / 100;
            else console.log('Цена не задана');
            this.getInfo()
        }

        returnPrice() {
            this.price = this.standartPrice;
            this.getInfo();
        }

        getInfo() {
            console.log(`Продукт ${this.name}. Его вес ${this.weight}. Категория: ${this.category}. Цена: ${this.price}. Краткое описание продукта: ${this.description}`);
        }

        addCategory(category) {
            this.category.push(category);
            this.getInfo();
        }

        deleteCategory(category) {
            for (let i = 0; i < this.category.length; i++) {
                if (this.category[i] === category) {
                    this.category.splice(i, 1);
                    this.getInfo();
                    return;
                }
            }
            console.log('Такой категории нет');
        }

        pushImages(pictures) {
            for (let i = 0; i < pictures.length; i++) this.images.push(pictures[i]);
        }


        createSlider() {
            function leftSlide() {
                imgArray.push(imgArray.shift());
                slider.childNodes[1].remove();
                let container = document.createElement('div');
                for (let i = 0; i < imgArray.length; i++) {
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
            }

            function rightSlide() {
                imgArray.unshift(imgArray.pop());
                slider.childNodes[1].remove();
                let container = document.createElement('div');
                for (let i = 0; i < imgArray.length; i++) {
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
            }

            let slider = document.createElement('div');
            let slidesContainer = document.createElement('div');
            slider.classList.add('slider');
            for (let i = 0; i < this.images.length; i++) {
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
                rightSlide();
            });

            left.addEventListener('click', () => {
                leftSlide();
            })

            document.addEventListener('keyup', ev => {
                if (slider.classList.contains('active')) {
                    console.log(ev.key)
                    if (ev.key === "ArrowRight") {
                        rightSlide();
                    } else if (ev.key === "ArrowLeft") {
                        leftSlide();
                    }
                }
            })

            slider.insertAdjacentElement('beforeend', right);
            slider.insertAdjacentElement('afterbegin', left);
            return slider;
        }


        createHtml() {
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
            let buttonDelete = document.createElement('button');
            buttonDelete.textContent = 'Удалить';
            buttonDelete.classList.add('button-delete');
            product.style.background = `url(${this.images[0].toString()}) center/cover no-repeat`;
            let slider = this.createSlider();
            body.appendChild(slider);
            product.addEventListener('click', (event) => {
                if (event.target.classList.contains('button-add')) {
                    lenaBucket.addProduct(this, 1);
                    lenaBucket.sumBucket();
                    lenaBucket.createHtml();
                } else if (event.target.classList.contains('button-delete')) {
                    lenaBucket.deleteProduct(this);
                    lenaBucket.sumBucket();
                    lenaBucket.createHtml();
                } else {
                    slider.classList.toggle('active');
                }
            });
            product.appendChild(button);
            product.appendChild(buttonDelete);
            return product;
        }
    }


    class Bucket {
        constructor(user) {
            this.user = user;
            this.products = [];
            this.sum = 0;
        }



        addProduct(product, count) {
            if (product && product instanceof Product && count > 0) {
                let newProduct = {...product};
                newProduct.count = count;
                for (let i = 0; i < this.products.length; i++) {
                    if (newProduct.name === this.products[i].name) {
                        console.log(1)
                        ++this.products[i].count;
                        this.createHtml();
                        return this;
                    }
                }
                this.products.push(newProduct);

                this.createHtml();
                return this;
            } else {
                console.log('Неправильный продукт или неверно указано количество');
            }
        }

        deleteProduct(product) {
            let newProduct = {...product};
            for (let i = 0; i < this.products.length; i++) {
                if (newProduct.name === this.products[i].name) {
                    if (this.products[i].count < 1) {
                        return null
                    } else if (this.products[i].count === 1) {
                        this.products.splice(i, 1);
                        this.createHtml();
                        return this;
                    } else
                        --this.products[i].count;
                    this.createHtml();
                    return this;
                }
            }
        }

        sumBucket() {
            this.sum = 0;
            this.products.forEach(item => {
                this.sum += item.price * item.count;
            })
            return `${this.user} набрал товаров на сумму: ${this.sum} рублей`;
        }

        createHtml() {
            let bucket = document.createElement('div');
            bucket.classList.add('bucket');
            let bucketNext = document.createElement('button');
            bucketNext.textContent = 'Далее';

            let bucketContainer = document.getElementById('bucket');
            bucketContainer.classList.add('bucketContainer')
            if (this.products.length === 0) {
                bucket.innerHTML = 'Корзина пуста';
                bucketContainer.innerHTML = '';
                bucket.appendChild(bucketNext);
                bucketContainer.appendChild(bucket);
            } else {
                bucket.innerHTML = '';
                bucketContainer.innerHTML = '';
                this.products.forEach(product => {
                    let prod = document.createElement('div');
                    prod.innerText = `${product.name} количество: ${product.count}`;
                    bucketContainer.appendChild(prod);
                })
                let counter = 0;
                for (let i = 0; i < this.products.length; i++) {
                    counter += this.products[i].count;
                }
                bucket.innerHTML = `В корзине ${counter} товаров на сумму ${this.sumBucket()}`;
                bucket.appendChild(bucketNext);
                bucketContainer.appendChild(bucket);
            }


            let form = document.querySelector('.order-form');
            let newForm = form.cloneNode(true);
            form.remove();
            newForm.classList.add('non-active');
            let formBack = newForm.querySelector('.order-form__back');
            let formSubmit = newForm.querySelector('.order-form__submit');

            let address = document.createElement('div');
            address.classList.add('address');
            address.textContent = 'Адрес';
            let addressInput = document.createElement('textarea');
            address.appendChild(addressInput);
            let addressNext = document.createElement('button');
            addressNext.textContent = 'Далее';
            let addressPrev = document.createElement('button');
            addressPrev.textContent = 'Назад';
            address.appendChild(addressPrev);
            address.appendChild(addressNext);
            bucketContainer.appendChild(address);

            let comment = document.createElement('div');
            comment.classList.add('comment');
            comment.textContent = 'Комментарий';
            let commentInput = document.createElement('textarea');
            comment.appendChild(commentInput);
            let commentNext = document.createElement('button');
            commentNext.textContent = 'Далее';
            let commentPrev = document.createElement('button');
            commentPrev.textContent = 'Назад';
            comment.appendChild(commentPrev);
            comment.appendChild(commentNext);
            bucketContainer.appendChild(comment);
            bucketContainer.appendChild(newForm);

            bucketNext.addEventListener('click', () => {
                bucket.classList.add('non-active');
                address.classList.add('active');
            });

            addressPrev.addEventListener('click', () => {
                bucket.classList.remove('non-active');
                address.classList.remove('active');
            });

            addressNext.addEventListener('click', () => {
                comment.classList.add('active');
                address.classList.remove('active');
            });

            commentPrev.addEventListener('click', () => {
                comment.classList.remove('active');
                address.classList.add('active');
            });

            commentNext.addEventListener('click', () => {
                comment.classList.remove('active');
                newForm.classList.remove('non-active');
            })

            formBack.addEventListener('click', (event) => {
                event.preventDefault();
                comment.classList.add('active');
                newForm.classList.add('non-active');
            })

            formSubmit.addEventListener('click', () => {
                //asdasdsadsad
                //+7(999)123-4567
                //sdasdsad@mail.ru
                function testReg(reg, input, mistake) {
                    if (reg.test(input.value)) return true;
                    else {
                        drawRed(input);
                        sayAboutMistake(input, mistake);
                        return false;
                    }
                }

                function drawRed(input) {
                    input.style.borderColor = 'red';
                    setTimeout(() => {
                        input.style.borderColor = 'black';
                    }, 10000);
                }

                function sayAboutMistake(where, mistake) {
                    let mist = document.createElement('span');
                    mist.textContent = mistake;
                    where.insertAdjacentElement('afterend', mist);
                    setTimeout(() => {
                        mist.remove();
                    }, 10000);
                }

                let nameInput = newForm.querySelector('.order-form__name'),
                    telInput = newForm.querySelector('.order-form__tel'),
                    emailInput = newForm.querySelector('.order-form__email');

                let regName = /^[A-zА-яЁё]+$/,
                    regTel = /\+7\(9[0-9]{2}\)[0-9]{3}-[0-9]{4}/,
                    regEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

                let nameCheck = testReg(regName, nameInput, 'Имя должно содержать только буквы');
                let telCheck = testReg(regTel, telInput, 'Нужный формат телефона: +7(000)000-0000');
                let mailCheck = testReg(regEmail, emailInput, 'Неккоректный email');
                console.log(nameCheck, telCheck, mailCheck);
                if (nameCheck && telCheck && mailCheck) alert('Форма отправлена');
            })

        }


    }

    class Statistic {
        constructor() {
            this.data = this.getData();
        }

        async getData() {
            const response = await fetch('/sales');
            return await response.json();
        }

        createHtml() {
            function drawPieSlice(ctx, centerX, centerY, radius, startAng, endAng, color) {
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.arc(centerX, centerY, radius, startAng, endAng);
                ctx.closePath();
                ctx.fill();
            }

            function getColors() {
                return [
                    '#7f19d2',
                    '#19d297',
                    '#eec64a',
                    '#d2191f',
                    '#177af1'
                ];
            }

            function getSum(data) {
                let sum = 0;
                data.forEach(data => sum += data.value);
                return sum;
            }

            function createDiagram(id, width, height) {
                let diagram = document.getElementById(id);
                diagram.width = width;
                diagram.height = height;
                return diagram;
            }

            function getAngel(data) {
                const doublePI = Math.PI * 2;
                let sum = getSum(data);
                data.forEach(data => data.angle = data.value / sum * doublePI);
                return data;
            }

            function drawPie(data, ctx, COLORS) {
                let beginAng = 0;
                for (let i = 0; i < data.length; i++) {
                    drawPieSlice(ctx, 300, 300, 300, beginAng, beginAng + data[i].angle, COLORS[i]);
                    beginAng += data[i].angle;
                }
            }

            function drawField(ctx, color, x, y, width, height) {
                ctx.fillStyle = color;
                ctx.fillRect(x,y,width,height);
            }

            function drawBar(ctx, data, COLORS) {
                for(let i = 0; i < data.length; i++) {
                    ctx.fillStyle = COLORS[i];
                    ctx.fillRect(30 + i * 100, 500 - data[i].value - 30 , 50, data[i].value);
                }
            }

            function drawGraphic(ctx, data, color) {
                ctx.fillStyle = color;
                ctx.lineWidth = 2.0;
                ctx.beginPath();
                ctx.moveTo(30,30);
                ctx.lineTo(30,470);
                ctx.moveTo(30,470);
                ctx.lineTo(480,470);
                ctx.stroke();

                ctx.fillStyle = color;
                let value = 0;
                for(let i = 0; i < data.length; i ++) {
                    ctx.fillText(data[i].value + "",4, 500 - data[i].value - 30);
                    value += data[i].value;
                    ctx.beginPath();
                    ctx.moveTo(25,500 - data[i].value - 30);
                    ctx.lineTo(30,500 - data[i].value - 30);
                    ctx.stroke();
                }
            }

            function fillText(data, ctx) {
                    const doublePI = Math.PI * 2;
                    ctx.fillStyle = "black";
                    ctx.font = "bold 20px Arial";

                    let startAngle = 0;
                    data.forEach((item) => {
                        let content = `${Math.round(item.angle / doublePI * 100)}%`;
                        let x = 300 + 200 * Math.cos(startAngle + item.angle / 2);
                        let y = 300 + 200 * Math.sin(startAngle + item.angle / 2);
                        ctx.fillText(content, x, y);
                        startAngle += item.angle;
                    });
            }

            function makeLegend(data, COLORS, diagram) {
                let input = document.querySelector(diagram.toString());
                let legendContainer = document.createElement('div');
                legendContainer.classList.add('legend-container')
                for (let i = 0; i < data.length; i ++){
                    let line = document.createElement('span');
                    line.innerText = data[i].month;
                    let color = document.createElement('span');
                    color.style.backgroundColor = COLORS[i];
                    line.appendChild(color);
                    legendContainer.appendChild(line);
                }
                input.appendChild(legendContainer);
            }

            function drawDiagram(data, ctx, COLORS, diagram, type, legendPlace) {
                if (type === 'round'){
                    data = getAngel(data);
                    drawPie(data, ctx, COLORS);
                    fillText(data, ctx);
                    makeLegend(data, COLORS, legendPlace);
                }else if (type === 'barChart'){
                    drawField(ctx, 'gray',0, 0, 500, 500)
                    drawBar(ctx, data, COLORS);
                    drawGraphic(ctx, data, 'black');
                    makeLegend(data, COLORS, legendPlace);
                }
            }

            this.data.then((data) => {
                const COLORS = getColors();
                let roundDiagram = createDiagram('diagram', 600, 600);
                let ctx = roundDiagram.getContext('2d');
                drawDiagram(data, ctx, COLORS, roundDiagram, 'round', '.round-diagram');
                let barChart = createDiagram('bar-diagram', 600, 600);
                ctx = barChart.getContext('2d')
                drawDiagram(data, ctx, COLORS, 'barChart', 'barChart', '.bar-chart');
            })
        }
    }

    let productArray = [];
    let catalog = document.getElementById('catalog');
    let lenaBucket = new Bucket('Elena');
    lenaBucket.createHtml();

    getData('/goods').then((goods) => {
            goods.forEach(good => {
                let newGood = new Product(good.id, good.name, good.weight, good.categories, good.price, good.description);
                newGood.pushImages(good.IMG_URLS);
                productArray.push(newGood);
            })
            productArray.forEach(product => {
                console.log(product)
                let newProduct = product.createHtml();
                catalog.appendChild(newProduct);
            });
        },
        (status) => console.error(status)
    )

    const statistic = new Statistic();
    statistic.createHtml();
    //
});

//json-server --watch ./db.json --static ./


