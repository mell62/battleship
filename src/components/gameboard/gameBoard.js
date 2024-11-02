export { gameBoardFactory };
import shipFactory from "../ship";

function gameBoardFactory() {
  let board = new Map();
  let shipsList = [];

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
          continue;
        }
        if (direction === "vertical") {
          yCoord += 1;
          counter += 1;
          continue;
        }
      }
    }
  };

  const getShipObject = function getShipObjectFromName(shipName) {
    const shipObject = shipsList.filter((ship) => {
      return ship.getShipName() === shipName;
    });
    return shipObject[0];
  };

  const receiveAttack = function receiveAttack(xCoord, yCoord) {
    const element = board.get(`${xCoord},${yCoord}`);
    if (!element) {
      board.set(`${xCoord},${yCoord}`, "Miss");
      return;
    }
    if (element !== "Miss" && element !== "Hit") {
      board.set(`${xCoord},${yCoord}`, "Hit");
      getShipObject(element).hit();
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

  return { getBoard, placeShip, receiveAttack, ifAllShipsSunk };
}
