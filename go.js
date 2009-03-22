function draw() {
    gocanvas = document.getElementById("gocanvas");
    canv = gocanvas.getContext("2d");
    // 9x9, 13,13, and 19x19 are the good sizes!
    //drawBoard(9);
    drawBoard(13);
    //drawBoard(19);
}

function drawBoard(lines) {
    var cellSize = 35;
    // apparently this doesn't work!
    //gocanvas.width = ((cellSize*lines)+(cellsize*2));
    //gocanvas.height = ((cellSize*lines)+(cellsize*2));
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