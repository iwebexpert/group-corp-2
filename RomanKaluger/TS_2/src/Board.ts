import {ISettings} from "./Settings";
import {bodyCoordsType, ISnake} from "./Snake";

export interface IBoard {
    renderBoard(): void;
    renderSnake(): void;
    isNextStepWall(nextSnakeCoords: bodyCoordsType): boolean;
    isNextStepSnake(nextSnakeCoords: bodyCoordsType): boolean;
    renderFood(coords: bodyCoordsType): void;
    isHeadOnFoodSnake(): boolean;
    clear(): void;
    getCell(x: number, y: number): HTMLTableDataCellElement | null;
}
export class Board implements IBoard{
    private readonly boardElement: HTMLElement | null;
    private readonly settings: ISettings;
    private readonly snake: ISnake;
    public constructor(settings: ISettings, snake: ISnake){
        this.boardElement = document.getElementById('game');
        this.settings = settings;
        this.snake = snake;
    }

    public renderBoard(): void{
        if (this.boardElement){
            this.boardElement.innerHTML = '';
        }
        for(let row: number = 0; row < this.settings.rowsCount; row++){
            const tr: HTMLTableRowElement = document.createElement('tr');
            if (this.boardElement) {
                this.boardElement.appendChild(tr);
            }
            for(let col: number = 0; col < this.settings.colsCount; col++){
                const td: HTMLTableDataCellElement = document.createElement('td');
                tr.appendChild(td);
            }
        }
    }

    public renderSnake(): void{
        const snakeElements: HTMLTableDataCellElement[] | null = this.getSnakeBodyElements(this.snake.body);
        if(snakeElements){
            snakeElements.forEach((td: HTMLTableDataCellElement): void => {
                td.classList.add('snake');
            });
        }
    }

    //Получение 1 ячейки по координатам
    public getCell(x: number, y: number): HTMLTableDataCellElement | null{
        return this.boardElement && this.boardElement.querySelector(`tr:nth-child(${y}) td:nth-child(${x})`);
    }

    //Получение всех блоков тела змейки
    private getSnakeBodyElements(bodyCoords: bodyCoordsType[] = []): HTMLTableDataCellElement[] | null{
        const bodyElements: HTMLTableDataCellElement[] = [];
        if(bodyCoords.length > 0){
            let value: bodyCoordsType;
            for(value of bodyCoords){
                const element: HTMLTableDataCellElement | null = this.getCell(value.x, value.y);
                if (element){
                    bodyElements.push(element);
                }
            }
            return bodyElements;
        }
        return null;
    }

    //Упирается ли змейка в стену
    public isNextStepWall(nextSnakeCoords: bodyCoordsType): boolean{
        return !this.getCell(nextSnakeCoords.x, nextSnakeCoords.y);
    }

    public isNextStepSnake(nextSnakeCoords: bodyCoordsType): boolean{
        const nextCell: HTMLTableDataCellElement | null = this.getCell(nextSnakeCoords.x, nextSnakeCoords.y);
        return !!nextCell && nextCell.classList.contains('snake');
    }

    //Еда на игровом поле (добавление)
    public renderFood(coords: bodyCoordsType): void{
        const foodCell: HTMLTableDataCellElement | null = this.getCell(coords.x, coords.y);
        foodCell && foodCell.classList.add('food');
    }

    public isHeadOnFoodSnake(): boolean{
        const food: HTMLTableDataCellElement | null = this.boardElement && this.boardElement.querySelector('.food');
        return !!food && food.classList.contains('snake');
    }

    //Очистка поля
    public clear(): void{
        const tdAll: NodeListOf<HTMLTableDataCellElement> = document.querySelectorAll('td');
        tdAll.forEach((td: HTMLTableDataCellElement): void => {
            td.className = '';
        });
    }
}
