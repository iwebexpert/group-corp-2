function draw(){
    const table = document.createElement('table');
    let flag = true;

    let tR = document.createElement('tr');
    let letters = [' ','A','B','C','D','E','F','G','H'];

    for(let i = 0; i < 8; i++){
        let tr = document.createElement('tr');
        let tD = document.createElement('td');
        tD.style.width = '40px';
        tD.style.height = '40px';
        tD.innerHTML = 8 - i;
        tr.appendChild(tD);

        for(let j = 0; j < 8; j++){

            if(j === 0)
                flag = !flag;

            let td = document.createElement('td');

            td.style.width = '40px';
            td.style.height = '40px';
            if(flag){
                td.style.background = 'black';
            }else
                td.style.background = 'white';

            tr.appendChild(td);
            flag = !flag;
        }
        table.appendChild(tr);
    }

    for(let k = 0; k < 9; k++){
        let td = document.createElement('td');
        td.style.width = '40px';
        td.style.height = '40px';
        td.style.background = 'white';
        td.innerHTML = letters[k];
        tR.appendChild(td);

    }
    table.appendChild(tR);
    document.body.appendChild(table);
}

draw();