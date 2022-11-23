/*  display/ui

1. Populate a board with mines
    2. leftClick on cells
        reveal cells
    3. RightClick on cells
        mark cells
        4.  win/lose check */
// {

// gLevel = {
//     SIZE: 4,
//     MINES: 2
// };

// gGame = {
//     isOn: false,
//     shownCount: 0,
//     markedCount: 0,
//     secsPassed: 0
// }
function onInit() {
    const gBoard = createBoard(2)
    gBoard[0][0].isMine = true
    gBoard[1][1].isMine = true
    boardMinsAroundUpdate(gBoard)
    console.log (gBoard)
    renderBoard(gBoard, '.board-container')
}

function createBoard(length) {
    var board = []

    for (var i = 0; i < length; i++) {
        board.push([])

        for (var j = 0; j < length; j++) {
            board[i][j] = {
                minesAroundCount: 4,
                isShown: true,
                isMine: false,
                isMarked: true
            }
        }
    }
    gBoardLength = i
    return board
}


function renderBoard(mat, selector) {

    var strHTML = '<table border="1"><tbody>'
    for (var i = 0; i < mat.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {
            const cell = mat[i][j]
            // cell = 
            // console.log(cell)
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className} `
            if (cell.isMine) strHTML += `mine `
            if (!cell.isShown) strHTML += `notShown `
            if (cell.isMarked) strHTML += `marked">`
            strHTML += `${cell.minesAroundCount}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}

function boardMinsAroundUpdate(mat) {
    for (var i = 0; i < mat.length; i++) {
        for (var j = 0; j < mat.length; j++) {
            
            mat[i][j].minesAroundCount = setMinesNegsCount(i,j,mat)
        }
    }
}

function setMinesNegsCount(cellI, cellJ,mat) {
    var neighborsCount = 0
    if (mat[cellI][cellJ].isMine) return null
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= mat[i].length) continue
            if (mat[i][j].isMine) neighborsCount++
        }

    }
    return neighborsCount
}
// Create setMinesNegsCount() and store the numbers
// (isShown is still true)
// 2. Present the board with the neighbor count and the mines
// using renderBoard() function.
// 3. Have a console.log presenting the board content – to help
// you with debugging