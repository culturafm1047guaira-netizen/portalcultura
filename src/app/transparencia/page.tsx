import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import Link from "next/link";

export const metadata = {
  title: "Transparência — Rádio Cultura FM 104.7",
};

export default function TransparenciaPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <Header />

      <main className="container py-8 flex-1">
        <div className="text-[12px] text-gray-400 mb-6">
          <Link href="/" className="text-primary hover:underline">Início</Link> &rsaquo; <strong>Transparência Editorial</strong>
        </div>

        <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-lg border border-border shadow-sm">
          <h1 className="font-montserrat text-3xl font-extrabold text-dark-bg uppercase tracking-wider mb-8 border-b border-border pb-4">
            Transparência Editorial
          </h1>

          <div className="space-y-6 text-[15px] text-text-muted leading-relaxed">
            <p>Na Rádio Cultura FM 104.7, acreditamos que a confiança e o compromisso com nossos ouvintes são fundamentais. Por isso, mantemos uma postura transparente em todas as nossas atividades, desde a gestão interna até a programação e veiculação de conteúdo. Abaixo, apresentamos nossos principais compromissos e práticas que refletem nosso respeito pelo público, patrocinadores e parceiros.</p>

            <section>
              <h2 className="text-xl font-bold text-dark-bg mb-3 mt-8">Compromisso com a Informação Confiável</h2>
              <p>Todos os conteúdos transmitidos pela Rádio Cultura FM 104.7 passam por critérios rigorosos de qualidade e responsabilidade. Nossas informações são baseadas em fontes confiáveis, garantindo a precisão das notícias e a imparcialidade nos comentários e entrevistas.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-dark-bg mb-3 mt-8">Ética e Responsabilidade Social</h2>
              <p>Somos comprometidos com uma programação ética, respeitando a diversidade e promovendo a inclusão. Em nossos programas e anúncios, buscamos sempre atuar de forma respeitosa e consciente, seguindo os princípios éticos da comunicação.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-dark-bg mb-3 mt-8">Política de Anúncios e Patrocínios</h2>
              <p>Transparência também é essencial no que diz respeito a anúncios e patrocínios. Em nossa programação, identificamos claramente os conteúdos patrocinados, assegurando que nossos ouvintes estejam sempre cientes da origem dos anunciantes da rádio.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-dark-bg mb-3 mt-8">Origem dos Nossos Conteúdos</h2>
              <p>Para manter nossos ouvintes e leitores informados 24 horas por dia, nosso portal utiliza um sistema de agregação inteligente de conteúdo (Feeds RSS). Deixamos claro a origem de cada notícia:</p>

              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong>Jornalismo Próprio:</strong> Conteúdos locais e reportagens exclusivas produzidas por nossa redação em Guaíra, SP.</li>
                <li><strong>Agência Brasil (EBC):</strong> Notícias nacionais, política, saúde, educação e esportes. (Veículo público e gratuito).</li>
                <li><strong>G1 e Regionais:</strong> Utilizamos feeds públicos para fornecer as manchetes e o resumo (excerpt) de notícias regionais e nacionais, sempre com link direto para a fonte original, respeitando os direitos autorais.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-dark-bg mb-3 mt-8">Política de Correções</h2>
              <p>Caso identifiquemos ou sejamos alertados sobre algum erro factual em nossas publicações próprias, nos comprometemos a publicar uma errata e atualizar a matéria imediatamente, indicando a data da correção.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-dark-bg mb-3 mt-8">Abertura para Feedback</h2>
              <p>A Rádio Cultura FM 104.7 valoriza a opinião do público. Mantemos canais de comunicação abertos para receber sugestões, críticas e dúvidas dos nossos ouvintes, buscando sempre aprimorar nossa atuação e nos alinhar às expectativas da comunidade.</p>
              <p className="mt-4">Nossa missão é ser mais do que uma rádio: queremos ser uma plataforma de comunicação que serve à sociedade com honestidade e compromisso. Para saber mais sobre nossas práticas e nos enviar seu feedback, fique à vontade para acessar a aba <Link href="/contato" className="text-primary hover:underline">Contato</Link> ou enviar uma mensagem pelas nossas redes sociais.</p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
