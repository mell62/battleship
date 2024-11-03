import { getPlayerBoard } from "../barrel";

export { renderPlayerBoard };

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
    if (coord.direction === "horizontal") {
      const coordClass = `${coord.xCoord}-${coord.yCoord}`;
      const coordEle = findCoordEle(playerBoardCoords, coordClass);
      coordEle.textContent = "H";
      return;
    }
    const coordClass = `${coord.xCoord}-${coord.yCoord}`;
    const coordEle = findCoordEle(playerBoardCoords, coordClass);
    coordEle.textContent = "V";
  });
}
