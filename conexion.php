<?php
    $uri = getenv("MONGODB_URI");

    if(!$uri){
        throw new RuntimeException(
            "neno non configuraches a url"
        );
    }
    try {
        $manager = new MongoDB\Driver\Manager($uri);
        $data = [
            "nome" => $_POST['userName'],
            "puntuacion" =>  
        ];
        $bulk = new MongoDB\Driver\BulkWrite();
        $bulk->insert($data);

        $resultado = $manager->executeBulkWrite(
            "memo_game_db.ranking",
            $bulk
        ); 

        if($resultado->getInsertedCount() !== 1){
            throw new RuntimeException(
                "mira eu non sei que fixeches, pero aquí non hai nada";
            );
        }
        
    }

?>