document.addEventListener('DOMContentLoaded', () => {

    const main = document.querySelector('.main');
    let table = document.createElement('table');
    let letters = [' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    main.appendChild(table);
    let transfer = true;
    // тут я добавляю буковки
    for (let i = 0; letters.length > i; i++) {
        let th = document.createElement('th');
        th.innerHTML = letters[i];
        th.style.width = '50px';
        table.appendChild(th);
    }
    let tr = document.createElement('tr');
    table.appendChild(tr);

    for (let k = 0; k < 8; k++) {
        let td = document.createElement('td');
        td.style.width = '50px';
        td.style.height = '50px';
        td.style.textAlign = 'center';
        // td.style.border = '1px solid red';
        td.style.verticalAlign = 'middle';
        td.innerHTML = k + 1;
        table.appendChild(td);
        let tr = document.createElement('tr');

        for (let i = 0; i < 8; i++) {
            if (i == 0)
                transfer = !transfer;
            let td = document.createElement('td');
            (transfer) ? td.classList.add('black') : td.classList.add('white');
            table.appendChild(td);
            transfer = !transfer;
        }
        table.appendChild(tr);

    }
});