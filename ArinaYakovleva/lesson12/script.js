const calculateBtn = document.querySelector('.calculate-btn'),
    littleBurger = document.querySelector('#little'),
    bigBurger = document.querySelector('#big');

calculateBtn.addEventListener('click', () => {
    //Проверяем, что выбрано
    if (littleBurger.checked || bigBurger.checked && cheese.checked ||
        salad.checked || potato.checked || pepper.checked || mayonnaise.checked) {
        resultTxt.style.color = '#5c64ff';
        if (littleBurger.checked) {
            const little = new Hamburger('Маленький');
            little.addStuffings();
            little.calculateTotalAmount();

        } else if (bigBurger.checked) {
            const big = new Hamburger('Большой');
            big.addStuffings();
            big.calculateTotalAmount();
        }


    } else { //Если что-то не выбрано
        resultTxt.textContent = 'Выбери бургер и начинку!';
        resultTxt.style.color = 'red';
    }
});