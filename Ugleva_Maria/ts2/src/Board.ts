import Settings from './Settings';
import Snake from './Snake';
type Coords = {
	x: number;
	y: number;
};
class Board {
	readonly boardElement: HTMLElement | null;
	settings?: Settings;
	snake?: Snake;

	constructor() {
		this.boardElement = document.getElementById('game');
	}

	init(settings: Settings, snake: Snake): void {
		this.settings = settings;
		this.snake = snake;
	}

	renderBoard(): void {
		if (this.boardElement && this.settings) {
			this.boardElement.innerHTML = '';
			for (let row = 0; row < this.settings.rowsCount; row++) {
				let tr: HTMLTableRowElement = document.createElement('tr');
				this.boardElement.appendChild(tr);

				for (let col = 0; col < this.settings.colsCount; col++) {
					let td: HTMLTableDataCellElement = document.createElement('td');
					tr.appendChild(td);
				}
			}
		}
	}

	renderSnake() : void{
        if (this.snake) {
            const snakeElements = this.getSnakeBodyElements(this.snake.body);
            if (snakeElements) {
                snakeElements.forEach((td : HTMLTableDataCellElement | null) => {
                    if (td) td.classList.add('snake');
                });
            }
        }
	}

	//Получение 1 ячейки по координатам
    getCell(x: number, y: number): HTMLTableDataCellElement | null {
		if (this.boardElement) {
			return this.boardElement.querySelector(`tr:nth-child(${y}) td:nth-child(${x})`);
		}
		return null;
	}

	//Получение всех блоков тела змейки
	getSnakeBodyElements(bodyCoords: Array<Coords> = []): Array<HTMLTableDataCellElement | null> | null {
		let bodyElements: Array<HTMLTableDataCellElement | null> = [];
		if (bodyCoords.length > 0) {
			for (let value of bodyCoords) {
				let element = this.getCell(value.x, value.y);
				bodyElements.push(element);
			}

			return bodyElements;
		}
		return null;
	}

	//Упирается ли змейка в стену
	isNextStepWall(nextSnakeCoords: Coords): boolean {
		let nextCell = this.getCell(nextSnakeCoords.x, nextSnakeCoords.y);
		return nextCell === null;
	}

	//Еда на игровом поле (добавление)
	renderFood(coords: Coords) : void{
		let foodCell: HTMLTableDataCellElement | null = this.getCell(coords.x, coords.y);
		if (foodCell) {
			foodCell.classList.add('food');
		}
	}

	isHeadOnFoodSnake(): boolean {
         if (this.boardElement) {
             const el : HTMLElement | null = this.boardElement.querySelector('.food');
             if (el) return el.classList.contains('snake');
        }
        return false
	}

	//Очистка поля
	clear() : void {
		const tdAll = document.querySelectorAll('td');
		tdAll.forEach(function (td) {
			td.className = '';
		});
	}
}

export default Board;
