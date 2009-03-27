function on_mousedown(e) {
  var pos = getCanvasPosition(e);
  downGridPos = getGridPosition(pos.x,pos.y);
}

function on_mouseup(e) {
  var pos = getCanvasPosition(e);
  var upGridPos = getGridPosition(pos.x, pos.y);
  if ((downGridPos.x == upGridPos.x) && (downGridPos.y == upGridPos.y)) {
    placeStoneByPosition(upGridPos.x, upGridPos.y, getColorToPlace());
  }
}

function getColorToPlace(){
  return $("input[name='status']:checked").val();
}

function updateColorToPlace() {
  if(getColorToPlace()=="black"){
    $("input[value='white']").attr({checked:"true"});
  }else if(getColorToPlace() == "white"){
    $("input[value='black']").attr({checked:"true"});
  }

}

function getCanvasPosition(e) {
  return {x: e.clientX - canv.offsetLeft, y: e.clientY - canv.offsetTop};
}

function getGridPosition(aX, aY) {
  var xthing = ((aX % cellSize) < (cellSize/2)) ? (aX - (aX % cellSize)) : (aX + (cellSize - aX % cellSize));
  var ything = ((aY % cellSize) < (cellSize/2)) ? (aY - (aY % cellSize)) : (aY + (cellSize - aY % cellSize));
  return {x:(xthing-borderSize)/cellSize, y:(ything-borderSize)/cellSize};
}

// Place a stone by canvas coordinate position e.g. 140,280
function placeStoneByPosition(x, y, color) {
  if(setPositionState(x, y, color)) {
    updateColorToPlace();
    refresh();
  }
}

// Place a stone by a game board position e.g. 1,2
function drawStone(x, y, color) {
  if(color == "black" || color == "white")
    drawCircle(x*cellSize, y*cellSize, stoneSize, color);
}

function drawBoard(lines) {
  drawGrid(cellSize, cellSize, lines-1);
  drawBoardDots(cellSize, lines-1);
}

function drawBoardDots(cell, boxes) {
  if (gameSize == 9) {
    var v1 = 2 * cellSize;
    var v2 = (gameSize - 3) * cellSize;
    drawCircle(v1, v1, 3, "black");
    drawCircle(v1, v2, 3, "black");
    drawCircle(v2, v1, 3, "black");
    drawCircle(v2, v2, 3, "black");
  } else {
    var v1 = 3 * cellSize;
    var v2 = (gameSize - 1) / 2 * cellSize;
    var v3 = (gameSize - 4) * cellSize;
    drawCircle(v1, v1, 3, "black");
    drawCircle(v2, v1, 3, "black");
    drawCircle(v3, v1, 3, "black");

    drawCircle(v1, v2, 3, "black");
    drawCircle(v2, v2, 3, "black");
    drawCircle(v3, v2, 3, "black");

    drawCircle(v1, v3, 3, "black");
    drawCircle(v2, v3, 3, "black");
    drawCircle(v3, v3, 3, "black");
  }
}

function drawGrid(width, height, boxes) {
    for (var i = 0; i < boxes; i++)
        for (var j = 0; j < boxes; j++)
            context.strokeRect(i*width+borderSize, j*height+borderSize, width, height);
}

function drawCircle(x, y, radius, fill) {
  // Account for the boarder before drawing
  x += borderSize;
  y += borderSize;

  context.beginPath();
  var start = 0;
  var end = radians(180);

  // Just flip start and end to draw a circle. Hax.
  context.arc(x, y, radius, start, end, true);
  context.stroke();
  context.arc(x, y, radius, end, start, true);
  context.stroke();
  context.fillStyle = fill;
  context.fill();
}

function clearBoardUI() {
  context.clearRect(0,0,800,800);
}

// Arc drawing requires radians!
function radians(deg) {return (Math.PI/180)*deg;};

function refresh(){
  clearBoardUI();
  drawBoard(gameSize);
  drawStones();
}

function drawStones() {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      drawStone(i, j, board[i][j]);
    }
  }
}
