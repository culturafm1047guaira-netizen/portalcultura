import type { Metadata } from "next";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Política de Privacidade — Rádio Cultura FM 104.7 | Guaíra, SP",
  description: "Política de Privacidade da Rádio Cultura FM 104.7. Saiba como coletamos, usamos e protegemos suas informações pessoais.",
  openGraph: {
    title: "Política de Privacidade — Rádio Cultura FM 104.7",
    description: "Política de Privacidade da Rádio Cultura FM 104.7. Saiba como protegemos suas informações.",
    url: "https://radioculturaguaira.com.br/sobre/privacidade/",
  },
};

export default function PrivacidadePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <Header />
      <div className="container flex-1">
        <main className="page-content">
          <div className="breadcrumb"><Link href="/">Início</Link> &rsaquo; <Link href="/sobre">Sobre</Link> &rsaquo; <strong>Política de Privacidade</strong></div>

          <h1>Política de Privacidade</h1>

          <p>A sua privacidade é importante para nós. É política do Rádio Cultura FM 104.7 respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site Rádio Cultura FM 104.7, e outros sites que possuímos e operamos.</p>
          <p>Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.</p>
          <p>Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.</p>
          <p>Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.</p>
          <p>O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.</p>
          <p>Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados.</p>
          <p>O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais. Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contato conosco.</p>

          <h2>Segurança e Confiança</h2>
          <p>O site é confiável e seguro para navegação do usuário conforme informado pela Verificação. A página verifica informações do site para identificar possíveis problemas de segurança. A navegação verificada pela ferramenta segurança do Google mostra que o site é seguro.</p>

          <h2>Política de Cookies</h2>

          <h3>O que são cookies?</h3>
          <p>Como é prática comum em quase todos os sites profissionais, este site usa cookies, que são pequenos arquivos baixados no seu computador, para melhorar sua experiência. Esta página descreve quais informações eles coletam, como as usamos e por que às vezes precisamos armazenar esses cookies.</p>

          <h3>Como usamos os cookies?</h3>
          <p>Utilizamos cookies por vários motivos, detalhados abaixo. Infelizmente, na maioria dos casos, não existem opções padrão do setor para desativar os cookies sem desativar completamente a funcionalidade e os recursos que eles adicionam a este site. É recomendável que você deixe todos os cookies se não tiver certeza se precisa ou não deles.</p>

          <h3>Desativar cookies</h3>
          <p>Você pode impedir a configuração de cookies ajustando as configurações do seu navegador (consulte a Ajuda do navegador para saber como fazer isso). Esteja ciente de que a desativação de cookies afetará a funcionalidade deste e de muitos outros sites que você visita.</p>

          <h3>Cookies relacionados à conta</h3>
          <p>Se você criar uma conta conosco, usaremos cookies para o gerenciamento do processo de inscrição e administração geral. Esses cookies geralmente serão excluídos quando você sair do sistema, porém, em alguns casos, eles poderão permanecer posteriormente para lembrar as preferências do seu site ao sair.</p>

          <h3>Cookies de Terceiros</h3>
          <p>Este site usa o Google Analytics, que é uma das soluções de análise mais difundidas e confiáveis da Web, para nos ajudar a entender como você usa o site e como podemos melhorar sua experiência. Esses cookies podem rastrear itens como quanto tempo você gasta no site e as páginas visitadas.</p>

          <h2>Compromisso do Usuário</h2>
          <p>O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o Rádio Cultura FM 104.7 oferece no site e com caráter enunciativo, mas não limitativo:</p>
          <ul>
            <li>A) Não se envolver em atividades que sejam ilegais ou contrárias à boa fé e à ordem pública;</li>
            <li>B) Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, ou qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos;</li>
            <li>C) Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do Rádio Cultura FM 104.7, de seus fornecedores ou terceiros, para introduzir ou disseminar vírus informáticos ou quaisquer outros sistemas que sejam capazes de causar danos.</li>
          </ul>

          <h2>Mais Informações</h2>
          <p>Esperemos que esteja esclarecido e, como mencionado anteriormente, se houver algo que você não tem certeza se precisa ou não, geralmente é mais seguro deixar os cookies ativados, caso interaja com um dos recursos que você usa em nosso site.</p>
        </main>
      </div>
      <Footer />
    </div>
  );
}
