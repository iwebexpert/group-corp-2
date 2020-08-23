//task_1
function NumberToObject(number) {
  let obj = {
    "units": null,
    "decades": null,
    "hundreds": null
  };

  function correct() {
    if (number > 999 || number < 0) {
      return "ERROR";
    } else {
      return "OK";
    }
  }

  function units() {
    obj.units = number % 10;
    number = Math.floor(number / 10);
    return obj.units;
  }

  function decades() {
    obj.decades = number % 10,
    number = Math.floor(number / 10);
    return obj.decades;
  }

  function hundreds() {
    obj.hundreds = number % 10;
    return obj.hundreds;
  }

  return {
    correct,
    units,
    decades,
    hundreds
  }
}

let count = NumberToObject(245);
console.log(count.correct()); 
console.log(count.units()); 
console.log(count.decades()); 
console.log(count.hundreds()); 

//task_2_a
//выведет undefined
//переменная a определенна только внутри if
// if (!("a" in window)) {
//   var a = 1;
// }
// alert(a);


//task_2_b
//не выведет ничего. Здесь не будет такой функции как a, но будет функция b, если написать
//alert(b) то выведется весь код функции.
// var b = function a(x) {
//   x && a(--x);
// };
// alert(a);


//task_2_c
//выведет код функции
// function a(x) {
//   return x * 2;
// }
// var a;
// alert(a);


//task_2_d
//выведет 10
// function b(x, y, a) {
//   arguments[2] = 10;
//   alert(a);
// }
// b(1, 2, 3);

//task_2_e
//думал, что выведет null, но после проверки было object Window
//не совсем понял как такое получилось
// function a() {
//   alert(this);
// }
// a.call(null);