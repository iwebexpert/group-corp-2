export class Menu {
  private startBtn: HTMLButtonElement;
  private pauseBtn: HTMLButtonElement;
  public constructor() {
    if (document.querySelector('#start-btn'))
      this.startBtn = document.querySelector('#start-btn');
    if (document.querySelector('#pause-btn'))
      this.pauseBtn = document.querySelector('#pause-btn');
  }

  public addButtonsClickListeners(
    startBtnHandler: () => void,
    pauseBtnHandler: () => void
  ): void {
    this.startBtn.addEventListener('click', startBtnHandler);
    this.pauseBtn.addEventListener('click', pauseBtnHandler);
  }
}
