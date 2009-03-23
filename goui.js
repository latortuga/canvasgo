function draw() {
    canv = $("gocanvas").getContext("2d")
    cellSize = 35
    stoneSize = (cellSize-2)/2
    colorToPlace = true
    gameSize = 17
    boardSizeMin = cellSize
    boardSizeMax = cellSize * gameSize + cellSize
    
    window.addEventListener("mousedown", on_mousedown, false)
    window.addEventListener("mouseup", on_mouseup, false)

    // 9x9, 13,13, and 19x19 are the good sizes!
    clearBoard()
    drawBoard(gameSize)
}

function on_mousedown(e) {
    var pos = getCanvasPosition(e)
    downGridPos = getGridPosition(pos.x,pos.y)
}

function on_mouseup(e) {
    var pos = getCanvasPosition(e)
    var upGridPos = getGridPosition(pos.x, pos.y)
    //alert(downGridPos.x+" "+upGridPos.x)
    if ((downGridPos.x == upGridPos.x) && (downGridPos.y == upGridPos.y)) {
        colorToPlace = !colorToPlace
        placeStoneByPosition(pos.x, pos.y, colorToPlace)
    }
}

function getCanvasPosition(e) {
    return {x: e.clientX - $("gocanvas").offsetLeft, y: e.clientY - $("gocanvas").offsetTop}
}

function getGridPosition(aX, aY) {
    var xthing = ((aX % cellSize) < (cellSize/2)) ? (aX - (aX % cellSize)) : (aX + (cellSize - aX % cellSize))
    var ything = ((aY % cellSize) < (cellSize/2)) ? (aY - (aY % cellSize)) : (aY + (cellSize - aY % cellSize))
    return {x:xthing, y:ything}
}

// Place a stone by canvas coordinate position e.g. 140,280
function placeStoneByPosition(x, y, color) {
    var gridPos = getGridPosition(x, y)
    drawCircle(gridPos.x, gridPos.y, stoneSize, color)
}

// Place a stone by a game board position e.g. 1,2
function placeStone(x, y, color) {
    var xVal = cellSize + x*cellSize
    var yVal = cellSize + y*cellSize
    placeStoneByPosition(xVal,yVal,color)
}

function drawBoard(lines) {
    drawGrid(cellSize, cellSize, lines-1)
    drawBoardDots(cellSize, lines-1)
}

function drawBoardDots(cell, boxes) {
    if (boxes < 18) {
        for (var i = (boxes/4); i < boxes; i+=(boxes/4)) {
            for (var j = (boxes/4); j < boxes; j+=(boxes/4)) {
                drawCircle(cell*i+cell, cell*j+cell, 3, true)
            }
        }
    }
}

function drawGrid(width, height, boxes) {
    for (var i = 1; i <= boxes; i++)
        for (var j = 1; j <= boxes; j++)
            canv.strokeRect(i*width, j*height, width, height)
}

function drawCircle(x, y, radius, fill) {
    canv.beginPath()
    var start = 0
    var end = radians(180)

    // Just flip start and end to draw a circle. Hax.
    canv.arc(x, y, radius, start, end, true)
    canv.stroke()
    canv.arc(x, y, radius, end, start, true)
    canv.stroke()
    canv.fillStyle = fill ? "black" : "white"
    canv.fill()
}

function clearBoard() {
    $("gocanvas").getContext("2d").clearRect(0,0,800,800)
}

// Arc drawing requires radians!
function radians(deg) {return (Math.PI/180)*deg;};


