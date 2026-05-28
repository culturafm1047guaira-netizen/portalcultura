import { generateHoroscopoText } from "./generateHoroscopo";

export const SIGNOS = [
  { id: "aries",       label: "Áries",       emoji: "♈", periodo: "21/03 – 19/04" },
  { id: "touro",       label: "Touro",        emoji: "♉", periodo: "20/04 – 20/05" },
  { id: "gemeos",      label: "Gêmeos",       emoji: "♊", periodo: "21/05 – 20/06" },
  { id: "cancer",      label: "Câncer",       emoji: "♋", periodo: "21/06 – 22/07" },
  { id: "leao",        label: "Leão",         emoji: "♌", periodo: "23/07 – 22/08" },
  { id: "virgem",      label: "Virgem",       emoji: "♍", periodo: "23/08 – 22/09" },
  { id: "libra",       label: "Libra",        emoji: "♎", periodo: "23/09 – 22/10" },
  { id: "escorpiao",   label: "Escorpião",    emoji: "♏", periodo: "23/10 – 21/11" },
  { id: "sagitario",   label: "Sagitário",    emoji: "♐", periodo: "22/11 – 21/12" },
  { id: "capricornio", label: "Capricórnio",  emoji: "♑", periodo: "22/12 – 19/01" },
  { id: "aquario",     label: "Aquário",      emoji: "♒", periodo: "20/01 – 18/02" },
  { id: "peixes",      label: "Peixes",       emoji: "♓", periodo: "19/02 – 20/03" },
] as const;

export type SignoId = typeof SIGNOS[number]["id"];

export interface HoroscopoData {
  signo: string;
  texto: string;
}

export type SignoWithData = (typeof SIGNOS[number]) & HoroscopoData;

function fetchText(signo: SignoId): Promise<string> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  return fetch(`${baseUrl}/api/horoscopo?signo=${signo}`, {
    next: { revalidate: 3600 },
  })
    .then((r) => {
      if (!r.ok) throw new Error(`status ${r.status}`);
      return r.json() as Promise<HoroscopoData>;
    })
    .then((d) => d.texto)
    .catch(() => generateHoroscopoText(signo));
}

export async function getHoroscopo(signo: SignoId): Promise<HoroscopoData> {
  const texto = await fetchText(signo);
  return { signo, texto };
}

export async function getAllHoroscopos(): Promise<SignoWithData[]> {
  const BABI_API_URL = process.env.BABI_API_URL;

  if (!BABI_API_URL) {
    return SIGNOS.map((s) => ({
      ...s,
      signo: s.id,
      texto: generateHoroscopoText(s.id),
    }));
  }

  const results = await Promise.allSettled(
    SIGNOS.map(async (signo) => {
      const res = await fetch(`${BABI_API_URL}/signo/${signo.id}/dia`, {
        next: { revalidate: 3600 },
      });
      const json = await res.json();
      return {
        ...signo,
        signo: signo.id,
        texto: (json.texto as string) ?? generateHoroscopoText(signo.id),
      };
    })
  );

  return results.map((r, i) =>
    r.status === "fulfilled"
      ? r.value
      : { ...SIGNOS[i], signo: SIGNOS[i].id, texto: generateHoroscopoText(SIGNOS[i].id) }
  );
}
