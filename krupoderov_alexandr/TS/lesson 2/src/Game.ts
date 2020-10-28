import {Directions, ISnake} from "./Snake";

import {Status} from "./Status";
import {ISettings} from "./Settings";
import {IBoard} from "./Board";
import {IMenu} from "./Menu";
import {IFood} from "./Food";

interface IGame {
    timer: ReturnType<typeof setInterval> | null;
    messageElement: HTMLElement | null;
    settings: ISettings;
    board: IBoard;
    snake: ISnake;
    menu: IMenu;
    food: IFood;
}

export default class Game extends Status implements IGame{
    timer: ReturnType<typeof setInterval> | null;
    messageElement: HTMLElement | null;
    settings: ISettings;
    board: IBoard;
    snake: ISnake;
    menu: IMenu;
    food: IFood;

    constructor(settings: ISettings, board: IBoard, snake: ISnake, menu: IMenu, food: IFood){
        super();
        this.timer = null;
        this.messageElement = document.getElementById('message');
        this.settings = settings;
        this.board = board;
        this.snake = snake;
        this.menu = menu;
        this.food = food;
    }
    //Старт игры
    public start(){
        if(super.isPaused()){
            super.setPlaying();
            this.timer = setInterval(this.doTick.bind(this), 1000 / this.settings.speed);
        }
    }

    //Остановка игры (пауза)
    public pause(){
        if(super.isPlaying()){
            super.setPaused();
            if (this.timer) clearInterval(this.timer);
        }
    }

    //1 шаг игры
    protected doTick(){
        this.snake.performStep();
        if(this.isGameLost()){
            return;
        }

        if(this.isGameWin()){
            return;
        }

        if(this.board.isHeadOnFoodSnake()){
            this.snake.increaseBody();
            this.food.setNewFood();
        }

        this.board.clear();
        this.food.setFood();
        this.board.renderSnake();
    }

    //Проверка, окончена ли игра (победа)
    public isGameWin(){
        if(this.snake.body.length === this.settings.winLength){
            if (this.timer) clearInterval(this.timer);
            this.setMessage('Победа!');
            return true;
        }
        return false;
    }

    //Проверка, окончена ли игра (проигрыш)
    public isGameLost(){
        if(this.board.isNextStepWall(this.snake.body[0])){
            if (this.timer) clearInterval(this.timer);
            this.setMessage('Поражение!');
            return true;
        }
        return false;
    }

    public setMessage(message: string){
        if (this.messageElement) this.messageElement.textContent = message;
    }

    //Смена направления движения змейки
    protected pressKeyHandler(event: KeyboardEvent){
        switch(event.key){
            case 'ArrowUp':
                this.snake.changeDirection(Directions.Up);
                break;
            case 'ArrowDown':
                this.snake.changeDirection(Directions.Down);
                break;
            case 'ArrowLeft':
                this.snake.changeDirection(Directions.Left);
                break;
            case 'ArrowRight':
                this.snake.changeDirection(Directions.Right);
                break;
        }
    }

    //Запуск игры
    public run(){
        this.menu.addButtonsClickListeners(this.start.bind(this), this.pause.bind(this));
        document.addEventListener('keydown', this.pressKeyHandler.bind(this));
    }
}