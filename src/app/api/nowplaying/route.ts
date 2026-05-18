import https from "https";
import http from "http";

const STREAM_URL = "https://ice.fabricahost.com.br/radioculturaguaira";

function followRedirect(url: string): Promise<{ url: string; icyMetaint: number; headers: Record<string, string> }> {
  return new Promise((resolve, reject) => {
    const isHttps = url.startsWith("https");
    const mod = isHttps ? https : http;

    const req = mod.request(url, {
      method: "GET",
      headers: {
        "Icy-MetaData": "1",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Connection": "close",
      },
      timeout: 10000,
    }, (res) => {
      const status = res.statusCode || 0;

      if (status >= 300 && status < 400 && res.headers.location) {
        res.destroy();
        const redirect = new URL(res.headers.location, url).toString();
        return followRedirect(redirect).then(resolve).catch(reject);
      }

      const icyMetaint = parseInt(res.headers["icy-metaint"] as string || "0", 10);
      const headers: Record<string, string> = {};
      for (const [k, v] of Object.entries(res.headers)) {
        headers[k] = Array.isArray(v) ? v.join(", ") : v || "";
      }

      resolve({ url, icyMetaint, headers });
    });

    req.on("error", reject);
    req.end();
  });
}

function readMetadataChunk(streamUrl: string, icyMetaint: number): Promise<string | null> {
  return new Promise((resolve, reject) => {
    const url = new URL(streamUrl);
    const isHttps = streamUrl.startsWith("https");
    const mod = isHttps ? https : http;

    const req = mod.request(streamUrl, {
      method: "GET",
      headers: {
        "Icy-MetaData": "1",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      timeout: 15000,
    }, (res) => {
      const status = res.statusCode || 0;

      if (status >= 300 && status < 400 && res.headers.location) {
        res.destroy();
        const redirect = new URL(res.headers.location, streamUrl).toString();
        return readMetadataChunk(redirect, icyMetaint).then(resolve).catch(reject);
      }

      const totalToRead = (icyMetaint || 16000) + 4096;
      let bytesRead = 0;
      const chunks: Buffer[] = [];

      res.on("data", (chunk: Buffer) => {
        chunks.push(chunk);
        bytesRead += chunk.length;
        if (bytesRead >= totalToRead) {
          res.destroy();
        }
      });

      res.on("end", () => {
        const fullBuffer = Buffer.concat(chunks);
        const audioStart = 0;
        const metaInterval = icyMetaint || 16000;
        const metaStart = audioStart + metaInterval;

        if (metaStart >= fullBuffer.length) {
          resolve(null);
          return;
        }

        const metaLen = fullBuffer[metaStart] * 16;
        if (metaLen <= 0) {
          resolve(null);
          return;
        }

        const metaEnd = metaStart + 1 + metaLen;
        const metaStr = fullBuffer.slice(metaStart + 1, metaEnd).toString("utf-8").replace(/\0/g, "");

        const titleMatch = metaStr.match(/StreamTitle='([^']*)'/);
        if (titleMatch) {
          resolve(titleMatch[1].trim());
        } else {
          resolve(null);
        }
      });

      res.on("error", reject);
    });

    req.on("error", reject);
    req.end();
  });
}

export async function GET() {
  try {
    const { url, icyMetaint } = await followRedirect(STREAM_URL);
    if (!icyMetaint) {
      return Response.json({ song: null, error: "no-icy-metadata" }, { status: 200 });
    }
    const song = await readMetadataChunk(url, icyMetaint);
    return Response.json({ song });
  } catch (err) {
    console.error("nowplaying error:", err);
    return Response.json({ song: null, error: "fetch-failed" }, { status: 200 });
  }
}

export const dynamic = "force-dynamic";
