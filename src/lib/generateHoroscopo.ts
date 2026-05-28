function seededRandom(seed: string): () => number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  let state = Math.abs(hash);
  return () => {
    state = (state * 16807) % 2147483647;
    return state / 2147483647;
  };
}

function pick<T>(arr: readonly T[], rand: () => number): T {
  return arr[Math.floor(rand() * arr.length)];
}

function pickN<T>(arr: readonly T[], n: number, rand: () => number): T[] {
  const shuffled = [...arr].sort(() => rand() - 0.5);
  return shuffled.slice(0, n);
}

type Aspectos = {
  amor: string[];
  carreira: string[];
  saude: string[];
  financeiro: string[];
};

const ASPECTOS: Record<string, Aspectos> = {
  aries: {
    amor: [
      "A chama da paixão arde mais forte hoje — um encontro inesperado pode sacudir sua rotina.",
      "Marte energiza seus relacionamentos; conversas sinceras aproximam quem você ama.",
      "Seu magnetismo está irresistível. Aproveite para declarar sentimentos ou iniciar um flerte.",
    ],
    carreira: [
      "Sua liderança natural inspira a equipe. Tome a frente de projetos que exigem coragem.",
      "Decisões ousadas no trabalho serão bem recompensadas. Confie no seu instinto empreendedor.",
      "Um desafio profissional surge como trampolim para o crescimento. Encare de frente.",
    ],
    saude: [
      "A energia está elétrica — canalize-a com exercícios vigorosos e evite o estresse acumulado.",
      "Seu corpo pede movimento. Uma caminhada ao ar livre renova as energias.",
      "Cuidado com a impaciência: pause, respire fundo e dê tempo ao tempo.",
    ],
    financeiro: [
      "Oportunidades financeiras relâmpago aparecem. Analise com cuidado antes de arriscar.",
      "É um bom dia para renegociar dívidas ou buscar novas fontes de renda.",
      "Seu impulso consumista pede freio. Planeje antes de comprar.",
    ],
  },
  touro: {
    amor: [
      "Vênus abençoa seu coração — momentos de afeto e estabilidade fortalecem os laços.",
      "A lealdade que você oferece retorna em dobro. Valorize quem está ao seu lado.",
      "O amor pede paciência e delicadeza. Gestos simples valem mais que promessas grandiosas.",
    ],
    carreira: [
      "Sua determinação inabalável colhe frutos no trabalho. Projetos de longo prazo se concretizam.",
      "A persistência é sua maior aliada profissionalmente. Resultados consistentes vêm hoje.",
      "Confie no seu tino para negócios. Uma proposta sólida merece sua atenção.",
    ],
    saude: [
      "Seu bem-estar pede conforto e rotina. Crie rituais de autocuidado que acalmem os sentidos.",
      "A conexão com a natureza renova suas energias. Um passeio ao ar livre faz milagres.",
      "A alimentação merece atenção extra hoje. Prefira comidas frescas e nutritivas.",
    ],
    financeiro: [
      "A estabilidade financeira que você busca está mais perto. Mantenha o foco nas metas.",
      "É hora de colher os frutos da disciplina. Seu planejamento começa a dar resultados.",
      "Evite gastos impulsivos com luxos. Priorize necessidades e invista no que é duradouro.",
    ],
  },
  gemeos: {
    amor: [
      "Sua comunicação encantadora abre portas no amor. Uma conversa pode mudar tudo.",
      "O bom humor atrai conexões leves e genuínas. Compartilhe suas ideias com quem te faz sorrir.",
      "Palavras têm poder hoje. Escolha com cuidado o que dizer ao coração do outro.",
    ],
    carreira: [
      "Sua mente ágil encontra soluções criativas para problemas antigos. Compartilhe suas ideias.",
      "Networking é a palavra-chave. Conexões feitas hoje abrem portas inesperadas.",
      "A versatilidade é seu trunfo. Mostre sua capacidade de se adaptar e inovar.",
    ],
    saude: [
      "Sua mente inquieta precisa de estímulos. Leia, aprenda algo novo ou medite para equilibrar.",
      "O excesso de pensamentos pode causar ansiedade. Respire e foque no presente.",
      "Alternar atividade física com momentos de descanso mantém seu corpo e mente afiados.",
    ],
    financeiro: [
      "Informação é dinheiro. Fique atento às notícias e tendências que podem gerar oportunidades.",
      "Evite decisões financeiras precipitadas. Pesquise bem antes de investir.",
      "Uma ideia criativa pode se transformar em renda extra. Não deixe passar.",
    ],
  },
  cancer: {
    amor: [
      "A intuição está aguçada. Confie no que seu coração diz — ele raramente erra.",
      "A família e o lar são seu porto seguro. Momentos acolhedores renovam sua alma.",
      "Sua sensibilidade toca quem está ao redor. Permita-se receber carinho também.",
    ],
    carreira: [
      "Sua empatia é um superpoder no trabalho. Media conflitos e fortalece o time.",
      "O ambiente profissional pede sua sensibilidade para perceber oportunidades onde outros não veem.",
      "Projetos ligados ao lar ou à comunidade trazem realização profissional.",
    ],
    saude: [
      "Suas emoções afetam o corpo. Pratique o autocuidado para manter o equilíbrio.",
      "A nutrição emocional é tão importante quanto a física. Alimente-se com carinho.",
      "Momentos de quietude e reflexão ajudam a recarregar suas energias.", 
    ],
    financeiro: [
      "A segurança financeira é prioridade. Revise seu orçamento e corte gastos supérfluos.",
      "Investimentos conservadores são os mais indicados hoje. Pense no longo prazo.",
      "Seu instinto protetor também vale para as finanças. Poupe para o futuro.",
    ],
  },
  leao: {
    amor: [
      "Seu brilho natural atrai olhares e corações. Deixe-se levar pelo romance.",
      "O orgulho pode atrapalhar. Abra seu coração e mostre sua vulnerabilidade.",
      "A paixão está em alta. Surpreenda seu par com um gesto grandioso.",
    ],
    carreira: [
      "Seu talento brilha no centro das atenções. Apresente suas ideias com confiança.",
      "O reconhecimento profissional chega. Prepare-se para brilhar em novos desafios.",
      "Sua criatividade é seu maior ativo. Transforme projetos em obras de arte.",
    ],
    saude: [
      "Sua vitalidade é contagiante. Canalize essa energia para atividades que fortaleçam o corpo.",
      "O autocuidado também é um ato de amor próprio. Mime-se hoje.",
      "Cuidado com o excesso de auto-cobrança. Descanse sem culpa.",
    ],
    financeiro: [
      "Sua generosidade é linda, mas não deixe as contas de lado. Equilíbrio é tudo.",
      "Oportunidade de brilhar financeiramente surge. Avalie com cuidado antes de investir.",
      "Seu talento pode ser monetizado. Pense em formas criativas de gerar renda.",
    ],
  },
  virgem: {
    amor: [
      "A perfeição não existe no amor. Aceite as imperfeições e encontre beleza nelas.",
      "Seu cuidado com os detalhes encanta. Pequenas atenções fazem toda a diferença.",
      "Analisar demais pode afastar o romance. Deixe-se levar pelo coração.",
    ],
    carreira: [
      "Sua organização e método são exemplares. Resolva pendências com maestria.",
      "O detalhe que você percebe faz toda a diferença. Seu rigor é recompensado.",
      "Sua eficiência abre portas. Novas responsabilidades chegam como reconhecimento.",
    ],
    saude: [
      "A preocupação excessiva com a saúde pode gerar estresse. Equilíbrio é a chave.",
      "Uma rotina de bem-estar bem planejada traz resultados duradouros.",
      "Cuide da mente tanto quanto do corpo. Meditação e organização ajudam.",
    ],
    financeiro: [
      "Seu planejamento financeiro é exemplar. Continue no caminho da disciplina.",
      "Revise seus gastos com lupa. Pequenos cortes geram grande economia.",
      "É um bom momento para organizar investimentos e pensar no futuro.",
    ],
  },
  libra: {
    amor: [
      "O equilíbrio nos relacionamentos é sua busca. Diálogo aberto traz harmonia.",
      "O charme está em alta. Aproveite para fortalecer laços afetivos e fazer novas amizades.",
      "Parcerias amorosas estão favorecidas. O amor pede reciprocidade e beleza.",
    ],
    carreira: [
      "Sua diplomacia resolve conflitos e constrói pontes no ambiente profissional.",
      "Negociações e parcerias estão em destaque. Seu tato é seu melhor trunfo.",
      "A busca pelo equilíbrio entre vida pessoal e profissional merece atenção.",
    ],
    saude: [
      "O equilíbrio é a chave da sua saúde. Busque harmonia entre corpo, mente e espírito.",
      "Atividades que combinam movimento e estética trazem bem-estar.",
      "Evite o estresse da indecisão. Confie mais em si mesmo.",
    ],
    financeiro: [
      "Parcerias financeiras podem ser vantajosas. Analise com cuidado antes de fechar negócio.",
      "Seu senso estético pode gerar renda. Invista em áreas que envolvam beleza e arte.",
      "Equilibre gastos com prazeres e compromissos financeiros.",
    ],
  },
  escorpiao: {
    amor: [
      "A intensidade das suas emoções transforma relacionamentos. Entregue-se sem medo.",
      "Confiança é a base de tudo para você. Relações superficiais não te satisfazem.",
      "A paixão arde em temperaturas máximas. Um encontro profundo pode marcar sua vida.",
    ],
    carreira: [
      "Sua determinação e foco são imbatíveis. Transforme obstáculos em degraus.",
      "Poder e transformação andam juntos. Você está pronto para uma virada profissional.",
      "Sua capacidade de investigação revela verdades que impulsionam sua carreira.",
    ],
    saude: [
      "A intensidade emocional precisa de válvulas de escape. Exercícios intensos ajudam.",
      "Processos de cura profunda estão em andamento. Confie na renovação.",
      "A terapia ou o autoconhecimento trazem benefícios transformadores.",
    ],
    financeiro: [
      "Sua intuição financeira está afiada. Confie nela para tomar decisões importantes.",
      "Transformações financeiras estão a caminho. Prepare-se para mudanças.",
      "Evite jogos de azar. Invista em oportunidades sólidas e bem pesquisadas.",
    ],
  },
  sagitario: {
    amor: [
      "O amor é uma aventura. Abra-se para conhecer pessoas de horizontes diferentes.",
      "Sua sede de liberdade contagia. Compartilhe seus sonhos com quem ama.",
      "Um romance inesperado pode surgir durante uma viagem ou atividade diferente.",
    ],
    carreira: [
      "Novos horizontes profissionais se abrem. Busque conhecimento e expanda seus limites.",
      "Sua visão otimista inspira a equipe. Projetos inovadores pedem sua liderança.",
      "Viagens ou contatos internacionais trazem boas oportunidades de trabalho.",
    ],
    saude: [
      "Sua energia precisa de movimento. Esportes ao ar livre são perfeitos hoje.",
      "O otimismo é seu melhor remédio. Mantenha o bom humor mesmo nos desafios.",
      "Cuide do fígado e da digestão. Alimentação leve e natural faz bem.",
    ],
    financeiro: [
      "Uma oportunidade de ganho vinda de longe merece investigação.",
      "Seu otimismo financeiro é contagiante, mas mantenha os pés no chão.",
      "Invista em conhecimento e expansão. Educação gera retorno a longo prazo.",
    ],
  },
  capricornio: {
    amor: [
      "A solidez dos seus sentimentos constrói relacionamentos duradouros. Paciência e dedicação.",
      "O amor sério está no horizonte. Alguém especial valoriza sua maturidade.",
      "Vulnerabilidade não é fraqueza. Abrir o coração fortalece laços afetivos.",
    ],
    carreira: [
      "Seu esforço constante está sendo notado. Uma promoção ou reconhecimento se aproxima.",
      "A disciplina que você cultiva é a base do seu sucesso. Continue firme.",
      "Metas ambiciosas estão ao seu alcance. Use sua experiência para alcançá-las.",
    ],
    saude: [
      "O trabalho excessivo cobra seu preço. Equilíbrio entre dever e descanso é urgente.",
      "Sua resistência física é admirável, mas até a rocha precisa descansar.",
      "Cuide dos ossos e articulações. Alongamento e postura fazem diferença.",
    ],
    financeiro: [
      "A recompensa financeira pelo seu esforço chega. Colha os frutos do trabalho.",
      "Investimentos de longo prazo são seu ponto forte. Continue focado.",
      "É um bom momento para reavaliar seu planejamento financeiro e ajustar metas.",
    ],
  },
  aquario: {
    amor: [
      "Sua originalidade encanta. Relacionamentos diferentes do convencional trazem alegria.",
      "A amizade é a base do amor para você. Conexões intelectuais viram romance.",
      "Liberdade e afeto andam juntos. Encontre alguém que respeite seu espaço.",
    ],
    carreira: [
      "Suas ideias inovadoras revolucionam o ambiente de trabalho. Compartilhe sua visão.",
      "Projetos coletivos e causas sociais trazem realização profissional.",
      "A tecnologia é sua aliada. Use ferramentas digitais para impulsionar sua carreira.",
    ],
    saude: [
      "Sua mente inquieta precisa de estímulos variados. Aprender algo novo faz bem.",
      "A saúde mental merece atenção especial hoje. Conecte-se com amigos inspiradores.",
      "Inove na rotina de exercícios. Atividades diferentes mantêm seu interesse.",
    ],
    financeiro: [
      "Inovações financeiras e tecnologia podem gerar novas fontes de renda.",
      "Seu pensamento original encontra soluções criativas para desafios financeiros.",
      "Invista em projetos que tenham propósito. O retorno vem além do dinheiro.",
    ],
  },
  peixes: {
    amor: [
      "Sua sensibilidade e intuição no amor são dons. Confie na sua percepção.",
      "O romance vive de sonhos e poesia hoje. Deixe a magia acontecer.",
      "Alma gêmea é um conceito real para você. Conexões profundas estão no ar.",
    ],
    carreira: [
      "Sua criatividade é seu diferencial profissional. Use a arte e a intuição a seu favor.",
      "A compaixão no ambiente de trabalho inspira e une as pessoas ao seu redor.",
      "Sua capacidade de sonhar grande também serve para a carreira. Visualize o sucesso.",
    ],
    saude: [
      "Sua sensibilidade absorve as energias ao redor. Proteja-se com momentos de solitude.",
      "A espiritualidade e a meditação trazem equilíbrio e paz interior.",
      "Cuide dos pés e do sistema linfático. Caminhadas na água ou banhos relaxantes ajudam.",
    ],
    financeiro: [
      "Sua intuição financeira é poderosa. Confie nela para distinguir oportunidades de armadilhas.",
      "A arte e a criatividade podem ser fontes de renda. Monetize seus talentos.",
      "Cuidado com a tendência a ilusões financeiras. Fatos concretos são seus melhores guias.",
    ],
  },
};

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function gerarFrase(seed: string, frases: string[]): string {
  const rand = seededRandom(seed);
  return pick(frases, rand);
}

function gerarTransicao(rand: () => number): string {
  const transicoes = [
    "Além disso,", "Por outro lado,", "Ainda assim,",
    "No mais,", "Enquanto isso,", "Do mesmo modo,",
    "Sobretudo,", "Contudo,", "Da mesma forma,",
  ];
  return pick(transicoes, rand);
}

function gerarFechamento(rand: () => number): string {
  const fechamentos = [
    "Aproveite o dia e confie no universo!",
    "As estrelas estão ao seu lado.",
    "Siga seu coração e tudo dará certo.",
    "Mantenha a fé e siga em frente!",
    "O cosmos conspira a seu favor.",
    "Respire fundo e vá com tudo!",
    "Hoje é um dia promissor.",
    "A energia está positiva — aproveite!",
  ];
  return pick(fechamentos, rand);
}

export function generateHoroscopoText(signoId: string): string {
  const dateStr = new Date().toISOString().slice(0, 10);
  const seed = `${dateStr}-${signoId}`;
  const rand = seededRandom(seed);

  const aspectos = ASPECTOS[signoId];
  if (!aspectos) return "Previsão não disponível para hoje.";

  const topicos = ["amor", "carreira", "saude", "financeiro"] as const;
  const selecionados = pickN(topicos, 2 + Math.floor(rand() * 2), rand);

  const partes = selecionados.map((area, i) => {
    const prefixo = i === 0 ? "" : gerarTransicao(rand) + " ";
    return prefixo + gerarFrase(`${seed}-${area}-${i}`, aspectos[area]);
  });

  const texto = capitalize(partes.join(" "));

  if (texto.length > 140) {
    const fechamento = gerarFechamento(rand);
    return `${texto.slice(0, texto.lastIndexOf(".", 140))}. ${fechamento}`;
  }

  return `${texto} ${gerarFechamento(rand)}`;
}

export const SIGNOS_COM_API = [
  { id: "aries", label: "Áries", emoji: "♈", periodo: "21/03 – 19/04" },
  { id: "touro", label: "Touro", emoji: "♉", periodo: "20/04 – 20/05" },
  { id: "gemeos", label: "Gêmeos", emoji: "♊", periodo: "21/05 – 20/06" },
  { id: "cancer", label: "Câncer", emoji: "♋", periodo: "21/06 – 22/07" },
  { id: "leao", label: "Leão", emoji: "♌", periodo: "23/07 – 22/08" },
  { id: "virgem", label: "Virgem", emoji: "♍", periodo: "23/08 – 22/09" },
  { id: "libra", label: "Libra", emoji: "♎", periodo: "23/09 – 22/10" },
  { id: "escorpiao", label: "Escorpião", emoji: "♏", periodo: "23/10 – 21/11" },
  { id: "sagitario", label: "Sagitário", emoji: "♐", periodo: "22/11 – 21/12" },
  { id: "capricornio", label: "Capricórnio", emoji: "♑", periodo: "22/12 – 19/01" },
  { id: "aquario", label: "Aquário", emoji: "♒", periodo: "20/01 – 18/02" },
  { id: "peixes", label: "Peixes", emoji: "♓", periodo: "19/02 – 20/03" },
] as const;
