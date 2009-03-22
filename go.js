function draw() {
    gocanvas = document.getElementById("gocanvas")
    canv = gocanvas.getContext("2d")

    // 9x9, 13,13, and 19x19 are the good sizes!
    //drawBoard(9)
    drawBoard(13)
    //drawBoard(19)
}

function drawBoard(lines) {
    var cellSize = 40
    // apparently this doesn't work!
    //gocanvas.width = ((cellSize*lines)+(cellsize*2))
    //gocanvas.height = ((cellSize*lines)+(cellsize*2))
    drawGrid(cellSize, cellSize, lines-1)

    for (var i = ((lines-1)/4); i < (lines-1); i+=((lines-1)/4))
        for (var j = ((lines-1)/4); j < lines-1; j+=((lines-1)/4))
            drawCircle(cellSize*i+cellSize, cellSize*j+cellSize, 5, true)
    
    //drawCircle(cellSize*3, cellSize*5, 5, true)
    //drawCircle(cellSize*3, cellSize*7, 5, true)
    //drawCircle(cellSize*5, cellSize*3, 5, true)
    //drawCircle(cellSize*5, cellSize*5, 5, true)
    //drawCircle(cellSize*5, cellSize*7, 5, true)
    //drawCircle(cellSize*7, cellSize*3, 5, true)
    //drawCircle(cellSize*7, cellSize*5, 5, true)
    //drawCircle(cellSize*7, cellSize*7, 5, true)
}

function drawGrid(width, height, boxes) {
    for (var i = 1; i <= boxes; i++)
        for (var j = 1; j <= boxes; j++)
            canv.strokeRect(i*width, j*height, width, height)
}

function drawCircle(x, y, radius, fill) {
    canv.beginPath()
    var start = 0
    var end = radians(270)

    canv.arc(x, y, radius, start, end, true)
    canv.stroke()
    canv.arc(x, y, radius, end, start, true)
    canv.stroke()
    canv.fillStyle = fill ? "black" : "white"
    canv.fill()
}

// Arc drawing requires radians!
function radians(deg) {return (Math.PI/180)*deg;};