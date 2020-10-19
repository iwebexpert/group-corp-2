import "./style.css";

const button: HTMLButtonElement | null = document.querySelector(".btn");
const container: HTMLDivElement | null = document.querySelector("#container");

if (button) {
  button.onclick = function () {
    let chessBoard: HTMLDivElement = document.createElement("div");
    chessBoard.className = "chessBoard";
    if (container) {
      container.appendChild(chessBoard);
      let string: string = "ABCDEFGH";
      for (let j = 0; j < 10; j++) {
        for (let i = 0; i < 10; i++) {
          let chessCell: HTMLDivElement = document.createElement("div");
          chessCell.className = "chessCell";
          chessBoard.appendChild(chessCell);
          if (j !== 0 && j !== 9 && (i == 0 || i == 9)) {
            chessCell.innerHTML = `${j}`;
          }
          if (i !== 0 && i !== 9 && (j == 0 || j == 9)) {
            chessCell.innerHTML = `${string[i - 1]}`;
          }
          if (i !== 0 && i !== 9 && j !== 0 && j !== 9) {
            if ((i % 2 == 0 && j % 2 == 0) || (i % 2 !== 0 && j % 2 !== 0)) {
              chessCell.classList.add("black");
            }
          }
        }
      }
    }
  };
}
