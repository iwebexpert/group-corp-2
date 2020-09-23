class Board {
  constructor() {
    this.board = document.getElementById("board");
    this.numsLeft = document.getElementById("numsLeft");
    this.numsRight = document.getElementById("numsRight");

    let countLeft = 8;
    let countRight = 8;

    for (let i = 1; i <= 8; i++) {
      for (let j = 1; j <= 8; j++) {
        if (j == 1) {
          this.numsLi = this.createElement("div", "numsLi");
          this.numsLeft.append(this.numsLi);
          this.numsLi.textContent = countLeft--;
        }
        if (j == 8) {
          this.numsLi = this.createElement("div", "numsLi");
          this.numsRight.append(this.numsLi);
          this.numsLi.textContent = countRight--;
        }
        if ((i + j) % 2 == 0) {
          this.boardWhitePart = this.createElement("div", "white");
          this.board.append(this.boardWhitePart);
        } else {
          this.boardBlackPart = this.createElement("div", "black");
          this.board.append(this.boardBlackPart);
        }
      }
    }
  }

  createElement(elementTag, elementClass) {
    const element = document.createElement(elementTag);
    if (elementClass) {
      element.classList.add(elementClass);
    } 
    return element;
  }
}

function createBoard() {
  new Board();
}

createBoard();