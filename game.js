'use strict'

var gLevel = {
    SIZE: 4,
    MINES: 2
};
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    lives: 3
}
var gBoard
var gIsTimerOn = true
var gInterval

// choose the level of play:
function chooseLevel(elBtn) {
    var currLevel = elBtn.innerHTML
    // console.log(currLevel);

    if (currLevel === 'Eazy😄 4X4 (2💣)') {
        gLevel.SIZE = 4
        gLevel.MINES = 2
        onInit()

    }
    else if (currLevel === 'Medium😅 8X8(14💣)') {
        gLevel.SIZE = 8
        gLevel.MINES = 14
        onInit()

    }
    else if (currLevel === 'Expert🤓 12X12(32💣)') {
        gLevel.SIZE = 12
        gLevel.MINES = 32
        onInit()

    }
    else if (currLevel === 'Reset') {
        onInit()

    }


    // var elCurrDiff = document.querySelector()
}

// updating each cell how many mines around it
function boardMinesAroundUpdate() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            gBoard[i][j].minesAroundCount = gBoard[i][j].isMine ? '💣' : '' + setMinesNegsCount(i, j, gBoard)
        }
    }
}

// counts how many mines are neighbors of specific cell:
function setMinesNegsCount(cellI, cellJ) {
    var neighborsCount = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= gBoard[i].length) continue
            if ((cellI === i) && (cellJ === j)) continue
            if (gBoard[i][j].isMine) neighborsCount++
        }

    }
    return neighborsCount
}

// puts random mines on the board when called:
function setRandomMines(minesAmount, posI, posJ) {
    while (minesAmount > 0) {
        // console.log(gBoard.length)
        var i = getRandomIntInt(0, gBoard.length - 1)
        var j = getRandomIntInt(0, gBoard.length - 1)
        if ((i === posI) && (j === posJ)) continue
        minesAmount--
        gBoard[i][j].isMine = true
    }
}

// gets the game done and give the user a massage (win or lose):
function gameOver() {
    clearInterval(gInterval)
    var msg = (checkWin()) ? 'congrats!' : 'GameOver'
    showAllCells()
    if (gGame.isOn) document.querySelector('.msg').innerHTML = `${msg}`
    gGame.isOn = false
}

// checks if the player won
function checkWin() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (gBoard[i][j].isMine && ((!gBoard[i][j].isMarked) && (!gBoard[i][j].isShown))) return false
            else if ((!gBoard[i][j].isMine) && (gBoard[i][j].isMarked))return false
        }
    }
    return true
}

// describes what happening when a cell is clicked by the user:
function onCellClicked(cellI, cellJ, event) {
    gGame.shownCount++

    if (gGame.shownCount === 1) {
        //first click starts sets the game!
        gInterval = setInterval(timer, 1000)
        gGame.isOn = true
        setRandomMines(gLevel.MINES, cellI, cellJ, gBoard)
        boardMinesAroundUpdate(gBoard)
        console.log(gBoard)
    }
    // game cond. - when a cell is clicked:
    if (!event.button) {
        gBoard[cellI][cellJ].isShown = true
        if (gBoard[cellI][cellJ].isMine) {
            gGame.lives--
            if (!gGame.lives) gameOver()

        } else if (gBoard[cellI][cellJ].minesAroundCount === '0') noNeighborShow(cellI, cellJ)

    } else if (event.button === 2) {
        gBoard[cellI][cellJ].isMarked = !gBoard[cellI][cellJ].isMarked
        gGame.markedCount = (gBoard[cellI][cellJ].isMarked) ? gGame.markedCount - 1 : gGame.markedCount + 1
    }
    if (checkWin()) gameOver()
    // updating the board:
    renderBoard(gBoard)
}
