"use client";

import { useEffect } from "react";

/**
 * Dispara, uma única vez por montagem, o incremento de views_count da
 * matéria. Não renderiza nada e nunca bloqueia/afeta a página caso a
 * chamada falhe (rede, migration ainda não aplicada, etc).
 */
const VIEWED_KEY_PREFIX = "viewed:";

export default function ArticleViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    // Dedup simples por aba: evita que um F5 na mesma visita conte view de
    // novo. Não é perfeito (outra aba/navegador conta de novo), mas resolve
    // o caso mais comum sem precisar de cookie/sessão no servidor.
    const key = `${VIEWED_KEY_PREFIX}${slug}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      // sessionStorage indisponível (modo privado, etc): segue sem dedup
    }

    fetch(`/api/articles/${encodeURIComponent(slug)}/view`, { method: "POST" }).catch(() => {
      // silencioso: contagem de views não é crítica para a experiência
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return null;
}
