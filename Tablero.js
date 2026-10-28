
class Tablero {
    constructor(){
        this.tablero = [];
        this.row = ['A', 'B', 'C', 'D', 'E'];
        for (let x = 0; x<5; x++){
            this.tablero[x] = [];
            for(let y = 0; y < 6; y++){
                this.tablero[x][y] = null;
            }
        }
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
                document.getElementById('tablero').appendChild(div);
            }
        }
    }

    assignCards(){
        for (let x = 0; x < 5; x++){
            for (let y = 0; y < 6; y++){
                let letra = this.col[x];
                let num = y + 1;
                let ico = document.querySelector('#' + letra + num + ' .ico');
                let valor = this.tablero[x][y];
                if(valor === null){
                    ico.style.backgroundColor = 'oklch(0.639 0.1381 264.97)';

                }else if(valor === 'selected'){
                    ico.style.backgroundColor = 'oklch(0.639 0.148 22.02)';
                }else if(valor === 'completed'){
                    ico.style.backgroundColor = 'oklch(0.639 0.0617 135.32)';
                }
            }
        }
    }
}