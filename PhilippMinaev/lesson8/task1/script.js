"use strict";
const button = document.querySelector(".btn");
const container = document.querySelector("#container");

button.onclick = function () {
  console.log("1");
  let chessBoard = document.createElement("div");
  chessBoard.className = "chessBoard";
  container.appendChild(chessBoard);
  let string = "ABCDEFGH";
  for (let j = 0; j < 10; j++) {
    for (let i = 0; i < 10; i++) {
      let chessCell = document.createElement("div");
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
};
