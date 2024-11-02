import { gameBoardFactory } from "../gameboard/gameBoard";

export { playerFactory };

function playerFactory() {
  const board = gameBoardFactory();
  return { board };
}
