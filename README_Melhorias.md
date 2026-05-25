# 📋 README_Melhorias — Portal Rádio Cultura FM 104.7

> Análise técnica completa do projeto realizada em 25/05/2026.  
> Documento gerado automaticamente pelo assistente Antigravity.

---

## 🗂️ Índice

1. [🔴 Problemas Críticos (Correção Urgente)](#-problemas-críticos-correção-urgente)
2. [🟡 Melhorias Importantes](#-melhorias-importantes)
3. [🟢 Melhorias de Qualidade de Código](#-melhorias-de-qualidade-de-código)
4. [🗑️ O que Pode Ser Excluído](#️-o-que-pode-ser-excluído)
5. [📦 Dependências](#-dependências)
6. [🔒 Segurança](#-segurança)
7. [⚡ Performance](#-performance)
8. [🧪 Testes](#-testes)
9. [♿ Acessibilidade](#-acessibilidade)
10. [🔍 SEO](#-seo)
11. [📱 Mobile](#-mobile)
12. [🌙 Dark Mode](#-dark-mode)
13. [📊 Resumo Geral por Arquivo](#-resumo-geral-por-arquivo)

---

## 🔴 Problemas Críticos (Correção Urgente)

### 1. Token do Telegram exposto em texto puro no código
**Arquivo:** [`scripts/notify.js`](./scripts/notify.js) — Linha 1

```js
// PROBLEMA: Token e chat_id hardcoded no código-fonte
const token = '8248006597:AAF6XGnXWXJAZSPZZYHPUp69ttMpTZAAZbI';
const chat_id = '1390440721';
```

**Risco:** CRÍTICO. O token do bot Telegram está exposto no repositório público. Qualquer pessoa com acesso ao repositório pode usá-lo para enviar mensagens em seu nome, ou revogar o token causando indisponibilidade da funcionalidade.

**Correção:**
```js
// Usar variável de ambiente
const token = process.env.TELEGRAM_BOT_TOKEN;
const chat_id = process.env.TELEGRAM_CHAT_ID;
if (!token || !chat_id) { console.error('Variáveis TELEGRAM_BOT_TOKEN e TELEGRAM_CHAT_ID não configuradas'); process.exit(1); }
```
Adicionar `TELEGRAM_BOT_TOKEN` e `TELEGRAM_CHAT_ID` no `.env.example`, `.gitignore` e no painel Vercel/GitHub Actions.

> ⚠️ **Ação imediata:** Revogar o token atual no [@BotFather](https://t.me/BotFather) e gerar um novo.

---

### 2. Mock de dados do Facebook com dados de desenvolvimento expostos no código de produção
**Arquivo:** [`src/lib/news.ts`](./src/lib/news.ts) — Linhas 277–307

O fallback de mock contém:
- Mensagens de instrução de desenvolvimento (`"Cole sua chave do Render no chat para automação!"`)
- URLs de imagens do Facebook com tokens de sessão que expiraram (`oe=666139CD`, datas de 2024)
- Texto de debug visível ao usuário final: `"As postagens reais aparecerão aqui assim que o novo link do RSS.app for configurado no código"`

**Correção:** Substituir o mock por um fallback neutro e apresentável, ou simplesmente retornar array vazio se nenhuma fonte estiver configurada. Nunca exibir mensagens técnicas de desenvolvimento ao usuário final.

---

### 3. Links "Ver todas →" quebrados/não implementados
**Arquivo:** [`src/app/page.tsx`](./src/app/page.tsx) — Linhas 75, 97, 119, 143

```tsx
<a href="#" ...>Ver todas →</a>  // href="#" em todos os blocos de categoria
```

**Problema:** Todos os botões "Ver todas" apontam para `#` (âncora vazia), não funcionam. O usuário espera ir para uma página de categoria ao clicar.

**Correção:** Criar páginas de categoria em `/noticias/[categoria]` ou implementar filtro na página de busca e apontar para `/busca?categoria=Regional`, etc.

---

### 4. Uso de `<style jsx>` inválido no Player
**Arquivo:** [`src/components/Player.tsx`](./src/components/Player.tsx) — Linha 75

```tsx
<style jsx>{`  // jsx não é atributo válido no Next.js App Router
```

**Problema:** `styled-jsx` não é suportado nativamente no App Router do Next.js 15. Isso gera warning em runtime e pode quebrar em builds futuros.

**Correção:** Mover o `@keyframes vis-anim` para o arquivo `globals.css`.

---

### 5. `math.Random()` no render do Player — CLS e Hydration Mismatch
**Arquivo:** [`src/components/Player.tsx`](./src/components/Player.tsx) — Linha 59

```tsx
height: `${Math.random() * 10 + 10}px`  // Valor aleatório no render!
```

**Problema:** Valores aleatórios no JSX causam **hydration mismatch** (o servidor renderiza um valor, o cliente renderiza outro) e **Cumulative Layout Shift (CLS)**, prejudicando a experiência e o score do Lighthouse.

**Correção:** Usar alturas fixas pré-definidas em array, ou calcular via `useMemo` no cliente apenas após a montagem.

---

### 6. Imagens de ícones PWA muito grandes
**Arquivo:** [`public/img/icon-192.png`](./public/img/icon-192.png) e [`public/img/icon-512.png`](./public/img/icon-512.png)

- `icon-192.png`: **481 KB** (deveria ser ~10–30 KB)
- `icon-512.png`: **481 KB** (deveria ser ~30–60 KB)
- `og-image.png`: **545 KB** (deveria ser ~100–200 KB)

**Problema:** Ícones do PWA absurdamente grandes. Uma imagem 192×192px com 481 KB é tipicamente um bug de exportação (exportou em resolução errada). Isso prejudica o Lighthouse, a instalação do PWA e o carregamento da página.

**Correção:** Reexportar os ícones nas dimensões corretas (192×192 e 512×512 px) em formato PNG otimizado, preferencialmente usando `sharp` ou `squoosh`. A `og-image.png` também precisa ser comprimida.

---

### 7. Manifesto PWA ausente
**Arquivo:** [`src/app/layout.tsx`](./src/app/layout.tsx) — Linha 31

```tsx
manifest: "/manifest.json",  // Referenciado nos metadados mas o arquivo NÃO EXISTE em /public
```

**Problema:** O arquivo `/public/manifest.json` não existe no projeto. O Next.js com `next-pwa` gera alguns arquivos mas o manifesto manual não foi criado. Isso faz o PWA não ser instalável corretamente.

**Correção:** Criar `/public/manifest.json` com os campos corretos (name, short_name, icons, theme_color, etc.) ou gerar via Next.js App Router (`src/app/manifest.ts`).

---

## 🟡 Melhorias Importantes

### 8. Componentes importados mas não utilizados na página principal
**Arquivo:** [`src/app/page.tsx`](./src/app/page.tsx) — Linhas 1–16

`FacebookFeed`, `BoredSection`, `JobicySection`, `BreakingNews` são importados (ou existem como componentes) mas não aparecem na página principal. Isso aumenta o bundle desnecessariamente.

**Ação:** Auditar e remover imports não utilizados. Verificar quais componentes estão realmente sendo renderizados.

---

### 9. Configuração do Jest incoerente com a estrutura do projeto
**Arquivo:** [`package.json`](./package.json) — Linhas 40–59

```json
"collectCoverageFrom": [
  "js/*.js",      // Pasta "js/" não existe no projeto
  "api/*.js",     // Pasta "api/" na raiz não existe
```

**Problema:** Os padrões de cobertura apontam para diretórios que não existem. Os testes não coletam cobertura do código TypeScript real em `src/`.

**Correção:**
```json
"collectCoverageFrom": [
  "src/**/*.{ts,tsx}",
  "!src/**/*.d.ts",
  "!src/**/*.test.{ts,tsx}"
]
```

---

### 10. Número de telefone no `tel:` sem formatação correta
**Arquivo:** [`src/components/TopBar.tsx`](./src/components/TopBar.tsx) — Linha 34

```tsx
<a href="tel:1733311177">  // Faltando o DDI (+55)
```

No `Footer.tsx` está correto:
```tsx
<a href="tel:+551733311177">  // Correto
```

**Correção:** Padronizar todos os links `tel:` para o formato `tel:+551733311177`.

---

### 11. A seção de buscas não tem paginação
**Arquivo:** [`src/app/busca/page.tsx`](./src/app/busca/page.tsx)

Se a busca retornar muitos resultados, todos são exibidos de uma vez sem paginação ou limite visual, o que pode causar degradação de performance e UX ruim.

**Sugestão:** Implementar paginação simples (ex: 12 resultados por página) ou usar scroll infinito.

---

### 12. A busca não é indexada por crawlers (sem `<Player />` no servidor)
**Arquivo:** [`src/app/busca/page.tsx`](./src/app/busca/page.tsx)

A página de busca não tem o `<Player />` como outras páginas, criando inconsistência de layout. Além disso, a busca chama `getNews()` completa a cada requisição — sem cache — o que pode ser lento.

**Sugestão:** Adicionar `export const revalidate = 600` e o `<Player />` por consistência.

---

### 13. Sidebar duplica chamadas de API em cada página
**Arquivos:** [`src/app/page.tsx`](./src/app/page.tsx), [`src/app/busca/page.tsx`](./src/app/busca/page.tsx)

A `<Sidebar />` é um Server Component que faz múltiplas chamadas de API (`weather`, `quotes`, `brasileirao`, `crypto`, `apod`, `joke`) em paralelo. Quando renderizada em múltiplas páginas, cada SSR dispara todas essas requisições novamente, mesmo dentro do mesmo render cycle.

**Sugestão:** As funções já usam `next: { revalidate }`, mas garantir que o `fetch` do Next.js deduplicação esteja funcionando. Se não estiver, mover para Route Handlers com cache explícito.

---

### 14. `VideoGallery` com IDs de vídeos hardcoded desatualizados
**Arquivo:** [`src/components/VideoGallery.tsx`](./src/components/VideoGallery.tsx) — Linhas 4–8

Os vídeos são hardcoded com datas específicas (`10/05/2026`, `03/05/2026`, `29/03/2026`) e precisam ser atualizados manualmente. Em alguns meses estarão desatualizados.

**Sugestão:** Integrar com a YouTube Data API (a variável `YOUTUBE_API_KEY` já existe no `.env.example`) para buscar automaticamente os últimos vídeos do canal `@culturafmguaira-sp`.

---

### 15. Código duplicado dos botões de compartilhamento
**Arquivos:** [`src/components/Hero.tsx`](./src/components/Hero.tsx), [`src/components/NewsCard.tsx`](./src/components/NewsCard.tsx)

O código dos botões de compartilhamento no WhatsApp e Facebook é **exatamente idêntico** nos dois componentes (Hero e NewsCard — duas variantes no NewsCard).

**Sugestão:** Extrair para um componente reutilizável `<ShareButtons title={title} link={link} />`.

---

### 16. `FacebookFeed.tsx` não está sendo utilizado
**Arquivo:** [`src/components/FacebookFeed.tsx`](./src/components/FacebookFeed.tsx)

O componente existe mas não está importado nem renderizado em nenhuma página do projeto atual.

**Ação:** Ou integrá-lo à página principal (removendo o bloco de categoria "Facebook" atual que usa `NewsCard`), ou excluir o arquivo.

---

### 17. `BoredWidget.tsx` e `JobicyWidget.tsx` não utilizados
**Arquivos:** [`src/components/BoredWidget.tsx`](./src/components/BoredWidget.tsx), [`src/components/JobicyWidget.tsx`](./src/components/JobicyWidget.tsx)

Componentes que existem no diretório mas não são importados em nenhum lugar do projeto.

**Ação:** Excluir ou integrar.

---

### 18. `DeezerSection` e `EspnSection` importados mas sem integração visível na API
**Arquivos:** [`src/components/DeezerSection.tsx`](./src/components/DeezerSection.tsx), [`src/components/EspnSection.tsx`](./src/components/EspnSection.tsx)

Ambos são renderizados na `page.tsx`, mas os arquivos de lib correspondentes (`src/lib/deezer.ts`, `src/lib/espn.ts`) existem — verificar se as APIs externas estão retornando dados ou apenas renderizando fallback.

---

## 🟢 Melhorias de Qualidade de Código

### 19. `any` types excessivos em `news.ts`
**Arquivo:** [`src/lib/news.ts`](./src/lib/news.ts) — Linhas 36, 49, 160, 189, 203

```ts
function extractImage(item: any): string | null {  // any
const data = await res.json(); // qualquer estrutura
const items: NewsItem[] = data.data.map((post: any) => {  // any
```

**Sugestão:** Definir interfaces TypeScript para o shape dos dados do RSS e da Graph API do Facebook, eliminando os `any`.

---

### 20. Mistura de finais de linha CRLF e LF
**Arquivos:** [`src/app/page.tsx`](./src/app/page.tsx), [`src/components/Hero.tsx`](./src/components/Hero.tsx), [`src/components/NewsCard.tsx`](./src/components/NewsCard.tsx)

Esses arquivos usam `\r\n` (CRLF/Windows) enquanto os demais usam `\n` (LF/Unix). Isso pode causar problemas de diff no Git e inconsistências entre SO.

**Correção:** Adicionar ao repositório um arquivo `.editorconfig` e/ou configurar `autocrlf=false` no Git:
```ini
# .editorconfig
[*]
end_of_line = lf
charset = utf-8
```

---

### 21. `categories` definido mas só parcialmente usado
**Arquivo:** [`src/app/page.tsx`](./src/app/page.tsx) — Linhas 26–31

O array `categories` é definido com 4 itens mas só usado na linha 171 para filtrar "Mais Notícias". O código dos blocos de categorias (Regional, Facebook, Brasil, Esportes) está hardcoded repetidamente em vez de usar o array.

**Sugestão:** Refatorar para um loop `{categories.map(cat => <CategorySection ... />)}` eliminando ~60 linhas de código duplicado.

---

### 22. Índice `i` como `key` em listas de notícias
**Arquivos:** [`src/app/page.tsx`](./src/app/page.tsx), [`src/app/busca/page.tsx`](./src/app/busca/page.tsx)

```tsx
.map((news, i) => <NewsCard key={i} {...news} />)  // key por índice
```

**Problema:** Usar o índice como `key` em React pode causar bugs de re-renderização quando a lista muda. O correto é usar um identificador único do item.

**Correção:** Usar `key={news.link}` ou `key={`${news.source}-${news.pubDate}`}`.

---

### 23. `rel="noopener"` sem `noreferrer` em links externos
**Arquivos:** Vários componentes

```tsx
target="_blank" rel="noopener"  // Falta "noreferrer"
```

A prática recomendada é `rel="noopener noreferrer"` para links externos com `target="_blank"`. O `noreferrer` também inclui o comportamento do `noopener` e evita o envio do header `Referer`.

---

### 24. Função `getCondition` sem memoização desnecessária
**Arquivo:** [`src/lib/openmeteo.ts`](./src/lib/openmeteo.ts)

Código bem escrito, mas o `WMO_CODES` poderia ser `const` imutável, o que já está correto. Sem problemas críticos aqui, apenas observação.

---

### 25. `ThemeProvider.tsx` muito simples — re-exportação desnecessária
**Arquivo:** [`src/components/ThemeProvider.tsx`](./src/components/ThemeProvider.tsx)

O arquivo apenas re-exporta o `ThemeProvider` do `next-themes`. Poderia ser eliminado e o `next-themes` importado diretamente no `layout.tsx`.

---

## 🗑️ O que Pode Ser Excluído

| Arquivo/Pasta | Motivo |
|---|---|
| [`src/components/FacebookFeed.tsx`](./src/components/FacebookFeed.tsx) | Não utilizado em nenhuma página |
| [`src/components/BoredWidget.tsx`](./src/components/BoredWidget.tsx) | Não utilizado em nenhuma página |
| [`src/components/JobicyWidget.tsx`](./src/components/JobicyWidget.tsx) | Não utilizado em nenhuma página |
| [`src/lib/unsplash.ts`](./src/lib/unsplash.ts) | Não parece ser chamado em nenhum componente |
| [`src/lib/nasa.ts`](./src/lib/nasa.ts) | Verifique se APOD ainda é necessário na Sidebar |
| [`tsconfig.tsbuildinfo`](./tsconfig.tsbuildinfo) | Arquivo de cache do TypeScript — deve estar no `.gitignore` |
| `API para testes/` (pasta na raiz) | Pasta com espaço no nome, conteúdo de desenvolvimento, não deve estar no repositório |
| `public/sw.js` e `public/workbox-4754cb34.js` | Gerados pelo `next-pwa` no build, devem estar no `.gitignore` |

---

## 📦 Dependências

### 26. `next-pwa` desatualizado e com problemas de compatibilidade
**Arquivo:** [`package.json`](./package.json) — Linha 20

```json
"next-pwa": "^5.6.0"
```

`next-pwa@5.x` não tem suporte oficial ao Next.js 15 App Router. O projeto usa `@ts-expect-error` para suprimir o erro de tipos. O pacote está em modo de manutenção mínima.

**Sugestão:** Migrar para `@ducanh2912/next-pwa` (fork ativo e compatível com Next.js 15) ou usar a implementação nativa de Service Worker do Next.js 15.

---

### 27. `lucide-react` na versão `^1.16.0` — versão incomum
**Arquivo:** [`package.json`](./package.json) — Linha 18

A versão `^1.16.0` do `lucide-react` é incomum — a versão estável atual está na faixa `0.x`. Verificar se a versão instalada é a correta.

---

### 28. `@playwright/test` sem configuração de arquivo
**Arquivo:** [`package.json`](./package.json) — Linha 27

O Playwright está como devDependency e existe um script `test:e2e`, mas não há arquivo `playwright.config.ts` na raiz do projeto.

**Correção:** Criar `playwright.config.ts` ou remover a dependência se não houver testes E2E funcionando.

---

## 🔒 Segurança

### 29. `vercel.json` sem CSP (Content Security Policy)
**Arquivo:** [`vercel.json`](./vercel.json)

Os headers de segurança existentes são básicos. Faltam:
- `Content-Security-Policy` — previne XSS
- `Referrer-Policy`
- `Permissions-Policy`

**Sugestão:**
```json
{ "key": "Content-Security-Policy", "value": "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.youtube.com; frame-src https://www.youtube.com https://www.facebook.com; img-src * data: blob:" }
{ "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
{ "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
```

---

### 30. Revalidação via GET com segredo na query string
**Arquivo:** [`src/app/api/revalidate/route.ts`](./src/app/api/revalidate/route.ts)

```ts
const secret = request.nextUrl.searchParams.get("secret");
```

Enviar segredos em query strings pode ficar exposto em logs de servidor, histórico do browser e proxies. A prática recomendada é usar o header `Authorization`.

**Correção:**
```ts
const secret = request.headers.get("x-revalidate-secret");
```

---

### 31. `FACEBOOK_ACCESS_TOKEN` sem prazo de validade gerenciado
**Arquivo:** [`src/lib/news.ts`](./src/lib/news.ts) — Linha 153

O token de acesso do Facebook na Graph API expira. Se expirar sem renovação, o fallback de mock com mensagens de debug será exibido ao usuário.

**Sugestão:** Implementar tratamento de erro específico para token expirado (código `190`) e logar um alerta monitorável.

---

## ⚡ Performance

### 32. `getNews()` faz até 12 fetches de RSS + enriquecimento de OG Image em série por chamada
**Arquivo:** [`src/lib/news.ts`](./src/lib/news.ts) — Linhas 184–312

O pipeline de notícias:
1. Busca 12 feeds RSS em paralelo
2. Para fontes sem imagem, faz fetch do `og:image` em batches de 5
3. Busca NewsAPI, Facebook Graph API
4. Tudo isso a cada ISR de 600 segundos

O `fetchOpenGraphImage` tem timeout de 12 segundos e pode serializar requisições, tornando a revalidação muito lenta (potencialmente 30–60+ segundos).

**Sugestão:** 
- Separar o enriquecimento de OG Image em um processo assíncrono/background
- Implementar cache Redis/KV store para os dados de OG Image
- Reduzir o `BATCH_SIZE` para 3 ou usar um timeout mais agressivo (5s)

---

### 33. Imagens de ícone PWA não otimizadas (ver item 6)

Já descrito acima. `icon-192.png` com 481 KB é inaceitável para um ícone de app.

---

### 34. `placehold.co` como fallback de imagem em produção
**Arquivo:** [`src/lib/news.ts`](./src/lib/news.ts) — Linhas 243–256

```ts
"https://placehold.co/800x450/0066cc/ffffff?text=Regional"
```

`placehold.co` é um serviço externo. Se ficar fora do ar, os placeholders quebram. Além disso, a URL não está na lista de `remotePatterns` do `next.config.ts`.

**Correção:** 
1. Adicionar `placehold.co` ao `remotePatterns` do Next.js
2. OU usar placeholders locais em `/public/img/placeholder-[categoria].svg`

---

### 35. `Math.random()` re-executado a cada render no Player
Já descrito no item 5. Causa CLS e hidration mismatch.

---

## 🧪 Testes

### 36. Cobertura de testes muito baixa
**Arquivo:** [`tests/COVERAGE.md`](./tests/COVERAGE.md)

A estrutura de testes existe (unit, integration, e2e) mas a configuração do Jest no `package.json` aponta para padrões inexistentes (`js/*.js`, `api/*.js`). Na prática, nenhum teste TypeScript está sendo coberto.

**Sugestão:** 
- Configurar Jest com `ts-jest` ou usar `vitest` (melhor integração com Next.js 15)
- Escrever testes unitários para `src/lib/news.ts` (função `extractImage`, `getNews`)
- Escrever testes de integração para os Route Handlers

---

### 37. Arquivo `playwright.config.ts` ausente
Como descrito no item 28. O script `test:e2e` existe mas não há configuração.

---

## ♿ Acessibilidade

### 38. Botões de compartilhamento sem `aria-label` adequado no contexto
**Arquivos:** [`src/components/NewsCard.tsx`](./src/components/NewsCard.tsx), [`src/components/Hero.tsx`](./src/components/Hero.tsx)

Os botões têm `title` mas não `aria-label`. O `title` não é lido por todos os screen readers da mesma forma.

**Correção:**
```tsx
<button aria-label={`Compartilhar "${title}" no WhatsApp`}>
```

---

### 39. Ícone de menu hambúrguer sem texto acessível adequado
**Arquivo:** [`src/components/Header.tsx`](./src/components/Header.tsx) — Linha 29

```tsx
aria-label="Menu"  // Genérico demais
```

**Sugestão:** `aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu de navegação"}` e adicionar `aria-expanded={isMenuOpen}`.

---

### 40. Falta de `role="navigation"` e `aria-label` na `<nav>`
**Arquivo:** [`src/components/Header.tsx`](./src/components/Header.tsx) — Linha 48

```tsx
<nav className="...">  // Sem aria-label
```

Quando há múltiplas `<nav>` na página (Header + Footer), screen readers não conseguem diferenciá-las.

**Correção:** `<nav aria-label="Navegação principal">`

---

### 41. O Player não informa o estado ao leitor de tela durante reprodução
**Arquivo:** [`src/components/Player.tsx`](./src/components/Player.tsx)

O botão de play/pause alterna `aria-label` mas o container animado de visualização não tem `aria-live` para informar quando está tocando.

---

### 42. Contraste de cor potencialmente insuficiente
**Arquivo:** [`src/app/globals.css`](./src/app/globals.css)

- `--color-text-muted: #555555` sobre fundo branco = ratio ~7:1 ✅
- Mas `text-gray-400` (`#9ca3af`) sobre fundo branco = ratio ~2.85:1 ❌ (WCAG AA exige 4.5:1 para texto normal)

Vários componentes usam `text-gray-400` para textos importantes (fonte, data). Verificar e aumentar o contraste.

---

## 🔍 SEO

### 43. `sitemap.xml` estático e possivelmente desatualizado
**Arquivo:** [`sitemap.xml`](./sitemap.xml)

O sitemap é estático. Páginas de notícias geradas dinamicamente não aparecem nele.

**Sugestão:** Migrar para `src/app/sitemap.ts` (geração dinâmica do Next.js App Router) para incluir as notícias atuais automaticamente.

---

### 44. Falta de dados estruturados (Schema.org) nas páginas de notícias
Não há `NewsArticle`, `RadioStation` ou `BreadcrumbList` em formato JSON-LD.

**Sugestão:** Adicionar ao layout ou aos componentes:
```tsx
<script type="application/ld+json">{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "RadioStation",
  "name": "Rádio Cultura FM 104.7",
  "url": "https://radioculturaguaira.com.br"
})}</script>
```

---

### 45. `robots.txt` muito permissivo
**Arquivo:** [`robots.txt`](./robots.txt)

Verificar se rotas de API (`/api/`) e de revalidação estão bloqueadas para crawlers:
```
Disallow: /api/
```

---

### 46. Open Graph sem `twitter:card` meta tag
**Arquivo:** [`src/app/layout.tsx`](./src/app/layout.tsx)

O metadata do Next.js não inclui os metadados do Twitter/X Card, que são importantes para pré-visualizações ao compartilhar links.

**Correção:**
```tsx
twitter: {
  card: "summary_large_image",
  title: "Rádio Cultura FM 104.7",
  description: "...",
  images: ["/img/og-image.png"],
}
```

---

## 📱 Mobile

### 47. Menu mobile não fecha ao pressionar fora dele
**Arquivo:** [`src/components/Header.tsx`](./src/components/Header.tsx)

O menu hambúrguer abre mas não fecha quando o usuário clica/toca fora do menu. Apenas fecha ao clicar em um item de menu.

**Correção:** Adicionar `useEffect` com listener de clique no `document` para fechar quando clicar fora.

---

### 48. `WhatsAppPeao` pode cobrir conteúdo importante em mobile
**Arquivo:** [`src/components/WhatsAppPeao.tsx`](./src/components/WhatsAppPeao.tsx)

O botão flutuante do cowboy (72×108px + bubble) na posição `bottom-4 right-6` pode cobrir elementos interativos em telas pequenas, especialmente quando a animação está ativa.

**Sugestão:** Em telas `xs`/`sm`, reduzir o tamanho do personagem ou posicioná-lo de forma menos invasiva. Considerar um botão compacto apenas com o ícone do WhatsApp em mobile.

---

### 49. Buscas em mobile sem botão de submit visível
**Arquivo:** [`src/components/Header.tsx`](./src/components/Header.tsx) — Linha 69

A busca está oculta em mobile (`hidden md:flex`). Em dispositivos móveis, não há forma de acessar a busca diretamente pelo header.

**Sugestão:** Adicionar um ícone de busca no header mobile que expanda um campo de busca sobreposto.

---

## 🌙 Dark Mode

### 50. `bg-white` hardcoded em página.tsx ignora dark mode
**Arquivo:** [`src/app/page.tsx`](./src/app/page.tsx) — Linha 34

```tsx
<div className="flex flex-col min-h-screen bg-white">
```

O fundo `bg-white` não muda no dark mode. Deveria ser `bg-light-bg` ou `bg-white dark:bg-slate-900`.

O mesmo ocorre em [`src/app/busca/page.tsx`](./src/app/busca/page.tsx) linha 27.

---

### 51. `text-dark-bg` em dark mode tem semântica invertida
**Arquivo:** [`src/app/globals.css`](./src/app/globals.css) — Linha 55

```css
.dark {
  --color-dark-bg: #e2e8f0;  /* No dark mode, "dark-bg" vira branco */
}
```

A variável `--color-dark-bg` foi reutilizada para ser a cor de texto no dark mode, mas o nome é semanticamente confuso. Em dark mode, `text-dark-bg` resulta em texto claro (correto), mas o nome da variável engana.

**Sugestão:** Criar uma variável semântica separada `--color-heading` que no light = `#111111` e no dark = `#e2e8f0`.

---

## 📊 Resumo Geral por Arquivo

| Arquivo | Criticidade | Problemas |
|---|---|---|
| `scripts/notify.js` | 🔴 CRÍTICO | Token Telegram exposto |
| `src/lib/news.ts` | 🔴 CRÍTICO | Mock com dados de dev, `any` types, OG fetching lento |
| `src/app/page.tsx` | 🟡 MÉDIO | Links quebrados, key por índice, bg-white, imports não usados |
| `src/components/Player.tsx` | 🟡 MÉDIO | `style jsx` inválido, `Math.random()` no render |
| `src/components/Header.tsx` | 🟡 MÉDIO | tel: sem DDI, menu sem fechar ao clicar fora, a11y |
| `src/components/NewsCard.tsx` | 🟢 BAIXO | Código duplicado, rel sem noreferrer, CRLF |
| `src/components/Hero.tsx` | 🟢 BAIXO | Código duplicado, CRLF |
| `src/components/Sidebar.tsx` | 🟢 BAIXO | 4 banners "ANUNCIE AQUI" repetidos, aguarda múltiplas APIs |
| `src/components/VideoGallery.tsx` | 🟡 MÉDIO | IDs hardcoded, sem integração com YouTube API |
| `src/components/WhatsAppPeao.tsx` | 🟢 BAIXO | Cobertura de conteúdo em mobile |
| `src/components/FacebookFeed.tsx` | 🗑️ REMOVER | Não utilizado |
| `src/components/BoredWidget.tsx` | 🗑️ REMOVER | Não utilizado |
| `src/components/JobicyWidget.tsx` | 🗑️ REMOVER | Não utilizado |
| `public/img/icon-192.png` | 🔴 CRÍTICO | 481 KB — deve ser ~20 KB |
| `public/img/icon-512.png` | 🔴 CRÍTICO | 481 KB — deve ser ~50 KB |
| `public/img/og-image.png` | 🟡 MÉDIO | 545 KB — deve ser ~150 KB |
| `package.json` (Jest config) | 🟡 MÉDIO | Padrões de cobertura apontam para pastas inexistentes |
| `vercel.json` | 🟡 MÉDIO | Sem CSP, sem Referrer-Policy |
| `src/app/layout.tsx` | 🟡 MÉDIO | manifest.json ausente, sem twitter:card |
| `sitemap.xml` | 🟢 BAIXO | Estático, não inclui notícias dinâmicas |
| `tsconfig.tsbuildinfo` | 🗑️ REMOVER | Deve estar no .gitignore |
| `API para testes/` (pasta) | 🗑️ REMOVER | Pasta de desenvolvimento no repositório |

---

## ✅ Pontos Positivos do Projeto

- **Arquitetura sólida** com Next.js 15 App Router, Server Components e ISR bem configurado
- **Fallbacks robustos** em todas as integrações externas (RSS, clima, crypto, etc.)
- **TypeScript** bem adotado na maior parte do código
- **Dark Mode** implementado via `next-themes` com variáveis CSS
- **PWA** configurado com `next-pwa`
- **Múltiplas fontes de notícias** com enriquecimento automático de imagens
- **Performance de rede**: `Promise.allSettled` garante que falha em um feed não quebra os outros
- **UI coerente** com sistema de design via variáveis CSS Tailwind v4
- **Componente WhatsAppPeão** criativo e bem executado
- **Headers de segurança** básicos no `vercel.json`
- **Revalidação programada** via GitHub Actions + secret

---

*Documento gerado em: 25/05/2026 | Versão analisada: 1.0.0*
