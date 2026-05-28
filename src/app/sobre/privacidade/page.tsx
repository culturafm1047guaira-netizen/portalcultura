import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import Link from "next/link";

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
          <Link href="/" className="text-primary hover:underline">Início</Link> &rsaquo; <Link href="/sobre" className="text-primary hover:underline">Sobre</Link> &rsaquo; <strong>Política de Privacidade</strong>
        </div>

        <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-lg border border-border shadow-sm">
          <h1 className="font-montserrat text-3xl font-extrabold text-dark-bg uppercase tracking-wider mb-8 border-b border-border pb-4">
            Política de Privacidade
          </h1>

          <div className="space-y-6 text-[15px] text-text-muted leading-relaxed">
            <p>A sua privacidade é importante para nós. É política do Rádio Cultura FM 104.7 respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site Rádio Cultura FM 104.7 e outros sites que possuímos e operamos.</p>

            <p>Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.</p>

            <p>Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.</p>

            <p>Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.</p>

            <p>O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.</p>

            <p>Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados.</p>

            <p>O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais. Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contato conosco.</p>

            <section>
              <h2 className="text-xl font-bold text-dark-bg mb-3 mt-8">Segurança e Confiança</h2>
              <p>O site Rádio Cultura FM 104.7 é confiável e seguro para navegação do usuário. A navegação verificada pela ferramenta de segurança do Google mostra que o site é seguro.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-dark-bg mb-3 mt-8">Política de Cookies</h2>

              <h3 className="text-lg font-bold text-dark-bg mb-2 mt-6">O que são cookies?</h3>
              <p>Como é prática comum em quase todos os sites profissionais, este site usa cookies, que são pequenos arquivos baixados no seu computador, para melhorar sua experiência. Esta página descreve quais informações eles coletam, como as usamos e por que às vezes precisamos armazenar esses cookies. Também compartilharemos como você pode impedir que esses cookies sejam armazenados, no entanto, isso pode fazer o downgrade ou &ldquo;quebrar&rdquo; certos elementos da funcionalidade do site.</p>

              <h3 className="text-lg font-bold text-dark-bg mb-2 mt-6">Como usamos os cookies?</h3>
              <p>Utilizamos cookies por vários motivos, detalhados abaixo. Infelizmente, na maioria dos casos, não existem opções padrão do setor para desativar os cookies sem desativar completamente a funcionalidade e os recursos que eles adicionam a este site. É recomendável que você deixe todos os cookies se não tiver certeza se precisa ou não deles, caso sejam usados para fornecer um serviço que você usa.</p>

              <h3 className="text-lg font-bold text-dark-bg mb-2 mt-6">Desativar cookies</h3>
              <p>Você pode impedir a configuração de cookies ajustando as configurações do seu navegador (consulte a Ajuda do navegador para saber como fazer isso). Esteja ciente de que a desativação de cookies afetará a funcionalidade deste e de muitos outros sites que você visita. A desativação de cookies geralmente resultará na desativação de determinadas funcionalidades e recursos deste site. Portanto, é recomendável que você não desative os cookies.</p>

              <h3 className="text-lg font-bold text-dark-bg mb-2 mt-6">Cookies que definimos</h3>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><strong>Cookies relacionados à conta:</strong> Se você criar uma conta conosco, usaremos cookies para o gerenciamento do processo de inscrição e administração geral. Esses cookies geralmente serão excluídos quando você sair do sistema, porém, em alguns casos, eles poderão permanecer posteriormente para lembrar as preferências do seu site ao sair.</li>
                <li><strong>Cookies relacionados ao login:</strong> Utilizamos cookies quando você está logado, para que possamos lembrar dessa ação. Isso evita que você precise fazer login sempre que visitar uma nova página. Esses cookies são normalmente removidos ou limpos quando você efetua logout para garantir que você possa acessar apenas recursos e áreas restritas ao efetuar login.</li>
                <li><strong>Cookies relacionados a boletins por e-mail:</strong> Este site oferece serviços de assinatura de boletim informativo ou e-mail e os cookies podem ser usados para lembrar se você já está registrado e se deve mostrar determinadas notificações válidas apenas para usuários inscritos ou não inscritos.</li>
                <li><strong>Cookies relacionados a processamento de pedidos:</strong> Este site oferece facilidades de comércio eletrônico ou pagamento e alguns cookies são essenciais para garantir que seu pedido seja lembrado entre as páginas, para que possamos processá-lo adequadamente.</li>
                <li><strong>Cookies relacionados a pesquisas:</strong> Periodicamente, oferecemos pesquisas e questionários para fornecer informações interessantes, ferramentas úteis ou para entender nossa base de usuários com mais precisão. Essas pesquisas podem usar cookies para lembrar quem já participou de uma pesquisa ou para fornecer resultados precisos após a alteração das páginas.</li>
                <li><strong>Cookies relacionados a formulários:</strong> Quando você envia dados por meio de um formulário como os encontrados nas páginas de contato ou nos formulários de comentários, os cookies podem ser configurados para lembrar os detalhes do usuário para correspondência futura.</li>
                <li><strong>Cookies de preferências do site:</strong> Para proporcionar uma ótima experiência neste site, fornecemos a funcionalidade para definir suas preferências de como esse site é executado quando você o usa. Para lembrar suas preferências, precisamos definir cookies para que essas informações possam ser chamadas sempre que você interagir com uma página afetada por suas preferências.</li>
              </ul>

              <h3 className="text-lg font-bold text-dark-bg mb-2 mt-6">Cookies de Terceiros</h3>
              <p>Em alguns casos especiais, também usamos cookies fornecidos por terceiros confiáveis. A seção a seguir detalha quais cookies de terceiros você pode encontrar através deste site.</p>
              <p className="mt-2">Este site usa o Google Analytics, que é uma das soluções de análise mais difundidas e confiáveis da Web, para nos ajudar a entender como você usa o site e como podemos melhorar sua experiência. Esses cookies podem rastrear itens como quanto tempo você gasta no site e as páginas visitadas, para que possamos continuar produzindo conteúdo atraente. Para mais informações sobre cookies do Google Analytics, consulte a página oficial do Google Analytics.</p>
              <p className="mt-2">As análises de terceiros são usadas para rastrear e medir o uso deste site, para que possamos continuar produzindo conteúdo atrativo. Esses cookies podem rastrear itens como o tempo que você passa no site ou as páginas visitadas, o que nos ajuda a entender como podemos melhorar o site para você.</p>
              <p className="mt-2">Periodicamente, testamos novos recursos e fazemos alterações sutis na maneira como o site se apresenta. Quando ainda estamos testando novos recursos, esses cookies podem ser usados para garantir que você receba uma experiência consistente enquanto estiver no site, enquanto entendemos quais otimizações os nossos usuários mais apreciam.</p>

              <h3 className="text-lg font-bold text-dark-bg mb-2 mt-6">Compromisso do Usuário</h3>
              <p>O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o Rádio Cultura FM 104.7 oferece no site e com caráter enunciativo, mas não limitativo:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Não se envolver em atividades que sejam ilegais ou contrárias à boa fé e à ordem pública;</li>
                <li>Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, ou casas de apostas, jogos de sorte e azar, qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos;</li>
                <li>Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do Rádio Cultura FM 104.7, de seus fornecedores ou terceiros, para introduzir ou disseminar vírus informáticos ou quaisquer outros sistemas de hardware ou software que sejam capazes de causar danos anteriormente mencionados.</li>
              </ul>

              <h3 className="text-lg font-bold text-dark-bg mb-2 mt-6">Bloquear cookies</h3>
              <p>O usuário pode bloquear e/ou desativar os cookies de qualquer site, inclusive o nosso, a qualquer momento. Para realizar esse procedimento, acesse as configurações do seu browser. Consulte os guias de ajuda dos principais navegadores: Google Chrome, Firefox, Microsoft Edge, Opera, Safari.</p>

              <h3 className="text-lg font-bold text-dark-bg mb-2 mt-6">Mais informações</h3>
              <p>Esperamos que esteja esclarecido e, como mencionado anteriormente, se houver algo que você não tem certeza se precisa ou não, geralmente é mais seguro deixar os cookies ativados, caso interaja com um dos recursos que você usa em nosso site.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-dark-bg mb-3 mt-8">Contato</h2>
              <p>Caso tenha qualquer dúvida sobre nossa Política de Privacidade, sinta-se à vontade para nos contatar através do e-mail: radioculturadeguaira@gmail.com.</p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
