const convertBtn = document.querySelector(".replace");
const undoBtn = document.querySelector(".undo");
const text = document.querySelector(".text");

convertBtn.addEventListener("click", (e) => {
    let oldText = text.innerHTML;
    let newText = oldText.replace(/^'|(\s)'|'(\s)|'$/g, '$1"$2');
    console.log(newText);
    text.innerHTML = newText;
    text.style.color = "rgb(66, 105, 17)";
});

undoBtn.addEventListener("click", (e) => {
    let oldText = text.innerHTML;
    let newText = oldText.replace(/^"|(\s)"|"(\s)|"$/g, "$1'$2");
    console.log(newText);
    text.innerHTML = newText;
    text.style.color = "black";
})