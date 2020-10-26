class Menu {
    readonly startBtn: HTMLButtonElement | null;
    readonly pauseBtn: HTMLButtonElement | null;
    constructor(){
        this.startBtn = document.querySelector('#start-btn');
        this.pauseBtn = document.querySelector('#pause-btn');
    }

    addButtonsClickListeners(startBtn: () => void, pauseBtn: () => void) : void{
        if (this.startBtn && this.pauseBtn) {
            this.startBtn.addEventListener('click', startBtn);
            this.pauseBtn.addEventListener('click', pauseBtn);
        }
    }
}
export default Menu;