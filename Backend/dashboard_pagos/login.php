<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'conexion.php';

$data = json_decode(file_get_contents("php://input"), true);
$correo = $data['correo'] ?? '';
$password = $data['password'] ?? '';

if (!$correo || !$password) {
    echo json_encode(["success" => false, "mensaje" => "Correo y contraseña obligatorios."]);
    exit;
}

// Buscar en tabla usuarios (admins)
$sql = "SELECT id, nombre, correo, password, rol FROM usuarios WHERE correo = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $correo);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    $rol = $user['rol']; // admin o usuario
} else {
    // Buscar en tabla socios
    $sql2 = "SELECT id, nombre, correo, password FROM socios WHERE correo = ?";
    $stmt2 = $conn->prepare($sql2);
    $stmt2->bind_param("s", $correo);
    $stmt2->execute();
    $result2 = $stmt2->get_result();

    if ($result2->num_rows === 0) {
        echo json_encode(["success" => false, "mensaje" => "Usuario no encontrado."]);
        exit;
    }

    $user = $result2->fetch_assoc();
    $rol = "socio"; // todos los socios tendrán este rol
}

// Verificar contraseña
if (password_verify($password, $user['password'])) {
    echo json_encode([
        "success" => true,
        "id" => $user['id'],
        "nombre" => $user['nombre'],
        "rol" => $rol
    ]);
} else {
    echo json_encode(["success" => false, "mensaje" => "Contraseña incorrecta."]);
}
?>
