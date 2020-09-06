const phone = document.querySelector('.phone'),
    email = document.querySelector('.email'),
    name = document.querySelector('.name');

const isCorrectInput = (type, value) =>{
    let regExp;
    switch(type) {
        case 'name':
            regExp = /^[a-z]+\s[a-z]+$|^[a-z]+$/i;
            return regExp.test(value);
        case 'email':
            regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regExp.test(value);
        case 'phone':
            regExp = /^\+\d\(\d{3}\)\d{3}-\d{4}$/;
            return regExp.test(value);
    }
};

const isInvalidInput = (el) => {
    if (!isCorrectInput(el.classList[0], el.value)) {
        return true;
    }
    return false;
};

const checkInputs = () => {
    [phone, email, name].forEach(el => {
        el.addEventListener('input', () => {
            el.style.border = isInvalidInput(el) ? '1px solid red' : '1px solid lightgrey';
        });
    });
};


export { isCorrectInput, isInvalidInput, checkInputs };