function createChessBoard() {
    const boardTemplate = document.createElement('div');
    boardTemplate.classList.add('board');

    const woodenBackground = document.createElement('div');
    woodenBackground.classList.add('woodenBackground');
    boardTemplate.append(woodenBackground);

    const cellZone = document.createElement('div');
    cellZone.classList.add('cellZone');
    boardTemplate.append(cellZone);

    for (let i = 2; i < 10; i++) {
        for (let j = 2; j < 10; j++) {
            const cell = document.createElement('div');
            cell.classList.add(`${(i+j) % 2 === 0 ? 'whiteCell' : 'blackCell'}`);
            cell.style.gridArea = `${i} / ${j} / ${i+1} / ${j+1}`;
            boardTemplate.append(cell);
        }
    }

    const letterTags = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const numberTags = ['1', '2', '3', '4', '5', '6', '7', '8'];

    for (let i = 2; i < 10; i++) {
        const tagLetter = document.createElement('div');
        const tagNumber = document.createElement('div');

        tagLetter.classList.add('tag');
        tagNumber.classList.add('tag');

        tagLetter.innerHTML = `<div>${letterTags[i-2]}</div>`;
        tagNumber.innerHTML = `<div>${numberTags[i-2]}</div>`;

        const tagLetterCopy = tagLetter.cloneNode(true);
        const tagNumberCopy = tagNumber.cloneNode(true);

        tagLetter.style.gridArea = `${1} / ${i} / ${2} / ${i+1}`;
        tagNumber.style.gridArea = `${i} / ${1} / ${i+1} / ${2}`;

        tagLetterCopy.style.gridArea = `${10} / ${i} / ${11} / ${i+1}`;
        tagNumberCopy.style.gridArea = `${i} / ${10} / ${i+1} / ${11}`;

        boardTemplate.append(tagLetter, tagNumber, tagLetterCopy, tagNumberCopy);
    }

    document.body.append(boardTemplate);
}
createChessBoard();
