const parent = document.querySelector('.container');

const createText = (square, i, j) => {
    const wordArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const digitArr = [8, 7, 6, 5, 4, 3, 2, 1];
    if (i === 0) {
        const textSquare = wordArr[j];
        square.insertAdjacentText('beforeend', textSquare);
    }
    if (j === 0) {
        const textSquare = digitArr[i];
        square.insertAdjacentText('beforeend', textSquare);
    }
    parent.insertAdjacentElement('beforeend', square);
};

const createSquare = (color, i, j) => {
    const square = document.createElement('div');
    square.classList.add('square');
    if (color === 'black') {
        square.classList.add('square-black');
    }
    createText(square, i, j);
};

const init = () => {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (i % 2 === 0) {
                if (j % 2 === 0) {
                    createSquare('black', i, j);
                } else {
                    createSquare('white', i, j);
                }
            } else {
                if (j % 2 === 0) {
                    createSquare('white', i, j);
                } else {
                    createSquare('black', i, j);
                }
            }
        }
    }
};

init();