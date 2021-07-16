//  Module for gameboard
//  Handles the setting/getting of the board state
const gameBoard = (() => {
  //let array = ["X", "O", "X", "O", "X", "O", "X", "O", "X"];
  let array = ["", "", "", "", "", "", "", "", ""];
  // const setGameBoard = () => /*something*/; make sure to return it too
  const getGameBoard = () => array;
  return {getGameBoard};
})();

//  Module for game controller
const gameController = (() => {

})();

//  Module for display controller
//  Handles display of X/O and Turn Status
//  Also Start Menu (name input, start/restart button, congragulations, Player 2/CPU)
const displayController = (() => {
  let array = gameBoard.getGameBoard();
  // may turn into a function, need id and index
  document.getElementById("0").value = array[0];
  document.getElementById("1").value = array[1];
  document.getElementById("2").value = array[2];
  document.getElementById("3").value = array[3];
  document.getElementById("4").value = array[4];
  document.getElementById("5").value = array[5];
  document.getElementById("6").value = array[6];
  document.getElementById("7").value = array[7];
  document.getElementById("8").value = array[8];
})();

//  Factory for players
const Player = (name) => {
  const getName = () => name;
  return {getName};
};
