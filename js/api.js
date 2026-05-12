
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

function sanitizeUrl(url) {
  if (!url) return '#';
  try {
    const parsed = new URL(url);
    if (['http:', 'https:'].includes(parsed.protocol)) return url;
    return '#';
  } catch { return '#'; }
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

const CATEGORY_MAP = {
  'Regional': { badge: 'badge-regional', cat: 'cat-regional', src: 'src-regional' },
  'Brasil': { badge: 'badge-brasil', cat: 'cat-brasil', src: 'src-brasil' },
  'Educação': { badge: 'badge-educacao', cat: 'cat-educacao', src: 'src-educacao' },
  'Justiça': { badge: 'badge-justica', cat: 'cat-justica', src: 'src-justica' },
  'Saúde': { badge: 'badge-saude', cat: 'cat-saude', src: 'src-saude' },
  'Esportes': { badge: 'badge-esportes', cat: 'cat-esportes', src: 'src-esportes' },
  'Facebook': { badge: 'badge-facebook', cat: 'cat-facebook', src: 'src-facebook' }
};

function badgeClass(cat) {
  return CATEGORY_MAP[cat]?.badge || 'badge-brasil';
}

function catClass(cat) {
  return CATEGORY_MAP[cat]?.cat || '';
}

function srcClass(cat) {
  return CATEGORY_MAP[cat]?.src || '';
}

function createCard(item) {
  const ago = timeAgo(item.pubDate);
  if (!item.image) {
    return `
      <article class="news-card no-image">
        <a href="${sanitizeUrl(item.link)}" target="_blank" rel="noopener noreferrer">
          <div class="card-image-fallback" style="background: linear-gradient(135deg, var(--primary), var(--primary-dark)); height: 120px; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 800; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase;">
             ${escapeHtml(item.category)}
          </div>
          <div class="card-body">
            <h3 class="card-title">${escapeHtml(item.title)}</h3>
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
      <a href="${sanitizeUrl(item.link)}" target="_blank" rel="noopener noreferrer">
        <div class="card-image ${catClass(item.category)}">
          <img src="${item.image}" alt="${escapeHtml(item.title)}" loading="lazy" fetchpriority="auto" onerror="this.style.display='none'">
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
    const res = await fetchWithTimeout('/api/weather', 8000);
    const data = await res.json();
    widget.innerHTML = `
      <div class="clima-row">
        <div class="clima-icon">⛅</div>
        <div class="clima-temp">${data.temp}</div>
        <div class="clima-info"><strong>${data.condition}</strong><span>Guaíra, SP</span></div>
      </div>
      ${data.humidity ? `<div class="clima-details"><span>💧 ${data.humidity}</span><span>💨 ${data.wind}</span></div>` : ''}`;
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
    const res = await fetchWithTimeout('/api/quotes', 10000);
    const quotes = await res.json();
    if (!quotes || quotes.length === 0) throw new Error('empty');
    container.innerHTML = quotes.map(q => `
      <div class="cot-row">
        <span class="cot-label">${escapeHtml(q.name)}</span>
        <div class="cot-right">
          <span class="cot-val">${escapeHtml(q.formatted)}</span>
          <span class="${q.up === null ? 'cot-nt' : q.up ? 'cot-up' : 'cot-dn'}">${q.up === null ? '—' : q.up ? '▲' : '▼'}${q.variation !== null ? ` ${Math.abs(q.variation).toFixed(2).replace('.', ',')}%` : ''}</span>
        </div>
      </div>`).join('') + '<p class="cot-note">CEPEA/ESALQ · BCB · Atualização automática</p>';
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
    if (newsGrid) showError('news-grid', 'Erro ao carregar notícias. Tente novamente em alguns minutos.');
  }
}

function retryLoadNews(maxRetries = 3, delay = 2000) {
  let attempts = 0;
  function attempt() {
    attempts++;
    loadNews().then(() => {
      if (!newsLoaded && attempts < maxRetries) {
        setTimeout(attempt, delay);
      }
    });
  }
  attempt();
}

function renderAll(data) {
  if (data.length === 0) return;

  const renderedLinks = new Set(); // Rastreador global de unicidade

  // 1. Destaque (Hero) - 1ª Notícia única
  const hero = data[0];
  renderedLinks.add(hero.link);
  
  const heroImage = document.querySelector('.hero-image');
  if (heroImage) {
    heroImage.style.background = 'linear-gradient(145deg, var(--dark-bg), #1a3a5c)';
    if (hero.image) {
      heroImage.innerHTML = `
        <img src="${hero.image}" alt="${escapeHtml(hero.title)}" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0" fetchpriority="high" onerror="this.style.display='none'">
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

  // Função auxiliar para pegar notícias únicas para um bloco
  const getUniqueNews = (count, filterFn = null) => {
    let filtered = filterFn ? data.filter(filterFn) : data;
    const unique = [];
    for (const item of filtered) {
      if (!renderedLinks.has(item.link)) {
        unique.push(item);
        renderedLinks.add(item.link);
        if (unique.length === count) break;
      }
    }
    return unique;
  };

  const render = (id, items) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = items.map(createCard).join('') || '<p style="color:#999;padding:8px">Sem mais notícias disponíveis.</p>';
  };

  // 2. Últimas Notícias (Grid Geral) - Próximas 8 únicas
  render('news-grid', getUniqueNews(8));

  // 3. Categorias Específicas - Apenas o que ainda não apareceu
  render('esportes-grid', getUniqueNews(4, i => i.category === 'Esportes'));
  render('brasil-grid', getUniqueNews(4, i => i.category === 'Brasil'));
  render('regional-grid', getUniqueNews(4, i => i.category === 'Regional'));
  render('facebook-grid', getUniqueNews(4, i => i.category === 'Facebook'));

  // 4. Mais Lidas (Sidebar) - Top 3 (Pode repetir do topo pois é um ranking separado)
  const ml = document.getElementById('most-read-list');
  if (ml) {
    ml.innerHTML = data.slice(0, 3).map((item, i) => `
      <div class="rank-item">
        <div class="rank-num">${i + 1}</div>
        <a href="${item.link}" target="_blank" class="rank-text">${escapeHtml(item.title)}</a>
      </div>`).join('');
  }

  // 5. Ticker (Rodapé/Topo) - Próximas 10 únicas
  const ticker = document.getElementById('tickerInner');
  if (ticker) {
    const tickerItems = data.filter(i => !renderedLinks.has(i.link)).slice(0, 10);
    const tickerHtml = tickerItems.map(i => `<span>${escapeHtml(i.title)}</span>`).join('');
    ticker.innerHTML = tickerHtml + tickerHtml;
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
