<?php
require_once __DIR__ . '/vendor/autoload.php';

use Dompdf\Dompdf;
use Dompdf\Options;

// Configurar opciones
$options = new Options();
$options->set('isHtml5ParserEnabled', true);
$options->set('isRemoteEnabled', true);
$options->set('defaultFont', 'Arial');

$dompdf = new Dompdf($options);

// Cargar el HTML
$html = file_get_contents(__DIR__ . '/pdf-invitacion-1-persona.html');

$dompdf->loadHtml($html);
$dompdf->setPaper('A4', 'portrait');
$dompdf->render();

// Mostrar en navegador (0 = ver, 1 = descargar)
$dompdf->stream('Invitacion_Boda_Guzman_Masella_1_Persona.pdf', [
    'Attachment' => 0
]);
