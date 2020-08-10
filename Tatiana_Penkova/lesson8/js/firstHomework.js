const clicker = document.getElementById("clicker");
const container = document.querySelector(".container");

clicker.addEventListener("click", () => {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            let fields = document.createElement("div");
            if (i % 2 == j % 2) {
                fields.classList.add("white", "fields");
            } else {
                fields.classList.add("black", "fields");
            }
            container.appendChild(fields);
        }
    }

    for (let i = 0; i < 8; i++) {
        let field = document.querySelectorAll(".fields")
        let numbers = document.createElement("span");
        numbers.textContent = `${i + 1}`;
        numbers.classList.add("top");
        field[i].appendChild(numbers);
    }

    for (let i = 56; i < 64; i++) {
        let field = document.querySelectorAll(".fields")
        let numbers = document.createElement("span");
        numbers.textContent = `${i - 55}`;
        numbers.classList.add("bottom");
        field[i].appendChild(numbers);

    }

    let field = document.querySelectorAll(".fields")
    let letters = document.createElement("span");
    letters.textContent = `A B C D E F G H`;
    letters.classList.add("left");
    field[0].appendChild(letters);

    let letter = document.createElement("span");
    letter.textContent = `A B C D E F G H`;
    letter.classList.add("right");
    field[63].appendChild(letter);

    clicker.style.display = "none";
})