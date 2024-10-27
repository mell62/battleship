export default ship;

const ship = function shipFactory() {
  let length;
  let hits = 0;

  const setLength = function setLength(num) {
    length = num;
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
};
