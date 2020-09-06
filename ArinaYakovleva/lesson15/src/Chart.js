class Chart {
    constructor(ctx, colors) {
        this.ctx = ctx;
        this.colors = [...colors];
    }

    diagram({ arr, months }) {
        let obj = {
            data: arr,
            month: months
        };
        return obj;
    };

    drawDiagram({ data, month }) {
        ctx.font = "15px Montserrat";
        this.ctx.beginPath();
        let start = 0;
        let end = data[0];
        const centerX = 105,
            radius = 90,
            margin = 20,
            centerY = 105;

        this.ctx.lineTo(centerX, centerY);

        for (let i = 0; i < data.length; i++) {
            this.ctx.beginPath();
            this.ctx.arc(centerX, centerY, radius, start * 2 * Math.PI, end * 2 * Math.PI);
            if (i === data.length - 1) {
                this.ctx.arc(centerX, centerY, radius, start * 2 * Math.PI, 0);
            }
            this.ctx.lineTo(centerX, centerY);
            this.ctx.closePath();
            this.ctx.fillStyle = this.colors[i];
            this.ctx.strokeStyle = this.colors[i];
            this.ctx.fillText(month[i], 250, margin * (i + 1));
            this.ctx.fill();
            start = end;
            end = start + data[i + 1];
        }
        this.ctx.stroke();
        this.ctx.closePath();
    }

    chart({ sales, months }) {
        let obj = {
            data: sales,
            month: months
        };
        return obj;
    }

    drawChart({ data, month }) {
        ctx.font = "11px Montserrat";
        let startX = 400;
        let startY = 0;
        let bottom = startY + data[0];
        ctx.moveTo(startX, startY);
        ctx.beginPath();
        for (let i = 0; i < data.length; i++) {
            ctx.fillStyle = this.colors[i];
            ctx.fillRect(startX, bottom - data[i], 50, data[i]);
            ctx.fillText(month[i], startX, bottom + 10);
            startY = data[i];
            startX += 50;
        };
        ctx.stroke();
        ctx.closePath();
    };

    async createCanvas() {
        const data = await getData();
        this.drawDiagram(this.diagram(data), this.colors);
        this.drawChart(this.chart(data), this.colors);
    };

}