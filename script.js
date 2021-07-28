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

  const gameOver = (turnSymbol) => {
    if (winCheck(0,1,2,turnSymbol)) return true;
    if (winCheck(3,4,5,turnSymbol)) return true;
    if (winCheck(6,7,8,turnSymbol)) return true;
    if (winCheck(0,3,6,turnSymbol)) return true;
    if (winCheck(1,4,7,turnSymbol)) return true;
    if (winCheck(2,5,8,turnSymbol)) return true;
    if (winCheck(0,4,8,turnSymbol)) return true;
    if (winCheck(2,4,6,turnSymbol)) return true;
    else return false;
  }

  function winCheck(index0, index1, index2, turnSymbol) {
    if (array[index0] === turnSymbol & array[index1] === turnSymbol & array[index2] === turnSymbol) return true;
    else return false;
  }

  return {get, set, reset, gameOver};
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
    if(gameBoard.gameOver(turnSymbol)) displayController.gameOver(player1Turn);
    player1Turn = !player1Turn;
  }));

  // Instructions for each state
  const startMenuState = () => document.getElementById("start-button").addEventListener("click", () => {
    let player1 = Player(document.getElementById("player1-text").value, 1);
    displayController.displayPlayerName(player1.getName(), player1.getNum());

    let player2 = Player(document.getElementById("player2-text").value, 2);
    displayController.displayPlayerName(player2.getName(), player2.getNum());

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
    document.getElementById("winner").textContent = "";
  };

  const displayPlayerName = (playerName, playerNum) => {
    if (playerNum === 1) document.getElementById("player1-name").textContent = playerName;
    if (playerNum === 2) document.getElementById("player2-name").textContent = playerName;
  };

  const gameOver = (player1Turn) => {
    let playerName = "";

    Array.from(document.getElementsByClassName("grid-item")).forEach(element => {
      document.getElementById(element.id).disabled = true;
    });
    
    if (player1Turn) playerName = document.getElementById("player1-name").textContent;
    else playerName = document.getElementById("player2-name").textContent;
    document.getElementById("winner").textContent = playerName + " Wins!";
  };

  return {displayTurn, hideStartMenu, showGameboard, resetGameBoard, displayPlayerName, gameOver};
})();


//  Factory for players
const Player = (name, playerNum) => {
  if (!name) name = "Player " + playerNum;
  
  const getName = () => name;
  const getNum = () => playerNum;
  return {getName, getNum};
};