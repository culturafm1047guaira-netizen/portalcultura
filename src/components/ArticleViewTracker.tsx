"use client";

import { useEffect } from "react";

/**
 * Dispara, uma única vez por montagem, o incremento de views_count da
 * matéria. Não renderiza nada e nunca bloqueia/afeta a página caso a
 * chamada falhe (rede, migration ainda não aplicada, etc).
 */
export default function ArticleViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    fetch(`/api/articles/${encodeURIComponent(slug)}/view`, { method: "POST" }).catch(() => {
      // silencioso: contagem de views não é crítica para a experiência
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return null;
}
