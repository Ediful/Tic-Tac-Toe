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
  let player1Turn; // boolean to hold turn status
  let turnSymbol; // string to hold "X" or "O"

  // Grid cell buttons
  const array = Array.from(document.getElementsByClassName("grid-item"));
  array.forEach(element => element.addEventListener("click", () => {
    turnSymbol = player1Turn ? "X" : "O";
    gameBoard.set(element.value, turnSymbol);
    displayController.displayTurn(element);
    if(gameBoard.gameOver(turnSymbol)) displayController.gameOver(player1Turn);
    player1Turn = !player1Turn;
  }));
  
  // Restart Button
  document.getElementById("reset-button").addEventListener("click", () => {
    gameBoard.reset();
    displayController.resetGameBoard();
  });

  // Instructions for each state
  const startMenuState = () => document.getElementById("start-button").addEventListener("click", () => {
    let player1Text = document.getElementById("player1-text").value;
    let player2Text = document.getElementById("player2-text").value;

    if (!player1Text) player1Text = "Player 1";
    if (!player2Text) player2Text = "Player 2";

    let player1 = new Player(player1Text);
    let player2 = new Player(player2Text);

    displayController.displayPlayerNames(player1.name, player2.name);
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
  
  const showGameboard = () => {
    document.getElementById("startmenu-container").style.display = "none";
    document.getElementById("gameboard-container").style.display = "block";
  };

  const resetGameBoard = () => {
    Array.from(document.getElementsByClassName("grid-item")).forEach(element => {
      document.getElementById(element.id).innerText = "";
      document.getElementById(element.id).disabled = false;
    });
    document.getElementById("winner").textContent = "";
  };

  const displayPlayerNames = (player1Name, player2Name) => {
    document.getElementById("player1-name").textContent = player1Name;
    document.getElementById("player2-name").textContent = player2Name;
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

  return {displayTurn, showGameboard, resetGameBoard, displayPlayerNames, gameOver};
})();


// Player Class
class Player {
  constructor(name) {
    this.name = name;
  }

  get name() {
    return this._name; 
  }

  set name(value) {
    this._name = value;
  }
}