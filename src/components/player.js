import { gameBoardFactory } from "../barrel";

export { playerFactory, doComputerAttack };

function playerFactory() {
  const board = gameBoardFactory();
  return { board };
}

const doComputerAttack = function doComputerAttack(gameBoard) {
  const xCoord = Math.floor(Math.random() * 10).toString();
  const yCoord = Math.floor(Math.random() * 10).toString();
  gameBoard.receiveAttack(xCoord, yCoord);
};
