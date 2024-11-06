import { gameBoardFactory } from "../barrel";

export { playerFactory, doAttack };

const classCoordPattern = /^\d-\d$/;

function playerFactory() {
  const board = gameBoardFactory();
  return { board };
}

const doComputerAttack = function doComputerAttack(gameBoard) {
  const xCoord = Math.floor(Math.random() * 10).toString();
  const yCoord = Math.floor(Math.random() * 10).toString();
  if (
    gameBoard.getBoard().get(`${xCoord},${yCoord}`) === "Hit" ||
    gameBoard.getBoard().get(`${xCoord},${yCoord}`) === "Miss"
  ) {
    // To avoid already attacked cells to be attacked again
    doComputerAttack(gameBoard);
    return;
  }
  gameBoard.receiveAttack(xCoord, yCoord);
};

const doPlayerAttack = function doPlayerAttack(gameBoard, coordEle) {
  const classes = Array.from(coordEle.classList);
  const classCoord = classes.find((coord) => classCoordPattern.test(coord));
  const xCoord = classCoord.slice(0, 1);
  const yCoord = classCoord.slice(2, 3);
  if (
    gameBoard.getBoard().get(`${xCoord},${yCoord}`) === "Hit" ||
    gameBoard.getBoard().get(`${xCoord},${yCoord}`) === "Miss"
  ) {
    // To avoid already attacked cells to be attacked again
    return false;
  }
  gameBoard.receiveAttack(xCoord, yCoord);
  return true;
};

const doAttack = function doAttack(playerBoard, computerBoard, coordEle) {
  if (doPlayerAttack(computerBoard, coordEle)) {
    doComputerAttack(playerBoard);
  }
};
