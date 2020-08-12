function one() {
	const chb = document.getElementById("chessboard");

	let a = 0;
	let letters = 'abcdefgh'

	for (let i = 0; i < 82; i++) {
		if (i == 0 || i == 81) {//цифры и углы
			for (let j = 0; j < 10; j++) {
				if (j == 0 || j == 9) {
					chb.appendChild(document.createElement("div"));
				} else {
					chb.appendChild(document.createElement("div")).innerText = j;
				}
			}
		} else if (i % 10 == 0 || i % 10 == 1) {//буквы
			chb.appendChild(document.createElement("div")).innerText = letters[a];
			if (i % 10 == 0) a++;
		} else if (parseInt(i / 10 + i) % 2 == 0) {//чёрные квадраты
			chb.appendChild(document.createElement("div")).classList.add("tile", "black-col");
		} else {//белые квадраты
			chb.appendChild(document.createElement("div")).classList.add("tile", "white-col");
		}
	}
}