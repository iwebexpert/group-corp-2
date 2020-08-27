let form = new Form();
let message = new Messages();
let size = new Sizes();
let filling = new Filling();
let additional = new Additional();
let hamburger = new Hamburger(110, 60); //создаем бургер с начальными характеристиками

form.init();                        //инициализация формы
size.setPriceAndCalories();         //вычисляем стоимость и калории в зависимости от размера
filling.setPriceAndCalories();      //вычисляем стоимость и калории в зависимости от начинки
additional.setPriceAndCalories();   //вычисляем стоимость и калории в зависимости от дополнительных ингридиентов

let calculate = document.querySelector('.btn-calculate');

calculate.addEventListener('click', e => {
    e.preventDefault();

    hamburger.calculatePrice(size, filling, additional);            //вычисляем полную стоимость бургера
    hamburger.calculateCalories(size, filling, additional);         //вычисляем калорийность бургера
    message.showModalThanks(hamburger);                             //отображаем окно с конечными стоимостью и калорийностью
})


