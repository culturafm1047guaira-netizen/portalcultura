# Rádio Cultura FM 104.7 — Portal de Notícias

Portal de notícias e hub digital da **Rádio Cultura FM 104.7** de Guaíra-SP. O site agrega conteúdo editorial de múltiplas fontes RSS, exibe indicadores locais e nacionais, transmite o sinal ao vivo e oferece páginas institucionais da emissora.

**Site em produção:** [radioculturaguaira.com.br](https://radioculturaguaira.com.br/)  
**Repositório:** [github.com/culturafm1047guaira-netizen/portalcultura](https://github.com/culturafm1047guaira-netizen/portalcultura)

---

## Sobre o projeto

O portal foi reescrito em **Next.js 15 (App Router)** com React 19 e TypeScript. A versão anterior (HTML/CSS/JS estático servido via Streamlit) foi substituída por uma aplicação full-stack com renderização no servidor, PWA, SEO estruturado e deploy na Vercel.

### O que o portal oferece

| Área | Descrição |
|------|-----------|
| **Homepage** | Hero assinatura com frequência animada (HeroWave), navegação por categorias (CategoryNav), destaque editorial, ticker de manchetes, sidebar com widgets |
| **Player ao vivo** | Stream `ice.fabricahost.com.br/radioculturaguaira` |
| **Notícias** | Agregação de 12+ feeds RSS (G1, Agência Brasil, ACidade ON, Guaira News, etc.) |
| **Economia** | Indicadores do Banco Central (dólar, Selic, inflação, PIX, crédito) |
| **Widgets** | Clima (Open-Meteo), cotações agro, cripto (CoinGecko), Brasileirão, NASA APOD, horóscopo, enquetes |
| **Mídia** | Galeria de vídeos YouTube, charts Deezer, seção ESPN |
| **Institucional** | Programação, Sobre, Contato, Termos, Privacidade, Transparência, Serviços Públicos |
| **Busca** | Filtro por título, resumo ou categoria em `/busca?q=` |
| **PWA** | Manifest, service worker (`@ducanh2912/next-pwa`), modo escuro |

---

## Stack tecnológica

| Camada | Tecnologia |
|--------|------------|
| Framework | Next.js 15, React 19, TypeScript 5 |
| Estilo | Tailwind CSS 4, tokens CSS customizados, `next-themes` |
| Fontes | Bebas Neue + IBM Plex Sans (Google Fonts) |
| Dados | RSS (`rss-parser`), APIs REST públicas e opcionais via env |
| PWA | `@ducanh2912/next-pwa` |
| Testes | Jest (unit/integration), Playwright (E2E) |
| CI/CD | GitHub Actions → Vercel |
| Hospedagem | Vercel (framework Next.js) |

---

## Estrutura do projeto

```
├── src/
│   ├── app/                    # App Router (páginas e API routes)
│   │   ├── page.tsx            # Homepage
│   │   ├── layout.tsx          # Layout raiz, metadata, SEO
│   │   ├── globals.css         # Design tokens e estilos globais
│   │   ├── api/                # Endpoints REST
│   │   │   ├── news/           # GET — lista de notícias (JSON)
│   │   │   ├── economia/       # Indicadores financeiros BCB
│   │   │   ├── horoscopo/      # Horóscopo por signo
│   │   │   ├── nowplaying/     # Metadados do stream
│   │   │   └── revalidate/     # Revalidação ISR (POST autenticado)
│   │   ├── busca/              # Busca de notícias
│   │   ├── economia/           # Página de indicadores
│   │   ├── programacao/        # Grade de programação
│   │   ├── servicos-publicos/  # Links úteis
│   │   ├── sobre/              # Sobre + privacidade
│   │   ├── contato/            # Contato
│   │   ├── termos/             # Termos de uso
│   │   └── transparencia/      # Transparência
│   ├── components/             # UI (Header, HeroWave, CategoryNav, Hero, Player, Sidebar, etc.)
│   └── lib/                    # Integrações e lógica de negócio
│       ├── news.ts             # Agregador RSS principal
│       ├── dados-financeiros.ts
│       ├── weather.ts / openmeteo.ts
│       ├── quotes.ts, coingecko.ts, brasileirao.ts
│       ├── youtube.ts, deezer.ts, espn.ts
│       ├── horoscopo.ts, enquetes.ts
│       └── ...
├── public/
│   ├── manifest.json           # PWA
│   └── img/                    # Logos, ícones, banners
├── tests/
│   ├── unit/                   # Jest
│   ├── integration/            # Jest
│   └── e2e/                    # Playwright
├── scripts/                    # Utilitários (imagens, scheduler, notify)
├── Subpáginas/                 # Conteúdo markdown das páginas institucionais
├── .github/workflows/          # Deploy e revalidação programada
├── vercel.json                 # Headers de segurança
├── next.config.ts              # PWA, CSP, remote images
└── .env.example                # Variáveis de ambiente
```

---

## Pré-requisitos

- **Node.js** 20 LTS (mesma versão do CI)
- **npm** 9+

---

## Configuração

1. Clone o repositório e instale dependências:

```bash
git clone git@github.com:culturafm1047guaira-netizen/portalcultura.git
cd portalcultura
npm ci
```

2. Copie o arquivo de ambiente e preencha as chaves necessárias:

```bash
cp .env.example .env.local
```

### Variáveis de ambiente

| Variável | Obrigatória | Descrição |
|----------|-------------|-----------|
| `YOUTUBE_API_KEY` | Recomendada | Vídeos na galeria ([Google Cloud Console](https://console.cloud.google.com/apis/credentials)) |
| `FACEBOOK_PAGE_ID` | Opcional | Posts da página no feed |
| `FACEBOOK_ACCESS_TOKEN` | Opcional | Token Graph API para Facebook |
| `NEWS_API_KEY` | Opcional | Fonte adicional via [newsapi.org](https://newsapi.org) |
| `NASA_API_KEY` | Opcional | Foto do dia (use `DEMO_KEY` em dev) |
| `UNSPLASH_ACCESS_KEY` | Opcional | Imagens complementares |
| `GA_TRACKING_ID` | Opcional | Google Analytics |
| `REVALIDATION_TOKEN` | Produção | Secret para `POST /api/revalidate` |
| `WEATHER_LOCATION` | Opcional | Local do clima (padrão: `Guaíra,SP`) |
| `CACHE_DURATION_MINUTES` | Opcional | Duração de cache (padrão: 30) |

> Sem chaves opcionais, o portal continua funcionando — widgets dependentes de API simplesmente ficam vazios ou usam fallbacks.

---

## Desenvolvimento local

```bash
# Servidor de desenvolvimento (http://localhost:3000)
npm run dev

# Build de produção
npm run build

# Servidor de produção (após build)
npm start

# Lint
npm run lint
```

A homepage revalida o cache ISR a cada **10 minutos** (`revalidate = 600`).

---

## Testes

```bash
# Todos os testes Jest
npm test

# Apenas unitários
npm run test:unit

# Apenas integração
npm run test:integration

# Cobertura
npm run test:coverage

# E2E com Playwright (sobe o servidor automaticamente)
npx playwright test
```

> **Nota:** parte dos testes e do `tests/COVERAGE.md` ainda referencia a arquitetura antiga (`js/`, `api/*.js`). A suíte precisa ser atualizada para cobrir os módulos em `src/`.

---

## Deploy

### Vercel (recomendado)

1. Conecte o repositório GitHub à Vercel.
2. Configure as variáveis de ambiente no painel (Settings → Environment Variables).
3. O framework é detectado automaticamente como **Next.js**.

Deploy manual via CLI:

```bash
npx vercel --prod
```

### GitHub Actions

- **`deploy.yml`** — roda testes em PRs; deploy em produção no push para `main` (requer secrets `VERCEL_TOKEN`, `VERCEL_PROJECT_ID`, `VERCEL_ORG_ID`).
- **`revalidate.yml`** — cron a cada 2h para atualizar cache da homepage (requer `REVALIDATION_TOKEN` e `SITE_URL`).

### Revalidação manual

```bash
curl -X POST https://radioculturaguaira.com.br/api/revalidate \
  -H "Authorization: Bearer SEU_REVALIDATION_TOKEN"
```

---

## APIs internas

| Rota | Método | Descrição |
|------|--------|-----------|
| `/api/news` | GET | Lista completa de notícias (JSON, cache 10 min) |
| `/api/economia` | GET | Indicadores BCB |
| `/api/horoscopo?signo=aries` | GET | Texto do horóscopo |
| `/api/nowplaying` | GET | Metadados do stream ao vivo |
| `/api/revalidate` | POST | Revalida a homepage (Bearer token) |

---

## Integrações externas

| Serviço | Uso no portal |
|---------|---------------|
| Feeds RSS | G1, Agência Brasil, ACidade ON, Jovem Pan, Guaira News, etc. |
| Open-Meteo | Clima e previsão 7 dias em Guaíra |
| BCB / Olinda | Dólar, Selic, inflação, PIX, crédito |
| AwesomeAPI / cotações | Agronegócio na sidebar |
| CoinGecko | Criptomoedas |
| campeonato-brasileiro-api | Tabela do Brasileirão |
| ESPN | Placares recentes |
| Deezer | Charts musicais |
| YouTube Data API | Galeria de vídeos |
| NASA APOD | Foto astronômica do dia |
| Facebook Graph API | Posts oficiais da rádio |
| FabricaHost | Stream de áudio ao vivo |

---

## Documentação complementar

| Documento | Conteúdo |
|-----------|----------|
| [README_Melhorias.md](./README_Melhorias.md) | Auditoria técnica detalhada (mai/2026) |
| [README_dados_financeiros_brasil.md](./README_dados_financeiros_brasil.md) | Pipeline de indicadores BCB |
| [correções em 29-06-2026.md](./corre%C3%A7%C3%B5es%20em%2029-06-2026.md) | Plano de correções prioritárias |
| [docs/design/homepage-hero-design.md](./docs/design/homepage-hero-design.md) | Design do hero da homepage |
| [tests/COVERAGE.md](./tests/COVERAGE.md) | Relatório de cobertura (legado) |

---

## Auditoria — julho 2026

Resumo do estado atual do repositório após revisão completa:

### Pontos positivos

- Migração concluída para Next.js 15 com App Router, TypeScript e Tailwind 4.
- Agregador RSS robusto com proteção SSRF, enrich de imagens OG e fallbacks por categoria.
- SEO: JSON-LD (Organization, WebSite, NewsArticle), Open Graph, sitemap e robots.txt.
- Segurança: CSP, HSTS, X-Frame-Options nos headers; allowlist de domínios de imagem.
- PWA configurado; modo escuro via `next-themes`.
- Páginas institucionais, busca funcional e links "Ver todas →" apontando para `/busca?q=`.

### Itens corrigidos (jul/2026)

| Item | Situação |
|------|----------|
| README anterior | Descrevia HTML/Streamlit — **corrigido** |
| `deploy.yml` | ✅ Agora valida `next build` em vez de `index.html` |
| `revalidate.yml` | ✅ Agora usa `POST` + `Authorization: Bearer` + `REVALIDATION_TOKEN` |
| `package.json` | ✅ Adicionado script `test:e2e`; corrigido `collectCoverageFrom` |
| `next.config.ts` | ✅ `placehold.co` adicionado ao `remotePatterns` |
| Homepage Hero | ✅ HeroWave (frequência animada 104.7) + CategoryNav integrados |
| `next.config.ts` | ✅ `remotePatterns` atualizado para Next.js 15.5 |
| `scripts/notify.js` | ✅ Token Telegram movido para variáveis de ambiente |
| `.env.example` | ✅ Renomeado `REVALIDATION_SECRET` → `REVALIDATION_TOKEN` |

### Pendências futuras

| Item | Situação |
|------|----------|
| `tests/COVERAGE.md` | Referencia arquivos `js/` e `api/*.js` da versão antiga |
| Assets em `public/img/` | Ícones PWA precisam ser otimizados (481 KB atuais) |
| Testes | Jest/Playwright precisam ser atualizados para a estrutura `src/` |
| Sitemap | Substituir `sitemap.xml` estático por geração dinâmica (`sitemap.ts`)

---

## Licença e créditos

© 2026 **Rádio Cultura FM 104.7** — Guaíra-SP.  
AM 1470 KHz · FM 90,1 MHz · FM 104.7 Portal de Notícias.

Contato: [radioculturadeguaira@gmail.com](mailto:radioculturadeguaira@gmail.com) · (17) 3331-1177
