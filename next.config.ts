import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";
import { env as t } from "process";

function isDomainAllowed(domain: string): boolean {
  try {
    const { hostname } = new URL(domain);
    return hostname.endsWith("glbimg.com") ||
           hostname.endsWith("ebc.com.br") ||
           hostname.endsWith("acidadeon.com") ||
           hostname.endsWith("jovempan.com.br") ||
           hostname.endsWith("jornaldebarretos.com.br") ||
           hostname.endsWith("odiarioonline.com.br") ||
           hostname.endsWith("guairanews.com") ||
           hostname.endsWith("rss.app") ||
           hostname.endsWith("*.rss.app") ||
           hostname.endsWith("*.fbcdn.net") ||
           hostname.endsWith("s3.us-east-1.wasabisys.com") ||
           hostname.endsWith("placehold.co") ||
           hostname === "radioculturaguaira.com.br" ||
           hostname === "www.radioculturaguaira.com.br";
  } catch {
    return false;
  }
}

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    skipWaiting: true,
    runtimeCaching: [
      {
        urlPattern: ({ request }) => {
          if (request.headers.get("authorization")) return true;
          return false;
        },
        handler: "NetworkFirst",
      },
    ],
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
    ].filter((pattern) => isDomainAllowed(pattern.hostname)),
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "Content-Security-Policy",
          value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.gsi.opensource.tw; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https: blob:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://radioculturaguaira.com.br; frame-ancestors 'none';",
        },
        {
          key: "Referrer-Policy",
          value: "strict-origin-when-cross-origin",
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "X-Frame-Options",
          value: "DENY",
        },
        {
          key: "Strict-Transport-Security",
          value: "max-age=31536000; includeSubDomains",
        },
      ],
    },
  ],
  compiler: { removeConsole: process.env.NODE_ENV === "production" },
};

export default withPWA(nextConfig);
