class Diagrams {
    constructor(selector, colors, options) {
        this.diagramArea = document.querySelector(selector);
        this.options = options;
        this.ctx = this.diagramArea.getContext("2d");
        this.colors = colors;
    }

    drawPie(){
        let totalValue = 0;
        let width = parseInt(getComputedStyle(this.diagramArea).width.replace('px', ''));
        let height = parseInt(getComputedStyle(this.diagramArea).height.replace('px', ''));
        let minCoords = Math.min(width/2,height/2);

        for (let value in this.options){
            let val = this.options[value].sold;
            totalValue += val;
        }

        let startAngle = 0;
        for (let i = 0; i < this.options.length; i++){
            let sliceAngle = startAngle + ((2 * Math.PI * this.options[i].sold) / totalValue);
            let labelX = width/2 + ((minCoords)/2)*Math.cos(startAngle + (sliceAngle-startAngle)/2);
            let labelY = height/2 + (minCoords/2)*Math.sin(startAngle + (sliceAngle-startAngle)/2);
            this.ctx.fillStyle = this.colors[i];

            this.ctx.beginPath();
            this.ctx.moveTo(width/2,height/2);
            this.ctx.arc(width/2,height/2, minCoords, startAngle, sliceAngle, false);
            this.ctx.fill();
            this.ctx.lineTo(width/2,height/2);

            this.ctx.fillStyle = "white";
            this.ctx.font = "bold 20px Arial";
            this.ctx.fillText(this.options[i].name, labelX, labelY);
            this.ctx.closePath();

            startAngle = sliceAngle;
        }
    }

    drawBar(){
        let totalValue = 0;
        let width = parseInt(getComputedStyle(this.diagramArea).width.replace('px', ''));
        let height = parseInt(getComputedStyle(this.diagramArea).height.replace('px', ''));

        this.ctx.fillStyle = this.colors[0];
        for (let index in this.options){
            let val = this.options[index].sold;
            this.ctx.fillRect(27 + index * 43, 360 - val*2.35, 30, val*2.35);
        }

        this.ctx.fillStyle = "black";
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(22,60);
        this.ctx.lineTo(22,360);
        this.ctx.lineTo(545,360);
        this.ctx.stroke();

        for(let i = 0; i < this.options.length-5; i++) {
            this.ctx.fillText((12-i*2)*10 + "",0, i*45+90);
            this.ctx.beginPath();
            this.ctx.moveTo(19,i*45+90);
            this.ctx.lineTo(25,i*45+90);
            this.ctx.stroke();
        }

        this.ctx.rotate(-1.5708);
        this.ctx.font = "regular 20px Arial";
        for(let i = 0; i < this.options.length; i++) {
            this.ctx.fillText(this.options[i].month, -410, i*43+50);
        }
    }

    static init(selector, type){
        if(type === 'Pie') {
            loadGoods('/goodsStatistics').then(goodsPie => {
                    let diagram = new Diagrams(selector, ["orange", "green", "blue", "yellow", "teal"], goodsPie);
                    diagram.drawPie();
                },
                (status) => {
                    alert('Что-то пошло не так...\nПопробуйте перезагрузить страничку чуть позже');
                });
        }
        if(type === 'Bar') {
            loadGoods('/salesStatistics').then(month => {
                let diagram = new Diagrams(selector, ["blue"], month);
                diagram.drawBar();
            },
            (status) => {
                alert('Что-то пошло не так...\nПопробуйте перезагрузить страничку чуть позже');
            });
        }
    }
}