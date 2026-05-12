import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";

export const metadata = {
  title: "Política de Privacidade — Rádio Cultura FM 104.7",
};

export default function PrivacidadePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <Header />

      <main className="container py-8 flex-1">
        <div className="text-[12px] text-gray-400 mb-6">
          <a href="/" className="text-primary hover:underline">Início</a> &rsaquo; <a href="/sobre" className="text-primary hover:underline">Sobre</a> &rsaquo; <strong>Política de Privacidade</strong>
        </div>

        <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-lg border border-border shadow-sm">
          <h1 className="font-montserrat text-3xl font-extrabold text-dark-bg uppercase tracking-wider mb-8 border-b border-border pb-4">
            Política de Privacidade
          </h1>

          <div className="space-y-6 text-[15px] text-text-muted leading-relaxed">
            <p>Na Rádio Cultura FM 104.7, a privacidade dos nossos visitantes é de extrema importância. Este documento descreve os tipos de informações pessoais que são coletadas e recebidas pelo nosso portal e como elas são utilizadas, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).</p>
            
            <section>
              <h2 className="text-xl font-bold text-dark-bg mb-3 mt-8">1. Coleta de Informações</h2>
              <p>O portal da Rádio Cultura coleta informações básicas e não identificáveis diretamente quando você visita nosso site, através de cookies e ferramentas de análise (como o Google Analytics). Tais informações podem incluir:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Endereço IP e tipo de navegador.</li>
                <li>Páginas visitadas e tempo de permanência.</li>
                <li>Padrões de navegação.</li>
              </ul>
              <p className="mt-2">Esses dados são usados unicamente para fins estatísticos e de melhoria contínua da experiência do usuário.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-dark-bg mb-3 mt-8">2. Dados Fornecidos Voluntariamente</h2>
              <p>Caso você entre em contato conosco através de e-mail ou WhatsApp, as informações fornecidas (como nome, número de telefone e e-mail) serão utilizadas apenas para responder à sua solicitação e não serão compartilhadas com terceiros sem seu consentimento expresso.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-dark-bg mb-3 mt-8">3. Uso de Cookies</h2>
              <p>Nosso site utiliza cookies para armazenar informações sobre as preferências dos visitantes e registrar informações específicas sobre as páginas acessadas. Se você desejar desativar os cookies, poderá fazê-lo através das opções do seu navegador.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-dark-bg mb-3 mt-8">4. Contato</h2>
              <p>Caso tenha qualquer dúvida sobre nossa Política de Privacidade, sinta-se à vontade para nos contatar através do e-mail: radioculturadeguaira@gmail.com.</p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
