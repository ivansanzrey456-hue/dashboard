<?php
// config.php
$host = "localhost";
$usuario = "usuario"; // o la que tengas configurada
$contrasena = "contraseña"; // o la que tengas configurada
$base_datos = "BD";

$conn = new mysqli($host, $usuario, $contrasena, $base_datos);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}
?>
