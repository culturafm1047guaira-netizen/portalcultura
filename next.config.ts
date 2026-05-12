import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "s2-g1.glbimg.com" },
      { protocol: "https", hostname: "s.glbimg.com" },
      { protocol: "https", hostname: "agenciabrasil.ebc.com.br" },
      { protocol: "https", hostname: "www.acidadeon.com" },
      { protocol: "https", hostname: "jovempan.com.br" },
      { protocol: "https", hostname: "www.jornaldebarretos.com.br" },
      { protocol: "https", hostname: "www.odiarioonline.com.br" },
      { protocol: "https", hostname: "www.guairanews.com" },
    ],
    unoptimized: true, // Forçar carregamento se necessário, mas remotePatterns é melhor
  },
};

export default nextConfig;
