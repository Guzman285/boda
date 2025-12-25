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
});