<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "conexion.php";

$data = json_decode(file_get_contents("php://input"), true);

$nombre = $data['nombre'];
$apellido_paterno = $data['apellido_paterno'];
$apellido_materno = $data['apellido_materno'];
$correo = $data['correo'];
$password = password_hash($data['password'], PASSWORD_BCRYPT);
$telefono = $data['telefono'] ?? null;
$fecha_registro = date("Y-m-d");

$sql = "INSERT INTO socios (nombre, apellido_paterno, apellido_materno, correo, password, telefono, fecha_registro, membresia_activa)
        VALUES (?, ?, ?, ?, ?, ?, ?, 1)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssss", $nombre, $apellido_paterno, $apellido_materno, $correo, $password, $telefono, $fecha_registro);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "mensaje" => $conn->error]);
}

$stmt->close();
$conn->close();
?>
