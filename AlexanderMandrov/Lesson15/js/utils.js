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

export default isCorrectInput;