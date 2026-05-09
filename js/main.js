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

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const AD_IMAGES = [
  'Publicidades/695137343_1594011305875685_2671613299520675503_n.jpg',
  'Publicidades/695723767_1594029982540484_5155839151683909051_n.jpg',
  'Publicidades/691642978_1594049385871877_4008527651999033838_n.jpg',
  'Publicidades/687869786_1594075342535948_7987352515746485711_n.jpg',
  'Publicidades/694238460_1594307092512773_4582419456924479013_n.jpg',
  'Publicidades/689480459_1594339595842856_6129728409166615819_n.jpg',
  'Publicidades/689015417_1594341185842697_183923677762665033_n.jpg',
  'Publicidades/689017214_1594348509175298_4456900424267510675_n.jpg',
  'Publicidades/689684190_1594349409175208_2207779259793205794_n.jpg',
  'Publicidades/691467767_1594365579173591_3516344270082776644_n.jpg',
  'Publicidades/690772797_1594386799171469_6423740825005398707_n.jpg'
];

function initAdCarousel() {
  const ads = document.querySelectorAll('.ad-sidebar-item');
  if (ads.length === 0) return;
  const shuffled = shuffleArray(AD_IMAGES);
  ads.forEach((slot, idx) => {
    const src = shuffled[idx % shuffled.length];
    slot.innerHTML = `<img src="${src}" alt="Publicidade" style="width:100%;height:100%;object-fit:cover;border-radius:4px;">`;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  updateDateTime();
  setInterval(updateDateTime, 30000);
  initNav();
  initDarkMode();
  initSearch();
  initCookieConsent();
  initAdCarousel();

  if (typeof loadWeather === 'function') loadWeather();
  if (typeof loadQuotes === 'function') loadQuotes();
  if (typeof loadNews === 'function') loadNews();
});

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
