document.addEventListener("DOMContentLoaded", async () => {
  const res = await fetch("/sales");
  const sales = await res.json();
  render(sales);
});
const render = (sales) => {
  // Гистограмма
  const histogram = document.querySelector(".histogram");
  const histogramCtx = histogram.getContext("2d");
  histogramCtx.beginPath();
  histogramCtx.fillStyle = "green";
  histogramCtx.moveTo(30, 10);
  histogramCtx.lineTo(27, 460);
  histogramCtx.lineTo(800, 460);
  histogramCtx.stroke();
  sales.map((item, i) => {
    histogramCtx.fillText(item.month, 45 + i * 70, 475);
    histogramCtx.fillText((5 - i) * 20, 5, i * 80 + 60);
    histogramCtx.beginPath();
    histogramCtx.moveTo(25, i * 80 + 60);
    histogramCtx.lineTo(30, i * 80 + 60);
    histogramCtx.stroke();
    histogramCtx.fillRect(40 + i * 70, 460 - item.sale * 5, 40, item.sale * 5);
  });
  // Диаграмма
  const diagram = document.querySelector(".diagram");
  const diagramCtx = diagram.getContext("2d");
  let last = 0;
  const total = sales.reduce((total, item) => (total += item.price), 0);
  sales.map((item, i) => {
    diagramCtx.fillStyle = item.color;
    diagramCtx.beginPath();
    diagramCtx.moveTo(250, 400);
    diagramCtx.arc(
      250,
      400,
      200,
      last,
      last + Math.PI * 2 * (item.price / total),
      false
    );
    diagramCtx.lineTo(250, 400);
    diagramCtx.fill();
    last += Math.PI * 2 * (item.price / total);
    diagramCtx.beginPath();
    diagramCtx.moveTo(600, 208 + i * 30);
    diagramCtx.lineTo(650, 208 + i * 30);
    diagramCtx.lineTo(650, 218 + i * 30);
    diagramCtx.lineTo(600, 218 + i * 30);
    diagramCtx.closePath();
    diagramCtx.stroke();
    diagramCtx.fillStyle = item.color;
    diagramCtx.fill();
    diagramCtx.beginPath();
    diagramCtx.fillStyle = "black";
    diagramCtx.fillText(
      `${item.month}, ${item.price * item.sale} рублей`,
      660,
      215 + i * 30
    );
    diagramCtx.stroke();
  });
};
