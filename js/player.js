let isPlaying = false;
let audioPlayer = null;

function initPlayer() {
  audioPlayer = document.getElementById('audioPlayer');
  const playBtn = document.getElementById('playBtn');
  const visualizer = document.getElementById('visualizer');
  const playerAction = document.getElementById('playerAction');

  if (!playBtn || !audioPlayer) return;

  playBtn.classList.add('paused');

  playBtn.addEventListener('click', togglePlayer);
  audioPlayer.addEventListener('play', () => onPlayStateChange(true));
  audioPlayer.addEventListener('pause', () => onPlayStateChange(false));
  audioPlayer.addEventListener('ended', () => onPlayStateChange(false));
  audioPlayer.addEventListener('error', handleStreamError);
}

function togglePlayer() {
  if (!audioPlayer) return;
  if (isPlaying) {
    audioPlayer.pause();
  } else {
    audioPlayer.play().catch(() => {
        showPlayerError();
      });
  }
}

function onPlayStateChange(playing) {
  isPlaying = playing;
  const playBtn = document.getElementById('playBtn');
  const visualizer = document.getElementById('visualizer');
  const playerAction = document.getElementById('playerAction');

  if (playBtn) {
    if (playing) {
      playBtn.innerHTML = '<svg viewBox="0 0 16 16"><path d="M3 2h4v12H3zm6 0h4v12H9z"/></svg>';
      playBtn.classList.remove('paused');
    } else {
      playBtn.innerHTML = '<svg viewBox="0 0 16 16"><path d="M4 2l10 6-10 6z"/></svg>';
      playBtn.classList.add('paused');
    }
  }

  const playerArea = document.querySelector('.player-area');
  if (playerArea) {
    playerArea.classList.toggle('playing', playing);
  }

  if (visualizer) {
    visualizer.classList.toggle('paused', !playing);
  }

  if (playerAction) {
    playerAction.textContent = playing ? 'Ouvindo agora' : 'Clique para ouvir';
  }
}

function handleStreamError() {
  showPlayerError();
}

function showPlayerError() {
  const playerAction = document.getElementById('playerAction');
  if (playerAction) {
    playerAction.textContent = 'Stream indisponível';
    playerAction.style.color = '#c0392b';
  }
  const playBtn = document.getElementById('playBtn');
  if (playBtn) {
    playBtn.style.opacity = '0.5';
    playBtn.style.pointerEvents = 'none';
  }
}

