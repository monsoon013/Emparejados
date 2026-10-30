<?php
require __DIR__ . '/conexion.php';

$peticion = new MongoDB\Driver\Query([], 
    [
        'sort' => 
            ['puntuacion' => -1],
            'limit' => 5
    ]);
$cursor = $manager->executeQuery($coll, $peticion);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Emparejados</title>
    <link rel="stylesheet" href="style.css">
    <script src="Tablero.js" type="text/javascript"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Jersey+10&display=swap" rel="stylesheet">
</head>
<body>
    <main class="start">
        <div class="interfaz-container">
            <h1>Emparejados</h1>
            <form id='start'>
                <input type="text" id="userName" maxLength="15" placeholder="Introduce el nombre del jugador">
                <p id='error' hidden>Escribe un nombre para jugar</p>
                <div class="botones">
                    <button type="submit" id='btnJugar'>Jugar</button>
                </div>
            </form>
            <div id="ranking">
                <h2>TOP 5</h2>
                <?php
                foreach ($cursor as $p){
                    echo '<p>' . htmlspecialchars($p->usuario) . ': ' . $p->puntuacion . '</p>';
                }
                ?>
            </div>
        </div>
    </main> 
        
    </div>
    <script>
        document.getElementById('start').addEventListener('submit', (e) => {
            e.preventDefault(); //no envía el formulario

            const name = document.getElementById('userName').value.trim();
            if(name === ''){
                document.getElementById('error').hidden = false;
                return; //control de error
            }

            sessionStorage.setItem('usuario',name);
            window.location.href='juego.php';
        })
    </script>
</body>
</html>