export type YouTubeVideo = {
  id: string;
  title: string;
  publishedAt: string;
};

// Fallback videos in case the API is not configured or fails
const FALLBACK_VIDEOS: YouTubeVideo[] = [
  { id: "cFzhaLcq0Xk", title: "Programa Raízes Sertanejas - 10/05/2026", publishedAt: "2026-05-10T00:00:00Z" },
  { id: "t9KR7G1ohVU", title: "Programa Raízes Sertanejas - 03/05/2026", publishedAt: "2026-05-03T00:00:00Z" },
  { id: "MVyyC4qLA5g", title: "Programa Raízes Sertanejas - 29/03/2026", publishedAt: "2026-03-29T00:00:00Z" },
];

export async function getLatestVideos(): Promise<YouTubeVideo[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  // This is a known Channel ID or handle search.
  // Using a search query for the exact channel name to get the latest videos
  const channelQuery = "Cultura FM 104.7 Guaíra SP"; 

  if (!apiKey) {
    return FALLBACK_VIDEOS;
  }

  try {
    // Buscar vídeos mais recentes do canal
    // Usamos 'q' com restrição 'type=video' e order=date, simulando o canal. 
    // O ideal seria usar channelId, mas se não tivermos, buscar pela query funciona razoavelmente se for específica
    // Aqui assumimos que temos o CHANNEL_ID caso no futuro seja setado, senão usamos busca.
    const channelId = process.env.YOUTUBE_CHANNEL_ID || "";
    
    let url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&type=video&order=date&maxResults=3`;
    
    if (channelId) {
      url += `&channelId=${channelId}`;
    } else {
      url += `&q=${encodeURIComponent(channelQuery)}`;
    }

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
      title: item.snippet.title,
      publishedAt: item.snippet.publishedAt,
    }));
  } catch (error) {
    console.error("Failed to fetch YouTube videos:", error);
    return FALLBACK_VIDEOS;
  }
}
