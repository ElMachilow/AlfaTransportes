<?php
class NewsController {
    private $servername = "127.0.0.1:3308";
    private $username = "root";
    private $password = "mysql";
    private $dbname = "alfa";
    private $conn;

    // Constructor para inicializar la conexión
    public function __construct() {
        $this->conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);

        if ($this->conn->connect_error) {
            die("Conexión fallida: " . $this->conn->connect_error);
        }
    }

    // Método para obtener noticias desde la base de datos
    public function getNews() {
        $sql = "SELECT idNews, title, date, detail FROM news";
        $result = $this->conn->query($sql);

        $news_data = array();

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $news_data[] = $row;
            }
            return json_encode($news_data);
        } else {
            return "0 resultados";
        }
    }

    // Cerrar la conexión al destruir el objeto
    public function __destruct() {
        $this->conn->close();
    }
}

// Crear una instancia de la clase y llamar al método según la solicitud
$newsController = new NewsController();

// Verificar si la solicitud proviene de JavaScript
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'getNews') {
    echo $newsController->getNews();
}
?>
