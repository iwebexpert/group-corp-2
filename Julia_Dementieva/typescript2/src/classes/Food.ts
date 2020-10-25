import {ICoordinates} from '../interface/ShakeInterface';
import { Settings } from './Settings';
import { Board } from './Board';


export class Food {

    private _coord: ICoordinates;
    private _settings: Settings;
    private _board: Board;
    
    constructor(settings: Settings, board: Board){
        this._coord = {x:1, y:1};
        this._settings = settings;
        this._board = board;
    }

    //Получение координат новой ячейки и отрисовка на поле
    public setNewFood(): void{
        const food: ICoordinates = this.randomCoords();
        this._board.renderFood(food);
    }

    //Возвращает случайные координаты
    private randomCoords(): ICoordinates{
        while(true){
            this._coord.x = Math.floor(Math.random() * this._settings.currentParams.colsCount) + 1;
            this._coord.y = Math.floor(Math.random() * this._settings.currentParams.rowsCount) + 1;
            let cell: Element | null = this._board.getCell(this._coord);

            if(cell && cell.classList.contains('snake')){
                continue;
            }
            return this._coord;
        }
    }

    //Размещение еды на игровом поле
    public setFood(): void{
        this._board.renderFood(this._coord);
    }
}