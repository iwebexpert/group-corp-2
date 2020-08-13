function createChessboard() {
  const container = document.querySelector('.container');
  const markingTopContainer = createElement('div', 'markings');
  container.append(markingTopContainer);

  const centerContainer = createElement('div', 'center');
  container.append(centerContainer);

  const markingLeftContainer = createElement('div', 'markings-side');
  const cellsContainer = createElement('div', 'cells');
  const markingRightContainer = createElement('div', 'markings-side');
  centerContainer.append(markingLeftContainer);
  centerContainer.append(cellsContainer);
  centerContainer.append(markingRightContainer);

  const markingBottomContainer = createElement('div', 'markings');
  container.append(markingBottomContainer);

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const cell = createElement('div', 'cell');
      cell.classList.add((i + j)%2 ? 'black' : 'white');
      cellsContainer.append(cell);
    }
  }

  const markingLetter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  for (let i = 0; i < 8; i++) {
    const markingTop = createElement('div', 'marking');
    markingTopContainer.append(markingTop);
    markingTop.textContent = markingLetter[i];

    const markingBottom = createElement('div', 'marking');
    markingBottomContainer.append(markingBottom);
    markingBottom.textContent = markingLetter[i];

    const markinLeft = createElement('div', 'marking');
    markingLeftContainer.append(markinLeft);
    markinLeft.textContent = i + 1;

    const markinRight = createElement('div', 'marking');
    markingRightContainer.append(markinRight);
    markinRight.textContent = i + 1;
  }
  
  document.body.append(container);
}

function createElement(elem, classElem) {
  const element = document.createElement(elem);
  if (classElem) {
    element.classList.add(classElem);
  }

  return element;
}

createChessboard();