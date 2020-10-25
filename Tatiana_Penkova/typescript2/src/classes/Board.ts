import { AbstractClass } from "./Abstract";
import { Snake } from "./Snake";
import { SnakeCords } from "./interfaces/SnakeCords";


export class Board extends AbstractClass {
    protected snake: Snake;
    public constructor(el: string, snake: Snake) {
        super(el);
        this.snake = snake;
    }

    public renderBoard(): void {
        if (this.boardElement) {
            this.boardElement.innerHTML = "";
            for (let row: number = 0; row < this.settings.rowsCount; row++) {
                let tr: HTMLTableRowElement = document.createElement("tr");
                this.boardElement.appendChild(tr);

                for (let col: number = 0; col < this.settings.colsCount; col++) {
                    let td: HTMLTableDataCellElement = document.createElement("td");
                    tr.appendChild(td);
                }
            }
        }
    };

    public renderSnake(): void {
        const snakeElements: HTMLTableDataCellElement[] | null = this.getSnakeBodyElements(this.snake.body);
        if (snakeElements) {
            snakeElements.forEach((td: HTMLTableDataCellElement): void => {
                td.classList.add("snake");
            });
        }
    };

    //Получение 1 ячейки по координатам
    public getCell({ x, y }: SnakeCords): HTMLTableDataCellElement | null {
        if (this.boardElement) {
            return this.boardElement.querySelector(`tr:nth-child(${y}) td:nth-child(${x})`);
        }
        return null;
    };

    //Получение всех блоков тела змейки
    public getSnakeBodyElements(bodyCoords: Array<SnakeCords> = []): HTMLTableDataCellElement[] | null {
        let bodyElements: HTMLTableDataCellElement[] = [];
        if (bodyCoords.length > 0) {
            for (let value of bodyCoords) {
                let element: HTMLTableDataCellElement | null = this.getCell(value);
                if (element)
                    bodyElements.push(element);
            }
        }
        return bodyElements;
    };


    //Упирается ли змейка в стену
    public isNextStepWall(nextSnakeCoords: SnakeCords): boolean {
        let nextCell: HTMLTableDataCellElement | null = this.getCell(nextSnakeCoords);
        return nextCell === null;
    };

    //Еда на игровом поле (добавление)
    public renderFood(coords: SnakeCords): void {
        let foodCell: HTMLTableDataCellElement | null = this.getCell(coords);
        if (foodCell) {
            foodCell.classList.add("food");
        }
    };

    public isHeadOnFoodSnake(): boolean | undefined {
        if (this.boardElement) {
            let food: Element | null = this.boardElement.querySelector(".food");
            if (food) {
                return food.classList.contains("snake");
            }
        }
    };

    //Очистка поля
    public clear(): void {
        const tdAll: NodeListOf<HTMLTableDataCellElement> = document.querySelectorAll("td");
        tdAll.forEach(function (td: HTMLTableDataCellElement): void {
            td.className = "";
        });
    };
};