import {ICoordinates} from "./AbstractBoard";
import { Board } from "./Board";
import { Settings } from "./Settings";

export class Food {
    private readonly coords: ICoordinates;
    private settings: Settings;
    private board: Board;

    constructor(settings: Settings, board: Board){
        this.coords = {x:1, y:1};
        this.settings = settings;
        this.board = board;
    }

    //Получение координат новой ячейки и отрисовка на поле
    public setNewFood(): void{
        const food: ICoordinates = this.randomCoords();
        this.board.renderFood(food);
    }

    //Возвращает случайные координаты
    private randomCoords(): ICoordinates{
        while(true){
            this.coords.x = Math.floor(Math.random() * this.settings.currentParams.colsCount) + 1;
            this.coords.y = Math.floor(Math.random() * this.settings.currentParams.rowsCount) + 1;
            let cell: Element | null = this.board.getCell(this.coords);

            if(cell && cell.classList.contains('snake')){
                continue;
            }
            return this.coords;
        }
    }

    //Размещение еды на игровом поле
    public setFood(): void{
        this.board.renderFood(this.coords);
    }
}