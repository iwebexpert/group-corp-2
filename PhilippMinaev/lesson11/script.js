//Задание 7.1 с выводом единиц (замыкание)
let num = prompt("Введите число от 0 до 999");
let obj = {};

function separationCount() {
  let baseObj = {
    hundreds: 0,
    ten: 0,
    units: 0,
  };
  function seporation() {
    baseObj.hundreds = Math.trunc(num / 100);
    baseObj.ten = Math.trunc((num / 10) % 10);
    baseObj.units = num % 10;
    return {
      hundreds: baseObj.hundreds,
      tens: baseObj.ten,
      units: baseObj.units,
    };
  }
  return seporation(num);
}

if (num > 0 && num < 999) {
  alert(`Вы ввели ${num}, в нём кол-во:`);
  let separatedNum = separationCount(num);
  alert(
    `Сотни - ${separatedNum.hundreds},\nДесятки - ${separatedNum.tens},\nЕдиницы ${separatedNum.units}.`
  );
} else {
  alert("Введено неверное число");
}

//Задание 2
if (!("a" in window)) {
  var a = 1;
}
alert(a); // undefind - объявление находится в теле условия,
//другими словами на момент проверки переменной нет

var b = function a(x) {
  x && a(--x);
};
alert(a); // ошибка - функция "а" не определена

function a(x) {
  return x * 2;
}
var a;
alert(a); // выведение кода функции, т.к. для вывода значений необходимо передать переменные

function b(x, y, a) {
  arguments[2] = 10;
  alert(a);
}
b(1, 2, 3); // 10 - вывод значения присвоенного внутри тела функции

function a() {
  alert(this);
}
a.call(null); // [object window] - не очень понял, но вроде как связано с тем,
// что при использовании метода сall c значеним null для функции приведёт к тому, что указатель this
// будет показывть на объект окна бразура(вложенность окна выше), поправьте пожалуйста.
