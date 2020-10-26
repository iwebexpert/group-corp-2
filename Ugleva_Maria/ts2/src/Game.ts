import Board from './Board';
import Food from './Food';
import Menu from './Menu';
import Settings from './Settings';
import Snake from './Snake';
import Status from './Status';

class Game {
	timer: any;
	readonly messageElement: HTMLElement | null;
	settings?: Settings;
	status?: Status;
	board?: Board;
	snake?: Snake;
	menu?: Menu;
	food?: Food;

	constructor() {
		this.timer = null;
		this.messageElement = document.getElementById('message');
	}

	init(settings: Settings, status: Status, board: Board, snake: Snake, menu: Menu, food: Food): void {
		this.settings = settings;
		this.status = status;
		this.board = board;
		this.snake = snake;
		this.menu = menu;
		this.food = food;
	}

	//Старт игры
	start(): void {
		if (this.status && this.status.isPaused() && this.settings) {
			this.status.setPlaying();
			this.timer = setInterval(this.doTick.bind(this), 1000 / this.settings.speed);
		}
	}

	//Остановка игры (пауза)
	pause(): void {
		if (this.status && this.status.isPlaying()) {
			this.status.setPaused();
			clearInterval(this.timer);
		}
	}

	//1 шаг игры
	doTick(): undefined {
		if (this.snake) {
			this.snake.performStep();
		}
		if (this.isGameLost()) {
			return;
		}

		if (this.isGameWin()) {
			return;
		}

		if (this.board && this.snake && this.food && this.board.isHeadOnFoodSnake()) {
			this.snake.increaseBody();
			this.food.setNewFood();
		}
		if (this.board) this.board.clear();
		if (this.food) this.food.setFood();
		if (this.board) this.board.renderSnake();
	}

	//Проверка, окончена ли игра (победа)
	isGameWin(): boolean {
		if (this.snake && this.settings && this.snake.body.length === this.settings.winLength) {
			clearInterval(this.timer);
			this.setMessage('Победа!');
			return true;
		}
		return false;
	}

	//Проверка, окончена ли игра (проигрыш)
	isGameLost(): boolean {
		if (this.board && this.snake && this.board.isNextStepWall(this.snake.body[0])) {
			clearInterval(this.timer);
			this.setMessage('Поражение!');
			return true;
		}
		return false;
	}

	setMessage(message: string): void {
		if (this.messageElement) this.messageElement.textContent = message;
	}

	//Смена направления движения змейки
	pressKeyHandler(event: KeyboardEvent): void {
		if (this.snake) {
			switch (event.key) {
				case 'ArrowUp':
					this.snake.changeDirection('up');
					break;
				case 'ArrowDown':
					this.snake.changeDirection('down');
					break;
				case 'ArrowLeft':
					this.snake.changeDirection('left');
					break;
				case 'ArrowRight':
					this.snake.changeDirection('right');
					break;
			}
		}
	}

	//Запуск игры
	run(): void {
		this.menu && this.menu.addButtonsClickListeners(this.start.bind(this), this.pause.bind(this));
		document.addEventListener('keydown', this.pressKeyHandler.bind(this));
	}
}

export default Game;
