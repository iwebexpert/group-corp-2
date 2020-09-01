window.onload = function () {
    let form = document.querySelector('form');
    let quotes = document.getElementById('quotes');
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let phone = document.getElementById('phone');
    let out = document.querySelector('p');

    form.addEventListener('submit', function (event) {
        let q = quotes.value;
        let n = name.value;
        let p = phone.value;
        let e = email.value;
        let msg = '';

        quotes.value = q.replace(/'/g, '"');
        q = quotes.value;
        quotes.value = q.replace(/(\w)(")(\w)/ig, "$1'$3") +
            ' \r\n\r\nКавычки успешно заменены!';
        quotes.style = 'border-color: #00bf72;';

        let regexp = /^[a-zа-яё]+$/ui;

        if (!regexp.test(n)) {
            msg += 'Имя должно состоять только из букв! \r\n';
            name.style = 'color: crimson;border-color: crimson;';
        } else name.style = 'border-color: #00bf72;';

        regexp = /^\+7\(\d{3}\)\d{3}\-\d{4}$/g
        if (!regexp.test(p)) {
            msg += 'Телефон должен иметь вид +7(123)456-7890! \r\n';
            phone.style = 'color: crimson;border-color: crimson;';
        } else phone.style = 'border-color: #00bf72;';

        regexp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i
        if (!regexp.test(e)) {
            msg += 'Email должен иметь вид yourmail@mail.com! \r\n';
            email.style = 'color: crimson;border-color: crimson;';
        } else email.style = 'border-color: #00bf72;';

        out.innerText = msg;
        event.preventDefault();
    }, false);
}