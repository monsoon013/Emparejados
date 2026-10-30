<?php
require __DIR__ . '/conexion.php';
//lectura del JSON enviado por js
$data = json_decode(file_get_contents('php://input'), true);

$nome = trim($data['usuario']);
$puntuacion = (int) ($data['puntuacion'] ?? 0);
//validación del usuario
if($nome === '' || mb_strlen($nome) > 15){
    http_response_code(400);
    exit;
}
//prueba a guardar
try{
    $bulk = new MongoDB\Driver\BulkWrite();
    $bulk->insert([
        'usuario' => $nome,
        'puntuacion' => $puntuacion
    ]);

    $resultado = $manager->executeBulkWrite($coll, $bulk);

    if ($resultado->getInsertedCount() !== 1) {
        throw new RuntimeException("mira eu non sei que fixeches, pero aquí non hai nada");
    }
}catch(Throwable $duende){
    http_response_code(500);
    error_log('Tremendo erro, a ver que é : ' . $duende->getMessage());
}
?>