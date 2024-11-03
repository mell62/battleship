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

function renderPlayerBoard() {
  const gameBoard = getPlayerBoard();
  const shipCoords = gameBoard.getShipsCoords();

  shipCoords.forEach((coord) => {
    if (coord.direction === "horizontal") {
      const coordClass = `${coord.xCoord}-${coord.yCoord}`;
      const coordEle = playerBoardCoords.find((playerCoord) => {
        return playerCoord.classList.contains(coordClass);
      });
      coordEle.textContent = "Hibro";
    }
    const coordClass = `${coord.xCoord}-${coord.yCoord}`;
    const coordEle = playerBoardCoords.find((playerCoord) => {
      return playerCoord.classList.contains(coordClass);
    });
    coordEle.textContent = "test";
  });
}
