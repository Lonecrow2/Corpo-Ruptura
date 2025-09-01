let barra1 = document.querySelector('#barra_tempo_treino');
let barra2 = document.querySelector('#barra_tempo_treino_total');
let n_barra1 = document.querySelector('#barra_tempo_treino_n');
let n_barra2 = document.querySelector('#barra_tempo_treino_n_total');
let historico = document.querySelector('#historico');
let start = document.querySelector('#iniciar');
let parar = document.querySelector('#parar');
let intervalo = null

let hr_span = document.querySelector('#hora');
let min_span = document.querySelector('#minutos');
let seg_span = document.querySelector('#segundos');

let hr = 0, min = 0, seg = 0;
let tempo = 0
tempo_porcentagem = 0
function iniciar_timer() {
    if (intervalo !== null) return;
    let data_inicio = Date.now();
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

let parar_timer_controle = true
function parar_timer() {
    parar_timer_controle = parar_timer_controle === true ? false : true;
    clearInterval(intervalo);
    intervalo = null;
}

let soma_progresso_intense = 0
let intensidade = document.querySelector('#intensidade_id');
let intense = Number(intensidade.value);
let intense_progresso = 0;
let soma_progresso = 0;

function salvar() {
    if (parar_timer_controle === false || tempo_porcentagem === 100) {
        intervalo = null;
        // Captura data e hora atual
        let data_sistema = new Date();
        let dia_s = data_sistema.getDate();
        let mes_s = data_sistema.getMonth() + 1;
        let ano_s = data_sistema.getFullYear();
        let hora_s = data_sistema.getHours();
        let minuto_s = data_sistema.getMinutes();
        let segundo_s = data_sistema.getSeconds();
        // Data formatada
        mes_s = mes_s < 10 ? `0${mes_s}` : mes_s;
        dia_s = dia_s < 10 ? `0${dia_s}` : dia_s;
        segundo_s = segundo_s < 10 ? `0${segundo_s}` : segundo_s;
        hora_s = hora_s < 10 ? `0${hora_s}` : hora_s;
        minuto_s = minuto_s < 10 ? `0${minuto_s}` : minuto_s;


        // Captura intensidade e texto correspondente
        intensidade = document.querySelector('#intensidade_id');
        intense = Number(intensidade.value);
        let texto_intesidade = ['Leve', 'Moderado', 'Intenso'];

        // Captura tempo do timer
        let tempo_timer_final = `Tempo: ${hr}:${min < 10 ? `0${min}` : min}:${seg < 10 ? `0${seg}` : seg}`

        // Adiciona entrada ao histórico (no topo)
        historico.innerHTML = `<p>${dia_s}/${mes_s}/${ano_s} | ${hora_s}:${minuto_s}:${segundo_s} | Intensidade: ${texto_intesidade[intense - 1]} | ${tempo_timer_final}</p>` + historico.innerHTML;

        // Acumula progresso com base na intensidade
        intense_progresso += intense;

        // Reseta contadores de tempo
        hr = 0, min = 0, seg = 0;

        // Calcula porcentagem de progresso com base no tempo 5Hrs
        let tempo_porcentagem_progresso = Math.floor((tempo / 18000) * 100);
        soma_progresso += tempo_porcentagem_progresso;
        soma_progresso_intense = soma_progresso + intense_progresso;

        // Atualiza barra de progresso total
        barra2.style.backgroundSize = `${soma_progresso_intense}% 100%`;
        n_barra2.textContent = `${soma_progresso_intense}%`;

        // Limpa visual do relógio
        hr_span.textContent = "00";
        min_span.textContent = "00";
        seg_span.textContent = "00";
        tempo_porcentagem = 0;

        // Reseta barra de treino
        tempo = 0;
        barra1.style.backgroundSize = `0% 100%`;
        n_barra1.textContent = "0%";

        parar_timer_controle = true

        // Log de progresso
        console.log("Progresso acumulado:", soma_progresso);
        salvar_storage();
    } else if(tempo > 0){
        let piscar_parar = null
        let piscar_control = 0
        piscar_parar = setInterval(() => {
            parar.classList.toggle('piscar');
            parar.style.scale = 1.1
            piscar_control++
            if (piscar_control === 6) {
                clearInterval(piscar_parar);
                parar.style.scale = 1
            }
        }, 100);
    }else{
        let piscar_start = null
        let piscar_control = 0
        piscar_start = setInterval(() => {
            start.classList.toggle('piscar');
            start.style.scale = 1.1
            piscar_control++
            if (piscar_control === 6) {
                clearInterval(piscar_start);
                parar.style.scale = 1
            }
        }, 100);
    }
}

function salvar_storage(){
    localStorage.setItem('Progresso_intensidade', intensidade);
    localStorage.setItem('Progresso_soma', soma_progresso);
    localStorage.setItem('P_intense', intense);
    localStorage.setItem('Progresso_intense', intense_progresso);
    localStorage.setItem('Progresso_total', soma_progresso_intense);
    let historico_texto = document.querySelector('#historico');
    localStorage.setItem('Progresso_historico', historico_texto.innerHTML);
    
}

function buscar_storage(){
    soma_progresso = Number(localStorage.getItem('Progresso_soma'));
    intensidade = Number(localStorage.getItem('Progresso_intensidade'));
    intense = Number(localStorage.getItem('P_intense'));
    intense_progresso = Number(localStorage.getItem('Progresso_intense'));
    soma_progresso_intense = Number(localStorage.getItem('Progresso_total'));
    historico.innerHTML = localStorage.getItem('Progresso_historico');
    barra2.style.backgroundSize = `${soma_progresso_intense}% 100%`;
    n_barra2.textContent = `${soma_progresso_intense}%`;
}

window.onload = buscar_storage()
