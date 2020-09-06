const pieChartCanvas = document.getElementById("pie-chart")
const barChartCanvas = document.getElementById("bar-chart")

const colors = ['#fde23e', '#f16e23', '#57d9ff', '#793030', '#ff007c', '#937e88', '#a780ff', '#ee4b4b', '#64db4a', '#41c2b1', '#3d57b6', '#ffafe4']

const response = fetch('/sales')
	.then(response => response.json())
	.then(sales => {
		new PieChart({
			canvas: pieChartCanvas,
			data: sales,
			colors: colors
		}).draw()

		new BarChart({
			canvas: barChartCanvas,
			data: sales,
			colors: colors
		}).draw()
	})
