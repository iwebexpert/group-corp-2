document.addEventListener('DOMContentLoaded', (e) => {
    const canvasBar = document.getElementById('c1'),
        ctxBar = canvasBar.getContext('2d'),
        canvasPie = document.getElementById('c2'),
        ctxPie = canvasPie.getContext('2d'),
        canvasPieKeys = document.getElementById('pieKey'),
        ctxPieKeys = canvasPieKeys.getContext('2d');

    let dataReq = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('Get', '/data');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status !== 200) {
                    reject(xhr.status);
                } else {
                    const dataJSON = JSON.parse(xhr.response);
                    resolve(dataJSON);
                }
            }
        };
        xhr.send();
    });
    dataReq.then((dataJSON) => {
        pie(dataJSON);
        bar(dataJSON);
    });

    function bar(dataArr) {
        canvasBar.width = 400;
        canvasBar.height = 350;
        let width = 50,
            currX = 50;

        ctxBar.fillStyle = 'green';
        for (let i = 0; i < dataArr.length; i++) {
            let h = dataArr[i].totalSales;
            ctxBar.fillRect(currX, canvasBar.height - h, width, h);
            ctxBar.fillText(dataArr[i].totalSales, currX, 340 - dataArr[i].totalSales);
            ctxBar.fillText(dataArr[i].title, currX, 330 - dataArr[i].totalSales);
            currX += width + 10;
        }
    }

    function pie(dataArr) {

        let graphData = [
            ['#3b5998'],
            ['#00aced'],
            ['red'],
            ['orange'],
            ['lightgray'],
            ['rgb(11,12,80)'],
            ['#d34836']
        ];
        let sections = dataArr.length;
        let total = 0,
            start = 0,
            end = 0,
            width = 300,
            height = 300,
            radius = 150,
            slices = [],
            colours = [];

        canvasPie.width = width;
        canvasPie.height = height;
        for (let i = 0; i < sections; i++) {
            total += dataArr[i].totalSales;
            colours[i] = graphData[i][0];
        }
        for (let i = 0; i < sections; i++) {
            slices.push(((dataArr[i].totalSales / total) * 360) * Math.PI / 180);
        }
        for (let i = 0; i < sections; i++) {
            ctxPie.fillStyle = colours[i];
            ctxPie.beginPath();
            ctxPie.moveTo(width / 2, height / 2);
            if (i == 0) {
                start = 0;
                end = slices[i];
            } else if (i < sections - 1) {
                start += slices[i - 1];
                end = slices[i] + start;
            } else {
                start += slices[i - 1];
                end = 2 * Math.PI;
            }
            ctxPie.arc(width / 2, height / 2, radius, start, end);
            ctxPie.lineTo(width / 2, height / 2);
            ctxPie.fill();
        }
        rectStartY = 20,
            canvasPieKeys.width = width;
        canvasPieKeys.height = sections * 34;

        for (let i = 0; i < sections; i++) {
            let caption = dataArr[i].title;
            ctxPieKeys.fillStyle = colours[i];
            ctxPieKeys.beginPath();
            ctxPieKeys.arc(10, rectStartY, 5, 0, 2 * Math.PI);
            ctxPieKeys.fill();
            ctxPieKeys.fillStyle = '#000';
            ctxPieKeys.fillText(caption, 20, rectStartY + 5);
            rectStartY += 35;
        }
    }
});