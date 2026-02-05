let energy = 100;
let doorClosed = false;
let currentCamera = 1;

// Animatrônico
let animatronicPos = 1; // começa na cam 1
let gameRunning = true;

// Elementos
const energyDisplay = document.getElementById("energy");
const doorBtn = document.getElementById("doorBtn");
const camImg = document.getElementById("cameraImage");
const gameOverScreen = document.getElementById("gameOver");

// Porta
doorBtn.onclick = () => {
  doorClosed = !doorClosed;
  doorBtn.textContent = doorClosed ? "Porta: Fechada" : "Porta: Aberta";
};

// Câmeras
function setCamera(cam) {
  currentCamera = cam;
  updateCamera();
}

function updateCamera() {
  if (animatronicPos === currentCamera) {
    camImg.src = "Imagem_do_personagem_Pintinho_Amarelinho.webp";
  } else {
    camImg.src = `images/cam${currentCamera}.png`;
  }
}

// Energia
setInterval(() => {
  if (!gameRunning) return;

  let drain = doorClosed ? 2 : 1;
  energy -= drain;

  if (energy <= 0) {
    doorClosed = false;
    doorBtn.textContent = "Porta: Sem Energia";
  }

  energyDisplay.textContent = Math.max(energy, 0);

  if (energy <= -10) {
    gameOver();
  }
}, 1000);

// Movimento do animatrônico
setInterval(() => {
  if (!gameRunning) return;

  if (Math.random() < 0.5) {
    animatronicPos++;

    if (animatronicPos > 2) {
      // chegou na porta
      if (!doorClosed) {
        gameOver();
      } else {
        animatronicPos = 1; // recua
      }
    }
    updateCamera();
  }
}, 4000);

// Game Over
function gameOver() {
  gameRunning = false;
  gameOverScreen.classList.remove("hidden");
}
