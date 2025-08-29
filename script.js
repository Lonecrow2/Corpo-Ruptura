let barra1 = document.querySelector('#barra_tempo_treino');
let barra2 = document.querySelector('#barra_tempo_treino_total');
let n_barra1 = document.querySelector('#barra_tempo_treino_n');
let n_barra2 = document.querySelector('#barra_tempo_treino_n_total');
let start = document.querySelector('#iniciar');
let intervalo = null


let hr_span = document.querySelector('#hora');
let min_span = document.querySelector('#minutos');
let seg_span = document.querySelector('#segundos');

let hr = 0, min = 0, seg = 0;
let data_inicio = Date.now();
let tempo = 0
tempo_porcentagem = 0
function iniciar_timer() {
    data_inicio = Date.now();
    console.log([hr, min, seg, data_inicio, tempo_porcentagem, soma_progresso].join(' | '));
    intervalo = setInterval(() => {
        tempo = Math.floor((Date.now() - data_inicio) / 1000);
        tempo_porcentagem = Math.floor((tempo / 3600) * 100);
        if (tempo === 3600) {
            clearInterval(intervalo);
            intervalo = null;
            setTimeout(() => {
                window.alert('Escolha a intensidade e salve o progresso!');
            }, 1000);
        }
        barra1.style.backgroundSize = `${tempo_porcentagem}%, 100%`;
        n_barra1.textContent = tempo_porcentagem + "%";
        if (seg < 59) {
            seg++;
            seg_span.textContent = seg < 10 ? `0${seg}` : seg;
        } else {
            seg = 0;
            seg_span.textContent = "00";
            if (min < 59) {
                min++;
                min_span.textContent = min < 10 ? `0${min}` : min;
            } else {
                min = 0;
                min_span.textContent = "00";
                hr++;
                hr_span.textContent = hr;
            }
        }
    }, 1000);
}

function parar_timer() {
    clearInterval(intervalo);
}
let intense_progresso = 0
let soma_progresso = 0
function salvar() {
    let intensidade = document.querySelector('#intensidade_id');
    let intense = Number(intensidade.value);
    intense_progresso += Number(intensidade.value);
    hr = 0, min = 0, seg = 0;
    let tempo_porcentagem_progresso = Math.floor((tempo / 18000) * 100);
    soma_progresso += tempo_porcentagem_progresso
    let soma_progresso_intense = soma_progresso + intense_progresso
    // Atualiza visual da barra total
    barra2.style.backgroundSize = `${soma_progresso_intense}% 100%`;
    n_barra2.textContent = `${soma_progresso_intense}%`;
    hr_span.textContent = "00"
    min_span.textContent = "00"
    seg_span.textContent = "00"
    tempo_porcentagem = 0

    // Reseta barra1
    tempo = 0;
    barra1.style.backgroundSize = `0% 100%`;
    n_barra1.textContent = "0%";
    console.log("Progresso acumulado:", soma_progresso)
}
