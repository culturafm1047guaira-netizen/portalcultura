export default async function handler(req, res) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  
    const fallbackVideos = [
      { videoId: 'cFzhaLcq0Xk', title: 'Programa Raízes Sertanejas (10-05-2026)', thumbnail: 'https://img.youtube.com/vi/cFzhaLcq0Xk/mqdefault.jpg' },
      { videoId: 't9KR7G1ohVU', title: 'Programa Raízes Sertanejas (03-05-2026)', thumbnail: 'https://img.youtube.com/vi/t9KR7G1ohVU/mqdefault.jpg' },
      { videoId: 'MVyyC4qLA5g', title: 'Programa Raízes Sertanejas (29-03-2026)', thumbnail: 'https://img.youtube.com/vi/MVyyC4qLA5g/mqdefault.jpg' }
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