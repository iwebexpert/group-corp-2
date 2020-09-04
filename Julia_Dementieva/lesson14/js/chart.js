class PieChart{
  constructor(sales, canvas, legend){
    this.sales = sales;
    this.canvas = canvas;
    this.centerX = this.canvas.width/2;
    this.centerY = this.canvas.height/2;
    this.radius = Math.min(this.canvas.width/2,this.canvas.height/2);
    this.color = ["#FFB300","#F10026", "#2618B2","#00C618", "#E439A1","#4C036F"];
    this.ctx = this.canvas.getContext("2d");
    this.legend = legend;
  }

  drawPie(startAngle, endAngle, color ){
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.moveTo(this.centerX, this.centerY);
    this.ctx.arc(this.centerX, this.centerY, this.radius, startAngle, endAngle);
    this.ctx.closePath();
    this.ctx.fill();
  }

  renderPie(){
    let sum = 0;
    let colorIndex = 0;
    // Общая сумма
    this.sales.forEach( (element) => {
      let quantity = element.sales;
      sum += quantity;
    });

    let startAngle = 0;

    this.sales.forEach( (element) => {
      let quantity = element.sales;
      let sliceAngle = 2 * Math.PI * quantity / sum;
      this.drawPie(startAngle, startAngle+sliceAngle, this.color[colorIndex%this.color.length]);
      startAngle += sliceAngle;
      colorIndex++;
    });

    this.sales.forEach( (element) => {
      let quantity = element.sales;
      let sliceAngle = 2 * Math.PI * quantity / sum;
      let pieRadius = Math.min(this.canvas.width/2,this.canvas.height/2);
      var labelX = this.canvas.width/2 + (pieRadius / 2) * Math.cos(startAngle + sliceAngle/2);
      let labelY = this.canvas.height/2 + (pieRadius / 2) * Math.sin(startAngle + sliceAngle/2);
   
      labelX = this.canvas.width/2 + ( pieRadius / 2) * Math.cos(startAngle + sliceAngle/2);
      labelY = this.canvas.height/2 + ( pieRadius / 2) * Math.sin(startAngle + sliceAngle/2);               
      
   
      let labelText = Math.round(100 * quantity / sum);
      this.ctx.fillStyle = "white";
      this.ctx.font = "bold 16px Roboto";
      this.ctx.fillText(labelText+"%", labelX,labelY);
      startAngle += sliceAngle;
    });

    colorIndex = 0;
    let legendHTML = "";

    this.sales.forEach( (element) => { 
      legendHTML += "<div><span style='display:inline-block;width:20px;background-color:"+this.color[colorIndex++]+";'>&nbsp;</span> "+element.month+"</div>";
    });

    this.legend.innerHTML = legendHTML;
  }
}

class BarChart{
  constructor(sales, canvas, legend){
    this.sales = sales;
    this.canvas = canvas;
    this.legend = legend;
    this.padding = 20;
    this.gridColor = "#C78F8F";
    this.color = ["#FFB300","#F10026", "#2618B2","#00C618", "#E439A1","#4C036F"];
    this.ctx = this.canvas.getContext("2d");
  }

  drawLine(startX, startY, endX, endY,color){
    this.ctx.save();
    this.ctx.strokeStyle = color;
    this.ctx.beginPath();
    this.ctx.moveTo(startX,startY);
    this.ctx.lineTo(endX,endY);
    this.ctx.stroke();
    this.ctx.restore();
  }

  drawBar(upperLeftCornerX, upperLeftCornerY, width, height,color){
    this.ctx.save();
    this.ctx.fillStyle = color;
    this.ctx.fillRect(upperLeftCornerX,upperLeftCornerY,width,height);
    this.ctx.restore();
  }

  renderBar(){
    
    let maxValue = 0;
    this.sales.forEach( (element) => {
      maxValue = Math.max(maxValue, element.sales);
    });

    let gridScale = maxValue / 4;

    let canvasActualHeight = this.canvas.height - this.padding * 2;
    let canvasActualWidth = this.canvas.width - this.padding * 2;

    //ось значений
    let gridValue = 0;
    while (gridValue <= maxValue){
      let gridY = canvasActualHeight * (1 - gridValue/maxValue) + this.padding;
      this.drawLine(0, gridY, this.canvas.width, gridY, this.gridColor);
       
      // значения
      this.ctx.save();
      this.ctx.fillStyle = this.gridColor;
      this.ctx.font = "bold 11px Arial";
      this.ctx.fillText(gridValue, 0,gridY - 2);
      this.ctx.restore();

      gridValue+=gridScale;
    }

    //столбцы
    let barIndex = 0;
    let numberOfBars = Object.keys(this.sales).length;
    let barSize = (canvasActualWidth)/numberOfBars;

    this.sales.forEach((element) => {
      let quantity = element.sales;
      let barHeight = Math.round( canvasActualHeight * quantity/maxValue) ;
      this.drawBar(this.padding + barIndex * barSize, this.canvas.height - barHeight - this.padding, barSize, barHeight, this.color[barIndex%this.color.length]);
      barIndex++;
    });

    this.ctx.save();
    this.ctx.textAlign="center";
    this.ctx.fillStyle = "#000000";
    this.ctx.textBaseline="bottom";
    this.ctx.font = "bold 17px Roboto";
    this.ctx.fillText('Sales', this.canvas.width/2,this.canvas.height);
    this.ctx.restore();  
  }
}