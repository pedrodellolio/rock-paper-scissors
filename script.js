const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const div = document.getElementById("showWinner");

const numRockInput = document.getElementById("numRock");
const numPaperInput = document.getElementById("numPaper");
const numScissorsInput = document.getElementById("numScissors");

let entities = [];
let animationId;

window.addEventListener("resize", handleResize);

function handleResize() {
  cancelAnimationFrame(animationId);
  context.clearRect(0, 0, canvas.width, canvas.height);
  entities.length = 0;
//   resizeCanvas();
}

// function resizeCanvas() {
//   const container = document.getElementById("container");
//   canvas.width = container.clientWidth;
//   canvas.height = container.clientHeight;
// }

function startSimulation() {
  entities.length = 0;
  for (let i = 0; i < numRockInput.value; i++) {
    const x = Math.random() * (canvas.width - 40) + 20;
    const y = Math.random() * (canvas.height - 40) + 20;
    const dx = (Math.random() - 0.5) * 4;
    const dy = (Math.random() - 0.5) * 4;
    const radius = 20;
    entities.push(new Rock(x, y, dx, dy, radius));
  }

  for (let i = 0; i < numPaperInput.value; i++) {
    const x = Math.random() * (canvas.width - 40) + 20;
    const y = Math.random() * (canvas.height - 40) + 20;
    const dx = (Math.random() - 0.5) * 4;
    const dy = (Math.random() - 0.5) * 4;
    const radius = 20;
    entities.push(new Paper(x, y, dx, dy, radius));
  }

  for (let i = 0; i < numScissorsInput.value; i++) {
    const x = Math.random() * (canvas.width - 40) + 20;
    const y = Math.random() * (canvas.height - 40) + 20;
    const dx = (Math.random() - 0.5) * 4;
    const dy = (Math.random() - 0.5) * 4;
    const radius = 20;
    entities.push(new Scissors(x, y, dx, dy, radius));
  }

  if (animationId) {
    cancelAnimationFrame(animationId);
  }

  animate();
}

function animate() {
  if (!context) return;

  context.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < entities.length; i++) {
    entities[i].update(canvas, entities);
    entities[i].draw(context);
  }

  const isRockWinner = entities.every((entity) => entity instanceof Rock);
  const isPaperWinner = entities.every((entity) => entity instanceof Paper);
  const isScissorsWinner = entities.every(
    (entity) => entity instanceof Scissors
  );

  let winner = "";
  if (isRockWinner) winner += "Rock";
  else if (isPaperWinner) winner += "Paper";
  else if (isScissorsWinner) winner += "Scissors";

  if (winner !== "") {
    console.log(div);
    div.innerHTML = `<p>${winner} wins!</p>`;
    div.style.display = "block";
    canvas.style.opacity = 0.3;
  }

  animationId = requestAnimationFrame(animate);
}
