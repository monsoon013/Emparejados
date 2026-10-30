<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Emparejados</title>
    <link rel="stylesheet" href="style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Jersey+10&display=swap" rel="stylesheet">
</head>
<body>
    <main>
        <div class="interfaz-container">
            
            <div id="tablero"></div>
            <div class="temp">
                <p>Puntuación: <span class="score">0</span></p>
                <p>Tiempo: <span id="tiempo">60</span></p>
                <p>Jugador: <span id="nombre"></span></p>
                <p>Errores: <span class="mstks">0</span></p>
            
            </div>

        </div>
        
    </main>
    <div id="gameOver" class="overlay">
        <div class="modal">
            <p>El tiempo se acabó :(</p>
            <p>Puntuación: <span class="score">0</span></p>
            <div class="botones">
                <button type="button" class="btnInicio">Ir al inicio</button>
                <button type="button" class="btnVolver">Volver a jugar</button>
            </div>
        </div>
    </div>

    <div id="win" class="overlay">
        <div class="modal">
            <p>Ganaste!</p> 
            <p>Puntuación: <span class="score">0</span></p>
            <div class="botones">
                <button type="button" class="btnInicio">Ir al inicio</button>
                <button type="button" class="btnVolver">Volver a jugar</button>
            </div>

        </div>
    </div>
    
    
        
    
    <script src="Tablero.js"></script>
    <script>
        const user = sessionStorage.getItem('usuario');
        if(!user){
            window.location.href='index.php';
        }else{
            const tablero = new Tablero(user);
            tablero.loadIcons();
            tablero.iniciarHTML();
            tablero.assignValues();
            tablero.assignCards();
            document.getElementById('nombre').textContent=tablero.username;
            document.querySelectorAll('.btnVolver').forEach(btn => {
                btn.addEventListener('click', () => {
                    location.reload();
                });
            });

            document.querySelectorAll('.btnInicio').forEach(btn=>{
                btn.addEventListener('click', async() =>{
                    const btns = document.querySelectorAll('.btnInicio');
                    btns.forEach(b=>b.disabled = true);

                    const ok = await tablero.save();

                    if(ok){
                        window.location.href='index.php';
                    }else{
                        console.log("bueno, non se gardou a partida xd");
                        btns.forEach(b=>b.disabled = false);
                    }
                })
            })
        }
    </script>
    
</body>
</html>