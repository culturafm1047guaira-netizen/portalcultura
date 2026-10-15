import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";
import { env as t } from "process";

function isDomainAllowed(hostname: string): boolean {
  return hostname.endsWith("glbimg.com") ||
         hostname.endsWith("ebc.com.br") ||
         hostname.endsWith("acidadeon.com") ||
         hostname.endsWith("jovempan.com.br") ||
         hostname.endsWith("jornaldebarretos.com.br") ||
         hostname.endsWith("odiarioonline.com.br") ||
         hostname.endsWith("guairanews.com") ||
         hostname.endsWith("rss.app") ||
         hostname.endsWith("fbcdn.net") ||
         hostname.endsWith("s3.us-east-1.wasabisys.com") ||
         hostname.endsWith("supabase.co") ||
         hostname === "placehold.co" ||
         hostname === "radioculturaguaira.com.br" ||
         hostname === "www.radioculturaguaira.com.br";
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
    remotePatterns: ([
      { protocol: "https" as const, hostname: "s2-g1.glbimg.com", port: "", pathname: "" },
      { protocol: "https" as const, hostname: "s.glbimg.com", port: "", pathname: "" },
      { protocol: "https" as const, hostname: "agenciabrasil.ebc.com.br", port: "", pathname: "" },
      { protocol: "https" as const, hostname: "www.acidadeon.com", port: "", pathname: "" },
      { protocol: "https" as const, hostname: "jovempan.com.br", port: "", pathname: "" },
      { protocol: "https" as const, hostname: "www.jornaldebarretos.com.br", port: "", pathname: "" },
      { protocol: "https" as const, hostname: "www.odiarioonline.com.br", port: "", pathname: "" },
      { protocol: "https" as const, hostname: "www.guairanews.com", port: "", pathname: "" },
      { protocol: "https" as const, hostname: "rss.app", port: "", pathname: "" },
      { protocol: "https" as const, hostname: "*.rss.app", port: "", pathname: "" },
      { protocol: "https" as const, hostname: "*.fbcdn.net", port: "", pathname: "" },
      { protocol: "https" as const, hostname: "s3.us-east-1.wasabisys.com", port: "", pathname: "" },
      { protocol: "https" as const, hostname: "placehold.co", port: "", pathname: "" },
      { protocol: "https" as const, hostname: "*.supabase.co", port: "", pathname: "/storage/v1/object/public/**" },
    ] as const).filter((pattern) => isDomainAllowed(pattern.hostname)),
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "Content-Security-Policy",
          value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.gsi.opensource.tw; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https: blob:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://radioculturaguaira.com.br https://*.supabase.co wss://*.supabase.co; frame-ancestors 'none';",
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
