<?php 
$errorMSG = "";
 
if (empty($_POST["email"])) {
    error_log("ENTRA 3");
    $errorMSG = "Email es requerido";
} else {
    $email = $_POST["email"];
}

if (empty($_POST["password"])) {
    $errorMSG = "Contraseña es requerido";
} else {
    $password = $_POST["password"];
}
 
$servername = "127.0.0.1:3308";
$username = "root";
$pass = "mysql";
$database = "alfa";
// Crear conexión
$conn = new mysqli($servername, $username, $pass, $database);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Datos del formulario
$email = $_POST['email'];
$password = $_POST['password'];

// Consulta SQL para verificar las credenciales del usuario
$sql = "SELECT * FROM user WHERE email = '$email' AND password = '$password'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Las credenciales son correctas 
    //echo "Inicio de sesión exitoso"; 
    echo "success";
} else {
    // Las credenciales son incorrectas
    echo "Correo electrónico o contraseña incorrectos";
}

// Cerrar conexión
$conn->close();
 
?>