export interface IMenu {
    startBtn: HTMLElement | null;
    pauseBtn: HTMLElement | null;
    addButtonsClickListeners(startBtn: EventListener, pauseBtn: EventListener): void
}

export class Menu implements IMenu{
    public startBtn: HTMLElement | null;
    public pauseBtn: HTMLElement | null;
    constructor(){
        this.startBtn = document.querySelector('#start-btn');
        this.pauseBtn = document.querySelector('#pause-btn');
    }

    addButtonsClickListeners(startBtn: EventListener, pauseBtn: EventListener){
        if (this.startBtn && this.pauseBtn) {
            this.startBtn.addEventListener('click', startBtn);
            this.pauseBtn.addEventListener('click', pauseBtn);
        }
    }
}