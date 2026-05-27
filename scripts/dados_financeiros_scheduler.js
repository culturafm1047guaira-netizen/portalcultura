// Script de coleta automática de dados financeiros do Banco Central do Brasil
// Requer: node-cron, node-fetch
// Instalar: npm install node-cron node-fetch
//
// Uso: node scripts/dados_financeiros_scheduler.js
// Ou em produção com PM2: pm2 start scripts/dados_financeiros_scheduler.js --name "bcb-coletor"

import cron from "node-cron";
import fetch from "node-fetch";

const CACHE = {
  dolar: null,
  selic: null,
  selicMeta: null,
  ipca: null,
};

const LIMIARES = {
  dolar: { variacao_percentual: 1.0, variacao_absoluta: 0.05 },
  selic_meta: { mudanca_bp: 1 },
  ipca_mensal: { variacao_percentual: 0.1 },
  inadimplencia: { variacao_pontos: 0.2 },
  comprometimento_renda: { variacao_pontos: 0.5 },
};

function dataHojePTAX() {
  const hoje = new Date();
  const mm = String(hoje.getMonth() + 1).padStart(2, "0");
  const dd = String(hoje.getDate()).padStart(2, "0");
  const yyyy = hoje.getFullYear();
  return `${mm}-${dd}-${yyyy}`;
}

function variacaoPercentual(novo, antigo) {
  if (!antigo || antigo === 0) return 0;
  return Math.abs(((novo - antigo) / antigo) * 100);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─── COLETA: CÂMBIO ──────────────────────────────────────────
async function coletarDolar() {
  const url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${dataHojePTAX()}'&$format=json&$top=1`;

  try {
    await sleep(500);
    const res = await fetch(url);
    if (!res.ok) { console.warn(`[CÂMBIO] HTTP ${res.status}`); return; }

    const data = await res.json();
    const item = data.value?.[0];
    if (!item) { console.warn("[CÂMBIO] Nenhuma cotação disponível hoje (pode ser fim de semana)."); return; }

    const atual = item.cotacaoVenda;

    if (CACHE.dolar !== null && variacaoPercentual(atual, CACHE.dolar) >= LIMIARES.dolar.variacao_percentual) {
      dispararPauta("CAMBIO", {
        indicador: "Dólar Comercial (venda)",
        valorAtual: atual,
        valorAnterior: CACHE.dolar,
        variacao: variacaoPercentual(atual, CACHE.dolar).toFixed(2) + "%",
        horario: item.dataHoraCotacao,
        fonte: "Banco Central do Brasil — PTAX",
        url_fonte: "https://dadosabertos.bcb.gov.br/dataset/dolar-americano-usd-todos-os-boletins-diarios",
      });
    }

    CACHE.dolar = atual;
    console.log(`[${new Date().toISOString()}] Dólar: R$ ${atual}`);
  } catch (err) {
    console.error("[CÂMBIO] Erro:", err.message);
  }
}

// ─── COLETA: SELIC ───────────────────────────────────────────
async function coletarSelic() {
  try {
    await sleep(500);
    const res = await fetch("https://api.bcb.gov.br/dados/serie/bcdata.sgs.11/dados/ultimos/1?formato=json");
    if (!res.ok) { console.warn(`[SELIC] HTTP ${res.status}`); return; }

    const data = await res.json();
    const atual = parseFloat(data[0]?.valor);

    if (isNaN(atual)) { console.warn("[SELIC] Valor inválido"); return; }

    if (CACHE.selic !== null && atual !== CACHE.selic) {
      dispararPauta("SELIC", {
        indicador: "Taxa Selic Diária",
        valorAtual: atual + "% a.a.",
        valorAnterior: CACHE.selic + "% a.a.",
        variacao: (atual - CACHE.selic).toFixed(4) + " p.p.",
        data: data[0]?.data,
        fonte: "Banco Central do Brasil — SGS série 11",
        url_fonte: "https://api.bcb.gov.br/dados/serie/bcdata.sgs.11/dados",
      });
    }

    CACHE.selic = atual;
    console.log(`[${new Date().toISOString()}] Selic: ${atual}% a.a.`);
  } catch (err) {
    console.error("[SELIC] Erro:", err.message);
  }
}

// ─── COLETA: META SELIC (COPOM) ──────────────────────────────
async function coletarSelicMeta() {
  try {
    await sleep(500);
    const res = await fetch("https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados/ultimos/1?formato=json");
    if (!res.ok) return;
    const data = await res.json();
    const atual = parseFloat(data[0]?.valor);

    if (isNaN(atual)) return;

    if (CACHE.selicMeta !== null && atual !== CACHE.selicMeta) {
      dispararPauta("SELIC", {
        indicador: "Meta da Selic (Copom)",
        valorAtual: atual + "% a.a.",
        valorAnterior: CACHE.selicMeta + "% a.a.",
        variacao: (atual - CACHE.selicMeta).toFixed(2) + " p.p.",
        data: data[0]?.data,
        fonte: "Banco Central do Brasil — SGS série 432",
        url_fonte: "https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados",
      });
    }

    CACHE.selicMeta = atual;
    console.log(`[${new Date().toISOString()}] Meta Selic: ${atual}% a.a.`);
  } catch (err) {
    console.error("[META SELIC] Erro:", err.message);
  }
}

// ─── COLETA: IPCA ────────────────────────────────────────────
async function coletarIPCA() {
  try {
    await sleep(500);
    const res = await fetch("https://api.bcb.gov.br/dados/serie/bcdata.sgs.433/dados/ultimos/1?formato=json");
    if (!res.ok) return;
    const data = await res.json();
    const atual = parseFloat(data[0]?.valor);

    if (isNaN(atual)) return;

    if (CACHE.ipca !== null && variacaoPercentual(atual, CACHE.ipca) >= LIMIARES.ipca_mensal.variacao_percentual) {
      dispararPauta("IPCA", {
        indicador: "IPCA Mensal",
        valorAtual: atual + "%",
        valorAnterior: CACHE.ipca + "%",
        variacao: (atual - CACHE.ipca).toFixed(2) + " p.p.",
        data: data[0]?.data,
        fonte: "Banco Central do Brasil — SGS série 433 / IBGE",
        url_fonte: "https://api.bcb.gov.br/dados/serie/bcdata.sgs.433/dados",
      });
    }

    CACHE.ipca = atual;
    console.log(`[${new Date().toISOString()}] IPCA: ${atual}%`);
  } catch (err) {
    console.error("[IPCA] Erro:", err.message);
  }
}

// ─── TEMPLATE EDITORIAL ──────────────────────────────────────
function dispararPauta(tipo, dados) {
  const rascunho = gerarRascunho(tipo, dados);

  console.log("\n════════════════════════════════════════");
  console.log("⚡ GATILHO EDITORIAL DISPARADO:", tipo);
  console.log("════════════════════════════════════════");
  console.log(rascunho);
  console.log("════════════════════════════════════════\n");
}

function gerarRascunho(tipo, dados) {
  const templates = {
    CAMBIO: `
📌 RASCUNHO — CÂMBIO
────────────────────
FATO
O Banco Central registrou nova cotação do ${dados.indicador}: R$ ${dados.valorAtual}
(anterior: R$ ${dados.valorAnterior}) — variação de ${dados.variacao}.

CONTEXTO
Atualização automática via boletim PTAX do BCB, horário: ${dados.horario}.

DADO OBJETIVO
Variação de ${dados.variacao} em relação à última cotação monitorada.

ANÁLISE CRÍTICA
[REDATOR: avaliar se variação reflete pressão externa, fluxo de capital ou decisão de política monetária.]

IMPACTO REAL
Para o cidadão: produtos importados, passagens aéreas e dívidas em dólar
sofrem impacto direto proporcional à variação cambial.

FONTE
${dados.fonte}
${dados.url_fonte}
`,

    SELIC: `
📌 RASCUNHO — SELIC
────────────────────
FATO
A taxa Selic registrou variação: de ${dados.valorAnterior} para ${dados.valorAtual}
(${dados.variacao}) em ${dados.data}.

CONTEXTO
A Selic é a taxa básica de juros da economia brasileira, definida pelo Copom
a cada ~45 dias, com efeito imediato sobre crédito, investimentos e inflação.

DADO OBJETIVO
Variação de ${dados.variacao} na taxa vigente.

ANÁLISE CRÍTICA
[REDATOR: identificar se variação é ajuste técnico ou sinaliza mudança de ciclo monetário.]

IMPACTO REAL
Para o cidadão: variações da Selic afetam diretamente financiamentos,
rendimento de renda fixa (CDB, Tesouro Selic) e custo do crédito pessoal.

FONTE
${dados.fonte}
${dados.url_fonte}
`,

    IPCA: `
📌 RASCUNHO — IPCA
───────────────────
FATO
O IPCA mensal registrou ${dados.valorAtual} (anterior: ${dados.valorAnterior})
— variação de ${dados.variacao} em ${dados.data}.

CONTEXTO
O IPCA é o índice oficial de inflação do Brasil, medido pelo IBGE.

DADO OBJETIVO
Variação de ${dados.variacao} no índice mensal.

ANÁLISE CRÍTICA
[REDATOR: comparar com a meta de inflação e expectativas do mercado (Focus).]

IMPACTO REAL
Para o cidadão: inflação alta reduz o poder de compra; inflação baixa
pode indicar desaquecimento econômico.

FONTE
${dados.fonte}
${dados.url_fonte}
`,
  };

  return templates[tipo] || JSON.stringify(dados, null, 2);
}

// ─── CRON: a cada 1 hora (dias úteis 8h–18h) ────────────────
if (process.argv.includes("--daemon")) {
  console.log("Portal de Notícias — Módulo de Dados Financeiros (daemon)");
  console.log("Fuso horário: America/Sao_Paulo\n");

  cron.schedule("0 8-18 * * 1-5", async () => {
    console.log(`\n[${new Date().toISOString()}] Iniciando coleta horária...`);
    await Promise.all([coletarDolar(), coletarSelic(), coletarSelicMeta(), coletarIPCA()]);
  }, { timezone: "America/Sao_Paulo" });

  // Execução imediata na inicialização
  (async () => {
    await Promise.all([coletarDolar(), coletarSelic(), coletarSelicMeta(), coletarIPCA()]);
  })();
} else {
  // Execução única
  console.log("Portal de Notícias — Coleta única de Dados Financeiros\n");
  (async () => {
    await Promise.all([coletarDolar(), coletarSelic(), coletarSelicMeta(), coletarIPCA()]);
    console.log("\nColeta concluída.");
  })();
}
