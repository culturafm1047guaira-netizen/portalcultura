/**
 * YouTube Lite Facade
 * Carrega apenas uma thumbnail e injeta o iframe no clique para melhorar LCP e TBT.
 */
function initYouTubeLite() {
  const containers = document.querySelectorAll('.yt-facade');
  
  containers.forEach(container => {
    const videoId = container.dataset.videoId;
    if (!videoId) return;

    // Adiciona a thumbnail
    const img = document.createElement('img');
    img.src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    img.alt = 'Clique para assistir o vídeo';
    img.loading = 'lazy';
    container.appendChild(img);

    // Injeta iframe no clique
    container.addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allowfullscreen', '');
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
      iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0&iv_load_policy=3`);
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.position = 'absolute';
      iframe.style.top = '0';
      iframe.style.left = '0';
      
      container.innerHTML = '';
      container.appendChild(iframe);
    }, { once: true });
  });
}

document.addEventListener('DOMContentLoaded', initYouTubeLite);
