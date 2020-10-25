export default class Menu {
    startBtn: HTMLButtonElement | null;
    pauseBtn: HTMLButtonElement | null;

    constructor() {
        this.startBtn = document.querySelector('#start-btn');
        this.pauseBtn = document.querySelector('#pause-btn');
    }

    addButtonsClickListeners(startBtn: any, pauseBtn: any): void {
        if (this.startBtn && this.pauseBtn) {
            this.startBtn.addEventListener('click', startBtn);
            this.pauseBtn.addEventListener('click', pauseBtn);
        }
    }
}