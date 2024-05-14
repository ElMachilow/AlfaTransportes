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

    // Consultar si ya existe un registro con un título similar
    $sql_check = "SELECT * FROM news WHERE title LIKE ?";
    $stmt_check = $conn->prepare($sql_check);
    $stmt_check->bind_param("s", $title);
    $stmt_check->execute();
    $result = $stmt_check->get_result();

    if ($result->num_rows > 0) {
        echo "Ya existe un registro con un título similar.";
    } else {
        // Preparar y ejecutar la consulta SQL
        $current_date = date("Y-m-d"); 
        $sql_insert = "INSERT INTO news (idUser, title, detail, image, date) VALUES (?, ?, ?, ?, ?)";
        $stmt_insert = $conn->prepare($sql_insert);
        
        // Vincular parámetros utilizando variables por referencia 
        $stmt_insert->bind_param("sssss", $idUser, $title, $detail, $imagenContenido, $current_date);

        if ($stmt_insert->execute() === TRUE) {
            echo "Datos guardados exitosamente.";
        } else {
            echo "Error al guardar los datos: " . $conn->error;
        }

        // Cerrar la consulta de inserción
        $stmt_insert->close();
    }

    // Cerrar consulta de verificación y conexión
    $stmt_check->close();
    $conn->close();
}
?>
