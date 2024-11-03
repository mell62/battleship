import { getPlayerBoard, getComputerBoard } from "../barrel";

export { renderPlayerBoard, renderComputerBoard };

const playerBoardInterface = document.querySelector(".player-board");
const playerBoardCoords = Array.from(
  playerBoardInterface.querySelectorAll("*"),
);
const computerBoardInterface = document.querySelector(".computer-board");
const computerBoardCoords = Array.from(
  computerBoardInterface.querySelectorAll("*"),
);

const findCoordEle = function findCoordEle(coordsArray, coordClass) {
  const coordEle = coordsArray.find((coord) => {
    return coord.classList.contains(coordClass);
  });
  return coordEle;
};

function renderPlayerBoard() {
  const gameBoard = getPlayerBoard();
  const shipCoords = gameBoard.getShipsCoords();

  shipCoords.forEach((coord) => {
    const coordClass = `${coord.xCoord}-${coord.yCoord}`;
    const coordEle = findCoordEle(playerBoardCoords, coordClass);
    if (coord.direction === "horizontal") {
      coordEle.textContent = "H";
      return;
    }
    coordEle.textContent = "V";
  });
}

function renderComputerBoard() {
  const gameBoard = getComputerBoard();
  const shipCoords = gameBoard.getShipsCoords();

  shipCoords.forEach((coord) => {
    const coordBoard = `${coord.xCoord},${coord.yCoord}`;
    const coordClass = `${coord.xCoord}-${coord.yCoord}`;
    const coordEle = findCoordEle(computerBoardCoords, coordClass);
    if (gameBoard.getBoard().get(coordBoard) === "Hit") {
      coordEle.style.backgroundColor = "red";
      return;
    }
    if (coord.direction === "horizontal") {
      coordEle.textContent = "H";
      return;
    }
    coordEle.textContent = "V";
  });
}
