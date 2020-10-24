export class Menu {

    private _startBtn: HTMLButtonElement | null;
    private _pauseBtn: HTMLButtonElement | null;

    constructor(){
        this._startBtn = document.querySelector('#start-btn');
        this._pauseBtn = document.querySelector('#pause-btn');
    }
    
    public addButtonsClickListeners(startBtn: () => void, pauseBtn: () => void){
        if(this._startBtn && this._pauseBtn){
            this._startBtn.addEventListener('click', startBtn);
            this._pauseBtn.addEventListener('click', pauseBtn);
        }    
    }
}