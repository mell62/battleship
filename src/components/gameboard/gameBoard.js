export { gameBoardFactory };
import shipFactory from "../ship/ship";

function gameBoardFactory() {
  let board = new Map();

  const getBoard = function getBoard() {
    return board;
  };

  const placeShip = function placeShip(shipName, xCoord, yCoord, direction) {
    const ship = shipFactory(shipName);
    const length = ship.getLength();
    let counter = 0;
    xCoord = Number(xCoord);
    yCoord = Number(yCoord);
    while (counter < length) {
      board.set(`${xCoord},${yCoord}`, shipName);
      if (direction === "horizontal") {
        xCoord += 1;
        counter += 1;
        continue;
      }
      if (direction === "vertical") {
        yCoord += 1;
        counter += 1;
        continue;
      }
    }
  };

  const receiveAttack = function receiveAttack(xCoord, yCoord) {
    board.set(`${xCoord},${yCoord}`, "Hit");
  };

  return { getBoard, placeShip, receiveAttack };
}
