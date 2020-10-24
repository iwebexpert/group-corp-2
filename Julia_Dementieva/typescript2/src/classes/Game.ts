import { Settings } from './Settings';
import { Snake } from './Snake';
import { Status } from './Status';
import { Board } from './Board';
import { Menu } from './Menu';
import { Food } from './Food';

export class Game {

    private _snake: Snake;
    private _settings: Settings;
    private _status: Status;
    private _board: Board;
    private _menu: Menu;
    private _food: Food;
    public timer: NodeJS.Timeout | null;
    private _messageElement: HTMLElement | null;


    constructor(snake: Snake, settings: Settings, status: Status, board: Board, menu: Menu, food: Food){
        this.timer = null;
        this._messageElement = document.getElementById('message');
        this._snake = snake;
        this._settings = settings;
        this._status = status;
        this._board = board;
        this._menu = menu;
        this._food = food;
    }

    //Старт игры
    public start(): void{
        if(this._status.isPaused()){
            this._status.setPlaying();
            this.timer = setInterval(this.doTick.bind(this), 1000 / this._settings.currentParams.speed);
        }
    }

    //Остановка игры (пауза)
    public pause(): void{
        if(this.timer && this._status.isPlaying()){
            this._status.setPaused();
            clearInterval(this.timer);
        }
    }

    //1 шаг игры
    private doTick(): void{
        this._snake.performStep();
        if(this.isGameLost()){
            return;
        }

        if(this.isGameWin()){
            return;
        }

        if(this._board.isHeadOnFoodSnake()){
            this._snake.increaseBody();
            this._food.setNewFood();
        }

        this._board.clear();
        this._food.setFood();
        this._board.renderSnake();
    }

    //Проверка, окончена ли игра (победа)
    private isGameWin(): boolean{
        if(this.timer && this._snake.body.length === this._settings.currentParams.winLength){
            clearInterval(this.timer);
            this.setMessage('Победа!');
            return true;
        }
        return false;
    }

    //Проверка, окончена ли игра (проигрыш)
    private isGameLost(): boolean{
        if(this.timer && this._board.isNextStepWall(this._snake.body[0])){
            clearInterval(this.timer);
            this.setMessage('Поражение!');
            return true;
        }
        return false;
    }

    private setMessage(message: string): void{
        if(this._messageElement) this._messageElement.textContent = message;
    }

    //Смена направления движения змейки
    private pressKeyHandler(event: KeyboardEvent): void{
        switch(event.key){
            case 'ArrowUp':
                this._snake.changeDirection('up');
                break;
            case 'ArrowDown':
                this._snake.changeDirection('down');
                break;
            case 'ArrowLeft':
                this._snake.changeDirection('left');
                break;
            case 'ArrowRight':
                this._snake.changeDirection('right');
                break;
        }
    }

    //Запуск игры
    public run(): void{
        this._menu.addButtonsClickListeners(this.start.bind(this), this.pause.bind(this));
        document.addEventListener('keydown', this.pressKeyHandler.bind(this));
    }
}