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
