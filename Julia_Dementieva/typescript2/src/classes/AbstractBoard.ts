import {ICoordinates} from '../interface/ShakeInterface';

export abstract class ABoard {

    protected _boardElement: HTMLElement | null;

    constructor(){
        this._boardElement = document.getElementById('game');
    }

    public abstract renderBoard(): void;

    public abstract renderSnake(): void;

    //Получение 1 ячейки по координатам
    public abstract getCell(coord: ICoordinates ): Element | null;

    //Получение всех блоков тела змейки
    public abstract getSnakeBodyElements(bodyCoords: Array<ICoordinates>): Array<Element> | null;

    //Упирается ли змейка в стену
    public abstract isNextStepWall(nextSnakeCoords: ICoordinates): boolean;

    //Еда на игровом поле (добавление)
    public abstract renderFood(coords: ICoordinates): void;

    public abstract isHeadOnFoodSnake(): boolean | null;

    //Очистка поля
    public abstract clear(): void;
}