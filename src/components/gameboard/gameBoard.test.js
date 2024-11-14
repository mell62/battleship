import { gameBoardFactory } from "./gameBoard";

test("place carrier horizontal", () => {
  const playerBoard = gameBoardFactory();
  playerBoard.placeShip("Carrier", "0", "0", "horizontal");
  expect(playerBoard.getBoard().get("0,0")).toBe("Carrier");
  expect(playerBoard.getBoard().get("1,0")).toBe("Carrier");
  expect(playerBoard.getBoard().get("2,0")).toBe("Carrier");
  expect(playerBoard.getBoard().get("3,0")).toBe("Carrier");
  expect(playerBoard.getBoard().get("4,0")).toBe("Carrier");
});

test("place carrier vertical", () => {
  const playerBoard = gameBoardFactory();
  playerBoard.placeShip("Carrier", "0", "0", "vertical");
  expect(playerBoard.getBoard().get("0,0")).toBe("Carrier");
  expect(playerBoard.getBoard().get("0,1")).toBe("Carrier");
  expect(playerBoard.getBoard().get("0,2")).toBe("Carrier");
  expect(playerBoard.getBoard().get("0,3")).toBe("Carrier");
  expect(playerBoard.getBoard().get("0,4")).toBe("Carrier");
});

test("place patrol boat horizontal", () => {
  const playerBoard = gameBoardFactory();
  playerBoard.placeShip("Patrol Boat", "0", "0", "horizontal");
  expect(playerBoard.getBoard().get("0,0")).toBe("Patrol Boat");
  expect(playerBoard.getBoard().get("1,0")).toBe("Patrol Boat");
});

test("place patrol boat vertical", () => {
  const playerBoard = gameBoardFactory();
  playerBoard.placeShip("Patrol Boat", "0", "0", "vertical");
  expect(playerBoard.getBoard().get("0,0")).toBe("Patrol Boat");
  expect(playerBoard.getBoard().get("0,1")).toBe("Patrol Boat");
});

test("check non-carrier cell horizontal", () => {
  const playerBoard = gameBoardFactory();
  playerBoard.placeShip("Carrier", "0", "0", "horizontal");
  expect(playerBoard.getBoard().get("5,0")).toBe(undefined);
});

test("check non-patrol boat cell horizontal", () => {
  const playerBoard = gameBoardFactory();
  playerBoard.placeShip("Patrol Boat", "0", "0", "horizontal");
  expect(playerBoard.getBoard().get("3,0")).toBe(undefined);
});

test("verify ship placement on already occupied cells", () => {
  const playerBoard = gameBoardFactory();
  playerBoard.placeShip("Patrol Boat", "2", "2", "horizontal");
  playerBoard.placeShip("Destroyer", "3", "2", "vertical");
  expect(playerBoard.getBoard().get("3,2")).toBe("Patrol Boat");
});

test("verify horizontal ship placement at edge of grid 1", () => {
  const playerBoard = gameBoardFactory();
  playerBoard.placeShip("Destroyer", "9", "5", "horizontal");
  expect(playerBoard.getBoard().get("9,5")).toBe(undefined);
});

test("verify horizontal ship placement at edge of grid 2", () => {
  const playerBoard = gameBoardFactory();
  playerBoard.placeShip("Carrier", "6", "4", "horizontal");
  expect(playerBoard.getBoard().get("8,4")).toBe(undefined);
});

test("verify vertical ship placement at edge of grid 1", () => {
  const playerBoard = gameBoardFactory();
  playerBoard.placeShip("Destroyer", "3", "8", "vertical");
  expect(playerBoard.getBoard().get("3,9")).toBe(undefined);
});

test("verify vertical ship placement at edge of grid 2", () => {
  const playerBoard = gameBoardFactory();
  playerBoard.placeShip("Battleship", "7", "7", "vertical");
  expect(playerBoard.getBoard().get("7,9")).toBe(undefined);
});

test("verify horizontal ship placement next to another ship 1", () => {
  const playerBoard = gameBoardFactory();
  playerBoard.placeShip("Submarine", "2", "2", "vertical");
  playerBoard.placeShip("Carrier", "0", "5", "horizontal");
  expect(playerBoard.getBoard().get("0,5")).toBe(undefined);
});

test("verify horizontal ship placement next to another ship 2", () => {
  const playerBoard = gameBoardFactory();
  playerBoard.placeShip("Submarine", "2", "2", "horizontal");
  playerBoard.placeShip("Carrier", "3", "3", "horizontal");
  expect(playerBoard.getBoard().get("4,3")).toBe(undefined);
});

test("verify vertical ship placement next to another ship 1", () => {
  const playerBoard = gameBoardFactory();
  playerBoard.placeShip("Battleship", "5", "4", "vertical");
  playerBoard.placeShip("Patrol Boat", "4", "3", "vertical");
  expect(playerBoard.getBoard().get("4,3")).toBe(undefined);
});

test("verify vertical ship placement next to another ship 2", () => {
  const playerBoard = gameBoardFactory();
  playerBoard.placeShip("Battleship", "1", "8", "horizontal");
  playerBoard.placeShip("Patrol Boat", "3", "6", "vertical");
  expect(playerBoard.getBoard().get("3,7")).toBe(undefined);
});

test("receive battleship attack hit 1", () => {
  const playerBoard = gameBoardFactory();
  playerBoard.placeShip("Battleship", "0", "0", "horizontal");
  playerBoard.receiveAttack("1", "0");
  expect(playerBoard.getBoard().get("1,0")).toBe("Hit");
});

test("receive battleship attack hit 2", () => {
  const playerBoard = gameBoardFactory();
  playerBoard.placeShip("Battleship", "0", "0", "horizontal");
  playerBoard.receiveAttack("3", "0");
  expect(playerBoard.getBoard().get("3,0")).toBe("Hit");
});

test("receive battleship attack miss", () => {
  const playerBoard = gameBoardFactory();
  playerBoard.placeShip("Battleship", "0", "0", "vertical");
  playerBoard.receiveAttack("3", "0");
  expect(playerBoard.getBoard().get("3,0")).toBe("Miss");
});

test("receive battleship attack on missed cell", () => {
  const playerBoard = gameBoardFactory();
  playerBoard.placeShip("Battleship", "0", "0", "vertical");
  playerBoard.receiveAttack("3", "0");
  playerBoard.receiveAttack("3", "0");
  expect(playerBoard.getBoard().get("3,0")).toBe("Miss");
});

test("receive battleship attack on hit cell", () => {
  const playerBoard = gameBoardFactory();
  playerBoard.placeShip("Battleship", "0", "0", "vertical");
  playerBoard.receiveAttack("0", "1");
  playerBoard.receiveAttack("0", "1");
  expect(playerBoard.getBoard().get("0,1")).toBe("Hit");
});

test("verify all 1 ship have sunk", () => {
  const playerBoard = gameBoardFactory();
  playerBoard.placeShip("Submarine", "2", "1", "vertical");
  playerBoard.receiveAttack("2", "1");
  playerBoard.receiveAttack("2", "2");
  playerBoard.receiveAttack("2", "3");
  expect(playerBoard.ifAllShipsSunk()).toBe(true);
});

test("verify all 1 ship did not sink", () => {
  const playerBoard = gameBoardFactory();
  playerBoard.placeShip("Submarine", "2", "1", "vertical");
  playerBoard.receiveAttack("2", "1");
  playerBoard.receiveAttack("2", "2");
  expect(playerBoard.ifAllShipsSunk()).toBe(false);
});

test("verify all 3 ships have sunk", () => {
  const playerBoard = gameBoardFactory();
  playerBoard.placeShip("Carrier", "4", "4", "horizontal");
  playerBoard.placeShip("Submarine", "0", "0", "horizontal");
  playerBoard.placeShip("Patrol Boat", "9", "0", "vertical");
  playerBoard.receiveAttack("4", "4");
  playerBoard.receiveAttack("5", "4");
  playerBoard.receiveAttack("6", "4");
  playerBoard.receiveAttack("7", "4");
  playerBoard.receiveAttack("8", "4");
  playerBoard.receiveAttack("0", "0");
  playerBoard.receiveAttack("1", "0");
  playerBoard.receiveAttack("2", "0");
  playerBoard.receiveAttack("9", "0");
  playerBoard.receiveAttack("9", "1");
  expect(playerBoard.ifAllShipsSunk()).toBe(true);
});

test("verify all 3 ships have not sunk", () => {
  const playerBoard = gameBoardFactory();
  playerBoard.placeShip("Carrier", "4", "4", "horizontal");
  playerBoard.placeShip("Submarine", "0", "0", "horizontal");
  playerBoard.placeShip("Patrol Boat", "9", "0", "vertical");
  playerBoard.receiveAttack("4", "4");
  playerBoard.receiveAttack("5", "4");
  playerBoard.receiveAttack("6", "4");
  playerBoard.receiveAttack("7", "4");
  playerBoard.receiveAttack("0", "0");
  playerBoard.receiveAttack("1", "0");
  playerBoard.receiveAttack("2", "0");
  playerBoard.receiveAttack("9", "1");
  expect(playerBoard.ifAllShipsSunk()).toBe(false);
});

test("verify locations adjacent to sunk ship is marked miss horizontal", () => {
  const playerBoard = gameBoardFactory();
  playerBoard.placeShip("Submarine", "3", "4", "horizontal");
  playerBoard.receiveAttack("3", "4");
  playerBoard.receiveAttack("4", "4");
  playerBoard.receiveAttack("5", "4");
  expect(playerBoard.getBoard().get("2,4")).toBe("Miss");
  expect(playerBoard.getBoard().get("3,3")).toBe("Miss");
  expect(playerBoard.getBoard().get("3,5")).toBe("Miss");
  expect(playerBoard.getBoard().get("4,3")).toBe("Miss");
  expect(playerBoard.getBoard().get("4,5")).toBe("Miss");
  expect(playerBoard.getBoard().get("5,3")).toBe("Miss");
  expect(playerBoard.getBoard().get("5,5")).toBe("Miss");
});

test("verify locations adjacent to sunk ship is marked miss vertical", () => {
  const playerBoard = gameBoardFactory();
  playerBoard.placeShip("Battleship", "7", "1", "vertical");
  playerBoard.receiveAttack("7", "1");
  playerBoard.receiveAttack("7", "2");
  playerBoard.receiveAttack("7", "3");
  playerBoard.receiveAttack("7", "4");
  expect(playerBoard.getBoard().get("7,0")).toBe("Miss");
  expect(playerBoard.getBoard().get("6,1")).toBe("Miss");
  expect(playerBoard.getBoard().get("8,1")).toBe("Miss");
  expect(playerBoard.getBoard().get("6,2")).toBe("Miss");
  expect(playerBoard.getBoard().get("8,2")).toBe("Miss");
  expect(playerBoard.getBoard().get("6,3")).toBe("Miss");
  expect(playerBoard.getBoard().get("8,3")).toBe("Miss");
  expect(playerBoard.getBoard().get("6,4")).toBe("Miss");
  expect(playerBoard.getBoard().get("8,4")).toBe("Miss");
  expect(playerBoard.getBoard().get("7,5")).toBe("Miss");
});

test("verify locations adjacent to sunk ship is marked miss horizontal edge", () => {
  const playerBoard = gameBoardFactory();
  playerBoard.placeShip("Destroyer", "0", "0", "horizontal");
  playerBoard.receiveAttack("0", "0");
  playerBoard.receiveAttack("1", "0");
  playerBoard.receiveAttack("2", "0");
  expect(playerBoard.getBoard().get("-1,0")).toBe(undefined);
  expect(playerBoard.getBoard().get("0,-1")).toBe(undefined);
  expect(playerBoard.getBoard().get("0,1")).toBe("Miss");
  expect(playerBoard.getBoard().get("1,-1")).toBe(undefined);
  expect(playerBoard.getBoard().get("1,1")).toBe("Miss");
  expect(playerBoard.getBoard().get("2,-1")).toBe(undefined);
  expect(playerBoard.getBoard().get("2,1")).toBe("Miss");
});

test("verify locations adjacent to sunk ship is marked miss vertical edge", () => {
  const playerBoard = gameBoardFactory();
  playerBoard.placeShip("Patrol Boat", "9", "8", "vertical");
  playerBoard.receiveAttack("9", "8");
  playerBoard.receiveAttack("9", "9");
  expect(playerBoard.getBoard().get("9,7")).toBe("Miss");
  expect(playerBoard.getBoard().get("8,8")).toBe("Miss");
  expect(playerBoard.getBoard().get("10,8")).toBe(undefined);
  expect(playerBoard.getBoard().get("8,9")).toBe("Miss");
  expect(playerBoard.getBoard().get("10,9")).toBe(undefined);
  expect(playerBoard.getBoard().get("9,10")).toBe(undefined);
});
