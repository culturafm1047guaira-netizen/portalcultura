import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import Link from "next/link";

export const metadata = {
  title: "Serviços Públicos — Rádio Cultura FM 104.7",
  description: "Acesso rápido aos principais serviços públicos: CND, CNPJ, CPF, INSS, CEP, Justiça e mais.",
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
    title: "Certidões e Débitos",
    icon: "📜",
    items: [
      { name: "CND Federal", href: "https://servicos.receitafederal.gov.br/servico/certidoes/#/home", desc: "Certidão Negativa de Débitos Federais (Receita Federal)." },
      { name: "CND Estadual SP", href: "https://www10.fazenda.sp.gov.br/CertidaoNegativaDeb/Pages/EmissaoCertidaoNegativa.aspx", desc: "Certidão Negativa de Débitos do Estado de São Paulo." },
      { name: "CND Trabalhista", href: "https://cndt-certidao.tst.jus.br/inicio.faces", desc: "Certidão Negativa de Débitos Trabalhistas (TST)." },
      { name: "Certidão Regularidade FGTS", href: "https://consulta-crf.caixa.gov.br/consultacrf/pages/consultaEmpregador.jsf", desc: "Certidão de Regularidade do FGTS (Caixa)." },
      { name: "Antecedentes Criminais", href: "https://www2.ssp.sp.gov.br/aacweb/carrega-iframe", desc: "Atestado de Antecedentes Criminais (Polícia Civil SP)." },
    ],
  },
  {
    title: "Consultas",
    icon: "🔍",
    items: [
      { name: "Consulta CNPJ", href: "https://solucoes.receita.fazenda.gov.br/servicos/cnpjreva/cnpjreva_solicitacao.asp", desc: "Consultar dados cadastrais de CNPJ na Receita Federal." },
      { name: "Busca CEP Correios", href: "https://www.buscacep.correios.com.br/", desc: "Buscar endereço por CEP no site dos Correios." },
      { name: "B.O. Online SP", href: "https://delegaciadigital.policia-civil.sp.gov.br/pagina-inicial", desc: "Registrar Boletim de Ocorrência online (SSP SP)." },
    ],
  },
  {
    title: "Serviços do Cidadão",
    icon: "👤",
    items: [
      { name: "Meu INSS", href: "https://meu.inss.gov.br/#/login", desc: "Acessar benefícios, extrato e agendar perícias no INSS." },
    ],
  },
  {
    title: "Município de Guaíra",
    icon: "🏛️",
    items: [
      { name: "Prefeitura de Guaíra", href: "https://www.guaira.sp.gov.br/", desc: "Portal oficial da Prefeitura Municipal de Guaíra-SP." },
      { name: "Lista de CEPs de Guaíra-SP", href: "https://www.guaira.sp.gov.br/public/admin/globalarq/uploads/files/edital%20ceps.pdf", desc: "Relação oficial de CEPs do município de Guaíra (PDF)." },
    ],
  },
  {
    title: "Concessionárias",
    icon: "⚡",
    items: [
      { name: "CPFL Energia", href: "https://www.cpfl.com.br/", desc: "Conta de luz, religação, troca de titularidade." },
      { name: "DEÁGUA", href: "https://www.deagua.com.br/", desc: "Serviços de água e esgoto." },
    ],
  },
  {
    title: "Justiça",
    icon: "⚖️",
    items: [
      { name: "TJSP", href: "https://www.tjsp.jus.br/", desc: "Tribunal de Justiça do Estado de São Paulo." },
      { name: "TRF3", href: "https://www.trf3.jus.br/", desc: "Tribunal Regional Federal da 3ª Região." },
      { name: "TRT15", href: "https://trt15.jus.br/", desc: "Tribunal Regional do Trabalho da 15ª Região." },
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

        <div className="text-center mb-10">
          <h1 className="font-montserrat text-3xl font-extrabold text-dark-bg uppercase tracking-wider mb-4">
            Serviços Públicos
          </h1>
          <p className="text-[15px] text-text-muted max-w-2xl mx-auto">
            Acesso rápido aos principais serviços públicos e utilidades para o cidadão.
          </p>
        </div>

        <div className="space-y-10">
          {categories.map((cat) => (
            <section key={cat.title}>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">{cat.icon}</span>
                <h2 className="font-montserrat text-xl font-bold text-dark-bg uppercase tracking-wide">
                  {cat.title}
                </h2>
                <div className="flex-1 border-b border-border" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.items.map((item, idx) => {
                  const colors = [
                    "bg-blue-50 border-blue-200 hover:border-blue-400",
                    "bg-green-50 border-green-200 hover:border-green-400",
                    "bg-purple-50 border-purple-200 hover:border-purple-400",
                    "bg-orange-50 border-orange-200 hover:border-orange-400",
                    "bg-pink-50 border-pink-200 hover:border-pink-400",
                    "bg-teal-50 border-teal-200 hover:border-teal-400",
                    "bg-indigo-50 border-indigo-200 hover:border-indigo-400",
                    "bg-yellow-50 border-yellow-200 hover:border-yellow-400",
                    "bg-red-50 border-red-200 hover:border-red-400",
                    "bg-cyan-50 border-cyan-200 hover:border-cyan-400",
                  ];
                  const c = colors[idx % colors.length];
                  return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener"
                    className={`${c} border p-5 rounded-lg hover:shadow-lg transition-all duration-200 group flex flex-col`}
                  >
                    <h3 className="font-montserrat font-bold text-sm text-dark-bg mb-2 group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-[12px] text-text-muted leading-relaxed flex-1">
                      {item.desc}
                    </p>
                    <span className="text-[11px] font-bold text-primary mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      Acessar →
                    </span>
                  </a>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
