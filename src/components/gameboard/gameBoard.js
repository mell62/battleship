export { gameBoardFactory };
import { shipFactory } from "../ship";

function gameBoardFactory() {
  let board = new Map();
  let shipsList = [];
  let shipsPlacement = [];
  let missedCoords = [];
  let hits = 0;

  const getBoard = function getBoard() {
    return board;
  };

  const ifExceedBoard = function ifExceedBoard(
    shipLength,
    xCoord,
    yCoord,
    direction,
  ) {
    if (direction === "horizontal") {
      if (xCoord + shipLength - 1 > 9) {
        return true;
      }
      return false;
    }
    if (yCoord + shipLength - 1 > 9) {
      return true;
    }
    return false;
  };

  const ifNextToShip = function ifNextToShip(
    shipLength,
    xCoord,
    yCoord,
    direction,
  ) {
    if (shipLength === 0) {
      return false;
    }
    let upElement = `${xCoord},${yCoord - 1}`;
    let rightElement = `${xCoord + 1},${yCoord}`;
    let downElement = `${xCoord},${yCoord + 1}`;
    let leftElement = `${xCoord - 1},${yCoord}`;
    const ships = [
      "Carrier",
      "Battleship",
      "Destroyer",
      "Submarine",
      "Patrol Boat",
    ];
    if (direction === "horizontal") {
      if (
        ships.includes(board.get(upElement)) ||
        ships.includes(board.get(rightElement)) ||
        ships.includes(board.get(downElement)) ||
        ships.includes(board.get(leftElement))
      ) {
        return true;
      }
      return ifNextToShip(shipLength - 1, xCoord + 1, yCoord, direction);
    }
    if (
      ships.includes(board.get(upElement)) ||
      ships.includes(board.get(rightElement)) ||
      ships.includes(board.get(downElement)) ||
      ships.includes(board.get(leftElement))
    ) {
      return true;
    }
    return ifNextToShip(shipLength - 1, xCoord, yCoord + 1, direction);
  };

  const recordPlacement = function recordShipsPlacement(
    xCoord,
    yCoord,
    direction,
    shipName,
  ) {
    shipsPlacement.push({ xCoord, yCoord, direction, shipName });
  };

  const getShipsCoords = function getShipsCoords() {
    return shipsPlacement;
  };

  const getMissedCoords = function getMissedCoords() {
    return missedCoords;
  };

  const placeShip = function placeShip(shipName, xCoord, yCoord, direction) {
    const ship = shipFactory(shipName);
    shipsList.push(ship);
    const length = ship.getLength();
    let counter = 0;
    xCoord = Number(xCoord);
    yCoord = Number(yCoord);
    if (
      !board.get(`${xCoord},${yCoord}`) &&
      !ifExceedBoard(length, xCoord, yCoord, direction) &&
      !ifNextToShip(length, xCoord, yCoord, direction)
    ) {
      while (counter < length) {
        board.set(`${xCoord},${yCoord}`, shipName);
        if (direction === "horizontal") {
          xCoord += 1;
          counter += 1;
          recordPlacement(xCoord - 1, yCoord, direction, ship.getShipName());
          continue;
        }
        if (direction === "vertical") {
          yCoord += 1;
          counter += 1;
          recordPlacement(xCoord, yCoord - 1, direction, ship.getShipName());
          continue;
        }
      }
    }
  };

  const getShipObject = function getShipObjectFromName(shipName) {
    const shipObject = shipsList.filter(
      (ship) => ship.getShipName() === shipName,
    );
    return shipObject[0];
  };

  const filterCoordsOutsideBoard = function filterCoordsOutsideBoard(
    arrayOfArrays,
  ) {
    arrayOfArrays = arrayOfArrays.filter((coords) => {
      return coords.every((coord) => coord >= 0 && coord < 10);
    });
    return arrayOfArrays;
  };

  const markAdjacentMissIfSunk = function markAdjacentMissIfSunk(board, ship) {
    if (ship.isSunk()) {
      const shipPlacement = getShipsCoords().find(
        (obj) => obj.shipName === ship.getShipName(),
      );
      let shipLength = ship.getLength();
      let currentXCoord = shipPlacement.xCoord;
      let currentYCoord = shipPlacement.yCoord;
      while (shipLength > 0) {
        if (shipPlacement.direction === "horizontal") {
          let targetCoords = [
            [currentXCoord + 1, currentYCoord],
            [currentXCoord - 1, currentYCoord],
            [currentXCoord, currentYCoord + 1],
            [currentXCoord, currentYCoord - 1],
          ];
          targetCoords = filterCoordsOutsideBoard(targetCoords);
          targetCoords.forEach((coord) => {
            if (!board.get(`${coord[0]},${coord[1]}`)) {
              board.set(`${coord[0]},${coord[1]}`, "Miss");
              missedCoords.push({ xCoord: coord[0], yCoord: coord[1] });
            }
          });
          shipLength -= 1;
          currentXCoord += 1;
          continue;
        }
        let targetCoords = [
          [currentXCoord + 1, currentYCoord],
          [currentXCoord - 1, currentYCoord],
          [currentXCoord, currentYCoord + 1],
          [currentXCoord, currentYCoord - 1],
        ];
        targetCoords = filterCoordsOutsideBoard(targetCoords);
        targetCoords.forEach((coord) => {
          if (!board.get(`${coord[0]},${coord[1]}`)) {
            board.set(`${coord[0]},${coord[1]}`, "Miss");
            missedCoords.push({ xCoord: coord[0], yCoord: coord[1] });
          }
        });
        shipLength -= 1;
        currentYCoord += 1;
      }
    }
  };

  const receiveAttack = function receiveAttack(xCoord, yCoord) {
    const element = board.get(`${xCoord},${yCoord}`);
    if (!element) {
      board.set(`${xCoord},${yCoord}`, "Miss");
      missedCoords.push({ xCoord, yCoord });
      return;
    }
    if (element !== "Miss" && element !== "Hit") {
      board.set(`${xCoord},${yCoord}`, "Hit");
      getShipObject(element).hit();
      hits += 1;
      markAdjacentMissIfSunk(board, getShipObject(element));
    }
  };

  const ifAllShipsSunk = function ifAllShipsSunk() {
    let afloatShips = shipsList.filter((ship) => {
      return ship.isSunk() === false;
    });
    if (afloatShips.length) {
      return false;
    }
    return true;
  };

  const getNumberOfSunkShips = function getNumberOfSunkShips() {
    let sunkShips = shipsList.filter((ship) => {
      return ship.isSunk() === true;
    });
    return sunkShips.length;
  };

  const getHits = function getHits() {
    return hits;
  };

  return {
    getBoard,
    placeShip,
    receiveAttack,
    ifAllShipsSunk,
    getShipsCoords,
    getMissedCoords,
    getHits,
    getNumberOfSunkShips,
  };
}
