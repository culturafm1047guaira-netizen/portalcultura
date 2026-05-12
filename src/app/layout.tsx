import type { Metadata, Viewport } from "next";
import { Montserrat, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const viewport: Viewport = {
  themeColor: "#4169e1",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Rádio Cultura FM 104.7 — Portal de Notícias | Guaíra, SP",
  description: "Rádio Cultura FM 104.7 — Portal de Notícias de Guaíra, SP. Últimas notícias de Regional, Brasil, Esportes, Saúde, Educação e Justiça. Ouça ao vivo!",
  keywords: ["Rádio Cultura", "FM 104.7", "Guaíra", "notícias", "regional", "Brasil"],
  robots: "index, follow",
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://radioculturaguaira.com.br/",
    siteName: "Rádio Cultura FM 104.7",
    images: [
      {
        url: "/img/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rádio Cultura FM 104.7",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} ${sourceSans.variable} antialiased`}>
      <body>
        {children}
      </body>
    </html>
  );
}
