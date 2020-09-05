/*
    Получить с json-server статистику (данные можно использовать любые) по продажам за несколько месяцев и
    построить 2 графика: круговая диаграмма (Pie Chart) и столбчатая диаграмма (Bar Chart).
*/

document.addEventListener('DOMContentLoaded', async () => {

    let sales = []

    const response = await fetch('/sales')
    sales = await response.json()

    const pie = document.querySelector('.pie')
    const prev = document.querySelector('.prev')
    const next = document.querySelector('.next')
    const bar = document.querySelector('.bar')

    if (!pie.getContext || !bar.getContext) {
        alert('Ваш браузер не поддерживает canvas.')
        return;
    }

    let colors = ['#b00909',  '#70bd0b', '#937e88', '#f16e23', '#380bbd', '#fde23e', '#57d9ff', '#9f0bbd']

    appendBar(bar, sales, colors)

    appendPie(pie, sales, colors, prev, next)

})
