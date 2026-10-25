"use client";

import React, { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json().catch(() => ({ ok: false, error: "Resposta inválida do servidor." }));

      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(data.error || "Não foi possível concluir sua inscrição. Tente novamente.");
        return;
      }

      setStatus("success");
      setMessage("Inscrição confirmada! Você vai receber as principais notícias por e-mail.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Falha de conexão. Verifique sua internet e tente novamente.");
    }
  };

  return (
    <div className="flex flex-col">
      <h3 className="font-montserrat font-black text-sm uppercase tracking-widest text-text mb-3 border-b-2 border-sky-600 pb-1 inline-block w-fit">
        Newsletter
      </h3>
      <div className="bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-100 p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <p className="text-[12px] font-semibold text-sky-900/80 leading-relaxed mb-4">
          Receba as principais notícias da região direto no seu e-mail, gratuitamente.
        </p>

        {status === "success" ? (
          <div className="flex items-start gap-2 bg-emerald-100 border border-emerald-200 rounded-md px-3 py-2.5">
            <span className="text-emerald-600 shrink-0">✓</span>
            <span className="text-[12px] font-bold text-emerald-800 leading-snug">{message}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              disabled={status === "loading"}
              className="w-full px-3 py-2.5 rounded-md border border-sky-200 bg-white text-[13px] font-semibold text-sky-950 placeholder:text-sky-400 placeholder:font-medium focus:outline-none focus:ring-2 focus:ring-sky-400 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-2.5 rounded-md bg-sky-600 hover:bg-sky-700 disabled:bg-sky-400 text-white text-[12px] font-black uppercase tracking-widest transition-colors"
            >
              {status === "loading" ? "Enviando..." : "Inscrever"}
            </button>

            {status === "error" && (
              <span className="text-[11px] font-bold text-red-600 leading-snug mt-1">{message}</span>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default Newsletter;
