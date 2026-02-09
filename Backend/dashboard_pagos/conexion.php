<?php
// conexion.php

// ✅ Encabezados CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// ✅ Manejo de solicitudes OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ✅ Tipo de contenido (JSON)
header("Content-Type: application/json; charset=utf-8");

// Configuración de la base de datos
include_once 'config.php';

// Crear conexión a la base de datos
$conn = new mysqli($host, $usuario, $contrasena, $base_datos);

// Verificar conexión
if ($conn->connect_error) {
    die(json_encode([
        "status" => "error",
        "mensaje" => "Error de conexión a la base de datos: " . $conn->connect_error
    ]));
}

// Establecer charset
$conn->set_charset("utf8");
?>
