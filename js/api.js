const API_CONFIG = {
  quotes: 'https://economia.awesomeapi.com.br/last/'
};

let allNewsData = [];
let newsLoaded = false;

function showLoading(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = `
    <div class="loading-skeleton" style="height: 130px; margin-bottom: 16px;"></div>
    <div class="loading-skeleton" style="height: 130px; margin-bottom: 16px;"></div>
    <div class="loading-skeleton" style="height: 130px;"></div>`;
}

function showError(containerId, message = 'Erro ao carregar') {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = `<div class="error-state">${message}</div>`;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text || '';
  return div.innerHTML;
}

function timeAgo(date) {
  const diff = Date.now() - date;
  const min = Math.floor(diff / 60000);
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(diff / 86400000);
  if (min < 1) return 'Agora';
  if (min < 60) return min + 'min atrás';
  if (h < 24) return h + 'h atrás';
  return d + 'd atrás';
}

function badgeClass(cat) {
  const map = {
    'Regional': 'badge-regional',
    'Brasil': 'badge-brasil',
    'Educação': 'badge-educacao',
    'Justiça': 'badge-justica',
    'Saúde': 'badge-saude',
    'Esportes': 'badge-esportes',
    'Facebook': 'badge-facebook'
  };
  return map[cat] || 'badge-brasil';
}

function catClass(cat) {
  const map = {
    'Regional': 'cat-regional',
    'Brasil': 'cat-brasil',
    'Educação': 'cat-educacao',
    'Justiça': 'cat-justica',
    'Saúde': 'cat-saude',
    'Esportes': 'cat-esportes',
    'Facebook': 'cat-facebook'
  };
  return map[cat] || '';
}

function srcClass(cat) {
  const map = {
    'Regional': 'src-regional',
    'Brasil': 'src-brasil',
    'Educação': 'src-educacao',
    'Justiça': 'src-justica',
    'Saúde': 'src-saude',
    'Esportes': 'src-esportes',
    'Facebook': 'src-facebook'
  };
  return map[cat] || '';
}

function createCard(item) {
  const ago = timeAgo(item.pubDate);
  if (!item.image) {
    return `
      <article class="news-card no-image" style="--nc: var(--cat-${(item.category || 'brasil').toLowerCase()}, var(--dark-bg))">
        <a href="${item.link}" target="_blank" rel="noopener noreferrer">
          <div class="card-body">
            <h3 class="card-title">"${escapeHtml(item.title)}"</h3>
            <div class="card-meta">
              <span class="source">${escapeHtml(item.source)}</span>
              <span>${ago}</span>
            </div>
          </div>
        </a>
      </article>`;
  }
  return `
    <article class="news-card">
      <a href="${item.link}" target="_blank" rel="noopener noreferrer">
        <div class="card-image ${catClass(item.category)}">
          <img src="${item.image}" alt="${escapeHtml(item.title)}" loading="lazy" onerror="this.style.display='none'">
          <span class="badge ${badgeClass(item.category)}">${escapeHtml(item.category)}</span>
        </div>
        <div class="card-body">
          <h3 class="card-title">${escapeHtml(item.title)}</h3>
          <div class="card-meta">
            <span class="source ${srcClass(item.category)}">${escapeHtml(item.source)}</span>
            <span>${ago}</span>
          </div>
        </div>
      </a>
    </article>`;
}

async function fetchWithTimeout(url, timeout = 10000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    return res;
  } catch (e) {
    clearTimeout(id);
    throw e;
  }
}

async function loadWeather() {
  const widget = document.getElementById('weather-widget');
  if (!widget) return;
  try {
    const res = await fetch('/api/weather');
    const data = await res.json();
    widget.innerHTML = `
      <div class="clima-row">
        <div class="clima-icon">⛅</div>
        <div class="clima-temp">${data.temp}</div>
        <div class="clima-info"><strong>${data.condition}</strong><span>Guaíra, SP</span></div>
      </div>`;
  } catch (e) {
    widget.innerHTML = `
      <div class="clima-row">
        <div class="clima-icon">❌</div>
        <div class="clima-info"><strong>Clima indisponível</strong><span>Guaíra, SP</span></div>
      </div>`;
  }
}

async function loadQuotes() {
  const container = document.getElementById('agro-quotes');
  if (!container) return;
  try {
    const res = await fetchWithTimeout(API_CONFIG.quotes + 'USD-BRL,EUR-BRL');
    const data = await res.json();
    const usd = parseFloat(data.USDBRL?.bid || 0).toFixed(2).replace('.', ',');
    const eur = parseFloat(data.EURBRL?.bid || 0).toFixed(2).replace('.', ',');
    const usdUp = parseFloat(data.USDBRL?.pctChange || 0) >= 0;
    const eurUp = parseFloat(data.EURBRL?.pctChange || 0) >= 0;
    container.innerHTML = [
      { l: 'Dólar', v: `R$ ${usd}`, up: usdUp },
      { l: 'Euro', v: `R$ ${eur}`, up: eurUp },
      { l: 'Soja (sc)', v: 'R$ 132,50', up: true },
      { l: 'Milho (sc)', v: 'R$ 58,20', up: false },
      { l: 'Boi Gordo', v: 'R$ 225,00', up: null }
    ].map(q => `
      <div class="cot-row">
        <span class="cot-label">${q.l}</span>
        <div class="cot-right">
          <span class="cot-val">${q.v}</span>
          <span class="${q.up === null ? 'cot-nt' : q.up ? 'cot-up' : 'cot-dn'}">${q.up === null ? '—' : q.up ? '▲' : '▼'}</span>
        </div>
      </div>`).join('') + '<p class="cot-note">CEPEA/B3 · BCB · Referência</p>';
  } catch (e) {
    container.innerHTML = '<div class="cot-row"><span class="cot-label">Cotações indisponíveis</span></div>';
  }
}

const API_BASE = '';

async function loadNews() {
  const newsGrid = document.getElementById('news-grid');
  if (newsGrid) showLoading('news-grid');
  try {
    const res = await fetch(API_BASE + '/api/news');
    const data = await res.json();
    allNewsData = data.map(item => ({ ...item, pubDate: new Date(item.pubDate) }));
    allNewsData.sort((a, b) => b.pubDate - a.pubDate);
    newsLoaded = true;
    renderAll(allNewsData);

    if (allNewsData.length > 0) {
      const bn = document.getElementById('breakingNews');
      const bt = document.getElementById('breakingText');
      if (bn && bt) {
        bn.style.display = 'block';
        bt.textContent = allNewsData[0].title;
      }
    }
  } catch (e) {
    if (newsGrid) showError('news-grid', 'Erro ao carregar notícias. Tente novamente.');
  }
}

function renderAll(data) {
  if (data.length === 0) return;

  const hero = data[0];
  const heroImage = document.querySelector('.hero-image');
  if (heroImage) {
    heroImage.style.background = 'linear-gradient(145deg, var(--dark-bg), #1a3a5c)';
    if (hero.image) {
      heroImage.innerHTML = `
        <img src="${hero.image}" alt="${escapeHtml(hero.title)}" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0" onerror="this.style.display='none'">
        <div class="hero-image-overlay"></div>
        <div class="hero-badge"><span class="badge ${badgeClass(hero.category)}">${hero.category}</span></div>`;
    }
  }

  const setText = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  setText('hero-category', hero.category);
  setText('hero-title', hero.title);
  setText('hero-desc', hero.excerpt);
  setText('hero-source', hero.source);
  setText('hero-time', timeAgo(hero.pubDate));
  const heroLink = document.getElementById('hero-link');
  if (heroLink) heroLink.href = hero.link;

  const render = (id, items) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = items.map(createCard).join('') || '<p style="color:#999;padding:8px">Sem notícias.</p>';
  };

  render('news-grid', data.slice(1, 7));
  render('esportes-grid', data.filter(i => i.category === 'Esportes').slice(0, 3));
  render('brasil-grid', data.filter(i => i.category === 'Brasil').slice(0, 3));
  render('regional-grid', data.filter(i => i.category === 'Regional').slice(0, 3));
  render('facebook-grid', data.filter(i => i.category === 'Facebook').slice(0, 3));

  const ml = document.getElementById('most-read-list');
  if (ml) {
    ml.innerHTML = data.slice(0, 3).map((item, i) => `
      <div class="rank-item">
        <div class="rank-num">${i + 1}</div>
        <a href="${item.link}" target="_blank" class="rank-text">${escapeHtml(item.title)}</a>
      </div>`).join('');
  }

  const ticker = document.getElementById('tickerInner');
  if (ticker) {
    const items = data.slice(0, 10).map(i => `<span>${escapeHtml(i.title)}</span>`).join('');
    ticker.innerHTML = items + items;
  }
}

function searchNews(term) {
  if (!term) {
    renderAll(allNewsData);
    return;
  }
  const filtered = allNewsData.filter(n =>
    n.title.toLowerCase().includes(term) ||
    n.category.toLowerCase().includes(term)
  );
  renderAll(filtered);
}
