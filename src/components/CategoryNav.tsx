"use client";

import React from "react";

/**
 * CategoryNav — Navegação de categorias com codificação de cor semântica.
 *
 * - Cor por categoria: Local (cerrado-verde), Regional (sintonia-azul),
 *   Brasil (cinza/agregado), Agro (entardecer-laranja).
 * - Underline animado no item ativo/hover.
 * - Acessível: nav semântica, aria-current na categoria ativa.
 */

export type CategoryKey = "local" | "regional" | "brasil" | "agro" | "esportes" | "economia";

interface Category {
  key: CategoryKey;
  label: string;
  href: string;
}

const CATEGORIES: Category[] = [
  { key: "local", label: "Local", href: "/categoria/local" },
  { key: "regional", label: "Regional", href: "/categoria/regional" },
  { key: "brasil", label: "Brasil", href: "/categoria/brasil" },
  { key: "agro", label: "Agropecuário", href: "/categoria/agropecuario" },
  { key: "esportes", label: "Esportes", href: "/categoria/esportes" },
  { key: "economia", label: "Economia", href: "/economia" },
];

interface CategoryNavProps {
  active?: CategoryKey;
}

export default function CategoryNav({ active = "local" }: CategoryNavProps) {
  return (
    <nav
      aria-label="Categorias de notícias"
      className="border-b border-[#E8ECEF] bg-[#F5F0E8]"
    >
      <ul className="container flex gap-4 sm:gap-6 overflow-x-auto py-3 scrollbar-thin">
        {CATEGORIES.map((cat) => {
          const isActive = cat.key === active;
          return (
            <li key={cat.key} className="shrink-0">
              <a
                href={cat.href}
                className="nav-link"
                data-category={cat.key}
                aria-current={isActive ? "page" : undefined}
              >
                {cat.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
