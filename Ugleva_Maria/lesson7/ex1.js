function numToObj(number) {
    if (0 <= number && number < 1000) {
        let numStr = String(number);
        let result = {};
        let arr = ['единицы', 'десятки', 'сотни'];
        for (let i = 0; i < numStr.length; i++) {
            result[arr[i]] = +numStr.split('').reverse().join('')[i];
        }
        return result;
    }
    console.log("Что-то не так");
    return {};
}