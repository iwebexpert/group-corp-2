
function exersise() {
    let a = -5;
    let b = 100;
// не знаю важен ли в разности знак результата, мне кажется, что нет
    if ((a >= 0) && (b >= 0)) {
        return a - b;
    }
    else if ((a < 0) && (b < 0)) {
        return a * b;
    }
    else if ((a >= 0) && (b < 0) || (a < 0) && (b >= 0)) {
        return a + b;
    }
}

console.log(exersise());