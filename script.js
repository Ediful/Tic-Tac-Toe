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
  // Game states
  let startmenu = true;
  let player1 = false;
  let player2 = false;
  let gameOver = false;

  // Grid cell buttons
  const array = Array.from(document.querySelectorAll(".grid-item"));
  
  // instructions for each state
  const startMenuState = () => {
    document.getElementById("start-button").addEventListener("click", startGame)
  };

  const player1State = () => {
    console.log("hello");
    array.forEach(element => element.addEventListener("click", player1Turn));
  };
  
  // functions used by each state
  // remember to remove added listeners to avoid trash build up
  const startGame = () => {
    displayController.hideStartMenu();
    displayController.showGameboard();
    startmenu = false;
    player1 = true;
  };
  
  const player1Turn = () => {
    console.log("hello");
    gameBoard.setGameBoard(this, "X"); // set gameboard element to "X"
    //displayController.displayTurn(this); // display player 1 selection
    // player1 = false;
    // player2 = true;
  }

  // Flow of game states
  if (startmenu) startMenuState();
  if (player1) player1State();
})();


//  Module for display controller
const displayController = (() => {
  let array = gameBoard.getGameBoard();

  const displayTurn = (id, index) => {
    document.getElementById(id).value = array[index];
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