let barra1 = document.querySelector('#barra_tempo_treino');
let barra2 = document.querySelector('#barra_tempo_treino_total');
let n_barra1 = document.querySelector('#barra_tempo_treino_n');
let n_barra2 = document.querySelector('#barra_tempo_treino_n_total');
let start = document.querySelector('iniciar');

let tempo = 0

setInterval(() => {
    if(tempo === 100){
        tempo = 0
    }else{
        tempo++
    }
    barra1.style.backgroundSize = `${tempo}%, 100%`;
    barra2.style.backgroundSize = `${tempo}%, 100%`;
    n_barra1.textContent = tempo + "%";
    n_barra2.textContent = tempo + "%";
}, 50);


