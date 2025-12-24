/* ============================================
   INVITACIÓN DIGITAL - JAVASCRIPT
   Funcionalidades: FlipClock, Música, Modal, Menú
============================================ */

// === VARIABLES GLOBALES ===
let musicaReproduciendo = false;
let eventoSeleccionado = '';

// === INICIALIZACIÓN AL CARGAR LA PÁGINA ===
$(document).ready(function() {
    // Inicializar contador FlipClock
    var fechaEvento = moment.tz("2026-01-24 16:00", "America/Guatemala");
    
    $('.clock').FlipClock(fechaEvento, {
        clockFace: 'DailyCounter',
        countdown: true,
        language: 'es'
    });

    // Traducir etiquetas al español
    setTimeout(function() {
        $('.flip-clock-label').each(function() {
            var texto = $(this).text().toLowerCase();
            if (texto === 'days') $(this).text('Días');
            if (texto === 'hours') $(this).text('Horas');
            if (texto === 'minutes') $(this).text('Minutos');
            if (texto === 'seconds') $(this).text('Segundos');
        });
    }, 100);

    // Botón ir arriba
    $(window).scroll(function() {
        if ($(this).scrollTop() > 200) {
            $('.gototop').addClass('active');
        } else {
            $('.gototop').removeClass('active');
        }
    });

    $('.js-gotop').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 700, 'easeInOutExpo');
        return false;
    });

    // Smooth scroll para enlaces internos
    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 80
                }, 1000);
                return false;
            }
        }
    });

    // Intentar reproducir música automáticamente
    var audio = document.getElementById('musica-fondo');
    var promesaReproduccion = audio.play();
    if (promesaReproduccion !== undefined) {
        promesaReproduccion.then(function() {
            musicaReproduciendo = true;
            document.getElementById('icono-musica').className = 'fa fa-pause';
        }).catch(function() {
            console.log('Reproducción automática bloqueada por el navegador');
        });
    }

    console.log('✅ Invitación digital cargada correctamente');
    console.log('💕 Herberth & Andrea - 24 de Enero 2026');
});

// === CONTROL DE MÚSICA ===
function alternarMusica() {
    var audio = document.getElementById('musica-fondo');
    
    if (musicaReproduciendo) {
        audio.pause();
        document.getElementById('icono-musica').className = 'fa fa-play';
        musicaReproduciendo = false;
    } else {
        audio.play();
        document.getElementById('icono-musica').className = 'fa fa-pause';
        musicaReproduciendo = true;
    }
}

// === FUNCIONES DEL MODAL ===
function abrirModal(evento) {
    eventoSeleccionado = evento;
    var subtitulo = document.getElementById('subtituloEvento');

    if (evento === 'ceremonia') {
        subtitulo.textContent = 'Ceremonia Religiosa - 24 Enero 2026, 16:00 hrs';
    } else if (evento === 'recepcion') {
        subtitulo.textContent = 'Recepción - 24 Enero 2026, 18:00 hrs';
    }

    document.getElementById('modalAsistencia').style.display = 'flex';
}

function cerrarModal() {
    document.getElementById('modalAsistencia').style.display = 'none';
}

// Cerrar modal al hacer clic fuera del contenido
window.addEventListener('click', function(evento) {
    var modal = document.getElementById('modalAsistencia');
    if (evento.target === modal) {
        cerrarModal();
    }
});

// === CONFIRMACIÓN POR WHATSAPP ===
function confirmarNovia() {
    var mensaje = '';
    
    if (eventoSeleccionado === 'ceremonia') {
        mensaje = 'Sí, con mucho gusto podré acompañarlos a la Ceremonia Religiosa el 24 de enero de 2026 a las 16:00 hrs';
    } else if (eventoSeleccionado === 'recepcion') {
        mensaje = 'Sí, con mucho gusto podré acompañarlos a la Recepción el 24 de enero de 2026 a las 18:00 hrs';
    }
    
    window.open('https://wa.me/50247700182?text=' + encodeURIComponent(mensaje), '_blank');
    cerrarModal();
}

function confirmarNovio() {
    var mensaje = '';
    
    if (eventoSeleccionado === 'ceremonia') {
        mensaje = 'Sí, con mucho gusto podré acompañarlos a la Ceremonia Religiosa el 24 de enero de 2026 a las 16:00 hrs';
    } else if (eventoSeleccionado === 'recepcion') {
        mensaje = 'Sí, con mucho gusto podré acompañarlos a la Recepción el 24 de enero de 2026 a las 18:00 hrs';
    }
    
    window.open('https://wa.me/50242154639?text=' + encodeURIComponent(mensaje), '_blank');
    cerrarModal();
}

// === MENÚ HAMBURGUESA ===
function toggleMenu() {
    var menu = document.getElementById('mainMenu');
    menu.classList.toggle('active');
    document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : 'auto';
}

function closeMenu() {
    var menu = document.getElementById('mainMenu');
    menu.classList.remove('active');
    document.body.style.overflow = 'auto';
}