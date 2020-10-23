import SettingsStruct from "../interfaces/SettingsStruct";
import Snake from "./Snake";
import Coords from "../interfaces/Coords";

export default class Board {
    private readonly boardElement: HTMLElement | null;
    private settings: SettingsStruct;
    private snake: Snake;

    constructor(settings: SettingsStruct, snake: Snake){
        this.boardElement = document.getElementById('game');
        this.settings = settings;
        this.snake = snake;
    }

    public renderBoard(): void{
        if(this.boardElement && this.settings.rowsCount && this.settings.colsCount) {
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

    public renderSnake(): void{
        if (this.snake.body) {
            const snakeElements = this.getSnakeBodyElements(this.snake.body);
            if (snakeElements) {
                snakeElements.forEach(function (td) {
                    td.classList.add('snake');
                });
            }
        }
    }

    //Получение 1 ячейки по координатам
    public getCell(x: number, y: number): Element | null{
        return this.boardElement && this.boardElement.querySelector(`tr:nth-child(${y}) td:nth-child(${x})`);
    }

    //Получение всех блоков тела змейки
    public getSnakeBodyElements(bodyCoords: Coords[] = []){
        let bodyElements: Element[] = [];
        if(bodyCoords.length > 0){
            for(let value of bodyCoords) {
                let element: Element | null;
                if (this.getCell(value.x, value.y)){
                    element = this.getCell(value.x, value.y);
                    if (element)
                        bodyElements.push(element);
                }
            }

            return bodyElements;
        }
        return null;
    }

    //Упирается ли змейка в стену
    public isNextStepWall(nextSnakeCoords: Coords): boolean{
        let nextCell = this.getCell(nextSnakeCoords.x, nextSnakeCoords.y);
        return nextCell === null;
    }

    //Еда на игровом поле (добавление)
    public renderFood(coords: Coords) : void{
        let foodCell = this.getCell(coords.x, coords.y);
        if(foodCell)
            foodCell.classList.add('food');
    }

    public isHeadOnFoodSnake(): boolean | null{
        let boardElement: Element | null;
        if(this.boardElement){
            boardElement = this.boardElement.querySelector('.food');
        } else{
            boardElement = document.createElement('div');
        }
        return boardElement && boardElement.classList.contains('snake');
    }

    //Очистка поля
    clear(): void{
        const tdAll: NodeListOf<Element> = document.querySelectorAll('td');
        tdAll.forEach(function(td){
            td.className = '';
        });
    }
}