import { AMenu } from '../abstract/AbstractMenu';

export class Menu extends AMenu {
    constructor(){
        super();
    }

    addButtonsClickListeners(startBtn: () => void, pauseBtn: () => void) {
        // if (this.startBtn && this.pauseBtn) { 
        this.startBtn.addEventListener('click', startBtn);
        this.pauseBtn.addEventListener('click', pauseBtn);
    }
} 