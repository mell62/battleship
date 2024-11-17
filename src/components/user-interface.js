import {
  getPlayerBoard,
  getComputerBoard,
  ifAllShipsPlaced,
  getSelectedShip,
} from "../barrel";

export { renderPlayerBoard, renderComputerBoard, disablePlayerShipButton };

const playerBoardInterface = document.querySelector(".player-board");
const playerBoardCoords = Array.from(
  playerBoardInterface.querySelectorAll("*"),
);
const computerBoardInterface = document.querySelector(".computer-board");
const computerBoardCoords = Array.from(
  computerBoardInterface.querySelectorAll("*"),
);

const playerShipsElements = document.querySelector(".player-ships-container");
const playerShipsButtons = Array.from(
  playerShipsElements.querySelectorAll(".player-ship"),
);

const disablePlayerShipButton = function disablePlayerShipButton(shipName) {
  if (shipName === "Carrier") {
    const shipBtn = playerShipsButtons.find((btn) =>
      btn.classList.contains("carrier"),
    );
    shipBtn.disabled = true;
  }
  if (shipName === "Battleship") {
    const shipBtn = playerShipsButtons.find((btn) =>
      btn.classList.contains("battleship"),
    );
    shipBtn.disabled = true;
  }
  if (shipName === "Destroyer") {
    const shipBtn = playerShipsButtons.find((btn) =>
      btn.classList.contains("destroyer"),
    );
    shipBtn.disabled = true;
  }
  if (shipName === "Submarine") {
    const shipBtn = playerShipsButtons.find((btn) =>
      btn.classList.contains("submarine"),
    );
    shipBtn.disabled = true;
  }
  if (shipName === "Patrol Boat") {
    const shipBtn = playerShipsButtons.find((btn) =>
      btn.classList.contains("patrol-boat"),
    );
    shipBtn.disabled = true;
  }
};

const findCoordEle = function findCoordEle(coordsArray, coordClass) {
  const coordEle = coordsArray.find((coord) => {
    return coord.classList.contains(coordClass);
  });
  return coordEle;
};

function renderPlayerBoard() {
  const gameBoard = getPlayerBoard();
  const shipCoords = gameBoard.getShipsCoords();
  const missedCoords = gameBoard.getMissedCoords();

  shipCoords.forEach((coord) => {
    const coordBoard = `${coord.xCoord},${coord.yCoord}`;
    const coordClass = `${coord.xCoord}-${coord.yCoord}`;
    const coordEle = findCoordEle(playerBoardCoords, coordClass);
    coordEle.textContent = "O";
    if (gameBoard.getBoard().get(coordBoard) === "Hit") {
      coordEle.style.backgroundColor = "red";
      return;
    }
  });

  missedCoords.forEach((coord) => {
    const coordClass = `${coord.xCoord}-${coord.yCoord}`;
    const coordEle = findCoordEle(playerBoardCoords, coordClass);
    coordEle.style.backgroundColor = "#16161a";
    coordEle.textContent = "X";
  });
}

function renderComputerBoard() {
  const gameBoard = getComputerBoard();
  const shipCoords = gameBoard.getShipsCoords();
  const missedCoords = gameBoard.getMissedCoords();

  shipCoords.forEach((coord) => {
    const coordBoard = `${coord.xCoord},${coord.yCoord}`;
    const coordClass = `${coord.xCoord}-${coord.yCoord}`;
    const coordEle = findCoordEle(computerBoardCoords, coordClass);
    if (gameBoard.getBoard().get(coordBoard) === "Hit") {
      coordEle.style.backgroundColor = "red";
      return;
    }
    coordEle.textContent = "O";
  });

  missedCoords.forEach((coord) => {
    const coordClass = `${coord.xCoord}-${coord.yCoord}`;
    const coordEle = findCoordEle(computerBoardCoords, coordClass);
    coordEle.style.backgroundColor = "#16161a";
    coordEle.textContent = "X";
  });
}

computerBoardInterface.addEventListener("mouseover", (event) => {
  if (event.target.classList.contains("computer-coord") && ifAllShipsPlaced()) {
    event.target.classList.add("empty-coord-hover");
  }
});

playerBoardInterface.addEventListener("mouseover", (event) => {
  if (event.target.classList.contains("player-coord") && !getSelectedShip()) {
    event.target.classList.remove("ship-selected-hover");
  }
});

playerBoardInterface.addEventListener("mouseover", (event) => {
  if (event.target.classList.contains("player-coord") && getSelectedShip()) {
    event.target.classList.add("ship-selected-hover");
  }
});
