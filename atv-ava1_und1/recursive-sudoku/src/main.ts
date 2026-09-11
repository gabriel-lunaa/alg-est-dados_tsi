import "./style.css";

import { iniciarMenu } from "./menu/menu";

import type { Tabuleiro } from "./types";
import { movimentoValido } from "./sudoku";
import { resolverSudoku } from "./solver";

const tabuleiro: Tabuleiro = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],

    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],

    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

//Cria uma cópia do Sudoku pra o Algoritmo resolver e depois comparar com as entradas.
const solucao: Tabuleiro = tabuleiro.map(
    (linha) => [...linha]
);

resolverSudoku(
    solucao,
    {
        chamadasRecursivas: 0,
        tentativas: 0,
        retrocessos: 0,
        profundidadeMaxima: 0
    }
);

//Animação ao concluir uma Linha/Coluna/Bloco.
function animarRegiaoConcluida(
    celulas: HTMLDivElement[]
): void {

    const tabuleiroVisual =
        document.querySelector<HTMLDivElement>("#tabuleiro");

    if (tabuleiroVisual) {

        tabuleiroVisual.classList.remove(
            "regiao-celebracao"
        );

        void tabuleiroVisual.offsetWidth;

        tabuleiroVisual.classList.add(
            "regiao-celebracao"
        );
    }

    celulas.forEach((celula, indice) => {

        setTimeout(() => {

            celula.classList.add(
                "regiao-concluida"
            );

            setTimeout(() => {

                celula.classList.remove(
                    "regiao-concluida"
                );

            }, 700);

        }, indice * 70);
    });
}

//Verifica regiões concluídas antes de gerar a animação.
function verificarRegioesConcluidas(): void {

    const regioes: HTMLDivElement[][] = [];

    //Linhas
    for (let linha = 0; linha < 9; linha++) {

        if (linhasComemoradas.has(linha)) {
            continue;
        }

        if (
            tabuleiro[linha].every(
                (numero) => numero !== 0
            )
        ) {

            const celulasLinha =
                Array.from(
                    document.querySelectorAll<HTMLDivElement>(
                        `.celula[data-linha="${linha}"]`
                    )
                );

            //Marca a linha como comemorada antes de iniciar a animação.
            linhasComemoradas.add(linha);

            regioes.push(celulasLinha);
        }
    }

    //Colunas
    for (let coluna = 0; coluna < 9; coluna++) {

        if (colunasComemoradas.has(coluna)) {
            continue;
        }

        let completa = true;

        for (let linha = 0; linha < 9; linha++) {

            if (tabuleiro[linha][coluna] === 0) {

                completa = false;

                break;
            }
        }

        if (completa) {

            const celulasColuna =
                Array.from(
                    document.querySelectorAll<HTMLDivElement>(
                        `.celula[data-coluna="${coluna}"]`
                    )
                );

            //Marca a coluna como comemorada antes de iniciar a animação.
            colunasComemoradas.add(coluna);

            regioes.push(celulasColuna);
        }
    }

    //Blocos
    for (let blocoLinha = 0; blocoLinha < 3; blocoLinha++) {

        for (let blocoColuna = 0; blocoColuna < 3; blocoColuna++) {

            const identificadorBloco =
                `${blocoLinha}-${blocoColuna}`;

            if (blocosComemorados.has(identificadorBloco)) {
                continue;
            }

            let completa = true;

            for (
                let linha = blocoLinha * 3;
                linha < blocoLinha * 3 + 3;
                linha++
            ) {

                for (
                    let coluna = blocoColuna * 3;
                    coluna < blocoColuna * 3 + 3;
                    coluna++
                ) {

                    if (tabuleiro[linha][coluna] === 0) {

                        completa = false;

                        break;
                    }
                }

                if (!completa) {
                    break;
                }
            }

            if (completa) {

                const celulasBloco: HTMLDivElement[] = [];

                for (
                    let linha = blocoLinha * 3;
                    linha < blocoLinha * 3 + 3;
                    linha++
                ) {

                    for (
                        let coluna = blocoColuna * 3;
                        coluna < blocoColuna * 3 + 3;
                        coluna++
                    ) {

                        const celula =
                            document.querySelector<HTMLDivElement>(
                                `.celula[data-linha="${linha}"][data-coluna="${coluna}"]`
                            );

                        if (celula) {
                            celulasBloco.push(celula);
                        }
                    }
                }

                //Marca o bloco como já comemorado antes de iniciar a animação.
                blocosComemorados.add(
                    identificadorBloco
                );

                regioes.push(celulasBloco);
            }
        }
    }

    //Executa a animação de todas as regiões concluídas.
    regioes.forEach((regiao) => {
        animarRegiaoConcluida(regiao);
    });
}

//Animação da Conclusão da partida.
function animarConclusaoFinal(): void {

    const celulas =
        document.querySelectorAll<HTMLDivElement>(
            ".celula"
        );

    const centroLinha = 4;
    const centroColuna = 4;

    const celulasOrdenadas =
        Array.from(celulas).sort((a, b) => {

            const linhaA =
                Number(a.dataset.linha);

            const colunaA =
                Number(a.dataset.coluna);

            const linhaB =
                Number(b.dataset.linha);

            const colunaB =
                Number(b.dataset.coluna);

            const distanciaA =
                Math.sqrt(
                    Math.pow(
                        linhaA - centroLinha,
                        2
                    ) +
                    Math.pow(
                        colunaA - centroColuna,
                        2
                    )
                );

            const distanciaB =
                Math.sqrt(
                    Math.pow(
                        linhaB - centroLinha,
                        2
                    ) +
                    Math.pow(
                        colunaB - centroColuna,
                        2
                    )
                );

            return distanciaA - distanciaB;
        });

    celulasOrdenadas.forEach(
        (celula, indice) => {

            setTimeout(() => {

                celula.classList.add(
                    "celebracao-final"
                );

                setTimeout(() => {

                    celula.classList.remove(
                        "celebracao-final"
                    );

                }, 800);

            }, indice * 25);
        }
    );
}

//Verifica Conclusão e finaliza partida automaticamente.
function verificarConclusao(): void {

    for (let linha = 0; linha < 9; linha++) {

        for (let coluna = 0; coluna < 9; coluna++) {

            if (tabuleiro[linha][coluna] === 0) {
                return;
            }
        }
    }
  

    pararCronometro();

    animarConclusaoFinal();

    setTimeout(() => {

        const mensagem =
            document.querySelector<HTMLDivElement>(
                "#mensagem"
            );

        if (mensagem) {

            mensagem.innerHTML = `
                <div class="mensagem-conclusao">

                    <div class="mensagem-titulo">
                        🎉 PARABÉNS!
                    </div>

                    <div class="mensagem-corpo">

                        <strong>
                            Sudoku concluído!
                        </strong>

                        <span>
                            Você resolveu o desafio.
                        </span>

                    </div>

                </div>
            `;

            mensagem.classList.add(
                "mensagem-visivel"
            );
        }

    }, 5000);
  }

//Criação das estatísticas do jogador.
let acertos = 0;
let erros = 0;

let tempoInicio = Date.now();
let cronometro: number | undefined;

const linhasComemoradas = new Set<number>();

const colunasComemoradas = new Set<number>();

const blocosComemorados = new Set<string>();

function formatarTempo(segundos: number): string {

    const minutos = Math.floor(segundos / 60);

    const segundosRestantes = segundos % 60;

    return `${minutos.toString().padStart(2, "0")}:${segundosRestantes
        .toString()
        .padStart(2, "0")}`;
}

//Atualiza o cronômetro.
function iniciarCronometro(): void {

    cronometro = window.setInterval(() => {

        const tempoAtual =
            Math.floor((Date.now() - tempoInicio) / 1000);

        const elementoTempo =
            document.querySelector<HTMLSpanElement>("#tempo");

        if (elementoTempo) {
            elementoTempo.textContent =
                formatarTempo(tempoAtual);
        }

    }, 1000);
}

function pararCronometro(): void {

    if (cronometro !== undefined) {
        clearInterval(cronometro);
    }
}

//Destaque Contextual das Células.
function destacarCelula(
    linhaSelecionada: number,
    colunaSelecionada: number
): void {

    const numeroSelecionado =
        tabuleiro[linhaSelecionada][colunaSelecionada];

    const celulas =
        document.querySelectorAll<HTMLDivElement>(".celula");

    celulas.forEach((celula) => {

        celula.classList.remove(
            "celula-selecionada",
            "mesma-linha",
            "mesma-coluna",
            "mesmo-bloco",
            "mesmo-numero"
        );

        const linha =
            Number(celula.dataset.linha);

        const coluna =
            Number(celula.dataset.coluna);

        const numero =
            tabuleiro[linha][coluna];

        if (
            linha === linhaSelecionada &&
            coluna === colunaSelecionada
        ) {
            celula.classList.add(
                "celula-selecionada"
            );

            return;
        }

        if (linha === linhaSelecionada) {
            celula.classList.add(
                "mesma-linha"
            );
        }

        if (coluna === colunaSelecionada) {
            celula.classList.add(
                "mesma-coluna"
            );
        }

        const blocoLinha =
            Math.floor(linha / 3);

        const blocoColuna =
            Math.floor(coluna / 3);

        const blocoLinhaSelecionado =
            Math.floor(linhaSelecionada / 3);

        const blocoColunaSelecionado =
            Math.floor(colunaSelecionada / 3);

        if (
            blocoLinha === blocoLinhaSelecionado &&
            blocoColuna === blocoColunaSelecionado
        ) {
            celula.classList.add(
                "mesmo-bloco"
            );
        }

        if (
            numeroSelecionado !== 0 &&
            numero === numeroSelecionado
        ) {
            celula.classList.add(
                "mesmo-numero"
            );
        }
    });
}


const aplicativo = document.querySelector<HTMLDivElement>("#app");

if (aplicativo) {
    aplicativo.innerHTML = `

    <main
        class="menu-inicial"
        id="menu-inicial"
    >

        <!-- Botão de tema -->

        <button
            id="alternar-modo"
            class="botao-modo"
            aria-label="Alternar modo de exibição"
        >
            🌙
        </button>

        <div class="menu-conteudo">

            <span class="subtitulo">
                
            </span>

            <h1>
                Sudoku
            </h1>

            <p>
                Desafie a sua lógica.<br><br><br><br>
            </p>

            <div class="menu-botoes">

                <button
                    id="iniciar-partida"
                    class="botao-menu botao-iniciar"
                >
                    Iniciar partida
                </button>

            </div>

        </div>

    </main>

    <div
        id="popup-dificuldade"
        class="popup-fundo popup-oculto"
    >

        <div class="popup-dificuldade">

            <h2>
                Escolha a dificuldade
            </h2>

            <p>
                Selecione o nível da partida:
            </p>

            <div class="opcoes-dificuldade">

                <button
                    class="opcao-dificuldade"
                    data-nivel="facil"
                >
                    <strong>Fácil</strong>
                    <span>45 números iniciais</span>
                </button>

                <button
                    class="opcao-dificuldade"
                    data-nivel="medio"
                >
                    <strong>Médio</strong>
                    <span>36 números iniciais</span>
                </button>

                <button
                    class="opcao-dificuldade"
                    data-nivel="dificil"
                >
                    <strong>Difícil</strong>
                    <span>28 números iniciais</span>
                </button>

            </div>

            <div class="popup-botoes">

                <button
                    id="cancelar-dificuldade"
                    class="botao-popup botao-cancelar"
                >
                    Cancelar
                </button>

                <button
                    id="confirmar-dificuldade"
                    class="botao-popup botao-confirmar"
                    disabled
                >
                    Começar
                </button>

            </div>

        </div>

    </div>

`;

    //MENU E BOTÔES
    const botaoIniciar =
        document.querySelector<HTMLButtonElement>(
            "#iniciar-partida"
        );

    const popupDificuldade =
        document.querySelector<HTMLDivElement>(
            "#popup-dificuldade"
        );

    const cancelarDificuldade =
        document.querySelector<HTMLButtonElement>(
            "#cancelar-dificuldade"
        );

    const confirmarDificuldade =
        document.querySelector<HTMLButtonElement>(
            "#confirmar-dificuldade"
        );

    const opcoesDificuldade =
        document.querySelectorAll<HTMLButtonElement>(
            ".opcao-dificuldade"
        );

    let nivelSelecionado:
        "facil" |
        "medio" |
        "dificil" |
        null = null;

    const botaoModo =
        document.querySelector<HTMLButtonElement>(
            "#alternar-modo"
        );
    

    botaoIniciar?.addEventListener(
        "click",
        () => {

            popupDificuldade?.classList.remove(
                "popup-oculto"
            );

        }
    );

    opcoesDificuldade.forEach(
        (opcao) => {

            opcao.addEventListener(
                "click",
                () => {

                    opcoesDificuldade.forEach(
                        (outraOpcao) => {

                            outraOpcao.classList.remove(
                                "selecionada"
                            );

                        }
                    );

                    opcao.classList.add(
                        "selecionada"
                    );

                    nivelSelecionado =
                        opcao.dataset.nivel as
                        "facil" |
                        "medio" |
                        "dificil";

                    if (confirmarDificuldade) {

                        confirmarDificuldade.disabled =
                            false;

                    }

                }
            );

        }
    );

    cancelarDificuldade?.addEventListener(
        "click",
        () => {

            popupDificuldade?.classList.add(
                "popup-oculto"
            );

            nivelSelecionado = null;

            opcoesDificuldade.forEach(
                (opcao) => {

                    opcao.classList.remove(
                        "selecionada"
                    );

                }
            );

            if (confirmarDificuldade) {

                confirmarDificuldade.disabled =
                    true;

            }

        }
    );

    confirmarDificuldade?.addEventListener(
        "click",
        () => {

            if (!nivelSelecionado) {
                return;
            }

            localStorage.setItem(
                "nivel",
                nivelSelecionado
            );

            window.location.href = "/jogo.html";
        }
    );

    //Definir e lembrar o modo definido
    let modoEscuro =
        localStorage.getItem("modo") !== "claro";

        document.body.classList.toggle(
            "modo-claro",
            !modoEscuro
        );

    botaoModo?.addEventListener(
        "click",
        () => {

            modoEscuro = !modoEscuro;

            document.body.classList.toggle(
                "modo-claro",
                !modoEscuro
            );

            localStorage.setItem(
                "modo",
                modoEscuro ? "escuro" : "claro"
            );

            if (botaoModo) {

                botaoModo.textContent =
                    modoEscuro
                        ? "🌙"
                        : "☀️";

                botaoModo.classList.remove(
                    "modo-trocado"
                );

                // Reinicia a animação do botão.
                void botaoModo.offsetWidth;

                botaoModo.classList.add(
                    "modo-trocado"
                );
            }
        }
    );

    //TABULEIRO
    const elementoTabuleiro =
        document.querySelector<HTMLDivElement>("#tabuleiro");

    if (elementoTabuleiro) {

        for (let linha = 0; linha < 9; linha++) {

            for (let coluna = 0; coluna < 9; coluna++) {

                const valor = tabuleiro[linha][coluna];

                const celula = document.createElement("div");

                celula.classList.add("celula");

                celula.dataset.linha = linha.toString();
                celula.dataset.coluna = coluna.toString();

                celula.addEventListener(
                    "click",
                    () => {
                        destacarCelula(linha, coluna);
                    }
                );

                //NÚMERO ORIGINAL DO SUDOKU
                if (valor !== 0) {

                    celula.textContent = valor.toString();

                    celula.classList.add("numero-fixo");

                }

                //CÉLULA QUE O JOGADOR PODE PREENCHER
                else {

                    const entrada =
                        document.createElement("input");

                    entrada.type = "text";

                    entrada.maxLength = 1;

                    entrada.inputMode = "numeric";

                    entrada.classList.add("entrada");

                    //Quando o jogador digitar
                    entrada.addEventListener(
                        "input",
                        () => {

                            const numero = Number(entrada.value);

                            // Permite somente números de 1 a 9
                            if (
                                !Number.isInteger(numero) ||
                                numero < 1 ||
                                numero > 9
                            ) {

                                entrada.value = "";

                                tabuleiro[linha][coluna] = 0;

                                entrada.classList.remove(
                                    "entrada-invalida"
                                );

                                return;
                            }

                            //Verifica se o movimento respeita
                            //as regras do Sudoku.
                            const movimentoPermitido = movimentoValido(
                                tabuleiro,
                                linha,
                                coluna,
                                numero
                            );
                            
                            //Verifica se o número digitado é a 
                            //resposta correta daquela posição.
                            const respostaCorreta =
                                solucao[linha][coluna] === numero;


                            //O número só é aceito se:
                              //I. Respeitar linha, coluna e bloco 3x3;
                              //II. For a resposta correta.
                            if (movimentoPermitido && respostaCorreta) {

                                tabuleiro[linha][coluna] = numero;

                                entrada.classList.remove(
                                    "entrada-invalida"
                                );

                                entrada.classList.add(
                                    "entrada-valida"
                                );

                                acertos++;

                                const elementoAcertos =
                                    document.querySelector<HTMLElement>("#acertos");

                                if (elementoAcertos) {
                                    elementoAcertos.textContent =
                                        acertos.toString();
                                }

                                verificarRegioesConcluidas();

                                verificarConclusao();

                            } else {

                                entrada.classList.remove(
                                    "entrada-valida"
                                );

                                entrada.classList.add(
                                    "entrada-invalida"
                                );

                                //Não adicionamos um número incorreto ao tabuleiro.
                                tabuleiro[linha][coluna] = 0;

                                erros++;

                                const elementoErros =
                                    document.querySelector<HTMLElement>("#erros");

                                if (elementoErros) {
                                    elementoErros.textContent =
                                        erros.toString();
                                }
                            }
                        }
                    );

                    celula.appendChild(entrada);
                }

                elementoTabuleiro.appendChild(celula);
            }
        }
    }
}
