const root = document.getElementById('root');
const desk = document.createElement('div');
function createDesk() {
    desk.classList.add('desk');
    root.append(desk);
    for (let j = 0; j < 8; j++) {
        createMarkNum(j);
        for (let i = 0; i < 8; i++) {
            let elem = document.createElement('div');
            elem.classList.add('cell');
            if ((i + j) % 2 === 0) {
                elem.classList.add('white')
            }
            else {
                elem.classList.add('black')
            }
            desk.append(elem);
        }
    }
    createMarkWord();

}
function createMarkNum(number) {
    const numRow = document.createElement('div');
    numRow.classList.add('mark');
    numRow.innerHTML = number + 1;
    desk.append(numRow);
}

function createMarkWord() {
    const arrWord = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    arrWord.forEach(item => {
        let elem = document.createElement('div');
        elem.classList.add('mark');
        elem.innerHTML = item;
        desk.append(elem);
    });
}
window.onload = createDesk;