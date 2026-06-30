# Design Proposal — Hero da Página Inicial
## Rádio Cultura FM 104.7 | Portal de Notícias

---

## 1. Grounding in Subject

**Assunto:** Rádio Cultura FM 104.7 — emissora comunitária de Guaíra-SP, interior paulista, com programação que mescla jornalismo local, música popular brasileira, sertanejo raiz e agronegócio.

**Público:** Moradores de Guaíra e região (zona rural + urbana), agricultores, comerciantes, famílias — faixa etária ampla (25-65+), alfabetização variada.

**Job único da página:** Comunicar imediatamente "esta é a SUA rádio local" e oferecer acesso rápido às notícias que importam para o ouvinte de Guaíra, com hierarquia clara: Local → Regional → Brasil/Agro.

**Referências visuais do universo do assunto:**
- Onda de rádio / espectro de frequência (identidade sonora)
- Microfone vintage / fita magnética (história do rádio)
- Paisagem do interior paulista: horizonte aberto, cultura cafeeira/cana, céu alaranjado ao entardecer
- Materialidade: vinil, botões analógicos, LEDs de equipamento de transmissão
- Tipografia de placas de rádio antigo, letreiros de emissora

---

## 2. Design Token System

### Paleta de Cores (6 cores nomeadas)

| Nome | HEX | Uso | Justificativa |
|------|-----|-----|---------------|
| `frequencia-azul` | `#0B4F7A` | Cor primária institucional — headers, CTAs primários, links | Mantém identidade existente da marca |
| `cerrado-verde` | `#2D6A4F` | Cor secundária — badges "Local", destaques agro, bordas sutis | Representa agricultura/cerrado da região de Guaíra |
| `entardecer-laranja` | `#E88D2A` | Cor de acento — hover states, indicadores "ao vivo", badges urgentes | Céu do interior ao pôr do sol; remete a "hora do rush" na rádio |
| `vinil-preto` | `#1A1A1A` | Texto principal, fundos escuros, header | Vinil/equipamento analógico; alto contraste para acessibilidade |
| `papel-jornal` | `#F5F0E8` | Fundo principal da página, cards de notícia | Textura sutil de papel de jornal comunitário; calor humano |
| `estatica-branco` | `#FFFFFF` | Cards elevados, modais, áreas de input | "Ruído branco" entre estações; respiro visual |

**Escala de cinzas (derivadas):**
- `cinza-frequencia-100`: `#E8ECEF` (bordas sutis)
- `cinza-frequencia-300`: `#9CA3AF` (texto muted, placeholders)
- `cinza-frequencia-600`: `#4B5563` (labels, metadata)

### Tipografia (3 papéis)

| Papel | Fonte | Pesos | Uso |
|-------|-------|-------|-----|
| **Display (Identidade)** | **`"Bebas Neue", sans-serif`** | 400, 700 | Logo/título da rádio no hero, números grandes (audiência, frequência), headlines de impacto |
| **Título/Subtítulo** | **`"IBM Plex Sans", sans-serif`** | 400, 500, 600, 700 | Títulos de seções, cards de notícia, navegação, UI text |
| **Corpo/Texto Longo** | **`"IBM Plex Sans", sans-serif`** | 400, 500 | Parágrafos, excerpts, metadata, formulários |

**Por que estas fontes:**
- **Bebas Neue:** Condensada, geométrica, remete a letreiros de emissora, placas de frequência, sinalética analógica. Usada com parcimônia (apenas display) para não cansar.
- **IBM Plex Sans:** Família completa, excelente legibilidade em telas, personalidade técnica/humanista que equilibra o Bebas. Não parece "genérica" como Inter ou Roboto. Suporta PT-BR nativamente.

**Escala tipográfica (clamp para responsivo):**

| Elemento | Desktop | Mobile | Peso |
|----------|---------|--------|------|
| Hero Frequency (104.7) | `clamp(4rem, 12vw, 8rem)` | `clamp(3rem, 15vw, 5rem)` | 700 (Bebas) |
| Hero Tagline | `clamp(1.25rem, 3vw, 1.75rem)` | `clamp(1rem, 4vw, 1.25rem)` | 400 (IBM Plex) |
| Section Title | `1.75rem` | `1.5rem` | 600 (IBM Plex) |
| Card Title | `1.125rem` | `1rem` | 600 (IBM Plex) |
| Body / Excerpt | `1rem` | `0.9375rem` | 400 (IBM Plex) |
| Meta / Caption | `0.8125rem` | `0.75rem` | 400 (IBM Plex) |

---

## 3. Layout Concept — ASCII Wireframe

### Hero Section (Above the Fold)

```
┌─────────────────────────────────────────────────────────────────────┐
│  HEADER (sticky)                                                    │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ [Logo] RÁDIO CULTURA FM 104.7        [Busca] [Menu ☰]       │   │
│  └─────────────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   ┌─────────────────────────────────────────────────────────────┐  │
│   │                      HERO WAVE                              │  │
│   │                                                             │  │
│   │     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~    │  │
│   │    ~~~  ●●●  ~~~  ●●●  ~~~  ●●●  ~~~  ●●●  ~~~  ●●●  ~~~    │  │
│   │   ~~~  ●  1  ●  ●  0  ●  ●  4  ●  ●  .  ●  ●  7  ●  ~~~    │  │  ← Frequência animada
│   │    ~~~  ●●●  ~~~  ●●●  ~~~  ●●●  ~~~  ●●●  ~~~  ●●●  ~~~    │  │     (partículas pulsando)
│   │     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~    │  │
│   │                                                             │  │
│   │        "A voz que une Guaíra ao mundo"                      │  │  ← Tagline
│   │                                                             │  │
│   │    ┌─────────────────────────────────────────────────────┐  │  │
│   │    │  🔴 AO VIVO    │    OUÇA AGORA  ▶    │  104.7 FM   │  │  │  ← Barra de ação
│   │    └─────────────────────────────────────────────────────┘  │  │
│   └─────────────────────────────────────────────────────────────┘  │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│  NAVEGAÇÃO DE CATEGORIAS (scroll horizontal no mobile)             │
│  ┌──────┐ ┌──────────┐ ┌────────┐ ┌──────────┐ ┌──────────────┐  │
│  │LOCAL │ │ REGIONAL │ │ BRASIL │ │ AGROPEC. │ │ ESPORTES ▼   │  │
│  └──────┘ └──────────┘ └────────┘ └──────────┘ └──────────────┘  │
│   ●●●      ●●●         ●●●        ●●●           ●●          ●●              │  ← Indicadores visuais
│  (verde)   (azul)      (cinza)    (laranja)    (roxo)            │     por categoria
└─────────────────────────────────────────────────────────────────────┘
```

### Área de Notícias (Below the Fold)

```
┌─────────────────────────────────────────────────────────────────────┐
│  DESTAQUE PRINCIPAL (1 coluna larga + 2 colunas)                   │
│  ┌──────────────────────────────┐ ┌────────────────────────────┐  │
│  │                              │ │  NOTÍCIA 2                 │  │
│  │   [Imagem Full Bleed]        │ │  [img] Título médio...     │  │
│  │                              │ │  Meta • 15min              │  │
│  │  CATEGORIA: LOCAL  🔴 URGENTE│ ├────────────────────────────┤  │
│  │  Título Grande da Manchete   │ │  NOTÍCIA 3                 │  │
│  │  Excerpt de 2 linhas que     │ │  [img] Título médio...     │  │
│  │  resume a notícia principal  │ │  Meta • 32min              │  │
│  │                              │ └────────────────────────────┘  │
│  │  [LER MATÉRIA]               │                                 │  │
│  └──────────────────────────────┘                                 │
└─────────────────────────────────────────────────────────────────────┘
│                                                                     │
│  GRADE DE NOTÍCIAS (4 colunas desktop / 2 tablet / 1 mobile)       │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐  │
│  │ [img] Titulo│ │ [img] Titulo│ │ [img] Titulo│ │ [img] Titulo│  │
│  │ Meta • cat  │ │ Meta • cat  │ │ Meta • cat  │ │ Meta • cat  │  │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 4. Signature Element — "A Onda Viva"

**O elemento único que a página será lembrada:**

Uma **visualização de onda de rádio animada** que forma a frequência "104.7" no hero, onde:

1. **Estado inicial:** Linha de base suave (ruído de fundo)
2. **Entrada (page load):** Partículas emergem da esquerda formando os dígitos "1-0-4-.-7" em sequência, como se a frequência estivesse sendo sintonizada
3. **Estado idle:** Ondulação contínua e sutil (2-3px amplitude) — respiração viva
4. **Interação hover:** Ao passar mouse sobre a frequência, a onda expande momentaneamente (feedback tátil visual)
5. **Reduced motion:** Respeita `prefers-reduced-motion` — mostra frequência estática estilizada

**Implementação técnica sugerida:**
- SVG com `<path>` animado via CSS `stroke-dashoffset` ou GSAP/ScrollTrigger
- Partículas: Canvas 2D leve ou CSS `box-shadow` animado (performance)
- Cores da onda: gradiente `frequencia-azul` → `cerrado-verde` → `entardecer-laranja`
- Acessibilidade: `aria-label="Rádio Cultura FM 104.7 — frequência 104.7 MHz"`

**Por que esta assinatura funciona:**
- É **intrínseca ao assunto** (rádio = ondas, frequência, sintonia)
- Comunica **identidade numérica** (104.7) de forma memorável
- Tem **personalidade analógica** (sintonia, ruído, ajuste) em execução digital
- Escala bem: funciona no hero, no favicon, no app icon, no player flutuante

---

## 5. Microinterações Deliberadas

| Elemento | Interação | Propósito |
|----------|-----------|-----------|
| Botão "OUÇA AGORA" | Press: escala 0.98 + sombra interna; Hover: brilho `entardecer-laranja` | Feedback tátil de "botão físico de rádio" |
| Cards de notícia | Hover: elevação (translateY -4px) + borda `cerrado-verde` | Hierarquia visual; indica clicabilidade |
| Badge categoria | Hover: background 100% → 20% opacity + texto colored | Reforça código de cor por categoria |
| Nav categoria ativa | Sublinhado animado (width 0→100%) | Indica posição sem depender apenas de cor |
| Player flutuante (fixo bottom) | Entrada: slide-up + fade; Play: equalizer bars animadas | Persistência da experiência "rádio" |

---

## 6. Responsividade & Acessibilidade (Quality Floor)

**Breakpoints:**
- Mobile: ≤ 640px (1 coluna, nav horizontal scroll, hero compacto)
- Tablet: 641-1024px (2 colunas grid, nav visível, hero médio)
- Desktop: ≥ 1025px (4 colunas grid, hero completo com onda grande)

**Acessibilidade (não negociável):**
- Contraste WCAG AA mínimo em todos os pares texto/fundo
- Focus visible em todos os elementos interativos (`outline: 2px solid entardecer-laranja; outline-offset: 2px`)
- `prefers-reduced-motion`: desativa onda animada, particles, equalizer
- Textos alternativos descritivos em todas as imagens de notícia
- Landmarks ARIA: `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`
- Player de áudio com controles nativos + keyboard support

---

## 7. Próximos Passos de Implementação

### Fase 1 — Esta Semana (Core Hero)
1. Criar componente `HeroWave.tsx` com SVG animado da frequência
2. Atualizar `page.tsx` para novo layout hero + nav categorias
3. Implementar sistema de cores no `globals.css` (CSS custom properties)
4. Adicionar fontes (Bebas Neue + IBM Plex Sans) via `next/font/google`
5. Ajustar `layout.tsx` para header sticky + player flutuante

### Fase 2 — Semana 2 (Notícias Grid + Microinterações)
1. Refatorar cards de notícia com hierarquia visual por categoria
2. Implementar badges coloridos + indicadores visuais
3. Adicionar microinterações (hover, focus, press states)
4. Testar responsividade em 3 breakpoints

### Fase 3 — Semana 3 (Polimento + Acessibilidade)
1. Auditoria de contraste + focus visible
2. Teste `prefers-reduced-motion`
3. Otimização de performance (lazy load imagens, font-display swap)
4. Documentação do design system para manutenção

---

## 8. Self-Critique (Pré-Build)

| Risco | Mitigação |
|-------|-----------|
| Bebas Neue pode não renderizar bem em weights baixos no Windows | Usar apenas 400/700; fallback `Arial Narrow, sans-serif` |
| Onda animada pode ser distrativa em mobile | Reduzir amplitude 50% em ≤ 640px; opção "desanimar" no menu |
| Paleta com 6 cores pode virar "arco-íris" | Regra: máximo 3 cores simultâneas na viewport; `entardecer-laranja` só para acentos |
| IBM Plex Sans pode parecer "técnica demais" para público rural | Testar legibilidade em dispositivos antigos; ajustar `font-size` base se necessário |
| Hero muito alto empurra notícias abaixo da fold | Max-height hero: 65vh desktop, 55vh mobile; notícia principal visível sem scroll |

---

**Aprovação necessária antes de iniciar implementação.**

Este design segue os princípios do skill *frontend-design*: ground no assunto (rádio local), hero como thesis (onda de frequência), tipografia com personalidade (Bebas + IBM Plex), estrutura que codifica informação (cores por categoria), motion deliberado (sintonia), e qualidade floor (a11y, reduced motion, responsivo).