let inputValue = document.querySelector('.incorrectTextInput');
let resultDIV = document.querySelector('.result');
let btn = document.querySelector('.btn');

btn.addEventListener('click', detectingText);

function detectingText() {
    let someText = inputValue.value;
    if (!someText) {
        Swal.fire(
            'Ошибка',
            'Пустой инпут'
        )
        resultDIV.textContent = '';
        return;
    }

    let result = someText.replace(/'/g, '"');
    result = result.replace(/\b"\b/g, '\'');
    resultDIV.textContent = result;

}