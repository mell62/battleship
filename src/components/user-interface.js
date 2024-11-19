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

const playerShipsElements = document.querySelector(".player-ships-container");
const playerShipsButtons = Array.from(
  playerShipsElements.querySelectorAll(".player-ship"),
);

const gameMessageEle = document.querySelector(".game-message");

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
    coordEle.textContent = "O";
    if (gameBoard.getBoard().get(coordBoard) === "Hit") {
      coordEle.style.backgroundColor = "red";
      return;
    }
  });

  missedCoords.forEach((coord) => {
    const coordClass = `${coord.xCoord}-${coord.yCoord}`;
    const coordEle = findCoordEle(playerBoardCoords, coordClass);
    coordEle.style.backgroundColor = "#16161a";
    coordEle.textContent = "X";
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
      coordEle.style.backgroundColor = "red";
      return;
    }
    coordEle.textContent = "O";
  });

  missedCoords.forEach((coord) => {
    const coordClass = `${coord.xCoord}-${coord.yCoord}`;
    const coordEle = findCoordEle(computerBoardCoords, coordClass);
    coordEle.style.backgroundColor = "#16161a";
    coordEle.textContent = "X";
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
