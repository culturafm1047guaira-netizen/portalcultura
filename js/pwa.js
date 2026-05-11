if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('PWA: Service Worker registrado'))
      .catch(err => console.log('PWA: Falha ao registrar SW:', err));
  });
}

let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  
  // Mostra o banner após 5 segundos se não foi descartado
  setTimeout(() => {
    if (deferredPrompt && !localStorage.getItem('pwa-dismissed')) {
      const banner = document.createElement('div');
      banner.id = 'pwa-install-banner';
      banner.className = 'pwa-banner';
      banner.innerHTML = `
        <div class="pwa-banner-content">
          <span>📱 Instale nosso app para acesso rápido!</span>
          <div class="pwa-banner-actions">
            <button id="pwa-install-btn" class="pwa-btn-primary">Instalar</button>
            <button id="pwa-dismiss-btn" class="pwa-btn-close" aria-label="Fechar">✕</button>
          </div>
        </div>
      `;
      document.body.appendChild(banner);
      
      document.getElementById('pwa-install-btn').onclick = () => {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(result => {
          deferredPrompt = null;
          banner.remove();
        });
      };
      
      document.getElementById('pwa-dismiss-btn').onclick = () => {
        localStorage.setItem('pwa-dismissed', 'true');
        banner.remove();
      };
    }
  }, 5000);
});
