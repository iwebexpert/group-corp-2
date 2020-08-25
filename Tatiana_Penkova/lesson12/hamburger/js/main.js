const btn = document.querySelector('button');
const calc = document.querySelector('.calculate');
const smallHamburger = document.getElementById('small');
const bigHamburger = document.getElementById('big');
const cheese = document.getElementById('cheese');
const salad = document.getElementById('salad');
const potato = document.getElementById('potato');
const pepper = document.getElementById('pepper');
const mayo = document.getElementById('mayo');


btn.addEventListener('click', (e) => {
    e.preventDefault();

    //Проверка на зополнение формы
    if (smallHamburger.checked || bigHamburger.checked && cheese.checked || salad.checked || potato.checked) {
        //Создание бургера
        let burger;
        if (bigHamburger.checked) {
            burger = new BigHamburger();
        } else {
            burger = new SmallHamburger();
        }

        burger.createHamburger();

        console.log(burger)

        burger.calculatePrice();
        burger.calculateCalories();

        burger.showTotal();

        console.log(burger.getSize());
        console.log(burger.getStuffing());
    } else {
        alert(`Выберите размер бургера и начинку!`)
    }


});