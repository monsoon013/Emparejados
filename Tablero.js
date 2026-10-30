
class Tablero {
    constructor(){
        this.tablero = [];
        this.primera = null;
        this.bloqueado = false;
        this.acc = 0;
        this.row = ['A', 'B', 'C', 'D', 'E'];
        this.timer = 10;
        this.score = 0;
        this.mstks = 0;
        this.intervalo = null;
        this.iniciado = false;
        this.terminado = false;
        this.estadoTablero = [];
        for (let x = 0; x < 5; x++){
            this.estadoTablero[x] = [];
            for(let y = 0; y < 6; y++){
                this.estadoTablero[x][y] = null;
            }
        }
        this.icons = Array.from({length:15}, (_,i) => `img/ico_${i+1}.png`);
    }
    //todo código creado a partir de aquí, se escribió bajo los efectos del alcohol

    loadIcons(){
        this.icons.forEach(src => {new Image().src = src;})
    }

    select(x,y){
        if (this.terminado || this.estadoTablero[x][y] !== null || this.bloqueado) return;

        if(!this.iniciado){
            this.iniciado = true;
            this.intervalo = setInterval(() => this.tick(), 1000);
        }
        this.estadoTablero[x][y] = 'selected';
        this.assignCards();

        if(!this.primera) {
            this.primera = [x,y];
            return;
        }
        const [x1, y1] = this.primera;
        this.primera = null;
        this.bloqueado = true;
        setTimeout(() =>  {
            this.game(x1, y1, x, y); 
            this.bloqueado= false;
        }, 800);
    }

    iniciarHTML(){
        for(let x=0; x < 5; x++){
            for (let y = 0; y<6;y++){
                let letter = this.row[x];
                let num = y+1;
                let id = letter + num;
                let div = document.createElement('div');
                div.id = id;
                div.classList.add('celda');

                let ico = document.createElement('div');
                ico.classList.add('ico');

                div.appendChild(ico);
                div.addEventListener('click', () => this.select(x,y));
                document.getElementById('tablero').appendChild(div);
            }
        }
    }

    game(x1, y1, x2, y2){
        if(this.terminado) return;

        if(this.tablero[x1][y1] === this.tablero[x2][y2]){
            this.estadoTablero[x1][y1] = 'completed';
            this.estadoTablero[x2][y2] = 'completed';
            this.score += 3;
            this.acc++;
        }else {
            this.estadoTablero[x1][y1] = null;
            this.estadoTablero[x2][y2] = null;
            this.mstks += 1;
            this.score -= 5;
        }

        this.assignCards();
        this.updateScore();
        if(this.acc===1){this.finished(true);}


    }

    tick(){
        this.timer--;
        document.getElementById('tiempo').textContent = this.timer;

        if(this.timer <= 0){
            this.finished(false);
        }
    }

    updateScore(){
        document.querySelectorAll('.score').forEach(el => el.textContent=this.score);
        document.querySelectorAll('.mstks').forEach(el => el.textContent=this.mstks);
        
    }

    finished(victoria){
        console.log(this.score);
        clearInterval(this.intervalo);
        this.terminado = true;
        //this.score = Math.max(0,this.score); //limitar el resultado si es negativo
        if(victoria){
            document.getElementById('win').classList.add('activo');
            this.score += 40;
            console.log("Ganaste");
        }else {
            document.getElementById('gameOver').classList.add('activo');
            console.log('Game Over');
        }

        this.updateScore();

    }

    assignCards(){
        for (let x = 0; x < 5; x++){
            for (let y = 0; y < 6; y++){
                let letra = this.row[x];
                let num = y + 1;
                let ico = document.querySelector('#' + letra + num + ' .ico');
                let estado = this.estadoTablero[x][y];
                if(estado === null){
                    ico.style.backgroundImage = 'none';
                    ico.style.backgroundColor = 'oklch(0.639 0.1381 264.97)';
                }else {
                    ico.style.backgroundImage = `url(${this.icons[this.tablero[x][y] -1]})`;
                    ico.style.backgrundColor = (estado === 'selected') ? 'oklch(0.639 0.148 22.02)' : 'oklch(0.639 0.0617 135.32)';
                }
            }
        }
    }

    assignValues(){
        const values = [];
        for (let i = 1; i <= 15; i++){
            values.push(i,i);
        }

        values.sort(() => Math.random() - 0.5); //mezcla los valores creados antes

        this.tablero = [];
        for (let x = 0; x < 5; x++){
            this.tablero[x] = [];
            for (let y = 0; y < 6; y++){
                this.tablero[x][y] = values[x * 6 +y];
            }
        }
    }
    


}