import { gameBoardFactory } from "../barrel";

export { playerFactory, doAttack };

const classCoordPattern = /^\d-\d$/;
let lastHit = null;

function playerFactory() {
  const board = gameBoardFactory();
  return { board };
}

const attackRandomAdjacentCoord = function attackRandomAdjacentCoord(
  gameBoard,
  xCoord,
  yCoord,
) {
  let hitCounter = gameBoard.getHits();
  let possibleAttacks = [
    [Number(xCoord) + 1, Number(yCoord)],
    [Number(xCoord) - 1, Number(yCoord)],
    [Number(xCoord), Number(yCoord) + 1],
    [Number(xCoord), Number(yCoord) - 1],
  ];
  possibleAttacks = possibleAttacks.filter((possibleAttack) => {
    return possibleAttack.every((coord) => coord >= 0 && coord < 10);
  });
  const decider = Math.floor(Math.random() * possibleAttacks.length);
  let attackingCoords = possibleAttacks[decider];
  if (
    gameBoard.getBoard().get(`${attackingCoords[0]},${attackingCoords[1]}`) ===
      "Hit" ||
    gameBoard.getBoard().get(`${attackingCoords[0]},${attackingCoords[1]}`) ===
      "Miss"
  ) {
    // To avoid already attacked cells to be attacked again
    attackRandomAdjacentCoord(gameBoard, xCoord, yCoord);
    return;
  }
  gameBoard.receiveAttack(...attackingCoords);
  if (hitCounter !== gameBoard.getHits()) {
    lastHit = attackingCoords;
  }
};

const doComputerAttack = function doComputerAttack(gameBoard) {
  const xCoord = Math.floor(Math.random() * 10).toString();
  const yCoord = Math.floor(Math.random() * 10).toString();
  let hitCounter = gameBoard.getHits();
  let sunkShips = gameBoard.getNumberOfSunkShips();
  if (
    gameBoard.getBoard().get(`${xCoord},${yCoord}`) === "Hit" ||
    gameBoard.getBoard().get(`${xCoord},${yCoord}`) === "Miss"
  ) {
    // To avoid already attacked cells to be attacked again
    doComputerAttack(gameBoard);
    return;
  }
  if (lastHit && sunkShips === gameBoard.getNumberOfSunkShips()) {
    attackRandomAdjacentCoord(gameBoard, lastHit[0], lastHit[1]);
    return;
  }
  gameBoard.receiveAttack(xCoord, yCoord);
  if (hitCounter !== gameBoard.getHits()) {
    lastHit = [xCoord, yCoord];
    hitCounter = gameBoard.getHits();
  }
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
