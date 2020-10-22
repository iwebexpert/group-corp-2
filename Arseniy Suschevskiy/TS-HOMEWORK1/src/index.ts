import './styles.css'
const $start: HTMLButtonElement | null = document.querySelector('#start'),
    $game: HTMLDivElement | null = document.querySelector('#game'),
    $time: HTMLSpanElement | null = document.querySelector('#time'),
    $timeHeader: HTMLHeadingElement | null = document.querySelector('#time-header'),
    $resultHeader: HTMLHeadingElement | null = document.querySelector('#result-header'),
    $result: HTMLSpanElement | null = document.querySelector('#result'),
    $gameTime: HTMLInputElement | null = document.querySelector('#game-time')

let score: number = 0
let isGameStarted: boolean = false

if ($start && $game && $gameTime) {
    $start.addEventListener('click', startGame)
    $game.addEventListener('click', handleBoxClick)
    $gameTime.addEventListener('input', setGameTime)
}

function show($el: HTMLElement) {
    $el.classList.remove('hide')
}

function hide($el: HTMLElement) {
    $el.classList.add('hide')
}

function startGame(): void {
    if ($gameTime && $start && $game) {
        $gameTime.setAttribute('disabled','true' )
        score = 0
        setGameTime()
        isGameStarted = true
        hide($start)
        $game.style.backgroundColor = 'white'
        renderBox()

        const interval = setInterval(function() {
            if ($time) {
                const timeContent: any = $time.textContent
                const time: number = parseFloat(timeContent)
                if (time <= 0){
                    clearInterval(interval)
                    endGame()
                } else {
                    $time.textContent = (time - 0.1).toFixed(1)
                }
            }
        }, 100)
    }
}
function setGameScore(): void {
    if ($result) {
        $result.textContent = score.toString()
    }
}
function setGameTime(): void {
    if ($gameTime && $timeHeader && $resultHeader && $time) {
        const time = +$gameTime.value
        $time.textContent = time.toFixed(1)
        show($timeHeader)
        hide($resultHeader)
    }
}

function endGame(): void {
    if ($gameTime && $start && $game && $timeHeader && $resultHeader) {
        isGameStarted = false
        setGameScore()
        $gameTime.removeAttribute('disabled' )
        show($start)
        $game.innerHTML = ''
        $game.style.backgroundColor = '#ccc'
        hide($timeHeader)
        show($resultHeader)
    }
}

function handleBoxClick(event: MouseEvent): void {
    if (!isGameStarted) {
        return
    }
    if ((<HTMLDivElement>event.target).dataset.box){
        score++
        renderBox()
    }
}

function renderBox(): void {
    if ($game) {
        $game.innerHTML = ''
        const box: HTMLDivElement = document.createElement('div')
        const boxSize: number = getRandom(30,100)
        const gameSize: DOMRect = $game.getBoundingClientRect()
        const maxTop: number = gameSize.height - boxSize
        const maxLeft: number = gameSize.width - boxSize

        box.style.height = box.style.width = boxSize + 'px'
        box.style.position = 'absolute'
        box.style.backgroundColor = '#' + getRandom(100,999)
        box.style.borderRadius = '50%'
        box.style.top = getRandom(0, maxTop) + 'px'
        box.style.left = getRandom(0, maxLeft) + 'px'
        box.style.cursor = 'pointer'
        box.setAttribute('data-box', 'true')

        $game.insertAdjacentElement('afterbegin', box)
    }
}

function getRandom(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min)
}
