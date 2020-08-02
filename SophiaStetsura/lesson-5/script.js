// 1
var a = 1, b = 1, c, d;
c = ++a; alert(c);           // 2 
d = b++; alert(d);           // 1
c = (2 + ++a); alert(c);      // 5
d = (2 + b++); alert(d);      // 4
alert(a);                    // 3
alert(b);             //3
/*Префиксная форма возвращает новое значение, постфиксная форма возвращает старое значение,
именно поэтому в случае с переменной с значение a увеличено на единицу, а в случае с переменной d
значение b остается прежним*/

// 2
var a = 2;
var x = 1 + (a *= 2); //5
/*Значение х будет равно 5, так как первым выполняется действие в скобках, оно означает умножение уже существующей
переменной а, которая равна 2 на число 2 и только после этого прибавляется 1.*/

// 3
let a = 5;
let b = 3;
if (a >= 0 && b >= 0)
    console.log(a - b);
else if (a < 0 && b < 0)
    console.log(a * b);
else
    console.log(a + b);

// 4
let a = +prompt('Введите число от 0 до 15');
switch (a) {
    case (0):
        console.log("0");
        break;
    case (1):
        console.log("1");
        break;
    case (2):
        console.log("2");
        break;
    case (3):
        console.log("3");
        break;
    case (4):
        console.log("4");
        break;
    case (5):
        console.log("5");
        break;
    case (6):
        console.log("6");
        break;
    case (7):
        console.log("7");
        break;
    case (8):
        console.log("8");
        break;
    case (9):
        console.log("9");
        break;
    case (10):
        console.log("10");
        break;
    case (11):
        console.log("11");
        break;
    case (12):
        console.log("12");
        break;
    case (13):
        console.log("13");
        break;
    case (14):
        console.log("14");
        break;
    case (15):
        console.log("15");
        break;
    default:
        console.log("Число не попадает в заданный диапазон");
        break;
}

// 5
function plusNum(a, b) {
    return a + b;
}

function minusNum(a, b) {
    return a - b;
}

function compNum(a, b) {
    return a * b;
}

function diffNum(a, b) {
    return a / b;
}

// 6
function mathOperation(arg1, arg2, operation) {
    arg1 = +prompt('Введите первое число');
    arg2 = +prompt('Введите второе число');
    operation = prompt('Какую операцию используем?');
    switch (operation) {
        case ('+'):
            console.log(arg1 + arg2);
            break;
        case ('-'):
            console.log(arg1 + arg2);
            break;
        case ('*'):
            console.log(arg1 * arg2);
            break;
        case ('/'):
            console.log(arg1 / arg2);
            break;
        default:
            console.log('Такой операции не существует');
            break;
    }
}
mathOperation();

// 7
/*null - это тип данных null, это означает, что его значение неизвестно
0 - это тип данных Number, это число 0.
При этом null > 0 и null == 0 - это false, а  null >= 0 - это true.*/

// 8
function power(val, pow) {
    if (pow === 0)
        return (1);
    else if (pow === 1)
        return (val);
    return val * power(val, pow - 1);
}
console.log(power(2, 3));