export default async function handler(req, res) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  
  if (!apiKey || apiKey === 'SEU_API_KEY_AQUI') {
    return res.status(200).json([]);
  }
  const channelId = 'UCWRKwLTLmi5hMyEsWcPL4zw';
  
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&order=date&part=snippet&maxResults=3`
    );
    const data = await response.json();
    
    if (data.items) {
      const videos = data.items.map(item => ({
        videoId: item.id.videoId,
        title: item.snippet.title.replace(/</g, '&lt;').replace(/>/g, '&gt;'),
        thumbnail: item.snippet.thumbnails?.medium?.url,
        publishedAt: item.snippet.publishedAt
      }));
      res.status(200).json(videos);
    } else {
      res.status(200).json([]);
    }
  } catch (e) {
    res.status(500).json({ error: 'Erro ao carregar vídeos', videos: [] });
  }
}