function printPrime() {
    let i = 2;
    let fl;
    while (i <= 100) {
        let j = 2;
        fl = 0;
        while (j <= Math.sqrt(i)) {
            if (i % j === 0) {
                fl = 1;
                break;
            }
            j++;
        }
        if (!fl) {
            console.log(i);
        }
        i++;
    }
}
printPrime();