//task 7
console.log(null > 0);  // false
console.log(null < 0);  // false
console.log(null == 0); // false
console.log(null >= 0); // true
console.log(null <= 0); // true

// сравнения преобразуют null в число и работают как с 0
// для нестрогого равенства действует правило:
// null ни к чему не приводится и ничему другому не равен (кроме undefined)