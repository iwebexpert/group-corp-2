//Переменные, которые понадобятся
const MAX_HEIGHT = 600;
const Ynumber = 46.66666666666667;
const Y2number = 76.66666666666667;
const XWords = ['Январь', 'Февраль', 'Март',
    'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь',
    'Октябрь', 'Ноябрь', 'Декабрь'];
let count = 0, j = 0;
//Рандомный цвет
const randomColor = () => {
    return "#" + Math.random().toString(16).slice(2, 8);
};

document.addEventListener('DOMContentLoaded', () => {
    //Нахожу или создаю элементы на странице
    const btnBar = document.createElement('button');
    const btnPie = document.createElement('button');
    const btnReturn = document.createElement('a');
    const txtSalesAmount = document.createElement('p');
    const brk = document.createElement('br');

    const graph = document.querySelector('.statistic__graph');
    const btn1 = document.querySelector('.btn1');

    //Функция создания кнопок
    const createChoiseBtns = () => {
        //Создаю новые кнопки
        btnPie.classList.add('statistic__graph_btnPie');
        btnPie.innerHTML = 'Показать круговую диаграмму';
        btnPie.classList.add('btn');
        btnBar.classList.add('statistic__graph_btnBar');
        btnBar.classList.add('btn');
        btnBar.innerHTML = 'Показать табличную диаграмму';
        //Объявляю созданные кнопки и убираю предыдущую
        graph.appendChild(btnPie);
        graph.appendChild(btnBar);
        btn1.remove();
        document.querySelector('.statisctic__btn').remove();
    };

    //Функция создания канваса и статистики продаж
    const createCanvas = () => {
        //Убираю кнопки и создаю канвас
        let mainCanvas = document.createElement('canvas');
        btnReturn.classList.add('btnReturn', 'btn');
        btnReturn.innerHTML = 'Вернуться';
        btnReturn.setAttribute('href', '././statistic.html');
        mainCanvas.classList.add('canvas');
        mainCanvas.setAttribute('width', '600');
        mainCanvas.setAttribute('height', '600');
        btnBar.remove();
        btnPie.remove();
        graph.appendChild(mainCanvas);
        mainCanvas.before(btnReturn);
        btnReturn.after(txtSalesAmount);
    };

    //Функция отрисовки фона для табличной диаграммы
    const canvasBarDraw = (mainCanvas, ctx) => {
        //Первый path основные линии
        ctx.beginPath();
        ctx.moveTo(280, 30);
        ctx.lineTo(280, 590);
        ctx.moveTo(280, 30);
        ctx.lineTo(580, 30);
        ctx.stroke();
        ctx.closePath();
        //Второй path - внутренняя разметка + текст
        ctx.beginPath();
        ctx.strokeStyle = "#e6e6e6";
        ctx.fillStyle = "cccccc";
        ctx.font = "14px Arial";
        //Горизонтальные линии
        for (let i = 0; i < 300; i += 30) {
            ctx.moveTo(310 + i, 30);
            ctx.lineTo(310 + i, 590);
            ctx.fillText(`${count += 10}`, 300 + i, 24);
        }
        //Вертикальные линии
        for (let i = 0; i < 560; i += Ynumber) {
            ctx.moveTo(280, Y2number + i);
            ctx.lineTo(580, Y2number + i);
            while (j < 12) {
                ctx.fillText(`${XWords[j]}`, 210, Y2number + i - 20);
                ++j;
                break;
            }
        }
        ctx.stroke();
        ctx.strokeStyle = "#000000";
        ctx.fillStyle = "#f8173e"; //Мог бы для диаграммы сделать случайный цвет, но который я подобрал выглядит лучше)
        ctx.closePath();
    }
    //Функция заполнения табличной диаграммы
    const canvasBar = diagram => {
        const mainCanvas = document.querySelector('.canvas'); //Нахожу канвас
        const ctx = mainCanvas.getContext('2d');
        ctx.clearRect(0, 0, mainCanvas.width, mainCanvas.height); //Очищаю его
        //Поворачиваю систему координат для удобства 
        ctx.translate(0, mainCanvas.height);
        ctx.rotate(-Math.PI / 2);
        //Рисую фон диаграммы
        canvasBarDraw(mainCanvas, ctx);
        //Локальные переменные, которые понадовятся, для правильного отображения диаграммы 
        let MAXPERCENT = 0,
            diagramStartPoint = 38.55555555555556,
            diagramWidth = 28.18518518518519,
            diagramSize = 0,
            diagramNextPoint = 46.55555555555556;
        let amount = diagram.length;
        //Рисую саму диаграмму
        for (let i = 0; i < diagram.length; i++) {
            if (MAXPERCENT === 0) {
                for (let j = 0; j < diagram.length; j++) {
                    //Все товары и вывод текста
                    MAXPERCENT += diagram[j].sales;
                    txtSalesAmount.innerHTML += `${diagram[j].sales} проданных товар(а/ов) за ${diagram[j].month}`;
                    txtSalesAmount.appendChild(brk);
                }
                MAXPERCENT = (MAXPERCENT / 10);
            }
            while (amount > 0) {
                ctx.beginPath();
                //Использую формулу ((кол-во проданного товара / 10) * максимальная высота диаграммы) * Сумма всех продаж
                diagramSize = (((diagram[i].sales / 10) * 290) / MAXPERCENT);
                ctx.fillRect(280, diagramStartPoint, diagramSize, diagramWidth);
                diagramStartPoint += diagramNextPoint;
                --amount;
                break;
            }
        }
        ctx.closePath();
    }

    //Рисую круговую диаграмму
    const canvasPie = diagram => {
        const mainCanvas = document.querySelector('.canvas');
        const ctx = mainCanvas.getContext('2d');
        //Переменные, которые понадобятся для рисунка
        let radius = 100,
            startAngle = 0, //радиус и начальный угол
            cx = mainCanvas.width / 2,
            cy = mainCanvas.height / 3.2,
            ALLCOUNT = 0;
        for (let j = 0; j < diagram.length; j++) {
            ALLCOUNT += diagram[j].sales;
            txtSalesAmount.innerHTML += `${diagram[j].sales} проданных товар(а/ов) за ${diagram[j].month}`;
            txtSalesAmount.appendChild(brk);
        }
        for (let i = 0; i < diagram.length; i++) {
            //Рисую диаграмму
            ctx.fillStyle = randomColor();
            ctx.beginPath();
            //Использую следующую формулу
            //(Количество продаж / все продажи) * Пи на 2 + начальный угол
            let endAngle = ((diagram[i].sales / ALLCOUNT) * Math.PI * 2) + startAngle;
            ctx.moveTo(cx, cy);
            ctx.arc(cx, cy, radius, startAngle,
                endAngle, false);
            ctx.lineTo(cx, cy);
            ctx.fill();
            ctx.stroke();
            ctx.closePath();

            //Добавляю имена на диаграмму
            //Чтобы добавить названия нахожу середины между углами а так же
            //высчитываю синус - противолежащий к гипотенузе
            //и косинус - прилежащий к гипотенузе
            ctx.beginPath();
            ctx.textAlign = 'center';
            ctx.fillStyle = '#000000';
            ctx.font = "20px Arial";
            let theta = (startAngle + endAngle) / 2; //Середина между углами
            //Синус для Y и Косинус для X угла на 1.5(Чтобы отобразить название дальше) * радиус
            let deltaY = Math.sin(theta) * 1.5 * radius;
            let deltaX = Math.cos(theta) * 1.5 * radius;
            ctx.fillText(diagram[i].month, deltaX + cx, deltaY + cy);
            ctx.closePath;
            //Конец предыдущего значения становится началом следующего
            startAngle = endAngle;
        }
    }

    //Эвенты для кнопок
    //Можно добавлять новые сущности в JSON, которые отразятся в графике

    btn1.addEventListener('click', createChoiseBtns);

    btnBar.addEventListener('click', async () => {
        const response = await fetch('/sales');
        const diagram = await response.json(); //Вывод объекта с сервера
        createCanvas();
        canvasBar(diagram);
    });

    btnPie.addEventListener('click', async () => {
        const response = await fetch('/sales');
        const diagram = await response.json();
        createCanvas();
        canvasPie(diagram);
    })
});