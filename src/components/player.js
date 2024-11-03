import { gameBoardFactory } from "../barrel";

export { playerFactory };

function playerFactory() {
  const board = gameBoardFactory();
  return { board };
}
