document.addEventListener('DOMContentLoaded', () => {
  const panels = document.querySelectorAll('.panel');
  const accordion = document.getElementById('accordion');
  
  const detailView = document.getElementById('detail-view');
  const detailBg = document.getElementById('detail-bg');
  const detailPlatforms = document.getElementById('detail-platforms');
  const detailTitle = document.getElementById('detail-title');
  const detailRelease = document.getElementById('detail-release');
  const detailGenre = document.getElementById('detail-genre');
  const detailPlayers = document.getElementById('detail-players');
  const detailVideo = document.getElementById('detail-video');
  const detailLink = document.getElementById('detail-link');
  
  const btnClose = document.getElementById('btn-close');

  // Función para asignar color/clase a las etiquetas de plataforma
  const createPlatformBadges = (platformsArray) => {
    detailPlatforms.innerHTML = '';
    platformsArray.forEach(plat => {
      const span = document.createElement('span');
      span.classList.add('badge');
      
      const lower = plat.toLowerCase();
      if (lower.includes('ps4') || lower.includes('ps5')) {
        span.classList.add('badge-ps4');
      } else if (lower.includes('xbox')) {
        span.classList.add('badge-xbox');
      } else if (lower.includes('stadia')) {
        span.classList.add('badge-stadia');
      } else if (lower.includes('pc')) {
        span.classList.add('badge-pc');
      } else {
        span.classList.add('badge-default');
      }

      span.textContent = plat;
      detailPlatforms.appendChild(span);
    });
  };

  // Evento CLICK en cada panel del acordeón
  panels.forEach(panel => {
    panel.addEventListener('click', () => {
      // Extraer datos del atributo dataset
      const title = panel.getAttribute('data-title');
      const platforms = JSON.parse(panel.getAttribute('data-platforms') || '[]');
      const release = panel.getAttribute('data-release');
      const genre = panel.getAttribute('data-genre');
      const players = panel.getAttribute('data-players');
      const bg = panel.getAttribute('data-bg');
      const video = panel.getAttribute('data-video');
      const link = panel.getAttribute('data-link');

      // Actualizar la vista de detalle
      detailTitle.textContent = title;
      detailRelease.textContent = release;
      detailGenre.textContent = genre;
      detailPlayers.textContent = players;
      detailBg.style.backgroundImage = `url('${bg}')`;
      detailVideo.src = video;
      detailLink.href = link;

      createPlatformBadges(platforms);

      // Ocultar acordeón y activar vista detallada
      accordion.classList.add('hidden');
      detailView.classList.add('active');
    });
  });

  // Evento CLICK en el botón CLOSE
  const closeDetail = () => {
    detailView.classList.remove('active');
    accordion.classList.remove('hidden');
    detailVideo.src = ''; // Detiene la reproducción del vídeo
  };

  btnClose.addEventListener('click', closeDetail);

  // Cerrar también con la tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && detailView.classList.contains('active')) {
      closeDetail();
    }
  });
});