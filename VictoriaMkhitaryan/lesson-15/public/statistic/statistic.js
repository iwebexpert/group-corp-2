const chartBar = document.getElementById("chart-bar");
console.log(chartBar);
const ctxBar = chartBar.getContext("2d");

const chartPie = document.getElementById("pie-bar");
const ctxPie = chartPie.getContext("2d");

const widthCanvas = 1000;
const heightCanvas = 500;

const startPoint = [50, 50];
const endPoint = [widthCanvas - startPoint[0], heightCanvas + startPoint[1]];


class Bar {
  constructor(data) {
    this.data = data;
  }

  calculateHeight() {
    const max = Math.max(...this.data.map((item) => item.sum));
    this.data.map(item => {
      item.height = item.sum/max;
    });
  }

  grid() {
    const divided = ['0%', '25%', '50%', '75%', '100%'].reverse();
    ctxBar.beginPath();
    ctxBar.lineWidth = "1";
    ctxBar.strokeStyle = "blue";

    for (let i = startPoint[1], j = 0; i <= endPoint[1]; i += (heightCanvas - 50)*0.25, j++) {
      ctxBar.font = "14px Roboto";
      ctxBar.fillText(divided[j], startPoint[0], i - 5);
      ctxBar.moveTo(startPoint[0], i);
      ctxBar.lineTo(endPoint[0], i);
      ctxBar.stroke();
    }
  }

  paint() {
    
    this.data.map(item => {
      const gradient = ctxBar.createLinearGradient(
        item.id * 100,
        endPoint[1],
        50,
        -item.height*(heightCanvas - 50));
      gradient.addColorStop(0, "#8e54e9");
      gradient.addColorStop(1, "#4776E6");

      ctxBar.fillStyle = gradient;
      ctxBar.fillRect(
        item.id * 100,
        endPoint[1],
        50,
        -item.height * (heightCanvas - 50)
      );
      ctxBar.fillStyle = "black";
      ctxBar.font = "14px Roboto";
      ctxBar.textAlign = "center";
      ctxBar.fillText(item.month, item.id * 100 + 25, endPoint[1] + 14);
    });
  }

  render() {
    this.calculateHeight();
    this.grid();
    this.paint();
  }
}

class Pie {
  constructor(data) {
    this.data = data;
    this.amount = 0;
    this.arrayColors = [
      "blue",
      "black",
      "red",
      "grey",
      "green",
      "brown"
    ];
  }

  calculateAngle() {
    console.log(this.data);
    this.amount = this.data.reduce((sum, current) => sum + current.sale, 0);
    console.log(this.amount);
    this.data.map((item, index, array) => {
      item.angle = Math.round(((item.sale * 2 * Math.PI) / this.amount) * 100) / 100;
      item.startPoint = item.id === 1 ? 0 : array[index - 1].endPoint;
      item.endPoint = item.startPoint + item.angle;
    });
  }

  paint() {
    this.data.map((item, index) => {
      ctxPie.strokeStyle = "white";
      ctxPie.lineWidth = "3";
      ctxPie.fillStyle = this.arrayColors[index];
      ctxPie.beginPath();
      ctxPie.moveTo(500, 200);
      ctxPie.arc(500, 200, 150, item.startPoint, item.endPoint, false);
      ctxPie.lineTo(500, 200);
      ctxPie.stroke();
      ctxPie.fill();

      console.log(item);
      console.log(
        500 - 150 * Math.cos(item.startPoint + item.angle / 2),
        200 + 150 * Math.sin(item.startPoint + item.angle / 2)
      );
      ctxPie.font = "14px Roboto";
      ctxPie.fillStyle = "black";
      ctxPie.textAlign = "center";
      ctxPie.fillText(
        ((100 * item.sale) / this.amount).toFixed(1) + "%",
        500 + 175 * Math.cos(item.startPoint + item.angle / 2),
        208 + 175 * Math.sin(item.startPoint + item.angle / 2)
      );
    });
    ctxPie.beginPath();
    ctxPie.fillStyle = "white";
    ctxPie.arc(500, 200, 70, 0, 2 * Math.PI, false);
    ctxPie.stroke();
    ctxPie.fill();
  }

  legend() {
    let startPosition = [100, 100];
    const step = [0, 30];
    this.data.map((item, index) => {
      ctxPie.beginPath();
      ctxPie.fillStyle = this.arrayColors[index];
      ctxPie.fillRect(startPosition[0], startPosition[1], 20, -20);
      ctxPie.textBaseline = "middle";
      ctxPie.textAlign = "start";
      ctxPie.fillStyle = "black";
      ctxPie.fillText(item.month, startPosition[0]+25, startPosition[1]-10);
      ctxPie.fill();
      ctxPie.stroke();
      startPosition[1]+=step[1];
    })
  }

  render() {
    this.calculateAngle();
    this.paint();
    this.legend();
  }
}


document.addEventListener("DOMContentLoaded", async () => {
  const result = await fetch("/statistic");
  let data = await result.json();

  const bar = new Bar(data);
  bar.render();

  const pie = new Pie(data);
  pie.render();
});
