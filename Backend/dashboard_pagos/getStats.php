<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST");
header("Content-Type: application/json");
include 'conexion.php';


// Total de socios
$totalSocios = $conn->query("SELECT COUNT(*) AS total FROM socios")->fetch_assoc()['total'];

// Total recaudado
$totalRecaudado = $conn->query("SELECT SUM(monto) AS total FROM pagos")->fetch_assoc()['total'];

// Pagos por mes
$pagosPorMes = $conn->query("
    SELECT DATE_FORMAT(fecha_pago, '%Y-%m') AS mes, SUM(monto) AS total
    FROM pagos
    GROUP BY mes
    ORDER BY mes ASC
")->fetch_all(MYSQLI_ASSOC);

// Pagos por tipo
$pagosPorTipo = $conn->query("
    SELECT tipo_pago, COUNT(*) AS cantidad
    FROM pagos
    GROUP BY tipo_pago
")->fetch_all(MYSQLI_ASSOC);

echo json_encode([
    "totalSocios" => $totalSocios,
    "totalRecaudado" => $totalRecaudado,
    "pagosPorMes" => $pagosPorMes,
    "pagosPorTipo" => $pagosPorTipo
]);
?>
