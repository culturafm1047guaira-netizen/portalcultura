import type { Metadata } from "next";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Sobre — Rádio Cultura FM 104.7 | Guaíra, SP",
  description: "Conheça a história da Rádio Cultura FM 104.7, emissora de Guaíra, SP. No ar desde 1957, com alcance em mais de 27 municípios e quase 1,5 milhão de habitantes.",
  openGraph: {
    title: "Sobre — Rádio Cultura FM 104.7",
    description: "Conheça a história e o alcance da Rádio Cultura FM 104.7.",
    url: "https://radioculturaguaira.com.br/sobre/",
  },
};

export default function SobrePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <Header />
      <div className="container flex-1">
        <main className="page-content">
          <div className="breadcrumb"><Link href="/">Início</Link> &rsaquo; <strong>Sobre</strong></div>

          <h1>Sobre</h1>

          <div className="highlight-box">
            <p>A Rádio Cultura é mais do que uma simples emissora! É um canal de conexão, informação e entretenimento que transforma a maneira como você ouve o mundo.</p>
          </div>

          <h2>Quem Somos e Nossa Missão</h2>
          <p>A Rádio Cultura FM acredita no poder do rádio como ferramenta de comunicação, informação e entretenimento. Nosso compromisso é com a comunidade que servimos, levando até nossos ouvintes uma programação diversificada, que respeita e valoriza as tradições regionais e as novas tendências.</p>

          <h2>Construção de Confiança e Credibilidade</h2>
          <p>A Rádio Cultura FM 104.7 é muito mais do que uma emissora; é um canal de conexão e engajamento com a comunidade, reconhecido por sua presença forte e respeitável na radiodifusão. Anunciar na Rádio Cultura FM oferece uma oportunidade única para marcas que desejam criar uma conexão mais pessoal e confiável com seu público.</p>

          <h2>Nosso Alcance e Relevância</h2>
          <p>Com uma ampla cobertura regional, a Rádio Cultura FM alcança não apenas o estado de São Paulo, mas também o estado de Minas Gerais. Além do alcance territorial, nossa presença digital amplia ainda mais nosso impacto, com mais de <strong>48 mil seguidores no Facebook</strong>, gerando alcance orgânico de <strong>2.622.483 de usuários</strong> e <strong>4.309.407 de visualizações</strong> em nossas postagens e transmissões ao vivo.</p>
          <p>Com os transmissores atuais o alcance de nossas rádios, com boas condições climáticas e qualidade do equipamento usado pelo ouvinte, podem alcançar até <strong>100 km de raio</strong>, abrangendo uma grande gama de cidades que, ao final, atinge <strong>1.495.898 habitantes</strong> (dados IBGE/Cidades).</p>

          <div className="stats-grid">
            <div className="stat-card">
              <span className="number">48K+</span>
              <span className="label">Seguidores Facebook</span>
            </div>
            <div className="stat-card">
              <span className="number">2.6M</span>
              <span className="label">Alcance Orgânico</span>
            </div>
            <div className="stat-card">
              <span className="number">4.3M</span>
              <span className="label">Visualizações</span>
            </div>
            <div className="stat-card">
              <span className="number">100km</span>
              <span className="label">Raio de Alcance</span>
            </div>
          </div>

          <h3>Estado de São Paulo — 1.018.803 habitantes</h3>
          <p>Altair (3.451 hab.), Barretos (122.485 hab.), Bebedouro (76.373 hab.), Buritizal (4.356 hab.), Cajobi (9.133 hab.), Colina (18.486 hab.), Colômbia (6.629 hab.), Cristais Paulista (9.272 hab.), Franca (352.536 hab.), Guaíra (39.279 hab.), Guará (18.606 hab.), Guaraci (10.350 hab.), Icém (7.819 hab.), Igarapava (26.212 hab.), Ipuã (14.454 hab.), Ituverava (37.571 hab.), Jaborandi (6.221 hab.), Jardinópolis (45.282 hab.), Jeriquara (3.863 hab.), Miguelópolis (19.441 hab.), Morro Agudo (27.933 hab.), Olímpia (55.074 hab.), Pedregulho (15.525 hab.), São Joaquim da Barra (48.558 hab.), Severínia (14.576 hab.), Terra Roxa (7.904 hab.), Viradouro (17.414 hab.).</p>

          <h3>Estado de Minas Gerais — 477.095 habitantes</h3>
          <p>Água Comprida (2.108 hab.), Campo Florido (8.466 hab.), Conceição das Alagoas (28.381 hab.), Delta (10.494 hab.), Fronteira (14.540 hab.), Frutal (58.588 hab.), Pirajuba (5.537 hab.), Planura (11.145 hab.), Uberaba (337.836 hab.).</p>

          <h2>Presença Digital e Audiência Global</h2>
          <p>O rádio evoluiu com a tecnologia, e a Rádio Cultura FM está acompanhando esse ritmo. Hoje, estamos presentes não só nas ondas do rádio, mas também na internet, alcançando ouvintes locais, nacionais e internacionais.</p>

          <h2>Por Que Escolher a Rádio Cultura FM?</h2>
          <p>Combinando um alcance significativo, tanto nas ondas do rádio quanto no ambiente digital, e um compromisso inabalável com a qualidade e a ética, a Rádio Cultura FM 104.7 é uma emissora pronta para levar sua mensagem a um público diverso e engajado.</p>

          <div className="highlight-box">
            <p>Convidamos você a fazer parte da nossa história e a descobrir como a Rádio Cultura FM 104.7 pode ser um diferencial para a sua marca.</p>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
