import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import Link from "next/link";

export const metadata = {
  title: "Sobre — Rádio Cultura FM 104.7",
  description: "Conheça a história, missão e alcance da Rádio Cultura FM 104.7 de Guaíra, SP.",
};

export default function SobrePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <Header />

      <main className="container py-8 flex-1">
        <div className="text-[12px] text-gray-400 mb-6">
          <Link href="/" className="text-primary hover:underline">Início</Link> &rsaquo; <strong>Sobre</strong>
        </div>

        <h1 className="font-montserrat text-3xl font-extrabold text-dark-bg uppercase tracking-wider mb-6">
          Sobre a Rádio Cultura FM
        </h1>

        <div className="bg-primary/10 border-l-4 border-primary p-4 rounded mb-8 text-primary-dark font-semibold">
          A Rádio Cultura é mais do que uma simples emissora! É um canal de conexão, informação e entretenimento que transforma a maneira como você ouve o mundo.
        </div>

        <div className="space-y-6 text-[15px] text-text-muted leading-relaxed">
          <section>
            <h2 className="font-montserrat text-xl font-bold text-dark-bg mb-3">Quem Somos e Nossa Missão</h2>
            <p>
              A Rádio Cultura FM acredita no poder do rádio como ferramenta de comunicação, informação e entretenimento. Nosso compromisso é com a comunidade que servimos, levando até nossos ouvintes uma programação diversificada, que respeita e valoriza as tradições regionais e as novas tendências. Com um time de profissionais dedicados e uma programação cuidadosamente planejada, buscamos oferecer conteúdo relevante, que informe e inspire, tornando cada transmissão uma experiência única para nossos ouvintes.
            </p>
          </section>

          <section>
            <h2 className="font-montserrat text-xl font-bold text-dark-bg mb-3">Construção de Confiança e Credibilidade</h2>
            <p>
              A Rádio Cultura FM 104.7 é muito mais do que uma emissora; é um canal de conexão e engajamento com a comunidade, reconhecido por sua presença forte e respeitável na radiodifusão. Anunciar na Rádio Cultura FM oferece uma oportunidade única para marcas que desejam criar uma conexão mais pessoal e confiável com seu público. Com uma audiência fiel e ativa, nossa emissora constrói credibilidade e entrega resultados mensuráveis para anunciantes e parceiros, sempre comprometida em oferecer conteúdo de alta qualidade e valor para os ouvintes.
            </p>
          </section>

          <section>
            <h2 className="font-montserrat text-xl font-bold text-dark-bg mb-3">Nosso Alcance e Relevância</h2>
            <p className="mb-4">
              Com uma ampla cobertura regional, a Rádio Cultura FM alcança não apenas o estado de São Paulo, mas também o estado de Minas Gerais. Além do alcance territorial, nossa presença digital amplia ainda mais nosso impacto, com mais de 48 mil seguidores no Facebook, gerando alcance orgânico de 2.622.483 de usuários e 4.309.407 de visualizações em nossas postagens e transmissões ao vivo.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-card-bg border border-border p-4 rounded text-center shadow-sm">
                <div className="text-2xl font-black text-primary mb-1">48K+</div>
                <div className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Seguidores Facebook</div>
              </div>
              <div className="bg-card-bg border border-border p-4 rounded text-center shadow-sm">
                <div className="text-2xl font-black text-primary mb-1">2.6M</div>
                <div className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Alcance Orgânico</div>
              </div>
              <div className="bg-card-bg border border-border p-4 rounded text-center shadow-sm">
                <div className="text-2xl font-black text-primary mb-1">4.3M</div>
                <div className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Visualizações</div>
              </div>
              <div className="bg-card-bg border border-border p-4 rounded text-center shadow-sm">
                <div className="text-2xl font-black text-primary mb-1">100km</div>
                <div className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Raio de Alcance</div>
              </div>
            </div>
            <p>
              Com os transmissores atuais o alcance de nossas rádios, com boas condições climáticas e qualidade do equipamento usado pelo ouvinte, podem alcançar até 100 km de raio, abrangendo uma grande gama de cidades que, ao final, atinge <strong>1.495.898 habitantes</strong> (dados IBGE/Cidades).
            </p>
          </section>

          <section className="bg-white/50 p-6 rounded-lg border border-border">
            <h3 className="font-montserrat text-lg font-bold text-primary-dark mb-2">Estado de São Paulo — 1.018.803 habitantes</h3>
            <p className="text-sm">Altair, Barretos, Bebedouro, Buritizal, Cajobi, Colina, Colômbia, Cristais Paulista, Franca, Guaíra, Guará, Guaraci, Icém, Igarapava, Ipuã, Ituverava, Jaborandi, Jardinópolis, Jeriquara, Miguelópolis, Morro Agudo, Olímpia, Pedregulho, São Joaquim da Barra, Severínia, Terra Roxa, Viradouro.</p>

            <h3 className="font-montserrat text-lg font-bold text-primary-dark mb-2 mt-4">Estado de Minas Gerais — 477.095 habitantes</h3>
            <p className="text-sm">Água Comprida, Campo Florido, Conceição das Alagoas, Delta, Fronteira, Frutal, Pirajuba, Planura, Uberaba.</p>
          </section>

          <section>
            <h2 className="font-montserrat text-xl font-bold text-dark-bg mb-3">Presença Digital e Audiência Global</h2>
            <p>
              O rádio evoluiu com a tecnologia, e a Rádio Cultura FM está acompanhando esse ritmo. Hoje, estamos presentes não só nas ondas do rádio, mas também na internet, alcançando ouvintes locais, nacionais e internacionais. Nosso público digital inclui pessoas que se conectam diariamente em casa, no trabalho, e pelo celular. O crescimento da audiência online prova que o rádio continua relevante e se adapta às novas formas de consumo de mídia, proporcionando aos anunciantes uma oportunidade única de expandir suas marcas para além das limitações físicas da transmissão tradicional.
            </p>
          </section>

          <section>
            <h2 className="font-montserrat text-xl font-bold text-dark-bg mb-3">Por Que Escolher a Rádio Cultura FM?</h2>
            <p>
              Combinando um alcance significativo, tanto nas ondas do rádio quanto no ambiente digital, e um compromisso inabalável com a qualidade e a ética, a Rádio Cultura FM 104.7 é uma emissora pronta para levar sua mensagem a um público diverso e engajado. Queremos continuar sendo um veículo de comunicação que conecta pessoas, promove a cultura e fortalece a confiança entre marcas e consumidores.
            </p>
            <p className="mt-4">
              Convidamos você a fazer parte da nossa história e a descobrir como a Rádio Cultura FM 104.7 pode ser um diferencial para a sua marca.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
