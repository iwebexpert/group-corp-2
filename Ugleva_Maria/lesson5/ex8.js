function power(val, pow) {
    let res = val;
    if (pow === 0) return 1;
    if (pow < 0) return null;
    if (pow === 1) {
        return val;
    }
    else {
        return res = val * power(val, pow - 1);
    }
}