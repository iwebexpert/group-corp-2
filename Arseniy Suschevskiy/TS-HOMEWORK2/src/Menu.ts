export class Menu {
    private readonly startBtn: HTMLButtonElement | null;
    private readonly pauseBtn: HTMLButtonElement | null;

    constructor(){
        this.startBtn = document.querySelector('#start-btn');
        this.pauseBtn = document.querySelector('#pause-btn');
    }

    public addButtonsClickListeners(startBtn: () => void, pauseBtn: () => void){
        if(this.startBtn && this.pauseBtn){
            this.startBtn.addEventListener('click', startBtn);
            this.pauseBtn.addEventListener('click', pauseBtn);
        }
    }
}