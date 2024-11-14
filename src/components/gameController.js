import {
  playerFactory,
  renderComputerBoard,
  doAttack,
  renderPlayerBoard,
  shipFactory,
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

  for (let i = 0; i < ships.length; i++) {
    const xCoord = Math.floor(Math.random() * 10);
    const yCoord = Math.floor(Math.random() * 10);
    const direction = Math.floor(Math.random() * 2);

    if (direction === 0) {
      if (
        computer.board.ifExceedBoard(
          shipFactory(`${ships[i]}`).getLength(),
          xCoord,
          yCoord,
          "horizontal",
        ) ||
        computer.board.ifNextToShip(
          shipFactory(`${ships[i]}`).getLength(),
          xCoord,
          yCoord,
          "horizontal",
          computer.board.getBoard(),
        )
      ) {
        i -= 1;
        continue;
      }
      computer.board.placeShip(
        `${ships[i]}`,
        `${xCoord}`,
        `${yCoord}`,
        "horizontal",
      );
      continue;
    }
    if (
      computer.board.ifExceedBoard(
        shipFactory(`${ships[i]}`).getLength(),
        xCoord,
        yCoord,
        "vertical",
      ) ||
      computer.board.ifNextToShip(
        shipFactory(`${ships[i]}`).getLength(),
        xCoord,
        yCoord,
        "vertical",
        computer.board.getBoard(),
      )
    ) {
      i -= 1;
      continue;
    }
    computer.board.placeShip(
      `${ships[i]}`,
      `${xCoord}`,
      `${yCoord}`,
      "vertical",
    );
  }
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
