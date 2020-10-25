import {ISettings} from "./Settings";
import {Cords, ISnake} from "./Snake";

export interface IBoard {
    settings: ISettings;
    snake: ISnake;
    getCell(coords: Cords): Element | null | undefined;
    renderFood(coords: Cords): void;
    isHeadOnFoodSnake(): boolean | undefined;
    clear(): void;
    renderSnake(): void;
    isNextStepWall(coords: Cords): boolean
}

export default class Board implements IBoard {
    boardElement: HTMLElement | null;
    settings: ISettings;
    snake: ISnake;

    constructor(settings: ISettings, snake: ISnake) {
        this.boardElement = document.getElementById('game');
        this.settings = settings;
        this.snake = snake;
    };

    public renderBoard() {
        if (this.boardElement) {
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
    }

    public renderSnake() {
        const snakeElements = this.getSnakeBodyElements(this.snake.body);
        if (snakeElements) {
            snakeElements.forEach(function (td: Element | null | undefined): void {
                if (td) td.classList.add('snake');
            });
        }
    }

    //Получение 1 ячейки по координатам
    public getCell({x, y}: Cords): Element | null | undefined {
        if (this.boardElement) {
            return this.boardElement.querySelector(`tr:nth-child(${y}) td:nth-child(${x})`);
        }
    }

    //Получение всех блоков тела змейки
    public getSnakeBodyElements(bodyCoords: Array<Cords> = []) {
        let bodyElements = [];
        if (bodyCoords.length > 0) {
            for (let value of bodyCoords) {
                let coords: Cords = {
                    x: value.x,
                    y: value.y
                }
                let element = this.getCell(coords);
                bodyElements.push(element);
            }

            return bodyElements;
        }
        return null;
    }

    //Упирается ли змейка в стену
    public isNextStepWall(nextSnakeCoords: Cords) {
        let nextCell = this.getCell({x: nextSnakeCoords.x, y: nextSnakeCoords.y});
        return nextCell === null;
    }

    //Еда на игровом поле (добавление)
    public renderFood(coords: Cords) {
        let foodCell = this.getCell({x: coords.x, y: coords.y});
        if (foodCell) foodCell.classList.add('food');
    }

    public isHeadOnFoodSnake():boolean | undefined {
        if (this.boardElement) {
            let element = this.boardElement.querySelector('.food');
            if (element) return element.classList.contains('snake');
        }
    }

    public clear(): void{
        const tdAll: NodeListOf<HTMLTableDataCellElement> = document.querySelectorAll('td');
        tdAll.forEach((td: HTMLTableDataCellElement): void => {
            td.className = '';
        });
    }
}