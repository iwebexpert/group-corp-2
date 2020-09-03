// * Создать форму обратной связи с полями: Имя, Телефон, E-mail, текст, кнопка Отправить. При нажатии на кнопку Отправить произвести валидацию полей следующим образом:
// a.  Имя содержит только буквы.
// b.  Телефон имеет вид +7(000)000-0000.
// c.  E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.
// d.  Текст произвольный.
// e.  Если одно из полей не прошло валидацию, необходимо выделить это поле красной рамкой и сообщить пользователю об ошибке.

const formWrapper = document.querySelector('.form__wrapper'),
    inputName = document.querySelector('#name'),
    inputTel = document.querySelector('#tel'),
    inputMail = document.querySelector('#mail'),
    inputCom = document.querySelector('#comment'),
    subButton = document.querySelector('#submit');


inputName.addEventListener('change', (e) => {
    e.preventDefault();
    let name = inputName.value,
        nameRexExp = /^[A-Za-z]+$/;
    if (nameRexExp.test(name)) {
        inputName.classList.remove('error');
        inputName.classList.add('nice');
    } else {
        inputName.classList.remove('nice');
        inputName.classList.add('error');
        alert('Имя должно состоять из латинских букв!');
    }
    console.log(nameRexExp.test(name));
});

inputTel.addEventListener('change', (e) => {
    e.preventDefault();
    let tel = inputTel.value,
        telRegExp = /^\+\d{1}\(\d{3}\)\d{3}-\d{4}$/;
    if (telRegExp.test(tel)) {
        inputTel.classList.remove('error');
        inputTel.classList.add('nice');
    } else {
        inputTel.classList.remove('nice');
        inputTel.classList.add('error');
        alert('Телефон должен быть записан в виде +7(000)000-0000');
    }
    console.log(telRegExp.test(tel));
});

inputMail.addEventListener('change', (e) => {
    e.preventDefault();
    let mail = inputMail.value,
        mailRegExp = /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/;
    if (mailRegExp.test(mail)) {
        inputMail.classList.remove('error');
        inputMail.classList.add('nice');
    } else {
        inputMail.classList.remove('nice');
        inputMail.classList.add('error');
        alert('Введите кооректный ардес электронной почты');
    }
    console.log(mailRegExp.test(mail));
});

subButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (inputTel.classList.contains('error') || inputName.classList.contains('error') || inputMail.classList.contains('error') || (inputName.value == '' || inputTel.value == '' || inputMail.value == '')) {
        alert('Исправьте ошибки в полях, прежде чем подтверждать заказ');
    } else {
        subButton.setAttribute('type', 'submit');
        alert('Спасибо за заказ, менеджер свяжется с вами в ближайшее время');

    }
});