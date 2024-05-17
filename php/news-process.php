<?php
header('Content-Type: text/plain');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $title = $_POST["title"];
    $detail = $_POST["detail"];
    $idUser = intval($_POST["idUser"]);
    
    $imagenTmpNombre = $_FILES['image']['tmp_name'];
    $imagenContenido = file_get_contents($imagenTmpNombre);
    
    $servername = "127.0.0.1:3308";
    $username = "root";
    $pass = "mysql";
    $database = "alfa";
    
    $conn = new mysqli($servername, $username, $pass, $database);
    
    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }

    $sql_check = "SELECT * FROM news WHERE title = ?";
    $stmt_check = $conn->prepare($sql_check);
    $stmt_check->bind_param("s", $title);
    $stmt_check->execute();
    $result = $stmt_check->get_result();

    if ($result->num_rows > 0) {
        echo "Ya existe un registro con un título similar.";
    } else {
        $current_date = date("Y-m-d"); 
        $sql_insert = "INSERT INTO news (idUser, title, detail, image, date) VALUES (?, ?, ?, ?, ?)";
        $stmt_insert = $conn->prepare($sql_insert);
        $stmt_insert->bind_param("sssss", $idUser, $title, $detail, $imagenContenido, $current_date);

        if ($stmt_insert->execute() === TRUE) {
            $result = null;
            echo "Datos guardados exitosamente.";
        } else {
            echo "Error al guardar los datos: " . $conn->error;
        }

        $stmt_insert->close();
    }

    $stmt_check->close();
    $conn->close();
}
?>
