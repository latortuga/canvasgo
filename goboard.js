// Initialize a size by size board with all zeroes, meaning empty.
function initBoard() {
    // If a gameState was loaded successfully, initilize board with that data. else, initilize an empty board
    if(gameState){
        board = gameState;
    }else{
        board = new Array(gameSize);
        for (var i = 0; i < board.length; i++) {
            board[i] = new Array(gameSize);
            for (var j = 0; j < board[i].length; j++) {
            board[i][j] = "cap";
            }
        }
    }
}

// Set up the board with empty data and refresh the ui.
function clearBoard() {
  initBoard();
  refresh();
}

function setPositionState(x, y, color) {
  if (x < 0 || y < 0 || x >= gameSize || y >= gameSize) {
    return false;
  }
  if(color != "cap" && board[x][y] != "cap") {
    return false;
  }
  board[x][y] = color;
  return true;
}

function draw() {
  canv = $("#gocanvas")[0];
  context = canv.getContext("2d");
  // If a gameState has been loaded, set the board size based on the board size of the saved gameState
  if(gameState){
      gameSize = gameState[0].length
  }else{
    gameSize = parseInt(gup("size")) || 19;
  }
  cellSize = gameSize > 13 ? 20 : gameSize > 9 ? 30 : 40;
  stoneSize = (cellSize-2)/2;
  borderSize = cellSize;

  window.addEventListener("mousedown", on_mousedown, false);
  window.addEventListener("mouseup", on_mouseup, false);

  clearBoard();
  // setup database only if it has NOT been initilized already
  if(!dataBase) setupDataBase();
}

function gup( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}