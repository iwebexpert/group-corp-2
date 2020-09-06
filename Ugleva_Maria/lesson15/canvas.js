const pieGraph = document.getElementById('pieGraph');
const ctx = pieGraph.getContext('2d');
// цвет заливки
ctx.fillStyle = 'yellow';

// заливка(x y ширина высота )
ctx.fillRect(100, 50, 150, 75); 

// очистить (startX, startY, endX, endY)
ctx.clearRect(0, 0, 400, 200);

// граница цвет
ctx.strokeStyle = 'green';
// где рисовать прямоугольник(startX, startY, ширина, высота)
ctx.rect(5, 10, 150, 100);
ctx.stroke();


// линии

// цвет линии
ctx.strokeStyle = 'red';
// толщина линии
ctx.lineWidth = "5";
// сдвигаем начальную точку на (x, y)
ctx.moveTo(100, 50);
// линия, но не прорисованная (абсолютные координаты)
ctx.lineTo(150, 150);
// прорисовать линию
ctx.stroke();

// обозначить, что рисую новую линию со своими настройками
ctx.beginPath();

// закруглить края тинии (square, butt)
ctx.lineCap = 'round';
// замкнуть фигуру
ctx.closePath();

// подпись графика
ctx.beginPath();
ctx.fillStyle = 'black';
ctx.fillText('text', 200, 200);
ctx.stroke();