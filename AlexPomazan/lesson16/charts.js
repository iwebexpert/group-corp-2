const getSales = async () => {
    const response = await fetch('/sales');
    const sales = await response.json();

    const salesArr = [];
    const monthArr = [];

    sales.map((data) => {
        salesArr.push(data.sales);
        monthArr.push(data.month);
    });

    const btnBarChart = document.querySelector('.btn-barchart');
    btnBarChart.style.display = 'none';

    const btnPieChart = document.querySelector('.btn-piechart');

    const barChart = document.querySelector('.canvas1');
    barChart.style.display = 'block';

    const pieChart = document.querySelector('.canvas2');

    pieChart.style.display = 'none';


    //Столбчатая диаграмма
    let ctx = barChart.getContext('2d');

    ctx.font = '19pt sans-serif';
    ctx.fillText('Продажи за этот год', 170, 20);

    //Отрисовка линий графика
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2.0;
    ctx.moveTo(30, 30);
    ctx.lineTo(30, 540);
    ctx.lineTo(580, 540);
    ctx.stroke();

    ctx.font = '9pt sans-serif';

    //Отрисовка цифр для делений линейки по Y
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    for (let i = 0; i < 7; i++) {
        ctx.beginPath();
        ctx.fillText((6 - i) * 20, 4, i * 80 + 62);
        ctx.stroke();
    }

    //Отрисовка делений линейки по Y
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < 6; i++) {
        ctx.beginPath();
        ctx.moveTo(23, i * 80 + 60);
        ctx.lineTo(580, i * 80 + 60);
        ctx.stroke();
    }

    //Отрисовка месяцев
    ctx.fillStyle = 'black';
    for (let i = 0; i < 9; i++) {
        ctx.fillText(monthArr[i], 50 + i * 60, 560);
    }

    //Отрисовка столбцов 
    colors = ['red', 'orange', 'yellow', 'green', 'lightblue', 'blue', 'indigo', 'black', 'bisque']
    for (let i = 0; i < salesArr.length; i++) {
        ctx.fillStyle = colors[i];
        ctx.fillRect(45 + i * 60, 540 - 4 * salesArr[i], 35, 4 * salesArr[i]);
    }

    //Круговая диаграмма
    ctx = pieChart.getContext('2d');

    ctx.font = '19pt sans-serif';
    ctx.fillText('Сравнение продаж августа с сентябрем', 50, 50);

    let textPosY = 400;
    let startAngle = 0;

    for (let i = 7; i < salesArr.length; i++) {
        textPosY += 25;
        let sumSales = salesArr[7] + salesArr[8];
        let fraction = salesArr[i] / sumSales;
        let angle = startAngle + fraction * (2 * Math.PI);

        //Отрисовка окружности
        ctx.beginPath();
        ctx.moveTo(300, 250);
        ctx.strokeStyle = 'black';
        ctx.fillStyle = colors[i];
        ctx.arc(300, 250, 150, startAngle, angle, false);
        ctx.lineTo(300, 250);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();

        //Отрисовка квадрата с цветом месяца
        ctx.fillStyle = colors[i];
        ctx.fillRect(120, textPosY, 12, 12);

        //Отрисовка месяца и количество проданных товаров
        ctx.font = '16pt sans-serif';
        ctx.fillStyle = 'black';
        ctx.fillText(monthArr[i], 140, textPosY + 12);
        ctx.font = '14pt sans-serif';
        ctx.fillText(`(Количество продаж: ${salesArr[i]})`, 250, textPosY + 12);

        startAngle = angle;
    }

    btnPieChart.addEventListener("click", () => {
        barChart.style.display = 'none';
        btnPieChart.style.display = 'none';

        btnBarChart.style.display = 'block';
        pieChart.style.display = 'block';
    });

    btnBarChart.addEventListener("click", () => {
        pieChart.style.display = 'none';
        btnBarChart.style.display = 'none';

        btnPieChart.style.display = 'block';
        barChart.style.display = 'block';
    });
};

getSales();