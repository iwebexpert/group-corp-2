import { Coords } from "../Board";


export abstract class SnakeTemplate {
	public possibleDirection: ReadonlyArray<string> = ["up", "down", "left", "right"];
	public body: Array<Coords> = [
		{
		  x: 1,
		  y: 1,
		},
	 ];
	 public direction: string = "down";

	protected constructor(){
		this.possibleDirection;
		this.body;
		this.direction;
	}

	public abstract changeDirection(newDirection:string) : void;

	public abstract isOppositeDirection(newDirection:string): boolean;
  
	 //Следующий шаг змейки
	 public abstract performStep(): void;
  
	 //Увеличение тела змейки
	 public abstract increaseBody() :void;
}