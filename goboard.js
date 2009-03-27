// 9x9, 13,13, and 19x19 are the good sizes!
gameSize = 19;

// Initialize a size by size board with all zeroes, meaning empty.
function initBoard(size) {
 board = new Array(size);
 for (var i = 0; i < board.length; i++) {
  board[i] = new Array(size);
  for (var j = 0; j < board[i].length; j++) {
    board[i][j] = 0;
  }
 }
}

// Set up the board with empty data and refresh the ui.
function clearBoard() {
 initBoard(gameSize);
 refresh();
}

function setPositionState(x, y, color) {
  if (x < 0 || y < 0 || x >= gameSize || y >= gameSize) {
    return;
  } else if (color == true) {
    board[x][y] = 1;
  } else if (color == false) {
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
 borderSize = cellSize;

 window.addEventListener("mousedown", on_mousedown, false);
 window.addEventListener("mouseup", on_mouseup, false);

 clearBoard();
}
