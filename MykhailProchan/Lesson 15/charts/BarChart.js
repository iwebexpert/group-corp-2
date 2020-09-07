function barChart(data) {
  const canvas = document.querySelector('#bar-chart');
  const ctx = canvas.getContext('2d');

  let maxSales = 0;
  data.forEach(a => {
    if (a.sales > maxSales) maxSales = a.sales;
  });

  ctx.beginPath();
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.moveTo(30, 30);
  ctx.lineTo(30, 330);
  ctx.lineTo(400, 330);
  ctx.stroke();

  ctx.font = "8pt";
  ctx.fillStyle = "black";
  data.forEach((a, i) => ctx.fillText(a.month, 45 + i * 60, 340));

  ctx.fillStyle = 'red';
  data.forEach((a, i) => {
    if (a.sales == maxSales) {
      ctx.fillRect(45 + i * 60, 30, 35, 300);
    } else {
      ctx.fillRect(45 + i * 60, 330 * (1 - a.sales / maxSales), 35, 330 * (a.sales / maxSales));
    }
  });
}