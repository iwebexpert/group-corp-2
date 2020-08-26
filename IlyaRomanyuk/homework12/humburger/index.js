const btn = document.querySelector('.btn');
const result = document.querySelector('.calculate');
const small = document.querySelector('#small');
const big = document.querySelector('#big');
const cheese = document.querySelector('#cheess');
const salad = document.querySelector('#salad');
const potato = document.querySelector('#potato');
const spice = document.querySelector('#spice');
const mayonnaise = document.querySelector('#mayonnaise');

btn.addEventListener('click', (e) => {
    e.preventDefault();
    if ((small.checked || big.checked) && (cheese.checked || salad.checked || potato.checked)) {
        let burger;
        if (big.checked) {
            burger = new BigHamburger();
        } else {
            burger = new SmallHamburger();
        }
        burger.createHamburger();
        burger.calculatePrice();
        burger.calculateCalories();
        burger.showTotal();
    } else {
        Swal.fire(
            'Error',
            'Check something',
            '!!!'
        )
    }
});


