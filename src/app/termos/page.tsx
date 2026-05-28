import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import Link from "next/link";

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
          <Link href="/" className="text-primary hover:underline">Início</Link> &rsaquo; <strong>Termos de Uso</strong>
        </div>

        <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-lg border border-border shadow-sm">
          <h1 className="font-montserrat text-3xl font-extrabold text-dark-bg uppercase tracking-wider mb-8 border-b border-border pb-4">
            Termos de Uso
          </h1>

          <div className="space-y-6 text-[15px] text-text-muted leading-relaxed">
            <p><strong>Última atualização:</strong> Novembro de 2026</p>

            <section>
              <h2 className="text-xl font-bold text-dark-bg mb-3 mt-8">1. Termos</h2>
              <p>Ao acessar ao site Rádio Cultura FM 104.7, concorda em cumprir estes termos de uso, todas as leis e regulamentos aplicáveis e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site. Os materiais contidos neste site são protegidos pelas leis de direitos autorais e marcas comerciais aplicáveis.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-dark-bg mb-3 mt-8">2. Uso de Licença</h2>
              <p>É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site Rádio Cultura FM 104.7, apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título e, sob esta licença, você não pode:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Modificar ou copiar os materiais;</li>
                <li>Usar os materiais para qualquer finalidade comercial ou para exibição pública (comercial ou não comercial);</li>
                <li>Tentar descompilar ou fazer engenharia reversa de qualquer software contido no site Rádio Cultura FM 104.7;</li>
                <li>Remover quaisquer direitos autorais ou outras notações de propriedade dos materiais; ou</li>
                <li>Transferir os materiais para outra pessoa ou &ldquo;espelhar&rdquo; os materiais em qualquer outro servidor.</li>
              </ul>
              <p className="mt-2">Esta licença será automaticamente rescindida se você violar alguma dessas restrições e poderá ser rescindida por Rádio Cultura FM 104.7 a qualquer momento. Ao encerrar a visualização desses materiais ou após o término desta licença, você deve apagar todos os materiais baixados em sua posse, seja em formato eletrônico ou impresso.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-dark-bg mb-3 mt-8">3. Isenção de Responsabilidade</h2>
              <p>Os materiais no site da Rádio Cultura FM 104.7 são fornecidos &ldquo;como estão&rdquo;. Rádio Cultura FM 104.7 não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.</p>
              <p className="mt-2">Além disso, o Rádio Cultura FM 104.7 não garante ou faz qualquer representação relativa à precisão, aos resultados prováveis ou à confiabilidade do uso dos materiais em seu site ou de outra forma relacionado a esses materiais ou em sites vinculados a este site.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-dark-bg mb-3 mt-8">4. Limitações</h2>
              <p>Em nenhum caso o Rádio Cultura FM 104.7 ou seus fornecedores serão responsáveis por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em Rádio Cultura FM 104.7, mesmo que Rádio Cultura FM 104.7 ou um representante autorizado da Rádio Cultura FM 104.7 tenha sido notificado oralmente ou por escrito da possibilidade de tais danos. Como algumas jurisdições não permitem limitações em garantias implícitas, ou limitações de responsabilidade por danos consequentes ou incidentais, essas limitações podem não se aplicar a você.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-dark-bg mb-3 mt-8">5. Precisão dos Materiais</h2>
              <p>Os materiais exibidos no site da Rádio Cultura FM 104.7 podem incluir erros técnicos, tipográficos ou fotográficos. Rádio Cultura FM 104.7 não garante que qualquer material em seu site seja preciso, completo ou atual. Rádio Cultura FM 104.7 pode fazer alterações nos materiais contidos em seu site a qualquer momento, sem aviso prévio. No entanto, Rádio Cultura FM 104.7 não se compromete a atualizar os materiais.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-dark-bg mb-3 mt-8">6. Links</h2>
              <p>O Rádio Cultura FM 104.7 não analisou todos os sites vinculados ao seu site e não é responsável pelo conteúdo de nenhum site vinculado. A inclusão de qualquer link não implica endosso por Rádio Cultura FM 104.7 do site. O uso de qualquer site vinculado é por conta e risco do usuário.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-dark-bg mb-3 mt-8">Modificações</h2>
              <p>O Rádio Cultura FM 104.7 pode revisar estes termos de serviço do site a qualquer momento, sem aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão atual desses termos de serviço.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-dark-bg mb-3 mt-8">Lei Aplicável</h2>
              <p>Estes termos e condições são regidos e interpretados de acordo com as leis do Rádio Cultura FM 104.7 e você se submete irrevogavelmente à jurisdição exclusiva dos tribunais naquele estado ou localidade.</p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
