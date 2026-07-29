// Función para ocultar el banner inicial con animación
function entrar() {
    const banner = document.getElementById('pantalla-inicio');
    if (banner) { // Una buena práctica: verificar que el elemento existe antes de actuar
        banner.classList.add('oculto');
        
        // Escuchamos el evento 'transitionend' para quitar el banner del DOM
        // solo después de que la animación de CSS haya terminado.
        // El { once: true } hace que el listener se elimine solo después de ejecutarse una vez.
        banner.addEventListener('transitionend', () => {
            banner.style.display = 'none';
        }, { once: true });
    }
}

// Fondo dinamico Tipo: Vanta
VANTA.NET({
  el: "body",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.00,
  scaleMobile: 1.00,
  color: 0x3fb950,
  backgroundColor: 0x0d1117,
  points: 10.00,
  maxDistance: 25.00,
  spacing: 16.00
});

// --- Lógica para el Ecosistema Técnico (Pestañas) ---
function switchTab(event, tabId) {
  // Oculta todo el contenido de las pestañas
  const tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(content => {
    content.classList.remove('active');
  });

  // Quita la clase 'active' de todos los botones de pestañas
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(button => {
    button.classList.remove('active');
  });

  // Muestra el contenido de la pestaña seleccionada
  const selectedTab = document.getElementById(tabId);
  if (selectedTab) {
    selectedTab.classList.add('active');
  }

  // Añade la clase 'active' al botón que fue clickeado
  event.currentTarget.classList.add('active');
}

// --- Lógica para el Modal de Certificados ---

function initializeCertificateModal() {
  const certificateLinks = document.querySelectorAll('.ver-certificado');
  const modalOverlay = document.getElementById('certificate-modal');
  const modalImage = document.getElementById('certificate-image');
  const modalClose = document.querySelector('.modal-close');

  if (!modalOverlay || !modalImage || !modalClose) {
    return; // Si no existen los elementos del modal, no hacemos nada.
  }

  // Función para abrir el modal
  function openModal(imageSrc) {
    modalImage.src = imageSrc;
    modalOverlay.classList.add('visible');
  }

  // Función para cerrar el modal
  function closeModal() {
    modalOverlay.classList.remove('visible');
  }

  // Añadimos un event listener a cada enlace
  certificateLinks.forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault(); // Evitamos que el enlace navegue
      const imageSrc = this.getAttribute('data-img');
      if (imageSrc) {
        openModal(imageSrc);
      }
    });
  });

  // Añadimos event listener para cerrar el modal
  modalClose.addEventListener('click', closeModal);

  // También cerramos el modal si se hace clic fuera de la imagen (en el overlay)
  modalOverlay.addEventListener('click', function (event) {
    if (event.target === modalOverlay) {
      closeModal();
    }
  });
}

// Llamamos a la función para que se ejecute al cargar el script
initializeCertificateModal();
