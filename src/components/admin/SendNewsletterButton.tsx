"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "done" | "error";

export default function SendNewsletterButton({ subscriberCount }: { subscriberCount: number }) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSend() {
    if (status === "sending") return;

    if (!window.confirm(`Enviar o resumo da semana para ${subscriberCount} inscrito(s)? Essa ação não pode ser desfeita.`)) {
      return;
    }

    setStatus("sending");
    setMessage("");

    try {
      const res = await fetch("/api/admin/newsletter/send", { method: "POST" });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(data.error || "Falha ao enviar.");
        return;
      }

      setStatus("done");
      setMessage(`Enviado para ${data.sent} de ${data.total} inscrito(s)${data.failed > 0 ? ` (${data.failed} falharam)` : ""}.`);
    } catch {
      setStatus("error");
      setMessage("Falha de conexão.");
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={handleSend}
        disabled={status === "sending" || subscriberCount === 0}
        className="bg-primary hover:bg-primary-dark text-white font-semibold rounded-md px-5 py-2.5 text-sm transition-colors disabled:opacity-60 w-fit"
      >
        {status === "sending" ? "Enviando..." : "Enviar resumo da semana agora"}
      </button>
      {message && (
        <span className={`text-sm font-semibold ${status === "error" ? "text-red-600" : "text-emerald-700"}`}>
          {message}
        </span>
      )}
    </div>
  );
}
