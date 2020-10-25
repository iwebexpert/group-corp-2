export interface ISnake {
    body: bodyCoordsType[];
    changeDirection(newDirection: Directions): void;
    performStep(): void;
    increaseBody(): void;
}
export enum Directions {
    UP, DOWN, LEFT, RIGHT
}
export type bodyCoordsType = { x: number, y: number};
export class Snake implements ISnake{
    public body: bodyCoordsType[] = [{x: 1, y: 1}];
    private direction: Directions = Directions.DOWN;

    public changeDirection(newDirection: Directions): void{
        if(this.isOppositeDirection(newDirection)){
            return;
        }
        this.direction = newDirection;
    }

    private isOppositeDirection(newDirection: Directions): boolean{
        return this.direction === Directions.DOWN && newDirection === Directions.UP
            || this.direction === Directions.UP && newDirection === Directions.DOWN
            || this.direction === Directions.LEFT && newDirection === Directions.RIGHT
            || this.direction === Directions.RIGHT && newDirection === Directions.LEFT;
    }

    //Следующий шаг змейки
    public performStep(): void{
        const currentHeadCoords: bodyCoordsType = this.body[0]; //Head
        const newHeadCoords: bodyCoordsType = {
            x: currentHeadCoords.x,
            y: currentHeadCoords.y,
        };
        switch(this.direction){
            case Directions.DOWN:
                newHeadCoords.y++;
                break;
            case Directions.UP:
                newHeadCoords.y--;
                break;
            case Directions.LEFT:
                newHeadCoords.x--;
                break;
            case Directions.RIGHT:
                newHeadCoords.x++;
                break;
        }
        this.body.unshift(newHeadCoords);
        this.body.pop();
    }

    //Увеличение тела змейки
    public increaseBody(): void{
        const bodyLastCell: bodyCoordsType = this.body[this.body.length - 1];
        const newBodyLastCell: bodyCoordsType = {
            x: bodyLastCell.x,
            y: bodyLastCell.y,
        };
        this.body.push(newBodyLastCell);
    }
}
