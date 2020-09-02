class Validator {
    static basePatternsName = {
        singleQuotes: 'singleQuotes'
    };
    constructor() {
        this.patterns = {};
    }
    initBasePatterns() {
        this.patterns[Validator.basePatternsName.singleQuotes] = /(?<!\b)'(.+?)('(?!\b)|\s')/gm;
    }
    validate(string, patternName) {
        return this.patterns[patternName].test(string);
    }
    replace(string, patternName, replacement) {
        return string.replace(this.patterns[patternName], replacement);
    }
}
class SpecialValidator extends Validator{
    constructor() {
        super();
    }
    replaceSingleQuotesToDouble(string) {
        return this.replace(string, Validator.basePatternsName.singleQuotes, '"$1"');
    }
}
module.exports = SpecialValidator;
