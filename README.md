# Rádio Cultura FM 104.7 — Portal de Notícias

Portal de notícias e hub digital da **Rádio Cultura FM 104.7** de Guaíra-SP. O site agrega conteúdo editorial de múltiplas fontes RSS, exibe indicadores locais e nacionais, transmite o sinal ao vivo e oferece páginas institucionais da emissora.

**Site em produção:** [radioculturaguaira.com.br](https://radioculturaguaira.com.br/)  
**Repositório:** [github.com/culturafm1047guaira-netizen/portalcultura](https://github.com/culturafm1047guaira-netizen/portalcultura)

---

## Sobre o projeto

O portal foi reescrito em **Next.js 15 (App Router)** com React 19 e TypeScript. A versão anterior (HTML/CSS/JS estático servido via Streamlit) foi substituída por uma aplicação full-stack com renderização no servidor, PWA, SEO estruturado e deploy na Vercel.

### O que o portal oferece

> Em out/2026 o front-end foi reconstruído em estilo editorial G1 (globo.com):
> mega-menu por editoria, matérias próprias da redação com CMS, "Mais Lidas"
> real e newsletter. Ver seção [Rebuild G1 (out/2026)](#rebuild-g1-out2026)
> para detalhes e o passo de migração de banco pendente.

| Área | Descrição |
|------|-----------|
| **Homepage** | Hero com frequência animada (HeroWave), mega-menu de editorias no Header, destaque editorial priorizando matérias próprias, ticker de manchetes (com faixa "AO VIVO" para matérias urgentes), sidebar com widgets |
| **Player ao vivo** | Stream `ice.fabricahost.com.br/radioculturaguaira` |
| **Notícias** | Matérias próprias da redação (CMS interno) + agregação de 12+ feeds RSS (G1, Agência Brasil, ACidade ON, Guaira News, etc.), com prioridade para conteúdo próprio |
| **Matéria própria** | Página de leitura em `/noticia/[slug]`, com contador de visualizações |
| **Editorias** | Páginas `/categoria/[slug]` (Regional, Brasil, Esportes, Educação, Saúde, Justiça) |
| **CMS da redação** | Painel em `/admin/materias` — criar/editar matérias, upload de capa, agendamento, marcação "Urgente" |
| **Economia** | Indicadores do Banco Central (dólar, Selic, inflação, PIX, crédito) |
| **Widgets** | Clima (Open-Meteo), cotações agro, cripto (CoinGecko), Brasileirão, NASA APOD, horóscopo, enquetes, "Mais Lidas" (por visualizações reais), newsletter |
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
| Backend / CMS | Supabase (Postgres + Auth + Storage) — matérias próprias, perfis de redator, newsletter |
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
│   │   │   ├── newsletter/     # POST — inscrição na newsletter
│   │   │   ├── articles/[slug]/view/  # POST — incrementa views_count
│   │   │   └── revalidate/     # Revalidação ISR (POST autenticado)
│   │   ├── noticia/[slug]/     # Página de leitura de matéria própria
│   │   ├── categoria/[slug]/   # Páginas por editoria (Regional, Brasil, Esportes...)
│   │   ├── admin/              # Login + CMS protegido (materias: listar/criar/editar)
│   │   ├── busca/              # Busca de notícias
│   │   ├── economia/           # Página de indicadores
│   │   ├── programacao/        # Grade de programação
│   │   ├── servicos-publicos/  # Links úteis
│   │   ├── sobre/              # Sobre + privacidade
│   │   ├── contato/            # Contato
│   │   ├── termos/             # Termos de uso
│   │   └── transparencia/      # Transparência
│   ├── components/             # UI (Header com mega-menu, EditoriaSection, NewsCard, HeroWave, Hero, Player, Sidebar, Newsletter, etc.)
│   └── lib/                    # Integrações e lógica de negócio
│       ├── categories.ts       # Fonte única de editorias/cores/slugs
│       ├── news.ts             # Agregador RSS + matérias próprias (getOwnArticles)
│       ├── supabase/           # Clients Supabase (browser, server, admin/service-role)
│       ├── dados-financeiros.ts
│       ├── weather.ts / openmeteo.ts
│       ├── quotes.ts, coingecko.ts, brasileirao.ts
│       ├── youtube.ts, deezer.ts, espn.ts
│       ├── horoscopo.ts, enquetes.ts
│       └── ...
├── supabase/
│   ├── schema.sql              # Schema base (profiles, articles, storage)
│   └── migrations/
│       └── 0002_rebuild_additions.sql  # views_count, is_breaking, newsletter_subscribers
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
| `NEXT_PUBLIC_SUPABASE_URL` | **Obrigatória** | URL do projeto Supabase (CMS, auth, newsletter) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | **Obrigatória** | Chave pública (anon) do Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | **Obrigatória** | Chave service-role (admin), usada só no servidor para incrementar views e no CMS |

> Sem chaves opcionais, o portal continua funcionando — widgets dependentes de API simplesmente ficam vazios ou usam fallbacks. Sem as chaves do Supabase, o CMS, as matérias próprias, "Mais Lidas" real e a newsletter não funcionam (o resto do site continua de pé).

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
| `/api/newsletter` | POST | Inscreve e-mail em `newsletter_subscribers` |
| `/api/articles/[slug]/view` | POST | Incrementa `views_count` de uma matéria própria |
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

## Rebuild G1 (out/2026)

Em outubro/2026 o front-end público foi reconstruído do zero (páginas e
componentes; backend/Supabase preservados) para alcançar paridade de
funcionalidades com o G1 (globo.com), levantadas por inspeção direta do site
público. Resumo das mudanças estruturais:

- **`src/lib/categories.ts`** passou a ser a fonte única de editorias/cores,
  substituindo listas duplicadas que existiam em `page.tsx`, no antigo
  `CategoryNav.tsx` (removido, incorporado ao mega-menu do `Header`) e em
  `globals.css`.
- **Matérias próprias** (tabela `public.articles`, já existente com CMS
  autenticado) agora aparecem de fato no site: no feed da home (com
  prioridade sobre o agregado RSS), em páginas dedicadas `/noticia/[slug]`,
  e têm um CMS funcional em `/admin/materias` (antes só existia a
  autenticação, sem formulário de criação).
- **`EditoriaSection`** (`src/components/EditoriaSection.tsx`) substitui os
  blocos de JSX duplicados que existiam para cada categoria na home.
- **"Mais Lidas"** na sidebar passou a ordenar por `views_count` real das
  matérias próprias (antes era só "mais recentes").
- **Newsletter** (`/api/newsletter` + tabela `newsletter_subscribers`) e
  **páginas de editoria** `/categoria/[slug]` (antes linkadas no menu mas
  inexistentes — davam 404) são novas.
- Correções defensivas de overflow horizontal no mobile (`img`/`video` com
  `max-width: 100%`, `overflow-x: hidden` no body, `min-w-0` em containers
  flex/grid) — causa raiz dos bugs de layout dos commits anteriores a este
  rebuild.

### ⚠️ Passo manual pendente — rodar a migration no Supabase

O código já assume as colunas/tabela abaixo (com fallback defensivo se ainda
não existirem, mas **"Mais Lidas" real e newsletter só funcionam depois
desse passo**):

1. Abra o **SQL Editor** do projeto Supabase.
2. Cole e rode o conteúdo de `supabase/migrations/0002_rebuild_additions.sql`
   (adiciona `articles.views_count`, `articles.is_breaking` e a tabela
   `newsletter_subscribers`, sem alterar nada existente).
3. Cole e rode o conteúdo de `supabase/migrations/0003_atomic_view_count.sql`
   (cria a função `increment_article_views`, que torna a contagem de views
   atômica — sem ela, duas visitas simultâneas podem perder contagem; o
   código já tem fallback pro comportamento antigo até esse passo ser feito).

Um backup do estado anterior ao rebuild foi salvo na tag git
`backup/pre-g1-rebuild-2026-10-24` (também enviada ao `origin`).

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

### Itens corrigidos (out/2026)

| Item | Situação |
|------|----------|
| `NewsCard` (card em destaque) | ✅ Corrigido buraco no layout: a imagem tinha altura fixa (`aspect-video`) e o card era esticado (`align-items: stretch` padrão do grid) até a altura da coluna de notícias compactas ao lado, deixando um vão em branco abaixo da imagem. Agora a imagem é flexível (`flex-1`) e preenche toda a altura disponível, igualando visualmente as duas colunas. |
| `getBrasileiraoScores` (`src/lib/espn.ts`) | ✅ Bloco "Jogos do Brasileirão" mostrava poucos jogos (ou nenhum) em produção: a API da ESPN, sem parâmetro de data, retorna só os jogos "de hoje" — variável conforme o dia da rodada. Uma primeira tentativa com `dates=YYYYMMDD-YYYYMMDD` (range) fez o bloco sumir de vez em produção. Corrigido para buscar dia a dia (±3 dias, formato de data única, bem suportado pela API) com fallback para o comportamento original caso a API não retorne nada. |
| `Sidebar` (banners de publicidade) | ✅ Removidos os 2 últimos banners "ANUNCIE AQUI" (ficam 2, após Clima e após Financeiro) para reduzir a diferença de altura entre a coluna principal e a sidebar, que deixava um vão em branco antes do rodapé. |
| `HeroWave` / `Player` | ✅ Removida a faixa "104.7 — A voz que une Guaíra ao mundo" (duplicava o player). Player (barra "AO VIVO · CULTURA FM") ganhou mais destaque: maior, gradiente, botão de play maior com anel pulsante ao tocar. |
| CSP (`next.config.ts`) | ✅ Streaming de áudio não tocava: faltava `media-src` liberando `ice.fabricahost.com.br` (caía no `default-src 'self'` e o navegador bloqueava). Adicionado `media-src`/`connect-src` para o domínio do streaming. |
| `Player` (autoplay) | ✅ O player agora tenta iniciar o streaming automaticamente ao carregar a página. Navegadores (principalmente em celular) costumam bloquear áudio com som sem interação prévia do usuário — nesse caso o botão de play continua disponível para iniciar manualmente, com o texto "Toque no play para ouvir". |
| CSP duplicada (`vercel.json` + `next.config.ts`) | ✅ Causa raiz de o streaming não tocar nem manual nem automático: existiam DUAS políticas `Content-Security-Policy` (uma em cada arquivo). O navegador aplica a interseção de todas as CSPs presentes — a de `next.config.ts` (antes da correção anterior) não permitia `media-src` externo, então bloqueava mesmo com a de `vercel.json` permitindo. Consolidado em uma única CSP (em `next.config.ts`, união dos dois conjuntos de regras, incluindo `frame-src` para o YouTube) e removida a CSP duplicada de `vercel.json`. |
| CSP media-src incompleta (confirmado via console do navegador) | ✅ `ice.fabricahost.com.br/radioculturaguaira` redireciona (no servidor) para `ice-br.fabricahost.com.br/play/radioculturaguaira` — subdomínio diferente, fora do `media-src` liberado. Trocado para `https://*.fabricahost.com.br` (wildcard) em `media-src`/`connect-src`, já que a FabricaHost usa múltiplos subdomínios de borda (`ice-br`, `e-spo-104`, etc.) para balanceamento de carga. |

| `public/img/icon-192.png` e `icon-512.png` | ✅ Eram um ícone genérico (onda de rádio azul), substituídos pela logo oficial (`public/img/logo_oficial.png`), gerados via `sharp` a partir dela. De quebra, ficaram bem mais leves (481 KB → ~58 KB somados). |

### Itens corrigidos (out/2026, análise de CTO)

| Item | Situação |
|------|----------|
| `robots.txt` / `sitemap.xml` não eram servidos | ✅ Estavam na raiz do repo — Next.js só serve estáticos de `public/`, então davam 404 em produção. Substituídos por `src/app/robots.ts` e `src/app/sitemap.ts` (dinâmicos: sitemap inclui categorias e matérias próprias publicadas direto do Supabase; robots também bloqueia `/admin/`). |
| `lucide-react` no `package.json` | ✅ Dependência instalada sem nenhum uso no código — removida (`npm uninstall`). |
| `src/components/HeroWave.tsx` | ✅ Arquivo órfão desde que a seção foi removida da home — apagado. |
| Enquete travava sempre na última pergunta | ✅ `getActivePoll()` dependia de uma lista de datas fixas que esgotava (última em 06/10/2026, caindo sempre na mesma pergunta depois disso). Agora a pergunta é escolhida pelo número da semana do ano (`getWeekNumber(now) % POLLS.length`), ciclando pela lista inteira indefinidamente — sugestão do cliente. |
| Sem página de erro de runtime | ✅ Adicionado `src/app/error.tsx` (só existia tratamento de 404, não de erro inesperado). |
| Admin sem excluir matéria | ✅ Adicionado `DeleteArticleButton` (com confirmação) na listagem — antes só dava pra criar/editar. |
| Admin sem paginação | ✅ `materias/page.tsx` listava todas as matérias de uma vez (sem `.range()`); agora pagina de 20 em 20 (`?page=N`). |
| Slug duplicado dava erro cru do Postgres | ✅ `ArticleForm` agora checa duplicidade antes de salvar e mostra mensagem amigável; erro de unique constraint (`23505`) também é traduzido como rede de segurança. |
| Contagem de views com race condition | ✅ Era select+update (não atômico) — perde contagem em acesso concorrente. Preparada a migration `0003_atomic_view_count.sql` (função Postgres `increment_article_views`, **precisa rodar manualmente**, ver seção abaixo) com fallback pro código antigo até lá. Também adicionado dedup simples por aba (`sessionStorage`) em `ArticleViewTracker` — F5 na mesma visita não soma view de novo. |

### Pendências futuras

| Item | Situação |
|------|----------|
| `tests/COVERAGE.md` | Referencia arquivos `js/` e `api/*.js` da versão antiga |
| Testes | Jest/Playwright precisam ser atualizados para a estrutura `src/` |
| Sitemap | Substituir `sitemap.xml` estático por geração dinâmica (`sitemap.ts`)

---

## Licença e créditos

© 2026 **Rádio Cultura FM 104.7** — Guaíra-SP.  
AM 1470 KHz · FM 90,1 MHz · FM 104.7 Portal de Notícias.

Contato: [radioculturadeguaira@gmail.com](mailto:radioculturadeguaira@gmail.com) · (17) 3331-1177
