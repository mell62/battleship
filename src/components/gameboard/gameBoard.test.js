import { gameBoardFactory } from "./gameBoard";

test("place carrier horizontal", () => {
  const playerBoard = gameBoardFactory();
  playerBoard.placeShip("Carrier", "0", "0", "horizontal");
  expect(playerBoard.getBoard().get("0,0")).toEqual("Carrier");
  expect(playerBoard.getBoard().get("1,0")).toEqual("Carrier");
  expect(playerBoard.getBoard().get("2,0")).toEqual("Carrier");
  expect(playerBoard.getBoard().get("3,0")).toEqual("Carrier");
  expect(playerBoard.getBoard().get("4,0")).toEqual("Carrier");
});

test("place carrier vertical", () => {
  const playerBoard = gameBoardFactory();
  playerBoard.placeShip("Carrier", "0", "0", "vertical");
  expect(playerBoard.getBoard().get("0,0")).toEqual("Carrier");
  expect(playerBoard.getBoard().get("0,1")).toEqual("Carrier");
  expect(playerBoard.getBoard().get("0,2")).toEqual("Carrier");
  expect(playerBoard.getBoard().get("0,3")).toEqual("Carrier");
  expect(playerBoard.getBoard().get("0,4")).toEqual("Carrier");
});

test("place patrol boat horizontal", () => {
  const playerBoard = gameBoardFactory();
  playerBoard.placeShip("Patrol Boat", "0", "0", "horizontal");
  expect(playerBoard.getBoard().get("0,0")).toEqual("Patrol Boat");
  expect(playerBoard.getBoard().get("1,0")).toEqual("Patrol Boat");
});

test("place patrol boat vertical", () => {
  const playerBoard = gameBoardFactory();
  playerBoard.placeShip("Patrol Boat", "0", "0", "vertical");
  expect(playerBoard.getBoard().get("0,0")).toEqual("Patrol Boat");
  expect(playerBoard.getBoard().get("0,1")).toEqual("Patrol Boat");
});

test("check non-carrier cell horizontal", () => {
  const playerBoard = gameBoardFactory();
  playerBoard.placeShip("Carrier", "0", "0", "horizontal");
  expect(playerBoard.getBoard().get("5,0")).toEqual(undefined);
});

test("check non-patrol boat cell horizontal", () => {
  const playerBoard = gameBoardFactory();
  playerBoard.placeShip("Patrol Boat", "0", "0", "horizontal");
  expect(playerBoard.getBoard().get("3,0")).toEqual(undefined);
});

test("receive battleship attack hit 1", () => {
  const playerBoard = gameBoardFactory();
  playerBoard.placeShip("Battleship", "0", "0", "horizontal");
  playerBoard.receiveAttack("1", "0");
  expect(playerBoard.getBoard().get("1,0")).toEqual("Hit");
});

test("receive battleship attack hit 2", () => {
  const playerBoard = gameBoardFactory();
  playerBoard.placeShip("Battleship", "0", "0", "horizontal");
  playerBoard.receiveAttack("3", "0");
  expect(playerBoard.getBoard().get("3,0")).toEqual("Hit");
});

test("receive battleship attack miss", () => {
  const playerBoard = gameBoardFactory();
  playerBoard.placeShip("Battleship", "0", "0", "vertical");
  playerBoard.receiveAttack("3", "0");
  expect(playerBoard.getBoard().get("3,0")).toEqual("Miss");
});
