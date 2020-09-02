const Validator = require('./Regexp_Task_Not_Shop');
function readTextFile(file) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", file);
        xhr.onreadystatechange = () => {
            if(xhr.readyState === XMLHttpRequest.DONE) {
                if(xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText).content);
                }
            }
        };
        xhr.send();
    });
}
describe('Validator class for 1-2 task', () => {
    const validator = new Validator();
    let textBefore, textAfter;
    beforeAll(async () => {
        textBefore = await readTextFile('https://masterkufa1.herokuapp.com/texts/textBefore');
        textAfter = await readTextFile('https://masterkufa1.herokuapp.com/texts/textAfter');
    });
    test('initializes properly', () => {
        expect(validator.patterns).toEqual({});
        validator.initBasePatterns();
        expect(Object.values(validator.patterns).length).toBeGreaterThan(0);
        Object.values(validator.patterns).forEach(x => {
            expect(x).toBeInstanceOf(RegExp);
        });
    });
    test('validate method works properly', () => {
        expect(validator.validate(`'gffg'`, Validator.basePatternsName.singleQuotes)).toBeTruthy();
        expect(validator.validate(`'gf'fg'`, Validator.basePatternsName.singleQuotes)).toBeTruthy();
    });
    test('replace method works properly', () => {
        expect(validator.replace(textBefore, Validator.basePatternsName.singleQuotes, '"$1"')).toBe(textAfter);
        expect(validator.replaceSingleQuotesToDouble(textBefore)).toBe(textAfter);
    });
});
