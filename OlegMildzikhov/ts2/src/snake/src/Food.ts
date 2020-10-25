import { Snake } from './Snake';
import { Board } from './Board';
import { Settings } from './Settings';
import {Coordinates} from './Coordinates';

export class Food {
    public settings: Settings;
    public snake: Snake;
    public board: Board;
    public x = 0;
    public y = 0;

    public constructor(settings: Settings, snake: Snake, board: Board) {
        this.settings = settings;
        this.snake = snake;
        this.board = board;
    };

    //Получение координат новой ячейки и отрисовка на поле
    public setNewFood(): void {
        this.board.renderFood(this.randomCoords());
    };

    //Возвращает случайные координаты
    public randomCoords(): Coordinates {
        while (true) {
            this.x = Math.floor(Math.random() * this.settings.colsCount) + 1;
            this.y = Math.floor(Math.random() * this.settings.rowsCount) + 1;
            const coordinates: Coordinates = {
                x: this.x,
                y: this.y,
            };
            let cell: Element | null | undefined = this.board.getCell(coordinates);
            if (cell) {
                if (cell.classList.contains("snake")) {
                    continue;
                }
            }
            return coordinates;
        }
    };

    //Размещение еды на игровом поле
    public setFood(): void {
        this.board.renderFood(this);
    };
}