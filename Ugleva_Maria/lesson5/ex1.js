var a = 1, b = 1, c, d;

// c = 2, потому что ++a  - это a = a + 1 (префиксный инкремент). Два плюса стоят перед операндом - значит сначала выполнится увеличение 'a', а затем присваивание нового значения переменной 'c'.
c = ++a; alert(c);           // 2
// b++ - это тоже самое, что b = b + 1, но два плюса стоят после операнда (постфиксный инкремент), а это значит, что сначала выполнится присваивание, а потом увеличение переменной 'b'.
d = b++; alert(d);           // 1
// до начала операции ниже а = 2, затем идет префиксный инкремент (увеличиваем 'a', т. к. его приоритет выше) и a = 3, затем складываем 'a' с 2.
c = (2+ ++a); alert(c);      // 5
// до начала операции ниже b = 2, затем идет постфиксный инкремент, значит мы сначала складывем 2 и 'b' и только потом увеличиваем 'b' на 1.
d = (2+ b++); alert(d);      // 4
// a = 3, т. к. изначально её значение 1, и 2 раза мы её увеличили на 1.
alert(a);                    // 3
// b = 3, т. к. изначально её значение 1, и 2 раза мы её увеличили на 1.
alert(b);                    // 3