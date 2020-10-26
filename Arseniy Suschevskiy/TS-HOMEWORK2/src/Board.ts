import { AbstractBoard, ICoordinates } from "./AbstractBoard";
import { Settings } from "./Settings";
import { Snake } from './Snake';

export class Board extends AbstractBoard{
    private snake: Snake;
    private settings: Settings;

    constructor(settings: Settings, snake: Snake){
        super();
        this.settings = settings;
        this.snake = snake;
    }

    public renderBoard(): void{
        if (this.boardElement && this.settings.currentParams) {
            this.boardElement.innerHTML = '';
            for(let row = 0; row < this.settings.currentParams.rowsCount; row++){
                let tr = document.createElement('tr');
                this.boardElement.appendChild(tr);

                for(let col = 0; col < this.settings.currentParams.colsCount; col++){
                    let td = document.createElement('td');
                    tr.appendChild(td);
                }
            }
        }
    }

    public renderSnake(): void{
        if (this.snake.body) {
            const snakeElements: Element[] | null = this.getSnakeBodyElements(this.snake.body);
            if(snakeElements){
                snakeElements.forEach(function(td){
                    td.classList.add('snake');
                });
            }
        }
    }

    //Получение 1 ячейки по координатам
    public getCell(coords: ICoordinates ): Element | null{
        if(this.boardElement){
            return this.boardElement && this.boardElement.querySelector(`tr:nth-child(${coords.y}) td:nth-child(${coords.x})`);
        }
        return null;
    }

    //Получение всех блоков тела змейки
    public getSnakeBodyElements(bodyCoords: Array<ICoordinates> = []): Array<Element> | null{
        let bodyElements: Array<Element> = [];
        if(bodyCoords.length > 0){
            for(let value of bodyCoords){
                let element: Element | null = this.getCell(value);
                element && bodyElements.push(element);
            }

            return bodyElements;
        }
        return null;
    }

    //Упирается ли змейка в стену
    public isNextStepWall(nextSnakeCoords: ICoordinates): boolean{
        let nextCell: Element | null = this.getCell(nextSnakeCoords);
        return nextCell === null;
    }

    //Еда на игровом поле (добавление)
    public renderFood(coords: ICoordinates): void{
        let foodCell: Element | null = this.getCell(coords);
        foodCell && foodCell.classList.add('food');
    }

    public isHeadOnFoodSnake(): boolean | null {
        if(this.boardElement){
            let boardElement: HTMLElement | null = this.boardElement.querySelector('.food');
            return boardElement && boardElement.classList.contains('snake');
        }
        return false;
    }

    //Очистка поля
    public clear(): void{
        const tdAll: NodeListOf<Element> | null = document.querySelectorAll('td');
        tdAll.forEach(function(td){
            td.className = '';
        });
    }
}