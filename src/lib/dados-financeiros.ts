export type DolarData = {
  cotacaoCompra: number;
  cotacaoVenda: number;
  dataHora: string;
};

export type SelicData = {
  valor: number;
  data: string;
};

export type SelicMetaData = {
  valor: number;
  data: string;
};

export type InflacaoData = {
  ipca: { valor: number; data: string }[];
  ipcaAcumulado: { valor: number; data: string } | null;
  igpm: { valor: number; data: string }[];
  inpc: { valor: number; data: string }[];
  ipcFipe: { valor: number; data: string }[];
};

export type CreditoData = {
  comprometimentoRenda: { valor: number; data: string }[];
  inadimplencia: { valor: number; data: string }[];
  endividamento: { valor: number; data: string }[];
  saldoCredito: { valor: number; data: string }[];
};

export type PixData = {
  chaves: number | null;
  transacoes: Record<string, unknown> | null;
};

export type InstituicoesData = {
  total: number;
};

export type EconomiaData = {
  dolar: DolarData | null;
  selic: SelicData | null;
  selicMeta: SelicMetaData | null;
  inflacao: InflacaoData | null;
  credito: CreditoData | null;
  pix: PixData | null;
  instituicoes: InstituicoesData | null;
  horarioColeta: string;
  fonte: string;
};

function dataHojePTAX(): string {
  const hoje = new Date();
  const mm = String(hoje.getMonth() + 1).padStart(2, "0");
  const dd = String(hoje.getDate()).padStart(2, "0");
  const yyyy = hoje.getFullYear();
  return `${mm}-${dd}-${yyyy}`;
}

export async function getDolar(): Promise<DolarData | null> {
  try {
    const url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${dataHojePTAX()}'&$format=json&$top=1`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const data = await res.json();
    const item = data.value?.[0];
    if (!item) return null;
    return {
      cotacaoCompra: item.cotacaoCompra,
      cotacaoVenda: item.cotacaoVenda,
      dataHora: item.dataHoraCotacao,
    };
  } catch {
    return null;
  }
}

export async function getSelic(): Promise<SelicData | null> {
  try {
    const res = await fetch(
      "https://api.bcb.gov.br/dados/serie/bcdata.sgs.11/dados/ultimos/1?formato=json",
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const item = data[0];
    if (!item) return null;
    return {
      valor: parseFloat(item.valor),
      data: item.data,
    };
  } catch {
    return null;
  }
}

export async function getSelicMeta(): Promise<SelicMetaData | null> {
  try {
    const res = await fetch(
      "https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados/ultimos/1?formato=json",
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const item = data[0];
    if (!item) return null;
    return {
      valor: parseFloat(item.valor),
      data: item.data,
    };
  } catch {
    return null;
  }
}

async function fetchSerie(codigo: number, ultimos: number = 12): Promise<{ valor: number; data: string }[]> {
  try {
    const res = await fetch(
      `https://api.bcb.gov.br/dados/serie/bcdata.sgs.${codigo}/dados/ultimos/${ultimos}?formato=json`,
      { next: { revalidate: 43200 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data as { valor: string; data: string }[]).map((item) => ({
      valor: parseFloat(item.valor),
      data: item.data,
    }));
  } catch {
    return [];
  }
}

export async function getInflacao(): Promise<InflacaoData | null> {
  try {
    const [ipca, ipcaAcum, igpm, inpc, ipcFipe] = await Promise.all([
      fetchSerie(433, 12),
      fetchSerie(13522, 1),
      fetchSerie(189, 12),
      fetchSerie(188, 12),
      fetchSerie(193, 12),
    ]);
    return {
      ipca,
      ipcaAcumulado: ipcaAcum.length > 0 ? ipcaAcum[0] : null,
      igpm,
      inpc,
      ipcFipe,
    };
  } catch {
    return null;
  }
}

export async function getCredito(): Promise<CreditoData | null> {
  try {
    const [compRenda, inadimplencia, endividamento, saldoCredito] = await Promise.all([
      fetchSerie(29038, 12),
      fetchSerie(21082, 12),
      fetchSerie(29039, 12),
      fetchSerie(20539, 12),
    ]);
    return {
      comprometimentoRenda: compRenda,
      inadimplencia,
      endividamento,
      saldoCredito,
    };
  } catch {
    return null;
  }
}

export async function getPix(): Promise<PixData | null> {
  try {
    const resChaves = await fetch(
      "https://olinda.bcb.gov.br/olinda/servico/SPI/versao/v1/odata/ChavesPix?$format=json&$top=1&$orderby=DataReferencia desc",
      { next: { revalidate: 86400 } }
    );
    const resTransacoes = await fetch(
      "https://olinda.bcb.gov.br/olinda/servico/SPI/versao/v1/odata/EstatisticasTransacoes?$format=json&$top=1&$orderby=DataReferencia desc",
      { next: { revalidate: 86400 } }
    );

    const chavesData = resChaves.ok ? await resChaves.json() : null;
    const transacoesData = resTransacoes.ok ? await resTransacoes.json() : null;

    return {
      chaves: chavesData?.value?.[0]?.Quantidade ?? null,
      transacoes: transacoesData?.value?.[0] ?? null,
    };
  } catch {
    return null;
  }
}

export async function getInstituicoes(): Promise<InstituicoesData | null> {
  try {
    const res = await fetch(
      "https://olinda.bcb.gov.br/olinda/servico/BcBase/versao/v2/odata/InstituicoesBaixadas?$format=json&$top=1",
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return {
      total: data.value?.length ?? 0,
    };
  } catch {
    return null;
  }
}

export async function getAllIndicators(): Promise<EconomiaData> {
  const [dolar, selic, selicMeta, inflacao, credito, pix, instituicoes] = await Promise.all([
    getDolar(),
    getSelic(),
    getSelicMeta(),
    getInflacao(),
    getCredito(),
    getPix(),
    getInstituicoes(),
  ]);

  return {
    dolar,
    selic,
    selicMeta,
    inflacao,
    credito,
    pix,
    instituicoes,
    horarioColeta: new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }),
    fonte: "Banco Central do Brasil — BCB",
  };
}
