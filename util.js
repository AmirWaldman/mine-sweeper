
// runs with index.html start
function onInit() {
    gGame.isOn = true
    gGame.lives = 3
    gBoard = createBoard(gLevel.SIZE)
    // console.log(gBoard)
    renderBoard(gBoard)
    gGame.shownCount = 0
    document.querySelector('.msg').innerHTML = `MiNe SwEePeR`
    resetTimer()
}


// creates the board when called:
function createBoard(length) {
    var board = []

    for (var i = 0; i < length; i++) {
        board.push([])

        for (var j = 0; j < length; j++) {
            board[i][j] = {
                minesAroundCount: '0',
                isShown: false,
                isMine: false,
                isMarked: false
            }
        }
    }
    return board
}

// rendering the board:
function renderBoard() {
    // creating the string that will go to the DOM to build the board
    var strHTML = '<table border="1"><tbody>'
    for (var i = 0; i < gBoard.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < gBoard[0].length; j++) {
            const cell = gBoard[i][j]
            // cell = 
            // console.log(cell)
            const className = `cell cell-${i}-${j} `
            var minesAroundCount = ''
            strHTML += `<td class="${className} `
            minesAroundCount = cell.minesAroundCount
            if (!cell.isShown) {
                minesAroundCount = ''
            } else strHTML += `shown `
            if (cell.minesAroundCount === '0') minesAroundCount = ''
            if (cell.isMarked && (gGame.isOn)) {
                strHTML += `marked`
                minesAroundCount = '🚩'
            }
            strHTML += `"onmousedown="onCellClicked(${i},${j},event)"> ${minesAroundCount}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector('.board-container')
    elContainer.innerHTML = strHTML
    // shutting down the default menu poping on rightclick:
    elContainer.addEventListener('contextmenu', (e) => {
        e.preventDefault()
    })
    // updating how many lives left:
    document.querySelector('.lives').innerText = `${gGame.lives}`

}

// gets a random num:
function getRandomIntInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// timer for the game:
function timer() {
    // var currTime = gTime
    // <div>timer: <span class="min">00</span>:<span class="sec">00</span></div>
    var elMin = document.querySelector('.min')
    var elSec = document.querySelector('.sec')
    var currSec = elSec.innerHTML
    var currMin = elMin.innerHTML
    currSec++
    if (currSec > 59) {
        currMin++
        currSec = 0
    }
    elSec.innerHTML = (currSec < 10) ? '0' + currSec : currSec
    elMin.innerHTML = (currMin < 10 && (!currSec)) ? '0' + currMin : currMin

    var currMin = elMin.innerHTML
    var currSec = elSec.innerHTML
}
// resets the timer:
function resetTimer() {
    var elMin = document.querySelector('.min')
    var elSec = document.querySelector('.sec')
    elMin.innerText = '00'
    elSec.innerText = '00'
}

// reavels all cells in the game:
function showAllCells() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            gBoard[i][j].isShown = true
        }
    }
}



// Cell without neighbors – expand it and its 1st degree neighbors
function noNeighborShow(cellI, cellJ) {

    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= gBoard[i].length) continue
            if ((cellI === i) && (cellJ === j)) continue
            if (gBoard[i, j].minesAroundCount === '0') noNeighborShow(i, j)
            gBoard[i][j].isShown = true
        }

    }
    renderBoard()
}