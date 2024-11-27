export {
  playerFactory,
  doAttack,
  getSunkShipCoords,
} from "./components/player";
export { shipFactory } from "./components/ship";
export { gameBoardFactory } from "./components/gameboard/gameBoard";
export {
  renderPlayerBoard,
  renderComputerBoard,
  disablePlayerShipButton,
  removePlayerShipsInterface,
  updateStartGameMessage,
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
