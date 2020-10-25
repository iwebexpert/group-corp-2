import Snake from "./Snake";
import Board from "./Board";
import Coords from "../interfaces/Coords";
import SettingsStruct from "../interfaces/SettingsStruct";
import GameItem from "../abstractClasses/GameItem";

export default class Food extends GameItem{

    settings: SettingsStruct | null;
    snake: Snake | null;
    board: Board | null;

    constructor(settings: SettingsStruct, snake: Snake, board: Board){
        super();
        this.settings = settings;
        this.snake = snake;
        this.board = board;
    }

    //Получение координат новой ячейки и отрисовка на поле
    public setNewItem(): void{
        const food: Coords = this.randomCoords();
        if (this.board)
            this.board.renderFood(food);
    }

    //Возвращает случайные координаты
    protected randomCoords(): Coords{
        while(true){
            if (this.board && this.settings?.colsCount && this.settings?.rowsCount) {
                this.x = Math.floor(Math.random() * this.settings.colsCount) + 1;
                this.y = Math.floor(Math.random() * this.settings.rowsCount) + 1;
                let cell = this.board.getCell(this.x, this.y);

                if (cell && cell.classList.contains('snake')) {
                    continue;
                }
            }
            return this;
        }
    }

    //Размещение еды на игровом поле
    public setItem(): void{
        if (this.board)
            this.board.renderFood(this);
    }
}