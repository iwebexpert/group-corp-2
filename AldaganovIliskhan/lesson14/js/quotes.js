let text = document.querySelector(".text");
let regExp = text.textContent;
document.addEventListener("click", (e) => {
  if (e.target.className === "new") {
    let newText = regExp.replace(/^'|'\B|\B'|'$/g, ' " ');
    text.textContent = newText;
  } else if (e.target.className === "old") {
    text.textContent = regExp;
  } else {
    return;
  }
});
