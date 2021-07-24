//  Module for gameboard
const gameBoard = (() => {
  let array = ["", "", "", "", "", "", "", "", ""];
  
  const get = () => array;

  const set = (index, xo) => {
    array[index] = xo;
  };

  const reset = () => {
    array = ["", "", "", "", "", "", "", "", ""];
  };

  return {get, set, reset};
})();


//  Module for game controller
const gameController = (() => {
  // Player turns
  let player1Turn = false;
  let turnSymbol;

  // Restart Button
  document.getElementById("reset-button").addEventListener("click", () => {
    gameBoard.reset();
    displayController.resetGameBoard();
  });

  // Grid cell buttons
  const array = Array.from(document.getElementsByClassName("grid-item"));
  array.forEach(element => element.addEventListener("click", () => {
    turnSymbol = player1Turn ? "X" : "O";
    gameBoard.set(element.value, turnSymbol);
    displayController.displayTurn(element);
    player1Turn = !player1Turn;
  }));

  // Instructions for each state
  const startMenuState = () => document.getElementById("start-button").addEventListener("click", () => {
    displayController.hideStartMenu();
    displayController.showGameboard();
    player1Turn = true;
  });

  startMenuState();
})();


//  Module for display controller
const displayController = (() => {
  const displayTurn = (element) => {
    let array = gameBoard.get();
    document.getElementById(element.id).innerText = array[element.value];
    document.getElementById(element.id).disabled = true;
  };

  const hideStartMenu = () => {
    document.getElementById("startmenu-container").style.display = "none";
  };

  const showGameboard = () => {
    document.getElementById("gameboard-container").style.display = "block";
  };

  const resetGameBoard = () => {
    Array.from(document.getElementsByClassName("grid-item")).forEach(element => {
      document.getElementById(element.id).innerText = "";
      document.getElementById(element.id).disabled = false;
    });
  };

  return {displayTurn, hideStartMenu, showGameboard, resetGameBoard};
})();


//  Factory for players
const Player = (name) => {
  const getName = () => name;
  return {getName};
};