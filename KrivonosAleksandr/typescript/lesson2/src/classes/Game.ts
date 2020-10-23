import Settings from "./Settings";
import Status from "./Status";
import Snake from "./Snake";
import Menu from "./Menu";
import Food from "./Food";
import Board from "./Board";

export default class Game {
    private timer: NodeJS.Timeout | null;
    private readonly messageElement: HTMLElement | null;
    private settings: Settings;
    private status: Status;
    private board: Board;
    private snake: Snake;
    private menu: Menu;
    private food: Food;

    constructor(settings: Settings, status: Status, board: Board, snake: Snake, menu: Menu, food: Food) {
        this.timer = null;
        this.messageElement = document.getElementById('message');

        this.settings = settings;
        this.status = status;
        this.board = board;
        this.snake = snake;
        this.menu = menu;
        this.food = food;
    }

    //Старт игры
    public start(): void {
        let speed: number = 1;
        if (this.status.isPaused()) {
            if (this.settings.getParams().speed)
                speed = this.settings.getParams().speed;

            this.status.setPlaying();
            this.timer = setInterval(this.doTick.bind(this), 1000 / speed);
        }
    }

    //Остановка игры (пауза)
    public pause(): void {
        if (this.status.isPlaying()) {
            this.status.setPaused();
            if (this.timer)
                clearInterval(this.timer);
        }
    }

    //1 шаг игры
    public doTick(): void {
        this.snake.performStep();
        if (this.isGameLost()) {
            return;
        }

        if (this.isGameWin()) {
            return;
        }

        if (this.board.isHeadOnFoodSnake()) {
            this.snake.increaseBody();
            this.food.setNewItem();
        }

        this.board.clear();
        this.food.setItem();
        this.board.renderSnake();
    }

    //Проверка, окончена ли игра (победа)
    public isGameWin(): boolean {
        if (this.snake.body.length === this.settings.getParams().winLength && this.timer) {
            clearInterval(this.timer);
            this.setMessage('Победа!');
            return true;
        }
        return false;
    }

    //Проверка, окончена ли игра (проигрыш)
    public isGameLost(): boolean {
        if (this.board.isNextStepWall(this.snake.body[0]) && this.timer) {
            clearInterval(this.timer);
            this.setMessage('Поражение!');
            return true;
        }
        return false;
    }

    public setMessage(message: string): void {
        if (this.messageElement)
            this.messageElement.textContent = message;
    }

    //Смена направления движения змейки
    public pressKeyHandler(event: KeyboardEvent): void {
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

    //Запуск игры
    public run(): void {
        this.menu.addButtonsClickListeners(this.start.bind(this), this.pause.bind(this));
        document.addEventListener('keydown', this.pressKeyHandler.bind(this));
    }
}