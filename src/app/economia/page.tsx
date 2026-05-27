import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import Link from "next/link";

export const metadata = {
  title: "Economia — Rádio Cultura FM 104.7",
  description: "Cotações, indicadores econômicos, finanças pessoais e notícias da economia brasileira e internacional.",
};

interface EconItem {
  name: string;
  href: string;
  desc: string;
}

interface EconCategory {
  title: string;
  icon: string;
  items: EconItem[];
}

const categories: EconCategory[] = [
  {
    title: "Cotações",
    icon: "💵",
    items: [
      { name: "Dólar Comercial", href: "https://www.bcb.gov.br/estabilidadefinanceira/cotacaomoedas", desc: "Cotação oficial do dólar comercial pelo Banco Central." },
      { name: "Dólar Turismo", href: "https://www.bcb.gov.br/estabilidadefinanceira/cotacaomoedas", desc: "Cotação do dólar turismo usada em viagens e compras internacionais." },
      { name: "Euro", href: "https://www.bcb.gov.br/estabilidadefinanceira/cotacaomoedas", desc: "Cotação oficial do euro pelo Banco Central." },
      { name: "Libra Esterlina", href: "https://www.bcb.gov.br/estabilidadefinanceira/cotacaomoedas", desc: "Cotação oficial da libra esterlina pelo Banco Central." },
      { name: "Peso Argentino", href: "https://www.bcb.gov.br/estabilidadefinanceira/cotacaomoedas", desc: "Cotação oficial do peso argentino pelo Banco Central." },
    ],
  },
  {
    title: "Bolsas e Índices",
    icon: "📈",
    items: [
      { name: "Ibovespa (B3)", href: "https://www.b3.com.br/pt_br/cotacoes-e-indices/indices/indices-amplos/ibovespa.htm", desc: "Principal índice da bolsa de valores brasileira (B3)." },
      { name: "S&P 500", href: "https://www.spglobal.com/spdji/pt/indices/equity/sp-500/", desc: "Índice das 500 maiores empresas americanas." },
      { name: "NASDAQ", href: "https://www.nasdaq.com/market-activity", desc: "Índice da bolsa de tecnologia americana." },
      { name: "Dow Jones", href: "https://www.wsj.com/market-data/indices", desc: "Índice industrial da bolsa de Nova York." },
      { name: "IBrX 100", href: "https://www.b3.com.br/pt_br/cotacoes-e-indices/indices/indices-amplos/indice-brasil-100-ibrx-100.htm", desc: "Índice dos 100 ativos mais negociados da B3." },
    ],
  },
  {
    title: "Indicadores Econômicos",
    icon: "📊",
    items: [
      { name: "Taxa Selic", href: "https://www.bcb.gov.br/controleinflacao/taxaselic", desc: "Taxa básica de juros da economia brasileira." },
      { name: "IPCA (Inflação)", href: "https://www.ibge.gov.br/explica/inflacao.php", desc: "Índice Nacional de Preços ao Consumidor Amplo (IBGE)." },
      { name: "PIB", href: "https://www.ibge.gov.br/explica/pib.php", desc: "Produto Interno Bruto do Brasil (IBGE)." },
      { name: "Taxa de Desemprego", href: "https://www.ibge.gov.br/explica/desemprego.php", desc: "Taxa de desemprego no Brasil (PNAD Contínua)." },
      { name: "CDI", href: "https://www.b3.com.br/pt_br/produtos-e-servicos/negociacao/renda-fixa/certificados-de-depositos-interfinanceiros-em-credito-cdi/dados-historicos-da-taxa-cdi.htm", desc: "Taxa de Certificado de Depósito Interbancário." },
    ],
  },
  {
    title: "Finanças Pessoais",
    icon: "🏦",
    items: [
      { name: "Calculadora do Cidadão", href: "https://www.bcb.gov.br/calculadoras/calculadoracidadao", desc: "Correção de valores, poupança e financiamentos pelo BC." },
      { name: "Poupança", href: "https://www.bcb.gov.br/estatisticas/remuneradepositospoupanca", desc: "Rentabilidade da caderneta de poupança." },
      { name: "Saque FGTS", href: "https://www.caixa.gov.br/fgts/Paginas/default.aspx", desc: "Consulta e saque do Fundo de Garantia do Tempo de Serviço." },
      { name: "Abono Salarial PIS/PASEP", href: "https://www.caixa.gov.br/abono-salarial/Paginas/default.aspx", desc: "Consulta de abono salarial anual (Caixa)." },
      { name: "Imposto de Renda", href: "https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda", desc: "Declaração do Imposto de Renda Pessoa Física." },
    ],
  },
  {
    title: "Agenda Econômica",
    icon: "📅",
    items: [
      { name: "Calendário do BC", href: "https://www.bcb.gov.br/calendariodeeventos", desc: "Datas das reuniões do Copom e eventos do Banco Central." },
      { name: "Calendário de Pagamentos", href: "https://www.bcb.gov.br/estabilidadefinanceira/calendariopagamentos", desc: "Calendário de pagamentos de títulos e vencimentos." },
      { name: "Calendário do FGTS", href: "https://fgts.caixa.gov.br/calendario", desc: "Datas de saque aniversário e calendário FGTS." },
      { name: "Calendário INSS", href: "https://www.gov.br/inss/pt-br/calendario", desc: "Calendário de pagamento de benefícios do INSS." },
    ],
  },
  {
    title: "Agronegócio",
    icon: "🌾",
    items: [
      { name: "Preço Mínimo", href: "https://www.conab.gov.br/precos-minimos", desc: "Preços mínimos de produtos agrícolas (Conab)." },
      { name: "Cotações Agro", href: "https://www.cepea.esalq.usp.br/br", desc: "Cotações do agronegócio (Cepea/Esalq-USP)." },
      { name: "Clima Rural", href: "https://www.inmet.gov.br/portal/", desc: "Previsão do tempo e condições climáticas para o campo (INMET)." },
    ],
  },
];

export default function EconomiaPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <Header />

      <main className="container py-8 flex-1">
        <div className="text-[12px] text-gray-400 mb-6">
          <Link href="/" className="text-primary hover:underline">Início</Link> &rsaquo; <strong>Economia</strong>
        </div>

        <div className="text-center mb-10">
          <h1 className="font-montserrat text-3xl font-extrabold text-dark-bg uppercase tracking-wider mb-4">
            Economia
          </h1>
          <p className="text-[15px] text-text-muted max-w-2xl mx-auto">
            Cotações, indicadores, finanças pessoais e informações econômicas para o seu dia a dia.
          </p>
        </div>

        <div className="space-y-10">
          {categories.map((cat) => (
            <section key={cat.title}>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">{cat.icon}</span>
                <h2 className="font-montserrat text-xl font-bold text-dark-bg uppercase tracking-wide">
                  {cat.title}
                </h2>
                <div className="flex-1 border-b border-border" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.items.map((item, idx) => {
                  const colors = [
                    "bg-blue-50 border-blue-200 hover:border-blue-400",
                    "bg-green-50 border-green-200 hover:border-green-400",
                    "bg-purple-50 border-purple-200 hover:border-purple-400",
                    "bg-orange-50 border-orange-200 hover:border-orange-400",
                    "bg-pink-50 border-pink-200 hover:border-pink-400",
                    "bg-teal-50 border-teal-200 hover:border-teal-400",
                    "bg-indigo-50 border-indigo-200 hover:border-indigo-400",
                    "bg-yellow-50 border-yellow-200 hover:border-yellow-400",
                    "bg-red-50 border-red-200 hover:border-red-400",
                    "bg-cyan-50 border-cyan-200 hover:border-cyan-400",
                  ];
                  const c = colors[idx % colors.length];
                  return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${c} border p-5 rounded-lg hover:shadow-lg transition-all duration-200 group flex flex-col`}
                  >
                    <h3 className="font-montserrat font-bold text-sm text-dark-bg mb-2 group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-[12px] text-text-muted leading-relaxed flex-1">
                      {item.desc}
                    </p>
                    <span className="text-[11px] font-bold text-primary mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      Acessar →
                    </span>
                  </a>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
