import {ISettings} from "./Settings";
import {ISnake} from "./Snake";
import {IBoard} from "./Board";

export interface IFood {
    setNewFood(): void;
    setFood(): void;
}

export class Food implements IFood{
    private x: number | null = null;
    private y: number | null = null;
    private readonly settings: ISettings;
    private readonly snake: ISnake;
    private readonly board: IBoard;

    public constructor (settings: ISettings, snake: ISnake, board: IBoard){
        this.settings = settings;
        this.snake = snake;
        this.board = board;
    }
    //Получение координат новой ячейки и отрисовка на поле
    public setNewFood(): void{
        const food: Food = this.randomCoords();
        if (food.x && food.y){
            this.board.renderFood({x: food.x, y: food.y});
        }
    }

    //Возвращает случайные координаты
    private randomCoords(): Food{
        while(true){
            this.x = Math.floor(Math.random() * this.settings.colsCount) + 1;
            this.y = Math.floor(Math.random() * this.settings.rowsCount) + 1;
            const cell: HTMLTableDataCellElement | null = this.board.getCell(this.x, this.y);
            if(cell && cell.classList.contains('snake')){
                continue;
            }
            return this;
        }
    }

    //Размещение еды на игровом поле
    public setFood(): void{
        if (this.x && this.y){
            this.board.renderFood({x: this.x, y: this.y});
        }
    }
}
