
//Задание 1


function draw(){
    
    //Ух сколько переменных 
    let chessTable = document.querySelector(".chessTable"); //Создаем сам стол, внтури которого будет три блока - блок с буквами, цифрами и самой шахматной клеткой
    
    let chessDigWrapper = document.createElement('div'); //Обертка для блоков с цифрами
    chessDigWrapper.className = 'chessDig__Wrapper'; 
    let chessDig; // Блок с цифрой
    
    let chess; //Блок шахматной клетки
    let chessField = document.createElement('div'); //Шахматное поле
    chessField.className = 'chessField';
    let flag = true; // Флаг для переключения цветов. Подсмотрел на ютубе

    let chessLettersWrapper = document.createElement('div'); //Обертка для блоков с буквами
    chessLettersWrapper.className = 'chessLet__Wrapper';
    let chessLettersArr = [' ','A','B','C','D','E','F','G', 'H']; // Массив с буквами 
    let chessLet; // Блок в который будет запихиваться буква



//отрисуем буквы
    chessTable.appendChild(chessLettersWrapper);
    for(let y = 0; y < 9;y++){
        chessLet = document.createElement('div');
        chessLet.className = 'chess';
        chessLet.innerHTML = chessLettersArr[y];
        chessLettersWrapper.appendChild(chessLet);
    }

//добавляем обертку для выравнивания на флексах

let contWrapper = document.createElement('div');
contWrapper.className = 'wrapper'; 
chessTable.appendChild(contWrapper);

// отрисуем цифры
    for(let i = 1; i < 9;i++){
        chessDig = document.createElement('div');
        chessDig.className = 'chess';
        chessDig.innerHTML = i;
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