export class Menu {
	protected startBtn: HTMLButtonElement|null = document.querySelector("#start-btn");
	protected pauseBtn: HTMLButtonElement|null = document.querySelector("#pause-btn");
	protected refreshBtn: HTMLButtonElement|null = document.querySelector("#refresh-btn");

  public constructor() {
	 this.startBtn;
    this.pauseBtn;
	 this.refreshBtn;
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
