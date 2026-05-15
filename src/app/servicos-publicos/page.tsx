import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import Link from "next/link";

export const metadata = {
  title: "Serviços Públicos — Rádio Cultura FM 104.7",
  description: "Catálogo de serviços públicos e APIs governamentais para consulta e acesso à informação.",
};

interface ServiceItem {
  name: string;
  href: string;
  desc: string;
}

interface ServiceCategory {
  title: string;
  icon: string;
  items: ServiceItem[];
}

const categories: ServiceCategory[] = [
  {
    title: "Documentação e Cadastro",
    icon: "📋",
    items: [
      { name: "Consulta CPF", href: "https://www.gov.br/conecta/catalogo/apis/cadastro-base-do-cidadao-cbc-cpf", desc: "Consultar situação cadastral do CPF na Receita Federal." },
      { name: "Consulta CNPJ", href: "https://www.gov.br/conecta/catalogo/apis/consulta-cnpj", desc: "Obter dados cadastrais de empresas e entidades." },
      { name: "Certidão Negativa de Débitos (CND)", href: "https://www.gov.br/conecta/catalogo/apis/consultar-certidao-negativa-de-debito", desc: "Emitir certidão negativa de débitos federais." },
      { name: "Certidão de Antecedentes Criminais", href: "https://www.gov.br/conecta/catalogo/apis/antecedentes-criminais", desc: "Solicitar certidão de antecedentes criminais da Justiça Federal." },
    ],
  },
  {
    title: "Saúde",
    icon: "🏥",
    items: [
      { name: "Cartão Nacional de Saúde (CNS)", href: "https://www.gov.br/conecta/catalogo/apis/cadsus-cadastro-de-usuarios-do-sus", desc: "Consultar dados do Cartão Nacional de Saúde do SUS." },
      { name: "RNDS — Rede Nacional de Dados em Saúde", href: "https://www.gov.br/conecta/catalogo/apis/rnds-rede-nacional-de-dados-em-saude", desc: "Acessar prontuários e dados de saúde integrados." },
    ],
  },
  {
    title: "Agricultura e Meio Ambiente",
    icon: "🌱",
    items: [
      { name: "CAF — Agricultura Familiar", href: "https://www.gov.br/conecta/catalogo/apis/cadastro-nacional-da-agricultura-familiar", desc: "Consultar Cadastro Nacional da Agricultura Familiar." },
      { name: "SNCR — Cadastro Rural", href: "https://www.gov.br/conecta/catalogo/apis/sncr-sistema-nacional-de-cadastro-rural", desc: "Sistema Nacional de Cadastro Rural de imóveis." },
      { name: "SICAR — Imóvel Rural", href: "https://www.gov.br/conecta/catalogo/apis/sicar-imovel", desc: "Consultar Cadastro Ambiental Rural de imóveis." },
      { name: "SIGEF GEO", href: "https://www.gov.br/conecta/catalogo/apis/sigef-geo", desc: "Sistema de Gestão Fundiária — malha fundiária." },
    ],
  },
  {
    title: "Transparência e Controle",
    icon: "🔍",
    items: [
      { name: "Portal da Transparência", href: "https://www.gov.br/conecta/catalogo/apis/portal-da-transparencia-do-governo-federal", desc: "Acessar dados de gastos e receitas do Governo Federal." },
      { name: "API Portal de Dados Abertos", href: "https://www.gov.br/conecta/catalogo/apis/api-portal-de-dados-abertos", desc: "Consultar dados abertos de diversos órgãos públicos." },
      { name: "Fala.BR — Ouvidorias", href: "https://www.gov.br/conecta/catalogo/apis/fala-br", desc: "Registrar manifestações e denúncias em ouvidorias." },
      { name: "Dívida Ativa da União", href: "https://www.gov.br/conecta/catalogo/apis/consulta-divida-ativa-da-uniao", desc: "Consultar inscrições em dívida ativa da União." },
    ],
  },
  {
    title: "Serviços Digitais",
    icon: "💻",
    items: [
      { name: "Acesso gov.br", href: "https://www.gov.br/conecta/catalogo/apis/brasil-cidadao-login-unico", desc: "Login único para serviços públicos digitais." },
      { name: "CEP — Código de Endereçamento Postal", href: "https://www.gov.br/conecta/catalogo/apis/cep-codigo-de-enderecamento-postal", desc: "Consultar endereços pelo CEP dos Correios." },
      { name: "Assinatura Digital Avançada", href: "https://www.gov.br/conecta/catalogo/apis/assinatura-digital-avancada", desc: "Assinar documentos digitalmente com validade jurídica." },
      { name: "vLibras — Língua Brasileira de Sinais", href: "https://www.gov.br/conecta/catalogo/apis/vlibras", desc: "Tradução automática de português para Libras." },
      { name: "Situação Militar", href: "https://www.gov.br/conecta/catalogo/apis/situacao-militar", desc: "Consultar situação do serviço militar." },
      { name: "ID Jovem", href: "https://www.gov.br/conecta/catalogo/apis/id-jovem", desc: "Carteira de benefícios para jovens de baixa renda." },
    ],
  },
  {
    title: "Previdência e Trabalho",
    icon: "👷",
    items: [
      { name: "Benefícios Previdenciários", href: "https://www.gov.br/conecta/catalogo/apis/api-beneficios-previdenciarios", desc: "Consultar dados de benefícios do INSS." },
      { name: "Benefício de Prestação Continuada (BPC)", href: "https://www.gov.br/conecta/catalogo/apis/beneficio-de-prestacao-continuada-bpc", desc: "Informações sobre o BPC-LOAS." },
      { name: "SIAPE — Servidores Federais", href: "https://www.gov.br/conecta/catalogo/apis/consulta-siape", desc: "Consultar dados de servidores públicos federais." },
      { name: "Relação Trabalhista", href: "https://www.gov.br/conecta/catalogo/apis/relacao-trabalhista", desc: "Consultar vínculos trabalhistas e carteira assinada." },
    ],
  },
];

export default function ServicosPublicosPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <Header />

      <main className="container py-8 flex-1">
        <div className="text-[12px] text-gray-400 mb-6">
          <Link href="/" className="text-primary hover:underline">Início</Link> &rsaquo; <strong>Serviços Públicos</strong>
        </div>

        <div className="text-center mb-12">
          <h1 className="font-montserrat text-3xl font-extrabold text-dark-bg uppercase tracking-wider mb-4">
            Serviços Públicos
          </h1>
          <p className="text-[15px] text-text-muted max-w-2xl mx-auto">
            Catálogo de serviços e APIs governamentais disponibilizados pelo Governo Federal 
            para consulta, transparência e cidadania. Clique em cada serviço para acessá-lo.
          </p>
        </div>

        <div className="space-y-12">
          {categories.map((cat) => (
            <section key={cat.title}>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{cat.icon}</span>
                <h2 className="font-montserrat text-xl font-bold text-dark-bg uppercase tracking-wide">
                  {cat.title}
                </h2>
                <div className="flex-1 border-b border-border" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {cat.items.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener"
                    className="bg-white border border-border p-5 rounded-lg hover:shadow-lg hover:border-primary/30 transition-all duration-200 group"
                  >
                    <h3 className="font-montserrat font-bold text-sm text-dark-bg mb-2 group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-[12px] text-text-muted leading-relaxed">
                      {item.desc}
                    </p>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 bg-primary/5 border border-primary/20 p-6 rounded-lg text-center">
          <p className="text-[13px] text-text-muted">
            Fonte:{" "}
            <a href="https://www.gov.br/conecta/catalogo/" target="_blank" rel="noopener" className="text-primary font-bold hover:underline">
              Catálogo de APIs Governamentais — Conecta gov.br
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
