<?php
// Conexión a la base de datos
$servername = "127.0.0.1:3308";
$username = "root";
$password = "mysql";
$dbname = "alfa"; 


$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Consulta SQL para obtener los datos de la tabla 'alfa.news'
$sql = "SELECT idNews, title, date, image, detail FROM news";
$result = $conn->query($sql);

    // Verificar si hay resultados
    if ($result->num_rows > 0) {
    // Array para almacenar los datos de las noticias
    $news_data = array();

    // Recorrer los resultados y almacenarlos en el array
    while ($row = $result->fetch_assoc()) {
        $news_data[] = $row;
    }

    // Convertir el array a formato JSON y enviarlo como respuesta
    echo  json_encode($news_data); 
    } else {
        echo "0 resultados";
    }
    $conn->close();

?>
