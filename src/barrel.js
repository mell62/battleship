export { playerFactory, doAttack } from "./components/player";
export { shipFactory } from "./components/ship";

export { gameBoardFactory } from "./components/gameboard/gameBoard";
export {
  renderPlayerBoard,
  renderComputerBoard,
  disablePlayerShipButton,
} from "./components/user-interface";
export {
  getPlayerBoard,
  getComputerBoard,
  placePlayerShips,
  placeComputerShips,
  doComputerAttack,
  ifAllShipsPlaced,
  getSelectedShip,
  getSelectedDirection,
} from "./components/gameController";
