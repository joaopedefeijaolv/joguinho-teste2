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
  // Se o animatrônico estiver nessa câmera
  if (animatronicPos === currentCamera) {
    camImg.src = "images/Imagem_do_personagem_Pintinho_Amarelinho.webp";
    return;
  }

  // Câmeras normais
  if (currentCamera === 1) {
    camImg.src = "images/file_00000000ec4c71f5b3611d505174c5eb.png";
  } else if (currentCamera === 2) {
    camImg.src = "images/file_00000000ec4c71f5b3611d505174c5eb.png";
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

  if (Math.random() < 0.3) { // menos chance de andar
    animatronicPos++;

    if (animatronicPos > 2) {
      if (!doorClosed) {
        gameOver();
      } else {
        animatronicPos = 2; // recua só um pouco
      }
    }
    updateCamera();
  }
}, 7000); // anda a cada 7 segundos

// Game Over
function gameOver() {
  gameRunning = false;
  gameOverScreen.classList.remove("hidden");
}
