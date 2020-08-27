const calculateBtn = document.getElementById('calculate-btn'),
    littleBurger = document.getElementById('radio_little'),
    bigBurger = document.getElementById('radio_big');

console.log(calculateBtn);

calculateBtn.addEventListener('click', () => {
        if (littleBurger.checked) {
            const little = new Burger('little');
            little.getStuffings();
            little.calculateTotal();

        } else if (bigBurger.checked) {
            const big = new Burger('big');
            big.getStuffings();
            big.calculateTotal();
        }
    
}); 