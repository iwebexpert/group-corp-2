const addressSummary = document.querySelector('#shipping-address__spoiler>summary'),
  addressDetails = document.querySelector('#shipping-address__spoiler');

const cartSummary = document.querySelector('#cart__spoiler>summary'),
  cartDetails = document.querySelector('#cart__spoiler');

addressSummary.addEventListener('click', closeCart);
cartSummary.addEventListener('click', openCart);

function closeCart(e) {
  cartDetails.open = false;
  addressSummary.textContent = 'Адрес доставки:';
  cartSummary.textContent = 'Назад';
}

function openCart(e) {
  addressDetails.open = false;
  addressSummary.textContent = 'Далее';
  cartSummary.textContent = 'Состав корзины';
}