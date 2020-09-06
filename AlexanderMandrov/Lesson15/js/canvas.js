import { getSalesData } from './services.js';

const colors = ["red", "blue", "green", "orange", "teal", "purple"];
const c = document.getElementById('canvas');
const ctx = c.getContext("2d");

const catchData = async () => {
    const data = await getSalesData();
    if (data) {
        const salesCount = [],
            monthArr = [],
            newArr = [];

        data.forEach((sale) => {
            salesCount.push(sale.sales);
            monthArr.push(sale.month);
        });
        const totalSales = salesCount.reduce((a, b) => a + b, 0);

        salesCount.forEach(item => {
            newArr.push(item / totalSales);
        });
        return { salesCount, monthArr, newArr }
    }
};

const configureCircleOptions = ({ newArr, monthArr }) => {
    return {
        data: newArr,
        month: monthArr
    };
};

const configureBarOptions = ({ salesCount, monthArr }) => {
    return {
        data: salesCount,
        month: monthArr
    };
};

const drawCircle = ({ data, month }, colors) => {
    ctx.font = "18px Georgia";
    ctx.beginPath();
    let initialPoint = 0;
    let endPoint = data[0];
    const xCenter = 105,
        margin = 30,
        radius = 100,
        yCenter = 105;
    ctx.lineTo(xCenter, yCenter);
    for (let i = 0; i < data.length; i++){
        ctx.beginPath();
        ctx.arc(xCenter, yCenter, radius, initialPoint * 2 * Math.PI, endPoint * 2 * Math.PI);
        if (i === data.length - 1) {
            ctx.arc(xCenter, yCenter, radius, initialPoint * 2 * Math.PI, 0);
        }
        ctx.lineTo(xCenter, yCenter);
        ctx.closePath();
        ctx.fillStyle = colors[i];
        ctx.strokeStyle = colors[i];
        ctx.fillText(month[i], 250, margin * (i + 1));
        ctx.fill();
        initialPoint = endPoint;
        endPoint = initialPoint + data[i + 1];
    }
    ctx.stroke();
    ctx.closePath();
};

const drawBar = ({ data, month }, colors) => {
    ctx.font = "11px Georgia";
    let initialX = 400;
    let initialY = 0;
    let bottomLine = initialY + data[0];
    ctx.moveTo(initialX, initialY);
    ctx.beginPath();
    for (let i = 0; i < data.length; i++) {
        ctx.fillStyle = colors[i];
        ctx.fillRect(initialX, bottomLine - data[i], 50, data[i]);
        ctx.fillText(month[i], initialX, bottomLine + 10);
        initialY = data[i];
        initialX += 50;
    };
    ctx.stroke();
    ctx.closePath();
};

const initCanvasDrawing = async () => {
    const dataArrays = await catchData();
    drawCircle(configureCircleOptions(dataArrays), colors);
    drawBar(configureBarOptions(dataArrays), colors);
};

export default initCanvasDrawing;