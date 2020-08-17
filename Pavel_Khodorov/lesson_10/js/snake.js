const FIELD_SIZE_X = 20;
const FIELD_SIZE_Y = 20;
const SNAKE_SPEED = 300;
let isGameStarted = false;
let snakeTimer;

let score = 0;

let direction = 'top';

let snake = [];

let snakeCoordX;
let snakeCoordY;

function init() {
    prepareGameField();

    document.getElementById('snake-start').addEventListener('click', startGameHandler);

    document.getElementById('snake-renew').addEventListener('click', refreshGameHandler);

    window.addEventListener('keydown', changeDirectionHandler);
}

function prepareGameField() {
    const gameTable = document.createElement('table');
    gameTable.classList.add('game-table');
    gameTable.id = 'game-table';

    for (let i = 0; i < FIELD_SIZE_X; i++) {
        var row = document.createElement('tr');
        row.classList.add('game-table-row');

        for (var j = 0; j < FIELD_SIZE_Y; j++) {
            var cell = document.createElement('td');
            cell.classList.add('game-table-cell');

            row.appendChild(cell);
        }

        gameTable.appendChild(row);
    }

    document.getElementById('snake-field').appendChild(gameTable);
}

function startGameHandler() {
    isGameStarted = true;
    respawn();

    snakeTimer = setInterval(move, SNAKE_SPEED);
    let createApple = createFood('apple');
    setTimeout(createApple, 500);
}

function refreshGameHandler() {
    window.location.reload();
}

function changeDirectionHandler(event) {
    switch (event.keyCode) {
        case 37:
            if (direction != 'right') direction = 'left';
            break;
        case 38:
            if (direction != 'bottom') direction = 'top';
            break;
        case 39:
            if (direction != 'left') direction = 'right';
            break;
        case 40:
            if (direction != 'top') direction = 'bottom';
            break;
    }
}

function respawn() {
    snakeCoordX = Math.floor(FIELD_SIZE_X / 2);
    snakeCoordY = Math.floor(FIELD_SIZE_Y / 2);

    var gameTable = document.getElementById('game-table');
    // head
    var snakeHead = gameTable.children[snakeCoordX].children[snakeCoordY];
    snakeHead.classList.add('snake-unit');
    // tail
    var snakeTail = gameTable.children[snakeCoordX + 1].children[snakeCoordY];
    snakeTail.classList.add('snake-unit');

    snake.push(snakeTail);
    snake.push(snakeHead);
}

function move() {
    var gameTable = document.getElementById('game-table');
    var newUnit;

    var i = 18;
    switch (direction) {
        case 'top':
            if (snakeCoordX == 0) {
                newUnit = gameTable.children[FIELD_SIZE_X - 1].children[snakeCoordY];
                snakeCoordX = FIELD_SIZE_X;
                snakeCoordX--;
            } else newUnit = gameTable.children[--snakeCoordX].children[snakeCoordY];
            break;
        case 'bottom':
            if (snakeCoordX == FIELD_SIZE_X - 1) {
                newUnit = gameTable.children[0].children[snakeCoordY];
                snakeCoordX = -1;
                snakeCoordX++;
            } else newUnit = gameTable.children[++snakeCoordX].children[snakeCoordY];
            break;
        case 'right':
            if (snakeCoordY == FIELD_SIZE_Y - 1) {
                newUnit = gameTable.children[snakeCoordX].children[0];
                snakeCoordY = -1;
                snakeCoordY++;
            } else newUnit = gameTable.children[snakeCoordX].children[++snakeCoordY];
            break;
        case 'left':
            if (snakeCoordY == 0) {
                newUnit = gameTable.children[snakeCoordX].children[FIELD_SIZE_Y - 1];
                snakeCoordY = FIELD_SIZE_Y;
                snakeCoordY--;
            } else newUnit = gameTable.children[snakeCoordX].children[--snakeCoordY];
            break;
    }

    if (!isSnakeUnit(newUnit)) {
        newUnit.classList.add('snake-unit');
        snake.push(newUnit);

        if (!isFood(newUnit)) {
            var snakeRemoved = snake.shift();
            snakeRemoved.classList.remove('snake-unit');
        }
    } else {
        gameOver();
    }
}

function isSnakeUnit(unit) {
    return snake.includes(unit);
}

function isFood(unit) {
    if (unit.classList.contains('food-unit')) {
        unit.classList.remove('food-unit');
        score++;
        addScore(score);
        createFood('apple');
        createFood('mongoose');
        return true;
    } else if (unit.classList.contains('mongoose-unit')) {
        gameOver();
    } else {
        return false;
    }
}

function createFood(obj) {
    var foodCreated = false;
    var gameTable = document.getElementById('game-table');

    while (!foodCreated) {
        var foodX = Math.floor(Math.random() * FIELD_SIZE_X);
        var foodY = Math.floor(Math.random() * FIELD_SIZE_Y);

        var foodCell = gameTable.children[foodX].children[foodY];

        if (!foodCell.classList.contains('snake-unit')) {
            if (obj == 'apple') foodCell.classList.add('food-unit');
            if (obj == 'mongoose') foodCell.classList.add('mongoose-unit');
            foodCreated = true;
        }
    }
}

function gameOver() {
    isGameStarted = false;
    clearInterval(snakeTimer);
    alert('GAME OVER');
    refreshGameHandler();
}

function addScore(score) {
    var totalScore = document.getElementById('total-score');
    totalScore.innerText = score;
}

window.onload = init;