gameSize = 19;

function initBoard(size){
  board = new Array(size);
  for (var i = 0; i < board.length; i++) {
    board[i] = new Array(size);
    for (var j = 0; j < board[i].length; j++) {
      board[i][j] = 0;
    }
  }
}

function clearBoard(){
  initBoard(gameSize);
  refresh();
}

function setPositionState(x, y, color){
  if(color == true){
    board[x][y] = 1;
  } else if (color == false){
    board[x][y] = 2;
  } else {
    board[x][y] = 0;
  }
}

function draw() {
  canv = $("gocanvas").getContext("2d");
  cellSize = 35;
  stoneSize = (cellSize-2)/2;
  colorToPlace = true;
  boardSizeMin = cellSize;
  boardSizeMax = cellSize * gameSize + cellSize;

  window.addEventListener("mousedown", on_mousedown, false);
  window.addEventListener("mouseup", on_mouseup, false);

  // 9x9, 13,13, and 19x19 are the good sizes!
  clearBoard();
}
