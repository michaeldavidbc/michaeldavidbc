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

// Carrusel de proyectos

// Función utilitaria para seleccionar elementos
const $ = selector => document.querySelector(selector);

// Referencia a tu contenedor HTML exacto
const slider = $(".lista-proyectos");

// Función principal que asigna los estados (clases) según la posición
function actualizarClases() {
  const items = document.querySelectorAll(".lista-proyectos li");
  
  // Limpiar las clases de estado anteriores
  items.forEach(item => {
    item.classList.remove("hide", "prev", "act", "next", "new-next");
  });
  
  // Asignar el nuevo estado según el orden actual en el DOM
  if(items[0]) items[0].classList.add("hide");
  if(items[1]) items[1].classList.add("prev");
  if(items[2]) items[2].classList.add("act");
  if(items[3]) items[3].classList.add("next");
  if(items[4]) items[4].classList.add("new-next");
}

function next() {
  // Tomamos el primer elemento y lo movemos al final de la fila
  const primerElemento = slider.firstElementChild;
  slider.appendChild(primerElemento);
  actualizarClases();
}

function prev() {
  // Tomamos el último elemento y lo movemos al principio de la fila
  const ultimoElemento = slider.lastElementChild;
  slider.insertBefore(ultimoElemento, slider.firstElementChild);
  actualizarClases();
}
  
// --- Lógica de Interacción ---

// Variable para controlar la frecuencia de los eventos (throttling)
let isThrottled = false;
const throttleDelay = 500; // ms

// --- Lógica de Autoplay ---
let autoplayInterval = null;
const autoplayDelay = 5000; // 5 segundos

function startAutoplay() {
  // Limpiamos cualquier intervalo anterior para evitar duplicados
  clearInterval(autoplayInterval);
  autoplayInterval = setInterval(next, autoplayDelay);
}

function stopAutoplay() {
  clearInterval(autoplayInterval);
}

// Escuchar HOVER en el carrusel para moverlo sin hacer clic y pausar autoplay
slider.onmouseover = event => {
  // Si estamos en un período de "enfriamiento", no hacer nada para evitar movimientos erráticos
  if (isThrottled) return;
  const hoveredItem = event.target.closest('li');
  let actionTaken = false;
  
  if (hoveredItem) {
    // Solo detenemos el autoplay y actuamos si se hace hover en las tarjetas de navegación
    if (hoveredItem.classList.contains('next')) {
      stopAutoplay();
      next();
      actionTaken = true;
    } else if (hoveredItem.classList.contains('prev')) {
      stopAutoplay();
      prev();
      actionTaken = true;
    }
  }

  // Si se ejecutó una acción, activamos el "enfriamiento"
  if (actionTaken) {
    isThrottled = true;
    setTimeout(() => { isThrottled = false; }, throttleDelay);
  }
};

// Reanudamos el autoplay cuando el mouse sale del área del carrusel
slider.onmouseleave = () => {
  startAutoplay();
};

// Inicializar el carrusel asignando las clases por primera vez al cargar
actualizarClases();
startAutoplay(); // Iniciar el autoplay al cargar la página

// --- Lógica para pantallas táctiles (Requiere Hammer.js en tu HTML) ---
if (typeof Hammer !== 'undefined') {
  const swipe = new Hammer($(".swipe"));
  swipe.on("swipeleft", () => {
    next();
    startAutoplay(); // Reinicia el temporizador después de un swipe
  });
  swipe.on("swiperight", () => {
    prev();
    startAutoplay(); // Reinicia el temporizador después de un swipe
  });
}