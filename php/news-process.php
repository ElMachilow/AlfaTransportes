<?php
// Verificamos si se han enviado datos
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Datos del formulario
    $title = $_POST["title"];
    $detail = $_POST["detail"];
    $idUser = intval($_POST["idUser"]);
    
    // Guardar imagen
    $imagenTmpNombre = $_FILES['image']['tmp_name'];
    $imagenContenido = file_get_contents($imagenTmpNombre);
    
    // Guardar datos en la base de datos
    $servername = "127.0.0.1:3308";
    $username = "root";
    $pass = "mysql";
    $database = "alfa";
    
    // Crear conexión
    $conn = new mysqli($servername, $username, $pass, $database);
    
    // Verificar la conexión
    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    } 
    echo  'QUE IMPRIME EN ID USER';
    echo  $idUser;
    // Preparar y ejecutar la consulta SQL
    $current_date = date("Y-m-d"); 
    $sql = "INSERT INTO news (idUser, title, detail, image, date) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
   
    // Vincular parámetros utilizando variables por referencia 
    $stmt->bind_param("sssss", $idUser, $title, $detail, $imagenContenido, $current_date);

    
    if ($stmt->execute() === TRUE) {
        echo "Datos guardados exitosamente.";
    } else {
        echo "Error al guardar los datos: " . $conn->error;
    }
    
    // Cerrar conexión
    $stmt->close();
    $conn->close();
}
?>
 