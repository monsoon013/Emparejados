
class Tablero {
    constructor(){
        this.tablero = [];
        this.primera = null;
        this.bloqueado = false;
        this.row = ['A', 'B', 'C', 'D', 'E'];
        this.estadoTablero = Array.from(
            {length: 5},
            () => Array(6).fill(null)
        );
    }
    //todo código creado a partir de aquí, se escribió bajo los efectos del alcohol

    select(x,y){
        if (this.estadoTablero[x][y] !== null || this.bloqueado) return;
        this.estadoTablero[x][y] = 'selected';
        this.assignCards();
        if(!this.primera) {this.primera = [x,y]; return;}
        const [x1, y1] = this.primera;
        this.primera = null;
        this.bloqueado = true;
        setTimeout(() =>  {this.game(x1, y1, x, y); this.bloqueado= false;}, 800);
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
                div.addEventListener('click', () => this.seleccionar(x,y));
                document.getElementById('tablero').appendChild(div);
            }
        }
    }

    game(x1, y1, x2, y2){
        if(this.tablero[x1][y1] === this.tablero[x2][y2]){
            this.estadoTablero[x1][y1] = 'completed';
            this.estadoTablero[x2][y2] = 'completed';
        }else {
            this.estadoTablero[x1][y1] = null;
            this.estadoTablero[x2][y2] = null;
        }

        this.assignCards();
    }

    assignCards(){
        for (let x = 0; x < 5; x++){
            for (let y = 0; y < 6; y++){
                let letra = this.row[x];
                let num = y + 1;
                let ico = document.querySelector('#' + letra + num + ' .ico');
                let estado = this.estadoTablero[x][y];
                if(estado === null){
                    ico.textContent = '';
                    ico.style.backgroundColor = 'oklch(0.639 0.1381 264.97)';
                }else if(estado === 'selected'){
                    ico.textContent = this.tablero[x][y];
                    ico.style.backgroundColor = 'oklch(0.639 0.148 22.02)';
                }else if(estado === 'completed'){
                    ico.textContent = this.tablero[x][y];
                    ico.style.backgroundColor = 'oklch(0.639 0.0617 135.32)';
                }
            }
        }
    }

    assignValues(){
        const values = [];
        for (let i = 1; i <= 15; i++){
            values.push(i,i);
        }

        values.sort(() => Math.random() - 0.5);

        this.tablero = [];
        for (let x = 0; x < 5; x++){
            this.tablero[x] = [];
            for (let y = 0; y < 6; y++){
                this.tablero[x][y] = values[x * 6 +y];
            }
        }
    }
    


}