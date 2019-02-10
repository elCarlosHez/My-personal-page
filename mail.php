<?php

include ('config.php');

// Verify that we are reciving a post request
if($_SERVER['REQUEST_METHOD'] === 'POST' && 
    // Now certify if we are reciving all fields
    (
      isset($_POST['recaptcha']) && 
      isset($_POST['name']) && 
      isset($_POST['email']) &&
      isset($_POST['message']) )
    ){
      try {
            // Import mail and captcha settings
            validateCatpcha($captchaKey);
            
            $body = "<h1>Correo de Contacto</h1><p><strong>Nombre: </strong> %s </p><p><strong>Correo: </strong> %s </p><p><strong>Mensaje: </strong> %s </p>";

            //Content
            $mail->Subject = 'Formulario de contacto';
            $mail->Body = sprintf($body,$_POST['name'],$_POST['email'],$_POST['message']);
            $mail->send();
            http_response_code(201);
            echo json_encode([
               "data" =>[
                  'message' => 'Mensaje enviado'
                ]]);
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode(["error" => 
                [
                  "code" => 400,
                  "message" => $e->getMessage(),
                ]]);
        }
}else{
  http_response_code(400);
  echo json_encode(["error" => 
      [
        "code" => 400,
        "message" => 'Faltan campos en el correo. Intente de nuvo.'
      ]]);
}

function validateCatpcha($captchaKey)
{
   // Build POST request:
   $client =  new GuzzleHttp\Client();
   $response = $client->request('POST','https://www.google.com/recaptcha/api/siteverify',[
        'form_params' => [
          'secret' => $captchaKey,
          'response' => $_POST['recaptcha'],
        ]
   ]);

   $recaptcha = json_decode($response->getBody()->getContents());

   // Take action based on the score returned:
   if(isset($recaptcha->score)){
     if ($recaptcha->score <= 0.5) {
       throw new Exception('Fallo la validación del captcha.');
     }
   }else{
      throw new Exception('Refresca la página antes de volver a enviar un correo.');
   }
}

?>