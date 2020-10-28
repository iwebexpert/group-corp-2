import { Settings } from "./Settings";
import { Snake } from "./Snake";

export interface Coords {
	x:number;
	y:number;
}

export class Board {
	protected boardElement: HTMLElement;
	protected settings: Settings;
	protected snake: Snake;

	public constructor(settings: Settings, snake:Snake){
		const elem:HTMLElement|null = document.getElementById('game')
		if(elem){
			this.boardElement = elem
		}else throw new Error('error')

		this.settings = settings;
		this.snake = snake;
		 }
	
    public renderBoard():void {
			this.boardElement.innerHTML = '';
			for(let row = 0; row < this.settings.rowsCount; row++){
				 let tr:HTMLTableRowElement = document.createElement('tr');
				 this.boardElement.appendChild(tr);
 
				 for(let col = 0; col < this.settings.colsCount; col++){
					  let td:HTMLTableCellElement = document.createElement('td');
					  tr.appendChild(td);
				 }
			}
    }

    public renderSnake():void{
		  const snakeElements: Array<HTMLTableCellElement>|null = this.getSnakeBodyElements(this.snake.body);
        if(snakeElements){
            snakeElements.forEach(function(td:HTMLTableCellElement){
                td.classList.add('snake');
            });
        }
    }

    //Получение 1 ячейки по координатам
    public getCell(x:number, y:number): HTMLTableCellElement|null{
		 return this.boardElement?  this.boardElement.querySelector(`tr:nth-child(${y}) td:nth-child(${x})`) : null
    }

    //Получение всех блоков тела змейки
    public getSnakeBodyElements(bodyCoords: Array<Coords> = []):HTMLTableCellElement[]|null{
        let bodyElements: Array<HTMLTableCellElement> = [];
        if(bodyCoords.length > 0){
            for(let value of bodyCoords){
					 let element: HTMLTableDataCellElement|null = this.getCell(value.x, value.y);
					 if(element){
						bodyElements.push(element);
					 } 
					}
            return bodyElements;
        }
        return null;
    }

    //Упирается ли змейка в стену
	 public isNextStepWall(nextSnakeCoords:Coords):boolean{
        let nextCell:HTMLTableCellElement|null = this.getCell(nextSnakeCoords.x, nextSnakeCoords.y);
        return nextCell === null;
    }

    //Еда на игровом поле (добавление)
    public renderFood(coords:Coords){
		  let foodCell:HTMLTableCellElement|null = this.getCell(coords.x, coords.y);
		  if(foodCell){
			foodCell.classList.add('food');
		  }  
    }

    public isHeadOnFoodSnake():boolean{
			let foodElement: HTMLTableDataCellElement | null = this.boardElement.querySelector('.food');
			return foodElement ? foodElement.classList.contains('snake'): false;
	}

    //Очистка поля
    public clear():void{
        const tdAll:NodeListOf<HTMLTableCellElement> = document.querySelectorAll('td');
        tdAll.forEach(function(td){
            td.className = '';
        });
    }
}