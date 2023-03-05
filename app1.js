var board = [];
var mines = 40;
var mineLocations = [];
var checkedLocations = [];
var gameInProgress = false;
var startTime;
var timer;
var elapsedTime = 0;

function createBoard() {
  var gameBoard = document.getElementById("game-board");
  for (var i = 0; i < 256; i++) {
    var cell = document.createElement("div");
    cell.className = "cell";
    cell.id = i;
    cell.addEventListener("mousedown", handleCellClick);
    cell.addEventListener("contextmenu", handleRightClick);
    gameBoard.appendChild(cell);
    board.push({
      id: i,
      mine: false,
      adjacentMines: 0,
      checked: false,
      flagged: false
    });
  }
}

function placeMines() {
  var i = 0;
  while (i < mines) {
    var random = Math.floor(Math.random() * 256);
    if (!board[random].mine && board[random].checked == false) {
      board[random].mine = true;
      mineLocations.push(random);
      i++;
    }
  }
}

function calculateAdjacentMines() {
  for (var i = 0; i < board.length; i++) {
    var adjacentMines = 0;
    if (i % 16 != 0) {
      if (board[i - 17] && board[i - 17].mine) adjacentMines++;
      if (board[i - 1] && board[i - 1].mine) adjacentMines++;
      if (board[i + 15] && board[i + 15].mine) adjacentMines++;
    }
    if (board[i - 16] && board[i - 16].mine) adjacentMines++;
    if (board[i + 16] && board[i + 16].mine) adjacentMines++;
    if (i % 16 != 15) {
      if (board[i - 15] && board[i - 15].mine) adjacentMines++;
      if (board[i + 1] && board[i + 1].mine) adjacentMines++;
      if (board[i + 17] && board[i + 17].mine) adjacentMines++;
    }
    board[i].adjacentMines = adjacentMines;
  }
}
