import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";

export const metadata = {
  title: "Termos de Uso — Rádio Cultura FM 104.7",
};

export default function TermosPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <Header />

      <main className="container py-8 flex-1">
        <div className="text-[12px] text-gray-400 mb-6">
          <a href="/" className="text-primary hover:underline">Início</a> &rsaquo; <strong>Termos de Uso</strong>
        </div>

        <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-lg border border-border shadow-sm">
          <h1 className="font-montserrat text-3xl font-extrabold text-dark-bg uppercase tracking-wider mb-8 border-b border-border pb-4">
            Termos de Uso
          </h1>

          <div className="space-y-6 text-[15px] text-text-muted leading-relaxed">
            <p><strong>Última atualização:</strong> Novembro de 2026</p>
            
            <section>
              <h2 className="text-xl font-bold text-dark-bg mb-3 mt-8">1. Aceitação dos Termos</h2>
              <p>Ao acessar e utilizar o portal de notícias da Rádio Cultura FM 104.7, você concorda em cumprir e estar vinculado aos seguintes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deve utilizar nosso portal.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-dark-bg mb-3 mt-8">2. Descrição do Serviço</h2>
              <p>O portal da Rádio Cultura FM 104.7 oferece acesso a notícias locais, regionais e nacionais, streaming de áudio ao vivo, e informações sobre a programação da emissora. Os conteúdos exibidos no portal são provenientes de produção própria e de parceiros, via feeds RSS públicos e autorizados.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-dark-bg mb-3 mt-8">3. Uso de Conteúdo</h2>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Todo o conteúdo original produzido pela Rádio Cultura FM 104.7 (textos, áudios, imagens e vídeos) é protegido por direitos autorais.</li>
                <li>A reprodução de notícias de nossos parceiros (G1, Agência Brasil, etc.) respeita as diretrizes de republicação e feeds RSS de cada veículo. Tais conteúdos são de responsabilidade de suas respectivas fontes.</li>
                <li>Você não pode modificar, publicar, transmitir, participar da transferência ou venda, criar trabalhos derivados, ou de qualquer forma explorar comercialmente qualquer conteúdo do portal sem autorização expressa.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-dark-bg mb-3 mt-8">4. Isenção de Responsabilidade</h2>
              <p>O portal é fornecido "como está" e "conforme disponível". Não garantimos que o serviço será ininterrupto, livre de erros ou totalmente seguro. As opiniões expressas em colunas e comentários não refletem necessariamente a opinião da Rádio Cultura FM.</p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
