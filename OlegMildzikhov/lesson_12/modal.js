const btnTabWrapper = document.querySelector('.tab__wrapper');
const showBtn = document.querySelector('[data-showModal]');
const modalWrapper = document.querySelector('.wrapper');

showBtn.addEventListener('click', () => {
    modalWrapper.classList.add('show');
    modalWrapper.classList.remove('hide');
    showBtn.classList.add('hide');
    showBtn.classList.remove('show');
});



btnTabWrapper.addEventListener('click', (e) => {
    if (e.target.dataset.id == 'tab2') {
        if (document.querySelector('#tab2').classList.contains('show')) {
            document.querySelector('#tab1').classList.remove('show');
            document.querySelector('#tab1').classList.add('hide');
            document.querySelector('#tab2').classList.remove('show');
            document.querySelector('#tab2').classList.add('hide');
        } else {
            document.querySelector('#tab2').classList.add('show');
            document.querySelector('#tab2').classList.remove('hide');
            document.querySelector('#tab1').classList.remove('show');
            document.querySelector('#tab1').classList.add('hide');
        }
    }
    if (e.target.dataset.id == 'tab3') {
        if (document.querySelector('#tab3').classList.contains('show')) {
            document.querySelector('#tab2').classList.remove('show');
            document.querySelector('#tab2').classList.add('hide');
            document.querySelector('#tab3').classList.remove('show');
            document.querySelector('#tab3').classList.add('hide');
        } else {
            document.querySelector('#tab3').classList.add('show');
            document.querySelector('#tab3').classList.remove('hide');
            document.querySelector('#tab2').classList.remove('show');
            document.querySelector('#tab2').classList.add('hide');
        }
    }
    if (e.target.dataset.id == 'confirm') {
        adress();
        if (document.querySelector('#confirm').classList.contains('hide')) {
            document.querySelector('#confirm').classList.remove('hide');
            document.querySelector('#tab3').classList.remove('show');
            document.querySelector('#tab3').classList.add('hide');
            document.querySelector('#confirm').classList.add('show');
        } else {
            document.querySelector('#confirm').classList.add('hide');
            document.querySelector('#confirm').classList.remove('show');
            document.querySelector('#tab3').classList.remove('show');
            document.querySelector('#tab3').classList.add('hide');

        }
    }
    if (e.target.dataset.id == 'close') {
        modalWrapper.classList.add('hide');
        modalWrapper.classList.remove('show');
        showBtn.classList.remove('hide');
        showBtn.classList.add('show');
        document.querySelector('#tab1').classList.remove('hide');
        document.querySelector('#tab1').classList.add('show');
        document.querySelector('#tab2').classList.remove('show');
        document.querySelector('#tab2').classList.add('hide');
        document.querySelector('#tab3').classList.remove('show');
        document.querySelector('#tab3').classList.add('hide');
        document.querySelector('#confirm').classList.remove('show');
        document.querySelector('#confirm').classList.add('hide');
    }
});




function adress() {

    const adrBuy = document.querySelector('#adress').value;
    const comBuy = document.querySelector('#comment').value;
    let str1 = '';
    console.log(cart);
    cart.items.forEach((it) => {
        str1 += `${it.count} ${it.name} `;
    });

    document.querySelector('.confirm_text').innerHTML = `${str1}которые будут доставлены по адресу ${adrBuy}. Комментарий к заказу: ${comBuy}`;






    console.log(adrBuy, comBuy, /*testSH.textContent*/ );
}