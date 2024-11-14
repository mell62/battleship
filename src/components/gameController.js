import {
  playerFactory,
  renderComputerBoard,
  doAttack,
  renderPlayerBoard,
} from "../barrel";

export { getPlayerBoard, getComputerBoard };

const computerBoard = document.querySelector(".computer-board");

const player = playerFactory();
const computer = playerFactory();

player.board.placeShip("Carrier", "2", "3", "vertical");
player.board.placeShip("Battleship", "9", "5", "vertical");
player.board.placeShip("Destroyer", "7", "1", "horizontal");
player.board.placeShip("Submarine", "4", "4", "horizontal");
player.board.placeShip("Patrol Boat", "5", "7", "horizontal");

const placeComputerShips = function placeComputerShips() {
  const ships = [
    "Carrier",
    "Battleship",
    "Destroyer",
    "Submarine",
    "Patrol Boat",
  ];

  ships.forEach((ship) => {
    const xCoord = Math.floor(Math.random() * 10);
    const yCoord = Math.floor(Math.random() * 10);
    const direction = Math.floor(Math.random() * 2);

    if (direction === 0) {
      computer.board.placeShip(
        `${ship}`,
        `${xCoord}`,
        `${yCoord}`,
        "horizontal",
      );
      return;
    }
    computer.board.placeShip(`${ship}`, `${xCoord}`, `${yCoord}`, "vertical");
  });
};

placeComputerShips();

function getPlayerBoard() {
  return player.board;
}

function getComputerBoard() {
  return computer.board;
}

computerBoard.addEventListener("click", (event) => {
  if (computer.board.ifAllShipsSunk() || player.board.ifAllShipsSunk()) return;
  if (event.target.classList.contains("computer-coord")) {
    doAttack(player.board, computer.board, event.target);
    renderComputerBoard();
    renderPlayerBoard();
  }
});
