//Переписал функцию на замыкание
console.log('Задание 1');
let num = prompt('Введите число от 0 до 999');
let emptyObj = {};

function separationCount() {
    var mainObj = {
        hundreds: 0,
        ten: 0,
        units: 0
    }
    function sepCountsDone() {
        mainObj.hundreds = Math.trunc(num / 100);
        mainObj.ten = Math.trunc(num / 10 % 10);
        mainObj.units = num % 10;
        return {
            'Сотни': mainObj.hundreds,
            'Десятки': mainObj.ten,
            'Единицы': mainObj.units
        }
    }
    return sepCountsDone(num);
}

if (num > 0 && num < 999) {
    console.log(`Вы ввели ${num}, в котором:`);
    var doSepCount = separationCount(num);
    console.log(doSepCount);
} else {
    console.log('Введено неверное число');
    console.log(emptyObj);
}

//Задание 2
//Выведет undefined потому что переменная определена внутри условия, 
//следовательно он в него не зайдет
//if (!("a" in window)) {
//    var a = 1;
//}
//alert(a);

//Выведет ошибку, либо undefined, так как функции a мы не определили
//var b = function a(x) {
//    x && a(--x);
//};
//alert(a);

//Выведет код функции, потому что мы не вызвали функцию без передачи
//переменной в неё, чтобы вывелся результат нужно было передать в a число или переменную
//alert(a(x))
//function a(x) {
//    return x * 2;
//}
//var a;
//alert(a);

//выполнит функию и выведет 10, так как второй по индексу аргумент(третий) поменяли на 10
//function b(x, y, a) {
//    arguments[2] = 10;
//    alert(a);
//}
//b(1, 2, 3);

//Выведет object window потому что для alert указатель this укажет на object window
//function a() {
//    alert(this);
//}
//a.call(null);