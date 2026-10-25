/**
 * Fonte única de verdade para editorias/categorias do portal.
 * Usado pelo Header (mega-menu), EditoriaSection, NewsCard e pelas páginas
 * /categoria/[slug] — evita a duplicação que existia antes (page.tsx,
 * CategoryNav.tsx e globals.css tinham cada um sua própria lista).
 */

export type CategoryKey =
  | "regional"
  | "brasil"
  | "esportes"
  | "economia"
  | "educacao"
  | "saude"
  | "justica";

export interface CategoryDef {
  key: CategoryKey;
  /** Nome exibido na UI */
  label: string;
  /** Valor de `category` como vem das fontes de notícia (RSS/own articles) */
  newsCategory: string;
  /** Variável CSS de cor definida em globals.css (--color-cat-*) */
  color: string;
  href: string;
}

export const CATEGORIES: CategoryDef[] = [
  { key: "regional", label: "Regional", newsCategory: "Regional", color: "var(--color-cat-regional)", href: "/categoria/regional" },
  { key: "brasil", label: "Brasil", newsCategory: "Brasil", color: "var(--color-cat-brasil)", href: "/categoria/brasil" },
  { key: "esportes", label: "Esportes", newsCategory: "Esportes", color: "var(--color-cat-esportes)", href: "/categoria/esportes" },
  { key: "economia", label: "Economia", newsCategory: "Economia", color: "var(--color-cat-economia)", href: "/economia" },
  { key: "educacao", label: "Educação", newsCategory: "Educação", color: "var(--color-cat-educacao)", href: "/categoria/educacao" },
  { key: "saude", label: "Saúde", newsCategory: "Saúde", color: "var(--color-cat-saude)", href: "/categoria/saude" },
  { key: "justica", label: "Justiça", newsCategory: "Justiça", color: "var(--color-cat-justica)", href: "/categoria/justica" },
];

export function getCategoryByKey(key: string): CategoryDef | undefined {
  return CATEGORIES.find((c) => c.key === key);
}

export function getCategoryByNewsCategory(newsCategory: string): CategoryDef | undefined {
  return CATEGORIES.find((c) => c.newsCategory.toLowerCase() === newsCategory.toLowerCase());
}

/** Converte o valor livre de `category` (ex: "Regional") no slug de rota (ex: "regional"). */
export function slugifyCategory(newsCategory: string): string {
  const known = getCategoryByNewsCategory(newsCategory);
  if (known) return known.key;
  return newsCategory
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function categoryColor(newsCategory: string): string {
  return getCategoryByNewsCategory(newsCategory)?.color ?? "var(--color-frequencia-600)";
}
