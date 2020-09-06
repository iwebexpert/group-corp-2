const statisticArea = document.querySelector(".statistic__area");

const showStatBtn = document.querySelector(".stat__btn");
const closeStatBtn = document.querySelector(".closestat__btn");

const pieStat = document.querySelector("#pieStat");
const barStat = document.querySelector("#barStat");

const ctx1 = barStat.getContext("2d");
const ctx2 = pieStat.getContext("2d");

class Statistic {
  constructor() {
    this.data = [];
    this.maxForPrice = 1000000;
    this.totalSales = 0;
  }

  getTotalSales() {
    this.data.forEach((e) => {
      this.totalSales += e.sales;
    });
  }

  // Рисуем столбцы
  drawBar() {
    this.drawCoord();
    this.data.forEach((el) => {
      ctx1.beginPath();
      ctx1.strokeStyle = `rgb(${this.barColor(180, el.price)}, 0, 255)`; // сохранение общего тона
      ctx1.lineWidth = 10;
      ctx1.moveTo(el.id * 20 + 15, (this.maxForPrice / el.price) * 20);
      ctx1.lineTo(el.id * 20 + 15, 120);
      ctx1.fillStyle = "black";
      ctx1.textAlign = "center";
      ctx1.font = "italic 6pt Arial";
      ctx1.fillText(`${el.month}`, el.id * 20 + 15, 130);
      ctx1.stroke();
    });
  }

  //Цвет столбца будет напрямую зависеть от стоимости продаж
  barColor(max, price) {
    return Math.floor((price / this.maxForPrice) * Math.floor(max));
  }
  // Координатная плоскость
  drawCoord() {
    let text1 = "0";
    let text2 = "1M";
    let textWidth = ctx1.measureText(text1, text2);
    ctx1.beginPath();
    ctx1.strokeStyle = "black";
    ctx1.lineWidth = 2;
    ctx1.moveTo(20, 10);
    ctx1.lineTo(20, 120);
    ctx1.lineTo(280, 120);
    ctx1.fillStyle = "black";
    ctx1.font = "5pt sans-serif";
    ctx1.fillText(text1, 15 - textWidth.width / 2, 120);
    ctx1.fillText(text2, 10 - textWidth.width / 2, 20);
    ctx1.stroke();
  }

  drawPie() {
    let y = 0;
    let prevAngle = 0;
    for (let i = 0; i < this.data.length; i++) {
      let fraction = this.data[i]["sales"] / this.totalSales;
      let angle = prevAngle + fraction * Math.PI * 2;

      ctx2.fillStyle = this.data[i]["color"];
      ctx2.strokeStyle = "black";
      ctx2.beginPath();
      ctx2.moveTo(150, 75);
      ctx2.arc(150, 75, 70, prevAngle, angle, false);
      ctx2.lineTo(150, 75);
      ctx2.fill();
      ctx2.closePath();
      ctx2.stroke();

      ctx2.fillStyle = this.data[i]["color"];
      ctx2.font = "7pt sans-serif";
      let text = `${this.data[i]["month"]}`;
      let textWidth = ctx2.measureText(text);
      y += 11;
      ctx2.beginPath();
      ctx2.moveTo(30, y);
      ctx2.lineTo(30, y + 10);
      ctx2.lineTo(40, y + 10);
      ctx2.lineTo(40, y);
      ctx2.lineTo(30, y);
      ctx2.fill();
      ctx2.stroke();
      ctx2.fillStyle = `#333`;
      ctx2.fillText(text, 55 - textWidth.width / 2, y + 9);

      prevAngle = angle;
    }
  }

  getData = async () => {
    const response = await fetch("/sales");
    this.data = await response.json();
    this.getTotalSales();
    this.drawBar();
    this.drawPie();
  };
}

const statistic = new Statistic();

showStatBtn.addEventListener("click", (e) => {
  if (e.target.classList.contains("stat__btn")) {
    setInterval(() => {
      showStatBtn.setAttribute("value", "clicked");
    }, 100);
  }
  if (e.target.value === "") {
    statistic.getData();
    statisticArea.style.display = "flex";
  } else {
    statisticArea.style.display = "flex";
  }
});

closeStatBtn.addEventListener("click", () => {
  statisticArea.style.display = "none";
});
