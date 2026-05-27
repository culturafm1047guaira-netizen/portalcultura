import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import Link from "next/link";
import { getAllIndicators, type EconomiaData } from "@/lib/dados-financeiros";

export const metadata = {
  title: "Economia — Rádio Cultura FM 104.7",
  description:
    "Cotações, indicadores econômicos, inflação, taxas de juros e dados financeiros do Brasil em tempo real — Banco Central.",
};

export const dynamic = "force-dynamic";

function formatValor(v: number | undefined | null, casas: number = 2): string {
  if (v === null || v === undefined) return "—";
  return v.toLocaleString("pt-BR", { minimumFractionDigits: casas, maximumFractionDigits: casas });
}

function DolarCard({ data }: { data: EconomiaData["dolar"] }) {
  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-5 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <span className="text-2xl">💵</span>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-green-700 bg-green-100 px-2 py-0.5 rounded-full">Dólar Comercial</span>
      </div>
      <div className="space-y-1">
        <p className="text-[12px] text-text-muted">Compra</p>
        <p className="font-montserrat text-2xl font-extrabold text-dark-bg">
          {data ? `R$ ${formatValor(data.cotacaoCompra)}` : "—"}
        </p>
        <p className="text-[12px] text-text-muted mt-2">Venda</p>
        <p className="font-montserrat text-2xl font-extrabold text-dark-bg">
          {data ? `R$ ${formatValor(data.cotacaoVenda)}` : "—"}
        </p>
      </div>
      <p className="text-[10px] text-gray-400 mt-3">
        {data ? `Fonte: BCB PTAX • ${new Date(data.dataHora).toLocaleString("pt-BR")}` : "Fonte: Banco Central do Brasil"}
      </p>
    </div>
  );
}

function SelicCard({ selic, selicMeta }: { selic: EconomiaData["selic"]; selicMeta: EconomiaData["selicMeta"] }) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <span className="text-2xl">📊</span>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">Selic</span>
      </div>
      <div className="space-y-1">
        <p className="text-[12px] text-text-muted">Taxa Diária</p>
        <p className="font-montserrat text-3xl font-extrabold text-dark-bg">
          {selic ? `${formatValor(selic.valor)}%` : "—"}
        </p>
        <p className="text-[11px] text-text-muted">{selic ? `a.a. • ${selic.data}` : ""}</p>
      </div>
      <div className="mt-3 pt-3 border-t border-blue-100">
        <p className="text-[12px] text-text-muted">Meta Copom</p>
        <p className="font-montserrat text-xl font-bold text-dark-bg">
          {selicMeta ? `${formatValor(selicMeta.valor)}% a.a.` : "—"}
        </p>
        <p className="text-[10px] text-gray-400 mt-1">
          {selicMeta ? `Atualizado em ${selicMeta.data}` : "Fonte: BCB SGS"}
        </p>
      </div>
    </div>
  );
}

function InflacaoCard({ data }: { data: EconomiaData["inflacao"] }) {
  const ultimoIPCA = data?.ipca?.at(-1);
  const ultimoIGPM = data?.igpm?.at(-1);
  const ultimoINPC = data?.inpc?.at(-1);

  return (
    <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-5 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <span className="text-2xl">📈</span>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full">Inflação</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-[11px] text-text-muted mb-0.5">IPCA (mensal)</p>
          <p className="font-montserrat text-lg font-extrabold text-dark-bg">
            {ultimoIPCA ? `${formatValor(ultimoIPCA.valor)}%` : "—"}
          </p>
          <p className="text-[9px] text-gray-400">{ultimoIPCA?.data ?? ""}</p>
        </div>
        <div>
          <p className="text-[11px] text-text-muted mb-0.5">IPCA (12m)</p>
          <p className="font-montserrat text-lg font-extrabold text-dark-bg">
            {data?.ipcaAcumulado ? `${formatValor(data.ipcaAcumulado.valor)}%` : "—"}
          </p>
          <p className="text-[9px] text-gray-400">{data?.ipcaAcumulado?.data ?? ""}</p>
        </div>
        <div>
          <p className="text-[11px] text-text-muted mb-0.5">IGP-M (mensal)</p>
          <p className="font-montserrat text-lg font-extrabold text-dark-bg">
            {ultimoIGPM ? `${formatValor(ultimoIGPM.valor)}%` : "—"}
          </p>
          <p className="text-[9px] text-gray-400">{ultimoIGPM?.data ?? ""}</p>
        </div>
        <div>
          <p className="text-[11px] text-text-muted mb-0.5">INPC (mensal)</p>
          <p className="font-montserrat text-lg font-extrabold text-dark-bg">
            {ultimoINPC ? `${formatValor(ultimoINPC.valor)}%` : "—"}
          </p>
          <p className="text-[9px] text-gray-400">{ultimoINPC?.data ?? ""}</p>
        </div>
      </div>
      <p className="text-[10px] text-gray-400 mt-3">Fonte: BCB SGS / IBGE</p>
    </div>
  );
}

function CreditoCard({ data }: { data: EconomiaData["credito"] }) {
  const ultimoComp = data?.comprometimentoRenda?.at(-1);
  const ultimoInad = data?.inadimplencia?.at(-1);
  const ultimoEndiv = data?.endividamento?.at(-1);
  const ultimoSaldo = data?.saldoCredito?.at(-1);

  return (
    <div className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 rounded-xl p-5 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <span className="text-2xl">🏦</span>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">Crédito</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-[11px] text-text-muted mb-0.5">Comprom. Renda</p>
          <p className="font-montserrat text-lg font-extrabold text-dark-bg">
            {ultimoComp ? `${formatValor(ultimoComp.valor)}%` : "—"}
          </p>
        </div>
        <div>
          <p className="text-[11px] text-text-muted mb-0.5">Inadimplência PF</p>
          <p className="font-montserrat text-lg font-extrabold text-dark-bg">
            {ultimoInad ? `${formatValor(ultimoInad.valor)}%` : "—"}
          </p>
        </div>
        <div>
          <p className="text-[11px] text-text-muted mb-0.5">Endividamento</p>
          <p className="font-montserrat text-lg font-extrabold text-dark-bg">
            {ultimoEndiv ? `${formatValor(ultimoEndiv.valor)}%` : "—"}
          </p>
        </div>
        <div>
          <p className="text-[11px] text-text-muted mb-0.5">Saldo Crédito</p>
          <p className="font-montserrat text-lg font-extrabold text-dark-bg">
            {ultimoSaldo ? `R$ ${formatValor(ultimoSaldo.valor)} bi` : "—"}
          </p>
        </div>
      </div>
      <p className="text-[10px] text-gray-400 mt-3">Fonte: BCB SGS</p>
    </div>
  );
}

function PixCard({ data }: { data: EconomiaData["pix"] }) {
  return (
    <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-200 rounded-xl p-5 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <span className="text-2xl">⚡</span>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-teal-700 bg-teal-100 px-2 py-0.5 rounded-full">Pix</span>
      </div>
      <div className="space-y-1">
        <p className="text-[12px] text-text-muted">Chaves Cadastradas</p>
        <p className="font-montserrat text-2xl font-extrabold text-dark-bg">
          {data?.chaves ? formatValor(data.chaves, 0) : "—"}
        </p>
      </div>
      <p className="text-[10px] text-gray-400 mt-3">Fonte: BCB SPI</p>
    </div>
  );
}

function InstituicoesCard({ data }: { data: EconomiaData["instituicoes"] }) {
  return (
    <div className="bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-200 rounded-xl p-5 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <span className="text-2xl">🏛️</span>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">SFN</span>
      </div>
      <div className="space-y-1">
        <p className="text-[12px] text-text-muted">Instituições Autorizadas</p>
        <p className="font-montserrat text-2xl font-extrabold text-dark-bg">
          {data?.total ? `${data.total}+` : "—"}
        </p>
        <p className="text-[11px] text-text-muted">Banco Central</p>
      </div>
      <p className="text-[10px] text-gray-400 mt-3">Fonte: BCB BcBase</p>
    </div>
  );
}

// ─── Dados estáticos complementares ──────────────────────────

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
  {
    title: "Dados Abertos e Transparência",
    icon: "🔓",
    items: [
      { name: "Portal da Transparência", href: "https://portaldatransparencia.gov.br/", desc: "Execução orçamentária, transferências e gastos federais (CGU)." },
      { name: "Tesouro Transparente", href: "https://www.tesourotransparente.gov.br/", desc: "Dívida pública, resultado primário e dados SIAFI." },
      { name: "IBGE SIDRA", href: "https://sidra.ibge.gov.br/", desc: "IPCA, PIB, desemprego e produção industrial (IBGE)." },
      { name: "Dados Abertos BCB", href: "https://dadosabertos.bcb.gov.br/", desc: "Catálogo de dados abertos do Banco Central." },
      { name: "Diário Oficial da União", href: "https://www.in.gov.br/", desc: "Atos normativos, portarias e decretos federais." },
      { name: "Receita Federal", href: "https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/dados-abertos", desc: "Arrecadação federal mensal e dados abertos." },
      { name: "STF Jurisprudência", href: "https://jurisprudencia.stf.jus.br/", desc: "Consultar decisões judiciais do Supremo Tribunal Federal." },
    ],
  },
  {
    title: "Mapeamento Editorial",
    icon: "📋",
    items: [
      { name: "Dinheiro Público Explicado", href: "https://www.bcb.gov.br/", desc: "Pilar: Gasto Público e Tributação — Dólar, crédito e dados bancários." },
      { name: "O que isso muda na sua vida", href: "https://www.bcb.gov.br/", desc: "Pilar: Direitos do Cidadão — Selic, inadimplência e comprometimento de renda." },
      { name: "Entenda a decisão", href: "https://www.bcb.gov.br/", desc: "Pilar: Análise de Atos Oficiais — Selic diária e taxas de crédito." },
      { name: "Promessa vs. Realidade", href: "https://www.ibge.gov.br/", desc: "Pilar: Narrativa vs. Realidade — IPCA, IFData e estatísticas Pix." },
    ],
  },
];

// ─── Página Principal ────────────────────────────────────────

export default async function EconomiaPage() {
  const data = await getAllIndicators();

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <Header />

      <main className="container py-8 flex-1">
        <div className="text-[12px] text-gray-400 mb-6">
          <Link href="/" className="text-primary hover:underline">Início</Link> &rsaquo; <strong>Economia</strong>
        </div>

        <div className="text-center mb-8">
          <h1 className="font-montserrat text-3xl font-extrabold text-dark-bg uppercase tracking-wider mb-2">
            Economia
          </h1>
          <p className="text-[15px] text-text-muted max-w-2xl mx-auto">
            Indicadores econômicos, cotações, inflação e dados financeiros do Brasil.
            Atualizado automaticamente via APIs do Banco Central do Brasil.
          </p>
          <p className="text-[11px] text-gray-400 mt-2">
            Última coleta: {data.horarioColeta} • Fonte: {data.fonte}
          </p>
        </div>

        {/* Dashboard de indicadores ao vivo */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xl">📡</span>
            <h2 className="font-montserrat text-xl font-bold text-dark-bg uppercase tracking-wide">
              Indicadores ao Vivo
            </h2>
            <div className="flex-1 border-b border-border" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <DolarCard data={data.dolar} />
            <SelicCard selic={data.selic} selicMeta={data.selicMeta} />
            <InflacaoCard data={data.inflacao} />
            <CreditoCard data={data.credito} />
            <PixCard data={data.pix} />
            <InstituicoesCard data={data.instituicoes} />
          </div>
        </section>

        {/* Painel de séries históricas - últimos valores */}
        {data.inflacao && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-xl">📜</span>
              <h2 className="font-montserrat text-xl font-bold text-dark-bg uppercase tracking-wide">
                Série Histórica — IPCA (últimos 12 meses)
              </h2>
              <div className="flex-1 border-b border-border" />
            </div>

            <div className="overflow-x-auto bg-white border border-border rounded-xl">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-border">
                    <th className="text-left py-3 px-4 font-montserrat font-bold text-[12px] text-dark-bg uppercase">Mês</th>
                    <th className="text-right py-3 px-4 font-montserrat font-bold text-[12px] text-dark-bg uppercase">IPCA (%)</th>
                    <th className="text-right py-3 px-4 font-montserrat font-bold text-[12px] text-dark-bg uppercase">IGP-M (%)</th>
                    <th className="text-right py-3 px-4 font-montserrat font-bold text-[12px] text-dark-bg uppercase">INPC (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {data.inflacao.ipca.map((item, i) => {
                    const igpm = data.inflacao!.igpm[i];
                    const inpc = data.inflacao!.inpc[i];
                    return (
                      <tr key={item.data} className="border-b border-border hover:bg-gray-50 transition-colors">
                        <td className="py-2.5 px-4 text-[13px] font-medium text-dark-bg">{item.data}</td>
                        <td className="py-2.5 px-4 text-[13px] text-right">{formatValor(item.valor)}%</td>
                        <td className="py-2.5 px-4 text-[13px] text-right">{igpm ? `${formatValor(igpm.valor)}%` : "—"}</td>
                        <td className="py-2.5 px-4 text-[13px] text-right">{inpc ? `${formatValor(inpc.valor)}%` : "—"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-[10px] text-gray-400 mt-2">Fonte: BCB SGS (séries 433, 189, 188)</p>
          </section>
        )}

        {/* Série crédito */}
        {data.credito && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-xl">📜</span>
              <h2 className="font-montserrat text-xl font-bold text-dark-bg uppercase tracking-wide">
                Série Histórica — Crédito (últimos 12 meses)
              </h2>
              <div className="flex-1 border-b border-border" />
            </div>

            <div className="overflow-x-auto bg-white border border-border rounded-xl">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-border">
                    <th className="text-left py-3 px-4 font-montserrat font-bold text-[12px] text-dark-bg uppercase">Mês</th>
                    <th className="text-right py-3 px-4 font-montserrat font-bold text-[12px] text-dark-bg uppercase">Comprom. Renda (%)</th>
                    <th className="text-right py-3 px-4 font-montserrat font-bold text-[12px] text-dark-bg uppercase">Inadimplência (%)</th>
                    <th className="text-right py-3 px-4 font-montserrat font-bold text-[12px] text-dark-bg uppercase">Endividamento (%)</th>
                    <th className="text-right py-3 px-4 font-montserrat font-bold text-[12px] text-dark-bg uppercase">Saldo Crédito (R$ bi)</th>
                  </tr>
                </thead>
                <tbody>
                  {data.credito.comprometimentoRenda.map((item, i) => {
                    const inad = data.credito!.inadimplencia[i];
                    const endiv = data.credito!.endividamento[i];
                    const saldo = data.credito!.saldoCredito[i];
                    return (
                      <tr key={item.data} className="border-b border-border hover:bg-gray-50 transition-colors">
                        <td className="py-2.5 px-4 text-[13px] font-medium text-dark-bg">{item.data}</td>
                        <td className="py-2.5 px-4 text-[13px] text-right">{formatValor(item.valor)}%</td>
                        <td className="py-2.5 px-4 text-[13px] text-right">{inad ? `${formatValor(inad.valor)}%` : "—"}</td>
                        <td className="py-2.5 px-4 text-[13px] text-right">{endiv ? `${formatValor(endiv.valor)}%` : "—"}</td>
                        <td className="py-2.5 px-4 text-[13px] text-right">{saldo ? formatValor(saldo.valor) : "—"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-[10px] text-gray-400 mt-2">Fonte: BCB SGS (séries 29038, 21082, 29039, 20539)</p>
          </section>
        )}

        {/* Categorias de links úteis */}
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

        {/* Rodapé informativo */}
        <div className="mt-12 p-6 bg-gray-50 border border-border rounded-xl text-center">
          <p className="text-[12px] text-text-muted leading-relaxed">
            <strong>Licença dos dados:</strong> ODbL (Open Database License) — uso livre com atribuição.<br />
            <strong>Fonte primária:</strong> Banco Central do Brasil (BCB) — Plataforma Olinda + Portal de Dados Abertos.<br />
            <strong>Automação:</strong> Coleta a cada 1 hora via scheduler (Node.js cron).<br />
            <strong>APIs públicas:</strong> Autenticação não requerida.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <a href="https://dadosabertos.bcb.gov.br/" target="_blank" rel="noopener noreferrer" className="text-[11px] font-bold text-primary hover:underline">
              Dados Abertos BCB →
            </a>
            <a href="https://olinda.bcb.gov.br/" target="_blank" rel="noopener noreferrer" className="text-[11px] font-bold text-primary hover:underline">
              Plataforma Olinda →
            </a>
            <a href="https://www3.bcb.gov.br/sgspub/" target="_blank" rel="noopener noreferrer" className="text-[11px] font-bold text-primary hover:underline">
              SGS BCB →
            </a>
            <a href="https://www.ibge.gov.br/" target="_blank" rel="noopener noreferrer" className="text-[11px] font-bold text-primary hover:underline">
              IBGE →
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
