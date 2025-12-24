/* ============================================
   INVITACIÓN DIGITAL - JAVASCRIPT
   Autor: Creado para Herberth & Andrea
   Funcionalidades: Música, Contador, Modal, Animaciones
============================================ */

// === VARIABLES GLOBALES ===
let musicaReproduciendo = false;
let eventoSeleccionado = '';

// === CONTROL DE MÚSICA ===
function toggleMusica() {
    const audio = document.getElementById('cancionFondo');
    const boton = document.getElementById('botonMusica');
    const icono = document.getElementById('iconoMusica');
    const texto = document.getElementById('textoMusica');
    
    if (musicaReproduciendo) {
        // Pausar música
        audio.pause();
        icono.className = 'fas fa-play';
        texto.textContent = 'Dale play a nuestra canción';
        boton.classList.remove('playing');
        musicaReproduciendo = false;
    } else {
        // Reproducir música
        audio.play();
        icono.className = 'fas fa-pause';
        texto.textContent = 'Pausar música';
        boton.classList.add('playing');
        musicaReproduciendo = true;
    }
}

// === CONTADOR REGRESIVO ===
function actualizarContador() {
    // Fecha del evento: 24 de Enero 2026 a las 16:00 horas
    const fechaEvento = new Date('2026-01-24T16:00:00').getTime();
    
    // Actualizar cada segundo
    const intervalo = setInterval(function() {
        const ahora = new Date().getTime();
        const diferencia = fechaEvento - ahora;
        
        // Cálculo de tiempo
        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);
        
        // Mostrar en pantalla con formato de 2 dígitos
        document.getElementById('dias').textContent = String(dias).padStart(2, '0');
        document.getElementById('horas').textContent = String(horas).padStart(2, '0');
        document.getElementById('minutos').textContent = String(minutos).padStart(2, '0');
        document.getElementById('segundos').textContent = String(segundos).padStart(2, '0');
        
        // Si el contador llega a cero
        if (diferencia < 0) {
            clearInterval(intervalo);
            document.getElementById('dias').textContent = '00';
            document.getElementById('horas').textContent = '00';
            document.getElementById('minutos').textContent = '00';
            document.getElementById('segundos').textContent = '00';
        }
    }, 1000);
}

// === MODAL DE CONFIRMACIÓN ===
function abrirModal(evento) {
    eventoSeleccionado = evento;
    const subtitulo = document.getElementById('subtituloEvento');
    
    // Cambiar texto según el evento seleccionado
    if (evento === 'ceremonia') {
        subtitulo.textContent = 'Ceremonia Religiosa - 24 Enero 2026, 16:00 hrs';
    } else if (evento === 'recepcion') {
        subtitulo.textContent = 'Recepción - 24 Enero 2026, 18:00 hrs';
    }
    
    // Mostrar modal
    document.getElementById('modalAsistencia').style.display = 'flex';
}

function cerrarModal() {
    document.getElementById('modalAsistencia').style.display = 'none';
}

// Cerrar modal al hacer clic fuera de él
window.onclick = function(event) {
    const modal = document.getElementById('modalAsistencia');
    if (event.target === modal) {
        cerrarModal();
    }
}

// === CONFIRMACIÓN POR WHATSAPP ===
function confirmarNovia() {
    let mensaje = '';
    
    // Mensaje personalizado según el evento
    if (eventoSeleccionado === 'ceremonia') {
        mensaje = 'Sí, con mucho gusto podré acompañarlos a la Ceremonia Religiosa el 24 de enero de 2026 a las 16:00 hrs';
    } else if (eventoSeleccionado === 'recepcion') {
        mensaje = 'Sí, con mucho gusto podré acompañarlos a la Recepción el 24 de enero de 2026 a las 18:00 hrs';
    }
    
    // Abrir WhatsApp de la novia (número: 47700182)
    window.open('https://wa.me/50247700182?text=' + encodeURIComponent(mensaje), '_blank');
    cerrarModal();
}

function confirmarNovio() {
    let mensaje = '';
    
    // Mensaje personalizado según el evento
    if (eventoSeleccionado === 'ceremonia') {
        mensaje = 'Sí, con mucho gusto podré acompañarlos a la Ceremonia Religiosa el 24 de enero de 2026 a las 16:00 hrs';
    } else if (eventoSeleccionado === 'recepcion') {
        mensaje = 'Sí, con mucho gusto podré acompañarlos a la Recepción el 24 de enero de 2026 a las 18:00 hrs';
    }
    
    // Abrir WhatsApp del novio (número: 42154639)
    window.open('https://wa.me/50242154639?text=' + encodeURIComponent(mensaje), '_blank');
    cerrarModal();
}

// === ANIMACIONES AL HACER SCROLL ===
function animarAlScroll() {
    const elementos = document.querySelectorAll('.evento-card, .galeria-item, .timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    elementos.forEach(elemento => {
        elemento.style.opacity = '0';
        elemento.style.transform = 'translateY(30px)';
        elemento.style.transition = 'all 0.6s ease';
        observer.observe(elemento);
    });
}

// === INICIALIZACIÓN AL CARGAR LA PÁGINA ===
document.addEventListener('DOMContentLoaded', function() {
    // Iniciar contador regresivo
    actualizarContador();
    
    // Activar animaciones al hacer scroll
    animarAlScroll();
    
    // Smooth scroll para el indicador de scroll
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }
    
    console.log('✅ Invitación digital cargada correctamente');
    console.log('💕 Herberth & Andrea - 24 de Enero 2026');
});