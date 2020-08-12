//Задание 1 шахматная доска
let main = document.createElement('div');
let whiteblock = document.createElement('div');
let blackblock = document.createElement('div');
let button = document.getElementById('CreateChessDask');
let check = false;
let str = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
function Create() {
    button.after(main);
    main.className = "Chess_block";
    for (let i = 1; i <= 10; i++) {
        for (let j = 1; j <= 10; j++) {
            if (i == 1 || i == 10) {
                if (j > 1 && j < 10 && i == 1) {
                    main.appendChild(document.createElement('div')).classList.add('empt_block_top');
                    document.querySelectorAll('.empt_block_top')[j - 2].innerHTML = j - 1;
                } else if (j > 1 && j < 10 && i == 10) {
                    main.appendChild(document.createElement('div')).classList.add('empt_block_down');
                    document.querySelectorAll('.empt_block_down')[j - 2].innerHTML = j - 1;
                } else {
                    main.appendChild(document.createElement('div')).classList.add('empt_block');
                }
            } else if (j == 1) {
                main.appendChild(document.createElement('div')).classList.add('str_block_left');
                document.querySelectorAll('.str_block_left')[i - 2].innerHTML = str[i - 2];
            } else if (j == 10) {
                main.appendChild(document.createElement('div')).classList.add('str_block_right');
                document.querySelectorAll('.str_block_right')[i - 2].innerHTML = str[i - 2];
            } else {
                if (check) {
                    main.appendChild(document.createElement('div')).classList.add('white_block');
                    check = !check;
                } else {
                    main.appendChild(document.createElement('div')).classList.add('black_block');
                    check = !check;
                }
            }
        }
        check = !check;
    }
    button.disabled = true;
}

document.getElementById('CreateChessDask').onclick = function () {
    Create();
}