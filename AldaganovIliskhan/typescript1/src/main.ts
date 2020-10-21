import axios from "axios";
type TSale  =  {
  month : string,
  sale : number,
  price : number,
  color : string
}

document.addEventListener("DOMContentLoaded", () => {
     axios.get("http://localhost:3001/sales").then(({data}) => {
      render(data);
    });
  });
const render = (sales : TSale[]) => {
  // Гистограмма
  const container : HTMLDivElement | null = document.querySelector('.container');
  const histogramTitle : HTMLElement = document.createElement('h2');
  histogramTitle.textContent = 'Гистограмма';
  const histogramText  : HTMLParagraphElement  = document.createElement('p');
  histogramText.textContent = "Прирос продаж за год";
  const histogram : HTMLCanvasElement = document.createElement('canvas');
  histogram.classList.add('histogram');
  histogram.width = 800;
  histogram.height = 500;
  const histogramCtx  : any =  histogram.getContext("2d");
  if(container) {
    container.appendChild(histogramTitle);
    container.appendChild(histogramText);
    container.appendChild(histogram);
  }
  if(histogramCtx) {
  histogramCtx.beginPath();
  histogramCtx.fillStyle = "green";
  histogramCtx.moveTo(30, 10);
  histogramCtx.lineTo(27, 460);
  histogramCtx.lineTo(800, 460);
  histogramCtx.stroke();
  sales.map((item : TSale, i : number) => {
    histogramCtx.fillText(item.month, 45 + i * 70, 475);
    histogramCtx.fillText((5 - i) * 20, 5, i * 80 + 60);
    histogramCtx.beginPath();
    histogramCtx.moveTo(25, i * 80 + 60);
    histogramCtx.lineTo(30, i * 80 + 60);
    histogramCtx.stroke();
    histogramCtx.fillRect(40 + i * 70, 460 - item.sale * 5, 40, item.sale * 5);
  });
  }
  // Диаграмма
  const diagram : HTMLCanvasElement  = document.createElement('canvas');
  const diagramCtx : any  = diagram.getContext("2d");
  diagram.width = 800;
  diagram.height = 800;
  const diagramTitle : HTMLElement = document.createElement('h2');
  diagramTitle.textContent = 'Диаграмма';
  const diagramText : HTMLParagraphElement = document.createElement('p');
  diagramText.textContent = 'Общая стоимость продаж';
  if(container) {
    container.appendChild(diagramTitle);
    container.appendChild(diagramText);
    container.appendChild(diagram);
  }
  let last : number = 0;
  const total  : number = sales.reduce((total : number, item : TSale) => (total += item.price), 0);
  if(diagramCtx) {
    sales.map((item : TSale, i : number) => {
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
  }
};
