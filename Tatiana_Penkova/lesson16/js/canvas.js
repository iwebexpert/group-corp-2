class Stat {
  constructor(options) {
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext('2d');
    this.colors = options.colors;
  }

  drawPieSlice(ctx, centerX, centerY, radius, startAngle, endAngle, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
  }

  drawMonthSales() {
    let totalValue = 0;
    let colorIndex = 0;
    for (const values in this.options.data) {
      const value = this.options.data[values];
      totalValue += value;
    }

    let startAngle = 0;

    for (const values in this.options.data) {
      const value = this.options.data[values];
      const sliceAngle = 2 * Math.PI * value / totalValue;

      this.drawPieSlice(
        this.ctx,
        this.canvas.width / 2,
        this.canvas.height / 2,
        Math.min(this.canvas.width / 2, this.canvas.height / 2),
        startAngle,
        startAngle + sliceAngle,
        this.colors[colorIndex % this.colors.length],
      );

      if (this.options.doughnutHoleSize) {
        this.drawPieSlice(
          this.ctx,
          this.canvas.width / 2,
          this.canvas.height / 2,
          this.options.doughnutHoleSize * Math.min(this.canvas.width / 2, this.canvas.height / 2),
          0,
          2 * Math.PI,
          '#ff0000',
        );
      }

      startAngle += sliceAngle;
      colorIndex++;
    }

    if (this.options.doughnutHoleSize) {
      this.drawPieSlice(
        this.ctx,
        this.canvas.width / 2,
        this.canvas.height / 2,
        this.options.doughnutHoleSize * Math.min(this.canvas.width / 2, this.canvas.height / 2),
        0,
        2 * Math.PI,
        '#fff',
      );
    }
    startAngle = 0;
    for (const values in this.options.data) {
      const value = this.options.data[values];
      const sliceAngle = 2 * Math.PI * value / totalValue;
      const pieRadius = Math.min(this.canvas.width / 2, this.canvas.height / 2);
      const labelX = this.canvas.width / 2 + (pieRadius / 2) * Math.cos(startAngle + sliceAngle / 2);
      let labelY = this.canvas.height / 2 + (pieRadius / 2) * Math.sin(startAngle + sliceAngle / 2);

      if (this.options.doughnutHoleSize) {
        const offset = (pieRadius * this.options.doughnutHoleSize) / 2;
        const SlabelX = this.canvas.width / 2 + (offset + pieRadius / 2) * Math.cos(startAngle + sliceAngle / 2);
        labelY = this.canvas.height / 2 + (offset + pieRadius / 2) * Math.sin(startAngle + sliceAngle / 2);
      }

      const labelText = Math.round(100 * value / totalValue);
      this.ctx.fillStyle = 'black';
      this.ctx.font = '16px Arial';
      this.ctx.fillText(`${labelText}% ${values}\n(${value})`, labelX, labelY);
      startAngle += sliceAngle;
    }
  }

  drawTotalSales() {
    this.ctx.fillStyle = 'black';

    // Отображение значений по y
    for (let i = 0; i < 12; i++) {
      this.ctx.fillText(`${(11 - (i - 1)) * 20}`, 4, i * 40 + 30);
      this.ctx.beginPath();
      this.ctx.moveTo(25, i * 40 + 30);
      this.ctx.lineTo(30, i * 40 + 30);
      this.ctx.stroke();
    }
    // Отрисовка месяцев
    for (let i = 0; i < this.options.data.length; i++) {
      this.ctx.fillText(`${this.options.data[i].month}, ${this.options.data[i].sales} ед.`, 50 + i * 100, 490);
    }

    this.ctx.fillStyle = 'rgb(12, 219, 5)';
    // Рисование графика
    for (let i = 0; i < this.options.data.length; i++) {
      const dp = this.options.data[i].sales;
      this.ctx.fillRect(50 + i * 100, 510 - dp * 2, 60, dp * 2 - 40);
    }
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const response = await fetch('/sales');
  const info = await response.json();

  const btn1 = document.getElementById('1');

  btn1.addEventListener('click', (e) => {
    e.preventDefault();
    const canvas1 = document.querySelector('.canvas1');
    const title = document.querySelector('.sales__title');
    if (btn1.classList.contains('remove__btn')) {
      canvas1.style.display = 'none';
      title.style.display = 'none';
      btn1.textContent = 'Показать график продаж';
      btn1.classList.remove('remove__btn');
      return;
    }
    canvas1.style.display = 'block';
    title.style.display = 'block';
    const myStat = new Stat({
      canvas: canvas1,
      data: info,
    });
    myStat.drawTotalSales();

    btn1.textContent = 'Скрыть график продаж';
    btn1.classList.add('remove__btn');
  });

  const btn2 = document.getElementById('2');

  btn2.addEventListener('click', (e) => {
    e.preventDefault();
    const canvas2 = document.querySelector('.canvas2');
    const title = document.querySelector('.month__title');
    if (btn2.classList.contains('remove__btn')) {
      canvas2.style.display = 'none';
      title.style.display = 'none';
      btn2.textContent = 'Показать диаграмму по товарам';
      btn2.classList.remove('remove__btn');
      return;
    }
    canvas2.style.display = 'block';
    title.style.display = 'block';

    const maySales = {
      Носки: info[0].socks,
      Трусы: info[0].pants,
      Полотенца: info[0].towels,
    };

    const chart = new Stat(
      {
        canvas: canvas2,
        data: maySales,
        colors: ['#fde23e', '#f16e23', '#57d9ff'],
        doughnutHoleSize: 0.5,
      },
    );
    chart.drawMonthSales();

    btn2.textContent = 'Скрыть диаграмму по товарам';
    btn2.classList.add('remove__btn');
  });
});
