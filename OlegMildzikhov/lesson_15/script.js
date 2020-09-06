const canvas = document.querySelector('#canvas'),
    ctx = canvas.getContext('2d'),
    barGraph = document.querySelector('.buttone__bar'),
    pieChartGraph = document.querySelector('.buttone__pieChart');


//Генератор цветов
const randomHexColorCode = () => {
    return "#" + Math.random().toString(16).slice(2, 8);
};

//Отпрвляем запрос на получение товаров с сервера
new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '/goods');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status !== 200) {
                    reject(xhr.status);
                } else {
                    const goodsJSON = JSON.parse(xhr.response);
                    resolve(goodsJSON);
                }
            }
        };
        xhr.send();
    })
    .then((goodsJSON) => {
        barGraph.addEventListener('click', () => drawGraphsBar(goodsJSON));
        pieChartGraph.addEventListener('click', () => drawGraphsPieChart(goodsJSON));
    });

//Функция, отвечающая за отрисовку графиков
function drawGraphsBar(data) {
    //смещаюсь в левый нижний угол для более привычной системы координат. Размеры холста задаю 400х200
    let cX = 0,
        cY = 190;

    canvas.width = 400;
    canvas.height = 200;

    data.forEach((item) => {
        ctx.beginPath();
        ctx.moveTo(cX + 20, cY); // смещаюсь в левый нижний угол
        ctx.lineTo(cX + 20, 200 - item.totalBuyed);
        ctx.lineTo(cX + 40, 200 - item.totalBuyed);
        ctx.lineTo(cX + 40, cY);
        ctx.fillStyle = randomHexColorCode();
        ctx.strokeStyle = '#333';
        ctx.fill();
        ctx.fillText(item.totalBuyed, cX + 20, 195 - item.totalBuyed);
        ctx.fillText(item.name, cX + 20, 200);
        //после отрисовки столба смещаемся вправо для отрисовки последующего нового столба
        cX = cX + 40;
        ctx.closePath();
        ctx.stroke();
    });
    //обнуляю изначальное значение оси Х, чтобы при новом нажатии на кнопку, график не ушел влево.
    cX = 0;
}


function drawGraphsPieChart(data) {
    canvas.width = 400;
    canvas.height = 400;

    console.log(data);
    let total = data.reduce((ttl, item) => {
        return ttl + item.totalBuyed;
    }, 0);
    console.log(total);

    let startAngle = 0;
    let radius = 100;
    let cx = canvas.width / 2;
    let cy = canvas.height / 2;

    data.forEach(item => {
        ctx.fillStyle = randomHexColorCode();
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#333';
        ctx.beginPath();
        console.log(total, item.totalBuyed, item.totalBuyed / total);
        // Отрисовка куска диаграммы
        let endAngle = ((item.totalBuyed / total) * Math.PI * 2) + startAngle;
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, radius, startAngle, endAngle, false);
        ctx.lineTo(cx, cy);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

        // Добавим подписи
        ctx.beginPath();
        ctx.font = '20px Helvetica, Calibri';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'rebeccapurple';
        //Тут чистая геометрия. Она может оказывается пригодиться
        let theta = (startAngle + endAngle) / 2;
        let deltaY = Math.sin(theta) * 1.5 * radius;
        let deltaX = Math.cos(theta) * 1.5 * radius;
        ctx.fillText(item.name, deltaX + cx, deltaY + cy);
        ctx.closePath();
        //После отрисовки куска диаграммы необходимо задать новый начальный угол для последующей части диаграммы, иначе все будет рисоваться в одном и том же углу. 
        startAngle = endAngle;
    });
}