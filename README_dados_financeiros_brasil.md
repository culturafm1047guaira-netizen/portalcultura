# README — Dados Financeiros do Brasil
## Automação para Portal de Notícias · Atualização a cada 1 hora

> **Fonte primária:** Banco Central do Brasil (BCB)  
> **Plataforma de APIs:** Olinda (`olinda.bcb.gov.br`) + Portal de Dados Abertos (`dadosabertos.bcb.gov.br`)  
> **Licença dos dados:** ODbL (Open Database License) — uso livre com atribuição  
> **Autenticação:** Não requerida (APIs públicas)  
> **Última revisão deste documento:** Maio 2026

---

## Índice

1. [Arquitetura geral do pipeline](#1-arquitetura-geral-do-pipeline)
2. [Fontes e endpoints por indicador](#2-fontes-e-endpoints-por-indicador)
3. [Frequência de atualização por indicador](#3-frequência-de-atualização-por-indicador)
4. [Lógica de gatilho editorial](#4-lógica-de-gatilho-editorial)
5. [Exemplos de chamadas de API](#5-exemplos-de-chamadas-de-api)
6. [Estrutura de resposta JSON esperada](#6-estrutura-de-resposta-json-esperada)
7. [Script base do scheduler (Node.js)](#7-script-base-do-scheduler-nodejs)
8. [Mapeamento editorial — dado → pauta](#8-mapeamento-editorial--dado--pauta)
9. [Limitações e regras de paginação](#9-limitações-e-regras-de-paginação)
10. [Fontes complementares](#10-fontes-complementares)
11. [Checklist de implementação](#11-checklist-de-implementação)

---

## 1. Arquitetura geral do pipeline

```
┌─────────────────────────────────────────────────────────────────┐
│                     SCHEDULER (cron a cada 1h)                  │
└───────────────────────────┬─────────────────────────────────────┘
                            │
              ┌─────────────▼──────────────┐
              │   MÓDULO DE COLETA (fetch)  │
              │   APIs BCB + Olinda         │
              └─────────────┬──────────────┘
                            │
              ┌─────────────▼──────────────┐
              │  MÓDULO DE COMPARAÇÃO       │
              │  valor atual vs. cache      │
              │  (último valor salvo)       │
              └─────────────┬──────────────┘
                            │
               ┌────────────┴────────────┐
               │                         │
    ┌──────────▼──────────┐   ┌──────────▼──────────┐
    │  Variação ABAIXO    │   │  Variação ACIMA      │
    │  do limiar → sleep  │   │  do limiar → dispara │
    └─────────────────────┘   └──────────┬──────────┘
                                         │
                           ┌─────────────▼─────────────┐
                           │  GERADOR DE RASCUNHO       │
                           │  (template editorial)      │
                           └─────────────┬─────────────┘
                                         │
                           ┌─────────────▼─────────────┐
                           │  FILA DE REVISÃO           │
                           │  (CMS / webhook / e-mail)  │
                           └───────────────────────────┘
```

---

## 2. Fontes e endpoints por indicador

### 2.1 Taxa de Câmbio (Dólar e demais moedas)
**Serviço:** PTAX  
**Plataforma:** Olinda v1

| Recurso | Endpoint |
|---|---|
| Cotação do dólar no dia | `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='MM-DD-YYYY'&$format=json` |
| Cotação do dólar por período | `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@dI,dataFinalCotacao=@dF)?@dI='MM-DD-YYYY'&@dF='MM-DD-YYYY'&$format=json` |
| Lista de moedas disponíveis | `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/Moedas?$format=json` |
| Cotação de moeda específica no dia | `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)?@moeda='EUR'&@dataCotacao='MM-DD-YYYY'&$format=json` |

> **Atenção:** O parâmetro `dataCotacao` usa formato americano `MM-DD-YYYY`.

---

### 2.2 Taxa Selic
**Séries Temporais BCB — código 11 (Selic diária)**

| Recurso | Endpoint |
|---|---|
| Último valor da Selic | `https://api.bcb.gov.br/dados/serie/bcdata.sgs.11/dados/ultimos/1?formato=json` |
| Selic dos últimos 30 dias | `https://api.bcb.gov.br/dados/serie/bcdata.sgs.11/dados/ultimos/30?formato=json` |
| Selic por período | `https://api.bcb.gov.br/dados/serie/bcdata.sgs.11/dados?formato=json&dataInicial=01/01/2025&dataFinal=31/12/2025` |
| Meta da Selic (série 432) | `https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados/ultimos/1?formato=json` |

> **Base:** `https://api.bcb.gov.br/dados/serie/bcdata.sgs.{CODIGO}/dados`  
> Consulte o catálogo completo de séries em: `https://www3.bcb.gov.br/sgspub/`

---

### 2.3 Taxas de Juros de Crédito
**Serviço:** taxaJuros v2  
**Plataforma:** Olinda

| Recurso | Endpoint |
|---|---|
| Taxas diárias por modalidade (últimos 5 dias úteis) | `https://olinda.bcb.gov.br/olinda/servico/taxaJuros/versao/v2/odata/TaxasJurosDiariaPorInicioPeriodo?$format=json&$top=50` |
| Taxas mensais por modalidade | `https://olinda.bcb.gov.br/olinda/servico/taxaJuros/versao/v2/odata/TaxasJurosMensalPorMes?$format=json&$top=50` |

**Filtro por modalidade** (ex.: cheque especial):
```
$filter=Modalidade eq 'Cheque especial'
```

---

### 2.4 Índices de Inflação (IPCA, IGP-M, INPC)
**Base:** SGS (Sistema Gerenciador de Séries Temporais)

| Indicador | Código SGS | Endpoint |
|---|---|---|
| IPCA (mensal) | 433 | `https://api.bcb.gov.br/dados/serie/bcdata.sgs.433/dados/ultimos/12?formato=json` |
| IPCA acumulado 12 meses | 13522 | `https://api.bcb.gov.br/dados/serie/bcdata.sgs.13522/dados/ultimos/1?formato=json` |
| IGP-M (mensal) | 189 | `https://api.bcb.gov.br/dados/serie/bcdata.sgs.189/dados/ultimos/12?formato=json` |
| INPC (mensal) | 188 | `https://api.bcb.gov.br/dados/serie/bcdata.sgs.188/dados/ultimos/12?formato=json` |
| IPC-Fipe | 193 | `https://api.bcb.gov.br/dados/serie/bcdata.sgs.193/dados/ultimos/12?formato=json` |

---

### 2.5 Crédito e Endividamento das Famílias

| Recurso | Código SGS | Endpoint |
|---|---|---|
| Comprometimento de renda (%) | 29038 | `https://api.bcb.gov.br/dados/serie/bcdata.sgs.29038/dados/ultimos/12?formato=json` |
| Inadimplência PF (%) | 21082 | `https://api.bcb.gov.br/dados/serie/bcdata.sgs.21082/dados/ultimos/12?formato=json` |
| Endividamento das famílias (%) | 29039 | `https://api.bcb.gov.br/dados/serie/bcdata.sgs.29039/dados/ultimos/12?formato=json` |
| Saldo total de crédito (R$ bi) | 20539 | `https://api.bcb.gov.br/dados/serie/bcdata.sgs.20539/dados/ultimos/12?formato=json` |

---

### 2.6 Pix — Estatísticas
**Serviço:** Pix  
**Plataforma:** Olinda

| Recurso | Endpoint |
|---|---|
| Chaves Pix cadastradas | `https://olinda.bcb.gov.br/olinda/servico/SPI/versao/v1/odata/ChavesPix?$format=json&$top=1&$orderby=DataReferencia desc` |
| Transações Pix (SPI) | `https://olinda.bcb.gov.br/olinda/servico/SPI/versao/v1/odata/EstatisticasTransacoes?$format=json&$top=1&$orderby=DataReferencia desc` |

---

### 2.7 Dados Cadastrais do SFN (Instituições Financeiras)
**Serviço:** BcBase v2  
**Plataforma:** Olinda  
**Swagger:** `https://olinda.bcb.gov.br/olinda/servico/BcBase/versao/v2/swagger-ui3#/`

| Recurso | Endpoint |
|---|---|
| Lista de instituições autorizadas | `https://olinda.bcb.gov.br/olinda/servico/BcBase/versao/v2/odata/InstituicoesBaixadas?$format=json` |
| Dados de uma instituição (por CNPJ) | `https://olinda.bcb.gov.br/olinda/servico/BcBase/versao/v2/odata/InstituicoesBaixadas(IFBaixada=@IFBaixada)?@IFBaixada='{CNPJ}'&$format=json` |

---

### 2.8 IFData — Dados Financeiros das Instituições
**Portal:** `https://www3.bcb.gov.br/ifdata/`  
**Dados abertos:** `https://dadosabertos.bcb.gov.br/dataset/?tags=Dados+Abertos+SFN`

> Contém: patrimônio líquido, lucro/prejuízo, carteira de crédito, índice de Basileia — por banco, por segmento, trimestral.

---

## 3. Frequência de atualização por indicador

| Indicador | Frequência da fonte | Estratégia de coleta recomendada |
|---|---|---|
| Câmbio (PTAX) | Diária (boletins às 10h, 11h, 12h, 13h e fechamento) | Coletar a cada 1h em dias úteis |
| Selic diária | Diária (D+1 útil) | Coletar 1x/dia às 8h |
| Meta da Selic (Copom) | A cada ~45 dias | Monitorar a cada 1h na semana de reunião |
| Taxas de crédito | Diária (últimos 5 dias úteis) | Coletar 1x/dia |
| IPCA / IGP-M / INPC | Mensal | Coletar no dia de divulgação do IBGE/FGV |
| Comprometimento de renda | Mensal | Coletar mensalmente |
| Inadimplência | Mensal | Coletar mensalmente |
| Pix — transações | Mensal | Coletar mensalmente |
| IFData | Trimestral | Coletar trimestralmente |

---

## 4. Lógica de gatilho editorial

O pipeline dispara geração de rascunho editorial quando **qualquer** dos limiares abaixo é atingido:

```javascript
const LIMIARES = {
  dolar: {
    variacao_percentual: 1.0,       // ±1,0% em relação ao fechamento anterior
    variacao_absoluta: 0.05,        // ±R$0,05 em relação à última coleta
  },
  selic_meta: {
    mudanca_bp: 1,                  // qualquer variação em pontos-base = disparo imediato
  },
  ipca_mensal: {
    variacao_percentual: 0.1,       // resultado acima ou abaixo de 0,1% vs. expectativa
  },
  inadimplencia: {
    variacao_pontos: 0.2,           // variação de 0,2 p.p. no mês
  },
  comprometimento_renda: {
    variacao_pontos: 0.5,           // variação de 0,5 p.p. no mês
  },
};
```

---

## 5. Exemplos de chamadas de API

### Dólar hoje
```bash
curl "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/\
CotacaoDolarDia(dataCotacao=@dataCotacao)?\
@dataCotacao='05-26-2026'&\$format=json"
```

### Última Selic
```bash
curl "https://api.bcb.gov.br/dados/serie/bcdata.sgs.11/dados/ultimos/1?formato=json"
```

### IPCA últimos 12 meses
```bash
curl "https://api.bcb.gov.br/dados/serie/bcdata.sgs.433/dados/ultimos/12?formato=json"
```

### Taxas de crédito — últimos 5 dias úteis
```bash
curl "https://olinda.bcb.gov.br/olinda/servico/taxaJuros/versao/v2/odata/\
TaxasJurosDiariaPorInicioPeriodo?\$format=json&\$top=20"
```

---

## 6. Estrutura de resposta JSON esperada

### 6.1 Câmbio (PTAX)
```json
{
  "@odata.context": "...",
  "value": [
    {
      "cotacaoCompra": 5.7832,
      "cotacaoVenda": 5.7838,
      "dataHoraCotacao": "2026-05-26 13:07:28.565"
    }
  ]
}
```

### 6.2 Séries Temporais (SGS — Selic, IPCA etc.)
```json
[
  {
    "data": "26/05/2026",
    "valor": "10.65"
  }
]
```

### 6.3 Taxas de Crédito (Olinda taxaJuros)
```json
{
  "value": [
    {
      "InicioPeriodo": "2026-05-22T00:00:00",
      "Segmento": "Pessoa Física",
      "Modalidade": "Cheque especial",
      "InstituicaoFinanceira": "BCO DO BRASIL S.A.",
      "TaxaJurosAoMes": 8.12,
      "TaxaJurosAoAno": 155.8,
      "cnpj8": "00000000"
    }
  ]
}
```

---

## 7. Script base do scheduler (Node.js)

```javascript
// dados_financeiros_scheduler.js
// Requer: node-cron, node-fetch (ou axios)
// Instalar: npm install node-cron node-fetch

import cron from 'node-cron';
import fetch from 'node-fetch';

// ─────────────────────────────────────────────
// CACHE em memória (substitua por Redis em prod)
// ─────────────────────────────────────────────
const cache = {
  dolar: null,
  selic: null,
};

const LIMIARES = {
  dolar: 1.0,   // variação % para disparar pauta
  selic: 1,     // qualquer mudança em bp
};

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
function dataHoje() {
  const hoje = new Date();
  const mm = String(hoje.getMonth() + 1).padStart(2, '0');
  const dd = String(hoje.getDate()).padStart(2, '0');
  const yyyy = hoje.getFullYear();
  return `${mm}-${dd}-${yyyy}`; // formato PTAX: MM-DD-YYYY
}

function variacao(novo, antigo) {
  if (!antigo) return 0;
  return Math.abs(((novo - antigo) / antigo) * 100);
}

// ─────────────────────────────────────────────
// COLETA: CÂMBIO
// ─────────────────────────────────────────────
async function coletarDolar() {
  const url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/` +
    `CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${dataHoje()}'&$format=json`;

  try {
    const res  = await fetch(url);
    const data = await res.json();
    const cotacao = data.value?.[data.value.length - 1]; // último boletim do dia

    if (!cotacao) return;

    const atual = cotacao.cotacaoVenda;

    if (cache.dolar && variacao(atual, cache.dolar) >= LIMIARES.dolar) {
      dispararPauta('CAMBIO', {
        indicador: 'Dólar Comercial (venda)',
        valorAtual: atual,
        valorAnterior: cache.dolar,
        variacao: variacao(atual, cache.dolar).toFixed(2) + '%',
        horario: cotacao.dataHoraCotacao,
        fonte: 'Banco Central do Brasil — PTAX',
        url_fonte: 'https://dadosabertos.bcb.gov.br/dataset/dolar-americano-usd-todos-os-boletins-diarios',
      });
    }

    cache.dolar = atual;
    console.log(`[${new Date().toISOString()}] Dólar: R$ ${atual}`);

  } catch (err) {
    console.error('Erro ao coletar câmbio:', err.message);
  }
}

// ─────────────────────────────────────────────
// COLETA: SELIC
// ─────────────────────────────────────────────
async function coletarSelic() {
  const url = `https://api.bcb.gov.br/dados/serie/bcdata.sgs.11/dados/ultimos/1?formato=json`;

  try {
    const res  = await fetch(url);
    const data = await res.json();
    const atual = parseFloat(data[0]?.valor);

    if (isNaN(atual)) return;

    if (cache.selic !== null && atual !== cache.selic) {
      dispararPauta('SELIC', {
        indicador: 'Taxa Selic Diária',
        valorAtual: atual + '% a.a.',
        valorAnterior: cache.selic + '% a.a.',
        variacao: (atual - cache.selic).toFixed(4) + ' p.p.',
        data: data[0]?.data,
        fonte: 'Banco Central do Brasil — SGS série 11',
        url_fonte: 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.11/dados',
      });
    }

    cache.selic = atual;
    console.log(`[${new Date().toISOString()}] Selic: ${atual}% a.a.`);

  } catch (err) {
    console.error('Erro ao coletar Selic:', err.message);
  }
}

// ─────────────────────────────────────────────
// GERADOR DE RASCUNHO EDITORIAL
// ─────────────────────────────────────────────
function dispararPauta(tipo, dados) {
  const rascunho = gerarRascunho(tipo, dados);

  console.log('\n════════════════════════════════════════');
  console.log('⚡ GATILHO EDITORIAL DISPARADO:', tipo);
  console.log('════════════════════════════════════════');
  console.log(rascunho);
  console.log('════════════════════════════════════════\n');

  // Substitua pelo seu webhook/CMS:
  // await enviarParaCMS(rascunho);
  // await enviarWebhookSlack(rascunho);
  // await salvarNoFirebase(rascunho);
}

// ─────────────────────────────────────────────
// TEMPLATE EDITORIAL (formato padrão do portal)
// ─────────────────────────────────────────────
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
A taxa Selic diária registrou variação: de ${dados.valorAnterior} para ${dados.valorAtual} 
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
  };

  return templates[tipo] || JSON.stringify(dados, null, 2);
}

// ─────────────────────────────────────────────
// CRON: a cada 1 hora (dias úteis 8h–18h)
// ─────────────────────────────────────────────
cron.schedule('0 8-18 * * 1-5', async () => {
  console.log(`\n[${new Date().toISOString()}] Iniciando coleta horária...`);
  await coletarDolar();
  await coletarSelic();
}, {
  timezone: 'America/Sao_Paulo',
});

// Execução imediata na inicialização
(async () => {
  console.log('Portal de Notícias — Módulo de Dados Financeiros iniciado.');
  await coletarDolar();
  await coletarSelic();
})();
```

---

## 8. Mapeamento editorial — dado → pauta

Este mapeamento conecta cada indicador ao **pilar editorial** e ao **quadro fixo** do portal.

| Indicador | Pilar | Quadro fixo | Quando disparar |
|---|---|---|---|
| Dólar (PTAX) | Gasto Público e Tributação | "Dinheiro Público Explicado" | Variação ≥ 1% |
| Meta Selic (Copom) | Políticas Públicas na Prática | "O que isso muda na sua vida" | Qualquer mudança |
| Selic diária | Análise de Atos Oficiais | "Entenda a decisão" | Variação detectada |
| IPCA mensal | Narrativa vs. Realidade | "Promessa vs. Realidade" | Dia de divulgação IBGE |
| Inadimplência | Direitos do Cidadão | "O que isso muda na sua vida" | Variação ≥ 0,2 p.p. |
| Comprometimento de renda | Direitos do Cidadão | "Dinheiro Público Explicado" | Variação ≥ 0,5 p.p. |
| Taxas de crédito | Análise de Atos Oficiais | "Entenda a decisão" | Nova divulgação mensal |
| Dados IFData (bancos) | Gasto Público e Tributação | "Promessa vs. Realidade" | Divulgação trimestral |
| Pix — transações | Políticas Públicas na Prática | "Promessa vs. Realidade" | Nova divulgação mensal |

---

## 9. Limitações e regras de paginação

**Limite por requisição (vigente desde março/2025)**
> Para séries históricas diárias em JSON e CSV, o volume por requisição é limitado.  
> Solução: usar `$top` e `$skip` para paginar, ou usar o parâmetro `ultimos/N` com N pequeno.

```javascript
// ERRADO — pode ser barrado para séries longas
`/dados/serie/bcdata.sgs.11/dados?formato=json&dataInicial=01/01/2000`

// CORRETO — janela curta
`/dados/serie/bcdata.sgs.11/dados/ultimos/30?formato=json`

// CORRETO — paginação OData
`/odata/TaxasJurosDiariaPorInicioPeriodo?$format=json&$top=50&$skip=0`
```

**Boas práticas gerais:**
- Não paralelizar mais de 5 requisições simultâneas ao Olinda
- Adicionar `await sleep(500)` entre chamadas em loop
- Implementar retry com backoff exponencial em caso de erro 429 ou 503
- Nunca armazenar dados em cache por mais de 55 minutos (coleta horária exige dado fresco)

---

## 10. Fontes complementares

Para os pilares editoriais que a API do BCB não cobre, use estas fontes adicionais:

| Fonte | O que fornece | URL |
|---|---|---|
| Portal da Transparência (CGU) | Execução orçamentária, transferências, gastos federais | `https://api.portaldatransparencia.gov.br/` |
| Tesouro Nacional | Dívida pública, resultado primário, SIAFI | `https://www.tesourotransparente.gov.br/` |
| IBGE — SIDRA | IPCA, PIB, desemprego (PNAD), produção industrial | `https://apisidra.ibge.gov.br/` |
| Diário Oficial da União | Atos normativos, portarias, decretos | `https://www.in.gov.br/acesso-a-informacao/dados-abertos` |
| STF — Jurisprudência | Decisões judiciais relevantes | `https://jurisprudencia.stf.jus.br/` |
| Receita Federal | Arrecadação federal mensal | `https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/dados-abertos` |

---

## 11. Checklist de implementação

```
INFRAESTRUTURA
[ ] Servidor com suporte a Node.js 18+ (ou Python 3.10+)
[ ] Scheduler instalado (node-cron ou equivalente)
[ ] Sistema de cache implementado (Redis recomendado em produção)
[ ] Webhook ou integração com CMS configurada

COLETA DE DADOS
[ ] Endpoint PTAX (câmbio) testado e retornando JSON
[ ] Endpoint SGS série 11 (Selic) testado
[ ] Endpoint SGS série 433 (IPCA) testado
[ ] Endpoint taxaJuros v2 (crédito) testado
[ ] Lógica de fallback para dias não úteis implementada

LÓGICA EDITORIAL
[ ] Limiares de gatilho definidos por indicador
[ ] Templates de rascunho revisados pelo time editorial
[ ] Fila de revisão humana obrigatória antes da publicação
[ ] Campo "fonte" e "URL da fonte" incluídos em todo rascunho

CONFORMIDADE
[ ] Atribuição "Fonte: Banco Central do Brasil" em todos os posts
[ ] Licença ODbL respeitada
[ ] Nenhum conteúdo publicado sem revisão humana
[ ] Logs de coleta mantidos por 30 dias mínimos
```

---

> **Nota de responsabilidade editorial**  
> Este pipeline gera **rascunhos automáticos**, não artigos prontos.  
> Todo conteúdo deve passar por revisão humana antes da publicação,  
> conforme os princípios de **legalidade, verificabilidade e responsabilidade comunicacional** do portal.

---

*Documento gerado para uso interno — Portal de Notícias / Automação de Dados Financeiros*  
*Revisão recomendada: trimestral ou quando houver alteração nas APIs do BCB*
