let gameSeq = []
let userSeq = []

let started = false
let level = 0

const btnsColor = ['red', 'yellow', 'green', 'purple']
const h2 = document.querySelector("h2")
const allBtn = document.querySelectorAll('.btn')

document.addEventListener("keypress", function () {
    if (!started) {
        started = true
        h2.innerText = "Game Started!"
        levelUp()
    }
})

function btnFlash(btn) {
    btn.classList.add("flash")
    setTimeout(() => {
        btn.classList.remove("flash")
    }, 250)
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000)
        }
    } else {
        h2.innerHTML = `Game Over! score was<b> ${level}</b> <br> Press any key to restart.`
        document.body.classList.add("game-over")
        setTimeout(() => {
            document.body.classList.remove("game-over")
        }, 200)
        reset()
    }
}

function levelUp() {
    userSeq = []
    level++
    h2.innerText = `Level ${level}`

    const randIdx = Math.floor(Math.random() * btnsColor.length)
    const randColor = btnsColor[randIdx]
    const randBtn = document.querySelector(`.${randColor}`)
    gameSeq.push(randColor)

    btnFlash(randBtn)
    console.log("Game sequence:", gameSeq)
}

function btnPress() {
    const btn = this
    btnFlash(btn)
    const userColor = btn.getAttribute("id")
    userSeq.push(userColor)
    checkAns(userSeq.length - 1)
}

// Attach event listeners to all buttons
for (let btn of allBtn) {
    btn.addEventListener("click", btnPress)
}

function reset() {
    gameSeq = []
    userSeq = []
    started = false
    level = 0
}
