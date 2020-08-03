// Задание №1

var a = 1, b = 1, c, d;
c = ++a; alert(c);           // 2
d = b++; alert(d);           // 1
c = (2 + ++a); alert(c);     // 5
d = (2 + b++); alert(d);     // 4
alert(a);                    // 3
alert(b);                    // 3

/*
Префиксная форма возвращает новое значение, в то время как постфиксная старое. Поэтому алерты с переменной "d" возвращают старые значения, а с "c" увеличенные.
*/

// Задание №2

var a = 2;
var x = 1 + (a *= 2);
console.log(x);

/*
Поскольку в первую очередь происходит действие в скобках и после уже сложение, а запись *= гласит, что переменная а (которая равна 2), умножается на 2, соответственно, 1 + (2 * 2) = 1 + 4 = 5.
*/

// Задание №3

let a = 7;
let b = -5;

if (a >= 0 && b >= 0) {
    console.log(a - b);
} else if (a < 0 && b < 0) {
    console / log(a * b);
} else {
    console.log(a + b);
}

// Задание № 4

let a = +prompt('Введите число от 0 до 15');
switch (a) {
    case (0):
        console.log(0);
    case (1):
        console.log(1);
    case (2):
        console.log(2);
    case (3):
        console.log(3);
    case (4):
        console.log(4);
    case (5):
        console.log(5);
    case (6):
        console.log(6);
    case (7):
        console.log(7);
    case (8):
        console.log(8);
    case (9):
        console.log(9);
    case (10):
        console.log(10);
    case (11):
        console.log(11);
    case (12):
        console.log(12);
    case (13):
        console.log(13);
    case (14):
        console.log(14);
    case (15):
        console.log(15);
        break;
    default:
        console.log("Вы ввели неверное число");
}

// Задание № 5

function sum(a, b) {
    return a + b;
}

function minus(a, b) {
    return a - b;
}

function multiplication(a, b) {
    return a * b;
}

function division(a, b) {
    return a / b;
}

console.log(sum(3, 5));
console.log(minus(5, 2));
console.log(multiplication(4, 5));
console.log(division(15, 3));

// Задание № 6

function mathOperation(arg1, arg2, operation) {
    arg1 = +prompt("Введите число");
    arg2 = +prompt("Введите число");
    operation = prompt("Выберите операцию");
    switch (operation) {
        case ("сложение"):
            console.log(sum(arg1, arg2));
            break;
        case ("вычитание"):
            console.log(minus(arg1, arg2));
            break;
        case ("умножение"):
            console.log(multiplication(arg1, arg2));
            break;
        case ("деление"):
            console.log(division(arg1, arg2));
            break;
        default:
            console.log("Такой операции не существует");
            break;
    }
}
mathOperation();

// Задание № 7

console.log(null > 0);  // false
console.log(null == 0); // false
console.log(null >= 0); // true

/*
С точки зрения логики, кажется, что если null больше или равен нулю, о чем говорит сравнение в строке 132, то результат сравнения из строк 130 или 131 должен быть также true, но это не так. Причиной является то, что нестрогое равенство и сравнения работают по-разному: сравнение приводит null к числу, рассматривая его как 0, поэтому получаются такие результаты сравнений.
*/

// Задание №8

function power(val, pow) {
    if (pow === 0)
        return (1);
    else {
        return val * power(val, pow - 1);
    }
}

function power2(val, pow) {
    return pow === 0 ? 1 : val * power2(val, pow - 1)
}
console.log(power(3, 3));