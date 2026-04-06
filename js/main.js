// Función para ocultar el banner inicial con animación
function entrar() {
    const banner = document.getElementById('pantalla-inicio');
    if (banner) { // Una buena práctica: verificar que el elemento existe antes de actuar
        banner.classList.add('oculto');
        
        // Esperamos los 0.8s de la transición CSS para quitarlo del flujo
        setTimeout(() => {
            banner.style.display = 'none';
        }, 800);
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