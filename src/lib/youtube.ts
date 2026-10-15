export type YouTubeVideo = {
  id: string;
  title: string;
  publishedAt: string;
};

const CHANNEL_HANDLE = "culturafmguaira-sp";

// Fallback videos usados apenas se a API do YouTube não estiver configurada ou falhar
const FALLBACK_VIDEOS: YouTubeVideo[] = [
  { id: "cFzhaLcq0Xk", title: "Programa Raízes Sertanejas - 10/05/2026", publishedAt: "2026-05-10T00:00:00Z" },
  { id: "t9KR7G1ohVU", title: "Programa Raízes Sertanejas - 03/05/2026", publishedAt: "2026-05-03T00:00:00Z" },
  { id: "MVyyC4qLA5g", title: "Programa Raízes Sertanejas - 29/03/2026", publishedAt: "2026-03-29T00:00:00Z" },
];

async function resolveChannelId(apiKey: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?key=${apiKey}&part=id&forHandle=${CHANNEL_HANDLE}`,
      { next: { revalidate: 86400 } } // handle -> id raramente muda, revalida 1x/dia
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.items?.[0]?.id || null;
  } catch {
    return null;
  }
}

export async function getLatestVideos(): Promise<YouTubeVideo[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    return FALLBACK_VIDEOS;
  }

  try {
    const channelId = process.env.YOUTUBE_CHANNEL_ID || (await resolveChannelId(apiKey));
    if (!channelId) {
      return FALLBACK_VIDEOS;
    }

    const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&type=video&order=date&maxResults=3`;
    const res = await fetch(url, { next: { revalidate: 3600 } }); // Revalida a cada 1 hora
    if (!res.ok) {
      return FALLBACK_VIDEOS;
    }

    const data = await res.json();
    if (!data.items || data.items.length === 0) {
      return FALLBACK_VIDEOS;
    }

    return data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title.replace(/&quot;/g, '"').replace(/&#39;/g, "'"),
      publishedAt: item.snippet.publishedAt,
    }));
  } catch (error) {
    console.error("Failed to fetch YouTube videos:", error);
    return FALLBACK_VIDEOS;
  }
}
