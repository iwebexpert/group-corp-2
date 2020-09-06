class BarChart{
	constructor(options) {
		this.options = options
		this.colors = options.colors
		this.responseData = this.options.data
		this.canvas = this.options.canvas
		this.ctx = this.canvas.getContext('2d')
		this.drawLines()
	}

	drawLines() {
		//Рисуем линии, X и Y
		this.ctx.fillStyle = "black"
		this.ctx.lineWidth = 0.8
		this.ctx.beginPath()
		this.ctx.moveTo(30, 10)
		this.ctx.lineTo(30, 460)
		this.ctx.lineTo(800, 460)
		this.ctx.stroke()
		//Находим наивысшую точку для Y
		this.maxSold = 0
		this.responseData.forEach((element) => {
			if (element.sold > this.maxSold) this.maxSold = element.sold
		})
		//Отрисовываем значения для Y
		for(let i = 0; i < 6; i++) {
			this.ctx.fillText((5 - i) * Math.round(this.maxSold / 5 )+ "", 4, i * 80 + 60)
			this.ctx.beginPath()
			this.ctx.moveTo(25, i * 80 + 60)
			this.ctx.lineTo(30, i * 80 + 60)
			this.ctx.stroke()
		}
		//Отрисовываем значения для X
		this.responseData.forEach((element, i) => {
			this.ctx.fillText(element.month, 55 + i * 60, 475)
		})
	}

	draw() {
		//Получаем, сколько равен 1% от максимального числа, и высчитываем скольим процентам равен каждый столбец
		let oneProc = this.maxSold/100
		this.responseData.forEach((element, i) => {
			this.ctx.fillStyle =this.colors[i]
			let dp = Math.round(element.sold / oneProc)
			this.ctx.fillRect(50 + i*60, 459-dp*4 , 50, dp*4)
		})
	}
}