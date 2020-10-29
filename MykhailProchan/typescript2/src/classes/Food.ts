import { Settings } from 'classes/Settings';
import { Board } from 'classes/Board';

export class Food {
    private settings: Settings;
    private board: Board;
    private x: number;
    private y: number;

    constructor(settings: Settings, board: Board) {
        this.settings = settings;
        this.board = board;
        this.x = 0;
        this.y = 0;
    }

    //Получение координат новой ячейки и отрисовка на поле
    setNewFood(): void {
        let food: this = this.randomCoords();
        this.board.renderFood({ x: food.x, y: food.y });
    }

    //Возвращает случайные координаты
    private randomCoords(): this {
        while (true) {
            this.x = Math.floor(Math.random() * this.settings.colsCount) + 1;
            this.y = Math.floor(Math.random() * this.settings.rowsCount) + 1;
            let cell: HTMLElement | null = this.board.getCell(this.x, this.y);

            if (cell) {
                if (cell.classList.contains('snake')) continue;
                return this;
            }
        }
    }

    //Размещение еды на игровом поле
    setFood(): void {
        this.board.renderFood({ x: this.x, y: this.y });
    }
}