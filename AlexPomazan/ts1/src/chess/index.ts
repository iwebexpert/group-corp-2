import "./style.css";

const chess: HTMLDivElement | null = document.querySelector(".chess");
const getChessBoard = (): HTMLDivElement[] => {
  const letters: HTMLDivElement | null = document.querySelector(".letters");
  const numbers: HTMLDivElement | null = document.querySelector(".numbers");
  const arrayOfLetters: string[] = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const arrayOfNumbers: string[] = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const cellArray: HTMLDivElement[] = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const blackCell: HTMLDivElement = document.createElement("div");
      const whiteCell: HTMLDivElement = document.createElement("div");
      blackCell.className = "black-cell";
      whiteCell.className = "white-cell";
      if ((i + j) % 2 == 0) {
        cellArray.push(whiteCell);
      } else cellArray.push(blackCell);
    }
  }
  for (let i = 0; i < arrayOfLetters.length; i++) {
    const letter: HTMLDivElement = document.createElement("div");
    letter.className = "letter";
    letter.textContent = arrayOfLetters[i];
    if (letters) {
      letters.appendChild(letter);
    }
  }
  for (let i = 0; i < arrayOfNumbers.length; i++) {
    const number: HTMLDivElement = document.createElement("div");
    number.className = "number";
    number.textContent = arrayOfNumbers[i];
    if (numbers) {
      numbers.appendChild(number);
    }
  }
  return cellArray;
};
if (chess) {
  chess.append(...getChessBoard());
}
