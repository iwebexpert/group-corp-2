//task 1
var a = 1, b = 1, c, d;
c = ++a; console.log(c);           // 2 - потому что ++a вернет a увелинную на 1, а потом c = a
d = b++; console.log(d);           // 1 - потому что вернется значение b, а только потом b увеличится на 1
c = (2+ ++a); console.log(c);      // 5 - a уже равна 2, а здесь мы возвращаем a увеличенню на 1 => 2 + 3 = 5
d = (2+ b++); console.log(d);      // 4 - b = 2, получаем 2 + 2 = 4, а только затем b увеличится на 1
console.log(a);                    // 3 - последнее значение a = 3
console.log(b);                    // 3 - последнее значение b = 3