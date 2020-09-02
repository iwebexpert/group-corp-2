/*Дан большой текст, в котором для оформления прямой речи используются одинарные кавычки. Придумать шаблон, который заменяет одинарные кавычки на двойные.
Улучшить шаблон так, чтобы в конструкциях типа aren't одинарная кавычка не заменялась на двойную.*/

const strOriginal = document.querySelector('.text').innerHTML;
let regExp = /\B'|'\B/g;
let result = strOriginal.replace(regExp, '"');
const strResult = document.querySelector('.text');
strResult.innerHTML = result;