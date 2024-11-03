import { playerFactory, renderComputerBoard } from "../barrel";

export { getPlayerBoard, getComputerBoard };

const computerBoard = document.querySelector(".computer-board");

const player = playerFactory();
const computer = playerFactory();
const classCoordPattern = /^\d-\d$/;

player.board.placeShip("Carrier", "2", "3", "vertical");
player.board.placeShip("Battleship", "9", "5", "vertical");
player.board.placeShip("Destroyer", "7", "1", "horizontal");
player.board.placeShip("Submarine", "4", "4", "horizontal");
player.board.placeShip("Patrol Boat", "5", "7", "horizontal");

computer.board.placeShip("Carrier", "1", "1", "horizontal");
computer.board.placeShip("Battleship", "6", "3", "vertical");
computer.board.placeShip("Destroyer", "0", "8", "horizontal");
computer.board.placeShip("Submarine", "9", "0", "vertical");
computer.board.placeShip("Patrol Boat", "7", "8", "horizontal");

function getPlayerBoard() {
  return player.board;
}

function getComputerBoard() {
  return computer.board;
}

const attackOnCoord = function attackOnCoord(coordEle) {
  const classes = Array.from(coordEle.classList);
  const classCoord = classes.find((coord) => classCoordPattern.test(coord));
  const xCoord = classCoord.slice(0, 1);
  const yCoord = classCoord.slice(2, 3);
  computer.board.receiveAttack(xCoord, yCoord);
};

computerBoard.addEventListener("click", (event) => {
  if (event.target.classList.contains("computer-coord")) {
    attackOnCoord(event.target);
    renderComputerBoard();
  }
});
