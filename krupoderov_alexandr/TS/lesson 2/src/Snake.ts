export enum Directions {
    Up,
    Down,
    Left,
    Right
}

export type Cords = {
    x: number | null,
    y: number | null
}

export interface ISnake {
    possibleDirection: Array<Directions>;
    readonly body: Array<Cords>;
    direction: Directions;
    changeDirection(newDirection: Directions): void;
    isOppositeDirection(newDirection: Directions):boolean;
    performStep():void;
    increaseBody():void;
}

export default class Snake implements ISnake{
    public possibleDirection: Array<Directions>;
    public readonly body: Array<Cords>;
    public direction: Directions;
    constructor(){
        this.possibleDirection = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];

        this.body = [{
            x: 1,
            y: 1,
        }];

        this.direction = Directions.Down;
    }

    public changeDirection(newDirection: Directions):void{
        if(!this.possibleDirection.includes(newDirection)){
            throw new Error(`Передано недопустимое направление движения: ${newDirection}`);
        }

        if(this.isOppositeDirection(newDirection)){
            return;
        }

        this.direction = newDirection;
    }

    public isOppositeDirection(newDirection: Directions):boolean{
        if(this.direction === Directions.Down && newDirection === Directions.Up){
            return true;
        }

        if(this.direction === Directions.Up && newDirection === Directions.Down){
            return true;
        }

        if(this.direction === Directions.Left && newDirection === Directions.Right){
            return true;
        }

        return this.direction === Directions.Right && newDirection === Directions.Left;

    }

    //Следующий шаг змейки
    public performStep():void{
        let currentHeadCoords = this.body[0]; //Head
        let newHeadCoords = {
            x: currentHeadCoords.x,
            y: currentHeadCoords.y,
        };
         if (newHeadCoords.y && newHeadCoords.x) {
             switch(this.direction){
                 case Directions.Down:
                     newHeadCoords.y++;
                     break;
                 case Directions.Up:
                     newHeadCoords.y--;
                     break;
                 case Directions.Left:
                     newHeadCoords.x--;
                     break;
                 case Directions.Right:
                     newHeadCoords.x++;
                     break;
             }
         }


        this.body.unshift(newHeadCoords);
        this.body.pop();
    }

    //Увеличение тела змейки
    public increaseBody(){
        let bodyLastCell = this.body[this.body.length - 1];
        let newBodyLastCell = {
            x: bodyLastCell.x,
            y: bodyLastCell.y,
        };

        this.body.push(newBodyLastCell);
    }
}