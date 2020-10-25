import { SnakeCords } from "./interfaces/SnakeCords";
import { AbstractClass } from "./Abstract";
import { Board } from "./Board";

export class Food extends AbstractClass implements SnakeCords {
    public constructor(
        protected board: Board,
        public x?: number | undefined,
        public y?: number | undefined
    ) {
        super();
        this.x = undefined;
        this.y = undefined;
        this.board = board;
    }

    //Получение координат новой ячейки и отрисовка на поле
    public setNewFood(): void {
        const food: Food = this.randomCoords();
        this.board.renderFood(food);
    };

    //Возвращает случайные координаты
    private randomCoords(): Food {
        while (true) {
            this.x = Math.floor(Math.random() * this.settings.colsCount) + 1;
            this.y = Math.floor(Math.random() * this.settings.rowsCount) + 1;
            const point: SnakeCords = {
                x: this.x,
                y: this.y,
            };
            let cell: Element | null | undefined = this.board.getCell(point);
            if (cell) {
                if (cell.classList.contains("snake")) {
                    continue;
                }
            }
            return this;
        }
    };

    //Размещение еды на игровом поле
    public setFood(): void {
        this.board.renderFood(this);
    };
};