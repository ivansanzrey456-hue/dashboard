<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include "conexion.php";

$result = $conn->query("SELECT id, nombre, apellido_paterno, apellido_materno, correo, telefono FROM socios ORDER BY id ASC");

$socios = [];

while($row = $result->fetch_assoc()){
    $socios[] = $row;
}

echo json_encode(["success" => true, "socios" => $socios]);

$conn->close();
?>
