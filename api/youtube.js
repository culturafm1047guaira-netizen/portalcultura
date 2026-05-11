export default async function handler(req, res) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  
    const fallbackVideos = [
      { videoId: 'zFz62f1H8S0', title: 'Rádio Cultura FM 104.7 - Ao Vivo', thumbnail: 'https://img.youtube.com/vi/zFz62f1H8S0/mqdefault.jpg' },
      { videoId: 'dQw4w9WgXcQ', title: 'Destaques da Semana', thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg' },
      { videoId: 'jNQXAC9IVRw', title: 'Entrevistas e Reportagens', thumbnail: 'https://img.youtube.com/vi/jNQXAC9IVRw/mqdefault.jpg' }
    ];

    if (!apiKey || apiKey === 'SEU_API_KEY_AQUI') {
      return res.status(200).json(fallbackVideos);
    }
    
    const channelId = 'UCWRKwLTLmi5hMyEsWcPL4zw';
    
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&order=date&part=snippet&maxResults=3`
      );
      const data = await response.json();
      
      if (data.items && data.items.length > 0) {
        const videos = data.items.map(item => ({
          videoId: item.id.videoId,
          title: item.snippet.title.replace(/</g, '&lt;').replace(/>/g, '&gt;'),
          thumbnail: item.snippet.thumbnails?.medium?.url,
          publishedAt: item.snippet.publishedAt
        }));
        res.status(200).json(videos);
      } else {
        res.status(200).json(fallbackVideos);
      }
  } catch (e) {
    res.status(500).json({ error: 'Erro ao carregar vídeos', videos: [] });
  }
}