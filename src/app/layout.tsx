import type { Metadata, Viewport } from "next";
import { Bebas_Neue, IBM_Plex_Sans } from "next/font/google";
import WhatsAppPeao from "@/components/WhatsAppPeao";
import { ThemeProvider } from "@/components/ThemeProvider";
import { OrganizationSchema, WebSiteSchema } from "@/components/JsonLd";
import "./globals.css";

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const plex = IBM_Plex_Sans({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#4169e1",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://radioculturaguaira.com.br/"),
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
  twitter: {
    card: "summary_large_image",
    title: "Rádio Cultura FM 104.7 — Portal de Notícias | Guaíra, SP",
    description: "Rádio Cultura FM 104.7 — Portal de Notícias de Guaíra, SP. Últimas notícias de Regional, Brasil, Esportes, Saúde, Educação e Justiça. Ouça ao vivo!",
    images: ["/img/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${bebas.variable} ${plex.variable} antialiased`} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <OrganizationSchema />
          <WebSiteSchema />
          {children}
          <WhatsAppPeao />
        </ThemeProvider>
      </body>
    </html>
  );
}
