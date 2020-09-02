const textarea = document.getElementById('message-one');
const name = document.getElementById('recipient-name');
const email = document.getElementById('recipient-mail');
const form = document.getElementById('message-text');
const tel = document.getElementById('recipient-phone');
const button = document.querySelector('.btn-primary');
const send = document.getElementById('send');
const startover = document.getElementById('startover');
const error = document.querySelectorAll('error');
const reset = document.querySelector('.btn-reset');
const control = document.querySelectorAll('.form-control');
const text = "'Lore'm ipsu'm 'dolor' sit amet, consectetur adipisicing elit. Accusamu's, at atque aut 'autem', consectetur doloribu's 'dolorum' ea et iste 'iure' labore molliti'a nostrum provident qua'e quam ratione sed 'suscipit' voluptate's.'";
textarea.value = text;

let nameReg = /^[A-Za-zА-Яа-я ]+$/;
let emailReg = /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/;
let formReg = /\b'\B|\B'\b|'$/g;
let telReg = /^\+\d{1}\(\d{3}\)\d{3}-\d{4}$/;

function formValid() {
    let str = textarea.value;
    textarea.value = str.replace(formReg, '"');
}
function startOver() {
    textarea.value = text;
}

button.addEventListener('click', (e) => {
    e.preventDefault();
    // let name = document.getElementById('recipient-name');
    // let email = document.getElementById('recipient-mail');
    // let tel = document.getElementById('recipient-phone');

    function validForm(reg, variable) {
        let valid = reg.test(variable.value);
        if (valid) {
            variable.classList.remove('false');
            variable.nextElementSibling.classList.add('hidden');
        }
        else {
            variable.classList.add('false');
            variable.nextElementSibling.classList.remove('hidden');
        }
    }
    validForm(nameReg, name);
    validForm(emailReg, email);
    validForm(telReg, tel);

    function removeForm() {
        name.classList.remove('false');
        tel.classList.remove('false');
        email.classList.remove('false');
    }

    reset.addEventListener('click', () => {
        removeForm();
    });
});

send.addEventListener('click', (e) => {
    e.preventDefault();
    formValid();
});
startover.addEventListener('click', (e) => {
    e.preventDefault();
    startOver();
});