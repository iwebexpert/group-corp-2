function appendPie(pie, sales, colors, prev, next) {
    let currentLeft = 0
    let currentRight = 1

    const ctx = pie.getContext('2d')

    drawPie(currentLeft, currentRight)

    prev.onclick = function () {
        if (currentLeft <= 0) {
            return
        }
        currentLeft--
        currentRight--
        drawPie(currentLeft, currentRight)
    }

    next.onclick = function () {
        if (currentRight >= sales.length) {
            return
        }
        currentLeft++
        currentRight++
        drawPie(currentLeft, currentRight)

    }

    function drawPie(first, second) {
        tmp1 = 2 * Math.PI * sales[first].sales / (sales[first].sales + sales[second].sales)
        tmp2 = 2 * Math.PI * sales[second].sales / (sales[first].sales + sales[second].sales)

        ctx.clearRect(0, 0, 500, 500)

        ctx.fillStyle = colors[3]
        ctx.beginPath()
        ctx.moveTo(250, 250)
        ctx.arc(250, 250, 250, 0, tmp1)
        ctx.closePath()
        ctx.fill()

        ctx.fillStyle = colors[6]
        ctx.beginPath()
        ctx.moveTo(250, 250)
        ctx.arc(250, 250, 250, tmp1, tmp1 + tmp2)
        ctx.closePath()
        ctx.fill()

        refreshLegends()
    }

    function refreshLegends() {

        let legend = document.querySelector("legend[for='pie']")
        let ulFind = document.querySelector(".pieUl")
        let ul = document.createElement("ul")
        ul.className = 'pieUl'

        ulFind && ulFind.remove()

        legend.append(ul)
        let li1 = document.createElement("li")
        li1.style.borderLeft = "20px solid " + colors[3]
        li1.textContent = ` ${sales[currentLeft].month}: ${sales[currentLeft].sales} sales`
        ul.append(li1)

        let li2 = document.createElement("li")
        li2.style.borderLeft = "20px solid " + colors[6]
        li2.textContent = ` ${sales[currentRight].month}: ${sales[currentRight].sales} sales`
        ul.append(li2)
    }

}
