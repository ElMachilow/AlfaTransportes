<?php
$servername = "127.0.0.1:3308";
$username = "root";
$password = "mysql";
$database = "alfa";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $database);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>
