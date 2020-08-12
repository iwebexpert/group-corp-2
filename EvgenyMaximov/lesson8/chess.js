function boardGenerator() {
  let chessContainer = document.getElementById("root");
  chessContainer.setAttribute("class", "container");
  let sqr;

  for (let i = 1; i < 9; i++) {
    for (let j = 1; j < 9; j++) {
      sqr = document.createElement("div");
      sqr.setAttribute("class", "block");

      if (i % 2 == j % 2) {
        sqr.classList.add("white");
      } else {
        sqr.classList.add("black");
      }

      chessContainer.appendChild(sqr);
    }
  }
}

boardGenerator();

function numsAndLetters() {
  let numRow = document.getElementById("numbers");
  numRow.classList.add("numbers");
  let lettersRow = document.getElementById("letters");
  lettersRow.classList.add("letters");
  let lettersArr = ["A", "B", "C", "D", "E", "F", "G", "H"];
  let letter;
  let num;

  for (let i = 1; i < 9; i++) {
    num = document.createElement("span");
    num.textContent = `${i}`;

    letter = document.createElement("span");
    letter.textContent = `${lettersArr[i - 1]}`;

    numRow.appendChild(num);
    lettersRow.appendChild(letter);
  }
}
numsAndLetters();
