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
    if (array[0] === turnSymbol & array[1] === turnSymbol & array[2] === turnSymbol) {
      console.log("GAME OVER");
      return true;
    }
    if (array[3] === turnSymbol & array[4] === turnSymbol & array[5] === turnSymbol) {
      console.log("GAME OVER");
      return true;
    }
    if (array[6] === turnSymbol & array[7] === turnSymbol & array[8] === turnSymbol) {
      console.log("GAME OVER");
      return true;
    }
    if (array[0] === turnSymbol & array[3] === turnSymbol & array[6] === turnSymbol) {
      console.log("GAME OVER");
      return true;
    }
    if (array[1] === turnSymbol & array[4] === turnSymbol & array[7] === turnSymbol) {
      console.log("GAME OVER");
      return true;
    }
    if (array[2] === turnSymbol & array[5] === turnSymbol & array[8] === turnSymbol) {
      console.log("GAME OVER");
      return true;
    }
    if (array[0] === turnSymbol & array[4] === turnSymbol & array[8] === turnSymbol) {
      console.log("GAME OVER");
      return true;
    }
    if (array[2] === turnSymbol & array[4] === turnSymbol & array[6] === turnSymbol) {
      console.log("GAME OVER");
      return true;
    }
    else {
      return false;
    }
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
    if(gameBoard.gameOver(turnSymbol)) console.log("hehehe");
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
  };

  const displayPlayerName = (playerName, playerNum) => {
    if (playerNum === 1) document.getElementById("player1-name").textContent = playerName;
    if (playerNum === 2) document.getElementById("player2-name").textContent = playerName;
  }

  return {displayTurn, hideStartMenu, showGameboard, resetGameBoard, displayPlayerName};
})();


//  Factory for players
const Player = (name, playerNum) => {
  if (!name) name = "Player " + playerNum;
  
  const getName = () => name;
  const getNum = () => playerNum;
  return {getName, getNum};
};