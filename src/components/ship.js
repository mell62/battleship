export { shipFactory };

function shipFactory(shipName) {
  let length;
  const name = shipName;
  let hits = 0;

  const setLength = function setLength(num) {
    length = num;
  };

  const getLength = function getLength() {
    return length;
  };

  const hit = function increaseHit() {
    hits += 1;
  };

  const isSunk = function determineIfSunk() {
    if (hits === length) {
      return true;
    }
    return false;
  };

  const getShipName = function getShipName() {
    return name;
  };

  if (shipName === "Carrier") {
    setLength(5);
  }
  if (shipName === "Battleship") {
    setLength(4);
  }
  if (shipName === "Destroyer") {
    setLength(3);
  }
  if (shipName === "Submarine") {
    setLength(3);
  }
  if (shipName === "Patrol Boat") {
    setLength(2);
  }

  return { getLength, hit, isSunk, getShipName };
}
