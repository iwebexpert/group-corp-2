console.log(0 == null); // false
console.log(0 === null); // false
console.log(0 >= null); // true
console.log(0 <= null); // true
console.log(0 + null); // 0
console.log(Boolean(0), Boolean(null)); // false false
//  0  и null не равны; null и больше, и меньше нуля; и с 0, и с null можно выполнять арифметические операции (тут null преобразуется в 0);
// при преобразовании к логическому типу оба имеют значение false