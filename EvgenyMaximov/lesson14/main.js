const container = document.querySelector(".container");
let text = document.querySelector(".text");
let str = text.innerHTML;

document.addEventListener("DOMContentLoaded", () => {
  container.addEventListener("click", (e) => {
    if (e.target.id === "do") {
      let newStr = str.replace(/^'|'\B|\B'|'$/g, ' " ');

      text.innerHTML = newStr;
    }
    if (e.target.id === "undo") {
      text.innerHTML = str;
    }
  });
});
