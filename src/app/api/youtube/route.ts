import { NextResponse } from "next/server";

const fallbackVideos = [
  { videoId: "cFzhaLcq0Xk", title: "Programa Raízes Sertanejas (10-05-2026)", thumbnail: "https://img.youtube.com/vi/cFzhaLcq0Xk/mqdefault.jpg" },
  { videoId: "t9KR7G1ohVU", title: "Programa Raízes Sertanejas (03-05-2026)", thumbnail: "https://img.youtube.com/vi/t9KR7G1ohVU/mqdefault.jpg" },
  { videoId: "MVyyC4qLA5g", title: "Programa Raízes Sertanejas (29-03-2026)", thumbnail: "https://img.youtube.com/vi/MVyyC4qLA5g/mqdefault.jpg" },
];

export async function GET() {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey || apiKey === "SEU_API_KEY_AQUI") {
    return NextResponse.json(fallbackVideos);
  }

  const channelId = "UCWRKwLTLmi5hMyEsWcPL4zw";

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&order=date&part=snippet&maxResults=3`,
      { signal: AbortSignal.timeout(8000) }
    );
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const videos = data.items.map((item: any) => ({
        videoId: item.id.videoId,
        title: item.snippet.title.replace(/</g, "&lt;").replace(/>/g, "&gt;"),
        thumbnail: item.snippet.thumbnails?.medium?.url,
        publishedAt: item.snippet.publishedAt,
      }));
      return NextResponse.json(videos);
    }

    return NextResponse.json(fallbackVideos);
  } catch {
    return NextResponse.json({ error: "Erro ao carregar vídeos", videos: [] }, { status: 500 });
  }
}
