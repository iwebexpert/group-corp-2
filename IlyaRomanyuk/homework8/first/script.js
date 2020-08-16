const wrapper = document.querySelector(".wrapper-content");
const vertical = document.querySelector(".rows");
const horizontal = document.querySelector(".columns");

function createChessBoard(rows, columns) {
  for (let i = 0; i < rows.length; i++) {
    let element = document.createElement("div");
    element.classList.add("rows-item");
    element.textContent = rows[i];
    vertical.append(element);
    for (let j = 0; j < columns.length; j++) {
      if (!i) {
        let element = document.createElement("div");
        element.classList.add("columns-item");
        element.textContent = columns[j];
        horizontal.append(element);
      }
      let squad = document.createElement("div");
      squad.classList.add("wrapper-item");
      if (i % 2) {
        squad.classList.add(j % 2 == 0 ? "black" : "white");
        wrapper.append(squad);
      } else {
        squad.classList.add(j % 2 == 0 ? "white" : "black");
        wrapper.append(squad);
      }
    }
  }
}

let rows = [8, 7, 6, 5, 4, 3, 2, 1];
let columns = ["A", "B", "C", "D", "E", "F", "G", "H"];

createChessBoard(rows, columns);
