let barra1 = document.querySelector('#barra_tempo_treino');
let barra2 = document.querySelector('#barra_tempo_treino_total');
let n_barra1 = document.querySelector('#barra_tempo_treino_n');
let n_barra2 = document.querySelector('#barra_tempo_treino_n_total');
let start = document.querySelector('#iniciar');
let intervalo = null
let intensidade = document.querySelector('#intensidade_id');
let intense = Number(intensidade.value);

let tempo = 0
function iniciar_timer() {
    intervalo = setInterval(() => {
        if (tempo === 100) {
            clearInterval(intervalo);
            intervalo(null);
            window.alert('Escolha a intensidade e salve o progresso!')
        } else {
            tempo++
        }
        barra1.style.backgroundSize = `${tempo}%, 100%`;
        n_barra1.textContent = tempo + "%";
        
    }, 5);
}

function parar_timer() {
    clearInterval(intervalo);
}

let controle_barra2 = 0
function salvar() {
  let intensidade = document.querySelector('#intensidade_id');
  let intense = Number(intensidade.value);
  let tempo_dividido = parseInt(tempo / 5);

  // Atualiza controle_barra2 acumulando progresso
  controle_barra2 += tempo_dividido + intense;

  // Atualiza visual da barra total
  barra2.style.backgroundSize = `${controle_barra2}% 100%`;
  n_barra2.textContent = `${controle_barra2}%`;

  // Reseta barra1
  tempo = 0;
  barra1.style.backgroundSize = `0% 100%`;
  n_barra1.textContent = "0%";

  console.log("Progresso acumulado:", controle_barra2);
}
