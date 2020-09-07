class PieChart {
	constructor(options) {
		this.options = options
		this.responseData = this.options.data
		this.colors = this.options.colors
		this.canvas = this.options.canvas
		this.ctx = this.canvas.getContext('2d')

		this.pieRadius = Math.min(this.canvas.width/2,this.canvas.height/2)
		this.centerX = this.canvas.width/2
		this.centerY = this.canvas.height/2
	}
	//Функция, рисующая один сегмент
	drawPieSlice(startAngle, endAngle, color){
		this.ctx.fillStyle = color
		this.ctx.beginPath()
		this.ctx.moveTo(this.centerX, this.centerY)
		this.ctx.arc(this.centerX, this.centerY, this.pieRadius, startAngle, endAngle)
		this.ctx.closePath()
		this.ctx.fill()
	}

	draw(){
		let totalValue = 0
		let startAngle = 0
		//Считаем общую сумму продаж
		this.responseData.forEach(element =>
			totalValue += element.sold
		)
		this.responseData.forEach((element, i) => {
			let val = element.sold
			// Для определения угла для каждого сегмента категории мы используем формулу:
			// 	Угол среза = 2 * PI * значение категории / общее значение
			let sliceAngle = 2 * Math.PI * val / totalValue

			this.drawPieSlice(
				startAngle,
				startAngle + sliceAngle,
				this.colors[i]
			)
			startAngle += sliceAngle
		})
	}
}
