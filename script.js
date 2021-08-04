class Board {
  array = ["", "", "", "", "", "", "", "", ""];
  
  getBoard () {
    return this.array;
  }

  resetBoard () {
    this.array = ["", "", "", "", "", "", "", "", ""];
  }

  playerTurn (index, value) {
    this.array[index] = value;
  }

  winCheck (index0, index1, index2, turnSymbol) {
    if (this.array[index0] === turnSymbol & this.array[index1] === turnSymbol & this.array[index2] === turnSymbol) return true;
    else return false;
  }

  gameOver (turnSymbol) {
    if (this.winCheck(0,1,2,turnSymbol)) return true;
    if (this.winCheck(3,4,5,turnSymbol)) return true;
    if (this.winCheck(6,7,8,turnSymbol)) return true;
    if (this.winCheck(0,3,6,turnSymbol)) return true;
    if (this.winCheck(1,4,7,turnSymbol)) return true;
    if (this.winCheck(2,5,8,turnSymbol)) return true;
    if (this.winCheck(0,4,8,turnSymbol)) return true;
    if (this.winCheck(2,4,6,turnSymbol)) return true;
    else return false;
  }
}

// Game Controller Class
class Game {
  player1Turn = true;
  turnSymbol;

  startGame () {
    let player1Text = document.getElementById("player1-text").value;
    let player2Text = document.getElementById("player2-text").value;
    
    if (!player1Text) player1Text = "Player 1";
    if (!player2Text) player2Text = "Player 2";
    
    let player1 = new Player(player1Text);
    let player2 = new Player(player2Text);
    
    displayController.displayPlayerNames(player1.name, player2.name);
    displayController.showGameboard();
  }

  playerTurn = (element) => {
    this.turnSymbol = this.player1Turn ? "X" : "O";

    gameBoard.playerTurn(element.value, this.turnSymbol);
    displayController.displayTurn(element);

    if(gameBoard.gameOver(this.turnSymbol)) displayController.gameOver(this.player1Turn);
    
    this.player1Turn = !this.player1Turn;
  }
}

// Display Controller Class
class Display {
  displayTurn (element) {
    let array = gameBoard.getBoard();
    document.getElementById(element.id).innerText = array[element.value];
    document.getElementById(element.id).disabled = true;
  }

  showGameboard () {
    document.getElementById("startmenu-container").style.display = "none";
    document.getElementById("gameboard-container").style.display = "block";
  }

  resetGameBoard () {
    Array.from(document.getElementsByClassName("grid-item")).forEach(element => {
      document.getElementById(element.id).innerText = "";
      document.getElementById(element.id).disabled = false;
    });
    document.getElementById("winner").textContent = "";
  }

  displayPlayerNames (player1Name, player2Name) {
    document.getElementById("player1-name").textContent = player1Name;
    document.getElementById("player2-name").textContent = player2Name;
  }

  gameOver (player1Turn) {
    let playerName = "";
    
    Array.from(document.getElementsByClassName("grid-item")).forEach(element => {
      document.getElementById(element.id).disabled = true;
    });
    
    if (player1Turn) playerName = document.getElementById("player1-name").textContent;
    else playerName = document.getElementById("player2-name").textContent;
    document.getElementById("winner").textContent = playerName + " Wins!";
  }
}

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

let gameBoard = new Board();
let displayController = new Display();
let gameController = new Game();


document.getElementById("start-button").addEventListener("click", gameController.startGame);

document.getElementById("reset-button").addEventListener("click", () => {
  gameBoard.resetBoard();
  displayController.resetGameBoard();
});

const array = Array.from(document.getElementsByClassName("grid-item"));
array.forEach(element => element.addEventListener("click", () => gameController.playerTurn(element)));