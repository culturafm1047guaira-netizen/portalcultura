let isPlaying = false;
let radioPlayer = null;

function initPlayer() {
  radioPlayer = document.getElementById('radioPlayer');
  const playBtn = document.getElementById('playBtn');
  const playIcon = document.getElementById('playIcon');
  const pauseIcon = document.getElementById('pauseIcon');

  if (!playBtn || !radioPlayer) return;

  playBtn.addEventListener('click', togglePlayer);
  radioPlayer.addEventListener('play', () => onPlayStateChange(true));
  radioPlayer.addEventListener('pause', () => onPlayStateChange(false));
  radioPlayer.addEventListener('ended', () => onPlayStateChange(false));
}

function togglePlayer() {
  if (!radioPlayer) return;
  if (isPlaying) {
    radioPlayer.pause();
  } else {
    radioPlayer.play().catch(err => {
      console.error("Erro ao reproduzir stream:", err);
    });
  }
}

function onPlayStateChange(playing) {
  isPlaying = playing;
  const playIcon = document.getElementById('playIcon');
  const pauseIcon = document.getElementById('pauseIcon');
  const playerContainer = document.getElementById('player-container');

  if (playIcon && pauseIcon) {
    playIcon.style.display = playing ? 'none' : 'block';
    pauseIcon.style.display = playing ? 'block' : 'none';
  }

  if (playerContainer) {
    playerContainer.classList.toggle('playing', playing);
  }
}

document.addEventListener('DOMContentLoaded', initPlayer);

