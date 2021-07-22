//  Module for gameboard
const gameBoard = (() => {
  let array = ["", "", "", "", "", "", "", "", ""];
  
  const getGameBoard = () => array;

  // added const, might break things
  const setGameBoard = (index, xo) => {
    array[index] = xo;
  };

  return {getGameBoard, setGameBoard};
})();


//  Module for game controller
const gameController = (() => {
  // Grid cell buttons
  const array = Array.from(document.getElementsByClassName("grid-item"));
  
  // instructions for each state
  const startMenuState = () => document.getElementById("start-button").addEventListener("click", startGame);
  const player1State = () => array.forEach(element => element.addEventListener("click", player1Turn));
  
  // functions used by each state
  // remember to remove added listeners to avoid trash build up
  const startGame = () => {
    displayController.hideStartMenu();
    displayController.showGameboard();
    player1State();
  };
  
  function player1Turn () {
    gameBoard.setGameBoard(this.value, "X");
    displayController.displayTurn(this.id, this.value);
    // check for reset and game over
    // go to player 2 turn
  };

  startMenuState(); // maybe take startmenu out of function since it's just one line
})();


//  Module for display controller
const displayController = (() => {
  let array = gameBoard.getGameBoard();

  const displayTurn = (id, index) => {
    document.getElementById(id).innerText = array[index];
  };

  const hideStartMenu = () => {
    document.getElementById("startmenu-container").style.display = "none";
  };

  const showGameboard = () => {
    document.getElementById("gameboard-container").style.display = "block";
  };

  return {displayTurn, hideStartMenu, showGameboard};
})();


//  Factory for players
const Player = (name) => {
  const getName = () => name;
  return {getName};
};

/*
// maybe move this stuff to gameController/displayController
function resetGame() {
  document.getElementById("startmenu-container").style.display = "flex";
  document.getElementById("gameboard-container").style.display = "none";
}

function startGame() {
  document.getElementById("startmenu-container").style.display = "none";
  document.getElementById("gameboard-container").style.display = "block";
}

document.getElementById("start-button").addEventListener("click", startGame);
document.getElementById("reset-button").addEventListener("click", resetGame);
*/