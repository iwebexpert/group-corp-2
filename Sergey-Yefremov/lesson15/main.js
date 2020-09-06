const load = async () => {

    const answ = await fetch('/sales');
    const sales = await answ.json();

    //Pie chart
    let canvas = document.getElementById('canvas');
    let ctx2 = canvas.getContext("2d");
    let last = 0;


    let list1 = [];
    sales.map(c => list1.push(c.price * c.sale));


    let sum = 0;
    let colorPick = ['#a8eb12', '#f78ca0', '#7059be', '#cb11b9', '#a6093a', '#f3c58a', '#8c7476', '#ceca6c', '#adfeed', '#46ad96', '#ac30fe', '#7191f5'];
    for (let j = 0; j < list1.length; j++) {
        sum += list1[j];
    }
    let labels2 = [];
    sales.map(d => labels2.push(d.month));

    for (let i = 0; i < list1.length; i++) {
        ctx2.fillStyle = colorPick[i];

        ctx2.beginPath();

        ctx2.moveTo(canvas.width / 4, canvas.height / 2);
        ctx2.arc(canvas.width / 4,  canvas.height / 2, canvas.height / 2, last, last + (Math.PI * 2 * (list1[i] / sum)), false);
        ctx2.lineTo(canvas.width / 4, canvas.height / 2);

        ctx2.fill();
        last += Math.PI * 2 * (list1[i] / sum);
    }

    for (let i = 1; i < 13; i++) {

        ctx2.beginPath();

        ctx2.strokeStyle = 'fff';

        ctx2.moveTo(600, 50 + i * 30);
        ctx2.lineTo(650, 50 + i * 30);
        ctx2.lineTo(650, 70 + i * 30);
        ctx2.lineTo(600, 70 + i * 30);

        ctx2.closePath();

        ctx2.stroke();
        ctx2.fillStyle = colorPick[i - 1];
        ctx2.fill();

        ctx2.beginPath();

        ctx2.fillStyle = '#051937';
        ctx2.fillText(`${labels2[i - 1]}, ${list1[i - 1]} rub`, 660, 65 + i * 30);

        ctx2.stroke();
    }

    //Bar chart
    let canvas1 = document.getElementById('canvas1');
    let ctx1 = canvas1.getContext('2d');

    ctx1.fillStyle = "fff";

    ctx1.beginPath();

    ctx1.moveTo(30, 10);
    ctx1.lineTo(30, 460);
    ctx1.lineTo(800, 460);

    ctx1.stroke();

    ctx1.fillStyle = "fff";
    for (let i = 0; i < 12; i++) {
        ctx1.fillText((5 - i) * 40 + "", 6, i * 80 + 60);

        ctx1.beginPath();

        ctx1.moveTo(25, i * 80 + 60);
        ctx1.lineTo(30, i * 80 + 60);

        ctx1.stroke();
    }
    let labels = [];
    sales.map(a => labels.push(a.month));

    for (let i = 0; i < 12; i++) {
        ctx1.fillText(labels[i], 45 +
            i * 60, 475);
    }

    let list = [];
    sales.map(b => list.push(b.sale));

    ctx1.fillStyle = "#f9748f";


    for (let i = 0; i < list.length; i++) {
        let month = list[i];
        ctx1.fillRect(40 + i * 60, 460 - month * 2.7, 30, month * 2.7);
    }

};
load();
