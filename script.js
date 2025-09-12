let barra1 = document.querySelector('#barra_tempo_treino');
let barra2 = document.querySelector('#barra_tempo_treino_total');
let n_barra1 = document.querySelector('#barra_tempo_treino_n');
let n_barra2 = document.querySelector('#barra_tempo_treino_n_total');
let historico = document.querySelector('#historico');
let start = document.querySelector('#iniciar');
let parar = document.querySelector('#parar');
let perso = document.querySelector('.personagem');
let intervalo = null

let hr_span = document.querySelector('#hora');
let min_span = document.querySelector('#minutos');
let seg_span = document.querySelector('#segundos');
let pontos_valor_elmt = document.querySelector('#valor_pontos');
let pontos_valor = 0

let hr = 0, min = 0, seg = 0;
let tempo = 0
tempo_porcentagem = 0
let iniciar_timer_controle = true
function iniciar_timer() {
    if (intervalo !== null) return; // já está rodando

    iniciar_timer_controle = false;

    let data_inicio = Date.now() - (tempo * 1000); // retoma do tempo anterior

    intervalo = setInterval(() => {
        tempo = Math.floor((Date.now() - data_inicio) / 1000);
        tempo_porcentagem = Math.floor((tempo / 3600) * 100);

        if (tempo >= 3600) {
            clearInterval(intervalo);
            intervalo = null;
            setTimeout(() => {
                window.alert('Escolha a intensidade e salve o progresso!');
            }, 1000);
        }

        // Atualiza barras
        barra1.style.backgroundSize = `${tempo_porcentagem}%, 100%`;
        n_barra1.textContent = tempo_porcentagem + "%";

        // Atualiza relógio
        seg = tempo % 60;
        min = Math.floor((tempo / 60) % 60);
        hr = Math.floor(tempo / 3600);

        seg_span.textContent = seg < 10 ? `0${seg}` : seg;
        min_span.textContent = min < 10 ? `0${min}` : min;
        hr_span.textContent = hr < 10 ? `0${hr}` : hr;
    }, 1000);
}


let parar_controle = 0
let parar_timer_controle = true
function parar_timer() {
    if (intervalo !== null) {
        clearInterval(intervalo);
        intervalo = null;
        parar_timer_controle = false;
    }
}


let soma_progresso_intense = 0
let intensidade = document.querySelector('#intensidade_id');
let intense = Number(intensidade.value);
let intense_progresso = 0;
let soma_progresso = 0;
let nivel = 1;
function colocar_personagem() {
    if (soma_progresso_intense > 25) { nivel = 2; }
    if (soma_progresso_intense > 50) { nivel = 3; }
    if (soma_progresso_intense > 75) { nivel = 4; }
    if (soma_progresso_intense > 99) { nivel = 5; }
    perso.src = `imagens/P${nivel}.png`;
}

function salvar() {
    if (tempo > 0 && intervalo === null) {
        // Captura data e hora atual
        let data_sistema = new Date();
        let dia_s = data_sistema.getDate();
        let mes_s = data_sistema.getMonth() + 1;
        let ano_s = data_sistema.getFullYear();
        let hora_s = data_sistema.getHours();
        let minuto_s = data_sistema.getMinutes();
        let segundo_s = data_sistema.getSeconds();

        // Formata data e hora
        mes_s = mes_s < 10 ? `0${mes_s}` : mes_s;
        dia_s = dia_s < 10 ? `0${dia_s}` : dia_s;
        segundo_s = segundo_s < 10 ? `0${segundo_s}` : segundo_s;
        hora_s = hora_s < 10 ? `0${hora_s}` : hora_s;
        minuto_s = minuto_s < 10 ? `0${minuto_s}` : minuto_s;

        // Captura intensidade e texto correspondente
        intensidade = document.querySelector('#intensidade_id');
        intense = Number(intensidade.value);
        let texto_intensidade = ['Leve', 'Moderado', 'Intenso'];

        // Captura tempo do timer
        let tempo_timer_final = `Tempo: ${hr}:${min < 10 ? `0${min}` : min}:${seg < 10 ? `0${seg}` : seg}`;

        // Adiciona entrada ao histórico (no topo)
        historico.innerHTML = `<p>${dia_s}/${mes_s}/${ano_s} | ${hora_s}:${minuto_s}:${segundo_s} | Intensidade: ${texto_intensidade[intense - 1]} | ${tempo_timer_final}</p>` + historico.innerHTML;

        // Acumula progresso com base na intensidade
        intense_progresso += intense;

        // Calcula porcentagem de progresso com base no tempo (5 horas = 18000 segundos)
        let tempo_porcentagem_progresso = Math.floor((tempo / 18000) * 100);
        soma_progresso += tempo_porcentagem_progresso;
        soma_progresso_intense = soma_progresso + intense_progresso;

        // Atualiza barra de progresso total
        barra2.style.backgroundSize = soma_progresso_intense < 100 ? `${soma_progresso_intense}% 100%` : `100% 100%`;
        n_barra2.textContent = soma_progresso_intense < 100 ? `${soma_progresso_intense}%` : "100%";

        // Reset após salvar
        tempo = 0;
        hr = 0; min = 0; seg = 0;
        iniciar_timer_controle = true;
        parar_timer_controle = true;
        intervalo = null;

        // Reset visual
        hr_span.textContent = "00";
        min_span.textContent = "00";
        seg_span.textContent = "00";
        barra1.style.backgroundSize = `0% 100%`;
        n_barra1.textContent = "0%";
        tempo_porcentagem = 0;

        // Atualiza personagem
        colocar_personagem();

        // Salva no localStorage
        salvar_storage();

        // Verifica se progresso chegou a 100%
        if (soma_progresso_intense >= 100) {
            pontos_valor++;
            pontos_valor_elmt.innerHTML = pontos_valor;
            window.alert('✅ Progresso concluído: 100%! Você acaba de conquistar 1 ponto de refeição consciente. Os dados de progresso serão reiniciados para que você continue evoluindo. Seu histórico foi preservado com sucesso. Aproveite sua conquista!');
            reset_storage();
        }
    } else if (intervalo !== null) {
        window.alert('⏳ Você precisa parar o treino antes de salvar!');
    } else {
        window.alert('⏳ Você precisa iniciar o treino antes de salvar!');
    }
}



function trocar_pontos() {
    if (pontos_valor > 0) {
        pontos_valor--
        pontos_valor_elmt.innerHTML = pontos_valor
        window.alert('🎉 Parabéns! Você acabou de trocar 1 ponto e conquistou o direito a uma refeição sem culpa. Aproveite essa conquista — você merece! 🍽️✨');
        localStorage.setItem('pontuacao', pontos_valor);
    } else { window.alert('Você não possui pontos de troca, conclua 100% do progresso para receber pontos!') }
}

function limpar_dados() {
    const limpar_confirm = window.confirm(
        '⚠️ Você está prestes a deletar todo o seu histórico e progresso. Tem certeza de que deseja continuar?'
    );
    
    if (limpar_confirm) {
        localStorage.clear();
        window.alert('✅ Seus dados foram apagados com sucesso.');
        window.location.reload()
    }
}


function reset_storage() {
    // Zera os dados de progresso
    soma_progresso_intense = 0;
    soma_progresso = 0;
    intense_progresso = 0;
    intense = 0;
    nivel = 1;

    // Atualiza visual
    barra2.style.backgroundSize = `0% 100%`;
    n_barra2.textContent = "0%";
    colocar_personagem();

    // Salva os dados zerados no localStorage, mantendo o histórico
    localStorage.setItem('pontuacao', pontos_valor);
    localStorage.setItem('Progresso_total', soma_progresso_intense);
    localStorage.setItem('Progresso_soma', soma_progresso);
    localStorage.setItem('Progresso_intense', intense_progresso);
    localStorage.setItem('P_intense', intense);
    localStorage.setItem('nivel_personagem', nivel);
}

function salvar_storage() {
    localStorage.setItem('Progresso_intensidade', intensidade);
    localStorage.setItem('Progresso_soma', soma_progresso);
    localStorage.setItem('P_intense', intense);
    localStorage.setItem('Progresso_intense', intense_progresso);
    localStorage.setItem('Progresso_total', soma_progresso_intense);
    let historico_texto = document.querySelector('#historico');
    localStorage.setItem('Progresso_historico', historico_texto.innerHTML);
    localStorage.setItem('nivel_personagem', nivel);
    localStorage.setItem('pontuacao', pontos_valor);
}

function buscar_storage() {
    soma_progresso = Number(localStorage.getItem('Progresso_soma'));
    intensidade = Number(localStorage.getItem('Progresso_intensidade'));
    intense = Number(localStorage.getItem('P_intense'));
    intense_progresso = Number(localStorage.getItem('Progresso_intense'));
    soma_progresso_intense = Number(localStorage.getItem('Progresso_total'));
    pontos_valor = Number(localStorage.getItem('pontuacao'));
    nivel = Number(localStorage.getItem('nivel_personagem'));
    if (!nivel || nivel < 1) {
        nivel = 1;
    }

    historico.innerHTML = localStorage.getItem('Progresso_historico');

    pontos_valor_elmt.innerHTML = pontos_valor
    barra2.style.backgroundSize = soma_progresso_intense < 100 ? `${soma_progresso_intense}% 100%` : `100% 100%`
    n_barra2.textContent = soma_progresso_intense < 100 ? `${soma_progresso_intense}%` : "100%"
}

let iniciar_aviso = 0
window.onload = function () {
    buscar_storage();
    colocar_personagem();

    iniciar_aviso = localStorage.getItem('aviso_controle');
    if (iniciar_aviso === "0" || iniciar_aviso === null) {
        setTimeout(() => {
            window.alert("🎮 Pense neste site como um jogo mesclado com a vida real: cada treino de até 1 hora contribui para um total acumulado de 5 horas. Não é necessário completar 1 hora por dia — os tempos são somados automaticamente a cada sessão. Ao atingir 5 horas totais, você conquista 1 ponto fictício, que representa o direito de fazer uma refeição sem culpa. É uma forma simbólica de reconhecer seu esforço e transformar dedicação em conquista. Seu progresso é salvo automaticamente no navegador, de forma leve e divertida, pra te ajudar a manter o foco.");


            window.alert("💾 Atenção: seus dados são salvos localmente no navegador que você está usando. Se você acessar o site por outro navegador ou dispositivo, seu progresso não aparecerá — pois ele não é compartilhado entre plataformas. E se você limpar o cache, excluir o navegador ou redefinir os dados de navegação, todo o progresso será apagado. Use sempre o mesmo navegador para manter seu histórico e evolução intactos.");
            localStorage.setItem('aviso_controle', "1");
        }, 1000);
    } else { return }
};
