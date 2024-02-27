<?php
 
use PHPMailer\PHPMailer\{PHPMailer, SMTP, Exception};

require '../PHPMailer/src/PHPMailer.php';
require '../PHPMailer/src/Exception.php';
require '../PHPMailer/src/SMTP.php';  

$errorMSG = "";

if (empty($_POST["name"])) {
    $errorMSG = "El nombre es requerido";
} else {
    $name = $_POST["name"];
}

if (empty($_POST["email"])) {
    $errorMSG = "El email es requerido";
} else {
    $email = $_POST["email"];
}

if (empty($_POST["message"])) {
    $errorMSG = "El mensaje es requerido";
} else {
    $message = $_POST["message"];
}
  

// prepare email body text
$Body = "";
$Body .= "Nombre: ";
$Body .= $name;
$Body .= "<br/>";  
$Body .= "Mensaje: ";
$Body .= $message;
$Body .= "<br/>"; 

// send email
//$success = mail($EmailTo, $Subject, $Body, "From:".$email);

// redirect to success page
$mail = new PHPMailer(true);
$success = false;
$respuesta = '';
try {
    /*$mail->SMTPDebug = SMTP::DEBUG_SERVER;
    $mail->isSMTP();
    $mail->Host = '';*/ 

    /*$mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'mnievafra@gmail.com'; // Cambia 'tu_correo' por tu dirección de correo electrónico de Gmail
    $mail->Password = 'Machilon76@'; // Cambia 'tu_contraseña' por tu contraseña de Gmail
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;*/

    $mail->isSMTP();
    $mail->Host = 'smtp.office365.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'pamelanyhc@hotmail.com';  
    $mail->Password = 'Pmhc2298.';  
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587; 

    $mail->setFrom('pamelanyhc@hotmail.com', 'Alfa Contacto');
    $mail->addAddress($email); // Cambia 'destinatario@example.com' por la dirección de correo electrónico del destinatario
    $mail->addCC('corporacion1alfa@gmail.com'); // Agrega una copia a otro destinatario

    $mail->isHTML(true);
    $mail->Subject = 'Formulario de contacto';
    $mail->Body = $Body;
    $mail->send();
 
    $success = true;
}catch(Exception $e){
    $respuesta = 'Mensaje'. $mail->ErrorInfo;
}

if ($success  ){
   echo "Se envio correctamente el correo";
}else{
    if($errorMSG == ""){
        echo  $respuesta;
    } else {
        echo $errorMSG;
    }
}
?>