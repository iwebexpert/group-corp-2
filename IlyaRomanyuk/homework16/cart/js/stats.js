class Stats {
    constructor() {
        this.data = [];
        this.totalGoods = 0;
        this.totalPrice = 0;
        this.myCanvas = document.querySelector(".myCanvas");
    }

    getTotalGoods = () => {
        this.data.forEach(el => this.totalGoods += el['sales']);
    }

    getTotalPrice = () => {
        this.data.forEach(el => this.totalPrice += el['price']);
    }

    getRows = () => {
        const c = this.myCanvas.getContext('2d');
        c.fillStyle = "#996633";

        for (let i = 0; i < this.data.length; i++) {
            let dp = this.data[i]['price'];
            c.fillRect(25 + i * 80, 1100 - Math.ceil(dp / 1000), 50, Math.ceil(dp / 1000));
        }

        c.font = "16pt sans-serif";
        c.fillText('Диаграмма по количеству денег', 50, 700);
        c.fillStyle = "black";
        c.lineWidth = 2.0;
        c.beginPath();
        c.moveTo(20, 610);
        c.lineTo(20, 1105);
        c.lineTo(500, 1105);
        c.stroke();

        c.fillStyle = "black";
        c.font = "12pt sans-serif";

        for (var i = 0; i < 6; i++) {
            c.fillText(i * 10 + "-", 0, 1200 - (i * 100 + 85));
        }

        for (let i = 0; i < this.data.length; i++) {
            c.fillText(this.data[i]["label"], 25 + i * 80, 1140);
        }
    }

    getCircle = () => {
        const c = this.myCanvas.getContext('2d');
        let y = 460;

        let prevAngle = 0;
        for (let i = 0; i < this.data.length; i++) {
            let fraction = this.data[i]['sales'] / this.totalGoods;
            let angle = prevAngle + fraction * Math.PI * 2;


            // рисуем сегмент
            c.fillStyle = this.data[i]['color'];
            c.strokeStyle = "black";

            c.font = "16pt sans-serif";
            c.fillText('Диаграмма по количеству товаров', 50, 40);
            c.beginPath();
            c.moveTo(250, 250);
            c.arc(250, 250, 200, prevAngle, angle, false);
            c.lineTo(250, 250);
            c.fill();
            c.closePath();
            c.stroke();

            c.fillStyle = this.data[i]['color'];
            c.font = "20pt sans-serif";
            let text = `${this.data[i]['month']}`;
            let metrics = c.measureText(text);
            y += 30
            c.beginPath();
            c.moveTo(170, y)
            c.lineTo(170, y + 10);
            c.lineTo(180, y + 10);
            c.lineTo(180, y);
            c.lineTo(170, y);
            c.fill()
            c.stroke();
            c.fillStyle = `#333`;
            c.fillText(text, 250 - metrics.width / 2, y + 15);

            prevAngle = angle;
        }
    }

    getData = async () => {
        const response = await fetch('/sales');
        this.data = await response.json();
        this.getTotalGoods();
        this.getTotalPrice();
        this.getCircle();
        this.getRows();

    }

}

const stats = new Stats();

const btn = document.querySelector('.btn');
btn.addEventListener('click', stats.getData);

