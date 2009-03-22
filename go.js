function start() {
    gocanvas = $("gocanvas");
    canv = gocanvas.getContext("2d");
    cellSize = 35;
    stoneSize = (cellSize-2)/2;

    window.addEventListener("mousedown", on_mousedown, false);
    window.addEventListener("mouseup", on_mouseup, false);

    // 9x9, 13,13, and 19x19 are the good sizes!
    //drawBoard(9);
    drawBoard(13);
    //drawBoard(19);
}

function getRelativePosition(e) {
	return {x: e.clientX - $("gocanvas").offsetLeft, y: e.clientY - $("gocanvas").offsetTop};
}

function on_mousedown(e) {
    var pos = getRelativePosition(e);
}

function on_mouseup(e) {
    var pos = getRelativePosition(e);
    placeStoneByPosition(pos.x, pos.y);
}

function placeStoneByPosition(x, y) {
    var xthing = (x % cellSize) < (cellSize/2) ? x - (x%cellSize) : x + (cellSize-x%cellSize);
    var ything = (y % cellSize) < (cellSize/2) ? y - (y%cellSize) : y + (cellSize-y%cellSize);
    drawCircle(xthing,ything,stoneSize,true);
}

function placeStone(x,y) {
    var xVal = cellSize + x*cellSize;
    var yVal = cellSize + y*cellSize;
    placeStoneByPosition(xVal,yVal);
}

function drawBoard(lines) {
    drawGrid(cellSize, cellSize, lines-1);
    drawBoardDots(cellSize, lines-1);
}

function drawBoardDots(cell, boxes) {
    if (boxes < 18) {
        for (var i = (boxes/4); i < boxes; i+=(boxes/4)) {
            for (var j = (boxes/4); j < boxes; j+=(boxes/4)) {
                drawCircle(cell*i+cell, cell*j+cell, 3, true);
            }
        }
    }
}

function drawGrid(width, height, boxes) {
    for (var i = 1; i <= boxes; i++)
        for (var j = 1; j <= boxes; j++)
            canv.strokeRect(i*width, j*height, width, height);
}

function drawCircle(x, y, radius, fill) {
    canv.beginPath();
    var start = 0;
    var end = radians(180);

    // Just flip start and end to draw a circle. Hax.
    canv.arc(x, y, radius, start, end, true);
    canv.stroke();
    canv.arc(x, y, radius, end, start, true);
    canv.stroke();
    canv.fillStyle = fill ? "black" : "white";
    canv.fill();
}

// Arc drawing requires radians!
function radians(deg) {return (Math.PI/180)*deg;};


