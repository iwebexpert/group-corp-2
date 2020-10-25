export class Menu {
	protected startBtn: HTMLButtonElement|null;
	protected pauseBtn: HTMLButtonElement|null;
	protected refreshBtn: HTMLButtonElement|null;

  public constructor() {
    this.startBtn = document.querySelector("#start-btn");
    this.pauseBtn = document.querySelector("#pause-btn");
    this.refreshBtn = document.querySelector("#refresh-btn");
  }

  public addButtonsClickListeners(
	startBtnHandler: () => void,
	pauseBtnHandler: () => void
 ): void {
	 if(this.startBtn && this.pauseBtn && this.refreshBtn){
		 this.startBtn.addEventListener('click', startBtnHandler);
		this.pauseBtn.addEventListener('click', pauseBtnHandler);
		this.refreshBtn.addEventListener('click', ()=>{
			location.reload()
		})
	 }
	
 }
}
