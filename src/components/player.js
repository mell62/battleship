import { gameBoardFactory } from "../barrel";

export { playerFactory, doAttack };

const classCoordPattern = /^\d-\d$/;
let lastHit = null;
let sunkShips = 0;
let attackDirection = null;
let initialHitCoord = null;

function playerFactory() {
  const board = gameBoardFactory();
  return { board };
}

const attackAppropriateDirection = function attackAppropriateDirection(
  gameBoard,
  xCoord,
  yCoord,
) {
  let hitCounter = gameBoard.getHits();
  if (attackDirection === "horizontalRight") {
    attackHorizontalRight(gameBoard, xCoord, yCoord);
    if (hitCounter !== gameBoard.getHits()) {
      lastHit = [xCoord + 1, yCoord];
    }
  }
  if (attackDirection === "horizontalLeft") {
    attackHorizontalLeft(gameBoard, xCoord, yCoord);
    if (hitCounter !== gameBoard.getHits()) {
      lastHit = [xCoord - 1, yCoord];
    }
  }
  if (attackDirection === "verticalDown") {
    attackVerticalDown(gameBoard, xCoord, yCoord);
    if (hitCounter !== gameBoard.getHits()) {
      lastHit = [xCoord, yCoord + 1];
    }
  }
  if (attackDirection === "verticalUp") {
    attackVerticalUp(gameBoard, xCoord, yCoord);
    if (hitCounter !== gameBoard.getHits()) {
      lastHit = [xCoord, yCoord - 1];
    }
  }
};

const attackHorizontalRight = function attackHorizontalRight(
  gameBoard,
  xCoord,
  yCoord,
) {
  if (
    gameBoard.getBoard().get(`${Number(xCoord) + 1},${Number(yCoord)}`) ===
    "Miss"
  ) {
    attackDirection = "horizontalLeft";
    attackHorizontalLeft(gameBoard, initialHitCoord[0], initialHitCoord[1]);
  }
  gameBoard.receiveAttack(Number(xCoord) + 1, Number(yCoord));
  // console.log(Number(xCoord) + 1, Number(yCoord));
  return;
};

const attackHorizontalLeft = function attackHorizontalLeft(
  gameBoard,
  xCoord,
  yCoord,
) {
  if (
    gameBoard.getBoard().get(`${Number(xCoord) - 1},${Number(yCoord)}`) ===
    "Miss"
  ) {
    attackDirection = "horizontalRight";
    attackHorizontalRight(gameBoard, initialHitCoord[0], initialHitCoord[1]);
  }
  gameBoard.receiveAttack(Number(xCoord) - 1, Number(yCoord));
  // console.log(Number(xCoord) - 1, Number(yCoord));

  return;
};

const attackVerticalDown = function attackVerticalDown(
  gameBoard,
  xCoord,
  yCoord,
) {
  if (
    gameBoard.getBoard().get(`${Number(xCoord)},${Number(yCoord) + 1}`) ===
    "Miss"
  ) {
    attackDirection = "verticalUp";
    attackVerticalUp(gameBoard, initialHitCoord[0], initialHitCoord[1]);
  }
  gameBoard.receiveAttack(Number(xCoord), Number(yCoord) + 1);
  // console.log(Number(xCoord), Number(yCoord) + 1);

  return;
};

const attackVerticalUp = function attackVerticalUp(gameBoard, xCoord, yCoord) {
  if (
    gameBoard.getBoard().get(`${Number(xCoord)},${Number(yCoord) - 1}`) ===
    "Miss"
  ) {
    attackDirection = "verticalDown";
    attackVerticalDown(gameBoard, initialHitCoord[0], initialHitCoord[1]);
  }
  gameBoard.receiveAttack(Number(xCoord), Number(yCoord) - 1);
  // console.log(Number(xCoord), Number(yCoord) - 1);

  return;
};

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
    initialHitCoord = lastHit;
    lastHit = attackingCoords;
    if (
      JSON.stringify(attackingCoords) ===
      JSON.stringify([Number(xCoord) + 1, Number(yCoord)])
    ) {
      attackDirection = "horizontalRight";
    }
    if (
      JSON.stringify(attackingCoords) ===
      JSON.stringify([Number(xCoord) - 1, Number(yCoord)])
    ) {
      attackDirection = "horizontalLeft";
    }
    if (
      JSON.stringify(attackingCoords) ===
      JSON.stringify([Number(xCoord), Number(yCoord) + 1])
    ) {
      attackDirection = "verticalDown";
    }
    if (
      JSON.stringify(attackingCoords) ===
      JSON.stringify([Number(xCoord), Number(yCoord) - 1])
    ) {
      attackDirection = "verticalUp";
    }
  }
};

const doComputerAttack = function doComputerAttack(gameBoard) {
  const xCoord = Math.floor(Math.random() * 10).toString();
  const yCoord = Math.floor(Math.random() * 10).toString();
  let hitCounter = gameBoard.getHits();
  if (
    gameBoard.getBoard().get(`${xCoord},${yCoord}`) === "Hit" ||
    gameBoard.getBoard().get(`${xCoord},${yCoord}`) === "Miss"
  ) {
    // To avoid already attacked cells to be attacked again
    doComputerAttack(gameBoard);
    return;
  }
  if (
    lastHit &&
    attackDirection &&
    sunkShips === gameBoard.getNumberOfSunkShips()
  ) {
    attackAppropriateDirection(gameBoard, lastHit[0], lastHit[1]);
    return;
  }
  if (lastHit && sunkShips === gameBoard.getNumberOfSunkShips()) {
    attackRandomAdjacentCoord(gameBoard, lastHit[0], lastHit[1]);
    return;
  }
  lastHit = null;
  attackDirection = null;
  sunkShips = gameBoard.getNumberOfSunkShips();
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
