import {
  getPlayerBoard,
  getComputerBoard,
  ifAllShipsPlaced,
  getSelectedShip,
  getSelectedDirection,
  shipFactory,
} from "../barrel";

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
};

const playerBoardInterface = document.querySelector(".player-board");
const playerBoardCoords = Array.from(
  playerBoardInterface.querySelectorAll("*"),
);
const computerBoardInterface = document.querySelector(".computer-board");
const computerBoardCoords = Array.from(
  computerBoardInterface.querySelectorAll("*"),
);

const playerShipsPlacementInterface = document.querySelector(
  ".player-ship-placement-module",
);
const playerShipsElements = document.querySelector(".player-ships-container");
const playerShipsButtons = Array.from(
  playerShipsElements.querySelectorAll(".player-ship"),
);

const gameMessageEle = document.querySelector(".game-message");

const shipSVG = `<?xml version="1.0" encoding="utf-8"?>
<svg fill="#000000" width="800px" height="800px" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" class="ship-icon"><path d="M15 1V2H17V3H18V4H19V5H20V7H21V15H20V17H19V18H18V19H17V20H15V21H7V20H5V19H4V18H3V17H2V15H1V7H2V5H3V4H4V3H5V2H7V1H15M14 3H8V4H6V5H5V6H4V8H3V14H4V16H5V17H6V18H8V19H14V18H16V17H17V16H18V14H19V8H18V6H17V5H16V4H14V3Z" /></svg>`;
const missSVG = `<?xml version="1.0" encoding="utf-8"?>
<svg fill="#000000" width="800px" height="800px" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" class="miss-icon"><path d="M16 16H14V15H13V14H12V13H10V14H9V15H8V16H6V14H7V13H8V12H9V10H8V9H7V8H6V6H8V7H9V8H10V9H12V8H13V7H14V6H16V8H15V9H14V10H13V12H14V13H15V14H16Z" /></svg>`;
const hitSVG = `<?xml version="1.0" encoding="utf-8"?>
<svg fill="#000000" width="800px" height="800px" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" class="hit-icon"><path d="M14 20H7V19H6V18H5V17H4V12H5V10H6V9H7V8H8V9H9V11H10V9H11V5H10V4H9V3H8V2H11V3H13V4H14V5H15V6H16V7H17V9H18V16H17V18H16V19H14M12 18V17H14V16H15V14H16V10H15V8H14V7H13V11H12V13H11V14H10V15H9V14H8V11H7V12H6V16H7V17H8V18Z" /></svg>`;

const classCoordPattern = /^\d-\d$/;

const disablePlayerShipButton = function disablePlayerShipButton(shipName) {
  if (shipName === "Carrier") {
    const shipBtn = playerShipsButtons.find((btn) =>
      btn.classList.contains("carrier"),
    );
    shipBtn.disabled = true;
  }
  if (shipName === "Battleship") {
    const shipBtn = playerShipsButtons.find((btn) =>
      btn.classList.contains("battleship"),
    );
    shipBtn.disabled = true;
  }
  if (shipName === "Destroyer") {
    const shipBtn = playerShipsButtons.find((btn) =>
      btn.classList.contains("destroyer"),
    );
    shipBtn.disabled = true;
  }
  if (shipName === "Submarine") {
    const shipBtn = playerShipsButtons.find((btn) =>
      btn.classList.contains("submarine"),
    );
    shipBtn.disabled = true;
  }
  if (shipName === "Patrol Boat") {
    const shipBtn = playerShipsButtons.find((btn) =>
      btn.classList.contains("patrol-boat"),
    );
    shipBtn.disabled = true;
  }
};

const findCoordEle = function findCoordEle(coordsArray, coordClass) {
  const coordEle = coordsArray.find((coord) => {
    return coord.classList.contains(coordClass);
  });
  return coordEle;
};

function renderPlayerBoard() {
  const gameBoard = getPlayerBoard();
  const shipCoords = gameBoard.getShipsCoords();
  const missedCoords = gameBoard.getMissedCoords();

  shipCoords.forEach((coord) => {
    const coordBoard = `${coord.xCoord},${coord.yCoord}`;
    const coordClass = `${coord.xCoord}-${coord.yCoord}`;
    const coordEle = findCoordEle(playerBoardCoords, coordClass);

    coordEle.innerHTML = shipSVG;
    coordEle.querySelector("svg").setAttribute("fill", "#2cb67d");
    if (gameBoard.getBoard().get(coordBoard) === "Hit") {
      coordEle.innerHTML = hitSVG;
      coordEle.querySelector("svg").setAttribute("fill", "#e53170");
      return;
    }
  });

  missedCoords.forEach((coord) => {
    const coordClass = `${coord.xCoord}-${coord.yCoord}`;
    const coordEle = findCoordEle(playerBoardCoords, coordClass);
    coordEle.innerHTML = missSVG;
    coordEle.querySelector("svg").setAttribute("fill", "#2cb67d");
  });
}

function renderComputerBoard() {
  const gameBoard = getComputerBoard();
  const shipCoords = gameBoard.getShipsCoords();
  const missedCoords = gameBoard.getMissedCoords();

  shipCoords.forEach((coord) => {
    const coordBoard = `${coord.xCoord},${coord.yCoord}`;
    const coordClass = `${coord.xCoord}-${coord.yCoord}`;
    const coordEle = findCoordEle(computerBoardCoords, coordClass);
    if (gameBoard.getBoard().get(coordBoard) === "Hit") {
      coordEle.innerHTML = hitSVG;
      coordEle.querySelector("svg").setAttribute("fill", "#2cb67d");
      return;
    }
    coordEle.innerHTML = shipSVG;
  });

  missedCoords.forEach((coord) => {
    const coordClass = `${coord.xCoord}-${coord.yCoord}`;
    const coordEle = findCoordEle(computerBoardCoords, coordClass);
    coordEle.innerHTML = missSVG;
    coordEle.querySelector("svg").setAttribute("fill", "#e53170");
  });
}

computerBoardInterface.addEventListener("mouseover", (event) => {
  if (event.target.classList.contains("computer-coord") && ifAllShipsPlaced()) {
    event.target.classList.add("empty-coord-hover");
  }
});

playerBoardInterface.addEventListener("mouseover", (event) => {
  if (event.target.classList.contains("player-coord") && !getSelectedShip()) {
    event.target.classList.remove("ship-selected-hover");
  }
});

playerBoardInterface.addEventListener("mouseover", (event) => {
  if (event.target.classList.contains("player-coord") && getSelectedShip()) {
    playerBoardCoords.forEach((coord) => {
      coord.classList.remove("ship-selected-hover"); // to not let hover style persist when mouse leaves it
      coord.classList.remove("invalid-coord-hover");
    });
    const classes = Array.from(event.target.classList);
    const firstCoord = classes.find((className) =>
      classCoordPattern.test(className),
    );
    const xCoord = Number(firstCoord.slice(0, 1));
    const yCoord = Number(firstCoord.slice(2, 3));
    const length = shipFactory(getSelectedShip()).getLength();
    if (getSelectedDirection() === "horizontal") {
      for (let i = 0; i < length; i++) {
        if (
          playerBoardInterface.querySelector(
            `.${CSS.escape(xCoord + i)}-${yCoord}`,
          )
        ) {
          const targetCoord = playerBoardInterface.querySelector(
            `.${CSS.escape(xCoord + i)}-${yCoord}`,
          );
          targetCoord.classList.add("ship-selected-hover");
        }
      }
      return;
    }
    for (let i = 0; i < length; i++) {
      if (
        playerBoardInterface.querySelector(
          `.${CSS.escape(xCoord)}-${yCoord + i}`,
        )
      ) {
        const targetCoord = playerBoardInterface.querySelector(
          `.${CSS.escape(xCoord)}-${yCoord + i}`,
        );
        targetCoord.classList.add("ship-selected-hover");
      }
    }
  }
});

playerBoardInterface.addEventListener("mouseover", (event) => {
  if (event.target.classList.contains("player-coord") && getSelectedShip()) {
    const classes = Array.from(event.target.classList);
    const firstCoord = classes.find((className) =>
      classCoordPattern.test(className),
    );
    const xCoord = Number(firstCoord.slice(0, 1));
    const yCoord = Number(firstCoord.slice(2, 3));
    const length = shipFactory(getSelectedShip()).getLength();
    const playerBoard = getPlayerBoard();
    if (
      playerBoard.ifNextToShip(
        length,
        xCoord,
        yCoord,
        getSelectedDirection(),
        playerBoard.getBoard(),
      ) ||
      playerBoard.ifExceedBoard(length, xCoord, yCoord, getSelectedDirection())
    ) {
      if (getSelectedDirection() === "horizontal") {
        for (let i = 0; i < length; i++) {
          if (
            playerBoardInterface.querySelector(
              `.${CSS.escape(xCoord + i)}-${yCoord}`,
            )
          ) {
            const targetCoord = playerBoardInterface.querySelector(
              `.${CSS.escape(xCoord + i)}-${yCoord}`,
            );
            targetCoord.classList.add("invalid-coord-hover");
          }
        }
        return;
      }
      for (let i = 0; i < length; i++) {
        if (
          playerBoardInterface.querySelector(
            `.${CSS.escape(xCoord)}-${yCoord + i}`,
          )
        ) {
          const targetCoord = playerBoardInterface.querySelector(
            `.${CSS.escape(xCoord)}-${yCoord + i}`,
          );
          targetCoord.classList.add("invalid-coord-hover");
        }
      }
    }
  }
});

playerBoardInterface.addEventListener("click", (event) => {
  if (event.target.classList.contains("player-coord") && getSelectedShip()) {
    playerBoardCoords.forEach((coord) => {
      coord.classList.remove("ship-selected-hover"); // to remove style once ship has been placed
      coord.classList.remove("invalid-coord-hover");
    });
  }
});

document.addEventListener("mouseover", (event) => {
  if (!event.target.classList.contains("player-coord") && getSelectedShip()) {
    playerBoardCoords.forEach((coord) => {
      coord.classList.remove("ship-selected-hover"); // to not let hover style persist when mouse leaves it
      coord.classList.remove("invalid-coord-hover");
    });
  }
});

playerShipsElements.addEventListener("click", (event) => {
  if (event.target.classList.contains("player-ship")) {
    playerShipsButtons.forEach((shipBtn) => {
      shipBtn.classList.remove("player-ship-focus");
    });
    event.target.classList.add("player-ship-focus");
  }
});

document.addEventListener("click", (event) => {
  if (
    !event.target.classList.contains("direction-btn") &&
    !event.target.classList.contains("player-ship")
  ) {
    playerShipsButtons.forEach((shipBtn) => {
      shipBtn.classList.remove("player-ship-focus");
    });
  }
});

const removePlayerShipsInterface = function removePlayerShipsInterface() {
  playerShipsPlacementInterface.style.opacity = "0";
};

const updateStartGameMessage = function updateStartGameMessage() {
  gameMessageEle.textContent = "Launch your attack on enemy waters!";
};

const updatePlayerMissMessage = function updatePlayerMissMessage() {
  gameMessageEle.textContent = "We missed.";
};

const updatePlayerHitMessage = function updatePlayerHitMessage() {
  gameMessageEle.textContent = "We hit them!";
};

const updatePlayerSinkShipMessage = function updatePlayerSinkShipMessage() {
  gameMessageEle.textContent = "Good job, enemy ship down.";
};

const updatePlayerWinMessage = function updatePlayerWinMessage() {
  gameMessageEle.textContent = "We conquered!";
};

const updateComputerMissMessage = function updateComputerMissMessage() {
  gameMessageEle.textContent = "Enemy missed.";
};

const updateComputerHitMessage = function updateComputerHitMessage() {
  gameMessageEle.textContent = "The enemy hit us.";
};

const updateComputerSinkShipMessage = function updateComputerSinkShipMessage() {
  gameMessageEle.textContent = "Mayday. Our ship is down.";
};

const updateComputerAttackMessage = function updateComputerAttackMessage() {
  gameMessageEle.textContent = "Standing by for enemy engagement...";
};

const updateComputerWinMessage = function updateComputerWinMessage() {
  gameMessageEle.textContent = "We went down, do better next time.";
};
