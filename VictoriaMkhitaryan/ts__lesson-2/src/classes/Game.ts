import { Settings } from './Settings';
import { Snake } from './Snake';
import { Status } from './Status';
import { Board } from './Board';
import { Menu } from './Menu';
import { Food } from './Food';

export class Game {
    private snake: Snake;
    private settings: Settings;
    private status: Status;
    private board: Board;
    private menu: Menu;
    private food: Food;
    timer: NodeJS.Timeout | null;
    private messageElement: HTMLElement | null;

    constructor(snake: Snake, settings: Settings, status: Status, board: Board, menu: Menu, food: Food) {
        this.timer = null;
        this.messageElement = document.getElementById('message');
        this.snake = snake;
        this.settings = settings;
        this.status = status;
        this.board = board;
        this.menu = menu;
        this.food = food;
    }

    //Старт игры
    start() {
        if (this.status.isPaused()) {
            this.status.setPlaying();
            this.timer = setInterval(this.doTick.bind(this), 1000 / this.settings.currentParams.speed);
        }
    }

    //Остановка игры (пауза)
    pause() {
        if (this.timer && this.status.isPlaying()) {
            this.status.setPaused();
            clearInterval(this.timer);
        }
    }

    //1 шаг игры
    private doTick(): void {
        this.snake.performStep();
        if(this.isGameLost()) {
            return;
        }

        if(this.isGameWin()) {
            return;
        }

        if(this.board.isHeadOnFoodSnake()) {
            this.snake.increaseBody();
            this.food.setNewFood();
        }

        this.board.clear();
        this.food.setFood();
        this.board.renderSnake();
    }

    //Проверка, окончена ли игра (победа)
    private isGameWin(): boolean {
        if(this.timer && this.snake.body.length === this.settings.currentParams.winLength) {
            clearInterval(this.timer);
            this.setMessage('Победа!');
            return true;
        }
        return false;
    }

    //Проверка, окончена ли игра (проигрыш)
    private isGameLost(): boolean {
        if(this.timer && this.board.isNextStepWall(this.snake.body[0])) {
            clearInterval(this.timer);
            this.setMessage('Поражение!');
            return true;
        }
        return false;
    }

    private setMessage(message: string): void {
        if(this.messageElement) this.messageElement.textContent = message;
    }

    //Смена направления движения змейки
    private pressKeyHandler(event: KeyboardEvent): void {
        switch(event.key) {
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

    //Запуск игры
    run(): void {
        this.menu.addButtonsClickListeners(this.start.bind(this), this.pause.bind(this));
        document.addEventListener('keydown', this.pressKeyHandler.bind(this));
    }
} 