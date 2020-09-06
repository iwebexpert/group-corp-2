class Menu {
    constructor(){
        this.startBtn = document.querySelector('#start-btn');
        this.pauseBtn = document.querySelector('#pause-btn');
    }

    addButtonsClickListeners(startBtn, pauseBtn){
        this.startBtn.addEventListener('click', startBtn);
        this.pauseBtn.addEventListener('click', pauseBtn);
    }
}