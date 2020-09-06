const barGraph = document.getElementById("barGraph");
const ctx = barGraph.getContext("2d");
const widthCanvas = 1000;
const heightCanvas = 400;
const absoluteHeight = heightCanvas - 50;
const arrayOfColors = ["#8e54e9", "#4776E6"];

const startPointGraph = [50, 25];
const endPointGraph = [widthCanvas - startPointGraph[0], absoluteHeight + 25];

const pieGraph = document.getElementById("pieGraph");
const ctx2 = pieGraph.getContext("2d");
const barGraphObj = {
  data: [],
  calculateHeightGraphs() {
    const max = Math.max(...this.data.map((item) => item.sum));
    this.data.map((item) => {
      item.heightGraph = item.sum / max;
    });
  },

  paintGrid() {
    const arrayPercents = ["100%", "75%", "50%", "25%", "0%"];
    ctx.beginPath();
    ctx.lineWidth = "1";
    ctx.strokeStyle = "gray";
    for (
      let h = startPointGraph[1], i = 0;
      h <= endPointGraph[1];
      h += absoluteHeight * 0.25, i++
    ) {
      ctx.font = "14px Roboto";
      ctx.fillText(arrayPercents[i], startPointGraph[0], h - 5);
      ctx.moveTo(startPointGraph[0], h);
      ctx.lineTo(endPointGraph[0], h);
      ctx.stroke();
    }
  },

  paintGraph() {
    this.data.map((item) => {
      const gradient = ctx.createLinearGradient(
        item.id * 100,
        endPointGraph[1],
        50,
        -item.heightGraph * absoluteHeight
      );
      gradient.addColorStop(0, arrayOfColors[0]);
      gradient.addColorStop(1, arrayOfColors[1]);

      ctx.fillStyle = gradient;
      ctx.fillRect(
        item.id * 100,
        endPointGraph[1],
        50,
        -item.heightGraph * absoluteHeight
      );
      ctx.fillStyle = "black";
      ctx.font = "14px Roboto";
      ctx.textAlign = "center";
      ctx.fillText(item.month, item.id * 100 + 25, endPointGraph[1] + 14);
    });
  },
};

const pieGraphObj = {
  data: [],
  arrayColorsPieGraph: [
    "#462124",
    "#62425A",
    "#58718F",
    "#34A2A3",
    "#6ACE8D",
    "#DAEC6B",
  ],
  amount: 0,
  calculateAngleGraph() {
    this.amount = this.data.reduce((sum, current) => sum + current.sales, 0);
    this.data.map((item, index, array) => {
      item.angle =
        Math.round(((item.sales * 2 * Math.PI) / this.amount) * 100) / 100;
      item.startPoint = item.id === 1 ? 0 : array[index - 1].endPoint;
      item.endPoint = item.startPoint + item.angle;
    });
  },
  paintGraph() {
    this.data.map((item, index) => {
      ctx2.strokeStyle = "white";
      ctx2.lineWidth = "3";
      ctx2.fillStyle = this.arrayColorsPieGraph[index];
      ctx2.beginPath();
      ctx2.moveTo(500, 200);
      ctx2.arc(500, 200, 150, item.startPoint, item.endPoint, false);
      ctx2.lineTo(500, 200);
      ctx2.stroke();
      ctx2.fill();
      console.log(
        500 - 150 * Math.cos(item.startPoint + item.angle / 2),
        200 + 150 * Math.sin(item.startPoint + item.angle / 2)
      );
      ctx2.font = "14px Roboto";
      ctx2.fillStyle = "black";
      ctx2.textAlign = "center";
      ctx2.fillText(
        ((100 * item.sales) / this.amount).toFixed(1) + "%",
        500 + 175 * Math.cos(item.startPoint + item.angle / 2),
        208 + 175 * Math.sin(item.startPoint + item.angle / 2)
      );
    });
    ctx2.beginPath();
    ctx2.fillStyle = "white";
    ctx2.arc(500, 200, 70, 0, 2 * Math.PI, false);
    ctx2.stroke();
    ctx2.fill();
  },
  paintLegend() {
    let startPosition = [100, 100];
    const step = [0, 30];
    this.data.map((item, index) => {
      ctx2.beginPath();
      ctx2.fillStyle = this.arrayColorsPieGraph[index];
      ctx2.fillRect(startPosition[0], startPosition[1], 20, -20);
      ctx2.textBaseline = 'middle';
      ctx2.textAlign = 'start';
      ctx2.fillStyle = "black";
      ctx2.fillText(item.month, startPosition[0]+25, startPosition[1]-10);
      ctx2.fill();
      ctx2.stroke();
      startPosition[1]+=step[1];
    })
    
  },
};
document.addEventListener("DOMContentLoaded", async () => {
  const result = await fetch("/statistic");
  let data = await result.json();
  barGraphObj.data = data;
  pieGraphObj.data = data;
  main();
});

function main() {
  barGraphObj.calculateHeightGraphs();
  barGraphObj.paintGrid();
  barGraphObj.paintGraph();
  pieGraphObj.calculateAngleGraph();
  pieGraphObj.paintGraph();
  pieGraphObj.paintLegend();
}
