let innerContent = '\'sdas\'dasdasdsd\'';

let result = innerContent.replace(/\B'|'\B/g, '"');
console.log(result);