class Board {
    constructor() {
        this.boardElement = document.getElementById('game');
    }

    init(settings, snake) {
        this.settings = settings;
        this.snake = snake;
    }

    renderBoard() {
        this.boardElement.innerHTML = '';
        for (let row = 0; row < this.settings.rowsCount; row++) {
            let tr = document.createElement('tr');
            this.boardElement.appendChild(tr);

            for (let col = 0; col < this.settings.colsCount; col++) {
                let td = document.createElement('td');
                tr.appendChild(td);
            }
        }
    }

    renderSnake() {
        const snakeElements = this.getSnakeBodyElements(this.snake.body);
        if (snakeElements) {
            snakeElements.forEach(function (td) {
                td.classList.add('snake');
            });
        }
    }

    //Получение 1 ячейки по координатам
    getCell(x, y) {
        return this.boardElement.querySelector(`tr:nth-child(${y}) td:nth-child(${x})`);
    }

    //Получение всех блоков тела змейки
    getSnakeBodyElements(bodyCoords = []) {
        let bodyElements = [];
        if (bodyCoords.length > 0) {
            for (let value of bodyCoords) {
                let element = this.getCell(value.x, value.y);
                bodyElements.push(element);
            }

            return bodyElements;
        }
        return null;
    }

    //Упирается ли змейка в стену
    isNextStepWall(nextSnakeCoords) {
        let nextCell = this.getCell(nextSnakeCoords.x, nextSnakeCoords.y);
        return nextCell === null;
    }

    //Еда на игровом поле (добавление)
    renderFood(coords) {
        let foodCell = this.getCell(coords.x, coords.y);
        foodCell.classList.add('food');
    }

    isHeadOnFoodSnake() {
        return this.boardElement.querySelector('.food').classList.contains('snake');
    }

    //Очистка поля
    clear() {
        const tdAll = document.querySelectorAll('td');
        tdAll.forEach(function (td) {
            td.className = '';
        });
    }
}