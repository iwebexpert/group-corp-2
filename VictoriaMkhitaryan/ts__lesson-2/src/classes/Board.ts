import { Settings } from './Settings';
import { Snake } from './Snake';
import { ICoordinates } from '../interface/ICoordinates';

export class Board {
    protected boardElement: HTMLElement;
    private snake: Snake;
    private settings: Settings;

    constructor(snake: Snake, settings: Settings) {
        const element = document.getElementById('game');
        if(element){
            this.boardElement = element;
        } else {
            throw new Error('Элемент не найден');
        }

        this.settings = settings;
        this.snake = snake;
    }

    renderBoard() {
        this.boardElement.innerHTML = '';
        for (let row = 0; row < this.settings.currentParams.rowsCount; row++) {
            let tr = document.createElement('tr');
            this.boardElement.appendChild(tr);

            for (let col = 0; col < this.settings.currentParams.colsCount; col++) {
                let td = document.createElement('td');
                tr.appendChild(td);
            }
        }
    }

    renderSnake() {
        if (this.snake.body) {
            const snakeElements: Element[] | null = this.getSnakeBodyElements(this.snake.body);
            if (snakeElements) {
                snakeElements.forEach(function (td) {
                    td.classList.add('snake');
                });
            }
        }
    }

    //Получение 1 ячейки по координатам
    getCell(value: ICoordinates): Element | null {
        return this.boardElement.querySelector(`tr:nth-child(${value.y}) td:nth-child(${value.x})`);
    }

    //Получение всех блоков тела змейки
    getSnakeBodyElements(bodyCoords: Array<ICoordinates> = []): Array<Element> | null {
        let bodyElements: Array<Element> = [];
        if (bodyCoords.length > 0) {
            for (let value of bodyCoords) {
                let element: Element | null = this.getCell(value);
                element && bodyElements.push(element);
            }

            return bodyElements;
        }
        return null;
    }

    //Упирается ли змейка в стену
    isNextStepWall(nextSnakeCoords: ICoordinates): boolean {
        let nextCell: Element | null = this.getCell(nextSnakeCoords);
        return nextCell === null;
    }

    //Еда на игровом поле (добавление)
    renderFood(coords: ICoordinates) {
        let foodCell: Element | null = this.getCell(coords);
        foodCell && foodCell.classList.add('food');
    }

    isHeadOnFoodSnake(): boolean | null {
        if(this.boardElement){
            let boardElement: HTMLElement | null = this.boardElement.querySelector('.food');
            return boardElement && boardElement.classList.contains('snake');
        }
        return false;
    }

    //Очистка поля
    clear() {
        const tdAll = document.querySelectorAll('td');
        tdAll.forEach(function (td) {
            td.className = '';
        });
    }
} 