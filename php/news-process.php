<?php
// Verificamos si se han enviado datos
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Datos del formulario
    $title = $_POST["title"];
    $detail = $_POST["detail"];
    $idUser = intval($_POST["idUser"]);
    $idNews = isset($_POST["idNews"]) ? intval($_POST["idNews"]) : null;

    // Guardar imagen
    $imagenTmpNombre = $_FILES['image']['tmp_name'];
    $imagenContenido = file_get_contents($imagenTmpNombre);

    include 'database-process.php';  
    // Inicializar variables para mensajes
    $message = "";

    // Si se está actualizando, obtener el título original del registro
    $originalTitle = "";
    if ($idNews) {
        $sql_get_original = "SELECT title FROM Alfa.news WHERE idNews = ?";
        $stmt_get_original = $conn->prepare($sql_get_original);
        $stmt_get_original->bind_param("i", $idNews);
        $stmt_get_original->execute();
        $result_get_original = $stmt_get_original->get_result();
        if ($result_get_original->num_rows > 0) {
            $row = $result_get_original->fetch_assoc();
            $originalTitle = $row['title'];
        }
        $stmt_get_original->close();
    }

    // Consultar si ya existe un registro con un título similar (solo si el título es diferente del original)
    if ($title !== $originalTitle) {
        $sql_check = "SELECT * FROM Alfa.news WHERE title = ?";
        $stmt_check = $conn->prepare($sql_check);
        $stmt_check->bind_param("s", $title);
        $stmt_check->execute();
        $result = $stmt_check->get_result();

        if ($result->num_rows > 0) {
            $message = "Ya existe un registro con un título similar.";
            $stmt_check->close();
            $conn->close();
            echo $message;
            exit; // Terminar el script si se encuentra un título duplicado
        }
        $stmt_check->close();
    }

    // Actualizar o insertar la noticia
    if ($idNews) {
        // Actualizar la noticia existente
        $sql_update = "UPDATE news SET title = ?, detail = ?, image = ? WHERE idNews = ?";
        $stmt_update = $conn->prepare($sql_update);
        $stmt_update->bind_param("sssi", $title, $detail, $imagenContenido, $idNews);

        if ($stmt_update->execute() === TRUE) {
            $message = "Datos actualizados exitosamente.";
        } else {
            $message = "Error al actualizar los datos: " . $stmt_update->error;
        }

        $stmt_update->close();
    } else {
        // Insertar nueva noticia
        $current_date = date("Y-m-d");
        $sql_insert = "INSERT INTO news (idUser, title, detail, image, date) VALUES (?, ?, ?, ?, ?)";
        $stmt_insert = $conn->prepare($sql_insert);
        $stmt_insert->bind_param("sssss", $idUser, $title, $detail, $imagenContenido, $current_date);

        if ($stmt_insert->execute() === TRUE) {
            $message = "Datos guardados exitosamente.";
        } else {
            $message = "Error al guardar los datos: " . $stmt_insert->error;
        }

        $stmt_insert->close();
    }

    $conn->close();

    // Mostrar el mensaje final
    echo $message;
}
?>
