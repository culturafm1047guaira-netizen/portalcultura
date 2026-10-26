"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center bg-white dark:bg-slate-900">
      <span className="font-montserrat text-5xl font-black" style={{ color: "var(--color-sintonia-azul)" }}>
        104.7
      </span>
      <h1 className="font-montserrat text-2xl font-black uppercase text-dark-bg dark:text-white">
        Algo deu errado
      </h1>
      <p className="text-sm text-text-muted max-w-md">
        Tivemos um problema inesperado ao carregar esta página. Tente novamente — se continuar, volte para a página inicial.
      </p>
      <div className="flex gap-3 mt-2">
        <button
          type="button"
          onClick={reset}
          className="px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider text-white bg-primary hover:opacity-90 transition-opacity"
        >
          Tentar novamente
        </button>
        <a
          href="/"
          className="px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider border border-border text-dark-bg dark:text-white hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
        >
          Página inicial
        </a>
      </div>
    </div>
  );
}
