//Первое задание
document.getElementById('1z').onclick = function () {
    alert("Первое задание");
    var a = 1, b = 1, c, d;
    c = ++a; alert(`${c}, потому что префиксная форма, инкрементирование производится сразу.`);
    d = b++; alert(`${d}, потому что постфиксная форма, js вернул значение b до инкременирования.`);
    c = (2 + ++a); alert(`${c}, потому что префиксная форма и 'a' был инкрементирован на строке '4' (2 + 2 + 1)`);
    d = (2 + b++); alert(`${d}, потому что постфиксная форма, 'b' был инкрементирован на строке '5' (2 + 2). 1 добавится после alert`);
    alert(`${a}, потому что 'a' был инкрементирован два раза`);
    alert(`${b}, потому что 'b' был инкрементирован два раза`);
}

//Второе задание
document.getElementById('2z').onclick = function () {
    alert("Второе задание");
    var a = 2;
    var x = 1 + (a *= 2);
    alert(`x равен ${x}, потому что a = 2 * 2`);
}

//Третье задание
document.getElementById('3z').onclick = function () {
    alert("Третье задание");
    var a = prompt("Введите значение 'a' ", "");
    var b = prompt("Введите значение 'b' ", "");
    if (a >= 0 && b >= 0) {
        alert(`Разность a и b = ${a - b}`);
    } else if (a < 0 && b < 0) {
        alert(`Произведение a и b = ${a * b}`);
    } else {
        alert(`Сумма a и b = ${+a + +b}`);
    }
}

//Четвертое задание
document.getElementById('4z').onclick = function () {
    alert("Четвертое задание");
    var a = prompt("Введите число в промежутке между 0 и 15", "");
    switch (+a) {
        case 0:
            alert('числа от a до 15: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15');
            break;
        case 1:
            alert('числа от a до 15: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15');
            break;
        case 2:
            alert('числа от a до 15: 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15');
            break;
        case 3:
            alert('числа от a до 15: 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15');
            break;
        case 4:
            alert('числа от a до 15: 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15');
            break;
        case 5:
            alert('числа от a до 15: 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15');
            break;
        case 6:
            alert('числа от a до 15: 6, 7, 8, 9, 10, 11, 12, 13, 14, 15');
            break;
        case 7:
            alert('числа от a до 15: 7, 8, 9, 10, 11, 12, 13, 14, 15');
            break;
        case 8:
            alert('числа от a до 15: 8, 9, 10, 11, 12, 13, 14, 15');
            break;
        case 9:
            alert('числа от a до 15: 9, 10, 11, 12, 13, 14, 15');
            break;
        case 10:
            alert('числа от a до 15: 10, 11, 12, 13, 14, 15');
            break;
        case 11:
            alert('числа от a до 15: 11, 12, 13, 14, 15');
            break;
        case 12:
            alert('числа от a до 15: 12, 13, 14, 15');
            break;
        case 13:
            alert('числа от a до 15: 13, 14, 15');
            break;
        case 14:
            alert('числа от a до 15: 14, 15');
            break;
        case 15:
            alert('числа от a до 15: 15');
            break;
        default:
            alert('Число вышло из диапозона');
    }
}

//Пятое задание
document.getElementById('5-6z').onclick = function () {
    alert('Пятое задание');
    var a = prompt("Введите число a", "");
    var b = prompt("Введите число b", "");

    function plusFunc(a, b) {
        return +a + +b;
    }
    function minusFunc(a, b) {
        return a - b;
    }
    function multiplFunc(a, b) {
        return a * b;
    }
    function divFunc(a, b) {
        return a / b;
    }
    alert(`Сложение: ${plusFunc(a, b)}. Разность: ${minusFunc(a, b)}. Умножение: ${multiplFunc(a, b)}. Деление: ${divFunc(a, b)}`);


    //Шестое задание
    alert('Шестое задание');
    var a = prompt("Введите число a", "");
    var b = prompt("Введите число b", "");
    var operation = prompt("Что вы хотите сделать с этими числами (sum, minus, mult, div)")
    function mathOperation(arg1, arg2, operation) {
        switch (operation) {
            case 'sum':
                return plusFunc(arg1, arg2);
            case 'minus':
                return minusFunc(arg1, arg2);
            case 'mult':
                return multiplFunc(arg1, arg2);
            case 'div':
                return divFunc(arg1, arg2);
            default:
                alert("Вы ввели то, чего я делать не могу:) Попробуйте еще раз");
                break;
        }
    }
    alert(mathOperation(a, b, operation));
}

//Седьмое задание
document.getElementById('7z').onclick = function () {
    alert("Седьмое задание");
    alert(`0 == NULL: ${0 == null}`);
    alert("Значение null означает нет отсутствие значения, в то время как 0 означает именно число 0, или false. Можно сравнить с двумя кошельками, в одном из них ничего нет - это 0, в другом лежит карточка, на которой написано 'Ничего нет' - это NULL ");
}

//Восьмое задание
document.getElementById('8z').onclick = function () {
    alert("Восьмое задание");
    var a = prompt("Введите число a", "");
    var b = prompt("Введите степень числа a", "");
    function power(val, pow) {
        return pow ? val * power(val, pow - 1) : 1;
    }
    alert(power(+a, +b));
}