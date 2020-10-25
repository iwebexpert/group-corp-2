import { Settings } from './Settings';
import { Snake } from './Snake';
import { ABoard } from './AbstractBoard';
import {ICoordinates} from '../interface/ShakeInterface';

export class Board extends ABoard{

    private _snake: Snake;
    private _settings: Settings;

    constructor(settings: Settings, snake: Snake){
        super();
        this._settings = settings;
        this._snake = snake;
    }

    public renderBoard(): void{
        if(this._boardElement && this._settings.currentParams){
            this._boardElement.innerHTML = '';
            for(let row = 0; row < this._settings.currentParams.rowsCount; row++){
                let tr: HTMLElement = document.createElement('tr');
                this._boardElement.appendChild(tr);

                for(let col = 0; col < this._settings.currentParams.colsCount; col++){
                    let td: HTMLElement = document.createElement('td');
                    tr.appendChild(td);
                }
            }
        }
    }

    public renderSnake(): void{
        if(this._snake.body){
            const snakeElements: Element[] | null = this.getSnakeBodyElements(this._snake.body);
            if(snakeElements){
                snakeElements.forEach(function(td){
                    td.classList.add('snake');
                });
            }
        }      
    }

    //Получение 1 ячейки по координатам
    public getCell(coord: ICoordinates ): Element | null{
        if(this._boardElement){
            return this._boardElement && this._boardElement.querySelector(`tr:nth-child(${coord.y}) td:nth-child(${coord.x})`);
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
        if(this._boardElement){
            let boardElement: HTMLElement | null = this._boardElement.querySelector('.food');
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