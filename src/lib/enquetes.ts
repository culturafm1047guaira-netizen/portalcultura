type PollOption = {
  label: string;
  emoji: string;
};

export type Poll = {
  question: string;
  options: PollOption[];
  startDay: number;
  startMonth: number;
  startYear: number;
};

const POLLS: Poll[] = [
  {
    question: "Qual desses programas você não perde por nada na Rádio Cultura?",
    options: [
      { label: "Jornal da Manhã", emoji: "📰" },
      { label: "Sertanejo Hits", emoji: "🎸" },
      { label: "Fala, Guaíra!", emoji: "🎤" },
      { label: "Pagode da Tarde", emoji: "🪘" },
    ],
    startDay: 26,
    startMonth: 5,
    startYear: 2026,
  },
  {
    question: "O que você mais gosta de fazer aos domingos em Guaíra?",
    options: [
      { label: "Passear no Parque do Lago", emoji: "🌳" },
      { label: "Almoçar em família", emoji: "🍖" },
      { label: "Ouvir a Rádio Cultura", emoji: "📻" },
      { label: "Pescar no Rio Grande", emoji: "🎣" },
    ],
    startDay: 2,
    startMonth: 6,
    startYear: 2026,
  },
  {
    question: "Qual ritmo musical você quer ouvir mais na Rádio Cultura?",
    options: [
      { label: "Sertanejo Raiz", emoji: "🤠" },
      { label: "Pagode / Samba", emoji: "🥁" },
      { label: "MPB", emoji: "🎵" },
      { label: "Rock Nacional", emoji: "🎸" },
    ],
    startDay: 9,
    startMonth: 6,
    startYear: 2026,
  },
  {
    question: "Qual o melhor lugar para tomar um café em Guaíra?",
    options: [
      { label: "Padaria Central", emoji: "🥐" },
      { label: "Café do Porto", emoji: "☕" },
      { label: "Lanchonete Beira-Rio", emoji: "🌅" },
      { label: "Em casa, com a família", emoji: "🏠" },
    ],
    startDay: 16,
    startMonth: 6,
    startYear: 2026,
  },
  {
    question: "Qual destas festas você mais curte na região?",
    options: [
      { label: "Festa do Peão", emoji: "🐎" },
      { label: "Carnaval de Rua", emoji: "🎭" },
      { label: "Festa Junina", emoji: "🌽" },
      { label: "Réveillon na Praia", emoji: "🎆" },
    ],
    startDay: 23,
    startMonth: 6,
    startYear: 2026,
  },
  {
    question: "Qual time você torce no Brasileirão?",
    options: [
      { label: "Corinthians", emoji: "🦅" },
      { label: "Palmeiras", emoji: "🐷" },
      { label: "São Paulo", emoji: "✈️" },
      { label: "Santos", emoji: "🐟" },
      { label: "Outro / Não torço", emoji: "🤷" },
    ],
    startDay: 30,
    startMonth: 6,
    startYear: 2026,
  },
  {
    question: "Qual seu programa de rádio favorito na hora do almoço?",
    options: [
      { label: "Novidades e Entrevistas", emoji: "🎙️" },
      { label: "Só Sucessos", emoji: "🎶" },
      { label: "Notícias da Cidade", emoji: "📡" },
      { label: "Pedido Musical", emoji: "📞" },
    ],
    startDay: 7,
    startMonth: 7,
    startYear: 2026,
  },
  {
    question: "O que não pode faltar no seu chimarrão?",
    options: [
      { label: "Erva boa", emoji: "🧉" },
      { label: "Água na temperatura certa", emoji: "🌡️" },
      { label: "Cuião novo", emoji: "🪵" },
      { label: "Bom papo junto", emoji: "🗣️" },
    ],
    startDay: 14,
    startMonth: 7,
    startYear: 2026,
  },
  {
    question: "Qual aplicativo você mais usa no dia a dia?",
    options: [
      { label: "WhatsApp", emoji: "💬" },
      { label: "Instagram", emoji: "📸" },
      { label: "YouTube", emoji: "▶️" },
      { label: "Facebook", emoji: "👍" },
    ],
    startDay: 21,
    startMonth: 7,
    startYear: 2026,
  },
  {
    question: "Qual destes pratos típicos você mais gosta?",
    options: [
      { label: "Arroz carreteiro", emoji: "🍚" },
      { label: "Frango com quiabo", emoji: "🍗" },
      { label: "Peixe frito", emoji: "🐟" },
      { label: "Churrasco", emoji: "🥩" },
    ],
    startDay: 28,
    startMonth: 7,
    startYear: 2026,
  },
  {
    question: "Quantas vezes por semana você ouve a Rádio Cultura?",
    options: [
      { label: "Todos os dias", emoji: "📅" },
      { label: "3 a 4 vezes", emoji: "📆" },
      { label: "Fim de semana", emoji: "🎉" },
      { label: "Só quando lembro", emoji: "😅" },
    ],
    startDay: 4,
    startMonth: 8,
    startYear: 2026,
  },
  {
    question: "Qual a melhor época do ano em Guaíra?",
    options: [
      { label: "Verão — calor e lagoa", emoji: "☀️" },
      { label: "Outono — clima ameno", emoji: "🍂" },
      { label: "Inverno — friozinho gostoso", emoji: "❄️" },
      { label: "Primavera — flores e cores", emoji: "🌸" },
    ],
    startDay: 11,
    startMonth: 8,
    startYear: 2026,
  },
  {
    question: "Qual destas bandas (a) você pagaria pra ver ao vivo?",
    options: [
      { label: "Milionário & José Rico", emoji: "🎤" },
      { label: "Chitãozinho & Xororó", emoji: "🎼" },
      { label: "Jorge & Mateus", emoji: "🎧" },
      { label: "Turma do Pagode", emoji: "🥁" },
    ],
    startDay: 18,
    startMonth: 8,
    startYear: 2026,
  },
  {
    question: "Qual destas notícias você mais se interessa?",
    options: [
      { label: "Política local", emoji: "🏛️" },
      { label: "Esportes", emoji: "⚽" },
      { label: "Saúde e bem-estar", emoji: "💚" },
      { label: "Cultura e eventos", emoji: "🎭" },
    ],
    startDay: 25,
    startMonth: 8,
    startYear: 2026,
  },
  {
    question: "O que você acha da programação da Rádio Cultura?",
    options: [
      { label: "Ótima — não muda nada!", emoji: "⭐" },
      { label: "Boa, mas podia ter mais música", emoji: "🎵" },
      { label: "Legal, queria mais notícias", emoji: "📰" },
      { label: "Podia melhorar", emoji: "🛠️" },
    ],
    startDay: 1,
    startMonth: 9,
    startYear: 2026,
  },
  {
    question: "Qual destes lugares você levaria um visitante em Guaíra?",
    options: [
      { label: "Lagoa de Guaíra", emoji: "🏞️" },
      { label: "Igreja Matriz", emoji: "⛪" },
      { label: "Orla do Rio Grande", emoji: "🌊" },
      { label: "Balneário Municipal", emoji: "🏊" },
    ],
    startDay: 8,
    startMonth: 9,
    startYear: 2026,
  },
  {
    question: "Que tipo de conteúdo você quer ver no nosso site?",
    options: [
      { label: "Mais fotos e vídeos", emoji: "📷" },
      { label: "Entrevistas completas", emoji: "🎙️" },
      { label: "Enquetes e enquetes", emoji: "📊" },
      { label: "Promoções e sorteios", emoji: "🎁" },
    ],
    startDay: 15,
    startMonth: 9,
    startYear: 2026,
  },
  {
    question: "Qual horário você mais ouve rádio?",
    options: [
      { label: "Cedo — 6h às 8h", emoji: "🌅" },
      { label: "Almoço — 11h às 13h", emoji: "☀️" },
      { label: "Tarde — 14h às 17h", emoji: "⛅" },
      { label: "Noite — 18h às 22h", emoji: "🌙" },
    ],
    startDay: 22,
    startMonth: 9,
    startYear: 2026,
  },
  {
    question: "Qual time de futebol de Salto (futebol society) você torce?",
    options: [
      { label: "Tô por fora — não acompanho", emoji: "🙈" },
      { label: "Meu time é o da amizade", emoji: "🤝" },
      { label: "Guaíra Futebol Clube", emoji: "⚽" },
      { label: "Time do bairro", emoji: "🏘️" },
    ],
    startDay: 29,
    startMonth: 9,
    startYear: 2026,
  },
  {
    question: "Você prefere ouvir a Rádio Cultura por qual meio?",
    options: [
      { label: "Rádio tradicional (FM)", emoji: "📻" },
      { label: "Site (player online)", emoji: "💻" },
      { label: "Aplicativo", emoji: "📱" },
      { label: "Caixinha de som + FM", emoji: "🔊" },
    ],
    startDay: 6,
    startMonth: 10,
    startYear: 2026,
  },
];

let pollCache: Poll | null = null;
let pollWeekKey = "";

function getWeekKey(d: Date): string {
  const yearStart = new Date(d.getFullYear(), 0, 1);
  const diff = d.getTime() - yearStart.getTime();
  const weekNum = Math.ceil((diff / 86400000 + yearStart.getDay() + 1) / 7);
  return `${d.getFullYear()}-W${String(weekNum).padStart(2, "0")}`;
}

export function getActivePoll(): Poll | null {
  const now = new Date();
  const day = now.getDay();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  const weekKey = getWeekKey(now);
  if (pollCache && pollWeekKey === weekKey) return pollCache;

  // Saturday (6) or Sunday (0) → no active poll
  if (day === 6 || day === 0) {
    pollCache = null;
    pollWeekKey = weekKey;
    return null;
  }

  // Friday (5) after 23:59 → closed
  if (day === 5 && (hours > 23 || (hours === 23 && minutes >= 59))) {
    pollCache = null;
    pollWeekKey = weekKey;
    return null;
  }

  const sorted = [...POLLS].sort((a, b) => {
    const aDate = new Date(a.startYear, a.startMonth - 1, a.startDay);
    const bDate = new Date(b.startYear, b.startMonth - 1, b.startDay);
    return bDate.getTime() - aDate.getTime();
  });

  for (const poll of sorted) {
    const pollStart = new Date(poll.startYear, poll.startMonth - 1, poll.startDay);
    if (now >= pollStart) {
      pollCache = poll;
      pollWeekKey = weekKey;
      return poll;
    }
  }

  pollCache = sorted[sorted.length - 1] ?? null;
  pollWeekKey = weekKey;
  return pollCache;
}

export function getPollTimeInfo() {
  const now = new Date();
  const day = now.getDay();

  const friday = new Date(now);
  friday.setDate(now.getDate() + (5 - day));
  friday.setHours(23, 59, 0, 0);

  const msLeft = friday.getTime() - now.getTime();

  if (msLeft <= 0) return null;

  const daysLeft = Math.floor(msLeft / 86400000);
  const hoursLeft = Math.floor((msLeft % 86400000) / 3600000);

  if (daysLeft > 1) return `${daysLeft} dias restantes`;
  if (daysLeft === 1) return `${daysLeft} dia e ${hoursLeft}h restantes`;
  return `${hoursLeft}h restantes`;
}
