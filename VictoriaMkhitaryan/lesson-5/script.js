function task1() {
  var a = 1, b = 1, c, d;
  // в данном выражении исспользуется префиксная форма инкремента => сначала увеличивается 
  // значение переменной, затем присваивание
  c = ++a; alert(c);           // 2

  // тут наоборот постфиксная форма => сначала присваивание, затем инкремент
  d = b++; alert(d);           // 1

  // тот же принцип, префиксный инкремент (надеюсь не надо расписывать)
  c = (2+ ++a); alert(c);      // 5

  // постфиксный инкремент
  d = (2+ b++); alert(d);      // 4

  // в 1м и 3м выражении увеличивался
  alert(a);                    // 3

  // во 2м и 4м выражении увеличивался
  alert(b);                    // 3
}

function task2() {
  // x = 5
  // операции происходят в следующем порядке (в соответствии с приоритетом):
  // 1. ()
  // 2. *=
  // 3. +
  var a = 2;
  var x = 1 + (a *= 2);
  alert(x);
}

function task3() {
  const a = ((Math.random() < 0.5) ? -1 : 1)*Math.random()*100;
  const b = ((Math.random() < 0.5) ? -1 : 1)*Math.random()*100;

  if (a >= 0 && b >= 0) {
    alert(a - b);
  } else if (a < 0 && b < 0) {
    alert(a*b);
  } else if (a > 0 && b < 0 || a < 0 && b > 0) {
    alert(a+b);
  }
}

function task4() {
  // Присвоить переменной а значение в промежутке [0..15]. С помощью оператора switch организовать вывод чисел от a до 15.
  const a = Math.floor(Math.random()*15+1);

  // если я правильно поняла задание, то оно очень странное
  // наверное стоило бы хотя бы диапазон уменьшить
  // а то цикл напрашивается

  switch(a) {
    case 0:
      alert(0);
    case 1:
      alert(1);
    case 2:
      alert(2);
    case 3:
      alert(3);
    case 4:
      alert(4);
    case 5:
      alert(5);
    case 6:
      alert(6);
    case 7:
      alert(7);
    case 8:
      alert(8);
    case 9:
      alert(9);
    case 10:
      alert(10);
    case 11:
      alert(11);
    case 12:
      alert(12);
    case 13:
      alert(13);
    case 14:
      alert(14);
    case 15:
      alert(15);
      break;

    default:
    alert('Упс...');
  }

}

function sum(a, b) {
  return(a + b);
}

function minus(a, b) {
  return(a - b);
}

function multiply(a, b) {
  return(a*b);
}

function divide(a, b) {
  return(a/b);
}

function task5() {
  // Реализовать четыре основные арифметические операции в виде функций с двумя параметрами. Обязательно использовать оператор return.
  

  alert(sum(1, 2));
  alert(minus(1, 2));
  alert(multiply(1, 2));
  alert(divide(1, 2));
}

function mathOperation(arg1, arg2, operation) {
let res;
switch(operation) {
  case 'sum':
    res = sum(arg1, arg2);
    break;
  case 'minus':
    res = minus(arg1, arg2);
    break;
  case 'multiply':
    res = multiply(arg1, arg2);
    break;
  case 'divide':
    res = divide(arg1, arg2);
    break;
  
  default:
    alert('Упс...');
}

alert(res);
}


function task6() {
  mathOperation(1, 2, 'sum');
  mathOperation(1, 2, 'minus');
  mathOperation(1, 2, 'multiply');
  mathOperation(1, 2, 'divide');
}

function task7() {
  // Сравнить null и 0. Объяснить результат

  // По спецификации, для выяснения результата (истино/ложно) работы операторов сравнения > и <, 
  // пропускают выражение через абстрактный алгоритм сравнения для отношений
  // null преобразуется в +0, а 0 остается 0 => false
  console.log(null > 0); // false
  console.log(null < 0); // false

  // пропускают выражение через абстрактный алгоритм сравнения для равенств
  // 1. тип null отличается от типа 0
  // 2. тип 1го значения null
  // 3. за ссчет предыдущих 2х шагов были пропущены из алгоритма 21 шаг
  // остался последний который возвращает false => ответ false
  console.log(null == 0); // false

  // если null < 0 принимает значение false, то null >= 0 принимает значение true
  // если не разбираться то это очень сильно выбивает из колеи 
  console.log(null >= 0); // true
}

function power(val, pow) {
  if (pow == 1) {
    return val;
  } else {
    return val*power(val, pow - 1);
  }
}

function task8() {
  alert(power(2, 10));
}