const makeGETRequest = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status !== 200) {
          reject(xhr.status);
        }

        const goods = JSON.parse(xhr.responseText);
        resolve(goods);
      }
    }
    xhr.send();
  });
}

const fetchData = async function() {
  try {
    const response = await fetch(`http://localhost:3000/stat`);
    const result = response.json();
    return result;
  } catch {
    console.error('Error');
  }
};

const getData = async function() {
  const data = await fetchData();
  if (data) {
    let sales = [];
    let months = [];
    let arr = [];
    for (let i = 0; i < data.length; i++) {
      sales.push(data[i].count);
      months.push(data[i].month);
    }

    const totalSum = sales.reduce((a, b) => a + b, 0);
    sales.forEach(sale => {
      arr.push(sale / totalSum);
    });

    return { sales, months, arr }
  }
};



class Chart {
  constructor(ctx, colors) {
    this.ctx = ctx;
    this.colors = [...colors];
  }

  diagram({ arr, months }) {
    let obj = {
      data: arr,
      month: months
    };
    return obj;
  };

  drawDiagram({ data, month }) {
    ctx.font = "15px Arial";
    this.ctx.beginPath();
    let start = 0;
    let end = data[0];
    const centerX = 105;
    const radius = 90;
    const margin = 20;
    const centerY = 105;

    this.ctx.lineTo(centerX, centerY);

    for (let i = 0; i < data.length; i++) {
      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, radius, start * 2 * Math.PI, end * 2 * Math.PI);
      if (i === data.length - 1) {
        this.ctx.arc(centerX, centerY, radius, start * 2 * Math.PI, 0);
      }
      this.ctx.lineTo(centerX, centerY);
      this.ctx.closePath();
      this.ctx.fillStyle = this.colors[i];
      this.ctx.strokeStyle = this.colors[i];
      this.ctx.fillText(month[i], 250, margin * (i + 1));
      this.ctx.fill();
      start = end;
      end = start + data[i + 1];
    }
    this.ctx.stroke();
    this.ctx.closePath();
  }

  chart({ sales, months }) {
    let obj = {
      data: sales,
      month: months
    };
    return obj;
  }

  drawChart({ data, month }) {
    ctx.font = "11px Arial";
    let startX = 400;
    let startY = 200;
    let bottom = startY + data[0];
    ctx.moveTo(startX, startY);
    ctx.beginPath();
    for (let i = 0; i < data.length; i++) {
      ctx.fillStyle = this.colors[i];
      ctx.fillRect(startX + 20, bottom - data[i] - 50, 50, data[i] + 50);
      ctx.fillText(month[i], startX + 23, bottom + 12);
      startY = data[i];
      startX += 70;
    };
    ctx.stroke();
    ctx.closePath();
  };

  async createCanvas() {
    const data = await getData();
    this.drawDiagram(this.diagram(data), this.colors);
    this.drawChart(this.chart(data), this.colors);
  };
}

let color_arr = ["#00FF7F", "#00FFFF", "#FFFFFF", "#FF00FF", "#FFFF00", "#FF4500", "#FF69B4",
      "#00FFFF", "#B22222"];
const canvas = document.querySelector('#cnv');
const ctx = canvas.getContext("2d");
canvas.width = 1900;
canvas.height = 350;
let newDiagram = new Chart(ctx, color_arr);
newDiagram.createCanvas();

let flag_cnv = false;
document.getElementsByClassName("show__stat")[0].addEventListener("click", show_cnv);
function show_cnv() {
  if (!flag_cnv) {
    document.getElementsByClassName("stat")[0].style.display = 'block';
    flag_cnv = true;
    document.getElementById('shst').textContent = "Hide Statistics";
  } else {
    document.getElementsByClassName("stat")[0].style.display = 'none';
    flag_cnv = false;
    document.getElementById('shst').textContent = "Show Statistics";
  }
}