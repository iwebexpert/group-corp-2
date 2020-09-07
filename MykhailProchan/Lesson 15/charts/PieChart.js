function pieChart(data, total) {
  const canvas = document.querySelector('#pie-chart');
  const ctx = canvas.getContext('2d');
  const colors = ['red', 'green', 'blue'];
  let prevRad = 0;

  const middle = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: canvas.width / 2,
  };

  ctx.beginPath();
  ctx.arc(middle.x, middle.y, middle.radius, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.stroke();
  ctx.fillStyle = "black";
  ctx.fill();

  data.forEach((a, i) => {
    ctx.beginPath();
    ctx.fillStyle = colors[i];
    ctx.moveTo(middle.x, middle.y);
    ctx.arc(middle.x, middle.y, middle.radius - 2, prevRad, prevRad + (Math.PI * 2) * (a.sales / total), false);
    ctx.closePath();
    ctx.fill();
    prevRad += (Math.PI * 2) * (a.sales / total);
  })
}