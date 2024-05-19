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
 
include 'database-process.php';   

// Datos del formulario
$email = $_POST['email'];
$password = $_POST['password'];

// Consulta SQL para verificar las credenciales del usuario
$sql = "SELECT * FROM user WHERE email = '$email' AND password = '$password'";
$result = $conn->query($sql);
 
if ($result->num_rows > 0) {
    // Las credenciales son correctas 
    $user = $result->fetch_assoc(); // Obtener los datos del usuario
    echo json_encode(array("status" => "success", "user" => $user)); // Devolver "success" y los datos del usuario
} else {
    // Las credenciales son incorrectas
    echo "Correo electrónico o contraseña incorrectos";
}

// Cerrar conexión
$conn->close();
 
?>