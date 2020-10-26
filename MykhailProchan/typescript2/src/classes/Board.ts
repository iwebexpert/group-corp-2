import { Settings } from './Settings'
import { Snake, coords } from './Snake'

export class Board {
    private boardElement: HTMLElement | null
    private settings: any
    private snake: Snake

    constructor(settings: Settings, snake: any) {
        this.settings = settings;
        this.snake = snake;
        this.boardElement = document.getElementById('game');
    }

    renderBoard(): void {
        if (!this.boardElement) return

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

    renderSnake(): void {
        if (!this.snake) return

        const snakeElements = this.getSnakeBodyElements(this.snake.body);
        if (snakeElements) {
            snakeElements.forEach(function (td) {
                if (!td) return
                td.classList.add('snake');
            });
        }
    }

    //Получение 1 ячейки по координатам
    getCell(x: number, y: number): HTMLElement | null {
        if (!this.boardElement) return null
        return this.boardElement.querySelector(`tr:nth-child(${y}) td:nth-child(${x})`);
    }

    //Получение всех блоков тела змейки
    getSnakeBodyElements(bodyCoords: coords[] = []): (HTMLElement | null)[] | null {
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
    isNextStepWall(nextSnakeCoords: coords): boolean {
        let nextCell = this.getCell(nextSnakeCoords.x, nextSnakeCoords.y);
        return nextCell === null;
    }

    //Еда на игровом поле (добавление)
    renderFood(coords: coords): void {
        let foodCell = this.getCell(coords.x, coords.y);
        if (!foodCell) return
        foodCell.classList.add('food');
    }

    isHeadOnFoodSnake(): boolean | null {
        if (!this.boardElement) return null
        return this.boardElement.querySelector('.food')!.classList.contains('snake');
    }

    //Очистка поля
    clear(): void {
        const tdAll = document.querySelectorAll('td');
        tdAll.forEach(function (td) {
            td.className = '';
        });
    }
}