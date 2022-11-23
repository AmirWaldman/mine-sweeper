'use strict'

// 1. Populate a board with mines
//     2. leftClick on cells
//         reveal cells
//     3. RightClick on cells
//         mark cells
//         4.  win/lose check */
// {

// gLevel = {
//     SIZE: 4,
//     MINES: 2
// };

var gBoard
var gGame
function onInit() {
    gGame = {
        isOn: false,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    }
    gBoard = createBoard(5)
    // 
    console.log (gBoard)
    renderBoard(gBoard)
}

function createBoard(length) {
    var board = []

    for (var i = 0; i < length; i++) {
        board.push([])

        for (var j = 0; j < length; j++) {
            board[i][j] = {
                minesAroundCount: 3,
                isShown: false,
                isMine: false,
                isMarked: false
            }
        }
    }
    return board
}


function renderBoard(mat) {

    var strHTML = '<table border="1"><tbody>'
    for (var i = 0; i < mat.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {
            const cell = mat[i][j]
            // cell = 
            // console.log(cell)
            const className = `cell cell-${i}-${j} `

            strHTML += `<td class="${className} `
            if (cell.isShown) strHTML += `shown `
            if (cell.isMarked) strHTML += `marked`
            var minesAroundCount = ((cell.minesAroundCount>0)&&(cell.isShown)) ? cell.minesAroundCount : ''
            strHTML += `" onclick="onCellClicked(${i},${j})"> ${minesAroundCount}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector('.board-container')
    elContainer.innerHTML = strHTML
}

function boardMinesAroundUpdate(mat) {
    for (var i = 0; i < mat.length; i++) {
        for (var j = 0; j < mat.length; j++) {
            
            mat[i][j].minesAroundCount = setMinesNegsCount(i,j,mat)
        }
    }
}

function setMinesNegsCount(cellI, cellJ,mat) {
    var neighborsCount = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= mat[i].length) continue
            if ((cellI === i) && (cellJ === j)) continue
            if (mat[i][j].isMine) neighborsCount++
        }

    }
    return neighborsCount
}

function onCellClicked(cellI, cellJ) {
    gGame.shownCount++
    if (gGame.shownCount === 1){
        gGame.isOn=true
        setRandomMines(2,cellI,cellJ)
        boardMinesAroundUpdate(gBoard)
        console.log(gBoard)
    }
    gBoard[cellI][cellJ].isShown = true
    renderBoard(gBoard)
}

function setRandomMines(amount,posI,posJ){
    while (amount>0){
        console.log(gBoard.length)
        var i = getRandomIntInt(0,gBoard.length)
        var j = getRandomIntInt(0,gBoard.length)
        if ((i === posI) && (j === posJ)) continue
        amount--
        gBoard[i][j].isMine = !(gBoard[i][j].isMine)
    }

}


// Create setMinesNegsCount() and store the numbers
// (isShown is still true)
// 2. Present the board with the neighbor count and the mines
// using renderBoard() function.
// 3. Have a console.log presenting the board content – to help
// you with debugging

function getRandomIntInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
}
