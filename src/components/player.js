import { gameBoardFactory } from "../barrel";

export { playerFactory, doComputerAttack };

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
