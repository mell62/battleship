import {
  playerFactory,
  renderComputerBoard,
  doAttack,
  renderPlayerBoard,
  shipFactory,
  disablePlayerShipButton,
} from "../barrel";

export {
  getPlayerBoard,
  getComputerBoard,
  placePlayerShips,
  placeComputerShips,
  doComputerAttack,
};

const playerShipsElements = document.querySelector(".player-ships-container");
const playerShipsButtons = Array.from(
  playerShipsElements.querySelectorAll(".player-ship"),
);
const directionBtn = document.querySelector(".direction-btn");
const classCoordPattern = /^\d-\d$/;
let selectedShip = null;
let selectedDirection = "horizontal";

const player = playerFactory();
const computer = playerFactory();

const ifAllShipsPlaced = function ifAllShipsPlaced() {
  if (playerShipsButtons.every((btn) => btn.disabled === true)) {
    return true;
  }
};

playerShipsElements.addEventListener("click", (event) => {
  if (event.target.classList.contains("player-ship")) {
    let classes = Array.from(event.target.classList);
    let ship = classes.find((className) => className !== "player-ship");
    if (ship === "carrier") {
      selectedShip = "Carrier";
      return;
    }
    if (ship === "battleship") {
      selectedShip = "Battleship";
      return;
    }
    if (ship === "destroyer") {
      selectedShip = "Destroyer";
      return;
    }
    if (ship === "submarine") {
      selectedShip = "Submarine";
      return;
    }
    if (ship === "patrol-boat") {
      selectedShip = "Patrol Boat";
      return;
    }
  }
});

directionBtn.addEventListener("click", () => {
  if (selectedDirection === "horizontal") {
    selectedDirection = "vertical";
    return;
  }
  selectedDirection = "horizontal";
});

const placePlayerShips = function placePlayerShips(event) {
  if (event.target.classList.contains("player-coord") && selectedShip) {
    const classes = Array.from(event.target.classList);
    const classCoord = classes.find((className) =>
      classCoordPattern.test(className),
    );
    const xCoord = classCoord.slice(0, 1);
    const yCoord = classCoord.slice(2, 3);
    if (
      !player.board.ifExceedBoard(
        shipFactory(selectedShip).getLength(),
        Number(xCoord),
        Number(yCoord),
        selectedDirection,
      ) &&
      !player.board.ifNextToShip(
        shipFactory(selectedShip).getLength(),
        Number(xCoord),
        Number(yCoord),
        selectedDirection,
        player.board.getBoard(),
      )
    ) {
      player.board.placeShip(
        `${selectedShip}`,
        `${xCoord}`,
        `${yCoord}`,
        selectedDirection,
      );
      disablePlayerShipButton(selectedShip);
      selectedShip = null;
      renderPlayerBoard();
    }
  }
};

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

function getPlayerBoard() {
  return player.board;
}

function getComputerBoard() {
  return computer.board;
}

const doComputerAttack = function doComputerAttack(event) {
  if (computer.board.ifAllShipsSunk() || player.board.ifAllShipsSunk()) return;
  if (event.target.classList.contains("computer-coord") && ifAllShipsPlaced()) {
    doAttack(player.board, computer.board, event.target);
    renderComputerBoard();
    renderPlayerBoard();
  }
};
