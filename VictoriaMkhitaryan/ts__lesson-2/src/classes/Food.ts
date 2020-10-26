import { ICoordinates } from '../interface/ICoordinates';
import { Board } from './Board';
import { Settings } from './Settings'

export class Food {
    private coord: ICoordinates;
    private settings: Settings;
    private board: Board;

    constructor(settings: Settings, board: Board){
        this.coord = { x:1, y:1 };
        this.settings = settings;
        this.board = board;
    }

    //Получение координат новой ячейки и отрисовка на поле
    setNewFood(){
        const food: ICoordinates = this.randomCoords();
        this.board.renderFood(food);
    }

    //Возвращает случайные координаты
    randomCoords(): ICoordinates {
        while(true){
            this.coord.x = Math.floor(Math.random() * this.settings.currentParams.colsCount) + 1;
            this.coord.y = Math.floor(Math.random() * this.settings.currentParams.rowsCount) + 1;
            let cell: Element | null = this.board.getCell(this.coord);

            if(cell && cell.classList.contains('snake')){
                continue;
            }
            return this.coord;
        }
    }

    //Размещение еды на игровом поле
    setFood(){
        this.board.renderFood(this.coord);
    }
} 