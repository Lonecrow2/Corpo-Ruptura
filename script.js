let barra1 = document.querySelector('#barra_tempo_treino');
let barra2 = document.querySelector('#barra_tempo_treino_total');
let n_barra1 = document.querySelector('#barra_tempo_treino_n');
let n_barra2 = document.querySelector('#barra_tempo_treino_n_total');
let start = document.querySelector('#iniciar');
let intervalo = null
let intensidade = document.querySelector('#intensidade_id');
let intense = Number(intensidade.value);

let hr_span = document.querySelector('#hora');
let min_span = document.querySelector('#minutos');
let seg_span = document.querySelector('#segundos');

let hr = 0, min = 0, seg = 0;


let tempo = 0
function iniciar_timer() {
    intervalo = setInterval(() => {
        tempo++
        let tempo_porcentagem = parseInt((tempo / 3600) * 100);
        if (tempo === 3600) {
            clearInterval(intervalo);
            intervalo = null;
            setTimeout(() => {
                window.alert('Escolha a intensidade e salve o progresso!');
            }, 1000);
        }
        barra1.style.backgroundSize = `${tempo_porcentagem}%, 100%`;
        n_barra1.textContent = tempo_porcentagem + "%";
        if (seg <= 58) {
            seg++;
            seg_span.textContent = seg < 9 ? `0${seg}` : seg;
        } else if (min <= 58) {
            if (min < 9) {
                min++;
                min_span.textContent = `0${min}`;
                seg_span.textContent = `00`;
            } else {
                min++;
                min_span.textContent = min;
            }
            seg = 0;
        } else {
            hr++
            hr_span.textContent = hr
            min = 0;
            seg = 0;
            seg_span.textContent = "00";
            min_span.textContent = "00";
        }

    }, 1000);
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
