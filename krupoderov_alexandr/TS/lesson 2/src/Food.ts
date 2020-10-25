import {Cords, ISnake} from "./Snake";
import {ISettings} from "./Settings";
import {IBoard} from "./Board";

export interface IFood {
    coords: Cords;
    settings: ISettings;
    snake: ISnake;
    board: IBoard;
    setNewFood(): void;
    setFood(): void
}

export default class Food implements IFood{
    public coords: Cords;
    public settings: ISettings;
    public snake: ISnake;
    public board: IBoard;
    constructor(settings: ISettings, snake: ISnake, board: IBoard){
        this.coords = {x: null, y: null};
        this.settings = settings;
        this.snake = snake;
        this.board = board;
    }

    //Получение координат новой ячейки и отрисовка на поле
    setNewFood(){
        const food = this.randomCoords();
        this.board.renderFood(food);
    }

    //Возвращает случайные координаты
    private randomCoords(){
        while(true){
            this.coords.x = Math.floor(Math.random() * this.settings.colsCount) + 1;
            this.coords.y = Math.floor(Math.random() * this.settings.rowsCount) + 1;
            let cell = this.board.getCell({x: this.coords.x, y: this.coords.y});

            if (cell)
            if(cell.classList.contains('snake')){
                continue;
            }
            return {x: this.coords.x, y: this.coords.y};
        }
    }

    //Размещение еды на игровом поле
    setFood(){
        this.board.renderFood(this.coords);
   }
}