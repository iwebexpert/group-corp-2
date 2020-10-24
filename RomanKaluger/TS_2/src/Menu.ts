import {handleMouseFunc} from "./declarations";

export interface IMenu {
    addButtonsClickListeners(startBtn: handleMouseFunc, pauseBtn: handleMouseFunc): void;
}
export class Menu implements IMenu{
    private readonly startBtn: HTMLButtonElement | null;
    private readonly pauseBtn: HTMLButtonElement | null;
    public constructor(){
        this.startBtn = document.querySelector('#start-btn');
        this.pauseBtn = document.querySelector('#pause-btn');
    }

    public addButtonsClickListeners(startBtn: handleMouseFunc, pauseBtn: handleMouseFunc): void{
        if (this.startBtn && this.pauseBtn){
            this.startBtn.addEventListener('click', startBtn);
            this.pauseBtn.addEventListener('click', pauseBtn);
        }
    }
}
