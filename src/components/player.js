import {
  gameBoardFactory,
  updatePlayerMissMessage,
  updatePlayerHitMessage,
  updatePlayerSinkShipMessage,
  updatePlayerWinMessage,
  updateComputerAttackMessage,
  updateComputerMissMessage,
  updateComputerHitMessage,
  updateComputerSinkShipMessage,
  updateComputerWinMessage,
  updateSunkShipIcons,
} from "../barrel";

export { playerFactory, doAttack, getSunkShipCoords };

const classCoordPattern = /^\d-\d$/;
let lastHit = null;
let sunkPlayerShips = 0;
let sunkComputerShips = 0;
let attackDirection = null;
let initialHitCoord = null;
let computerAttackLoaded = true;

function playerFactory() {
  const board = gameBoardFactory();
  return { board };
}

const attackAppropriateDirection = function attackAppropriateDirection(
  gameBoard,
  xCoord,
  yCoord,
) {
  if (attackDirection === "horizontalRight") {
    attackHorizontalRight(gameBoard, xCoord, yCoord);
  }
  if (attackDirection === "horizontalLeft") {
    attackHorizontalLeft(gameBoard, xCoord, yCoord);
  }
  if (attackDirection === "verticalDown") {
    attackVerticalDown(gameBoard, xCoord, yCoord);
  }
  if (attackDirection === "verticalUp") {
    attackVerticalUp(gameBoard, xCoord, yCoord);
  }
};

const attackHorizontalRight = function attackHorizontalRight(
  gameBoard,
  xCoord,
  yCoord,
) {
  let hitCounter = gameBoard.getHits();
  if (!gameBoard.getBoard().get(`${Number(xCoord) + 1},${Number(yCoord)}`)) {
    if (Number(xCoord) + 1 <= 9) {
      gameBoard.receiveAttack(Number(xCoord) + 1, Number(yCoord));
      attackDirection = "horizontalLeft";
      lastHit = initialHitCoord;
      updateComputerMissMessage();
      return;
    }
    //to avoid attacking outside board
    attackDirection = "horizontalLeft";
    attackAppropriateDirection(
      gameBoard,
      initialHitCoord[0],
      initialHitCoord[1],
    );
    return;
  }
  if (
    gameBoard.getBoard().get(`${Number(xCoord) + 1},${Number(yCoord)}`) ===
    "Miss"
  ) {
    attackDirection = "horizontalLeft";
    attackAppropriateDirection(
      gameBoard,
      initialHitCoord[0],
      initialHitCoord[1],
    );
    return;
  }
  gameBoard.receiveAttack(Number(xCoord) + 1, Number(yCoord));
  if (hitCounter !== gameBoard.getHits()) {
    lastHit = [Number(xCoord) + 1, Number(yCoord)];
    hitCounter = gameBoard.getHits();
    updateComputerHitMessage();
    if (sunkPlayerShips !== gameBoard.getNumberOfSunkShips()) {
      updateSunkShipIcons(Number(xCoord), Number(yCoord), gameBoard, "player");
      updateComputerSinkShipMessage();
    }
  } else {
    updateComputerMissMessage();
  }
  if (gameBoard.ifAllShipsSunk()) {
    updateComputerWinMessage();
  }
  return;
};

const attackHorizontalLeft = function attackHorizontalLeft(
  gameBoard,
  xCoord,
  yCoord,
) {
  let hitCounter = gameBoard.getHits();
  if (!gameBoard.getBoard().get(`${Number(xCoord) - 1},${Number(yCoord)}`)) {
    if (Number(xCoord) - 1 >= 0) {
      gameBoard.receiveAttack(Number(xCoord) - 1, Number(yCoord));
      attackDirection = "horizontalRight";
      lastHit = initialHitCoord;
      updateComputerMissMessage();
      return;
    }
    //to avoid attacking outside board
    attackDirection = "horizontalRight";
    attackAppropriateDirection(
      gameBoard,
      initialHitCoord[0],
      initialHitCoord[1],
    );
    return;
  }
  if (
    gameBoard.getBoard().get(`${Number(xCoord) - 1},${Number(yCoord)}`) ===
    "Miss"
  ) {
    attackDirection = "horizontalRight";
    attackAppropriateDirection(
      gameBoard,
      initialHitCoord[0],
      initialHitCoord[1],
    );
    return;
  }
  gameBoard.receiveAttack(Number(xCoord) - 1, Number(yCoord));
  if (hitCounter !== gameBoard.getHits()) {
    lastHit = [Number(xCoord) - 1, Number(yCoord)];
    hitCounter = gameBoard.getHits();
    updateComputerHitMessage();
    if (sunkPlayerShips !== gameBoard.getNumberOfSunkShips()) {
      updateSunkShipIcons(Number(xCoord), Number(yCoord), gameBoard, "player");
      updateComputerSinkShipMessage();
    }
  } else {
    updateComputerMissMessage();
  }
  if (gameBoard.ifAllShipsSunk()) {
    updateComputerWinMessage();
  }
  return;
};

const attackVerticalDown = function attackVerticalDown(
  gameBoard,
  xCoord,
  yCoord,
) {
  let hitCounter = gameBoard.getHits();
  if (!gameBoard.getBoard().get(`${Number(xCoord)},${Number(yCoord) + 1}`)) {
    if (Number(yCoord) + 1 <= 9) {
      gameBoard.receiveAttack(Number(xCoord), Number(yCoord) + 1);
      attackDirection = "verticalUp";
      lastHit = initialHitCoord;
      updateComputerMissMessage();
      return;
    }
    //to avoid attacking outside board
    attackDirection = "verticalUp";
    attackAppropriateDirection(
      gameBoard,
      initialHitCoord[0],
      initialHitCoord[1],
    );
    return;
  }
  if (
    gameBoard.getBoard().get(`${Number(xCoord)},${Number(yCoord) + 1}`) ===
    "Miss"
  ) {
    attackDirection = "verticalUp";
    attackAppropriateDirection(
      gameBoard,
      initialHitCoord[0],
      initialHitCoord[1],
    );
    return;
  }
  gameBoard.receiveAttack(Number(xCoord), Number(yCoord) + 1);
  if (hitCounter !== gameBoard.getHits()) {
    lastHit = [Number(xCoord), Number(yCoord) + 1];
    hitCounter = gameBoard.getHits();
    updateComputerHitMessage();
    if (sunkPlayerShips !== gameBoard.getNumberOfSunkShips()) {
      updateSunkShipIcons(Number(xCoord), Number(yCoord), gameBoard, "player");
      updateComputerSinkShipMessage();
    }
  } else {
    updateComputerMissMessage();
  }
  if (gameBoard.ifAllShipsSunk()) {
    updateComputerWinMessage();
  }
  return;
};

const attackVerticalUp = function attackVerticalUp(gameBoard, xCoord, yCoord) {
  let hitCounter = gameBoard.getHits();
  if (!gameBoard.getBoard().get(`${Number(xCoord)},${Number(yCoord) - 1}`)) {
    if (Number(yCoord) - 1 >= 0) {
      gameBoard.receiveAttack(Number(xCoord), Number(yCoord) - 1);
      attackDirection = "verticalDown";
      lastHit = initialHitCoord;
      updateComputerMissMessage();
      return;
    }
    //to avoid attacking outside board
    attackDirection = "verticalDown";
    attackAppropriateDirection(
      gameBoard,
      initialHitCoord[0],
      initialHitCoord[1],
    );
    return;
  }
  if (
    gameBoard.getBoard().get(`${Number(xCoord)},${Number(yCoord) - 1}`) ===
    "Miss"
  ) {
    attackDirection = "verticalDown";
    attackAppropriateDirection(
      gameBoard,
      initialHitCoord[0],
      initialHitCoord[1],
    );
    return;
  }
  gameBoard.receiveAttack(Number(xCoord), Number(yCoord) - 1);
  if (hitCounter !== gameBoard.getHits()) {
    lastHit = [Number(xCoord), Number(yCoord) - 1];
    hitCounter = gameBoard.getHits();
    updateComputerHitMessage();
    if (sunkPlayerShips !== gameBoard.getNumberOfSunkShips()) {
      updateSunkShipIcons(Number(xCoord), Number(yCoord), gameBoard, "player");
      updateComputerSinkShipMessage();
    }
  } else {
    updateComputerMissMessage();
  }
  if (gameBoard.ifAllShipsSunk()) {
    updateComputerWinMessage();
  }
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
    hitCounter = gameBoard.getHits();
    updateComputerHitMessage();
    if (sunkPlayerShips !== gameBoard.getNumberOfSunkShips()) {
      updateSunkShipIcons(Number(xCoord), Number(yCoord), gameBoard, "player");
      updateComputerSinkShipMessage();
    }
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
  } else {
    updateComputerMissMessage();
  }
  if (gameBoard.ifAllShipsSunk()) {
    updateComputerWinMessage();
  }
};

const doComputerAttack = function doComputerAttack(gameBoard) {
  computerAttackLoaded = false;
  setTimeout(() => {
    updateComputerAttackMessage();
    setTimeout(() => {
      computerAttackLoaded = true;
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
        sunkPlayerShips === gameBoard.getNumberOfSunkShips()
      ) {
        attackAppropriateDirection(gameBoard, lastHit[0], lastHit[1]);
        return;
      }
      if (lastHit && sunkPlayerShips === gameBoard.getNumberOfSunkShips()) {
        attackRandomAdjacentCoord(gameBoard, lastHit[0], lastHit[1]);
        return;
      }
      lastHit = null;
      attackDirection = null;
      sunkPlayerShips = gameBoard.getNumberOfSunkShips();
      gameBoard.receiveAttack(xCoord, yCoord);
      if (hitCounter !== gameBoard.getHits()) {
        lastHit = [xCoord, yCoord];
        hitCounter = gameBoard.getHits();
        updateComputerHitMessage();
      } else {
        updateComputerMissMessage();
      }
    }, 2000);
  }, 2000);
};

const doPlayerAttack = function doPlayerAttack(gameBoard, coordEle) {
  if (computerAttackLoaded) {
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
    if (gameBoard.getBoard().get(`${xCoord},${yCoord}`) === "Hit") {
      updatePlayerHitMessage();
      if (sunkComputerShips !== gameBoard.getNumberOfSunkShips()) {
        updatePlayerSinkShipMessage();
        updateSunkShipIcons(
          Number(xCoord),
          Number(yCoord),
          gameBoard,
          "computer",
        );
        sunkComputerShips = gameBoard.getNumberOfSunkShips();
      }
    } else {
      updatePlayerMissMessage();
    }
    if (gameBoard.ifAllShipsSunk()) {
      updatePlayerWinMessage();
    }
    return true;
  }
};

const doAttack = function doAttack(playerBoard, computerBoard, coordEle) {
  if (doPlayerAttack(computerBoard, coordEle)) {
    if (computerBoard.ifAllShipsSunk()) {
      return;
    }
    doComputerAttack(playerBoard);
  }
};

const getShipFromCoords = function getShipFromCoords(
  xCoord,
  yCoord,
  gameBoard,
) {
  const shipCoords = gameBoard.getShipsCoords();
  const targetShipCoord = shipCoords.find(
    (shipCoord) => shipCoord.xCoord === xCoord && shipCoord.yCoord === yCoord,
  );
  const shipName = targetShipCoord.shipName;
  return shipName;
};

const getSunkShipCoords = function getSunkShipCoords(
  xCoord,
  yCoord,
  gameBoard,
) {
  const shipName = getShipFromCoords(xCoord, yCoord, gameBoard);
  const originShipCoord = gameBoard
    .getShipsCoords()
    .find((shipCoord) => shipCoord.shipName === shipName);
  const sunkShipCoords = [];
  if (originShipCoord.direction === "horizontal") {
    if (shipName === "Patrol Boat") {
      sunkShipCoords.push({
        xCoord: originShipCoord.xCoord,
        yCoord: originShipCoord.yCoord,
      });
      sunkShipCoords.push({
        xCoord: originShipCoord.xCoord + 1,
        yCoord: originShipCoord.yCoord,
      });
      return sunkShipCoords;
    }
    if (shipName === "Submarine") {
      sunkShipCoords.push({
        xCoord: originShipCoord.xCoord,
        yCoord: originShipCoord.yCoord,
      });
      sunkShipCoords.push({
        xCoord: originShipCoord.xCoord + 1,
        yCoord: originShipCoord.yCoord,
      });
      sunkShipCoords.push({
        xCoord: originShipCoord.xCoord + 2,
        yCoord: originShipCoord.yCoord,
      });
      return sunkShipCoords;
    }
    if (shipName === "Destroyer") {
      sunkShipCoords.push({
        xCoord: originShipCoord.xCoord,
        yCoord: originShipCoord.yCoord,
      });
      sunkShipCoords.push({
        xCoord: originShipCoord.xCoord + 1,
        yCoord: originShipCoord.yCoord,
      });
      sunkShipCoords.push({
        xCoord: originShipCoord.xCoord + 2,
        yCoord: originShipCoord.yCoord,
      });
      return sunkShipCoords;
    }
    if (shipName === "Battleship") {
      sunkShipCoords.push({
        xCoord: originShipCoord.xCoord,
        yCoord: originShipCoord.yCoord,
      });
      sunkShipCoords.push({
        xCoord: originShipCoord.xCoord + 1,
        yCoord: originShipCoord.yCoord,
      });
      sunkShipCoords.push({
        xCoord: originShipCoord.xCoord + 2,
        yCoord: originShipCoord.yCoord,
      });
      sunkShipCoords.push({
        xCoord: originShipCoord.xCoord + 3,
        yCoord: originShipCoord.yCoord,
      });
      return sunkShipCoords;
    }
    if (shipName === "Carrier") {
      sunkShipCoords.push({
        xCoord: originShipCoord.xCoord,
        yCoord: originShipCoord.yCoord,
      });
      sunkShipCoords.push({
        xCoord: originShipCoord.xCoord + 1,
        yCoord: originShipCoord.yCoord,
      });
      sunkShipCoords.push({
        xCoord: originShipCoord.xCoord + 2,
        yCoord: originShipCoord.yCoord,
      });
      sunkShipCoords.push({
        xCoord: originShipCoord.xCoord + 3,
        yCoord: originShipCoord.yCoord,
      });
      sunkShipCoords.push({
        xCoord: originShipCoord.xCoord + 4,
        yCoord: originShipCoord.yCoord,
      });
      return sunkShipCoords;
    }
  }
  if (shipName === "Patrol Boat") {
    sunkShipCoords.push({
      xCoord: originShipCoord.xCoord,
      yCoord: originShipCoord.yCoord,
    });
    sunkShipCoords.push({
      xCoord: originShipCoord.xCoord,
      yCoord: originShipCoord.yCoord + 1,
    });
    return sunkShipCoords;
  }
  if (shipName === "Submarine") {
    sunkShipCoords.push({
      xCoord: originShipCoord.xCoord,
      yCoord: originShipCoord.yCoord,
    });
    sunkShipCoords.push({
      xCoord: originShipCoord.xCoord,
      yCoord: originShipCoord.yCoord + 1,
    });
    sunkShipCoords.push({
      xCoord: originShipCoord.xCoord,
      yCoord: originShipCoord.yCoord + 2,
    });
    return sunkShipCoords;
  }
  if (shipName === "Destroyer") {
    sunkShipCoords.push({
      xCoord: originShipCoord.xCoord,
      yCoord: originShipCoord.yCoord,
    });
    sunkShipCoords.push({
      xCoord: originShipCoord.xCoord,
      yCoord: originShipCoord.yCoord + 1,
    });
    sunkShipCoords.push({
      xCoord: originShipCoord.xCoord,
      yCoord: originShipCoord.yCoord + 2,
    });
    return sunkShipCoords;
  }
  if (shipName === "Battleship") {
    sunkShipCoords.push({
      xCoord: originShipCoord.xCoord,
      yCoord: originShipCoord.yCoord,
    });
    sunkShipCoords.push({
      xCoord: originShipCoord.xCoord,
      yCoord: originShipCoord.yCoord + 1,
    });
    sunkShipCoords.push({
      xCoord: originShipCoord.xCoord,
      yCoord: originShipCoord.yCoord + 2,
    });
    sunkShipCoords.push({
      xCoord: originShipCoord.xCoord,
      yCoord: originShipCoord.yCoord + 3,
    });
    return sunkShipCoords;
  }
  if (shipName === "Carrier") {
    sunkShipCoords.push({
      xCoord: originShipCoord.xCoord,
      yCoord: originShipCoord.yCoord,
    });
    sunkShipCoords.push({
      xCoord: originShipCoord.xCoord,
      yCoord: originShipCoord.yCoord + 1,
    });
    sunkShipCoords.push({
      xCoord: originShipCoord.xCoord,
      yCoord: originShipCoord.yCoord + 2,
    });
    sunkShipCoords.push({
      xCoord: originShipCoord.xCoord,
      yCoord: originShipCoord.yCoord + 3,
    });
    sunkShipCoords.push({
      xCoord: originShipCoord.xCoord,
      yCoord: originShipCoord.yCoord + 4,
    });
    return sunkShipCoords;
  }
};
