const text = document.querySelector('.text-content');
let textChanged = document.querySelector('.text-content--changed');

let textTemp;

const regExp = /"(\S\b)/g;

textTemp = `${text.textContent.replace(/'/g, '"')}`;
textChanged.textContent = `${textTemp.replace(regExp, "'$1")}`;

