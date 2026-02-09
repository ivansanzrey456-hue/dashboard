<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "conexion.php";

$data = json_decode(file_get_contents("php://input"), true);
$action = $data['action'] ?? '';

if ($action === "eliminar") {
    $id = intval($data['id']);
    $stmt = $conn->prepare("DELETE FROM socios WHERE id=?");
    $stmt->bind_param("i", $id);
    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "mensaje" => $conn->error]);
    }
    $stmt->close();

} elseif ($action === "actualizar") {
    $id = intval($data['id']);
    $nombre = $data['nombre'];
    $apellido_paterno = $data['apellido_paterno'];
    $apellido_materno = $data['apellido_materno'];
    $correo = $data['correo'];
    $telefono = $data['telefono'] ?? null;

    $stmt = $conn->prepare("
        UPDATE socios 
        SET nombre=?, apellido_paterno=?, apellido_materno=?, correo=?, telefono=? 
        WHERE id=?
    ");
    $stmt->bind_param("sssssi", $nombre, $apellido_paterno, $apellido_materno, $correo, $telefono, $id);

    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "mensaje" => $conn->error]);
    }
    $stmt->close();

} else {
    echo json_encode(["success" => false, "mensaje" => "Acción no válida"]);
}

$conn->close();
?>
