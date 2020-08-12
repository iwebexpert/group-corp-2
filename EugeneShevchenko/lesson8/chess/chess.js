'use strict'
let arr = [
    ['', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
    ['1', '', '', '', '', '', '', '', '', ''],
    ['2', '', '', '', '', '', '', '', '', ''],
    ['3', '', '', '', '', '', '', '', '', ''],
    ['4', '', '', '', '', '', '', '', '', ''],
    ['5', '', '', '', '', '', '', '', '', ''],
    ['6', '', '', '', '', '', '', '', '', ''],
    ['7', '', '', '', '', '', '', '', '', ''],
    ['8', '', '', '', '', '', '', '', '', '']
]

let table = document.querySelector('#table')

for(let i = 0; i < 9; i++) {
    let tr = document.createElement('tr')
        for(let j = 0; j < 9; j++) {
            let td = document.createElement('td')
            td.dataset.row = i
            td.dataset.col = j
            td.textContent = arr[i][j]
            tr.appendChild(td)
        }
    table.appendChild(tr)
}

let td23 = document.querySelector('#table tr:nth-child(2) td:nth-child(3)')
td23.style.backgroundColor = 'black'
let td25 = document.querySelector('#table tr:nth-child(2) td:nth-child(5)')
td25.style.backgroundColor = 'black'
let td27 = document.querySelector('#table tr:nth-child(2) td:nth-child(7)')
td27.style.backgroundColor = 'black'
let td29 = document.querySelector('#table tr:nth-child(2) td:nth-child(9)')
td29.style.backgroundColor = 'black'

let td32 = document.querySelector('#table tr:nth-child(3) td:nth-child(2)')
td32.style.backgroundColor = 'black'
let td34 = document.querySelector('#table tr:nth-child(3) td:nth-child(4)')
td34.style.backgroundColor = 'black'
let td36 = document.querySelector('#table tr:nth-child(3) td:nth-child(6)')
td36.style.backgroundColor = 'black'
let td38 = document.querySelector('#table tr:nth-child(3) td:nth-child(8)')
td38.style.backgroundColor = 'black'

let td43 = document.querySelector('#table tr:nth-child(4) td:nth-child(3)')
td43.style.backgroundColor = 'black'
let td45 = document.querySelector('#table tr:nth-child(4) td:nth-child(5)')
td45.style.backgroundColor = 'black'
let td47 = document.querySelector('#table tr:nth-child(4) td:nth-child(7)')
td47.style.backgroundColor = 'black'
let td49 = document.querySelector('#table tr:nth-child(4) td:nth-child(9)')
td49.style.backgroundColor = 'black'

let td52 = document.querySelector('#table tr:nth-child(5) td:nth-child(2)')
td52.style.backgroundColor = 'black'
let td54 = document.querySelector('#table tr:nth-child(5) td:nth-child(4)')
td54.style.backgroundColor = 'black'
let td56 = document.querySelector('#table tr:nth-child(5) td:nth-child(6)')
td56.style.backgroundColor = 'black'
let td58 = document.querySelector('#table tr:nth-child(5) td:nth-child(8)')
td58.style.backgroundColor = 'black'

let td63 = document.querySelector('#table tr:nth-child(6) td:nth-child(3)')
td63.style.backgroundColor = 'black'
let td65 = document.querySelector('#table tr:nth-child(6) td:nth-child(5)')
td65.style.backgroundColor = 'black'
let td67 = document.querySelector('#table tr:nth-child(6) td:nth-child(7)')
td67.style.backgroundColor = 'black'
let td69 = document.querySelector('#table tr:nth-child(6) td:nth-child(9)')
td69.style.backgroundColor = 'black'

let td72 = document.querySelector('#table tr:nth-child(7) td:nth-child(2)')
td72.style.backgroundColor = 'black'
let td74 = document.querySelector('#table tr:nth-child(7) td:nth-child(4)')
td74.style.backgroundColor = 'black'
let td76 = document.querySelector('#table tr:nth-child(7) td:nth-child(6)')
td76.style.backgroundColor = 'black'
let td78 = document.querySelector('#table tr:nth-child(7) td:nth-child(8)')
td78.style.backgroundColor = 'black'

let td83 = document.querySelector('#table tr:nth-child(8) td:nth-child(3)')
td83.style.backgroundColor = 'black'
let td85 = document.querySelector('#table tr:nth-child(8) td:nth-child(5)')
td85.style.backgroundColor = 'black'
let td87 = document.querySelector('#table tr:nth-child(8) td:nth-child(7)')
td87.style.backgroundColor = 'black'
let td89 = document.querySelector('#table tr:nth-child(8) td:nth-child(9)')
td89.style.backgroundColor = 'black'

let td92 = document.querySelector('#table tr:nth-child(9) td:nth-child(2)')
td92.style.backgroundColor = 'black'
let td94 = document.querySelector('#table tr:nth-child(9) td:nth-child(4)')
td94.style.backgroundColor = 'black'
let td96 = document.querySelector('#table tr:nth-child(9) td:nth-child(6)')
td96.style.backgroundColor = 'black'
let td98 = document.querySelector('#table tr:nth-child(9) td:nth-child(8)')
td98.style.backgroundColor = 'black'