const name = document.getElementById('exampleInputName');
const email = document.getElementById('exampleInputEmail1');
const phone = document.getElementById('exampleInputPhone');
const error = document.querySelectorAll('error');

let validName = /^[A-Za-zА-Яа-я ]+$/;
let validMail = /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/;
let validPhone = /^\+\d{1}\(\d{3}\)\d{3}-\d{4}$/;


button.addEventListener('click', (e) => {
  e.preventDefault();

  function validForm(validation, variable) {
    let valid = validation.test(variable.value);
    if (valid) {
      variable.classList.remove('false');
      error.classList.toggle('hidden');
    } else {
      variable.classList.add('false');
      error.classList.toggle('hidden');
    }
  }
  validForm(validName, test.name);
  validForm(validMail, test.email);
  validForm(validPhone, test.phone);
});