import './style.css';

function draw(){
    
    //Ух сколько переменных 
    const chessTable: HTMLDivElement | null = document.querySelector(".chessTable");
    
    const chessDigWrapper: HTMLDivElement | null = document.createElement('div'); //Обертка для блоков с цифрами
    chessDigWrapper.className = 'chessDig__Wrapper'; 
    let chessDig : HTMLDivElement | null; // Блок с цифрой
    
    let chess: HTMLDivElement | null; //Блок шахматной клетки
    let chessField: HTMLDivElement | null = document.createElement('div'); //Шахматное поле
    chessField.className = 'chessField';
    let flag: boolean = true; // Флаг для переключения цветов. Подсмотрел на ютубе

    let chessLettersWrapper: HTMLDivElement | null = document.createElement('div'); //Обертка для блоков с буквами
    chessLettersWrapper.className = 'chessLet__Wrapper';

    let chessLettersArr: [string, string, string, string, string, string, string, string, string ] = [' ','A','B','C','D','E','F','G', 'H']; // Массив с буквами 
    let chessLet: HTMLDivElement | null; // Блок в который будет запихиваться буква



//отрисуем буквы
if(chessTable){
    chessTable.appendChild(chessLettersWrapper);
    for(let y = 0; y < 9;y++){
        chessLet = document.createElement('div');
        chessLet.className = 'chess';
        chessLet.innerHTML = chessLettersArr[y];
        chessLettersWrapper.appendChild(chessLet);
    }
}


let contWrapper: HTMLDivElement = document.createElement('div');
contWrapper.className = 'wrapper'; 

if(chessTable){
    chessTable.appendChild(contWrapper);
}


// отрисуем цифры
    for(let i = 1; i < 9; i++){
        chessDig = document.createElement('div');
        chessDig.className = 'chess';
        chessDig.innerHTML = i as string;
        chessDigWrapper.appendChild(chessDig);
    }
    contWrapper.appendChild(chessDigWrapper);
    contWrapper.appendChild(chessField);

//Отрисуем шахмотное поле
    for(let x = 0; x < 8; x++){
        for(let j = 0; j < 8; j++){
            if(j == 0) flag = !flag;
                chess = document.createElement('div');
                if (flag) chess.className = 'chess black';
                else chess.className = 'chess white';
                chessField.appendChild(chess);
                flag = !flag;
                } 
            }
}

draw();


