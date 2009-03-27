// 9x9, 13,13, and 19x19 are the good sizes!
gameSize = 19;

// Initialize a size by size board with all zeroes, meaning empty.
function initBoard(size) {
 board = new Array(size);
 for (var i = 0; i < board.length; i++) {
  board[i] = new Array(size);
  for (var j = 0; j < board[i].length; j++) {
    board[i][j] = "cap";
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
    return false;
  }
  board[x][y] = color;
  return true;
}

function draw() {
  canv = $("#gocanvas")[0];
  context = canv.getContext("2d");
  cellSize = 35;
  stoneSize = (cellSize-2)/2;
  borderSize = cellSize;

  window.addEventListener("mousedown", on_mousedown, false);
  window.addEventListener("mouseup", on_mouseup, false);


 clearBoard();
}
