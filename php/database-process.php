<?php
/*$servername = "127.0.0.1:3308";
$username = "root";
$password = "mysql";
$database = "alfa";*/
$servername = "p3plzcpnl505081.prod.phx3.secureserver.net:3306";
$username = "i9817863_a4q61";
$password = "iDtq+=J~sgk=";
$database = "Alfa";
 
// Crear conexión
$conn = new mysqli($servername, $username, $password, $database);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>
