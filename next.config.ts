import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    skipWaiting: true,
  },
});

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
      { protocol: "https", hostname: "rss.app" },
      { protocol: "https", hostname: "*.rss.app" },
      { protocol: "https", hostname: "*.fbcdn.net" },
      { protocol: "https", hostname: "s3.us-east-1.wasabisys.com" },
    ],
  },
};

export default withPWA(nextConfig);
