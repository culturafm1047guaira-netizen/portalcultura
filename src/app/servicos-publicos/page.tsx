"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import Link from "next/link";

export default function ServicosPublicosPage() {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const tools = [
    { id: "cep", label: "Consultar CEP", icon: "📍" },
    { id: "cnpj", label: "Consultar CNPJ", icon: "🏢" },
    { id: "ddd", label: "Consultar DDD", icon: "📞" },
    { id: "links", label: "Links Úteis", icon: "🔗" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <Header />

      <main className="container py-8 flex-1">
        <div className="text-[12px] text-gray-400 mb-6">
          <Link href="/" className="text-primary hover:underline">Início</Link> &rsaquo; <strong>Serviços Públicos</strong>
        </div>

        <div className="text-center mb-10">
          <h1 className="font-montserrat text-3xl font-extrabold text-dark-bg uppercase tracking-wider mb-4">
            Serviços Públicos
          </h1>
          <p className="text-[15px] text-text-muted max-w-2xl mx-auto">
            Ferramentas de consulta direta a serviços públicos e bases oficiais de informação.
          </p>
        </div>

        {/* Abas de navegação */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {tools.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTool(t.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-lg font-bold text-[13px] uppercase tracking-wide transition-all ${
                activeTool === t.id
                  ? "bg-primary text-white shadow-md"
                  : "bg-white border border-border text-dark-bg hover:border-primary/30 hover:shadow-sm"
              }`}
            >
              <span>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* Conteúdo */}
        <div className="max-w-2xl mx-auto">
          {!activeTool && (
            <div className="text-center py-16 text-text-muted">
              <p className="text-lg mb-2">Selecione um serviço acima</p>
              <p className="text-[13px]">Escolha o tipo de consulta que deseja realizar.</p>
            </div>
          )}

          {activeTool === "cep" && <CepTool />}
          {activeTool === "cnpj" && <CnpjTool />}
          {activeTool === "ddd" && <DddTool />}
          {activeTool === "links" && <LinksUteis />}
        </div>
      </main>

      <Footer />
    </div>
  );
}

/* ─────── CONSULTAR CEP ─────── */
function CepTool() {
  const [cep, setCep] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const digits = cep.replace(/\D/g, "");
    if (digits.length !== 8) { setError("CEP deve ter 8 dígitos"); return; }
    setError(""); setLoading(true); setResult(null);
    try {
      const r = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
      const d = await r.json();
      if (d.erro) { setError("CEP não encontrado"); return; }
      setResult(d);
    } catch { setError("Erro ao consultar CEP"); }
    finally { setLoading(false); }
  }

  return (
    <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
      <h2 className="font-montserrat font-bold text-lg text-dark-bg mb-4">📍 Consultar CEP</h2>
      <form onSubmit={handleSearch} className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Digite o CEP (ex: 14780000)"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          className="flex-1 border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          maxLength={9}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white px-6 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? "Consultando..." : "Consultar"}
        </button>
      </form>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      {result && (
        <div className="bg-gray-50 border border-border rounded-lg p-4 text-sm space-y-1">
          <p><strong>CEP:</strong> {result.cep}</p>
          <p><strong>Logradouro:</strong> {result.logradouro}</p>
          <p><strong>Bairro:</strong> {result.bairro}</p>
          <p><strong>Cidade:</strong> {result.localidade} - {result.uf}</p>
          {result.complemento && <p><strong>Complemento:</strong> {result.complemento}</p>}
          <p><strong>DDD:</strong> {result.ddd}</p>
          <p><strong>IBGE:</strong> {result.ibge}</p>
        </div>
      )}
    </div>
  );
}

/* ─────── CONSULTAR CNPJ ─────── */
function CnpjTool() {
  const [cnpj, setCnpj] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const digits = cnpj.replace(/\D/g, "");
    if (digits.length !== 14) { setError("CNPJ deve ter 14 dígitos"); return; }
    setError(""); setLoading(true); setResult(null);
    try {
      const r = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${digits}`);
      if (!r.ok) { const err = await r.json(); setError(err.message || "CNPJ não encontrado"); return; }
      const d = await r.json();
      setResult(d);
    } catch { setError("Erro ao consultar CNPJ"); }
    finally { setLoading(false); }
  }

  return (
    <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
      <h2 className="font-montserrat font-bold text-lg text-dark-bg mb-4">🏢 Consultar CNPJ</h2>
      <form onSubmit={handleSearch} className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Digite o CNPJ (ex: 00000000000191)"
          value={cnpj}
          onChange={(e) => setCnpj(e.target.value)}
          className="flex-1 border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          maxLength={18}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white px-6 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? "Consultando..." : "Consultar"}
        </button>
      </form>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      {result && (
        <div className="bg-gray-50 border border-border rounded-lg p-4 text-sm space-y-1">
          <p><strong>Razão Social:</strong> {result.razao_social || result.nome}</p>
          <p><strong>Nome Fantasia:</strong> {result.nome_fantasia || "-"}</p>
          <p><strong>Situação:</strong> {result.descricao_situacao_cadastral || result.situacao}</p>
          <p><strong>Endereço:</strong> {result.logradouro}, {result.numero} - {result.bairro}, {result.municipio} - {result.uf}, {result.cep}</p>
          <p><strong>Telefone:</strong> {result.ddd_telefone_1 || "-"}</p>
          <p><strong>E-mail:</strong> {result.email || "-"}</p>
          <p><strong>CNAE:</strong> {result.cnae_fiscal_descricao || result.descricao_atividade_principal}</p>
          <p><strong>Capital Social:</strong> R$ {parseFloat(result.capital_social || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
          {result.qsa?.length > 0 && (
            <div className="mt-2 pt-2 border-t border-border">
              <p className="font-bold mb-1">Sócios:</p>
              {result.qsa.map((s: any, i: number) => (
                <p key={i} className="text-[12px]">{s.nome_socio} — {s.qualificacao_socio}</p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─────── CONSULTAR DDD ─────── */
function DddTool() {
  const [ddd, setDdd] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (ddd.length !== 2) { setError("DDD deve ter 2 dígitos"); return; }
    setError(""); setLoading(true); setResult(null);
    try {
      const r = await fetch(`https://brasilapi.com.br/api/ddd/v1/${ddd}`);
      if (!r.ok) { setError("DDD não encontrado"); return; }
      const d = await r.json();
      setResult(d);
    } catch { setError("Erro ao consultar DDD"); }
    finally { setLoading(false); }
  }

  return (
    <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
      <h2 className="font-montserrat font-bold text-lg text-dark-bg mb-4">📞 Consultar DDD</h2>
      <form onSubmit={handleSearch} className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Digite o DDD (ex: 17)"
          value={ddd}
          onChange={(e) => setDdd(e.target.value.replace(/\D/g, "").slice(0, 2))}
          className="flex-1 border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          maxLength={2}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white px-6 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? "Consultando..." : "Consultar"}
        </button>
      </form>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      {result && (
        <div className="bg-gray-50 border border-border rounded-lg p-4 text-sm">
          <p className="font-bold mb-2">Estado: {result.state}</p>
          <p className="font-bold mb-1">Cidades:</p>
          <div className="grid grid-cols-3 gap-1 text-[12px]">
            {result.cities.map((c: string, i: number) => (
              <span key={i}>{c}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────── LINKS ÚTEIS ─────── */
function LinksUteis() {
  const links = [
    { name: "Certidão Negativa de Débitos (CND)", href: "https://certidao.receita.fazenda.gov.br/", desc: "Emitir certidão negativa de débitos federais (Receita Federal)." },
    { name: "Situação CPF", href: "https://www.gov.br/receitafederal/pt-br/assuntos/meu-cpf", desc: "Consultar situação cadastral do CPF na Receita Federal." },
    { name: "Consultar CNPJ (Receita Federal)", href: "https://www.gov.br/receitafederal/pt-br/assuntos/meu-cnpj", desc: "Consulta pública de CNPJ no site oficial da Receita." },
    { name: "Portal da Transparência", href: "https://portaldatransparencia.gov.br/", desc: "Gastos e receitas do Governo Federal." },
    { name: "Meu INSS", href: "https://meu.inss.gov.br/", desc: "Acessar benefícios, extrato previdenciário e agendamentos." },
    { name: "gov.br", href: "https://www.gov.br/", desc: "Portal único do Governo Federal com todos os serviços." },
    { name: "Enem — INEP", href: "https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem", desc: "Resultados, inscrições e informações do Enem." },
    { name: "Fies — MEC", href: "https://www.gov.br/mec/pt-br/fies", desc: "Financiamento Estudantil do MEC." },
    { name: "Sisu — MEC", href: "https://www.gov.br/mec/pt-br/sisu", desc: "Sistema de Seleção Unificada para ingresso no ensino superior." },
    { name: "TSE — Título de Eleitor", href: "https://www.tse.jus.br/servicos-eleitorais/titulo-eleitoral", desc: "Consultar situação do título de eleitor e local de votação." },
  ];

  return (
    <div className="space-y-4">
      <h2 className="font-montserrat font-bold text-lg text-dark-bg mb-2">🔗 Links Úteis</h2>
      <p className="text-[13px] text-text-muted mb-4">Acesso direto aos serviços oficiais do Governo Federal:</p>
      {links.map((l) => (
        <a
          key={l.name}
          href={l.href}
          target="_blank"
          rel="noopener"
          className="block bg-white border border-border rounded-lg p-4 hover:shadow-md hover:border-primary/30 transition-all"
        >
          <h3 className="font-montserrat font-bold text-sm text-dark-bg mb-1 hover:text-primary transition-colors">{l.name}</h3>
          <p className="text-[12px] text-text-muted">{l.desc}</p>
        </a>
      ))}
    </div>
  );
}
