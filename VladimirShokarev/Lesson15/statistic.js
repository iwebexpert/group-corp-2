const btnStatic = document.querySelector('#btnStatic');
        btnStatic.addEventListener('click', async () => {
            document.querySelector('#canvas1').style = 'display: inline-block';
            document.querySelector('#canvas2').style = 'display: inline-block';
            const response = await fetch('/sales');
            const sales = await response.json();
            console.log(sales);
            createPie(sales);
            createGraph(sales);
        });

function createPie(sales){
    let canvas = document.getElementById("canvas1");
    let ctx = canvas.getContext("2d");
    ctx.lineWidth = 2;

    let PI2 = Math.PI * 2;
    let myColor = ["Green", "Red", "Blue", "Grey", "Orange"];
    let myData = sales;
    let cx = 250;
    let cy = 250;
    let radius = 200;

    pieChart(myData, myColor);

    function pieChart(data, colors) {
        let total = 0;
          for (let i = 0; i < data.length; i++) {
            total += data[i].price;
          }

          let sweeps = []
          for (let i = 0; i < data.length; i++) {
            sweeps.push(data[i].price / total * PI2);
          }

          let accumAngle = 0;
          for (let i = 0; i < sweeps.length; i++) {
            drawWedge(accumAngle, accumAngle + sweeps[i], colors[i], data[i].month);
            accumAngle += sweeps[i];
          }
        }

    function drawWedge(startAngle, endAngle, fill, label) {

          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.arc(cx, cy, radius, startAngle, endAngle);
          ctx.closePath();
          ctx.fillStyle = fill;
          ctx.strokeStyle = 'black';
          ctx.fill();
          ctx.stroke();

          let midAngle = startAngle + (endAngle - startAngle) / 2;
          let labelRadius = radius * .65;
          let x = cx + (labelRadius) * Math.cos(midAngle) - 20;
          let y = cy + (labelRadius) * Math.sin(midAngle);
          ctx.fillStyle = 'white';
          ctx.fillText(label, x, y);
    }
}

function createGraph(sales){
    let canvas2 = document.getElementById('canvas2');
    let ctx = canvas2.getContext('2d');

    ctx.fillStyle = "black";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.moveTo(30, 10);
    ctx.lineTo(30, 460);
    ctx.lineTo(500, 460);
    ctx.stroke();

    ctx.fillStyle = "black";

    for(let i = 0; i < 6; i++) {
        ctx.fillText((5 - i) * 200 + "т.", 0, i * 80 + 60);
        ctx.beginPath();
        ctx.moveTo(25, i * 80 + 60);
        ctx.lineTo(30, i * 80 + 60);
        ctx.stroke();
    }

    let labels = sales;

    for(let i=0; i<5; i++) {
        ctx.fillText(labels[i].month, 50+ i*100, 475);
    }

    let data = [];
    for (let i = 0; i < sales.length; i++) {
      data.push(sales[i].price / 10000);
    }

    ctx.fillStyle = "green";

    for(let i=0; i<data.length; i++) {
        let dp = data[i];
        ctx.fillRect(40 + i*100, 460-dp*4 , 50, dp*4);
    }
}
