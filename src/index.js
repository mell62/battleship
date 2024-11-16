import "./styles/style.css";
import "./styles/modern-normalize.css";

import {
  placePlayerShips,
  placeComputerShips,
  doComputerAttack,
} from "./barrel";

const computerBoard = document.querySelector(".computer-board");
const playerBoard = document.querySelector(".player-board");

placeComputerShips();
playerBoard.addEventListener("click", (event) => placePlayerShips(event));
computerBoard.addEventListener("click", (event) => doComputerAttack(event));
