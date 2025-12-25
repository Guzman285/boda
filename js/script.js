// ============================================
// INVITACIÓN DIGITAL - GUZMÁN & MASELLA
// JavaScript para interactividad
// ============================================

// === CONTADOR REGRESIVO ===
function iniciarContador() {
    var fechaBoda = new Date('2026-01-24 16:00:00').getTime();

    var intervalo = setInterval(function() {
        var ahora = new Date().getTime();
        var distancia = fechaBoda - ahora;

        var dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
        var horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
        var segundos = Math.floor((distancia % (1000 * 60)) / 1000);

        if (distancia < 0) {
            clearInterval(intervalo);
        }
    }, 1000);
}

// === FLIPCLOCK ===
function iniciarFlipClock() {
    var fechaBoda = new Date('2026-01-24 16:00:00').getTime();
    var ahora = new Date().getTime();
    var diferencia = Math.floor((fechaBoda - ahora) / 1000);

    if (diferencia > 0) {
        var clock = $('.clock').FlipClock(diferencia, {
            clockFace: 'DailyCounter',
            countdown: true,
            language: 'es',
            labels: ['Días', 'Horas', 'Minutos', 'Segundos']
        });
    }
}

// === MENÚ RESPONSIVE ===
function toggleMenu() {
    document.getElementById('mainMenu').classList.toggle('active');
}

function closeMenu() {
    document.getElementById('mainMenu').classList.remove('active');
}

// === MODAL DE CONFIRMACIÓN ===
function abrirModal(evento) {
    var modal = document.getElementById('modalAsistencia');
    var subtitulo = document.getElementById('subtituloEvento');

    if (evento === 'ceremonia') {
        subtitulo.textContent = 'Ceremonia Religiosa - 4:00 PM';
    } else if (evento === 'recepcion') {
        subtitulo.textContent = 'Cóctel y Recepción - 5:00 PM';
    }

    modal.style.display = 'flex';
}

function cerrarModal() {
    document.getElementById('modalAsistencia').style.display = 'none';
}

function confirmarNovia() {
    var numeroNovia = '50232857369';
    var mensaje = encodeURIComponent('Hola Masella, confirmo mi asistencia a tu boda el 24 de enero de 2026.');
    window.open('https://wa.me/' + numeroNovia + '?text=' + mensaje, '_blank');
    cerrarModal();
}

function confirmarNovio() {
    var numeroNovio = '50240834800';
    var mensaje = encodeURIComponent('Hola Guzmán, confirmo mi asistencia a tu boda el 24 de enero de 2026.');
    window.open('https://wa.me/' + numeroNovio + '?text=' + mensaje, '_blank');
    cerrarModal();
}

// === REPRODUCTOR DE MÚSICA ===
var audio = document.getElementById('musica-fondo');
var btnPlay = document.getElementById('btnPlay');
var iconoPlay = document.getElementById('iconoPlay');
var barraProgreso = document.getElementById('barraProgreso');
var puntoProgreso = document.getElementById('puntoProgreso');
var barraContainer = document.querySelector('.barra-progreso-container');
var estaSonando = false;

// Play/Pause
btnPlay.addEventListener('click', function() {
    if (estaSonando) {
        audio.pause();
        iconoPlay.className = 'fa fa-play';
        estaSonando = false;
    } else {
        audio.play();
        iconoPlay.className = 'fa fa-pause';
        estaSonando = true;
    }
});

// Actualizar barra de progreso
audio.addEventListener('timeupdate', function() {
    var progreso = (audio.currentTime / audio.duration) * 100;
    barraProgreso.style.width = progreso + '%';
    puntoProgreso.style.left = progreso + '%';
});

// Click en barra de progreso
barraContainer.addEventListener('click', function(e) {
    var rect = barraContainer.getBoundingClientRect();
    var clickX = e.clientX - rect.left;
    var porcentaje = clickX / rect.width;
    audio.currentTime = porcentaje * audio.duration;
});

// Botón Anterior (reiniciar)
document.getElementById('btnAnterior').addEventListener('click', function() {
    audio.currentTime = 0;
});

// Botón Siguiente (reiniciar)
document.getElementById('btnSiguiente').addEventListener('click', function() {
    audio.currentTime = 0;
});

// Shuffle y Repeat (efectos visuales)
document.getElementById('btnShuffle').addEventListener('click', function() {
    this.style.color = this.style.color === 'rgb(44, 95, 141)' ? '#999' : '#2C5F8D';
});

document.getElementById('btnRepeat').addEventListener('click', function() {
    audio.loop = !audio.loop;
    this.style.color = audio.loop ? '#2C5F8D' : '#999';
});

// === INICIALIZAR AL CARGAR ===
$(document).ready(function() {
    iniciarFlipClock();
    iniciarContador();

    // Cerrar modal al hacer click fuera
    window.onclick = function(event) {
        var modal = document.getElementById('modalAsistencia');
        if (event.target == modal) {
            cerrarModal();
        }
    };
});