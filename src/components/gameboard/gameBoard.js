export { gameBoardFactory };

function gameBoardFactory() {
  let board = new Map();

  const getBoard = function getBoard() {
    return board;
  };

  const placeShip = function placeShip(shipName, xCoord, yCoord, direction) {
    xCoord = Number(xCoord);
    yCoord = Number(yCoord);
    if (direction === "horizontal") {
      board.set(`${xCoord},${yCoord}`, shipName);
      board.set(`${xCoord},${yCoord + 1}`, shipName);
      board.set(`${xCoord},${yCoord + 2}`, shipName);
      board.set(`${xCoord},${yCoord + 3}`, shipName);
      board.set(`${xCoord},${yCoord + 4}`, shipName);
    }
    if (direction === "vertical") {
      board.set(`${xCoord},${yCoord}`, shipName);
      board.set(`${xCoord + 1},${yCoord}`, shipName);
      board.set(`${xCoord + 2},${yCoord}`, shipName);
      board.set(`${xCoord + 3},${yCoord}`, shipName);
      board.set(`${xCoord + 4},${yCoord}`, shipName);
    }
  };

  return { getBoard, placeShip };
}
