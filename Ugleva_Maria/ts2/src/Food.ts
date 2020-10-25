import Board from './Board';
import Settings from './Settings';
import Snake from './Snake';
type Coords = {
	x: number;
	y: number;
};
class Food {
	private x: number | null;
	private y: number | null;
	settings?: Settings;
	snake?: Snake;
	board?: Board;
	constructor() {
		this.x = null;
		this.y = null;
	}

	init(settings: Settings, snake: Snake, board: Board) {
		this.settings = settings;
		this.snake = snake;
		this.board = board;
	}

	//Получение координат новой ячейки и отрисовка на поле
	setNewFood(): void {
		const food: Coords = this.randomCoords();
		this.board && this.board.renderFood(food);
	}

	//Возвращает случайные координаты
	protected randomCoords(): Coords {
		while (true) {
			if (this.settings && this.board) {
				this.x = Math.floor(Math.random() * this.settings.colsCount) + 1;
				this.y = Math.floor(Math.random() * this.settings.rowsCount) + 1;
				let cell: HTMLTableDataCellElement | null = this.board.getCell(this.x, this.y);

				if (cell && cell.classList.contains('snake')) {
					continue;
				}
				return {x: this.x, y: this.y};
			}
		}
	}

	//Размещение еды на игровом поле
	setFood(): void {
        if (this.x && this.y) {
            this.board && this.board.renderFood({x: this.x, y: this.y});

        }
	}
}

export default Food;
