export class Menu {
	protected startBtn: HTMLButtonElement;
	protected pauseBtn: HTMLButtonElement;
	protected refreshBtn: HTMLButtonElement;

  public constructor() {
	  const btn1:HTMLButtonElement|null = document.querySelector("#start-btn");
	  const btn2:HTMLButtonElement|null = document.querySelector("#pause-btn");
	  const btn3:HTMLButtonElement|null = document.querySelector("#refresh-btn");
	  if(btn1 && btn2 && btn3){
		this.startBtn = btn1;
		this.pauseBtn = btn2;
		this.refreshBtn = btn3;
	  }else throw new Error("Some error with buttons")
	
	}

  public addButtonsClickListeners(
	startBtnHandler: () => void,
	pauseBtnHandler: () => void
 ): void {
		 this.startBtn.addEventListener('click', startBtnHandler);
		this.pauseBtn.addEventListener('click', pauseBtnHandler);
		this.refreshBtn.addEventListener('click', ()=>{
			location.reload()
		})
 }
}
