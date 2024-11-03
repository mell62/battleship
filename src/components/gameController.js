import { playerFactory } from "../barrel";

export { getPlayerBoard, getComputerBoard };

const player = playerFactory();
const computer = playerFactory();

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
