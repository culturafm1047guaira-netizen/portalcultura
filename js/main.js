function updateDateTime() {
  const el = document.getElementById('datetime');
  if (!el) return;
  const now = new Date();
  const dias = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
  const meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  el.textContent = `${dias[now.getDay()]}, ${now.getDate()} de ${meses[now.getMonth()]} de ${now.getFullYear()} — ${h}:${m}`;
}

function initNav() {
  document.querySelectorAll('.nav-list a').forEach(function (link) {
    link.addEventListener('click', function () {
      document.querySelectorAll('.nav-list a').forEach(function (l) { l.classList.remove('active'); });
      this.classList.add('active');
    });
  });
}

function initDarkMode() {
  const darkToggle = document.getElementById('darkToggle');
  if (!darkToggle) return;
  const saved = localStorage.getItem('darkMode');
  if (saved === 'true') {
    document.body.classList.add('dark-mode');
    darkToggle.textContent = 'Modo Claro';
  }
  darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    darkToggle.textContent = isDark ? 'Modo Claro' : 'Modo Noturno';
    localStorage.setItem('darkMode', isDark);
  });
}

function initSearch() {
  const searchInput = document.getElementById('search-input');
  if (!searchInput) return;
  let debounceTimer;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      if (typeof searchNews === 'function') {
        searchNews(e.target.value.toLowerCase());
      }
    }, 300);
  });
}

function initCookieConsent() {
  if (localStorage.getItem('cookieConsent')) return;

  const banner = document.createElement('div');
  banner.id = 'cookie-banner';
  banner.innerHTML = `
    <div class="cookie-content">
      <p>Este site utiliza cookies para melhorar sua experiência. Ao continuar navegando, você aceita nossa <a href="sobre/privacidade.html">Política de Privacidade</a>.</p>
      <div class="cookie-actions">
        <button id="cookie-accept" class="cookie-btn cookie-accept">Aceitar</button>
        <button id="cookie-reject" class="cookie-btn cookie-reject">Recusar</button>
      </div>
    </div>
  `;
  document.body.appendChild(banner);

  document.getElementById('cookie-accept').addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'accepted');
    banner.remove();
  });

  document.getElementById('cookie-reject').addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'rejected');
    banner.remove();
  });
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}



async function loadLatestVideo() {
  const container = document.getElementById('youtube-grid');
  if (!container) return;
  try {
    const res = await fetch('/api/youtube');
    const data = await res.json();
    if (data && data.length > 0) {
      container.innerHTML = data.map(item => {
        const title = item.title || 'Vídeo';
        return `<div class="video-card">
          <div class="video-thumb">
            <iframe src="https://www.youtube.com/embed/${item.videoId}?rel=0" title="${title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy"></iframe>
          </div>
          <div class="video-info">
            <p class="video-title">${title}</p>
          </div>
        </div>`;
      }).join('');
    }
  } catch (e) {
    if (container) container.innerHTML = '<p style="color:#999;padding:20px;text-align:center;grid-column:1/-1;">Vídeos não disponíveis.</p>';
  }
}

async function loadPublicities() {
  try {
    const res = await fetch('/api/publicities');
    const images = await res.json();
    if (images.length > 0) {
      const ads = document.querySelectorAll('.ad-sidebar-item');
      if (ads.length > 0) {
        const shuffled = shuffleArray(images);
        ads.forEach((slot, idx) => {
          slot.innerHTML = `<img src="${shuffled[idx % shuffled.length]}" alt="Publicidade" style="width:100%;height:100%;object-fit:cover;border-radius:4px;">`;
        });
      }
    }
  } catch (e) {}
}

function initAdCarousel() {
  loadPublicities();
}

document.addEventListener('DOMContentLoaded', () => {
  updateDateTime();
  setInterval(updateDateTime, 30000);
  initNav();
  initDarkMode();
  initSearch();
  initCookieConsent();
  initAdCarousel();
  loadLatestVideo();

  if (typeof loadWeather === 'function') loadWeather();
  if (typeof loadQuotes === 'function') loadQuotes();
  if (typeof loadNews === 'function') loadNews();
});