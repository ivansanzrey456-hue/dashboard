<?php
// Manejo CORS al inicio, antes de cualquier include
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Responder a OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

header("Content-Type: application/json; charset=UTF-8");

include "conexion.php";

$input = json_decode(file_get_contents("php://input"), true);

// Debug opcional
// file_put_contents("debug.txt", print_r($input, true));

if (empty($input['id_socio']) || empty($input['monto'])) {
    echo json_encode(["success" => false, "mensaje" => "Faltan datos obligatorios."]);
    exit;
}



$id_socio = intval($input['id_socio']);
$monto = floatval($input['monto']);
$tipo_pago = $input['tipo_pago'] ?? 'efectivo';
$registrado_por = $input['registrado_por'] ?? 'Admin';
$fecha_pago = date('Y-m-d');

$sql = "INSERT INTO pagos (id_socio, monto, fecha_pago, tipo_pago, registrado_por)
        VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("idsss", $id_socio, $monto, $fecha_pago, $tipo_pago, $registrado_por);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "mensaje" => $conn->error]);
}

$stmt->close();
$conn->close();
?>
