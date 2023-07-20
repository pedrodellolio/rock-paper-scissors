const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const div = document.getElementById("showWinner");

const numRockInput = document.getElementById("numRock");
const numPaperInput = document.getElementById("numPaper");
const numScissorsInput = document.getElementById("numScissors");

const UPPER_LIMIT = 500;
const LOWER_LIMIT = 0;

let entities = [];
let animationId;

window.addEventListener("resize", handleResize);
window.onload = function () {
  resizeCanvas();
};

function showWinnerOverlay(winnerName) {
  const showWinnerOverlay = document.getElementById("showWinner");
  const winnerNameElement = document.getElementById("winnerName");
  winnerNameElement.textContent = winnerName;
  showWinnerOverlay.style.display = "block";
}

// Function to close the winner overlay
function closeWinnerOverlay() {
  const showWinnerOverlay = document.getElementById("showWinner");
  showWinnerOverlay.style.display = "none";
}

function handleResize() {
  cancelAnimationFrame(animationId);
  context.clearRect(0, 0, canvas.width, canvas.height);
  entities.length = 0;
  resizeCanvas();
}

function resizeCanvas() {
  const container = document.getElementById("container");
  canvas.width = container.clientWidth;
  canvas.height = container.clientHeight;
}

function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

function validateInputs(numRock, numPaper, numScissors) {
  if (!isNumeric(numRock) || !isNumeric(numPaper) || !isNumeric(numScissors))
    return false;

  return (
    numRock >= LOWER_LIMIT &&
    numRock <= UPPER_LIMIT &&
    numPaper >= LOWER_LIMIT &&
    numPaper <= UPPER_LIMIT &&
    numScissors >= LOWER_LIMIT &&
    numScissors <= UPPER_LIMIT
  );
}

function startSimulation() {
  closeWinnerOverlay();

  const areInputsValid = validateInputs(
    numRockInput.value,
    numPaperInput.value,
    numScissorsInput.value
  );

  if (!areInputsValid) {
    alert(
      `Please enter values between ${LOWER_LIMIT} and ${UPPER_LIMIT} for Rock, Paper, and Scissors. \n\nFor smaller screens, it is recommended to use even smaller values to avoid compromising the simulation.`
    );
    return;
  }

  entities.length = 0;
  populateEntities(numRockInput.value, Rock);
  populateEntities(numPaperInput.value, Paper);
  populateEntities(numScissorsInput.value, Scissors);

  if (animationId) {
    cancelAnimationFrame(animationId);
  }

  animate();
}

function populateEntities(numEntities, entityType) {
  for (let i = 0; i < numEntities; i++) {
    const x = Math.random() * (canvas.width - 40) + 20;
    const y = Math.random() * (canvas.height - 40) + 20;
    const dx = (Math.random() - 0.5) * 4;
    const dy = (Math.random() - 0.5) * 4;
    const radius = 20;
    entities.push(new entityType(x, y, dx, dy, radius));
  }
}

function animate() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < entities.length; i++) {
    entities[i].update(canvas, entities);
    entities[i].draw(context);
  }

  const winner = checkWinner();
  if (winner !== "") {
    showWinnerOverlay(winner);
  }

  animationId = requestAnimationFrame(animate);
}

function checkWinner() {
  const isRockWinner = entities.every((entity) => entity instanceof Rock);
  const isPaperWinner = entities.every((entity) => entity instanceof Paper);
  const isScissorsWinner = entities.every(
    (entity) => entity instanceof Scissors
  );

  if (isRockWinner) return "Rock";
  else if (isPaperWinner) return "Paper";
  else if (isScissorsWinner) return "Scissors";
  else return "";
}
