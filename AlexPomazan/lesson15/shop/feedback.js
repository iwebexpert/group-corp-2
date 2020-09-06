const nameContent = document.querySelector('.form__name');
const phoneContent = document.querySelector('.form__phone');
const emailContent = document.querySelector('.form__email');

const btnFeadback = document.querySelector('.btn-feedback');

const errorStyle = 'color: red'

const errorName = document.createElement('span');
errorName.className = 'error-name';
errorName.style = errorStyle;

const errorPhone = document.createElement('span');
errorPhone.className = 'error-phone';
errorPhone.style = errorStyle;

const errorEmail = document.createElement('span');
errorEmail.className = 'error-email';
errorEmail.style = errorStyle;

function validateName() {
    const name = document.querySelector('.input-name');

    const regName = /^[а-я-a-z]+$/i;
    if (!regName.test(name.value) || !name.value.length) {
        errorName.textContent = 'Введите имя правильно!';
        errorName.style.display = 'block';
        nameContent.append(errorName);
        name.style.borderColor = 'red';
        return false;
    }
    errorName.style.display = 'none';
    name.style.borderColor = '';
    return true;

}

function validatePhone() {
    const phone = document.querySelector('.input-phone');

    const regPhone = /^\+\d{1}\(\d{3}\)\d{3}-\d{4}$/;
    if (!regPhone.test(phone.value) || !phone.value.length) {
        errorPhone.textContent = 'Номер телефона укажите так: +7(000)000-0000';
        errorPhone.style.display = 'block';
        phoneContent.append(errorPhone);
        phone.style.borderColor = 'red';
        return false;
    }
    errorPhone.style.display = 'none';
    phone.style.borderColor = '';
    return true;
}

function validateEmail() {
    const email = document.querySelector('.input-email');

    const regEmail = /^([a-z0-9_.-]+)@([a-z0-9_.-]+)\.([a-z]{2,6})$/i;
    if (!regEmail.test(email.value) || !email.value.length) {
        errorEmail.textContent = 'Введите почту правильно!'
        errorEmail.style.display = 'block';
        emailContent.append(errorEmail);
        email.style.borderColor = 'red';
        return false;
    }
    errorEmail.style.display = 'none';
    email.style.borderColor = '';
    return true;
}

btnFeadback.addEventListener("click", function (event) {
    validateName();
    validatePhone();
    validateEmail();
    if (!validateName() || !validatePhone() || !validateEmail()) {
        event.preventDefault();
    }
});