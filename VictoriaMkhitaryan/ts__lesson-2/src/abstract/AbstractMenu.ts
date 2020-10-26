export abstract class AMenu {
  protected startBtn: HTMLButtonElement;
  protected pauseBtn: HTMLButtonElement;
  
  constructor() {
    const startElement: HTMLButtonElement | null = document.querySelector('#start-btn');
    const pauseElement: HTMLButtonElement | null = document.querySelector('#pause-btn');

    if(startElement && pauseElement){
      this.startBtn = startElement;
      this.pauseBtn = pauseElement;
    } else {
        throw new Error('Элементы не найдены');
    }
  }

  addButtonsClickListeners(start: () => void, pause: () => void) {}
}