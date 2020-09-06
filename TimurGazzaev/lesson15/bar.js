function drawBar(ctx, upperLeftCornerX, upperLeftCornerY, width, height, color) {
    ctx.save()
    ctx.fillStyle = color
    ctx.fillRect(upperLeftCornerX, upperLeftCornerY, width, height)
    ctx.restore()
}

function appendBar(bar, sales, colors) {

    const ctx = bar.getContext('2d')

    let barData = {}
    sales.forEach(item => barData[item.month] = item.sales)

    let maxValue = 0
    for (let month in barData) {
        maxValue = Math.max(maxValue, barData[month])
    }

    let barIndex = 0
    let numberOfBars = Object.keys(barData).length
    let barSize = (490) / numberOfBars

    for (month in barData) {
        let barHeight = Math.round(490 * barData[month] / maxValue)
        drawBar(
            ctx,
            5 + barIndex * barSize,
            bar.height - barHeight - 5,
            barSize,
            barHeight,
            colors[barIndex % colors.length]
        )
        barIndex++
    }

    ctx.restore()

    barIndex = 0
    let legend = document.querySelector("legend[for='bar']")
    let ul = document.createElement("ul")
    legend.append(ul)
    for (month in barData) {
        let li = document.createElement("li")
        li.style.borderLeft = "20px solid " + colors[barIndex % colors.length]
        li.textContent = ` ${month}: ${barData[month]} sales`
        ul.append(li)
        barIndex++
    }
}
