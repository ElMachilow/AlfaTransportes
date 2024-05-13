<?php
// Conexión a la base de datos
$servername = "127.0.0.1:3308";
$username = "root";
$password = "mysql";
$dbname = "alfa";

try {
    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }

    // Modelo y controlador juntos
    class NewsController {
        private $conn;

        public function __construct(mysqli $conn) {
            $this->conn = $conn;
        }

        public function getNews() {
            $sql = "SELECT idNews, title, date, nameImg FROM news ORDER BY idNews DESC";
            $result = $this->conn->query($sql);

            $news_data = array();

            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    // Obtener la imagen para esta noticia
                    $image = $this->getImage($row['idNews']);

                    // Agregar la imagen al arreglo de datos de la noticia
                    $row['image'] = $image;

                    // Agregar la noticia al arreglo de datos de las noticias
                    $news_data[] = $row;
                }

                // Devolver las noticias como JSON
                echo json_encode($news_data);
            } else {
                // Si no hay resultados, devolver un mensaje de error
                header("HTTP/1.1 404 Not Found");
                echo json_encode(array("message" => "0 resultados"));
            }
        }

        private function getImage($id) {
            $stmt = $this->conn->prepare("SELECT image FROM news WHERE idNews = ?");
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $stmt->bind_result($image); // Enlazar el resultado a una variable

            if ($stmt->fetch()) {
                // En este punto, $image contiene los datos BLOB de la imagen
                // Puedes usarlos según sea necesario, por ejemplo, para mostrar una imagen en una etiqueta <img> en HTML.
                // Aquí lo codifico en base64 para que puedas usarlo directamente en una etiqueta <img>
                $imageData = base64_encode($image);
                return $imageData;
            } else {
                return null; // Devuelve null si no se encontró ninguna imagen
            }

            $stmt->close();
        }
    }

    // Crear una instancia del controlador y llamar al método según la solicitud
    $newsController = new NewsController($conn);
    if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'getNews') {
        echo $newsController->getNews();
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}

// Verificamos si se han enviado datos
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Si es una solicitud de eliminación
    if (isset($_POST['delete'])) {
        $idToDelete = intval($_POST['delete']);

        // Crear conexión
        $conn = new mysqli($servername, $username, $password, $dbname);

        // Verificar la conexión
        if ($conn->connect_error) {
            die("Conexión fallida: " . $conn->connect_error);
        }

        // Preparar y ejecutar la consulta SQL para eliminar la noticia
        $sql = "DELETE FROM news WHERE idNews = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $idToDelete);

        if ($stmt->execute() === TRUE) {
            echo "Noticia eliminada exitosamente.";
        } else {
            echo "Error al eliminar la noticia: " . $conn->error;
        }

        // Cerrar conexión
        $stmt->close();
        $conn->close();
        exit; // Salir después de manejar la solicitud de eliminación
    }

    // Si es una solicitud para agregar una nueva noticia
    // Resto del código para agregar noticias...
}
?>
