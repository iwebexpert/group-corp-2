const load = async () => {

  const response = await fetch('/sales');
  const sales = await response.json();

  //Pie chart
  let canvas = document.getElementById('canvas');
  let context1 = canvas.getContext("2d");
  let last = 0;


  let list1 = [];
  sales.map(c => list1.push(c.price * c.sale));


  let sum = 0;
  let peaceOfColor = ['#a8eb12', '#f78ca0', '#f3c58a', '#8c7476', '#46ad96'];
  for (let j = 0; j < list1.length; j++) {
      sum += list1[j];
  }
  let signature = [];
  sales.map(d => signature.push(d.month));

  for (let i = 0; i < list1.length; i++) {
      context1.fillStyle = peaceOfColor[i];

      context1.beginPath();

      context1.moveTo(canvas.width / 4, canvas.height / 2);
      context1.arc(canvas.width / 4,  canvas.height / 2, canvas.height / 2, last, last + (Math.PI * 2 * (list1[i] / sum)), false);
      context1.lineTo(canvas.width / 4, canvas.height / 2);

      context1.fill();
      last += Math.PI * 2 * (list1[i] / sum);
  }

  for (let i = 1; i < 13; i++) {

      context1.beginPath();

      context1.strokeStyle = 'fff';

      context1.moveTo(600, 50 + i * 30);
      context1.lineTo(650, 50 + i * 30);
      context1.lineTo(650, 70 + i * 30);
      context1.lineTo(600, 70 + i * 30);

      context1.closePath();

      context1.stroke();
      context1.fillStyle = peaceOfColor[i - 1];
      context1.fill();

      context1.beginPath();

      context1.fillStyle = '#051937';
      context1.fillText(`${signature[i - 1]}, ${list1[i - 1]} rub`, 660, 65 + i * 30);

      context1.stroke();
  }

  //Bar chart
  let canvas1 = document.getElementById('canvas1');
  let context2 = canvas1.getContext('2d');

  context2.fillStyle = "fff";

  context2.beginPath();

  context2.moveTo(30, 10);
  context2.lineTo(30, 460);
  context2.lineTo(800, 460);

  context2.stroke();

  context2.fillStyle = "fff";
  for (let i = 0; i < 12; i++) {
      context2.fillText((5 - i) * 40 + "", 6, i * 80 + 60);

      context2.beginPath();

      context2.moveTo(25, i * 80 + 60);
      context2.lineTo(30, i * 80 + 60);

      context2.stroke();
  }
  let labels = [];
  sales.map(a => labels.push(a.month));

  for (let i = 0; i < 12; i++) {
      context2.fillText(labels[i], 45 +
          i * 60, 475);
  }

  let list = [];
  sales.map(b => list.push(b.sale));

  context2.fillStyle = "#f9748f";


  for (let i = 0; i < list.length; i++) {
      let month = list[i];
      context2.fillRect(40 + i * 60, 460 - month * 2.7, 30, month * 2.7);
  }

};
load();