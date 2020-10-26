import { Snake } from './Snake';
import { Settings } from './Settings';
import {Coordinates} from './Coordinates';

export class Board {
    boardElement: Element | null;
    settings: Settings;
    snake: Snake;

    constructor(settings: Settings, snake: Snake) {
        this.boardElement = document.getElementById("game");
        this.settings = settings;
        this.snake = snake;
    };

    public renderBoard(): void {
        if (this.boardElement) {
            this.boardElement.innerHTML = "";
            for (let row = 0; row < this.settings.rowsCount; row++) {
                let tr: Element | undefined | null = document.createElement("tr");
                this.boardElement.appendChild(tr);

                for (let col = 0; col < this.settings.colsCount; col++) {
                    let td: Element | undefined | null = document.createElement("td");
                    tr.appendChild(td);
                }
            }
        }
    };

    //Получение 1 ячейки по координатам
    public renderSnake(): void {
        const snakeElements = this.getSnakeBodyElements(this.snake.body);
        if (snakeElements) {
            snakeElements.forEach(function (td: Element | null | undefined): void {
                if (td) td.classList.add("snake");
            });
        }
    };

    public getCell({ x, y }: Coordinates): Element | undefined | null {
        if (this.boardElement) {
            return this.boardElement.querySelector(
                `tr:nth-child(${y}) td:nth-child(${x})`
            );
        }
    };

    //Получение всех блоков тела змейки
    public getSnakeBodyElements(
        bodyCoords: Coordinates[] = []
    ): Element[] | null {
        let bodyElements: Element[] | null = [];
        if (bodyCoords.length > 0) {
            for (let value of bodyCoords) {
                let coordinates: Coordinates = {
                    x: value.x,
                    y: value.y,
                };
                let element: Element | null | undefined = this.getCell(coordinates);
                if (element != undefined) {
                    bodyElements.push(element);
                }
            }
            return bodyElements;
        }
        return null;
    };

    //Упирается ли змейка в стену
    public isNextStepWall(nextSnakeCoords: Coordinates): boolean {
        let nextCell: Element | undefined | null = this.getCell({
            x: nextSnakeCoords.x,
            y: nextSnakeCoords.y,
        });
        return nextCell === null;
    };

    //Еда на игровом поле (добавление)
    public renderFood(coordinates: Coordinates): void {
        let foodCell: Element | undefined | null = this.getCell({
            x: coordinates.x,
            y: coordinates.y,
        });
        if (foodCell) {
            foodCell.classList.add("food");
        }
    };

    public isHeadOnFoodSnake(): boolean | void {
        if (this.boardElement) {
            const food = this.boardElement.querySelector(".food");
            if (food) {
                return food.classList.contains("snake");
            }
        }
    };

    //Очистка поля
    public clear(): void {
        const tdAll: NodeListOf<HTMLElement> = document.querySelectorAll("td");
        tdAll.forEach((td: HTMLElement): void => {
            td.className = "";
        });
    };
}