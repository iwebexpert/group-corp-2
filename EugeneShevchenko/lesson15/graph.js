document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.querySelector('#myChart').getContext('2d')
    let chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['янв','фев','мар','апр','май','инь','июл','авг','сен','окт','ноя','дек'],
            datasets: [{
                label: 'график продаж по месяцам',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [10, 1, 5, 2, 20, 30, 45, 17, 96, 200, 4, 42]
            }]
        },
        options: {}
    })
})