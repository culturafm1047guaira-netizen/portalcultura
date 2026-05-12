import type { Metadata } from "next";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Termos de Uso — Rádio Cultura FM 104.7 | Guaíra, SP",
  description: "Termos de Uso do site Rádio Cultura FM 104.7. Conheça as regras e condições para utilização do nosso portal.",
  openGraph: {
    title: "Termos de Uso — Rádio Cultura FM 104.7",
    description: "Termos de Uso do site Rádio Cultura FM 104.7. Regras e condições para utilização do portal.",
    url: "https://radioculturaguaira.com.br/termos/",
  },
};

export default function TermosPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <Header />
      <div className="container flex-1">
        <main className="page-content">
          <div className="breadcrumb"><Link href="/">Início</Link> &rsaquo; <strong>Termos de Uso</strong></div>

          <h1>Termos de Uso</h1>

          <h2>1. Termos</h2>
          <p>Ao acessar ao site Rádio Cultura FM 104.7, concorda em cumprir estes termos de uso, todas as leis e regulamentos aplicáveis e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site. Os materiais contidos neste site são protegidos pelas leis de direitos autorais e marcas comerciais aplicáveis.</p>

          <h2>2. Uso de Licença</h2>
          <p>É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site Rádio Cultura FM 104.7, apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título e, sob esta licença, você não pode:</p>
          <ul>
            <li>Modificar ou copiar os materiais;</li>
            <li>Usar os materiais para qualquer finalidade comercial ou para exibição pública (comercial ou não comercial);</li>
            <li>Tentar descompilar ou fazer engenharia reversa de qualquer software contido no site Rádio Cultura FM 104.7;</li>
            <li>Remover quaisquer direitos autorais ou outras notações de propriedade dos materiais; ou</li>
            <li>Transferir os materiais para outra pessoa ou espelhe os materiais em qualquer outro servidor.</li>
          </ul>
          <p>Esta licença será automaticamente rescindida se você violar alguma dessas restrições e poderá ser rescindida por Rádio Cultura FM 104.7 a qualquer momento.</p>

          <h2>3. Isenção de Responsabilidade</h2>
          <p>Os materiais no site da Rádio Cultura FM 104.7 são fornecidos como estão. Rádio Cultura FM 104.7 não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.</p>

          <h2>4. Limitações</h2>
          <p>Em nenhum caso o Rádio Cultura FM 104.7 ou seus fornecedores serão responsáveis por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em Rádio Cultura FM 104.7.</p>

          <h2>5. Precisão dos Materiais</h2>
          <p>Os materiais exibidos no site da Rádio Cultura FM 104.7 podem incluir erros técnicos, tipográficos ou fotográficos. Rádio Cultura FM 104.7 não garante que qualquer material em seu site seja preciso, completo ou atual.</p>

          <h2>6. Links</h2>
          <p>O Rádio Cultura FM 104.7 não analisou todos os sites vinculados ao seu site e não é responsável pelo conteúdo de nenhum site vinculado. A inclusão de qualquer link não implica endosso por Rádio Cultura FM 104.7 do site.</p>

          <h2>7. Modificações</h2>
          <p>O Rádio Cultura FM 104.7 pode revisar estes termos de serviço do site a qualquer momento, sem aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão atual desses termos de serviço.</p>

          <h2>8. Lei Aplicável</h2>
          <p>Estes termos e condições são regidos e interpretados de acordo com as leis do Rádio Cultura FM 104.7 e você se submete irrevogavelmente à jurisdição exclusiva dos tribunais naquele estado ou localidade.</p>
        </main>
      </div>
      <Footer />
    </div>
  );
}
