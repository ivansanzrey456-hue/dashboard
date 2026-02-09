<?php
// genera_hash.php — elimina este archivo después de usarlo...Admin123.com y correo admin124@gmail.com
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $pass = $_POST['password'] ?? '';
    if (!$pass) {
        echo "Proporciona una contraseña.";
        exit;
    }
    echo "Hash:\n";
    echo password_hash($pass, PASSWORD_DEFAULT);
    exit;
}
?>
<!doctype html>
<form method="post">
  <label>Contraseña a hashear: <input name="password" type="password"></label>
  <button type="submit">Generar hash</button>
</form>
